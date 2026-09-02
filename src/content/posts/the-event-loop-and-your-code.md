---
title: The event loop and your code
slug: the-event-loop-and-your-code
published: 2020-03-02T20:45:38
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: The event loop is a core concept in Javascript. It is fundamental in order to understand how asynchronous code works – and how not to work with synchronous code. Let’s start with a simple example. You have some code that is dependent on some variable to exist in memory. As long as it is not [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
tags: []
canonical: https://yonatankra.com/the-event-loop-and-your-code/
comments: []
---


<p>The event loop is a core concept in Javascript.  It is fundamental in order to understand how asynchronous code works &#8211; and how not to work with synchronous code.</p>



<p>Let&#8217;s start with a simple example. You have some code that is dependent on some variable to exist in memory. As long as it is not there, you&#8217;d like the code to retry again.</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist101551668" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-gistfile1-txt" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-text  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="gistfile1.txt content, created by YonatanKra on 05:17AM on March 02, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="gistfile1.txt">
        <tr>
          <td id="file-gistfile1-txt-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-gistfile1-txt-LC1" class="blob-code blob-code-inner js-file-line">function retry() {</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-gistfile1-txt-LC2" class="blob-code blob-code-inner js-file-line">    try {</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-gistfile1-txt-LC3" class="blob-code blob-code-inner js-file-line">        console.log(window.toBe.orNotToBe);</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-gistfile1-txt-LC4" class="blob-code blob-code-inner js-file-line">    } catch(e) {</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-gistfile1-txt-LC5" class="blob-code blob-code-inner js-file-line">        retry();</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-gistfile1-txt-LC6" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-gistfile1-txt-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-gistfile1-txt-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-gistfile1-txt-LC9" class="blob-code blob-code-inner js-file-line">retry();</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-gistfile1-txt-LC10" class="blob-code blob-code-inner js-file-line">// simulate a fetch action from the server</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-gistfile1-txt-LC11" class="blob-code blob-code-inner js-file-line">setTimeout(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-gistfile1-txt-LC12" class="blob-code blob-code-inner js-file-line">    window.toBe = {orNotToBe: &quot;That is the question!&quot;}</td>
        </tr>
        <tr>
          <td id="file-gistfile1-txt-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-gistfile1-txt-LC13" class="blob-code blob-code-inner js-file-line">}, 1000);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/7799aabfb41f6cd8416c9b450c8dd83c/raw/f61ea52d48c7bd44f6fbc9e43d7d2f9196c52ff7/gistfile1.txt" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/7799aabfb41f6cd8416c9b450c8dd83c#file-gistfile1-txt" class="Link--inTextBlock" target="_blank" rel="noopener">
          gistfile1.txt
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The result of this code is the following error:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="539" height="222" src="/wp-content/uploads/2020/03/image.png" alt="" class="wp-image-301" srcset="/wp-content/uploads/2020/03/image.png 539w, /wp-content/uploads/2020/03/image.png 300w, /wp-content/uploads/2020/03/image.png 219w" sizes="auto, (max-width: 539px) 100vw, 539px" /><figcaption><strong>Figure 1</strong>: Our app ran out of space for one sychronous process &#8211; the call stack</figcaption></figure>



<p> One can simply see this error, find out that the solution would be to use some asynchronous mechanism and come out happy.  If you just want the solution, skip the next part.</p>



<p>If you&#8217;d like to learn how this error happens, what is the call stack and what are synchronous and asynchronous events in the browser &#8211; read on.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1e02a09b" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1e02a09b"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/the-event-loop-and-your-code/#Stackoverflow" >Stackoverflow?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/the-event-loop-and-your-code/#What_is_this_call_stack" >What is this call stack?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/the-event-loop-and-your-code/#So_whats_stackoverflow" >So what&#8217;s stackoverflow?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/the-event-loop-and-your-code/#How_does_it_look_in_the_browser" >How does it look in the browser?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/the-event-loop-and-your-code/#The_Solution" >The Solution</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/the-event-loop-and-your-code/#Which_came_first_the_chicken_or_the_egg" >Which came first, the chicken or the egg?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/the-event-loop-and-your-code/#Not_all_asynchronous_processes_were_born_equal" >Not all asynchronous processes were born equal</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/the-event-loop-and-your-code/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Stackoverflow"></span>Stackoverflow?<span class="ez-toc-section-end"></span></h2>



<p>The famous website &#8211; <a href="https://stackoverflow.com/" target="_blank" rel="noreferrer noopener" aria-label="stackoverflow (opens in a new tab)">stackoverflow</a> &#8211; has a funny logo:</p>



<div class="wp-block-image"><figure class="aligncenter is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="https://i0.wp.com/cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon%402.png?resize=108%2C107&#038;ssl=1" alt="Image result for stackoverflow" width="108" height="107"/><figcaption> <strong>Figure </strong>2:  <a rel="noreferrer noopener" aria-label="Stackoverflow  (opens in a new tab)" href="https://stackoverflow.com/" target="_blank">Stackoverflow </a>logo</figcaption></figure></div>



<p>Actually &#8211; the term <code>stack overflow</code> is exactly what happened to our little code. Our function called itself multiple time and filled the call stack &#8211; hence we exceeded the maximum call stack size. We overflowed it with callback calls.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="What_is_this_call_stack"></span>What is this call stack?<span class="ez-toc-section-end"></span></h3>



<p>The call stack is, well&#8230; a stack. A stack is a data structure. It&#8217;s a kind of array that allows us two basic operations: add to the stack and pop the last added value.</p>



<p>When we call a function it is added to the call stack.  When this function calls a function, it is also added to the call stack (let&#8217;s call that called function a child). </p>



<p>When a function finishes running, it is removed from the stack.  Remember that in a stack, we remove only the last added value. If the function has children, it needs to wait until all of them finish. </p>



<p>Here&#8217;s an illustration:</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="So_whats_stackoverflow"></span>So what&#8217;s stackoverflow?<span class="ez-toc-section-end"></span></h3>



<p>Let&#8217;s take what we learned about the call stack. If our function calls itself over and over again, the call stack will never clear. It will just add more and more calls to the same function:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="500" height="281" src="/wp-content/uploads/2020/03/callStack.gif" alt="" class="wp-image-304"/><figcaption> <strong>Figure 3</strong>:  Animated illustration of the call stack in action. Starts with the main function and moves on according to the order of calls.</figcaption></figure></div>



<p>So stack overflow would be the case of a function that calls itself indefinitely:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="500" height="281" src="/wp-content/uploads/2020/03/stackOverFlow.gif" alt="" class="wp-image-305"/><figcaption> <strong>Figure 4</strong>:  Calling the main function recursively without any stop condition</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_does_it_look_in_the_browser"></span>How does it look in the browser?<span class="ez-toc-section-end"></span></h3>



<p>Going back to our retry function, and knowing what we know now about the callstack, we can now understand what&#8217;s the <code>Maximum call stack size exceeded</code> error mean. </p>



<p>The call stack can be seen in the browser and not just in fancy gif illustrtaions.</p>



<p>I run the above code in an HTML page and record using the performance tab. Here are the results:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="364" src="/wp-content/uploads/2020/03/image-1.png" alt="" class="wp-image-302" srcset="/wp-content/uploads/2020/03/image-1.png 1024w, /wp-content/uploads/2020/03/image-1.png 300w, /wp-content/uploads/2020/03/image-1.png 768w, /wp-content/uploads/2020/03/image-1.png 1536w, /wp-content/uploads/2020/03/image-1.png 158w, /wp-content/uploads/2020/03/image-1.png 1728w, /wp-content/uploads/2020/03/image-1.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption> <strong>Figure 5</strong>:  Performance measurement &#8211; the retry function was called 688 times before the stack overflowed</figcaption></figure>



<p>In Figure 5 the retry function is called 688 times (the pink lines). After 688 times, we ran out of call stack space and the app crashed.</p>



<p>Not only our code doesn&#8217;t do what we want &#8211; it crashes. In order to be able to do what we want &#8211; retry periodically until something external happens &#8211; we&#8217;ll need to make our function asynchronous.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Solution"></span>The Solution<span class="ez-toc-section-end"></span></h2>



<p>Making our function asynchronous is quite easy. Using <code> setTimeout </code> can do just that:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist101559361" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-retry-with-settimeout" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-text  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="Retry with setTimeout content, created by YonatanKra on 02:27PM on March 02, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="Retry with setTimeout">
        <tr>
          <td id="file-retry-with-settimeout-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-retry-with-settimeout-LC1" class="blob-code blob-code-inner js-file-line">function retry() {</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-retry-with-settimeout-LC2" class="blob-code blob-code-inner js-file-line">    try {</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-retry-with-settimeout-LC3" class="blob-code blob-code-inner js-file-line">        console.log(window.toBe.orNotToBe);</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-retry-with-settimeout-LC4" class="blob-code blob-code-inner js-file-line">    } catch(e) {</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-retry-with-settimeout-LC5" class="blob-code blob-code-inner js-file-line">        setTimeout(retry, 250);</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-retry-with-settimeout-LC6" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-retry-with-settimeout-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-retry-with-settimeout-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-retry-with-settimeout-LC9" class="blob-code blob-code-inner js-file-line">retry();</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-retry-with-settimeout-LC10" class="blob-code blob-code-inner js-file-line">// simulate a fetch action from the server</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-retry-with-settimeout-LC11" class="blob-code blob-code-inner js-file-line">setTimeout(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-retry-with-settimeout-LC12" class="blob-code blob-code-inner js-file-line">    window.toBe = {orNotToBe: &quot;That is the question!&quot;}</td>
        </tr>
        <tr>
          <td id="file-retry-with-settimeout-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-retry-with-settimeout-LC13" class="blob-code blob-code-inner js-file-line">}, 1000);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/936053e21fd63f0d6d95c5cb46cb3aff/raw/372157ee811af3a4d3061da49a94b9abd52c42d5/Retry%20with%20setTimeout" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/936053e21fd63f0d6d95c5cb46cb3aff#file-retry-with-settimeout" class="Link--inTextBlock" target="_blank" rel="noopener">
          Retry with setTimeout
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>When running this code, after around 1 second, we get <code>That is the question!</code> logged in the console.</p>



<p>Let&#8217;s look at the recording result of this code:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="462" height="167" src="/wp-content/uploads/2020/03/image-2.png" alt="" class="wp-image-306" srcset="/wp-content/uploads/2020/03/image-2.png 462w, /wp-content/uploads/2020/03/image-2.png 300w, /wp-content/uploads/2020/03/image-2.png 249w" sizes="auto, (max-width: 462px) 100vw, 462px" /><figcaption><strong>Figure 6</strong>: Calls to the retry function from the time the process started.  The <code>Function Call</code> parts are calls to <code>retry</code> from inside <code>setTimeout</code>.</figcaption></figure></div>



<p>The results in Figure 6 show that it took around 1 second to run the final call &#8211; which eventually logged the wanted result. In between, we had asynchronous calls to the function in roughly 250ms delay between each call.</p>



<p>We now have our retry mechanism. Problem solved!  </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Which_came_first_the_chicken_or_the_egg"></span>Which came first, the chicken or the egg?<span class="ez-toc-section-end"></span></h2>



<p>We learned about the Call Stack.  With that knowledge, we know how synchronous processes work in Javascript. </p>



<p>What about asynchronous processes, like the one created by <code> setTimeout</code>? Or promises and ajax calls?</p>



<p>Here we go out from the zone of the Call Stack to an area called the Event Loop.</p>



<p>When we set our timeout, what we actually did was ask the system to take the callback given and add it to a callback queue once the timer runs out.</p>



<div class="wp-block-image is-style-default"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="303" src="/wp-content/uploads/2020/03/eventLoop-3.gif" alt="" class="wp-image-313"/><figcaption> <strong>Figure 7</strong>: 1) The process starts with a user click. 2) It then adds the <code>click</code> function to the call stack. 3) <code>click</code> calls <code>asyncCall</code> and <code>syncCall</code>. 4) <code>asyncCall</code> sets the timeout and finishes 5)<code>syncCall</code> sets x to 5 and finishes. 6) Click finishes and removed from the stack 7) around 100ms later, logger is set in the callback queue by setTimeout. </figcaption></figure></div>



<p>Because our <code>click</code> function finishes, it is removed and the event loop now has an empty stack to send <code>logger</code> to once it is set in the callback queue.</p>



<p>If we had more asynchronous events set in between they would be in the callback queue as well &#8211; and our <code>logger</code> might just had to wait a bit longer until they finish and the call stack would be ready for it.</p>



<p>This is, in a nutshell, how asynchronous process come to be.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Not_all_asynchronous_processes_were_born_equal"></span>Not all asynchronous processes were born equal<span class="ez-toc-section-end"></span></h3>



<p>There are types of asynchronous calls. For instance &#8211; there&#8217;s the setTimeout call, promises. I/O (e.g. user interaction) etc. Each has a different priority to enter the Event Loop.</p>



<p>For instance, if we have a callback from a <code>setTimeout</code> and a callback from a resolve <code>Promise</code> &#8211; the <code>Promise</code>&#8216;s callback wins and gets to the call stack first.</p>



<p>I won&#8217;t go into more details than that in this article.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s recap our journey so far:</p>



<ul class="wp-block-list"><li>We wanted to create a retry mechanism to some variable on the global scope (window).</li><li>We saw that naively trying to call a retry function will results in stackoverflow. Hence, our solution was to make the consecutive calls to <code>retry</code> asynchronous.</li><li>We did that using <code>setTimeout</code> and it solved our issue.</li><li>We then explained how asynchronicity is achieved in Javascript &#8211; via the event loop and callback queue.</li></ul>



<p>I hope the mechanism is a bit clearer now. As usual, leave comments below or message me directly if you&#8217;d like to debate over this (or anything else 🙂 ).</p>



<p>Thanks a lot to <a href="https://twitter.com/jodoron" target="_blank" rel="noreferrer noopener" aria-label="Yonatan Doron (opens in a new tab)">Yonatan Doron</a> from <a href="https://hodash.dev/" target="_blank" rel="noreferrer noopener" aria-label="Hodash.dev (opens in a new tab)">Hodash.dev</a> for a thorough review!</p>

