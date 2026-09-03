---
title: How to Build a Vivid Birthday Quiz in 20 minutes?
slug: how-to-build-a-vivid-birthday-quiz-in-20-minutes
published: 2023-02-26T18:57:33
updated: 2023-02-27T05:00:50
author: Yonatan Kra
description: Vivid, Vonage’s design system, is now published. What better way to celebrate Vivid’s public birthday than to build a birthday quiz? Let’s have a vivid birthday! Vivid is an open-source vanilla JavaScript design system built upon the web components technology. It holds a growing repertoire of web components that a developer can use regardless of [&hellip;]
categories:
  - name: vivid
    slug: vivid
    path: vivid
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Web Component
    slug: web-component
    path: web-component
tags:
  - vivid
  - web components
canonical: https://yonatankra.com/how-to-build-a-vivid-birthday-quiz-in-20-minutes/
comments:
  - author: Yinon
    date: 2023-02-20T18:44:35
    content: |
      <p>having such a library providing all the UI is a life saver! great serve yonatankra</p>
featuredImage: /wp-content/uploads/2023/02/Vivids-birthday-1-e1677139877113.jpg
---

<p class="has-medium-font-size">Vivid, Vonage&#8217;s design system, is now published. What better way to celebrate Vivid&#8217;s public birthday than to build a birthday quiz? Let&#8217;s have a vivid birthday!</p>



<p>Vivid is an open-source vanilla JavaScript design system built upon the web components technology. It holds a growing repertoire of web components that a developer can use regardless of framework. Its theming system allows you to tweak it to your brand easily.</p>



<p>We&#8217;ve just launched <a href="https://github.com/Vonage/vivid-3" target="_blank" rel="noreferrer noopener">vivid V3</a>. That also means it&#8217;s kind-of vivid&#8217;s birthday.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b1182e9" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b1182e9"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Birthday_Present" >Birthday Present</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Find_a_Quiz_You_Like" >Find a Quiz You Like</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Quiz_Data_Model" >Quiz Data Model</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Quiz_Design" >Quiz Design</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Adding_the_Components" >Adding the Components</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Import_the_CSS_files" >Import the CSS files</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Import_the_JavaScript_Files" >Import the JavaScript Files</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Quiz_Layout" >Quiz Layout</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Birthday_Logic" >Birthday Logic</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Start_the_Quiz" >Start the Quiz</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Answer_Validation" >Answer Validation</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-12" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#The_Winning_State" >The Winning State</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-13" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#The_Layout" >The Layout</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-14" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Going_Fullstack" >Going Fullstack</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-15" href="/how-to-build-a-vivid-birthday-quiz-in-20-minutes/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Birthday_Present"></span>Birthday Present<span class="ez-toc-section-end"></span></h2>



<p>One of our team members had a birthday lately, and we thought to combine the two parties. We purchased a fancy voucher and thought of a way to give it to her that&#8217;s not just a simple dry email.</p>



<p>Why make it easy on the birthday person? Let&#8217;s create a vivid-powered birthday quiz and let her work hard to get her birthday present!</p>



<p>If you are eager to see what we&#8217;re going to build, check it out:</p>



<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="oNPbBeK" data-user="yonatankra" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/oNPbBeK" target="_blank" rel="noopener">
  Birthday Quiz</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Find_a_Quiz_You_Like"></span>Find a Quiz You Like<span class="ez-toc-section-end"></span></h2>



<p>The first step is to find questions. Google is a great helper. Our beloved team member is a CSS groupie, so I found this <a href="https://digitalsynopsis.com/design/34-css-puns-web-design-funny-jokes/" data-type="URL" data-id="https://digitalsynopsis.com/design/34-css-puns-web-design-funny-jokes/" target="_blank" rel="noreferrer noopener">CSS jokes website</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Quiz_Data_Model"></span>Quiz Data Model<span class="ez-toc-section-end"></span></h2>



<p>I chose a few of the jokes and put them into a data model (which is a fancy way to say: JSON):</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121041397" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-birthdayquizdatamodel-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="birthdayQuizDataModel.js content, created by YonatanKra on 03:11PM on February 22, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="birthdayQuizDataModel.js">
        <tr>
          <td id="file-birthdayquizdatamodel-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-birthdayquizdatamodel-js-LC1" class="blob-code blob-code-inner js-file-line">const QUESTIONS = [</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-birthdayquizdatamodel-js-LC2" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-birthdayquizdatamodel-js-LC3" class="blob-code blob-code-inner js-file-line">        id: &#39;1&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-birthdayquizdatamodel-js-LC4" class="blob-code blob-code-inner js-file-line">        selector: &#39;#wife&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-birthdayquizdatamodel-js-LC5" class="blob-code blob-code-inner js-file-line">        properties: [&#39;right&#39;, &#39;margin&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-birthdayquizdatamodel-js-LC6" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-birthdayquizdatamodel-js-LC7" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-birthdayquizdatamodel-js-LC8" class="blob-code blob-code-inner js-file-line">        id: &#39;2&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-birthdayquizdatamodel-js-LC9" class="blob-code blob-code-inner js-file-line">        selector: &#39;#tower-of-pise&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-birthdayquizdatamodel-js-LC10" class="blob-code blob-code-inner js-file-line">        properties: [&#39;font-style&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-birthdayquizdatamodel-js-LC11" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-birthdayquizdatamodel-js-LC12" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-birthdayquizdatamodel-js-LC13" class="blob-code blob-code-inner js-file-line">        id: &#39;3&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-birthdayquizdatamodel-js-LC14" class="blob-code blob-code-inner js-file-line">        selector: &#39;#titanic&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-birthdayquizdatamodel-js-LC15" class="blob-code blob-code-inner js-file-line">        properties: [&#39;float&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-birthdayquizdatamodel-js-LC16" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-birthdayquizdatamodel-js-LC17" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-birthdayquizdatamodel-js-LC18" class="blob-code blob-code-inner js-file-line">        id: &#39;4&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-birthdayquizdatamodel-js-LC19" class="blob-code blob-code-inner js-file-line">        selector: &#39;#moses &gt; .sea&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-birthdayquizdatamodel-js-LC20" class="blob-code blob-code-inner js-file-line">        properties: [&#39;column-count&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-birthdayquizdatamodel-js-LC21" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-birthdayquizdatamodel-js-LC22" class="blob-code blob-code-inner js-file-line">];</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-birthdayquizdatamodel-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-birthdayquizdatamodel-js-LC24" class="blob-code blob-code-inner js-file-line">const ANSWERS = [</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-birthdayquizdatamodel-js-LC25" class="blob-code blob-code-inner js-file-line">    [&#39;100%0&#39;, &#39;100%none&#39;], [&#39;italic&#39;], [&#39;none&#39;], [&#39;2&#39;]</td>
        </tr>
        <tr>
          <td id="file-birthdayquizdatamodel-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-birthdayquizdatamodel-js-LC26" class="blob-code blob-code-inner js-file-line">];</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/7a2a4e3bfd5e75a9ba0feae3f598f098/raw/2fb5156f1386ff1cfcb66b93c39b37cb57e69b80/birthdayQuizDataModel.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/7a2a4e3bfd5e75a9ba0feae3f598f098#file-birthdayquizdatamodel-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          birthdayQuizDataModel.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The model above holds four questions and four correct answers.  I&#8217;ve separated the questions from the answers because, in a fullstack implementation, I&#8217;d probably keep the answers away from the frontend side (we <strong>are</strong> sending this to a developer proficient in chrome dev tools&#8230;). </p>



<p>Now that we have our questions let&#8217;s move on.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Quiz_Design"></span>Quiz Design<span class="ez-toc-section-end"></span></h2>



<p>Designing something with Vivid is easy, even if you lack any UX skills (like me). I quickly found the components I needed to use from the <a href="https://vivid.deno.dev/" data-type="URL" data-id="https://vivid.deno.dev/" target="_blank" rel="noreferrer noopener">docs</a> (and yes, the fact that I developed some of them myself helped a bit 😉 ):</p>



<ul class="wp-block-list"><li><strong>Layout</strong> &#8211; to position elements easily on the page</li><li><strong>Dialog</strong> &#8211; to show feedback to the user</li><li><strong>Card</strong> &#8211; to show the question over a nice elevated surface</li><li><strong>Text-field</strong> &#8211; a way to add the answers</li><li><strong>Button</strong> &#8211; a nicely designed interaction components</li></ul>



<p>Here&#8217;s how I composed them together:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="499" height="453" src="/wp-content/uploads/2023/02/image-6.png" alt="" class="wp-image-1679" srcset="/wp-content/uploads/2023/02/image-6.png 499w, /wp-content/uploads/2023/02/image-6.png 300w, /wp-content/uploads/2023/02/image-6.png 99w" sizes="auto, (max-width: 499px) 100vw, 499px" /></figure></div>



<p>In this design, the user sets the answers inside the text-fields and submits them to move on to the next step. Note that we can have multiple answers as in the image above (both <code>right</code> and <code>margin</code>).</p>



<p>If the answer is incorrect, a dialog appears:</p>



<div class="wp-block-jetpack-tiled-gallery aligncenter is-style-rectangular"><div class="tiled-gallery__gallery"><div class="tiled-gallery__row"><div class="tiled-gallery__col" style="flex-basis:64.97159%"><figure class="tiled-gallery__item"><img decoding="async" srcset="/wp-content/uploads/2023/02/image-7.png 600w,/wp-content/uploads/2023/02/image-7.png 645w" alt="" data-height="584" data-id="1680" data-link="https://yonatankra.com/?attachment_id=1680" data-url="/wp-content/uploads/2023/02/image-7.png" data-width="645" src="/wp-content/uploads/2023/02/image-7.png" data-amp-layout="responsive"/></figure></div><div class="tiled-gallery__col" style="flex-basis:35.02841%"><figure class="tiled-gallery__item"><img decoding="async" srcset="/wp-content/uploads/2023/02/image-9.png 333w" alt="" data-height="560" data-id="1682" data-link="https://yonatankra.com/?attachment_id=1682" data-url="/wp-content/uploads/2023/02/image-9.png" data-width="333" src="/wp-content/uploads/2023/02/image-9.png" data-amp-layout="responsive"/></figure></div></div></div></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Adding_the_Components"></span>Adding the Components<span class="ez-toc-section-end"></span></h2>



<p>I begin with a simple HTML page and add the needed files for it.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Import_the_CSS_files"></span>Import the CSS files<span class="ez-toc-section-end"></span></h3>



<p>In the head section, I imported the needed styles. In this case I&#8217;m using the CDN:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121004959" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-css-imports-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="css-imports.html content, created by YonatanKra on 01:57PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="css-imports.html">
        <tr>
          <td id="file-css-imports-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-css-imports-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;link href=&quot;https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&amp;family=Roboto+Mono:wght@400;500&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-css-imports-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-css-imports-html-LC2" class="blob-code blob-code-inner js-file-line">&lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/@vonage/vivid/styles/tokens/theme-light.css&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-css-imports-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-css-imports-html-LC3" class="blob-code blob-code-inner js-file-line">&lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/@vonage/vivid/styles/core/all.css&quot;&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6c43b5ce422989be024ec7e2cf3ca703/raw/fd4e5e9aa2ea736f080b95876cc47939b1e02b8b/css-imports.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6c43b5ce422989be024ec7e2cf3ca703#file-css-imports-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          css-imports.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Import_the_JavaScript_Files"></span>Import the JavaScript Files<span class="ez-toc-section-end"></span></h3>



<p>In the body part I added a script tag of type <code>module</code> and import the JavaScript files:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121004948" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-components-imports-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="components-imports.html content, created by YonatanKra on 01:57PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="components-imports.html">
        <tr>
          <td id="file-components-imports-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-components-imports-html-LC1" class="blob-code blob-code-inner js-file-line"> &lt;script type=&quot;module&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-components-imports-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-components-imports-html-LC2" class="blob-code blob-code-inner js-file-line">  import &quot;https://unpkg.com/@vonage/vivid/button&quot;;</td>
        </tr>
        <tr>
          <td id="file-components-imports-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-components-imports-html-LC3" class="blob-code blob-code-inner js-file-line">  import &quot;https://unpkg.com/@vonage/vivid/layout&quot;;</td>
        </tr>
        <tr>
          <td id="file-components-imports-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-components-imports-html-LC4" class="blob-code blob-code-inner js-file-line">  import &quot;https://unpkg.com/@vonage/vividcard&quot;;</td>
        </tr>
        <tr>
          <td id="file-components-imports-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-components-imports-html-LC5" class="blob-code blob-code-inner js-file-line">  import &quot;https://unpkg.com/@vonage/vivid/text-field&quot;;</td>
        </tr>
        <tr>
          <td id="file-components-imports-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-components-imports-html-LC6" class="blob-code blob-code-inner js-file-line">  import &quot;https://unpkg.com/@vonage/vivid/dialog&quot;;</td>
        </tr>
        <tr>
          <td id="file-components-imports-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-components-imports-html-LC7" class="blob-code blob-code-inner js-file-line">&lt;/script&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/23d86aae6fae4756674cb47d0830daa0/raw/498ae5378545f44a3b8fcb3e51ce92e188dd2f63/components-imports.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/23d86aae6fae4756674cb47d0830daa0#file-components-imports-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          components-imports.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Quiz_Layout"></span>Quiz Layout<span class="ez-toc-section-end"></span></h3>



<p>Above the script tag, I added the quiz&#8217;s layout:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121004939" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-layout-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="layout.html content, created by YonatanKra on 01:56PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="layout.html">
        <tr>
          <td id="file-layout-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-layout-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;vwc-layout&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-layout-html-LC2" class="blob-code blob-code-inner js-file-line">    &lt;vwc-card&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-layout-html-LC3" class="blob-code blob-code-inner js-file-line">        &lt;div slot=&quot;main&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-layout-html-LC4" class="blob-code blob-code-inner js-file-line">            &lt;h2&gt;Hi Rachel!&lt;/h2&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-layout-html-LC5" class="blob-code blob-code-inner js-file-line">            &lt;p&gt;You like riddles, and we don&#39;t want to make it easy on you to get your bday present so&#8230;&lt;/p&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-layout-html-LC6" class="blob-code blob-code-inner js-file-line">            &lt;p&gt;The moment you are ready, start the game and work for your prize!&lt;/p&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-layout-html-LC7" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button appearance=&quot;filled&quot; id=&quot;startButton&quot; label=&quot;Start the Game!&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-layout-html-LC8" class="blob-code blob-code-inner js-file-line">        &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-layout-html-LC9" class="blob-code blob-code-inner js-file-line">    &lt;/vwc-card&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-layout-html-LC10" class="blob-code blob-code-inner js-file-line">&lt;/vwc-layout&gt;</td>
        </tr>
        <tr>
          <td id="file-layout-html-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-layout-html-LC11" class="blob-code blob-code-inner js-file-line">&lt;vwc-dialog&gt;&lt;/vwc-dialog&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c10df5e50074377c298d85fcee5039db/raw/060356fb8d2e2b1830647733670b26e0d2abcc26/layout.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c10df5e50074377c298d85fcee5039db#file-layout-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          layout.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Birthday_Logic"></span>Birthday Logic<span class="ez-toc-section-end"></span></h2>



<p>Now that we have the components and layout, we need to implement the quiz itself.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Start_the_Quiz"></span>Start the Quiz<span class="ez-toc-section-end"></span></h3>



<p>For this I&#8217;ll create a <code>start</code> function that will be activated by a click on the button:</p>



<pre class="wp-block-code"><code>function start() {
  addNextQuestion(QUESTIONS&#91;0]);
}
startButton.addEventListener('click', start);</code></pre>



<p>We&#8217;ll create the function <code>addNextQuestion</code> that accepts a question and shows it on screen:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121003487" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-addnextquestion-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="addNextQuestion.js content, created by YonatanKra on 12:48PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="addNextQuestion.js">
        <tr>
          <td id="file-addnextquestion-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-addnextquestion-js-LC1" class="blob-code blob-code-inner js-file-line">function addNextQuestion(question) {</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-addnextquestion-js-LC2" class="blob-code blob-code-inner js-file-line">    const cardContent = generateCardContent(question);</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-addnextquestion-js-LC3" class="blob-code blob-code-inner js-file-line">    card.innerHTML = cardContent;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-addnextquestion-js-LC4" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a47bcc5f3021da4f55a8500000214d90/raw/9648b820b24acbae30c9253bbee485e7a24ca6da/addNextQuestion.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a47bcc5f3021da4f55a8500000214d90#file-addnextquestion-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          addNextQuestion.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>This function generates the question&#8217;s HTML and replaces the card&#8217;s HTML with it. Now we need to implement the <code>generateCardContent</code> function:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121005036" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-generatecardcontent-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="generateCardContent.js content, created by YonatanKra on 02:02PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="generateCardContent.js">
        <tr>
          <td id="file-generatecardcontent-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-generatecardcontent-js-LC1" class="blob-code blob-code-inner js-file-line">function generateCardContent(question) {</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-generatecardcontent-js-LC2" class="blob-code blob-code-inner js-file-line">                return `</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-generatecardcontent-js-LC3" class="blob-code blob-code-inner js-file-line">                    &lt;div slot=&quot;main&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-generatecardcontent-js-LC4" class="blob-code blob-code-inner js-file-line">                    &lt;pre&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-generatecardcontent-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-generatecardcontent-js-LC6" class="blob-code blob-code-inner js-file-line">    ${question.selector} {</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-generatecardcontent-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-generatecardcontent-js-LC8" class="blob-code blob-code-inner js-file-line">        ${question.properties.reduce((res, val) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-generatecardcontent-js-LC9" class="blob-code blob-code-inner js-file-line">            return `${res}</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-generatecardcontent-js-LC10" class="blob-code blob-code-inner js-file-line">                ${val}:</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-generatecardcontent-js-LC11" class="blob-code blob-code-inner js-file-line">            `</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-generatecardcontent-js-LC12" class="blob-code blob-code-inner js-file-line">        }, &#39;&#39;)}</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-generatecardcontent-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-generatecardcontent-js-LC14" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-generatecardcontent-js-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-generatecardcontent-js-LC16" class="blob-code blob-code-inner js-file-line">                    &lt;/pre&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-generatecardcontent-js-LC17" class="blob-code blob-code-inner js-file-line">                    ${question.properties.reduce((res, val) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-generatecardcontent-js-LC18" class="blob-code blob-code-inner js-file-line">            return `</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-generatecardcontent-js-LC19" class="blob-code blob-code-inner js-file-line">                ${res}</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-generatecardcontent-js-LC20" class="blob-code blob-code-inner js-file-line">                &lt;vwc-text-field label=&quot;${val}&quot; id=&quot;${val}&quot;&gt;&lt;/vwc-text-field&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-generatecardcontent-js-LC21" class="blob-code blob-code-inner js-file-line">            `</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-generatecardcontent-js-LC22" class="blob-code blob-code-inner js-file-line">        }, &#39;&#39;)}</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-generatecardcontent-js-LC23" class="blob-code blob-code-inner js-file-line">        &lt;div style=&quot;text-align: center; margin-top: 5px;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-generatecardcontent-js-LC24" class="blob-code blob-code-inner js-file-line">                    &lt;vwc-button appearance=&quot;filled&quot; connotation=&quot;cta&quot; onclick=&quot;verifyAnswer(${question.id})&quot; label=&quot;Submit&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-generatecardcontent-js-LC25" class="blob-code blob-code-inner js-file-line">                    &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-generatecardcontent-js-LC26" class="blob-code blob-code-inner js-file-line">                &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-generatecardcontent-js-LC27" class="blob-code blob-code-inner js-file-line">                    `;</td>
        </tr>
        <tr>
          <td id="file-generatecardcontent-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-generatecardcontent-js-LC28" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2284f31412c7a8958f6e16dc691dbda6/raw/a682f0f2f14f9113ce6c0a4f37da61d224688096/generateCardContent.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2284f31412c7a8958f6e16dc691dbda6#file-generatecardcontent-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          generateCardContent.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>This function returns a string with (hopefully) valid HTML. It adds a div that will enter the <code>main</code> <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot" data-type="URL" data-id="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot" target="_blank" rel="noreferrer noopener">slot</a> of the card. Inside we add the CSS code of the question as preformatted text (the <code>pre</code> tag). </p>



<p>Note the use of <code>reduce</code> on the question&#8217;s properties which returns the valid structure for the view we want. Another <code>reduce</code> after the <code>pre</code> on the properties adds the text fields for the answers.</p>



<p>The final step is the submit button.</p>



<p>So for the question:</p>



<pre class="wp-block-code"><code>                {
                    id: '1',
                    selector: '#wife',
                    properties: &#91;'right', 'margin'],
                }</code></pre>



<p>We will get the following view:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="653" src="/wp-content/uploads/2023/02/image-11.png" alt="" class="wp-image-1686" srcset="/wp-content/uploads/2023/02/image-11.png 1003w, /wp-content/uploads/2023/02/image-11.png 294w, /wp-content/uploads/2023/02/image-11.png 768w, /wp-content/uploads/2023/02/image-11.png 88w, /wp-content/uploads/2023/02/image-11.png 1268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Answer_Validation"></span>Answer Validation<span class="ez-toc-section-end"></span></h3>



<p>The submit button has a function attached to it via HTML binding <code>onclick</code>. When it is clicked, a <code>getAnswer</code> function is called with <code>question.id</code> as a parameter. Let&#8217;s implement it now:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121005413" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-verifyanswer-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="verifyAnswer.js content, created by YonatanKra on 02:23PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="verifyAnswer.js">
        <tr>
          <td id="file-verifyanswer-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-verifyanswer-js-LC1" class="blob-code blob-code-inner js-file-line">async function verifyAnswer(question) {</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-verifyanswer-js-LC2" class="blob-code blob-code-inner js-file-line">    const answer = prepareAnswerFromTextFields();</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-verifyanswer-js-LC3" class="blob-code blob-code-inner js-file-line">    const response = {};</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-verifyanswer-js-LC4" class="blob-code blob-code-inner js-file-line">    const questionIndex = QUESTIONS.findIndex(x =&gt; x.id === question.toString());</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-verifyanswer-js-LC5" class="blob-code blob-code-inner js-file-line">    response.error = !ANSWERS[questionIndex].includes(answer);</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-verifyanswer-js-LC6" class="blob-code blob-code-inner js-file-line">    if (response.error) {</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-verifyanswer-js-LC7" class="blob-code blob-code-inner js-file-line">        error(response.error);</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-verifyanswer-js-LC8" class="blob-code blob-code-inner js-file-line">    } else {</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-verifyanswer-js-LC9" class="blob-code blob-code-inner js-file-line">        success();</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-verifyanswer-js-LC10" class="blob-code blob-code-inner js-file-line">        addNextQuestion(QUESTIONS[questionIndex + 1]);</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-verifyanswer-js-LC11" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-verifyanswer-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-verifyanswer-js-LC12" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a1241a29c455afa26617a147e675f62a/raw/17128f3170f8de4a95312c70bfcb99b4abcc3df1/verifyAnswer.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a1241a29c455afa26617a147e675f62a#file-verifyanswer-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          verifyAnswer.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>This function grabs the response from the text fields in the card via the <code>prepareAnswerFromTextFields</code> function (<a href="https://gist.github.com/YonatanKra/b487a4b2cbad8fe6df110a2859359bc3" target="_blank" data-type="URL" data-id="https://gist.github.com/YonatanKra/b487a4b2cbad8fe6df110a2859359bc3" rel="noreferrer noopener">see the implementation here</a>).</p>



<p>It then finds the question&#8217;s index and verifies the answer vs. the model. </p>



<p>If the error property of the response is true, we call the error method with the error.</p>



<p>Otherwise, we call success and move to the next question.</p>



<p>Error and success control the dialog and look like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121006101" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-error-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="error.js content, created by YonatanKra on 02:38PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="error.js">
        <tr>
          <td id="file-error-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-error-js-LC1" class="blob-code blob-code-inner js-file-line">function error(errorMessage) {</td>
        </tr>
        <tr>
          <td id="file-error-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-error-js-LC2" class="blob-code blob-code-inner js-file-line">    dialog.headline = &quot;Wrong Answer!&quot;</td>
        </tr>
        <tr>
          <td id="file-error-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-error-js-LC3" class="blob-code blob-code-inner js-file-line">    dialog.text = &quot;Close this dialog and try again please&quot;;</td>
        </tr>
        <tr>
          <td id="file-error-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-error-js-LC4" class="blob-code blob-code-inner js-file-line">    dialog.showModal();</td>
        </tr>
        <tr>
          <td id="file-error-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-error-js-LC5" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/9a32bd9fb3d8cbb6a0a05e25a12eb004/raw/83eafcd25bbc1f2beeed9adbd00eba5b61e9caff/error.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/9a32bd9fb3d8cbb6a0a05e25a12eb004#file-error-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          error.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-succes-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="succes.js content, created by YonatanKra on 02:38PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="succes.js">
        <tr>
          <td id="file-succes-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-succes-js-LC1" class="blob-code blob-code-inner js-file-line">function success() {</td>
        </tr>
        <tr>
          <td id="file-succes-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-succes-js-LC2" class="blob-code blob-code-inner js-file-line">    dialog.headline = &quot;Success!&quot;</td>
        </tr>
        <tr>
          <td id="file-succes-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-succes-js-LC3" class="blob-code blob-code-inner js-file-line">    dialog.text = &quot;Close this for the next question!&quot;;</td>
        </tr>
        <tr>
          <td id="file-succes-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-succes-js-LC4" class="blob-code blob-code-inner js-file-line">    dialog.showModal();</td>
        </tr>
        <tr>
          <td id="file-succes-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-succes-js-LC5" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/9a32bd9fb3d8cbb6a0a05e25a12eb004/raw/83eafcd25bbc1f2beeed9adbd00eba5b61e9caff/succes.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/9a32bd9fb3d8cbb6a0a05e25a12eb004#file-succes-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          succes.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Winning_State"></span>The Winning State<span class="ez-toc-section-end"></span></h3>



<p>We have one final state &#8211; to show our happy colleague her present!</p>



<p>Let&#8217;s add a new type of question called <code>reward</code>:</p>



<p>{</p>



<p>  id: &#8216;5&#8217;,</p>



<p>  rewardUrl: &#8216;https://www.canva.com/design/DAFbHyox0hc/_-bdsK86jcCqTu_21kjj9w/view&#8217;</p>



<p>}</p>



<p>In our <code>addNextQuestion</code> function we can add the logic to handle it:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121006567" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-addnextquestion-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="addNextQuestion.js content, created by YonatanKra on 03:06PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="addNextQuestion.js">
        <tr>
          <td id="file-addnextquestion-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-addnextquestion-js-LC1" class="blob-code blob-code-inner js-file-line">function addNextQuestion(question) {</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-addnextquestion-js-LC2" class="blob-code blob-code-inner js-file-line">    if (question.rewardUrl) {</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-addnextquestion-js-LC3" class="blob-code blob-code-inner js-file-line">        showWinningModal(question.rewardUrl);</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-addnextquestion-js-LC4" class="blob-code blob-code-inner js-file-line">    } else {</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-addnextquestion-js-LC5" class="blob-code blob-code-inner js-file-line">        const cardContent = generateCardContent(question);</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-addnextquestion-js-LC6" class="blob-code blob-code-inner js-file-line">        card.innerHTML = cardContent;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-addnextquestion-js-LC7" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-addnextquestion-js-LC8" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-addnextquestion-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-addnextquestion-js-LC10" class="blob-code blob-code-inner js-file-line">function showWinningModal(rewardUrl) {</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-addnextquestion-js-LC11" class="blob-code blob-code-inner js-file-line">    dialog.headline = &#39;You Made It!&#39;;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-addnextquestion-js-LC12" class="blob-code blob-code-inner js-file-line">    dialog.icon = &#39;surprised-solid&#39;;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-addnextquestion-js-LC13" class="blob-code blob-code-inner js-file-line">    dialog.innerHTML = `</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-addnextquestion-js-LC14" class="blob-code blob-code-inner js-file-line">        &lt;div slot=&quot;content&quot; style=&quot;text-align: center;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-addnextquestion-js-LC15" class="blob-code blob-code-inner js-file-line">            &lt;h2&gt; Congratulations! &lt;/h2&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-addnextquestion-js-LC16" class="blob-code blob-code-inner js-file-line">            &lt;p&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-addnextquestion-js-LC17" class="blob-code blob-code-inner js-file-line">                &lt;a href=${rewardUrl}&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-addnextquestion-js-LC18" class="blob-code blob-code-inner js-file-line">                &lt;vwc-button appearance=&#39;filled&#39; connotation=&quot;success&quot; label=&quot;Get Your Prize!!!&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-addnextquestion-js-LC19" class="blob-code blob-code-inner js-file-line">            &lt;/p&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-addnextquestion-js-LC20" class="blob-code blob-code-inner js-file-line">            &lt;/a&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-addnextquestion-js-LC21" class="blob-code blob-code-inner js-file-line">        &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-addnextquestion-js-LC22" class="blob-code blob-code-inner js-file-line">    `;</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-addnextquestion-js-LC23" class="blob-code blob-code-inner js-file-line">    dialog.showModal();</td>
        </tr>
        <tr>
          <td id="file-addnextquestion-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-addnextquestion-js-LC24" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c307e8bf5eb4d4d3c712b3697088bb0a/raw/4b97992bdaf1fa2fe1b5bc29c27e00a284de2ab5/addNextQuestion.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c307e8bf5eb4d4d3c712b3697088bb0a#file-addnextquestion-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          addNextQuestion.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p><code>addNextQuestion</code> now handles a question with a <code>rewardUrl</code> property and calls <code>showWinningModal</code> to give the winner her prize:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="343" height="314" src="/wp-content/uploads/2023/02/image-12.png" alt="" class="wp-image-1687" srcset="/wp-content/uploads/2023/02/image-12.png 343w, /wp-content/uploads/2023/02/image-12.png 300w, /wp-content/uploads/2023/02/image-12.png 98w" sizes="auto, (max-width: 343px) 100vw, 343px" /><figcaption>Click the button to get the prize!</figcaption></figure></div>



<p>Here&#8217;s the full code:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist121006926" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-birthday-quiz-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="birthday-quiz.html content, created by YonatanKra on 03:28PM on February 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="birthday-quiz.html">
        <tr>
          <td id="file-birthday-quiz-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-birthday-quiz-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;!DOCTYPE html&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-birthday-quiz-html-LC2" class="blob-code blob-code-inner js-file-line">&lt;html&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-birthday-quiz-html-LC3" class="blob-code blob-code-inner js-file-line">    &lt;head&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-birthday-quiz-html-LC4" class="blob-code blob-code-inner js-file-line">        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/@vonage/vivid/styles/fonts/spezia.css&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-birthday-quiz-html-LC5" class="blob-code blob-code-inner js-file-line">        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/@vonage/vivid/styles/tokens/theme-light.css&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-birthday-quiz-html-LC6" class="blob-code blob-code-inner js-file-line">        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/@vonage/vivid/styles/core/all.css&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-birthday-quiz-html-LC7" class="blob-code blob-code-inner js-file-line">        &lt;style&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-birthday-quiz-html-LC8" class="blob-code blob-code-inner js-file-line">            .vvd-root vwc-card h2,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-birthday-quiz-html-LC9" class="blob-code blob-code-inner js-file-line">            .vvd-root vwc-card p {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-birthday-quiz-html-LC10" class="blob-code blob-code-inner js-file-line">              margin: 0;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-birthday-quiz-html-LC11" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-birthday-quiz-html-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-birthday-quiz-html-LC13" class="blob-code blob-code-inner js-file-line">            .vvd-root vwc-card vwc-button {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-birthday-quiz-html-LC14" class="blob-code blob-code-inner js-file-line">              display: block;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-birthday-quiz-html-LC15" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-birthday-quiz-html-LC16" class="blob-code blob-code-inner js-file-line">        &lt;/style&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-birthday-quiz-html-LC17" class="blob-code blob-code-inner js-file-line">    &lt;/head&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-birthday-quiz-html-LC18" class="blob-code blob-code-inner js-file-line">    &lt;body class=&quot;vvd-root&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-birthday-quiz-html-LC19" class="blob-code blob-code-inner js-file-line">               &lt;vwc-layout&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-birthday-quiz-html-LC20" class="blob-code blob-code-inner js-file-line">            &lt;vwc-card&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-birthday-quiz-html-LC21" class="blob-code blob-code-inner js-file-line">                &lt;vwc-layout gutters=&quot;medium&quot; slot=&quot;main&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-birthday-quiz-html-LC22" class="blob-code blob-code-inner js-file-line">                    &lt;h2&gt;Hi Rachel!&lt;/h2&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-birthday-quiz-html-LC23" class="blob-code blob-code-inner js-file-line">                    &lt;p&gt;You like riddles, and we don&#39;t want to make it easy on you to get your bday present so&#8230;&lt;/p&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-birthday-quiz-html-LC24" class="blob-code blob-code-inner js-file-line">                    &lt;p&gt;The moment you are ready, start the game and work for your prize!&lt;/p&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-birthday-quiz-html-LC25" class="blob-code blob-code-inner js-file-line">                    &lt;vwc-button appearance=&quot;filled&quot; id=&quot;startButton&quot; label=&quot;Start the Game!&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-birthday-quiz-html-LC26" class="blob-code blob-code-inner js-file-line">                &lt;/vwc-layout&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-birthday-quiz-html-LC27" class="blob-code blob-code-inner js-file-line">            &lt;/vwc-card&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-birthday-quiz-html-LC28" class="blob-code blob-code-inner js-file-line">        &lt;/vwc-layout&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-birthday-quiz-html-LC29" class="blob-code blob-code-inner js-file-line">        &lt;vwc-dialog&gt;&lt;/vwc-dialog&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-birthday-quiz-html-LC30" class="blob-code blob-code-inner js-file-line">        &lt;script type=&quot;module&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-birthday-quiz-html-LC31" class="blob-code blob-code-inner js-file-line">            import &quot;https://unpkg.com/@vonage/vivid/button&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-birthday-quiz-html-LC32" class="blob-code blob-code-inner js-file-line">            import &quot;https://unpkg.com/@vonage/vivid/layout&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-birthday-quiz-html-LC33" class="blob-code blob-code-inner js-file-line">            import &quot;https://unpkg.com/@vonage/vivid/card&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-birthday-quiz-html-LC34" class="blob-code blob-code-inner js-file-line">            import &quot;https://unpkg.com/@vonage/vivid/text-field&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-birthday-quiz-html-LC35" class="blob-code blob-code-inner js-file-line">            import &quot;https://unpkg.com/@vonage/vivid/dialog&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-birthday-quiz-html-LC36" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-birthday-quiz-html-LC37" class="blob-code blob-code-inner js-file-line">            const layout = document.querySelector(&#39;vwc-layout&#39;);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-birthday-quiz-html-LC38" class="blob-code blob-code-inner js-file-line">            const dialog = document.querySelector(&#39;vwc-dialog&#39;);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-birthday-quiz-html-LC39" class="blob-code blob-code-inner js-file-line">            const card = document.querySelector(&#39;vwc-card&#39;);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-birthday-quiz-html-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-birthday-quiz-html-LC41" class="blob-code blob-code-inner js-file-line">            const QUESTIONS = [</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-birthday-quiz-html-LC42" class="blob-code blob-code-inner js-file-line">                {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-birthday-quiz-html-LC43" class="blob-code blob-code-inner js-file-line">                    id: &#39;1&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-birthday-quiz-html-LC44" class="blob-code blob-code-inner js-file-line">                    selector: &#39;#wife&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-birthday-quiz-html-LC45" class="blob-code blob-code-inner js-file-line">                    properties: [&#39;right&#39;, &#39;margin&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-birthday-quiz-html-LC46" class="blob-code blob-code-inner js-file-line">                },</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-birthday-quiz-html-LC47" class="blob-code blob-code-inner js-file-line">                {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-birthday-quiz-html-LC48" class="blob-code blob-code-inner js-file-line">                    id: &#39;2&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-birthday-quiz-html-LC49" class="blob-code blob-code-inner js-file-line">                    selector: &#39;#tower-of-pise&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-birthday-quiz-html-LC50" class="blob-code blob-code-inner js-file-line">                    properties: [&#39;font-style&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-birthday-quiz-html-LC51" class="blob-code blob-code-inner js-file-line">                },</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-birthday-quiz-html-LC52" class="blob-code blob-code-inner js-file-line">                {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-birthday-quiz-html-LC53" class="blob-code blob-code-inner js-file-line">                    id: &#39;3&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-birthday-quiz-html-LC54" class="blob-code blob-code-inner js-file-line">                    selector: &#39;#titanic&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-birthday-quiz-html-LC55" class="blob-code blob-code-inner js-file-line">                    properties: [&#39;float&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-birthday-quiz-html-LC56" class="blob-code blob-code-inner js-file-line">                },</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-birthday-quiz-html-LC57" class="blob-code blob-code-inner js-file-line">                {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-birthday-quiz-html-LC58" class="blob-code blob-code-inner js-file-line">                    id: &#39;4&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-birthday-quiz-html-LC59" class="blob-code blob-code-inner js-file-line">                    selector: &#39;#moses &gt; .sea&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-birthday-quiz-html-LC60" class="blob-code blob-code-inner js-file-line">                    properties: [&#39;column-count&#39;],</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-birthday-quiz-html-LC61" class="blob-code blob-code-inner js-file-line">                },</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-birthday-quiz-html-LC62" class="blob-code blob-code-inner js-file-line">                {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-birthday-quiz-html-LC63" class="blob-code blob-code-inner js-file-line">                    id: &#39;5&#39;,</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-birthday-quiz-html-LC64" class="blob-code blob-code-inner js-file-line">                    rewardUrl: &#39;https://www.canva.com/design/DAFbHyox0hc/_-bdsK86jcCqTu_21kjj9w/view&#39;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-birthday-quiz-html-LC65" class="blob-code blob-code-inner js-file-line">                }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-birthday-quiz-html-LC66" class="blob-code blob-code-inner js-file-line">            ];</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-birthday-quiz-html-LC67" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-birthday-quiz-html-LC68" class="blob-code blob-code-inner js-file-line">            const ANSWERS = [</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-birthday-quiz-html-LC69" class="blob-code blob-code-inner js-file-line">                [&#39;100%0&#39;, &#39;100%none&#39;], [&#39;italic&#39;], [&#39;none&#39;], [&#39;2&#39;]</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-birthday-quiz-html-LC70" class="blob-code blob-code-inner js-file-line">            ];</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-birthday-quiz-html-LC71" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-birthday-quiz-html-LC72" class="blob-code blob-code-inner js-file-line">            function start() {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-birthday-quiz-html-LC73" class="blob-code blob-code-inner js-file-line">                addNextQuestion(QUESTIONS[0]);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-birthday-quiz-html-LC74" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-birthday-quiz-html-LC75" class="blob-code blob-code-inner js-file-line">            async function verifyAnswer(question) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-birthday-quiz-html-LC76" class="blob-code blob-code-inner js-file-line">                const answer = prepareAnswerFromTextFields();</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-birthday-quiz-html-LC77" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-birthday-quiz-html-LC78" class="blob-code blob-code-inner js-file-line">                const response = {};</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-birthday-quiz-html-LC79" class="blob-code blob-code-inner js-file-line">                const questionIndex = QUESTIONS.findIndex(x =&gt; x.id === question.toString());</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-birthday-quiz-html-LC80" class="blob-code blob-code-inner js-file-line">                response.error = !ANSWERS[questionIndex].includes(answer);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-birthday-quiz-html-LC81" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-birthday-quiz-html-LC82" class="blob-code blob-code-inner js-file-line">                if (response.error) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-birthday-quiz-html-LC83" class="blob-code blob-code-inner js-file-line">                    error(response.error);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-birthday-quiz-html-LC84" class="blob-code blob-code-inner js-file-line">                } else {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-birthday-quiz-html-LC85" class="blob-code blob-code-inner js-file-line">                    success();</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-birthday-quiz-html-LC86" class="blob-code blob-code-inner js-file-line">                    addNextQuestion(QUESTIONS[questionIndex + 1]);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-birthday-quiz-html-LC87" class="blob-code blob-code-inner js-file-line">                }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-birthday-quiz-html-LC88" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-birthday-quiz-html-LC89" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-birthday-quiz-html-LC90" class="blob-code blob-code-inner js-file-line">            function error(errorMessage) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-birthday-quiz-html-LC91" class="blob-code blob-code-inner js-file-line">                dialog.headline = &quot;Wrong Answer!&quot;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-birthday-quiz-html-LC92" class="blob-code blob-code-inner js-file-line">                dialog.text = &quot;Close this dialog and try again please&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-birthday-quiz-html-LC93" class="blob-code blob-code-inner js-file-line">                dialog.showModal();</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-birthday-quiz-html-LC94" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-birthday-quiz-html-LC95" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-birthday-quiz-html-LC96" class="blob-code blob-code-inner js-file-line">            function success() {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-birthday-quiz-html-LC97" class="blob-code blob-code-inner js-file-line">                dialog.headline = &quot;Success!&quot;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-birthday-quiz-html-LC98" class="blob-code blob-code-inner js-file-line">                dialog.text = &quot;Close this for the next question!&quot;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-birthday-quiz-html-LC99" class="blob-code blob-code-inner js-file-line">                dialog.showModal();</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-birthday-quiz-html-LC100" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-birthday-quiz-html-LC101" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-birthday-quiz-html-LC102" class="blob-code blob-code-inner js-file-line">            function prepareAnswerFromTextFields() {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-birthday-quiz-html-LC103" class="blob-code blob-code-inner js-file-line">                return Array.from(card.querySelectorAll(&#39;vwc-text-field&#39;)).reduce((res, val) =&gt; res += val.value, &#39;&#39;)</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-birthday-quiz-html-LC104" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
          <td id="file-birthday-quiz-html-LC105" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
          <td id="file-birthday-quiz-html-LC106" class="blob-code blob-code-inner js-file-line">            function generateCardContent(question) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
          <td id="file-birthday-quiz-html-LC107" class="blob-code blob-code-inner js-file-line">                return `</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
          <td id="file-birthday-quiz-html-LC108" class="blob-code blob-code-inner js-file-line">                    &lt;vwc-layout gutters=&quot;large&quot; slot=&quot;main&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
          <td id="file-birthday-quiz-html-LC109" class="blob-code blob-code-inner js-file-line">                    &lt;pre&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
          <td id="file-birthday-quiz-html-LC110" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
          <td id="file-birthday-quiz-html-LC111" class="blob-code blob-code-inner js-file-line">    ${question.selector} {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
          <td id="file-birthday-quiz-html-LC112" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
          <td id="file-birthday-quiz-html-LC113" class="blob-code blob-code-inner js-file-line">        ${question.properties.reduce((res, val) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
          <td id="file-birthday-quiz-html-LC114" class="blob-code blob-code-inner js-file-line">            return `${res}</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
          <td id="file-birthday-quiz-html-LC115" class="blob-code blob-code-inner js-file-line">                ${val}:</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
          <td id="file-birthday-quiz-html-LC116" class="blob-code blob-code-inner js-file-line">            `</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
          <td id="file-birthday-quiz-html-LC117" class="blob-code blob-code-inner js-file-line">        }, &#39;&#39;)}</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
          <td id="file-birthday-quiz-html-LC118" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
          <td id="file-birthday-quiz-html-LC119" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
          <td id="file-birthday-quiz-html-LC120" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
          <td id="file-birthday-quiz-html-LC121" class="blob-code blob-code-inner js-file-line">                    &lt;/pre&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
          <td id="file-birthday-quiz-html-LC122" class="blob-code blob-code-inner js-file-line">                    ${question.properties.reduce((res, val) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
          <td id="file-birthday-quiz-html-LC123" class="blob-code blob-code-inner js-file-line">            return `</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
          <td id="file-birthday-quiz-html-LC124" class="blob-code blob-code-inner js-file-line">                ${res}</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
          <td id="file-birthday-quiz-html-LC125" class="blob-code blob-code-inner js-file-line">                &lt;vwc-text-field label=&quot;${val}&quot; id=&quot;${val}&quot;&gt;&lt;/vwc-text-field&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
          <td id="file-birthday-quiz-html-LC126" class="blob-code blob-code-inner js-file-line">            `</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
          <td id="file-birthday-quiz-html-LC127" class="blob-code blob-code-inner js-file-line">        }, &#39;&#39;)}</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
          <td id="file-birthday-quiz-html-LC128" class="blob-code blob-code-inner js-file-line">        &lt;div style=&quot;text-align: center; margin-top: 5px;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L129" class="blob-num js-line-number js-blob-rnum" data-line-number="129"></td>
          <td id="file-birthday-quiz-html-LC129" class="blob-code blob-code-inner js-file-line">                    &lt;vwc-button appearance=&quot;filled&quot; connotation=&quot;cta&quot; onclick=&quot;verifyAnswer(${question.id})&quot; label=&quot;Submit&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L130" class="blob-num js-line-number js-blob-rnum" data-line-number="130"></td>
          <td id="file-birthday-quiz-html-LC130" class="blob-code blob-code-inner js-file-line">                    &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L131" class="blob-num js-line-number js-blob-rnum" data-line-number="131"></td>
          <td id="file-birthday-quiz-html-LC131" class="blob-code blob-code-inner js-file-line">                &lt;/vwc-layout&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L132" class="blob-num js-line-number js-blob-rnum" data-line-number="132"></td>
          <td id="file-birthday-quiz-html-LC132" class="blob-code blob-code-inner js-file-line">                    `;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L133" class="blob-num js-line-number js-blob-rnum" data-line-number="133"></td>
          <td id="file-birthday-quiz-html-LC133" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L134" class="blob-num js-line-number js-blob-rnum" data-line-number="134"></td>
          <td id="file-birthday-quiz-html-LC134" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L135" class="blob-num js-line-number js-blob-rnum" data-line-number="135"></td>
          <td id="file-birthday-quiz-html-LC135" class="blob-code blob-code-inner js-file-line">            function addNextQuestion(question) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L136" class="blob-num js-line-number js-blob-rnum" data-line-number="136"></td>
          <td id="file-birthday-quiz-html-LC136" class="blob-code blob-code-inner js-file-line">                if (question.rewardUrl) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L137" class="blob-num js-line-number js-blob-rnum" data-line-number="137"></td>
          <td id="file-birthday-quiz-html-LC137" class="blob-code blob-code-inner js-file-line">                    showWinningModal(question.rewardUrl);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L138" class="blob-num js-line-number js-blob-rnum" data-line-number="138"></td>
          <td id="file-birthday-quiz-html-LC138" class="blob-code blob-code-inner js-file-line">                } else {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L139" class="blob-num js-line-number js-blob-rnum" data-line-number="139"></td>
          <td id="file-birthday-quiz-html-LC139" class="blob-code blob-code-inner js-file-line">                    const cardContent = generateCardContent(question);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L140" class="blob-num js-line-number js-blob-rnum" data-line-number="140"></td>
          <td id="file-birthday-quiz-html-LC140" class="blob-code blob-code-inner js-file-line">                    card.innerHTML = cardContent;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L141" class="blob-num js-line-number js-blob-rnum" data-line-number="141"></td>
          <td id="file-birthday-quiz-html-LC141" class="blob-code blob-code-inner js-file-line">                }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L142" class="blob-num js-line-number js-blob-rnum" data-line-number="142"></td>
          <td id="file-birthday-quiz-html-LC142" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L143" class="blob-num js-line-number js-blob-rnum" data-line-number="143"></td>
          <td id="file-birthday-quiz-html-LC143" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L144" class="blob-num js-line-number js-blob-rnum" data-line-number="144"></td>
          <td id="file-birthday-quiz-html-LC144" class="blob-code blob-code-inner js-file-line">            function showWinningModal(rewardUrl) {</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L145" class="blob-num js-line-number js-blob-rnum" data-line-number="145"></td>
          <td id="file-birthday-quiz-html-LC145" class="blob-code blob-code-inner js-file-line">                dialog.headline = &#39;You Made It!&#39;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L146" class="blob-num js-line-number js-blob-rnum" data-line-number="146"></td>
          <td id="file-birthday-quiz-html-LC146" class="blob-code blob-code-inner js-file-line">                dialog.icon = &#39;surprised-solid&#39;;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L147" class="blob-num js-line-number js-blob-rnum" data-line-number="147"></td>
          <td id="file-birthday-quiz-html-LC147" class="blob-code blob-code-inner js-file-line">                dialog.innerHTML = `</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L148" class="blob-num js-line-number js-blob-rnum" data-line-number="148"></td>
          <td id="file-birthday-quiz-html-LC148" class="blob-code blob-code-inner js-file-line">        &lt;div slot=&quot;content&quot; style=&quot;text-align: center;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L149" class="blob-num js-line-number js-blob-rnum" data-line-number="149"></td>
          <td id="file-birthday-quiz-html-LC149" class="blob-code blob-code-inner js-file-line">            &lt;h2&gt; Congratulations! &lt;/h2&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L150" class="blob-num js-line-number js-blob-rnum" data-line-number="150"></td>
          <td id="file-birthday-quiz-html-LC150" class="blob-code blob-code-inner js-file-line">            &lt;p&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L151" class="blob-num js-line-number js-blob-rnum" data-line-number="151"></td>
          <td id="file-birthday-quiz-html-LC151" class="blob-code blob-code-inner js-file-line">                &lt;a target=&quot;_blank&quot; href=${rewardUrl}&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L152" class="blob-num js-line-number js-blob-rnum" data-line-number="152"></td>
          <td id="file-birthday-quiz-html-LC152" class="blob-code blob-code-inner js-file-line">                &lt;vwc-button appearance=&#39;filled&#39; connotation=&quot;success&quot; label=&quot;Get Your Prize!!!&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L153" class="blob-num js-line-number js-blob-rnum" data-line-number="153"></td>
          <td id="file-birthday-quiz-html-LC153" class="blob-code blob-code-inner js-file-line">            &lt;/p&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L154" class="blob-num js-line-number js-blob-rnum" data-line-number="154"></td>
          <td id="file-birthday-quiz-html-LC154" class="blob-code blob-code-inner js-file-line">            &lt;/a&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L155" class="blob-num js-line-number js-blob-rnum" data-line-number="155"></td>
          <td id="file-birthday-quiz-html-LC155" class="blob-code blob-code-inner js-file-line">        &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L156" class="blob-num js-line-number js-blob-rnum" data-line-number="156"></td>
          <td id="file-birthday-quiz-html-LC156" class="blob-code blob-code-inner js-file-line">    `;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L157" class="blob-num js-line-number js-blob-rnum" data-line-number="157"></td>
          <td id="file-birthday-quiz-html-LC157" class="blob-code blob-code-inner js-file-line">                dialog.showModal();</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L158" class="blob-num js-line-number js-blob-rnum" data-line-number="158"></td>
          <td id="file-birthday-quiz-html-LC158" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L159" class="blob-num js-line-number js-blob-rnum" data-line-number="159"></td>
          <td id="file-birthday-quiz-html-LC159" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L160" class="blob-num js-line-number js-blob-rnum" data-line-number="160"></td>
          <td id="file-birthday-quiz-html-LC160" class="blob-code blob-code-inner js-file-line">            document.getElementById(&#39;startButton&#39;).addEventListener(&#39;click&#39;, start);</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L161" class="blob-num js-line-number js-blob-rnum" data-line-number="161"></td>
          <td id="file-birthday-quiz-html-LC161" class="blob-code blob-code-inner js-file-line">            window.verifyAnswer = verifyAnswer;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L162" class="blob-num js-line-number js-blob-rnum" data-line-number="162"></td>
          <td id="file-birthday-quiz-html-LC162" class="blob-code blob-code-inner js-file-line">        &lt;/script&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L163" class="blob-num js-line-number js-blob-rnum" data-line-number="163"></td>
          <td id="file-birthday-quiz-html-LC163" class="blob-code blob-code-inner js-file-line">    &lt;/body&gt;</td>
        </tr>
        <tr>
          <td id="file-birthday-quiz-html-L164" class="blob-num js-line-number js-blob-rnum" data-line-number="164"></td>
          <td id="file-birthday-quiz-html-LC164" class="blob-code blob-code-inner js-file-line">&lt;/html&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/83ddc8aaccde5d83e109b3439f20c440/raw/fc4572820465c045f3cdd80363f5c397bbdca34c/birthday-quiz.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/83ddc8aaccde5d83e109b3439f20c440#file-birthday-quiz-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          birthday-quiz.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>And a live demo of the quiz is live on codepen: <a href="https://codepen.io/yonatankra/pen/oNPbBeK" target="_blank" rel="noopener">Birthday Quiz</a>. </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Layout"></span>The Layout<span class="ez-toc-section-end"></span></h2>



<p>The <code>vwc-layout</code> element is a powerful tool to help us arrange our elements on screen. By replacing the <code>div</code> inside the <code>card</code> with <code>vwc-layout</code> with <code>gutters</code> I get the following change:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="364" src="/wp-content/uploads/2023/02/image-14.png" alt="" class="wp-image-1693" srcset="/wp-content/uploads/2023/02/image-14.png 704w, /wp-content/uploads/2023/02/image-14.png 300w, /wp-content/uploads/2023/02/image-14.png 158w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>And there&#8217;s no need to setup margins or anything.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Going_Fullstack"></span>Going Fullstack<span class="ez-toc-section-end"></span></h2>



<p>Note that I&#8217;ve made <code>verifyAnswer</code> an async function. This is because I could easily replace lines 3-5 with an async call to a server for response.</p>



<p>It&#8217;s just that easy 🙂</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Building a UI with a web components library is very easy, and doesn&#8217;t require any framework (not even jQuery!).</p>



<p>Because the elements are native, you can use them with any framework (for instance, use <code>v-repeat</code> for the <code>vwc-text-field</code> instead of the <code>reduce</code> function).</p>



<p>In addition, the <code>layout</code> element is very powerful if you want to quickly arrange your elements nicely, as I did in the end result.</p>



<p>Wanna give it a go? <a href="https://vivid.deno.dev/" target="_blank" data-type="URL" data-id="https://vivid.deno.dev/" rel="noreferrer noopener">Checkout Vivid&#8217;s components</a> and build something nice to your loved one(s).</p>



<p><em>Thanks a lot to <a href="https://www.rachelbt.co.il/" target="_blank" rel="noreferrer noopener">Rachel B. Tannenbaum</a>&nbsp;and&nbsp;<a href="https://www.linkedin.com/in/yinonov/" target="_blank" rel="noreferrer noopener">Yinon Oved</a>&nbsp;for the kind and thorough feedback.</em></p>

