---
title: How to write Unit Tests for Tauri Frontend with Vitest?
slug: how-to-setup-vitest-in-a-tauri-project
published: 2023-09-08T01:48:00
updated: 2023-09-24T12:46:33
author: Yonatan Kra
description: Starting a project for me usually starts with setting up the testing infrastructure. The only exception is when one already exists. In this article we will learn two things. We will start from setting up vitest in the Tauri project. We will then learn how to write a test in JavaScript for a part that’s [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Tauri
    slug: tauri
    path: tauri
  - name: Tauri Demo
    slug: tauri-demo
    path: tauri-demo
tags:
  - javascript
  - tauri
  - testing
  - vitest
canonical: https://yonatankra.com/how-to-setup-vitest-in-a-tauri-project/
comments: []
featuredImage: /wp-content/uploads/2023/09/Vitest-and-Tauri-alone.png
---

<p class="has-medium-font-size">Starting a project for me usually starts with setting up the testing infrastructure. The only exception is when one already exists. In this article we will learn two things. We will start from setting up vitest in the Tauri project. We will then learn how to write a test in JavaScript for a part that&#8217;s connecting to the Tauri Rust backend.</p>



<p>I already wrote about our Tauri experience in <a href="/how-to-write-unit-tests-in-rust-for-tauri/" data-type="post" data-id="1753">how to write unit tests in rust for Tauri.</a> This time, we&#8217;re going to setup the tests for the frontend using Vitest. We&#8217;re also going to write a first meaningful test for a Tauri frontend and see how to work with the Rust part during JavaScript tests.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1a35d8bc" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1a35d8bc"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-setup-vitest-in-a-tauri-project/#How_to_Setup_a_Tauri_App" >How to Setup a Tauri App?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-setup-vitest-in-a-tauri-project/#How_to_Add_Vitest_to_a_Project" >How to Add Vitest to a Project?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-setup-vitest-in-a-tauri-project/#Writing_Our_First_Test" >Writing Our First Test</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-setup-vitest-in-a-tauri-project/#How_to_Configure_Vitest_for_Frontend_Testing" >How to Configure Vitest for Frontend Testing?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-setup-vitest-in-a-tauri-project/#How_to_solve_window_is_undefined_in_Vitest" >How to solve window is undefined in Vitest?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-setup-vitest-in-a-tauri-project/#How_to_fix_describe_is_not_defined_in_Vitest" >How to fix describe is not defined in Vitest?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-setup-vitest-in-a-tauri-project/#Writing_the_First_Meaningful_Test" >Writing the First Meaningful Test</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-setup-vitest-in-a-tauri-project/#Understanding_the_Tauri_Code" >Understanding the Tauri Code</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-setup-vitest-in-a-tauri-project/#Writing_the_Test" >Writing the Test</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-setup-vitest-in-a-tauri-project/#How_to_Mock_the_Tauri_Backend" >How to Mock the Tauri Backend</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-setup-vitest-in-a-tauri-project/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Setup_a_Tauri_App"></span>How to Setup a Tauri App?<span class="ez-toc-section-end"></span></h2>



<p>That&#8217;s relatively easy. Here are the steps:</p>



<ol class="wp-block-list"><li>Make sure you have the <a href="https://tauri.app/v1/guides/getting-started/prerequisites" target="_blank" rel="noopener">prerequisite</a> on your machine.</li><li>cd into your projects folder</li><li>Create a Tauri app using: <code>npm create&nbsp;tauri-app@latest</code></li></ol>



<p>You will be asked a few questions during the app&#8217;s setup process.</p>



<p>For this tutorial, I&#8217;m going to select the following:</p>



<p>Need to install the following packages &#8211; ‘y’</p>



<p>&#x2714; Project name · tauri-demo<br>&#x2714; Choose which language to use for your frontend · TypeScript / JavaScript <br>&#x2714; Choose your package manager · npm<br>&#x2714; Choose your UI template · Vanilla<br>&#x2714; Choose your UI flavor · TypeScript (yes, Tauri calls its frontend &#8220;UI&#8221; at times)</p>



<p>cd into the folder (in my case, <code>tauri-demo</code>) and run <code>npm install &amp;&amp; npm run tauri dev</code></p>



<p>This will install the JavaScript dependencies and start the desktop app in dev mode.</p>



<p>If all worked correctly, you should see the app running like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="413" src="/wp-content/uploads/2023/09/image.png" alt="" class="wp-image-1822" srcset="/wp-content/uploads/2023/09/image.png 1024w, /wp-content/uploads/2023/09/image.png 300w, /wp-content/uploads/2023/09/image.png 768w, /wp-content/uploads/2023/09/image.png 1536w, /wp-content/uploads/2023/09/image.png 139w, /wp-content/uploads/2023/09/image.png 1592w, /wp-content/uploads/2023/09/image.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The Initial Tauri App</figcaption></figure></div>



<p>That&#8217;s great! We now have a working greeter app!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Add_Vitest_to_a_Project"></span>How to Add Vitest to a Project?<span class="ez-toc-section-end"></span></h2>



<p>The first step would be to install <code>vitest</code>. That&#8217;s easy: <code>npm i -D vitest</code>.</p>



<p>Once we have that, we can add the following script to our <code>package.json</code>: </p>



<p class="has-text-align-center"><code>"test:frontend": "vitest"</code> </p>



<p>so our <code>package.json</code> file now looks like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124513407" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-package-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="package.json content, created by YonatanKra on 08:03AM on September 03, 2023."
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
          <td id="file-package-json-LC2" class="blob-code blob-code-inner js-file-line">  &quot;name&quot;: &quot;tauri-demo&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-package-json-LC3" class="blob-code blob-code-inner js-file-line">  &quot;private&quot;: true,</td>
        </tr>
        <tr>
          <td id="file-package-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-package-json-LC4" class="blob-code blob-code-inner js-file-line">  &quot;version&quot;: &quot;0.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-package-json-LC5" class="blob-code blob-code-inner js-file-line">  &quot;type&quot;: &quot;module&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-package-json-LC6" class="blob-code blob-code-inner js-file-line">  &quot;scripts&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-package-json-LC7" class="blob-code blob-code-inner js-file-line">    &quot;dev&quot;: &quot;vite&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-package-json-LC8" class="blob-code blob-code-inner js-file-line">    &quot;build&quot;: &quot;tsc &amp;&amp; vite build&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-package-json-LC9" class="blob-code blob-code-inner js-file-line">    &quot;preview&quot;: &quot;vite preview&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-package-json-LC10" class="blob-code blob-code-inner js-file-line">    &quot;tauri&quot;: &quot;tauri&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-package-json-LC11" class="blob-code blob-code-inner js-file-line">    &quot;test:frontend&quot;: &quot;vitest&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-package-json-LC12" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-package-json-LC13" class="blob-code blob-code-inner js-file-line">  &quot;dependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-package-json-LC14" class="blob-code blob-code-inner js-file-line">    &quot;@tauri-apps/api&quot;: &quot;^1.4.0&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-package-json-LC15" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-package-json-LC16" class="blob-code blob-code-inner js-file-line">  &quot;devDependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-package-json-LC17" class="blob-code blob-code-inner js-file-line">    &quot;@tauri-apps/cli&quot;: &quot;^1.4.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-package-json-LC18" class="blob-code blob-code-inner js-file-line">    &quot;typescript&quot;: &quot;^5.0.2&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-package-json-LC19" class="blob-code blob-code-inner js-file-line">    &quot;vite&quot;: &quot;^4.4.4&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-package-json-LC20" class="blob-code blob-code-inner js-file-line">    &quot;vitest&quot;: &quot;^0.34.3&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-package-json-LC21" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-package-json-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-package-json-LC22" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/bc4937ee1b078565c2acc726853b3960/raw/cbf9a7ec1c03ada07393faf762c966a3d4323a1a/package.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/bc4937ee1b078565c2acc726853b3960#file-package-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          package.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The project&#8217;s <code>package.json</code> after setting up <code>vitest</code></figcaption></figure>



<p>Running our test code won&#8217;t do anything because the project has no tests. Let&#8217;s write the first one.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Writing_Our_First_Test"></span>Writing Our First Test<span class="ez-toc-section-end"></span></h2>



<p>We currently have one file in our project &#8211; <code>main.ts</code>. </p>



<p>Let&#8217;s create a simple test for it. We will create a test file: <code>main.spec.ts</code> in the same folder and fill it with this content:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124513453" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.spec.ts content, created by YonatanKra on 08:07AM on September 03, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.spec.ts">
        <tr>
          <td id="file-main-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">import &#39;./main&#39;;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">describe(&#39;main&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">  it(&#39;should be defined&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">    expect(true).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1f1ad957cf3be9628f026baee9c157ac/raw/f7a32d45dfc21e4425cdbb9e7d15b1c6caef2c5b/main.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1f1ad957cf3be9628f026baee9c157ac#file-main-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The first <code>Tauri-demo</code> spec file</figcaption></figure>



<p>In order to run the tests, we will use our <code>npm script</code>: </p>



<p class="has-text-align-center"><code>npm run test:frontend</code>. </p>



<p>Try it out&#8230;</p>



<p>If you did everything right so far, the test should fail like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="321" src="/wp-content/uploads/2023/09/image-1.png" alt="" class="wp-image-1823" srcset="/wp-content/uploads/2023/09/image-1.png 960w, /wp-content/uploads/2023/09/image-1.png 300w, /wp-content/uploads/2023/09/image-1.png 768w, /wp-content/uploads/2023/09/image-1.png 179w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A test is running! A test is failing! Hooray!</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Configure_Vitest_for_Frontend_Testing"></span>How to Configure Vitest for Frontend Testing?<span class="ez-toc-section-end"></span></h2>



<p>The reason the test fails is that we are trying to use <code>window</code>. Let&#8217;s fix that.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_solve_window_is_undefined_in_Vitest"></span>How to solve <code>window is undefined</code> in Vitest?<span class="ez-toc-section-end"></span></h3>



<p><code>vitest</code>&#8216;s default environment is <code>Nodejs</code>, and there&#8217;s no <code>window</code> there. In order for it to work, we&#8217;ll need to setup <code>jsdom</code>, which is a browser emulator for <code>nodejs</code>. Here&#8217;s how you setup <code>jsdom</code> in <code>vitest</code>:</p>



<ol class="wp-block-list"><li>Install <code>jsdom</code>: <code>npm i -D jsdom</code></li><li>Set <code>jsdom</code> as the environment in <code>vite.config.ts</code>:<br></li></ol>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="402" src="/wp-content/uploads/2023/09/image-2.png" alt="" class="wp-image-1824" srcset="/wp-content/uploads/2023/09/image-2.png 752w, /wp-content/uploads/2023/09/image-2.png 300w, /wp-content/uploads/2023/09/image-2.png 143w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><code>vite.config.ts</code> with the <code>test</code> configured for <code>jsdom</code> environment</figcaption></figure></div>



<p>Great! Let&#8217;s run the tests again: <code>npm run test:frontend</code>. </p>



<p>Did the tests fail again? Great! Because they should. Let&#8217;s talk about the next error.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_fix_describe_is_not_defined_in_Vitest"></span>How to fix <code>describe is not defined</code> in Vitest?<span class="ez-toc-section-end"></span></h3>



<p>Here&#8217;s the error:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="244" src="/wp-content/uploads/2023/09/image-3.png" alt="" class="wp-image-1825" srcset="/wp-content/uploads/2023/09/image-3.png 982w, /wp-content/uploads/2023/09/image-3.png 300w, /wp-content/uploads/2023/09/image-3.png 768w, /wp-content/uploads/2023/09/image-3.png 236w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The error we get after setting up fixing <code>windows is not defined</code>: <code>describe</code> is not defined</figcaption></figure></div>



<p>So now we need a way to define <code>describe</code> and probably all of the other test functions. We could import them one by one from <code>vitest</code> (or any other test framework for that matter). Another easy option would be to tell <code>vitest</code> to expose the test functions as globals. </p>



<p>All we need to do is add <code>globals: true</code> to the test configuration. The final file should look like this:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124513608" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-vite-config-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="vite.config.ts content, created by YonatanKra on 08:28AM on September 03, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="vite.config.ts">
        <tr>
          <td id="file-vite-config-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-vite-config-ts-LC1" class="blob-code blob-code-inner js-file-line">import { defineConfig } from &quot;vite&quot;;</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-vite-config-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-vite-config-ts-LC3" class="blob-code blob-code-inner js-file-line">export default defineConfig(async () =&gt; ({</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-vite-config-ts-LC4" class="blob-code blob-code-inner js-file-line">  clearScreen: false,</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-vite-config-ts-LC5" class="blob-code blob-code-inner js-file-line">  server: {</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-vite-config-ts-LC6" class="blob-code blob-code-inner js-file-line">    port: 1420,</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-vite-config-ts-LC7" class="blob-code blob-code-inner js-file-line">    strictPort: true,</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-vite-config-ts-LC8" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-vite-config-ts-LC9" class="blob-code blob-code-inner js-file-line">  envPrefix: [&quot;VITE_&quot;, &quot;TAURI_&quot;],</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-vite-config-ts-LC10" class="blob-code blob-code-inner js-file-line">  test: {</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-vite-config-ts-LC11" class="blob-code blob-code-inner js-file-line">    globals: true,</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-vite-config-ts-LC12" class="blob-code blob-code-inner js-file-line">    environment: &quot;jsdom&quot;,</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-vite-config-ts-LC13" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-vite-config-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-vite-config-ts-LC14" class="blob-code blob-code-inner js-file-line">}));</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3baa6d3b2321ea31645225c7e1787d79/raw/114ebae5e4265498463eeb5a94acd2cf5044a5d3/vite.config.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3baa6d3b2321ea31645225c7e1787d79#file-vite-config-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          vite.config.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Final vite config to enable tests</figcaption></figure>



<p>If we run <code>npm run test:frontend</code> now we will get the beloved green screen:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="265" src="/wp-content/uploads/2023/09/image-4.png" alt="" class="wp-image-1826" srcset="/wp-content/uploads/2023/09/image-4.png 958w, /wp-content/uploads/2023/09/image-4.png 300w, /wp-content/uploads/2023/09/image-4.png 768w, /wp-content/uploads/2023/09/image-4.png 218w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The test is passing! Our testing infrastructure is working!</figcaption></figure></div>



<p>Now that we have a working testing infrastructure, we can move on to the next step: Start building our app! Let&#8217;s write a meaningful test just to see it is working.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Writing_the_First_Meaningful_Test"></span>Writing the First Meaningful Test<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Understanding_the_Tauri_Code"></span>Understanding the Tauri Code<span class="ez-toc-section-end"></span></h3>



<p>Our test doesn&#8217;t say much. It just checks if true is truth. Because our <code>main</code> module is already written, let&#8217;s see what it does. The first thing that&#8217;s going to run is this piece of code:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="161" src="/wp-content/uploads/2023/09/image-5.png" alt="" class="wp-image-1833" srcset="/wp-content/uploads/2023/09/image-5.png 1024w, /wp-content/uploads/2023/09/image-5.png 300w, /wp-content/uploads/2023/09/image-5.png 768w, /wp-content/uploads/2023/09/image-5.png 268w, /wp-content/uploads/2023/09/image-5.png 1202w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<ol class="wp-block-list"><li>On <code>DOMContentLoaded</code></li><li>Get the input and message elements</li><li>Set a submit <code>eventListener</code> on the form element, prevent its default and fire the greet function.</li></ol>



<p>Let&#8217;s test the greet functionality, because it&#8217;s the main business logic:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="191" src="/wp-content/uploads/2023/09/image-6.png" alt="" class="wp-image-1834" srcset="/wp-content/uploads/2023/09/image-6.png 876w, /wp-content/uploads/2023/09/image-6.png 300w, /wp-content/uploads/2023/09/image-6.png 768w, /wp-content/uploads/2023/09/image-6.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The Greet Function</figcaption></figure></div>



<p>This function checks if we have message and input elements. If they exist, it fills the message element with the result of the <code>invoke</code> function.</p>



<p>The <code>invoke</code> function is part of the Tauri API. It is the communication protocol between the JavaScript <code>client</code> and the Rust backend. It is called <code>Inter-Process Communication</code>, or IPC in short. In essence, we <code>invoke</code> the <code>greet</code> API with the payload:</p>



<pre class="wp-block-code"><code>{
  name: greetInputEl.value,
}</code></pre>



<p>In the folder <code>src-tauri/src</code> there&#8217;s the <code>main.rs</code> file, where the <code>greet</code> API is implemented:</p>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="99" src="/wp-content/uploads/2023/09/image-7.png" alt="" class="wp-image-1835" srcset="/wp-content/uploads/2023/09/image-7.png 992w, /wp-content/uploads/2023/09/image-7.png 300w, /wp-content/uploads/2023/09/image-7.png 768w, /wp-content/uploads/2023/09/image-7.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The Greet API in the Tauri backend</figcaption></figure>



<p>It is easy to see the string that&#8217;s supposed to return is</p>



<p class="has-text-align-center"><code>Hello, ${name}! You've been greeted from Rust!</code></p>



<p>Let&#8217;s summarize what our app is all about:</p>



<ol class="wp-block-list"><li>Listen to DOMContentLoaded event</li><li>Set an event listener on the greet form</li><li>Set the greet message to <code>Hello, ${name}! You've been greeted from Rust!</code></li></ol>



<p>That&#8217;s what our test needs to check. Let&#8217;s write it down.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Writing_the_Test"></span>Writing the Test<span class="ez-toc-section-end"></span></h3>



<p>The first thing we need to do is change the <code>it</code> description:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="46" src="/wp-content/uploads/2023/09/image-9.png" alt="" class="wp-image-1837" srcset="/wp-content/uploads/2023/09/image-9.png 1024w, /wp-content/uploads/2023/09/image-9.png 300w, /wp-content/uploads/2023/09/image-9.png 768w, /wp-content/uploads/2023/09/image-9.png 268w, /wp-content/uploads/2023/09/image-9.png 1176w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>As part of the preparation phase, we need to setup the DOM elements:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="450" height="222" src="/wp-content/uploads/2023/09/image-8.png" alt="" class="wp-image-1836" srcset="/wp-content/uploads/2023/09/image-8.png 450w, /wp-content/uploads/2023/09/image-8.png 300w, /wp-content/uploads/2023/09/image-8.png 182w" sizes="auto, (max-width: 450px) 100vw, 450px" /></figure></div>



<p>Now we need to start the first piece of logic inside the DOMContentLoaded listener by dispatching the event:</p>



<p class="has-text-align-center"><code>window.dispatchEvent(new Event("DOMContentLoaded"));</code></p>



<p>Now let&#8217;s get a hold on our elements and set the input element with a value:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="100" src="/wp-content/uploads/2023/09/image-10.png" alt="" class="wp-image-1838" srcset="/wp-content/uploads/2023/09/image-10.png 1024w, /wp-content/uploads/2023/09/image-10.png 300w, /wp-content/uploads/2023/09/image-10.png 768w, /wp-content/uploads/2023/09/image-10.png 268w, /wp-content/uploads/2023/09/image-10.png 1176w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>Now we come to a Tauri specific test part. We need to mock the Rust backend.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Mock_the_Tauri_Backend"></span>How to Mock the Tauri Backend<span class="ez-toc-section-end"></span></h3>



<p>In order to mock the Tauri backend, we need to use Tauri test utilities. In this case, we want to mock the IPC. We will import mockIPC like this: <code>import { mockIPC } from "@tauri-apps/api/mocks";</code></p>



<p>We then use it like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="116" src="/wp-content/uploads/2023/09/image-11.png" alt="" class="wp-image-1839" srcset="/wp-content/uploads/2023/09/image-11.png 1000w, /wp-content/uploads/2023/09/image-11.png 300w, /wp-content/uploads/2023/09/image-11.png 768w, /wp-content/uploads/2023/09/image-11.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>This is a very simple API, so the <code>mock</code> looks much like the &#8220;real thing&#8221;.</p>



<p>What it&#8217;s going to do is intercept every call to <code>invoke</code> and return the value returned from the callback. </p>



<p>Now we need two more things: dispatch the form&#8217;s submit event and wait for an event loop cycle for the API to return its value:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="62" src="/wp-content/uploads/2023/09/image-12.png" alt="" class="wp-image-1840" srcset="/wp-content/uploads/2023/09/image-12.png 810w, /wp-content/uploads/2023/09/image-12.png 300w, /wp-content/uploads/2023/09/image-12.png 768w, /wp-content/uploads/2023/09/image-12.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>The first line is pretty straight forward. The second line is an old trick to move one &#8220;tick&#8221; ahead and await for async processes to settle down. Many people do not agree with this method, but sometimes they are a must and in <code>vivid</code> we use them a lot in tests because of the async nature of the Fast templating system.</p>



<p>Finaly, we get to the assertion:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="24" src="/wp-content/uploads/2023/09/image-13.png" alt="" class="wp-image-1841" srcset="/wp-content/uploads/2023/09/image-13.png 1024w, /wp-content/uploads/2023/09/image-13.png 300w, /wp-content/uploads/2023/09/image-13.png 768w, /wp-content/uploads/2023/09/image-13.png 268w, /wp-content/uploads/2023/09/image-13.png 1282w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>We expect the greet message element&#8217;s text to be the expected value.</p>



<p>If we run the test now it will pass. Here&#8217;s the full code of the test:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124520360" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.spec.ts content, created by YonatanKra on 05:59PM on September 03, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.spec.ts">
        <tr>
          <td id="file-main-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">import &#39;./main&#39;;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">import { mockIPC } from &quot;@tauri-apps/api/mocks&quot;;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">describe(&#39;main&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">  it(&#39;should set the greeting message inside the message element&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">    document.body.innerHTML = `</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">      &lt;form id=&quot;greet-form&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">        &lt;input id=&quot;greet-input&quot; /&gt;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">      &lt;/form&gt;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">      &lt;div id=&quot;greet-msg&quot;&gt;&lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">    `;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-main-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">    window.dispatchEvent(new Event(&quot;DOMContentLoaded&quot;));</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-main-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">    const name = &#39;John Doe&#39;;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-main-spec-ts-LC14" class="blob-code blob-code-inner js-file-line">    const greetInputEl = document.querySelector(&quot;#greet-input&quot;) as HTMLInputElement;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-main-spec-ts-LC15" class="blob-code blob-code-inner js-file-line">    const greetMsgEl = document.querySelector(&quot;#greet-msg&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-main-spec-ts-LC16" class="blob-code blob-code-inner js-file-line">    const greetForm = document.querySelector(&quot;#greet-form&quot;) as HTMLFormElement;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-main-spec-ts-LC17" class="blob-code blob-code-inner js-file-line">    greetInputEl.value = name;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-main-spec-ts-LC18" class="blob-code blob-code-inner js-file-line">    mockIPC((cmd, args) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-main-spec-ts-LC19" class="blob-code blob-code-inner js-file-line">      if(cmd === &quot;greet&quot;) {</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-main-spec-ts-LC20" class="blob-code blob-code-inner js-file-line">          return `Hello, ${args.name}! You&#39;ve been greeted from Rust!`;</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-main-spec-ts-LC21" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-main-spec-ts-LC22" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-main-spec-ts-LC23" class="blob-code blob-code-inner js-file-line">    greetForm.dispatchEvent(new Event(&quot;submit&quot;));</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-main-spec-ts-LC24" class="blob-code blob-code-inner js-file-line">    await new Promise((resolve) =&gt; setTimeout(resolve, 0));</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-main-spec-ts-LC25" class="blob-code blob-code-inner js-file-line">    expect(greetMsgEl?.textContent).toBe(`Hello, ${name}! You&#39;ve been greeted from Rust!`);</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-main-spec-ts-LC26" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-main-spec-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-main-spec-ts-LC27" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3b0ea47536296adabae1551d160bb432/raw/0cc2c2c3f5ddaef04ed72c13d780eec757af616b/main.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3b0ea47536296adabae1551d160bb432#file-main-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The full test file</figcaption></figure>



<p>We can always refactor for clarity:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124520421" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-refactored-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="refactored.spec.ts content, created by YonatanKra on 06:04PM on September 03, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="refactored.spec.ts">
        <tr>
          <td id="file-refactored-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-refactored-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">  it(&#39;should set the greeting message inside the message element&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-refactored-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">    setupDomElements();</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-refactored-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">    window.dispatchEvent(new Event(&quot;DOMContentLoaded&quot;));</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-refactored-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-refactored-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">    const name = &#39;John Doe&#39;;</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-refactored-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">    const { greetForm, greetMsgEl } = getElementsAndSetInputValue(name);</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-refactored-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-refactored-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">    mockIPC((cmd, args) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-refactored-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">      if(cmd === &quot;greet&quot;) {</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-refactored-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">          return `Hello, ${args.name}! You&#39;ve been greeted from Rust!`;</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-refactored-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-refactored-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-refactored-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-refactored-spec-ts-LC14" class="blob-code blob-code-inner js-file-line">    await dispatchFormSubmit(greetForm);</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-refactored-spec-ts-LC15" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-refactored-spec-ts-LC16" class="blob-code blob-code-inner js-file-line">    expect(greetMsgEl?.textContent).toBe(`Hello, ${name}! You&#39;ve been greeted from Rust!`);</td>
        </tr>
        <tr>
          <td id="file-refactored-spec-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-refactored-spec-ts-LC17" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/732ab9ffbbfc50da6bb6d887d9a24240/raw/04ff830e6cffab6d5d8805b85240466d3eee7a77/refactored.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/732ab9ffbbfc50da6bb6d887d9a24240#file-refactored-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          refactored.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>It&#8217;s still long, but note this code was not written with testability in mind. It&#8217;s legacy code we covered with a test.</p>



<p>The next step would be to create a login screen for the application, but this will wait for the next article.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Testing is a basic part of every development ecosystem. Vitest is the newest test runner in the JavaScript ecosystem. With this article, combined with <a href="/how-to-write-unit-tests-in-rust-for-tauri/" data-type="post" data-id="1753">the article about setting up unit tests in rust</a>, you now know how to setup a fullstack testing infrastructure in a Tauri project.</p>



<p>In the next posts in this series, we are going to use the knowledge garnered in the articles to build a full application with Tauri as a desktop wrapper, Vivid for frontend components and Firebase for user management and database.</p>



<p><em>Thanks a lot to <a href="https://www.linkedin.com/in/hod-bauer-9786133b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAh0oqwBPCYkshi26qGDzYc8kigkCeI1P_o&amp;lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B0VXd0OyqSEuZ%2BDzSnLvYOQ%3D%3D" target="_blank" rel="noreferrer noopener">Hod Bauer</a> for the kind and thorough review.</em></p>

