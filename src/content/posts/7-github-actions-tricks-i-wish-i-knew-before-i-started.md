---
title: 7 Github Actions Tricks I Wish I Knew Before I Started
slug: 7-github-actions-tricks-i-wish-i-knew-before-i-started
published: 2021-12-03T16:14:58
updated: 2023-09-12T04:46:03
author: Yonatan Kra
description: Here are 7 tricks with github actions that changed my life (or at least my CI/CD pipeline). These tricks helped me create a more maintainable workflows code as well as boosted performance of the whole CI/CD process. If you haven’t used github actions before, you can watch my talk on how to setup CI/CD with [&hellip;]
categories:
  - name: github actions
    slug: github-actions
    path: devops/github-actions
tags: []
canonical: https://yonatankra.com/7-github-actions-tricks-i-wish-i-knew-before-i-started/
comments:
  - author: Steve
    date: 2022-06-18T10:07:26
    content: |
      <p>Hey, I just started using github actions last week &#8230; that was a great article, really useful thanks 🙂</p>
  - author: Sara
    date: 2022-11-22T18:12:16
    content: |
      <p>Hello! Thanks for your article!<br />
      I&#8217;m having some issues understanding how you reuse the action defined in<a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718#file-build-and-lint-yml" target="_blank" rel="noopener nofollow ugc">build-and-lint.yml</a><br />
      Could you highlight a bit more how that is used?<br />
      Thanks</p>
  - author: ramsi
    date: 2023-01-16T18:06:16
    content: |
      <p>Awesome Info, Thanks a ton!!<br />
      I have a question: based on issue template approval, can we do npm install of the required package from package.json file and upload the artifact to jfrog registry? If so, please add that in your list as a tip. Many thanks</p>
  - author: Yonatan Kra
    date: 2023-01-19T06:39:59
    content: |
      <p>You sure can do it.<br />
      Just use the appropriate action. For instance, you can use the JFrog CLI in the flow with this action: <a href="https://github.com/marketplace/actions/setup-jfrog-cli" rel="nofollow ugc">https://github.com/marketplace/actions/setup-jfrog-cli</a></p>
  - author: Yonatan Kra
    date: 2023-01-19T06:46:37
    content: |
      <p>Hi Sara,<br />
      The first thing I do is setup `workflow_call` as the trigger.<br />
      Then, when I want to use this workflow, I use this line in any job:<br />
      `uses: vonage/vivid-3/.github/workflows/_lint-and-build.yml@main`<br />
      This tells the action to use the code inside `_lina-and-build.yml` from the branch `main`.<br />
      In the example I use it here: <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718#file-pre-release-yml-L13" rel="nofollow ugc">reusable workflow usage</a><br />
      Hope this clarifies it 🙂</p>
---


<p class="has-medium-font-size">Here are 7 tricks with github actions that changed my life (or at least my CI/CD pipeline). These tricks helped me create a more maintainable workflows code as well as boosted performance of the whole CI/CD process.</p>



<p>If you haven&#8217;t used github actions before, you can watch <a rel="noreferrer noopener" href="/how-to-setup-ci-cd-with-github-actions/" data-type="post" data-id="816" target="_blank">my talk on how to setup CI/CD with github actions</a>. This will get you up to speed real quick.</p>



<p>Now imagine you need to setup a massive CI/CD workflow. It starts with a Pull Request, which is usually the &#8220;first point of contact&#8221;. It then moves on to a <code>post merge</code> workflow. This <code>post merge</code> workflow splits into <code>deploy</code>, <code>sanity</code> or even multiple deployments. How would you trigger all of them? How would you synchronise them all? Github Actions triggers got you covered</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1bc119a8" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1bc119a8"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#1_How_to_Use_Github_Action_Triggers" >#1: How to Use Github Action Triggers</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#2_Reusable_Workflows_with_Workflow_Calls" >#2: Reusable Workflows with Workflow Calls</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#How_to_Use_Github_Actions_Matrix_to_Simplify_a_Flow" >How to Use Github Actions Matrix to Simplify a Flow?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#3_Speeding_the_Workflows_with_Caching_and_Artifacts" >#3: Speeding the Workflows with Caching and Artifacts</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#4_Parallelism_and_Synchronous_Operations" >#4: Parallelism and Synchronous Operations</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#5_Repository_Integration_Rules" >#5: Repository Integration Rules</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#6_Saving_Computation_Time_by_Stopping_Obsolete_Workflows" >#6: Saving Computation Time by Stopping Obsolete Workflows</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#7_Use_Your_Own_Docker_Image_in_Github_Actions" >#7: Use Your Own Docker Image in Github Actions</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="1_How_to_Use_Github_Action_Triggers"></span>#1: How to Use Github Action Triggers<span class="ez-toc-section-end"></span></h2>



<p>Triggers is what starts a workflow.  Here&#8217;s how it looks like:</p>



<pre class="wp-block-code"><code>name: Pull Request

on:
  pull_request:
    branches:
      - main</code></pre>



<p>The above code is pretty much self explanatory. The workflow will trigger on every pull request to the <code>main</code> branch.  Not only that, it will also trigger for any push to the branch that is initiating the pull request. </p>



<p>This is a good place to run your tests, linting and all the automated QA you can think of.</p>



<p>Now that we have our Pull Request covered, we&#8217;d like to handle the code after the integration:</p>



<pre class="wp-block-code"><code>on:
  push:
    branches:
      - main</code></pre>



<p>In the above code we trigger on <code>push</code> to main.  This will usually happen after a <code>pull request</code> was merged (see <a href="#repository_integration_rules" data-type="internal" data-id="#repository_integration_rules">Repository Integration Rules</a>).</p>



<p>What happens after we push to <code>main</code> ? That&#8217;s definitely up to you.  You can run sanity checks, setup a canary deployment, deploy a <code>next</code> version of your app and more. You can even walk on the edge and deploy a stable version if all tests pass and you have enough confidence.</p>



<p>You might not yet be confident enough in the process to deploy on push to main. In this case, you&#8217;d probably want to give the code some time to &#8220;cook&#8221; in <code>main</code> or <code>develop</code> before you release a stable release. You can create a manual trigger in order to receive input from the user:</p>



<pre class="wp-block-code"><code>on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to bump to'
        required: false</code></pre>



<p>Here we setup a workflow <code>manual dispatch</code> that accepts an input &#8220;version&#8221;.  This way, a user can manually trigger a version bump from the Github web interface! </p>



<p>You just head over to the &#8220;Actions&#8221; tab, select the relevant action and the UI will take you from there:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="216" src="/wp-content/uploads/2021/12/image-1.png" alt="" class="wp-image-1198" srcset="/wp-content/uploads/2021/12/image-1.png 1024w, /wp-content/uploads/2021/12/image-1.png 300w, /wp-content/uploads/2021/12/image-1.png 768w, /wp-content/uploads/2021/12/image-1.png 1536w, /wp-content/uploads/2021/12/image-1.png 266w, /wp-content/uploads/2021/12/image-1.png 1894w, /wp-content/uploads/2021/12/image-1.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>In the image we can see the &#8220;Run workflow&#8221; option (top-right). It opens a menu that allows us to add the input we&#8217;ve set in the workflow yml.</figcaption></figure></div>



<p>Our workflow works great but&#8230; now it triggers on EVERYTHING that&#8217;s happening in the pull request. </p>



<p>Another cool feature that solves hard cases is the ability to condition the triggers even further:</p>



<pre class="wp-block-code"><code>on:
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
      - ready_for_review
      - converted_to_draft
    branches:
      - main</code></pre>



<p>This code is the same example as the first, only now we state the <code>type</code> of pull request events we&#8217;d like to trigger our workflow for. </p>



<p>Another example is to listen to release tags:</p>



<pre class="wp-block-code"><code>on:
  push:
    tags:
      - v*</code></pre>



<p>Here we listen to tags that starts with the letter <code>v</code> as a convention to release tags.</p>



<p>You can find the full list of triggers and their API in the official documentation: <a href="https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows" target="_blank" rel="noopener">https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows</a></p>



<p>Another way is by using an <code>if</code> statement in the jobs themselves:</p>



<pre class="wp-block-code"><code>on:
  pull_request:
    types: &#91;closed]
    branches: &#91;main]

jobs:
  build-deploy-demo-dev:
    runs-on: ubuntu-18.04
    if: github.event.pull_request.merged == true</code></pre>



<p>Here we trigger on the PR&#8217;s close event. The job itself is fine tuning it a bit more &#8211; we&#8217;d like to trigger this for closed PRs, but only those with <code>merged</code> status.</p>



<p>Another conditional can be to not trigger certain jobs for <code>drafts</code>:</p>



<pre class="wp-block-code"><code>if: github.event.pull_request.draft == false</code></pre>



<p>This will save us valuable computation time (and if you are a green person &#8211; also cut the CO2 emissions). I mean, if we set the PR as a draft, there&#8217;s no need to run all the heavy tests on it, right? Maybe just build and deploy a demo would suffice for a draft&#8230;</p>



<p>Armed with these tools, you can set the trigger to fit your need and build a full CI/CD flow (or actually, any automation). For instance, you can build iOS apps even if you do not have a Mac (by using a MacOS machine with a manual trigger).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="2_Reusable_Workflows_with_Workflow_Calls"></span>#2: Reusable Workflows with Workflow Calls<span class="ez-toc-section-end"></span></h2>



<p>Triggers are great, but this one gets a full title of its own.  </p>



<p>Now let&#8217;s say you&#8217;ve created a build process. You also create a test process.  Now &#8211; you&#8217;d like to run the build and the tests for 3 browsers &#8211; chrome, firefox and Safari.  The catch? Safari runs only on MacOS. Darn&#8230;</p>



<p>So&#8230; you spin up 3 MacOS machines. You notice 2 things:</p>



<ol class="wp-block-list"><li>MacOS machines are much slower and also their internet connection is much slower</li><li>MacOS machines are much more expensive and your devops ppl (or your finance team) are sending you nice (or rather polite) emails about over-quota (real story).</li></ol>



<p>In addition, you need the test coverage only from the chrome run. </p>



<p>I think you got the gist of it &#8211; it can be complex.</p>



<p>So&#8230; you create 3 different jobs &#8211; one for each browser. Lots of code, not nice (you don&#8217;t really have to read the code &#8211; just get that it is long and not &#8220;nice&#8221;):</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113369496" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-compile-and-test-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-text  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="compile-and-test-yml content, created by YonatanKra on 12:18PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="compile-and-test-yml">
        <tr>
          <td id="file-compile-and-test-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-compile-and-test-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Compile &amp; Test</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-compile-and-test-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-compile-and-test-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-compile-and-test-yml-LC4" class="blob-code blob-code-inner js-file-line">  pull_request:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-compile-and-test-yml-LC5" class="blob-code blob-code-inner js-file-line">    branches:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-compile-and-test-yml-LC6" class="blob-code blob-code-inner js-file-line">      &#8211; master</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-compile-and-test-yml-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-compile-and-test-yml-LC8" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-compile-and-test-yml-LC9" class="blob-code blob-code-inner js-file-line">  cache-yarn-and-build:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-compile-and-test-yml-LC10" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-compile-and-test-yml-LC11" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-compile-and-test-yml-LC12" class="blob-code blob-code-inner js-file-line">      ARTIFACTORY_AUTH_TOKEN: ${{ secrets.ARTIFACTORY_AUTH_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-compile-and-test-yml-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-compile-and-test-yml-LC14" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-compile-and-test-yml-LC15" class="blob-code blob-code-inner js-file-line">      &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-compile-and-test-yml-LC16" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-compile-and-test-yml-LC17" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-compile-and-test-yml-LC18" class="blob-code blob-code-inner js-file-line">          token: ${{ secrets.PAT }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-compile-and-test-yml-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-compile-and-test-yml-LC20" class="blob-code blob-code-inner js-file-line">      &#8211; name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-compile-and-test-yml-LC21" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-compile-and-test-yml-LC22" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-compile-and-test-yml-LC23" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-compile-and-test-yml-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-compile-and-test-yml-LC25" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-compile-and-test-yml-LC26" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-compile-and-test-yml-LC27" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-compile-and-test-yml-LC28" class="blob-code blob-code-inner js-file-line">      &#8211; name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-compile-and-test-yml-LC29" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-compile-and-test-yml-LC30" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-compile-and-test-yml-LC31" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-compile-and-test-yml-LC32" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-compile-and-test-yml-LC33" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-compile-and-test-yml-LC34" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-compile-and-test-yml-LC35" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-compile-and-test-yml-LC36" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-compile-and-test-yml-LC37" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-compile-and-test-yml-LC38" class="blob-code blob-code-inner js-file-line">            **/node_modules</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-compile-and-test-yml-LC39" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-yarn-${{ hashFiles(&#39;**/package.json&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-compile-and-test-yml-LC40" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-compile-and-test-yml-LC41" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install packages</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-compile-and-test-yml-LC42" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-compile-and-test-yml-LC43" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-compile-and-test-yml-LC44" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-compile-and-test-yml-LC45" class="blob-code blob-code-inner js-file-line">      &#8211; name: Build components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-compile-and-test-yml-LC46" class="blob-code blob-code-inner js-file-line">        run: yarn compile</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-compile-and-test-yml-LC47" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-compile-and-test-yml-LC48" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-compile-and-test-yml-LC49" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-compile-and-test-yml-LC50" class="blob-code blob-code-inner js-file-line">        id: build-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-compile-and-test-yml-LC51" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-compile-and-test-yml-LC52" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-compile-and-test-yml-LC53" class="blob-code blob-code-inner js-file-line">            common</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-compile-and-test-yml-LC54" class="blob-code blob-code-inner js-file-line">            components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-compile-and-test-yml-LC55" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-build-${{ github.event.pull_request.head.sha }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-compile-and-test-yml-LC56" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-compile-and-test-yml-LC57" class="blob-code blob-code-inner js-file-line">  test-safari:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-compile-and-test-yml-LC58" class="blob-code blob-code-inner js-file-line">    needs: cache-yarn-and-build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-compile-and-test-yml-LC59" class="blob-code blob-code-inner js-file-line">    runs-on: macOS-latest</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-compile-and-test-yml-LC60" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-compile-and-test-yml-LC61" class="blob-code blob-code-inner js-file-line">      ARTIFACTORY_AUTH_TOKEN: ${{ secrets.ARTIFACTORY_AUTH_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-compile-and-test-yml-LC62" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-compile-and-test-yml-LC63" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-compile-and-test-yml-LC64" class="blob-code blob-code-inner js-file-line">      &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-compile-and-test-yml-LC65" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-compile-and-test-yml-LC66" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-compile-and-test-yml-LC67" class="blob-code blob-code-inner js-file-line">          token: ${{ secrets.PAT }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-compile-and-test-yml-LC68" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-compile-and-test-yml-LC69" class="blob-code blob-code-inner js-file-line">      &#8211; name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-compile-and-test-yml-LC70" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-compile-and-test-yml-LC71" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-compile-and-test-yml-LC72" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-compile-and-test-yml-LC73" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-compile-and-test-yml-LC74" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-compile-and-test-yml-LC75" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-compile-and-test-yml-LC76" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-compile-and-test-yml-LC77" class="blob-code blob-code-inner js-file-line">      &#8211; name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-compile-and-test-yml-LC78" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-compile-and-test-yml-LC79" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-compile-and-test-yml-LC80" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-compile-and-test-yml-LC81" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-compile-and-test-yml-LC82" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-compile-and-test-yml-LC83" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-compile-and-test-yml-LC84" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-compile-and-test-yml-LC85" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-compile-and-test-yml-LC86" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-compile-and-test-yml-LC87" class="blob-code blob-code-inner js-file-line">            **/node_modules</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-compile-and-test-yml-LC88" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-yarn-${{ hashFiles(&#39;**/package.json&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-compile-and-test-yml-LC89" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-compile-and-test-yml-LC90" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install packages</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-compile-and-test-yml-LC91" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-compile-and-test-yml-LC92" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-compile-and-test-yml-LC93" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-compile-and-test-yml-LC94" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-compile-and-test-yml-LC95" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-compile-and-test-yml-LC96" class="blob-code blob-code-inner js-file-line">        id: build-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-compile-and-test-yml-LC97" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-compile-and-test-yml-LC98" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-compile-and-test-yml-LC99" class="blob-code blob-code-inner js-file-line">            common</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-compile-and-test-yml-LC100" class="blob-code blob-code-inner js-file-line">            components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-compile-and-test-yml-LC101" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-build-${{ github.event.pull_request.head.sha }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-compile-and-test-yml-LC102" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-compile-and-test-yml-LC103" class="blob-code blob-code-inner js-file-line">      &#8211; name: Build components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-compile-and-test-yml-LC104" class="blob-code blob-code-inner js-file-line">        if: steps.build-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
          <td id="file-compile-and-test-yml-LC105" class="blob-code blob-code-inner js-file-line">        run: yarn compile</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
          <td id="file-compile-and-test-yml-LC106" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
          <td id="file-compile-and-test-yml-LC107" class="blob-code blob-code-inner js-file-line">      &#8211; name: Test components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
          <td id="file-compile-and-test-yml-LC108" class="blob-code blob-code-inner js-file-line">        run: yarn test:safari</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
          <td id="file-compile-and-test-yml-LC109" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
          <td id="file-compile-and-test-yml-LC110" class="blob-code blob-code-inner js-file-line">      &#8211; name: Upload Safari coverage as an artifact</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
          <td id="file-compile-and-test-yml-LC111" class="blob-code blob-code-inner js-file-line">        uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
          <td id="file-compile-and-test-yml-LC112" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
          <td id="file-compile-and-test-yml-LC113" class="blob-code blob-code-inner js-file-line">          name: safari-coverage</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
          <td id="file-compile-and-test-yml-LC114" class="blob-code blob-code-inner js-file-line">          path: ./coverage/report-cobertura/coverage.xml</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
          <td id="file-compile-and-test-yml-LC115" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
          <td id="file-compile-and-test-yml-LC116" class="blob-code blob-code-inner js-file-line">  test-firefox:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
          <td id="file-compile-and-test-yml-LC117" class="blob-code blob-code-inner js-file-line">    needs: cache-yarn-and-build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
          <td id="file-compile-and-test-yml-LC118" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
          <td id="file-compile-and-test-yml-LC119" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
          <td id="file-compile-and-test-yml-LC120" class="blob-code blob-code-inner js-file-line">      ARTIFACTORY_AUTH_TOKEN: ${{ secrets.ARTIFACTORY_AUTH_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
          <td id="file-compile-and-test-yml-LC121" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
          <td id="file-compile-and-test-yml-LC122" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
          <td id="file-compile-and-test-yml-LC123" class="blob-code blob-code-inner js-file-line">      &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
          <td id="file-compile-and-test-yml-LC124" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
          <td id="file-compile-and-test-yml-LC125" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
          <td id="file-compile-and-test-yml-LC126" class="blob-code blob-code-inner js-file-line">          token: ${{ secrets.PAT }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
          <td id="file-compile-and-test-yml-LC127" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
          <td id="file-compile-and-test-yml-LC128" class="blob-code blob-code-inner js-file-line">      &#8211; name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L129" class="blob-num js-line-number js-blob-rnum" data-line-number="129"></td>
          <td id="file-compile-and-test-yml-LC129" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L130" class="blob-num js-line-number js-blob-rnum" data-line-number="130"></td>
          <td id="file-compile-and-test-yml-LC130" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L131" class="blob-num js-line-number js-blob-rnum" data-line-number="131"></td>
          <td id="file-compile-and-test-yml-LC131" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L132" class="blob-num js-line-number js-blob-rnum" data-line-number="132"></td>
          <td id="file-compile-and-test-yml-LC132" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L133" class="blob-num js-line-number js-blob-rnum" data-line-number="133"></td>
          <td id="file-compile-and-test-yml-LC133" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L134" class="blob-num js-line-number js-blob-rnum" data-line-number="134"></td>
          <td id="file-compile-and-test-yml-LC134" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L135" class="blob-num js-line-number js-blob-rnum" data-line-number="135"></td>
          <td id="file-compile-and-test-yml-LC135" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L136" class="blob-num js-line-number js-blob-rnum" data-line-number="136"></td>
          <td id="file-compile-and-test-yml-LC136" class="blob-code blob-code-inner js-file-line">      &#8211; name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L137" class="blob-num js-line-number js-blob-rnum" data-line-number="137"></td>
          <td id="file-compile-and-test-yml-LC137" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L138" class="blob-num js-line-number js-blob-rnum" data-line-number="138"></td>
          <td id="file-compile-and-test-yml-LC138" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L139" class="blob-num js-line-number js-blob-rnum" data-line-number="139"></td>
          <td id="file-compile-and-test-yml-LC139" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L140" class="blob-num js-line-number js-blob-rnum" data-line-number="140"></td>
          <td id="file-compile-and-test-yml-LC140" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L141" class="blob-num js-line-number js-blob-rnum" data-line-number="141"></td>
          <td id="file-compile-and-test-yml-LC141" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L142" class="blob-num js-line-number js-blob-rnum" data-line-number="142"></td>
          <td id="file-compile-and-test-yml-LC142" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L143" class="blob-num js-line-number js-blob-rnum" data-line-number="143"></td>
          <td id="file-compile-and-test-yml-LC143" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L144" class="blob-num js-line-number js-blob-rnum" data-line-number="144"></td>
          <td id="file-compile-and-test-yml-LC144" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L145" class="blob-num js-line-number js-blob-rnum" data-line-number="145"></td>
          <td id="file-compile-and-test-yml-LC145" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L146" class="blob-num js-line-number js-blob-rnum" data-line-number="146"></td>
          <td id="file-compile-and-test-yml-LC146" class="blob-code blob-code-inner js-file-line">            **/node_modules</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L147" class="blob-num js-line-number js-blob-rnum" data-line-number="147"></td>
          <td id="file-compile-and-test-yml-LC147" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-yarn-${{ hashFiles(&#39;**/package.json&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L148" class="blob-num js-line-number js-blob-rnum" data-line-number="148"></td>
          <td id="file-compile-and-test-yml-LC148" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L149" class="blob-num js-line-number js-blob-rnum" data-line-number="149"></td>
          <td id="file-compile-and-test-yml-LC149" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install packages</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L150" class="blob-num js-line-number js-blob-rnum" data-line-number="150"></td>
          <td id="file-compile-and-test-yml-LC150" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L151" class="blob-num js-line-number js-blob-rnum" data-line-number="151"></td>
          <td id="file-compile-and-test-yml-LC151" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L152" class="blob-num js-line-number js-blob-rnum" data-line-number="152"></td>
          <td id="file-compile-and-test-yml-LC152" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L153" class="blob-num js-line-number js-blob-rnum" data-line-number="153"></td>
          <td id="file-compile-and-test-yml-LC153" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L154" class="blob-num js-line-number js-blob-rnum" data-line-number="154"></td>
          <td id="file-compile-and-test-yml-LC154" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L155" class="blob-num js-line-number js-blob-rnum" data-line-number="155"></td>
          <td id="file-compile-and-test-yml-LC155" class="blob-code blob-code-inner js-file-line">        id: build-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L156" class="blob-num js-line-number js-blob-rnum" data-line-number="156"></td>
          <td id="file-compile-and-test-yml-LC156" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L157" class="blob-num js-line-number js-blob-rnum" data-line-number="157"></td>
          <td id="file-compile-and-test-yml-LC157" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L158" class="blob-num js-line-number js-blob-rnum" data-line-number="158"></td>
          <td id="file-compile-and-test-yml-LC158" class="blob-code blob-code-inner js-file-line">            common</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L159" class="blob-num js-line-number js-blob-rnum" data-line-number="159"></td>
          <td id="file-compile-and-test-yml-LC159" class="blob-code blob-code-inner js-file-line">            components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L160" class="blob-num js-line-number js-blob-rnum" data-line-number="160"></td>
          <td id="file-compile-and-test-yml-LC160" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-build-${{ github.event.pull_request.head.sha }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L161" class="blob-num js-line-number js-blob-rnum" data-line-number="161"></td>
          <td id="file-compile-and-test-yml-LC161" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L162" class="blob-num js-line-number js-blob-rnum" data-line-number="162"></td>
          <td id="file-compile-and-test-yml-LC162" class="blob-code blob-code-inner js-file-line">      &#8211; name: Build components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L163" class="blob-num js-line-number js-blob-rnum" data-line-number="163"></td>
          <td id="file-compile-and-test-yml-LC163" class="blob-code blob-code-inner js-file-line">        if: steps.build-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L164" class="blob-num js-line-number js-blob-rnum" data-line-number="164"></td>
          <td id="file-compile-and-test-yml-LC164" class="blob-code blob-code-inner js-file-line">        run: yarn compile</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L165" class="blob-num js-line-number js-blob-rnum" data-line-number="165"></td>
          <td id="file-compile-and-test-yml-LC165" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L166" class="blob-num js-line-number js-blob-rnum" data-line-number="166"></td>
          <td id="file-compile-and-test-yml-LC166" class="blob-code blob-code-inner js-file-line">      &#8211; name: Test components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L167" class="blob-num js-line-number js-blob-rnum" data-line-number="167"></td>
          <td id="file-compile-and-test-yml-LC167" class="blob-code blob-code-inner js-file-line">        run: yarn test:firefox</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L168" class="blob-num js-line-number js-blob-rnum" data-line-number="168"></td>
          <td id="file-compile-and-test-yml-LC168" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L169" class="blob-num js-line-number js-blob-rnum" data-line-number="169"></td>
          <td id="file-compile-and-test-yml-LC169" class="blob-code blob-code-inner js-file-line">      &#8211; name: Upload firefox coverage as an artifact</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L170" class="blob-num js-line-number js-blob-rnum" data-line-number="170"></td>
          <td id="file-compile-and-test-yml-LC170" class="blob-code blob-code-inner js-file-line">        uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L171" class="blob-num js-line-number js-blob-rnum" data-line-number="171"></td>
          <td id="file-compile-and-test-yml-LC171" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L172" class="blob-num js-line-number js-blob-rnum" data-line-number="172"></td>
          <td id="file-compile-and-test-yml-LC172" class="blob-code blob-code-inner js-file-line">          name: firefox-coverage</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L173" class="blob-num js-line-number js-blob-rnum" data-line-number="173"></td>
          <td id="file-compile-and-test-yml-LC173" class="blob-code blob-code-inner js-file-line">          path: ./coverage/report-cobertura/coverage.xml</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L174" class="blob-num js-line-number js-blob-rnum" data-line-number="174"></td>
          <td id="file-compile-and-test-yml-LC174" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L175" class="blob-num js-line-number js-blob-rnum" data-line-number="175"></td>
          <td id="file-compile-and-test-yml-LC175" class="blob-code blob-code-inner js-file-line">  test-chrome:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L176" class="blob-num js-line-number js-blob-rnum" data-line-number="176"></td>
          <td id="file-compile-and-test-yml-LC176" class="blob-code blob-code-inner js-file-line">    needs: cache-yarn-and-build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L177" class="blob-num js-line-number js-blob-rnum" data-line-number="177"></td>
          <td id="file-compile-and-test-yml-LC177" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L178" class="blob-num js-line-number js-blob-rnum" data-line-number="178"></td>
          <td id="file-compile-and-test-yml-LC178" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L179" class="blob-num js-line-number js-blob-rnum" data-line-number="179"></td>
          <td id="file-compile-and-test-yml-LC179" class="blob-code blob-code-inner js-file-line">      ARTIFACTORY_AUTH_TOKEN: ${{ secrets.ARTIFACTORY_AUTH_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L180" class="blob-num js-line-number js-blob-rnum" data-line-number="180"></td>
          <td id="file-compile-and-test-yml-LC180" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L181" class="blob-num js-line-number js-blob-rnum" data-line-number="181"></td>
          <td id="file-compile-and-test-yml-LC181" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L182" class="blob-num js-line-number js-blob-rnum" data-line-number="182"></td>
          <td id="file-compile-and-test-yml-LC182" class="blob-code blob-code-inner js-file-line">      &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L183" class="blob-num js-line-number js-blob-rnum" data-line-number="183"></td>
          <td id="file-compile-and-test-yml-LC183" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L184" class="blob-num js-line-number js-blob-rnum" data-line-number="184"></td>
          <td id="file-compile-and-test-yml-LC184" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L185" class="blob-num js-line-number js-blob-rnum" data-line-number="185"></td>
          <td id="file-compile-and-test-yml-LC185" class="blob-code blob-code-inner js-file-line">          token: ${{ secrets.PAT }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L186" class="blob-num js-line-number js-blob-rnum" data-line-number="186"></td>
          <td id="file-compile-and-test-yml-LC186" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L187" class="blob-num js-line-number js-blob-rnum" data-line-number="187"></td>
          <td id="file-compile-and-test-yml-LC187" class="blob-code blob-code-inner js-file-line">      &#8211; name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L188" class="blob-num js-line-number js-blob-rnum" data-line-number="188"></td>
          <td id="file-compile-and-test-yml-LC188" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L189" class="blob-num js-line-number js-blob-rnum" data-line-number="189"></td>
          <td id="file-compile-and-test-yml-LC189" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L190" class="blob-num js-line-number js-blob-rnum" data-line-number="190"></td>
          <td id="file-compile-and-test-yml-LC190" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L191" class="blob-num js-line-number js-blob-rnum" data-line-number="191"></td>
          <td id="file-compile-and-test-yml-LC191" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L192" class="blob-num js-line-number js-blob-rnum" data-line-number="192"></td>
          <td id="file-compile-and-test-yml-LC192" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L193" class="blob-num js-line-number js-blob-rnum" data-line-number="193"></td>
          <td id="file-compile-and-test-yml-LC193" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L194" class="blob-num js-line-number js-blob-rnum" data-line-number="194"></td>
          <td id="file-compile-and-test-yml-LC194" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L195" class="blob-num js-line-number js-blob-rnum" data-line-number="195"></td>
          <td id="file-compile-and-test-yml-LC195" class="blob-code blob-code-inner js-file-line">      &#8211; name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L196" class="blob-num js-line-number js-blob-rnum" data-line-number="196"></td>
          <td id="file-compile-and-test-yml-LC196" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L197" class="blob-num js-line-number js-blob-rnum" data-line-number="197"></td>
          <td id="file-compile-and-test-yml-LC197" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L198" class="blob-num js-line-number js-blob-rnum" data-line-number="198"></td>
          <td id="file-compile-and-test-yml-LC198" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L199" class="blob-num js-line-number js-blob-rnum" data-line-number="199"></td>
          <td id="file-compile-and-test-yml-LC199" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L200" class="blob-num js-line-number js-blob-rnum" data-line-number="200"></td>
          <td id="file-compile-and-test-yml-LC200" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L201" class="blob-num js-line-number js-blob-rnum" data-line-number="201"></td>
          <td id="file-compile-and-test-yml-LC201" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L202" class="blob-num js-line-number js-blob-rnum" data-line-number="202"></td>
          <td id="file-compile-and-test-yml-LC202" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L203" class="blob-num js-line-number js-blob-rnum" data-line-number="203"></td>
          <td id="file-compile-and-test-yml-LC203" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L204" class="blob-num js-line-number js-blob-rnum" data-line-number="204"></td>
          <td id="file-compile-and-test-yml-LC204" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L205" class="blob-num js-line-number js-blob-rnum" data-line-number="205"></td>
          <td id="file-compile-and-test-yml-LC205" class="blob-code blob-code-inner js-file-line">            **/node_modules</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L206" class="blob-num js-line-number js-blob-rnum" data-line-number="206"></td>
          <td id="file-compile-and-test-yml-LC206" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-yarn-${{ hashFiles(&#39;**/package.json&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L207" class="blob-num js-line-number js-blob-rnum" data-line-number="207"></td>
          <td id="file-compile-and-test-yml-LC207" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L208" class="blob-num js-line-number js-blob-rnum" data-line-number="208"></td>
          <td id="file-compile-and-test-yml-LC208" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install packages</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L209" class="blob-num js-line-number js-blob-rnum" data-line-number="209"></td>
          <td id="file-compile-and-test-yml-LC209" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L210" class="blob-num js-line-number js-blob-rnum" data-line-number="210"></td>
          <td id="file-compile-and-test-yml-LC210" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L211" class="blob-num js-line-number js-blob-rnum" data-line-number="211"></td>
          <td id="file-compile-and-test-yml-LC211" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L212" class="blob-num js-line-number js-blob-rnum" data-line-number="212"></td>
          <td id="file-compile-and-test-yml-LC212" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L213" class="blob-num js-line-number js-blob-rnum" data-line-number="213"></td>
          <td id="file-compile-and-test-yml-LC213" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L214" class="blob-num js-line-number js-blob-rnum" data-line-number="214"></td>
          <td id="file-compile-and-test-yml-LC214" class="blob-code blob-code-inner js-file-line">        id: build-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L215" class="blob-num js-line-number js-blob-rnum" data-line-number="215"></td>
          <td id="file-compile-and-test-yml-LC215" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L216" class="blob-num js-line-number js-blob-rnum" data-line-number="216"></td>
          <td id="file-compile-and-test-yml-LC216" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L217" class="blob-num js-line-number js-blob-rnum" data-line-number="217"></td>
          <td id="file-compile-and-test-yml-LC217" class="blob-code blob-code-inner js-file-line">            common</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L218" class="blob-num js-line-number js-blob-rnum" data-line-number="218"></td>
          <td id="file-compile-and-test-yml-LC218" class="blob-code blob-code-inner js-file-line">            components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L219" class="blob-num js-line-number js-blob-rnum" data-line-number="219"></td>
          <td id="file-compile-and-test-yml-LC219" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-build-${{ github.event.pull_request.head.sha }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L220" class="blob-num js-line-number js-blob-rnum" data-line-number="220"></td>
          <td id="file-compile-and-test-yml-LC220" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L221" class="blob-num js-line-number js-blob-rnum" data-line-number="221"></td>
          <td id="file-compile-and-test-yml-LC221" class="blob-code blob-code-inner js-file-line">      &#8211; name: Build components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L222" class="blob-num js-line-number js-blob-rnum" data-line-number="222"></td>
          <td id="file-compile-and-test-yml-LC222" class="blob-code blob-code-inner js-file-line">        if: steps.build-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L223" class="blob-num js-line-number js-blob-rnum" data-line-number="223"></td>
          <td id="file-compile-and-test-yml-LC223" class="blob-code blob-code-inner js-file-line">        run: yarn compile</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L224" class="blob-num js-line-number js-blob-rnum" data-line-number="224"></td>
          <td id="file-compile-and-test-yml-LC224" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L225" class="blob-num js-line-number js-blob-rnum" data-line-number="225"></td>
          <td id="file-compile-and-test-yml-LC225" class="blob-code blob-code-inner js-file-line">      &#8211; name: Test components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L226" class="blob-num js-line-number js-blob-rnum" data-line-number="226"></td>
          <td id="file-compile-and-test-yml-LC226" class="blob-code blob-code-inner js-file-line">        run: yarn test:chrome</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L227" class="blob-num js-line-number js-blob-rnum" data-line-number="227"></td>
          <td id="file-compile-and-test-yml-LC227" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L228" class="blob-num js-line-number js-blob-rnum" data-line-number="228"></td>
          <td id="file-compile-and-test-yml-LC228" class="blob-code blob-code-inner js-file-line">      &#8211; name: Upload chrome coverage as an artifact</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L229" class="blob-num js-line-number js-blob-rnum" data-line-number="229"></td>
          <td id="file-compile-and-test-yml-LC229" class="blob-code blob-code-inner js-file-line">        uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L230" class="blob-num js-line-number js-blob-rnum" data-line-number="230"></td>
          <td id="file-compile-and-test-yml-LC230" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L231" class="blob-num js-line-number js-blob-rnum" data-line-number="231"></td>
          <td id="file-compile-and-test-yml-LC231" class="blob-code blob-code-inner js-file-line">          name: chrome-coverage</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L232" class="blob-num js-line-number js-blob-rnum" data-line-number="232"></td>
          <td id="file-compile-and-test-yml-LC232" class="blob-code blob-code-inner js-file-line">          path: ./coverage/report-cobertura/coverage.xml</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L233" class="blob-num js-line-number js-blob-rnum" data-line-number="233"></td>
          <td id="file-compile-and-test-yml-LC233" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L234" class="blob-num js-line-number js-blob-rnum" data-line-number="234"></td>
          <td id="file-compile-and-test-yml-LC234" class="blob-code blob-code-inner js-file-line">      &#8211; name: Upload chrome lcov coverage as an artifact</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L235" class="blob-num js-line-number js-blob-rnum" data-line-number="235"></td>
          <td id="file-compile-and-test-yml-LC235" class="blob-code blob-code-inner js-file-line">        uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L236" class="blob-num js-line-number js-blob-rnum" data-line-number="236"></td>
          <td id="file-compile-and-test-yml-LC236" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L237" class="blob-num js-line-number js-blob-rnum" data-line-number="237"></td>
          <td id="file-compile-and-test-yml-LC237" class="blob-code blob-code-inner js-file-line">          name: chrome-lcov-coverage</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L238" class="blob-num js-line-number js-blob-rnum" data-line-number="238"></td>
          <td id="file-compile-and-test-yml-LC238" class="blob-code blob-code-inner js-file-line">          path: ./coverage/report-lcov/lcov.info</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L239" class="blob-num js-line-number js-blob-rnum" data-line-number="239"></td>
          <td id="file-compile-and-test-yml-LC239" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L240" class="blob-num js-line-number js-blob-rnum" data-line-number="240"></td>
          <td id="file-compile-and-test-yml-LC240" class="blob-code blob-code-inner js-file-line">  code-standards:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L241" class="blob-num js-line-number js-blob-rnum" data-line-number="241"></td>
          <td id="file-compile-and-test-yml-LC241" class="blob-code blob-code-inner js-file-line">    needs: cache-yarn-and-build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L242" class="blob-num js-line-number js-blob-rnum" data-line-number="242"></td>
          <td id="file-compile-and-test-yml-LC242" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L243" class="blob-num js-line-number js-blob-rnum" data-line-number="243"></td>
          <td id="file-compile-and-test-yml-LC243" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L244" class="blob-num js-line-number js-blob-rnum" data-line-number="244"></td>
          <td id="file-compile-and-test-yml-LC244" class="blob-code blob-code-inner js-file-line">      ARTIFACTORY_AUTH_TOKEN: ${{ secrets.ARTIFACTORY_AUTH_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L245" class="blob-num js-line-number js-blob-rnum" data-line-number="245"></td>
          <td id="file-compile-and-test-yml-LC245" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L246" class="blob-num js-line-number js-blob-rnum" data-line-number="246"></td>
          <td id="file-compile-and-test-yml-LC246" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L247" class="blob-num js-line-number js-blob-rnum" data-line-number="247"></td>
          <td id="file-compile-and-test-yml-LC247" class="blob-code blob-code-inner js-file-line">      &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L248" class="blob-num js-line-number js-blob-rnum" data-line-number="248"></td>
          <td id="file-compile-and-test-yml-LC248" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L249" class="blob-num js-line-number js-blob-rnum" data-line-number="249"></td>
          <td id="file-compile-and-test-yml-LC249" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L250" class="blob-num js-line-number js-blob-rnum" data-line-number="250"></td>
          <td id="file-compile-and-test-yml-LC250" class="blob-code blob-code-inner js-file-line">          token: ${{ secrets.PAT }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L251" class="blob-num js-line-number js-blob-rnum" data-line-number="251"></td>
          <td id="file-compile-and-test-yml-LC251" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L252" class="blob-num js-line-number js-blob-rnum" data-line-number="252"></td>
          <td id="file-compile-and-test-yml-LC252" class="blob-code blob-code-inner js-file-line">      &#8211; name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L253" class="blob-num js-line-number js-blob-rnum" data-line-number="253"></td>
          <td id="file-compile-and-test-yml-LC253" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L254" class="blob-num js-line-number js-blob-rnum" data-line-number="254"></td>
          <td id="file-compile-and-test-yml-LC254" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L255" class="blob-num js-line-number js-blob-rnum" data-line-number="255"></td>
          <td id="file-compile-and-test-yml-LC255" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L256" class="blob-num js-line-number js-blob-rnum" data-line-number="256"></td>
          <td id="file-compile-and-test-yml-LC256" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L257" class="blob-num js-line-number js-blob-rnum" data-line-number="257"></td>
          <td id="file-compile-and-test-yml-LC257" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L258" class="blob-num js-line-number js-blob-rnum" data-line-number="258"></td>
          <td id="file-compile-and-test-yml-LC258" class="blob-code blob-code-inner js-file-line">        run: npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L259" class="blob-num js-line-number js-blob-rnum" data-line-number="259"></td>
          <td id="file-compile-and-test-yml-LC259" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L260" class="blob-num js-line-number js-blob-rnum" data-line-number="260"></td>
          <td id="file-compile-and-test-yml-LC260" class="blob-code blob-code-inner js-file-line">      &#8211; name: Get yarn cache directory path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L261" class="blob-num js-line-number js-blob-rnum" data-line-number="261"></td>
          <td id="file-compile-and-test-yml-LC261" class="blob-code blob-code-inner js-file-line">        id: yarn-cache-dir-path</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L262" class="blob-num js-line-number js-blob-rnum" data-line-number="262"></td>
          <td id="file-compile-and-test-yml-LC262" class="blob-code blob-code-inner js-file-line">        run: echo &quot;::set-output name=dir::$(yarn config get cacheFolder)&quot;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L263" class="blob-num js-line-number js-blob-rnum" data-line-number="263"></td>
          <td id="file-compile-and-test-yml-LC263" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L264" class="blob-num js-line-number js-blob-rnum" data-line-number="264"></td>
          <td id="file-compile-and-test-yml-LC264" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache yarn dependencies</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L265" class="blob-num js-line-number js-blob-rnum" data-line-number="265"></td>
          <td id="file-compile-and-test-yml-LC265" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L266" class="blob-num js-line-number js-blob-rnum" data-line-number="266"></td>
          <td id="file-compile-and-test-yml-LC266" class="blob-code blob-code-inner js-file-line">        id: yarn-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L267" class="blob-num js-line-number js-blob-rnum" data-line-number="267"></td>
          <td id="file-compile-and-test-yml-LC267" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L268" class="blob-num js-line-number js-blob-rnum" data-line-number="268"></td>
          <td id="file-compile-and-test-yml-LC268" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L269" class="blob-num js-line-number js-blob-rnum" data-line-number="269"></td>
          <td id="file-compile-and-test-yml-LC269" class="blob-code blob-code-inner js-file-line">            ${{ steps.yarn-cache-dir-path.outputs.dir }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L270" class="blob-num js-line-number js-blob-rnum" data-line-number="270"></td>
          <td id="file-compile-and-test-yml-LC270" class="blob-code blob-code-inner js-file-line">            **/node_modules</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L271" class="blob-num js-line-number js-blob-rnum" data-line-number="271"></td>
          <td id="file-compile-and-test-yml-LC271" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-yarn-${{ hashFiles(&#39;**/package.json&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L272" class="blob-num js-line-number js-blob-rnum" data-line-number="272"></td>
          <td id="file-compile-and-test-yml-LC272" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L273" class="blob-num js-line-number js-blob-rnum" data-line-number="273"></td>
          <td id="file-compile-and-test-yml-LC273" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install packages</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L274" class="blob-num js-line-number js-blob-rnum" data-line-number="274"></td>
          <td id="file-compile-and-test-yml-LC274" class="blob-code blob-code-inner js-file-line">        if: steps.yarn-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L275" class="blob-num js-line-number js-blob-rnum" data-line-number="275"></td>
          <td id="file-compile-and-test-yml-LC275" class="blob-code blob-code-inner js-file-line">        run: yarn install</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L276" class="blob-num js-line-number js-blob-rnum" data-line-number="276"></td>
          <td id="file-compile-and-test-yml-LC276" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L277" class="blob-num js-line-number js-blob-rnum" data-line-number="277"></td>
          <td id="file-compile-and-test-yml-LC277" class="blob-code blob-code-inner js-file-line">      &#8211; name: Cache build</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L278" class="blob-num js-line-number js-blob-rnum" data-line-number="278"></td>
          <td id="file-compile-and-test-yml-LC278" class="blob-code blob-code-inner js-file-line">        uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L279" class="blob-num js-line-number js-blob-rnum" data-line-number="279"></td>
          <td id="file-compile-and-test-yml-LC279" class="blob-code blob-code-inner js-file-line">        id: build-cache</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L280" class="blob-num js-line-number js-blob-rnum" data-line-number="280"></td>
          <td id="file-compile-and-test-yml-LC280" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L281" class="blob-num js-line-number js-blob-rnum" data-line-number="281"></td>
          <td id="file-compile-and-test-yml-LC281" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L282" class="blob-num js-line-number js-blob-rnum" data-line-number="282"></td>
          <td id="file-compile-and-test-yml-LC282" class="blob-code blob-code-inner js-file-line">            common</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L283" class="blob-num js-line-number js-blob-rnum" data-line-number="283"></td>
          <td id="file-compile-and-test-yml-LC283" class="blob-code blob-code-inner js-file-line">            components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L284" class="blob-num js-line-number js-blob-rnum" data-line-number="284"></td>
          <td id="file-compile-and-test-yml-LC284" class="blob-code blob-code-inner js-file-line">          key: vivid-cache-build-${{ github.event.pull_request.head.sha }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L285" class="blob-num js-line-number js-blob-rnum" data-line-number="285"></td>
          <td id="file-compile-and-test-yml-LC285" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L286" class="blob-num js-line-number js-blob-rnum" data-line-number="286"></td>
          <td id="file-compile-and-test-yml-LC286" class="blob-code blob-code-inner js-file-line">      &#8211; name: Build components</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L287" class="blob-num js-line-number js-blob-rnum" data-line-number="287"></td>
          <td id="file-compile-and-test-yml-LC287" class="blob-code blob-code-inner js-file-line">        if: steps.build-cache.outputs.cache-hit != &#39;true&#39;</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L288" class="blob-num js-line-number js-blob-rnum" data-line-number="288"></td>
          <td id="file-compile-and-test-yml-LC288" class="blob-code blob-code-inner js-file-line">        run: yarn compile</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L289" class="blob-num js-line-number js-blob-rnum" data-line-number="289"></td>
          <td id="file-compile-and-test-yml-LC289" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L290" class="blob-num js-line-number js-blob-rnum" data-line-number="290"></td>
          <td id="file-compile-and-test-yml-LC290" class="blob-code blob-code-inner js-file-line">      &#8211; name: Dependencies check</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L291" class="blob-num js-line-number js-blob-rnum" data-line-number="291"></td>
          <td id="file-compile-and-test-yml-LC291" class="blob-code blob-code-inner js-file-line">        run: yarn dep-check</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L292" class="blob-num js-line-number js-blob-rnum" data-line-number="292"></td>
          <td id="file-compile-and-test-yml-LC292" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L293" class="blob-num js-line-number js-blob-rnum" data-line-number="293"></td>
          <td id="file-compile-and-test-yml-LC293" class="blob-code blob-code-inner js-file-line">      &#8211; name: Lint sources</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L294" class="blob-num js-line-number js-blob-rnum" data-line-number="294"></td>
          <td id="file-compile-and-test-yml-LC294" class="blob-code blob-code-inner js-file-line">        run: yarn lint</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L295" class="blob-num js-line-number js-blob-rnum" data-line-number="295"></td>
          <td id="file-compile-and-test-yml-LC295" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L296" class="blob-num js-line-number js-blob-rnum" data-line-number="296"></td>
          <td id="file-compile-and-test-yml-LC296" class="blob-code blob-code-inner js-file-line">      &#8211; name: Ensure all autogenerated files committed</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L297" class="blob-num js-line-number js-blob-rnum" data-line-number="297"></td>
          <td id="file-compile-and-test-yml-LC297" class="blob-code blob-code-inner js-file-line">        run: yarn compile &amp;&amp; sh ./scripts/ensure-all-committed.sh</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L298" class="blob-num js-line-number js-blob-rnum" data-line-number="298"></td>
          <td id="file-compile-and-test-yml-LC298" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L299" class="blob-num js-line-number js-blob-rnum" data-line-number="299"></td>
          <td id="file-compile-and-test-yml-LC299" class="blob-code blob-code-inner js-file-line">  code-coverage:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L300" class="blob-num js-line-number js-blob-rnum" data-line-number="300"></td>
          <td id="file-compile-and-test-yml-LC300" class="blob-code blob-code-inner js-file-line">      needs: test-chrome</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L301" class="blob-num js-line-number js-blob-rnum" data-line-number="301"></td>
          <td id="file-compile-and-test-yml-LC301" class="blob-code blob-code-inner js-file-line">      runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L302" class="blob-num js-line-number js-blob-rnum" data-line-number="302"></td>
          <td id="file-compile-and-test-yml-LC302" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L303" class="blob-num js-line-number js-blob-rnum" data-line-number="303"></td>
          <td id="file-compile-and-test-yml-LC303" class="blob-code blob-code-inner js-file-line">      steps:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L304" class="blob-num js-line-number js-blob-rnum" data-line-number="304"></td>
          <td id="file-compile-and-test-yml-LC304" class="blob-code blob-code-inner js-file-line">        &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L305" class="blob-num js-line-number js-blob-rnum" data-line-number="305"></td>
          <td id="file-compile-and-test-yml-LC305" class="blob-code blob-code-inner js-file-line">          uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L306" class="blob-num js-line-number js-blob-rnum" data-line-number="306"></td>
          <td id="file-compile-and-test-yml-LC306" class="blob-code blob-code-inner js-file-line">          with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L307" class="blob-num js-line-number js-blob-rnum" data-line-number="307"></td>
          <td id="file-compile-and-test-yml-LC307" class="blob-code blob-code-inner js-file-line">            token: ${{ secrets.PAT }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L308" class="blob-num js-line-number js-blob-rnum" data-line-number="308"></td>
          <td id="file-compile-and-test-yml-LC308" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L309" class="blob-num js-line-number js-blob-rnum" data-line-number="309"></td>
          <td id="file-compile-and-test-yml-LC309" class="blob-code blob-code-inner js-file-line">        &#8211; name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L310" class="blob-num js-line-number js-blob-rnum" data-line-number="310"></td>
          <td id="file-compile-and-test-yml-LC310" class="blob-code blob-code-inner js-file-line">          uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L311" class="blob-num js-line-number js-blob-rnum" data-line-number="311"></td>
          <td id="file-compile-and-test-yml-LC311" class="blob-code blob-code-inner js-file-line">          with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L312" class="blob-num js-line-number js-blob-rnum" data-line-number="312"></td>
          <td id="file-compile-and-test-yml-LC312" class="blob-code blob-code-inner js-file-line">            node-version: 14</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L313" class="blob-num js-line-number js-blob-rnum" data-line-number="313"></td>
          <td id="file-compile-and-test-yml-LC313" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L314" class="blob-num js-line-number js-blob-rnum" data-line-number="314"></td>
          <td id="file-compile-and-test-yml-LC314" class="blob-code blob-code-inner js-file-line">        &#8211; name: Download artifact chrome-lcov-coverage</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L315" class="blob-num js-line-number js-blob-rnum" data-line-number="315"></td>
          <td id="file-compile-and-test-yml-LC315" class="blob-code blob-code-inner js-file-line">          uses: actions/download-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L316" class="blob-num js-line-number js-blob-rnum" data-line-number="316"></td>
          <td id="file-compile-and-test-yml-LC316" class="blob-code blob-code-inner js-file-line">          with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L317" class="blob-num js-line-number js-blob-rnum" data-line-number="317"></td>
          <td id="file-compile-and-test-yml-LC317" class="blob-code blob-code-inner js-file-line">            name: chrome-lcov-coverage</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L318" class="blob-num js-line-number js-blob-rnum" data-line-number="318"></td>
          <td id="file-compile-and-test-yml-LC318" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L319" class="blob-num js-line-number js-blob-rnum" data-line-number="319"></td>
          <td id="file-compile-and-test-yml-LC319" class="blob-code blob-code-inner js-file-line">        &#8211; name: Coveralls</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L320" class="blob-num js-line-number js-blob-rnum" data-line-number="320"></td>
          <td id="file-compile-and-test-yml-LC320" class="blob-code blob-code-inner js-file-line">          uses: coverallsapp/github-action@master</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L321" class="blob-num js-line-number js-blob-rnum" data-line-number="321"></td>
          <td id="file-compile-and-test-yml-LC321" class="blob-code blob-code-inner js-file-line">          with:</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L322" class="blob-num js-line-number js-blob-rnum" data-line-number="322"></td>
          <td id="file-compile-and-test-yml-LC322" class="blob-code blob-code-inner js-file-line">            github-token: ${{ secrets.GITHUB_TOKEN }}</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L323" class="blob-num js-line-number js-blob-rnum" data-line-number="323"></td>
          <td id="file-compile-and-test-yml-LC323" class="blob-code blob-code-inner js-file-line">            path-to-lcov: ./lcov.info</td>
        </tr>
        <tr>
          <td id="file-compile-and-test-yml-L324" class="blob-num js-line-number js-blob-rnum" data-line-number="324"></td>
          <td id="file-compile-and-test-yml-LC324" class="blob-code blob-code-inner js-file-line">            flag-name: Unit</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/892acbbfc88c93df3d4ada172d5ed601/raw/e3f8d9531c515f688622ba1e6ba2be9eb5e02fe0/compile-and-test-yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/892acbbfc88c93df3d4ada172d5ed601#file-compile-and-test-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          compile-and-test-yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>324 lines of code. WOW!  Notice the section of the tests <code>test-chrome</code>, <code>test-safari</code> and <code>test-firefox</code>. They are practically the same except minor changes.</p>



<p>Now that&#8217;s a super-long and highly non-DRY piece of <code>yml</code>. All of this code that&#8217;s repeating itself &#8211; if I need to make one change, I&#8217;d probably need to change all three jobs (another real, sad, story).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Use_Github_Actions_Matrix_to_Simplify_a_Flow"></span>How to Use Github Actions Matrix to Simplify a Flow?<span class="ez-toc-section-end"></span></h3>



<p>So&#8230; what can we do? When Github Actions started, we had an option to kind of automate this by using a Matrix. The matrix would set some variables and then permutate them. How many variables do we have here? Let&#8217;s see:</p>



<ol class="wp-block-list"><li>3 browsers</li><li>2 Operating systems (OS, and linux)</li><li>Test coverage boolean</li></ol>



<p>That&#8217;s 3 times 2 times 2. How does the matrix setup look like? Make sure you are sitting before you look at the code:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113369612" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-matrix-definition-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="matrix-definition.yml content, created by YonatanKra on 12:23PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="matrix-definition.yml">
        <tr>
          <td id="file-matrix-definition-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-matrix-definition-yml-LC1" class="blob-code blob-code-inner js-file-line">    strategy:</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-matrix-definition-yml-LC2" class="blob-code blob-code-inner js-file-line">      max-parallel: 10</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-matrix-definition-yml-LC3" class="blob-code blob-code-inner js-file-line">      matrix:</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-matrix-definition-yml-LC4" class="blob-code blob-code-inner js-file-line">        os:</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-matrix-definition-yml-LC5" class="blob-code blob-code-inner js-file-line">          &#8211; ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-matrix-definition-yml-LC6" class="blob-code blob-code-inner js-file-line">          &#8211; macos-latest</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-matrix-definition-yml-LC7" class="blob-code blob-code-inner js-file-line">        browser:</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-matrix-definition-yml-LC8" class="blob-code blob-code-inner js-file-line">          &#8211; SafariNative</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-matrix-definition-yml-LC9" class="blob-code blob-code-inner js-file-line">          &#8211; ChromeHeadless</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-matrix-definition-yml-LC10" class="blob-code blob-code-inner js-file-line">          &#8211; FirefoxHeadless</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-matrix-definition-yml-LC11" class="blob-code blob-code-inner js-file-line">        exclude:</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-matrix-definition-yml-LC12" class="blob-code blob-code-inner js-file-line">          &#8211; os: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-matrix-definition-yml-LC13" class="blob-code blob-code-inner js-file-line">            browser: SafariNative</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-matrix-definition-yml-LC14" class="blob-code blob-code-inner js-file-line">          &#8211; os: macos-latest</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-matrix-definition-yml-LC15" class="blob-code blob-code-inner js-file-line">            browser: FirefoxHeadless</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-matrix-definition-yml-LC16" class="blob-code blob-code-inner js-file-line">          &#8211; os: macos-latest</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-matrix-definition-yml-LC17" class="blob-code blob-code-inner js-file-line">            browser: ChromeHeadless</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-matrix-definition-yml-LC18" class="blob-code blob-code-inner js-file-line">        include:</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-matrix-definition-yml-LC19" class="blob-code blob-code-inner js-file-line">          &#8211; browser: ChromeHeadless</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-matrix-definition-yml-LC20" class="blob-code blob-code-inner js-file-line">            browser_name: Chrome</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-matrix-definition-yml-LC21" class="blob-code blob-code-inner js-file-line">            report_coverage: true</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-matrix-definition-yml-LC22" class="blob-code blob-code-inner js-file-line">          &#8211; browser: FirefoxHeadless</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-matrix-definition-yml-LC23" class="blob-code blob-code-inner js-file-line">            browser_name: Firefox</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-matrix-definition-yml-LC24" class="blob-code blob-code-inner js-file-line">            report_coverage: false</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-matrix-definition-yml-LC25" class="blob-code blob-code-inner js-file-line">          &#8211; browser: SafariNative</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-matrix-definition-yml-LC26" class="blob-code blob-code-inner js-file-line">            browser_name: Safari</td>
        </tr>
        <tr>
          <td id="file-matrix-definition-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-matrix-definition-yml-LC27" class="blob-code blob-code-inner js-file-line">            report_coverage: false</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/9c7f6fc4dae32a0f850912cdde4f5c38/raw/86f48d38618989739aa6b0c53dbdbf218859cc34/matrix-definition.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/9c7f6fc4dae32a0f850912cdde4f5c38#file-matrix-definition-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          matrix-definition.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>It&#8217;s important that our software runs on both Ubuntu and MacOS operating systems. However, we need to make sure that Safari is excluded from running on Ubuntu, while Firefox and Chrome are excluded from running on MacOS. Additionally, we need to make sure that the opposite is included. Finally, we require a coverage report to be included specifically for Chrome.  </p>



<p>What a mess! The final code is really non-readable (meaning &#8211; hard to read, but we devs are highly dramatic):</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113369639" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-pull-requet-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="pull-requet.yml content, created by YonatanKra on 12:26PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="pull-requet.yml">
        <tr>
          <td id="file-pull-requet-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-pull-requet-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Master Pull Request</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-pull-requet-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-pull-requet-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-pull-requet-yml-LC4" class="blob-code blob-code-inner js-file-line">  pull_request:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-pull-requet-yml-LC5" class="blob-code blob-code-inner js-file-line">    types:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-pull-requet-yml-LC6" class="blob-code blob-code-inner js-file-line">      &#8211; opened</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-pull-requet-yml-LC7" class="blob-code blob-code-inner js-file-line">      &#8211; synchronize</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-pull-requet-yml-LC8" class="blob-code blob-code-inner js-file-line">      &#8211; reopened</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-pull-requet-yml-LC9" class="blob-code blob-code-inner js-file-line">      &#8211; ready_for_review</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-pull-requet-yml-LC10" class="blob-code blob-code-inner js-file-line">      &#8211; converted_to_draft</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-pull-requet-yml-LC11" class="blob-code blob-code-inner js-file-line">    branches:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-pull-requet-yml-LC12" class="blob-code blob-code-inner js-file-line">      &#8211; master</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-pull-requet-yml-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-pull-requet-yml-LC14" class="blob-code blob-code-inner js-file-line">concurrency:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-pull-requet-yml-LC15" class="blob-code blob-code-inner js-file-line">  group: ci-tests-${{ github.ref }}-1</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-pull-requet-yml-LC16" class="blob-code blob-code-inner js-file-line">  cancel-in-progress: true</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-pull-requet-yml-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-pull-requet-yml-LC18" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-pull-requet-yml-LC19" class="blob-code blob-code-inner js-file-line">  build:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-pull-requet-yml-LC20" class="blob-code blob-code-inner js-file-line">    timeout-minutes: 15</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-pull-requet-yml-LC21" class="blob-code blob-code-inner js-file-line">    if: github.event.pull_request.draft == false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-pull-requet-yml-LC22" class="blob-code blob-code-inner js-file-line">    name: Build</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-pull-requet-yml-LC23" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-pull-requet-yml-LC24" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-pull-requet-yml-LC25" class="blob-code blob-code-inner js-file-line">      GITHUB_TOKEN: ${{ secrets.VNG_VIVID_PAT }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-pull-requet-yml-LC26" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-pull-requet-yml-LC27" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-pull-requet-yml-LC28" class="blob-code blob-code-inner js-file-line">      &#8211; run: printf &quot;registry=https://npm.pkg.github.com/Vonage\n_authToken=\${GITHUB_TOKEN}\n//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}\nalways-auth=true&quot; &gt; .npmrc</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-pull-requet-yml-LC29" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-pull-requet-yml-LC30" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-pull-requet-yml-LC31" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-pull-requet-yml-LC32" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/cache@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-pull-requet-yml-LC33" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-pull-requet-yml-LC34" class="blob-code blob-code-inner js-file-line">          path: &quot;**/node_modules&quot;</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-pull-requet-yml-LC35" class="blob-code blob-code-inner js-file-line">          key: ${{ hashFiles(&#39;yarn.lock&#39;) }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-pull-requet-yml-LC36" class="blob-code blob-code-inner js-file-line">      &#8211; run: yarn install &#8211;frozen-lockfile &#8211;network-timeout 100000</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-pull-requet-yml-LC37" class="blob-code blob-code-inner js-file-line">        env:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-pull-requet-yml-LC38" class="blob-code blob-code-inner js-file-line">          PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: 1</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-pull-requet-yml-LC39" class="blob-code blob-code-inner js-file-line">      &#8211; run: yarn lerna run build &#8211;stream &#8211;concurrency=15 &#8211;include-dependencies</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-pull-requet-yml-LC40" class="blob-code blob-code-inner js-file-line">      &#8211; run: tar -zcf /tmp/vivid-env.tar.gz .</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-pull-requet-yml-LC41" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-pull-requet-yml-LC42" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-pull-requet-yml-LC43" class="blob-code blob-code-inner js-file-line">          name: workspace</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-pull-requet-yml-LC44" class="blob-code blob-code-inner js-file-line">          path: /tmp/vivid-env.tar.gz</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-pull-requet-yml-LC45" class="blob-code blob-code-inner js-file-line">  test:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-pull-requet-yml-LC46" class="blob-code blob-code-inner js-file-line">    if: github.event.pull_request.draft == false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-pull-requet-yml-LC47" class="blob-code blob-code-inner js-file-line">    needs: build</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-pull-requet-yml-LC48" class="blob-code blob-code-inner js-file-line">    name: &quot;Test Components on ${{ matrix.browser_name }}&quot;</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-pull-requet-yml-LC49" class="blob-code blob-code-inner js-file-line">    runs-on: ${{ matrix.os }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-pull-requet-yml-LC50" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-pull-requet-yml-LC51" class="blob-code blob-code-inner js-file-line">      GITHUB_TOKEN: ${{ secrets.VNG_VIVID_PAT }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-pull-requet-yml-LC52" class="blob-code blob-code-inner js-file-line">    strategy:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-pull-requet-yml-LC53" class="blob-code blob-code-inner js-file-line">      max-parallel: 10</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-pull-requet-yml-LC54" class="blob-code blob-code-inner js-file-line">      matrix:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-pull-requet-yml-LC55" class="blob-code blob-code-inner js-file-line">        os:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-pull-requet-yml-LC56" class="blob-code blob-code-inner js-file-line">          &#8211; ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-pull-requet-yml-LC57" class="blob-code blob-code-inner js-file-line">          &#8211; macos-latest</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-pull-requet-yml-LC58" class="blob-code blob-code-inner js-file-line">        browser:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-pull-requet-yml-LC59" class="blob-code blob-code-inner js-file-line">          &#8211; SafariNative</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-pull-requet-yml-LC60" class="blob-code blob-code-inner js-file-line">          &#8211; ChromeHeadless</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-pull-requet-yml-LC61" class="blob-code blob-code-inner js-file-line">          &#8211; FirefoxHeadless</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-pull-requet-yml-LC62" class="blob-code blob-code-inner js-file-line">        exclude:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-pull-requet-yml-LC63" class="blob-code blob-code-inner js-file-line">          &#8211; os: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-pull-requet-yml-LC64" class="blob-code blob-code-inner js-file-line">            browser: SafariNative</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-pull-requet-yml-LC65" class="blob-code blob-code-inner js-file-line">          &#8211; os: macos-latest</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-pull-requet-yml-LC66" class="blob-code blob-code-inner js-file-line">            browser: FirefoxHeadless</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-pull-requet-yml-LC67" class="blob-code blob-code-inner js-file-line">          &#8211; os: macos-latest</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-pull-requet-yml-LC68" class="blob-code blob-code-inner js-file-line">            browser: ChromeHeadless</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-pull-requet-yml-LC69" class="blob-code blob-code-inner js-file-line">        include:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-pull-requet-yml-LC70" class="blob-code blob-code-inner js-file-line">          &#8211; browser: ChromeHeadless</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-pull-requet-yml-LC71" class="blob-code blob-code-inner js-file-line">            browser_name: Chrome</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-pull-requet-yml-LC72" class="blob-code blob-code-inner js-file-line">            report_coverage: true</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-pull-requet-yml-LC73" class="blob-code blob-code-inner js-file-line">          &#8211; browser: FirefoxHeadless</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-pull-requet-yml-LC74" class="blob-code blob-code-inner js-file-line">            browser_name: Firefox</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-pull-requet-yml-LC75" class="blob-code blob-code-inner js-file-line">            report_coverage: false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-pull-requet-yml-LC76" class="blob-code blob-code-inner js-file-line">          &#8211; browser: SafariNative</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-pull-requet-yml-LC77" class="blob-code blob-code-inner js-file-line">            browser_name: Safari</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-pull-requet-yml-LC78" class="blob-code blob-code-inner js-file-line">            report_coverage: false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-pull-requet-yml-LC79" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-pull-requet-yml-LC80" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-pull-requet-yml-LC81" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-pull-requet-yml-LC82" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-pull-requet-yml-LC83" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/download-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-pull-requet-yml-LC84" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-pull-requet-yml-LC85" class="blob-code blob-code-inner js-file-line">          name: workspace</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-pull-requet-yml-LC86" class="blob-code blob-code-inner js-file-line">          path: /tmp</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-pull-requet-yml-LC87" class="blob-code blob-code-inner js-file-line">      &#8211; run: tar -zxf /tmp/vivid-env.tar.gz</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-pull-requet-yml-LC88" class="blob-code blob-code-inner js-file-line">      &#8211; run: yarn karma start &#8211;coverage &#8211;browsers=${{ matrix.browser }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-pull-requet-yml-LC89" class="blob-code blob-code-inner js-file-line">        id: test</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-pull-requet-yml-LC90" class="blob-code blob-code-inner js-file-line">      &#8211; uses: coverallsapp/github-action@master</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-pull-requet-yml-LC91" class="blob-code blob-code-inner js-file-line">        name: Report coverage information to coveralls</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-pull-requet-yml-LC92" class="blob-code blob-code-inner js-file-line">        if: ${{ matrix.report_coverage }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-pull-requet-yml-LC93" class="blob-code blob-code-inner js-file-line">        continue-on-error: true</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-pull-requet-yml-LC94" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-pull-requet-yml-LC95" class="blob-code blob-code-inner js-file-line">          parallel: false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-pull-requet-yml-LC96" class="blob-code blob-code-inner js-file-line">          github-token: ${{ github.token }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-pull-requet-yml-LC97" class="blob-code blob-code-inner js-file-line">          path-to-lcov: ./coverage/report-lcov/lcov.info</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-pull-requet-yml-LC98" class="blob-code blob-code-inner js-file-line">          flag-name: Tested on ${{ matrix.os }} / ${{ matrix.browser }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-pull-requet-yml-LC99" class="blob-code blob-code-inner js-file-line">      &#8211; run: exit 0</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-pull-requet-yml-LC100" class="blob-code blob-code-inner js-file-line">        if: ${{ steps.test.outcome == &#39;success&#39; }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-pull-requet-yml-LC101" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-pull-requet-yml-LC102" class="blob-code blob-code-inner js-file-line">  test_for_visual_regression:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-pull-requet-yml-LC103" class="blob-code blob-code-inner js-file-line">    if: github.event.pull_request.draft == false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-pull-requet-yml-LC104" class="blob-code blob-code-inner js-file-line">    needs: build</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
          <td id="file-pull-requet-yml-LC105" class="blob-code blob-code-inner js-file-line">    name: Test Components Graphics</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
          <td id="file-pull-requet-yml-LC106" class="blob-code blob-code-inner js-file-line">    runs-on: macos-latest</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
          <td id="file-pull-requet-yml-LC107" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
          <td id="file-pull-requet-yml-LC108" class="blob-code blob-code-inner js-file-line">      GITHUB_TOKEN: ${{ secrets.VNG_VIVID_PAT }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
          <td id="file-pull-requet-yml-LC109" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
          <td id="file-pull-requet-yml-LC110" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
          <td id="file-pull-requet-yml-LC111" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
          <td id="file-pull-requet-yml-LC112" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
          <td id="file-pull-requet-yml-LC113" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/download-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
          <td id="file-pull-requet-yml-LC114" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
          <td id="file-pull-requet-yml-LC115" class="blob-code blob-code-inner js-file-line">          name: workspace</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
          <td id="file-pull-requet-yml-LC116" class="blob-code blob-code-inner js-file-line">          path: /tmp</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
          <td id="file-pull-requet-yml-LC117" class="blob-code blob-code-inner js-file-line">      &#8211; run: tar -zxf /tmp/vivid-env.tar.gz</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
          <td id="file-pull-requet-yml-LC118" class="blob-code blob-code-inner js-file-line">      &#8211; run: npm rebuild playwright &amp;&amp; yarn playwright install-deps</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
          <td id="file-pull-requet-yml-LC119" class="blob-code blob-code-inner js-file-line">        env:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
          <td id="file-pull-requet-yml-LC120" class="blob-code blob-code-inner js-file-line">          GITHUB_TOKEN: ${{ secrets.VNG_VIVID_PAT }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
          <td id="file-pull-requet-yml-LC121" class="blob-code blob-code-inner js-file-line">      &#8211; run: yarn ui-tests</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
          <td id="file-pull-requet-yml-LC122" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
          <td id="file-pull-requet-yml-LC123" class="blob-code blob-code-inner js-file-line">        if: ${{ always() }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
          <td id="file-pull-requet-yml-LC124" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
          <td id="file-pull-requet-yml-LC125" class="blob-code blob-code-inner js-file-line">          name: snapshot</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
          <td id="file-pull-requet-yml-LC126" class="blob-code blob-code-inner js-file-line">          path: ./ui-tests/snapshots/*.png</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
          <td id="file-pull-requet-yml-LC127" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
          <td id="file-pull-requet-yml-LC128" class="blob-code blob-code-inner js-file-line">  test_static:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L129" class="blob-num js-line-number js-blob-rnum" data-line-number="129"></td>
          <td id="file-pull-requet-yml-LC129" class="blob-code blob-code-inner js-file-line">    if: github.event.pull_request.draft == false</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L130" class="blob-num js-line-number js-blob-rnum" data-line-number="130"></td>
          <td id="file-pull-requet-yml-LC130" class="blob-code blob-code-inner js-file-line">    needs: build</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L131" class="blob-num js-line-number js-blob-rnum" data-line-number="131"></td>
          <td id="file-pull-requet-yml-LC131" class="blob-code blob-code-inner js-file-line">    name: ${{ matrix.script_name }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L132" class="blob-num js-line-number js-blob-rnum" data-line-number="132"></td>
          <td id="file-pull-requet-yml-LC132" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-20.04</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L133" class="blob-num js-line-number js-blob-rnum" data-line-number="133"></td>
          <td id="file-pull-requet-yml-LC133" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L134" class="blob-num js-line-number js-blob-rnum" data-line-number="134"></td>
          <td id="file-pull-requet-yml-LC134" class="blob-code blob-code-inner js-file-line">      GITHUB_TOKEN: ${{ secrets.VNG_VIVID_PAT }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L135" class="blob-num js-line-number js-blob-rnum" data-line-number="135"></td>
          <td id="file-pull-requet-yml-LC135" class="blob-code blob-code-inner js-file-line">    strategy:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L136" class="blob-num js-line-number js-blob-rnum" data-line-number="136"></td>
          <td id="file-pull-requet-yml-LC136" class="blob-code blob-code-inner js-file-line">      max-parallel: 10</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L137" class="blob-num js-line-number js-blob-rnum" data-line-number="137"></td>
          <td id="file-pull-requet-yml-LC137" class="blob-code blob-code-inner js-file-line">      matrix:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L138" class="blob-num js-line-number js-blob-rnum" data-line-number="138"></td>
          <td id="file-pull-requet-yml-LC138" class="blob-code blob-code-inner js-file-line">        script:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L139" class="blob-num js-line-number js-blob-rnum" data-line-number="139"></td>
          <td id="file-pull-requet-yml-LC139" class="blob-code blob-code-inner js-file-line">          &#8211; lint</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L140" class="blob-num js-line-number js-blob-rnum" data-line-number="140"></td>
          <td id="file-pull-requet-yml-LC140" class="blob-code blob-code-inner js-file-line">        include:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L141" class="blob-num js-line-number js-blob-rnum" data-line-number="141"></td>
          <td id="file-pull-requet-yml-LC141" class="blob-code blob-code-inner js-file-line">          &#8211; script: lint</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L142" class="blob-num js-line-number js-blob-rnum" data-line-number="142"></td>
          <td id="file-pull-requet-yml-LC142" class="blob-code blob-code-inner js-file-line">            script_name: Test Lint rules</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L143" class="blob-num js-line-number js-blob-rnum" data-line-number="143"></td>
          <td id="file-pull-requet-yml-LC143" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L144" class="blob-num js-line-number js-blob-rnum" data-line-number="144"></td>
          <td id="file-pull-requet-yml-LC144" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L145" class="blob-num js-line-number js-blob-rnum" data-line-number="145"></td>
          <td id="file-pull-requet-yml-LC145" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L146" class="blob-num js-line-number js-blob-rnum" data-line-number="146"></td>
          <td id="file-pull-requet-yml-LC146" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L147" class="blob-num js-line-number js-blob-rnum" data-line-number="147"></td>
          <td id="file-pull-requet-yml-LC147" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/download-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L148" class="blob-num js-line-number js-blob-rnum" data-line-number="148"></td>
          <td id="file-pull-requet-yml-LC148" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L149" class="blob-num js-line-number js-blob-rnum" data-line-number="149"></td>
          <td id="file-pull-requet-yml-LC149" class="blob-code blob-code-inner js-file-line">          name: workspace</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L150" class="blob-num js-line-number js-blob-rnum" data-line-number="150"></td>
          <td id="file-pull-requet-yml-LC150" class="blob-code blob-code-inner js-file-line">          path: /tmp</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L151" class="blob-num js-line-number js-blob-rnum" data-line-number="151"></td>
          <td id="file-pull-requet-yml-LC151" class="blob-code blob-code-inner js-file-line">      &#8211; run: tar -zxf /tmp/vivid-env.tar.gz</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L152" class="blob-num js-line-number js-blob-rnum" data-line-number="152"></td>
          <td id="file-pull-requet-yml-LC152" class="blob-code blob-code-inner js-file-line">      &#8211; run: yarn ${{ matrix.script }}</td>
        </tr>
        <tr>
          <td id="file-pull-requet-yml-L153" class="blob-num js-line-number js-blob-rnum" data-line-number="153"></td>
          <td id="file-pull-requet-yml-LC153" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/860bbcaa8b73e2deca0a6eaa8f05dbb6/raw/76a2d260f0935ffe9b0147cd905ad65bb736a62a/pull-requet.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/860bbcaa8b73e2deca0a6eaa8f05dbb6#file-pull-requet-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          pull-requet.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>So we still have an ugly file. Around half the lines of code, so it is a bit more maintainable. It is still hard to understand.  What would we have done if it was our business logic code?</p>



<p>Split to Modules!!!</p>



<p>And this is where the <code>Workflow Calls</code> come into play. This API was introduced at a pretty late stage (around September 2021). </p>



<p>With <code>workflow calls</code> you can modularize your workflows into different files and call them from other workflows &#8211; just like you would a function or a module.  You can even send parameters. So you see, our complex hardly maintainable code becomes much better:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113369811" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-build-and-lint-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="build-and-lint.yml content, created by YonatanKra on 12:39PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="build-and-lint.yml">
        <tr>
          <td id="file-build-and-lint-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-build-and-lint-yml-LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-ent">name</span>: <span class="pl-s">🏗 Lint &amp; Build</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-build-and-lint-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-build-and-lint-yml-LC3" class="blob-code blob-code-inner js-file-line"><span class="pl-ent">on</span>: <span class="pl-s">workflow_call</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-build-and-lint-yml-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-build-and-lint-yml-LC5" class="blob-code blob-code-inner js-file-line"><span class="pl-ent">jobs</span>:</td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-build-and-lint-yml-LC6" class="blob-code blob-code-inner js-file-line">  <span class="pl-ent">build</span>:</td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-build-and-lint-yml-LC7" class="blob-code blob-code-inner js-file-line">    <span class="pl-ent">runs-on</span>: <span class="pl-s">ubuntu-latest</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-build-and-lint-yml-LC8" class="blob-code blob-code-inner js-file-line">    <span class="pl-ent">steps</span>:</td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-build-and-lint-yml-LC9" class="blob-code blob-code-inner js-file-line">      &#8211; <span class="pl-ent">uses</span>: <span class="pl-s">actions/checkout@v2</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-build-and-lint-yml-LC10" class="blob-code blob-code-inner js-file-line">      &#8211; <span class="pl-ent">uses</span>: <span class="pl-s">actions/setup-node@v2</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-build-and-lint-yml-LC11" class="blob-code blob-code-inner js-file-line">        <span class="pl-ent">with</span>:</td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-build-and-lint-yml-LC12" class="blob-code blob-code-inner js-file-line">          <span class="pl-ent">node-version</span>: <span class="pl-s"><span class="pl-pds">&#39;</span>16<span class="pl-pds">&#39;</span></span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-build-and-lint-yml-LC13" class="blob-code blob-code-inner js-file-line">          <span class="pl-ent">cache</span>: <span class="pl-s"><span class="pl-pds">&#39;</span>npm<span class="pl-pds">&#39;</span></span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-build-and-lint-yml-LC14" class="blob-code blob-code-inner js-file-line">      &#8211; <span class="pl-ent">run</span>: <span class="pl-s">npm install</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-build-and-lint-yml-LC15" class="blob-code blob-code-inner js-file-line">      &#8211; <span class="pl-ent">run</span>: <span class="pl-s">npm run lint</span></td>
        </tr>
        <tr>
          <td id="file-build-and-lint-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-build-and-lint-yml-LC16" class="blob-code blob-code-inner js-file-line">      &#8211; <span class="pl-ent">run</span>: <span class="pl-s">npm run build</span></td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718/raw/cd1cd8549b1aaa76759b8182e3067b73eecaee8e/build-and-lint.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718#file-build-and-lint-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          build-and-lint.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-pre-release-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="pre-release.yml content, created by YonatanKra on 12:39PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="pre-release.yml">
        <tr>
          <td id="file-pre-release-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-pre-release-yml-LC1" class="blob-code blob-code-inner js-file-line">name: &#39;🧬 Pre Release&#39;</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-pre-release-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-pre-release-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-pre-release-yml-LC4" class="blob-code blob-code-inner js-file-line">  push:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-pre-release-yml-LC5" class="blob-code blob-code-inner js-file-line">    branches: main</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-pre-release-yml-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-pre-release-yml-LC7" class="blob-code blob-code-inner js-file-line">concurrency:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-pre-release-yml-LC8" class="blob-code blob-code-inner js-file-line">  group: ci-pre-release-${{ github.ref }}-1</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-pre-release-yml-LC9" class="blob-code blob-code-inner js-file-line">  cancel-in-progress: true</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-pre-release-yml-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-pre-release-yml-LC11" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-pre-release-yml-LC12" class="blob-code blob-code-inner js-file-line">  call-lint-and-build:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-pre-release-yml-LC13" class="blob-code blob-code-inner js-file-line">    uses: vonage/vivid-3/.github/workflows/_lint-and-build.yml@main</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-pre-release-yml-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-pre-release-yml-LC15" class="blob-code blob-code-inner js-file-line">  call-unit-tests:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-pre-release-yml-LC16" class="blob-code blob-code-inner js-file-line">    needs: call-lint-and-build</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-pre-release-yml-LC17" class="blob-code blob-code-inner js-file-line">    uses: vonage/vivid-3/.github/workflows/_unit-tests.yml@main</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-pre-release-yml-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-pre-release-yml-LC19" class="blob-code blob-code-inner js-file-line">  call-upload-artifact:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-pre-release-yml-LC20" class="blob-code blob-code-inner js-file-line">    needs: call-unit-tests</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-pre-release-yml-LC21" class="blob-code blob-code-inner js-file-line">    uses: vonage/vivid-3/.github/workflows/_upload-artifact.yml@main</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-pre-release-yml-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-pre-release-yml-LC23" class="blob-code blob-code-inner js-file-line">  call-pre-release:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-pre-release-yml-LC24" class="blob-code blob-code-inner js-file-line">    needs: call-upload-artifact</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-pre-release-yml-LC25" class="blob-code blob-code-inner js-file-line">    uses: vonage/vivid-3/.github/workflows/_publish-package.yml@main</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-pre-release-yml-LC26" class="blob-code blob-code-inner js-file-line">    with:</td>
        </tr>
        <tr>
          <td id="file-pre-release-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-pre-release-yml-LC27" class="blob-code blob-code-inner js-file-line">      version: 3.0.0</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718/raw/cd1cd8549b1aaa76759b8182e3067b73eecaee8e/pre-release.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718#file-pre-release-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          pre-release.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-publish-package-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="publish-package.yml content, created by YonatanKra on 12:39PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="publish-package.yml">
        <tr>
          <td id="file-publish-package-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-publish-package-yml-LC1" class="blob-code blob-code-inner js-file-line">name: &#39;📦 Publish Package&#39;</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-publish-package-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-publish-package-yml-LC3" class="blob-code blob-code-inner js-file-line">on: </td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-publish-package-yml-LC4" class="blob-code blob-code-inner js-file-line">  workflow_call:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-publish-package-yml-LC5" class="blob-code blob-code-inner js-file-line">    input:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-publish-package-yml-LC6" class="blob-code blob-code-inner js-file-line">      version: </td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-publish-package-yml-LC7" class="blob-code blob-code-inner js-file-line">        type: string</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-publish-package-yml-LC8" class="blob-code blob-code-inner js-file-line">        required: true</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-publish-package-yml-LC9" class="blob-code blob-code-inner js-file-line">        description: Version to bump to</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-publish-package-yml-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-publish-package-yml-LC11" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-publish-package-yml-LC12" class="blob-code blob-code-inner js-file-line">  release:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-publish-package-yml-LC13" class="blob-code blob-code-inner js-file-line">    name: Publish</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-publish-package-yml-LC14" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-publish-package-yml-LC15" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-publish-package-yml-LC16" class="blob-code blob-code-inner js-file-line">      &#8211; name: Checkout</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-publish-package-yml-LC17" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-publish-package-yml-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-publish-package-yml-LC19" class="blob-code blob-code-inner js-file-line">      &#8211; name: Download</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-publish-package-yml-LC20" class="blob-code blob-code-inner js-file-line">        uses: actions/download-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-publish-package-yml-LC21" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-publish-package-yml-LC22" class="blob-code blob-code-inner js-file-line">          name: public-artifact</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-publish-package-yml-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-publish-package-yml-LC24" class="blob-code blob-code-inner js-file-line">      &#8211; name: Setup Node.js</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-publish-package-yml-LC25" class="blob-code blob-code-inner js-file-line">        # Setup .npmrc file to publish to npm</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-publish-package-yml-LC26" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-publish-package-yml-LC27" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-publish-package-yml-LC28" class="blob-code blob-code-inner js-file-line">          node-version: &#39;lts/*&#39;</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-publish-package-yml-LC29" class="blob-code blob-code-inner js-file-line">          registry-url: &#39;https://npm.pkg.github.com&#39;</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-publish-package-yml-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-publish-package-yml-LC31" class="blob-code blob-code-inner js-file-line">      &#8211; name: Install</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-publish-package-yml-LC32" class="blob-code blob-code-inner js-file-line">        run: npm ci</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-publish-package-yml-LC33" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-publish-package-yml-LC34" class="blob-code blob-code-inner js-file-line">      &#8211; name: Bump</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-publish-package-yml-LC35" class="blob-code blob-code-inner js-file-line">        env:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-publish-package-yml-LC36" class="blob-code blob-code-inner js-file-line">          short_head: $(git rev-parse &#8211;short HEAD)</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-publish-package-yml-LC37" class="blob-code blob-code-inner js-file-line">        run: npm version ${{ inputs.version }} &#8211;tag latest &#8211;no-git-tag-version &#8211;no-push</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-publish-package-yml-LC38" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-publish-package-yml-LC39" class="blob-code blob-code-inner js-file-line">      &#8211; name: Publish</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-publish-package-yml-LC40" class="blob-code blob-code-inner js-file-line">        run: npm publish &#8211;access public &#8211;tag next &#8211;dry-run</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-publish-package-yml-LC41" class="blob-code blob-code-inner js-file-line">        env:</td>
        </tr>
        <tr>
          <td id="file-publish-package-yml-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-publish-package-yml-LC42" class="blob-code blob-code-inner js-file-line">          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718/raw/cd1cd8549b1aaa76759b8182e3067b73eecaee8e/publish-package.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718#file-publish-package-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          publish-package.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-upload-artifacts-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="upload-artifacts.yml content, created by YonatanKra on 12:39PM on December 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="upload-artifacts.yml">
        <tr>
          <td id="file-upload-artifacts-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-upload-artifacts-yml-LC1" class="blob-code blob-code-inner js-file-line">name: &#39;🧳 Upload Artifact&#39;</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-upload-artifacts-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-upload-artifacts-yml-LC3" class="blob-code blob-code-inner js-file-line">on: workflow_call</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-upload-artifacts-yml-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-upload-artifacts-yml-LC5" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-upload-artifacts-yml-LC6" class="blob-code blob-code-inner js-file-line">  upload:</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-upload-artifacts-yml-LC7" class="blob-code blob-code-inner js-file-line">    name: &quot;Upload Build Artifact&quot;</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-upload-artifacts-yml-LC8" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-upload-artifacts-yml-LC9" class="blob-code blob-code-inner js-file-line">    # env:</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-upload-artifacts-yml-LC10" class="blob-code blob-code-inner js-file-line">    #   GITHUB_TOKEN: ${{ github.token }}</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-upload-artifacts-yml-LC11" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-upload-artifacts-yml-LC12" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-upload-artifacts-yml-LC13" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/setup-node@v2</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-upload-artifacts-yml-LC14" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-upload-artifacts-yml-LC15" class="blob-code blob-code-inner js-file-line">          node-version: &#39;16&#39;</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-upload-artifacts-yml-LC16" class="blob-code blob-code-inner js-file-line">      &#8211; run: npm ci</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-upload-artifacts-yml-LC17" class="blob-code blob-code-inner js-file-line">      &#8211; run: npm run build</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-upload-artifacts-yml-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-upload-artifacts-yml-LC19" class="blob-code blob-code-inner js-file-line">      &#8211; uses: actions/upload-artifact@v2</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-upload-artifacts-yml-LC20" class="blob-code blob-code-inner js-file-line">        if: always()</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-upload-artifacts-yml-LC21" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-upload-artifacts-yml-LC22" class="blob-code blob-code-inner js-file-line">          name: public-artifact</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-upload-artifacts-yml-LC23" class="blob-code blob-code-inner js-file-line">          path: |</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-upload-artifacts-yml-LC24" class="blob-code blob-code-inner js-file-line">            package.json</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-upload-artifacts-yml-LC25" class="blob-code blob-code-inner js-file-line">            package-lock.json</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-upload-artifacts-yml-LC26" class="blob-code blob-code-inner js-file-line">            LICENSE.md</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-upload-artifacts-yml-LC27" class="blob-code blob-code-inner js-file-line">            dist</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-upload-artifacts-yml-LC28" class="blob-code blob-code-inner js-file-line">            .eleventy.js</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-upload-artifacts-yml-LC29" class="blob-code blob-code-inner js-file-line">            11ty</td>
        </tr>
        <tr>
          <td id="file-upload-artifacts-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-upload-artifacts-yml-LC30" class="blob-code blob-code-inner js-file-line">          if-no-files-found: error</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718/raw/cd1cd8549b1aaa76759b8182e3067b73eecaee8e/upload-artifacts.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/99aa3be8aadad92fc87c9fa39658a718#file-upload-artifacts-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          upload-artifacts.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The pre-release phase and its modules.</figcaption></figure>



<p>In the new modules code we have different files that can be called from anywhere. The <code>build and lint</code> workflow can be used both in the CD (as we see here) as well as in the CI.  Same code &#8211; used twice.</p>



<p>Neat, ha?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="3_Speeding_the_Workflows_with_Caching_and_Artifacts"></span>#3: Speeding the Workflows with Caching and Artifacts<span class="ez-toc-section-end"></span></h2>



<p>Great! we can trigger workflows. Now let&#8217;s speed them up a bit.  The big hammer that gets the job done &#8211; that&#8217;s what I see in my mind when I think about caching.  We have so many precise optimizations nowdays &#8211; but caching is by far the one that solves most of our performance issues while I believe it is the most primitive one.</p>



<p>Now the problem is this &#8211; you want to save time. Not only computation time costs money. Not only more computation creates more pollution.  Longer processes cost time to&#8230; you!  The developer who now has to wait until that stupid robot finishes its CI process.</p>



<p>So&#8230; a really quick optimization is to use caching. It can be as simple as caching the <code>npm</code>:</p>



<pre class="wp-block-code"><code>- uses: actions/setup-node@v2
  with:
    node-version: '16'
    cache: 'npm'
- run: npm install</code></pre>



<p>By using this super simple trick (<code>cache: 'npm'</code>) we just told Github Actions to cache our <code>npm</code> file as long as our <code>package.lock</code> file is still the same.</p>



<p>You can do more complex caching using the <code>cache</code> action:</p>



<pre class="wp-block-code"><code>      - name: Cache yarn dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            ${{ steps.yarn-cache-dir-path.outputs.dir }}
            **/node_modules
          key: our-cache-yarn-${{ hashFiles('**/yarn.lock.json') }}

      - name: Install packages
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn</code></pre>



<p>In the code above we used the cache action (<code>uses: actions/cache@v2</code>) in order to cache our <code>yarn</code> install process. The cache hash is set according to the <code>yarn.lock</code> file. If there&#8217;s a cache hit, it will take that cache and use it.</p>



<p>In the installation step, we condition our installation in the absence of cache &#8211; so we install only if we need to.  This can save MINUTES in every workflow!</p>



<p>You can achieve the same with artifacts:</p>



<pre class="wp-block-code"><code>      - run: yarn lerna run build --stream --concurrency=15 --include-dependencies
      - run: tar -zcf /tmp/vivid-env.tar.gz .
      - uses: actions/upload-artifact@v2
        with:
          name: workspace
          path: /tmp/vivid-env.tar.gz</code></pre>



<p>Here we build our components in a multi repo (after we have everything installed) and then we gzip the whole folder and upload it as an artifact.</p>



<p>Then, anywhere in our workflows we can get our artifact and use a ready build and node_modules folder:</p>



<pre class="wp-block-preformatted">- uses: actions/download-artifact@v2<br>  with:<br>    name: workspace<br>    path: /tmp</pre>



<p>Much like a docker container 😉</p>



<p>This little trick will save you tons of running time both for build and for installations.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="4_Parallelism_and_Synchronous_Operations"></span>#4: Parallelism and Synchronous Operations<span class="ez-toc-section-end"></span></h2>



<p>Jobs and workflows run in parallel by default. Steps run sequentially.  So if you have one job that&#8217;s running:</p>



<p><code>yarn =&gt; yarn build =&gt; yarn lint =&gt; yarn test</code></p>



<p>You are good to go.</p>



<p>But, you&#8217;d like to do better than that. Let&#8217;s take the simple case of caching.</p>



<p>The build job:</p>



<p><code>yarn =&gt; yarn build =&gt; cache node_modules and build</code></p>



<p>The test job:</p>



<p><code>yarn =&gt; yarn test</code></p>



<p>The lint job:</p>



<p><code>yarn =&gt; yarn lint</code></p>



<p>The visual regression test job:</p>



<p><code>yarn =&gt; yarn build =&gt; yarn visual-regression</code></p>



<p>Now wait a minute &#8211; why run the install in all of them?</p>



<p>We could just create a job that installs and builds and caches that as we learned in the caching part. But&#8230; we also said that the jobs run in parallel. That means, we can&#8217;t tell if our installation and build finished before we get to the installation and build in the other jobs.</p>



<p>For this we have the <code>needs</code> property.  It takes care of <code>dependencies</code>. That means, that if a job needs to run after a some build step, it will wait for it. We already saw it in the code snippets above. Let&#8217;s look at the <code>workflow_call</code> example:</p>



<pre class="wp-block-code"><code>name: '&#x1f9ec; Pre Release'

on:
  push:
    branches: main

jobs:
  call-lint-and-build:
    uses: vonage/vivid-3/.github/workflows/_lint-and-build.yml@main

  call-unit-tests:
    needs: call-lint-and-build
    uses: vonage/vivid-3/.github/workflows/_unit-tests.yml@main

  call-upload-artifact:
    needs: call-unit-tests
    uses: vonage/vivid-3/.github/workflows/_upload-artifact.yml@main

  call-pre-release:
    needs: call-upload-artifact
    uses: vonage/vivid-3/.github/workflows/_publish-package.yml@main
    with:
      version: 3.0.0</code></pre>



<p>The <code>call-lint-and-build</code> is called first. The <code>call-unit-tests</code> depends on it and will start only when the build finishes. After the test we upload artifacts. The artifacts are later used in the <code>call-pre-release</code>.</p>



<p>Github actions creates diagrams for us and it looks like this:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="121" src="/wp-content/uploads/2021/12/image-2.png" alt="" class="wp-image-1202" srcset="/wp-content/uploads/2021/12/image-2.png 1024w, /wp-content/uploads/2021/12/image-2.png 300w, /wp-content/uploads/2021/12/image-2.png 768w, /wp-content/uploads/2021/12/image-2.png 1536w, /wp-content/uploads/2021/12/image-2.png 2048w, /wp-content/uploads/2021/12/image-2.png 268w, /wp-content/uploads/2021/12/image-2.png 1280w, /wp-content/uploads/2021/12/image-2.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Of course this is not an optimal solution for anything and just a show case, but you can play with it and use the principle to create the optimal solution for your use case. </p>



<h2 class="wp-block-heading" id="repository_integration_rules"><span class="ez-toc-section" id="5_Repository_Integration_Rules"></span>#5: Repository Integration Rules<span class="ez-toc-section-end"></span></h2>



<p>We have our actions setup. That&#8217;s cool. Now it&#8217;s time to use their super powers to enforce some laws.</p>



<p>With github actions, being part of github, it is super easy.</p>



<p>Settings =&gt; Branches =&gt; Add Rule</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/learn.vonage.com/content/blog/setting-up-ci-cd-with-github-actions/image_3.png?w=640&#038;ssl=1" alt="branch settings"/><figcaption>Go to <code>Settings =&gt; Branches =&gt; Add rule</code></figcaption></figure></div>



<p>Here we&#8217;ll select&nbsp;<strong>Require status checks to pass before merging</strong>&nbsp;and check everything underneath it. You&#8217;ll see all workflows that are required to enable merge &#8211; in our case we only have&nbsp;<code>build-test</code>.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/learn.vonage.com/content/blog/setting-up-ci-cd-with-github-actions/image_4.png?w=640&#038;ssl=1" alt="require status checks"/><figcaption>Make sure you setup the right rules&#8230;</figcaption></figure></div>



<p>For&nbsp;<strong>Branch name pattern</strong>&nbsp;insert&nbsp;<code>main</code>&nbsp;and create the rule. And if you go back to the pull request page, you&#8217;ll see that no pull requests can be merged before the tests pass, unless of course you have admin privileges.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/learn.vonage.com/content/blog/setting-up-ci-cd-with-github-actions/image_5.png?w=640&#038;ssl=1" alt="cannot merge yet"/><figcaption>It looks kind of like this &#8211; and it makes sure people can&#8217;t merge without a pull request. This acts as a quality gateway for your whole repository!</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="6_Saving_Computation_Time_by_Stopping_Obsolete_Workflows"></span>#6: Saving Computation Time by Stopping Obsolete Workflows<span class="ez-toc-section-end"></span></h2>



<p>We&#8217;ve optimized and safeguarded our CI/CD flow.  Can we optimize more? Yes we can!</p>



<p>Let&#8217;s say you created a Pull Request.  Our CI flow started rolling.</p>



<p>Now you forgot to add something in the code &#8211; you make a quick fix which takes 2 seconds and push it.</p>



<p>What happens now, by default, is that the old workflow keeps on running, while your last push initiated another one. That is resource wasting 101! How can we tell one workflow a new child spawned and it can stop?</p>



<p>The answer is: <strong>The Concurrency </strong>property!</p>



<pre class="wp-block-code"><code>name: Master Pull Request

on:
  pull_request:
    branches:
      - main

concurrency:
  group: ci-tests-${{ github.ref }}-1
  cancel-in-progress: true</code></pre>



<p>By adding the concurrency and setting <code>cancel-in-progress</code> to true, github actions will search for a running process of the same group and stop it before starting a new one.  How neat is that? Your devops team will LOVE you for it!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="7_Use_Your_Own_Docker_Image_in_Github_Actions"></span>#7: Use Your Own Docker Image in Github Actions<span class="ez-toc-section-end"></span></h2>



<p>Sometimes, you will have your own special needs. For instance, you will have your own setup or even proprietary software needed for compilation environment. </p>



<p>In this case, you might find it more useful rather than install all the dependencies (JAVA runtime, python, special language libraries etc.) just create a docker image of this environment.  Then, when you upload it to a hub (e.g. docker hub) you can use it directly in your workflow:</p>



<pre class="wp-block-code"><code>visual-regression:
    needs: build
    runs-on: ubuntu-latest
    container: drizzt99/vonage:1.0.0
    env:
      GITHUB_TOKEN: ${{ github.token }}
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
          cache: 'npm'
      - run: npm install
      - run: npm run build &amp;&amp; ./scripts/visual-tests/run.tests.sh</code></pre>



<p>The workflow above runs the visual regression checks. I wanted to set the browser versions as well as the playwright versions so as to have less flaky tests. This way, I&#8217;ll be able to run the tests locally on the same image it runs on during the CI.</p>



<p>I&#8217;ve created a docker image of my setup, uploaded it to docker hub and now I reference it in my <code>yml</code> file via the <code>container</code> property ( <code><meta charset="utf-8">container: drizzt99/vonage:1.0.0</code>).</p>



<p>This helps you twofold:</p>



<ol class="wp-block-list"><li>Helps you avoid missing setup processes or misbehaving installations that are OS related</li><li>It helps you avoid version mismatch in your CI tools (like I did with playwright and its browser drivers).</li></ol>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Github actions is awesome. It has its quirks, and it sometimes feels like a beta product. That&#8217;s true. But it also advances very fast and the time needed to setup even complex scenarios is relatively short.</p>



<p>I hope that with the tricks above you learned something new. I know this blog post will save me time in the future as I&#8217;ll get back to it to use these tricks again.</p>



<p>Thanks a lot to <a href="https://dev.to/yinon" data-type="URL" data-id="https://dev.to/yinon" target="_blank" rel="noreferrer noopener">Yinon Oved</a> for the kind and thorough review.</p>



<p>Featured image by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Nick Fewings</a>&nbsp;on&nbsp;<a href="https://unsplash.com/s/photos/heart?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></p>

