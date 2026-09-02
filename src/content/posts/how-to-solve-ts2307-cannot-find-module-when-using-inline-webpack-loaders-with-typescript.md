---
title: "How to solve “TS2307: Cannot find module” when using inline webpack loaders with TypeScript"
slug: how-to-solve-ts2307-cannot-find-module-when-using-inline-webpack-loaders-with-typescript
published: 2021-09-08T08:25:44
updated: 2022-09-24T08:46:46
author: Yonatan Kra
description: "Trying to use a webpack raw-loader for an HTML file inline resulted in an error: TS2307: Cannot find module. Here’s how to fix it! I’m using web components a lot! I really prefer them over frameworks. They are simple, native, and easy to use. I also like typescript and webpack. Combining them is a joy. [&hellip;]"
categories:
  - name: nx
    slug: nx
    path: javascript/nx
  - name: webpack
    slug: webpack
    path: javascript/webpack
tags:
  - typescript
  - web components
  - webpack
canonical: https://yonatankra.com/how-to-solve-ts2307-cannot-find-module-when-using-inline-webpack-loaders-with-typescript/
comments:
  - author: Jim Keller
    date: 2022-09-11T22:19:56
    content: |
      <p>This didn&#8217;t quite work for me as written; TypeScript still couldn&#8217;t find the module. The following post details some tweaks I had to make to get it to work: <a href="https://medium.com/@thisisjimkeller/loading-custom-modules-in-typescript-4-ea9b5293137e" rel="nofollow ugc">https://medium.com/@thisisjimkeller/loading-custom-modules-in-typescript-4-ea9b5293137e</a></p>
  - author: Yonatan Kra
    date: 2022-09-24T08:50:18
    content: |
      <p>Thanks for the heads up.<br />
      Mind sharing your use case? I could not reproduce the error while using this, but it might be our <code>tsconfig</code> files differ in some way.</p>
---

<p class="has-medium-font-size">Trying to use a webpack <code>raw-loader</code> for an HTML file inline resulted in an error: <code>TS2307: Cannot find module</code>. Here&#8217;s how to fix it!</p>



<p>I&#8217;m using web components a lot! I really prefer them over frameworks. They are simple, native, and easy to use. I also like <code>typescript</code> and <code>webpack</code>.  Combining them is a joy.</p>



<p>Thing is &#8211; I&#8217;d like to separate my <code>html</code> files from my <code>ts</code> files. I will then import the <code>html</code> as a raw string to add to my component&#8217;s innerHTML (or shadowDOM).</p>



<p>I&#8217;ll first install the loader: <code>yarn add -D raw-loader</code>. Once done, I can use it in my code.</p>



<p>So my code would look kind of like this:</p>



<pre class="wp-block-code"><code>import './app.element.scss';
import * as template from '!!raw-loader!./app.element.html';

export class AppElement extends HTMLElement {
  public static observedAttributes = &#091;];

  connectedCallback() {
    const title = 'my-component';
    this.innerHTML = template.default.replace('${title}', title);
  }
}

customElements.define('yonatan-root', AppElement);</code></pre>



<p>Note that we are using <code>template.default</code> here because we are importing a module that doesn&#8217;t have an explicit default export.  In this case, it is translated to { default: &lt;our content&gt; }.</p>



<p>In a naive setup it will fail on this:</p>



<p class="has-text-align-center"><code>TS2307: Cannot find module '!!raw-loader!./app.element.html'</code></p>



<p>That&#8217;s because <code>typescript</code> needs a module definition. Let&#8217;s set one up. Create a file called <code>raw-loader.d.ts</code> and paste the following code:</p>



<pre class="wp-block-code"><code>declare module '!!raw-loader!*' {
  const contents:{default: string}
  export = contents
}</code></pre>



<p>Note that here we set the <code>contents</code> as <code>{default: string}</code> because we expect to receive a module that has a <code>default</code> property.</p>



<p>We will now use it in our <code>tsConfig.json</code> and add a line inside our <code>compilerOptions</code>:</p>



<pre class="wp-block-code"><code>"compilerOptions": {
  "types": &#091;"raw-loader.d.ts", "node"]
},</code></pre>



<p>Trying to compile now will work as expected.</p>



<p>If we&#8217;d like to make our code a bit nicer, we can use the <code>allowSyntheticDefaultImports</code> compiler option. </p>



<p>In our <code>tsConfig.json</code> we will add <code>allowSyntheticDefaultImports: true</code> to the <code>compilerOptions</code> and our code can now look like this:</p>



<pre class="wp-block-code"><code><meta charset="utf-8">import './app.element.scss';
<span class="has-inline-color has-vivid-green-cyan-color"><em><span style="text-decoration: underline;"><strong>import template from '!!raw-loader!./app.element.html';</strong>
</span></em></span>
export class AppElement extends HTMLElement {
  public static observedAttributes = &#091;];

  connectedCallback() {
    const title = 'my-component';
<strong><em>    <span style="text-decoration: underline;"><span class="has-inline-color has-vivid-green-cyan-color">this.innerHTML = template.replace('${title}', title);</span>
</span></em></strong>  }
}

customElements.define('yonatan-root', AppElement);</code></pre>



<p>The differences are bold and underlined. We are now using the <code>default</code> import syntax. This also results in the removal of the <code>.default</code> from the <code>template</code> usage.</p>



<p>This will now fail, because we&#8217;ve set our <code>raw-loader</code> module to return a module.  We will just replace <code>{default: string}</code> with <code>string</code> and we&#8217;re good to go:</p>



<pre class="wp-block-code"><code>declare module '!!raw-loader!*' {
  const contents: <strong><em><span style="text-decoration: underline;">string</span></em></strong>
  export = contents
}</code></pre>



<p>Here&#8217;s the full solution in a gist:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111680499" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-element-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.element.html content, created by YonatanKra on 06:14AM on September 08, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="app.element.html">
        <tr>
          <td id="file-app-element-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-app-element-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;h1&gt;Welcome to ${title}&lt;/h1&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16/raw/fffef4a14021d1294646f06a22d579cdd7d19101/app.element.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16#file-app-element-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.element.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-element-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.element.ts content, created by YonatanKra on 06:14AM on September 08, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="app.element.ts">
        <tr>
          <td id="file-app-element-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-app-element-ts-LC1" class="blob-code blob-code-inner js-file-line">import &#39;./app.element.scss&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-element-ts-LC2" class="blob-code blob-code-inner js-file-line">import template from &#39;!!raw-loader!./app.element.html&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-app-element-ts-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-app-element-ts-LC4" class="blob-code blob-code-inner js-file-line">export class AppElement extends HTMLElement {</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-app-element-ts-LC5" class="blob-code blob-code-inner js-file-line">  public static observedAttributes = [];</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-app-element-ts-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-app-element-ts-LC7" class="blob-code blob-code-inner js-file-line">  connectedCallback() {</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-app-element-ts-LC8" class="blob-code blob-code-inner js-file-line">    const title = &#39;My Component&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-element-ts-LC9" class="blob-code blob-code-inner js-file-line">    this.innerHTML = template.replace(&#39;${title}&#39;, title);</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-element-ts-LC10" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-app-element-ts-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-app-element-ts-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-app-element-ts-LC13" class="blob-code blob-code-inner js-file-line">customElements.define(&#39;yonatan-root&#39;, AppElement);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16/raw/fffef4a14021d1294646f06a22d579cdd7d19101/app.element.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16#file-app-element-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.element.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-raw-loader-d-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="raw-loader.d.ts content, created by YonatanKra on 06:14AM on September 08, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="raw-loader.d.ts">
        <tr>
          <td id="file-raw-loader-d-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-raw-loader-d-ts-LC1" class="blob-code blob-code-inner js-file-line">declare module &#39;!!raw-loader!*&#39; {</td>
        </tr>
        <tr>
          <td id="file-raw-loader-d-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-raw-loader-d-ts-LC2" class="blob-code blob-code-inner js-file-line">  const contents: string</td>
        </tr>
        <tr>
          <td id="file-raw-loader-d-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-raw-loader-d-ts-LC3" class="blob-code blob-code-inner js-file-line">  export = contents</td>
        </tr>
        <tr>
          <td id="file-raw-loader-d-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-raw-loader-d-ts-LC4" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16/raw/fffef4a14021d1294646f06a22d579cdd7d19101/raw-loader.d.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16#file-raw-loader-d-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          raw-loader.d.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-tsconfig-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json-with-comments  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="tsconfig.json content, created by YonatanKra on 06:14AM on September 08, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="tsconfig.json">
        <tr>
          <td id="file-tsconfig-json-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-tsconfig-json-LC1" class="blob-code blob-code-inner js-file-line">{</td>
        </tr>
        <tr>
          <td id="file-tsconfig-json-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-tsconfig-json-LC2" class="blob-code blob-code-inner js-file-line">  &quot;compilerOptions&quot;: {</td>
        </tr>
        <tr>
          <td id="file-tsconfig-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-tsconfig-json-LC3" class="blob-code blob-code-inner js-file-line">  &quot;types&quot;: [&quot;raw-loader.d.ts&quot;, &quot;node&quot;],</td>
        </tr>
        <tr>
          <td id="file-tsconfig-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-tsconfig-json-LC4" class="blob-code blob-code-inner js-file-line">  &quot;allowSyntheticDefaultImports&quot;: true</td>
        </tr>
        <tr>
          <td id="file-tsconfig-json-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-tsconfig-json-LC5" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16/raw/fffef4a14021d1294646f06a22d579cdd7d19101/tsconfig.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e1a00241db14bfbd7571f7b498972c16#file-tsconfig-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          tsconfig.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<h2 class="wp-block-heading">Final words</h2>



<p>If you found this helpful, I&#8217;ve written an article on <a href="/how-to-use-custom-webpack-configuration-in-a-nrwl-project/" data-type="post" data-id="773">how to tweak webpack configuration to do the same without inline loaders.</a></p>

