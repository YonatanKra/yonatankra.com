---
title: Introduction to AskQL
slug: introduction-to-askql
published: 2020-10-08T05:25:09
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: AskQL is a new query language that is also a programming language. Read on to see how you can actually get Star Wars with AskQL. We can query AskQL with askscript. The askscript should be very intuitive for developers, because it looks like a script! Let’s query the most common first query – hello world! [&hellip;]
categories:
  - name: AskQL
    slug: askql
    path: askql
tags:
  - AskQL
  - nodejs
canonical: https://yonatankra.com/introduction-to-askql/
comments: []
---

<p>AskQL is a new query language that is also a programming language. Read on to see how you can actually get Star Wars with AskQL.</p>



<p>We can query AskQL with askscript. The askscript should be very intuitive for developers, because it looks like a script!</p>



<p>Let’s query the most common first query &#8211; hello world!</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<pre class="wp-block-code"><code>ask { 'Hello World!' }</code></pre>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="109" src="/wp-content/uploads/2020/10/image.png" alt="" class="wp-image-454" srcset="/wp-content/uploads/2020/10/image.png 758w, /wp-content/uploads/2020/10/image.png 300w, /wp-content/uploads/2020/10/image.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Code snippet 1</strong>: Hello World script (top) and the result in the playground (bottom).</figcaption></figure>



<p></p>
</div></div>



<p>We can see the server returns “Hello World!”, which is the string we’ve just sent it.</p>



<p id="server-resources">For the next parts, we’re going to use the data set in the playground. You can view the values set on server in this file: <style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist105771297" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-values-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="values.ts content, created by YonatanKra on 04:39AM on October 08, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="values.ts">
        <tr>
          <td id="file-values-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-values-ts-LC1" class="blob-code blob-code-inner js-file-line">export const customValues: { [key: string]: any } = {</td>
        </tr>
        <tr>
          <td id="file-values-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-values-ts-LC2" class="blob-code blob-code-inner js-file-line">  clientNames: [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;e&#39;, &#39;f&#39;, &#39;g&#39;],</td>
        </tr>
        <tr>
          <td id="file-values-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-values-ts-LC3" class="blob-code blob-code-inner js-file-line">  hello: &#39;Hi! This is a AskVM server running on localhost&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-values-ts-LC4" class="blob-code blob-code-inner js-file-line">  revPerClient: {</td>
        </tr>
        <tr>
          <td id="file-values-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-values-ts-LC5" class="blob-code blob-code-inner js-file-line">    a: 426,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-values-ts-LC6" class="blob-code blob-code-inner js-file-line">    b: 35,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-values-ts-LC7" class="blob-code blob-code-inner js-file-line">    c: 446,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-values-ts-LC8" class="blob-code blob-code-inner js-file-line">    d: 246,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-values-ts-LC9" class="blob-code blob-code-inner js-file-line">    e: 133,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-values-ts-LC10" class="blob-code blob-code-inner js-file-line">    f: 136,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-values-ts-LC11" class="blob-code blob-code-inner js-file-line">    g: 53,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-values-ts-LC12" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-values-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-values-ts-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-values-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-values-ts-LC14" class="blob-code blob-code-inner js-file-line">  firstName: &#39;Luke&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-values-ts-LC15" class="blob-code blob-code-inner js-file-line">  middleName: &#39;LukeLuke&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-values-ts-LC16" class="blob-code blob-code-inner js-file-line">  lastName: &#39;Skywalker&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-values-ts-LC17" class="blob-code blob-code-inner js-file-line">  fullName: &#39;Luke Skywalker&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-values-ts-LC18" class="blob-code blob-code-inner js-file-line">  parents: [</td>
        </tr>
        <tr>
          <td id="file-values-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-values-ts-LC19" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-values-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-values-ts-LC20" class="blob-code blob-code-inner js-file-line">      firstName: &#39;Padmé&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-values-ts-LC21" class="blob-code blob-code-inner js-file-line">      lastName: &#39;Amidala&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-values-ts-LC22" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-values-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-values-ts-LC23" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-values-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-values-ts-LC24" class="blob-code blob-code-inner js-file-line">      firstName: &#39;Anakin&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-values-ts-LC25" class="blob-code blob-code-inner js-file-line">      lastName: &#39;Skywalker&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-values-ts-LC26" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-values-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-values-ts-LC27" class="blob-code blob-code-inner js-file-line">  ],</td>
        </tr>
        <tr>
          <td id="file-values-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-values-ts-LC28" class="blob-code blob-code-inner js-file-line">  friends: [</td>
        </tr>
        <tr>
          <td id="file-values-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-values-ts-LC29" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-values-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-values-ts-LC30" class="blob-code blob-code-inner js-file-line">      id: 0,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-values-ts-LC31" class="blob-code blob-code-inner js-file-line">      firstName: &#39;Padmé&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-values-ts-LC32" class="blob-code blob-code-inner js-file-line">      lastName: &#39;Amidala&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-values-ts-LC33" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-values-ts-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-values-ts-LC34" class="blob-code blob-code-inner js-file-line">    {</td>
        </tr>
        <tr>
          <td id="file-values-ts-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-values-ts-LC35" class="blob-code blob-code-inner js-file-line">      id: 1,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-values-ts-LC36" class="blob-code blob-code-inner js-file-line">      firstName: &#39;Anakin&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-values-ts-LC37" class="blob-code blob-code-inner js-file-line">      lastName: &#39;Skywalker&#39;,</td>
        </tr>
        <tr>
          <td id="file-values-ts-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-values-ts-LC38" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-values-ts-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-values-ts-LC39" class="blob-code blob-code-inner js-file-line">  ],</td>
        </tr>
        <tr>
          <td id="file-values-ts-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-values-ts-LC40" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/f2d1b7893b54b1368317d0a75eeef437/raw/e8b07edbdefb2c51b23f55b937808da823b4270e/values.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/f2d1b7893b54b1368317d0a75eeef437#file-values-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          values.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</p>



<p>You can copy-paste the code snippets to the <a href="https://cli.askql.org/" target="_blank" rel="noopener">AskQL playground</a> to see them in action and play with.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d8f28d4" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d8f28d4"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/introduction-to-askql/#AskQl_%E2%80%93_the_query_language" >AskQl &#8211; the query language</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/introduction-to-askql/#AskQL_%E2%80%93_the_programming_language" >AskQL &#8211; the programming language</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/introduction-to-askql/#Fully_fledged_scripts" >Fully fledged scripts</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/introduction-to-askql/#The_power_is_in_your_hands" >The power is in your hands!</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/introduction-to-askql/#A_Word_About_Security" >A Word About Security</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/introduction-to-askql/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="AskQl_%E2%80%93_the_query_language"></span>AskQl &#8211; the query language<span class="ez-toc-section-end"></span></h2>



<p>We said AskQL is a query language, so let’s perform a simple query:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {<br>&nbsp; query {<br>&nbsp; &nbsp; firstName<br>&nbsp; &nbsp; lastName<br>&nbsp; }<br>}</td></tr></tbody></table><figcaption><strong>Code Snippet 2</strong>: A simple query</figcaption></figure>



<p>The query in Code Snippet 2 requests two resources the server exposes for us &#8211; <code>firstName</code> and <code>lastName</code> (see the <a href="#server-resources">resources file</a> above). A query always returns an object with the wanted properties. You can copy-paste Code Snippet 2 to the playground and run it. The result is shown in Figure 1.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="140" src="/wp-content/uploads/2020/10/image-1.png" alt="" class="wp-image-461" srcset="/wp-content/uploads/2020/10/image-1.png 755w, /wp-content/uploads/2020/10/image-1.png 300w, /wp-content/uploads/2020/10/image-1.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 1</strong>: The results of Code Snippet 2</figcaption></figure>



<p>Of course, you could do a more complex query for other resources at the same query:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {<br>&nbsp; query {<br>&nbsp; &nbsp; firstName<br>&nbsp; &nbsp; lastName<br>&nbsp; &nbsp; parents {<br>&nbsp; &nbsp; &nbsp; firstName<br>&nbsp; &nbsp; &nbsp; lastName<br>&nbsp; &nbsp; }<br>&nbsp; }<br>}</td></tr></tbody></table><figcaption><strong>Code Snippet 3</strong></figcaption></figure>



<p>Here we queried the first name and the last name of in the <a href="#server-resources">server resources</a>.&nbsp; We also queried for the parents’ first name and last name.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="AskQL_%E2%80%93_the_programming_language"></span>AskQL &#8211; the programming language<span class="ez-toc-section-end"></span></h2>



<p>As mentioned in the AskQL definition,&nbsp; AskQL is also a programming language, so let’s do some programming:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {&nbsp;&nbsp;(10 + 5) * 5} // expect 75</td></tr></tbody></table><figcaption><strong>Code Snippet 4: </strong>A simple mathematical operation</figcaption></figure>



<p>Code Snippet 4 asks our server to do some mathematical calculation. Paste it to the playground and see that it returns 75 as expected.</p>



<p>Of course AskQL has its own syntax. A nice thing about AskQL is that it gives you useful syntax errors. In <strong>Figure 2</strong> I purposely got the syntax wrong. We can see AskQL got us covered so we can easily fix our code.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="292" src="/wp-content/uploads/2020/10/image-2.png" alt="" class="wp-image-463" srcset="/wp-content/uploads/2020/10/image-2.png 914w, /wp-content/uploads/2020/10/image-2.png 300w, /wp-content/uploads/2020/10/image-2.png 768w, /wp-content/uploads/2020/10/image-2.png 197w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 2</strong>: A query with a wrong syntax gives us a very good feedback as to what went wrong &#8211; hence we can easily learn the syntax just by trying out scripts.</figcaption></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Fully_fledged_scripts"></span>Fully fledged scripts<span class="ez-toc-section-end"></span></h3>



<p>We could also use variables and functions for more complex procedures:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {<br>&nbsp; const factorial: int(int) = fun(n:int):int {<br>&nbsp; &nbsp; if (n:lessThan(2)) {<br>&nbsp; &nbsp; &nbsp; return n<br>&nbsp; &nbsp; }<br><br>&nbsp; &nbsp; n:multiply(factorial(n:minus(1)))<br>&nbsp; }<br><br>&nbsp; 5:factorial<br>}</td></tr></tbody></table><figcaption><strong>Code Snippet 5</strong>: A factorial function with AskQL</figcaption></figure>



<p>This ask code creates a function called factorial that receives an integer and calculates its factorial. You can paste this code into the playground and change the input (let&#8217;s say, <code>6:factorial</code>) to see the magic.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_power_is_in_your_hands"></span>The power is in your hands!<span class="ez-toc-section-end"></span></h2>



<p>Combining a query language with a programming language is a very powerful tool.&nbsp;</p>



<p>For instance, we can query and manipulate the data at the same time, assuring the client gets the exact data structure it needs:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {<br>&nbsp; query {<br>&nbsp; &nbsp; fullName: firstName :concat(&#8216; &#8216;, lastName) :toUpperCase<br>&nbsp; }<br>}</td></tr></tbody></table><figcaption><strong>Code Snippet 6</strong>: Querying for a combination of two resources with concat and toUpperCase</figcaption></figure>



<p>In <strong>Code Snippet 6</strong> we have a query that returns an object with the <code>fullName</code> property. <em><em><code>fullName</code></em></em> does not exist in the <a href="/wp-admin/post.php?post=453&amp;action=edit#server-resources">server resources</a>. </p>



<p>We define <em><em><em><code>fullName</code></em></em></em> by concatenating<em> <em><code>firstName</code></em></em> and<em> <em><code>lastName</code></em></em>  &#8211; and also using a useful AskQL native resource<em> <em><code>toUpperCase</code></em></em> to return the resulting string uppercased.</p>



<p>You could also look at the more complex example:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {<br>&nbsp; &nbsp; const maxRevenue = max(revPerClient);<br>&nbsp; &nbsp; const minRevenue = min(revPerClient);<br>&nbsp; &nbsp; const indexOfMaxRevenue = 0;<br>&nbsp; &nbsp; const indexOfMinRevenue = 0;<br>&nbsp; &nbsp; for (let i = 0; i &lt; revPerClient:length; i = i + 1) {<br>&nbsp; &nbsp; &nbsp; &nbsp; if (revPerClient:at(i) == maxRevenue) {<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; indexOfMaxRevenue = i;<br>&nbsp; &nbsp; &nbsp; &nbsp; }<br>&nbsp; &nbsp; &nbsp; &nbsp; if (revPerClient:at(i) == minEvenue) {<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; indexOfMinRevenue = i;<br>&nbsp; &nbsp; &nbsp; &nbsp; }<br>&nbsp; &nbsp; }<br>&nbsp; &nbsp;<br>&nbsp; &nbsp; query {<br>&nbsp; &nbsp; &nbsp; &nbsp; highestPayingClient: clientNames:at(indexOfMaxRevenue)<br>&nbsp; &nbsp; &nbsp; &nbsp; lowestPayingClient: clientNames:at(indexOfMinRevenue)<br>&nbsp; &nbsp; }<br>&nbsp; &nbsp;<br>}</td></tr></tbody></table><figcaption><strong>Code Snippet 7</strong></figcaption></figure>



<p><strong>Code Snippet 7</strong> is a rather elaborate yet explicit example. It shows some of the power in combining query with programming.&nbsp; </p>



<p>The client can manipulate the data server side &#8211; giving developers on both ends (backend and frontend) full flexibility without the need to do elaborate API meetings in advance.</p>



<p>And there’s much more&#8230; for instance &#8211; try this command:</p>



<figure class="wp-block-table is-style-stripes"><table><tbody><tr><td>ask {<br>&nbsp; fetch(&#8216;https://swapi.dev/api/people&#8217;):at(&#8216;results&#8217;)<br>}</td></tr></tbody></table><figcaption><strong>Code Snippet 8</strong>: Asking the server to fetch data from an external resource. This time, the Star Wars API.</figcaption></figure>



<p>Paste <strong>Code Snippet 8</strong> into the playground and see what happens.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_Word_About_Security"></span>A Word About Security<span class="ez-toc-section-end"></span></h2>



<p>Some of you might be thinking right now: &#8220;Is this guy crazy? The client can send scripts to be ran on the server?!? That&#8217;s EVAL!!!!&#8221;</p>



<p>These were my thoughts exactly when I first heard about the project. </p>



<p><a rel="noreferrer noopener" href="https://github.com/mhagmajer" target="_blank">Marcin Hagmajer</a>, the author of AskQL, has put my mind to rest:</p>



<figure class="wp-block-pullquote"><blockquote><p>&#8220;Ask&#8217;s&nbsp;ask { &lt;askscript&gt; }&nbsp;runs by default on a secure, sandboxed AskVM, which has a separate execution context. We have built in control mechanisms that only allow using external resources you configured. Ask programs are also run with the limits on execution time and stack size restrictions you define.&#8221;</p><cite><a rel="noreferrer noopener" href="https://github.com/mhagmajer" target="_blank">Marcin Hagmajer</a>, the author of AskQL</cite></blockquote></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>AskQL is a new query language that allows a user the power of a programming language while querying a server’s resource.</p>



<p>This has the potential of getting rid (almost) completely of long ICD and API documentaitons.&nbsp; The client side developers just need to know what’s available on the server &#8211; and query it the way they want to, without any schema limitations.</p>



<p>In example, think about a frontend developer who needs to query customers and transactions.  A non exhustive list of queries might be:</p>



<ol class="wp-block-list"><li>A list of customers</li><li>A list of transactions</li><li>Which customer did what transaction. </li><li>The sum of all transactions</li><li>The customer who made the most transactions</li><li>The customers sorted by amount spent (taken from the sum of each customer&#8217;s transactions)</li></ol>



<p>In REST API, you&#8217;d either need multiple queries, multiple end points (for each type of query) or query for the data and manipulate it client side.</p>



<p>In graphQL, for example, you&#8217;d might send a schema and get the data &#8211; IF (and only IF) the serverside gang made this schema available beforehand.</p>



<p>And this example is very simple &#8211; imagine more complex apps with more complex data and needs&#8230;</p>



<p>With AskQL, this problem is resolved. You could just write an askscript that asks exactly what you want, send it to the server &#8211; and get any type of data you want. All you need to know is &#8211; what resources are available on the server.</p>



<p>In addition, the possibility of delegating computation power from the client to a more powerful server is also an advantage &#8211; so a server can cache certain heavy computational procedures it received from multiple clients and save time and resources for everyone.</p>



<p>Go ahead and try it yourself. You can clone the <a href="https://github.com/YonatanKra/askql-demo" target="_blank" rel="noopener">https://github.com/YonatanKra/askql-demo</a> repository to quickstart a nodejs server running AskQL right on your own machine.</p>



<p>Thanks a lot to&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/Piotr_Zientara" target="_blank">Piotr</a>&nbsp;from&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/XFaang" target="_blank">xFAANG</a>&nbsp;and&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/jodoron" target="_blank">Yonatan Doron</a>&nbsp;from&nbsp;<a rel="noreferrer noopener" href="https://hodash.dev/" target="_blank">Hodash.dev</a> for the kind and thorough review.</p>

