---
title: Form Association and Web Components – Today
slug: form-association-and-web-components-today
published: 2020-09-08T14:09:27
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: "Recently I’ve joined a team that’s creating a UI library using web components. This is great – but it has its challenges. One of these challenges is form association behind Shadow DOM. When we create a form, we expect the following from input elements: Add the input element’s value to submission if it has a [&hellip;]"
categories:
  - name: Javascript
    slug: javascript
    path: javascript
tags: []
canonical: https://yonatankra.com/form-association-and-web-components-today/
comments: []
---


<p>Recently I&#8217;ve joined a team that&#8217;s creating a UI library using web components.  This is great &#8211; but it has its challenges.  One of these challenges is form association behind Shadow DOM.</p>



<p>When we create a form, we expect the following from input elements:</p>



<ul class="wp-block-list"><li>Add the input element&#8217;s value to submission if it has a name property</li><li>Enable validation is set (required/pattern/min/max/length/custom)</li></ul>



<p>We also expect buttons of type <strong>submit</strong> and <strong>reset</strong> to work out of the box and actually <strong>validate and submit </strong>and <strong> reset</strong> respectively.</p>



<p>As shown in various other articles (<a href="https://web.dev/more-capable-form-controls/" target="_blank" rel="noreferrer noopener">Arthur Evans on web.dev</a>, <a rel="noreferrer noopener" href="https://www.hjorthhansen.dev/shadow-dom-form-participation/" target="_blank">Paul H. H. Hansen</a>) &#8211; when the input field is hiding behind a shadow DOM (as in many web component based UI components libraries), the above features just wouldn&#8217;t work.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>The examples in this article are based on <a rel="noreferrer noopener" href="https://github.com/YonatanKra/web-components-ui-elements/tree/infrastructure" target="_blank">a simple webpack project</a>. The project setup is described in details in <a rel="noreferrer noopener" href="https://medium.com/search?q=webpack%20yonatan%20kra" target="_blank">former articles</a>. If you want to play with the code, simply clone the repo and checkout the <code>form-association-demo</code> branch.</p></blockquote>



<p></p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1da4d673" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1da4d673"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/form-association-and-web-components-today/#A_Native_Form" >A Native Form</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/form-association-and-web-components-today/#A_Shadow_Form" >A Shadow Form</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/form-association-and-web-components-today/#Adding_the_Button" >Adding the Button</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/form-association-and-web-components-today/#Supporting_Button_Types" >Supporting Button Types</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/form-association-and-web-components-today/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_Native_Form"></span>A Native Form<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s look at an example of how it works without Shadow DOM.</p>



<div class="wp-block-group is-layout-flow wp-block-group-is-layout-flow"><div class="wp-block-group__inner-container"></div></div>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<iframe style="width: 100%; height: 200px; overflow: hidden;" src="/ykdemos/simple-form"></iframe>



<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><em><strong>Example 1: </strong>A simple form with two fields and a submit button. The two fields are required and the email field validates for a valid email address. The onsubmit is set to <code>return false</code> in order to prevent a page refresh on submit. When submitting the form, the form&#8217;s data shows in the <code>Form Output</code> section.</em></p></blockquote>



<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
</div></div>



<p>In <strong>Example 1</strong>, when we click the submit button, we see that the form invalidates and does not submit because one of the fields is required.</p>



<p>Filling all of the fields and clicking the submit button actually submits the form, as can be seen from the output of the <strong>submit event</strong>.</p>



<p>The code is very simple and can be seen here:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist105215775" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-demo-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="demo.html content, created by YonatanKra on 06:33AM on September 05, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="demo.html">
        <tr>
          <td id="file-demo-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-demo-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;style&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-demo-html-LC2" class="blob-code blob-code-inner js-file-line">  form div {</td>
        </tr>
        <tr>
          <td id="file-demo-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-demo-html-LC3" class="blob-code blob-code-inner js-file-line">    margin: 5px 0;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-demo-html-LC4" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-demo-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-demo-html-LC5" class="blob-code blob-code-inner js-file-line">&lt;/style&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-demo-html-LC6" class="blob-code blob-code-inner js-file-line">&lt;form name=&quot;simple-form&quot; id=&quot;simple-form&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-demo-html-LC7" class="blob-code blob-code-inner js-file-line">  &lt;div&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-demo-html-LC8" class="blob-code blob-code-inner js-file-line">    &lt;label for=&quot;name-input&quot;&gt;Name: &lt;/label&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-demo-html-LC9" class="blob-code blob-code-inner js-file-line">    &lt;input required id=&quot;name-input&quot; name=&quot;name&quot; /&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-demo-html-LC10" class="blob-code blob-code-inner js-file-line">  &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-demo-html-LC11" class="blob-code blob-code-inner js-file-line">  &lt;div&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-demo-html-LC12" class="blob-code blob-code-inner js-file-line">    &lt;label for=&quot;email-input&quot;&gt;Email: &lt;/label&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-demo-html-LC13" class="blob-code blob-code-inner js-file-line">    &lt;input required type=&quot;email&quot; id=&quot;email-input&quot; name=&quot;email&quot; /&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-demo-html-LC14" class="blob-code blob-code-inner js-file-line">  &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-demo-html-LC15" class="blob-code blob-code-inner js-file-line">  &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-demo-html-LC16" class="blob-code blob-code-inner js-file-line">&lt;/form&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-demo-html-LC17" class="blob-code blob-code-inner js-file-line">&lt;h2&gt;Form Output&lt;/h2&gt;</td>
        </tr>
        <tr>
          <td id="file-demo-html-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-demo-html-LC18" class="blob-code blob-code-inner js-file-line">&lt;p id=&quot;form-output&quot;&gt;&lt;/p&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3269b95612de887763ae63b9f703121b/raw/776c003538e690a723ddcb829f6d025fbca70538/demo.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3269b95612de887763ae63b9f703121b#file-demo-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          demo.html
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
      aria-label="index.js content, created by YonatanKra on 06:33AM on September 05, 2020."
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
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line">import template from &quot;./demo.html&quot;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">document.body.innerHTML = template;</td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-js-LC5" class="blob-code blob-code-inner js-file-line">(function () {</td>
        </tr>
        <tr>
          <td id="file-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-js-LC6" class="blob-code blob-code-inner js-file-line">  const output = document.getElementById(&quot;form-output&quot;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-js-LC7" class="blob-code blob-code-inner js-file-line">  const form = document.getElementById(&quot;simple-form&quot;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-js-LC8" class="blob-code blob-code-inner js-file-line">  form.onsubmit = () =&gt; false;</td>
        </tr>
        <tr>
          <td id="file-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-js-LC9" class="blob-code blob-code-inner js-file-line">  console.log(&quot;Ready&quot;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-js-LC11" class="blob-code blob-code-inner js-file-line">  form.addEventListener(&quot;submit&quot;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-js-LC12" class="blob-code blob-code-inner js-file-line">    const formData = new FormData(form);</td>
        </tr>
        <tr>
          <td id="file-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-js-LC14" class="blob-code blob-code-inner js-file-line">    let outputHTML = &quot;&quot;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-js-LC15" class="blob-code blob-code-inner js-file-line">    for (var pair of formData.entries()) {</td>
        </tr>
        <tr>
          <td id="file-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-js-LC16" class="blob-code blob-code-inner js-file-line">      outputHTML += `&lt;div&gt;${pair[0]}: ${pair[1]}&lt;/div&gt;`;</td>
        </tr>
        <tr>
          <td id="file-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-js-LC17" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-js-LC18" class="blob-code blob-code-inner js-file-line">    output.innerHTML = outputHTML;</td>
        </tr>
        <tr>
          <td id="file-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-js-LC19" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-index-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-index-js-LC20" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3269b95612de887763ae63b9f703121b/raw/776c003538e690a723ddcb829f6d025fbca70538/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3269b95612de887763ae63b9f703121b#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>You can view the whole branch here: <a href="https://github.com/YonatanKra/web-components-ui-elements/tree/simple-form" target="_blank" rel="noreferrer noopener">https://github.com/YonatanKra/web-components-ui-elements/tree/simple-form</a></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_Shadow_Form"></span>A Shadow Form<span class="ez-toc-section-end"></span></h2>



<p>Our form is not so impressive UX-wise. Our awesome designers have decided we should go with a material look to our form.  </p>



<p>Because our company has lots of apps, each built with a different technology (vue, angular, react, etc.),  we are going to use the &#8220;use everywhere&#8221; technology: <strong>Web Components</strong>. </p>



<p>We have decided to pick a project with a very promising name: <strong><a href="https://github.com/material-components/material-components-web-components" target="_blank" rel="noreferrer noopener">Material Web Components</a></strong>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Adding_the_Button"></span>Adding the Button<span class="ez-toc-section-end"></span></h3>



<p>Let&#8217;s start with something simple. We&#8217;d like our button to look better. </p>



<p>That&#8217;s pretty simple:</p>



<ol class="wp-block-list"><li>yarn add @material/mwc-button</li><li>In the <code>index.js</code> file we add <code>import @material/mwc-button</code></li><li>In the <code>demo.html</code> file we replace the <code>button</code> tag with <code>mwc-button</code></li></ol>



<p><a href="https://github.com/YonatanKra/web-components-ui-elements/commit/fd88d0a8184492b1dedaf3124d8bf236252c368d" target="_blank" rel="noreferrer noopener">Click here to view the git diff.</a></p>



<p>The result is this:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<iframe style="width: 100%; height: 200px; overflow: hidden;" src="/ykdemos/mwc-button-naive"></iframe>



<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><em><strong>Example 2:</strong> The same form from <strong>Example 1</strong> with the <code>mwc-button</code>. You can try to click the button &#8211; and even though its type is <code>submit</code> nothing happens.</em></p></blockquote>



<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>



<p>Now our app is broken &#8211; the form doesn&#8217;t submit if we click the button. The same would apply to a reset button as well as to a button that is explicitly attached to a form (by adding <code>form="simple-form"</code> attribute to the button). </p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Supporting_Button_Types"></span>Supporting Button Types<span class="ez-toc-section-end"></span></h3>



<p>In order to support form submission and reset, we&#8217;d need to change our web component a bit.</p>



<p>We will create a new component that extends the <code>mwc-button</code> and add the following:</p>



<ol class="wp-block-list"><li>Handle button click according to the button&#8217;s type (submit/reset)</li><li>Handle a <code>form</code> attribute to allow association to an external form</li></ol>



<p>We will register a new <code>mfa-button</code> (mfa &#8211; material form associated) and replace <code>mwc-button</code> with <code>mfa-button</code> in the template file.</p>



<p>You can see it working in Example 3:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<iframe style="width: 100%; height: 200px; overflow: hidden;" src="/ykdemos/mfa-button"></iframe>



<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><em><strong>Example 3: </strong>Same simple form shown in <strong>Example 2</strong>, this time with the <code>mfa-button</code>. Note that validation works again as well as submission and reset.</em></p></blockquote>



<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
</div></div>



<p><a rel="noreferrer noopener" href="https://github.com/YonatanKra/web-components-ui-elements/commit/b557f03179176c5a85c1ef133a25e8e129252435" target="_blank">Click here for the full commit diff</a></p>



<p>Here&#8217;s the extended button&#8217;s code:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist105216523" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-mfa-button-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="mfa-button.js content, created by YonatanKra on 08:19AM on September 05, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="mfa-button.js">
        <tr>
          <td id="file-mfa-button-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-mfa-button-js-LC1" class="blob-code blob-code-inner js-file-line">import { Button as MWCButton } from &#39;@material/mwc-button&#39;;</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-mfa-button-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-mfa-button-js-LC3" class="blob-code blob-code-inner js-file-line">export class MFAButton extends MWCButton {</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-mfa-button-js-LC4" class="blob-code blob-code-inner js-file-line">    constructor() {</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-mfa-button-js-LC5" class="blob-code blob-code-inner js-file-line">        super();</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-mfa-button-js-LC6" class="blob-code blob-code-inner js-file-line">        this.addEventListener(&#39;click&#39;, this._handleClick);</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-mfa-button-js-LC7" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-mfa-button-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-mfa-button-js-LC9" class="blob-code blob-code-inner js-file-line">    _handleClick(event) {</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-mfa-button-js-LC10" class="blob-code blob-code-inner js-file-line">        const formId = this.getAttribute(&#39;form&#39;);</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-mfa-button-js-LC11" class="blob-code blob-code-inner js-file-line">        const form = formId ?</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-mfa-button-js-LC12" class="blob-code blob-code-inner js-file-line">            document.getElementById(formId) : this.closest(&#39;form&#39;);</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-mfa-button-js-LC13" class="blob-code blob-code-inner js-file-line">        </td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-mfa-button-js-LC14" class="blob-code blob-code-inner js-file-line">        if (form) {</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-mfa-button-js-LC15" class="blob-code blob-code-inner js-file-line">            switch(this.getAttribute(&#39;type&#39;)) {</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-mfa-button-js-LC16" class="blob-code blob-code-inner js-file-line">                case &#39;reset&#39;:</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-mfa-button-js-LC17" class="blob-code blob-code-inner js-file-line">                    form.reset();</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-mfa-button-js-LC18" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-mfa-button-js-LC19" class="blob-code blob-code-inner js-file-line">                default:</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-mfa-button-js-LC20" class="blob-code blob-code-inner js-file-line">                    form.requestSubmit();</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-mfa-button-js-LC21" class="blob-code blob-code-inner js-file-line">                    break;</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-mfa-button-js-LC22" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-mfa-button-js-LC23" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-mfa-button-js-LC24" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-mfa-button-js-LC25" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-mfa-button-js-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-mfa-button-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-mfa-button-js-LC27" class="blob-code blob-code-inner js-file-line">window.customElements.define(&#39;mfa-button&#39;, MFAButton);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e3f1f5068678a3c31c9652a58a951706/raw/afe5ab223a6bac9026871d9a877373d24b92f94b/mfa-button.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e3f1f5068678a3c31c9652a58a951706#file-mfa-button-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          mfa-button.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>In the button&#8217;s constructor, we add a listener that handles a click and fires <code>_handleClick</code>. </p>



<p>The magic happen inside <code>_handleClick</code>: we get the form either by id or the closest form. If the form exists, we either reset it or submit it.</p>



<p>Note we use <code>requestSubmit</code> and not simple <code>submit</code>. This is in order to emulate a submit via a button and enact all the form&#8217;s goodies like validation.</p>
</div></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this article we saw that web components might not always play &#8220;out of the box&#8221; with the bigger apps.</p>



<p>In this case, we saw that a simple button stopped interacting with the hosting form. We solved it by implementing the form API and &#8220;manually&#8221; associating the button with the form.</p>



<p>Worth to note that&#8217;s <a rel="noreferrer noopener" href="https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface" target="_blank">a spec is on its way</a> (for quite a while) to solve this. Since it isn&#8217;t here now and it does not even appear in <a rel="noreferrer noopener" href="http://caniuse.com" target="_blank">caniuse.com</a>, we had to find another solution for our custom form elements to be associated with a form.</p>



<p>In the next article I&#8217;ll explain how we can associate input elements with a form (hint: it could have been similar if not for Safari&#8230;).</p>



<p>In the meantime I recommend cloning the repository and checking out the <code>form-association-demo</code> branch. You could try to add a reset button or one of the <code>mwc</code> input elements like <code>@material/text-field</code> and see if you can make it work the same way.</p>



<p>Hope you learned something new 🙂</p>



<p>As usual, your comments are more than welcome!</p>



<p>Thanks a lot to <a rel="noreferrer noopener" href="https://twitter.com/jodoron" target="_blank">Yonatan Doron</a> from <a rel="noreferrer noopener" href="https://hodash.dev/" target="_blank">Hodash.dev</a> for a thorough review!</p>

