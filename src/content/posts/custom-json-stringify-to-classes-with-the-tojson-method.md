---
title: Custom JSON.stringify to Classes with the toJSON method
slug: custom-json-stringify-to-classes-with-the-tojson-method
published: 2021-09-21T19:55:06
updated: 2021-09-21T19:55:07
author: Yonatan Kra
description: The toJSON method allows you to tell JSON.stringify how to print out your Class. This can be pretty useful… Why Stringify Objects? The answer for that is as usual – there are many reasons. The most obvious one is to send the object to a remote service as payload to a request. Other reasons can [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - javascript
canonical: https://yonatankra.com/custom-json-stringify-to-classes-with-the-tojson-method/
comments:
  - author: Piotr Zientara
    date: 2021-09-21T20:33:50
    content: |
      <p>I find this insightful, and I never thought of this `toJSON` getter. Looks like an intro to an interesting pattern that can help the code to remain clean. Thank you Yonatan for sharing this!</p>
---

<p class="has-medium-font-size">The <code>toJSON</code> method allows you to tell <code>JSON.stringify</code> how to print out your <code>Class</code>. This can be pretty useful&#8230;</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1c172306" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1c172306"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/custom-json-stringify-to-classes-with-the-tojson-method/#Why_Stringify_Objects" >Why Stringify Objects?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/custom-json-stringify-to-classes-with-the-tojson-method/#Your_Class_as_a_JSON" >Your Class as a JSON</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/custom-json-stringify-to-classes-with-the-tojson-method/#Defining_how_to_your_class_is_stringified_using_toJSON" >Defining how to your class is stringified using toJSON</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/custom-json-stringify-to-classes-with-the-tojson-method/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Why_Stringify_Objects"></span>Why Stringify Objects?<span class="ez-toc-section-end"></span></h2>



<p>The answer for that is as usual &#8211; there are many reasons.  The most obvious one is to send the object to a remote service as payload to a request.  Other reasons can be: </p>



<ul class="wp-block-list"><li>Create a hash from a JSON (I learned this trick from <a rel="noreferrer noopener" href="https://github.com/CesiumGS/cesium/blob/48c8abaca6257b568edc8c992ede5f2c487cdd38/Source/Core/PinBuilder.js#L198" data-type="URL" data-id="https://github.com/CesiumGS/cesium/blob/48c8abaca6257b568edc8c992ede5f2c487cdd38/Source/Core/PinBuilder.js#L198" target="_blank">Cesium</a> back in the days), </li><li>deep clone an object (<code>const dupe = JSON.parse(JSON.stringify(duped));</code>) &#8211; not really recommended in production, but possible&#8230;</li><li>Logging</li></ul>



<p>There are probably more reasons, but that&#8217;s not the point. The thing is &#8211; there are times when you&#8217;d like to stringify your objects.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Your_Class_as_a_JSON"></span>Your Class as a JSON<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s create a simple class and stringify its instance:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111932883" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-tojson-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="toJSON.js content, created by YonatanKra on 07:55AM on September 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="toJSON.js">
        <tr>
          <td id="file-tojson-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-tojson-js-LC1" class="blob-code blob-code-inner js-file-line">class MyClass {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-tojson-js-LC2" class="blob-code blob-code-inner js-file-line">  #somethingCool = 5;</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-tojson-js-LC3" class="blob-code blob-code-inner js-file-line">  get somethingCool() {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-tojson-js-LC4" class="blob-code blob-code-inner js-file-line">    return this.#somethingCool; </td>
        </tr>
        <tr>
          <td id="file-tojson-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-tojson-js-LC5" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-tojson-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-tojson-js-LC7" class="blob-code blob-code-inner js-file-line">  set somethingCool(value) {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-tojson-js-LC8" class="blob-code blob-code-inner js-file-line">    this.#somethingCool = value; </td>
        </tr>
        <tr>
          <td id="file-tojson-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-tojson-js-LC9" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-tojson-js-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-tojson-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-tojson-js-LC12" class="blob-code blob-code-inner js-file-line">const x = new MyClass();</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-tojson-js-LC13" class="blob-code blob-code-inner js-file-line">JSON.stringify(x); // &#39;{}&#39;</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-tojson-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-tojson-js-LC15" class="blob-code blob-code-inner js-file-line">x.somethingCool = 10;</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-tojson-js-LC16" class="blob-code blob-code-inner js-file-line">JSON.stringify(x); // &#39;{}&#39;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/f71ae8690ad23af9061f6141327464c6/raw/0a8f2fcb8c01a8e12f2bcc6a0f732b6c77c24103/toJSON.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/f71ae8690ad23af9061f6141327464c6#file-tojson-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          toJSON.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p><code>MyClass</code> will have a private property <code>#somethingCool</code> which is not accessible outside the class itself.  It has a setter and a getter to interact with it.  Trying to stringify our class&#8217;s instance results in an empty object:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="282" src="/wp-content/uploads/2021/09/image-14.png" alt="" class="wp-image-1113" srcset="/wp-content/uploads/2021/09/image-14.png 754w, /wp-content/uploads/2021/09/image-14.png 300w, /wp-content/uploads/2021/09/image-14.png 204w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Stringifying my class gives me an empty object&#8230;</figcaption></figure></div>



<p>Is this how we&#8217;d expect our JSON to look like? I think that in most cases we would not&#8230; Imagine your logs missing a crucial property that&#8217;s built from a <code>getter</code>. Bummer&#8230;</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Defining_how_to_your_class_is_stringified_using_toJSON"></span>Defining how to your class is stringified using <code>toJSON</code><span class="ez-toc-section-end"></span></h2>



<p>By adding a <code>toJSON</code> method to your class, <code>JSON.stringify</code> will know how to print your class instance:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111933061" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-tojson-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="toJSON.js content, created by YonatanKra on 08:09AM on September 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="toJSON.js">
        <tr>
          <td id="file-tojson-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-tojson-js-LC1" class="blob-code blob-code-inner js-file-line">class MyClass {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-tojson-js-LC2" class="blob-code blob-code-inner js-file-line">  #somethingCool = 5;</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-tojson-js-LC3" class="blob-code blob-code-inner js-file-line">  get somethingCool() {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-tojson-js-LC4" class="blob-code blob-code-inner js-file-line">    return this.#somethingCool; </td>
        </tr>
        <tr>
          <td id="file-tojson-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-tojson-js-LC5" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-tojson-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-tojson-js-LC7" class="blob-code blob-code-inner js-file-line">  set somethingCool(value) {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-tojson-js-LC8" class="blob-code blob-code-inner js-file-line">    this.#somethingCool = value; </td>
        </tr>
        <tr>
          <td id="file-tojson-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-tojson-js-LC9" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-tojson-js-LC10" class="blob-code blob-code-inner js-file-line">  toJSON() {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-tojson-js-LC11" class="blob-code blob-code-inner js-file-line">    return {</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-tojson-js-LC12" class="blob-code blob-code-inner js-file-line">      somethingCool: this.somethingCool, </td>
        </tr>
        <tr>
          <td id="file-tojson-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-tojson-js-LC13" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-tojson-js-LC14" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-tojson-js-LC15" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-tojson-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-tojson-js-LC17" class="blob-code blob-code-inner js-file-line">const x = new MyClass();</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-tojson-js-LC18" class="blob-code blob-code-inner js-file-line">JSON.stringify(x); // &#39;{&quot;somethingCool&quot;: 5}&#39;</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-tojson-js-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-tojson-js-LC20" class="blob-code blob-code-inner js-file-line">x.somethingCool = 10;</td>
        </tr>
        <tr>
          <td id="file-tojson-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-tojson-js-LC21" class="blob-code blob-code-inner js-file-line">JSON.stringify(x); // &#39;{&quot;somethingCool&quot;: 10}&#39;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/f50977caf38591efb7d79947415deece/raw/0514ad502274b61af55d9c2200fa0b0edf561ca8/toJSON.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/f50977caf38591efb7d79947415deece#file-tojson-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          toJSON.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The difference between the last class above and the class in the former part of the article is the <code>toJSON</code> method.  In this case, it returns an object with a <code>somethingCool</code> property with the value of <code>somethingCool</code> as returned from our <code>getter</code>.</p>



<p>Using <code>JSON.stringify</code> results in what we&#8217;d expect:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="586" height="216" src="/wp-content/uploads/2021/09/image-15.png" alt="" class="wp-image-1114" srcset="/wp-content/uploads/2021/09/image-15.png 586w, /wp-content/uploads/2021/09/image-15.png 300w, /wp-content/uploads/2021/09/image-15.png 244w" sizes="auto, (max-width: 586px) 100vw, 586px" /><figcaption>The class with a custom <code>toJSON</code> stringified.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p><code>JSON.stringify</code> is a very useful tool.  When using complex classes/objects with setters, getters and possible decorators the outcome of the stringification might lack some properties we&#8217;d expect to be there.<br><br>Using <code>toJSON</code> enables us to define what properties to output as part of the JSON output of the class instances. </p>



<p>Note we could achieve the same effect with the <code>JSON.stringify</code> <code>replacer</code> function (<code>JSON.stringify(object, toJSONFunction</code>).</p>



<p><em>Thanks a lot for <a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noopener">Yuval Bar Levi</a> and <a rel="noreferrer noopener" href="https://twitter.com/Piotr_Zientara" target="_blank">Piotr</a> from <a rel="noreferrer noopener" href="https://twitter.com/XFaang" target="_blank">xFAANG</a> for the kind and thorough review!</em></p>



<p>Featured Photo by <a href="https://unsplash.com/@flowforfrank?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Ferenc Almasi</a> on <a href="https://unsplash.com/s/photos/json?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></p>

