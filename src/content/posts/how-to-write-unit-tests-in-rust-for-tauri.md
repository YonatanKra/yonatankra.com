---
title: How to Write Unit Tests in Rust for Tauri?
slug: how-to-write-unit-tests-in-rust-for-tauri
published: 2023-08-16T20:31:31
updated: 2023-09-04T05:22:29
author: Yonatan Kra
description: "Tauri is a desktop apps framework built with Rust for its backend and JavaScript for its front end. The first thing I like to do in a project is set up a unit tests infrastructure. I found it surprisingly easy to do it in Rust. It has become a summer tradition with my son: we [&hellip;]"
categories:
  - name: Rust
    slug: rust
    path: rust
  - name: Tauri
    slug: tauri
    path: tauri
  - name: Testing
    slug: testing
    path: testing
tags:
  - Rust
  - testing
  - unit tests
canonical: https://yonatankra.com/how-to-write-unit-tests-in-rust-for-tauri/
comments: []
---

<p class="has-medium-font-size">Tauri is a desktop apps framework built with Rust for its backend and JavaScript for its front end. The first thing I like to do in a project is set up a unit tests infrastructure. I found it surprisingly easy to do it in Rust.</p>



<p>It has become a summer tradition with my son: we start developing a game together. This time, we thought of creating a desktop game.</p>



<p>After a long time on my learning list, I finally had an excuse to use <a href="https://tauri.app/" data-type="URL" data-id="https://tauri.app/" target="_blank" rel="noreferrer noopener">Tauri.</a>  Building the app went pretty smoothly (more on that in upcoming posts), but I was missing how to unit test the <a href="https://www.rust-lang.org/" data-type="URL" data-id="https://www.rust-lang.org/" target="_blank" rel="noreferrer noopener">Rust</a> code.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1a816467" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1a816467"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-write-unit-tests-in-rust-for-tauri/#The_Bare_Tauri_Project" >The Bare Tauri Project</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-write-unit-tests-in-rust-for-tauri/#How_to_Write_and_Run_Unit_Tests_in_a_Rust_Project" >How to Write and Run Unit Tests in a Rust Project</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-write-unit-tests-in-rust-for-tauri/#How_to_Modularize_Rust_Code" >How to Modularize Rust Code</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-write-unit-tests-in-rust-for-tauri/#How_to_Separate_Tests_from_Implementation_in_Rust" >How to Separate Tests from Implementation in Rust</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-write-unit-tests-in-rust-for-tauri/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Bare_Tauri_Project"></span>The Bare Tauri Project<span class="ez-toc-section-end"></span></h2>



<p>A Tauri project is composed of two main parts: Rust and JavaScript. Creating it is easy with a simple <code>npm</code> command: <code>npm create tauri-app</code> (you can replace <code>npm</code> with your favorite JS package manager). I&#8217;ve used it to scaffold a basic Tauri boilerplate:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="446" height="270" src="/wp-content/uploads/2023/08/image.png" alt="" class="wp-image-1754" srcset="/wp-content/uploads/2023/08/image.png 446w, /wp-content/uploads/2023/08/image.png 300w, /wp-content/uploads/2023/08/image.png 149w" sizes="auto, (max-width: 446px) 100vw, 446px" /><figcaption>Folder Structure of a Tauri Project</figcaption></figure></div>



<p>The <code>src</code> folder holds the JavaScript code. We&#8217;ll get back to it in later posts when I&#8217;ll tell you about my amazing Desktop app.</p>



<p>The <code>src-tauri</code> folder holds the Rust code. Let&#8217;s get inside.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="344" height="454" src="/wp-content/uploads/2023/08/image-1.png" alt="" class="wp-image-1755" srcset="/wp-content/uploads/2023/08/image-1.png 344w, /wp-content/uploads/2023/08/image-1.png 227w, /wp-content/uploads/2023/08/image-1.png 68w" sizes="auto, (max-width: 344px) 100vw, 344px" /><figcaption>Inside the tauri-src folder</figcaption></figure></div>



<p>Inside we can see the <code>icons</code> folder, which holds icons for our desktop app and the <code>src</code> which holds our app. Our app consists of only one file &#8211; <code>main.rs</code>. Makes sense, as this the beginning of our project.</p>



<p><code>main.rs</code> is pretty simple:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124091193" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.rs content, created by YonatanKra on 05:29PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.rs">
        <tr>
          <td id="file-main-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-rs-LC1" class="blob-code blob-code-inner js-file-line">#![cfg_attr(not(debug_assertions), windows_subsystem = &quot;windows&quot;)]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-rs-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-rs-LC3" class="blob-code blob-code-inner js-file-line">#[tauri::command]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-rs-LC4" class="blob-code blob-code-inner js-file-line">fn greet(name: &amp;str) -&gt; String {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-rs-LC5" class="blob-code blob-code-inner js-file-line">    format!(&quot;Hello, {}! You&#39;ve been greeted from Rust!&quot;, name)</td>
        </tr>
        <tr>
          <td id="file-main-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-rs-LC6" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-main-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main-rs-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main-rs-LC8" class="blob-code blob-code-inner js-file-line">fn main() {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main-rs-LC9" class="blob-code blob-code-inner js-file-line">    tauri::Builder::default()</td>
        </tr>
        <tr>
          <td id="file-main-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main-rs-LC10" class="blob-code blob-code-inner js-file-line">        .plugin(tauri_plugin_oauth::init())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main-rs-LC11" class="blob-code blob-code-inner js-file-line">        .invoke_handler(tauri::generate_handler![greet])</td>
        </tr>
        <tr>
          <td id="file-main-rs-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-main-rs-LC12" class="blob-code blob-code-inner js-file-line">        .run(tauri::generate_context!())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-main-rs-LC13" class="blob-code blob-code-inner js-file-line">        .expect(&quot;error while running tauri application&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-rs-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-main-rs-LC14" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/22c60c79440ae98ad5af24d2214446e6/raw/262aca0bd8478655051da3c5a3ca8ee6c2ab8e7b/main.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/22c60c79440ae98ad5af24d2214446e6#file-main-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The first line is a convention meant to help us build for windows.</p>



<p>The <code>#[tauri::command]</code> allows us to build API commands for Tauri. It acts as a decorator to add more characteristics to the following code. We&#8217;ll get back to it in later posts.</p>



<p>Then I have the <code>greet</code> function, which is the simple function we&#8217;re going to see a lot in this article.</p>



<p><code>fn main</code>  starts the Rust app. It starts the Tauri builder and does some stuff. The important thing here is the <code>invoke_handler</code> part. You see it adds a handler with <code>greet</code>? This sets up the API between the client and the Rust server (remember that <code>tauri::command</code> decorator?).</p>



<p>I know you want to get to business. Don&#8217;t worry! That&#8217;s the last time Tauri gets in the way of our story 😉</p>



<p>Now, we came here to test <code>greet</code> and make sure it does what we want, right?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Write_and_Run_Unit_Tests_in_a_Rust_Project"></span>How to Write and Run Unit Tests in a Rust Project<span class="ez-toc-section-end"></span></h2>



<p>There are two places where you can add tests in Rust. The module file itself or a test folder inside the module. We&#8217;ll talk about this later.</p>



<p>Our test code is going to test that when we call <code>greet</code> with a name, it returns the expected string with the name. We will write two tests. One that passes and one that fails. Here&#8217;s how it looks like. Don&#8217;t worry, we&#8217;ll dive into the code in a bit 🙂</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124091266" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main_test-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main_test.rs content, created by YonatanKra on 05:35PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main_test.rs">
        <tr>
          <td id="file-main_test-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main_test-rs-LC1" class="blob-code blob-code-inner js-file-line">#[cfg(test)]</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main_test-rs-LC2" class="blob-code blob-code-inner js-file-line">mod tests {</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main_test-rs-LC3" class="blob-code blob-code-inner js-file-line">    use super::*;</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main_test-rs-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main_test-rs-LC5" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main_test-rs-LC6" class="blob-code blob-code-inner js-file-line">    fn test_greet() {</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main_test-rs-LC7" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Johnny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main_test-rs-LC8" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main_test-rs-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main_test-rs-LC10" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main_test-rs-LC11" class="blob-code blob-code-inner js-file-line">    fn test_greet_badly() {</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-main_test-rs-LC12" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Bonny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-main_test-rs-LC13" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-main_test-rs-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-main_test-rs-LC14" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/ac1ffa1782be979499f22f6656f416cd/raw/04ab848f16975a4a65f574c91d25e8b5358de8fd/main_test.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/ac1ffa1782be979499f22f6656f416cd#file-main_test-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          main_test.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The code above is how you write unit tests in Rust.</p>



<p><code>[cfg(test)]</code> is actually &#8220;configuration(test)&#8221; and it tells the compiler to ignore this on build and run it on test.</p>



<p>The next lines define a module (<code>mod tests</code>). When you use <code>super::*</code> that means you &#8220;import&#8221; all the properties and methods of the current module. This is why I&#8217;m able to use <code>greet</code> in my test functions. Which, at long last, brings us to our test functions.</p>



<p><code>fn test_greet</code> and <code>fn test_greet_badly</code> are simple test functions that assert <code>greet</code>&#8216;s output.</p>



<p><code>assert_eq!(greet("Johnny"), "Hello, Johnny! You've been greeted from Rust!");</code> does exactly what you&#8217;d expect: asserts that the output of <code>greet("Johnny")</code> equals to the string.</p>



<p>Let&#8217;s keep it simple and add this whole code to the <code>main.rs</code> file, just below the <code>main</code> function. </p>



<p>In order to run tests in Rust, we use the command <code>cargo test</code>. Here are the results:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="321" src="/wp-content/uploads/2023/08/image-2.png" alt="" class="wp-image-1756" srcset="/wp-content/uploads/2023/08/image-2.png 1024w, /wp-content/uploads/2023/08/image-2.png 300w, /wp-content/uploads/2023/08/image-2.png 768w, /wp-content/uploads/2023/08/image-2.png 1536w, /wp-content/uploads/2023/08/image-2.png 2048w, /wp-content/uploads/2023/08/image-2.png 180w, /wp-content/uploads/2023/08/image-2.png 1280w, /wp-content/uploads/2023/08/image-2.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The results of the tests run. As expected, it passed for <code>test_greet</code> but failed for <code>test_greet_badly</code></figcaption></figure></div>



<p>Assuming you are not overwhelmed by the usage of <code>cargo</code> so far, let&#8217;s continue to the next step: modularizing our code.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Modularize_Rust_Code"></span>How to Modularize Rust Code<span class="ez-toc-section-end"></span></h2>



<p>Right now, we have our test inside our module. We actually have our <code>greet</code> function inside the <code>main.rs</code> file.  It looks like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124091468" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.rs content, created by YonatanKra on 05:48PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.rs">
        <tr>
          <td id="file-main-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-rs-LC1" class="blob-code blob-code-inner js-file-line">#![cfg_attr(not(debug_assertions), windows_subsystem = &quot;windows&quot;)]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-rs-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-rs-LC3" class="blob-code blob-code-inner js-file-line">#[tauri::command]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-rs-LC4" class="blob-code blob-code-inner js-file-line">fn greet(name: &amp;str) -&gt; String {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-rs-LC5" class="blob-code blob-code-inner js-file-line">    format!(&quot;Hello, {}! You&#39;ve been greeted from Rust!&quot;, name)</td>
        </tr>
        <tr>
          <td id="file-main-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-rs-LC6" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-main-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main-rs-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main-rs-LC8" class="blob-code blob-code-inner js-file-line">fn main() {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main-rs-LC9" class="blob-code blob-code-inner js-file-line">    tauri::Builder::default()</td>
        </tr>
        <tr>
          <td id="file-main-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main-rs-LC10" class="blob-code blob-code-inner js-file-line">        .plugin(tauri_plugin_oauth::init())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main-rs-LC11" class="blob-code blob-code-inner js-file-line">        .invoke_handler(tauri::generate_handler![greet])</td>
        </tr>
        <tr>
          <td id="file-main-rs-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-main-rs-LC12" class="blob-code blob-code-inner js-file-line">        .run(tauri::generate_context!())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-main-rs-LC13" class="blob-code blob-code-inner js-file-line">        .expect(&quot;error while running tauri application&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-rs-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-main-rs-LC14" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-main-rs-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-main-rs-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-main-rs-LC16" class="blob-code blob-code-inner js-file-line">#[cfg(test)]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-main-rs-LC17" class="blob-code blob-code-inner js-file-line">mod tests {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-main-rs-LC18" class="blob-code blob-code-inner js-file-line">    use super::*;</td>
        </tr>
        <tr>
          <td id="file-main-rs-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-main-rs-LC19" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-main-rs-LC20" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-main-rs-LC21" class="blob-code blob-code-inner js-file-line">    fn test_greet() {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-main-rs-LC22" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Johnny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-rs-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-main-rs-LC23" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-main-rs-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-main-rs-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-main-rs-LC25" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-main-rs-LC26" class="blob-code blob-code-inner js-file-line">    fn test_greet_badly() {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-main-rs-LC27" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Bonny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-rs-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-main-rs-LC28" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-main-rs-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-main-rs-LC29" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/02ba600ed5d5bbdbfd2f2266912d53ec/raw/c7ff9cb1710d561bc76d68fd5140a753273ab896/main.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/02ba600ed5d5bbdbfd2f2266912d53ec#file-main-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>That&#8217;s fine now, but this will get more complicated as the project grows. Let&#8217;s break down the Rust code into modules.</p>



<p>In Rust, modules are either files or folders with a <code>mod.rs</code> file in them. </p>



<p>So we could extract <code>greet</code> to a <code>greet.rs</code> file and then import it in our <code>main</code> file like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124093032" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-greet-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="greet.rs content, created by YonatanKra on 07:20PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="greet.rs">
        <tr>
          <td id="file-greet-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-greet-rs-LC1" class="blob-code blob-code-inner js-file-line">#[tauri::command]</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-greet-rs-LC2" class="blob-code blob-code-inner js-file-line">pub fn greet(name: &amp;str) -&gt; String {</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-greet-rs-LC3" class="blob-code blob-code-inner js-file-line">    format!(&quot;Hello, {}! You&#39;ve been greeted from Rust!&quot;, name)</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-greet-rs-LC4" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-greet-rs-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-greet-rs-LC6" class="blob-code blob-code-inner js-file-line">#[cfg(test)]</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-greet-rs-LC7" class="blob-code blob-code-inner js-file-line">mod tests {</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-greet-rs-LC8" class="blob-code blob-code-inner js-file-line">    use super::*;</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-greet-rs-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-greet-rs-LC10" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-greet-rs-LC11" class="blob-code blob-code-inner js-file-line">    fn test_greet() {</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-greet-rs-LC12" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Johnny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-greet-rs-LC13" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-greet-rs-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-greet-rs-LC15" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-greet-rs-LC16" class="blob-code blob-code-inner js-file-line">    fn test_greet_badly() {</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-greet-rs-LC17" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Bonny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-greet-rs-LC18" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-greet-rs-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-greet-rs-LC19" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8309fb53e747f42a49b25c69a4fb032c/raw/df35a0b5414003ec36d1b07b9741358dc8cdad74/greet.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8309fb53e747f42a49b25c69a4fb032c#file-greet-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          greet.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.rs content, created by YonatanKra on 07:20PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.rs">
        <tr>
          <td id="file-main-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-rs-LC1" class="blob-code blob-code-inner js-file-line">#![cfg_attr(not(debug_assertions), windows_subsystem = &quot;windows&quot;)]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-rs-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-rs-LC3" class="blob-code blob-code-inner js-file-line">mod greet;</td>
        </tr>
        <tr>
          <td id="file-main-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-rs-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-rs-LC5" class="blob-code blob-code-inner js-file-line">fn main() {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-rs-LC6" class="blob-code blob-code-inner js-file-line">    tauri::Builder::default()</td>
        </tr>
        <tr>
          <td id="file-main-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main-rs-LC7" class="blob-code blob-code-inner js-file-line">        .plugin(tauri_plugin_oauth::init())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main-rs-LC8" class="blob-code blob-code-inner js-file-line">        .invoke_handler(tauri::generate_handler![greet::greet])</td>
        </tr>
        <tr>
          <td id="file-main-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main-rs-LC9" class="blob-code blob-code-inner js-file-line">        .run(tauri::generate_context!())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main-rs-LC10" class="blob-code blob-code-inner js-file-line">        .expect(&quot;error while running tauri application&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main-rs-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8309fb53e747f42a49b25c69a4fb032c/raw/df35a0b5414003ec36d1b07b9741358dc8cdad74/main.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8309fb53e747f42a49b25c69a4fb032c#file-main-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p><code>main.rs</code> is now much smaller. All of our logic resides in the <code>greet.rs</code> file. Notice we made the function public (the <code>pub</code> preceding the function). We import the module via the <code>mod greet</code> line. Rust expects the file <code>greet.rs</code> to reside in the same folder as <code>main.rs</code>.</p>



<p>The line that changed is our invoke handler: </p>



<p><code>.invoke_handler(tauri::generate_handler![greet::greet])</code></p>



<p>Notice we are using <code>greet:greet</code>.  Because I&#8217;m used to JavaScript, I look at it like object notation. Instead of <code>greet.greet</code>, we now have <code>greet::greet</code>. Not a big deal 🙂</p>



<p>In JavaScript we also have named imports. This can be done using the <code>use</code> command like this:</p>



<pre class="wp-block-code"><code>mod greet;
use crate::greet::greet;</code></pre>



<p>Then in our code, we can use <code>greet</code> without mentioning its module:</p>



<p><code>.invoke_handler(tauri::generate_handler![greet])</code></p>



<p>Now we have our main file and a way to modularize our code. Our tests are still in the implementation file, though. Let&#8217;s fix that.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Separate_Tests_from_Implementation_in_Rust"></span>How to Separate Tests from Implementation in Rust<span class="ez-toc-section-end"></span></h2>



<p>I mentioned earlier that a module can also be a folder with a <code>mod.rs</code> file. That means, we can create a <code>greet</code> folder with <code> mod.rs</code> file and it will work the same:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="226" height="180" src="/wp-content/uploads/2023/08/image-3.png" alt="" class="wp-image-1757" srcset="/wp-content/uploads/2023/08/image-3.png 226w, /wp-content/uploads/2023/08/image-3.png 113w" sizes="auto, (max-width: 226px) 100vw, 226px" /><figcaption>Module as a folder</figcaption></figure></div>



<p>Nothing changed except <code>greet.rs</code> turned into <code>greet/mod.rs</code>.</p>



<p>We can use that in order to extract the tests if we create a module <code>test</code> inside <code>greet</code>:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="252" height="270" src="/wp-content/uploads/2023/08/image-4.png" alt="" class="wp-image-1758" srcset="/wp-content/uploads/2023/08/image-4.png 252w, /wp-content/uploads/2023/08/image-4.png 84w" sizes="auto, (max-width: 252px) 100vw, 252px" /><figcaption>Extracting the <code>greet</code> tests into a <code>test</code> module</figcaption></figure></div>



<p>Our files are going to look like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124093428" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-greet-mod-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="greet.mod.rs content, created by YonatanKra on 07:50PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="greet.mod.rs">
        <tr>
          <td id="file-greet-mod-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-greet-mod-rs-LC1" class="blob-code blob-code-inner js-file-line">mod test;</td>
        </tr>
        <tr>
          <td id="file-greet-mod-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-greet-mod-rs-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-mod-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-greet-mod-rs-LC3" class="blob-code blob-code-inner js-file-line">#[tauri::command]</td>
        </tr>
        <tr>
          <td id="file-greet-mod-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-greet-mod-rs-LC4" class="blob-code blob-code-inner js-file-line">pub fn greet(name: &amp;str) -&gt; String {</td>
        </tr>
        <tr>
          <td id="file-greet-mod-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-greet-mod-rs-LC5" class="blob-code blob-code-inner js-file-line">    format!(&quot;Hello, {}! You&#39;ve been greeted from Rust!&quot;, name)</td>
        </tr>
        <tr>
          <td id="file-greet-mod-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-greet-mod-rs-LC6" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8fc80f8fd6db50b3e0db685949f26aad/raw/dbb95323a931d69290f746043d0ebeb75e27a3bc/greet.mod.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8fc80f8fd6db50b3e0db685949f26aad#file-greet-mod-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          greet.mod.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-greet-test-mod-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="greet.test.mod.rs content, created by YonatanKra on 07:50PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="greet.test.mod.rs">
        <tr>
          <td id="file-greet-test-mod-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-greet-test-mod-rs-LC1" class="blob-code blob-code-inner js-file-line">use crate::greet;</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-greet-test-mod-rs-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-greet-test-mod-rs-LC3" class="blob-code blob-code-inner js-file-line">#[cfg(test)]</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-greet-test-mod-rs-LC4" class="blob-code blob-code-inner js-file-line">mod tests {</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-greet-test-mod-rs-LC5" class="blob-code blob-code-inner js-file-line">    use super::*;</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-greet-test-mod-rs-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-greet-test-mod-rs-LC7" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-greet-test-mod-rs-LC8" class="blob-code blob-code-inner js-file-line">    fn test_greet() {</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-greet-test-mod-rs-LC9" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Johnny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-greet-test-mod-rs-LC10" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-greet-test-mod-rs-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-greet-test-mod-rs-LC12" class="blob-code blob-code-inner js-file-line">    #[test]</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-greet-test-mod-rs-LC13" class="blob-code blob-code-inner js-file-line">    fn test_greet_badly() {</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-greet-test-mod-rs-LC14" class="blob-code blob-code-inner js-file-line">        assert_eq!(greet(&quot;Johnny&quot;), &quot;Hello, Bonny! You&#39;ve been greeted from Rust!&quot;);</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-greet-test-mod-rs-LC15" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-greet-test-mod-rs-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-greet-test-mod-rs-LC16" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8fc80f8fd6db50b3e0db685949f26aad/raw/dbb95323a931d69290f746043d0ebeb75e27a3bc/greet.test.mod.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8fc80f8fd6db50b3e0db685949f26aad#file-greet-test-mod-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          greet.test.mod.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-main-rs" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-rust  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="main.rs content, created by YonatanKra on 07:50PM on August 15, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="main.rs">
        <tr>
          <td id="file-main-rs-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-main-rs-LC1" class="blob-code blob-code-inner js-file-line">#![cfg_attr(not(debug_assertions), windows_subsystem = &quot;windows&quot;)]</td>
        </tr>
        <tr>
          <td id="file-main-rs-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-main-rs-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-main-rs-LC3" class="blob-code blob-code-inner js-file-line">mod greet;</td>
        </tr>
        <tr>
          <td id="file-main-rs-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-main-rs-LC4" class="blob-code blob-code-inner js-file-line">use crate::greet::greet;</td>
        </tr>
        <tr>
          <td id="file-main-rs-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-main-rs-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-main-rs-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-main-rs-LC6" class="blob-code blob-code-inner js-file-line">fn main() {</td>
        </tr>
        <tr>
          <td id="file-main-rs-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-main-rs-LC7" class="blob-code blob-code-inner js-file-line">    tauri::Builder::default()</td>
        </tr>
        <tr>
          <td id="file-main-rs-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-main-rs-LC8" class="blob-code blob-code-inner js-file-line">        .plugin(tauri_plugin_oauth::init())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-main-rs-LC9" class="blob-code blob-code-inner js-file-line">        .invoke_handler(tauri::generate_handler![greet])</td>
        </tr>
        <tr>
          <td id="file-main-rs-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-main-rs-LC10" class="blob-code blob-code-inner js-file-line">        .run(tauri::generate_context!())</td>
        </tr>
        <tr>
          <td id="file-main-rs-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-main-rs-LC11" class="blob-code blob-code-inner js-file-line">        .expect(&quot;error while running tauri application&quot;);</td>
        </tr>
        <tr>
          <td id="file-main-rs-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-main-rs-LC12" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8fc80f8fd6db50b3e0db685949f26aad/raw/dbb95323a931d69290f746043d0ebeb75e27a3bc/main.rs" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8fc80f8fd6db50b3e0db685949f26aad#file-main-rs" class="Link--inTextBlock" target="_blank" rel="noopener">
          main.rs
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The three files. Insted of <code>/</code> I had to use <code>.</code> because gist doesn&#8217;t allow that, but imagine these are folder notations 😉</figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Wow! We got modularization and unit tests working in Rust in like five minutes without any dependencies! That&#8217;s pretty awesome, in my opinion.  I&#8217;m very happy to see nodejs going that way with <code>node:test</code>. </p>



<p>Now my project is ready to begin. Because I&#8217;m working on the project with my son, it&#8217;s going to take a while, but I&#8217;ll update about it. We&#8217;re practically building a game that will run on a desktop. Hey, you might see our game on Steam one day 😉</p>



<p>Thanks a lot to <a href="https://www.linkedin.com/in/yael-oshri-balla-6b56686" data-type="URL" data-id="https://www.linkedin.com/in/yael-oshri-balla-6b56686" target="_blank" rel="noreferrer noopener"><em>Yael Oshri Balla</em></a> and <em><a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener">Yuval Bar Levi</a></em> for the kind and thorough review.</p>

