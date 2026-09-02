---
title: Improve Performance with Object Pool
slug: improve-performance-with-object-pool
published: 2020-01-10T08:06:07
updated: 2021-08-10T16:53:39
author: Yonatan Kra
description: In a former article I’ve shown the consequences of memory allocation and garbage collection.  Object pool is a simple design pattern that can be used in order to solve both problems.
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
  - memory
  - object pool
  - performance
canonical: https://yonatankra.com/improve-performance-with-object-pool/
comments: []
---

<p>In a former article I&#8217;ve shown <a href="/memory-allocation-and-garbage-collection-in-javascript/">the consequences of memory allocation and garbage collection</a>.  Object pool is a simple design pattern that can be used in order to solve both problems.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1e596393" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1e596393"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/improve-performance-with-object-pool/#The_Problem" >The Problem</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/improve-performance-with-object-pool/#Ok_so_the_JS_engine_does_it_for_me_Who_cares" >Ok, so the JS engine does it for me. Who cares?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/improve-performance-with-object-pool/#Whats_causing_all_of_this_GC" >What&#8217;s causing all of this GC?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/improve-performance-with-object-pool/#How_can_your_app_suffer_from_GC" >How can your app suffer from GC?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/improve-performance-with-object-pool/#There_is_a_solution_%E2%80%93_Object_Pool" >There is a solution &#8211; Object Pool</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/improve-performance-with-object-pool/#The_Algorithm" >The Algorithm</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/improve-performance-with-object-pool/#Optimizations" >Optimizations</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/improve-performance-with-object-pool/#Reduce_free_object_lookup_time" >Reduce free object lookup time</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-9" href="/improve-performance-with-object-pool/#Optimizing_the_number_of_elements_in_the_pool" >Optimizing the number of elements in the pool</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/improve-performance-with-object-pool/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Problem"></span>The Problem<span class="ez-toc-section-end"></span></h2>



<p>Memory allocation is a slow process.  The less memory allocations our code requires, the better.</p>



<p>If we look at the example from the <a href="/memory-allocation-and-garbage-collection-in-javascript/">memory allocation post</a>, we can see that memory allocation makes our code run much slower &#8211; sometimes, 3 or 4 times slower.</p>



<p>But memory allocation is just the first part of the problem.  The problem described in the former post mostly considers the creation of new objects. What happens when you need to delete objects as well?</p>



<p>When you delete objects in Javascript, they remain in memory until they are released. The mechanism responsible for this memory release is called Garbage Collection (GC from here on).  The JS engine tracks down deleted variables and removes them from memory. </p>



<p>This is a very short introduction to Garbage Collection.  If you want to read more about it, I suggest reading this <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://v8.dev/blog/trash-talk" target="_blank">V8 blog article</a>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Ok_so_the_JS_engine_does_it_for_me_Who_cares"></span>Ok, so the JS engine does it for me. Who cares?<span class="ez-toc-section-end"></span></h3>



<p>To illustrate the problem of GC, let&#8217;s look at some code and profile it:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100380406" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-garbagecollection-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="garbageCollection.js content, created by YonatanKra on 11:36AM on January 04, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="garbageCollection.js">
        <tr>
          <td id="file-garbagecollection-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-garbagecollection-js-LC1" class="blob-code blob-code-inner js-file-line">class Demo {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-garbagecollection-js-LC2" class="blob-code blob-code-inner js-file-line">    constructor(counter) {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-garbagecollection-js-LC3" class="blob-code blob-code-inner js-file-line">        this.counter = counter;</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-garbagecollection-js-LC4" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-garbagecollection-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-garbagecollection-js-LC6" class="blob-code blob-code-inner js-file-line">    setMe() {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-garbagecollection-js-LC7" class="blob-code blob-code-inner js-file-line">        this.counter.count += 1;</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-garbagecollection-js-LC8" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-garbagecollection-js-LC9" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-garbagecollection-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-garbagecollection-js-LC11" class="blob-code blob-code-inner js-file-line">function createAndCount() {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-garbagecollection-js-LC12" class="blob-code blob-code-inner js-file-line">    const objs = [];</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-garbagecollection-js-LC13" class="blob-code blob-code-inner js-file-line">    const counter = {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-garbagecollection-js-LC14" class="blob-code blob-code-inner js-file-line">        count: 0</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-garbagecollection-js-LC15" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-garbagecollection-js-LC16" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; 1000; i++) {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-garbagecollection-js-LC17" class="blob-code blob-code-inner js-file-line">        for (let demo = 0; demo &lt; 1000; demo++) {</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-garbagecollection-js-LC18" class="blob-code blob-code-inner js-file-line">            const currBoom = objs[objs.push(new Demo(counter)) - 1];</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-garbagecollection-js-LC19" class="blob-code blob-code-inner js-file-line">            currBoom.setMe();</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-garbagecollection-js-LC20" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-garbagecollection-js-LC21" class="blob-code blob-code-inner js-file-line">        objs.length = 0;</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-garbagecollection-js-LC22" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-garbagecollection-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-garbagecollection-js-LC24" class="blob-code blob-code-inner js-file-line">    console.log(`Counter is: ${counter.count}`);</td>
        </tr>
        <tr>
          <td id="file-garbagecollection-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-garbagecollection-js-LC25" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3e62efebab93b8e84c06fa0ea9891a54/raw/787c18c775fcd8f30fa8f3219f3f2b8915715e09/garbageCollection.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3e62efebab93b8e84c06fa0ea9891a54#file-garbagecollection-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          garbageCollection.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-text-align-center">Code Snippet 1: Runtime allocation and GC</p>
</div></div>



<p>The code is pretty simple. We have a class Demo that is created a 1000 times. We then do something with it (the <code>setMe</code> method).</p>



<p>The profiler shows us something interesting:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="499" height="321" src="/wp-content/uploads/2020/01/image-9.png" alt="" class="wp-image-195" srcset="/wp-content/uploads/2020/01/image-9.png 499w, /wp-content/uploads/2020/01/image-9.png 300w, /wp-content/uploads/2020/01/image-9.png 140w" sizes="auto, (max-width: 499px) 100vw, 499px" /><figcaption><strong>Figure 1:</strong> Bottom up view of the profiler results. Almost 50% of the runtime is spent on Minor GC</figcaption></figure></div>



<p>Figure 1 is the bottom up view of the runtime. We can see that GC took almost 50% of our runtime. That&#8217;s almost 50% performance budget we can save!</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Whats_causing_all_of_this_GC"></span>What&#8217;s causing all of this GC?<span class="ez-toc-section-end"></span></h3>



<p>When we create more and more objects inside the for loop, the JSEngine stores them in memory.  Then, we clear the array (<code>objs.length = 0</code>). </p>



<p>The JS engine looks at the discarded data as a target for garbage disposal (GC). Then we create new objects in the array, to which the JS engine allocates new memory and so on.</p>



<p>While we repeat the process, the JS engine repeats the GC process.</p>



<p>This is, in a nutshell, memory allocation and GC.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_can_your_app_suffer_from_GC"></span>How can your app suffer from GC?<span class="ez-toc-section-end"></span></h2>



<p>Well, in JS we create and delete objects with abandon (almost everything is an object). We sometimes keep them in arrays, and sometimes they are created in different functions.</p>



<p>If you have a function that creates an auxiliary array &#8211; the array is most probably Garbage Collected after the function finishes (unless you do something about it). See Figure 2 for example.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="134" src="/wp-content/uploads/2020/01/image-13.png" alt="" class="wp-image-217" srcset="/wp-content/uploads/2020/01/image-13.png 667w, /wp-content/uploads/2020/01/image-13.png 300w, /wp-content/uploads/2020/01/image-13.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 2:</strong> A function that allocates an array and once finished &#8211; the array is garbage collected</figcaption></figure>



<p>Another use case might be quick or bulk updates from a server that adds or removes new entities in your data. If you hold 5000 entities, and remove/create 1000 entities in every cycle &#8211; this might cause a GC issue in your application.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="There_is_a_solution_%E2%80%93_Object_Pool"></span>There is a solution &#8211; Object Pool<span class="ez-toc-section-end"></span></h2>



<p>The idea in object pools is to preallocate the memory you need and reuse it. </p>



<p>Let&#8217;s understand this using some code:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100384420" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-nogcexample-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="noGCExample.js content, created by YonatanKra on 03:37PM on January 04, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="noGCExample.js">
        <tr>
          <td id="file-nogcexample-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-nogcexample-js-LC1" class="blob-code blob-code-inner js-file-line">function createAndCount() {</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-nogcexample-js-LC2" class="blob-code blob-code-inner js-file-line">    const counter = {</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-nogcexample-js-LC3" class="blob-code blob-code-inner js-file-line">        count: 0</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-nogcexample-js-LC4" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-nogcexample-js-LC5" class="blob-code blob-code-inner js-file-line">    const objs = new Array(1000).fill(null).map(new Demo(counter));</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-nogcexample-js-LC6" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-nogcexample-js-LC7" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; 1000; i++) {</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-nogcexample-js-LC8" class="blob-code blob-code-inner js-file-line">        for (let demo = 0; demo &lt; 1000; demo++) {</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-nogcexample-js-LC9" class="blob-code blob-code-inner js-file-line">            const currBoom = objs[demo];</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-nogcexample-js-LC10" class="blob-code blob-code-inner js-file-line">            currBoom.setMe();</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-nogcexample-js-LC11" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-nogcexample-js-LC12" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-nogcexample-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-nogcexample-js-LC14" class="blob-code blob-code-inner js-file-line">    console.log(`Counter is: ${counter.count}`);</td>
        </tr>
        <tr>
          <td id="file-nogcexample-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-nogcexample-js-LC15" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2626c532c9050971e34e5cba75bbab14/raw/112277ee2923f0409a557ee31e6250c2742ca38a/noGCExample.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2626c532c9050971e34e5cba75bbab14#file-nogcexample-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          noGCExample.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-text-align-center">Code Snippet 2: Pre-allocate an array and reuse the objects</p>
</div></div>



<p>The code snippet above pre allocates the demos, and instead of creating them &#8211; reuses them.</p>



<p>When looking at the bottom-up view again, we see that the GC is completely gone!</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="517" height="213" src="/wp-content/uploads/2020/01/image-12.png" alt="" class="wp-image-201" srcset="/wp-content/uploads/2020/01/image-12.png 517w, /wp-content/uploads/2020/01/image-12.png 300w, /wp-content/uploads/2020/01/image-12.png 218w" sizes="auto, (max-width: 517px) 100vw, 517px" /><figcaption><strong>Figure 3:</strong> Filtering the Bottom-Up view shows zero GC!</figcaption></figure>



<p>I hope now you have some motivation to learn the algorithm itself, because this is the next step.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Algorithm"></span>The Algorithm<span class="ez-toc-section-end"></span></h3>



<p>The example above, while showing the motivation to use object pool, is not very useful in real life. We would like the objects we get from the pool to be exactly like objects we&#8217;ve just instantiated with <code>new Demo()</code>.</p>



<p>The algorithm below is how we can implement an object pool:</p>



<ol class="wp-block-list"><li>Create an array of the types of entities you intend to create and delete a lot</li><li>Tag and save “free” entities in this array</li><li>When you need a new entity, request a “free” entity<ol><li>If no free entity exists:<ol><li>create a new one and add it to the array</li><li>Return the new entity</li></ol></li></ol></li><li>Release the object:<ol><li>Reset the object</li><li>Return it to the array</li></ol></li></ol>



<p>In Javascript:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100279345" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-object-pool-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="object-pool.js content, created by YonatanKra on 08:46PM on December 28, 2019."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="object-pool.js">
        <tr>
          <td id="file-object-pool-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-object-pool-js-LC1" class="blob-code blob-code-inner js-file-line">class ObjectPool {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-object-pool-js-LC2" class="blob-code blob-code-inner js-file-line">  constructor(objectConstructor, objectReseter, initialSize = 5000) {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-object-pool-js-LC3" class="blob-code blob-code-inner js-file-line">    this.objectConstructor = objectConstructor;</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-object-pool-js-LC4" class="blob-code blob-code-inner js-file-line">    this.objectReseter = objectReseter;</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-object-pool-js-LC5" class="blob-code blob-code-inner js-file-line">    this._pool = [];</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-object-pool-js-LC6" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; initialSize; i++) {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-object-pool-js-LC7" class="blob-code blob-code-inner js-file-line">      this._addObjectToPool();</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-object-pool-js-LC8" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-object-pool-js-LC9" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-object-pool-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-object-pool-js-LC11" class="blob-code blob-code-inner js-file-line">  _addObjectToPool() {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-object-pool-js-LC12" class="blob-code blob-code-inner js-file-line">    const newObj = {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-object-pool-js-LC13" class="blob-code blob-code-inner js-file-line">        alive: false,</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-object-pool-js-LC14" class="blob-code blob-code-inner js-file-line">        data: this.objectConstructor()</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-object-pool-js-LC15" class="blob-code blob-code-inner js-file-line">      };</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-object-pool-js-LC16" class="blob-code blob-code-inner js-file-line">    this._pool.push(newObj);</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-object-pool-js-LC17" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-object-pool-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-object-pool-js-LC19" class="blob-code blob-code-inner js-file-line">  _allocate(object) {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-object-pool-js-LC20" class="blob-code blob-code-inner js-file-line">    object.alive = true;</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-object-pool-js-LC21" class="blob-code blob-code-inner js-file-line">    return object;</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-object-pool-js-LC22" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-object-pool-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-object-pool-js-LC24" class="blob-code blob-code-inner js-file-line">  getNew() {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-object-pool-js-LC25" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; this._pool.length; i++) {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-object-pool-js-LC26" class="blob-code blob-code-inner js-file-line">      if (this._pool[i].alive === false) {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-object-pool-js-LC27" class="blob-code blob-code-inner js-file-line">        return this._allocate(this._pool[i]);</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-object-pool-js-LC28" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-object-pool-js-LC29" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-object-pool-js-LC30" class="blob-code blob-code-inner js-file-line">    return this._addObjectToPool();</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-object-pool-js-LC31" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-object-pool-js-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-object-pool-js-LC33" class="blob-code blob-code-inner js-file-line">  release(object) {</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-object-pool-js-LC34" class="blob-code blob-code-inner js-file-line">    object.alive = false;</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-object-pool-js-LC35" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-object-pool-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-object-pool-js-LC36" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c3899fcf0f0556a7a4ae0d73589df9f4/raw/30ba01a59991c15d2265a31d77de87942f319c80/object-pool.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c3899fcf0f0556a7a4ae0d73589df9f4#file-object-pool-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          object-pool.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-text-align-center">Code Snippet 3: Basic Object Pool</p>
</div></div>



<p>The constructor initiates an array of objects of a certain size (defaults to 5000).&nbsp;</p>



<p>When we need a new object, we request it via the <strong><em>getNew</em></strong> method. This method searches for the first “dead” object. It then returns it for usage as a “live” object.</p>



<p>When one finishes using the object, it can be released via the <strong><em>release</em></strong> method. </p>



<p>The tables in Figure 4 compare the total GC with a pool vs. the total GC without a pool of the same task.  It is based on the example in the following link: <a href="/performance/memory/liveExamples/object-pool.html">https://yonatankra.com/performance/memory/liveExamples/object-pool.html</a> </p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="143" src="/wp-content/uploads/2020/01/image-15.png" alt="" class="wp-image-220" srcset="/wp-content/uploads/2020/01/image-15.png 972w, /wp-content/uploads/2020/01/image-15.png 300w, /wp-content/uploads/2020/01/image-15.png 768w, /wp-content/uploads/2020/01/image-15.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption> <strong>Figure 4</strong>: Left table &#8211; total GC of the code running with Object Pool.  Right table &#8211; total GC of the code running without an Object Pool. </figcaption></figure>



<p>You can play with it and profile it to see the effects of the pool. </p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Optimizations"></span>Optimizations<span class="ez-toc-section-end"></span></h3>



<p>The algorithm described in the former part is very simple for the purpose of teaching it. There are some issues with it.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Reduce_free_object_lookup_time"></span>Reduce free object lookup time<span class="ez-toc-section-end"></span></h3>



<p>Looking for a free entity in our current algorithm is costly &#8211; O(n).&nbsp; </p>



<p>One solution can be to create an array of &#8220;free objects&#8221;. Every time we request a new one, we remove the “not free” entity from the array. When we release an object, we push it back.</p>



<p>Removing and adding the objects to the “free” array can be a costly allocation process in itself.&nbsp; This is what we&#8217;ve set out to avoid in the first place.</p>



<p>We can further optimize and add a new array with indices of free objects instead of the removing and adding the objects themselves.&nbsp; This will keep retrieval of a free object O(1) while avoiding the allocation of the big data array. </p>



<p> The solution above mostly replaces object allocation with integer allocation. While in many cases this is a huge improvement, we can do more. In addition, if we talk about “big data”, creating another array in the size of the original array might not be such a good idea&#8230; </p>



<p>If you look closely, we only use the &#8220;free&#8221; array to &#8220;add&#8221; and &#8220;pop&#8221; and always take the latest or the first. This is either a FIFO (First In First Out) or a LIFO (Last In First Out) strategy. It yells &#8220;a stack or a queue&#8221;!</p>



<p>In this case, you’d might want to create the a queue of free entities such that every entity refers to the next. This way, just keeping a reference to the next free entity allows us to retrieve a free object with constant time while keeping all the objects in their own array.</p>



<p>Here&#8217;s the queue solution implemented:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100384565" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-objectpool-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="objectPool.js content, created by YonatanKra on 03:53PM on January 04, 2020."
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
          <td id="file-objectpool-js-LC1" class="blob-code blob-code-inner js-file-line">class PoolObject {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-objectpool-js-LC2" class="blob-code blob-code-inner js-file-line">    constructor(data) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-objectpool-js-LC3" class="blob-code blob-code-inner js-file-line">        this.data = data;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-objectpool-js-LC4" class="blob-code blob-code-inner js-file-line">        this.nextFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-objectpool-js-LC5" class="blob-code blob-code-inner js-file-line">        this.previousFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-objectpool-js-LC6" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-objectpool-js-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-objectpool-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-objectpool-js-LC9" class="blob-code blob-code-inner js-file-line">class Pool {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-objectpool-js-LC10" class="blob-code blob-code-inner js-file-line">    constructor(objCreator, objReseter, initialSize = 5000) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-objectpool-js-LC11" class="blob-code blob-code-inner js-file-line">        this._pool = [];</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-objectpool-js-LC12" class="blob-code blob-code-inner js-file-line">        this.objCreator = objCreator;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-objectpool-js-LC13" class="blob-code blob-code-inner js-file-line">        this.objReseter = objReseter;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-objectpool-js-LC14" class="blob-code blob-code-inner js-file-line">        for (let i = 0; i &lt; initialSize; i++) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-objectpool-js-LC15" class="blob-code blob-code-inner js-file-line">            this.addNewObject(this.newPoolObject());</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-objectpool-js-LC16" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-objectpool-js-LC17" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-objectpool-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-objectpool-js-LC19" class="blob-code blob-code-inner js-file-line">    addNewObject(obj) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-objectpool-js-LC20" class="blob-code blob-code-inner js-file-line">        this._pool.push(obj);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-objectpool-js-LC21" class="blob-code blob-code-inner js-file-line">        this.release(obj);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-objectpool-js-LC22" class="blob-code blob-code-inner js-file-line">        return obj;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-objectpool-js-LC23" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-objectpool-js-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-objectpool-js-LC25" class="blob-code blob-code-inner js-file-line">    release(poolObject) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-objectpool-js-LC26" class="blob-code blob-code-inner js-file-line">        // flag as free</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-objectpool-js-LC27" class="blob-code blob-code-inner js-file-line">        poolObject.free = true;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-objectpool-js-LC28" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-objectpool-js-LC29" class="blob-code blob-code-inner js-file-line">        // set in the queue</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-objectpool-js-LC30" class="blob-code blob-code-inner js-file-line">        poolObject.nextFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-objectpool-js-LC31" class="blob-code blob-code-inner js-file-line">        poolObject.previousFree = this.lastFree;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-objectpool-js-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-objectpool-js-LC33" class="blob-code blob-code-inner js-file-line">        // if we had a last free, set the last free&#39;s next as the new poolObject</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-objectpool-js-LC34" class="blob-code blob-code-inner js-file-line">        // otherwise, this is the first free!</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-objectpool-js-LC35" class="blob-code blob-code-inner js-file-line">        if (poolObject.previousFree) {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-objectpool-js-LC36" class="blob-code blob-code-inner js-file-line">            this.lastFree.nextFree = poolObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-objectpool-js-LC37" class="blob-code blob-code-inner js-file-line">        } else {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-objectpool-js-LC38" class="blob-code blob-code-inner js-file-line">            this.nextFree = poolObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-objectpool-js-LC39" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-objectpool-js-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-objectpool-js-LC41" class="blob-code blob-code-inner js-file-line">        // set the new object as the last in the queue</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-objectpool-js-LC42" class="blob-code blob-code-inner js-file-line">        this.lastFree = poolObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-objectpool-js-LC43" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-objectpool-js-LC44" class="blob-code blob-code-inner js-file-line">        // reset the object if needed</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-objectpool-js-LC45" class="blob-code blob-code-inner js-file-line">        this.objReseter(poolObject);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-objectpool-js-LC46" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-objectpool-js-LC47" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-objectpool-js-LC48" class="blob-code blob-code-inner js-file-line">    getFree() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-objectpool-js-LC49" class="blob-code blob-code-inner js-file-line">        // if we have a free one, get it - otherwise create it</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-objectpool-js-LC50" class="blob-code blob-code-inner js-file-line">        const freeObject = this.nextFree ? this.nextFree : this.addNewObject(this.newPoolObject());</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-objectpool-js-LC51" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-objectpool-js-LC52" class="blob-code blob-code-inner js-file-line">        // flag as used</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-objectpool-js-LC53" class="blob-code blob-code-inner js-file-line">        freeObject.free = false;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-objectpool-js-LC54" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-objectpool-js-LC55" class="blob-code blob-code-inner js-file-line">        // the next free is the object&#39;s next free</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-objectpool-js-LC56" class="blob-code blob-code-inner js-file-line">        this.nextFree = freeObject.nextFree;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-objectpool-js-LC57" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-objectpool-js-LC58" class="blob-code blob-code-inner js-file-line">        // if there&#39;s nothing afterwards, the lastFree is null as well</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-objectpool-js-LC59" class="blob-code blob-code-inner js-file-line">        if (!this.nextFree) this.lastFree = null;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-objectpool-js-LC60" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-objectpool-js-LC61" class="blob-code blob-code-inner js-file-line">        // return the now not free object</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-objectpool-js-LC62" class="blob-code blob-code-inner js-file-line">        return freeObject;</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-objectpool-js-LC63" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-objectpool-js-LC64" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-objectpool-js-LC65" class="blob-code blob-code-inner js-file-line">    newPoolObject() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-objectpool-js-LC66" class="blob-code blob-code-inner js-file-line">        const data = this.objCreator();</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-objectpool-js-LC67" class="blob-code blob-code-inner js-file-line">        return new PoolObject(data, this.lastFree, this.nextFree);</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-objectpool-js-LC68" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-objectpool-js-LC69" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-objectpool-js-LC70" class="blob-code blob-code-inner js-file-line">    releaseAll() {</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-objectpool-js-LC71" class="blob-code blob-code-inner js-file-line">        this._pool.forEach(item =&gt; this.release(item));</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-objectpool-js-LC72" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-objectpool-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-objectpool-js-LC73" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3f0188fcbb35853b8732342e4a52d57e/raw/5dcf22cfbb63e6bb52ba50ce5491445d985dbc72/objectPool.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3f0188fcbb35853b8732342e4a52d57e#file-objectpool-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          objectPool.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-text-align-center">Code Snippet 4: Implement the Object Pool solution with a queue for O(1) look up time</p>
</div></div>



<p>In the solution above (<code> getFree  </code>method), we always keep the pool&#8217;s <code>nextFree</code> as a reference to the next available free object. Once we fetch it, we set the <code>nextFree</code> to be the <code>next</code> of the current <code>nextFree</code> and this is how the queue goes on.</p>



<p>The solution is very simple and straight forward.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Optimizing_the_number_of_elements_in_the_pool"></span>Optimizing the number of elements in the pool<span class="ez-toc-section-end"></span></h3>



<p>If you&#8217;ve noticed, the default number of pre allocated entities was 5000.  Two questions arise:</p>



<ol class="wp-block-list"><li>How many entities should we pre allocate?</li><li>What happens if we reach this number?</li></ol>



<p>The first question is pretty short &#8211; you should know your application and estimate the amount of data you are going to hold.</p>



<p>The second question has few approaches to take. In the code above, the moment we had no free objects to use, we just created a new one and it stayed there forever.</p>



<p>You could, on the other hand, decide on a threshold (like always have at least 2% free entities). Every time you cross that threshold, you double the amount of entities you have, or add 100 or anything you dim fit.</p>



<p>Eventually, optimizing for the number of entities requires some knowledge about your application.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this article we dived a bit deeper into memory allocation and GC.</p>



<p>We saw an example of memory allocation in which we allocated memory for objects in an array. This example is closer to what will happen in real life, as arrays of integers are rarely used in real life applications.</p>



<p>The trick used in the <a href="/memory-allocation-and-garbage-collection-in-javascript/">memory allocation article</a>, in which we pre allocated the array beforehand worked and removed GC from our runtime (Figure 2).</p>



<p>The problem with this simplified solution is that it is not robust enough. All we did was use the same objects over and over, but just in a loop. Most of the time, we&#8217;d like to instantiate a new object with some meta data and use it OOP style (oh no &#8211; I said the O word!!!).</p>



<p>This is where the Object Pool design pattern comes in handy. Actually, you can take the code <a rel="noreferrer noopener" aria-label="in the gist (opens in a new tab)" href="https://gist.github.com/YonatanKra/3f0188fcbb35853b8732342e4a52d57e" target="_blank">in the gist</a> and use it in your app right now. Just follow the API.</p>



<p>An important thing to note is this: you should always be aware that these kind of solutions have a price. The price is usually an overhead in code complexity. </p>



<p>In this case, we&#8217;ve created a whole API just to create and destroy entities.  If your app does not have a lot of create/destroy actions &#8211; you are better off using a &#8220;regular&#8221; <code>new</code>. Thanks to <a rel="noreferrer noopener" aria-label="MichalKutz (opens in a new tab)" href="https://www.linkedin.com/in/michael-k-ab673b135/" target="_blank">MichalKutz</a> for bringing that up.</p>



<p>I hope you now understand better memory allocation and GC and their implication on your app&#8217;s performance.  If you have any question or comment &#8211; feel free to use the comments area below.</p>

