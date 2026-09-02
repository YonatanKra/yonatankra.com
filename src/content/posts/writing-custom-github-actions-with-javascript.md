---
title: Writing Custom Github Actions with Javascript
slug: writing-custom-github-actions-with-javascript
published: 2020-06-27T18:25:07
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: Lately I’ve been involved with an Open Source project called AskQL. I really like the project, try to contribute as much as I can and learn a lot in the process. One of the issues there was to enforce conventional commit names. This looked pretty easy – there must be tons of github actions in [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
tags: []
canonical: https://yonatankra.com/writing-custom-github-actions-with-javascript/
comments: []
---


<p>Lately I&#8217;ve been involved with an Open Source project called <a rel="noreferrer noopener" href="https://github.com/xFAANG/askql" target="_blank">AskQL</a>. I really like the project, try to contribute as much as I can and learn a lot in the process.</p>



<p>One of the issues there was <a rel="noreferrer noopener" href="https://github.com/xFAANG/askql/issues/180" target="_blank">to enforce conventional commit names</a>. </p>



<p>This looked pretty easy &#8211; there must be tons of github actions in the <a rel="noreferrer noopener" href="https://github.com/marketplace?type=actions" target="_blank">marketplace </a>for it, right?</p>



<p>If you don&#8217;t know what github actions are here&#8217;s a one liner that should explain it: </p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>Github actions are a group of instructions set in <code>yaml</code> files that are being ran on certain conditions like commit, push, pull request etc.</p><cite>It might come out as a two liner &#8211; depending on your screen resolution 😉</cite></blockquote>



<p>I googled and found several such actions. They all looked promising and I immediately implemented the first one I found.</p>



<p>It seemed relatively easy: just add a yaml file with the given example and it should work out of the box!</p>



<pre class="wp-block-code"><code>name: "Lint PR"
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v1.2.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}</code></pre>



<p>The <code>yaml</code> file above is pretty simple. The procedure <strong>name </strong>is &#8220;Lint PR&#8221;. It fires <strong>on </strong>pull request open, edit and synchronize. </p>



<p>It eventually just needs to <strong>run on</strong> ubuntu and <strong>uses </strong>the github action from the marketplace with GITHUB_TOKEN as an environment variable.</p>



<p>Easy, right?</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1dc484e6" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1dc484e6"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/writing-custom-github-actions-with-javascript/#Aw_Snap" >Aw, Snap!</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/writing-custom-github-actions-with-javascript/#DIY_script" >DIY script</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/writing-custom-github-actions-with-javascript/#1_Get_the_PR_Title" >#1 Get the PR Title</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/writing-custom-github-actions-with-javascript/#2_Throwing_an_error_during_the_CI" >#2 Throwing an error during the CI</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/writing-custom-github-actions-with-javascript/#3_Setting_up_the_yaml_file" >#3 Setting up the yaml file</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/writing-custom-github-actions-with-javascript/#Summary_and_Future_plans" >Summary and Future plans</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Aw_Snap"></span>Aw, Snap!<span class="ez-toc-section-end"></span></h2>



<p>Well&#8230; seems like it works &#8211; if you are not working Open Source style.  That is &#8211; if you are not working with forks.</p>



<p>Let me explain &#8211; the GITHUB_TOKEN is available only if you create a Pull Request directly from the main repository.  If you are creating a Pull Request from a fork (as in most Open Source projects), GITHUB_TOKEN is not available.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="494" height="140" src="/wp-content/uploads/2020/06/image.png" alt="" class="wp-image-383" srcset="/wp-content/uploads/2020/06/image.png 494w, /wp-content/uploads/2020/06/image.png 300w, /wp-content/uploads/2020/06/image.png 268w" sizes="auto, (max-width: 494px) 100vw, 494px" /><figcaption>Figure 1: The error I got when trying to use the existing PR linters in the marketplace</figcaption></figure></div>



<p>It&#8217;s a well known issue, summarized nicely in this post: <a href="https://github.community/t/github-actions-are-severely-limited-on-prs/18179/8" target="_blank" rel="noreferrer noopener">https://github.community/t/github-actions-are-severely-limited-on-prs/18179/8</a></p>



<p>So how does one lint the Pull Requests?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="DIY_script"></span>DIY script<span class="ez-toc-section-end"></span></h2>



<p>It&#8217;s time to do the wrong thing &#8211; write my own script. </p>



<p>Because we wanted to use conventional commits, I turned to <code>npm</code>. </p>



<p>A quick search found this really nice library called <a rel="noreferrer noopener" href="https://github.com/conventional-changelog/commitlint" target="_blank">commitlint</a>. </p>



<p>This library can lint a PR according to <a rel="noreferrer noopener" href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank">conventional commit standards</a>. I created a simple script that gets a title and makes sure it is a valid conventional commit:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist103995370" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-lintpr-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="lintpr.js content, created by YonatanKra on 09:24AM on June 27, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="lintpr.js">
        <tr>
          <td id="file-lintpr-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-lintpr-js-LC1" class="blob-code blob-code-inner js-file-line">const load = require(&#39;@commitlint/load&#39;).default;</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-lintpr-js-LC2" class="blob-code blob-code-inner js-file-line">const lint = require(&#39;@commitlint/lint&#39;).default;</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-lintpr-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-lintpr-js-LC4" class="blob-code blob-code-inner js-file-line">const CONFIG = {</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-lintpr-js-LC5" class="blob-code blob-code-inner js-file-line">  extends: [&#39;@commitlint/config-conventional&#39;],</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-lintpr-js-LC6" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-lintpr-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-lintpr-js-LC8" class="blob-code blob-code-inner js-file-line">function buildLintError(lintErrors) {</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-lintpr-js-LC9" class="blob-code blob-code-inner js-file-line">  return lintErrors.map((error) =&gt; error.message);</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-lintpr-js-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-lintpr-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-lintpr-js-LC12" class="blob-code blob-code-inner js-file-line">export async function testTitle(title) {</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-lintpr-js-LC13" class="blob-code blob-code-inner js-file-line">  const lintOptions = await load(CONFIG);</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-lintpr-js-LC14" class="blob-code blob-code-inner js-file-line">  const lintResult = await lint(</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-lintpr-js-LC15" class="blob-code blob-code-inner js-file-line">    title,</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-lintpr-js-LC16" class="blob-code blob-code-inner js-file-line">    lintOptions.rules,</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-lintpr-js-LC17" class="blob-code blob-code-inner js-file-line">    lintOptions.parserPreset ? lintOptions.parserPreset : {}</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-lintpr-js-LC18" class="blob-code blob-code-inner js-file-line">  );</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-lintpr-js-LC19" class="blob-code blob-code-inner js-file-line">  if (!lintResult.valid) {</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-lintpr-js-LC20" class="blob-code blob-code-inner js-file-line">    throw new Error(buildLintError(lintResult.errors));</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-lintpr-js-LC21" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-lintpr-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-lintpr-js-LC22" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/b4baa9c7e62acd6b88c2db7ad6268a28/raw/8734256cf1c3ab750aabbc53f522aec5c45686f1/lintpr.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/b4baa9c7e62acd6b88c2db7ad6268a28#file-lintpr-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          lintpr.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This script works pretty well locally. To make it work in a github action we&#8217;re going to need 3 more things.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="1_Get_the_PR_Title"></span>#1 Get the PR Title <span class="ez-toc-section-end"></span></h3>



<p>Github actions has a really nice <a rel="noreferrer noopener" href="https://github.com/actions/toolkit" target="_blank">SDK</a> one can use to get all the data and processes one needs in order to build a fully-fledged CI/CD.</p>



<p>Using <code>@actions/github</code> gives us access to the data we need. Let&#8217;s use it in our code:</p>



<!-- Invalid Gist ID -->



<p>Our code gets the title of the PR and verifies it is a valid conventional commit. Hooray!</p>



<p>Now we are missing 2 more things.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="2_Throwing_an_error_during_the_CI"></span>#2 Throwing an error during the CI<span class="ez-toc-section-end"></span></h3>



<p>Github actions has us covered here as well. Using the <code>@actions/core</code> library we can easily set the CI status to failed:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist103995450" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-usetesttitle-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="useTestTitle.js content, created by YonatanKra on 09:36AM on June 27, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="useTestTitle.js">
        <tr>
          <td id="file-usetesttitle-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-usetesttitle-js-LC1" class="blob-code blob-code-inner js-file-line">const { testTitle } = require(&#39;./lintPR&#39;);</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-usetesttitle-js-LC2" class="blob-code blob-code-inner js-file-line">const github = require(&#39;@actions/github&#39;);</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-usetesttitle-js-LC3" class="blob-code blob-code-inner js-file-line">const core = require(&#39;@actions/core&#39;);</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-usetesttitle-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-usetesttitle-js-LC5" class="blob-code blob-code-inner js-file-line">function getTitle() {</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-usetesttitle-js-LC6" class="blob-code blob-code-inner js-file-line">  return github.context.payload.pull_request.title;</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-usetesttitle-js-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-usetesttitle-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-usetesttitle-js-LC9" class="blob-code blob-code-inner js-file-line">async function run() {</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-usetesttitle-js-LC10" class="blob-code blob-code-inner js-file-line">  await testTitle(getTitle());</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-usetesttitle-js-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-usetesttitle-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-usetesttitle-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-usetesttitle-js-LC13" class="blob-code blob-code-inner js-file-line">run().catch(e =&gt; core.setFailed(e));</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a3dd904048567faf0ee44f968c598e92/raw/8b72eaa050a50d7df9fe2be2eee36c45d1a503d2/useTestTitle.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a3dd904048567faf0ee44f968c598e92#file-usetesttitle-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          useTestTitle.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p class="has-text-align-center"><em>Adding core.setFailed on line 13 to notify the CI process it should fail</em></p>
</div></div>



<p>This small addition will set this job&#8217;s status to failed so our CI will fail if our title is invalid. </p>



<p>And now for the final piece of the puzzle.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="3_Setting_up_the_yaml_file"></span>#3 Setting up the yaml file<span class="ez-toc-section-end"></span></h3>



<p>This part can be a bit tricky. Eventually, we need to clone our repository (because we put our script in it) and install the needed dependnecies (@actions/core, @actions/github, @commitlint/config-conventional, @commitlint/load and @commitlint/lint). </p>



<p>After these two steps are done, we can move on to actually running our script.</p>



<p>Here&#8217;s the <code>yaml</code> file for this task:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist103995516" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-pr-lint-yaml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="pr-lint.yaml content, created by YonatanKra on 09:45AM on June 27, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="pr-lint.yaml">
        <tr>
          <td id="file-pr-lint-yaml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-pr-lint-yaml-LC1" class="blob-code blob-code-inner js-file-line">name: &quot;Lint PR&quot;</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-pr-lint-yaml-LC2" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-pr-lint-yaml-LC3" class="blob-code blob-code-inner js-file-line">  pull_request:</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-pr-lint-yaml-LC4" class="blob-code blob-code-inner js-file-line">    types:</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-pr-lint-yaml-LC5" class="blob-code blob-code-inner js-file-line">      - opened</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-pr-lint-yaml-LC6" class="blob-code blob-code-inner js-file-line">      - edited</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-pr-lint-yaml-LC7" class="blob-code blob-code-inner js-file-line">      - synchronize</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-pr-lint-yaml-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-pr-lint-yaml-LC9" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-pr-lint-yaml-LC10" class="blob-code blob-code-inner js-file-line">  main:</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-pr-lint-yaml-LC11" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-pr-lint-yaml-LC12" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-pr-lint-yaml-LC13" class="blob-code blob-code-inner js-file-line">      - uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-pr-lint-yaml-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-pr-lint-yaml-LC15" class="blob-code blob-code-inner js-file-line">      - name: Install dependencies</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-pr-lint-yaml-LC16" class="blob-code blob-code-inner js-file-line">        run: npm install @actions/core @actions/github @commitlint/config-conventional @commitlint/lint @commitlint/load</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-pr-lint-yaml-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-pr-lint-yaml-LC18" class="blob-code blob-code-inner js-file-line">      - name: Checks the PR title</td>
        </tr>
        <tr>
          <td id="file-pr-lint-yaml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-pr-lint-yaml-LC19" class="blob-code blob-code-inner js-file-line">        run: node ./scripts/useTestTitle</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e235873895b4a814119d5d2ebd36e1ff/raw/394e8e7d0ab33faf42c4704a613047e31e3f99eb/pr-lint.yaml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e235873895b4a814119d5d2ebd36e1ff#file-pr-lint-yaml" class="Link--inTextBlock" target="_blank" rel="noopener">
          pr-lint.yaml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>Again &#8211; very simple. Checkout, install npm dependencies and run our script.</p>



<p>And it appears to be working! Figure 2 shows what happens with an invalid PR title, while Figure 3 shows the results of a valid one.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="239" src="/wp-content/uploads/2020/06/image-1.png" alt="" class="wp-image-389" srcset="/wp-content/uploads/2020/06/image-1.png 997w, /wp-content/uploads/2020/06/image-1.png 300w, /wp-content/uploads/2020/06/image-1.png 768w, /wp-content/uploads/2020/06/image-1.png 241w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 2: The results of trying to change the title to &#8220;foo(ci): enforcing conventional commits&#8221;</figcaption></figure>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="322" height="245" src="/wp-content/uploads/2020/06/image-3.png" alt="" class="wp-image-391" srcset="/wp-content/uploads/2020/06/image-3.png 322w, /wp-content/uploads/2020/06/image-3.png 300w, /wp-content/uploads/2020/06/image-3.png 118w" sizes="auto, (max-width: 322px) 100vw, 322px" /><figcaption>Figure 3: The results of changing the title to &#8220;feat(ci): enforcing conventional commits&#8221;</figcaption></figure></div>



<p>I guess that means mission accomplished right? Hooray!</p>



<p>You can view the PR here: <a href="https://github.com/xFAANG/askql/pull/230/files" target="_blank" rel="noopener">https://github.com/xFAANG/askql/pull/230/files</a></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary_and_Future_plans"></span>Summary and Future plans<span class="ez-toc-section-end"></span></h2>



<p>This task was really nice. I learned something new about github actions in addition to using new libraries I also didn&#8217;t know about before. All in all &#8211; a great day!</p>



<p>The issue that got me a-searching was that the marketplace actions did not work out of the box. The cause was GITHUB_TOKEN not being available for PR&#8217;s that are coming from forks.</p>



<p>I eventually wrote a script and ran it inside my own action &#8211; and just created the solution we needed for the project.</p>



<p>A future improvement would be to create the <code>useTestTitle</code> as a package. This way, the github action using it would not need to install the dependencies (which take most of its run time). From there &#8211; why not just turn this code to an official action in the marketplace?</p>



<p>Hope you enjoyed the article 🙂</p>



<p>Thanks a lot for this article reviewer <a rel="noreferrer noopener" href="https://www.linkedin.com/in/michael-k-ab673b135/" target="_blank">MichalKutz</a>. </p>

