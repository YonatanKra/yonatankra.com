---
title: Memory Allocation and Garbage Collection in Javascript
slug: memory-allocation-and-garbage-collection-in-javascript
published: 2020-01-02T20:24:21
updated: 2021-08-10T16:53:39
author: Yonatan Kra
description: "Javascript developers usually don’t care much about memory management. The JS engine does most of the heavy lifting for us. In this post I’m going to demonstrate how important it is to understand JavaScript memory management. Let’s take a look at an example: The two functions – buildArray and buildArray2 do the same thing. They [&hellip;]"
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/memory-allocation-and-garbage-collection-in-javascript/
comments: []
---


<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="427" src="/wp-content/uploads/2020/01/memoryAllocation.jpg" alt="Memory Allocation" class="wp-image-193" srcset="/wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 1024w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 300w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 768w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 1536w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 2048w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 135w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 1280w, /wp-content/uploads/2020/01/memoryAllocation-scaled.jpg 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>This is how we can allocate memory &#8211; by taking photos. This empty frame is ready to be filled with a memory.
Photo by Rolands Zilvinskis on Unsplash</figcaption></figure>



<p> Javascript developers usually don&#8217;t care much about memory management. The JS engine does most of the heavy lifting for us. </p>



<p>In this post I&#8217;m going to demonstrate how important it is to understand JavaScript memory management. </p>



<p>Let&#8217;s take a look at an example:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100352486" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-memoryallocation-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="memoryAllocation.js content, created by YonatanKra on 07:25PM on January 02, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="memoryAllocation.js">
        <tr>
          <td id="file-memoryallocation-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-memoryallocation-js-LC1" class="blob-code blob-code-inner js-file-line">function buildArray(n) {</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-memoryallocation-js-LC2" class="blob-code blob-code-inner js-file-line">    const arr = [];</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-memoryallocation-js-LC3" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; n; i++) {</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-memoryallocation-js-LC4" class="blob-code blob-code-inner js-file-line">        arr.push(i);</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-memoryallocation-js-LC5" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-memoryallocation-js-LC6" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-memoryallocation-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-memoryallocation-js-LC8" class="blob-code blob-code-inner js-file-line">function buildArray2(n) {</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-memoryallocation-js-LC9" class="blob-code blob-code-inner js-file-line">    const arr = new Array(n).fill(0);</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-memoryallocation-js-LC10" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; n; i++) {</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-memoryallocation-js-LC11" class="blob-code blob-code-inner js-file-line">        arr[i] = (i);</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-memoryallocation-js-LC12" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-memoryallocation-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-memoryallocation-js-LC13" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/f345c0cd6f1c60e5f6dbc810d492846a/raw/7763d716da5f538977d9af5bff5ac9b3c1dafd83/memoryAllocation.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/f345c0cd6f1c60e5f6dbc810d492846a#file-memoryallocation-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          memoryAllocation.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The two functions &#8211; <code>buildArray</code> and <code>buildArray2</code> do the same thing.  They iterate <code>n</code> times and add the current index value into an array in the index position.</p>



<h2 class="wp-block-heading">I beg to differ</h2>



<p>The difference between the two functions is in the array initiation line:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="590" height="440" src="/wp-content/uploads/2020/01/image-5.png" alt="" class="wp-image-189" srcset="/wp-content/uploads/2020/01/image-5.png 590w, /wp-content/uploads/2020/01/image-5.png 300w, /wp-content/uploads/2020/01/image-5.png 121w" sizes="auto, (max-width: 590px) 100vw, 590px" /><figcaption> The difference is marked with the red circles. </figcaption></figure></div>



<p>Measuring the runtime of these functions with 20000000 array members shows us that <code>buildArray2</code> is much faster (figure 1).</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/01/image-6.png" alt="" class="wp-image-190" width="468" height="79" srcset="/wp-content/uploads/2020/01/image-6.png 354w, /wp-content/uploads/2020/01/image-6.png 300w, /wp-content/uploads/2020/01/image-6.png 268w" sizes="auto, (max-width: 468px) 100vw, 468px" /><figcaption><strong>Figure 1</strong>: <code>buildArray</code> run time (top row) vs. <code>buildArray2</code> run time (bottom row)</figcaption></figure></div>



<p>You&#8217;d might say that 20000000 is not a valid number of array members.  You are correct in most cases.  You should remember, though, that this is a very simple example in which the array members are integers.  </p>



<p>In addition, you&#8217;d might have a process that runs periodically. The difference between the above functions, multiplied by the time your process repeats can become substantial as you scale (a rendering cycle for instance).</p>



<p>I&#8217;ve prepared a live demo with which you can play with the size of the array as well as the number of times you repeat the iteration:  <a href="/performance/memory/demos/gcAndAllocation/index.html">https://yonatankra.com/performance/memory/demos/gcAndAllocation</a></p>



<p>If we use the demo above to test our code and set our arrays to 1000 members, with 20000 iterations we see the results in figure 2. These results show us that even with relatively small arrays, we&#8217;d might get a performance hit in certain cases.</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/01/image-7.png" alt="" class="wp-image-191" width="442" height="70" srcset="/wp-content/uploads/2020/01/image-7.png 336w, /wp-content/uploads/2020/01/image-7.png 300w, /wp-content/uploads/2020/01/image-7.png 268w" sizes="auto, (max-width: 442px) 100vw, 442px" /><figcaption><strong>Figure 2: </strong>The results of 20000 iterations with 1000 members array</figcaption></figure></div>



<p>For instance, imagine a function that recreates our small array for immutability. This function might run in response a user&#8217;s click.  It can also run in response to socket messages that can come rapidly. </p>



<p>The function done without pre-allocation will take less time to run &#8211; and the difference will stack.</p>



<h2 class="wp-block-heading">Cause and Effect</h2>



<p>In order to understand the cause for these differences, we can profile using the chrome performance tool.</p>



<p>The results of the profiling of the  20000000 array members run is shown in Figure 3.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="198" src="/wp-content/uploads/2020/01/image-8.png" alt="" class="wp-image-192" srcset="/wp-content/uploads/2020/01/image-8.png 1024w, /wp-content/uploads/2020/01/image-8.png 300w, /wp-content/uploads/2020/01/image-8.png 768w, /wp-content/uploads/2020/01/image-8.png 1536w, /wp-content/uploads/2020/01/image-8.png 268w, /wp-content/uploads/2020/01/image-8.png 1736w, /wp-content/uploads/2020/01/image-8.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 3</strong>: <strong>a) </strong>Profiling of <code>buildArray</code>. Bottom yellow rectangles are garbage collection. <strong>b)</strong> Profiling of <code>buildArray2</code>.</figcaption></figure>



<p>Figure 3a shows a long runtime with several garbage collection (GC) cycles.  Multiple garbage collections are an indication for massive and inefficient memory allocation.  Garbage collection happens when the JS engine has some data it does not need anymore and needs to dispose of it.</p>



<p>In our case, what happens is that the function pushes more and more elements into the array.  Javascript needs more space for the array, and thus allocates more memory every few iterations.  </p>



<p>Figure 4 shows that pushing to the array took much more time per iteration than just changing a value in a pre allocated array. That&#8217;s because there was no need to allocate memory during the run.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="460" height="252" src="/wp-content/uploads/2020/01/image-10.png" alt="" class="wp-image-198" srcset="/wp-content/uploads/2020/01/image-10.png 460w, /wp-content/uploads/2020/01/image-10.png 300w, /wp-content/uploads/2020/01/image-10.png 164w" sizes="auto, (max-width: 460px) 100vw, 460px" /><figcaption><strong>Figure 4: </strong>Time spent in each line in the functions (for lines that took more than 0.1ms). Pre allocating the array took less time than pushing into the array.</figcaption></figure></div>



<p>Because we are using an array, the JS engine tries to optimize by maintaining the array as a C++ array. For this, the array must be contiguous in memory.</p>



<p>Because of that, the JS engine keeps allocating and reallocating memory for the whole array every time &#8211; and needs to dispose of the old chunks of memory in the &#8220;old place&#8221;.  This is the garbage collection we see.</p>



<p>Figure 3b shows that if we preallocated the memory beforehand, the JS engine already did the allocation when we started and hence does not need to do the whole reallocation and garbage collection as we go.</p>



<p>What we also learn here is this: if our array size is relatively small and we do not repeat this process a lot, then preallocation might be less performant since the pre-allocation at the beginning will be very costly.</p>



<h2 class="wp-block-heading">Summary</h2>



<p>In this article, we learned what is memory allocation and garbage collection.  </p>



<p>Memory allocation is the process in which the software (in this case, the JS engine) finds room in memory for variables. Garbage collection is the process in which the JS engine removes obsolete data from memory.</p>



<p>Both descriptions here were brief, as the main point was to actually be able to see the effects of the allocation and GC.  </p>



<p>Of course, these two terms that usually go hand in hand have a lot more under the hood and you can read more about them.</p>



<p>I recommend this <a href="https://v8.dev/blog/trash-talk" target="_blank" rel="noopener">really nice article about garbage collection</a>.</p>



<p>You can play around with the demo and see the results for yourself.</p>



<p>Quick question: set the Array Size to 1000 and the iterations to 1 and look at the result in the console. What do you see? Can you explain the result after what we&#8217;ve learned?</p>



<p></p>

