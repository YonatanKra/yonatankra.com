---
title: AskQL Nodejs QuickStart
slug: askql-nodejs-quickstart
published: 2020-10-17T20:15:32
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: AskQL is a new query language that is also a programming language. I’ve written an introduction about it in the former post. In this article we will see how it can be setup in a nodejs server. Quickly setting a server To setup a server with AskQL, we first need a server. Let’s set it [&hellip;]
categories:
  - name: AskQL
    slug: askql
    path: askql
  - name: nodejs
    slug: nodejs
    path: javascript/nodejs
tags:
  - AskQL
  - express
  - nodejs
canonical: https://yonatankra.com/askql-nodejs-quickstart/
comments: []
---

<p>AskQL is a new query language that is also a programming language. I&#8217;ve written <a href="/introduction-to-askql/" data-type="post" data-id="453">an introduction about it in the former post</a>.</p>



<p>In this article we will see how it can be setup in a nodejs server.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d7ebd3e" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d7ebd3e"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/askql-nodejs-quickstart/#Quickly_setting_a_server" >Quickly setting a server</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/askql-nodejs-quickstart/#Setting_up_AskQL" >Setting up AskQL</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/askql-nodejs-quickstart/#Lets_see_it_in_action" >Let&#8217;s see it in action</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/askql-nodejs-quickstart/#What_Else" >What Else?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/askql-nodejs-quickstart/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Quickly_setting_a_server"></span>Quickly setting a server<span class="ez-toc-section-end"></span></h2>



<p>To setup a server with AskQL, we first need a server. Let&#8217;s set it up quickly</p>



<ol class="wp-block-list"><li>Clone the express demo repository:<br><code>git clone https://github.com/YonatanKra/askql-demo.git</code></li><li>Enter into the folder:<br><code>cd askql-demo</code></li><li>Checkout the express-quick-start tag:<br><code>git checkout express-quick-start</code></li><li>npm i</li><li>npm run dev</li></ol>



<hr class="wp-block-separator"/>



<p>Now you have a working <em><a rel="noreferrer noopener" href="https://expressjs.com/" target="_blank">express</a></em> repository.</p>



<figure class="wp-block-pullquote"><blockquote><p>Express is a web framework for nodejs. It helps you setup a flexible and easily extendible web server in a really short amount of time.</p></blockquote></figure>



<p>The setup is pretty simple &#8211; in <code>index.js</code> (Code snippet #1) the server is setup with 3 middleware: <code>logRequestMiddleware</code>, <code>logResultsMiddleware</code> and <code>errorHandler</code>. They are being used in the <code>/ask</code> endpoint.</p>



<p>There&#8217;s also a public html page that will serve as our client.</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<figure class="wp-block-table"><table><tbody><tr><td><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist105935433" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.js content, created by YonatanKra on 06:40AM on October 17, 2020."
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
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line">import express  from &#39;express&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line">import bodyParser from &#39;body-parser&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">import {logRequestMiddleware, logResultsMiddleware, logError} from &quot;./logger/logger.js&quot;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-js-LC5" class="blob-code blob-code-inner js-file-line">const port = 8080;</td>
        </tr>
        <tr>
          <td id="file-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-js-LC6" class="blob-code blob-code-inner js-file-line">const app = express();</td>
        </tr>
        <tr>
          <td id="file-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-js-LC8" class="blob-code blob-code-inner js-file-line">app.use(bodyParser.json());</td>
        </tr>
        <tr>
          <td id="file-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-js-LC9" class="blob-code blob-code-inner js-file-line">app.use(bodyParser.urlencoded({ extended: true }));</td>
        </tr>
        <tr>
          <td id="file-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-js-LC10" class="blob-code blob-code-inner js-file-line">app.use(express.static(&#39;public&#39;));</td>
        </tr>
        <tr>
          <td id="file-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-js-LC11" class="blob-code blob-code-inner js-file-line">app.post(&#39;/ask&#39;, [logRequestMiddleware, logResultsMiddleware, logError]);</td>
        </tr>
        <tr>
          <td id="file-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-js-LC12" class="blob-code blob-code-inner js-file-line">app.listen(port, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-js-LC13" class="blob-code blob-code-inner js-file-line">    console.log(`Server listening at http://localhost:${port}`);</td>
        </tr>
        <tr>
          <td id="file-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-js-LC14" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0f37862fafd277f517ccdf7a3b593e57/raw/87f163991b65a6bdf331ce2d454ad10e6d2adc9e/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0f37862fafd277f517ccdf7a3b593e57#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</td></tr></tbody></table><figcaption>Code Snippet #1: A simple express server with.  Line 10: Static assets are being served. Line 11: 3 middleware are set for the <code>/ask</code> entry point.  Line 12: The server starts to listen to port 8080.</figcaption></figure>
</div></div>



<p>If you go to the client (<a href="http://localhost:8080" target="_blank" rel="noreferrer noopener">http://localhost:8080</a>) and submit the form, you will see that the submit has been logged. The output should be something like:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="445" src="/wp-content/uploads/2020/10/image-4.png" alt="" class="wp-image-495" srcset="/wp-content/uploads/2020/10/image-4.png 1024w, /wp-content/uploads/2020/10/image-4.png 300w, /wp-content/uploads/2020/10/image-4.png 768w, /wp-content/uploads/2020/10/image-4.png 129w, /wp-content/uploads/2020/10/image-4.png 390w, /wp-content/uploads/2020/10/image-4.png 1312w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 1</strong>: Logging a submit in our express server</figcaption></figure>



<p>The output shown in <strong>Figure 1</strong> is not very exciting. You can see something that looks like code (actually, it is called <code>AskScript</code>) but it doesn&#8217;t do anything.</p>



<p>Let&#8217;s install AskQL so it would be able to parse our script.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Setting_up_AskQL"></span>Setting up AskQL<span class="ez-toc-section-end"></span></h2>



<p>First we need to install AskQL: <em><code>npm i askql</code></em></p>



<p>Now that AskQL is installed, we can import its utilities and classes in our express app.</p>



<p>Let&#8217;s import an AskQL middleware:</p>



<pre class="wp-block-code"><code>import middlewareFactory from "askql/askExpressMiddleware/askExpressMiddleware.js";
const { askExpressMiddleware } = middlewareFactory;</code></pre>



<p>The <em>askExpressMiddleware </em>is a function that accepts some resources and configuration objects and returns a middleware function:</p>



<pre class="wp-block-code"><code>const askMiddleware = askExpressMiddleware( 
{ resources, values },  { callNext: true, passError: true}
);</code></pre>



<p>Resources are dynamic AskQL resources that can be accessed in the AskScript. </p>



<p>Resources can be functions, data handlers (like filter, map etc.) mathematical operators and actually anything a function can do (even 3rd party npm modules you import).</p>



<p>Values are static values that exist in the server.&nbsp; The <code>values</code> object is a regular object that holds numbers, strings, booleans, arrays or other objects.</p>



<p>Let&#8217;s take the resources that are coming from AskQL and define some values:</p>



<pre class="wp-block-code"><code>import askql from 'askql';
const {resources} = askql;
const values = {    
  names: &#091;'Johnny', 'Rita', 'Jane', 'Martha', 'Clark'],
  powers: &#091;'Nerd', 'C#', 'Cool', 'Superman\'s mom', 'Superman']
};</code></pre>



<p>The configuration object is a means to customise the middleware &#8211; for instance, how to handle errors.</p>



<p>Now that the middleware is ready, we can add it to the list of middleware between the two loggers and restart the server.</p>



<p>The final <code>index.js</code> looks like this:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist105906597" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.js content, created by YonatanKra on 01:57PM on October 15, 2020."
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
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line">import express  from &#39;express&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line">import bodyParser from &#39;body-parser&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">import {logRequestMiddleware, logResultsMiddleware, logError} from &quot;./logger/logger.js&quot;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line">import middlewareFactory from &quot;askql/askExpressMiddleware/askExpressMiddleware.js&quot;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-js-LC5" class="blob-code blob-code-inner js-file-line">import askql from &#39;askql&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-js-LC7" class="blob-code blob-code-inner js-file-line">const {resources} = askql;</td>
        </tr>
        <tr>
          <td id="file-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-js-LC9" class="blob-code blob-code-inner js-file-line">const values = {</td>
        </tr>
        <tr>
          <td id="file-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-js-LC10" class="blob-code blob-code-inner js-file-line">    names: [&#39;Johnny&#39;, &#39;Rita&#39;, &#39;Jane&#39;, &#39;Martha&#39;, &#39;Clark&#39;],</td>
        </tr>
        <tr>
          <td id="file-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-js-LC11" class="blob-code blob-code-inner js-file-line">    powers: [&#39;Nerd&#39;, &#39;C#&#39;, &#39;Cool&#39;, &#39;Superman\&#39;s mom&#39;, &#39;Superman&#39;]</td>
        </tr>
        <tr>
          <td id="file-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-js-LC12" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-js-LC14" class="blob-code blob-code-inner js-file-line">const { askExpressMiddleware } = middlewareFactory;</td>
        </tr>
        <tr>
          <td id="file-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-js-LC15" class="blob-code blob-code-inner js-file-line">const askMiddleware = askExpressMiddleware({ resources, values },  { callNext: true, passError: true });</td>
        </tr>
        <tr>
          <td id="file-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-js-LC17" class="blob-code blob-code-inner js-file-line">const port = 8080;</td>
        </tr>
        <tr>
          <td id="file-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-js-LC18" class="blob-code blob-code-inner js-file-line">const app = express();</td>
        </tr>
        <tr>
          <td id="file-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-js-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-index-js-LC20" class="blob-code blob-code-inner js-file-line">app.use(bodyParser.json());</td>
        </tr>
        <tr>
          <td id="file-index-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-index-js-LC21" class="blob-code blob-code-inner js-file-line">app.use(bodyParser.urlencoded({ extended: true }));</td>
        </tr>
        <tr>
          <td id="file-index-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-index-js-LC22" class="blob-code blob-code-inner js-file-line">app.use(express.static(&#39;public&#39;));</td>
        </tr>
        <tr>
          <td id="file-index-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-index-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-index-js-LC24" class="blob-code blob-code-inner js-file-line">app.post(&#39;/ask&#39;, [logRequestMiddleware, askMiddleware, logResultsMiddleware, logError]);</td>
        </tr>
        <tr>
          <td id="file-index-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-index-js-LC25" class="blob-code blob-code-inner js-file-line">app.listen(port, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-index-js-LC26" class="blob-code blob-code-inner js-file-line">    console.log(`Server listening at http://localhost:${port}`);</td>
        </tr>
        <tr>
          <td id="file-index-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-index-js-LC27" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-index-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-index-js-LC28" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/44e085409f6d88cb22f460818d277c44/raw/00d21da08a2842fbf593ed20db8241a3bc7410e4/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/44e085409f6d88cb22f460818d277c44#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Lets_see_it_in_action"></span>Let&#8217;s see it in action<span class="ez-toc-section-end"></span></h2>



<p>The client is a form that sends AskScript to the <em>ask</em> access point (a post request).</p>



<p>Let’s try out the first code we can possibly think of:</p>



<pre class="wp-block-code"><code>ask { 'Hello World!' }</code></pre>



<p>Write it down in the text area and submit.</p>



<p>Surprisingly, it returns “Hello World!”</p>



<p>Now, instead of just asking for a value from the server, let’s ask for a value from a variable that exists on our server (via the <code>values</code> we sent to our askMiddleware):</p>



<pre class="wp-block-code"><code>ask { names }</code></pre>



<p>And we get all the names in the group.</p>



<p>Now let’s query for their powers (or maybe I should have used the word traits):</p>



<pre class="wp-block-code"><code>ask { powers }</code></pre>



<p>That was wonderful.&nbsp;</p>



<p>Now we see how easy it is to access values we know about on the server.&nbsp; What about combining resources with values? Let’s do something more interesting:</p>



<pre class="wp-block-code"><code>ask {        
  let arr = &#091;];
  for (let i = 0; i &lt; names:length; i = i + 1) { 
    arr = arr:set(i, {
                       name: names:at(i), 
                       power:powers:at(i)
    });
  }
  arr 
}</code></pre>



<p>What do you think the above piece of code will do? You probably guessed right &#8211; it is a map! </p>



<p>AskQL has us covered with yet another core resource:</p>



<pre class="wp-block-code"><code>ask {
  names:map(fun(name, i) {        
    {name, power: powers:at(i)}    
  })
}</code></pre>



<p>The two last snippets would both have the same result!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_Else"></span>What Else?<span class="ez-toc-section-end"></span></h2>



<p>AskQL has lots of resources.</p>



<p>Let’s say we want to find one of our heroes according to the hero’s power? We just use the <code>find</code> resource:</p>



<pre class="wp-block-code"><code>ask {
  names:find(fun(c, i) {
    return powers:at(i):equals('Innocent')
  })
}</code></pre>



<p>There are a lot more resources for AskQL.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this post, we&#8217;ve setup a nodejs server that allows a very flexible API without doing anything server side &#8211; just expose some data.</p>



<p>Anyone using microservices?</p>



<p>Let’s say there&#8217;s a microservice that serves some crucial data. How do we access it immediately?</p>



<pre class="wp-block-code"><code>ask {
   fetch('https://swapi.dev/api/people'):at('results')
}</code></pre>



<p>That script will return a list of Star Wars characters via the public StarWars API. </p>



<pre class="wp-block-preformatted">In order for the above script to run, one needs to install node-fetch: npm i node-fetch</pre>



<p>With AskQL we are not limited by anything. We can not only use the built in resources in order to created flexible scripts. We can also create our own custom resources!</p>



<p>In the next post, I&#8217;ll expand on this example and show how to create a custom resource to manipulate MongoDB.</p>



<p>I invite you to the <a rel="noreferrer noopener" href="https://github.com/xFAANG/askql" target="_blank">AskQL repository</a> to contribute and be involved with a promising technology. There&#8217;s also <a rel="noreferrer noopener" href="https://discord.gg/D4haZp" target="_blank">the discord server</a> where you can hang out with the core team.</p>



<p>Thanks a lot to&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/Piotr_Zientara" target="_blank">Piotr</a>&nbsp;from&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/XFaang" target="_blank">xFAANG</a>&nbsp;and&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/jodoron" target="_blank">Yonatan Doron</a>&nbsp;from&nbsp;<a rel="noreferrer noopener" href="https://hodash.dev/" target="_blank">Hodash.dev</a> for the kind and thorough review.</p>

