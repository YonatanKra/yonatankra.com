---
title: This is how I helped YouTube improve performance with a simple JavaScript trick
slug: look-ma-my-codes-in-youtube
published: 2020-11-17T19:56:38
updated: 2021-08-10T16:53:37
author: Yonatan Kra
description: "Google’s Material Web Components had a performance issue and I thought I could help. The results: 90% performance improvement in big lists removal. Here’s how I did it, and how you can duplicate it in your application. At Vonage, we are working on a unified UI library called Vivid. A core library we are using [&hellip;]"
categories:
  - name: Coding
    slug: coding
    path: coding
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Open Source
    slug: open-source
    path: open-source
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/look-ma-my-codes-in-youtube/
comments: []
---


<p class="has-cyan-bluish-gray-color has-text-color has-medium-font-size"><strong>Google&#8217;s Material Web Components had a performance issue and I thought I could help. The results: 90% performance improvement in big lists removal. Here&#8217;s how I did it, and how you can duplicate it in your application.</strong></p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="427" src="/wp-content/uploads/2020/11/youTube.jpg" alt="" class="wp-image-593" srcset="/wp-content/uploads/2020/11/youTube.jpg 1024w, /wp-content/uploads/2020/11/youTube.jpg 300w, /wp-content/uploads/2020/11/youTube.jpg 768w, /wp-content/uploads/2020/11/youTube.jpg 1536w, /wp-content/uploads/2020/11/youTube.jpg 135w, /wp-content/uploads/2020/11/youTube.jpg 1920w, /wp-content/uploads/2020/11/youTube.jpg 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>&#8220;Look Ma! My Code&#8217;s IN YouTube!&#8221;. Photo by <a href="https://unsplash.com/@christianw?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Christian Wiediger</a> on <a href="https://unsplash.com/s/photos/youtube?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></figcaption></figure>



<p>At Vonage, we are working on a unified UI library called Vivid.  A core library we are using is Google&#8217;s Material Web Components library (MWC). This library enables us to enjoy best practices like Material design, accessibility and cross-browser compatibility while delivering our components fast to our organisation.</p>



<p>Lately I was integrating the select box in an angular application.  It went well, but after replacing one specific select box, I&#8217;ve noticed a slow in response time.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d508dcc" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d508dcc"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/look-ma-my-codes-in-youtube/#How_to_discover_a_JavaScript_performance_problem" >How to discover a JavaScript performance problem</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/look-ma-my-codes-in-youtube/#Finding_where_the_problem_lies_in_the_JavaScript_code" >Finding where the problem lies in the JavaScript code</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/look-ma-my-codes-in-youtube/#Solving_the_Performance_Issue" >Solving the Performance Issue</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/look-ma-my-codes-in-youtube/#Completing_the_Pull_Request" >Completing the Pull Request</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/look-ma-my-codes-in-youtube/#Finding_my_code_was_going_to_be_on_YouTube" >Finding my code was going to be on YouTube</a></li></ul></nav></div>
<h2 class="has-cyan-bluish-gray-color has-text-color wp-block-heading"><span class="ez-toc-section" id="How_to_discover_a_JavaScript_performance_problem"></span>How to discover a JavaScript performance problem<span class="ez-toc-section-end"></span></h2>



<p>The select box was part of a form that showed up in a modal window. When I closed the modal window, the UI was stuck &#8211; sometimes for around 30 seconds!</p>



<p>Opening the performance tab in Chrome, I&#8217;ve monitored the app and found this:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="360" src="/wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif" alt="" class="wp-image-607" srcset="/wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 1024w, /wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 300w, /wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 768w, /wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 1536w, /wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 160w, /wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 1280w, /wp-content/uploads/2020/11/mwcPerfIssueInAngular.gif 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 1: Results of the close modal event in Vonage.ai&#8217;s angular application. 4 seconds is too long to wait to remove elements from the DOM&#8230;</figcaption></figure>



<p>What we see in Figure 1 is an animation of the modal closing and then around 4 seconds of JavaScript running on&#8230; something.</p>



<p>The difference between the new select I&#8217;ve added and the other selects is the amount of options in the latest select.  There were almost 400 options in this select &#8211; and it clogged the JavaScript thread.</p>



<h2 class="has-cyan-bluish-gray-color has-text-color wp-block-heading"><span class="ez-toc-section" id="Finding_where_the_problem_lies_in_the_JavaScript_code"></span>Finding where the problem lies in the JavaScript code<span class="ez-toc-section-end"></span></h2>



<p>In order to verify the error is not in our application, I&#8217;ve created a simple reproduction of the error in <a rel="noreferrer noopener" href="https://codesandbox.io/s/cool-paper-0k530?fontsize=14&amp;hidenavigation=1&amp;theme=dark" target="_blank">codesandbox</a>. In this short reproduction, I&#8217;ve just created a new select box and added 300 options to it.</p>



<iframe src="https://codesandbox.io/embed/cool-paper-0k530?fontsize=14&amp;hidenavigation=1&amp;theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="cool-paper-0k530" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>



<p>The profiling scenario is simple &#8211; start profiling, click the <code>Clear everything</code> button in the app, stop profiling. As simple as that.</p>



<p>Profiling the app in the sandbox I&#8217;ve found something interesting &#8211; removing 300 list items took around 200 milliseconds in a blank application. That&#8217;s a lot of time to just remove elements from the DOM. Figure 2 shows this performance recording &#8211; and the perliminary result that showed that the <code>updateItems</code> method and its children are the prime suspects.</p>



<figure class="wp-block-image"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/user-images.githubusercontent.com/6459899/97797746-38137180-1c28-11eb-9f1b-4e8447d177c0.png?w=640&#038;ssl=1" alt="image"/><figcaption>Figure 2: Profiling the Sandbox app. The updateItems method and its children from mwc-list-base was taking too long to run.</figcaption></figure>



<p>I&#8217;ve opened <a rel="noreferrer noopener" href="https://github.com/material-components/material-components-web-components/issues/1927" target="_blank">an issue in the MWC repository.</a>  I then started to investigate this farther as we needed a quick fix for our application. After I&#8217;ve fixed it internally (we are extending the MWC classes), I thought I saw a way to solve it in MWC&#8217;s source code.</p>



<h2 class="has-cyan-bluish-gray-color has-text-color wp-block-heading"><span class="ez-toc-section" id="Solving_the_Performance_Issue"></span>Solving the Performance Issue<span class="ez-toc-section-end"></span></h2>



<p>Digging deeper into the recording on sandbox, I saw that one function was called a lot of times: <code>list.layout</code>.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="60" src="/wp-content/uploads/2020/11/image.png" alt="" class="wp-image-610" srcset="/wp-content/uploads/2020/11/image.png 1024w, /wp-content/uploads/2020/11/image.png 300w, /wp-content/uploads/2020/11/image.png 768w, /wp-content/uploads/2020/11/image.png 1536w, /wp-content/uploads/2020/11/image.png 268w, /wp-content/uploads/2020/11/image.png 1919w, /wp-content/uploads/2020/11/image.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 3: Bottom up view showing a setAttribute call originating from layout was causing the issue.</figcaption></figure>



<p>The list&#8217;s <code>layout</code> function was being called by every <code>list-item</code> element.  Looking at the <code>layout</code>&#8216;s code, I saw that there was no real need to run this function for every <code>list-item</code>, as this function just updates the layout of the list after a change.</p>



<p>Because we are making lots of small changes, we can just bulk them into one big change!</p>



<p><a rel="noreferrer noopener" href="https://medium.com/walkme-engineering/web-performance-test-cases-response-time-e7929c8bc8ce" target="_blank">An old article of mine</a> came into mind. In this article, I&#8217;ve shown how to solve a similar problem, using a <code>debounced</code> method.</p>



<p>Armed with the general solution and the automated way to test it, I dove into the code. I first wrote a test that should verify my solution is working (code snippet 1).</p>



<figure class="wp-block-table"><table><tbody><tr><td><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106446465" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-test-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="test.js content, created by YonatanKra on 08:32AM on November 15, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="test.js">
        <tr>
          <td id="file-test-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-test-js-LC1" class="blob-code blob-code-inner js-file-line">suite(&#39;performance issue&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-test-js-LC2" class="blob-code blob-code-inner js-file-line">  test(</td>
        </tr>
        <tr>
          <td id="file-test-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-test-js-LC3" class="blob-code blob-code-inner js-file-line">      &#39;removing a list should not call layout more than once&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-test-js-LC4" class="blob-code blob-code-inner js-file-line">        let count = 0;</td>
        </tr>
        <tr>
          <td id="file-test-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-test-js-LC5" class="blob-code blob-code-inner js-file-line">        const originalLayout = List.prototype.layout;</td>
        </tr>
        <tr>
          <td id="file-test-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-test-js-LC6" class="blob-code blob-code-inner js-file-line">        List.prototype.layout = function(update) {</td>
        </tr>
        <tr>
          <td id="file-test-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-test-js-LC7" class="blob-code blob-code-inner js-file-line">          originalLayout.call(this, update);</td>
        </tr>
        <tr>
          <td id="file-test-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-test-js-LC8" class="blob-code blob-code-inner js-file-line">          count++;</td>
        </tr>
        <tr>
          <td id="file-test-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-test-js-LC9" class="blob-code blob-code-inner js-file-line">        };</td>
        </tr>
        <tr>
          <td id="file-test-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-test-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-test-js-LC11" class="blob-code blob-code-inner js-file-line">        const itemsTemplates = new Array(100).fill(0).map(() =&gt; listItem());</td>
        </tr>
        <tr>
          <td id="file-test-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-test-js-LC12" class="blob-code blob-code-inner js-file-line">        fixt = await fixture(listTemplate({items: itemsTemplates}));</td>
        </tr>
        <tr>
          <td id="file-test-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-test-js-LC13" class="blob-code blob-code-inner js-file-line">        element = fixt.root.querySelector(&#39;mwc-list&#39;)!;</td>
        </tr>
        <tr>
          <td id="file-test-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-test-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-test-js-LC15" class="blob-code blob-code-inner js-file-line">        count = 0;</td>
        </tr>
        <tr>
          <td id="file-test-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-test-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-test-js-LC17" class="blob-code blob-code-inner js-file-line">        fixt.remove();</td>
        </tr>
        <tr>
          <td id="file-test-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-test-js-LC18" class="blob-code blob-code-inner js-file-line">        await element.updateComplete;</td>
        </tr>
        <tr>
          <td id="file-test-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-test-js-LC19" class="blob-code blob-code-inner js-file-line">        fixt = null;</td>
        </tr>
        <tr>
          <td id="file-test-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-test-js-LC20" class="blob-code blob-code-inner js-file-line">        assert.equal(</td>
        </tr>
        <tr>
          <td id="file-test-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-test-js-LC21" class="blob-code blob-code-inner js-file-line">            count,</td>
        </tr>
        <tr>
          <td id="file-test-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-test-js-LC22" class="blob-code blob-code-inner js-file-line">            1,</td>
        </tr>
        <tr>
          <td id="file-test-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-test-js-LC23" class="blob-code blob-code-inner js-file-line">            &#39;list.layout ran more than once while it shouldn\&#39;t have&#39;);</td>
        </tr>
        <tr>
          <td id="file-test-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-test-js-LC24" class="blob-code blob-code-inner js-file-line">        List.prototype.layout = originalLayout;</td>
        </tr>
        <tr>
          <td id="file-test-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-test-js-LC25" class="blob-code blob-code-inner js-file-line">      });</td>
        </tr>
        <tr>
          <td id="file-test-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-test-js-LC26" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/12dd835dd168013c956bef8e98c12f5b/raw/b6f4716671a1b44b02a4482ffefd898ba879c8db/test.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/12dd835dd168013c956bef8e98c12f5b#file-test-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          test.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</td></tr></tbody></table><figcaption>Code snippet 1: Performance test for the list&#8217;s layout function. Since we&#8217;d like to debounce it, we&#8217;d expect it to run only once even though it has many children.</figcaption></figure>



<p>After writing the code, I made sure the test has failed for the right reasons &#8211; the method ran 100 times instead of the expected 1 time. Cool!</p>



<p>And now to the fix &#8211; I&#8217;ve created a debounce function for the layout, and used it instead of the original layout inside the <code>list-item</code>. </p>



<p>Here&#8217;s the performance result:</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/11/beforeAfterMWCList.png" alt="" class="wp-image-639" width="507" height="232" srcset="/wp-content/uploads/2020/11/beforeAfterMWCList.png 494w, /wp-content/uploads/2020/11/beforeAfterMWCList.png 300w, /wp-content/uploads/2020/11/beforeAfterMWCList.png 197w" sizes="auto, (max-width: 507px) 100vw, 507px" /><figcaption>Figure 4: The remove operation before the change (left) and after the change (right).  An improvement of 90% in performance.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Completing_the_Pull_Request"></span>Completing the Pull Request<span class="ez-toc-section-end"></span></h2>



<p>After solving the main issue, there were some small tasks that popped up. Internal automated processes (like linting) were failing and I had to cope with that.</p>



<p>I really enjoyed the process. Because of time differences, I worked on a fix during the day, and at around 5am had another message from the reviewer about the status. I was eagerly waiting for these messages &#8211; the whole process was positive and constructive.</p>



<p>I had to make some non-performance changes too. Because the debounced method is now async, I had to add a promise to the element&#8217;s <code>updateComplete</code> life cycle hook. In addition, apparently there were some hidden tests on IE that we not passing (IE took much longer than chrome and the testing framework&#8217;s timeout was not enough&#8230;).</p>



<p>After all was well and done, my PR was complete and ready for google.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="306" height="85" src="/wp-content/uploads/2020/11/image-1.png" alt="" class="wp-image-613" srcset="/wp-content/uploads/2020/11/image-1.png 306w, /wp-content/uploads/2020/11/image-1.png 300w, /wp-content/uploads/2020/11/image-1.png 268w" sizes="auto, (max-width: 306px) 100vw, 306px" /><figcaption>Figure 5: My PR, ready for google&#8230; My mom hanged this in her living room.</figcaption></figure></div>



<h2 class="has-cyan-bluish-gray-color has-text-color wp-block-heading"><span class="ez-toc-section" id="Finding_my_code_was_going_to_be_on_YouTube"></span>Finding my code was going to be on YouTube<span class="ez-toc-section-end"></span></h2>



<p>But it is wasn&#8217;t over yet.  The day after, I&#8217;ve got the following message from the reviewer:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="90" src="/wp-content/uploads/2020/11/image-2.png" alt="" class="wp-image-614" srcset="/wp-content/uploads/2020/11/image-2.png 853w, /wp-content/uploads/2020/11/image-2.png 300w, /wp-content/uploads/2020/11/image-2.png 768w, /wp-content/uploads/2020/11/image-2.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 6: What, wait? What did you say? Youtube&#8217;s gonna use my code?!? Mom!!! There&#8217;s a new picture for the living room!</figcaption></figure>



<p>How cool is that?</p>



<p>Now I feel really good studying 10 years in the University. It really paid up, that after 10 years of hard studies, I switched to JavaScript completely! 😉</p>



<p>I hope you enjoyed this one as much as I did. If you are a new open source contributor, do not be intimidated by big projects. Sometimes, the smallest detail (like this simple debounce contribution) can make a big difference!</p>



<p>You can view the full PR here: <a rel="noreferrer noopener" href="https://github.com/material-components/material-components-web-components/pull/1928" target="_blank">https://github.com/material-components/material-components-web-components/pull/1928</a></p>



<p>Thanks to <a href="https://dolevoper.io/" target="_blank" rel="noreferrer noopener">Omer Dolev</a> from Microsoft for the kind review.</p>

