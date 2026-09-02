---
title: How to use webpack and HTML Webpack Plugin to generate HTML pages for multiple entries in 2 steps?
slug: how-to-use-htmlwebpackplugin-for-multiple-entries
published: 2022-03-04T08:04:08
updated: 2022-03-04T08:04:11
author: Yonatan Kra
description: Here’s how to create an HTML for a specific or every entry file using Webpack and HTML Webpack Plugin. A really short explanation. Webpack Bundling in a Nutshell Webpack allows you to bundle your app from one or multiple files. It starts from a file called “entry” and follows your import or require calls. It [&hellip;]
categories: []
tags: []
canonical: https://yonatankra.com/how-to-use-htmlwebpackplugin-for-multiple-entries/
comments: []
---


<p class="has-medium-font-size">Here&#8217;s how to create an HTML for a specific or every entry file using Webpack and HTML Webpack Plugin. A really short explanation.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b79669a" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b79669a"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-use-htmlwebpackplugin-for-multiple-entries/#Webpack_Bundling_in_a_Nutshell" >Webpack Bundling in a Nutshell</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-use-htmlwebpackplugin-for-multiple-entries/#Real_Life_Example" >Real Life Example</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-use-htmlwebpackplugin-for-multiple-entries/#Reasons_to_use_multiple_entries_with_webpack" >Reasons to use multiple entries with webpack</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-use-htmlwebpackplugin-for-multiple-entries/#How_to_generate_multiple_entries" >How to generate multiple entries?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-use-htmlwebpackplugin-for-multiple-entries/#How_to_generate_an_HTML_output_for_every_entry_with_HTMLWebpackPlugin" >How to generate an HTML output for every entry with HTMLWebpackPlugin?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-use-htmlwebpackplugin-for-multiple-entries/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Webpack_Bundling_in_a_Nutshell"></span>Webpack Bundling in a Nutshell<span class="ez-toc-section-end"></span></h2>



<p>Webpack allows you to bundle your app from one or multiple files.  It starts from a file called &#8220;entry&#8221; and follows your <code>import</code> or <code>require</code> calls.  It then smartly concatenates your files and even splits them for lazy loading if needed.</p>



<p>Webpack can also accept multiple entries. For each entry, a bundle will be created. When bundling a front end entry point, you sometimes want to generate an HTML file per entry.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>If you want to learn webpack from scratch, there&#8217;s an old article of mine <a href="/no-nonsense-webpack-project/" data-type="post" data-id="1364">here</a> that walks you through building a full webpack project.</p></blockquote>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Real_Life_Example"></span>Real Life Example<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s take a look at a real life example from a production setup. You can follow the explanation and run it on your machine locally to better illustrate this use case.</p>



<p>In this setup, we have a UI components library with various components. For each component, we create a test page. This test page is then snapshot-tested using playwright for a visual regression test.</p>



<p>Here&#8217;s the repository: <a href="https://github.com/Vonage/vivid" target="_blank" rel="noreferrer noopener">https://github.com/Vonage/vivid</a></p>



<p>The magic happens in the <a href="https://github.com/Vonage/vivid/tree/master/ui-tests" target="_blank" data-type="URL" data-id="https://github.com/Vonage/vivid/tree/master/ui-tests" rel="noreferrer noopener">ui-tests folder</a>. If you clone the repository, yarn install and then build the ui-tests (yarn build-ui-tests) webpack will build a <code>ui-tests/tmp</code> folder as well as a <code>ui-tests/dist</code>.</p>



<p>In the <code>tmp</code> folder you&#8217;ll find the compiled results of the source code. This is done using <a href="https://github.com/Vonage/vivid/blob/master/ui-tests/utils/preBundle.js#L7" target="_blank" data-type="URL" data-id="https://github.com/Vonage/vivid/blob/master/ui-tests/utils/preBundle.js#L7" rel="noreferrer noopener">a custom webpack plugin</a> that takes the source code and adds it to a test template file.</p>



<p>In <code>dist</code> folder you&#8217;ll find multiple <code>html</code> and <code>js</code> files &#8211; each for a different component.</p>



<p>If you run <code>yarn ui-tests -s</code> a webpack-dev-server will run and allow you to browse the test cases corresponding to the files in the <code>dist</code> folder.</p>



<p></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Reasons_to_use_multiple_entries_with_webpack"></span>Reasons to use multiple entries with webpack<span class="ez-toc-section-end"></span></h2>



<p>Generating multiple HTML outputs for multiple entries can be useful for various reasons.  You&#8217;d might want to generate multiple applications, or to demo upload a static website to <code>github pages</code>.</p>



<p>In my case, I used it in order to generate dynamic test pages for our visual regression system. I also used the same system to create a development environment for our Design System web components.  </p>



<p>This development environment looks like this: </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_generate_multiple_entries"></span>How to generate multiple entries?<span class="ez-toc-section-end"></span></h2>



<p>The <code>entry</code> property in the <code>Webpack</code> configuration can accept an object with <strong>named entries</strong>.  It can look something like this:</p>



<pre class="wp-block-code"><code>{
  "entry1": "path/to/entry1",
  "entry2": "path/to/entry2"
}</code></pre>



<p>If we have multiple entries, we can even create this object dynamically.  </p>



<p>Let&#8217;s assume we have multiple components and we can get their names in some way: </p>



<p><code>const listOfComponents = ['component1', 'component2', 'component3'];</code></p>



<p>It can be just a manual list of names, as you see in the code above.  It can also be something more complex like using nodejs <code>fs</code> in order to get them from the file system:</p>



<pre class="wp-block-preformatted">const listOfComponents = getComponentsFolders().filter(component =&gt; !componentsExcludeList.includes(component));</pre>



<p>In any event, we have a list of components &#8211; the entry names. </p>



<p>We can now generate a list of <strong>named entries</strong>. We can do this manually, as we saw above.  Or we can accomplish it with code that looks something like this:</p>



<pre class="wp-block-code"><code>const entry = listOfComponents.reduce((entries, componentName) =&gt; {
	entries&#91;componentName] = path.join(__dirname, `tmp/${componentName}/index.js`);
	return entries;
}, {});</code></pre>



<p><code>entry</code> looks like this eventually:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist114083827" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-entries-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.entries.json content, created by YonatanKra on 04:59AM on January 12, 2022."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpack.entries.json">
        <tr>
          <td id="file-webpack-entries-json-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpack-entries-json-LC1" class="blob-code blob-code-inner js-file-line">{</td>
        </tr>
        <tr>
          <td id="file-webpack-entries-json-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-entries-json-LC2" class="blob-code blob-code-inner js-file-line">	&quot;vwc-accordion&quot;: &quot;/Users/ykra/projects/my-app/ui-tests/tmp/vwc-accordion/index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-entries-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-entries-json-LC3" class="blob-code blob-code-inner js-file-line">	&quot;vwc-audio&quot;: &quot;/Users/ykra/projects/my-app/ui-tests/tmp/vwc-audio/index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-entries-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-entries-json-LC4" class="blob-code blob-code-inner js-file-line">	&quot;vwc-badge&quot;: &quot;/Users/ykra/projects/my-app/ui-tests/tmp/vwc-badge/index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-entries-json-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-entries-json-LC5" class="blob-code blob-code-inner js-file-line">	&quot;vwc-banner&quot;: &quot;/Users/ykra/projects/my-app/ui-tests/tmp/vwc-banner/index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-entries-json-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-entries-json-LC6" class="blob-code blob-code-inner js-file-line">	&quot;vwc-button&quot;: &quot;/Users/ykra/projects/my-app/ui-tests/tmp/vwc-button/index.js&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-entries-json-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-entries-json-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/908ac86ad5b9f15daf346138c67d0497/raw/cdfc5ff9a047ec1d22b8dbbbd6779ffa1115b7c4/webpack.entries.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/908ac86ad5b9f15daf346138c67d0497#file-webpack-entries-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.entries.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>An <code>entry</code> object that maps a lot of entries to their relative input file</figcaption></figure>



<p>Each entry has a name (the property name like <code>vwc-accordion</code>) and a path to the actual entry file. We will use the entry&#8217;s name when generating the HTML files (the number of entries is virually limitless &#8211; in our project we have around 30 entries &#8211; one for each component).</p>



<p>Inside our <code>webpack.config.js</code> file we can then use the <code>entry</code> in order to tell webpack to to create my chunks like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist114083928" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-config-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.config.js content, created by YonatanKra on 05:04AM on January 12, 2022."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpack.config.js">
        <tr>
          <td id="file-webpack-config-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpack-config-js-LC1" class="blob-code blob-code-inner js-file-line">const config = {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-config-js-LC2" class="blob-code blob-code-inner js-file-line">	entry,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-config-js-LC3" class="blob-code blob-code-inner js-file-line">	output: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-config-js-LC4" class="blob-code blob-code-inner js-file-line">		filename: &quot;[name].bundle.js&quot;, // the file name would be my entry&quot;s name with a &quot;.bundle.js&quot; suffix</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-config-js-LC5" class="blob-code blob-code-inner js-file-line">		path: path.resolve(__dirname, &quot;dist&quot;) // put all of the build in a dist folder</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-config-js-LC6" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-config-js-LC7" class="blob-code blob-code-inner js-file-line"> }</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/58f55b85fe389c1d5d058af9408e0f05/raw/c2d3041b187aea368d94a76806d29164ea22fe7e/webpack.config.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/58f55b85fe389c1d5d058af9408e0f05#file-webpack-config-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.config.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Using the <code>entry</code> in the webpack config and mapping every entry to an output <code>chunk</code> using the <code>output</code> property</figcaption></figure>



<p>Webpack takes the entries and bundles them to their own files according to the output definition: call the bundles according to the entry name and put them all in the <code>dist</code> folder.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_generate_an_HTML_output_for_every_entry_with_HTMLWebpackPlugin"></span>How to generate an HTML output for every entry with HTMLWebpackPlugin?<span class="ez-toc-section-end"></span></h2>



<p><code>HTMLWebpackPlugin</code> accepts two important arguments for the task at hand.</p>



<p>The first is <code>chunks</code>, which accepts what chunks to add to the HTML file.</p>



<p>The second is <code>filename</code> &#8211; which will define the name of the HTML file.</p>



<p>So all we need to do is generate a list of <code>HTMLWebpackPlugin</code> instances with the right chunk names. Now that we understand how to generate multiple entries, we can use the same trick in order to generate that list:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist114083966" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-html-generators-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="html.generators.js content, created by YonatanKra on 05:07AM on January 12, 2022."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="html.generators.js">
        <tr>
          <td id="file-html-generators-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-html-generators-js-LC1" class="blob-code blob-code-inner js-file-line">const htmlGenerators = listOfComponents.reduce((entries, componentName) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-html-generators-js-LC2" class="blob-code blob-code-inner js-file-line">	entries.push(new HtmlWebpackPlugin({</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-html-generators-js-LC3" class="blob-code blob-code-inner js-file-line">		inject: true,</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-html-generators-js-LC4" class="blob-code blob-code-inner js-file-line">		chunks: [componentName],</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-html-generators-js-LC5" class="blob-code blob-code-inner js-file-line">		filename: `${componentName}.html`</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-html-generators-js-LC6" class="blob-code blob-code-inner js-file-line">	}));</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-html-generators-js-LC7" class="blob-code blob-code-inner js-file-line">	return entries;</td>
        </tr>
        <tr>
          <td id="file-html-generators-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-html-generators-js-LC8" class="blob-code blob-code-inner js-file-line">}, []);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/99ad52ccd306510f7f2972dcba5294b5/raw/16de097acffad49a402948e1797312c3c65033df/html.generators.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/99ad52ccd306510f7f2972dcba5294b5#file-html-generators-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          html.generators.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>For each component we create an HTMLWebpackPlugin instance</figcaption></figure>



<p>In essence, we generate an array of <code>HTMLWebpackPlugin</code> instances.  </p>



<p>Each instance states the <code>chunk</code> to be used as an entry name &#8211; the same we stated in the <code>entry</code> object for the webpack <code>entry</code> property. This is how <code>HTMLWebpackPlugin</code> &#8220;knows&#8221; to generate the HTML to the specific entrypoint&#8217;s bundle. </p>



<p>The filename can be whatever &#8211; but makes sense to use the entry name as well (in this case, the <code>componentName</code> is used for the entry name).</p>



<p>Eventually I wrap it up in the webpack config like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist114084085" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-config-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.config.js content, created by YonatanKra on 05:15AM on January 12, 2022."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpack.config.js">
        <tr>
          <td id="file-webpack-config-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpack-config-js-LC1" class="blob-code blob-code-inner js-file-line">const config = {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-config-js-LC2" class="blob-code blob-code-inner js-file-line">	entry,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-config-js-LC3" class="blob-code blob-code-inner js-file-line">	output: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-config-js-LC4" class="blob-code blob-code-inner js-file-line">		filename: &quot;[name].bundle.js&quot;, // the file name would be my entry&quot;s name with a &quot;.bundle.js&quot; suffix</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-config-js-LC5" class="blob-code blob-code-inner js-file-line">		path: path.resolve(__dirname, &quot;dist&quot;) // put all of the build in a dist folder</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-config-js-LC6" class="blob-code blob-code-inner js-file-line">	},</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-config-js-LC7" class="blob-code blob-code-inner js-file-line">	plugins: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-config-js-LC8" class="blob-code blob-code-inner js-file-line">		new CleanWebpackPlugin(), // use the clean plugin to delete the dist folder before a build</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-config-js-LC9" class="blob-code blob-code-inner js-file-line">		&#8230;htmlGenerators</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-config-js-LC10" class="blob-code blob-code-inner js-file-line">	]</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpack-config-js-LC11" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8805acf656fb4b7e60c30b670519c0ae/raw/453422e60407566c4a3f6c0e01e13891189c9e10/webpack.config.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8805acf656fb4b7e60c30b670519c0ae#file-webpack-config-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.config.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Adding the <code>htmlGenerators</code> to the plugins list</figcaption></figure>



<p>And this is all that is behind the magic of multiple HTML files for multiple entries with HTMLWebpackPlugin.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Generating multiple HTML outputs for multiple entries can be useful for various reasons. It is very easy to generate it using Webpack and HTMLWebpackPlugin. </p>



<p>I used it in order to generate dynamic test pages for our visual regression system. I also used the same system to create a development environment for our Design System web components.  </p>



<p>Using the same setup, I&#8217;ve created a simple &#8220;main page&#8221; that allows developers to navigate between the different tests and test them live using a webpack dev server.</p>



<p>I add a <code>main</code> entry that will connect the other entries by adding another property to the <code>entry</code> object: </p>



<pre class="wp-block-preformatted">entry.mainPage = (<strong><em>path</em></strong>.join(__dirname, "assets/main.js"));</pre>



<p>The <code>main.js</code> file practically creates a menu that redirects to the other HTML files. In essence, we eventually get a &#8220;website&#8221; for developers to work with on every component in isolation. Using webpack&#8217;s dev server allows us a better development experience. For instance, we get HMR out of the box.</p>



<p>Webpack is a great tool. Very versatile with a huge ecosystem. The <a href="https://webpack.js.org/plugins/html-webpack-plugin/" target="_blank" data-type="URL" data-id="https://webpack.js.org/plugins/html-webpack-plugin/" rel="noreferrer noopener">HTMLWebpackPlugin</a> was there quite from the start &#8211; and I believe it is one of the most popular of webpack&#8217;s plugins. Now you know how to use it in order to generate multiple HTML files for multiple entries.</p>



<p><em>Thanks a lot to <a href="https://www.facebook.com/perezmike" target="_blank" data-type="URL" data-id="https://www.facebook.com/perezmike" rel="noreferrer noopener">Michael Perez</a> and <a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener">Yuval Bar Levi</a> for the review of this article 🙂</em></p>

