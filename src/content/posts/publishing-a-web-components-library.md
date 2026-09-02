---
title: Publishing a Web Components Library
slug: publishing-a-web-components-library
published: 2019-04-01T00:00:00
updated: 2022-06-18T08:46:58
author: Yonatan Kra
description: Once upon a time, in order to create web components, one had to resort to a front end framework like angular or react (yes yes, I’ve heard the “it’s only a lib” before from all the angularists in the crowd) . Web component is one awesome piece of technology (or rather, a combination of 4 technologies). [&hellip;]
categories: []
tags: []
canonical: https://yonatankra.com/publishing-a-web-components-library/
comments: []
---


<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://i0.wp.com/cdn-images-1.medium.com/max/800/1*Z9FDHEnHP8kpKHgdgnC01Q.png?resize=580%2C326&amp;ssl=1" alt=""/></figure></div>



<p>Once upon a time, in order to create web components, one had to resort to a front end framework like angular or react (yes yes, I’ve heard the “it’s only a lib” before from all the angularists in the crowd) . </p>



<p> Web component is one awesome piece of technology (or rather, a combination of 4 technologies). Now that browser support is rising, publishing a web component to github for global consumption seems like a good contribution to the community. </p>



<p>In this article, we will build upon the example shown in the <a rel="noreferrer noopener" href="https://medium.com/walkme-engineering/web-components-test-drive-4ac0103e3599" target="_blank">former article</a> in the web components series: <a rel="noreferrer noopener" href="https://medium.com/walkme-engineering/web-components-test-drive-4ac0103e3599" target="_blank">the modal window web component</a>. You can <a rel="noreferrer noopener" href="https://medium.com/walkme-engineering/web-components-test-drive-4ac0103e3599" target="_blank">read the article</a>, or go directly to <a rel="noreferrer noopener" href="https://github.com/YonatanKra/web-components-ui-elements" target="_blank">the repository on github</a>.</p>



<p> We will structure a project in a scalable way, and modularize the components so that consumers would be able to consume only one component without the need to import the whole library. </p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1eb6556e" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1eb6556e"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/publishing-a-web-components-library/#Clone_the_repository" >Clone the repository</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/publishing-a-web-components-library/#Create_the_main_file_that_imports_everything" >Create the main file that imports everything</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-3" href="/publishing-a-web-components-library/#The_components_folder" >The components folder:</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-4" href="/publishing-a-web-components-library/#The_main_file" >The main&nbsp;file</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-5" href="/publishing-a-web-components-library/#The_demo_folder" >The demo&nbsp;folder</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/publishing-a-web-components-library/#File_splitting" >File splitting</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/publishing-a-web-components-library/#NPM_configurations_aka_packagejson" >NPM configurations (a.k.a. package.json)</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/publishing-a-web-components-library/#Documentation" >Documentation</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/publishing-a-web-components-library/#Installation" >Installation</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/publishing-a-web-components-library/#Usage" >Usage</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/publishing-a-web-components-library/#API" >API</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-12" href="/publishing-a-web-components-library/#Modal_Window" >Modal Window</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-13" href="/publishing-a-web-components-library/#Tag_Name" >Tag Name</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-14" href="/publishing-a-web-components-library/#Methods" >Methods</a><ul class='ez-toc-list-level-5' ><li class='ez-toc-heading-level-5'><a class="ez-toc-link ez-toc-heading-15" href="/publishing-a-web-components-library/#Open" >Open</a></li><li class='ez-toc-page-1 ez-toc-heading-level-5'><a class="ez-toc-link ez-toc-heading-16" href="/publishing-a-web-components-library/#Close" >Close</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-17" href="/publishing-a-web-components-library/#ICD" >ICD</a><ul class='ez-toc-list-level-5' ><li class='ez-toc-heading-level-5'><a class="ez-toc-link ez-toc-heading-18" href="/publishing-a-web-components-library/#Config" >Config</a></li></ul></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-19" href="/publishing-a-web-components-library/#Contributing" >Contributing</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-20" href="/publishing-a-web-components-library/#NPM_Publish" >NPM Publish</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-21" href="/publishing-a-web-components-library/#Summary" >Summary</a></li></ul></li></ul></nav></div>
<h2 class="wp-block-heading" id="4626"><span class="ez-toc-section" id="Clone_the_repository"></span>Clone the repository<span class="ez-toc-section-end"></span></h2>



<ol class="wp-block-list"><li id="88b5" class="graf graf--li graf-after--h3">Make sure you have git installed;</li><li id="6890" class="graf graf--li graf-after--li"><code class="markup--code markup--li-code u-paddingRight0 u-marginRight0">git clone <a class="markup--anchor markup--li-anchor" href="https://github.com/YonatanKra/web-components-ui-elements.git" target="_blank" rel="nofollow noopener noreferrer" data-href="https://github.com/YonatanKra/web-components-ui-elements.git" data->https://github.com/YonatanKra/web-components-ui-elements.git</a></code></li><li id="ae8f" class="graf graf--li graf-after--li"><code class="markup--code markup--li-code">git checkout before_componentization</code></li><li id="d72c" class="graf graf--li graf-after--li"><code class="markup--code markup--li-code">yarn</code> or <code class="markup--code markup--li-code">npm i</code></li></ol>



<p id="66b6">You now have the repository with the modal window from the <a class="markup--anchor markup--p-anchor" href="https://medium.com/walkme-engineering/web-components-test-drive-4ac0103e3599" target="_blank" rel="noopener noreferrer" data-href="https://medium.com/walkme-engineering/web-components-test-drive-4ac0103e3599" data->previous article</a>. For the full result, just checkout <code class="markup--code markup--p-code">master</code>.</p>



<h2 class="wp-block-heading" id="05cc"><span class="ez-toc-section" id="Create_the_main_file_that_imports_everything"></span>Create the main file that imports everything<span class="ez-toc-section-end"></span></h2>



<p id="6478">Like most modern libraries, we would like to create one file where people could import all of our components in one go (a.k.a. a barrel file). In addition, we’d like to add the ability to import specific components for performance sensitive applications (a.k.a. lazy load).</p>



<p id="b9b1">We can do that by splitting our code to separate modules both in folder structure as well as in the webpack code splitting configuration.</p>



<h4 class="wp-block-heading" id="001e"><span class="ez-toc-section" id="The_components_folder"></span>The <code class="markup--code markup--h4-code">components</code> folder:<span class="ez-toc-section-end"></span></h4>



<p id="adff">Inside our <code class="markup--code markup--p-code">src</code> folder create a <code class="markup--code markup--p-code">components</code> folder. Inside create a <code class="markup--code markup--p-code">ce-modal-window</code> folder and copy the <code class="markup--code markup--p-code">ce-modal-window</code> files into it. In addition, create an <code class="markup--code markup--p-code">index.js</code> file there.</p>



<p id="20a8">In the <code class="markup--code markup--p-code">index.js</code> file we will import <code class="markup--code markup--p-code">CEModalWindow</code> and define the custom element. In <code class="markup--code markup--p-code">CEModalWindow</code> we will remove the custom element definition.</p>



<p id="42c1">This is how the files should look in the <code class="markup--code markup--p-code">ce-modal-window</code> folder:</p>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92577539" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-ce-modal-window-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="ce-modal-window.js content, created by YonatanKra on 01:28PM on October 21, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="ce-modal-window.js">
        <tr>
          <td id="file-ce-modal-window-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-ce-modal-window-js-LC1" class="blob-code blob-code-inner js-file-line">const templateString = `</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-ce-modal-window-js-LC2" class="blob-code blob-code-inner js-file-line">    &lt;style&gt;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-ce-modal-window-js-LC3" class="blob-code blob-code-inner js-file-line">        .overlay {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-ce-modal-window-js-LC4" class="blob-code blob-code-inner js-file-line">            opacity: 1;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-ce-modal-window-js-LC5" class="blob-code blob-code-inner js-file-line">            visibility: visible;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-ce-modal-window-js-LC6" class="blob-code blob-code-inner js-file-line">            position: fixed;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-ce-modal-window-js-LC7" class="blob-code blob-code-inner js-file-line">            width: 100%;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-ce-modal-window-js-LC8" class="blob-code blob-code-inner js-file-line">            height: 100%;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-ce-modal-window-js-LC9" class="blob-code blob-code-inner js-file-line">            top: 0;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-ce-modal-window-js-LC10" class="blob-code blob-code-inner js-file-line">            left: 0;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-ce-modal-window-js-LC11" class="blob-code blob-code-inner js-file-line">            background: rgba(0, 0, 0, 0.42);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-ce-modal-window-js-LC12" class="blob-code blob-code-inner js-file-line">            -webkit-transition: opacity 0.5s;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-ce-modal-window-js-LC13" class="blob-code blob-code-inner js-file-line">            transition: opacity 0.5s;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-ce-modal-window-js-LC14" class="blob-code blob-code-inner js-file-line">            display: flex;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-ce-modal-window-js-LC15" class="blob-code blob-code-inner js-file-line">            align-items: center; </td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-ce-modal-window-js-LC16" class="blob-code blob-code-inner js-file-line">            justify-content: center;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-ce-modal-window-js-LC17" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-ce-modal-window-js-LC18" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-ce-modal-window-js-LC19" class="blob-code blob-code-inner js-file-line">        .overlay-hidden {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-ce-modal-window-js-LC20" class="blob-code blob-code-inner js-file-line">            opacity: 0;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-ce-modal-window-js-LC21" class="blob-code blob-code-inner js-file-line">            visibility: hidden;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-ce-modal-window-js-LC22" class="blob-code blob-code-inner js-file-line">            -webkit-transition: opacity 0.5s, visibility 0s 0.5s;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-ce-modal-window-js-LC23" class="blob-code blob-code-inner js-file-line">            transition: opacity 0.5s, visibility 0s 0.5s;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-ce-modal-window-js-LC24" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-ce-modal-window-js-LC25" class="blob-code blob-code-inner js-file-line">    &lt;/style&gt;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-ce-modal-window-js-LC26" class="blob-code blob-code-inner js-file-line">    &lt;div class=&quot;overlay overlay-hidden&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-ce-modal-window-js-LC27" class="blob-code blob-code-inner js-file-line">        &lt;div class=&quot;overlay-content&quot;&gt;&lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-ce-modal-window-js-LC28" class="blob-code blob-code-inner js-file-line">    &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-ce-modal-window-js-LC29" class="blob-code blob-code-inner js-file-line">`;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-ce-modal-window-js-LC30" class="blob-code blob-code-inner js-file-line">const template = document.createElement(&#39;template&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-ce-modal-window-js-LC31" class="blob-code blob-code-inner js-file-line">template.innerHTML = templateString;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-ce-modal-window-js-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-ce-modal-window-js-LC33" class="blob-code blob-code-inner js-file-line">export class CEModalWindow extends HTMLElement{</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-ce-modal-window-js-LC34" class="blob-code blob-code-inner js-file-line">    constructor() {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-ce-modal-window-js-LC35" class="blob-code blob-code-inner js-file-line">        super();</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-ce-modal-window-js-LC36" class="blob-code blob-code-inner js-file-line">        const shadowRoot = this.attachShadow({mode: &#39;open&#39;});</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-ce-modal-window-js-LC37" class="blob-code blob-code-inner js-file-line">        shadowRoot.appendChild(template.content.cloneNode(true));</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-ce-modal-window-js-LC38" class="blob-code blob-code-inner js-file-line">        this._overlay = shadowRoot.querySelector(&#39;.overlay&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-ce-modal-window-js-LC39" class="blob-code blob-code-inner js-file-line">        this._content = shadowRoot.querySelector(&#39;.overlay-content&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-ce-modal-window-js-LC40" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-ce-modal-window-js-LC41" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-ce-modal-window-js-LC42" class="blob-code blob-code-inner js-file-line">    open(config) {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-ce-modal-window-js-LC43" class="blob-code blob-code-inner js-file-line">        const supportedStyles = [&#39;width&#39;, &#39;height&#39;];</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-ce-modal-window-js-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-ce-modal-window-js-LC45" class="blob-code blob-code-inner js-file-line">        if (!config) {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-ce-modal-window-js-LC46" class="blob-code blob-code-inner js-file-line">            return;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-ce-modal-window-js-LC47" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-ce-modal-window-js-LC48" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-ce-modal-window-js-LC49" class="blob-code blob-code-inner js-file-line">        this._overlay.classList.remove(&#39;overlay-hidden&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-ce-modal-window-js-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-ce-modal-window-js-LC51" class="blob-code blob-code-inner js-file-line">        this._content.innerHTML = config.content;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-ce-modal-window-js-LC52" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-ce-modal-window-js-LC53" class="blob-code blob-code-inner js-file-line">        supportedStyles.forEach((style) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-ce-modal-window-js-LC54" class="blob-code blob-code-inner js-file-line">            CEModalWindow.setStyle(this._content, style, config[style]);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-ce-modal-window-js-LC55" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-ce-modal-window-js-LC56" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-ce-modal-window-js-LC57" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-ce-modal-window-js-LC58" class="blob-code blob-code-inner js-file-line">    close() {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-ce-modal-window-js-LC59" class="blob-code blob-code-inner js-file-line">        this._overlay.classList.add(&#39;overlay-hidden&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-ce-modal-window-js-LC60" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-ce-modal-window-js-LC61" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-ce-modal-window-js-LC62" class="blob-code blob-code-inner js-file-line">    static setStyle(element, style, value) {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-ce-modal-window-js-LC63" class="blob-code blob-code-inner js-file-line">        const pxStyles = [&#39;width&#39;, &#39;height&#39;];</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-ce-modal-window-js-LC64" class="blob-code blob-code-inner js-file-line">        if (value) {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-ce-modal-window-js-LC65" class="blob-code blob-code-inner js-file-line">            if (pxStyles.indexOf(style) &gt; -1) {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-ce-modal-window-js-LC66" class="blob-code blob-code-inner js-file-line">                value += &#39;px&#39;;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-ce-modal-window-js-LC67" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-ce-modal-window-js-LC68" class="blob-code blob-code-inner js-file-line">            element.style[style] = value;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-ce-modal-window-js-LC69" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-ce-modal-window-js-LC70" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-ce-modal-window-js-LC71" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/32ee112d3ae9884688ef3d6184ef8277/raw/66a6e65284143261910e6dd2b75a9a31b0c82642/ce-modal-window.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/32ee112d3ae9884688ef3d6184ef8277#file-ce-modal-window-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          ce-modal-window.js
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
      aria-label="index.js content, created by YonatanKra on 01:28PM on October 21, 2018."
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
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line"><span class=pl-k>import</span> <span class=pl-kos>{</span> <span class=pl-v>CEModalWindow</span> <span class=pl-kos>}</span> <span class=pl-k>from</span> <span class=pl-s>&#39;./ce-modal-window&#39;</span><span class=pl-kos>;</span></td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line"><span class=pl-k>if</span> <span class=pl-kos>(</span><span class=pl-c1>!</span><span class=pl-s1>customElements</span><span class=pl-kos>.</span><span class=pl-en>get</span><span class=pl-kos>(</span><span class=pl-s>&#39;ce-modal-window&#39;</span><span class=pl-kos>)</span><span class=pl-kos>)</span> <span class=pl-kos>{</span></td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">  <span class=pl-smi>window</span><span class=pl-kos>.</span><span class=pl-c1>customElements</span><span class=pl-kos>.</span><span class=pl-en>define</span><span class=pl-kos>(</span><span class=pl-s>&#39;ce-modal-window&#39;</span><span class=pl-kos>,</span> <span class=pl-v>CEModalWindow</span><span class=pl-kos>)</span><span class=pl-kos>;</span>  </td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line"><span class=pl-kos>}</span></td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/32ee112d3ae9884688ef3d6184ef8277/raw/66a6e65284143261910e6dd2b75a9a31b0c82642/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/32ee112d3ae9884688ef3d6184ef8277#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<figure></figure>



<p id="5af0">Finally, let’s change our tests a bit to make them more robust by defining the custom element inside our spec file:</p>



<figure>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92577587" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-ce-modal-window-spec-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="ce-modal-window.spec.js content, created by YonatanKra on 01:30PM on October 21, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="ce-modal-window.spec.js">
        <tr>
          <td id="file-ce-modal-window-spec-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-ce-modal-window-spec-js-LC1" class="blob-code blob-code-inner js-file-line">import { CEModalWindow } from &#39;./ce-modal-window&#39;;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-ce-modal-window-spec-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-ce-modal-window-spec-js-LC3" class="blob-code blob-code-inner js-file-line">window.customElements.define(&#39;ce-tested-modal-window&#39;, CEModalWindow);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-ce-modal-window-spec-js-LC4" class="blob-code blob-code-inner js-file-line">describe(&#39;app integration tests&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-ce-modal-window-spec-js-LC5" class="blob-code blob-code-inner js-file-line">    let element, shadowRoot;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-ce-modal-window-spec-js-LC6" class="blob-code blob-code-inner js-file-line">    beforeEach(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-ce-modal-window-spec-js-LC7" class="blob-code blob-code-inner js-file-line">        element = document.createElement(&#39;ce-tested-modal-window&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-ce-modal-window-spec-js-LC8" class="blob-code blob-code-inner js-file-line">        shadowRoot = element.shadowRoot;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-ce-modal-window-spec-js-LC9" class="blob-code blob-code-inner js-file-line">        document.body.append(element);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-ce-modal-window-spec-js-LC10" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-ce-modal-window-spec-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-ce-modal-window-spec-js-LC12" class="blob-code blob-code-inner js-file-line">    // check that the exposed API works</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-ce-modal-window-spec-js-LC13" class="blob-code blob-code-inner js-file-line">    describe(&#39;init&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-ce-modal-window-spec-js-LC14" class="blob-code blob-code-inner js-file-line">        it(&#39;should add a div with the overlay and overlay-hidden classes under the shadow root&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-ce-modal-window-spec-js-LC15" class="blob-code blob-code-inner js-file-line">            expect(shadowRoot.querySelector(&#39;.overlay.overlay-hidden&#39;)).toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-ce-modal-window-spec-js-LC16" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-ce-modal-window-spec-js-LC17" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-ce-modal-window-spec-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-ce-modal-window-spec-js-LC19" class="blob-code blob-code-inner js-file-line">    describe(&#39;open&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-ce-modal-window-spec-js-LC20" class="blob-code blob-code-inner js-file-line">        it(&#39;should remove the hidden class from overlay&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-ce-modal-window-spec-js-LC21" class="blob-code blob-code-inner js-file-line">            const overlay = shadowRoot.querySelector(&#39;.overlay.overlay-hidden&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-ce-modal-window-spec-js-LC22" class="blob-code blob-code-inner js-file-line">            element.open({});</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-ce-modal-window-spec-js-LC23" class="blob-code blob-code-inner js-file-line">            expect(overlay.classList.contains(&#39;overlay-hidden&#39;)).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-ce-modal-window-spec-js-LC24" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-ce-modal-window-spec-js-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-ce-modal-window-spec-js-LC26" class="blob-code blob-code-inner js-file-line">        it(&#39;should add class transparent to the overlay if config.hideOverlay is true&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-ce-modal-window-spec-js-LC27" class="blob-code blob-code-inner js-file-line">            const overlay = shadowRoot.querySelector(&#39;.overlay.overlay-hidden&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-ce-modal-window-spec-js-LC28" class="blob-code blob-code-inner js-file-line">            element.open({</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-ce-modal-window-spec-js-LC29" class="blob-code blob-code-inner js-file-line">                hideOverlay: true</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-ce-modal-window-spec-js-LC30" class="blob-code blob-code-inner js-file-line">            });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-ce-modal-window-spec-js-LC31" class="blob-code blob-code-inner js-file-line">            expect(overlay.classList.contains(&#39;transparent&#39;)).toBeFalsy();</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-ce-modal-window-spec-js-LC32" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-ce-modal-window-spec-js-LC33" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-ce-modal-window-spec-js-LC34" class="blob-code blob-code-inner js-file-line">        it(&#39;should insert the content string as HTML to the content element&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-ce-modal-window-spec-js-LC35" class="blob-code blob-code-inner js-file-line">            const randId = Math.random().toString(2);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-ce-modal-window-spec-js-LC36" class="blob-code blob-code-inner js-file-line">            const content = shadowRoot.querySelector(&#39;.overlay-content&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-ce-modal-window-spec-js-LC37" class="blob-code blob-code-inner js-file-line">            const htmlBefore = content.innerHTML;</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-ce-modal-window-spec-js-LC38" class="blob-code blob-code-inner js-file-line">            const config = {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-ce-modal-window-spec-js-LC39" class="blob-code blob-code-inner js-file-line">                content: `&lt;div id=&quot;${randId}&quot;&gt;Hello CE!&lt;/div&gt;`</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-ce-modal-window-spec-js-LC40" class="blob-code blob-code-inner js-file-line">            };</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-ce-modal-window-spec-js-LC41" class="blob-code blob-code-inner js-file-line">            element.open(config);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-ce-modal-window-spec-js-LC42" class="blob-code blob-code-inner js-file-line">            expect(htmlBefore).toEqual(&quot;&quot;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-ce-modal-window-spec-js-LC43" class="blob-code blob-code-inner js-file-line">            expect(content.innerHTML).toEqual(config.content);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-ce-modal-window-spec-js-LC44" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-ce-modal-window-spec-js-LC45" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-ce-modal-window-spec-js-LC46" class="blob-code blob-code-inner js-file-line">        it(&#39;should set width and height according to config values&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-ce-modal-window-spec-js-LC47" class="blob-code blob-code-inner js-file-line">            const content = shadowRoot.querySelector(&#39;.overlay-content&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-ce-modal-window-spec-js-LC48" class="blob-code blob-code-inner js-file-line">            const config = {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-ce-modal-window-spec-js-LC49" class="blob-code blob-code-inner js-file-line">                height: Math.round(Math.random() * 100 + 50),</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-ce-modal-window-spec-js-LC50" class="blob-code blob-code-inner js-file-line">                width: Math.round(Math.random() * 100 + 50)</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-ce-modal-window-spec-js-LC51" class="blob-code blob-code-inner js-file-line">            };</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-ce-modal-window-spec-js-LC52" class="blob-code blob-code-inner js-file-line">            element.open(config);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-ce-modal-window-spec-js-LC53" class="blob-code blob-code-inner js-file-line">            const overlayBoundingBox = content.getBoundingClientRect();</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-ce-modal-window-spec-js-LC54" class="blob-code blob-code-inner js-file-line">            expect(overlayBoundingBox.width).toEqual(config.width);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-ce-modal-window-spec-js-LC55" class="blob-code blob-code-inner js-file-line">            expect(overlayBoundingBox.height).toEqual(config.height);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-ce-modal-window-spec-js-LC56" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-ce-modal-window-spec-js-LC57" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-ce-modal-window-spec-js-LC58" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-ce-modal-window-spec-js-LC59" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-ce-modal-window-spec-js-LC60" class="blob-code blob-code-inner js-file-line">    describe(&#39;close&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-ce-modal-window-spec-js-LC61" class="blob-code blob-code-inner js-file-line">        it(&#39;should add the overlay-hidden class&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-ce-modal-window-spec-js-LC62" class="blob-code blob-code-inner js-file-line">            const overlay = shadowRoot.querySelector(&#39;.overlay&#39;);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-ce-modal-window-spec-js-LC63" class="blob-code blob-code-inner js-file-line">            element.open({}); // we already know it removes the class</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-ce-modal-window-spec-js-LC64" class="blob-code blob-code-inner js-file-line">            element.close();</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-ce-modal-window-spec-js-LC65" class="blob-code blob-code-inner js-file-line">            expect(overlay.classList.contains(&#39;overlay-hidden&#39;));</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-ce-modal-window-spec-js-LC66" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-ce-modal-window-spec-js-LC67" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-ce-modal-window-spec-js-LC68" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-ce-modal-window-spec-js-LC69" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-ce-modal-window-spec-js-LC70" class="blob-code blob-code-inner js-file-line">    afterEach(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-ce-modal-window-spec-js-LC71" class="blob-code blob-code-inner js-file-line">        document.body.removeChild(element);</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-ce-modal-window-spec-js-LC72" class="blob-code blob-code-inner js-file-line">    })</td>
        </tr>
        <tr>
          <td id="file-ce-modal-window-spec-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-ce-modal-window-spec-js-LC73" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/11ff862993352301e8f195291dfa3488/raw/a5bde1b4ff614dc8a0e166a2988860ef058ba7d6/ce-modal-window.spec.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/11ff862993352301e8f195291dfa3488#file-ce-modal-window-spec-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          ce-modal-window.spec.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<figcaption>It’s the same test file, only now we are defining the custom element inside. This will enable us to do integration tests later on, for our main file, because you cannot define the same element tag on the same page and refreshing the page would cost us in test time.</figcaption>



<p id="c49f">All the tests pass. We can move on.</p>



<h4 class="wp-block-heading" id="e94d"><span class="ez-toc-section" id="The_main_file"></span>The main&nbsp;file<span class="ez-toc-section-end"></span></h4>



<p id="3a97">Let’s create <code class="markup--code markup--p-code">src/main.spec.js</code>:</p>



<figure>
<p>&nbsp;</p>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92578092" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-spec-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.spec.js content, created by YonatanKra on 02:26PM on October 21, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.spec.js">
        <tr>
          <td id="file-main-spec-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-spec-js-LC1" class="blob-code blob-code-inner js-file-line">import &#39;./main&#39;;</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-spec-js-LC2" class="blob-code blob-code-inner js-file-line">import { CEModalWindow } from &quot;./components/ce-modal-window/ce-modal-window&quot;;</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-spec-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-spec-js-LC4" class="blob-code blob-code-inner js-file-line">describe(&#39;ui-elements integration tests&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-spec-js-LC5" class="blob-code blob-code-inner js-file-line">    describe(&#39;ce-modal-window&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-spec-js-LC6" class="blob-code blob-code-inner js-file-line">        it(`should be defined`, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main-spec-js-LC7" class="blob-code blob-code-inner js-file-line">            const ceModalWindowClass = window.customElements.get(&#39;ce-modal-window&#39;);</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main-spec-js-LC8" class="blob-code blob-code-inner js-file-line">            expect(ceModalWindowClass).toBe(CEModalWindow);</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main-spec-js-LC9" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main-spec-js-LC10" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-main-spec-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main-spec-js-LC11" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b1fa70c0f92191eff78b4aaa398d5f3f/raw/46f2289fc92aeddf5504673caf78198944c17c20/main.spec.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b1fa70c0f92191eff78b4aaa398d5f3f#file-main-spec-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.spec.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<figcaption>
<figure class="hm hn ho hp hq hr">
<figcaption class="av bj ko kp kq ew eu ev kr ks aq ef">Testing that the custom element is registered as expected</figcaption>
</figure>
</figcaption>



<p id="159d">And now implement <code class="markup--code markup--p-code">src/main.js</code> that makes this test pass:</p>



<figure>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92578099" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.js content, created by YonatanKra on 02:26PM on October 21, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.js">
        <tr>
          <td id="file-main-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-js-LC1" class="blob-code blob-code-inner js-file-line">import * from &#39;./components/ce-modal-window&#39;;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a6eab6dcc653eb1de749bbd68ec6aec3/raw/0d20fc4167d6212123acade0fd358ac38da70e66/main.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a6eab6dcc653eb1de749bbd68ec6aec3#file-main-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p id="1486">The main file would just import our components and make sure they are defined correctly. We can add more integration tests here but for now it is enough.</p>



<p id="5808">Anyone who requires our <code class="markup--code markup--p-code">main.js</code> file will get the custom elements we import to <code class="markup--code markup--p-code">main.js</code>.</p>



<h4 class="wp-block-heading" id="68bb"><span class="ez-toc-section" id="The_demo_folder"></span>The demo&nbsp;folder<span class="ez-toc-section-end"></span></h4>



<p id="cc60">For order’s sake, we will give the demo its own folder.</p>



<p id="7597">Move the <code class="markup--code markup--p-code">src/index.js</code> to a demo folder and import <code class="markup--code markup--p-code">main.js</code> instead of using the standalone components:</p>



<figure>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92578105" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="index.js content, created by YonatanKra on 02:27PM on October 21, 2018."
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
          <td id="file-index-js-LC1" class="blob-code blob-code-inner js-file-line">import &#39;../main&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-index-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-index-js-LC3" class="blob-code blob-code-inner js-file-line">const modalWindow = document.createElement(&#39;ce-modal-window&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-index-js-LC4" class="blob-code blob-code-inner js-file-line">modalWindow.addEventListener(&#39;click&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-index-js-LC5" class="blob-code blob-code-inner js-file-line">    modalWindow.close();</td>
        </tr>
        <tr>
          <td id="file-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-index-js-LC6" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-index-js-LC7" class="blob-code blob-code-inner js-file-line">document.body.appendChild(modalWindow);</td>
        </tr>
        <tr>
          <td id="file-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-index-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-index-js-LC9" class="blob-code blob-code-inner js-file-line">const button = document.createElement(&#39;button&#39;);</td>
        </tr>
        <tr>
          <td id="file-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-index-js-LC10" class="blob-code blob-code-inner js-file-line">button.innerText = &#39;Open modal&#39;;</td>
        </tr>
        <tr>
          <td id="file-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-index-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-index-js-LC12" class="blob-code blob-code-inner js-file-line">button.addEventListener(&#39;click&#39;, () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-index-js-LC13" class="blob-code blob-code-inner js-file-line">    modalWindow.open({</td>
        </tr>
        <tr>
          <td id="file-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-index-js-LC14" class="blob-code blob-code-inner js-file-line">        content: &#39;&lt;h1&gt;Hello Modal&lt;/h1&gt;&#39;,</td>
        </tr>
        <tr>
          <td id="file-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-index-js-LC15" class="blob-code blob-code-inner js-file-line">        height: 50,</td>
        </tr>
        <tr>
          <td id="file-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-index-js-LC16" class="blob-code blob-code-inner js-file-line">        width: 100</td>
        </tr>
        <tr>
          <td id="file-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-index-js-LC17" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-index-js-LC18" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-index-js-LC19" class="blob-code blob-code-inner js-file-line">document.body.appendChild(button);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0f678527a1bf60eb168116cb63fda561/raw/6e9dee8d1d4dc63cede4be5996e6c762ac70d2a8/index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0f678527a1bf60eb168116cb63fda561#file-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p id="fb98"><a class="markup--anchor markup--p-anchor" href="https://github.com/YonatanKra/web-components-ui-elements/commit/eaf0f292cb0732a1093b23a94d89123ae74f4fcc" target="_blank" rel="noopener noreferrer" data-href="https://github.com/YonatanKra/web-components-ui-elements/commit/eaf0f292cb0732a1093b23a94d89123ae74f4fcc" data->Here’s the commit for this step</a>.</p>



<p id="b5ba">That’s so very cool. Our tests still pass, so our app is supposed to work as expected ( <code class="markup--code markup--p-code">npm run serve</code> or <code class="markup--code markup--p-code">npm run build</code> and then run the resulting <code class="markup--code markup--p-code">dist\index.html</code>).</p>



<p id="72b1">Now we need to tell our build process to split our files so they can be consumed separately.</p>



<h3 class="wp-block-heading" id="9e37"><span class="ez-toc-section" id="File_splitting"></span>File splitting<span class="ez-toc-section-end"></span></h3>



<p id="caa4">File splitting in webpack is a breeze. I’ve written <a class="markup--anchor markup--p-anchor" href="https://medium.com/walkme-engineering/how-and-when-not-to-use-webpack-for-lazy-loading-bef9d37c42c1" target="_blank" rel="noopener noreferrer" data-href="https://medium.com/walkme-engineering/how-and-when-not-to-use-webpack-for-lazy-loading-bef9d37c42c1" data->an article</a> about it when webpack 3.0 was all the rage. Webpack 4 makes the whole splitting so much easier…</p>



<p id="4dd6">In our case, we’d like to do the following:</p>



<ol class="wp-block-list"><li id="0cc7" class="graf graf--li graf-after--p">Expose the main file so one could import the whole library in one go</li><li id="19e9" class="graf graf--li graf-after--li">Expose each component in its own file</li><li id="254a" class="graf graf--li graf-after--li">Create the demo folder</li></ol>



<p id="8dcd">Webpack has us covered here. We just go to the <code class="markup--code markup--p-code">config/webpack.common.js</code> file and change a few things:</p>



<ol class="wp-block-list"><li id="a709" class="graf graf--li graf-after--p">Our entry statement would now include our main module, the new demo folder and our components (currently we have only one — but we’re going to scale soon).</li><li id="5d5d" class="graf graf--li graf-after--li">The HTML webpack plugin now adds the HTML file inside the demo folder</li><li id="314b" class="graf graf--li graf-after--li">I’ve added a new plugin — the Clean webpack plugin, which conveniently removes the dist folder on every build</li></ol>



<p id="c803">Here’s the <code class="markup--code markup--p-code">webpack.common.js</code> code:</p>



<figure>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92580719" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-common-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.common.js content, created by YonatanKra on 06:25PM on October 21, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpack.common.js">
        <tr>
          <td id="file-webpack-common-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpack-common-js-LC1" class="blob-code blob-code-inner js-file-line">const path = require(&#39;path&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-common-js-LC2" class="blob-code blob-code-inner js-file-line">const webpack = require(&#39;webpack&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-common-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-common-js-LC4" class="blob-code blob-code-inner js-file-line">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-common-js-LC5" class="blob-code blob-code-inner js-file-line">const CleanWebpackPlugin = require(&#39;clean-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-common-js-LC6" class="blob-code blob-code-inner js-file-line">module.exports = {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-common-js-LC7" class="blob-code blob-code-inner js-file-line">    entry: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-common-js-LC8" class="blob-code blob-code-inner js-file-line">        &#39;demo/index&#39; : &#39;./src/demo/index.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-common-js-LC9" class="blob-code blob-code-inner js-file-line">        index: &#39;./src/main.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-common-js-LC10" class="blob-code blob-code-inner js-file-line">        &#39;lib/ce-modal-window/index&#39;: &#39;./src/components/ce-modal-window/index.js&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpack-common-js-LC11" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-webpack-common-js-LC12" class="blob-code blob-code-inner js-file-line">    plugins: [</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-webpack-common-js-LC13" class="blob-code blob-code-inner js-file-line">        new CleanWebpackPlugin(),</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpack-common-js-LC14" class="blob-code blob-code-inner js-file-line">        new HtmlWebpackPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-webpack-common-js-LC15" class="blob-code blob-code-inner js-file-line">            title: &#39;TDD Challenge&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-webpack-common-js-LC16" class="blob-code blob-code-inner js-file-line">            meta: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-webpack-common-js-LC17" class="blob-code blob-code-inner js-file-line">                viewport: &#39;width=device-width, initial-scale=1&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-webpack-common-js-LC18" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-webpack-common-js-LC19" class="blob-code blob-code-inner js-file-line">        })</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-webpack-common-js-LC20" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-webpack-common-js-LC21" class="blob-code blob-code-inner js-file-line">    module: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-webpack-common-js-LC22" class="blob-code blob-code-inner js-file-line">        rules: [</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-webpack-common-js-LC23" class="blob-code blob-code-inner js-file-line">            // use the html loader</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-webpack-common-js-LC24" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-webpack-common-js-LC25" class="blob-code blob-code-inner js-file-line">                test: /\.html$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-webpack-common-js-LC26" class="blob-code blob-code-inner js-file-line">                exclude: /node_modules/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-webpack-common-js-LC27" class="blob-code blob-code-inner js-file-line">                use: {loader: &#39;html-loader&#39;}</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-webpack-common-js-LC28" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-webpack-common-js-LC29" class="blob-code blob-code-inner js-file-line">            // use the css loaders (first load the css, then inject the style)</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-webpack-common-js-LC30" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-webpack-common-js-LC31" class="blob-code blob-code-inner js-file-line">                test: /\.css$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-webpack-common-js-LC32" class="blob-code blob-code-inner js-file-line">                use: [</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-webpack-common-js-LC33" class="blob-code blob-code-inner js-file-line">                    &#39;style-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-webpack-common-js-LC34" class="blob-code blob-code-inner js-file-line">                    &#39;css-loader&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-webpack-common-js-LC35" class="blob-code blob-code-inner js-file-line">                ]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-webpack-common-js-LC36" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-webpack-common-js-LC37" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-webpack-common-js-LC38" class="blob-code blob-code-inner js-file-line">                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-webpack-common-js-LC39" class="blob-code blob-code-inner js-file-line">                use: [ &#39;url-loader&#39; ]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-webpack-common-js-LC40" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-webpack-common-js-LC41" class="blob-code blob-code-inner js-file-line">        ]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-webpack-common-js-LC42" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-webpack-common-js-LC43" class="blob-code blob-code-inner js-file-line">    optimization: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-webpack-common-js-LC44" class="blob-code blob-code-inner js-file-line">        splitChunks: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-webpack-common-js-LC45" class="blob-code blob-code-inner js-file-line">            chunks: &#39;all&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-webpack-common-js-LC46" class="blob-code blob-code-inner js-file-line">            cacheGroups: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-webpack-common-js-LC47" class="blob-code blob-code-inner js-file-line">                vendors: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-webpack-common-js-LC48" class="blob-code blob-code-inner js-file-line">                    test: /[\\/]node_modules[\\/]/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-webpack-common-js-LC49" class="blob-code blob-code-inner js-file-line">                    priority: -10</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-webpack-common-js-LC50" class="blob-code blob-code-inner js-file-line">                },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-webpack-common-js-LC51" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-webpack-common-js-LC52" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-webpack-common-js-LC53" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-webpack-common-js-LC54" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/eb532d711cc1c88e80e7918c49216b18/raw/de0535f6d8e6ebe592e4605c5d9751a868887452/webpack.common.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/eb532d711cc1c88e80e7918c49216b18#file-webpack-common-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.common.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p id="90a5">If you build ( <code class="markup--code markup--p-code">npm run build</code> ) a dist folder will be created and you will see it, inside our folder structure.</p>



<p id="c3c7">This way, anyone using our package will be able to do <code class="markup--code markup--p-code">import 'web-components-ui-elements’</code> to get our main <code class="markup--code markup--p-code">index.js</code> file or <code class="markup--code markup--p-code">import 'web-components-ui-elements/components/ce-modal-window'</code> to just get the modal window component without loading the whole library.</p>



<p id="b7c7"><a class="markup--anchor markup--p-anchor" href="https://github.com/YonatanKra/web-components-ui-elements/commit/89dd636c36c528939a923a18746c29e582a65120" target="_blank" rel="noopener noreferrer" data-href="https://github.com/YonatanKra/web-components-ui-elements/commit/89dd636c36c528939a923a18746c29e582a65120" data->You can see the full commit here</a>.</p>



<h3 class="wp-block-heading" id="edad"><span class="ez-toc-section" id="NPM_configurations_aka_packagejson"></span>NPM configurations (a.k.a. package.json)<span class="ez-toc-section-end"></span></h3>



<p id="4452">The package.json should point to the main file. It’s already doing that (in the <code class="markup--code markup--p-code">main</code> attribute). We should add a description and change the name of our module.</p>



<p id="a24a">There are lots and lots of configurations to a <code class="markup--code markup--p-code">package.json</code>. You can <a class="markup--anchor markup--p-anchor" href="https://docs.npmjs.com/files/package.json" target="_blank" rel="noopener noreferrer" data-href="https://docs.npmjs.com/files/package.json" data->read more about them here</a> and modify as you like. Here’s what I came up with:</p>



<figure>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist92580920" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-package-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="package.json content, created by YonatanKra on 06:41PM on October 21, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="package.json">
        <tr>
          <td id="file-package-json-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-package-json-LC1" class="blob-code blob-code-inner js-file-line">{</td>
        </tr>
        <tr>
          <td id="file-package-json-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-package-json-LC2" class="blob-code blob-code-inner js-file-line">  &quot;name&quot;: &quot;web-components-ui-elements&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-package-json-LC3" class="blob-code blob-code-inner js-file-line">  &quot;version&quot;: &quot;1.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-package-json-LC4" class="blob-code blob-code-inner js-file-line">  &quot;description&quot;: &quot;UI elements library based on web components&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-package-json-LC5" class="blob-code blob-code-inner js-file-line">  &quot;main&quot;: &quot;index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-package-json-LC6" class="blob-code blob-code-inner js-file-line">  &quot;scripts&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-package-json-LC7" class="blob-code blob-code-inner js-file-line">    &quot;test&quot;: &quot;karma start config/karma.conf.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-package-json-LC8" class="blob-code blob-code-inner js-file-line">    &quot;build&quot;: &quot;webpack --config config/webpack.prod.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-package-json-LC9" class="blob-code blob-code-inner js-file-line">    &quot;build:watch&quot;: &quot;webpack --config config/webpack.prod.js --watch&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-package-json-LC10" class="blob-code blob-code-inner js-file-line">    &quot;serve&quot;: &quot;webpack-dev-server --config config/webpack.dev.js&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-package-json-LC11" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-package-json-LC12" class="blob-code blob-code-inner js-file-line">  &quot;author&quot;: &quot;Yonatan Kra&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-package-json-LC13" class="blob-code blob-code-inner js-file-line">  &quot;license&quot;: &quot;MIT&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-package-json-LC14" class="blob-code blob-code-inner js-file-line">  &quot;devDependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-package-json-LC15" class="blob-code blob-code-inner js-file-line">    &quot;clean-webpack-plugin&quot;: &quot;^0.1.19&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-package-json-LC16" class="blob-code blob-code-inner js-file-line">    &quot;copy-webpack-plugin&quot;: &quot;^4.5.3&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-package-json-LC17" class="blob-code blob-code-inner js-file-line">    &quot;css-loader&quot;: &quot;^1.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-package-json-LC18" class="blob-code blob-code-inner js-file-line">    &quot;file-loader&quot;: &quot;^2.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-package-json-LC19" class="blob-code blob-code-inner js-file-line">    &quot;html-loader&quot;: &quot;^0.5.5&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-package-json-LC20" class="blob-code blob-code-inner js-file-line">    &quot;html-webpack-plugin&quot;: &quot;^3.2.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-package-json-LC21" class="blob-code blob-code-inner js-file-line">    &quot;jasmine&quot;: &quot;^3.2.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-package-json-LC22" class="blob-code blob-code-inner js-file-line">    &quot;karma&quot;: &quot;^3.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-package-json-LC23" class="blob-code blob-code-inner js-file-line">    &quot;karma-webpack&quot;: &quot;^3.0.5&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-package-json-LC24" class="blob-code blob-code-inner js-file-line">    &quot;style-loader&quot;: &quot;^0.23.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-package-json-LC25" class="blob-code blob-code-inner js-file-line">    &quot;url-loader&quot;: &quot;^1.1.2&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-package-json-LC26" class="blob-code blob-code-inner js-file-line">    &quot;webpack&quot;: &quot;^4.20.2&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-package-json-LC27" class="blob-code blob-code-inner js-file-line">    &quot;webpack-cli&quot;: &quot;^3.1.2&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-package-json-LC28" class="blob-code blob-code-inner js-file-line">    &quot;webpack-dev-server&quot;: &quot;^3.1.9&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-package-json-LC29" class="blob-code blob-code-inner js-file-line">    &quot;webpack-karma-jasmine&quot;: &quot;^3.0.4&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-package-json-LC30" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-package-json-LC31" class="blob-code blob-code-inner js-file-line">  &quot;dependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-package-json-LC32" class="blob-code blob-code-inner js-file-line">    &quot;webpack-merge&quot;: &quot;^4.1.4&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-package-json-LC33" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-package-json-LC34" class="blob-code blob-code-inner js-file-line">  &quot;repository&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-package-json-LC35" class="blob-code blob-code-inner js-file-line">    &quot;type&quot;: &quot;git&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-package-json-LC36" class="blob-code blob-code-inner js-file-line">    &quot;url&quot;: &quot;https://github.com/yonatankra/web-components-ui-elements.git&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-package-json-LC37" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-package-json-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-package-json-LC38" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b4245493c2b7a3bbedd70dc9ecc255a0/raw/19969fab5d7a969b1381ed08c1c9a6ae9e73e837/package.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b4245493c2b7a3bbedd70dc9ecc255a0#file-package-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          package.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p id="8f45"><a class="markup--anchor markup--p-anchor" href="https://github.com/YonatanKra/web-components-ui-elements/commit/5f55b1cb073066313714921c07b48295c953d856" target="_blank" rel="noopener noreferrer" data-href="https://github.com/YonatanKra/web-components-ui-elements/commit/5f55b1cb073066313714921c07b48295c953d856" data->The relevant commit is here</a>.</p>



<h3 class="wp-block-heading" id="2145"><span class="ez-toc-section" id="Documentation"></span>Documentation<span class="ez-toc-section-end"></span></h3>



<p id="0821">Our users can’t read our mind. Let’s add documentation:</p>



<ol class="wp-block-list"><li id="51fe" class="graf graf--li graf-after--p">Edit the README.MD file (if it doesn’t already exist, create it).</li><li id="fea5" class="graf graf--li graf-after--li">Check out the <a class="markup--anchor markup--li-anchor" href="https://guides.github.com/features/mastering-markdown/" target="_blank" rel="noopener noreferrer" data-href="https://guides.github.com/features/mastering-markdown/" data->github markdown page</a> to see how to format your documentation.</li><li id="42a9" class="graf graf--li graf-after--li">Let’s document our work:</li></ol>



<figure>
<p></p></figure>


<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist94299854" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-readme-md" class="file my-2">
      <div id="file-readme-md-readme" class="Box-body readme blob tmp-p-5 tmp-p-xl-6 "
    style="overflow: auto" tabindex="0" role="region"
    aria-label="readme.md content, created by YonatanKra on 06:46AM on January 27, 2019."
  >
    <article class="markdown-body entry-content container-lg" itemprop="text"><div class="markdown-heading" dir="auto"><h1 class="heading-element" dir="auto">web-components-ui-elements</h1><a id="user-content-web-components-ui-elements" class="anchor" aria-label="Permalink: web-components-ui-elements" href="#web-components-ui-elements"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<p dir="auto">A web components UI library.</p>
<div class="markdown-heading" dir="auto"><h2 class="heading-element" dir="auto"><span class="ez-toc-section" id="Installation"></span>Installation<span class="ez-toc-section-end"></span></h2><a id="user-content-installation" class="anchor" aria-label="Permalink: Installation" href="#installation"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<p dir="auto"><code>npm install web-components-ui-elements</code></p>
<div class="markdown-heading" dir="auto"><h2 class="heading-element" dir="auto"><span class="ez-toc-section" id="Usage"></span>Usage<span class="ez-toc-section-end"></span></h2><a id="user-content-usage" class="anchor" aria-label="Permalink: Usage" href="#usage"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<p dir="auto">You can require the whole library:</p>
<p dir="auto"><code>import * from web-components-ui-elements;</code></p>
<p dir="auto">And use in the DOM like this:</p>
<p dir="auto"><code>&lt;ce-modal-window id="modal-window"&gt;&lt;/ce-modal-window&gt;</code></p>
<p dir="auto">And then use the API:</p>
<pre><code>const modal = document.querySelector('#modal-window');
modal.open({
    content: '&lt;h1&gt;Hello Modal!&lt;/h1&gt;'
});

// close the modal when clicking on it
function closeModal() {
    modal.close();
    modal.removeEventListener('click', closeModal);
}
modal.addEventListener('click', closeModal);

</code></pre>
<p dir="auto">If you want, you can just create the element on your own and add it to the DOM:</p>
<pre><code>const modalWindow = document.createElement('ce-modal-window');
modalWindow.addEventListener('click', () =&gt; {
    modalWindow.close();
});
document.body.appendChild(modalWindow);

const button = document.createElement('button');
button.innerText = 'Open modal';

button.addEventListener('click', () =&gt; {
    modalWindow.open({
        content: '&lt;h1&gt;Hello Modal&lt;/h1&gt;',
        height: 50,
        width: 100
    });
});
document.body.appendChild(button);
</code></pre>
<div class="markdown-heading" dir="auto"><h2 class="heading-element" dir="auto"><span class="ez-toc-section" id="API"></span>API<span class="ez-toc-section-end"></span></h2><a id="user-content-api" class="anchor" aria-label="Permalink: API" href="#api"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<div class="markdown-heading" dir="auto"><h3 class="heading-element" dir="auto"><span class="ez-toc-section" id="Modal_Window"></span>Modal Window<span class="ez-toc-section-end"></span></h3><a id="user-content-modal-window" class="anchor" aria-label="Permalink: Modal Window" href="#modal-window"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<div class="markdown-heading" dir="auto"><h4 class="heading-element" dir="auto"><span class="ez-toc-section" id="Tag_Name"></span>Tag Name<span class="ez-toc-section-end"></span></h4><a id="user-content-tag-name" class="anchor" aria-label="Permalink: Tag Name" href="#tag-name"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<p dir="auto"><code>ce-modal-window</code></p>
<div class="markdown-heading" dir="auto"><h4 class="heading-element" dir="auto"><span class="ez-toc-section" id="Methods"></span>Methods<span class="ez-toc-section-end"></span></h4><a id="user-content-methods" class="anchor" aria-label="Permalink: Methods" href="#methods"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<div class="markdown-heading" dir="auto"><h5 class="heading-element" dir="auto"><span class="ez-toc-section" id="Open"></span>Open<span class="ez-toc-section-end"></span></h5><a id="user-content-open" class="anchor" aria-label="Permalink: Open" href="#open"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<p dir="auto">Accepts a config object and opens the modal.</p>
<div class="markdown-heading" dir="auto"><h5 class="heading-element" dir="auto"><span class="ez-toc-section" id="Close"></span>Close<span class="ez-toc-section-end"></span></h5><a id="user-content-close" class="anchor" aria-label="Permalink: Close" href="#close"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<p dir="auto">Closes the modal</p>
<div class="markdown-heading" dir="auto"><h4 class="heading-element" dir="auto"><span class="ez-toc-section" id="ICD"></span>ICD<span class="ez-toc-section-end"></span></h4><a id="user-content-icd" class="anchor" aria-label="Permalink: ICD" href="#icd"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<div class="markdown-heading" dir="auto"><h5 class="heading-element" dir="auto"><span class="ez-toc-section" id="Config"></span>Config<span class="ez-toc-section-end"></span></h5><a id="user-content-config" class="anchor" aria-label="Permalink: Config" href="#config"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<pre><code>{
    content: '', // &lt;string&gt; HTML snippet to show inside the modal
    hideOverlay: false, // &lt;boolean&gt; show or hide the opack overlay behind the modal
    height: 150, // &lt;number&gt; height of the modal
    width: 150, // &lt;number&gt; width of the modal
}
</code></pre>
<div class="markdown-heading" dir="auto"><h2 class="heading-element" dir="auto"><span class="ez-toc-section" id="Contributing"></span>Contributing<span class="ez-toc-section-end"></span></h2><a id="user-content-contributing" class="anchor" aria-label="Permalink: Contributing" href="#contributing"><svg data-component="Octicon" class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a></div>
<ul dir="auto">
<li>Clone</li>
<li><code>npm i</code></li>
<li><code>npm run build</code> to get the build</li>
<li><code>npm run test</code> to test</li>
<li><code>npm run serve</code> to run a development environment</li>
</ul>
</article>
  </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a16a15a73ed69268bfa3de7ec221f4d1/raw/12e1668839b27c00c55393103af80700065f2bda/readme.md" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a16a15a73ed69268bfa3de7ec221f4d1#file-readme-md" class="Link--inTextBlock" target="_blank" rel="noopener">
          readme.md
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<figcaption></figcaption>



<p id="1db2">4. Let’s install something that auto-creates a table of contents (TOC) for us:<br>`npm i -D doctoc`</p>



<p id="a1b7">5. Add a precommit hook to build the TOC inside the package.json:<br>`”precommit”: “doctoc&nbsp;./README.md”,`</p>



<p id="f424">Here’s the commit for these changes: <a class="markup--anchor markup--p-anchor" href="https://github.com/YonatanKra/web-components-ui-elements/commit/918991b8f6b4c04b3cd4691c4b1d3e8c368fdc78" target="_blank" rel="noopener noreferrer" data-href="https://github.com/YonatanKra/web-components-ui-elements/commit/918991b8f6b4c04b3cd4691c4b1d3e8c368fdc78" data->The Commit</a>.</p>



<h3 class="wp-block-heading" id="415a"><span class="ez-toc-section" id="NPM_Publish"></span>NPM Publish<span class="ez-toc-section-end"></span></h3>



<p id="4fe9">Before we continue, please add <code class="markup--code markup--p-code">"private": true</code> to the package.json. Remove it when your library is truly ready to publish.</p>



<p id="8099">Done? Cool. This one is easy:</p>



<p id="e1bd"><code class="markup--code markup--p-code">npm login </code>and follow along the instructions</p>



<p id="dff3"><code class="markup--code markup--p-code">npm publish</code></p>



<p id="5da7">And……….. We are done!</p>



<h3 class="wp-block-heading" id="b019"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h3>



<p id="02cf">Congratulations! You’ve just published a web component library to NPM.</p>



<p id="d68a">You can maintain it and add more features to it.</p>



<p id="6458">Keep in mind that a CI/CD process should be setup, so we can manage an army of contributors to this new awesomeness.</p>



<p id="a103">Hope you had fun and learned something here&nbsp;🙂</p>

