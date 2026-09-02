---
title: How to use custom webpack configuration in an Nx project?
slug: how-to-use-custom-webpack-configuration-in-a-nrwl-project
published: 2021-01-02T00:14:47
updated: 2021-08-10T16:53:37
author: Yonatan Kra
description: Customizing webpack for your own needs is a powerful functionality. It allows you full control of your app’s development and deployment process. In this article we will go over how to do that in an NX monorepo. TL;DR. The steps to customize the webpack config in an NX project are here. You can see the [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: nx
    slug: nx
    path: javascript/nx
  - name: webpack
    slug: webpack
    path: javascript/webpack
tags:
  - nx
  - webpack
canonical: https://yonatankra.com/how-to-use-custom-webpack-configuration-in-a-nrwl-project/
comments:
  - author: rajesh
    date: 2022-11-27T08:23:32
    content: |
      <p>The default webpack configuration for my app is below &amp; it creates a remoteEntry.js file which is used to stitch shell &amp; the micro app:<br />
      <em>withModuleFederation({</em><br />
      <em>&nbsp; &#8230;moduleFederationConfig,</em><br />
      <em>}); </em></p>
      <p>But with the configuration mentioned in the article, it is not generating the <span>remoteEntry.js file .</span></p>
      <p><span>How do we acheive it</span></p>
  - author: Yonatan Kra
    date: 2023-01-19T06:42:28
    content: |
      <p>What do you mean? Do you have a repository where the issue is reproduced?</p>
---

<p class="has-medium-font-size">Customizing webpack for your own needs is a powerful functionality. It allows you full control of your app&#8217;s development and deployment process. In this article we will go over how to do that in an NX monorepo.</p>



<hr class="wp-block-separator"/>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d3b3383" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d3b3383"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-use-custom-webpack-configuration-in-a-nrwl-project/#TLDR" >TL;DR.</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-use-custom-webpack-configuration-in-a-nrwl-project/#Problem_1_File_Structure" >Problem #1: File Structure</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-use-custom-webpack-configuration-in-a-nrwl-project/#How_to_customize_webpack_config_for_an_NX_project" >How to customize webpack config for an NX project?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-use-custom-webpack-configuration-in-a-nrwl-project/#Problem_2_Shadow_DOM_CSS_Encapsulation" >Problem #2: Shadow DOM CSS Encapsulation</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-use-custom-webpack-configuration-in-a-nrwl-project/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="TLDR"></span>TL;DR.<span class="ez-toc-section-end"></span></h2>



<ul class="wp-block-list"><li>The steps to customize the webpack config in an NX project are <a href="#customizationSteps" data-type="internal" data-id="#customizationSteps">here</a>.</li><li>You can see the full solution in this repository:  <a rel="noreferrer noopener" href="https://github.com/YonatanKra/nx-custom-webpack/tree/custom-webapack-config" target="_blank">https://github.com/YonatanKra/nx-custom-webpack/tree/custom-webapack-config</a></li><li>This PR shows the files that were changed: <a rel="noreferrer noopener" href="https://github.com/YonatanKra/nx-custom-webpack/pull/1" target="_blank">https://github.com/YonatanKra/nx-custom-webpack/pull/1</a></li></ul>



<hr class="wp-block-separator"/>



<p>Webpack has been the industry standard bundler for a long time.  Today you can do much more than just bundle with it.  Nrwl&#8217;s NX is a monorepo management framework that sprout from the Angular CLI.  It has long since became much more. You can manage all your frontend and backend projects &#8211; regardless of framework and soon even regardless of programming language. In this article, I&#8217;ll go over a less known part of Nx that was useful for me a few times in the past &#8211; customizing the webpack configuration for projects in the monorepo.</p>



<p>Let&#8217;s look at a project with a web app.  This web app uses web components. Here&#8217;s the repository:</p>



<p class="has-text-align-center"><a href="https://github.com/YonatanKra/nx-custom-webpack" target="_blank" rel="noopener">https://github.com/YonatanKra/nx-custom-webpack</a></p>



<p>It doesn&#8217;t really matter what the app is doing (it&#8217;s just the default app set by Nx for web components). The point is in the main file that looks like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist107183055" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-element-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.element.ts content, created by YonatanKra on 08:56PM on January 01, 2021."
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
          <td id="file-app-element-ts-LC1" class="blob-code blob-code-inner js-file-line">import &#39;./app.element.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-element-ts-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-app-element-ts-LC3" class="blob-code blob-code-inner js-file-line">export class AppElement extends HTMLElement {</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-app-element-ts-LC4" class="blob-code blob-code-inner js-file-line">  public static observedAttributes = [];</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-app-element-ts-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-app-element-ts-LC6" class="blob-code blob-code-inner js-file-line">  connectedCallback() {</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-app-element-ts-LC7" class="blob-code blob-code-inner js-file-line">    const title = &#39;custom-webpack&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-app-element-ts-LC8" class="blob-code blob-code-inner js-file-line">    this.innerHTML = `</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-element-ts-LC9" class="blob-code blob-code-inner js-file-line">      &lt;header class=&quot;flex&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-element-ts-LC10" class="blob-code blob-code-inner js-file-line">    &lt;h1&gt;Welcome to ${title}!&lt;/h1&gt;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-app-element-ts-LC11" class="blob-code blob-code-inner js-file-line">&lt;/header&gt;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-app-element-ts-LC12" class="blob-code blob-code-inner js-file-line">&lt;main&gt;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-app-element-ts-LC13" class="blob-code blob-code-inner js-file-line">    &lt;h2&gt;Welcome to our app!&lt;/h2&gt;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-app-element-ts-LC14" class="blob-code blob-code-inner js-file-line">&lt;/main&gt;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-app-element-ts-LC15" class="blob-code blob-code-inner js-file-line">    `;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-app-element-ts-LC16" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-app-element-ts-LC17" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-app-element-ts-LC18" class="blob-code blob-code-inner js-file-line">customElements.define(&#39;custom-webpack-root&#39;, AppElement);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b0117e332b7351efe8d8587c7f9ce2a6/raw/a087d89c2d29ec5cd38f9b0fb7984ffcd2aea714/app.element.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b0117e332b7351efe8d8587c7f9ce2a6#file-app-element-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.element.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Code snippet 1: The application&#8217;s main element file</figcaption></figure>



<p>A custom element is indeed created in <code>app.element.ts</code>. There are two issues here though.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Problem_1_File_Structure"></span>Problem #1: File Structure<span class="ez-toc-section-end"></span></h2>



<p>The first is that we hard code the HTML inside the <code>ts</code> file.  The HTML might be more complex so we&#8217;d might want to separate the HTML from the TS file and create an <code>app.element.html</code> file.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>I know this issue is eligible for debate, but let&#8217;s assume we&#8217;ve decided we want separate HTML and TS files for the sake of this tutorial.</p></blockquote>



<p>Trying to do this naively gives us this error while trying to build our app:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="218" src="/wp-content/uploads/2021/01/image.png" alt="" class="wp-image-775" srcset="/wp-content/uploads/2021/01/image.png 1024w, /wp-content/uploads/2021/01/image.png 300w, /wp-content/uploads/2021/01/image.png 768w, /wp-content/uploads/2021/01/image.png 264w, /wp-content/uploads/2021/01/image.png 1190w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 1: Webpack failed to bundle our app because it does not know how to handle an HTML file</figcaption></figure>



<p>The solution is written in the error. We need to find a webpack loader that allows us to load HTML files the way we want to.  In our case, we&#8217;d just like to get the contents of the HTML file as a string.  For this, we have the <code>raw-loader</code>.</p>



<p>We first install the <code>raw-loader</code> : </p>



<p class="has-text-align-center"><code>yarn add -D raw-loader</code></p>



<p>And then we need to add a rule in webpack config to use this loader.  Can you spot the webpack config file in the project? Spoiler &#8211; there is no such a file.</p>



<p>So how does one configures the webpack config with extra stuff? </p>



<h3 class="wp-block-heading" id="customizationSteps"><span class="ez-toc-section" id="How_to_customize_webpack_config_for_an_NX_project"></span>How to customize webpack config for an NX project?<span class="ez-toc-section-end"></span></h3>



<ol class="wp-block-list"><li>Go to the workspace.json file</li><li>Find the project you wish to edit</li><li>In the project&#8217;s <code>targets.build.option</code> add a <code>webpackConfig</code> property with a path to a config file like this:</li></ol>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="574" src="/wp-content/uploads/2021/01/image-1.png" alt="" class="wp-image-776" srcset="/wp-content/uploads/2021/01/image-1.png 1024w, /wp-content/uploads/2021/01/image-1.png 300w, /wp-content/uploads/2021/01/image-1.png 768w, /wp-content/uploads/2021/01/image-1.png 100w, /wp-content/uploads/2021/01/image-1.png 1270w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Code snippet 2: <code>workspace.json</code> part for the <code>custom-webpack</code> application. Lines 28 and 59 designate the location of the custom webpack configuration.</figcaption></figure>



<ol class="wp-block-list" start="4"><li>Do the same for the <code>targets.serve.options</code>.</li><li>Now create the config file in the designated path.</li><li>export a function that receives a config object and a context and returns a modified config like so:<br><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist107183307" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpackconfig-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpackConfig.js content, created by YonatanKra on 09:27PM on January 01, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpackConfig.js">
        <tr>
          <td id="file-webpackconfig-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpackconfig-js-LC1" class="blob-code blob-code-inner js-file-line">module.exports = (config, context) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpackconfig-js-LC2" class="blob-code blob-code-inner js-file-line">  return {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpackconfig-js-LC3" class="blob-code blob-code-inner js-file-line">    ...config,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpackconfig-js-LC4" class="blob-code blob-code-inner js-file-line">    module: {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpackconfig-js-LC5" class="blob-code blob-code-inner js-file-line">      ...config.module,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpackconfig-js-LC6" class="blob-code blob-code-inner js-file-line">      rules: [</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpackconfig-js-LC7" class="blob-code blob-code-inner js-file-line">        ...config.module.rules,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpackconfig-js-LC8" class="blob-code blob-code-inner js-file-line">        {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpackconfig-js-LC9" class="blob-code blob-code-inner js-file-line">          test: /\.html$/i,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpackconfig-js-LC10" class="blob-code blob-code-inner js-file-line">          use: &#39;raw-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpackconfig-js-LC11" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-webpackconfig-js-LC12" class="blob-code blob-code-inner js-file-line">      ],</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-webpackconfig-js-LC13" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpackconfig-js-LC14" class="blob-code blob-code-inner js-file-line">  };</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-webpackconfig-js-LC15" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/58141f2953dd2720b354a439db6864cf/raw/1fe4e3d7bf35c0b77453780557b9351d8b2f6451/webpackConfig.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/58141f2953dd2720b354a439db6864cf#file-webpackconfig-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpackConfig.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
<br>As shown in the code, the exported function receives the config as an input.  It then modifies its <code>module.rule</code> property by adding the <code>raw-loader</code> rule. Notice that we spread the properties we modify in order for them to be in the output and not completely overwritten.</li><li>Now you can happily compile your project with the new webpack config!</li></ol>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Problem_2_Shadow_DOM_CSS_Encapsulation"></span>Problem #2: Shadow DOM CSS Encapsulation<span class="ez-toc-section-end"></span></h2>



<p>The second issue is how we import the CSS. It is imported using webpack&#8217;s <code>css-loader</code>. The <code>css-loader</code> just takes the CSS in the file and adds it to the page.  This works if we are using a simple custom element. But one of the powers of web components is the Shadow DOM, which enables CSS encapsulation.</p>



<p>Converting our custom element to a web component using Shadow DOM, will result in a styleless component:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="446" src="/wp-content/uploads/2021/01/encapsulationRuinsStyle.jpg" alt="" class="wp-image-778" srcset="/wp-content/uploads/2021/01/encapsulationRuinsStyle.jpg 902w, /wp-content/uploads/2021/01/encapsulationRuinsStyle.jpg 300w, /wp-content/uploads/2021/01/encapsulationRuinsStyle.jpg 768w, /wp-content/uploads/2021/01/encapsulationRuinsStyle.jpg 129w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 2: The app after encapsulation (top) vs. before encapsulation</figcaption></figure>



<p>Of course we&#8217;d like our app to have the style. For this, we need to inject the style into the Shadow DOM. We can use the same trick with the <code>raw-loader</code> to do that:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div><figcaption>Code snippet 3: The configuration for loading CSS raw and its usage. This will fail because of nx&#8217;s other loaders.</figcaption></figure>



<p>The code in Code snippet 3 won&#8217;t work. The reason is that NX already has loaders for CSS and they clash with our raw loader. You will get the following error:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="373" src="/wp-content/uploads/2021/01/image-3.png" alt="" class="wp-image-780" srcset="/wp-content/uploads/2021/01/image-3.png 972w, /wp-content/uploads/2021/01/image-3.png 300w, /wp-content/uploads/2021/01/image-3.png 768w, /wp-content/uploads/2021/01/image-3.png 155w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 3: The error shown when trying to add the <code>raw-loader</code> for CSS files.</figcaption></figure>



<p>Logging the original <code>config.module.rules</code> shows us this picture:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="434" src="/wp-content/uploads/2021/01/image-2.png" alt="" class="wp-image-779" srcset="/wp-content/uploads/2021/01/image-2.png 1024w, /wp-content/uploads/2021/01/image-2.png 300w, /wp-content/uploads/2021/01/image-2.png 768w, /wp-content/uploads/2021/01/image-2.png 1536w, /wp-content/uploads/2021/01/image-2.png 133w, /wp-content/uploads/2021/01/image-2.png 1684w, /wp-content/uploads/2021/01/image-2.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 4: The output of logging the NX default webpack  <code>config.module.rules</code>.</figcaption></figure>



<p>We can see in Figure 4 that the CSS rules we don&#8217;t want anymore (unless we are using a CSS compiler like SASS or LESS) are the second of a 2 members rules array. Hence, we can change our code to just use  the first rule and ignore the original CSS rules:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist107183483" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-element-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.element.ts content, created by YonatanKra on 09:53PM on January 01, 2021."
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
          <td id="file-app-element-ts-LC1" class="blob-code blob-code-inner js-file-line">import style from &quot;./app.element.css&quot;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-element-ts-LC2" class="blob-code blob-code-inner js-file-line">import template from &quot;./app.element.html&quot;;</td>
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
          <td id="file-app-element-ts-LC8" class="blob-code blob-code-inner js-file-line">    const title = &#39;custom-webpack&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-element-ts-LC9" class="blob-code blob-code-inner js-file-line">    this.attachShadow({mode: &#39;open&#39;});</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-element-ts-LC10" class="blob-code blob-code-inner js-file-line">    this.shadowRoot.innerHTML = `&lt;style&gt;${style}&lt;/style&gt;` + template.replace(&#39;${title}&#39;, title);</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-app-element-ts-LC11" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-app-element-ts-LC12" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-app-element-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-app-element-ts-LC13" class="blob-code blob-code-inner js-file-line">customElements.define(&#39;custom-webpack-root&#39;, AppElement);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0d67626f3efcfe81072d81d67133d822/raw/47cdb364c82e7f2b36a50df4ced95329c5fe2cb6/app.element.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0d67626f3efcfe81072d81d67133d822#file-app-element-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.element.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpackconfig-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpackConfig.js content, created by YonatanKra on 09:53PM on January 01, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpackConfig.js">
        <tr>
          <td id="file-webpackconfig-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpackconfig-js-LC1" class="blob-code blob-code-inner js-file-line">module.exports = (config, context) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpackconfig-js-LC2" class="blob-code blob-code-inner js-file-line">  return {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpackconfig-js-LC3" class="blob-code blob-code-inner js-file-line">    &#8230;config,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpackconfig-js-LC4" class="blob-code blob-code-inner js-file-line">    module: {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpackconfig-js-LC5" class="blob-code blob-code-inner js-file-line">      &#8230;config.module,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpackconfig-js-LC6" class="blob-code blob-code-inner js-file-line">      rules: [</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpackconfig-js-LC7" class="blob-code blob-code-inner js-file-line">        config.module.rules[0],</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpackconfig-js-LC8" class="blob-code blob-code-inner js-file-line">        {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpackconfig-js-LC9" class="blob-code blob-code-inner js-file-line">          test: /\.html$/i,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpackconfig-js-LC10" class="blob-code blob-code-inner js-file-line">          use: &#39;raw-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpackconfig-js-LC11" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-webpackconfig-js-LC12" class="blob-code blob-code-inner js-file-line">        {</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-webpackconfig-js-LC13" class="blob-code blob-code-inner js-file-line">          test: /\.css$/i,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpackconfig-js-LC14" class="blob-code blob-code-inner js-file-line">          use: &#39;raw-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-webpackconfig-js-LC15" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-webpackconfig-js-LC16" class="blob-code blob-code-inner js-file-line">      ],</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-webpackconfig-js-LC17" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-webpackconfig-js-LC18" class="blob-code blob-code-inner js-file-line">  };</td>
        </tr>
        <tr>
          <td id="file-webpackconfig-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-webpackconfig-js-LC19" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0d67626f3efcfe81072d81d67133d822/raw/47cdb364c82e7f2b36a50df4ced95329c5fe2cb6/webpackConfig.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0d67626f3efcfe81072d81d67133d822#file-webpackconfig-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpackConfig.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Code snippet 4: Just changing line 7 in webpackConfig.js to not spread the original array but just take the TS rule.</figcaption></figure>



<p>And now our app is working!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this article we saw how to customize the webpack configuration in a project inside an NX monorepo. The two use cases we dealt with were solved by adding a loader. In the first case we just added a loader and in the second case, we had to replace the loader for the file type.</p>



<p>It is very possible your application will need a more refined customization, or you&#8217;d might want to change the plugins or even the webpack&#8217;s output or optimization behavior. I hope you now have more clue on how to do it.</p>

