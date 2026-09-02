---
title: Memory on a Diet
slug: memory-on-a-diet
published: 2020-02-07T07:10:02
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: In my last article, I talked about the flyweight design pattern. I mostly talked about how it can save you (and your end user) bandwidth. I failed to mention the save on memory. If we continue the example from the aforementioned blog post, let’s measure the memory consumption. A short reminder – the client code [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/memory-on-a-diet/
comments: []
---


<p>In my last article, I talked about <a href="/reducing-network-traffic-with-the-flyweight-design-pattern/">the flyweight design pattern</a>. I mostly talked about how it can save you (and your end user) bandwidth.</p>



<p>I failed to mention the save on memory.</p>



<p>If we continue the example from the aforementioned blog post, let&#8217;s measure the memory consumption.</p>



<p>A short reminder &#8211; the client code below fetches data from a server in two ways:</p>



<ol class="wp-block-list"><li>The naive way &#8211; get the object with all its properties</li><li>The Flyweight way &#8211; get the object with a type, as well as a type-metadata dictionary</li></ol>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100749254" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-flyweight-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="flyWeight.js content, created by YonatanKra on 06:42AM on January 23, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="flyWeight.js">
        <tr>
          <td id="file-flyweight-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-flyweight-js-LC1" class="blob-code blob-code-inner js-file-line">(function() {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-flyweight-js-LC2" class="blob-code blob-code-inner js-file-line">    function json(response) {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-flyweight-js-LC3" class="blob-code blob-code-inner js-file-line">        return response.json()</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-flyweight-js-LC4" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-flyweight-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-flyweight-js-LC6" class="blob-code blob-code-inner js-file-line">    function getData(url) {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-flyweight-js-LC7" class="blob-code blob-code-inner js-file-line">        fetch(url, {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-flyweight-js-LC8" class="blob-code blob-code-inner js-file-line">            method: &#39;post&#39;,</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-flyweight-js-LC9" class="blob-code blob-code-inner js-file-line">            headers: {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-flyweight-js-LC10" class="blob-code blob-code-inner js-file-line">                &quot;Content-type&quot;: &quot;application/x-www-form-urlencoded; charset=UTF-8&quot;</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-flyweight-js-LC11" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-flyweight-js-LC12" class="blob-code blob-code-inner js-file-line">            })</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-flyweight-js-LC13" class="blob-code blob-code-inner js-file-line">            .then(json)</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-flyweight-js-LC14" class="blob-code blob-code-inner js-file-line">            .then(function (data) {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-flyweight-js-LC15" class="blob-code blob-code-inner js-file-line">                myUsers = data;</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-flyweight-js-LC16" class="blob-code blob-code-inner js-file-line">                console.log(&#39;Finished fetching data&#39;);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-flyweight-js-LC17" class="blob-code blob-code-inner js-file-line">            })</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-flyweight-js-LC18" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-flyweight-js-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-flyweight-js-LC20" class="blob-code blob-code-inner js-file-line">    function regularData() {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-flyweight-js-LC21" class="blob-code blob-code-inner js-file-line">        getData(&#39;/getData&#39;)</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-flyweight-js-LC22" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-flyweight-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-flyweight-js-LC24" class="blob-code blob-code-inner js-file-line">    function flyWeightData() {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-flyweight-js-LC25" class="blob-code blob-code-inner js-file-line">        getData(&#39;/getFlyWeightData&#39;);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-flyweight-js-LC26" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-flyweight-js-LC27" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-flyweight-js-LC28" class="blob-code blob-code-inner js-file-line">    let myUsers;</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-flyweight-js-LC29" class="blob-code blob-code-inner js-file-line">    document.getElementById(&#39;request&#39;).addEventListener(&#39;click&#39;, regularData);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-flyweight-js-LC30" class="blob-code blob-code-inner js-file-line">    document.getElementById(&#39;requestFlyWieght&#39;).addEventListener(&#39;click&#39;, flyWeightData);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-flyweight-js-LC31" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd/raw/17fb7b945d2a5373d3c4791af340d776e19e7d04/flyWeight.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd#file-flyweight-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          flyWeight.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.html content, created by YonatanKra on 06:42AM on January 23, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="index.html">
        <tr>
          <td id="file-index-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-index-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;button id=&quot;request&quot;&gt;Request data&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-html-LC2" class="blob-code blob-code-inner js-file-line">&lt;button id=&quot;requestFlyWieght&quot;&gt;Request light weight data&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-html-LC3" class="blob-code blob-code-inner js-file-line">&lt;script src=&quot;flyWeight.js&quot;&gt;&lt;/script&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd/raw/17fb7b945d2a5373d3c4791af340d776e19e7d04/index.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd#file-index-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>In chrome devtools, there&#8217;s the memory tab. With it, we can take a snapshot of our memory in various times and compare them.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="296" src="/wp-content/uploads/2020/02/chromeDevToolsMemoryPane.png" alt="" class="wp-image-285" srcset="/wp-content/uploads/2020/02/chromeDevToolsMemoryPane.png 936w, /wp-content/uploads/2020/02/chromeDevToolsMemoryPane.png 300w, /wp-content/uploads/2020/02/chromeDevToolsMemoryPane.png 768w, /wp-content/uploads/2020/02/chromeDevToolsMemoryPane.png 195w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 1:</strong> (1) The memory tab. (2) The Heap snapshot option selected. (3) The button to take a heap snapshot</figcaption></figure></div>



<p>Let&#8217;s compare the memory snapshot between the flyweight and the regular data fetch:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="201" src="/wp-content/uploads/2020/02/image-1.png" alt="" class="wp-image-287" srcset="/wp-content/uploads/2020/02/image-1.png 989w, /wp-content/uploads/2020/02/image-1.png 300w, /wp-content/uploads/2020/02/image-1.png 768w, /wp-content/uploads/2020/02/image-1.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 2: Memory comparison of the regular snapshot (Snapshot 3, marked in orange border) with the flyweight snapshot (Snapshot 2, marked in a blue border).</figcaption></figure>



<p>Figure 2 shows the comparison of total memory allocated by the regular fetch subtracted by the total memory allocated by the flyweight pattern.  The difference is roughly 320kb (marked with the red border). </p>



<h2 class="wp-block-heading">Summary</h2>



<p>In this short post we saw that by utilizing the Flyweight design pattern, we can reduce the memory signature of our app.</p>



<p>It doesn&#8217;t matter if your client is running in the browser or a service that receives data &#8211; if big chunks of data have similar properties, you can use the flyweight pattern and reduce both bandwidth and memory usage.</p>



<p>So if your app is currently in the heavy weight category &#8211; you can put it on a strict diet to get it to the flyweight category (yes&#8230; geek jokes combined with me being a data&#8230; a killer).</p>

