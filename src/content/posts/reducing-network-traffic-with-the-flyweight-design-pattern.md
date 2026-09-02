---
title: Reducing Network Traffic with the Flyweight Design Pattern
slug: reducing-network-traffic-with-the-flyweight-design-pattern
published: 2020-01-26T14:51:22
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: Your users expect a fast and smooth experience. Sometimes what stands in the way is how long it takes to download data. The flyweight design pattern is a possible solution to help reduce bandwidth in your app.
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/reducing-network-traffic-with-the-flyweight-design-pattern/
comments: []
---


<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="625" src="/wp-content/uploads/2020/01/Yu-Kimura-e1579765470619.jpeg" alt="" class="wp-image-261" srcset="/wp-content/uploads/2020/01/Yu-Kimura-e1579765470619.jpeg 685w, /wp-content/uploads/2020/01/Yu-Kimura-e1579765470619.jpeg 300w, /wp-content/uploads/2020/01/Yu-Kimura-e1579765470619.jpeg 92w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption> WBC flyweight champion <strong><a rel="noreferrer noopener" href="https://fr.wikipedia.org/wiki/Yu_Kimura" target="_blank">Yu Kimura</a></strong><br>Image by: Papakanno (<a href="https://creativecommons.org/licenses/by-sa/3.0" target="_blank" rel="noopener">CC BY-SA</a>) </figcaption></figure></div>
</div></div>



<p>Your users expect a fast and smooth experience. Sometimes what stands in the way is how long it takes to download data. The flyweight design pattern is a possible solution to help reduce bandwidth in your app.</p>



<p>Data is a precious thing.  Every organization wants as much as it can get a hold of.  Collecting and using the data can be harmful for user experience or even breach a company&#8217;s outbound/inbound traffic quota policy.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1e207f04" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1e207f04"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#The_Use_Case" >The Use Case</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#Shall_We_Play_a_Game" >Shall We Play a Game?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#The_Flyweight_Design_Pattern" >The Flyweight Design Pattern</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#Example" >Example</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#Results" >Results</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#Summary" >Summary</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-7" href="/reducing-network-traffic-with-the-flyweight-design-pattern/#Thanks" >Thanks!</a></li></ul></li></ul></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Use_Case"></span>The Use Case<span class="ez-toc-section-end"></span></h2>



<p>You wish to collect data from your end users.  Your app has this amazing analytics feature. It periodically sends metrics you can later analyze and build your business upon.  The more data you collect, the more power you have in your analysis.</p>



<p>This process, when scaled, can become problematic.  You add more and more metrics and the messages get bigger and bigger.  Eventually, the end user (or his IT team) notice the outbound bandwidth spikes.  You get a ticket you need to solve &#8211; <code>please reduce the bandwidth signature of your app, or we cancel the deal</code>.</p>



<p>It can also be problematic to your application. Your server gets a lot of messages in a very short time. If these messages are growing in size, you might have memory issues storing and handling all this data. This might lead to noticeable performance issues or even service availability issues.</p>



<p>The other side of the coin is when you want to send data to the end-user.  </p>



<p>Imagine that you are tracking an application&#8217;s state in one machine (e.g. a multiplayer game or a document with multiple people editing several parts of it).  </p>



<p>The system needs to sync between the states of all of the users in real time. Hence, your end users send real-time updates to the server. The server, in turn, pushes the data back to the other clients for update (via socket or other async communication protocol).</p>



<p>This way we have high speed updates (multiple clients sending periodical states). In addition, we add more features so the messages get bigger. Eventually, if the need for scale arises, you&#8217;ll see bandwidth spikes due to massive data collection.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Shall_We_Play_a_Game"></span>Shall We Play a Game?<span class="ez-toc-section-end"></span></h2>



<p>The gaming industry has already learned how to handle bandwidth issues.  It&#8217;s not the bandwidth the usual web developer would think of.  Let&#8217;s see why game builders use the flyweight design patterns.</p>



<p>Games use the GPU (Graphical Processing Unit or Graphics Card) heavily.  A lot of data is being sent to be processed in the GPU. </p>



<p>The CPU is usually very fast while dealing with one problem (we can have multiple cores, but they are also limited to 2/4/8/16 etc.).  The GPU, on the other hand, has a &#8220;secret power&#8221;. It&#8217;s &#8220;secret power&#8221; is parallelism. </p>



<p>When tasked with one task, it performs slower than the CPU.  When dealing with thousands of computation tasks at the same time &#8211; it can finish tasks that the serial CPU would take much longer to accomplish.</p>



<p>In any event, the problem lies in getting data into the processing unit. The bigger the data, the bigger our problem.</p>



<p>While the processing unit is waiting for the data to come in, it sits idle. Even worse &#8211; it can stop in the middle of a computation, while part of the data it needs to complete its tasks is stuck in the heavy traffic.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="238" src="/wp-content/uploads/2020/01/image-25.png" alt="" class="wp-image-257" srcset="/wp-content/uploads/2020/01/image-25.png 744w, /wp-content/uploads/2020/01/image-25.png 300w, /wp-content/uploads/2020/01/image-25.png 242w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 1:</strong> Left to right &#8211; data is waiting to be processed by the CPU. The CPU sends chunks to be processed by the GPU. If the CPU is slow &#8211; the GPU sits idle. If the GPU can&#8217;t take all the data &#8211; your game will have to wait for the response. Even if the CPU knows you hit the bad guy &#8211; the visual effect will be stalled by the GPU.<br>But GPU is not only graphics&#8230; back in the day, we used CUDA to do parallel computing from Matlab using the GPU. <br>Nostalgia&#8230;</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Flyweight_Design_Pattern"></span>The Flyweight Design Pattern<span class="ez-toc-section-end"></span></h2>



<p>So&#8230; we have lots of data that&#8217;s passing into our clients/server/CPU/GPU. Some part of our system gets clogged and is our bottleneck. It&#8217;s bogged down under the data pressure. </p>



<p>What can we do about it?</p>



<p>The flyweight design pattern is a very simple solution that helps you make your data thinner.</p>



<p>In essence &#8211; your data has static meta data in it. For instance, in an analytics type of data, you can have the browser, OS, user agent etc. This kind of data repeats itself over a lot of messages. </p>



<p>The flyweight pattern suggests that you extract the static data from every instance. Then, send the &#8220;thin&#8221; data with only one instance of the static data. The receiver should have some mechanism to know how to piece the data back together.</p>



<p>Sounds abstract? Let&#8217;s look at an example.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Example"></span>Example<span class="ez-toc-section-end"></span></h2>



<p>The use cases mentioned above are a bit complex. In order to show how the pattern is used, I&#8217;ve created a simple example.</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100749043" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-simpleserver-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="simpleServer.js content, created by YonatanKra on 06:22AM on January 23, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="simpleServer.js">
        <tr>
          <td id="file-simpleserver-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-simpleserver-js-LC1" class="blob-code blob-code-inner js-file-line">// grab the packages we need</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-simpleserver-js-LC2" class="blob-code blob-code-inner js-file-line">const express = require(&#39;express&#39;);</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-simpleserver-js-LC3" class="blob-code blob-code-inner js-file-line">const app = express();</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-simpleserver-js-LC4" class="blob-code blob-code-inner js-file-line">const faker = require(&#39;faker&#39;);</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-simpleserver-js-LC5" class="blob-code blob-code-inner js-file-line">const port = process.env.PORT || 3000;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-simpleserver-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-simpleserver-js-LC7" class="blob-code blob-code-inner js-file-line">const nResponses = 1000;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-simpleserver-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-simpleserver-js-LC9" class="blob-code blob-code-inner js-file-line">const TYPES = {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-simpleserver-js-LC10" class="blob-code blob-code-inner js-file-line">    WORKER: &#39;WORKER&#39;,</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-simpleserver-js-LC11" class="blob-code blob-code-inner js-file-line">    COP: &#39;COP&#39;,</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-simpleserver-js-LC12" class="blob-code blob-code-inner js-file-line">    TEACHER: &#39;TEACHER&#39;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-simpleserver-js-LC13" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-simpleserver-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-simpleserver-js-LC15" class="blob-code blob-code-inner js-file-line">TYPES.getRandom = function() {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-simpleserver-js-LC16" class="blob-code blob-code-inner js-file-line">    const keys = Object.keys(this);</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-simpleserver-js-LC17" class="blob-code blob-code-inner js-file-line">    return this[keys[Math.floor(Math.random() * (keys.length - 1))]];</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-simpleserver-js-LC18" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-simpleserver-js-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-simpleserver-js-LC20" class="blob-code blob-code-inner js-file-line">const TYPE_TOOLS = {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-simpleserver-js-LC21" class="blob-code blob-code-inner js-file-line">    WORKER: [&#39;hammer&#39;, &#39;nail&#39;, &#39;ladder&#39;, &#39;helmet&#39;, &#39;screwdriver&#39;, &#39;swiss knife&#39;, &#39;boots&#39;],</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-simpleserver-js-LC22" class="blob-code blob-code-inner js-file-line">    COP: [&#39;uniform&#39;, &#39;taser&#39;, &#39;pistol&#39;, &#39;police hat&#39;, &#39;badge&#39;, &#39;whistle&#39;],</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-simpleserver-js-LC23" class="blob-code blob-code-inner js-file-line">    TEACHER: [&#39;marker&#39;, &#39;book&#39;, &#39;notebook&#39;, &#39;tablet&#39;, &#39;papers&#39;, &#39;tie&#39;]</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-simpleserver-js-LC24" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-simpleserver-js-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-simpleserver-js-LC26" class="blob-code blob-code-inner js-file-line">class UserMetaData {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-simpleserver-js-LC27" class="blob-code blob-code-inner js-file-line">    constructor(type) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-simpleserver-js-LC28" class="blob-code blob-code-inner js-file-line">        this.type = type;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-simpleserver-js-LC29" class="blob-code blob-code-inner js-file-line">        this.tools = TYPE_TOOLS[type];</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-simpleserver-js-LC30" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-simpleserver-js-LC31" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-simpleserver-js-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-simpleserver-js-LC33" class="blob-code blob-code-inner js-file-line">class User {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-simpleserver-js-LC34" class="blob-code blob-code-inner js-file-line">    constructor(index, type) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-simpleserver-js-LC35" class="blob-code blob-code-inner js-file-line">        this.id = `${index}-${new Date().getTime()}`;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-simpleserver-js-LC36" class="blob-code blob-code-inner js-file-line">        this.name = faker.name.firstName() + &#39; &#39; +faker.name.lastName();        </td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-simpleserver-js-LC37" class="blob-code blob-code-inner js-file-line">        this.email = faker.internet.email();</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-simpleserver-js-LC38" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-simpleserver-js-LC39" class="blob-code blob-code-inner js-file-line">        this.metaData = new UserMetaData(type);</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-simpleserver-js-LC40" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-simpleserver-js-LC41" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-simpleserver-js-LC42" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-simpleserver-js-LC43" class="blob-code blob-code-inner js-file-line">class FlyWeightUser {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-simpleserver-js-LC44" class="blob-code blob-code-inner js-file-line">    constructor(index, type) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-simpleserver-js-LC45" class="blob-code blob-code-inner js-file-line">        this.id = `${index}-${new Date().getTime()}`;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-simpleserver-js-LC46" class="blob-code blob-code-inner js-file-line">        this.name = faker.name.firstName() + &#39; &#39; +faker.name.lastName();        </td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-simpleserver-js-LC47" class="blob-code blob-code-inner js-file-line">        this.email = faker.internet.email();</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-simpleserver-js-LC48" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-simpleserver-js-LC49" class="blob-code blob-code-inner js-file-line">        this.type = type;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-simpleserver-js-LC50" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-simpleserver-js-LC51" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-simpleserver-js-LC52" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-simpleserver-js-LC53" class="blob-code blob-code-inner js-file-line">function generateData(userClass) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-simpleserver-js-LC54" class="blob-code blob-code-inner js-file-line">    let users = [];</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-simpleserver-js-LC55" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-simpleserver-js-LC56" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; nResponses; i++) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-simpleserver-js-LC57" class="blob-code blob-code-inner js-file-line">        users.push(new userClass(i, TYPES.getRandom()));</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-simpleserver-js-LC58" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-simpleserver-js-LC59" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-simpleserver-js-LC60" class="blob-code blob-code-inner js-file-line">    return users;</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-simpleserver-js-LC61" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-simpleserver-js-LC62" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-simpleserver-js-LC63" class="blob-code blob-code-inner js-file-line">// routes will go here</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-simpleserver-js-LC64" class="blob-code blob-code-inner js-file-line">app.post(&#39;/getData&#39;, function(req, res) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-simpleserver-js-LC65" class="blob-code blob-code-inner js-file-line">    res.send(generateData(User));</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-simpleserver-js-LC66" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-simpleserver-js-LC67" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-simpleserver-js-LC68" class="blob-code blob-code-inner js-file-line">app.post(&#39;/getFlyWeightData&#39;, function(req, res) {</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-simpleserver-js-LC69" class="blob-code blob-code-inner js-file-line">    res.send({data: generateData(FlyWeightUser), TYPE_TOOLS});</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-simpleserver-js-LC70" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-simpleserver-js-LC71" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-simpleserver-js-LC72" class="blob-code blob-code-inner js-file-line">app.use(express.static(&#39;dist&#39;));</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-simpleserver-js-LC73" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-simpleserver-js-LC74" class="blob-code blob-code-inner js-file-line">// start the server</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-simpleserver-js-LC75" class="blob-code blob-code-inner js-file-line">app.listen(port);</td>
        </tr>
        <tr>
          <td id="file-simpleserver-js-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-simpleserver-js-LC76" class="blob-code blob-code-inner js-file-line">console.log(&#39;Server started! At http://localhost:&#39; + port);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c6baa8f8e46e55192d2a6f256ac4fc15/raw/c477e3eca4b75025843a4bf238f388bd159f089e/simpleServer.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c6baa8f8e46e55192d2a6f256ac4fc15#file-simpleserver-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          simpleServer.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p><strong>Code Snippet 1:</strong> <em>Simple code that emulates a server. The server exposes two end points (<code>getData</code> and <code>getFlyweightData</code>) that returns a data structure with <code>nResponses</code> of entities.</em></p>
</div></div>



<p>In code snippet 1, the server sends the data to the client in two ways.</p>



<p>The first and naive way is by using the <code>User</code> class (line 28). In its constructor, we add the <code>UserMetaData</code> directly on the user (line 34).  </p>



<p>Every time we send the data to the client (or to another service) &#8211; the recipient gets an array of tools for each element in the data array.</p>



<p>The other end point uses the <code>FlyWeightUser</code> class (line 38). This class  saves  only  the user type(line 44).</p>



<p>Another part of the pattern is to also send the static meta data itself (also called <code>intrinsic state</code> by the Gang of Four).</p>



<p>Comparing the <code>getData</code> end point (line 59) to the <code>getFlyWieghtData</code> end point (line 63) we can see a difference in the data structure. </p>



<p>The <code>getData</code> entry point just sends the array of entities. The <code>getFlyWeightData</code> entry point sends an object containing the array of <code>FlyWeightUser</code> instances. In addition, it sends the meta data dictionary  (line 64) .</p>



<p>This way, we send the static (<code>intrinsic</code>) meta data only once and not for every entity in our array.</p>



<p>The recipient of the data has all the clues it needs to match the type with the meta data.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Results"></span>Results<span class="ez-toc-section-end"></span></h3>



<p>While this example is very simple, it still shows the benefit.</p>



<p>Let&#8217;s run a simple client:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist100749254" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-flyweight-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="flyWeight.js content, created by YonatanKra on 06:42AM on January 23, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="flyWeight.js">
        <tr>
          <td id="file-flyweight-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-flyweight-js-LC1" class="blob-code blob-code-inner js-file-line">(function() {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-flyweight-js-LC2" class="blob-code blob-code-inner js-file-line">    function json(response) {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-flyweight-js-LC3" class="blob-code blob-code-inner js-file-line">        return response.json()</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-flyweight-js-LC4" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-flyweight-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-flyweight-js-LC6" class="blob-code blob-code-inner js-file-line">    function getData(url) {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-flyweight-js-LC7" class="blob-code blob-code-inner js-file-line">        fetch(url, {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-flyweight-js-LC8" class="blob-code blob-code-inner js-file-line">            method: &#39;post&#39;,</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-flyweight-js-LC9" class="blob-code blob-code-inner js-file-line">            headers: {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-flyweight-js-LC10" class="blob-code blob-code-inner js-file-line">                &quot;Content-type&quot;: &quot;application/x-www-form-urlencoded; charset=UTF-8&quot;</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-flyweight-js-LC11" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-flyweight-js-LC12" class="blob-code blob-code-inner js-file-line">            })</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-flyweight-js-LC13" class="blob-code blob-code-inner js-file-line">            .then(json)</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-flyweight-js-LC14" class="blob-code blob-code-inner js-file-line">            .then(function (data) {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-flyweight-js-LC15" class="blob-code blob-code-inner js-file-line">                myUsers = data;</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-flyweight-js-LC16" class="blob-code blob-code-inner js-file-line">                console.log(&#39;Finished fetching data&#39;);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-flyweight-js-LC17" class="blob-code blob-code-inner js-file-line">            })</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-flyweight-js-LC18" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-flyweight-js-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-flyweight-js-LC20" class="blob-code blob-code-inner js-file-line">    function regularData() {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-flyweight-js-LC21" class="blob-code blob-code-inner js-file-line">        getData(&#39;/getData&#39;)</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-flyweight-js-LC22" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-flyweight-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-flyweight-js-LC24" class="blob-code blob-code-inner js-file-line">    function flyWeightData() {</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-flyweight-js-LC25" class="blob-code blob-code-inner js-file-line">        getData(&#39;/getFlyWeightData&#39;);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-flyweight-js-LC26" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-flyweight-js-LC27" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-flyweight-js-LC28" class="blob-code blob-code-inner js-file-line">    let myUsers;</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-flyweight-js-LC29" class="blob-code blob-code-inner js-file-line">    document.getElementById(&#39;request&#39;).addEventListener(&#39;click&#39;, regularData);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-flyweight-js-LC30" class="blob-code blob-code-inner js-file-line">    document.getElementById(&#39;requestFlyWieght&#39;).addEventListener(&#39;click&#39;, flyWeightData);</td>
        </tr>
        <tr>
          <td id="file-flyweight-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-flyweight-js-LC31" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd/raw/17fb7b945d2a5373d3c4791af340d776e19e7d04/flyWeight.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd#file-flyweight-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          flyWeight.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.html content, created by YonatanKra on 06:42AM on January 23, 2020."
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
          <td id="file-index-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;button id=&quot;request&quot;&gt;Request data&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-html-LC2" class="blob-code blob-code-inner js-file-line">&lt;button id=&quot;requestFlyWieght&quot;&gt;Request light weight data&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-html-LC3" class="blob-code blob-code-inner js-file-line">&lt;script src=&quot;flyWeight.js&quot;&gt;&lt;/script&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd/raw/17fb7b945d2a5373d3c4791af340d776e19e7d04/index.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/4c27d8b8922d2ad49adde18ff63192dd#file-index-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-text-align-center"><strong>Code Snippet 2: </strong>A client that uses the two endpoints.</p>
</div></div>



<p>The client in <strong>code snippet 2 </strong>is very simple as well. It has 2 buttons &#8211; one fetches the data using the <code>getData</code> endpoint and the other using the <code>getFlyWeightData</code> end point.</p>



<p>The results are shown in <strong>Figure 2</strong>. The <code>getFlyWeightData</code> message size is around 14% smaller. </p>



<p>Put this at scale &#8211; your analytics messages sent every 2 seconds or your game engine sends an update every frame &#8211; and you get a huge reduction in traffic.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="88" src="/wp-content/uploads/2020/01/image-26.png" alt="" class="wp-image-258" srcset="/wp-content/uploads/2020/01/image-26.png 689w, /wp-content/uploads/2020/01/image-26.png 300w, /wp-content/uploads/2020/01/image-26.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 2: </strong><code>getFlyWeightData</code> vs <code>getData</code>. The data transferred from server to client was reduced by 10%.</figcaption></figure>



<p>In our case, lets look at a user that visits your app for an hour. 3600 seconds / 2 messages/second = 1800 messages every hour. This sums up to 96.3KB * 1800.  With the Fly Weight algorithm, we saved 25MB.</p>



<p>With real life data the reduction can be even more significant.</p>



<p>Another point to think about is users with slower internet connection &#8211; like G3 or slower.</p>



<p>You can actually test it on your own using chrome dev tools throttling. See <strong>Figure 3</strong>, in which the time it takes a 3G connection to fetch the data is shown.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="83" src="/wp-content/uploads/2020/01/image-27.png" alt="" class="wp-image-259" srcset="/wp-content/uploads/2020/01/image-27.png 788w, /wp-content/uploads/2020/01/image-27.png 300w, /wp-content/uploads/2020/01/image-27.png 768w, /wp-content/uploads/2020/01/image-27.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 3: </strong>The same test over a slow 3G connection (emulated).  The difference in this simple example is 240 milliseconds.  These are 240 milliseconds that can be saved for your end user.</figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>The Flyweight design pattern is heavily used in games. It can help save some memory (we have less duplicates in our precious memory).  But that&#8217;s not its primary use case, since most of our duplicates will just be references to an address in memory.</p>



<p>Its more critical use is saving bandwidth. In gaming &#8211; mostly to the processing units. In your application &#8211; the data sent back and forth between your services.</p>



<p>We described some use cases.  It can help you reduce the load on your services. It can also help you improve user experience &#8211; especially for users with a slow internet connection.  </p>



<p>It can also save you from an angry client complaining on your SDK breaching their outbound traffic policy (personal experience). </p>



<p>At WalkMe, we&#8217;ve used this pattern in various use cases. One of them was for our analytics feature. Our client-side events emitter sent huge amount of data to our events collector service. </p>



<p>Some of our clients monitored the traffic and saw a significant increase in outbound traffic since installing our SDK. Using the flyweight pattern, we managed to reduce the amount of outbound traffic for all of our customers. </p>



<p>In the example shown in this article, we&#8217;ve used the Flyweight pattern in order to save on web traffic bandwidth. Note that this example as well as the results are very just to show there is an effect.</p>



<p>The more complex your data and the slower your recipient&#8217;s connection &#8211; the more critical the difference.   </p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Thanks"></span>Thanks!<span class="ez-toc-section-end"></span></h4>



<p>Thanks for this article reviewers <a rel="noreferrer noopener" aria-label="Andy Van Slaars (opens in a new tab)" href="https://twitter.com/avanslaars" target="_blank">Andy Van Slaars</a> and <a rel="noreferrer noopener" href="https://www.linkedin.com/in/michael-k-ab673b135/" target="_blank">MichalKutz</a>.  </p>

