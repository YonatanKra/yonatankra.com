---
title: 3 Simple Habits to Improve Your Tests
slug: 3-simple-habits-to-improve-your-tests
published: 2023-02-12T15:32:01
updated: 2023-02-12T15:32:06
author: Yonatan Kra
description: How can tests be your best documentation? What small changes can improve the contract between your code and its consumers? Learn how to improve your tests from a real-world example. Yes, we write them to ensure fewer things break before you push changes (a.k.a regression). The thing is – tests can be more than just [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - javascript
  - testing
canonical: https://yonatankra.com/3-simple-habits-to-improve-your-tests/
comments: []
---

<p class="has-medium-font-size">How can tests be your best documentation? What small changes can improve the contract between your code and its consumers? Learn how to improve your tests from a real-world example.</p>



<p>Yes, we write them to ensure fewer things break before you push changes (a.k.a regression). The thing is &#8211; tests can be more than just “tests”. They can be a living and breathing documentation of your contract with your users/consumers. They can be documentation for other developers.</p>



<p>Let&#8217;s review three simple habits that can improve your tests.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b3c6316" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b3c6316"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-1" href="/3-simple-habits-to-improve-your-tests/#Writing_a_Test" >Writing a Test</a><ul class='ez-toc-list-level-2' ><li class='ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/3-simple-habits-to-improve-your-tests/#Improve_Your_Tests_Step_1_Describe_the_API" >Improve Your Tests Step #1: Describe the API</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/3-simple-habits-to-improve-your-tests/#Improve_Your_Tests_Step_2_Documenting_the_APIs_Usage" >Improve Your Tests Step #2: Documenting the API&#8217;s Usage</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/3-simple-habits-to-improve-your-tests/#Improve_Your_Tests_Step_3_Creating_Triple-A_Tests" >Improve Your Tests Step #3: Creating Triple-A Tests</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/3-simple-habits-to-improve-your-tests/#Summary" >Summary</a></li></ul></li></ul></nav></div>
<h1 class="wp-block-heading"><span class="ez-toc-section" id="Writing_a_Test"></span>Writing a Test<span class="ez-toc-section-end"></span></h1>



<p>Our story begins with an accordion component:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="576" height="313" src="/wp-content/uploads/2023/02/image.png" alt="" class="wp-image-1655" srcset="/wp-content/uploads/2023/02/image.png 576w, /wp-content/uploads/2023/02/image.png 300w, /wp-content/uploads/2023/02/image.png 166w" sizes="auto, (max-width: 576px) 100vw, 576px" /></figure></div>



<p>This accordion component has an <code>expandmode</code> API. It can either allow a single item or multiple items to be expanded at the same time.</p>



<p>In the test, we&#8217;d like to test the <code>single</code> and the <code>multi</code>. </p>



<p>This is the original test written by the accordion&#8217;s developer:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist120349670" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-test-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="test.ts content, created by YonatanKra on 04:47AM on January 19, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="test.ts">
        <tr>
          <td id="file-test-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-test-ts-LC1" class="blob-code blob-code-inner js-file-line">describe(&#39;non multi&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-test-ts-LC2" class="blob-code blob-code-inner js-file-line">	it(&#39;should only allow one accordion items open at a time&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-test-ts-LC3" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-test-ts-LC4" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-test-ts-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-test-ts-LC6" class="blob-code blob-code-inner js-file-line">		accordionItem1.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-test-ts-LC7" class="blob-code blob-code-inner js-file-line">		accordionItem2.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-test-ts-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-test-ts-LC9" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-test-ts-LC10" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-test-ts-LC11" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-test-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-test-ts-LC12" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-test-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-test-ts-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-test-ts-LC14" class="blob-code blob-code-inner js-file-line">describe(&#39;multi&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-test-ts-LC15" class="blob-code blob-code-inner js-file-line">     it(&#39;should allow all accordion items open when multi&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-test-ts-LC16" class="blob-code blob-code-inner js-file-line">         element.expandmode = &#39;multi&#39;;</td>
        </tr>
        <tr>
          <td id="file-test-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-test-ts-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-test-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-test-ts-LC19" class="blob-code blob-code-inner js-file-line">         expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-test-ts-LC20" class="blob-code blob-code-inner js-file-line">         expect(accordionItem2.expanded).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-test-ts-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-test-ts-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-test-ts-LC23" class="blob-code blob-code-inner js-file-line">         accordionItem1.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-test-ts-LC24" class="blob-code blob-code-inner js-file-line">         accordionItem2.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-test-ts-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-test-ts-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-test-ts-LC27" class="blob-code blob-code-inner js-file-line">         expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-test-ts-LC28" class="blob-code blob-code-inner js-file-line">         expect(accordionItem2.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-test-ts-LC29" class="blob-code blob-code-inner js-file-line">     });</td>
        </tr>
        <tr>
          <td id="file-test-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-test-ts-LC30" class="blob-code blob-code-inner js-file-line"> });</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/bd9c6305ab984a133c9ea2cc61ef4802/raw/51eafaf2158c2befbd7dce85a020af1fb268f384/test.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/bd9c6305ab984a133c9ea2cc61ef4802#file-test-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          test.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The <code>describe</code> in lines (lines 1 and 14) tell us we test the <code>non multi</code> and <code>multi</code> cases. </p>



<p>The tests themselves are also explained in the <code>it</code> use cases (lines 2 and 15).</p>



<p>The test for the <code>single</code> mode is as follows:</p>



<ol class="wp-block-list"><li>Expect both items to be closed (<code>open</code> property of both items to be false)</li><li>Action &#8211; set both items to true</li><li>Assertion &#8211; expect the first item to be closed and the second item to be open</li></ol>



<p>Sounds like we are testing what we want, right?</p>



<p>The test for the <code>multi</code> case is quite similar:</p>



<ol class="wp-block-list"><li>Change <code>expandmode</code> to <code>multi</code></li><li>Expect item1 to be open and item2 to be closed</li><li>Open both items</li><li>Expect both items to be open</li></ol>



<p>Tests what we want? Could be. Can we be more explicit in defining our API? Let&#8217;s see.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Improve_Your_Tests_Step_1_Describe_the_API"></span>Improve Your Tests Step #1: Describe the API<span class="ez-toc-section-end"></span></h2>



<p>The “describe” section doesn’t state the API used. We should group the two use cases under  <code>expandmode</code> like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist120349719" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-test-better-describe-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="test-better-describe.ts content, created by YonatanKra on 04:52AM on January 19, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="test-better-describe.ts">
        <tr>
          <td id="file-test-better-describe-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-test-better-describe-ts-LC1" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-test-better-describe-ts-LC2" class="blob-code blob-code-inner js-file-line">describe(&#39;expandmode&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-test-better-describe-ts-LC3" class="blob-code blob-code-inner js-file-line">	it(&#39;should only allow one accordion items open at a time&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-test-better-describe-ts-LC4" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-test-better-describe-ts-LC5" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-test-better-describe-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-test-better-describe-ts-LC7" class="blob-code blob-code-inner js-file-line">		accordionItem1.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-test-better-describe-ts-LC8" class="blob-code blob-code-inner js-file-line">		accordionItem2.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-test-better-describe-ts-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-test-better-describe-ts-LC10" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-test-better-describe-ts-LC11" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-test-better-describe-ts-LC12" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-test-better-describe-ts-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-test-better-describe-ts-LC14" class="blob-code blob-code-inner js-file-line">   it(&#39;should allow all accordion items open when multi&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-test-better-describe-ts-LC15" class="blob-code blob-code-inner js-file-line">	      element.expandmode = &#39;multi&#39;;</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-test-better-describe-ts-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-test-better-describe-ts-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-test-better-describe-ts-LC18" class="blob-code blob-code-inner js-file-line">	      expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-test-better-describe-ts-LC19" class="blob-code blob-code-inner js-file-line">	      expect(accordionItem2.expanded).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-test-better-describe-ts-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-test-better-describe-ts-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-test-better-describe-ts-LC22" class="blob-code blob-code-inner js-file-line">	      accordionItem1.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-test-better-describe-ts-LC23" class="blob-code blob-code-inner js-file-line">	      accordionItem2.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-test-better-describe-ts-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-test-better-describe-ts-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-test-better-describe-ts-LC26" class="blob-code blob-code-inner js-file-line">	      expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-test-better-describe-ts-LC27" class="blob-code blob-code-inner js-file-line">	      expect(accordionItem2.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-test-better-describe-ts-LC28" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-test-better-describe-ts-LC29" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-test-better-describe-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-test-better-describe-ts-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/5b0b2ce18d7554120bc2d15fd57710b0/raw/5e0046164c37f177f0e634c5660e605953a8e733/test-better-describe.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/5b0b2ce18d7554120bc2d15fd57710b0#file-test-better-describe-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          test-better-describe.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>By grouping use cases according to their API’s (in this case, the <code>expandmode</code> property), we make it more apparent to the reader what the API is. </p>



<p>If we follow this small habit throughout our tests, our test files will look like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="294" src="/wp-content/uploads/2023/02/image-1.png" alt="" class="wp-image-1660" srcset="/wp-content/uploads/2023/02/image-1.png 1024w, /wp-content/uploads/2023/02/image-1.png 300w, /wp-content/uploads/2023/02/image-1.png 768w, /wp-content/uploads/2023/02/image-1.png 196w, /wp-content/uploads/2023/02/image-1.png 1058w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>How the documentation looks like in our test for our <code>module/component/class</code>. Each API has its own <code>describe</code> in which we add <code>it</code>s which are practically use cases</figcaption></figure></div>



<p>We will create something marvelous called: “Documentation”.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Improve_Your_Tests_Step_2_Documenting_the_APIs_Usage"></span>Improve Your Tests Step #2: Documenting the API&#8217;s Usage<span class="ez-toc-section-end"></span></h2>



<p>In the <code>single</code> step, the API usage is implicit. We should strive to show explicitly how to use it:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist120349765" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-test-explicit-arrange-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="test-explicit-arrange.ts content, created by YonatanKra on 04:58AM on January 19, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="test-explicit-arrange.ts">
        <tr>
          <td id="file-test-explicit-arrange-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-test-explicit-arrange-ts-LC1" class="blob-code blob-code-inner js-file-line">describe(&#39;expandmode&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-test-explicit-arrange-ts-LC2" class="blob-code blob-code-inner js-file-line">	it(&#39;should allow one accordion items open when set to “single”&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-test-explicit-arrange-ts-LC3" class="blob-code blob-code-inner js-file-line">		element.expandedmode = ‘single’;</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-test-explicit-arrange-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-test-explicit-arrange-ts-LC5" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-test-explicit-arrange-ts-LC6" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-test-explicit-arrange-ts-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-test-explicit-arrange-ts-LC8" class="blob-code blob-code-inner js-file-line">		accordionItem1.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-test-explicit-arrange-ts-LC9" class="blob-code blob-code-inner js-file-line">		accordionItem2.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-test-explicit-arrange-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-test-explicit-arrange-ts-LC11" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-test-explicit-arrange-ts-LC12" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-test-explicit-arrange-ts-LC13" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-test-explicit-arrange-ts-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-test-explicit-arrange-ts-LC15" class="blob-code blob-code-inner js-file-line">   it(&#39;should allow multiple items to open when set to “multi”&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-test-explicit-arrange-ts-LC16" class="blob-code blob-code-inner js-file-line">		  element.expandmode = &#39;multi&#39;;</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-test-explicit-arrange-ts-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-test-explicit-arrange-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-test-explicit-arrange-ts-LC19" class="blob-code blob-code-inner js-file-line">		  expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-test-explicit-arrange-ts-LC20" class="blob-code blob-code-inner js-file-line">		  expect(accordionItem2.expanded).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-test-explicit-arrange-ts-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-test-explicit-arrange-ts-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-test-explicit-arrange-ts-LC23" class="blob-code blob-code-inner js-file-line">		  accordionItem1.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-test-explicit-arrange-ts-LC24" class="blob-code blob-code-inner js-file-line">		  accordionItem2.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-test-explicit-arrange-ts-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-test-explicit-arrange-ts-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-test-explicit-arrange-ts-LC27" class="blob-code blob-code-inner js-file-line">		  expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-test-explicit-arrange-ts-LC28" class="blob-code blob-code-inner js-file-line">		  expect(accordionItem2.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-test-explicit-arrange-ts-LC29" class="blob-code blob-code-inner js-file-line">   });</td>
        </tr>
        <tr>
          <td id="file-test-explicit-arrange-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-test-explicit-arrange-ts-LC30" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c1f9acbd03d942eda8b7533a0078e7ba/raw/9504f20b5d460373a6572537185495a8e1f93704/test-explicit-arrange.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c1f9acbd03d942eda8b7533a0078e7ba#file-test-explicit-arrange-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          test-explicit-arrange.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>By stating the setup explicitly (in this simple case, <code>element.expandmode = 'single'</code>), we tell the reader: “This is how you use this API”.</p>



<p>Remember we are creating documentation? This is a live example of how the API is used right before we assert the usage works as expected.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Improve_Your_Tests_Step_3_Creating_Triple-A_Tests"></span>Improve Your Tests Step #3: Creating Triple-A Tests<span class="ez-toc-section-end"></span></h2>



<p>Many standards were developed to help us avoid common pitfalls.</p>



<p><a href="https://blog.cleancoder.com/uncle-bob/2018/06/06/PickledState.html" data-type="URL" data-id="https://blog.cleancoder.com/uncle-bob/2018/06/06/PickledState.html" target="_blank" rel="noreferrer noopener">The AAA pattern(<code>Arrange, Act Assert</code>)</a> is one of them. </p>



<p>In its essence it states that the tests comprise of three parts: </p>



<ol class="wp-block-list"><li>Arrangement &#8211; setup the scenario for the test.</li><li>Action &#8211; the action that should trigger the use case tested.</li><li>Assertion &#8211; our expectations for the action&#8217;s results in the given setup.</li></ol>



<p>Here&#8217;s the code after a change to reflect the AAA pattern:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist120349794" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-test-aaa-pattern-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="test-aaa-pattern.ts content, created by YonatanKra on 05:01AM on January 19, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="test-aaa-pattern.ts">
        <tr>
          <td id="file-test-aaa-pattern-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-test-aaa-pattern-ts-LC1" class="blob-code blob-code-inner js-file-line">describe(&#39;expandmode&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-test-aaa-pattern-ts-LC2" class="blob-code blob-code-inner js-file-line">	it(&#39;should allow one accordion items open when set to “single”&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-test-aaa-pattern-ts-LC3" class="blob-code blob-code-inner js-file-line">		element.expandedmode = ‘single’;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-test-aaa-pattern-ts-LC4" class="blob-code blob-code-inner js-file-line">		const accordionItem1OpenStateBefore = accordionItem1.open;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-test-aaa-pattern-ts-LC5" class="blob-code blob-code-inner js-file-line">		const accordionItem2OpenStateBefore = accordionItem2.open;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-test-aaa-pattern-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-test-aaa-pattern-ts-LC7" class="blob-code blob-code-inner js-file-line">		accordionItem1.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-test-aaa-pattern-ts-LC8" class="blob-code blob-code-inner js-file-line">		accordionItem2.open = true;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-test-aaa-pattern-ts-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-test-aaa-pattern-ts-LC10" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1OpenStateBefore).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-test-aaa-pattern-ts-LC11" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2OpenStateBefore).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-test-aaa-pattern-ts-LC12" class="blob-code blob-code-inner js-file-line">		expect(accordionItem1.open).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-test-aaa-pattern-ts-LC13" class="blob-code blob-code-inner js-file-line">		expect(accordionItem2.open).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-test-aaa-pattern-ts-LC14" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-test-aaa-pattern-ts-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-test-aaa-pattern-ts-LC16" class="blob-code blob-code-inner js-file-line">   it(&#39;should allow multiple items to open when set to “multi”&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-test-aaa-pattern-ts-LC17" class="blob-code blob-code-inner js-file-line">	  element.expandmode = &#39;multi&#39;;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-test-aaa-pattern-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-test-aaa-pattern-ts-LC19" class="blob-code blob-code-inner js-file-line">	  const accordionItem1OpenStateBefore = accordionItem1.open;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-test-aaa-pattern-ts-LC20" class="blob-code blob-code-inner js-file-line">	  const accordionItem2OpenStateBefore = accordionItem2.open;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-test-aaa-pattern-ts-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-test-aaa-pattern-ts-LC22" class="blob-code blob-code-inner js-file-line">	  accordionItem1.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-test-aaa-pattern-ts-LC23" class="blob-code blob-code-inner js-file-line">	  accordionItem2.expanded = true;</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-test-aaa-pattern-ts-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-test-aaa-pattern-ts-LC25" class="blob-code blob-code-inner js-file-line">	  expect(accordionItem1OpenStateBefore).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-test-aaa-pattern-ts-LC26" class="blob-code blob-code-inner js-file-line">	  expect(accordionItem2OpenStateBefore).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-test-aaa-pattern-ts-LC27" class="blob-code blob-code-inner js-file-line">	  expect(accordionItem1.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-test-aaa-pattern-ts-LC28" class="blob-code blob-code-inner js-file-line">	  expect(accordionItem2.expanded).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-test-aaa-pattern-ts-LC29" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-test-aaa-pattern-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-test-aaa-pattern-ts-LC30" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/cd77210109366981d088146796e41d63/raw/8450e6bc2501e7b45c947fba4093b8ca3ef25588/test-aaa-pattern.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/cd77210109366981d088146796e41d63#file-test-aaa-pattern-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          test-aaa-pattern.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Now all of the setup is being made at the top, the actions in the middle, and the expectations at the bottom. </p>



<p>This pattern repeats itself in all tests; the reader knows what to expect in every test case. This reduces the cognitive load on the reader in many cases.</p>



<p>Another benefit of the AAA pattern is to raise a red flag. Sometimes it would seem that the pattern cannot always be implemented. For example, a test might have more than one step (a.k.a multiple Actions). This could hint on several &#8220;smells&#8221; like:</p>



<ul class="wp-block-list"><li>We are testing more than one use-case and should consider splitting the test block.</li><li>Our implementation is too complex (it usually happens with TAD (Test After Development)). </li></ul>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>The code review above shows a refactor to two very simple tests. After this short refactor, we can easily discern our API and how to use it:</p>



<p><code>expandmode</code> API =&gt; has <code>single</code> and <code>multi</code> use cases =&gt; we can use it by setting the property with the string value. We also know what to expect from changing it.</p>



<p>When looking at bigger test suites, the benefits of these three steps will be much more noticeable:</p>



<ul class="wp-block-list"><li>Our API will be fully documented with usage examples</li><li>Our API will be safer to refactor and extend</li><li>We are less likely to miss use cases, and new use cases for API&#8217;s have a clear place</li><li>We increased readability project-wide (if said practices were used project-wide)</li></ul>



<p>For more tests tips, <a href="/category/testing/" data-type="URL" data-id="https://yonatankra.com/category/testing/">check this link</a></p>

