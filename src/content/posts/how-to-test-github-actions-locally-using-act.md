---
title: How to test github actions locally using Act?
slug: how-to-test-github-actions-locally-using-act
published: 2020-11-29T09:49:10
updated: 2021-08-10T16:53:37
author: Yonatan Kra
description: Github actions are taking a considerable part of the devops world. Developers find them super friendly for most use cases. Developing your flow can be much faster if you can run them locally. This article will show you how. In our team we are running and developing multiple github actions daily. For a while, the [&hellip;]
categories:
  - name: devops
    slug: devops
    path: devops
  - name: github actions
    slug: github-actions
    path: devops/github-actions
tags: []
canonical: https://yonatankra.com/how-to-test-github-actions-locally-using-act/
comments: []
---


<p class="has-medium-font-size">Github actions are taking a considerable part of the devops world.  Developers find them super friendly for most use cases.  Developing your flow can be much faster if you can run them locally. This article will show you how.</p>



<p>In our team we are running and developing multiple github actions daily.  For a while, the only way to test them was to write a job or edit an existing one and push the change to github. This development flow is time consuming and discouraging.</p>



<p>A great open source project allows you to run your github <code>yaml</code> files locally with all the goodies of github actions. Let&#8217;s see how it is done.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d467229" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d467229"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-test-github-actions-locally-using-act/#How_to_Install_Act" >How to Install Act</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-test-github-actions-locally-using-act/#How_to_run_your_github_commands_locally" >How to run your github commands locally?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-test-github-actions-locally-using-act/#How_to_pass_secrets_into_your_local_github_actions_workflows" >How to pass secrets into your local github actions workflows?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-test-github-actions-locally-using-act/#How_to_save_time_running_github_actions_locally" >How to save time running github actions locally?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-test-github-actions-locally-using-act/#How_to_easily_use_Git_in_your_local_github_actions_workflows" >How to easily use Git in your local github actions workflows?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-test-github-actions-locally-using-act/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Install_Act"></span>How to Install Act<span class="ez-toc-section-end"></span></h2>



<p>Act is an open source project that allows you to run your github flow locally. The first step is to install it. You have various ways to install it on various machines. </p>



<p>On Mac and linux you can use:</p>



<pre class="wp-block-code"><code>curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash</code></pre>



<p>If you are running Windows, download the&nbsp;<a href="https://github.com/nektos/act/releases/latest" target="_blank" rel="noopener">latest release</a>&nbsp;and add the binary into your PATH.</p>



<p>Other installation methods can be found <a rel="noreferrer noopener" href="https://github.com/nektos/act#installation" target="_blank">here</a>.</p>



<p>Once Act is installed, make sure you have Docker installed. Either install <a rel="noreferrer noopener" href="https://docs.docker.com/docker-for-mac/install/" data-type="URL" data-id="https://docs.docker.com/docker-for-mac/install/" target="_blank">docker for mac</a> or <a rel="noreferrer noopener" href="https://docs.docker.com/docker-for-windows/install/" target="_blank">docker for windows</a>. </p>



<p>After <code>docker</code> is installed, run it if it is not running and make sure the docker logo is stable. </p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="300" height="250" src="/wp-content/uploads/2020/11/dockerLoadingAndReady-1.gif" alt="" class="wp-image-744"/><figcaption>Figure 1: Docker loading and ready icon states</figcaption></figure></div>



<p>Once docker and Act are installed, you are set to go.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_run_your_github_commands_locally"></span>How to run your github commands locally?<span class="ez-toc-section-end"></span></h2>



<p>cd into your projects&#8217; folder.  In your folder you should have a <code>.github/workflows</code> folder with your github actions. If you don&#8217;t, create one and add a workflow <code>yaml</code> file. </p>



<p>Here&#8217;s an example for a valid <code>yaml</code> file:</p>



<figure class="wp-block-table"><table><tbody><tr><td><style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106673412" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-buildandtest-yml" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-yaml  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="buildAndTest.yml content, created by YonatanKra on 08:46AM on November 29, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="buildAndTest.yml">
        <tr>
          <td id="file-buildandtest-yml-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-buildandtest-yml-LC1" class="blob-code blob-code-inner js-file-line">name: Build &amp; Test</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-buildandtest-yml-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-buildandtest-yml-LC3" class="blob-code blob-code-inner js-file-line">on:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-buildandtest-yml-LC4" class="blob-code blob-code-inner js-file-line">  pull_request:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-buildandtest-yml-LC5" class="blob-code blob-code-inner js-file-line">    branches:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-buildandtest-yml-LC6" class="blob-code blob-code-inner js-file-line">      - master</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-buildandtest-yml-LC7" class="blob-code blob-code-inner js-file-line">      - develop</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-buildandtest-yml-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-buildandtest-yml-LC9" class="blob-code blob-code-inner js-file-line">jobs:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-buildandtest-yml-LC10" class="blob-code blob-code-inner js-file-line">  build-publish:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-buildandtest-yml-LC11" class="blob-code blob-code-inner js-file-line">    runs-on: ubuntu-latest</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-buildandtest-yml-LC12" class="blob-code blob-code-inner js-file-line">    env:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-buildandtest-yml-LC13" class="blob-code blob-code-inner js-file-line">      ARTIFACTORY_AUTH_TOKEN: ${{secrets.ARTIFACTORY_AUTH_TOKEN}}</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-buildandtest-yml-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-buildandtest-yml-LC15" class="blob-code blob-code-inner js-file-line">    steps:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-buildandtest-yml-LC16" class="blob-code blob-code-inner js-file-line">      - name: Checkout</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-buildandtest-yml-LC17" class="blob-code blob-code-inner js-file-line">        uses: actions/checkout@v2</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-buildandtest-yml-LC18" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-buildandtest-yml-LC19" class="blob-code blob-code-inner js-file-line">          fetch-depth: 0</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-buildandtest-yml-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-buildandtest-yml-LC21" class="blob-code blob-code-inner js-file-line">      - name: Setup NodeJS 14</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-buildandtest-yml-LC22" class="blob-code blob-code-inner js-file-line">        uses: actions/setup-node@v1</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-buildandtest-yml-LC23" class="blob-code blob-code-inner js-file-line">        with:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-buildandtest-yml-LC24" class="blob-code blob-code-inner js-file-line">          node-version: 14</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-buildandtest-yml-LC25" class="blob-code blob-code-inner js-file-line">      </td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-buildandtest-yml-LC26" class="blob-code blob-code-inner js-file-line">      - name: Install dependencies</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-buildandtest-yml-LC27" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-buildandtest-yml-LC28" class="blob-code blob-code-inner js-file-line">          npm install -g yarn</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-buildandtest-yml-LC29" class="blob-code blob-code-inner js-file-line">          yarn install</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-buildandtest-yml-LC30" class="blob-code blob-code-inner js-file-line">        env:</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-buildandtest-yml-LC31" class="blob-code blob-code-inner js-file-line">          ARTIFACTORY_AUTH_TOKEN: ${{secrets.ARTIFACTORY_AUTH_TOKEN}}</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-buildandtest-yml-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-buildandtest-yml-LC33" class="blob-code blob-code-inner js-file-line">      - name: Test</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-buildandtest-yml-LC34" class="blob-code blob-code-inner js-file-line">        run: |</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-buildandtest-yml-LC35" class="blob-code blob-code-inner js-file-line">          yarn lint</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-buildandtest-yml-LC36" class="blob-code blob-code-inner js-file-line">          yarn test</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-buildandtest-yml-LC37" class="blob-code blob-code-inner js-file-line">      </td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-buildandtest-yml-LC38" class="blob-code blob-code-inner js-file-line">      - name: Build</td>
        </tr>
        <tr>
          <td id="file-buildandtest-yml-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-buildandtest-yml-LC39" class="blob-code blob-code-inner js-file-line">        run: yarn build</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/15445e99580266553ed68ad37d7de5dc/raw/621565edd9357d55d92a9d40bf641ec7539c7464/buildAndTest.yml" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/15445e99580266553ed68ad37d7de5dc#file-buildandtest-yml" class="Link--inTextBlock" target="_blank" rel="noopener">
          buildAndTest.yml
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>
</td></tr></tbody></table><figcaption>Code snippet 1: a valid github action</figcaption></figure>



<p>If you&#8217;ve setup <code>act</code>, <code>docker</code> and the <code>yml</code> file you can now run the following command in your command line:</p>



<pre class="wp-block-code"><code>act</code></pre>



<p>This will run a docker container, and run the github workflows in it.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_pass_secrets_into_your_local_github_actions_workflows"></span>How to pass secrets into your local github actions workflows?<span class="ez-toc-section-end"></span></h2>



<p>in code snippet 1 in lines 13 and 31 we use secrets that are set in the repository&#8217;s settings. In order to make these available locally you have two options.</p>



<p>The first option is to use the <code>-s</code> parameter in the cli:</p>



<pre class="wp-block-code"><code>act -s ARTIFACTORY_AUTH_TOKEN=${ARTIFACTORY_AUTH_TOKEN} </code></pre>



<p>You can replace the secret&#8217;s name (<code>ARTIFACTORY_AUTH_TOKEN</code> with your secret&#8217;s name. Of course the value in this case is an existing variable on my machine which you can replace with any value.</p>



<p>You could run it without setting a value, in which case you will be prompted for a value.</p>



<p>You can also use a secrets file like this:</p>



<pre class="wp-block-code"><code>act --secret-file my.secrets </code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_save_time_running_github_actions_locally"></span>How to save time running github actions locally?<span class="ez-toc-section-end"></span></h2>



<p>Another important tip is to be able to run faster. In my case, I run a JavaScript project with <code>npm</code> or <code>yarn</code>. The step <code>Install dependencies</code> is using <code>yarn</code> in order to install my project&#8217;s dependencies. This might take a while.</p>



<p>We can speed this up by using the <code>bind</code> option:</p>



<pre class="wp-block-code"><code>act -s ARTIFACTORY_AUTH_TOKEN=${ARTIFACTORY_AUTH_TOKEN} -b</code></pre>



<p>Notice the <code>-b</code> in the end of the above command. This will take the current project&#8217;s folder with its existing <code>node_modules</code> and thus save a lot of time with unneeded installation.</p>



<p>Note that this might cause changes to local files if you are doing any file manipulations during the workflow.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_easily_use_Git_in_your_local_github_actions_workflows"></span>How to easily use Git in your local github actions workflows?<span class="ez-toc-section-end"></span></h2>



<p>Using the command <code>act</code> on its own won&#8217;t be enough if you intend to run <code>git</code> commands (e.g. <code>git fetch</code> or <code>git add .</code>). The best way to make sure your workflows run exactly like in the repository itself is to use the act-environments docker image.</p>



<p>Our command will now look like this:</p>



<pre class="wp-block-code"><code>act -s ARTIFACTORY_AUTH_TOKEN=${ARTIFACTORY_AUTH_TOKEN} -b -P ubuntu-latest=nektos/act-environments-ubuntu:18.04</code></pre>



<p>This will run our workflow in an environment similar to the one being run with the latest ubuntu in github actions.</p>



<p>This comes with git support and work out of the box for most workflows (worked for all of my workflows 🙂 ).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this article we&#8217;ve learned how to run github actions locally using docker and the act project.</p>



<p>Act has many more options you can play with to make your devops with github actions a lot faster by working locally.</p>



<p>Thanks to <a rel="noreferrer noopener" href="https://dolevoper.io/" target="_blank">Omer Dolev</a> from Microsoft for the kind review.</p>



<p>Featured image was taken from <a rel="noreferrer noopener" href="https://lab.github.com/githubtraining/github-actions:-write-docker-container-actions" target="_blank">https://lab.github.com/githubtraining/github-actions:-write-docker-container-actions</a></p>

