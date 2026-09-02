---
title: Object Pool use case
slug: object-pool-use-case
published: 2020-01-15T13:04:02
updated: 2021-08-10T16:53:39
author: Yonatan Kra
description: "After the Object Pool article went online, I was asked this on Facebook: What I take from here is 2 fold: The one paragraph spent explaining about use cases might not be enough – we need an example that is somewhat like real life. From the article, it might seem that Object Pool is the [&hellip;]"
categories:
  - name: Design Patterns
    slug: design-patterns
    path: design-patterns
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Memory
    slug: memory
    path: javascript/memory
  - name: Performance
    slug: performance
    path: performance
tags:
  - design patterns
  - javascript
  - object pool
  - performance
canonical: https://yonatankra.com/object-pool-use-case/
comments: []
---

<p>After the <a href="/improve-performance-with-object-pool/">Object Pool article</a> went online, I was asked this on Facebook:</p>



<figure class="wp-block-image size-large"><a href="https://github.com/benjamingr" target="_blank" rel="noopener"><img data-recalc-dims="1" loading="lazy" decoding="async" width="582" height="94" src="/wp-content/uploads/2020/01/image-17.png" alt="" class="wp-image-228" srcset="/wp-content/uploads/2020/01/image-17.png 582w, /wp-content/uploads/2020/01/image-17.png 300w, /wp-content/uploads/2020/01/image-17.png 268w" sizes="auto, (max-width: 582px) 100vw, 582px" /></a><figcaption><a href="https://github.com/benjamingr" target="_blank" rel="noreferrer noopener" aria-label="Benjamin Gruenbaum (opens in a new tab)">Benjamin Gruenbaum</a> comment on my article. Benji is a nodejs contributor, among other cool things he&#8217;s doing.</figcaption></figure>



<p>What I take from here is 2 fold:</p>



<ol class="wp-block-list"><li>The one paragraph spent explaining about use cases might not be enough &#8211; we need an example that is somewhat like real life.</li><li>From the article, it might seem that Object Pool is the way to handle every array you create (actually, I got this remark from someone who came to talk to me after one of my talks).</li></ol>



<p>This article will explain these two concepts.</p>



<p>I&#8217;ve spent some time building a scenario similar to one of the app&#8217;s I&#8217;ve built. </p>



<p>In this app, when the app loaded, the server sent a message with anything between 1000 to 50000 entities.</p>



<p>From then on, every 200 milliseconds or so, an update is pushed to the client.  This update would be a bulk update that could convey:</p>



<ol class="wp-block-list"><li>Create entity</li><li>Delete entity</li><li>Update entity</li></ol>



<p>For the purpose of this demo, I conduct only Create and Delete*. In addition, instead of a server, I&#8217;m using a web worker to push data.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>* In my case, the Update operation was also causing GC, because it was updating nested objects (e.g. replacing <code>a</code> in <code>x = { a: {//...} }</code>.</p></blockquote>



<p>Here&#8217;s the demo:  <a href="/performance/memory/demos/realLifeObjectPool/" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">https://yonatankra.com/performance/memory/demos/realLifeObjectPool/</a> </p>



<p>Each example simulates 200 messages from the server.</p>



<p>The results for the non object pool example are shown in Figure 1.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="464" height="132" src="/wp-content/uploads/2020/01/image-22.png" alt="" class="wp-image-236" srcset="/wp-content/uploads/2020/01/image-22.png 464w, /wp-content/uploads/2020/01/image-22.png 300w, /wp-content/uploads/2020/01/image-22.png 268w" sizes="auto, (max-width: 464px) 100vw, 464px" /><figcaption> <strong>Figure 1:</strong> Amount of GC in the non object pool example for 50 messages handling. </figcaption></figure></div>



<p>Figure 1 indicates that 220ms were spent on Minor GC and 53ms were spent on Major GC during the run of these 200 messages.</p>



<p>Figure 2 shows what happens when we are running the same scenario with an object pool.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="472" height="127" src="/wp-content/uploads/2020/01/image-21.png" alt="" class="wp-image-235" srcset="/wp-content/uploads/2020/01/image-21.png 472w, /wp-content/uploads/2020/01/image-21.png 300w, /wp-content/uploads/2020/01/image-21.png 268w" sizes="auto, (max-width: 472px) 100vw, 472px" /><figcaption> <strong>Figure 2:</strong> Amount of GC in the object pool example for 50 messages handling. </figcaption></figure></div>



<p>The data in Figure 2 shows that using object pool the Minor GC time was reduced by half. Moreover, the time spent on Major GC was reduced much more (almost 90%).</p>



<h3 class="wp-block-heading">Memory allocation and total runtime</h3>



<p>A lot of GC usually comes with a heavy memory allocation process. We can see that the GC cost us arount 150ms in the example above. How much is it from the total difference?</p>



<p>Figure 3 and Figure 4 summarize the main functions and GC in one table for both the non Object Pool and the Object Pool case respectively.</p>



<p>In Figure 3 we see the data handling took 1579ms while in Figure 4 we see that the data handling took 809ms. That&#8217;s almost half!</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="534" height="222" src="/wp-content/uploads/2020/01/image-23.png" alt="" class="wp-image-237" srcset="/wp-content/uploads/2020/01/image-23.png 534w, /wp-content/uploads/2020/01/image-23.png 300w, /wp-content/uploads/2020/01/image-23.png 216w" sizes="auto, (max-width: 534px) 100vw, 534px" /><figcaption><strong>Figure 3:</strong>  Top red rectangle &#8211; the amount of time it took the &#8220;Naive&#8221; algorithm to handle 200 incoming updates: 809.3ms.  Bottom red rectangle &#8211; the amount of time spent in minor GC. </figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="219" src="/wp-content/uploads/2020/01/image-20.png" alt="" class="wp-image-234" srcset="/wp-content/uploads/2020/01/image-20.png 664w, /wp-content/uploads/2020/01/image-20.png 300w, /wp-content/uploads/2020/01/image-20.png 263w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 4: Top red rectangle &#8211; the amount of time it took Object Pool powered algorithm to handle 200 incoming updates: 809.3ms.  Bottom red rectangle &#8211; the amount of time spent in minor GC.</figcaption></figure></div>



<p>Of course, the longer the app runs (SPA anyone) and more messages are received from the server, the greater the difference between the two.</p>



<h2 class="wp-block-heading">The GOTCHA</h2>



<p>I&#8217;d like to emphasize the importance of monitoring.  </p>



<p>In the case presented here, the <code>Demo</code> class has around 150 properties.  It can be 150 properties or multiple nested properties.</p>



<p>It might be, though, that in your app the class you instantiate is very simple.</p>



<p>This is why the demo allows you to play both with the class size as well as the amount of iterations.</p>



<p>When monitoring the app with a smaller <code>Demo</code> class (e.g. less properties), you&#8217;d might see that without an object pool you will get better performance.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="634" height="177" src="/wp-content/uploads/2020/01/image-24.png" alt="" class="wp-image-243" srcset="/wp-content/uploads/2020/01/image-24.png 634w, /wp-content/uploads/2020/01/image-24.png 300w, /wp-content/uploads/2020/01/image-24.png 268w" sizes="auto, (max-width: 634px) 100vw, 634px" /><figcaption><strong>Figure 5: </strong>The results of a test with an empty <code>Demo</code> class (number of properties 0). The Object Pool function took about the same time as the function without the pool.</figcaption></figure></div>



<p>This should give you pause and think &#8211; when should I use an object pool (or any design pattern)?</p>



<p>The answer is &#8211; monitor. Every design pattern has a problem it&#8217;s supposed to solve. </p>



<p>In the object pool case, check how much GC you get in your app. Then, if the GC is generated mostly by you instantiating and deleting similar objects &#8211; it might be that an Object Pool is the right way to go.</p>



<h2 class="wp-block-heading">Summary</h2>



<p>Thanks to the comment by <a rel="noreferrer noopener" href="https://github.com/benjamingr" target="_blank">Benjamin Gruenbaum</a>, I&#8217;ve taken the time to sit down and recreate a situation I ran into in production. </p>



<p>I hope this example emphasizes the importance of understanding what&#8217;s happening in your application in regards to memory consumption.</p>



<p>Remember to always monitor. Take into account that the code here is very simple. Your usual app will probably have more complex objects as input. The bigger the objects, the more impact their Create and Delete operations will have.</p>



<p>On the other hand, if they are very simple &#8211; allocation and GC might not be your problem&#8230;</p>



<p>Remember you can monitor the example yourself here:  <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="/performance/memory/demos/realLifeObjectPool/" target="_blank">https://yonatankra.com/performance/memory/demos/realLifeObjectPool/</a>  </p>



<p>The code is here:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100519703" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-objectpool-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="objectPool.js content, created by YonatanKra on 07:18PM on January 11, 2020."
    >

        
<div class="js-check-hidden-unicode js-blob-code-container blob-code-content">

  <template class="js-file-alert-template">
  <div data-view-component="true" class="flash flash-warn flash-full d-flex flex-items-center">
  <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg>
    <span>
      This file contains hidden or bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters.
      <a class="Link--inTextBlock" href="https://github.co/hiddenchars" target="_blank" rel="noopener">Learn more about bidirectional Unicode characters</a>
    </span>


  <div data-view-component="true" class="flash-action">        <a href="{{ revealButtonHref }}" data-view-component="true" class="btn-sm btn">    Show hidden characters
</a>
</div>
</div></template>
<template class="js-line-alert-template">
  <span aria-label="This line has hidden Unicode characters" data-view-component="true" class="line-alert tooltipped tooltipped-e">
    <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg>
</span></template>

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="objectPool.js">
        <tr>
          <td id="file-objectpool-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-objectpool-js-LC1" class="blob-code blob-code-inner js-file-line">(function () {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-objectpool-js-LC2" class="blob-code blob-code-inner js-file-line">    class PoolObject {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-objectpool-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-objectpool-js-LC4" class="blob-code blob-code-inner js-file-line">        constructor(data) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-objectpool-js-LC5" class="blob-code blob-code-inner js-file-line">            this.data = data;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-objectpool-js-LC6" class="blob-code blob-code-inner js-file-line">            this.nextFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-objectpool-js-LC7" class="blob-code blob-code-inner js-file-line">            this.previousFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-objectpool-js-LC8" class="blob-code blob-code-inner js-file-line">            this.free = true;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-objectpool-js-LC9" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-objectpool-js-LC10" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-objectpool-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-objectpool-js-LC12" class="blob-code blob-code-inner js-file-line">    class Pool {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-objectpool-js-LC13" class="blob-code blob-code-inner js-file-line">        constructor(objCreator, objReseter, initialSize = 5000) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-objectpool-js-LC14" class="blob-code blob-code-inner js-file-line">            this._pool = [];</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-objectpool-js-LC15" class="blob-code blob-code-inner js-file-line">            this.objCreator = objCreator;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-objectpool-js-LC16" class="blob-code blob-code-inner js-file-line">            this.objReseter = objReseter;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-objectpool-js-LC17" class="blob-code blob-code-inner js-file-line">            for (let i = 0; i &lt; initialSize; i++) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-objectpool-js-LC18" class="blob-code blob-code-inner js-file-line">                this.addNewObject(this.newPoolObject());</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-objectpool-js-LC19" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-objectpool-js-LC20" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-objectpool-js-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-objectpool-js-LC22" class="blob-code blob-code-inner js-file-line">        addNewObject(obj) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-objectpool-js-LC23" class="blob-code blob-code-inner js-file-line">            this._pool.push(obj);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-objectpool-js-LC24" class="blob-code blob-code-inner js-file-line">            this.release(obj);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-objectpool-js-LC25" class="blob-code blob-code-inner js-file-line">            return obj;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-objectpool-js-LC26" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-objectpool-js-LC27" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-objectpool-js-LC28" class="blob-code blob-code-inner js-file-line">        release(poolObject) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-objectpool-js-LC29" class="blob-code blob-code-inner js-file-line">            // flag as free</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-objectpool-js-LC30" class="blob-code blob-code-inner js-file-line">            poolObject.free = true;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-objectpool-js-LC31" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-objectpool-js-LC32" class="blob-code blob-code-inner js-file-line">            // set in the dequeue</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-objectpool-js-LC33" class="blob-code blob-code-inner js-file-line">            poolObject.nextFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-objectpool-js-LC34" class="blob-code blob-code-inner js-file-line">            poolObject.previousFree = this.lastFree;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-objectpool-js-LC35" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-objectpool-js-LC36" class="blob-code blob-code-inner js-file-line">            // if we had a last free, set the last free&#39;s next as the new poolObject</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-objectpool-js-LC37" class="blob-code blob-code-inner js-file-line">            // otherwise, this is the first free!</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-objectpool-js-LC38" class="blob-code blob-code-inner js-file-line">            if (poolObject.previousFree) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-objectpool-js-LC39" class="blob-code blob-code-inner js-file-line">                this.lastFree.nextFree = poolObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-objectpool-js-LC40" class="blob-code blob-code-inner js-file-line">            } else {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-objectpool-js-LC41" class="blob-code blob-code-inner js-file-line">                this.nextFree = poolObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-objectpool-js-LC42" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-objectpool-js-LC43" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-objectpool-js-LC44" class="blob-code blob-code-inner js-file-line">            // set the new object as the last in the dequeue</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-objectpool-js-LC45" class="blob-code blob-code-inner js-file-line">            this.lastFree = poolObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-objectpool-js-LC46" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-objectpool-js-LC47" class="blob-code blob-code-inner js-file-line">            // reset the object if needed</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-objectpool-js-LC48" class="blob-code blob-code-inner js-file-line">            this.objReseter(poolObject);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-objectpool-js-LC49" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-objectpool-js-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-objectpool-js-LC51" class="blob-code blob-code-inner js-file-line">        getFree() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-objectpool-js-LC52" class="blob-code blob-code-inner js-file-line">            // if we have a free one, get it - otherwise create it</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-objectpool-js-LC53" class="blob-code blob-code-inner js-file-line">            // if (!this.nextFree) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-objectpool-js-LC54" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-objectpool-js-LC55" class="blob-code blob-code-inner js-file-line">            //     for (let i = 0; i &lt; this._pool.length / 2; i++) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-objectpool-js-LC56" class="blob-code blob-code-inner js-file-line">            //         this.addNewObject(this.newPoolObject());</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-objectpool-js-LC57" class="blob-code blob-code-inner js-file-line">            //     }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-objectpool-js-LC58" class="blob-code blob-code-inner js-file-line">            // }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-objectpool-js-LC59" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-objectpool-js-LC60" class="blob-code blob-code-inner js-file-line">            const freeObject = this.nextFree ? this.nextFree : this.addNewObject(this.newPoolObject());</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-objectpool-js-LC61" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-objectpool-js-LC62" class="blob-code blob-code-inner js-file-line">            // flag as used</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-objectpool-js-LC63" class="blob-code blob-code-inner js-file-line">            freeObject.free = false;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-objectpool-js-LC64" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-objectpool-js-LC65" class="blob-code blob-code-inner js-file-line">            // the next free is the object&#39;s next free</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-objectpool-js-LC66" class="blob-code blob-code-inner js-file-line">            this.nextFree = freeObject.nextFree;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-objectpool-js-LC67" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-objectpool-js-LC68" class="blob-code blob-code-inner js-file-line">            // if there&#39;s nothing afterwards, the lastFree is null as well</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-objectpool-js-LC69" class="blob-code blob-code-inner js-file-line">            if (!this.nextFree) this.lastFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-objectpool-js-LC70" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-objectpool-js-LC71" class="blob-code blob-code-inner js-file-line">            // return the now not free object</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-objectpool-js-LC72" class="blob-code blob-code-inner js-file-line">            return freeObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-objectpool-js-LC73" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-objectpool-js-LC74" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-objectpool-js-LC75" class="blob-code blob-code-inner js-file-line">        newPoolObject() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-objectpool-js-LC76" class="blob-code blob-code-inner js-file-line">            const data = this.objCreator();</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-objectpool-js-LC77" class="blob-code blob-code-inner js-file-line">            return new PoolObject(data, this.lastFree, this.nextFree);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-objectpool-js-LC78" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-objectpool-js-LC79" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-objectpool-js-LC80" class="blob-code blob-code-inner js-file-line">        releaseAll() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-objectpool-js-LC81" class="blob-code blob-code-inner js-file-line">            this._pool.forEach(item =&gt; this.release(item));</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-objectpool-js-LC82" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-objectpool-js-LC83" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-objectpool-js-LC84" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-objectpool-js-LC85" class="blob-code blob-code-inner js-file-line">    class Demo {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-objectpool-js-LC86" class="blob-code blob-code-inner js-file-line">        constructor(someVariable = null) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-objectpool-js-LC87" class="blob-code blob-code-inner js-file-line">            this.counter = someVariable;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-objectpool-js-LC88" class="blob-code blob-code-inner js-file-line">            for (let i = 0; i &lt; 150; i++) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-objectpool-js-LC89" class="blob-code blob-code-inner js-file-line">                this[i] = i;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-objectpool-js-LC90" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-objectpool-js-LC91" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-objectpool-js-LC92" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-objectpool-js-LC93" class="blob-code blob-code-inner js-file-line">        demoMethod(val) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-objectpool-js-LC94" class="blob-code blob-code-inner js-file-line">            return val % 2;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-objectpool-js-LC95" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-objectpool-js-LC96" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-objectpool-js-LC97" class="blob-code blob-code-inner js-file-line">        demoMethod2(val) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-objectpool-js-LC98" class="blob-code blob-code-inner js-file-line">            return val * 2;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-objectpool-js-LC99" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-objectpool-js-LC100" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-objectpool-js-LC101" class="blob-code blob-code-inner js-file-line">        demoMethod3(val) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-objectpool-js-LC102" class="blob-code blob-code-inner js-file-line">            return val + 2;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-objectpool-js-LC103" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-objectpool-js-LC104" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
          <td id="file-objectpool-js-LC105" class="blob-code blob-code-inner js-file-line">        demoMethod4(val) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
          <td id="file-objectpool-js-LC106" class="blob-code blob-code-inner js-file-line">            return val - 2;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
          <td id="file-objectpool-js-LC107" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
          <td id="file-objectpool-js-LC108" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
          <td id="file-objectpool-js-LC109" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
          <td id="file-objectpool-js-LC110" class="blob-code blob-code-inner js-file-line">    const MAX_MESSAGES = 200;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
          <td id="file-objectpool-js-LC111" class="blob-code blob-code-inner js-file-line">    const counters = {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
          <td id="file-objectpool-js-LC112" class="blob-code blob-code-inner js-file-line">        deletions: 0,</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
          <td id="file-objectpool-js-LC113" class="blob-code blob-code-inner js-file-line">        additions: 0</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
          <td id="file-objectpool-js-LC114" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
          <td id="file-objectpool-js-LC115" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
          <td id="file-objectpool-js-LC116" class="blob-code blob-code-inner js-file-line">    const mockServer = new Worker(&quot;worker.js&quot;);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
          <td id="file-objectpool-js-LC117" class="blob-code blob-code-inner js-file-line">    mockServer.onmessage = function (e) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
          <td id="file-objectpool-js-LC118" class="blob-code blob-code-inner js-file-line">        // console.debug(&#39;Data received from server&#39;);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
          <td id="file-objectpool-js-LC119" class="blob-code blob-code-inner js-file-line">        const input = e.data;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
          <td id="file-objectpool-js-LC120" class="blob-code blob-code-inner js-file-line">        handleInput(input);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
          <td id="file-objectpool-js-LC121" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
          <td id="file-objectpool-js-LC122" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
          <td id="file-objectpool-js-LC123" class="blob-code blob-code-inner js-file-line">    let pool;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
          <td id="file-objectpool-js-LC124" class="blob-code blob-code-inner js-file-line">    let currState;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
          <td id="file-objectpool-js-LC125" class="blob-code blob-code-inner js-file-line">    let dataSet = {};</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
          <td id="file-objectpool-js-LC126" class="blob-code blob-code-inner js-file-line">    let inputHandling = 0;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
          <td id="file-objectpool-js-LC127" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
          <td id="file-objectpool-js-LC128" class="blob-code blob-code-inner js-file-line">    function handleInput(input) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L129" class="blob-num js-line-number js-blob-rnum" data-line-number="129"></td>
          <td id="file-objectpool-js-LC129" class="blob-code blob-code-inner js-file-line">        if (currState === &#39;Pool&#39;) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L130" class="blob-num js-line-number js-blob-rnum" data-line-number="130"></td>
          <td id="file-objectpool-js-LC130" class="blob-code blob-code-inner js-file-line">            handleInputWithPool(input);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L131" class="blob-num js-line-number js-blob-rnum" data-line-number="131"></td>
          <td id="file-objectpool-js-LC131" class="blob-code blob-code-inner js-file-line">        } else if (currState === &#39;NoPool&#39;) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L132" class="blob-num js-line-number js-blob-rnum" data-line-number="132"></td>
          <td id="file-objectpool-js-LC132" class="blob-code blob-code-inner js-file-line">            handleInputWithoutPool(input);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L133" class="blob-num js-line-number js-blob-rnum" data-line-number="133"></td>
          <td id="file-objectpool-js-LC133" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L134" class="blob-num js-line-number js-blob-rnum" data-line-number="134"></td>
          <td id="file-objectpool-js-LC134" class="blob-code blob-code-inner js-file-line">        inputHandling++;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L135" class="blob-num js-line-number js-blob-rnum" data-line-number="135"></td>
          <td id="file-objectpool-js-LC135" class="blob-code blob-code-inner js-file-line">        if (inputHandling === 1) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L136" class="blob-num js-line-number js-blob-rnum" data-line-number="136"></td>
          <td id="file-objectpool-js-LC136" class="blob-code blob-code-inner js-file-line">            // console.log(&#39;Finished filling up the dataSet for the first time&#39;);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L137" class="blob-num js-line-number js-blob-rnum" data-line-number="137"></td>
          <td id="file-objectpool-js-LC137" class="blob-code blob-code-inner js-file-line">            return;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L138" class="blob-num js-line-number js-blob-rnum" data-line-number="138"></td>
          <td id="file-objectpool-js-LC138" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L139" class="blob-num js-line-number js-blob-rnum" data-line-number="139"></td>
          <td id="file-objectpool-js-LC139" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L140" class="blob-num js-line-number js-blob-rnum" data-line-number="140"></td>
          <td id="file-objectpool-js-LC140" class="blob-code blob-code-inner js-file-line">        counters.deletions += input.reduce((a,b) =&gt; a + (b.action ? 0 : 1), 0);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L141" class="blob-num js-line-number js-blob-rnum" data-line-number="141"></td>
          <td id="file-objectpool-js-LC141" class="blob-code blob-code-inner js-file-line">        counters.additions += input.reduce((a,b) =&gt; a + (b.action ? 1 : 0), 0);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L142" class="blob-num js-line-number js-blob-rnum" data-line-number="142"></td>
          <td id="file-objectpool-js-LC142" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L143" class="blob-num js-line-number js-blob-rnum" data-line-number="143"></td>
          <td id="file-objectpool-js-LC143" class="blob-code blob-code-inner js-file-line">        if (inputHandling === MAX_MESSAGES) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L144" class="blob-num js-line-number js-blob-rnum" data-line-number="144"></td>
          <td id="file-objectpool-js-LC144" class="blob-code blob-code-inner js-file-line">            console.log(`Totals: ${JSON.stringify(counters)}`);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L145" class="blob-num js-line-number js-blob-rnum" data-line-number="145"></td>
          <td id="file-objectpool-js-LC145" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L146" class="blob-num js-line-number js-blob-rnum" data-line-number="146"></td>
          <td id="file-objectpool-js-LC146" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L147" class="blob-num js-line-number js-blob-rnum" data-line-number="147"></td>
          <td id="file-objectpool-js-LC147" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L148" class="blob-num js-line-number js-blob-rnum" data-line-number="148"></td>
          <td id="file-objectpool-js-LC148" class="blob-code blob-code-inner js-file-line">    function handleInputWithoutPool(input) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L149" class="blob-num js-line-number js-blob-rnum" data-line-number="149"></td>
          <td id="file-objectpool-js-LC149" class="blob-code blob-code-inner js-file-line">        for (let i = 0; i &lt; input.length; i++) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L150" class="blob-num js-line-number js-blob-rnum" data-line-number="150"></td>
          <td id="file-objectpool-js-LC150" class="blob-code blob-code-inner js-file-line">            const id = input[i].payload.id;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L151" class="blob-num js-line-number js-blob-rnum" data-line-number="151"></td>
          <td id="file-objectpool-js-LC151" class="blob-code blob-code-inner js-file-line">            switch (input[i].action) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L152" class="blob-num js-line-number js-blob-rnum" data-line-number="152"></td>
          <td id="file-objectpool-js-LC152" class="blob-code blob-code-inner js-file-line">                case 0:</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L153" class="blob-num js-line-number js-blob-rnum" data-line-number="153"></td>
          <td id="file-objectpool-js-LC153" class="blob-code blob-code-inner js-file-line">                    // delete</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L154" class="blob-num js-line-number js-blob-rnum" data-line-number="154"></td>
          <td id="file-objectpool-js-LC154" class="blob-code blob-code-inner js-file-line">                    delete dataSet[id];</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L155" class="blob-num js-line-number js-blob-rnum" data-line-number="155"></td>
          <td id="file-objectpool-js-LC155" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L156" class="blob-num js-line-number js-blob-rnum" data-line-number="156"></td>
          <td id="file-objectpool-js-LC156" class="blob-code blob-code-inner js-file-line">                case 1:</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L157" class="blob-num js-line-number js-blob-rnum" data-line-number="157"></td>
          <td id="file-objectpool-js-LC157" class="blob-code blob-code-inner js-file-line">                    // create</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L158" class="blob-num js-line-number js-blob-rnum" data-line-number="158"></td>
          <td id="file-objectpool-js-LC158" class="blob-code blob-code-inner js-file-line">                    dataSet[id] = new Demo(id);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L159" class="blob-num js-line-number js-blob-rnum" data-line-number="159"></td>
          <td id="file-objectpool-js-LC159" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L160" class="blob-num js-line-number js-blob-rnum" data-line-number="160"></td>
          <td id="file-objectpool-js-LC160" class="blob-code blob-code-inner js-file-line">                case 2:</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L161" class="blob-num js-line-number js-blob-rnum" data-line-number="161"></td>
          <td id="file-objectpool-js-LC161" class="blob-code blob-code-inner js-file-line">                    // TODO::update</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L162" class="blob-num js-line-number js-blob-rnum" data-line-number="162"></td>
          <td id="file-objectpool-js-LC162" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L163" class="blob-num js-line-number js-blob-rnum" data-line-number="163"></td>
          <td id="file-objectpool-js-LC163" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L164" class="blob-num js-line-number js-blob-rnum" data-line-number="164"></td>
          <td id="file-objectpool-js-LC164" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L165" class="blob-num js-line-number js-blob-rnum" data-line-number="165"></td>
          <td id="file-objectpool-js-LC165" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L166" class="blob-num js-line-number js-blob-rnum" data-line-number="166"></td>
          <td id="file-objectpool-js-LC166" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L167" class="blob-num js-line-number js-blob-rnum" data-line-number="167"></td>
          <td id="file-objectpool-js-LC167" class="blob-code blob-code-inner js-file-line">    function handleInputWithPool(input) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L168" class="blob-num js-line-number js-blob-rnum" data-line-number="168"></td>
          <td id="file-objectpool-js-LC168" class="blob-code blob-code-inner js-file-line">        let object;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L169" class="blob-num js-line-number js-blob-rnum" data-line-number="169"></td>
          <td id="file-objectpool-js-LC169" class="blob-code blob-code-inner js-file-line">        for (let i = 0; i &lt; input.length; i++) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L170" class="blob-num js-line-number js-blob-rnum" data-line-number="170"></td>
          <td id="file-objectpool-js-LC170" class="blob-code blob-code-inner js-file-line">            const id = input[i].payload.id;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L171" class="blob-num js-line-number js-blob-rnum" data-line-number="171"></td>
          <td id="file-objectpool-js-LC171" class="blob-code blob-code-inner js-file-line">            switch (input[i].action) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L172" class="blob-num js-line-number js-blob-rnum" data-line-number="172"></td>
          <td id="file-objectpool-js-LC172" class="blob-code blob-code-inner js-file-line">                case 0:</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L173" class="blob-num js-line-number js-blob-rnum" data-line-number="173"></td>
          <td id="file-objectpool-js-LC173" class="blob-code blob-code-inner js-file-line">                    // delete</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L174" class="blob-num js-line-number js-blob-rnum" data-line-number="174"></td>
          <td id="file-objectpool-js-LC174" class="blob-code blob-code-inner js-file-line">                    object = dataSet[id];</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L175" class="blob-num js-line-number js-blob-rnum" data-line-number="175"></td>
          <td id="file-objectpool-js-LC175" class="blob-code blob-code-inner js-file-line">                    delete dataSet[id];</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L176" class="blob-num js-line-number js-blob-rnum" data-line-number="176"></td>
          <td id="file-objectpool-js-LC176" class="blob-code blob-code-inner js-file-line">                    if (object) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L177" class="blob-num js-line-number js-blob-rnum" data-line-number="177"></td>
          <td id="file-objectpool-js-LC177" class="blob-code blob-code-inner js-file-line">                        pool.release(object); //TODO::expose the pool globally</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L178" class="blob-num js-line-number js-blob-rnum" data-line-number="178"></td>
          <td id="file-objectpool-js-LC178" class="blob-code blob-code-inner js-file-line">                    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L179" class="blob-num js-line-number js-blob-rnum" data-line-number="179"></td>
          <td id="file-objectpool-js-LC179" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L180" class="blob-num js-line-number js-blob-rnum" data-line-number="180"></td>
          <td id="file-objectpool-js-LC180" class="blob-code blob-code-inner js-file-line">                case 1:</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L181" class="blob-num js-line-number js-blob-rnum" data-line-number="181"></td>
          <td id="file-objectpool-js-LC181" class="blob-code blob-code-inner js-file-line">                    object = pool.getFree();</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L182" class="blob-num js-line-number js-blob-rnum" data-line-number="182"></td>
          <td id="file-objectpool-js-LC182" class="blob-code blob-code-inner js-file-line">                    object.data.counter = i;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L183" class="blob-num js-line-number js-blob-rnum" data-line-number="183"></td>
          <td id="file-objectpool-js-LC183" class="blob-code blob-code-inner js-file-line">                    dataSet[id] = object;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L184" class="blob-num js-line-number js-blob-rnum" data-line-number="184"></td>
          <td id="file-objectpool-js-LC184" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L185" class="blob-num js-line-number js-blob-rnum" data-line-number="185"></td>
          <td id="file-objectpool-js-LC185" class="blob-code blob-code-inner js-file-line">                case 2:</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L186" class="blob-num js-line-number js-blob-rnum" data-line-number="186"></td>
          <td id="file-objectpool-js-LC186" class="blob-code blob-code-inner js-file-line">                    // TODO::update</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L187" class="blob-num js-line-number js-blob-rnum" data-line-number="187"></td>
          <td id="file-objectpool-js-LC187" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L188" class="blob-num js-line-number js-blob-rnum" data-line-number="188"></td>
          <td id="file-objectpool-js-LC188" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L189" class="blob-num js-line-number js-blob-rnum" data-line-number="189"></td>
          <td id="file-objectpool-js-LC189" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L190" class="blob-num js-line-number js-blob-rnum" data-line-number="190"></td>
          <td id="file-objectpool-js-LC190" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L191" class="blob-num js-line-number js-blob-rnum" data-line-number="191"></td>
          <td id="file-objectpool-js-LC191" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L192" class="blob-num js-line-number js-blob-rnum" data-line-number="192"></td>
          <td id="file-objectpool-js-LC192" class="blob-code blob-code-inner js-file-line">    function createAndDestroy() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L193" class="blob-num js-line-number js-blob-rnum" data-line-number="193"></td>
          <td id="file-objectpool-js-LC193" class="blob-code blob-code-inner js-file-line">        currState = &#39;NoPool&#39;;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L194" class="blob-num js-line-number js-blob-rnum" data-line-number="194"></td>
          <td id="file-objectpool-js-LC194" class="blob-code blob-code-inner js-file-line">        generalReset();</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L195" class="blob-num js-line-number js-blob-rnum" data-line-number="195"></td>
          <td id="file-objectpool-js-LC195" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L196" class="blob-num js-line-number js-blob-rnum" data-line-number="196"></td>
          <td id="file-objectpool-js-LC196" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L197" class="blob-num js-line-number js-blob-rnum" data-line-number="197"></td>
          <td id="file-objectpool-js-LC197" class="blob-code blob-code-inner js-file-line">    function createWithAPool() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L198" class="blob-num js-line-number js-blob-rnum" data-line-number="198"></td>
          <td id="file-objectpool-js-LC198" class="blob-code blob-code-inner js-file-line">        currState = &#39;Pool&#39;;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L199" class="blob-num js-line-number js-blob-rnum" data-line-number="199"></td>
          <td id="file-objectpool-js-LC199" class="blob-code blob-code-inner js-file-line">        pool = new Pool(() =&gt; new Demo(null),</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L200" class="blob-num js-line-number js-blob-rnum" data-line-number="200"></td>
          <td id="file-objectpool-js-LC200" class="blob-code blob-code-inner js-file-line">            (item) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L201" class="blob-num js-line-number js-blob-rnum" data-line-number="201"></td>
          <td id="file-objectpool-js-LC201" class="blob-code blob-code-inner js-file-line">                item.data.counter = null</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L202" class="blob-num js-line-number js-blob-rnum" data-line-number="202"></td>
          <td id="file-objectpool-js-LC202" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L203" class="blob-num js-line-number js-blob-rnum" data-line-number="203"></td>
          <td id="file-objectpool-js-LC203" class="blob-code blob-code-inner js-file-line">            5000);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L204" class="blob-num js-line-number js-blob-rnum" data-line-number="204"></td>
          <td id="file-objectpool-js-LC204" class="blob-code blob-code-inner js-file-line">        generalReset();</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L205" class="blob-num js-line-number js-blob-rnum" data-line-number="205"></td>
          <td id="file-objectpool-js-LC205" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L206" class="blob-num js-line-number js-blob-rnum" data-line-number="206"></td>
          <td id="file-objectpool-js-LC206" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L207" class="blob-num js-line-number js-blob-rnum" data-line-number="207"></td>
          <td id="file-objectpool-js-LC207" class="blob-code blob-code-inner js-file-line">    function generalReset() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L208" class="blob-num js-line-number js-blob-rnum" data-line-number="208"></td>
          <td id="file-objectpool-js-LC208" class="blob-code blob-code-inner js-file-line">        counters.additions = counters.deletions = 0;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L209" class="blob-num js-line-number js-blob-rnum" data-line-number="209"></td>
          <td id="file-objectpool-js-LC209" class="blob-code blob-code-inner js-file-line">        inputHandling = 0;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L210" class="blob-num js-line-number js-blob-rnum" data-line-number="210"></td>
          <td id="file-objectpool-js-LC210" class="blob-code blob-code-inner js-file-line">        dataSet = {};</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L211" class="blob-num js-line-number js-blob-rnum" data-line-number="211"></td>
          <td id="file-objectpool-js-LC211" class="blob-code blob-code-inner js-file-line">        if (pool) { </td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L212" class="blob-num js-line-number js-blob-rnum" data-line-number="212"></td>
          <td id="file-objectpool-js-LC212" class="blob-code blob-code-inner js-file-line">            pool.releaseAll();</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L213" class="blob-num js-line-number js-blob-rnum" data-line-number="213"></td>
          <td id="file-objectpool-js-LC213" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L214" class="blob-num js-line-number js-blob-rnum" data-line-number="214"></td>
          <td id="file-objectpool-js-LC214" class="blob-code blob-code-inner js-file-line">        mockServer.postMessage({MAX_MESSAGES});</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L215" class="blob-num js-line-number js-blob-rnum" data-line-number="215"></td>
          <td id="file-objectpool-js-LC215" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L216" class="blob-num js-line-number js-blob-rnum" data-line-number="216"></td>
          <td id="file-objectpool-js-LC216" class="blob-code blob-code-inner js-file-line">    window.createAndDestroy = createAndDestroy;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L217" class="blob-num js-line-number js-blob-rnum" data-line-number="217"></td>
          <td id="file-objectpool-js-LC217" class="blob-code blob-code-inner js-file-line">    window.createWithAPool = createWithAPool;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L218" class="blob-num js-line-number js-blob-rnum" data-line-number="218"></td>
          <td id="file-objectpool-js-LC218" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/bc29b2d684a892a3321340d79e02c086/raw/33f73861e104ed4827e951e3364086de209cb045/objectPool.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/bc29b2d684a892a3321340d79e02c086#file-objectpool-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          objectPool.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-worker-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="worker.js content, created by YonatanKra on 07:18PM on January 11, 2020."
    >

        
<div class="js-check-hidden-unicode js-blob-code-container blob-code-content">

  <template class="js-file-alert-template">
  <div data-view-component="true" class="flash flash-warn flash-full d-flex flex-items-center">
  <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg>
    <span>
      This file contains hidden or bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters.
      <a class="Link--inTextBlock" href="https://github.co/hiddenchars" target="_blank" rel="noopener">Learn more about bidirectional Unicode characters</a>
    </span>


  <div data-view-component="true" class="flash-action">        <a href="{{ revealButtonHref }}" data-view-component="true" class="btn-sm btn">    Show hidden characters
</a>
</div>
</div></template>
<template class="js-line-alert-template">
  <span aria-label="This line has hidden Unicode characters" data-view-component="true" class="line-alert tooltipped tooltipped-e">
    <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-alert">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
</svg>
</span></template>

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="worker.js">
        <tr>
          <td id="file-worker-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-worker-js-LC1" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-worker-js-LC2" class="blob-code blob-code-inner js-file-line">const actions = {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-worker-js-LC3" class="blob-code blob-code-inner js-file-line">    0: &#39;DELETE&#39;,</td>
        </tr>
        <tr>
          <td id="file-worker-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-worker-js-LC4" class="blob-code blob-code-inner js-file-line">    1: &#39;CREATE&#39;,</td>
        </tr>
        <tr>
          <td id="file-worker-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-worker-js-LC5" class="blob-code blob-code-inner js-file-line">    2: &#39;UPDATE&#39;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-worker-js-LC6" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-worker-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-worker-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-worker-js-LC8" class="blob-code blob-code-inner js-file-line">const ids = [];</td>
        </tr>
        <tr>
          <td id="file-worker-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-worker-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-worker-js-LC10" class="blob-code blob-code-inner js-file-line">class Message {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-worker-js-LC11" class="blob-code blob-code-inner js-file-line">    constructor(action = 3, payload = {}) {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-worker-js-LC12" class="blob-code blob-code-inner js-file-line">        this.action = action;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-worker-js-LC13" class="blob-code blob-code-inner js-file-line">        this.payload = payload;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-worker-js-LC14" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-worker-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-worker-js-LC15" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-worker-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-worker-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-worker-js-LC17" class="blob-code blob-code-inner js-file-line">function setMessagePayload(message, id) {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-worker-js-LC18" class="blob-code blob-code-inner js-file-line">    message.payload.id = id ? id : Math.round(Math.random() * new Date().getTime());</td>
        </tr>
        <tr>
          <td id="file-worker-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-worker-js-LC19" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-worker-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-worker-js-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-worker-js-LC21" class="blob-code blob-code-inner js-file-line">function getExistingID() {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-worker-js-LC22" class="blob-code blob-code-inner js-file-line">    return ids[Math.floor(Math.random()*(ids.length - 1))];</td>
        </tr>
        <tr>
          <td id="file-worker-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-worker-js-LC23" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-worker-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-worker-js-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-worker-js-LC25" class="blob-code blob-code-inner js-file-line">function generateInput() {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-worker-js-LC26" class="blob-code blob-code-inner js-file-line">    const action = messages === 1 ? 1 : Math.random() &lt; .49 ? 1 : 0;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-worker-js-LC27" class="blob-code blob-code-inner js-file-line">    const message = new Message(action);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-worker-js-LC28" class="blob-code blob-code-inner js-file-line">    switch (action) {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-worker-js-LC29" class="blob-code blob-code-inner js-file-line">        case 0:</td>
        </tr>
        <tr>
          <td id="file-worker-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-worker-js-LC30" class="blob-code blob-code-inner js-file-line">            //TODO::add the pool as global</td>
        </tr>
        <tr>
          <td id="file-worker-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-worker-js-LC31" class="blob-code blob-code-inner js-file-line">            setMessagePayload(message, getExistingID());</td>
        </tr>
        <tr>
          <td id="file-worker-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-worker-js-LC32" class="blob-code blob-code-inner js-file-line">            entitiesCount--;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-worker-js-LC33" class="blob-code blob-code-inner js-file-line">            break;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-worker-js-LC34" class="blob-code blob-code-inner js-file-line">        case 1:</td>
        </tr>
        <tr>
          <td id="file-worker-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-worker-js-LC35" class="blob-code blob-code-inner js-file-line">            setMessagePayload(message);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-worker-js-LC36" class="blob-code blob-code-inner js-file-line">            ids.push(message.payload.id);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-worker-js-LC37" class="blob-code blob-code-inner js-file-line">            entitiesCount++;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-worker-js-LC38" class="blob-code blob-code-inner js-file-line">            break;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-worker-js-LC39" class="blob-code blob-code-inner js-file-line">        case 2:</td>
        </tr>
        <tr>
          <td id="file-worker-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-worker-js-LC40" class="blob-code blob-code-inner js-file-line">            setMessagePayload(message);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-worker-js-LC41" class="blob-code blob-code-inner js-file-line">            break;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-worker-js-LC42" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-worker-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-worker-js-LC43" class="blob-code blob-code-inner js-file-line">    return message;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-worker-js-LC44" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-worker-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-worker-js-LC45" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-worker-js-LC46" class="blob-code blob-code-inner js-file-line">let MAX_MESSAGES = 100;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-worker-js-LC47" class="blob-code blob-code-inner js-file-line">const UPDATED_PER_MESSAGE = 1000;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-worker-js-LC48" class="blob-code blob-code-inner js-file-line">const FIRST_ENTITIES_BULK = 5000;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-worker-js-LC49" class="blob-code blob-code-inner js-file-line">let messages = Infinity;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-worker-js-LC50" class="blob-code blob-code-inner js-file-line">let entitiesCount = 0;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-worker-js-LC51" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-worker-js-LC52" class="blob-code blob-code-inner js-file-line">setInterval(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-worker-js-LC53" class="blob-code blob-code-inner js-file-line">    if (messages &gt;= MAX_MESSAGES) return;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-worker-js-LC54" class="blob-code blob-code-inner js-file-line">    messages++;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-worker-js-LC55" class="blob-code blob-code-inner js-file-line">    const pushUpdate = new Array(messages === 1 ? FIRST_ENTITIES_BULK : UPDATED_PER_MESSAGE).fill(0).map(i =&gt; generateInput());</td>
        </tr>
        <tr>
          <td id="file-worker-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-worker-js-LC56" class="blob-code blob-code-inner js-file-line">    postMessage(pushUpdate);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-worker-js-LC57" class="blob-code blob-code-inner js-file-line">}, 200);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-worker-js-LC58" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-worker-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-worker-js-LC59" class="blob-code blob-code-inner js-file-line">onmessage = function(e) {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-worker-js-LC60" class="blob-code blob-code-inner js-file-line">    if (messages &lt; MAX_MESSAGES) {</td>
        </tr>
        <tr>
          <td id="file-worker-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-worker-js-LC61" class="blob-code blob-code-inner js-file-line">        console.log(&#39;Worker: Message from main script ignored&#39;);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-worker-js-LC62" class="blob-code blob-code-inner js-file-line">        return;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-worker-js-LC63" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-worker-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-worker-js-LC64" class="blob-code blob-code-inner js-file-line">    MAX_MESSAGES = (e.data &amp;&amp; e.data.MAX_MESSAGES) ? e.data.MAX_MESSAGES : 0;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-worker-js-LC65" class="blob-code blob-code-inner js-file-line">    console.log(&#39;Worker: Message received from main script&#39;);</td>
        </tr>
        <tr>
          <td id="file-worker-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-worker-js-LC66" class="blob-code blob-code-inner js-file-line">    entitiesCount = 0;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-worker-js-LC67" class="blob-code blob-code-inner js-file-line">    messages = 0;</td>
        </tr>
        <tr>
          <td id="file-worker-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-worker-js-LC68" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/bc29b2d684a892a3321340d79e02c086/raw/33f73861e104ed4827e951e3364086de209cb045/worker.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/bc29b2d684a892a3321340d79e02c086#file-worker-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          worker.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>Thanks again to <a rel="noreferrer noopener" href="https://github.com/benjamingr" target="_blank">Benjamin Gruenbaum</a> for his comment. Looking forward to more comments from all of you 🙂</p>

