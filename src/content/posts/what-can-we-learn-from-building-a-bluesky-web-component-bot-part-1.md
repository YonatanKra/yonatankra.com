---
title: What can we learn from building a BlueSky web component bot?-  Part 1
slug: what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1
published: 2024-12-15T16:57:50
updated: 2024-12-21T07:19:09
author: Yonatan Kra
description: "How to build a web component based application that integrates the BlueSky Social public API? Covered topics: TDD, BlueSky API, BlueSky bot (automation), AtProto SDK, Streaming, Web components. Introduction BlueSky is a (relatively) new Social network nowadays. It looks like a Twitter clone, only open source with much more control over the content one consumes. [&hellip;]"
categories:
  - name: tutorials
    slug: tutorials
    path: tutorials
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Open Source
    slug: open-source
    path: open-source
  - name: Testing
    slug: testing
    path: testing
  - name: typescript
    slug: typescript
    path: javascript/typescript
  - name: Web Component
    slug: web-component
    path: web-component
tags:
  - javascript
  - testing
  - web components
canonical: https://yonatankra.com/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/
comments: []
featuredImage: /wp-content/uploads/2024/12/image-4.png
---

<p class="has-medium-font-size">How to build a web component based application that integrates the BlueSky Social public API? Covered topics: TDD, BlueSky API, BlueSky bot (automation), AtProto SDK, Streaming, Web components.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b19d459ce" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b19d459ce"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Introduction" >Introduction</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Whats_so_hard_with_Alt_Text_in_BlueSky" >What’s so hard with Alt Text in BlueSky?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#How_to_Build_a_BlueSky_bot" >How to Build a BlueSky bot?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#The_Project_Setup" >The Project Setup</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#The_Agent" >The Agent</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-6" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Check_a_Single_Post" >Check a Single Post</a><ul class='ez-toc-list-level-5' ><li class='ez-toc-heading-level-5'><a class="ez-toc-link ez-toc-heading-7" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Handle_Data_Fetch_Error" >Handle Data Fetch Error</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-8" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Refactor" >Refactor</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-9" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Verify_Correct_Usage_of_getPost" >Verify Correct Usage of getPost</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-10" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Our_Bot_in_the_Browser" >Our Bot in the Browser</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-11" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Login" >Login</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-12" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Stream_Your_Posts" >Stream Your Posts</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-13" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#How_to_Stream_BlueSky_Posts_to_the_Client" >How to Stream BlueSky Posts to the Client?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-14" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Stop_Conditions" >Stop Conditions</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-15" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Error_Handling" >Error Handling</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-16" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#The_Streaming_Callback" >The Streaming Callback</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-17" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Theres_more_streaming%E2%80%A6" >There’s more streaming&#8230;</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-18" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Running_the_Bot" >Running the Bot</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-19" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#The_Run_Method" >The Run Method</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-20" href="/what-can-we-learn-from-building-a-bluesky-web-component-bot-part-1/#Summary_of_part_1" >Summary (of part 1)</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Introduction"></span>Introduction<span class="ez-toc-section-end"></span></h2>



<p>BlueSky is a (relatively) new Social network nowadays. It looks like a Twitter clone, only open source with much more control over the content one consumes. It also has a public API. In this article, we will walk through the building of an A11y love meter bot. We will gamify adding Alt Text to your posts so you will get better at remembering it.</p>



<p>What are we going to build? <a href="https://bskyalt.yonatankra.com/" target="_blank" data-type="link" data-id="https://bskyalt.yonatankra.com/" rel="noreferrer noopener">This</a></p>



<p>You can view the complete repo <a href="https://github.com/YonatanKra/bluesky-alttext-game" target="_blank" data-type="link" data-id="https://github.com/YonatanKra/bluesky-alttext-game" rel="noreferrer noopener">here</a></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Whats_so_hard_with_Alt_Text_in_BlueSky"></span>What’s so hard with Alt Text in BlueSky?<span class="ez-toc-section-end"></span></h2>



<p>One challenge on BlueSky is that posts are immutable—you can’t edit them once they’re published. Your only options are to publish a new one or delete the old one. There’s no middle ground (at least for now!).</p>



<p>When creating posts, many of us forget to include Alt Text. The excitement of sharing a fresh idea or the perfect image often takes priority, and accessibility features can slip our minds.</p>



<p>So, how do we get better at remembering Alt Text? Practice! Let’s turn this into a fun and practical learning experience with a BlueSky Alt Text training game designed to help you build this habit effortlessly.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Build_a_BlueSky_bot"></span>How to Build a BlueSky bot?<span class="ez-toc-section-end"></span></h2>



<p>We will use the <a href="https://github.com/bluesky-social/atproto/tree/main/packages/api" target="_blank" rel="noopener">AtpAgent SDK</a> to build a BlueSky bot. This typescript library allows you to perform operations on the BlueSky network.&nbsp;</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Project_Setup"></span>The Project Setup<span class="ez-toc-section-end"></span></h3>



<p>We’ll work with the minimal infrastructure that will make our work comfortable. I assume you already have nodejs installed so will skip right ahead to installing packages.</p>



<ol class="wp-block-list">
<li>Create a new folder (let’s assume you called it BlueSkyBot)</li>



<li>cd into it: cd BlueSkyBot</li>



<li>Run npm init -y to initialize our project as an npm one (with a package.json file).</li>



<li>Run npm i vite vitest -D &amp;&amp; npm i @atproto/api (this will add a package.lock.json file to the project).</li>



<li>Our package.json file has an empty scripts property. We will replace its contents with the following scripts:</li>
</ol>



<pre class="wp-block-code"><code>"scripts": {
    "test": "vitest",
    "start": "vite"
}</code></pre>



<p>For the full package.json, see <a href="https://gist.github.com/YonatanKra/68600aa7c3480e411fb80d8a83bad8c4#file-package-json" target="_blank" data-type="link" data-id="https://gist.github.com/YonatanKra/68600aa7c3480e411fb80d8a83bad8c4#file-package-json" rel="noreferrer noopener">this gist</a>.</p>



<ol start="6" class="wp-block-list">
<li>We&#8217;ll use <code><a href="http://vite.dev" target="_blank" data-type="link" data-id="vite.dev" rel="noreferrer noopener">vite</a></code> and <code><a href="http://vitest.dev" target="_blank" data-type="link" data-id="vitest.dev" rel="noreferrer noopener">vitest</a></code> to bundle and test our app, so we&#8217;ll add a basic vite.config.ts file:</li>
</ol>



<pre class="wp-block-code"><code>/// &lt;reference types="vitest/globals" /&gt;
import { defineConfig } from 'vitest/config'

export default defineConfig({
 root: './src',
 server: {
   open: true
 },
 test: {
   globals: true,
   environment: 'jsdom',
   coverage: {
     enabled: true,
     provider: 'v8',
     reporter: &#91;'text', 'json', 'html'],
     reportsDirectory: '../coverage',
   },
 },
});</code></pre>



<p>We define the root as the <code>src</code> folder, tell our development server to open the browser with the local URL and setup the tests to ru on <code>jsdom</code> with some coverage options.</p>



<ol start="7" class="wp-block-list">
<li>Now we can create the src folder. All our files will be there. Our folder structure should look like this:</li>
</ol>



<pre class="wp-block-code"><code>.
├── src/
│   ├── agent
│   ├── components
│   └── index.html
├── package.lock.json
├── package.json
└── vite.config.ts </code></pre>



<p>Vite by default is looking for an <code>index.html</code> file, so this will be the app&#8217;s source. Once we have that, we can run <code>npm start</code> and see the contents of the <code>index.html</code> file (currently, a blank page).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Agent"></span>The Agent<span class="ez-toc-section-end"></span></h3>



<p>The Agent is going to be our data fetcher from BlueSky.</p>



<p>Inside the agent folder, we will create two files:</p>



<ol class="wp-block-list">
<li>find-altless-posts.spec.ts</li>



<li>find-altless-posts.ts</li>
</ol>



<p>We will start by creating some basic tests to get us going. Inside find-altless-posts.spec.ts we will add the following:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>When we run npm test, it will ask us to install a few packages. Answer yes.</p>



<p>Once everything’s installed, running npm test will fail. That’s because we didn’t implement the class yet. We will create it in find-altless-posts.ts:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>And now the tests have passed! Hooray!</p>



<p>Let’s parse the contents of a single BlueSky post.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Check_a_Single_Post"></span>Check a Single Post<span class="ez-toc-section-end"></span></h4>



<p>Our first exposed method is going to be: checkSinglePost.</p>



<p>We will build it step-by-step:</p>



<h5 class="wp-block-heading"><span class="ez-toc-section" id="Handle_Data_Fetch_Error"></span>Handle Data Fetch Error<span class="ez-toc-section-end"></span></h5>



<p>Looking at the <a href="https://github.com/bluesky-social/atproto/tree/main/packages/api#api-calls" target="_blank" rel="noopener">atproto api docs</a> we can see there’s an agent.getPost method. We’ll use it. First, we will create a mock:</p>



<pre class="wp-block-code"><code>let mockAtpAgent;

const resetAtpAgentMock = () =&gt; {
&nbsp; &nbsp; mockAtpAgent = {
&nbsp; &nbsp; &nbsp; &nbsp; getPost: vi.fn(),
&nbsp; &nbsp; };
}

vi.mock('@atproto/api', () =&gt; ({
&nbsp; &nbsp; AtpAgent: vi.fn(() =&gt; mockAtpAgent),
}));</code></pre>



<p>and use this mock in our test:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134969055" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-checksinglepost-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="checkSinglePost.spec.ts content, created by YonatanKra on 04:17AM on December 17, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="checkSinglePost.spec.ts">
        <tr>
          <td id="file-checksinglepost-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-checksinglepost-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">describe(&#39;checkSinglePost()&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-checksinglepost-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">  it(&#39;should return the error message if fetch post failed&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-checksinglepost-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">      resetAtpAgentMock();</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-checksinglepost-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">      const postUri = &#39;postUri&#39;;</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-checksinglepost-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">      const bot = new AltTextBot();</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-checksinglepost-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">      const error = { message: &#39;error&#39; };</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-checksinglepost-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">      mockAtpAgent.getPost.mockRejectedValue(error);</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-checksinglepost-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-checksinglepost-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">      const result = await bot.checkSinglePost(postUri);</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-checksinglepost-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-checksinglepost-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">      expect(result).toEqual(error);</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-checksinglepost-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-checksinglepost-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/517dc5ae54f38822776b1958fb36943b/raw/432a11c05ba2de5408c6ae8a22aaabc646ca4f6a/checkSinglePost.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/517dc5ae54f38822776b1958fb36943b#file-checksinglepost-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          checkSinglePost.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The test follows the <a href="/3-simple-habits-to-improve-your-tests/#Improve_Your_Tests_Step_3_Creating_Triple-A_Tests" data-type="link" data-id="https://yonatankra.com/3-simple-habits-to-improve-your-tests/#Improve_Your_Tests_Step_3_Creating_Triple-A_Tests">Arrange-Act-Assert (AAA) pattern</a>. We first <code>arrange</code> the scenario to fail the fetch post:</p>



<ul class="wp-block-list">
<li>Reset the agent’s mock</li>



<li>Set some consts and initialize the bot</li>



<li>Mock a rejection as getPost response</li>
</ul>



<p>We then commence the <code>action</code>:</p>



<p>&nbsp;const result = await bot.checkSinglePost(postUri);</p>



<p>Eventually, we assert the result is the error message resolved from getPost:</p>



<p>expect(result).toEqual(error);</p>



<p>This, of course, fails, so we implement the minimal code to make it pass:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>We’ve added a private #agent property, which initializes an <code>AtpAgent</code>.</p>



<p>We then use it in <code>checkSinglePost</code> inside a try/catch phrase and return the error in case of a caught error.</p>



<p>Note that this fails with strict TypeScript enforcement, which we do not have in our project. We will take care of it later.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Refactor"></span>Refactor<span class="ez-toc-section-end"></span></h4>



<p>Our tests have some boilerplate we can extract. For instance, we see that instantiating a new bot repeats itself. Let’s make our tests leaner:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134926464" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-checksinglepost-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="checkSinglePost.spec.ts content, created by YonatanKra on 11:51AM on December 15, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="checkSinglePost.spec.ts">
        <tr>
          <td id="file-checksinglepost-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-checksinglepost-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">describe(&#39;AltTextBot&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-checksinglepost-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">    const postUri = &#39;postUri&#39;;</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-checksinglepost-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">    let bot: AltTextBot;</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-checksinglepost-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-checksinglepost-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">    beforeEach(async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-checksinglepost-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">        resetAtpAgentMock();</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-checksinglepost-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">        bot = new AltTextBot();</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-checksinglepost-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-checksinglepost-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-checksinglepost-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">    it(&#39;should initialize a new instance&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-checksinglepost-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">        expect(bot).toBeDefined();</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-checksinglepost-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-checksinglepost-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-checksinglepost-spec-ts-LC14" class="blob-code blob-code-inner js-file-line">    describe(&#39;checkSinglePost()&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-checksinglepost-spec-ts-LC15" class="blob-code blob-code-inner js-file-line">        it(&#39;should return the error message if fetch post failed&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-checksinglepost-spec-ts-LC16" class="blob-code blob-code-inner js-file-line">            const error = { message: &#39;error&#39; };</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-checksinglepost-spec-ts-LC17" class="blob-code blob-code-inner js-file-line">            mockAtpAgent.getPost.mockRejectedValue(error);</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-checksinglepost-spec-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-checksinglepost-spec-ts-LC19" class="blob-code blob-code-inner js-file-line">            const result = await bot.checkSinglePost(postUri);</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-checksinglepost-spec-ts-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-checksinglepost-spec-ts-LC21" class="blob-code blob-code-inner js-file-line">            expect(result).toEqual(error);</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-checksinglepost-spec-ts-LC22" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-checksinglepost-spec-ts-LC23" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-checksinglepost-spec-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-checksinglepost-spec-ts-LC24" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1bca1dc1597aaf358c6d84d2102f12d1/raw/65f6d9860a04ce7ebcde2f7d694bb7373c06d709/checkSinglePost.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1bca1dc1597aaf358c6d84d2102f12d1#file-checksinglepost-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          checkSinglePost.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Notice that our test case (<code>it</code>) is now three lines of code, and we don’t have to repeat resetting the mock and instantiating the bot again.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Verify_Correct_Usage_of_getPost"></span>Verify Correct Usage of getPost<span class="ez-toc-section-end"></span></h4>



<p>As mentioned before, TypeScript does not like that we send the <code>postUri</code> as a string to getPost. That’s because it expects something else:</p>



<p>Argument of type &#8216;string&#8217; is not assignable to parameter of type &#8216;Omit&lt;QueryParams, &#8220;collection&#8221;&gt;&#8217;.ts(2345)</p>



<p>Because AtProto is written in TypeScript, we can search for the <code>QueryParams</code> interface in their code (simply cmd/ctrl+click on the method will send us there):</p>



<pre class="wp-block-code"><code>export interface QueryParams {
  /** The handle or DID of the repo. */
  repo: string
  /** The NSID of the record collection. */
  collection: string
  /** The Record Key. */
  rkey: string
  /** The CID of the version of the record. If not specified, then return the   most recent version. */
  cid?: string
}</code></pre>



<p>According to the above, we need an object with <code>repo</code>, <code>collection</code>, and <code>rkey</code>. The last two can be inferred from the <code>postUri</code>. The first will require the use of the API.&nbsp;</p>



<p>Let’s see what we expect to happen:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134927220" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-usegetpost-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="useGetPost.spec.ts content, created by YonatanKra on 12:38PM on December 15, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="useGetPost.spec.ts">
        <tr>
          <td id="file-usegetpost-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-usegetpost-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">it(&#39;should get the post using atpAgent&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-usegetpost-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">    const postUri = &#39;https://bsky.app/profile/yonatankra.com/post/3lczalvz7uk2l&#39;;</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-usegetpost-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">    mockAtpAgent.getPost.mockResolvedValueOnce(postUri);</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-usegetpost-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-usegetpost-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">    await bot.checkSinglePost(postUri);</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-usegetpost-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-usegetpost-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">    expect(mockAtpAgent.getPost).toHaveBeenCalledWith({</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-usegetpost-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">        &quot;collection&quot;: &quot;app.bsky.feed.post&quot;,</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-usegetpost-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">        &quot;repo&quot;: &quot;handle-did&quot;,</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-usegetpost-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">        &quot;rkey&quot;: &quot;3lczalvz7uk2l&quot;,</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-usegetpost-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-usegetpost-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">    expect(mockAtpAgent.getPost).toHaveBeenCalledTimes(1);</td>
        </tr>
        <tr>
          <td id="file-usegetpost-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-usegetpost-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/ab73e502ddd83cba0d6d5dea1693e5a3/raw/c824bb95207ae329fcafcb90b0d54afb756f5ac5/useGetPost.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/ab73e502ddd83cba0d6d5dea1693e5a3#file-usegetpost-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          useGetPost.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Notice we are now using a real <code>postUri</code>. We’d expect our method to use <code>getPost</code> with a <code>QueryParams</code> object derived from our <code>postUri</code>. We also expect it to run only once <code>(expect(mockAtpAgent.getPost).toHaveBeenCalledTimes(1);)</code>.</p>



<p>One “GOTCHA” here is the repo, also called the DID. As mentioned before, we need to use the API to get it. For this, we will mock the <code>AtpAgent</code>&#8216;s <code>resolveHandle</code> method, which return the DID:</p>



<pre class="wp-block-code"><code>const resolvedHandle = {
&nbsp; &nbsp; did: 'handle-did'
};

const resetAtpAgentMock = () =&gt; {
&nbsp; &nbsp; mockAtpAgent = {
&nbsp; &nbsp; &nbsp; &nbsp; getPost: vi.fn(),
&nbsp; &nbsp; &nbsp; &nbsp; resolveHandle: vi.fn().mockResolvedValue({
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; data: resolvedHandle
&nbsp; &nbsp; &nbsp; &nbsp; })
&nbsp; &nbsp; };
}</code></pre>



<p>Now that we have a failing test let&#8217;s make it pass. We’ll write a small utility function that converts our Uri to the params needed:&nbsp;</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134927322" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-parseposturi-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="parsePostUri.ts content, created by YonatanKra on 12:44PM on December 15, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="parsePostUri.ts">
        <tr>
          <td id="file-parseposturi-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-parseposturi-ts-LC1" class="blob-code blob-code-inner js-file-line">async function parsePostUri(uri: string, agent: AtpAgent): Promise&lt;{ repo: string; collection: string; rkey: string; } | boolean&gt; {</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-parseposturi-ts-LC2" class="blob-code blob-code-inner js-file-line">    // Extract handle and post ID</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-parseposturi-ts-LC3" class="blob-code blob-code-inner js-file-line">    const match = uri.match(/profile\/([^/]+)\/post\/([^/]+)/);</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-parseposturi-ts-LC4" class="blob-code blob-code-inner js-file-line">    if (!match) {</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-parseposturi-ts-LC5" class="blob-code blob-code-inner js-file-line">        return false;</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-parseposturi-ts-LC6" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-parseposturi-ts-LC7" class="blob-code blob-code-inner js-file-line">    const [, handle, rkey] = match;</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-parseposturi-ts-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-parseposturi-ts-LC9" class="blob-code blob-code-inner js-file-line">    // Get the did</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-parseposturi-ts-LC10" class="blob-code blob-code-inner js-file-line">    const { data: { did: repo }} = await agent.resolveHandle({handle});</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-parseposturi-ts-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-parseposturi-ts-LC12" class="blob-code blob-code-inner js-file-line">    // Use the official bsky app</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-parseposturi-ts-LC13" class="blob-code blob-code-inner js-file-line">    const collection = &#39;app.bsky.feed.post&#39;;</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-parseposturi-ts-LC14" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-parseposturi-ts-LC15" class="blob-code blob-code-inner js-file-line">    return {</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-parseposturi-ts-LC16" class="blob-code blob-code-inner js-file-line">        repo,</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-parseposturi-ts-LC17" class="blob-code blob-code-inner js-file-line">        collection,</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-parseposturi-ts-LC18" class="blob-code blob-code-inner js-file-line">        rkey</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-parseposturi-ts-LC19" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-parseposturi-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-parseposturi-ts-LC20" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1b1261e854a608efeb4fe67f5bd1b1b1/raw/da0fac7c69f1012fb5932aca389fe1b1299cd2a8/parsePostUri.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1b1261e854a608efeb4fe67f5bd1b1b1#file-parseposturi-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          parsePostUri.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>And use it in our method:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134924147" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-find-altless-posts-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="find-altless-posts.ts content, created by YonatanKra on 09:28AM on December 15, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="find-altless-posts.ts">
        <tr>
          <td id="file-find-altless-posts-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-find-altless-posts-ts-LC1" class="blob-code blob-code-inner js-file-line">import { AtpAgent } from &quot;@atproto/api&quot;;</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-find-altless-posts-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-find-altless-posts-ts-LC3" class="blob-code blob-code-inner js-file-line">export class AltTextBot {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-find-altless-posts-ts-LC4" class="blob-code blob-code-inner js-file-line">    #agent = new AtpAgent({ service: &#39;https://bsky.social&#39; });</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-find-altless-posts-ts-LC5" class="blob-code blob-code-inner js-file-line">    async checkSinglePost(postUri: string) {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-find-altless-posts-ts-LC6" class="blob-code blob-code-inner js-file-line">        try {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-find-altless-posts-ts-LC7" class="blob-code blob-code-inner js-file-line">            await this.#agent.getPost(await parsePostUri(postUri, this.#agent));</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-find-altless-posts-ts-LC8" class="blob-code blob-code-inner js-file-line">        } catch (e) {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-find-altless-posts-ts-LC9" class="blob-code blob-code-inner js-file-line">            return e;</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-find-altless-posts-ts-LC10" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-find-altless-posts-ts-LC11" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-find-altless-posts-ts-LC12" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-find-altless-posts-ts-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-find-altless-posts-ts-LC14" class="blob-code blob-code-inner js-file-line">async function parsePostUri(uri: string, agent: AtpAgent): Promise&lt;{ repo: string; collection: string; rkey: string; } | boolean&gt; {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-find-altless-posts-ts-LC15" class="blob-code blob-code-inner js-file-line">    // Extract handle and post ID</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-find-altless-posts-ts-LC16" class="blob-code blob-code-inner js-file-line">    const match = uri.match(/profile\/([^/]+)\/post\/([^/]+)/);</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-find-altless-posts-ts-LC17" class="blob-code blob-code-inner js-file-line">    if (!match) {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-find-altless-posts-ts-LC18" class="blob-code blob-code-inner js-file-line">        return false;</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-find-altless-posts-ts-LC19" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-find-altless-posts-ts-LC20" class="blob-code blob-code-inner js-file-line">    const [, handle, rkey] = match;</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-find-altless-posts-ts-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-find-altless-posts-ts-LC22" class="blob-code blob-code-inner js-file-line">    // Get the did</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-find-altless-posts-ts-LC23" class="blob-code blob-code-inner js-file-line">    const { data: { did: repo }} = await agent.resolveHandle({handle});</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-find-altless-posts-ts-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-find-altless-posts-ts-LC25" class="blob-code blob-code-inner js-file-line">    // Use the official bsky app</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-find-altless-posts-ts-LC26" class="blob-code blob-code-inner js-file-line">    const collection = &#39;app.bsky.feed.post&#39;;</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-find-altless-posts-ts-LC27" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-find-altless-posts-ts-LC28" class="blob-code blob-code-inner js-file-line">    return {</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-find-altless-posts-ts-LC29" class="blob-code blob-code-inner js-file-line">        repo,</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-find-altless-posts-ts-LC30" class="blob-code blob-code-inner js-file-line">        collection,</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-find-altless-posts-ts-LC31" class="blob-code blob-code-inner js-file-line">        rkey</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-find-altless-posts-ts-LC32" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-find-altless-posts-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-find-altless-posts-ts-LC33" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/bf539ead0b14e58f1ecec0bc1d651c69/raw/9fc92a7342db76bccfdfc50fb0ea44d658059bbd/find-altless-posts.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/bf539ead0b14e58f1ecec0bc1d651c69#file-find-altless-posts-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          find-altless-posts.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Great! We validated that we are using the AtpAgent correctly. </p>



<p>Now, we would like to return the post with a list of Alt-less images. We’d expect the output of the method to be like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134927578" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-returnlistofimages-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="returnListOfImages.ts content, created by YonatanKra on 01:00PM on December 15, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="returnListOfImages.ts">
        <tr>
          <td id="file-returnlistofimages-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-returnlistofimages-ts-LC1" class="blob-code blob-code-inner js-file-line">it(&#39;should return the post with altLess images list&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-returnlistofimages-ts-LC2" class="blob-code blob-code-inner js-file-line">    const imageWithoutAlt = { alt: &#39;&#39; };</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-returnlistofimages-ts-LC3" class="blob-code blob-code-inner js-file-line">    const imageWithAlt = { alt: &#39;I have Alt text!&#39; };</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-returnlistofimages-ts-LC4" class="blob-code blob-code-inner js-file-line">    const post = {</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-returnlistofimages-ts-LC5" class="blob-code blob-code-inner js-file-line">        uri: &#39;postUri&#39;,</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-returnlistofimages-ts-LC6" class="blob-code blob-code-inner js-file-line">        cid: &#39;postCid&#39;,</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-returnlistofimages-ts-LC7" class="blob-code blob-code-inner js-file-line">        value: {</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-returnlistofimages-ts-LC8" class="blob-code blob-code-inner js-file-line">            embed: {</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-returnlistofimages-ts-LC9" class="blob-code blob-code-inner js-file-line">                images: [imageWithoutAlt, imageWithAlt, imageWithoutAlt],</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-returnlistofimages-ts-LC10" class="blob-code blob-code-inner js-file-line">                $type: &#39;image&#39;</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-returnlistofimages-ts-LC11" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-returnlistofimages-ts-LC12" class="blob-code blob-code-inner js-file-line">            text: &#39;&#39;,</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-returnlistofimages-ts-LC13" class="blob-code blob-code-inner js-file-line">            createdAt: &#39;&#39;</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-returnlistofimages-ts-LC14" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-returnlistofimages-ts-LC15" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-returnlistofimages-ts-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-returnlistofimages-ts-LC17" class="blob-code blob-code-inner js-file-line">    mockAtpAgent.getPost.mockResolvedValueOnce(post);</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-returnlistofimages-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-returnlistofimages-ts-LC19" class="blob-code blob-code-inner js-file-line">    const result = await bot.checkSinglePost(postUri);</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-returnlistofimages-ts-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-returnlistofimages-ts-LC21" class="blob-code blob-code-inner js-file-line">    expect(result).toEqual({ post, imagesWithoutAlt: [imageWithoutAlt, imageWithoutAlt] })</td>
        </tr>
        <tr>
          <td id="file-returnlistofimages-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-returnlistofimages-ts-LC22" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/01ad8b949a0de229231084cd6fae3e53/raw/64020438007ef13e10634e651dd6e4029384ce3d/returnListOfImages.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/01ad8b949a0de229231084cd6fae3e53#file-returnlistofimages-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          returnListOfImages.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p><strong>Arrange</strong>: we generate a mock post response and tell our agent&#8217;s mock to resolve it. We know the value holds the embed according to the AtProto types, so we set it with three images: 1 with alt text and two without. </p>



<p><strong>Act</strong>: call <code>bot.checkSinglePost(postUri)</code></p>



<p><strong>Assert</strong>: We expect the value returned from <code>checkSinglePost</code> to be an object with the post as well as an array of the two images without alt text.</p>



<p>The implementation is straightforward:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134927672" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-returnpostwithaltlessimages-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="returnPostWithAltlessImages.ts content, created by YonatanKra on 01:05PM on December 15, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="returnPostWithAltlessImages.ts">
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC1" class="blob-code blob-code-inner js-file-line">#returnPostWithAltlessImages(post: { uri: string; cid: string; value: Record; }) {</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC2" class="blob-code blob-code-inner js-file-line">    const images = post.value?.embed?.images || [];</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC3" class="blob-code blob-code-inner js-file-line">    const imagesWithoutAlt = images.filter(img =&gt; !img.alt);</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC4" class="blob-code blob-code-inner js-file-line">    return { post, imagesWithoutAlt };</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC5" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC7" class="blob-code blob-code-inner js-file-line">async checkSinglePost(postUri: string) {</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC8" class="blob-code blob-code-inner js-file-line">    try {</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC9" class="blob-code blob-code-inner js-file-line">        const post = await this.#agent.getPost(await parsePostUri(postUri, this.#agent));</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC10" class="blob-code blob-code-inner js-file-line">        return this.#returnPostWithAltlessImages(post);</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC11" class="blob-code blob-code-inner js-file-line">    } catch (e) {</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC12" class="blob-code blob-code-inner js-file-line">        return e;</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC13" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-returnpostwithaltlessimages-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-returnpostwithaltlessimages-ts-LC14" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/4bae1835df8c88ed63e683db769e995d/raw/7dca130952f0eba6cddcd2bd09e684e7b479bc34/returnPostWithAltlessImages.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/4bae1835df8c88ed63e683db769e995d#file-returnpostwithaltlessimages-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          returnPostWithAltlessImages.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p><code>checkSinglePost</code> uses the agent to get the post (line 8). It then returns an object with the <code>post</code> and <code>imagesWithoutAlt</code> which is the array of alt-less images we expected.</p>



<p>Our code is ready! Let&#8217;s check it out in the browser!</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Our_Bot_in_the_Browser"></span>Our Bot in the Browser<span class="ez-toc-section-end"></span></h4>



<p>Remember our index.html file? It’s time to put it to work. We will use our Bot inside the HTML file like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134927818" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.html content, created by YonatanKra on 01:14PM on December 15, 2024."
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
          <td id="file-index-html-LC3" class="blob-code blob-code-inner js-file-line">  &lt;head&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-html-LC4" class="blob-code blob-code-inner js-file-line">      &lt;script type=&quot;module&quot; defer&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-html-LC5" class="blob-code blob-code-inner js-file-line">          import { AltTextBot } from &#39;./agent/find-altless-posts.ts&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-html-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-html-LC7" class="blob-code blob-code-inner js-file-line">          async function start() {</td>
        </tr>
        <tr>
          <td id="file-index-html-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-html-LC8" class="blob-code blob-code-inner js-file-line">              const bot = new AltTextBot();</td>
        </tr>
        <tr>
          <td id="file-index-html-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-html-LC9" class="blob-code blob-code-inner js-file-line">              console.log(await bot.checkSinglePost(&#39;https://bsky.app/profile/yonatankra.com/post/3lczalvz7uk2l&#39;));</td>
        </tr>
        <tr>
          <td id="file-index-html-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-html-LC10" class="blob-code blob-code-inner js-file-line">          }</td>
        </tr>
        <tr>
          <td id="file-index-html-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-html-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-html-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-html-LC12" class="blob-code blob-code-inner js-file-line">          start();</td>
        </tr>
        <tr>
          <td id="file-index-html-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-html-LC13" class="blob-code blob-code-inner js-file-line">      &lt;/script&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-html-LC14" class="blob-code blob-code-inner js-file-line">  &lt;/head&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-html-LC15" class="blob-code blob-code-inner js-file-line">  &lt;body&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-html-LC16" class="blob-code blob-code-inner js-file-line">  &lt;/body&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-html-LC17" class="blob-code blob-code-inner js-file-line">&lt;/html&gt;</td>
        </tr>
        <tr>
          <td id="file-index-html-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-html-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/9a958f492b24e351c9810709962bd436/raw/8d251d6cca96b0206de600aedfe71b8b4ed7a685/index.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/9a958f492b24e351c9810709962bd436#file-index-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The secret sauce is lines 5 to 10. It should look familiar because it’s just like the tests. Our tests were written as if we were consumers of the interface. It’s fun like that &#x1f642;</p>



<p>Now we can run <code>npm start</code>. It will open a browser serving our app. In the console, you should see the result:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="119" src="/wp-content/uploads/2024/12/image-3.png" alt="Screenshot of a web browser's developer console, showing a JavaScript object named 'imagesWithoutAlt'. This object contains an array with one entry, indicating an image element is missing alt text. The entry includes properties like 'alt' (which is empty), 'image' (a BlobRef), and 'aspectRatio'. It also shows the associated 'post' with its 'uri' (a long identifier starting with 'at://did:plc:') and 'cid'." class="wp-image-2139" srcset="/wp-content/uploads/2024/12/image-3.png 1024w, /wp-content/uploads/2024/12/image-3.png 300w, /wp-content/uploads/2024/12/image-3.png 768w, /wp-content/uploads/2024/12/image-3.png 1536w, /wp-content/uploads/2024/12/image-3.png 268w, /wp-content/uploads/2024/12/image-3.png 1862w, /wp-content/uploads/2024/12/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Try to replace the URL we send to our method in the HTML file and see that it also works for your posts.</p>



<p>Now we can go ahead and move to more complex stuff that requires login &#8211; so that’d be our next stop.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Login"></span>Login<span class="ez-toc-section-end"></span></h3>



<p>Some actions require authentication. Actions like posting, replying or even getting all your posts. While we don&#8217;t need login to get posts, we will use it in later features, so let&#8217;s quickly implement it.</p>



<p>For simplicity&#8217;s sake, we will use the simple username (a.k.a. handle) and password login method.</p>



<p>Essentially, it’s supposed to do something straightforward: use the SDK’s <code>login</code> method. Here&#8217;s the test and implementation:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist134952226" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-login-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="login.spec.ts content, created by YonatanKra on 01:37PM on December 16, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="login.spec.ts">
        <tr>
          <td id="file-login-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-login-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">const resetAtpAgentMock = () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-login-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">    mockAtpAgent = {</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-login-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">        getPost: vi.fn(),</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-login-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">        resolveHandle: vi.fn().mockResolvedValue({</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-login-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">            data: resolvedHandle</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-login-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">        }),</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-login-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">        login: vi.fn()</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-login-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">    };</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-login-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-login-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-login-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">describe(&#39;login&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-login-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">    it(&#39;should login using AtProto SDK&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-login-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">        const handle = &#39;testUser&#39;;</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-login-spec-ts-LC14" class="blob-code blob-code-inner js-file-line">        const password = &#39;testPassword&#39;;</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-login-spec-ts-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-login-spec-ts-LC16" class="blob-code blob-code-inner js-file-line">        await bot.login(handle, password);</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-login-spec-ts-LC17" class="blob-code blob-code-inner js-file-line">        expect(mockAtpAgent.login).toHaveBeenCalledWith({</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-login-spec-ts-LC18" class="blob-code blob-code-inner js-file-line">            identifier: handle,</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-login-spec-ts-LC19" class="blob-code blob-code-inner js-file-line">            password: password,</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-login-spec-ts-LC20" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-login-spec-ts-LC21" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-login-spec-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-login-spec-ts-LC22" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2f95726b6d3447f260cbe985c3de4f6c/raw/aad3d3967e1d87b35bd6a4f00b6ba48dfb1cabc3/login.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2f95726b6d3447f260cbe985c3de4f6c#file-login-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          login.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-login-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="login.ts content, created by YonatanKra on 01:37PM on December 16, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="login.ts">
        <tr>
          <td id="file-login-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-login-ts-LC1" class="blob-code blob-code-inner js-file-line"><span class=pl-k>async</span> <span class=pl-s1>login</span><span class=pl-kos>(</span><span class=pl-s1>handle</span>: <span class=pl-smi>string</span><span class=pl-kos>,</span> <span class=pl-s1>password</span>: <span class=pl-smi>string</span><span class=pl-kos>)</span>: <span class=pl-smi>Promise</span><span class=pl-c1>&lt;</span><span class=pl-smi><span class=pl-k>void</span></span><span class=pl-c1>&gt;</span> <span class=pl-kos>{</span></td>
        </tr>
        <tr>
          <td id="file-login-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-login-ts-LC2" class="blob-code blob-code-inner js-file-line">    <span class=pl-k>await</span> <span class=pl-smi>this</span><span class=pl-kos>.</span>#agent<span class=pl-kos>.</span><span class=pl-en>login</span><span class=pl-kos>(</span><span class=pl-kos>{</span></td>
        </tr>
        <tr>
          <td id="file-login-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-login-ts-LC3" class="blob-code blob-code-inner js-file-line">        <span class=pl-c1>identifier</span>: <span class=pl-s1>handle</span><span class=pl-kos>,</span></td>
        </tr>
        <tr>
          <td id="file-login-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-login-ts-LC4" class="blob-code blob-code-inner js-file-line">        <span class=pl-c1>password</span>: <span class=pl-s1>password</span></td>
        </tr>
        <tr>
          <td id="file-login-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-login-ts-LC5" class="blob-code blob-code-inner js-file-line">    <span class=pl-kos>}</span><span class=pl-kos>)</span><span class=pl-kos>;</span></td>
        </tr>
        <tr>
          <td id="file-login-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-login-ts-LC6" class="blob-code blob-code-inner js-file-line"><span class=pl-kos>}</span></td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2f95726b6d3447f260cbe985c3de4f6c/raw/aad3d3967e1d87b35bd6a4f00b6ba48dfb1cabc3/login.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2f95726b6d3447f260cbe985c3de4f6c#file-login-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          login.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>In the spec file, we add the login method to the <code>AtpAgent</code> mock. We then make sure that when we call <code>bot.login</code>, it will call the agent&#8217;s login with the <code>handle</code> and <code>password</code>. The implementation in the `login.ts` file would be just to call login with the handle and password parameters.</p>



<p>For the complete solution with the <code>login</code> and <code>checkSinglePost</code>, <a href="https://gist.github.com/YonatanKra/2bd26b9005d6eb1a099461a414e4ae32" target="_blank" data-type="link" data-id="https://gist.github.com/YonatanKra/2bd26b9005d6eb1a099461a414e4ae32" rel="noreferrer noopener">click here</a>.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Notice that Bluesky also has an <a href="https://github.com/bluesky-social/atproto/blob/main/packages/api/README.md#oauth-based-session-management" target="_blank" data-type="link" data-id="https://github.com/bluesky-social/atproto/blob/main/packages/api/README.md#oauth-based-session-management" rel="noreferrer noopener">OAuth API</a> which we will not discuss in this (already-very-long) article. Now we can get our posts.</p>
</blockquote>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Stream_Your_Posts"></span>Stream Your Posts<span class="ez-toc-section-end"></span></h3>



<p>So far, we fetched a single post. When we fetch a user&#8217;s posts, the number of posts can be massive. Some people post once a week, some a few times each day. So, if you have been in the system for two years, you might get quite a few posts. When fetching lots of data, it’s always good to “stream” it, which is a fancy name for saying we’ll get it in chunks.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Stream_BlueSky_Posts_to_the_Client"></span>How to Stream BlueSky Posts to the Client?<span class="ez-toc-section-end"></span></h4>



<p>Part of the <code>AtpAgent</code> SDK is the <code>getAuthorFeed</code> method. It must receive an actor (the user handle). There are also some more properties. We will go over some of them in this example. We can call it like this:</p>



<pre class="wp-block-code"><code>const result: AppBskyFeedGetAuthorFeed.Response = await this.#agent.getAuthorFeed({

&nbsp;&nbsp;&nbsp;actor: handle,

&nbsp;&nbsp;&nbsp;limit: 20,

&nbsp;&nbsp;&nbsp;cursor: cursor,

&nbsp;&nbsp;&nbsp;filter: 'posts_with_media'

});</code></pre>



<p>In this example, aside from the actor, we also used cursor. The cursor is either <code>undefined</code>, which returns the first batch of posts or a value we receive from a subsequent call. This value signifies that we want to fetch the next batch. I also added a limit of 20 responses in each batch and asked for only posts with media (because we only want to see if we have alt text in media).</p>



<p>Our first step will be to add <strong><code>getAuthorFeed</code></strong> to our AtpAgent mock:</p>



<pre class="wp-block-code"><code>const resetAtpAgentMock = () =&gt; {
mockAtpAgent = {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getPost: vi.fn(),

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resolveHandle: vi.fn().mockResolvedValue({

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: resolvedHandle

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}),

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login: vi.fn(),

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getAuthorFeed: vi.fn(),

&nbsp;&nbsp;&nbsp;};

}</code></pre>



<p>Let’s make sure we call it right in our code:</p>



<pre class="wp-block-code"><code>it('should call getAuthorFeed with the correct parameters', async () =&gt; {

  queueAgentFeedResponse(emptyFeedResponse);

  await bot.streamPosts(handle);

  expect(mockAtpAgent.getAuthorFeed.mock.calls&#91;0]&#91;0]).toEqual({

    actor: handle,

    limit: 20,

    cursor: undefined,

    filter: 'posts_with_media'

  });

});</code></pre>



<p>In the code snippet above, we enqueue an empty feed response from <code>getAuthorFeed </code>mock and call our method. We expect the mock to be called with the expected parameters.&nbsp;</p>



<p>Simple implementation again:</p>



<pre class="wp-block-code"><code>async streamPosts(handle: string) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const result = await this.#agent.getAuthorFeed({

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;actor: handle,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;limit: 20,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cursor: undefined,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filter: 'posts_with_media'

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});

}</code></pre>



<p>Our next stop is&#8230; well&#8230; to stop.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Stop_Conditions"></span>Stop Conditions<span class="ez-toc-section-end"></span></h4>



<p>Because streaming is a kind of an infinite loop, we need “stop” conditions.&nbsp;</p>



<p>We have two ways of knowing if we have reached the end of the stream.</p>



<p>The first is when we get an empty feed array:</p>



<pre class="wp-block-code"><code>it('should log when there are no more posts and break', async () =&gt; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queueAgentFeedResponse({

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; data: {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; feed: &#91;],

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cursor: ‘somthing’,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; },

&nbsp;&nbsp;&nbsp; &nbsp; });

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await bot.streamPosts(handle);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expect(mockAtpAgent.getAuthorFeed).toHaveBeenCalledTimes(1);

});</code></pre>



<p>As the test description implies, we enqueue an empty response for the <code>getAuthorFeed</code> mock. We then stream the posts. We then assert that <code>getAuthorFeed</code> was called only once, which means we broke out of the loop.</p>



<p>The second stop condition is when we get a response without a new cursor for the next batch:</p>



<pre class="wp-block-code"><code>it('should break if no cursor is provided in the feed response', async () =&gt; {

&nbsp;&nbsp;&nbsp;&nbsp;queueAgentFeedResponse({

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;feed: &#91;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ post: { uri: 'postUri1', cid: 'postCid1', embed: {} } },

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ post: { uri: 'postUri2', cid: 'postCid2', embed: {} } },

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cursor: undefined

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

&nbsp;&nbsp;&nbsp;&nbsp;});

&nbsp;&nbsp;&nbsp;&nbsp;await bot.streamPosts(handle);

&nbsp;&nbsp;&nbsp;&nbsp;expect(mockAtpAgent.getAuthorFeed).toHaveBeenCalledTimes(1);

});</code></pre>



<p>In this test, we enqueue a response with a feed &#8211; only this time, the <code>cursor</code> is undefined. This simulates the last batch use case.</p>



<p>Implementing those is a breeze. We wrap our request with an endless while loop and add our stop conditions:</p>



<pre class="wp-block-code"><code>async streamPosts(handle: string) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while(true) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const result = await this.#agent.getAuthorFeed({

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;actor: handle,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;limit: 20,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cursor: undefined,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filter: 'posts_with_media'

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!result.data?.feed?.length) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('No more posts');&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; break;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!result.data.cursor) {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}

}</code></pre>



<p>Our endless while loop calls <code>getAuthorFeed</code> and checks the feed’s length and the data’s cursor. In the case of an empty feed or undefined cursor, we break from the loop.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Error_Handling"></span>Error Handling<span class="ez-toc-section-end"></span></h4>



<p>We shouldn’t forget the error handling whenever we make a server call. In our case, we decided that if the fetch fails for some reason, we’d like to retry every 5000ms:</p>



<pre class="wp-block-code"><code>it('should retry after 5 seconds if author feed rejected', async () =&gt; {

  vi.useFakeTimers();

  const fetchError = new Error('Fetch error');

  mockAtpAgent.getAuthorFeed.mockRejectedValueOnce(fetchError);

  await bot.streamPosts(handle);

  await vi.advanceTimersByTimeAsync(4999);

  const callsBefore5Seconds = mockAtpAgent.getAuthorFeed.mock.calls.length;

  await vi.advanceTimersByTimeAsync(1);

  expect(callsBefore30Seconds).toBe(1);

  expect(mockAtpAgent.getAuthorFeed).toHaveBeenCalledTimes(2);

  vi.useRealTimers();

});</code></pre>



<p>A retry means we need to use timers. In order to control timers in <code>vitest</code>, we use fake timers (<code>vi.useFakeTimers()</code> on line 2). We make the mock <code>getAuthorFeed</code> reject the request with an error and then call our function. The interesting thing here is that we tell <code>vitest</code> to advance time by 4999ms. We would expect to have only one call to <code>getAuthorFeed</code>. We then advance the time by 1ms, completing the 5000ms cycle. We expect a single call to <code>getAuthorFeed</code> after 4999ms and 2 calls after another 1ms (a total of 5000ms).</p>



<p>Let’s implement this:</p>



<pre class="wp-block-code"><code>async streamPosts(handle: string) {

  while (true) {

    try {

      const result = await this.#agent.getAuthorFeed({

        actor: handle,

        limit: 20,

        cursor: undefined,

        filter: 'posts_with_media'

      });

      if (!result.data?.feed?.length) {

        console.log('No more posts');

        break;

      }

      if (!result.data.cursor) {

        break;

      }

    } catch (e) {

      await new Promise(res =&gt; setTimeout(res, 5000));

    }

  }
}</code></pre>



<p>Notice the addition of <code>try/catch</code> and the promise that resolves after 5000ms. Next step &#8211; notify the consumer that a chunk has arrived.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="The_Streaming_Callback"></span>The Streaming Callback<span class="ez-toc-section-end"></span></h4>



<p>To notify the consumer that a new chunk arrived from our fetch request, we will allow the consumer to pass a callback to <code>streamPosts</code>. We will fire this callback on every update and notify the user that the messages have stopped. So, we have three use cases here:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist135073163" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-streamposts-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="streamPosts.spec.ts content, created by YonatanKra on 04:23AM on December 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="streamPosts.spec.ts">
        <tr>
          <td id="file-streamposts-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-streamposts-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">it(&#39;should stream posts with done set to false when cursor is truthy&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-streamposts-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-streamposts-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">     const spy = vi.fn();</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-streamposts-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-streamposts-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">     queueAgentFeedResponse(fullFeedResponse);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-streamposts-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-streamposts-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">     queueAgentFeedResponse(fullFeedResponse);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-streamposts-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-streamposts-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">     queueAgentFeedResponse(fullFeedLastResponse);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-streamposts-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-streamposts-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">     await bot.streamPosts(handle, spy);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-streamposts-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-streamposts-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">     expect(spy.mock.calls[0][0])</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-streamposts-spec-ts-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-streamposts-spec-ts-LC15" class="blob-code blob-code-inner js-file-line">         .toEqual({result: fullFeedResponse.data.feed, done: false});</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-streamposts-spec-ts-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-streamposts-spec-ts-LC17" class="blob-code blob-code-inner js-file-line">     expect(spy.mock.calls[1][0])</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-streamposts-spec-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-streamposts-spec-ts-LC19" class="blob-code blob-code-inner js-file-line">         .toEqual({result: fullFeedResponse.data.feed, done: false});</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-streamposts-spec-ts-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-streamposts-spec-ts-LC21" class="blob-code blob-code-inner js-file-line">     expect(spy.mock.calls[2][0])</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-streamposts-spec-ts-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-streamposts-spec-ts-LC23" class="blob-code blob-code-inner js-file-line">         .toEqual({result: fullFeedLastResponse.data.feed, done: true});</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-streamposts-spec-ts-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-streamposts-spec-ts-LC25" class="blob-code blob-code-inner js-file-line"> });</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-streamposts-spec-ts-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-streamposts-spec-ts-LC27" class="blob-code blob-code-inner js-file-line"> it(&#39;should send done true to callback when response cursor is empty&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-streamposts-spec-ts-LC28" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-streamposts-spec-ts-LC29" class="blob-code blob-code-inner js-file-line">     const spy = vi.fn();</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-streamposts-spec-ts-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-streamposts-spec-ts-LC31" class="blob-code blob-code-inner js-file-line">     queueAgentFeedResponse(fullFeedLastResponse);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-streamposts-spec-ts-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-streamposts-spec-ts-LC33" class="blob-code blob-code-inner js-file-line">     await bot.streamPosts(handle, spy);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-streamposts-spec-ts-LC34" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-streamposts-spec-ts-LC35" class="blob-code blob-code-inner js-file-line">     expect(spy.mock.calls[0][0])</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-streamposts-spec-ts-LC36" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-streamposts-spec-ts-LC37" class="blob-code blob-code-inner js-file-line">         .toEqual({result: fullFeedLastResponse.data.feed, done: true});</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-streamposts-spec-ts-LC38" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-streamposts-spec-ts-LC39" class="blob-code blob-code-inner js-file-line"> });</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-streamposts-spec-ts-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-streamposts-spec-ts-LC41" class="blob-code blob-code-inner js-file-line"> it(&#39;should send done true to callback when feed returns empty&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-streamposts-spec-ts-LC42" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-streamposts-spec-ts-LC43" class="blob-code blob-code-inner js-file-line">     const spy = vi.fn();</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-streamposts-spec-ts-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-streamposts-spec-ts-LC45" class="blob-code blob-code-inner js-file-line">     queueAgentFeedResponse(emptyFeedResponse);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-streamposts-spec-ts-LC46" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-streamposts-spec-ts-LC47" class="blob-code blob-code-inner js-file-line">     await bot.streamPosts(handle, spy);</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-streamposts-spec-ts-LC48" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-streamposts-spec-ts-LC49" class="blob-code blob-code-inner js-file-line">     expect(spy.mock.calls[0][0]).toEqual({ done: true });</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-streamposts-spec-ts-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-spec-ts-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-streamposts-spec-ts-LC51" class="blob-code blob-code-inner js-file-line"> });</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/45834eff4b77819ff7fb87f493161447/raw/59a91987bfc54ffe5297daf4b7c280ced2f60606/streamPosts.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/45834eff4b77819ff7fb87f493161447#file-streamposts-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          streamPosts.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Let&#8217;s go over the test cases:</p>



<p><code>should stream posts with done set to false when cursor is truthy</code></p>



<p><strong>Arrange</strong>: This is the actual streaming. Our first line creates a <code>spy</code>. A <code>spy</code> is a method we can track. We used it when we mocked the <code>AtpAgent</code>. Here we create a <code>spy</code> that will be the <code>callback</code> we send to <code>streamPosts</code>.</p>



<p>We enqueue three responses &#8211; two full responses with a cursor and one last response with and undefined <code>cursor</code>. We must send the last response because this is our stop condition. </p>



<p><strong>Act</strong>: When we call <code>streamPosts</code>, we also send our <code>spy</code> as the callback. </p>



<p><strong>Assert</strong>: We’d expect to receive an object with <code>result</code> (which will hold the feed) and <code>done</code> (which will be false until we reach the last response and then it should be true).</p>



<p>The other tests should look familiar &#8211; they test the stop conditions. See that a final call to our callback receives an object with <code>{ done: true }</code>.</p>



<p>Here’s the implementation:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist135073238" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-streamposts-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="streamPosts.ts content, created by YonatanKra on 04:31AM on December 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="streamPosts.ts">
        <tr>
          <td id="file-streamposts-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-streamposts-ts-LC1" class="blob-code blob-code-inner js-file-line">async streamPosts(handle: string, onUpdate: (results: any) =&gt; any) {</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-streamposts-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-streamposts-ts-LC3" class="blob-code blob-code-inner js-file-line">     while (true) {</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-streamposts-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-streamposts-ts-LC5" class="blob-code blob-code-inner js-file-line">         try {</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-streamposts-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-streamposts-ts-LC7" class="blob-code blob-code-inner js-file-line">             const result = await this.#agent.getAuthorFeed({</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-streamposts-ts-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-streamposts-ts-LC9" class="blob-code blob-code-inner js-file-line">                 actor: handle,</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-streamposts-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-streamposts-ts-LC11" class="blob-code blob-code-inner js-file-line">                 limit: 20,</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-streamposts-ts-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-streamposts-ts-LC13" class="blob-code blob-code-inner js-file-line">                 cursor: undefined,</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-streamposts-ts-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-streamposts-ts-LC15" class="blob-code blob-code-inner js-file-line">                 filter: &#39;posts_with_media&#39;</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-streamposts-ts-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-streamposts-ts-LC17" class="blob-code blob-code-inner js-file-line">             });</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-streamposts-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-streamposts-ts-LC19" class="blob-code blob-code-inner js-file-line">             if (!result.data?.feed?.length) {</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-streamposts-ts-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-streamposts-ts-LC21" class="blob-code blob-code-inner js-file-line">                 console.log(&#39;No more posts&#39;);</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-streamposts-ts-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-streamposts-ts-LC23" class="blob-code blob-code-inner js-file-line">                 onUpdate({ done: true });</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-streamposts-ts-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-streamposts-ts-LC25" class="blob-code blob-code-inner js-file-line">                 break;</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-streamposts-ts-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-streamposts-ts-LC27" class="blob-code blob-code-inner js-file-line">             }</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-streamposts-ts-LC28" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-streamposts-ts-LC29" class="blob-code blob-code-inner js-file-line">             onUpdate({result: result.data.feed, done: !result.data.cursor});</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-streamposts-ts-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-streamposts-ts-LC31" class="blob-code blob-code-inner js-file-line">             if (!result.data.cursor) {</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-streamposts-ts-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-streamposts-ts-LC33" class="blob-code blob-code-inner js-file-line">                 break;</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-streamposts-ts-LC34" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-streamposts-ts-LC35" class="blob-code blob-code-inner js-file-line">             }</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-streamposts-ts-LC36" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-streamposts-ts-LC37" class="blob-code blob-code-inner js-file-line">         } catch (e) {</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-streamposts-ts-LC38" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-streamposts-ts-LC39" class="blob-code blob-code-inner js-file-line">             await new Promise(res =&gt; setTimeout(res, 5000));</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-streamposts-ts-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-streamposts-ts-LC41" class="blob-code blob-code-inner js-file-line">         }</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-streamposts-ts-LC42" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-streamposts-ts-LC43" class="blob-code blob-code-inner js-file-line">     }</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-streamposts-ts-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-streamposts-ts-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-streamposts-ts-LC45" class="blob-code blob-code-inner js-file-line"> }</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1ba66ef769e0ed54ef98635be0a0bb75/raw/9fd70e63bb4df245d8f1cd73aa640f2eb5ffafaa/streamPosts.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1ba66ef769e0ed54ef98635be0a0bb75#file-streamposts-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          streamPosts.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Notice the calls to <code>onUpdate</code> with the results and in our stop conditions.</p>



<p>We have one more thing to do here. Remember the <code>cursor</code>? We need to make sure to send the last result&#8217;s cursor in the next request. It looks something like this:</p>



<pre class="wp-block-code"><code>it('should send the last response cursor in the next request', async () =&gt; {

  const spy = vi.fn();

  queueAgentFeedResponse({ data: { ...fullFeedResponse.data, cursor: 'next-0' } });

  queueAgentFeedResponse({ data: { ...fullFeedResponse.data, cursor: 'next-1' } });

  queueAgentFeedResponse(fullFeedLastResponse);

  await bot.streamPosts(handle, spy);

  expect(mockAtpAgent.getAuthorFeed.mock.calls&#91;1]&#91;0].cursor).toBe('next-0');

  expect(mockAtpAgent.getAuthorFeed.mock.calls&#91;2]&#91;0].cursor).toBe('next-1');

  expect(mockAtpAgent.getAuthorFeed).toHaveBeenCalledTimes(3);

});</code></pre>



<p>We implement it by creating a <code>cursor</code> variable outside the loop. It will be  initiated as <code>undefined, but we will populate it with the cursor we receive from the getAuthorFeed</code> response:</p>



<pre class="wp-block-code"><code>async streamPosts(handle: string, onUpdate: (results: any) =&gt; any) {
  <strong>let cursor: string | undefined = undefined;</strong>
  while (true) {
    try {
      const result = await this.#agent.getAuthorFeed({
        actor: handle,
        limit: 20,
        <strong>cursor</strong>,
        filter: 'posts_with_media'
      });

      if (!result.data?.feed?.length) {
        console.log('No more posts');
        onUpdate({ done: true });
        break;
      }

      onUpdate({ result: result.data.feed, done: !result.data.cursor });

      if (!result.data.cursor) {
        break;
      }

      <strong>cursor = result.data.cursor;</strong>
      } catch (e) {
      await new Promise(res =&gt; setTimeout(res, 5000));
    }
  }
}</code></pre>



<p>For the full solution, <a href="https://gist.github.com/YonatanKra/8b40bed199d52ed083a7b0446d029081" target="_blank" data-type="link" data-id="https://gist.github.com/YonatanKra/8b40bed199d52ed083a7b0446d029081" rel="noreferrer noopener">click here</a>.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Theres_more_streaming%E2%80%A6"></span>There’s more streaming&#8230;<span class="ez-toc-section-end"></span></h4>



<p>While our streaming solution works, we can keep on enhancing it.&nbsp;</p>



<p>One way of doing that would be to cache results locally. If we already fetched something, we can keep it in local storage and skip the request.</p>



<p>Another enhancement can be a timed delay of our request. Much like we did with the retry, we can hold the next request by a few hundreds of milliseconds if the request rate is too fast.</p>



<p>One final suggestion would be to add a limit to the number of retries, or gradually increase the retry timeout.&nbsp;</p>



<p>We will not implement these ideas in this tutorial, but it’s important to note this is not a complete streaming solution.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Running_the_Bot"></span>Running the Bot<span class="ez-toc-section-end"></span></h2>



<p>We can now stream the posts’ data to our client. The way our bot will work will be as follows:</p>



<ol class="wp-block-list">
<li>Stream the posts</li>



<li>For every bunch, process the data</li>
</ol>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Run_Method"></span>The Run Method<span class="ez-toc-section-end"></span></h3>



<p>The bot’s entry point will be a <code>run</code> method. If we change our BlueSky service to the public API URL (https://public.api.bsky.app) we will not need to login to get the author feed. We will change it in our <code>AtpAgent</code> initiation:</p>



<p class="has-text-align-center"><code>#agent: AtpAgent = new AtpAgent({ service: 'https://public.api.bsky.app' });</code></p>



<p>All we need now is a BlueSky handle and a callback for streaming:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist135073355" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-run-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="run.spec.ts content, created by YonatanKra on 04:41AM on December 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="run.spec.ts">
        <tr>
          <td id="file-run-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-run-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">describe(&#39;run()&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-run-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-run-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">   it(&#39;should fire the callback on every streaming event&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-run-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">       queueAgentFeedResponse(fullFeedResponse);</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-run-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">       queueAgentFeedResponse(fullFeedLastResponse);</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-run-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">       const spy = vi.fn();</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-run-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-run-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">       await bot.run(handle, &#39;password&#39;, spy);</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-run-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-run-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">       expect(spy).toHaveBeenCalledTimes(2);</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-run-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">   });</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-run-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-run-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-run-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e426959e065bfde9fe3186d9c883684b/raw/ca0bbc43191f00cf6b049bf69ac38b04b7fdc26d/run.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e426959e065bfde9fe3186d9c883684b#file-run-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          run.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-run-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="run.ts content, created by YonatanKra on 04:41AM on December 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="run.ts">
        <tr>
          <td id="file-run-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-run-ts-LC1" class="blob-code blob-code-inner js-file-line"><span class=pl-k>async</span> <span class=pl-s1>run</span><span class=pl-kos>(</span><span class=pl-s1>handle</span><span class=pl-kos>,</span> <span class=pl-s1>callback</span>: <span class=pl-kos>(</span><span class=pl-kos>)</span> <span class=pl-c1>=&gt;</span> <span class=pl-kos>{</span><span class=pl-kos>}</span><span class=pl-kos>)</span> <span class=pl-kos>{</span></td>
        </tr>
        <tr>
          <td id="file-run-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-run-ts-LC2" class="blob-code blob-code-inner js-file-line">       <span class=pl-k>await</span> <span class=pl-smi>this</span><span class=pl-kos>.</span><span class=pl-en>streamPosts</span><span class=pl-kos>(</span><span class=pl-s1>handle</span><span class=pl-kos>,</span> <span class=pl-kos>(</span><span class=pl-s1>data</span><span class=pl-kos>)</span> <span class=pl-c1>=&gt;</span> <span class=pl-en>callback</span><span class=pl-kos>(</span><span class=pl-kos>)</span><span class=pl-kos>)</span></td>
        </tr>
        <tr>
          <td id="file-run-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-run-ts-LC3" class="blob-code blob-code-inner js-file-line">   <span class=pl-kos>}</span></td>
        </tr>
        <tr>
          <td id="file-run-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-run-ts-LC4" class="blob-code blob-code-inner js-file-line"><span class=pl-kos>}</span></td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e426959e065bfde9fe3186d9c883684b/raw/ca0bbc43191f00cf6b049bf69ac38b04b7fdc26d/run.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e426959e065bfde9fe3186d9c883684b#file-run-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          run.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>We use a similar callback mechanism to notify the consumer of newly streamed parsed data.</p>



<p>While this is nice, we want simplify the data structure for the consumer. Our data should look like this:</p>



<pre class="wp-block-code"><code>export interface BotPost {

  imagesWithoutAlt: &#91;];

  text: string;

  createdAt: string;

}

export interface AltlessPosts {

  results: BotPost&#91;],

  done: Boolean;

}</code></pre>



<p>So, we’ll make sure it does:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist135073400" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-parseddata-spec-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="parsedData.spec.ts content, created by YonatanKra on 04:44AM on December 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="parsedData.spec.ts">
        <tr>
          <td id="file-parseddata-spec-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-parseddata-spec-ts-LC1" class="blob-code blob-code-inner js-file-line">it(&#39;should send parsed output to the callback&#39;, async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-parseddata-spec-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-parseddata-spec-ts-LC3" class="blob-code blob-code-inner js-file-line">   queueAgentFeedResponse(fullFeedResponseWithAlt);</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-parseddata-spec-ts-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-parseddata-spec-ts-LC5" class="blob-code blob-code-inner js-file-line">   queueAgentFeedResponse(fullFeedLastResponse);</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-parseddata-spec-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-parseddata-spec-ts-LC7" class="blob-code blob-code-inner js-file-line">   const spy = vi.fn();</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-parseddata-spec-ts-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-parseddata-spec-ts-LC9" class="blob-code blob-code-inner js-file-line">   await bot.run(handle, &#39;password&#39;, spy);</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-parseddata-spec-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-parseddata-spec-ts-LC11" class="blob-code blob-code-inner js-file-line">   expect(spy.mock.calls[0][0]).toEqual({</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-parseddata-spec-ts-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-parseddata-spec-ts-LC13" class="blob-code blob-code-inner js-file-line">       results: [</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-parseddata-spec-ts-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-parseddata-spec-ts-LC15" class="blob-code blob-code-inner js-file-line">           {</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-parseddata-spec-ts-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-parseddata-spec-ts-LC17" class="blob-code blob-code-inner js-file-line">               imagesWithoutAlt: [],</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-parseddata-spec-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-parseddata-spec-ts-LC19" class="blob-code blob-code-inner js-file-line">               text: &#39;text1&#39;,</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-parseddata-spec-ts-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-parseddata-spec-ts-LC21" class="blob-code blob-code-inner js-file-line">               createdAt: fullFeedResponseWithAlt.data.feed[0].post.record?.createdAt</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-parseddata-spec-ts-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-parseddata-spec-ts-LC23" class="blob-code blob-code-inner js-file-line">           },</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-parseddata-spec-ts-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-parseddata-spec-ts-LC25" class="blob-code blob-code-inner js-file-line">           {</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-parseddata-spec-ts-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-parseddata-spec-ts-LC27" class="blob-code blob-code-inner js-file-line">               imagesWithoutAlt: [],</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-parseddata-spec-ts-LC28" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-parseddata-spec-ts-LC29" class="blob-code blob-code-inner js-file-line">               text: &#39;text2&#39;,</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-parseddata-spec-ts-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-parseddata-spec-ts-LC31" class="blob-code blob-code-inner js-file-line">               createdAt: fullFeedResponseWithAlt.data.feed[1].post.record?.createdAt },</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-parseddata-spec-ts-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-parseddata-spec-ts-LC33" class="blob-code blob-code-inner js-file-line">       ],</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-parseddata-spec-ts-LC34" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-parseddata-spec-ts-LC35" class="blob-code blob-code-inner js-file-line">       done: false</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-parseddata-spec-ts-LC36" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-parseddata-spec-ts-LC37" class="blob-code blob-code-inner js-file-line">   });</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-parseddata-spec-ts-LC38" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-parseddata-spec-ts-LC39" class="blob-code blob-code-inner js-file-line">   expect(spy.mock.calls[1][0]).toEqual({</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-parseddata-spec-ts-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-parseddata-spec-ts-LC41" class="blob-code blob-code-inner js-file-line">       results: [</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-parseddata-spec-ts-LC42" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-parseddata-spec-ts-LC43" class="blob-code blob-code-inner js-file-line">           {</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-parseddata-spec-ts-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-parseddata-spec-ts-LC45" class="blob-code blob-code-inner js-file-line">               imagesWithoutAlt: [imageWithoutAlt, imageWithoutAlt],</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-parseddata-spec-ts-LC46" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-parseddata-spec-ts-LC47" class="blob-code blob-code-inner js-file-line">               text: &#39;text1&#39;,</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-parseddata-spec-ts-LC48" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-parseddata-spec-ts-LC49" class="blob-code blob-code-inner js-file-line">               createdAt: fullFeedLastResponse.data.feed[0].post.record?.createdAt</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-parseddata-spec-ts-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-parseddata-spec-ts-LC51" class="blob-code blob-code-inner js-file-line">           },</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-parseddata-spec-ts-LC52" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-parseddata-spec-ts-LC53" class="blob-code blob-code-inner js-file-line">           {</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-parseddata-spec-ts-LC54" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-parseddata-spec-ts-LC55" class="blob-code blob-code-inner js-file-line">               imagesWithoutAlt: [imageWithoutAlt, imageWithoutAlt],</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-parseddata-spec-ts-LC56" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-parseddata-spec-ts-LC57" class="blob-code blob-code-inner js-file-line">               text: &#39;text2&#39;,</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-parseddata-spec-ts-LC58" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-parseddata-spec-ts-LC59" class="blob-code blob-code-inner js-file-line">               createdAt: fullFeedLastResponse.data.feed[1].post.record?.createdAt },</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-parseddata-spec-ts-LC60" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-parseddata-spec-ts-LC61" class="blob-code blob-code-inner js-file-line">       ],</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-parseddata-spec-ts-LC62" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-parseddata-spec-ts-LC63" class="blob-code blob-code-inner js-file-line">       done: true</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-parseddata-spec-ts-LC64" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-parseddata-spec-ts-LC65" class="blob-code blob-code-inner js-file-line">   });</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-parseddata-spec-ts-LC66" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-parseddata-spec-ts-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-parseddata-spec-ts-LC67" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/7c52b72d946be1b1f3ec1ac3213d72e2/raw/5cc71d6725d2f528b8a21357979124226668ad4a/parsedData.spec.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/7c52b72d946be1b1f3ec1ac3213d72e2#file-parseddata-spec-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          parsedData.spec.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>As usual, we enqueue the messages, call on our bot. This time we expect the callback to receive the expected messages for each chunk of our data.</p>



<p>Implementing it is as easy as:</p>



<pre class="wp-block-code"><code>async run(handle, callback: (results: BotPosts) =&gt; { }) {

  await this.streamPosts(handle, ({ result, done }) =&gt; {

    const parsedData = {

      results: this.#parseStreamData(result),

      done

    };

    callback(parsedData);

  });

}</code></pre>



<p>Note that #parseStreamData is a private implementation detail. You can view it in the full repository.</p>



<p>If you followed so far, you can be proud. A 100% covered bot:</p>



<figure class="wp-block-image aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="119" src="/wp-content/uploads/2024/12/image-2.png" alt="An image showing test coverage output in the console. It shows all the file `find-altless-posts.ts` has 100% coverage of statments, branches, functions and lines.
" class="wp-image-2125" srcset="/wp-content/uploads/2024/12/image-2.png 1024w, /wp-content/uploads/2024/12/image-2.png 300w, /wp-content/uploads/2024/12/image-2.png 768w, /wp-content/uploads/2024/12/image-2.png 268w, /wp-content/uploads/2024/12/image-2.png 1222w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">A 100% test covered bot</figcaption></figure>



<p>We are ready to use our BlueSky bot for our Alt Text Game of Life!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary_of_part_1"></span>Summary (of part 1)<span class="ez-toc-section-end"></span></h2>



<p>We have a well-tested &#8220;bot&#8221; capable of analyzing BlueSky posts for missing alt text. By leveraging the AtProto SDK and implementing efficient streaming techniques, the bot can handle large amounts of data.</p>



<p>We wrote it in a way that can be used both in a nodejs backend as well as run in the browser. This sets the stage for the next phase of the project: developing a user interface to make this functionality accessible and engaging for BlueSky users. In the upcoming part, we will focus on creating a web component-based UI to gamify the process of adding alt text and encourage wider adoption of accessibility best practices.</p>



<p>If you are eager to see the full code, the complete repository is available on github: <a href="https://github.com/YonatanKra/bluesky-alttext-game" target="_blank" rel="noopener">https://github.com/YonatanKra/bluesky-alttext-game</a></p>

