---
title: How to test HTML5 canvas with jest?
slug: how-to-test-html5-canvas-with-jest
published: 2021-08-04T16:35:31
updated: 2021-12-12T19:40:09
author: Yonatan Kra
description: In this short article you will learn what you need to install in order to prepare a test environment for canvas operations with jest. After finishing the article, you will be ready for some canvas testing action! In the past few months, my kid and I been building HTML5 games. I’d might actually get you [&hellip;]
categories:
  - name: canvas
    slug: canvas
    path: javascript/canvas
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Testing
    slug: testing
    path: testing
tags:
  - canvas
  - javascript
  - jest
  - testing
canonical: https://yonatankra.com/how-to-test-html5-canvas-with-jest/
comments:
  - author: Douglas Counts
    date: 2023-12-02T20:53:14
    content: |
      <p>This article is great but is dated on one very specific important point, so you may still get the &#8220;ReferenceError: Path2D is not defined&#8221; error.</p>
      <p>But the fix is easy.</p>
      <p>For the last several years, Jest by default is using the node environment, not the JSdom environment anymore. </p>
      <p>So what you do is add <code>"testEnvironment": "jsdom",</code> to the top of the <code>jest</code> section of the <code>package.json</code> file.  Problem solved.</p>
      <p>&#8220;jest&#8221;: {<br />
          &#8220;testEnvironment&#8221;: &#8220;jsdom&#8221;,<br />
          &#8220;setupFiles&#8221;: [&#8220;jest-canvas-mock&#8221;]<br />
        }</p>
      <p>You may also need to install as a developer dependency, the library <code>jest-environment-jsdom</code>, but I didn&#8217;t need to do that.</p>
      <p>These suggestions are from the issues section of the GitHub for this article as posted by Mariusz Leśniak.</p>
  - author: Douglas Counts
    date: 2023-12-02T21:28:04
    content: |
      <p>As of Jest 28, &#8220;jest-environment-jsdom&#8221; is no longer shipped by default, make sure to install it separately.  If you just download the files from the GitHub which uses Jest version 27, all you need to do is add the one line to the <code>package.json</code> file like so:</p>
      <p>&#8220;jest&#8221;: {<br />
          &#8220;testEnvironment&#8221;: &#8220;jsdom&#8221;,<br />
          &#8220;setupFiles&#8221;: [<br />
            &#8220;jest-canvas-mock&#8221;<br />
          ]<br />
        },</p>
featuredImage: /wp-content/uploads/2021/08/jest-on-canvas.jpeg
---

<p class="has-medium-font-size">In this short article you will learn what you need to install in order to prepare a test environment for canvas operations with jest. After finishing the article, you will be ready for some canvas testing action!</p>



<p>In the past few months, my kid and I been building HTML5 games. I&#8217;d might actually get you permission to sign an NDA to see the outcome of these sessions. Until then, I can share some of my experience from meddling in the world of Context2D&#8230; </p>



<p>Since my son and I are both keen on testing, we struggled with testing canvas operations using Jest. Jest is using JSDom, which doesn&#8217;t implement EVERYTHING available in the browser. In addition, we had some issues using <code>ES6 imports</code>.</p>


<p>How did we solve all this? In one word. Google. In many words&#8230; <img data-recalc-dims="1" loading="lazy" decoding="async" class="" src="https://i0.wp.com/static.thenounproject.com/png/180638-200.png?resize=34%2C34&#038;ssl=1" alt="Point Down Icon" width="34" height="34"></p>


<div class="wp-block-group tldr"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1cea07f8" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1cea07f8"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-test-html5-canvas-with-jest/#TLDR" >TL;DR</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-test-html5-canvas-with-jest/#How_to_build_a_test_environment_for_canvas_with_Jest" >How to build a test environment for canvas with Jest</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-test-html5-canvas-with-jest/#Installing_Jest" >Installing Jest</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-test-html5-canvas-with-jest/#Writing_our_first_test_and_code" >Writing our first test and code</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-test-html5-canvas-with-jest/#How_to_allow_ES6_imports_in_Jest" >How to allow ES6 imports in Jest?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-test-html5-canvas-with-jest/#How_to_solve_ReferenceError_Path2D_is_not_defined" >How to solve ReferenceError: Path2D is not defined</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-test-html5-canvas-with-jest/#How_to_test_canvas_operations_with_Jest" >How to test canvas operations with Jest?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-test-html5-canvas-with-jest/#How_to_test_DOMMatrix_operations_with_Jest" >How to test DOMMatrix operations with Jest</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-test-html5-canvas-with-jest/#Solving_TypeError_MATRIXtranslate_is_not_a_function" >Solving TypeError: MATRIX.translate is not a function</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-test-html5-canvas-with-jest/#Should_we_use_toMatchSnapshot_calls" >Should we use toMatchSnapshot calls?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-test-html5-canvas-with-jest/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="TLDR"></span>TL;DR<span class="ez-toc-section-end"></span></h2>



<ul class="wp-block-list"><li>Trying to work with Path2D will resolve in an error:  <code>ReferenceError: Path2D is not defined</code>.  You can solve it this way:</li></ul>



<ol class="wp-block-list"><li>Install <code>jest</code>, <code>canvas</code> and <code>jest-canvas-mock</code></li><li>Add a setup file to the jest configuration:<br><code><br>"jest": {</code><br>   <code> "setupFiles": ["jest-canvas-mock"]</code><br><code>}<br></code></li><li>Run your tests.</li></ol>



<hr class="wp-block-separator"/>



<ul class="wp-block-list"><li>You can also <code>spy</code> on your canvas functions with <a rel="noreferrer noopener" href="https://github.com/hustcc/jest-canvas-mock#snapshots" data-type="URL" data-id="https://github.com/hustcc/jest-canvas-mock#snapshots" target="_blank">the following canvas mock methods on the 2d context</a>. <a rel="noreferrer noopener" href="https://gist.github.com/YonatanKra/3240fa72ce9668ef24d2cbe44f6ac700" data-type="URL" data-id="https://gist.github.com/YonatanKra/3240fa72ce9668ef24d2cbe44f6ac700" target="_blank">Example</a>.</li></ul>



<hr class="wp-block-separator"/>



<ul class="wp-block-list"><li>Trying to work with DOMMatrix will resolve in an error: <code>TypeError: MATRIX.translate is not a function</code>.  You can solve it this by <a rel="noreferrer noopener" href="https://gist.github.com/YonatanKra/b037c8504f2db6443ce2ea252e916894" data-type="URL" data-id="https://gist.github.com/YonatanKra/b037c8504f2db6443ce2ea252e916894" target="_blank">extending the DOMMatrix mock</a> or use the newest version of the package (this <a href="https://youtu.be/V0GL2rDWbD0?t=301" data-type="URL" data-id="https://youtu.be/V0GL2rDWbD0?t=301" target="_blank" rel="noopener">PR</a> solved it).</li></ul>
</div></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_build_a_test_environment_for_canvas_with_Jest"></span>How to build a test environment for canvas with Jest<span class="ez-toc-section-end"></span></h2>



<p>Building something with HTML5 canvas is fun. Testing with Jest is a pleasure. Let&#8217;s give it a try!</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>If you want to code along, feel free to fork/clone <a href="https://github.com/YonatanKra/testing-canvas-with-jest/" data-type="URL" data-id="https://github.com/YonatanKra/testing-canvas-with-jest/" target="_blank" rel="noreferrer noopener">the repository</a> and checkout the steps tags (<code>step-1</code> to <code>step-6</code>).</p></blockquote>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Installing_Jest"></span>Installing Jest<span class="ez-toc-section-end"></span></h3>



<p>We will start with an HTML and JS file in our repository: <a href="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-1" target="_blank" rel="noreferrer noopener">https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-1</a></p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="229" height="146" src="/wp-content/uploads/2021/08/image.png" alt="" class="wp-image-871" srcset="/wp-content/uploads/2021/08/image.png 229w, /wp-content/uploads/2021/08/image.png 141w" sizes="auto, (max-width: 229px) 100vw, 229px" /><figcaption>The first files in our repository</figcaption></figure></div>



<p>Our next step would be to install the dependencies needed to start testing.  Let&#8217;s install <code>Jest</code>:</p>



<ol class="wp-block-list"><li>Run <code>npm init</code> in order to generate a <code>package.json</code> file.</li><li>Now we can install jest: <code>npm install jest -D</code></li></ol>



<p>Our <code>package.json</code> should now look like this: </p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066140" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-package-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="package.json content, created by YonatanKra on 04:28AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="package.json">
        <tr>
          <td id="file-package-json-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-package-json-LC1" class="blob-code blob-code-inner js-file-line">{</td>
        </tr>
        <tr>
          <td id="file-package-json-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-package-json-LC2" class="blob-code blob-code-inner js-file-line">  &quot;name&quot;: &quot;testing-canvas-with-jest&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-package-json-LC3" class="blob-code blob-code-inner js-file-line">  &quot;version&quot;: &quot;1.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-package-json-LC4" class="blob-code blob-code-inner js-file-line">  &quot;description&quot;: &quot;Showing how to test canvas with jest&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-package-json-LC5" class="blob-code blob-code-inner js-file-line">  &quot;main&quot;: &quot;index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-package-json-LC6" class="blob-code blob-code-inner js-file-line">  &quot;scripts&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-package-json-LC7" class="blob-code blob-code-inner js-file-line">    &quot;test&quot;: &quot;jest&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-package-json-LC8" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-package-json-LC9" class="blob-code blob-code-inner js-file-line">  &quot;repository&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-package-json-LC10" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;git&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-package-json-LC11" class="blob-code blob-code-inner js-file-line">    &quot;url&quot;: &quot;git+https://github.com/YonatanKra/testing-canvas-with-jest.git&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-package-json-LC12" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-package-json-LC13" class="blob-code blob-code-inner js-file-line">  &quot;keywords&quot;: [</td>
        </tr>
        <tr>
          <td id="file-package-json-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-package-json-LC14" class="blob-code blob-code-inner js-file-line">    &quot;jest&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-package-json-LC15" class="blob-code blob-code-inner js-file-line">    &quot;canvas&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-package-json-LC16" class="blob-code blob-code-inner js-file-line">    &quot;javascript&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-package-json-LC17" class="blob-code blob-code-inner js-file-line">  ],</td>
        </tr>
        <tr>
          <td id="file-package-json-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-package-json-LC18" class="blob-code blob-code-inner js-file-line">  &quot;author&quot;: &quot;YonatanKra &lt;kra.yonatan@gmail.com&gt;&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-package-json-LC19" class="blob-code blob-code-inner js-file-line">  &quot;license&quot;: &quot;MIT&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-package-json-LC20" class="blob-code blob-code-inner js-file-line">  &quot;bugs&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-package-json-LC21" class="blob-code blob-code-inner js-file-line">    &quot;url&quot;: &quot;https://github.com/YonatanKra/testing-canvas-with-jest/issues&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-package-json-LC22" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-package-json-LC23" class="blob-code blob-code-inner js-file-line">  &quot;homepage&quot;: &quot;https://github.com/YonatanKra/testing-canvas-with-jest#readme&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-package-json-LC24" class="blob-code blob-code-inner js-file-line">  &quot;devDependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-package-json-LC25" class="blob-code blob-code-inner js-file-line">    &quot;jest&quot;: &quot;^27.0.6&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-package-json-LC26" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-package-json-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-package-json-LC27" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1671cd0ca01d9281340604b3a94897ef/raw/c05432174d5a94ba1b029002465cd5b25ae50026/package.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1671cd0ca01d9281340604b3a94897ef#file-package-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          package.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>You can get to this stage by checking out the tag <code>step-2</code> in the <a href="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-2" data-type="URL" data-id="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-2" target="_blank" rel="noreferrer noopener">repository</a>.</p>



<p>Now we should be able to start testing.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Writing_our_first_test_and_code"></span>Writing our first test and code<span class="ez-toc-section-end"></span></h3>



<p>What we&#8217;d like to do is create a function that draws a castle with windows and a gate on our canvas. It will look like this: </p>



<div class="wp-block-image"><figure class="aligncenter size-full is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2021/08/image-1.png" alt="" class="wp-image-873" width="386" height="297" srcset="/wp-content/uploads/2021/08/image-1.png 537w, /wp-content/uploads/2021/08/image-1.png 300w, /wp-content/uploads/2021/08/image-1.png 117w" sizes="auto, (max-width: 386px) 100vw, 386px" /><figcaption>Our amazing castle</figcaption></figure></div>



<p>The <code>html</code> and <code>js</code> code will look like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066253" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.html content, created by YonatanKra on 04:45AM on August 04, 2021."
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
          <td id="file-index-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;!DOCTYPE html&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-html-LC2" class="blob-code blob-code-inner js-file-line">&lt;html lang=&quot;en&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-html-LC3" class="blob-code blob-code-inner js-file-line">&lt;head&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-html-LC4" class="blob-code blob-code-inner js-file-line">    &lt;meta charset=&quot;UTF-8&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-html-LC5" class="blob-code blob-code-inner js-file-line">    &lt;title&gt;Testing Canvas with Jest&lt;/title&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-html-LC6" class="blob-code blob-code-inner js-file-line">&lt;/head&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-html-LC7" class="blob-code blob-code-inner js-file-line">&lt;body&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-html-LC8" class="blob-code blob-code-inner js-file-line">    &lt;canvas id=&quot;castle&quot; width=&quot;600&quot; height=&quot;600&quot;&gt;&lt;/canvas&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-html-LC9" class="blob-code blob-code-inner js-file-line">    &lt;script type=&quot;module&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-html-LC10" class="blob-code blob-code-inner js-file-line">        import {draw} from &quot;./index.js&quot;;</td>
        </tr>
        <tr>
          <td id="file-index-html-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-html-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-html-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-html-LC12" class="blob-code blob-code-inner js-file-line">        const canvas = document.getElementById(&#39;castle&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-html-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-html-LC13" class="blob-code blob-code-inner js-file-line">        const ctx = canvas.getContext(&#39;2d&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-html-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-html-LC14" class="blob-code blob-code-inner js-file-line">        draw(ctx);</td>
        </tr>
        <tr>
          <td id="file-index-html-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-html-LC15" class="blob-code blob-code-inner js-file-line">    &lt;/script&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-html-LC16" class="blob-code blob-code-inner js-file-line">&lt;/body&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-html-LC17" class="blob-code blob-code-inner js-file-line">&lt;/html&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b6c1722552ae5a62ce5168e916bcf488/raw/0b78beff7399c41e8408c2acb0bc3b1277b4e201/index.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b6c1722552ae5a62ce5168e916bcf488#file-index-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.js content, created by YonatanKra on 04:45AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="index.js">
        <tr>
          <td id="file-index-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line">const castlePath = new Path2D(&#39;M 0,440 V 95 H 45.5 V 140 H 91 V 95 H 136.5 V 200 H 182 V 155 H 227.5 V 200 H 273 V 155 H 318.5 V 200 H 364 V 90 H 409.5 V 140 H 455 V 90 H 500.5 V 440 Z&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line">const windowsPath = new Path2D(&#39;M 60,297 V 222 H 75.5 V 297 Z M 204.5,425 V 330 A 45.75 45.75 0 0 1 296,330 V 425 Z M 424,297 V 222 H 439.5 V 297 Z&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line">export function draw(ctx) {</td>
        </tr>
        <tr>
          <td id="file-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-js-LC6" class="blob-code blob-code-inner js-file-line">    const shapePath = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-js-LC7" class="blob-code blob-code-inner js-file-line">    const castleShape = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-js-LC8" class="blob-code blob-code-inner js-file-line">    const castleWindowsShape = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-js-LC10" class="blob-code blob-code-inner js-file-line">    castleShape.addPath(castlePath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-js-LC11" class="blob-code blob-code-inner js-file-line">    castleWindowsShape.addPath(windowsPath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-js-LC13" class="blob-code blob-code-inner js-file-line">    shapePath.addPath(castleShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-js-LC14" class="blob-code blob-code-inner js-file-line">    shapePath.addPath(castleWindowsShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-js-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-js-LC16" class="blob-code blob-code-inner js-file-line">    ctx.fillStyle = &#39;gray&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-js-LC17" class="blob-code blob-code-inner js-file-line">    ctx.fill(shapePath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-js-LC18" class="blob-code blob-code-inner js-file-line">    ctx.fill(castleShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-js-LC19" class="blob-code blob-code-inner js-file-line">    ctx.fillStyle = &#39;white&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-index-js-LC20" class="blob-code blob-code-inner js-file-line">    ctx.fill(castleWindowsShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-index-js-LC21" class="blob-code blob-code-inner js-file-line">    ctx.lineWidth = 2;</td>
        </tr>
        <tr>
          <td id="file-index-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-index-js-LC22" class="blob-code blob-code-inner js-file-line">    ctx.strokeStyle = &#39;yellow&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-index-js-LC23" class="blob-code blob-code-inner js-file-line">    ctx.stroke(shapePath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-index-js-LC24" class="blob-code blob-code-inner js-file-line">    ctx.stroke(castleShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-index-js-LC25" class="blob-code blob-code-inner js-file-line">    return shapePath;</td>
        </tr>
        <tr>
          <td id="file-index-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-index-js-LC26" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b6c1722552ae5a62ce5168e916bcf488/raw/0b78beff7399c41e8408c2acb0bc3b1277b4e201/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b6c1722552ae5a62ce5168e916bcf488#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Note the <code>type=module</code> on the <code>script</code> tag which allows us to use <code>ES6 imports</code> natively in the browser.</p>



<p>We will now create a test file and try to run jest. Here&#8217;s the file:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066264" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-spec-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.spec.js content, created by YonatanKra on 04:47AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="index.spec.js">
        <tr>
          <td id="file-index-spec-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-index-spec-js-LC1" class="blob-code blob-code-inner js-file-line">const { draw } = require(&#39;./index&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-spec-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-spec-js-LC3" class="blob-code blob-code-inner js-file-line">describe(&#39;draw&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-spec-js-LC4" class="blob-code blob-code-inner js-file-line">    it(`should compile`, function () {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-spec-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-spec-js-LC6" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-spec-js-LC7" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/5401b2a90e9319f69bbd5088ee4c1b11/raw/36e56551506a49c06926203fb4d179e07b029538/index.spec.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/5401b2a90e9319f69bbd5088ee4c1b11#file-index-spec-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.spec.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>This file just tries to require our <code>draw</code> function and does nothing more. You can view this phase by checking out <code>step-3</code> (or just look <a rel="noreferrer noopener" href="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-3" data-type="URL" data-id="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-3" target="_blank">here</a>).</p>



<p>Running <code>jest</code> (or <code>npm run test</code>) will result in the following error: <code>Jest encountered an unexpected token</code>. It will then show us that the <code>export</code> in our code is unexpected (line 4 in our <code>.js</code> file).  </p>



<div class="wp-block-group tldr"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<h4 class="wp-block-heading"><span class="ez-toc-section" id="How_to_allow_ES6_imports_in_Jest"></span>How to allow ES6 imports in Jest?<span class="ez-toc-section-end"></span></h4>



<p>Jest comes integrated with Babel in order to support advanced EcmaScript specs. It looks for a babel configuration (in a .babelrc file). In order to easily use ES6 imports in Jest, we should do the following:</p>



<ol class="wp-block-list"><li><code>npm i -D @babel/plugin-transform-modules-commonjs</code></li><li>Create a <code>.babelrc</code> file with the following content:</li></ol>



<pre class="wp-block-code"><code>{
  "env": {
    "test": {
      "plugins": &#91;"@babel/plugin-transform-modules-commonjs"]
    }
  }
}</code></pre>
</div></div>



<p>Now when we run the tests (<code>npm run test</code> or just <code>jest</code>) the test will succeed in importing but we will get a different error: <code>ReferenceError: Path2D is not defined</code></p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_solve_ReferenceError_Path2D_is_not_defined"></span>How to solve ReferenceError: Path2D is not defined<span class="ez-toc-section-end"></span></h3>



<p>This error happens because Jest runs on JSDom and not in a real browser. Luckily, some good people thought about us and wrote two useful libraries: <code>canvas</code> and <code>jest-canvas-mock</code>.  In order to solve this last issue, do the following:</p>



<ol class="wp-block-list"><li><code>npm i -D canvas jest-canvas-mock</code></li><li>Add a setup file to jest config (in my case it will be in <code>package.json</code> but you can add it to an external config file if you have one):</li></ol>



<pre class="wp-block-code"><code>"jest": {

    "setupFiles": &#91;"jest-canvas-mock"]
}</code></pre>



<p>and&#8230; HOORAY!</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="383" height="286" src="/wp-content/uploads/2021/08/image-2.png" alt="" class="wp-image-875" srcset="/wp-content/uploads/2021/08/image-2.png 383w, /wp-content/uploads/2021/08/image-2.png 300w, /wp-content/uploads/2021/08/image-2.png 121w" sizes="auto, (max-width: 383px) 100vw, 383px" /><figcaption>Yea! All the tests are passing! We can start testing canvas with Jest!</figcaption></figure></div>



<p>You can view these changes by checking out <code>step-4</code> or <a href="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-4" data-type="URL" data-id="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-4" target="_blank" rel="noreferrer noopener">view it on github</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_test_canvas_operations_with_Jest"></span>How to test canvas operations with Jest?<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s write simple tests for our code:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066399" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-spec-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.spec.js content, created by YonatanKra on 05:09AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="index.spec.js">
        <tr>
          <td id="file-index-spec-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-index-spec-js-LC1" class="blob-code blob-code-inner js-file-line">const { draw } = require(&#39;./index&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-spec-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-spec-js-LC3" class="blob-code blob-code-inner js-file-line">describe(&#39;draw&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-spec-js-LC4" class="blob-code blob-code-inner js-file-line">    let canvas, ctx;</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-spec-js-LC5" class="blob-code blob-code-inner js-file-line">    beforeEach(function() {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-spec-js-LC6" class="blob-code blob-code-inner js-file-line">        canvas = document.createElement(&#39;canvas&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-spec-js-LC7" class="blob-code blob-code-inner js-file-line">        ctx = canvas.getContext(&#39;2d&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-spec-js-LC8" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-spec-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-spec-js-LC10" class="blob-code blob-code-inner js-file-line">    it(`should return the shape&#39;s path`, function() {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-spec-js-LC11" class="blob-code blob-code-inner js-file-line">        const shapePath = draw(ctx);</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-spec-js-LC12" class="blob-code blob-code-inner js-file-line">        expect(shapePath instanceof Path2D).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-spec-js-LC13" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-spec-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-spec-js-LC15" class="blob-code blob-code-inner js-file-line">    it(`should draw a house on the canvas using the main ctx`, function() {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-spec-js-LC16" class="blob-code blob-code-inner js-file-line">        draw(ctx);</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-spec-js-LC17" class="blob-code blob-code-inner js-file-line">        const events = ctx.__getEvents();</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-spec-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-spec-js-LC19" class="blob-code blob-code-inner js-file-line">        expect(events).toMatchSnapshot();</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-index-spec-js-LC20" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-index-spec-js-LC21" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/ddbc226add002c424eae7f8700093f53/raw/6e9b4054b5a6254bf114476aac6cb2bd2505b061/index.spec.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/ddbc226add002c424eae7f8700093f53#file-index-spec-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.spec.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The code above verifies two things:</p>



<ol class="wp-block-list"><li>That <code>draw</code> returns a <code>Path2D</code></li><li>That <code>draw</code> ran certain commands on our 2DContext.</li></ol>



<p>The <code>ctx.__getEvents</code> method used in the code above is given to us via <code>jest-canvas-mock</code>. It spies on the context&#8217;s methods calls and logs them for us. We then create a snapshot of it and make sure that as long as we follow the same API call, we still have the same canvas procedure.</p>



<p>Jest has a built-in snapshot feature. It generates stringified snapshots and saves them into a file.  These snapshots are hashed according to the tests&#8217; describe and it descriptions. It&#8217;s kind of like Visual Regression, only for JavaScript data Objects (JSON, Arrays or strings).</p>



<p>Here&#8217;s the snapshot taken:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066437" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-spec-js-snap" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-jest-snapshot  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.spec.js.snap content, created by YonatanKra on 05:14AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="index.spec.js.snap">
        <tr>
          <td id="file-index-spec-js-snap-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-index-spec-js-snap-LC1" class="blob-code blob-code-inner js-file-line">// Jest Snapshot v1, https://goo.gl/fbAQLP</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-spec-js-snap-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-spec-js-snap-LC3" class="blob-code blob-code-inner js-file-line">exports[`draw should draw a house on the canvas using the main ctx 1`] = `</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-spec-js-snap-LC4" class="blob-code blob-code-inner js-file-line">Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-spec-js-snap-LC5" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-spec-js-snap-LC6" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-spec-js-snap-LC7" class="blob-code blob-code-inner js-file-line">      &quot;value&quot;: &quot;#808080&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-spec-js-snap-LC8" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-spec-js-snap-LC9" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-spec-js-snap-LC10" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-spec-js-snap-LC11" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-spec-js-snap-LC12" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-spec-js-snap-LC13" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-spec-js-snap-LC14" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-spec-js-snap-LC15" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-spec-js-snap-LC16" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-spec-js-snap-LC17" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;fillStyle&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-spec-js-snap-LC18" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-spec-js-snap-LC19" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-index-spec-js-snap-LC20" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-index-spec-js-snap-LC21" class="blob-code blob-code-inner js-file-line">      &quot;fillRule&quot;: &quot;nonzero&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-index-spec-js-snap-LC22" class="blob-code blob-code-inner js-file-line">      &quot;path&quot;: Array [],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-index-spec-js-snap-LC23" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-index-spec-js-snap-LC24" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-index-spec-js-snap-LC25" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-index-spec-js-snap-LC26" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-index-spec-js-snap-LC27" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-index-spec-js-snap-LC28" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-index-spec-js-snap-LC29" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-index-spec-js-snap-LC30" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-index-spec-js-snap-LC31" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-index-spec-js-snap-LC32" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;fill&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-index-spec-js-snap-LC33" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-index-spec-js-snap-LC34" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-index-spec-js-snap-LC35" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-index-spec-js-snap-LC36" class="blob-code blob-code-inner js-file-line">      &quot;fillRule&quot;: &quot;nonzero&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-index-spec-js-snap-LC37" class="blob-code blob-code-inner js-file-line">      &quot;path&quot;: Array [],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-index-spec-js-snap-LC38" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-index-spec-js-snap-LC39" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-index-spec-js-snap-LC40" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-index-spec-js-snap-LC41" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-index-spec-js-snap-LC42" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-index-spec-js-snap-LC43" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-index-spec-js-snap-LC44" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-index-spec-js-snap-LC45" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-index-spec-js-snap-LC46" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-index-spec-js-snap-LC47" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;fill&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-index-spec-js-snap-LC48" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-index-spec-js-snap-LC49" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-index-spec-js-snap-LC50" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-index-spec-js-snap-LC51" class="blob-code blob-code-inner js-file-line">      &quot;value&quot;: &quot;#ffffff&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-index-spec-js-snap-LC52" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-index-spec-js-snap-LC53" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-index-spec-js-snap-LC54" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-index-spec-js-snap-LC55" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-index-spec-js-snap-LC56" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-index-spec-js-snap-LC57" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-index-spec-js-snap-LC58" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-index-spec-js-snap-LC59" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-index-spec-js-snap-LC60" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-index-spec-js-snap-LC61" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;fillStyle&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-index-spec-js-snap-LC62" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-index-spec-js-snap-LC63" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-index-spec-js-snap-LC64" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-index-spec-js-snap-LC65" class="blob-code blob-code-inner js-file-line">      &quot;fillRule&quot;: &quot;nonzero&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-index-spec-js-snap-LC66" class="blob-code blob-code-inner js-file-line">      &quot;path&quot;: Array [],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-index-spec-js-snap-LC67" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-index-spec-js-snap-LC68" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-index-spec-js-snap-LC69" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-index-spec-js-snap-LC70" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-index-spec-js-snap-LC71" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-index-spec-js-snap-LC72" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-index-spec-js-snap-LC73" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-index-spec-js-snap-LC74" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-index-spec-js-snap-LC75" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-index-spec-js-snap-LC76" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;fill&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-index-spec-js-snap-LC77" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-index-spec-js-snap-LC78" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-index-spec-js-snap-LC79" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-index-spec-js-snap-LC80" class="blob-code blob-code-inner js-file-line">      &quot;value&quot;: 2,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-index-spec-js-snap-LC81" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-index-spec-js-snap-LC82" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-index-spec-js-snap-LC83" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-index-spec-js-snap-LC84" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-index-spec-js-snap-LC85" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-index-spec-js-snap-LC86" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-index-spec-js-snap-LC87" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-index-spec-js-snap-LC88" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-index-spec-js-snap-LC89" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-index-spec-js-snap-LC90" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;lineWidth&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-index-spec-js-snap-LC91" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-index-spec-js-snap-LC92" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-index-spec-js-snap-LC93" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-index-spec-js-snap-LC94" class="blob-code blob-code-inner js-file-line">      &quot;value&quot;: &quot;#ffff00&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-index-spec-js-snap-LC95" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-index-spec-js-snap-LC96" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-index-spec-js-snap-LC97" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-index-spec-js-snap-LC98" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-index-spec-js-snap-LC99" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-index-spec-js-snap-LC100" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-index-spec-js-snap-LC101" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-index-spec-js-snap-LC102" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-index-spec-js-snap-LC103" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-index-spec-js-snap-LC104" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;strokeStyle&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
          <td id="file-index-spec-js-snap-LC105" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
          <td id="file-index-spec-js-snap-LC106" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
          <td id="file-index-spec-js-snap-LC107" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
          <td id="file-index-spec-js-snap-LC108" class="blob-code blob-code-inner js-file-line">      &quot;path&quot;: Array [],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
          <td id="file-index-spec-js-snap-LC109" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
          <td id="file-index-spec-js-snap-LC110" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
          <td id="file-index-spec-js-snap-LC111" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
          <td id="file-index-spec-js-snap-LC112" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
          <td id="file-index-spec-js-snap-LC113" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
          <td id="file-index-spec-js-snap-LC114" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
          <td id="file-index-spec-js-snap-LC115" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
          <td id="file-index-spec-js-snap-LC116" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
          <td id="file-index-spec-js-snap-LC117" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
          <td id="file-index-spec-js-snap-LC118" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;stroke&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
          <td id="file-index-spec-js-snap-LC119" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
          <td id="file-index-spec-js-snap-LC120" class="blob-code blob-code-inner js-file-line">  Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
          <td id="file-index-spec-js-snap-LC121" class="blob-code blob-code-inner js-file-line">    &quot;props&quot;: Object {</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
          <td id="file-index-spec-js-snap-LC122" class="blob-code blob-code-inner js-file-line">      &quot;path&quot;: Array [],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
          <td id="file-index-spec-js-snap-LC123" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
          <td id="file-index-spec-js-snap-LC124" class="blob-code blob-code-inner js-file-line">    &quot;transform&quot;: Array [</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
          <td id="file-index-spec-js-snap-LC125" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
          <td id="file-index-spec-js-snap-LC126" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
          <td id="file-index-spec-js-snap-LC127" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
          <td id="file-index-spec-js-snap-LC128" class="blob-code blob-code-inner js-file-line">      1,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L129" class="blob-num js-line-number js-blob-rnum" data-line-number="129"></td>
          <td id="file-index-spec-js-snap-LC129" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L130" class="blob-num js-line-number js-blob-rnum" data-line-number="130"></td>
          <td id="file-index-spec-js-snap-LC130" class="blob-code blob-code-inner js-file-line">      0,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L131" class="blob-num js-line-number js-blob-rnum" data-line-number="131"></td>
          <td id="file-index-spec-js-snap-LC131" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L132" class="blob-num js-line-number js-blob-rnum" data-line-number="132"></td>
          <td id="file-index-spec-js-snap-LC132" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;stroke&quot;,</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L133" class="blob-num js-line-number js-blob-rnum" data-line-number="133"></td>
          <td id="file-index-spec-js-snap-LC133" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L134" class="blob-num js-line-number js-blob-rnum" data-line-number="134"></td>
          <td id="file-index-spec-js-snap-LC134" class="blob-code blob-code-inner js-file-line">]</td>
        </tr>
        <tr>
          <td id="file-index-spec-js-snap-L135" class="blob-num js-line-number js-blob-rnum" data-line-number="135"></td>
          <td id="file-index-spec-js-snap-LC135" class="blob-code blob-code-inner js-file-line">`;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e43b91e2443da2be12a020a9981c3c6e/raw/9e72fc1f474b8c3baa30a1659833534437da8128/index.spec.js.snap" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e43b91e2443da2be12a020a9981c3c6e#file-index-spec-js-snap" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.spec.js.snap
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>We can, of course, do more complex verifications. For instance, we can parse the <code>__getEvents</code> output to verify certain things (which will be more TDD-like).</p>



<p>You can find the working code by checking out <code>step-5</code><meta charset="utf-8"> or <a href="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-5" data-type="URL" data-id="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-5" target="_blank" rel="noreferrer noopener">view it on github</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_test_DOMMatrix_operations_with_Jest"></span>How to test DOMMatrix operations with Jest<span class="ez-toc-section-end"></span></h2>



<p>Now that our function is working, we&#8217;d like to add some parameters like sizing. We resize Path2D paths using a DOMMatrix which helps us translate and scale our paths.</p>



<p>Let&#8217;s add the code that does that and try to run our test:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066517" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.js content, created by YonatanKra on 05:22AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="index.js">
        <tr>
          <td id="file-index-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line">const castlePath = new Path2D(&#39;M 0,440 V 95 H 45.5 V 140 H 91 V 95 H 136.5 V 200 H 182 V 155 H 227.5 V 200 H 273 V 155 H 318.5 V 200 H 364 V 90 H 409.5 V 140 H 455 V 90 H 500.5 V 440 Z&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line">const windowsPath = new Path2D(&#39;M 60,297 V 222 H 75.5 V 297 Z M 204.5,425 V 330 A 45.75 45.75 0 0 1 296,330 V 425 Z M 424,297 V 222 H 439.5 V 297 Z&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line">export function draw(ctx, castleOptions = { position: { x: 0, y: 0 }, scaleX: 1, scaleY: 1 }) {</td>
        </tr>
        <tr>
          <td id="file-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-js-LC6" class="blob-code blob-code-inner js-file-line">    const MATRIX = new DOMMatrix();</td>
        </tr>
        <tr>
          <td id="file-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-js-LC7" class="blob-code blob-code-inner js-file-line">    const matrix = MATRIX.translate(castleOptions.position.x, castleOptions.position.y).scale(castleOptions.scaleX, castleOptions.scaleY);</td>
        </tr>
        <tr>
          <td id="file-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-js-LC9" class="blob-code blob-code-inner js-file-line">    const shapePath = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-js-LC10" class="blob-code blob-code-inner js-file-line">    const castleShape = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-js-LC11" class="blob-code blob-code-inner js-file-line">    const castleWindowsShape = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-js-LC13" class="blob-code blob-code-inner js-file-line">    castleShape.addPath(castlePath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-js-LC14" class="blob-code blob-code-inner js-file-line">    castleWindowsShape.addPath(windowsPath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-js-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-js-LC16" class="blob-code blob-code-inner js-file-line">    shapePath.addPath(castleShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-js-LC17" class="blob-code blob-code-inner js-file-line">    shapePath.addPath(castleWindowsShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-js-LC19" class="blob-code blob-code-inner js-file-line">    ctx.setTransform(matrix);</td>
        </tr>
        <tr>
          <td id="file-index-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-index-js-LC20" class="blob-code blob-code-inner js-file-line">    ctx.fillStyle = &#39;gray&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-index-js-LC21" class="blob-code blob-code-inner js-file-line">    ctx.fill(shapePath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-index-js-LC22" class="blob-code blob-code-inner js-file-line">    ctx.fill(castleShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-index-js-LC23" class="blob-code blob-code-inner js-file-line">    ctx.fillStyle = &#39;white&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-index-js-LC24" class="blob-code blob-code-inner js-file-line">    ctx.fill(castleWindowsShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-index-js-LC25" class="blob-code blob-code-inner js-file-line">    ctx.lineWidth = 2;</td>
        </tr>
        <tr>
          <td id="file-index-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-index-js-LC26" class="blob-code blob-code-inner js-file-line">    ctx.strokeStyle = &#39;yellow&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-index-js-LC27" class="blob-code blob-code-inner js-file-line">    ctx.stroke(shapePath);</td>
        </tr>
        <tr>
          <td id="file-index-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-index-js-LC28" class="blob-code blob-code-inner js-file-line">    ctx.stroke(castleShape);</td>
        </tr>
        <tr>
          <td id="file-index-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-index-js-LC29" class="blob-code blob-code-inner js-file-line">    ctx.resetTransform();</td>
        </tr>
        <tr>
          <td id="file-index-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-index-js-LC30" class="blob-code blob-code-inner js-file-line">    return shapePath;</td>
        </tr>
        <tr>
          <td id="file-index-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-index-js-LC31" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/708541498b7d290caca3cae192178026/raw/a987d65169508a4bde7fe61c3fbcd859ee05b12b/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/708541498b7d290caca3cae192178026#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Note the creation of <code>DOMMatrix</code> in line 6, the translation and scale setup in line 7 and the usage in lines 19  when setting the transform to the drawn shape.</p>



<p>Now running <code>jest</code> or <code>npm run test</code> will result in an error: <code>TypeError: MATRIX.translate is not a function</code></p>



<p>Note that if we did not use <code>jest-canvas-mock</code> our error would have been: <code><meta charset="utf-8">ReferenceError: DOMMatrix is not defined</code>. For the same reason <code>Path2D</code> was undefined.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Solving_TypeError_MATRIXtranslate_is_not_a_function"></span>Solving TypeError: MATRIX.translate is not a function<span class="ez-toc-section-end"></span></h3>



<p>This can be easily solved by mocking the <code>DOMMatrix</code> class. <code>DOMMatrix</code> is, unfortunately, not implemented by JSDom (and probably not going to be). It is implemented by <code>jest-canvas-mock</code>, <s>but it is missing the <code>translate</code> and <code>scale</code> methods</s> and from this <a rel="noreferrer noopener" href="https://youtu.be/V0GL2rDWbD0?t=301" data-type="URL" data-id="https://youtu.be/V0GL2rDWbD0?t=301" target="_blank">PR</a> it also supports the <code>translate</code> method. </p>



<div class="wp-block-group tldr"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<p></p>



<p>If you are using an old version and don&#8217;t want to upgrade, here&#8217;s the mocking code:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111066106" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-mockdommatrix-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="mockDOMMatrix.js content, created by YonatanKra on 04:24AM on August 04, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="mockDOMMatrix.js">
        <tr>
          <td id="file-mockdommatrix-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-mockdommatrix-js-LC1" class="blob-code blob-code-inner js-file-line">(function mockDOMMatrix() {</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-mockdommatrix-js-LC2" class="blob-code blob-code-inner js-file-line">  class DOMMatrixMock extends DOMMatrix {</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-mockdommatrix-js-LC3" class="blob-code blob-code-inner js-file-line">      scale = jest.fn().mockImplementation((scaleX, scaleY) =&gt; this.setScale(scaleX, scaleY));</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-mockdommatrix-js-LC4" class="blob-code blob-code-inner js-file-line">      translate = jest.fn().mockImplementation((x, y) =&gt; this.setTranslate(x,y));</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-mockdommatrix-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-mockdommatrix-js-LC6" class="blob-code blob-code-inner js-file-line">      setScale(scaleX, scaleY) {</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-mockdommatrix-js-LC7" class="blob-code blob-code-inner js-file-line">          this.f = scaleY;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-mockdommatrix-js-LC8" class="blob-code blob-code-inner js-file-line">          this.e = scaleX;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-mockdommatrix-js-LC9" class="blob-code blob-code-inner js-file-line">          return this;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-mockdommatrix-js-LC10" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-mockdommatrix-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-mockdommatrix-js-LC12" class="blob-code blob-code-inner js-file-line">      setTranslate(x,y){</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-mockdommatrix-js-LC13" class="blob-code blob-code-inner js-file-line">          this.b = x;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-mockdommatrix-js-LC14" class="blob-code blob-code-inner js-file-line">          this.c = y;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-mockdommatrix-js-LC15" class="blob-code blob-code-inner js-file-line">          return this;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-mockdommatrix-js-LC16" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-mockdommatrix-js-LC17" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-mockdommatrix-js-LC18" class="blob-code blob-code-inner js-file-line">  </td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-mockdommatrix-js-LC19" class="blob-code blob-code-inner js-file-line">  global.DOMMatrix = DOMMatrixMock;</td>
        </tr>
        <tr>
          <td id="file-mockdommatrix-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-mockdommatrix-js-LC20" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b037c8504f2db6443ce2ea252e916894/raw/ca6540a44e3c8a2649c43e09d15f81dea2e087df/mockDOMMatrix.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b037c8504f2db6443ce2ea252e916894#file-mockdommatrix-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          mockDOMMatrix.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Adding this to the top of our test file, will run our tests without this error. </p>



<p>Note that if you need this mock in more than one file, you can set it up in a separate file and use it in the <code>setupFiles</code> section in the Jest config. This way, you won&#8217;t have to copy-paste the snippet all over your test files.</p>



<p></p>



<p></p>
</div></div>



<p>All the tests are now passing. We can now also write tests for our new API and close this section:</p>



<pre class="wp-block-code"><code>    it(`should draw a house on the canvas using the default scaleX and scaleY`, function() {
        const path = draw(ctx);
        const events = ctx.__getEvents();

        expect(events).toMatchSnapshot();
    });

    it(`should draw a house with given position, scaleX and scaleY`, function() {
        const path = draw(ctx, { position: { x: 10, y: 10 }, scaleX: .5, scaleY: 0 });
        const events = ctx.__getEvents();

        expect(events).toMatchSnapshot();
    });</code></pre>



<p>These tests also pass. </p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="500" height="175" src="/wp-content/uploads/2021/08/image-3.png" alt="" class="wp-image-876" srcset="/wp-content/uploads/2021/08/image-3.png 500w, /wp-content/uploads/2021/08/image-3.png 300w, /wp-content/uploads/2021/08/image-3.png 257w" sizes="auto, (max-width: 500px) 100vw, 500px" /><figcaption>HOORAY!</figcaption></figure></div>



<p>You can view the full code in <code>step-6</code> <meta charset="utf-8"> or <a href="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-6" data-type="URL" data-id="https://github.com/YonatanKra/testing-canvas-with-jest/tree/step-6" target="_blank" rel="noreferrer noopener">view it on github</a></p>



<div class="wp-block-group tldr"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<h2 class="wp-block-heading" id="should-we-use-tomatchsnapshot"><span class="ez-toc-section" id="Should_we_use_toMatchSnapshot_calls"></span>Should we use toMatchSnapshot calls?<span class="ez-toc-section-end"></span></h2>



<p>A discussion in one of the forum was raised due to the usage of snapshots in this article.  The TL;DR of this discussion is &#8220;With great power comes great responsibility&#8221;.</p>



<p>I use snapshots as a shortcut here. I&#8217;ve also raised the point that I&#8217;d probably not use them. Instead, I&#8217;d usually take the results of the <code>__getEvents</code> method (which are valid JSON) and use them in some way.</p>



<p>For instance, in our case we have a massive log. It just represents the list of operations done on our 2Dcontext.  If I know the 2nd operation should be a <code>fill</code> operation with a certain color &#8211; I can verify this by accessing the second member in the log and verify its type is <code>fill</code> with the certain color.</p>



<p>Using the snapshot, in this case, made me test the whole flow in one go.  Of course, I&#8217;d have to verify and approve the first log I take, but from then on, every change to that log should raise an alarm &#8211; have we changed anything?</p>



<p>This, of course, reminds veteran testers with the good old unit vs. e2e tests question.</p>



<p>Testing specific things (like a certain part/unit in a process) can give you a very specific cause for an error.  On the other hand &#8211; the more general tests (like e2e, UI and snapshots) are less specific and give you an impression that &#8220;something might be wrong &#8211; please investigate&#8221;.</p>



<p>It&#8217;s always a matter of tradeoffs.  Using snapshots is faster, but gives you less refined error handling. It&#8217;s probably more prone to false alarms&#8230;</p>



<p>Thanks <a href="https://www.linkedin.com/in/ido-wald-a7603a91/" data-type="URL" data-id="https://www.linkedin.com/in/ido-wald-a7603a91/" target="_blank" rel="noreferrer noopener">Ido Wald</a> for bringing this important issue up on Facebook.</p>
</div></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Wow! What a ride! Now I hope we know better how to test canvas using Jest.</p>



<p>Testing canvas with Jest might seem ominous at first. With some trial, error and google, everything is solvable.</p>



<p>From solving a simple import problem through mocking the 2d context and Path2D to extending the DOMMatrix mock itself &#8211; you are now ready to lunch your next canvas based app with the security of testing with Jest.</p>



<p>In our example, you can test your new canvas testing skills to add more API&#8217;s and test them. One example could be adding color and stroke to the configuration&#8230; </p>



<p>If you are looking for serverside mocking techniques, I&#8217;ve just read <a rel="noreferrer noopener" href="https://itnext.io/firebase-firestore-unit-testing-with-jest-and-kind-of-typescript-e26874196b1e" data-type="URL" data-id="https://itnext.io/firebase-firestore-unit-testing-with-jest-and-kind-of-typescript-e26874196b1e" target="_blank">a really cool tip on how to mock a database</a>. I hope you will enjoy it like I did.</p>



<p>Since this is my first actual research of testing Canvas operations, I&#8217;d love to read your feedback and experience in the field. Feel free to use the comments below to share your opinion or just holler me over FB/Twitter/Linkedin.</p>



<p>Thanks a lot for <a rel="noreferrer noopener" href="https://twitter.com/shai_reznik" data-type="URL" data-id="https://twitter.com/shai_reznik" target="_blank">Shai Reznik</a> from <a rel="noreferrer noopener" href="https://hirez.io" data-type="URL" data-id="https://hirez.io" target="_blank">hirez.io</a> and <a href="https://www.linkedin.com/in/miki-stanger-153bb365/" data-type="URL" data-id="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank" rel="noreferrer noopener">Miki Ezra Stanger</a> for a very kind and helpful review!</p>

