---
title: Measuring used JS heap size in nodejs
slug: measuring-used-js-heap-size-in-nodejs
published: 2020-03-21T05:04:53
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: In the former article, we saw how to measure the JS heap in the browser and a few use cases it can come in handy. I was asked how this can be done in a nodejs app as well. Let’s do something a bit more interesting – create a script that will measure the heap [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: nodejs
    slug: nodejs
    path: javascript/nodejs
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/measuring-used-js-heap-size-in-nodejs/
comments: []
---


<p>In the former article, we saw <a href="/measuring-used-js-heap-size/">how to measure the JS heap in the browser</a> and a few use cases it can come in handy.  I was asked how this can be done in a nodejs app as well. </p>



<p>Let&#8217;s do something a bit more interesting &#8211; create a script that will measure the heap size both in the browser as well as in a nodejs environment.</p>



<p>Let&#8217;s take the example from the former article and turn it into a nodejs compatible code:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist101915476" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-logmemory-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="logMemory.js content, created by YonatanKra on 04:14AM on March 21, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="logMemory.js">
        <tr>
          <td id="file-logmemory-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-logmemory-js-LC1" class="blob-code blob-code-inner js-file-line">function logMemory() {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-logmemory-js-LC2" class="blob-code blob-code-inner js-file-line">    if (typeof process != &#39;undefined&#39;) {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-logmemory-js-LC3" class="blob-code blob-code-inner js-file-line">        console.log(`Node: ${process.memoryUsage().heapUsed / Math.pow(1000, 2)} MB`);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-logmemory-js-LC4" class="blob-code blob-code-inner js-file-line">    } else if (performance) {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-logmemory-js-LC5" class="blob-code blob-code-inner js-file-line">        console.log(`Browser: ${performance.memory.usedJSHeapSize / Math.pow(1000, 2)} MB`);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-logmemory-js-LC6" class="blob-code blob-code-inner js-file-line">    } else {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-logmemory-js-LC7" class="blob-code blob-code-inner js-file-line">        throw (&#39;Where d-heck are you trying to run me?&#39;);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-logmemory-js-LC8" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-logmemory-js-LC9" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-logmemory-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-logmemory-js-LC11" class="blob-code blob-code-inner js-file-line">function measureMemory() {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-logmemory-js-LC12" class="blob-code blob-code-inner js-file-line">    const arraySize = 25 * Math.pow(1000, 2);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-logmemory-js-LC13" class="blob-code blob-code-inner js-file-line">    logMemory();</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-logmemory-js-LC14" class="blob-code blob-code-inner js-file-line">    (function() {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-logmemory-js-LC15" class="blob-code blob-code-inner js-file-line">        const array1 = new Array(arraySize).fill(1.1);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-logmemory-js-LC16" class="blob-code blob-code-inner js-file-line">    logMemory();</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-logmemory-js-LC17" class="blob-code blob-code-inner js-file-line">    })();</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-logmemory-js-LC18" class="blob-code blob-code-inner js-file-line">    (function() {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-logmemory-js-LC19" class="blob-code blob-code-inner js-file-line">        const array2 = new Array(arraySize).fill(1);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-logmemory-js-LC20" class="blob-code blob-code-inner js-file-line">    logMemory()</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-logmemory-js-LC21" class="blob-code blob-code-inner js-file-line">    })();</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-logmemory-js-LC22" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-logmemory-js-LC23" class="blob-code blob-code-inner js-file-line">    setTimeout(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-logmemory-js-LC24" class="blob-code blob-code-inner js-file-line">        logMemory();</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-logmemory-js-LC25" class="blob-code blob-code-inner js-file-line">    }, 5000);</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-logmemory-js-LC26" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-logmemory-js-LC27" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-logmemory-js-LC28" class="blob-code blob-code-inner js-file-line">measureMemory();</td>
        </tr>
        <tr>
          <td id="file-logmemory-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-logmemory-js-LC29" class="blob-code blob-code-inner js-file-line">  </td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a6dd6b287c0949602231cd373b6777fb/raw/548d3bc27180e96497e94713bdaa48a31932cfb7/logMemory.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a6dd6b287c0949602231cd373b6777fb#file-logmemory-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          logMemory.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-small-font-size"><strong>Code snippet 1</strong>: the function log memory now logs memory both in the browser as well as in a nodejs application.</p>
</div></div>



<p>Code snippet 1 is almost the same as the code in the former article with 2 differences:</p>



<ol class="wp-block-list"><li>The <em>logMemory</em> function was added</li><li>The logging before and after array creation is replaced by <em>logMemory</em></li></ol>



<p>Log memory asks if we have the <em>process</em> object (e.g. the nodejs process) and if it does, it uses <code> process.memoryUsage().heapUsed </code>. This is the equivalent of <code> performance.memory.usedJSHeapSize </code>in the browser.</p>



<p>Running <code>node logMemory</code> will avail an output that looks like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="227" height="130" src="/wp-content/uploads/2020/03/image-6.png" alt="" class="wp-image-356" srcset="/wp-content/uploads/2020/03/image-6.png 227w, /wp-content/uploads/2020/03/image-6.png 157w" sizes="auto, (max-width: 227px) 100vw, 227px" /><figcaption><strong>Figure 1</strong>: logMemory output in a nodeJS environment</figcaption></figure></div>



<p>Running the code in the browser will output:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="398" height="234" src="/wp-content/uploads/2020/03/image-7.png" alt="" class="wp-image-357" srcset="/wp-content/uploads/2020/03/image-7.png 398w, /wp-content/uploads/2020/03/image-7.png 300w, /wp-content/uploads/2020/03/image-7.png 153w" sizes="auto, (max-width: 398px) 100vw, 398px" /><figcaption><strong>Figure 2</strong>: logMemory output in the browser.</figcaption></figure></div>



<p>You can try the plnkr here:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<p><iframe src="https://embed.plnkr.co/plunk/HgLOrQoUmBy9IJ6k" style="height: 60vh; width: 100%"></iframe></p>



<p class="has-text-color has-text-align-center has-small-font-size has-very-dark-gray-color"><strong>Code snippet 2</strong>: The logMemory code in the browser</p>
</div></div>



<p>Comparing Figure 1 to Figure 2, you can see a difference in how memory is managed between nodejs and the browser. This very well might depend on the browser, the nodejs/browser version and more.</p>



<h2 class="wp-block-heading">Summary</h2>



<p>Measuring the used heap size in nodejs is done using:</p>



<pre class="wp-block-code"><code>process.memoryUsage().heapUsed</code></pre>



<p>Measuring it in the browser is done using:</p>



<pre class="wp-block-code"><code>performance.memory.usedJSHeapSize</code></pre>



<p>We&#8217;ve created a short script that logs the memory regardless of the environment it is in:</p>



<pre class="wp-block-code"><code>function logMemory() {
    if (typeof process != 'undefined') {
        console.log(`Node: ${process.memoryUsage().heapUsed / Math.pow(1000, 2)} MB`);
    } else if (performance) {
        console.log(`Browser: ${performance.memory.usedJSHeapSize / Math.pow(1000, 2)} MB`);
    } else {
        throw ('Where d-heck are you trying to run me?');
    }
}</code></pre>



<p>We also saw that memory management differs in nodejs and the browser with the small prints that it might also differ between nodejs and browser versions.</p>

