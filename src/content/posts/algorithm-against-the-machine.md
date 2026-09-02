---
title: Programming Complexity in JavaScript – not What You’d Expect
slug: algorithm-against-the-machine
published: 2020-01-18T05:24:29
updated: 2021-08-10T16:53:39
author: Yonatan Kra
description: How a followup chat with a meetup  attendee helped me distill a javascript memory issue? Read more about memory allocation and garbage collection.
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/algorithm-against-the-machine/
comments: []
---


<p>I&#8217;ve recently given a talk about Design Patterns in JS at <a href="https://2019.confrontjs.com/" target="_blank" rel="noopener">Javascript Israel</a>.  I&#8217;ve spoken about memory allocation in JS when I explained about the <a href="/improve-performance-with-object-pool/">Object Pool design pattern</a>.</p>



<p>After the talk several people came to ask questions or debate about the topics in the talks. I really love that &#8211; I think much growth comes from unexpected questions and debate. </p>



<p>One of these people, <a href="https://www.linkedin.com/in/dmitry-yanet-034121ab/" target="_blank" rel="noopener">Dmitry Yanet</a>, sent me an example of a very simple memory allocation problem that can be shown in JS.</p>



<p>His example made me excited because it showed a principle that&#8217;s usually hard for me to explain. It is a clear cut example of when to use a certain design pattern.</p>



<p>Here is the example:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100332009" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-simple-memory-allocation-issue-with-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-text  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="Simple memory allocation issue with JS content, created by YonatanKra on 03:32PM on January 01, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="Simple memory allocation issue with JS">
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC1" class="blob-code blob-code-inner js-file-line">function buildSquare(n) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC2" class="blob-code blob-code-inner js-file-line">  const arr = [];</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC3" class="blob-code blob-code-inner js-file-line">  for (let i = 0; i &lt; n; i++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC4" class="blob-code blob-code-inner js-file-line">    for (let j = 0; j &lt; n; j++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC5" class="blob-code blob-code-inner js-file-line">      if (!arr[i]) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC6" class="blob-code blob-code-inner js-file-line">        arr[i] = [];</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC7" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC8" class="blob-code blob-code-inner js-file-line">      arr[i][j] = i * j;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC9" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC10" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC11" class="blob-code blob-code-inner js-file-line">  return arr;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC12" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC14" class="blob-code blob-code-inner js-file-line">//first N optimisation that actualy dont work</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC15" class="blob-code blob-code-inner js-file-line">function buildSquare1(n) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC16" class="blob-code blob-code-inner js-file-line">  const arr = [];</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC17" class="blob-code blob-code-inner js-file-line">  for (let i = 0; i &lt; n; i++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC18" class="blob-code blob-code-inner js-file-line">    for (let j = 0; j &lt; i; j++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC19" class="blob-code blob-code-inner js-file-line">      if (!arr[i]) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC20" class="blob-code blob-code-inner js-file-line">        arr[i] = [];</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC21" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC22" class="blob-code blob-code-inner js-file-line">      if (!arr[j]) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC23" class="blob-code blob-code-inner js-file-line">        arr[j] = [];</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC24" class="blob-code blob-code-inner js-file-line">      }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC25" class="blob-code blob-code-inner js-file-line">      arr[i][j] = i * j;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC26" class="blob-code blob-code-inner js-file-line">      arr[j][i] = i * j;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC27" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC28" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC29" class="blob-code blob-code-inner js-file-line">  return arr;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC30" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC31" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC32" class="blob-code blob-code-inner js-file-line">// alocation optimization that helps</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC33" class="blob-code blob-code-inner js-file-line">function buildSquareAlloc(n) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC34" class="blob-code blob-code-inner js-file-line">  const arr = new Array(n).fill([]);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC35" class="blob-code blob-code-inner js-file-line">  for (let i = 0; i &lt; n; i++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC36" class="blob-code blob-code-inner js-file-line">    for (let j = 0; j &lt; n; j++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC37" class="blob-code blob-code-inner js-file-line">      arr[i][j] = i * j;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC38" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC39" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC40" class="blob-code blob-code-inner js-file-line">  return arr;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC41" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC42" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC43" class="blob-code blob-code-inner js-file-line">// N optimisation is also working now</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC44" class="blob-code blob-code-inner js-file-line">function buildSquareAllocN(n) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC45" class="blob-code blob-code-inner js-file-line">  const arr = new Array(n).fill([]);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC46" class="blob-code blob-code-inner js-file-line">  for (let i = 0; i &lt; n; i++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC47" class="blob-code blob-code-inner js-file-line">    for (let j = 0; j &lt; i; j++) {</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC48" class="blob-code blob-code-inner js-file-line">      arr[i][j] = i * j;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC49" class="blob-code blob-code-inner js-file-line">      arr[j][i] = i * j;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC50" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC51" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC52" class="blob-code blob-code-inner js-file-line">  return arr;</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC53" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC54" class="blob-code blob-code-inner js-file-line">console.time(&quot;s1&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC55" class="blob-code blob-code-inner js-file-line">buildSquare(1000);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC56" class="blob-code blob-code-inner js-file-line">console.timeEnd(&quot;s1&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC57" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC58" class="blob-code blob-code-inner js-file-line">console.time(&quot;s2&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC59" class="blob-code blob-code-inner js-file-line">buildSquare1(1000);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC60" class="blob-code blob-code-inner js-file-line">console.timeEnd(&quot;s2&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC61" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC62" class="blob-code blob-code-inner js-file-line">console.time(&quot;s3&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC63" class="blob-code blob-code-inner js-file-line">buildSquareAlloc(1000);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC64" class="blob-code blob-code-inner js-file-line">console.timeEnd(&quot;s3&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC65" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC66" class="blob-code blob-code-inner js-file-line">console.time(&quot;s4&quot;);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC67" class="blob-code blob-code-inner js-file-line">buildSquareAllocN(1000);</td>
        </tr>
        <tr>
          <td id="file-simple-memory-allocation-issue-with-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-simple-memory-allocation-issue-with-js-LC68" class="blob-code blob-code-inner js-file-line">console.timeEnd(&quot;s4&quot;);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1a3496b11b69071fcc842ed89cef200a/raw/c00605a1468763480d46c2b73baf12400ee6fbbf/Simple%20memory%20allocation%20issue%20with%20JS" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1a3496b11b69071fcc842ed89cef200a#file-simple-memory-allocation-issue-with-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          Simple memory allocation issue with JS
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>You can view the live example here:  <a href="/performance/memory/demos/allocation/index.html">https://yonatankra.com/performance/memory/demos/allocation/index.html</a> </p>



<p>This very simple example shows the following:</p>



<p><code>builsSqaure</code> is a function that builds a 2D array in <code> O(n^2) </code> complexity.</p>



<blockquote class="wp-block-quote has-text-align-center is-style-large is-layout-flow wp-block-quote-is-layout-flow"><p>We will call <code>buildSquare</code> s1, <code>buildSquare1</code> s2, <code>buildSquareAlloc</code> s3 and <code> buildSquareAllocN </code>s4 from now on.</p></blockquote>



<p>Now, knowing something about complexity, you&#8217;d might be tempted to improve your code by improving the algorithm. Hence,  <a href="https://www.linkedin.com/in/dmitry-yanet-034121ab/" target="_blank" rel="noopener">Dmitry Yanet</a> added a solution which improved complexity to <code>O(N^2/2)</code> (function <code>buildSquare1</code> &#8211; s2). I know this is not really an improvement when it comes to academic analysis BUT &#8211; instead of a million iterations, the algorithm did only 500,000. Good enough? Ok.</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/01/image.png" alt="" class="wp-image-165" width="445" height="93" srcset="/wp-content/uploads/2020/01/image.png 277w, /wp-content/uploads/2020/01/image.png 268w" sizes="auto, (max-width: 445px) 100vw, 445px" /><figcaption>Figure1: S1 &#8211; the time it took buildSquare to run. S2 &#8211; the time it took buildSqaure1 to run.</figcaption></figure></div>



<p>The times shown in figure 1 hints on an advantage for the s2 algorithm. Because N is very small (a 1000 members array), the improvement is not significant.</p>



<p>Then <a href="https://www.linkedin.com/in/dmitry-yanet-034121ab/" target="_blank" rel="noopener">Dmitry</a> chose another approach.  In <code>buildSquareAlloc</code>, instead of writing a better algorithm, he just pre-allocated an array before the loop:</p>



<p class="has-text-align-center"><code> const&nbsp;arr&nbsp;=&nbsp;new&nbsp;Array(n).fill([]); </code></p>



<p>The results are are shown in figure 2.</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/01/image-1.png" alt="" class="wp-image-166" width="392" height="208" srcset="/wp-content/uploads/2020/01/image-1.png 211w, /wp-content/uploads/2020/01/image-1.png 170w" sizes="auto, (max-width: 392px) 100vw, 392px" /><figcaption>Figure 2: s1 and s2 are the first two examples. s3 and s4 are the same algorithms only with the preallocation of an array.</figcaption></figure></div>



<p>Figure 2 clearly shows that utilizing the preallocation technique has a much bigger impact. </p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1e2c2bba" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1e2c2bba"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/algorithm-against-the-machine/#Allocation_vs_Garbage_Collection" >Allocation vs. Garbage Collection</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/algorithm-against-the-machine/#The_Wonders_of_Debating" >The Wonders of Debating</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/algorithm-against-the-machine/#How_can_this_happen" >How can this happen?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/algorithm-against-the-machine/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Allocation_vs_Garbage_Collection"></span>Allocation vs. Garbage Collection<span class="ez-toc-section-end"></span></h2>



<p>The results in figure 2 show not only a reduction in time between the pre-allocation and without. We can see that the difference between s3 and s4 is almost non-existent. Profiling deeper can give us more insights into the matter.</p>



<p>Figure 3 lists a table of total Garbage Collection (GC) for each function.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="460" height="95" src="/wp-content/uploads/2020/01/image-2.png" alt="" class="wp-image-168" srcset="/wp-content/uploads/2020/01/image-2.png 460w, /wp-content/uploads/2020/01/image-2.png 300w, /wp-content/uploads/2020/01/image-2.png 268w" sizes="auto, (max-width: 460px) 100vw, 460px" /><figcaption>Figure 3: Minor GC time for s1 (top row) and s2 (bottom row).  s3 and s4 had 0 minor GC count and thus are not included in this figure.</figcaption></figure></div>



<p>The two rows list the sum of minor GC in s1 and s2.  s3 and s4 don&#8217;t show in the table because they had zero minor GC!</p>



<p>According to the data shown in figure 3, GC was responsible for 33.6% and 11.6% of the tuntime in s1 and s2 (respectively). The differnce between s1/s2 and s3/s4 is much bigger than 33%. Hence, GC cannot cannot be the full explanation here. There must be another component that caused the longer runtime.</p>



<p>The other (and in this case, the main) cause for the delay was the allocation itself. The js engine had to find a place in memory for the array on every push in s1 and s2. Because in s3 and s4 the arrays were already allocated during the loops, there was not much allocation involved.</p>



<p>With preallocation we reduced both allocation time as well as GC. We could probably improve this more by preallocating more:</p>



<p class="has-text-align-center"><code>const arr = new Array(n).fill(new Array(n).fill(0));</code></p>



<p>We can summarize here that optimizing for memory allocation has, in this case, a much bigger effect than algorithmic optimization.</p>



<p>This is something you should take into account when optimizing.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Wonders_of_Debating"></span>The Wonders of Debating<span class="ez-toc-section-end"></span></h2>



<p>We could stop here and go away with some knowledge. Because the example given by  <a href="https://www.linkedin.com/in/dmitry-yanet-034121ab/" target="_blank" rel="noopener">Dmitry</a>  is an amazing simplification, let&#8217;s explore it a bit deeper.</p>



<p>We saw that while the allocation optimization was more profound, we did have a slight improvement when using the more performant algorithm (s2 and s4).</p>



<p>Analyzing the algorithm does show better complexity for the s2/s4 algorithm: O(N^2) vs O(N^2/2).</p>



<p>Let&#8217;s run the functions a few more times:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="232" height="455" src="/wp-content/uploads/2020/01/image-16.png" alt="" class="wp-image-225" srcset="/wp-content/uploads/2020/01/image-16.png 232w, /wp-content/uploads/2020/01/image-16.png 153w, /wp-content/uploads/2020/01/image-16.png 46w" sizes="auto, (max-width: 232px) 100vw, 232px" /><figcaption><strong> Figure 4:</strong> Running the s1, s2, s3 and s4 functions 4 times. </figcaption></figure></div>



<p>The results in figure 4 can leave you confused. In the first run (row 1 through 4 &#8211; above the red line), there is the expected result. We see that s2 and s4 were a bit faster. The next runs (row 5 and on &#8211; below the red line) show equal or even better time for the O(N^2) algorithms!</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_can_this_happen"></span>How can this happen?<span class="ez-toc-section-end"></span></h3>



<p>Don&#8217;t worry &#8211; I won&#8217;t go into too much details here.  You can read about <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://medium.com/walkme-engineering/memory-in-javascript-beyond-leaks-8c1d697c655c" target="_blank">data locality in a former blog post of mine</a>. This is one reason for the delay.</p>



<p>Another issue gets to the world of the JS engine and its optimizations.  This is outside the scope of this article. If you are really into it, I really recommend the <a href="https://v8.dev/blog" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">V8 blog</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this article we saw that sometimes utilizing design patterns has a more prevalent effect than an algorithmic solution. The pre allocation of an array can remind you an <a href="/improve-performance-with-object-pool/">Object Pool</a>.</p>



<p>We also saw the importance of monitoring.  First, we saw that the algorithmic solution was not too helpful in regards to time consumption. Profiling helped us understand why &#8211; memory allocation was the cause of the matter (lots of GC is a big hint).</p>



<p>Looking at the profiler&#8217;s results, we could easily see that applying pre-allocation made a significant impact.</p>



<p>In addition, monitoring more than the first run showed us that the algorithmic optimization could even be harmful in certain cases.</p>



<p>Finally &#8211; this whole article came to be thanks to <a href="https://www.linkedin.com/in/dmitry-yanet-034121ab/" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Dmitry Yanet</a>.  I was able to meet him because I spoke at <a href="https://2019.confrontjs.com/" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Javascript Israel</a> meetup.  Big thanks Dmitry!!!</p>



<p>This is a very big part of the reason I like public speaking. It creates connections.  These connections with people who sometimes see things differently or can come up with different examples, and can bring you to insights you would not have thought about otherwise.</p>



<p> Big thanks to  <a href="https://www.linkedin.com/in/dmitry-yanet-034121ab/" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Dmitry Yanet</a> and <a href="https://www.linkedin.com/in/michael-k-ab673b135/" target="_blank" rel="noreferrer noopener" aria-label=" (opens in a new tab)">Michal Kutz</a> for a healthy debate about the issue. </p>

