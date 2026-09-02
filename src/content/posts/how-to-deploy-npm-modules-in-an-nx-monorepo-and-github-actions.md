---
title: How to deploy NPM modules in an NX monorepo and github actions?
slug: how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions
published: 2021-09-19T21:23:59
updated: 2021-09-19T22:19:35
author: Yonatan Kra
description: How do you maintain and deploy multiple NPM modules? How do you make sure versions do not mismatch or that nothing breaks while upgrading dependencies? And how do you deploy multiple packages at the same time in one CLI command? The problem of maintaining multiple modules and services There are two main ways to manage [&hellip;]
categories:
  - name: github actions
    slug: github-actions
    path: devops/github-actions
  - name: nx
    slug: nx
    path: javascript/nx
tags: []
canonical: https://yonatankra.com/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/
comments: []
---


<p class="has-medium-font-size">How do you maintain and deploy multiple NPM modules? How do you make sure versions do not mismatch or that nothing breaks while upgrading dependencies? And how do you deploy multiple packages at the same time in one CLI command?</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1c38193e" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1c38193e"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#The_problem_of_maintaining_multiple_modules_and_services" >The problem of maintaining multiple modules and services</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#How_to_maintain_NPM_modules_in_an_NX_monorepo" >How to maintain NPM modules in an NX monorepo?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#How_to_publish_multiple_libraries_in_an_NX_monorepo_with_github_actions" >How to publish multiple libraries in an NX monorepo with github actions?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#The_CI_Process" >The CI Process</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#The_CD_Process" >The CD Process</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#Deploy_the_Demo" >Deploy the Demo</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#Publish_to_NPM" >Publish to NPM</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-deploy-npm-modules-in-an-nx-monorepo-and-github-actions/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_problem_of_maintaining_multiple_modules_and_services"></span>The problem of maintaining multiple modules and services<span class="ez-toc-section-end"></span></h2>



<p>There are two main ways to manage multiple NPM modules.  </p>



<p>The first and the &#8220;classic&#8221; is to maintain multiple repositories.  Some say that developing this way, every module is independent from the others.  You just develop the code in the module&#8217;s repository and publish a new version whenever you want.  Is it true?</p>



<p>What if module A has a dependency (in its package.json) with module B? Now, we develop module B, which has a critical bug, and publish a new version.  At first, it seems like they are independent.  The problem is, module B changed, and we wouldn&#8217;t know if the changes had any implications on module A until we upgrade the dependency in A.</p>



<p>So the first thing we see here is that they are dependent on each other, even if they a 1000 repositories away.  The second thing is that it is hard to catch integration regressions even though we are the maintainers of both A and B.</p>



<p>Another thing is &#8211; what if we changed A, B and C at the same time to solve some mutual bug? We need to update all of them and publish a new version of each.  That&#8217;s touching 3 repositories.  What if we have 10 modules? Or 50 microservices that require these modules?</p>



<p>These problems (and some more) are being solved by the second options &#8211; a monorepo.  In this article, we will see how to easily publish and maintain NPM modules in an <a rel="noreferrer noopener" href="https://nx.dev/" data-type="URL" data-id="https://nx.dev/" target="_blank">NX monorepo</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_maintain_NPM_modules_in_an_NX_monorepo"></span>How to maintain NPM modules in an NX monorepo?<span class="ez-toc-section-end"></span></h2>



<p>There are several flavours to an NX monorepo. For this tutorial, let&#8217;s assume we are building an angular modules library.  </p>



<p>In NX, we will build the repository this way:</p>



<ol class="wp-block-list"><li>Initialization: <code>npx create-nx-workspace --preset=angular</code><br>This will create a project for us with an angular application (which can be our library documentation or playground)</li><li>Now that we have a repo, we can start building our independent modules: <code>nx g @nrwl/angular:lib form-association --publishable</code> <br>This command creates a new publishable (e.g. <code>npm publish</code>) angular module called <code>form-association</code>.  <br>This is a true use case, since in our team we had to integrate our native web components inside angular applications.  The form elements had to have some custom angular directives to be able to interact with angular reactive forms or <code>ngModel</code>.<br>Other modules we created exposed some custom functionality for angular users that are using our web components.  For instance, our dialog component. All in all, it was angular wrappers, directives and services that enabled angular users to more easily use complex components.</li></ol>



<p>That&#8217;s about it. For every module we want to create, we run the <code>lib</code> generation command. We develop it and test it. We also use it in the demo app that was conveniently created for us when we created the NX workspace in step 1.</p>



<p>Now that we have tested libraries and an app that uses the libraries and tests them as well (integration tests), we can move on to publish our multiple libraries.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_publish_multiple_libraries_in_an_NX_monorepo_with_github_actions"></span>How to publish multiple libraries in an NX monorepo with github actions?<span class="ez-toc-section-end"></span></h2>



<p>In this part, we will delve a bit into our CI/CD infrastructure.  The example here is <code>github actions</code> syntax, but it can be easily &#8220;translated&#8221; into any CI/CD flow.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_CI_Process"></span>The CI Process<span class="ez-toc-section-end"></span></h3>



<p>The first step would be to test and build our code.  That&#8217;s pretty self explained in this code:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111877517" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-ci-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="ci.yml content, created by YonatanKra on 06:42PM on September 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="ci.yml">
        <tr>
          <td id="file-ci-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-ci-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Test and Build</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-ci-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-ci-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-ci-yml-LC4" class="blob-code blob-code-inner js-file-line">  pull_request:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-ci-yml-LC5" class="blob-code blob-code-inner js-file-line">    branches:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-ci-yml-LC6" class="blob-code blob-code-inner js-file-line">      - main</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-ci-yml-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-ci-yml-LC8" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-ci-yml-LC9" class="blob-code blob-code-inner js-file-line">  build-test:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-ci-yml-LC10" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-ci-yml-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-ci-yml-LC12" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-ci-yml-LC13" class="blob-code blob-code-inner js-file-line">      - name: Checkout</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-ci-yml-LC14" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-ci-yml-LC15" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-ci-yml-LC16" class="blob-code blob-code-inner js-file-line">          fetch-depth: 0</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-ci-yml-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-ci-yml-LC18" class="blob-code blob-code-inner js-file-line">      - name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-ci-yml-LC19" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v1</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-ci-yml-LC20" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-ci-yml-LC21" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-ci-yml-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-ci-yml-LC23" class="blob-code blob-code-inner js-file-line">      - name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-ci-yml-LC24" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-ci-yml-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-ci-yml-LC26" class="blob-code blob-code-inner js-file-line">      - name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-ci-yml-LC27" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-ci-yml-LC28" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-ci-yml-LC29" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-ci-yml-LC30" class="blob-code blob-code-inner js-file-line">      - name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-ci-yml-LC31" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-ci-yml-LC32" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-ci-yml-LC33" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-ci-yml-LC34" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-ci-yml-LC35" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-ci-yml-LC36" class="blob-code blob-code-inner js-file-line">            **\node_modules</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-ci-yml-LC37" class="blob-code blob-code-inner js-file-line">          key: ${{ runner.os }}-yarn-${{ hashFiles(&#39;**/yarn.lock&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-ci-yml-LC38" class="blob-code blob-code-inner js-file-line">          restore-keys: |</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-ci-yml-LC39" class="blob-code blob-code-inner js-file-line">            ${{ runner.os }}-yarn-</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-ci-yml-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-ci-yml-LC41" class="blob-code blob-code-inner js-file-line">      - name: Install dependencies</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-ci-yml-LC42" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-ci-yml-LC43" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-ci-yml-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-ci-yml-LC45" class="blob-code blob-code-inner js-file-line">      - name: Test</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-ci-yml-LC46" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-ci-yml-LC47" class="blob-code blob-code-inner js-file-line">          RUN=CI yarn nx run-many --target=test --all --parallel 5</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-ci-yml-LC48" class="blob-code blob-code-inner js-file-line">          yarn nx run-many --target=lint --all</td>
        </tr>
        <tr>
          <td id="file-ci-yml-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-ci-yml-LC49" class="blob-code blob-code-inner js-file-line">          yarn nx run-many --target=build --all --prod</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/86b649259240f4cc36df982433317b67/raw/d5e77d868e3e83b38ee542fc885383dbb25647ff/ci.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/86b649259240f4cc36df982433317b67#file-ci-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          ci.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>On lines 3-6 we state the trigger. In our case, a pull request (or push to pull request) to the main branch.</p>



<p>From here on we create one <code>job</code> that runs on <code>ubuntu</code>. It installs <code>node</code>, checks out the branch, verifies for cache or installs the dependencies and finally runs the tests, linting and build.  If all passes, we can merge.</p>



<p>Once the code is merged, the Pull Request is closed and we can start the process of finalizing our <code>integration</code> and start the <code>deployment</code>.</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111877568" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-prepare-for-release-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="prepare-for-release.yml content, created by YonatanKra on 06:49PM on September 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="prepare-for-release.yml">
        <tr>
          <td id="file-prepare-for-release-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-prepare-for-release-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Build and release</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-prepare-for-release-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-prepare-for-release-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-prepare-for-release-yml-LC4" class="blob-code blob-code-inner js-file-line">  pull_request:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-prepare-for-release-yml-LC5" class="blob-code blob-code-inner js-file-line">    types: [closed]</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-prepare-for-release-yml-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-prepare-for-release-yml-LC7" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-prepare-for-release-yml-LC8" class="blob-code blob-code-inner js-file-line">  build-test-release:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-prepare-for-release-yml-LC9" class="blob-code blob-code-inner js-file-line">    if: github.event.action == &#39;closed&#39; &amp;&amp; github.event.pull_request.merged == true</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-prepare-for-release-yml-LC10" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-prepare-for-release-yml-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-prepare-for-release-yml-LC12" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-prepare-for-release-yml-LC13" class="blob-code blob-code-inner js-file-line">      - name: Checkout</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-prepare-for-release-yml-LC14" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-prepare-for-release-yml-LC15" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-prepare-for-release-yml-LC16" class="blob-code blob-code-inner js-file-line">          fetch-depth: 0</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-prepare-for-release-yml-LC17" class="blob-code blob-code-inner js-file-line">          token: ${{ secrets.CI_REPOSITORY_ACCESS_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-prepare-for-release-yml-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-prepare-for-release-yml-LC19" class="blob-code blob-code-inner js-file-line">      - name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-prepare-for-release-yml-LC20" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v1</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-prepare-for-release-yml-LC21" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-prepare-for-release-yml-LC22" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-prepare-for-release-yml-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-prepare-for-release-yml-LC24" class="blob-code blob-code-inner js-file-line">      - name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-prepare-for-release-yml-LC25" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-prepare-for-release-yml-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-prepare-for-release-yml-LC27" class="blob-code blob-code-inner js-file-line">      - name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-prepare-for-release-yml-LC28" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-prepare-for-release-yml-LC29" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-prepare-for-release-yml-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-prepare-for-release-yml-LC31" class="blob-code blob-code-inner js-file-line">      - name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-prepare-for-release-yml-LC32" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-prepare-for-release-yml-LC33" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-prepare-for-release-yml-LC34" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-prepare-for-release-yml-LC35" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-prepare-for-release-yml-LC36" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-prepare-for-release-yml-LC37" class="blob-code blob-code-inner js-file-line">            **\node_modules</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-prepare-for-release-yml-LC38" class="blob-code blob-code-inner js-file-line">          key: ${{ runner.os }}-yarn-${{ hashFiles(&#39;**/yarn.lock&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-prepare-for-release-yml-LC39" class="blob-code blob-code-inner js-file-line">          restore-keys: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-prepare-for-release-yml-LC40" class="blob-code blob-code-inner js-file-line">            ${{ runner.os }}-yarn-</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-prepare-for-release-yml-LC41" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-prepare-for-release-yml-LC42" class="blob-code blob-code-inner js-file-line">      - name: Install dependencies</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-prepare-for-release-yml-LC43" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-prepare-for-release-yml-LC44" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-prepare-for-release-yml-LC45" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-prepare-for-release-yml-LC46" class="blob-code blob-code-inner js-file-line">      - name: Test</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-prepare-for-release-yml-LC47" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-prepare-for-release-yml-LC48" class="blob-code blob-code-inner js-file-line">          RUN=CI yarn nx run-many --target=test --all</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-prepare-for-release-yml-LC49" class="blob-code blob-code-inner js-file-line">          yarn nx run-many --target=lint --all</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-prepare-for-release-yml-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-prepare-for-release-yml-LC51" class="blob-code blob-code-inner js-file-line">      - name: Build components</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-prepare-for-release-yml-LC52" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-prepare-for-release-yml-LC53" class="blob-code blob-code-inner js-file-line">          yarn nx affected:build --prod --with-deps --base=main</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-prepare-for-release-yml-LC54" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-prepare-for-release-yml-LC55" class="blob-code blob-code-inner js-file-line">      - name: Raise version of affected libraries</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-prepare-for-release-yml-LC56" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-prepare-for-release-yml-LC57" class="blob-code blob-code-inner js-file-line">          LATEST_TAG=$(git tag -l &quot;v*&quot; --sort=-version:refname | head -n 1)</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-prepare-for-release-yml-LC58" class="blob-code blob-code-inner js-file-line">          LIBS=$(yarn nx affected:libs --base=$LATEST_TAG --head=HEAD --plain | awk &#39;NR &gt; 2 &amp;&amp; $1 != &quot;Done&quot; { print $1 }&#39;)</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-prepare-for-release-yml-LC59" class="blob-code blob-code-inner js-file-line">          for LIBRARY in $LIBS</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-prepare-for-release-yml-LC60" class="blob-code blob-code-inner js-file-line">          do</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-prepare-for-release-yml-LC61" class="blob-code blob-code-inner js-file-line">            cd ./libs/$LIBRARY</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-prepare-for-release-yml-LC62" class="blob-code blob-code-inner js-file-line">            npm version minor --no-git-tag-version --no-push</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-prepare-for-release-yml-LC63" class="blob-code blob-code-inner js-file-line">            echo &quot;Bumping $LIBRARY&quot;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-prepare-for-release-yml-LC64" class="blob-code blob-code-inner js-file-line">            cd ..</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-prepare-for-release-yml-LC65" class="blob-code blob-code-inner js-file-line">            cd ..</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-prepare-for-release-yml-LC66" class="blob-code blob-code-inner js-file-line">          done</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-prepare-for-release-yml-LC67" class="blob-code blob-code-inner js-file-line">          npm version minor --no-git-tag-version --no-push</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-prepare-for-release-yml-LC68" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-prepare-for-release-yml-LC69" class="blob-code blob-code-inner js-file-line">      - name: get-npm-version</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-prepare-for-release-yml-LC70" class="blob-code blob-code-inner js-file-line">        id: package-version</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-prepare-for-release-yml-LC71" class="blob-code blob-code-inner js-file-line">        uses: martinbeentjes/npm-get-version-action@master</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-prepare-for-release-yml-LC72" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-prepare-for-release-yml-LC73" class="blob-code blob-code-inner js-file-line">      - name: Push changes</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-prepare-for-release-yml-LC74" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-prepare-for-release-yml-LC75" class="blob-code blob-code-inner js-file-line">          git fetch</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-prepare-for-release-yml-LC76" class="blob-code blob-code-inner js-file-line">          git config user.email &quot;vivid.ci@vonage.com&quot;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-prepare-for-release-yml-LC77" class="blob-code blob-code-inner js-file-line">          git config user.name &quot;Vivid CI&quot;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-prepare-for-release-yml-LC78" class="blob-code blob-code-inner js-file-line">          git add --all</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-prepare-for-release-yml-LC79" class="blob-code blob-code-inner js-file-line">          git commit -m &quot;update versions to ${{ steps.package-version.outputs.current-version }}&quot;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-prepare-for-release-yml-LC80" class="blob-code blob-code-inner js-file-line">          git push</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-prepare-for-release-yml-LC81" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-prepare-for-release-yml-LC82" class="blob-code blob-code-inner js-file-line">      - name: Tag release</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-prepare-for-release-yml-LC83" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-prepare-for-release-yml-LC84" class="blob-code blob-code-inner js-file-line">          git tag -a v${{ steps.package-version.outputs.current-version }} -m &quot;tag release v${{ steps.package-version.outputs.current-version }}&quot;</td>
        </tr>
        <tr>
          <td id="file-prepare-for-release-yml-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-prepare-for-release-yml-LC85" class="blob-code blob-code-inner js-file-line">          git push --follow-tags</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/11ec8988fe94d293e5a0445ad1a3370b/raw/aa55ff23e8f36b438ef94302fc5d4c74c6787921/prepare-for-release.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/11ec8988fe94d293e5a0445ad1a3370b#file-prepare-for-release-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          prepare-for-release.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>Here our trigger is a closing Pull Request and we also make sure this is a merged pull request (line 9).  From then on, we have a single job again.  It&#8217;s a bit more complex, but most of it is familiar &#8211; checkout, yarn, test, lint.  </p>



<p>Now the build is a bit different (lines 51 to 53).  Here we don&#8217;t want to build all the libraries &#8211; just those that we need to update. In other words, we would like to update only the libraries that were <code>affected</code> by the changes in this Pull Request. </p>



<p>The command: <code>yarn nx affected:build --prod --with-deps --base=main</code> does exactly that for us.  Nx has a dependency graph of all our libraries and applications in the repository.  It then gets the changed libraries between <code>main</code> and the PR&#8217;s commit and the libraries that are dependent on them.  It then builds them because that is what we asked Nx to do: <code>nx affected:build</code>.</p>



<p>The rest of the code raises a version and pushes the version change to main as well as tag the new head of the main branch.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_CD_Process"></span>The CD Process<span class="ez-toc-section-end"></span></h3>



<p>The code is merged and a version was raised. Now it is time to publish and deploy.  For this, we have two files &#8211; one to publish and another to deploy our demo app.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Deploy_the_Demo"></span>Deploy the Demo<span class="ez-toc-section-end"></span></h4>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111877649" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-deploy-demo-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="deploy-demo.yml content, created by YonatanKra on 06:58PM on September 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="deploy-demo.yml">
        <tr>
          <td id="file-deploy-demo-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-deploy-demo-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Deploy Demo Site</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-deploy-demo-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-deploy-demo-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-deploy-demo-yml-LC4" class="blob-code blob-code-inner js-file-line">  push:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-deploy-demo-yml-LC5" class="blob-code blob-code-inner js-file-line">    tags:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-deploy-demo-yml-LC6" class="blob-code blob-code-inner js-file-line">      - v*</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-deploy-demo-yml-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-deploy-demo-yml-LC8" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-deploy-demo-yml-LC9" class="blob-code blob-code-inner js-file-line">  deploy:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-deploy-demo-yml-LC10" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-deploy-demo-yml-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-deploy-demo-yml-LC12" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-deploy-demo-yml-LC13" class="blob-code blob-code-inner js-file-line">      - name: Checkout</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-deploy-demo-yml-LC14" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-deploy-demo-yml-LC15" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-deploy-demo-yml-LC16" class="blob-code blob-code-inner js-file-line">          fetch-depth: 0</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-deploy-demo-yml-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-deploy-demo-yml-LC18" class="blob-code blob-code-inner js-file-line">      - name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-deploy-demo-yml-LC19" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v1</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-deploy-demo-yml-LC20" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-deploy-demo-yml-LC21" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-deploy-demo-yml-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-deploy-demo-yml-LC23" class="blob-code blob-code-inner js-file-line">      - name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-deploy-demo-yml-LC24" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-deploy-demo-yml-LC25" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-deploy-demo-yml-LC26" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-deploy-demo-yml-LC27" class="blob-code blob-code-inner js-file-line">      - name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-deploy-demo-yml-LC28" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-deploy-demo-yml-LC29" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-deploy-demo-yml-LC30" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-deploy-demo-yml-LC31" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-deploy-demo-yml-LC32" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-deploy-demo-yml-LC33" class="blob-code blob-code-inner js-file-line">            **\node_modules</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-deploy-demo-yml-LC34" class="blob-code blob-code-inner js-file-line">          key: ${{ runner.os }}-yarn-${{ hashFiles(&#39;**/yarn.lock&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-deploy-demo-yml-LC35" class="blob-code blob-code-inner js-file-line">          restore-keys: |</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-deploy-demo-yml-LC36" class="blob-code blob-code-inner js-file-line">            ${{ runner.os }}-yarn-</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-deploy-demo-yml-LC37" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-deploy-demo-yml-LC38" class="blob-code blob-code-inner js-file-line">      - name: Install dependencies</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-deploy-demo-yml-LC39" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-deploy-demo-yml-LC40" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-deploy-demo-yml-LC41" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-deploy-demo-yml-LC42" class="blob-code blob-code-inner js-file-line">      - name: Build Demo</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-deploy-demo-yml-LC43" class="blob-code blob-code-inner js-file-line">        run: yarn build:deploy</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-deploy-demo-yml-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-deploy-demo-yml-LC45" class="blob-code blob-code-inner js-file-line">      - name: Deploy 🚀</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-deploy-demo-yml-LC46" class="blob-code blob-code-inner js-file-line">        uses: JamesIves/github-pages-deploy-action@3.7.1</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-deploy-demo-yml-LC47" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-deploy-demo-yml-LC48" class="blob-code blob-code-inner js-file-line">          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-deploy-demo-yml-LC49" class="blob-code blob-code-inner js-file-line">          BRANCH: gh-pages # The branch the action should deploy to.</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-deploy-demo-yml-LC50" class="blob-code blob-code-inner js-file-line">          FOLDER: dist/apps/angular-vivid # The folder the action should deploy.</td>
        </tr>
        <tr>
          <td id="file-deploy-demo-yml-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-deploy-demo-yml-LC51" class="blob-code blob-code-inner js-file-line">          CLEAN: true # Automatically remove deleted files from the deploy branch</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/7238e994ba0327e6e9ae1a23ff626eed/raw/b07c9b77401c49f91d66f0f0199b402485626349/deploy-demo.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/7238e994ba0327e6e9ae1a23ff626eed#file-deploy-demo-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          deploy-demo.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This code is quite similar to what we saw so far.  We have a trigger at the top &#8211; this time, a tag that starts with <code>v</code> (meaning, we have a new version tag). We then checkout, install, build and deploy.  In our case, we deploy the demo to github pages. You could also deploy it anywhere else (AWS, heroku, GCP etc.).</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Publish_to_NPM"></span>Publish to NPM<span class="ez-toc-section-end"></span></h4>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111877685" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-publish-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="publish.yml content, created by YonatanKra on 07:03PM on September 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="publish.yml">
        <tr>
          <td id="file-publish-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-publish-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Publish</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-publish-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-publish-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-publish-yml-LC4" class="blob-code blob-code-inner js-file-line">  push:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-publish-yml-LC5" class="blob-code blob-code-inner js-file-line">    tags:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-publish-yml-LC6" class="blob-code blob-code-inner js-file-line">      - v*</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-publish-yml-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-publish-yml-LC8" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-publish-yml-LC9" class="blob-code blob-code-inner js-file-line">  publish:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-publish-yml-LC10" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-publish-yml-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-publish-yml-LC12" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-publish-yml-LC13" class="blob-code blob-code-inner js-file-line">      - name: Checkout</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-publish-yml-LC14" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-publish-yml-LC15" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-publish-yml-LC16" class="blob-code blob-code-inner js-file-line">          fetch-depth: 0</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-publish-yml-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-publish-yml-LC18" class="blob-code blob-code-inner js-file-line">      - name: Get the two latest versions</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-publish-yml-LC19" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-publish-yml-LC20" class="blob-code blob-code-inner js-file-line">          CURRENT_VERSION=$(git tag -l &quot;v*&quot; --sort=-version:refname | head -n 1)</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-publish-yml-LC21" class="blob-code blob-code-inner js-file-line">          LAST_VERSION=$(git tag -l &quot;v*&quot; --sort=-version:refname | head -n 2 | awk &#39;NR == 2 { print $1 }&#39;)</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-publish-yml-LC22" class="blob-code blob-code-inner js-file-line">          echo &quot;current_version=$(echo $CURRENT_VERSION)&quot; &gt;&gt; $GITHUB_ENV</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-publish-yml-LC23" class="blob-code blob-code-inner js-file-line">          echo &quot;last_version=$(echo $LAST_VERSION)&quot; &gt;&gt; $GITHUB_ENV</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-publish-yml-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-publish-yml-LC25" class="blob-code blob-code-inner js-file-line">      - name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-publish-yml-LC26" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v1</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-publish-yml-LC27" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-publish-yml-LC28" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-publish-yml-LC29" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-publish-yml-LC30" class="blob-code blob-code-inner js-file-line">      - name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-publish-yml-LC31" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-publish-yml-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-publish-yml-LC33" class="blob-code blob-code-inner js-file-line">      - name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-publish-yml-LC34" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-publish-yml-LC35" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-publish-yml-LC36" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-publish-yml-LC37" class="blob-code blob-code-inner js-file-line">      - name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-publish-yml-LC38" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-publish-yml-LC39" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-publish-yml-LC40" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-publish-yml-LC41" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-publish-yml-LC42" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-publish-yml-LC43" class="blob-code blob-code-inner js-file-line">            **\node_modules</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-publish-yml-LC44" class="blob-code blob-code-inner js-file-line">          key: ${{ runner.os }}-yarn-${{ hashFiles(&#39;**/yarn.lock&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-publish-yml-LC45" class="blob-code blob-code-inner js-file-line">          restore-keys: |</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-publish-yml-LC46" class="blob-code blob-code-inner js-file-line">            ${{ runner.os }}-yarn-</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-publish-yml-LC47" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-publish-yml-LC48" class="blob-code blob-code-inner js-file-line">      - name: Install dependencies</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-publish-yml-LC49" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-publish-yml-LC50" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-publish-yml-LC51" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-publish-yml-LC52" class="blob-code blob-code-inner js-file-line">      - name: Build libraries</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-publish-yml-LC53" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-publish-yml-LC54" class="blob-code blob-code-inner js-file-line">          yarn nx affected:build --prod --base=$last_version --head=$current_version</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-publish-yml-LC55" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-publish-yml-LC56" class="blob-code blob-code-inner js-file-line">      - name: Publish components (Github packages)</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-publish-yml-LC57" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-publish-yml-LC58" class="blob-code blob-code-inner js-file-line">          for LIBRARY in $(yarn nx affected:libs --base=$last_version --head=$current_version --plain | awk &#39;NR &gt; 2 &amp;&amp; $1 != &quot;Done&quot; { print $1 }&#39;)</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-publish-yml-LC59" class="blob-code blob-code-inner js-file-line">          do</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-publish-yml-LC60" class="blob-code blob-code-inner js-file-line">            cd ./dist/libs/$LIBRARY</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-publish-yml-LC61" class="blob-code blob-code-inner js-file-line">            npm publish --registry https://npm.pkg.github.com --no-git-tag-version --no-push --yes</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-publish-yml-LC62" class="blob-code blob-code-inner js-file-line">            cd ..</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-publish-yml-LC63" class="blob-code blob-code-inner js-file-line">            cd ..</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-publish-yml-LC64" class="blob-code blob-code-inner js-file-line">          done</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-publish-yml-LC65" class="blob-code blob-code-inner js-file-line">        env:</td>
        </tr>
        <tr>
          <td id="file-publish-yml-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-publish-yml-LC66" class="blob-code blob-code-inner js-file-line">          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e93080f01e42ff1c785da8bd3773cf7c/raw/ef2fa368b92a61f6a55ca0e9f2b98a5dfab60433/publish.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e93080f01e42ff1c785da8bd3773cf7c#file-publish-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          publish.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This step starts much the same as the other deployment. Triggered by a version tag, it starts the job but also runs <code>Get the two latest versions</code> which does exactly what it says it does. </p>



<p>In lines 54-52 it builds the affected libraries between the two version tags.  That means, we build only what we need to, just like we did in the <code>prepare-for-release</code> workflow.</p>



<p>Now comes the publish part (lines 56-66).  We run the affected command, only this time we get its output as text. Line 58 starts a loop that goes over every <code>affected</code> library.  Inside the loop we <code>cd</code> into each library (line 59) and then publish it (line 60).</p>



<p>That finalizes the whole CI/CD flow of our NPM modules and our demo app.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Nx is a very powerful tool.  The CI/CD example above is just a fraction of what Nx gives you.  </p>



<p>In the article we saw how easy it is to create ready-to-publish libraries (with the <code>--publishable</code> flag) and how easy it is to find libraries (and applications) that were affected by certain commits using the <code>affected</code> command.</p>



<p>The techniques in this article can be used not only for NPM modules.  You can use them for microservices, so the flow is kind of the same, only the end is not <code>npm publish</code> but an AWS or some other cloud provider&#8217;s CLI command to deploy your service.</p>



<p>Nx also comes with other very useful tools for CI/CD and standardisation.  One of them is the Nx cloud service which helps you with caching builds and tests.  This speeds up CI/CD as well as development processes. </p>



<p>I urge you to check out Nx if you haven&#8217;t so far.</p>



<p>Nx had a great conference with all the content free to watch on YouTube:</p>



<p><strong>Day 1 link:&nbsp;</strong><a rel="noreferrer noopener" href="https://go.nrwl.io/e3t/Btc/5A+113/ckwDt04/VWVKY25rjVmvW3xBDs75h-8wvW8fXtNV4xDBYbN6-TNZr3q3n5V1-WJV7CgSMfW6Sff8g83pbwrW6ycz2P1939gMW5nCfkx5mNl6fW2LXRv966gnRYW36L9pQ6N53TvW6hsTQj1_RmPdW86HDh894jRJwW7qRzTc3s5sNJV-dd3G7gY3GRW1Sn5S1380sgfW3hx89z8p515zMClvBP-dC4jW5J70VR83zy0KW98ClWt8QsxTvN9hWcKshcPvQW8_2pbH1Yvgp-N5-x1sqhP4TbW4st_HW5ztRc7W9bxGCc8lw8dxN4ywHF1lQ9gC38-Z1" target="_blank">https://youtu.be/oG2QbFquraA<br></a><strong>Day 2 link:</strong>&nbsp;<a rel="noreferrer noopener" href="https://go.nrwl.io/e3t/Btc/5A+113/ckwDt04/VWVKY25rjVmvW3xBDs75h-8wvW8fXtNV4xDBYbN6-TNZr3q3n5V1-WJV7CgHP3W8l6VXY2kSJ6FW3W8Xn_2BCMRjW46rbY-7pfmSDVqC-pG79SqZzW3rsCyZ1GCfNrVgYyct3_F2yjW2_xHlh9g7MYRW5GsPqZ3xL_lzW3gN6t25Dgp27W4Y0lWs23J9rPW32jnVL47t8ZMW2Tnxtc3tth4kW82G7dc7KgX9vW71cbBv8VGDvDW5V5hVN1-z6q9W7MRhgJ58n9r6W90MVjF4vbg7TVN22Lw4LT-chW5hLDnk12rH4qW1WHB6l8zwlTt395q1" target="_blank">https://youtu.be/hlGOaGDsWKg</a></p>



<p>Would love to hear/read your feedback about your usage of Nx.</p>

