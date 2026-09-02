---
title: What is a Forced Reflow and How to Solve it?
slug: layout-reflow
published: 2020-03-11T18:05:34
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: Force reflow (or Layout Reflow) is a major performance bottleneck. It happens when a measurement of the DOM happens after a DOM mutation. With this knowledge, I was able to improve performance of an app in my workplace by 75%. Read on to understand how. The browser is a wondrous thing. We give it JS, [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: javascript engine
    slug: javascript-engine
    path: javascript/javascript-engine
  - name: Performance
    slug: performance
    path: performance
tags:
  - javascript
  - layout
  - performance
canonical: https://yonatankra.com/layout-reflow/
comments: []
---

<p class="has-medium-font-size">Force reflow (or Layout Reflow) is a major performance bottleneck. It happens when a measurement of the DOM happens after a DOM mutation. With this knowledge, I was able to improve performance of an app in my workplace by 75%.  Read on to understand how. </p>



<figure class="wp-block-image"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/i.imgflip.com/3rcdx5.jpg?w=640&#038;ssl=1" alt=""/></figure>



<p>The browser is a wondrous thing. We give it JS, HTML and CSS &#8211; and they are translated into visual wonders.  It does it by running the same rendering cycle again and again. Sometimes, something in the cycle can go wrong. Layout reflow is one of those things.</p>



<p>I wrote about <a href="/viewing-the-critical-rendering-path-in-the-browser/">the Critical Rendering Path (CRP) in a former article</a>. In a nutshell, the regular flow of the code in the browser is this:</p>



<figure class="wp-block-image"><img decoding="async" src="https://docs.google.com/drawings/u/0/d/sMcBy1m2RlD5Clzo4clAj6Q/image?w=624&amp;h=55&amp;rev=193&amp;ac=1&amp;parent=1bYIH6w43Jesje6NDEuijKq3ytzKsCtnwbwhQO1H0-LU" alt=""/><figcaption> <strong>Figure 1</strong>: The healthy CRP diagram</figcaption></figure>



<p>Forced Reflow is a disturbance in the force&#8230; sorry&#8230; in the flow. That means that we force a later stage (layout) into our javascript. </p>



<p>A reflow looks more like this:</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh3.googleusercontent.com/MHuNMY_VDaxfmPYJdFeMy1CXpQxnqt-7W2uPxtqgzwgp1c98IoT9YFWJqiwe0D8iM-CEiPSMyAHtDTbDhqnU9HEZCTW6Qm63X-k3gVhIdcaJ0LaD6tIBOvv5GhQb0sXAeLvcvDvN" alt=""/><figcaption><strong>Figure 2</strong>: The CRP diagram for a reflow</figcaption></figure>



<p>Figure 2 illustrates a reflow. The Javascript code caused the browser to initiate style and layout calculations during its run. </p>



<p>The calculations were done, and the Javascript continued until it finished. The rest of the flow runs then.</p>



<p>Besides the fact we might run costly style and layout calculations twice &#8211; our javascript now takes much longer to run.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1dec24a1" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1dec24a1"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/layout-reflow/#How_forced_reflow_is_created" >How forced reflow is created?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/layout-reflow/#Exercise_%E2%80%93_Create_a_Forced_Reflow" >Exercise &#8211; Create a Forced Reflow</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/layout-reflow/#How_to_Solve_Forced_Reflow" >How to Solve Forced Reflow?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/layout-reflow/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_forced_reflow_is_created"></span><strong>How forced reflow is created?</strong><span class="ez-toc-section-end"></span></h2>



<p>When you query the DOM for size or position, the result is usually taken from former calculations.&nbsp; The browser knows how the DOM looks like, and if it knows it didn’t change, it just gets the correct value from the <strong>layout cache</strong> (created in the former calculation).</p>



<figure class="wp-block-table"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Querying the DOM is called: Measure.</strong></td></tr></tbody></table></figure>



<p>Now, let’s assume you are changing the DOM. Appending elements, changing height/width or position of elements etc.</p>



<figure class="wp-block-table"><table><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Changing the DOM is called: Mutate.</strong></td></tr></tbody></table></figure>



<p>After you are changing the DOM, the browser flags its layout cache as invalid and schedules a recalculation.&nbsp; If you <em>measure </em>the size or position of an element at this stage, the browser needs to recalculate the whole DOM in order to give you the real answer.</p>



<p>The reflow happens when during Javascript we mutate the DOM and then measure it. For instance, in the code below, we change the height of an element and then query its height.</p>



<pre class="wp-block-code"><code>element.style('height', 500);
console.log(element.style('height'));</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Exercise_%E2%80%93_Create_a_Forced_Reflow"></span>Exercise &#8211; Create a Forced Reflow<span class="ez-toc-section-end"></span></h2>



<p>In this exercise you will see an example for Forced reflow while executing JavaScript.</p>



<ol class="wp-block-list"><li>Clone the following repository: <a href="https://github.com/YonatanKra/performanceWorkshop" target="_blank" rel="noopener">https://github.com/YonatanKra/performanceWorkshop<br></a><strong><em>git clone </em></strong><a href="https://github.com/YonatanKra/performanceWorkshop" target="_blank" rel="noopener"><strong><em>https://github.com/YonatanKra/performanceWorkshop</em></strong></a></li><li>Type: <strong><em>checkout layout-reflow-1</em></strong></li><li>Run <strong><em>yarn</em></strong><strong> or <em>npm i</em></strong></li><li>Run <strong><em>yarn demo or npm run demo</em></strong></li><li>Open the app in the browser: <a href="http://localhost:3000" target="_blank" rel="noopener">http://localhost:3000</a></li><li>Query the server (just use the input field at the top)</li><li>Start monitoring</li><li>Click the sorting buttons</li><li>Stop the recording</li></ol>



<p>A short TL;DC (too long, didn&#8217;t clone) &#8211; the app queries a list of users from a server. It then allows you to sort the users by their ID or name. </p>



<p>Here’s the result of the sorting scenario described above:</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh3.googleusercontent.com/vCn1m1hqZe1CzvORgzVpVKflQNqm3vrDZ_F65q-DWlvB6TZn54goisHACcvFiaCGsryudD5icD1gCQv0_YJ1vrcKHfNqvAEfcXXlKB69XtPW-3RtrnlCZcV64GxrDjV_JOFmEr2E" alt=""/><figcaption><strong>Figure 3:</strong> Layout reflow monitoring result. Purple part under the yellow javascript part is the reflow.</figcaption></figure>



<p>You can see that the style and layout parts (the purple part) are now inside the javascript part &#8211; causing it to run longer. That’s the reflow!</p>



<p>Let’s compare it to the CRP recording of a reflow-free code:</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh6.googleusercontent.com/yPb986T10M0ftFEe-D7ROvU_AzS3w5pqu-25hR0W_X48MWGd2kXKYNBLbbwvQMl_pqe2lNapJ2zcesGJy43wRGCEojzoQnCLg2ee6nPYe0dvziRmnj5ElYgr54lwfuWj6q0X50hJ" alt=""/><figcaption><strong>Figure 4: </strong>A &#8220;healthy&#8221; CRP recording as shown  <a href="/viewing-the-critical-rendering-path-in-the-browser/">in a former article</a>  </figcaption></figure>



<p>You can see that the style and layout parts start after the javascript finished running.</p>



<p>The reflow in Figure 3 happens because a simple line that was added to the code. In the <strong>data-table.component.js</strong> file:</p>



<figure class="wp-block-table"><table><tbody><tr><td><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106477944" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-forcedreflowexample-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="forcedReflowExample.js content, created by YonatanKra on 05:48AM on November 17, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="forcedReflowExample.js">
        <tr>
          <td id="file-forcedreflowexample-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-forcedreflowexample-js-LC1" class="blob-code blob-code-inner js-file-line">refreshData(data, clear = false) {</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-forcedreflowexample-js-LC2" class="blob-code blob-code-inner js-file-line">    if (!clear) {...} else {...}</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-forcedreflowexample-js-LC3" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-forcedreflowexample-js-LC4" class="blob-code blob-code-inner js-file-line">    data.forEach(datum =&gt; {</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-forcedreflowexample-js-LC5" class="blob-code blob-code-inner js-file-line">        const element = document.createElement(&#39;data-table-row&#39;);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-forcedreflowexample-js-LC6" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;name&#39;, datum.name);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-forcedreflowexample-js-LC7" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;id&#39;, datum.id);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-forcedreflowexample-js-LC8" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;email&#39;, datum.email);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-forcedreflowexample-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-forcedreflowexample-js-LC10" class="blob-code blob-code-inner js-file-line">        this._dataTable.prepend(element);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-forcedreflowexample-js-LC11" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-forcedreflowexample-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-forcedreflowexample-js-LC13" class="blob-code blob-code-inner js-file-line">    DataApp.emitEvent(this, &#39;refreshed-data&#39;, {</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-forcedreflowexample-js-LC14" class="blob-code blob-code-inner js-file-line">        scrollHeight: this._dataTable.scrollHeight</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-forcedreflowexample-js-LC15" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-forcedreflowexample-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-forcedreflowexample-js-LC16" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/ce8d0578469b1c06a98d48f62192f8ec/raw/0f209704e32f5e64a9845d0be08a0775c10746e0/forcedReflowExample.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/ce8d0578469b1c06a98d48f62192f8ec#file-forcedreflowexample-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          forcedReflowExample.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</td></tr></tbody></table><figcaption>Code snippet 1: The method refreshData measures the DOM in line 41 (scrollHeight) which initiates layout calculation (reflow).</figcaption></figure>



<p>Line 13 in the <strong>code snippet #1</strong> emits an event when we finish loading the data. Inside, it measures the DOM and sends the updated scrollHeight (line 14). An innocent product demand, right?</p>



<p>The problem arises from the fact that line 4 starts the process of adding elements to the DOM (mutating the DOM). When the emit event function queries the DOM (line 14), the Layout Cache is invalid, and a layout calculation is initiated during our JavaScript run (and forces a reflow of the layout).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Solve_Forced_Reflow"></span>How to Solve Forced Reflow?<span class="ez-toc-section-end"></span></h2>



<p>Solving a Forced Reflow is usually straight forward. You just need to avoid a DOM measurement after a DOM mutation in the same CRP.</p>



<p>One way to do it is to just switch places between the measurement and the mutation. For instance code snippet 2: </p>



<figure class="wp-block-table"><table><tbody><tr><td><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106478038" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-forcedreflowsyncsolution-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="forcedReflowSyncSolution.js content, created by YonatanKra on 05:59AM on November 17, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="forcedReflowSyncSolution.js">
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-forcedreflowsyncsolution-js-LC1" class="blob-code blob-code-inner js-file-line">refreshData(data, clear = false) {</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-forcedreflowsyncsolution-js-LC2" class="blob-code blob-code-inner js-file-line">    DataApp.emitEvent(this, &#39;refreshed-data&#39;, {</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-forcedreflowsyncsolution-js-LC3" class="blob-code blob-code-inner js-file-line">        scrollHeight: this._dataTable.scrollHeight</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-forcedreflowsyncsolution-js-LC4" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-forcedreflowsyncsolution-js-LC5" class="blob-code blob-code-inner js-file-line">  </td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-forcedreflowsyncsolution-js-LC6" class="blob-code blob-code-inner js-file-line">    if (!clear) {...} else {...}</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-forcedreflowsyncsolution-js-LC7" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-forcedreflowsyncsolution-js-LC8" class="blob-code blob-code-inner js-file-line">    data.forEach(datum =&gt; {</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-forcedreflowsyncsolution-js-LC9" class="blob-code blob-code-inner js-file-line">        const element = document.createElement(&#39;data-table-row&#39;);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-forcedreflowsyncsolution-js-LC10" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;name&#39;, datum.name);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-forcedreflowsyncsolution-js-LC11" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;id&#39;, datum.id);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-forcedreflowsyncsolution-js-LC12" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;email&#39;, datum.email);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-forcedreflowsyncsolution-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-forcedreflowsyncsolution-js-LC14" class="blob-code blob-code-inner js-file-line">        this._dataTable.prepend(element);</td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-forcedreflowsyncsolution-js-LC15" class="blob-code blob-code-inner js-file-line">    }); </td>
        </tr>
        <tr>
          <td id="file-forcedreflowsyncsolution-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-forcedreflowsyncsolution-js-LC16" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/009ced262a606138924dcfe622a958e0/raw/1684fb6878fa77e98021473ff4ea065a6a36b190/forcedReflowSyncSolution.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/009ced262a606138924dcfe622a958e0#file-forcedreflowsyncsolution-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          forcedReflowSyncSolution.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</td></tr></tbody></table><figcaption><strong>Code snippet 2: </strong>The same code from code snippet 1 without the reflow.</figcaption></figure>



<p>Code snippet 2, while solving the forced reflow, is not so useful.  We are sending an obsolete scroll height measurement in our event &#8211; even before the data was set on screen.</p>



<p>A more robust solution would be to defer the measurement to a future CRP.  This can be done using <code>setTimeout</code> or <code>requestAnimationFrame</code>.</p>



<p>For instance Code snippet 3:</p>



<figure class="wp-block-table"><table><tbody><tr><td><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106478165" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-forcedlayoutasyncsolution-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="forcedLayoutAsyncSolution.js content, created by YonatanKra on 06:10AM on November 17, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="forcedLayoutAsyncSolution.js">
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC1" class="blob-code blob-code-inner js-file-line">refreshData(data, clear = false) {</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC2" class="blob-code blob-code-inner js-file-line">    if (!clear) {...} else {...}</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC3" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC4" class="blob-code blob-code-inner js-file-line">    data.forEach(datum =&gt; {</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC5" class="blob-code blob-code-inner js-file-line">        const element = document.createElement(&#39;data-table-row&#39;);</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC6" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;name&#39;, datum.name);</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC7" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;id&#39;, datum.id);</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC8" class="blob-code blob-code-inner js-file-line">        element.setAttribute(&#39;email&#39;, datum.email);</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC10" class="blob-code blob-code-inner js-file-line">        this._dataTable.prepend(element);</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC11" class="blob-code blob-code-inner js-file-line">    }); </td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC12" class="blob-code blob-code-inner js-file-line">                            </td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC13" class="blob-code blob-code-inner js-file-line">    requestAnimationFrame(() =&gt; DataApp.emitEvent(this, &#39;refreshed-data&#39;, {</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC14" class="blob-code blob-code-inner js-file-line">        scrollHeight: this._dataTable.scrollHeight</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC15" class="blob-code blob-code-inner js-file-line">    }));</td>
        </tr>
        <tr>
          <td id="file-forcedlayoutasyncsolution-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-forcedlayoutasyncsolution-js-LC16" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/5a7dc633353f9695176c005dda01f0e0/raw/3500ec7a7f7f9590cdc4079ae750ee7b176ed387/forcedLayoutAsyncSolution.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/5a7dc633353f9695176c005dda01f0e0#file-forcedlayoutasyncsolution-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          forcedLayoutAsyncSolution.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</td></tr></tbody></table><figcaption><strong>Code snippet 3:</strong> The async solution to forced reflow</figcaption></figure>



<p>Both code snippet 3 and code snippet 1 send the measurement after the DOM changes have been made.  The difference is that code snippet 3 does that in the end of the CRP cycle, and then it uses the <strong>layout cache</strong> instead of recalculating it during the CRP cycle.</p>



<p>Figure 5 shows that we have managed to avoid forced layout by deferring the <code>emitEvent</code> call and the measurement to after the layout phase was complete..</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="112" src="/wp-content/uploads/2020/11/image-3.png" alt="" class="wp-image-693" srcset="/wp-content/uploads/2020/11/image-3.png 1024w, /wp-content/uploads/2020/11/image-3.png 300w, /wp-content/uploads/2020/11/image-3.png 768w, /wp-content/uploads/2020/11/image-3.png 1536w, /wp-content/uploads/2020/11/image-3.png 268w, /wp-content/uploads/2020/11/image-3.png 1783w, /wp-content/uploads/2020/11/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 5:</strong> A recording of the forced layout async solution.  The <code>emitEvent</code> function is called after all the layout calculations have been made because it was deferred by <code>requestAnimationFrame</code>. </figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Layout reflow happens when we measure the DOM after we mutate it. It has severe performance implications and should be avoided as much as possible.</p>



<p>In this article, we saw an example for a code that has forced reflow and how to solve forced reflow.</p>



<p>If watching short videos fits you, I&#8217;ve created <a rel="noreferrer noopener" aria-label="several Egghead videos (opens in a new tab)" href="http://bit.ly/crp-egghead-collection" target="_blank">several Egghead videos</a> about the subject including solutions for layout reflow usecases.  Each video is around 1-2 minutes, so you can definitely just check it out 🙂</p>



<p>Thanks a lot for <a href="https://www.linkedin.com/mwlite/in/hod-bauer-9786133b" target="_blank" rel="noreferrer noopener" aria-label="Hod Bauer (opens in a new tab)">Hod Bauer</a> for his thorough review of this article!</p>

