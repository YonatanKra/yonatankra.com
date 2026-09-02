---
title: No-nonsense webpack project
slug: no-nonsense-webpack-project
published: 2018-02-22T10:29:00
updated: 2022-01-12T10:41:16
author: Yonatan Kra
description: "Or: How to use Webpack to build a project from scratch? Using webpack without fully understanding it, as if it were magic? Heard about the wonders of webpack, but got flustered by its ominous documentation? Are you from outer-space (like — a totally different galaxy) and haven’t heard of webpack at all? In any of these cases [&hellip;]"
categories: []
tags: []
canonical: https://yonatankra.com/no-nonsense-webpack-project/
comments: []
---


<p class="has-medium-font-size">Or: How to use Webpack to build a project from scratch? </p>



<p id="38e3">Using webpack without fully understanding it, as if it were magic? Heard about the wonders of webpack, but got flustered by its ominous documentation? Are you from outer-space (like — a&nbsp;<em>totally</em>&nbsp;different galaxy) and haven’t heard of webpack at all? In any of these cases (and many more), this post is for you!</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>Webpack: The Final Frontier. These are the voyages of the flagship app of your enterprise (or just your pet project). Its tl;dr mission: to boldly go where many developers have gone before!</p></blockquote>



<p id="1d27"><strong>What is webpack?</strong>&nbsp;In one word — a&nbsp;<strong>bundler</strong>. In a few words, webpack is a piece of code that takes your beautifully structured JavaScript (JS) project and bundles it into static files for production, all with a single command in the command-line interpreter (CLI). Magic!</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1f44b2e8" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1f44b2e8"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-1" href="/no-nonsense-webpack-project/#What_are_we_going_to_build" >What are we going to build?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-2" href="/no-nonsense-webpack-project/#Lets_build_a_Webpack_project" >Let’s build a Webpack project</a><ul class='ez-toc-list-level-2' ><li class='ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/no-nonsense-webpack-project/#Assumptions" >Assumptions</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/no-nonsense-webpack-project/#Setup_the_app" >Setup the app</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/no-nonsense-webpack-project/#Configure_webpack" >Configure webpack</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/no-nonsense-webpack-project/#Lets_code_our_app" >Let’s code our app!</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-7" href="/no-nonsense-webpack-project/#Recap" >Recap</a></li><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-8" href="/no-nonsense-webpack-project/#The_form_module" >The form module</a><ul class='ez-toc-list-level-2' ><li class='ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/no-nonsense-webpack-project/#Setting_up_the_forms_API" >Setting up the form’s API</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-10" href="/no-nonsense-webpack-project/#The_fireworks_module" >The fireworks module</a><ul class='ez-toc-list-level-2' ><li class='ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/no-nonsense-webpack-project/#Head_scratching_moment" >Head scratching moment</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-12" href="/no-nonsense-webpack-project/#Best_practices%E2%80%94_development_and_production" >Best practices— development and production</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-13" href="/no-nonsense-webpack-project/#Bonus_Adding_Bootstrap_to_the_mix" >Bonus: Adding Bootstrap to the mix</a></li><li class='ez-toc-page-1 ez-toc-heading-level-1'><a class="ez-toc-link ez-toc-heading-14" href="/no-nonsense-webpack-project/#Summary" >Summary</a></li></ul></nav></div>
<h1 class="wp-block-heading" id="c3e2"><span class="ez-toc-section" id="What_are_we_going_to_build"></span>What are we going to build?<span class="ez-toc-section-end"></span></h1>



<p id="1e91">An awesome app, that’s what. It’s called “Your Phrase Fireworks” (abbreviated YOPF). YOPF’s vision: You enter a phrase into an input field and the phrase is shown surrounded by crazy-cool exploding fireworks. Can’t get much more awesome than that.</p>



<p id="3306"><a href="https://yonatankra.github.io/YOPF/" rel="noreferrer noopener" target="_blank">Click here for the app’s demo</a></p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>Since you are a developer, I assume you are using a modern browser like Chrome or Firefox. If not, please do — we will go over browser compatibility and webpack later on.</p></blockquote>



<h1 class="wp-block-heading" id="1f35"><span class="ez-toc-section" id="Lets_build_a_Webpack_project"></span>Let’s build a Webpack project<span class="ez-toc-section-end"></span></h1>



<h2 class="wp-block-heading" id="3871"><span class="ez-toc-section" id="Assumptions"></span>Assumptions<span class="ez-toc-section-end"></span></h2>



<ol class="wp-block-list"><li>You know some JS, HTML and CSS (nothing fancy —The basics will do)</li><li>You already have Node.js installed. If not,&nbsp;<a href="https://nodejs.org/en/download/" rel="noreferrer noopener" target="_blank">install it</a>&nbsp;and come right back</li><li>You know how to edit files (while I prefer WebStorm IDE, even Notepad will do — although you might prefer&nbsp;<a href="https://www.sublimetext.com/download" rel="noreferrer noopener" target="_blank">Sublime</a>&nbsp;or&nbsp;<a href="https://code.visualstudio.com/download" rel="noreferrer noopener" target="_blank">VSCode</a>)</li><li>You know how to browse folders on your machine</li></ol>



<h2 class="wp-block-heading" id="d196"><span class="ez-toc-section" id="Setup_the_app"></span><strong>Setup the app</strong><span class="ez-toc-section-end"></span></h2>



<p id="a484">Browse to a projects folder on your machine (either via CLI or any visual file explorer). I’ll provide the CLI instructions below, but feel free to use your own methods for file/folder creation.</p>



<p id="9b4b">Every project begins the same way — by creating your project’s folder. To do so, enter the following command line prompts:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>mkdir my-project</code></p></blockquote>



<p id="ce7d">then:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>cd my-project</code></p></blockquote>



<p id="896b">then:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm init -y</code></p></blockquote>



<p id="7f99">Amazing! We now have an npm module. Next, let’s install webpack:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm i webpack -D</code></p></blockquote>



<p id="a1f0">Since this is a real project, we’ll need a few additional prerequisites:</p>



<ol class="wp-block-list"><li>Source control (Git)</li><li>A spec for our app</li></ol>



<p id="34ef">The first is easy; if you don’t have Git installed,&nbsp;<a href="https://git-scm.com/downloads" rel="noreferrer noopener" target="_blank">install it</a>. Now, in your project’s folder, run this:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>git init -q</code></p></blockquote>



<p id="9d0d">Great! We have Git! We won’t touch it in the tutorial, but it’s good practice.</p>



<p id="11eb">On to the second, a spec. Since this is just a blog post, we won’t put too much into this, but the basic gist of our spec would be as follows: We want to build an app in which you type something into an input, click a submit button, and then what you entered into the input appears on a screen with fireworks exploding around it. This app will be called YOPF, short for “Your Phrase Fireworks.”</p>



<p id="8b79">Let’s create our source-files folder:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>mkdir src</code></p></blockquote>



<p id="cc1a">You’re getting good at this :). Can you guess what’s coming next? You got it:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>cd src</code></p></blockquote>



<p id="1aa5">Now, Let’s create an&nbsp;<em>app.js</em>&nbsp;file:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>. &gt; app.js</code></p></blockquote>



<p id="e5f4">If you’re copying my commands above, don’t mind the error; this is just my hacky way of creating a new file on Command Prompt (CMD), Windows’ command-line interpreter. Feel free to use different CLI commands if they suit you better.</p>



<p id="0396">Let’s create our CSS and HTML files:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>.&gt;app.css &amp; .&gt;index.html</code></p></blockquote>



<p id="f27b">Wow — two files with the same CLI command. Can it get any better than that? Yes it can! Let’s edit the files.</p>



<p id="9d60">To begin with, we’ll put something into our&nbsp;<em>index.html</em>&nbsp;file:</p>



<pre class="wp-block-preformatted">&lt;div id="phrase-form-wrapper"&gt;&lt;/div&gt;<br>&lt;div id="phrase-fireworks-wrapper"&gt;&lt;/div&gt;</pre>



<p id="eb87">Cool. We have our wrappers. Since we know that modularity is the name of the game (we&nbsp;<em>do know that</em>, right?), let’s create some modules. I really like it when my apps look the same at every level (and you should be like me… I write blog posts!), so let’s create two more folders inside the&nbsp;<em>src</em>&nbsp;folder:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>mkdir form &amp; mkdir fireworks</code></p></blockquote>



<p id="e80c">…and in each, lets create the same files:</p>



<pre class="wp-block-preformatted">cd form &amp; .&gt;form.index.js &amp; .&gt;form.index.html &amp; .&gt;form.css <br>&amp; cd ../fireworks &amp; .&gt;fireworks.index.js &amp; .&gt;fireworks.index.html &amp; .&gt;fireworks.css</pre>



<p id="7fb6">Now we have an app with two modules. One for the phrase form, one for the fireworks and a “main module” to bind them both to one app.</p>



<h2 class="wp-block-heading" id="eeb3"><span class="ez-toc-section" id="Configure_webpack"></span>Configure webpack<span class="ez-toc-section-end"></span></h2>



<p id="3d72">We also need a&nbsp;<em>webpack.config.js</em>&nbsp;file, which will hold, well… our webpack configuration. What does that mean? It means that, in order for webpack’s “magic” to work, you need to tell it what to do. You can name this file&nbsp;<em>abracadabra&nbsp;</em>or&nbsp;<em>legerdemain&nbsp;</em>or anything that suits your fancy. Thing is —&nbsp;<em>nothing is magical&nbsp;</em>(sorry,&nbsp;<a href="https://www.youtube.com/watch?v=h_y-j-FXuOQ" rel="noreferrer noopener" target="_blank">Jeremy Messersmith</a>…); all that “magical” bundling is a result of the configuration you set up.</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>In general there are&nbsp;<strong>three</strong>&nbsp;<strong>parts</strong>&nbsp;to webpack configuration:</p><p><strong>General configuration:&nbsp;</strong>Tell webpack where the “main” file is (the webpack term is entry), where and how to output everything, how to handle source maps, how to act in Dev Mode, etc.</p><p><strong>Loaders:&nbsp;</strong>The webpack core loads only JS files. Loaders enable webpack to handle different file types (CSS, HTML, images, etc.). You just install them with npm.</p><p><strong>Plugins:&nbsp;</strong>These extend webpack’s abilities to handle things you would normally use automation tools like Gulp or Grunt for, like uglifying your code (the latest trend is to use npm directly).</p></blockquote>



<p id="c0f7">Here’s a list (in no particular order) of things we wish to achieve with webpack while building our app:</p>



<ol class="wp-block-list"><li>Set our main module as the&nbsp;<em>entry</em>&nbsp;to our app</li><li>Load HTML and CSS files</li><li>Uglify our code</li><li>Create a dist folder with an&nbsp;<code>index.html</code>&nbsp;file, which will be the front-end entry point to our app</li></ol>



<p id="ad98">First, the low-hanging fruit — installing our HTML and CSS loaders:</p>



<pre class="wp-block-preformatted">npm i -D html-loader style-loader css-loader</pre>



<p id="a9a9">Now we’ll install 3 plugins that will help us achieve our other goals:</p>



<pre class="wp-block-preformatted">npm i -D uglifyjs-webpack-plugin html-webpack-plugin clean-webpack-plugin</pre>



<p id="cf21">As their names suggest, these plugins help us with file minification, auto-generation of a working index.html, and removal of our build folders before every new build respectively.</p>



<p id="f051">In order to use these, let’s make our <em>webpack.config.js </em>file look like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84429878" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-config-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.config.js content, created by YonatanKra on 01:37PM on December 19, 2017."
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
          <td id="file-webpack-config-js-LC1" class="blob-code blob-code-inner js-file-line">const path = require(&#39;path&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-config-js-LC2" class="blob-code blob-code-inner js-file-line">const webpack = require(&#39;webpack&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-config-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-config-js-LC4" class="blob-code blob-code-inner js-file-line">// require our plugins</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-config-js-LC5" class="blob-code blob-code-inner js-file-line">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-config-js-LC6" class="blob-code blob-code-inner js-file-line">const CleanWebpackPlugin = require(&#39;clean-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-config-js-LC7" class="blob-code blob-code-inner js-file-line">const UglifyJsPlugin = require(&#39;uglifyjs-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-config-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-config-js-LC9" class="blob-code blob-code-inner js-file-line">module.exports = {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-config-js-LC10" class="blob-code blob-code-inner js-file-line">    entry: &#39;./src/app.js&#39;,  // this is our app</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpack-config-js-LC11" class="blob-code blob-code-inner js-file-line">    output: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-webpack-config-js-LC12" class="blob-code blob-code-inner js-file-line">        filename: &#39;[name].bundle.js&#39;, // the file name would be my entry&#39;s name with a &quot;.bundle.js&quot; suffix</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-webpack-config-js-LC13" class="blob-code blob-code-inner js-file-line">        path: path.resolve(__dirname, &#39;dist&#39;) // put all of the build in a dist folder</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpack-config-js-LC14" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-webpack-config-js-LC15" class="blob-code blob-code-inner js-file-line">    plugins: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-webpack-config-js-LC16" class="blob-code blob-code-inner js-file-line">         new UglifyJsPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-webpack-config-js-LC17" class="blob-code blob-code-inner js-file-line">            sourceMap: true</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-webpack-config-js-LC18" class="blob-code blob-code-inner js-file-line">        }),</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-webpack-config-js-LC19" class="blob-code blob-code-inner js-file-line">        new CleanWebpackPlugin([&#39;dist&#39;]), // use the clean plugin to delete the dist folder before a build</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-webpack-config-js-LC20" class="blob-code blob-code-inner js-file-line">        // This plugin creates our index.html that would load the app for us in the browser</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-webpack-config-js-LC21" class="blob-code blob-code-inner js-file-line">        new HtmlWebpackPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-webpack-config-js-LC22" class="blob-code blob-code-inner js-file-line">            title: &#39;Your Phrase Fireworks!&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-webpack-config-js-LC23" class="blob-code blob-code-inner js-file-line">        })</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-webpack-config-js-LC24" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-webpack-config-js-LC25" class="blob-code blob-code-inner js-file-line">    module: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-webpack-config-js-LC26" class="blob-code blob-code-inner js-file-line">        rules: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-webpack-config-js-LC27" class="blob-code blob-code-inner js-file-line">          // use the html loader</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-webpack-config-js-LC28" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-webpack-config-js-LC29" class="blob-code blob-code-inner js-file-line">                test: /\.html$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-webpack-config-js-LC30" class="blob-code blob-code-inner js-file-line">                exclude: /node_modules/,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-webpack-config-js-LC31" class="blob-code blob-code-inner js-file-line">                use: {loader: &#39;html-loader&#39;}</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-webpack-config-js-LC32" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-webpack-config-js-LC33" class="blob-code blob-code-inner js-file-line">          // use the css loaders (first load the css, then inject the style)</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-webpack-config-js-LC34" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-webpack-config-js-LC35" class="blob-code blob-code-inner js-file-line">                test: /\.css$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-webpack-config-js-LC36" class="blob-code blob-code-inner js-file-line">                use: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-webpack-config-js-LC37" class="blob-code blob-code-inner js-file-line">                    &#39;style-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-webpack-config-js-LC38" class="blob-code blob-code-inner js-file-line">                    &#39;css-loader&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-webpack-config-js-LC39" class="blob-code blob-code-inner js-file-line">                ]</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-webpack-config-js-LC40" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-webpack-config-js-LC41" class="blob-code blob-code-inner js-file-line">        ]</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-webpack-config-js-LC42" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-webpack-config-js-LC43" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0b86594406c9f25c23c595eeaf9f8683/raw/5ec7d9d8af6b50ea65ac1724c6a25e06453c6be5/webpack.config.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0b86594406c9f25c23c595eeaf9f8683#file-webpack-config-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.config.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Our preliminary <em>webpack.config.js file</em>— note the <code><strong><em>entry</em></strong></code>, <code><strong><em>output</em> </strong>and<strong> <em>plugins</em> </strong></code>properties. The <code><strong><em>module.rules</em></strong></code> apply the loaders according to test rules.</figcaption></figure>



<p id="81fd">Create a new file in the project’s root:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>.&gt;webpack.config.js</code></p></blockquote>



<p id="d901">…and copy the contents of the above file inside.</p>



<p id="7ec5"><strong>How does this config file work?</strong>&nbsp;As mentioned above — we set the&nbsp;<em>entry</em>&nbsp;(our main module) and the output. We also set the plugins as an array of plugins. Finally, we set the loaders (now under&nbsp;<em>module.rules</em>).</p>



<p id="e181">One more step before we start: Let’s set up the build command for easy usage. Open&nbsp;<em>package.json</em>&nbsp;(in the app’s root). Add a new property to the&nbsp;<code>“scripts”</code>&nbsp;object:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>“build”: “webpack”</code></p></blockquote>



<p id="40a4">Your <em>package.json</em> file should now look like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84428807" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-package-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="package.json content, created by YonatanKra on 01:14PM on December 19, 2017."
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
          <td id="file-package-json-LC2" class="blob-code blob-code-inner js-file-line">  &quot;name&quot;: &quot;your-webpack-app&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-package-json-LC3" class="blob-code blob-code-inner js-file-line">  &quot;version&quot;: &quot;1.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-package-json-LC4" class="blob-code blob-code-inner js-file-line">  &quot;description&quot;: &quot;&quot;,</td>
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
          <td id="file-package-json-LC7" class="blob-code blob-code-inner js-file-line">    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-package-json-LC8" class="blob-code blob-code-inner js-file-line">    &quot;build&quot;: &quot;webpack&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-package-json-LC9" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-package-json-LC10" class="blob-code blob-code-inner js-file-line">  &quot;keywords&quot;: [],</td>
        </tr>
        <tr>
          <td id="file-package-json-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-package-json-LC11" class="blob-code blob-code-inner js-file-line">  &quot;author&quot;: &quot;&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-package-json-LC12" class="blob-code blob-code-inner js-file-line">  &quot;license&quot;: &quot;ISC&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-package-json-LC13" class="blob-code blob-code-inner js-file-line">  &quot;dependencies&quot;: {},</td>
        </tr>
        <tr>
          <td id="file-package-json-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-package-json-LC14" class="blob-code blob-code-inner js-file-line">  &quot;devDependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-package-json-LC15" class="blob-code blob-code-inner js-file-line">    &quot;clean-webpack-plugin&quot;: &quot;^0.1.17&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-package-json-LC16" class="blob-code blob-code-inner js-file-line">    &quot;css-loader&quot;: &quot;^0.28.7&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-package-json-LC17" class="blob-code blob-code-inner js-file-line">    &quot;html-loader&quot;: &quot;^0.5.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-package-json-LC18" class="blob-code blob-code-inner js-file-line">    &quot;html-webpack-plugin&quot;: &quot;^2.30.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-package-json-LC19" class="blob-code blob-code-inner js-file-line">    &quot;style-loader&quot;: &quot;^0.19.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-package-json-LC20" class="blob-code blob-code-inner js-file-line">    &quot;uglifyjs-webpack-plugin&quot;: &quot;^1.1.4&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-package-json-LC21" class="blob-code blob-code-inner js-file-line">    &quot;webpack&quot;: &quot;^3.10.0&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-package-json-LC22" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-package-json-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-package-json-LC23" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6bbff1cd4af01663b7d7c3c36c90c6df/raw/8d78bace33d89cbc6b26364eaa6d25c038fc89d1/package.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6bbff1cd4af01663b7d7c3c36c90c6df#file-package-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          package.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p id="9bdb">That’s it for infrastructure (for now ;)). Now the fun&nbsp;<em>really</em>&nbsp;begins!</p>



<h2 class="wp-block-heading" id="e68d"><span class="ez-toc-section" id="Lets_code_our_app"></span>Let’s code our app!<span class="ez-toc-section-end"></span></h2>



<p id="cd17">Let’s start with the main module. We would like it to do the following:</p>



<ol class="wp-block-list"><li>Import its HTML template and add it to the DOM</li><li>Import its CSS and add it to the DOM</li><li>Import the two sub modules</li></ol>



<p id="691b">Here’s where webpack kicks in and makes everything super simple. Let’s start coding:</p>



<p id="151b"><strong>Import the HTML template and add it to the DOM</strong></p>



<pre class="wp-block-preformatted"><strong>import </strong>template <strong>from </strong>'./index.html';<br><br>(<strong>function</strong>() {<br>    document.body.innerHTML = template;<br>})();</pre>



<p id="5d89">The&nbsp;<em>html-loader</em>&nbsp;parses&nbsp;<em>.html</em>&nbsp;files , and returns an HTML string.</p>



<p id="6b45"><strong>Import the CSS and add it to the DOM</strong></p>



<pre class="wp-block-preformatted"><strong>import </strong>template <strong>from </strong>'./index.html'; <br><strong>import</strong> {} <strong>from</strong> './app.css';(<strong>function</strong>() {<br>    document.body.innerHTML = template;<br>})();</pre>



<p id="17e3">I don’t even know if this was worth its own step, but&nbsp;<a href="https://www.youtube.com/watch?v=-dJolYw8tnk" rel="noreferrer noopener" target="_blank"><em>it’s my blog</em></a>, so you’ll have to live with it. All I did was add a line to import the CSS file. My&nbsp;<em>css-loader</em>&nbsp;parses the CSS and sends it to my&nbsp;<em>style-loader</em>, which injects it into the DOM.</p>



<p id="b2e5">Let’s put some CSS inside <em>app.css</em>, just for fun:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84470581" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-css" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-css  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.css content, created by YonatanKra on 07:10AM on December 20, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="app.css">
        <tr>
          <td id="file-app-css-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-app-css-LC1" class="blob-code blob-code-inner js-file-line">#phrase-form-wrapper {</td>
        </tr>
        <tr>
          <td id="file-app-css-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-css-LC2" class="blob-code blob-code-inner js-file-line">    min-height: 50px;</td>
        </tr>
        <tr>
          <td id="file-app-css-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-app-css-LC3" class="blob-code blob-code-inner js-file-line">    background: rgba(125, 125, 0, .25);</td>
        </tr>
        <tr>
          <td id="file-app-css-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-app-css-LC4" class="blob-code blob-code-inner js-file-line">    margin-bottom: 5px;</td>
        </tr>
        <tr>
          <td id="file-app-css-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-app-css-LC5" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-app-css-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-app-css-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-css-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-app-css-LC7" class="blob-code blob-code-inner js-file-line">#phrase-fireworks-wrapper {</td>
        </tr>
        <tr>
          <td id="file-app-css-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-app-css-LC8" class="blob-code blob-code-inner js-file-line">    height: 450px;</td>
        </tr>
        <tr>
          <td id="file-app-css-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-css-LC9" class="blob-code blob-code-inner js-file-line">    outline: 1px red solid;</td>
        </tr>
        <tr>
          <td id="file-app-css-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-css-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/89cb1d4c5c3f3dfc89ab459dc2ec4760/raw/64ef14b2419c0427ccdac643a33c988df74d95dc/app.css" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/89cb1d4c5c3f3dfc89ab459dc2ec4760#file-app-css" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.css
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p id="ed28"><strong>Import the two sub modules</strong></p>



<p id="3fa4">Right now you should know what to expect — just import our two classes/modules:</p>



<pre class="wp-block-preformatted"><strong>import </strong>template <strong>from </strong>'./index.html'; <br><strong>import</strong> {} <strong>from</strong> './app.css';<strong>import </strong>YOPFForm<strong> from </strong>'./form/form.index';<br><strong>import </strong>YOPFFireworks <strong>from </strong>'./fireworks/fireworks.index';(<strong>function</strong>() {<br>    document.body.innerHTML = template;<br>})();</pre>



<p id="daa8">Here I added two new lines that import&nbsp;<em>form&nbsp;</em>and&nbsp;<em>fireworks</em>&nbsp;from their respective files.</p>



<p id="ab09"><strong>Building the app</strong></p>



<p id="7e4f">We’ve done so much, and we don’t even know if it’s working. Let’s build and see how it looks.</p>



<p id="8cb7">Run the command:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm run build</code></p></blockquote>



<p id="69bc">When it’s done you will have a&nbsp;<em>dist</em>&nbsp;folder. Inside you should see an&nbsp;<em>index.html</em>&nbsp;file. Open it to see the explosive results.</p>



<p id="6a34">Here’s what you should see when checking the page elements from dev tools:</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/miro.medium.com/max/768/1%2AiE1r6wHyDNSZtxDkfLEmeg.png?w=640&#038;ssl=1" alt=""/><figcaption>What was loaded to the DOM when running the app in the browser.</figcaption></figure></div>



<p id="6c31">You can see that our wrappers are in place, our style was added to the DOM by webpack. You can also see our template (which we inserted to the DOM in the&nbsp;<em>app.js</em>&nbsp;immediately invoked function expression (IIFE)).</p>



<p id="a6ee">Run it on your computer to see how it looks:</p>



<div class="wp-block-image"><figure class="aligncenter is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="https://i0.wp.com/miro.medium.com/max/1400/1%2A3O2wynd6XIx8gooQbaEpZQ.png?resize=640%2C324&#038;ssl=1" alt="" width="640" height="324"/><figcaption>Nice…</figcaption></figure></div>



<h1 class="wp-block-heading" id="3029"><span class="ez-toc-section" id="Recap"></span>Recap<span class="ez-toc-section-end"></span></h1>



<p id="5e81">Wow — we did a lot! We’ve set up webpack to bundle our app — JS, CSS and HTML. We’ve set up our&nbsp;<em>entry</em>&nbsp;(main) module to load our template and CSS and put them in the DOM, and configured webpack to place them for us neatly inside an HTML page.</p>



<p id="b919">Now our mission is to create the app’s two building blocks: our form and our fireworks.</p>



<h1 class="wp-block-heading" id="88cc"><span class="ez-toc-section" id="The_form_module"></span>The form module<span class="ez-toc-section-end"></span></h1>



<p id="2d26">What should the form module do?</p>



<ol class="wp-block-list"><li>Import our HTML template and inject it into the DOM (sound familiar?)</li><li>Set up the form’s action to submit the phrase</li><li>Create some kind of API so other modules can communicate with it</li></ol>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>Yea, API. It’s a phrase that makes me look smart…</p></blockquote>



<p id="31bf">This module is not an&nbsp;<em>entry</em>. It’s a module that is consumed by another module. We can just export a class that could be instantiated each time it’s needed. So, the basic code for our module would be:</p>



<pre class="wp-block-preformatted"><strong>class </strong>YOPFForm{<br>    constructor() {<br>        <br>    }<br>}<br><br>export default YOPFForm;</pre>



<p id="6a23">This means, that when we <code>import</code> the module, we get a class that can be instantiated with variables. Since our module/class needs to put some HTML inside some element, we would like it to import the HTML and get an element to append the HTML to:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84471605" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-form-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="form.index.js content, created by YonatanKra on 07:52AM on December 20, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="form.index.js">
        <tr>
          <td id="file-form-index-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-form-index-js-LC1" class="blob-code blob-code-inner js-file-line">// get the template</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-form-index-js-LC2" class="blob-code blob-code-inner js-file-line">import template from &#39;./form.index.html&#39;;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-form-index-js-LC3" class="blob-code blob-code-inner js-file-line">// get the styles</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-form-index-js-LC4" class="blob-code blob-code-inner js-file-line">import {} from &#39;./form.index.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-form-index-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-form-index-js-LC6" class="blob-code blob-code-inner js-file-line">class YOPFForm{</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-form-index-js-LC7" class="blob-code blob-code-inner js-file-line">    constructor(element) {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-form-index-js-LC8" class="blob-code blob-code-inner js-file-line">        this._element = element;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-form-index-js-LC9" class="blob-code blob-code-inner js-file-line">        this.setTemplate();</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-form-index-js-LC10" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-form-index-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-form-index-js-LC12" class="blob-code blob-code-inner js-file-line">    setTemplate() {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-form-index-js-LC13" class="blob-code blob-code-inner js-file-line">        this._element.innerHTML = template;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-form-index-js-LC14" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-form-index-js-LC15" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-form-index-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-form-index-js-LC17" class="blob-code blob-code-inner js-file-line">export default YOPFForm;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/861072e41acebf0bd3d08ee0a6a3779d/raw/b212e21caac5c956c3f7063686ddf0bd676ba0a2/form.index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/861072e41acebf0bd3d08ee0a6a3779d#file-form-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          form.index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Get the template, get the styles. The class itself accepts a target element in its constructor and sets the template inside.</figcaption></figure>



<p id="7166">If you run the code above, you’ll see no change. For this, you need to edit the <em>form.index.html</em>. Let’s put some content inside:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84471790" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-form-index-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="form.index.html content, created by YonatanKra on 08:00AM on December 20, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="form.index.html">
        <tr>
          <td id="file-form-index-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-form-index-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;form name=&quot;phrase-form&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-form-index-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-form-index-html-LC2" class="blob-code blob-code-inner js-file-line">    &lt;input name=&quot;phrase&quot;</td>
        </tr>
        <tr>
          <td id="file-form-index-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-form-index-html-LC3" class="blob-code blob-code-inner js-file-line">           class=&quot;phrase-input&quot;</td>
        </tr>
        <tr>
          <td id="file-form-index-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-form-index-html-LC4" class="blob-code blob-code-inner js-file-line">           type=&quot;text&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-form-index-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-form-index-html-LC5" class="blob-code blob-code-inner js-file-line">    &lt;input type=&quot;submit&quot;</td>
        </tr>
        <tr>
          <td id="file-form-index-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-form-index-html-LC6" class="blob-code blob-code-inner js-file-line">           class=&quot;phrase-input-button&quot; value=&quot;Start Awesomeness!&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-form-index-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-form-index-html-LC7" class="blob-code blob-code-inner js-file-line">&lt;/form&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/5c88ea77edc3212b3a3d8c649840cedf/raw/e8aeb18a68df8e37a2466df82a3a1eac6eba1f8e/form.index.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/5c88ea77edc3212b3a3d8c649840cedf#file-form-index-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          form.index.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p id="7d78">We also need to use the new module inside our <em>app.js</em>:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84472989" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.js content, created by YonatanKra on 08:47AM on December 20, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="app.js">
        <tr>
          <td id="file-app-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-app-js-LC1" class="blob-code blob-code-inner js-file-line">import template from &#39;./index.html&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-js-LC2" class="blob-code blob-code-inner js-file-line">import {} from &#39;./app.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-app-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-app-js-LC4" class="blob-code blob-code-inner js-file-line">import YOPFForm from &#39;./form/form.index&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-app-js-LC5" class="blob-code blob-code-inner js-file-line">import YOPFFireworks from &#39;./fireworks/fireworks.index&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-app-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-app-js-LC7" class="blob-code blob-code-inner js-file-line">(function() {</td>
        </tr>
        <tr>
          <td id="file-app-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-app-js-LC8" class="blob-code blob-code-inner js-file-line">    document.body.innerHTML = template;</td>
        </tr>
        <tr>
          <td id="file-app-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-js-LC9" class="blob-code blob-code-inner js-file-line">    const form = new YOPFForm(document.getElementById(&#39;phrase-form-wrapper&#39;));</td>
        </tr>
        <tr>
          <td id="file-app-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-js-LC10" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8a575e96d65e0b07b86c958fdba29567/raw/1dd04a3589c721520b55c1ecd4fa55f94fe9e781/app.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8a575e96d65e0b07b86c958fdba29567#file-app-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p id="fa3c">Now, build again and load the&nbsp;<em>index.html</em>&nbsp;(usually a tab refresh will do). You should see this:</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/miro.medium.com/max/1400/1%2AVirXujsSqezFfHSue6k0aQ.png?w=640&#038;ssl=1" alt=""/><figcaption>The app with the form</figcaption></figure></div>



<p id="c09b">How awesome is that? One more thing is needed here: the ability to connect a response to the form submit. For this we need to add a form submit listener as well as an API to enable external modules (e.g., our <em>app.js</em>) to hook up to it.</p>



<h2 class="wp-block-heading" id="3fb2"><span class="ez-toc-section" id="Setting_up_the_forms_API"></span>Setting up the form’s API<span class="ez-toc-section-end"></span></h2>



<p id="e768">We will add a method to the class that accepts a callback and uses it every time the form is submitted. Then, we can use this method in our <em>app.js</em> file. This isn’t a webpack thing, so I’ll just write the full code and get on with it:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84483049" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.js content, created by YonatanKra on 12:46PM on December 20, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="app.js">
        <tr>
          <td id="file-app-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-app-js-LC1" class="blob-code blob-code-inner js-file-line">import template from &#39;./app.html&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-js-LC2" class="blob-code blob-code-inner js-file-line">import &#39;./app.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-app-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-app-js-LC4" class="blob-code blob-code-inner js-file-line">import {YOPFForm} from &quot;../form/form&quot;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-app-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-app-js-LC6" class="blob-code blob-code-inner js-file-line">export class App {</td>
        </tr>
        <tr>
          <td id="file-app-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-app-js-LC7" class="blob-code blob-code-inner js-file-line">    constructor(element) {</td>
        </tr>
        <tr>
          <td id="file-app-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-app-js-LC8" class="blob-code blob-code-inner js-file-line">        this._element = element;</td>
        </tr>
        <tr>
          <td id="file-app-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-js-LC9" class="blob-code blob-code-inner js-file-line">        element.innerHTML = template;</td>
        </tr>
        <tr>
          <td id="file-app-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-js-LC10" class="blob-code blob-code-inner js-file-line">        this.form = this.setupForm(this._element.querySelector(&#39;.phrase-form-wrapper&#39;));</td>
        </tr>
        <tr>
          <td id="file-app-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-app-js-LC11" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-app-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-app-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-app-js-LC13" class="blob-code blob-code-inner js-file-line">    setupForm(element) {</td>
        </tr>
        <tr>
          <td id="file-app-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-app-js-LC14" class="blob-code blob-code-inner js-file-line">        const form = new YOPFForm(element);</td>
        </tr>
        <tr>
          <td id="file-app-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-app-js-LC15" class="blob-code blob-code-inner js-file-line">        form.listen(this.onPhraseChange);</td>
        </tr>
        <tr>
          <td id="file-app-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-app-js-LC16" class="blob-code blob-code-inner js-file-line">        return form;</td>
        </tr>
        <tr>
          <td id="file-app-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-app-js-LC17" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-app-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-app-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-app-js-LC19" class="blob-code blob-code-inner js-file-line">    onPhraseChange(phrase) {</td>
        </tr>
        <tr>
          <td id="file-app-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-app-js-LC20" class="blob-code blob-code-inner js-file-line">        alert(phrase);</td>
        </tr>
        <tr>
          <td id="file-app-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-app-js-LC21" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-app-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-app-js-LC22" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6e9e1f714a54e26baab90b85701a3f02/raw/e38e39ea045bfa3515d125cb7db0bafeb2a5ad7b/app.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6e9e1f714a54e26baab90b85701a3f02#file-app-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-form-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="form.index.js content, created by YonatanKra on 12:46PM on December 20, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="form.index.js">
        <tr>
          <td id="file-form-index-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-form-index-js-LC1" class="blob-code blob-code-inner js-file-line">// get the template</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-form-index-js-LC2" class="blob-code blob-code-inner js-file-line">import template from &#39;./form.html&#39;;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-form-index-js-LC3" class="blob-code blob-code-inner js-file-line">// get the styles</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-form-index-js-LC4" class="blob-code blob-code-inner js-file-line">import &#39;./form.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-form-index-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-form-index-js-LC6" class="blob-code blob-code-inner js-file-line">export class YOPFForm{</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-form-index-js-LC7" class="blob-code blob-code-inner js-file-line">    constructor(element) {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-form-index-js-LC8" class="blob-code blob-code-inner js-file-line">        this._element = element;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-form-index-js-LC9" class="blob-code blob-code-inner js-file-line">        this.setTemplate();</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-form-index-js-LC10" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-form-index-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-form-index-js-LC12" class="blob-code blob-code-inner js-file-line">    setTemplate() {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-form-index-js-LC13" class="blob-code blob-code-inner js-file-line">        this._element.innerHTML = template;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-form-index-js-LC14" class="blob-code blob-code-inner js-file-line">        this._form = this._element.getElementsByTagName(&#39;form&#39;)[0];</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-form-index-js-LC15" class="blob-code blob-code-inner js-file-line">        this._form.addEventListener(&quot;submit&quot;, (event)=&gt; {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-form-index-js-LC16" class="blob-code blob-code-inner js-file-line">            event.preventDefault();</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-form-index-js-LC17" class="blob-code blob-code-inner js-file-line">            this.onSubmit(event.target);</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-form-index-js-LC18" class="blob-code blob-code-inner js-file-line">        }, false);</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-form-index-js-LC19" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-form-index-js-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-form-index-js-LC21" class="blob-code blob-code-inner js-file-line">    onSubmit(form) {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-form-index-js-LC22" class="blob-code blob-code-inner js-file-line">        this._callback(form.phrase.value);</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-form-index-js-LC23" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-form-index-js-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-form-index-js-LC25" class="blob-code blob-code-inner js-file-line">    listen(callback) {</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-form-index-js-LC26" class="blob-code blob-code-inner js-file-line">        this._callback = callback;</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-form-index-js-LC27" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-form-index-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-form-index-js-LC28" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6e9e1f714a54e26baab90b85701a3f02/raw/e38e39ea045bfa3515d125cb7db0bafeb2a5ad7b/form.index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6e9e1f714a54e26baab90b85701a3f02#file-form-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          form.index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>App.js uses the API. The API stores the callback “onPhraseChange” from app.js and sets up a listener that runs the callback on every form submit and returns the phrase (input element value)</figcaption></figure>



<p id="fc12">When you run this code, you’ll see that every time you submit the form, an alert with the form’s value is thrown from the main&nbsp;<em>entry</em>. What an API…</p>



<p id="c412">But an alert is not so impressive. We want fireworks!!!</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><strong>DISCLAIMER:</strong>&nbsp;Full disclosure — No attempt at a fully fledged solution was made, nor is the code offered here considered best practice. When building an app, consider validating input, allowing for a safe “unlisten” event, etc.</p></blockquote>



<h1 class="wp-block-heading" id="c647"><span class="ez-toc-section" id="The_fireworks_module"></span>The fireworks module<span class="ez-toc-section-end"></span></h1>



<p id="7a4b">Ooooooh —&nbsp;<em>this</em>&nbsp;is gonna be fun!</p>



<p id="75c9">We’re going to use npm for that. Let’s install a fireworks package:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm i -S fireworks</code></p></blockquote>



<p id="5c6c">Now we’re going to require fireworks (just to show off, I’ll use Node.js) and import the fireworks style. After that, it’s plain JS coding, so I won’t go into much detail. Here’s the gist of it, though: I’ll expose an API method that accepts a phrase and presents it with fireworks. Here are the relevant files to change:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84522482" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-app-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="app.js content, created by YonatanKra on 08:46AM on December 21, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="app.js">
        <tr>
          <td id="file-app-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-app-js-LC1" class="blob-code blob-code-inner js-file-line">import template from &#39;./index.html&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-app-js-LC2" class="blob-code blob-code-inner js-file-line">import {} from &#39;./app.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-app-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-app-js-LC4" class="blob-code blob-code-inner js-file-line">import YOPFForm from &#39;./form/form.index&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-app-js-LC5" class="blob-code blob-code-inner js-file-line">import YOPFFireworks from &#39;./fireworks/fireworks.index&#39;;</td>
        </tr>
        <tr>
          <td id="file-app-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-app-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-app-js-LC7" class="blob-code blob-code-inner js-file-line">(function() {</td>
        </tr>
        <tr>
          <td id="file-app-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-app-js-LC8" class="blob-code blob-code-inner js-file-line">    function onPhraseChange(phrase) {</td>
        </tr>
        <tr>
          <td id="file-app-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-app-js-LC9" class="blob-code blob-code-inner js-file-line">        fireworks.doFireworks(phrase);</td>
        </tr>
        <tr>
          <td id="file-app-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-app-js-LC10" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-app-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-app-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-app-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-app-js-LC12" class="blob-code blob-code-inner js-file-line">    document.body.innerHTML = template;</td>
        </tr>
        <tr>
          <td id="file-app-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-app-js-LC13" class="blob-code blob-code-inner js-file-line">    const form = new YOPFForm(document.getElementById(&#39;phrase-form-wrapper&#39;));</td>
        </tr>
        <tr>
          <td id="file-app-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-app-js-LC14" class="blob-code blob-code-inner js-file-line">    const fireworks = new YOPFFireworks(document.getElementById(&#39;phrase-fireworks-wrapper&#39;));</td>
        </tr>
        <tr>
          <td id="file-app-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-app-js-LC15" class="blob-code blob-code-inner js-file-line">    form.listen(onPhraseChange);</td>
        </tr>
        <tr>
          <td id="file-app-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-app-js-LC16" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6126680fc83ce59e37bd0f4f95afdc9e/raw/2730b9b6753d241e4ee600a9615acaaaa234d1d6/app.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6126680fc83ce59e37bd0f4f95afdc9e#file-app-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          app.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-fireworks-css" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-css  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="fireworks.css content, created by YonatanKra on 08:46AM on December 21, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="fireworks.css">
        <tr>
          <td id="file-fireworks-css-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-fireworks-css-LC1" class="blob-code blob-code-inner js-file-line">.phraseText {</td>
        </tr>
        <tr>
          <td id="file-fireworks-css-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-fireworks-css-LC2" class="blob-code blob-code-inner js-file-line">    position: relative;</td>
        </tr>
        <tr>
          <td id="file-fireworks-css-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-fireworks-css-LC3" class="blob-code blob-code-inner js-file-line">    top: 50%;</td>
        </tr>
        <tr>
          <td id="file-fireworks-css-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-fireworks-css-LC4" class="blob-code blob-code-inner js-file-line">    transform: translateY(-50%);</td>
        </tr>
        <tr>
          <td id="file-fireworks-css-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-fireworks-css-LC5" class="blob-code blob-code-inner js-file-line">    text-align: center;</td>
        </tr>
        <tr>
          <td id="file-fireworks-css-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-fireworks-css-LC6" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6126680fc83ce59e37bd0f4f95afdc9e/raw/2730b9b6753d241e4ee600a9615acaaaa234d1d6/fireworks.css" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6126680fc83ce59e37bd0f4f95afdc9e#file-fireworks-css" class="Link--inTextBlock" target="_blank" rel="noopener">
          fireworks.css
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-fireworks-index-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="fireworks.index.js content, created by YonatanKra on 08:46AM on December 21, 2017."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="fireworks.index.js">
        <tr>
          <td id="file-fireworks-index-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-fireworks-index-js-LC1" class="blob-code blob-code-inner js-file-line">const fireworks = require(&#39;fireworks&#39;);</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-fireworks-index-js-LC2" class="blob-code blob-code-inner js-file-line">// get the styles</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-fireworks-index-js-LC3" class="blob-code blob-code-inner js-file-line">import {} from &#39;./fireworks.css&#39;;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-fireworks-index-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-fireworks-index-js-LC5" class="blob-code blob-code-inner js-file-line">class YOPFFireworks{</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-fireworks-index-js-LC6" class="blob-code blob-code-inner js-file-line">    constructor(element) {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-fireworks-index-js-LC7" class="blob-code blob-code-inner js-file-line">        this._element = element;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-fireworks-index-js-LC8" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-fireworks-index-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-fireworks-index-js-LC10" class="blob-code blob-code-inner js-file-line">    get centerX() {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-fireworks-index-js-LC11" class="blob-code blob-code-inner js-file-line">        return this._centerX ? this._centerX : this._centerX = this._element.offsetLeft + this._element.offsetWidth / 2;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-fireworks-index-js-LC12" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-fireworks-index-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-fireworks-index-js-LC14" class="blob-code blob-code-inner js-file-line">    get centerY() {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-fireworks-index-js-LC15" class="blob-code blob-code-inner js-file-line">        return this._centerY ? this._centerY : this._centerY = this._element.offsetTop + this._element.offsetHeight / 2;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-fireworks-index-js-LC16" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-fireworks-index-js-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-fireworks-index-js-LC18" class="blob-code blob-code-inner js-file-line">    doFireworks(phrase) {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-fireworks-index-js-LC19" class="blob-code blob-code-inner js-file-line">        this._element.innerHTML = &#39;&lt;h1 class=&quot;phraseText&quot;&gt;&#39; + phrase + &#39;&lt;/h1&gt;&#39;;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-fireworks-index-js-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-fireworks-index-js-LC21" class="blob-code blob-code-inner js-file-line">        if (this._interval) {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-fireworks-index-js-LC22" class="blob-code blob-code-inner js-file-line">            return;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-fireworks-index-js-LC23" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-fireworks-index-js-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-fireworks-index-js-LC25" class="blob-code blob-code-inner js-file-line">        this._interval = setInterval(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-fireworks-index-js-LC26" class="blob-code blob-code-inner js-file-line">            const newX = Math.random()*100*(Math.random() &lt; .5 ? -1 : 1);</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-fireworks-index-js-LC27" class="blob-code blob-code-inner js-file-line">            const newY = Math.random()*100*(Math.random() &lt; .5 ? -1 : 1);</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-fireworks-index-js-LC28" class="blob-code blob-code-inner js-file-line">            fireworks({</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-fireworks-index-js-LC29" class="blob-code blob-code-inner js-file-line">                x: this.centerX + newX,</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-fireworks-index-js-LC30" class="blob-code blob-code-inner js-file-line">                y: this.centerY + newY,</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-fireworks-index-js-LC31" class="blob-code blob-code-inner js-file-line">                colors: [&quot;#cc3333&quot;, &quot;#4CAF50&quot;, &quot;#81C784&quot;]</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-fireworks-index-js-LC32" class="blob-code blob-code-inner js-file-line">            });</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-fireworks-index-js-LC33" class="blob-code blob-code-inner js-file-line">        }, 500);</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-fireworks-index-js-LC34" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-fireworks-index-js-LC35" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-fireworks-index-js-LC36" class="blob-code blob-code-inner js-file-line">    stopFireworks() {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-fireworks-index-js-LC37" class="blob-code blob-code-inner js-file-line">        if (!this._interval) {</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-fireworks-index-js-LC38" class="blob-code blob-code-inner js-file-line">            return;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-fireworks-index-js-LC39" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-fireworks-index-js-LC40" class="blob-code blob-code-inner js-file-line">        clearInterval(this._interval);</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-fireworks-index-js-LC41" class="blob-code blob-code-inner js-file-line">        this._interval = null;</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-fireworks-index-js-LC42" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-fireworks-index-js-LC43" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-fireworks-index-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-fireworks-index-js-LC44" class="blob-code blob-code-inner js-file-line">export default YOPFFireworks;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6126680fc83ce59e37bd0f4f95afdc9e/raw/2730b9b6753d241e4ee600a9615acaaaa234d1d6/fireworks.index.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6126680fc83ce59e37bd0f4f95afdc9e#file-fireworks-index-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          fireworks.index.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption><em>app.js</em> uses the fireworks API to change the phrase and start the fireworks! The fireworks class follows the same pattern as our form class and has a constructor and an API.</figcaption></figure>



<p id="b8c9">Nothing webpack about what was done above —we’ve just created the module, imported it into our main file, and used it. We now have our awesome app!!!</p>



<h2 class="wp-block-heading" id="3d9f"><span class="ez-toc-section" id="Head_scratching_moment"></span>Head scratching moment<span class="ez-toc-section-end"></span></h2>



<p id="12f3">So far, we’ve managed to almost magically build our app and create a working&nbsp;<em>index.html</em>&nbsp;file with webpack. But now you scratch your head — what? Do I need to build and refresh every time I make a change? It’s time consuming and confusing.</p>



<p id="b595">Here webpack has two solutions:&nbsp;<strong>watch mode</strong>&nbsp;and&nbsp;<strong>webpack-dev-server</strong>.</p>



<p id="c205"><strong>Watch</strong>&nbsp;<strong>mode</strong>&nbsp;is simple — you just add&nbsp;<code>—-watch</code>&nbsp;to the webpack command inside of&nbsp;<em>package.json</em>&nbsp;and it works — webpack will build (or try to build) your app on every code change. Just refresh your browser and, there’s that magic again!</p>



<p id="1517"><strong>webpack-dev-server</strong>&nbsp;is a much more robust solution. It requires a bit of setup (e.g.,&nbsp;<code>npm install</code>&nbsp;and a line in the configuration file) but it does the refresh out of the box (and can do much more than that). Because we don’t want to refresh every time, we will just install and setup the&nbsp;<strong>webpack-dev-server</strong>:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm i -D webpack-dev-server</code></p></blockquote>



<p id="a0ba">And then, instead of using webpack in the CLI or inside the <em>package.json</em>, you can just use <strong>webpack-dev-server</strong> to start a development server:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84476634" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-package-json" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-json  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="package.json content, created by YonatanKra on 10:31AM on December 20, 2017."
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
          <td id="file-package-json-LC2" class="blob-code blob-code-inner js-file-line">  &quot;name&quot;: &quot;webpackPost&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-package-json-LC3" class="blob-code blob-code-inner js-file-line">  &quot;version&quot;: &quot;1.0.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-package-json-LC4" class="blob-code blob-code-inner js-file-line">  &quot;description&quot;: &quot;&quot;,</td>
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
          <td id="file-package-json-LC7" class="blob-code blob-code-inner js-file-line">    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-package-json-LC8" class="blob-code blob-code-inner js-file-line">    &quot;build&quot;: &quot;webpack&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-package-json-LC9" class="blob-code blob-code-inner js-file-line">    &quot;dev&quot;: &quot;webpack-dev-server&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-package-json-LC10" class="blob-code blob-code-inner js-file-line">  },</td>
        </tr>
        <tr>
          <td id="file-package-json-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-package-json-LC11" class="blob-code blob-code-inner js-file-line">  &quot;keywords&quot;: [],</td>
        </tr>
        <tr>
          <td id="file-package-json-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-package-json-LC12" class="blob-code blob-code-inner js-file-line">  &quot;author&quot;: &quot;&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-package-json-LC13" class="blob-code blob-code-inner js-file-line">  &quot;license&quot;: &quot;ISC&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-package-json-LC14" class="blob-code blob-code-inner js-file-line">  &quot;dependencies&quot;: {},</td>
        </tr>
        <tr>
          <td id="file-package-json-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-package-json-LC15" class="blob-code blob-code-inner js-file-line">  &quot;devDependencies&quot;: {</td>
        </tr>
        <tr>
          <td id="file-package-json-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-package-json-LC16" class="blob-code blob-code-inner js-file-line">    &quot;clean-webpack-plugin&quot;: &quot;^0.1.17&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-package-json-LC17" class="blob-code blob-code-inner js-file-line">    &quot;css-loader&quot;: &quot;^0.28.7&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-package-json-LC18" class="blob-code blob-code-inner js-file-line">    &quot;html-loader&quot;: &quot;^0.5.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-package-json-LC19" class="blob-code blob-code-inner js-file-line">    &quot;html-webpack-plugin&quot;: &quot;^2.30.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-package-json-LC20" class="blob-code blob-code-inner js-file-line">    &quot;style-loader&quot;: &quot;^0.19.1&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-package-json-LC21" class="blob-code blob-code-inner js-file-line">    &quot;uglifyjs-webpack-plugin&quot;: &quot;^1.1.4&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-package-json-LC22" class="blob-code blob-code-inner js-file-line">    &quot;webpack&quot;: &quot;^3.10.0&quot;,</td>
        </tr>
        <tr>
          <td id="file-package-json-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-package-json-LC23" class="blob-code blob-code-inner js-file-line">    &quot;webpack-dev-server&quot;: &quot;^2.9.7&quot;</td>
        </tr>
        <tr>
          <td id="file-package-json-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-package-json-LC24" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-package-json-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-package-json-LC25" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/31fd784fa8486054a9335c57427b3ca0/raw/89e045c862efd07861a0f4cef35a4d2c119efdea/package.json" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/31fd784fa8486054a9335c57427b3ca0#file-package-json" class="Link--inTextBlock" target="_blank" rel="noopener">
          package.json
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Note that a `dev` script was added…</figcaption></figure>



<p id="541a">After running this:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm run dev</code></p></blockquote>



<p id="5a55">You will get something like this:</p>



<p id="c54d"><em>“Project is running at&nbsp;</em><a href="http://localhost:8081/" rel="noreferrer noopener" target="_blank"><em>http://localhost:8081/</em></a><em>”</em></p>



<p id="8560">Just browse to the address the project is running at and you should be good to go (auto reload and all).</p>



<p id="7ed9">Two small tricks to make your life a bit easier: (1) source maps (for easier debugging) and (2) make&nbsp;<strong>webpack-dev-server</strong>&nbsp;to open your site when the bundling is done.</p>



<p id="014f">Here’s the final configuration:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84522754" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-config-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.config.js content, created by YonatanKra on 08:57AM on December 21, 2017."
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
          <td id="file-webpack-config-js-LC1" class="blob-code blob-code-inner js-file-line">const path = require(&#39;path&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-config-js-LC2" class="blob-code blob-code-inner js-file-line">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-config-js-LC3" class="blob-code blob-code-inner js-file-line">const webpack = require(&#39;webpack&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-config-js-LC4" class="blob-code blob-code-inner js-file-line">const CleanWebpackPlugin = require(&#39;clean-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-config-js-LC5" class="blob-code blob-code-inner js-file-line">const UglifyJsPlugin = require(&#39;uglifyjs-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-config-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-config-js-LC7" class="blob-code blob-code-inner js-file-line">module.exports = {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-config-js-LC8" class="blob-code blob-code-inner js-file-line">    devtool: &#39;inline-source-map&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-config-js-LC9" class="blob-code blob-code-inner js-file-line">    devServer: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-config-js-LC10" class="blob-code blob-code-inner js-file-line">        open: true,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpack-config-js-LC11" class="blob-code blob-code-inner js-file-line">        contentBase: &#39;./dist&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-webpack-config-js-LC12" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-webpack-config-js-LC13" class="blob-code blob-code-inner js-file-line">    entry: &#39;./src/app.js&#39;, // this is our app</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpack-config-js-LC14" class="blob-code blob-code-inner js-file-line">    output: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-webpack-config-js-LC15" class="blob-code blob-code-inner js-file-line">        filename: &#39;[name].bundle.js&#39;, // the file name would be my entry&#39;s name with a &quot;.bundle.js&quot; suffix</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-webpack-config-js-LC16" class="blob-code blob-code-inner js-file-line">        path: path.resolve(__dirname, &#39;dist&#39;) // put all of the build in a dist folder</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-webpack-config-js-LC17" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-webpack-config-js-LC18" class="blob-code blob-code-inner js-file-line">    plugins: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-webpack-config-js-LC19" class="blob-code blob-code-inner js-file-line">        new UglifyJsPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-webpack-config-js-LC20" class="blob-code blob-code-inner js-file-line">            sourceMap: true</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-webpack-config-js-LC21" class="blob-code blob-code-inner js-file-line">        }),</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-webpack-config-js-LC22" class="blob-code blob-code-inner js-file-line">        new CleanWebpackPlugin([&#39;dist&#39;]), // use the clean plugin to delete the dist folder before a build</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-webpack-config-js-LC23" class="blob-code blob-code-inner js-file-line">        // This plugin creates our index.html that would load the app for us in the browser</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-webpack-config-js-LC24" class="blob-code blob-code-inner js-file-line">        new HtmlWebpackPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-webpack-config-js-LC25" class="blob-code blob-code-inner js-file-line">            title: &#39;Your Phrase Fireworks!&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-webpack-config-js-LC26" class="blob-code blob-code-inner js-file-line">        })</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-webpack-config-js-LC27" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-webpack-config-js-LC28" class="blob-code blob-code-inner js-file-line">    module: {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-webpack-config-js-LC29" class="blob-code blob-code-inner js-file-line">        rules: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-webpack-config-js-LC30" class="blob-code blob-code-inner js-file-line">            // use the html loader</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-webpack-config-js-LC31" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-webpack-config-js-LC32" class="blob-code blob-code-inner js-file-line">                test: /\.html$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-webpack-config-js-LC33" class="blob-code blob-code-inner js-file-line">                exclude: /node_modules/,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-webpack-config-js-LC34" class="blob-code blob-code-inner js-file-line">                use: [{loader: &#39;html-loader&#39;}]</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-webpack-config-js-LC35" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-webpack-config-js-LC36" class="blob-code blob-code-inner js-file-line">            // use the css loaders (first load the css, then inject the style)</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-webpack-config-js-LC37" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-webpack-config-js-LC38" class="blob-code blob-code-inner js-file-line">                test: /\.css$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-webpack-config-js-LC39" class="blob-code blob-code-inner js-file-line">                use: [</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-webpack-config-js-LC40" class="blob-code blob-code-inner js-file-line">                    &#39;style-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-webpack-config-js-LC41" class="blob-code blob-code-inner js-file-line">                    &#39;css-loader&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-webpack-config-js-LC42" class="blob-code blob-code-inner js-file-line">                ]</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-webpack-config-js-LC43" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-webpack-config-js-LC44" class="blob-code blob-code-inner js-file-line">        ]</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-webpack-config-js-LC45" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-webpack-config-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-webpack-config-js-LC46" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/addd5f291c2b54bf7e8ee0d46b25654e/raw/ff2e78516bc279a351afb8cc7200e59e890a10b8/webpack.config.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/addd5f291c2b54bf7e8ee0d46b25654e#file-webpack-config-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.config.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Note the `devtool` and `devServer` properties</figcaption></figure>



<p id="9d13">The difference is in the first two properties in the config object:</p>



<pre class="wp-block-preformatted">devtool: 'inline-source-map',<br>devServer: {<br>    open: <strong>true</strong>,<br>    contentBase: './dist'<br>}</pre>



<p id="ab81">This tells webpack to add inline source maps so you can debug your code with ease. The second property is also pretty self explanatory.</p>



<p id="005b">There is much more to the development server than what I’ve covered here. You can learn much more in the&nbsp;<a href="https://webpack.js.org/configuration/dev-server/#devserver" rel="noreferrer noopener" target="_blank">official docs</a>. If you find something interesting and relevant, write about it in the comments section below, and, if there’s enough material, I’ll add a section about&nbsp;<strong>webpack-dev-server&nbsp;</strong>to this post<strong>.</strong></p>



<h2 class="wp-block-heading" id="1192"><span class="ez-toc-section" id="Best_practices%E2%80%94_development_and_production"></span>Best practices— development and production<span class="ez-toc-section-end"></span></h2>



<p id="77a5">First we learned how to build for distribution. Then we learned how to use the development server. We can see there’s much in common in their configuration, and a few unique properties for each. We can now create a separate configuration for development and production with a common configuration file and use the correct file for the relevant case.</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist84962166" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-common-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.common.js content, created by YonatanKra on 02:28PM on January 01, 2018."
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
          <td id="file-webpack-common-js-LC2" class="blob-code blob-code-inner js-file-line">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-common-js-LC3" class="blob-code blob-code-inner js-file-line">const webpack = require(&#39;webpack&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-common-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-common-js-LC5" class="blob-code blob-code-inner js-file-line">module.exports = {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-common-js-LC6" class="blob-code blob-code-inner js-file-line">    entry: [&#39;./src/app.js&#39;], // this is our app</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-common-js-LC7" class="blob-code blob-code-inner js-file-line">    output: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-common-js-LC8" class="blob-code blob-code-inner js-file-line">        chunkFilename: &#39;[name].bundle.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-common-js-LC9" class="blob-code blob-code-inner js-file-line">        filename: &#39;[name].bundle.js&#39;, // the file name would be my entry&#39;s name with a &quot;.bundle.js&quot; suffix</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-common-js-LC10" class="blob-code blob-code-inner js-file-line">        path: path.resolve(__dirname, &#39;dist&#39;) // put all of the build in a dist folder</td>
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
          <td id="file-webpack-common-js-LC13" class="blob-code blob-code-inner js-file-line">        // This plugin creates our index.html that would load the app for us in the browser</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpack-common-js-LC14" class="blob-code blob-code-inner js-file-line">        new HtmlWebpackPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-webpack-common-js-LC15" class="blob-code blob-code-inner js-file-line">            title: &#39;Your Phrase Fireworks!&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-webpack-common-js-LC16" class="blob-code blob-code-inner js-file-line">        }),</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-webpack-common-js-LC17" class="blob-code blob-code-inner js-file-line">        new webpack.ProvidePlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-webpack-common-js-LC18" class="blob-code blob-code-inner js-file-line">            jQuery: &#39;jquery&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-webpack-common-js-LC19" class="blob-code blob-code-inner js-file-line">            $: &#39;jquery&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-webpack-common-js-LC20" class="blob-code blob-code-inner js-file-line">            jquery: &#39;jquery&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-webpack-common-js-LC21" class="blob-code blob-code-inner js-file-line">        }),</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-webpack-common-js-LC22" class="blob-code blob-code-inner js-file-line">        new webpack.optimize.CommonsChunkPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-webpack-common-js-LC23" class="blob-code blob-code-inner js-file-line">            name: &quot;vendor&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-webpack-common-js-LC24" class="blob-code blob-code-inner js-file-line">            minChunks: function (module) {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-webpack-common-js-LC25" class="blob-code blob-code-inner js-file-line">                return module.context &amp;&amp;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-webpack-common-js-LC26" class="blob-code blob-code-inner js-file-line">                    module.context.includes(&quot;node_modules&quot;);</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-webpack-common-js-LC27" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-webpack-common-js-LC28" class="blob-code blob-code-inner js-file-line">        }),</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-webpack-common-js-LC29" class="blob-code blob-code-inner js-file-line">        new webpack.optimize.CommonsChunkPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-webpack-common-js-LC30" class="blob-code blob-code-inner js-file-line">            name: &quot;manifest&quot;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-webpack-common-js-LC31" class="blob-code blob-code-inner js-file-line">            minChunks: Infinity</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-webpack-common-js-LC32" class="blob-code blob-code-inner js-file-line">        })</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-webpack-common-js-LC33" class="blob-code blob-code-inner js-file-line">    ],</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-webpack-common-js-LC34" class="blob-code blob-code-inner js-file-line">    module: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-webpack-common-js-LC35" class="blob-code blob-code-inner js-file-line">        rules: [</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-webpack-common-js-LC36" class="blob-code blob-code-inner js-file-line">            // use the url loader for font files</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-webpack-common-js-LC37" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-webpack-common-js-LC38" class="blob-code blob-code-inner js-file-line">                test: /\.(woff2?|ttf|eot|svg)$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-webpack-common-js-LC39" class="blob-code blob-code-inner js-file-line">                use: [</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-webpack-common-js-LC40" class="blob-code blob-code-inner js-file-line">                    {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-webpack-common-js-LC41" class="blob-code blob-code-inner js-file-line">                        loader: &#39;url-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-webpack-common-js-LC42" class="blob-code blob-code-inner js-file-line">                        options: {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-webpack-common-js-LC43" class="blob-code blob-code-inner js-file-line">                            limit: 10000</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-webpack-common-js-LC44" class="blob-code blob-code-inner js-file-line">                        }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-webpack-common-js-LC45" class="blob-code blob-code-inner js-file-line">                    }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-webpack-common-js-LC46" class="blob-code blob-code-inner js-file-line">                ]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-webpack-common-js-LC47" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-webpack-common-js-LC48" class="blob-code blob-code-inner js-file-line">            // use the html loader</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-webpack-common-js-LC49" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-webpack-common-js-LC50" class="blob-code blob-code-inner js-file-line">                test: /\.html$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-webpack-common-js-LC51" class="blob-code blob-code-inner js-file-line">                exclude: /node_modules/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-webpack-common-js-LC52" class="blob-code blob-code-inner js-file-line">                use: [{loader: &#39;html-loader&#39;}]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-webpack-common-js-LC53" class="blob-code blob-code-inner js-file-line">            },</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-webpack-common-js-LC54" class="blob-code blob-code-inner js-file-line">            // use the css loaders (first load the css, then inject the style)</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-webpack-common-js-LC55" class="blob-code blob-code-inner js-file-line">            {</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-webpack-common-js-LC56" class="blob-code blob-code-inner js-file-line">                test: /\.css$/,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-webpack-common-js-LC57" class="blob-code blob-code-inner js-file-line">                use: [</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-webpack-common-js-LC58" class="blob-code blob-code-inner js-file-line">                    &#39;style-loader&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-webpack-common-js-LC59" class="blob-code blob-code-inner js-file-line">                    &#39;css-loader&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-webpack-common-js-LC60" class="blob-code blob-code-inner js-file-line">                ]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-webpack-common-js-LC61" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-webpack-common-js-LC62" class="blob-code blob-code-inner js-file-line">        ]</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-webpack-common-js-LC63" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-webpack-common-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-webpack-common-js-LC64" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3369510d552daade71e4f083d36dbc78/raw/03bd626c93adc6ee25264b36752c2a9eda30d25f/webpack.common.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3369510d552daade71e4f083d36dbc78#file-webpack-common-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.common.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-dev-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.dev.js content, created by YonatanKra on 02:28PM on January 01, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpack.dev.js">
        <tr>
          <td id="file-webpack-dev-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpack-dev-js-LC1" class="blob-code blob-code-inner js-file-line">const merge = require(&#39;webpack-merge&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-dev-js-LC2" class="blob-code blob-code-inner js-file-line">const commonConfig = require(&#39;./webpack.common&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-dev-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-dev-js-LC4" class="blob-code blob-code-inner js-file-line">module.exports = merge(commonConfig, {</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-dev-js-LC5" class="blob-code blob-code-inner js-file-line">  devtool: &#39;inline-source-map&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-dev-js-LC6" class="blob-code blob-code-inner js-file-line">  devServer: {</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-dev-js-LC7" class="blob-code blob-code-inner js-file-line">        open: true,</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-dev-js-LC8" class="blob-code blob-code-inner js-file-line">        contentBase: &#39;./dist&#39;</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-dev-js-LC9" class="blob-code blob-code-inner js-file-line">    },</td>
        </tr>
        <tr>
          <td id="file-webpack-dev-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-dev-js-LC10" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3369510d552daade71e4f083d36dbc78/raw/03bd626c93adc6ee25264b36752c2a9eda30d25f/webpack.dev.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3369510d552daade71e4f083d36dbc78#file-webpack-dev-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.dev.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-webpack-prod-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="webpack.prod.js content, created by YonatanKra on 02:28PM on January 01, 2018."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="webpack.prod.js">
        <tr>
          <td id="file-webpack-prod-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-webpack-prod-js-LC1" class="blob-code blob-code-inner js-file-line">const UglifyJsPlugin = require(&#39;uglifyjs-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-webpack-prod-js-LC2" class="blob-code blob-code-inner js-file-line">const CleanWebpackPlugin = require(&#39;clean-webpack-plugin&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-webpack-prod-js-LC3" class="blob-code blob-code-inner js-file-line">const merge = require(&#39;webpack-merge&#39;); // don&#39;t forget to install this one</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-webpack-prod-js-LC4" class="blob-code blob-code-inner js-file-line">const commonConfig = require(&#39;./webpack.common&#39;);</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-webpack-prod-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-webpack-prod-js-LC6" class="blob-code blob-code-inner js-file-line">module.exports = merge(commonConfig, {</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-webpack-prod-js-LC7" class="blob-code blob-code-inner js-file-line">    devtool: &#39;source-map&#39;,</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-webpack-prod-js-LC8" class="blob-code blob-code-inner js-file-line">    plugins: [</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-webpack-prod-js-LC9" class="blob-code blob-code-inner js-file-line">        new CleanWebpackPlugin([&#39;dist&#39;]),</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-webpack-prod-js-LC10" class="blob-code blob-code-inner js-file-line">        new UglifyJsPlugin({</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-webpack-prod-js-LC11" class="blob-code blob-code-inner js-file-line">            sourceMap: true</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-webpack-prod-js-LC12" class="blob-code blob-code-inner js-file-line">        })</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-webpack-prod-js-LC13" class="blob-code blob-code-inner js-file-line">    ]</td>
        </tr>
        <tr>
          <td id="file-webpack-prod-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-webpack-prod-js-LC14" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3369510d552daade71e4f083d36dbc78/raw/03bd626c93adc6ee25264b36752c2a9eda30d25f/webpack.prod.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3369510d552daade71e4f083d36dbc78#file-webpack-prod-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          webpack.prod.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The common, dev and production config files. Don’t forget to install webpack-merge (`npm i -D webpack-merge`).</figcaption></figure>



<p id="29a5">Then we can add scripts to the&nbsp;<em>package.json</em>&nbsp;file:</p>



<pre class="wp-block-preformatted">scripts: {<br>   <br>   dev: webpack-dev-server --config webpack.dev.js,<br>   build: webpack --config webpack.prod.js}</pre>



<p id="2927">From now on we run&nbsp;<code>npm run dev</code>&nbsp;and&nbsp;<code>npm run build</code>.</p>



<h1 class="wp-block-heading" id="3b98"><span class="ez-toc-section" id="Bonus_Adding_Bootstrap_to_the_mix"></span>Bonus: Adding Bootstrap to the mix<span class="ez-toc-section-end"></span></h1>



<p id="54f8">Bootstrap is by far&nbsp;<a href="https://trends.google.com/trends/explore?date=all&amp;q=Bootstrap,Materialize,Material%20design,kendo%20ui,riotjs" rel="noreferrer noopener" target="_blank">the most widely used design toolkit/component library</a>. Let’s add it to our project to make our form look a bit better:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm i -S jquery bootstrap</code></p></blockquote>



<p id="56a6">Now, you would assume that you could just use imports like before:</p>



<pre class="wp-block-preformatted">import 'jquery';<br>import  'bootstrap/dist/js/bootstrap';<br>import 'bootstrap/dist/css/bootstrap.min.css';</pre>



<p id="8f9d">But no… This would cause an error because&nbsp;<em>bootstrap.css&nbsp;</em>imports font files which we didn’t tell webpack how to handle — hence, it is trying to handle them like JS. Let’s fix that with a simple loader:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p><code>npm i -D url-loader file-loader</code></p></blockquote>



<p id="17b9"><strong>url-loader</strong>&nbsp;encodes any file to base64url. If it is too long, it just serves the file’s contents (via the&nbsp;<strong>file-loader</strong>, hence the&nbsp;<strong>file-loader</strong>&nbsp;install above). We just add the&nbsp;<strong>url-loader</strong>&nbsp;rule to our config rules list.</p>



<pre class="wp-block-preformatted">// use the url-loader for font files<br>{<br>    test: /\.(woff2?|ttf|eot|svg)$/,<br>    use: [<br>        {<br>            loader: 'url-loader',<br>            options: {<br>                limit: 10000<br>            }<br>        }<br>    ]<br>}</pre>



<p id="72d9">Now I’m going to apply Bootstrap to the form (and make some minor CSS changes to make the app more beautiful). Nothing webpack-ish here. You can see all the changes in&nbsp;<a href="https://github.com/YonatanKra/YOPF/commit/3403ee4a2ef166163bbaf0a155311d1968d7b602" rel="noreferrer noopener" target="_blank">this commit</a>, and&nbsp;<a href="https://yonatankra.github.io/YOPF/" rel="noreferrer noopener" target="_blank">check out the final app here</a>.</p>



<h1 class="wp-block-heading" id="7b1f"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h1>



<p id="2d28">By now you know enough webpack to build your own webpack-powered project.</p>



<p id="b1b3">You can see the full project we’ve just built here on&nbsp;<a href="https://github.com/YonatanKra/YOPF" rel="noreferrer noopener" target="_blank">Github</a>.</p>



<p id="5270">Let’s recap some highlights from what we’ve done in this post:</p>



<ol class="wp-block-list"><li>Webpack installation and setup in a&nbsp;<em>webpack.config.js</em>&nbsp;file</li><li>Using loaders to load HTML and CSS files</li><li>Using plugins to make our lives easier</li><li>Splitting our app to sub modules which are imported by one&nbsp;<em>entry</em></li><li>Using npm modules on the client-side the way we use them in Node.js</li><li>Setting up an easy-to-use development server</li></ol>



<p id="9ad7">With this foundational knowledge, you can build something awesome! But webpack has&nbsp;<em>so much more</em>. To continue your educational journey, read the posts below:</p>



<ul class="wp-block-list"><li>Lazy Loading (coming soon)</li><li>Browser compatibility (coming soon)</li></ul>



<p id="9196">You can also explore webpack on your own and/or ask questions in the comments section below if you are stuck.</p>



<p id="0647">Enjoy the fireworks!<a href="https://medium.com/walkme-engineering?source=post_sidebar--------------------------post_sidebar--------------" target="_blank" rel="noopener"></a></p>

