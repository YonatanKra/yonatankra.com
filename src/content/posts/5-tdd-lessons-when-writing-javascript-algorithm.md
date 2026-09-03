---
title: 5 lessons learned when I TDD an algorithm in JavaScript
slug: 5-tdd-lessons-when-writing-javascript-algorithm
published: 2021-12-20T08:22:24
updated: 2021-12-21T06:40:13
author: Yonatan Kra
description: How to develop an algorithm using TDD? In this article we will implement the Diamond-Square algorithm using TDD. This article was inspired by Uncle Bob’s blog post TDD Lesson – Terrain Generation. Well, one of the things I did during the summer was to write an article about “How to Create Terrain and Heightmaps using [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Algorithms
    slug: algorithms
    path: coding/algorithms
  - name: Javascript
    slug: javascript
    path: javascript
tags: []
canonical: https://yonatankra.com/5-tdd-lessons-when-writing-javascript-algorithm/
comments: []
featuredImage: /wp-content/uploads/2021/12/paul-gilmore-x2W9Q_VqIHI-unsplash-scaled.jpeg
---

<p class="has-medium-font-size">How to develop an algorithm using TDD? In this article we will implement the Diamond-Square algorithm using TDD. This article was inspired by Uncle Bob&#8217;s blog post TDD Lesson &#8211; Terrain Generation.</p>



<p>Well, one of the things I did during the summer was to write an article about &#8220;<a href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/" data-type="post" data-id="982">How to Create Terrain and Heightmaps using the Diamond-Square Algorithm in JavaScript?</a>&#8220;. </p>



<p>I just found out that Uncle Bob wrote an article about <a href="http://blog.cleancoder.com/uncle-bob/2017/01/09/DiamondSquare.html" target="_blank" data-type="URL" data-id="http://blog.cleancoder.com/uncle-bob/2017/01/09/DiamondSquare.html" rel="noreferrer noopener">TDDing the Diamond Square algorithm</a> (yea, I&#8217;m slow on catching up sometimes).</p>



<p>In the article, Uncle Bob leads us through a way to TDD an algorithm.  It&#8217;s pretty nice and gave me a few insights as to how to mock and test in intervals until the algorithm emerges.</p>



<p>Problem is &#8211; Uncle Bob&#8217;s code is not JavaScript!!! </p>



<p>So I set down and reimplemented the algorithm.  This time, I used the lessons learned from Uncle Bob&#8217;s article. </p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b9b6ca1" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b9b6ca1"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/5-tdd-lessons-when-writing-javascript-algorithm/#What_did_I_learn_while_developing_an_algorithm_using_TDD_in_JavaScript" >What did I learn while developing an algorithm using TDD in JavaScript?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/5-tdd-lessons-when-writing-javascript-algorithm/#Lesson_1_Start_with_the_simplest_test_possible" >Lesson #1: Start with the simplest test possible</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/5-tdd-lessons-when-writing-javascript-algorithm/#Lesson_2_Mock_for_stability" >Lesson #2: Mock for stability</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/5-tdd-lessons-when-writing-javascript-algorithm/#Lesson_3_Track_your_state_with_a_string" >Lesson #3: Track your state with a string</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/5-tdd-lessons-when-writing-javascript-algorithm/#Lesson_4_Inheritance_can_be_very_useful_for_testing" >Lesson #4: Inheritance can be very useful for testing</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/5-tdd-lessons-when-writing-javascript-algorithm/#Lesson_5_Avoid_the_%E2%80%9CHoly_Grail%E2%80%9D_test_until_the_end" >Lesson #5: Avoid the &#8220;Holy Grail&#8221; test until the end</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/5-tdd-lessons-when-writing-javascript-algorithm/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_did_I_learn_while_developing_an_algorithm_using_TDD_in_JavaScript"></span>What did I learn while developing an algorithm using TDD in JavaScript?<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Lesson_1_Start_with_the_simplest_test_possible"></span>Lesson #1: Start with the simplest test possible<span class="ez-toc-section-end"></span></h3>



<p>In his article, Uncle Bob starts by testing input validation.  That seems too simple, but I find this simplicity charming.  We use to neglect input validation until we finish writing the code (if ever).  Testing input validation? Most people don&#8217;t do that.</p>



<p>Starting with input validation is a kind of &#8220;warmup&#8221; to the real thing. I really suggest doing it. It takes a minute (or less) and is worth it. Here&#8217;s my <code>input validation</code> test:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="230" src="/wp-content/uploads/2021/12/image-11.png" alt="" class="wp-image-1308" srcset="/wp-content/uploads/2021/12/image-11.png 1024w, /wp-content/uploads/2021/12/image-11.png 300w, /wp-content/uploads/2021/12/image-11.png 768w, /wp-content/uploads/2021/12/image-11.png 1536w, /wp-content/uploads/2021/12/image-11.png 2048w, /wp-content/uploads/2021/12/image-11.png 251w, /wp-content/uploads/2021/12/image-11.png 1280w, /wp-content/uploads/2021/12/image-11.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Input validation tests. This begins the TDD of the algorithm.</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Lesson_2_Mock_for_stability"></span>Lesson #2: Mock for stability<span class="ez-toc-section-end"></span></h3>



<p>Many algorithms have a random factor.  The Diamond-Square algorithm has a random factor in the tile value calculation. On every such calculation, we calculate the mean of surrounding tiles and add some random number to make things interesting.</p>



<p>A random factor is not so good for tests. Unit tests need to be stable and that means that every function return should be predictable.</p>



<p>In some cases, using <code>Math.random</code> is enough.  In these cases, we can stub <code>Math.random</code> to return a constant value for our tests.</p>



<p>There are other cases (like our algorithm) in which the randomness is a bit more complex.  In this case, writing a function or a method to generate this randomness is a good practice.  </p>



<p>We first create this function:</p>



<pre class="wp-block-code"><code>it(`should generate a random number that is multiplied by 2 in the power 0 to -0.1`, function () {
        diamondSquare.generateRandom.mockRestore();

        jest.spyOn(Math, 'random').mockReturnValue(1);
        const randomFactorWithOne = diamondSquare.generateRandom(1);

        jest.spyOn(Math, 'random').mockReturnValue(.1);
        const randomFactorWithTenth = diamondSquare.generateRandom(1);

        expect(randomFactorWithOne).toEqual(Math.pow(2, -.1));
        expect(randomFactorWithTenth).toEqual(Math.pow(2, .1*-0.1));
    });</code></pre>



<p>Then we can mock it to get a constant &#8220;random&#8221; value in our test:</p>



<pre class="wp-block-code"><code>jest.spyOn(diamondSquare, 'generateRandom').mockReturnValue(1);</code></pre>



<p>This magic line above mocked the <code>generateRandom</code> method and always returned the value 1. </p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Lesson_3_Track_your_state_with_a_string"></span>Lesson #3: Track your state with a string <span class="ez-toc-section-end"></span></h3>



<p>Algorithms can become very complex.  They usually iterate a lot on the data, and tracking the steps can become difficult.  What Uncle Bob suggests is to stub some functions to track the steps using a string and create sequences that are easy to follow:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113695241" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-track-algorithm-steps-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="track.algorithm.steps.js content, created by YonatanKra on 07:48PM on December 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="track.algorithm.steps.js">
        <tr>
          <td id="file-track-algorithm-steps-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-track-algorithm-steps-js-LC1" class="blob-code blob-code-inner js-file-line">const sequence = `diamondStep ${[1,2,3,4].reduce((v) =&gt; v += &#39;squareStep &#39;, &#39;&#39;)}`</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-track-algorithm-steps-js-LC2" class="blob-code blob-code-inner js-file-line">const expectedSequence = `${[1,2,3,4,5].reduce(v =&gt; v += sequence, &#39;&#39;)}`;</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-track-algorithm-steps-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-track-algorithm-steps-js-LC4" class="blob-code blob-code-inner js-file-line">let output = &#39;&#39;;</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-track-algorithm-steps-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-track-algorithm-steps-js-LC6" class="blob-code blob-code-inner js-file-line">jest.spyOn(diamondSquare, &#39;diamondStep&#39;).mockImplementation(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-track-algorithm-steps-js-LC7" class="blob-code blob-code-inner js-file-line">    output += &#39;diamondStep &#39;;</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-track-algorithm-steps-js-LC8" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-track-algorithm-steps-js-LC9" class="blob-code blob-code-inner js-file-line">jest.spyOn(diamondSquare, &#39;squareStep&#39;).mockImplementation(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-track-algorithm-steps-js-LC10" class="blob-code blob-code-inner js-file-line">    output += &#39;squareStep &#39;;</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-track-algorithm-steps-js-LC11" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-track-algorithm-steps-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-track-algorithm-steps-js-LC13" class="blob-code blob-code-inner js-file-line">diamondSquare.createHeightMap(5);</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-track-algorithm-steps-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-track-algorithm-steps-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-track-algorithm-steps-js-LC15" class="blob-code blob-code-inner js-file-line">expect(output).toEqual(expectedSequence);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/17d28f8721f85a356f30157bc8439283/raw/ddb334088be98c7549d817166903e284e25f3010/track.algorithm.steps.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/17d28f8721f85a356f30157bc8439283#file-track-algorithm-steps-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          track.algorithm.steps.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Tracking the algorithm&#8217;s steps by stubbing the steps methods and concatenating the steps in a string.  Then, we just expect the steps to be a human readable string.</figcaption></figure>



<p>In the Diamond-Square algorithm we know we need to have a certain sequence of steps. We&#8217;d expect on every iteration to calculate 4 squares for every diamond. So in a 3&#215;3 matrix we will have something like this:</p>



<pre class="wp-block-code"><code>diamondStep squareStep squareStep squareStep squareStep </code></pre>



<p>In a 5&#215;5 matrix, we have 5 diamonds, so we will expect to have the following sequence:</p>



<pre class="wp-block-code"><code>diamondStep squareStep squareStep squareStep squareStep diamondStep squareStep squareStep squareStep squareStep diamondStep squareStep squareStep squareStep squareStep diamondStep squareStep squareStep squareStep squareStep diamondStep squareStep squareStep squareStep squareStep</code></pre>



<p>So if something goes wrong, the testing framework (Jest, in my case) will be very useful in guiding me what&#8217;s missing:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="278" src="/wp-content/uploads/2021/12/image-9.png" alt="" class="wp-image-1297" srcset="/wp-content/uploads/2021/12/image-9.png 1024w, /wp-content/uploads/2021/12/image-9.png 300w, /wp-content/uploads/2021/12/image-9.png 768w, /wp-content/uploads/2021/12/image-9.png 1536w, /wp-content/uploads/2021/12/image-9.png 208w, /wp-content/uploads/2021/12/image-9.png 1730w, /wp-content/uploads/2021/12/image-9.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Missing steps in the diamond-square sequence for 5&#215;5 matrix</figcaption></figure></div>



<p>I smacked my head when I read it. It reminded me &#8220;time travel&#8221; in redux and I wondered how I didn&#8217;t use this trick before.</p>



<p>Note that this is not always possible, because your step functions might not be be exposed from the module.  The next lesson will show you a way to do it if you are OOPing.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Lesson_4_Inheritance_can_be_very_useful_for_testing"></span>Lesson #4: Inheritance can be very useful for testing<span class="ez-toc-section-end"></span></h3>



<p>If you are using OOP, you just got lucky.  You can create a test class that extends your original class. This allows you to mock even without a testing framework:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113695309" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-inheritance-mocking-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="inheritance.mocking.js content, created by YonatanKra on 07:56PM on December 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="inheritance.mocking.js">
        <tr>
          <td id="file-inheritance-mocking-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-inheritance-mocking-js-LC1" class="blob-code blob-code-inner js-file-line">// in diamond.square.js</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-inheritance-mocking-js-LC2" class="blob-code blob-code-inner js-file-line">class DiamondSquare {</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-inheritance-mocking-js-LC3" class="blob-code blob-code-inner js-file-line">  diamondStep() {</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-inheritance-mocking-js-LC4" class="blob-code blob-code-inner js-file-line">    //logic </td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-inheritance-mocking-js-LC5" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-inheritance-mocking-js-LC6" class="blob-code blob-code-inner js-file-line">  </td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-inheritance-mocking-js-LC7" class="blob-code blob-code-inner js-file-line">  squareStep() {</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-inheritance-mocking-js-LC8" class="blob-code blob-code-inner js-file-line">    //logic </td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-inheritance-mocking-js-LC9" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-inheritance-mocking-js-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-inheritance-mocking-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-inheritance-mocking-js-LC12" class="blob-code blob-code-inner js-file-line">// in diamond.square.spec.js</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-inheritance-mocking-js-LC13" class="blob-code blob-code-inner js-file-line">class DiamondSquareUnderTest extends DiamondSquare {</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-inheritance-mocking-js-LC14" class="blob-code blob-code-inner js-file-line">  diamondStep() {</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-inheritance-mocking-js-LC15" class="blob-code blob-code-inner js-file-line">    super.diamondStep();</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-inheritance-mocking-js-LC16" class="blob-code blob-code-inner js-file-line">    return &#39;diamondStep&#39;;</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-inheritance-mocking-js-LC17" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-inheritance-mocking-js-LC18" class="blob-code blob-code-inner js-file-line">  </td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-inheritance-mocking-js-LC19" class="blob-code blob-code-inner js-file-line">  squareStep() {</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-inheritance-mocking-js-LC20" class="blob-code blob-code-inner js-file-line">    super.squareStep();</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-inheritance-mocking-js-LC21" class="blob-code blob-code-inner js-file-line">    return &#39;squareStep&#39;;</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-inheritance-mocking-js-LC22" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-inheritance-mocking-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-inheritance-mocking-js-LC23" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/a6f093d93d97c62a78d94f2b59ec9320/raw/088e5828d5a947b54e93103bf2690c8c7a72b10d/inheritance.mocking.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/a6f093d93d97c62a78d94f2b59ec9320#file-inheritance-mocking-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          inheritance.mocking.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>Using inheritance to mock our step methods by overriding them.</figcaption></figure>



<p>While I didn&#8217;t use the full power of OOP in the actual reproduction of the algorithm, this is a nice trick that might come in handy in the future.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Lesson_5_Avoid_the_%E2%80%9CHoly_Grail%E2%80%9D_test_until_the_end"></span>Lesson #5: Avoid the &#8220;Holy Grail&#8221; test until the end<span class="ez-toc-section-end"></span></h3>



<p>The &#8220;Holy Grail&#8221; is a term that is used to describe the end result of our algorithm or module or function.  </p>



<p>By starting with the Holy Grail, we can really fast hit a wall.  The algorithm is quite complex and the results are somewhat hard to calculate. Especially in JavaScript, where the floating numbers returned from a calculation can be quirky. </p>



<p>Here&#8217;s my &#8220;Holy Grail&#8221; test:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="139" src="/wp-content/uploads/2021/12/image-7.png" alt="" class="wp-image-1289" srcset="/wp-content/uploads/2021/12/image-7.png 1024w, /wp-content/uploads/2021/12/image-7.png 300w, /wp-content/uploads/2021/12/image-7.png 768w, /wp-content/uploads/2021/12/image-7.png 268w, /wp-content/uploads/2021/12/image-7.png 1262w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The &#8220;Holy Grail&#8221; test reduced to just running the complete function and taking a snapshot.  Then I just look at the snapshot and see that the calculation is correct.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>I love TDD. I believe it improves my developing experience by simplifying big tasks.</p>



<p>The idea is to build incrementally.  Start from the simplest (the first lesson learned here) and move on to the &#8220;Holy Grail&#8221; that will emerge from the simpler tests.</p>



<p>As Uncle Bob himself suggests in the article &#8211; do try this at home. </p>



<p>For those of you who are interested, here&#8217;s the full solution:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist113694919" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-diamond-square-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="diamond.square.js content, created by YonatanKra on 07:09PM on December 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="diamond.square.js">
        <tr>
          <td id="file-diamond-square-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-diamond-square-js-LC1" class="blob-code blob-code-inner js-file-line">function powerOfTwo(x) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-diamond-square-js-LC2" class="blob-code blob-code-inner js-file-line">    return Math.log2(x) % 1 === 0;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-diamond-square-js-LC3" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-diamond-square-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-diamond-square-js-LC5" class="blob-code blob-code-inner js-file-line">module.exports = class DiamondSquare {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-diamond-square-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-diamond-square-js-LC7" class="blob-code blob-code-inner js-file-line">    createHeightMap(matrixSize) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-diamond-square-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-diamond-square-js-LC9" class="blob-code blob-code-inner js-file-line">        if (matrixSize &lt;= 2) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-diamond-square-js-LC10" class="blob-code blob-code-inner js-file-line">            throw `Matrix Cannot be smaller than 3. Received ${matrixSize}`;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-diamond-square-js-LC11" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-diamond-square-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-diamond-square-js-LC13" class="blob-code blob-code-inner js-file-line">        if (!powerOfTwo(matrixSize &#8211; 1)) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-diamond-square-js-LC14" class="blob-code blob-code-inner js-file-line">            throw `Matrix size must be 2^n+1. Received ${matrixSize}`;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-diamond-square-js-LC15" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-diamond-square-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-diamond-square-js-LC17" class="blob-code blob-code-inner js-file-line">        const matrix = this.createStartingMatrix(matrixSize);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-diamond-square-js-LC18" class="blob-code blob-code-inner js-file-line">        const randomFactor = Math.round(Math.random() * 5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-diamond-square-js-LC19" class="blob-code blob-code-inner js-file-line">        let size = matrixSize &#8211; 1;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-diamond-square-js-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-diamond-square-js-LC21" class="blob-code blob-code-inner js-file-line">        while (size &gt; 1) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-diamond-square-js-LC22" class="blob-code blob-code-inner js-file-line">            const middle = size/2;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-diamond-square-js-LC23" class="blob-code blob-code-inner js-file-line">            for (let i = middle; i &lt; matrixSize &#8211; 1; i += size) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-diamond-square-js-LC24" class="blob-code blob-code-inner js-file-line">                for (let j = middle; j &lt; matrixSize &#8211; 1; j += size) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-diamond-square-js-LC25" class="blob-code blob-code-inner js-file-line">                    matrix[i][j] = this.diamondStep(matrix, i, j, middle) + this.generateRandom(randomFactor);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-diamond-square-js-LC26" class="blob-code blob-code-inner js-file-line">                    //left</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-diamond-square-js-LC27" class="blob-code blob-code-inner js-file-line">                    matrix[i][j &#8211; middle] = this.squareStep(matrix, i, j &#8211; middle, middle) + this.generateRandom(randomFactor);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-diamond-square-js-LC28" class="blob-code blob-code-inner js-file-line">                    // top</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-diamond-square-js-LC29" class="blob-code blob-code-inner js-file-line">                    matrix[i &#8211; middle][j] = this.squareStep(matrix, i &#8211; middle, j, middle) + this.generateRandom(randomFactor);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-diamond-square-js-LC30" class="blob-code blob-code-inner js-file-line">                    // bottom</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-diamond-square-js-LC31" class="blob-code blob-code-inner js-file-line">                    matrix[i + middle][j] = this.squareStep(matrix, i + middle, j, middle) + this.generateRandom(randomFactor);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-diamond-square-js-LC32" class="blob-code blob-code-inner js-file-line">                    // right</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-diamond-square-js-LC33" class="blob-code blob-code-inner js-file-line">                    matrix[i][j + middle] = this.squareStep(matrix, i, j + middle, middle) + this.generateRandom(randomFactor);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-diamond-square-js-LC34" class="blob-code blob-code-inner js-file-line">                }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-diamond-square-js-LC35" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-diamond-square-js-LC36" class="blob-code blob-code-inner js-file-line">            size /= 2;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-diamond-square-js-LC37" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-diamond-square-js-LC38" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-diamond-square-js-LC39" class="blob-code blob-code-inner js-file-line">        return matrix;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-diamond-square-js-LC40" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-diamond-square-js-LC41" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-diamond-square-js-LC42" class="blob-code blob-code-inner js-file-line">    createStartingMatrix(matrixSize) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-diamond-square-js-LC43" class="blob-code blob-code-inner js-file-line">        const newArray = new Array(matrixSize)</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-diamond-square-js-LC44" class="blob-code blob-code-inner js-file-line">            .fill(0)</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-diamond-square-js-LC45" class="blob-code blob-code-inner js-file-line">            .map((val, ui) =&gt; new Array(matrixSize))</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-diamond-square-js-LC46" class="blob-code blob-code-inner js-file-line">        newArray[0][0] = Math.floor(Math.random() * 10);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-diamond-square-js-LC47" class="blob-code blob-code-inner js-file-line">        newArray[0][matrixSize &#8211; 1] = Math.floor(Math.random() * 10);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-diamond-square-js-LC48" class="blob-code blob-code-inner js-file-line">        newArray[matrixSize &#8211; 1][0] = Math.floor(Math.random() * 10);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-diamond-square-js-LC49" class="blob-code blob-code-inner js-file-line">        newArray[matrixSize &#8211; 1][matrixSize &#8211; 1] = Math.floor(Math.random() * 10);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-diamond-square-js-LC50" class="blob-code blob-code-inner js-file-line">        return newArray;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-diamond-square-js-LC51" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-diamond-square-js-LC52" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-diamond-square-js-LC53" class="blob-code blob-code-inner js-file-line">    generateRandom(random) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-diamond-square-js-LC54" class="blob-code blob-code-inner js-file-line">        const h = Math.random() * -.1;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-diamond-square-js-LC55" class="blob-code blob-code-inner js-file-line">        return random * Math.pow(2, h);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-diamond-square-js-LC56" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-diamond-square-js-LC57" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-diamond-square-js-LC58" class="blob-code blob-code-inner js-file-line">    diamondStep(matrix, x, y, middle) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-diamond-square-js-LC59" class="blob-code blob-code-inner js-file-line">        function safeMatrixMember(x1, y1) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-diamond-square-js-LC60" class="blob-code blob-code-inner js-file-line">            if (matrix[x1] === undefined || matrix[x1][y1] === undefined) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-diamond-square-js-LC61" class="blob-code blob-code-inner js-file-line">                meanMembers -= 1;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-diamond-square-js-LC62" class="blob-code blob-code-inner js-file-line">                return 0;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-diamond-square-js-LC63" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-diamond-square-js-LC64" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-diamond-square-js-LC65" class="blob-code blob-code-inner js-file-line">            return matrix[x1][y1];</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-diamond-square-js-LC66" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-diamond-square-js-LC67" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-diamond-square-js-LC68" class="blob-code blob-code-inner js-file-line">        let meanMembers = 4;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-diamond-square-js-LC69" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-diamond-square-js-LC70" class="blob-code blob-code-inner js-file-line">        meanMembers = 4;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-diamond-square-js-LC71" class="blob-code blob-code-inner js-file-line">        return (safeMatrixMember(x + middle, y &#8211; middle) +</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-diamond-square-js-LC72" class="blob-code blob-code-inner js-file-line">            safeMatrixMember(x + middle, y + middle) +</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-diamond-square-js-LC73" class="blob-code blob-code-inner js-file-line">            safeMatrixMember(x &#8211; middle, y &#8211; middle) +</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-diamond-square-js-LC74" class="blob-code blob-code-inner js-file-line">            safeMatrixMember(x &#8211; middle, y + middle)) / meanMembers;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-diamond-square-js-LC75" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-diamond-square-js-LC76" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-diamond-square-js-LC77" class="blob-code blob-code-inner js-file-line">    squareStep(matrix, x, y, middle) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-diamond-square-js-LC78" class="blob-code blob-code-inner js-file-line">        function safeMatrixMember(x, y) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-diamond-square-js-LC79" class="blob-code blob-code-inner js-file-line">            if (matrix[x] === undefined || matrix[x][y] === undefined) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-diamond-square-js-LC80" class="blob-code blob-code-inner js-file-line">                meanMembers -= 1;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-diamond-square-js-LC81" class="blob-code blob-code-inner js-file-line">                return 0;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-diamond-square-js-LC82" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-diamond-square-js-LC83" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-diamond-square-js-LC84" class="blob-code blob-code-inner js-file-line">            return matrix[x][y];</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-diamond-square-js-LC85" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-diamond-square-js-LC86" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-diamond-square-js-LC87" class="blob-code blob-code-inner js-file-line">        let meanMembers = 4;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-diamond-square-js-LC88" class="blob-code blob-code-inner js-file-line">        return (safeMatrixMember(x &#8211; middle, y) +</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-diamond-square-js-LC89" class="blob-code blob-code-inner js-file-line">            safeMatrixMember(x + middle, y) +</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-diamond-square-js-LC90" class="blob-code blob-code-inner js-file-line">            safeMatrixMember(x, y &#8211; middle) +</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-diamond-square-js-LC91" class="blob-code blob-code-inner js-file-line">            safeMatrixMember(x, y + middle)) / meanMembers;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-diamond-square-js-LC92" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-diamond-square-js-LC93" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c57f700100c67d12631e722c9ea7743e/raw/780996866e2e1a0d2142a16116ba8b825231ef4c/diamond.square.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c57f700100c67d12631e722c9ea7743e#file-diamond-square-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          diamond.square.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-diamond-square-spec-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="diamond.square.spec.js content, created by YonatanKra on 07:09PM on December 19, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="diamond.square.spec.js">
        <tr>
          <td id="file-diamond-square-spec-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-diamond-square-spec-js-LC1" class="blob-code blob-code-inner js-file-line">const DiamondSquare = require(&#39;./diamond.square&#39;);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-diamond-square-spec-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-diamond-square-spec-js-LC3" class="blob-code blob-code-inner js-file-line">describe(`diamond square`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-diamond-square-spec-js-LC4" class="blob-code blob-code-inner js-file-line">    let diamondSquare, dummyMatrix3, dummyMatrix5, dummyMatrix;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-diamond-square-spec-js-LC5" class="blob-code blob-code-inner js-file-line">    beforeEach(function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-diamond-square-spec-js-LC6" class="blob-code blob-code-inner js-file-line">        diamondSquare = new DiamondSquare();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-diamond-square-spec-js-LC7" class="blob-code blob-code-inner js-file-line">        dummyMatrix3 = [</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-diamond-square-spec-js-LC8" class="blob-code blob-code-inner js-file-line">            [1, undefined, 2],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-diamond-square-spec-js-LC9" class="blob-code blob-code-inner js-file-line">            [undefined, undefined, undefined],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-diamond-square-spec-js-LC10" class="blob-code blob-code-inner js-file-line">            [4, undefined, 3],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-diamond-square-spec-js-LC11" class="blob-code blob-code-inner js-file-line">        ];</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-diamond-square-spec-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-diamond-square-spec-js-LC13" class="blob-code blob-code-inner js-file-line">        dummyMatrix5 = [</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-diamond-square-spec-js-LC14" class="blob-code blob-code-inner js-file-line">            [1, undefined, undefined, undefined, 2],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-diamond-square-spec-js-LC15" class="blob-code blob-code-inner js-file-line">            [undefined, undefined, undefined, undefined, undefined],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-diamond-square-spec-js-LC16" class="blob-code blob-code-inner js-file-line">            [undefined, undefined, undefined, undefined, undefined],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-diamond-square-spec-js-LC17" class="blob-code blob-code-inner js-file-line">            [undefined, undefined, undefined, undefined, undefined],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-diamond-square-spec-js-LC18" class="blob-code blob-code-inner js-file-line">            [4, undefined, undefined, undefined, 5],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-diamond-square-spec-js-LC19" class="blob-code blob-code-inner js-file-line">        ];</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-diamond-square-spec-js-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-diamond-square-spec-js-LC21" class="blob-code blob-code-inner js-file-line">        jest.spyOn(diamondSquare, &#39;createStartingMatrix&#39;).mockImplementation(() =&gt; dummyMatrix);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-diamond-square-spec-js-LC22" class="blob-code blob-code-inner js-file-line">        jest.spyOn(diamondSquare, &#39;generateRandom&#39;).mockReturnValue(1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-diamond-square-spec-js-LC23" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-diamond-square-spec-js-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-diamond-square-spec-js-LC25" class="blob-code blob-code-inner js-file-line">    it(`should throw if matrix of size less than 3`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-diamond-square-spec-js-LC26" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(0)).toThrow(`Matrix Cannot be smaller than 3. Received 0`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-diamond-square-spec-js-LC27" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(1)).toThrow(`Matrix Cannot be smaller than 3. Received 1`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-diamond-square-spec-js-LC28" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(2)).toThrow(`Matrix Cannot be smaller than 3. Received 2`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-diamond-square-spec-js-LC29" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-diamond-square-spec-js-LC30" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-diamond-square-spec-js-LC31" class="blob-code blob-code-inner js-file-line">    it(`should accept only matrix of size 2^n+1`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-diamond-square-spec-js-LC32" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-diamond-square-spec-js-LC33" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(3)).not.toThrow(`Matrix size must be 2^n+1. Received 3`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-diamond-square-spec-js-LC34" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(5)).not.toThrow(`Matrix size must be 2^n+1. Received 5`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-diamond-square-spec-js-LC35" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(17)).not.toThrow(`Matrix size must be 2^n+1. Received 17`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-diamond-square-spec-js-LC36" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-diamond-square-spec-js-LC37" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(4)).toThrow(`Matrix size must be 2^n+1. Received 4`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-diamond-square-spec-js-LC38" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(8)).toThrow(`Matrix size must be 2^n+1. Received 8`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-diamond-square-spec-js-LC39" class="blob-code blob-code-inner js-file-line">        expect(() =&gt; diamondSquare.createHeightMap(19)).toThrow(`Matrix size must be 2^n+1. Received 19`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-diamond-square-spec-js-LC40" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-diamond-square-spec-js-LC41" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-diamond-square-spec-js-LC42" class="blob-code blob-code-inner js-file-line">    it(`should return a matrix of given size`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-diamond-square-spec-js-LC43" class="blob-code blob-code-inner js-file-line">        diamondSquare.createStartingMatrix.mockRestore();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-diamond-square-spec-js-LC44" class="blob-code blob-code-inner js-file-line">        const heightMap3 = diamondSquare.createHeightMap(3);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-diamond-square-spec-js-LC45" class="blob-code blob-code-inner js-file-line">        const heightMap5 = diamondSquare.createHeightMap(5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-diamond-square-spec-js-LC46" class="blob-code blob-code-inner js-file-line">        const heightMap17 = diamondSquare.createHeightMap(17);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-diamond-square-spec-js-LC47" class="blob-code blob-code-inner js-file-line">        const heightMap3HasThreeColumns = heightMap3.every((row) =&gt; row.length === 3);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-diamond-square-spec-js-LC48" class="blob-code blob-code-inner js-file-line">        const heightMap5HasFiveColumns = heightMap5.every((row) =&gt; row.length === 5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-diamond-square-spec-js-LC49" class="blob-code blob-code-inner js-file-line">        const heightMap17HasSeventeenColumns = heightMap17.every((row) =&gt; row.length === 17);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-diamond-square-spec-js-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-diamond-square-spec-js-LC51" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-diamond-square-spec-js-LC52" class="blob-code blob-code-inner js-file-line">        expect(heightMap3.length).toEqual(3);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-diamond-square-spec-js-LC53" class="blob-code blob-code-inner js-file-line">        expect(heightMap3HasThreeColumns).toEqual(true);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-diamond-square-spec-js-LC54" class="blob-code blob-code-inner js-file-line">        expect(heightMap5.length).toEqual(5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-diamond-square-spec-js-LC55" class="blob-code blob-code-inner js-file-line">        expect(heightMap5HasFiveColumns).toEqual(true);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-diamond-square-spec-js-LC56" class="blob-code blob-code-inner js-file-line">        expect(heightMap17.length).toEqual(17);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-diamond-square-spec-js-LC57" class="blob-code blob-code-inner js-file-line">        expect(heightMap17HasSeventeenColumns).toEqual(true);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-diamond-square-spec-js-LC58" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-diamond-square-spec-js-LC59" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-diamond-square-spec-js-LC60" class="blob-code blob-code-inner js-file-line">    it(`should generate a random number that is multiplied by 2 in the power 0 to -0.1`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-diamond-square-spec-js-LC61" class="blob-code blob-code-inner js-file-line">        diamondSquare.generateRandom.mockRestore();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-diamond-square-spec-js-LC62" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-diamond-square-spec-js-LC63" class="blob-code blob-code-inner js-file-line">        jest.spyOn(Math, &#39;random&#39;).mockReturnValue(1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-diamond-square-spec-js-LC64" class="blob-code blob-code-inner js-file-line">        const randomFactorWithOne = diamondSquare.generateRandom(1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-diamond-square-spec-js-LC65" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-diamond-square-spec-js-LC66" class="blob-code blob-code-inner js-file-line">        jest.spyOn(Math, &#39;random&#39;).mockReturnValue(.1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-diamond-square-spec-js-LC67" class="blob-code blob-code-inner js-file-line">        const randomFactorWithTenth = diamondSquare.generateRandom(1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-diamond-square-spec-js-LC68" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-diamond-square-spec-js-LC69" class="blob-code blob-code-inner js-file-line">        expect(randomFactorWithOne).toEqual(Math.pow(2, -.1));</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-diamond-square-spec-js-LC70" class="blob-code blob-code-inner js-file-line">        expect(randomFactorWithTenth).toEqual(Math.pow(2, .1*-0.1));</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-diamond-square-spec-js-LC71" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-diamond-square-spec-js-LC72" class="blob-code blob-code-inner js-file-line">    </td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-diamond-square-spec-js-LC73" class="blob-code blob-code-inner js-file-line">    it(`should calculate the center of a matrix correctly`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-diamond-square-spec-js-LC74" class="blob-code blob-code-inner js-file-line">        dummyMatrix = dummyMatrix3;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-diamond-square-spec-js-LC75" class="blob-code blob-code-inner js-file-line">        const heightMap3 = diamondSquare.createHeightMap(3);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-diamond-square-spec-js-LC76" class="blob-code blob-code-inner js-file-line">        dummyMatrix = dummyMatrix5;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-diamond-square-spec-js-LC77" class="blob-code blob-code-inner js-file-line">        const heightMap5 = diamondSquare.createHeightMap(5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-diamond-square-spec-js-LC78" class="blob-code blob-code-inner js-file-line">        expect(heightMap3[1][1]).toEqual(2.5 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-diamond-square-spec-js-LC79" class="blob-code blob-code-inner js-file-line">        expect(heightMap5[2][2]).toEqual(3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-diamond-square-spec-js-LC80" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-diamond-square-spec-js-LC81" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-diamond-square-spec-js-LC82" class="blob-code blob-code-inner js-file-line">    it(`should calculate the square correctly`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-diamond-square-spec-js-LC83" class="blob-code blob-code-inner js-file-line">        jest.spyOn(diamondSquare, &#39;createStartingMatrix&#39;).mockImplementation(() =&gt; dummyMatrix);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-diamond-square-spec-js-LC84" class="blob-code blob-code-inner js-file-line">        jest.spyOn(diamondSquare, &#39;generateRandom&#39;).mockReturnValue(1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-diamond-square-spec-js-LC85" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-diamond-square-spec-js-LC86" class="blob-code blob-code-inner js-file-line">        dummyMatrix = dummyMatrix3;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-diamond-square-spec-js-LC87" class="blob-code blob-code-inner js-file-line">        const heightMap3 = diamondSquare.createHeightMap(3);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-diamond-square-spec-js-LC88" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-diamond-square-spec-js-LC89" class="blob-code blob-code-inner js-file-line">        dummyMatrix = dummyMatrix5;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-diamond-square-spec-js-LC90" class="blob-code blob-code-inner js-file-line">        const heightMap5 = diamondSquare.createHeightMap(5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-diamond-square-spec-js-LC91" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-diamond-square-spec-js-LC92" class="blob-code blob-code-inner js-file-line">        expect(heightMap3[0][1]).toEqual(6.5 / 3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-diamond-square-spec-js-LC93" class="blob-code blob-code-inner js-file-line">        expect(heightMap3[1][0]).toEqual(8.5 / 3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-diamond-square-spec-js-LC94" class="blob-code blob-code-inner js-file-line">        expect(heightMap3[2][1]).toEqual(10.5 / 3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-diamond-square-spec-js-LC95" class="blob-code blob-code-inner js-file-line">        expect(heightMap3[1][2]).toEqual(8.5 / 3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-diamond-square-spec-js-LC96" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-diamond-square-spec-js-LC97" class="blob-code blob-code-inner js-file-line">        expect(heightMap5[0][2]).toEqual(7/3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-diamond-square-spec-js-LC98" class="blob-code blob-code-inner js-file-line">        expect(heightMap5[2][0]).toEqual(4);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-diamond-square-spec-js-LC99" class="blob-code blob-code-inner js-file-line">        expect(heightMap5[4][2]).toEqual(13/3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-diamond-square-spec-js-LC100" class="blob-code blob-code-inner js-file-line">        expect(heightMap5[2][4]).toEqual(11/3 + 1);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-diamond-square-spec-js-LC101" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-diamond-square-spec-js-LC102" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-diamond-square-spec-js-LC103" class="blob-code blob-code-inner js-file-line">    it(`should run diamond-square sequences`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-diamond-square-spec-js-LC104" class="blob-code blob-code-inner js-file-line">        dummyMatrix = dummyMatrix5;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L105" class="blob-num js-line-number js-blob-rnum" data-line-number="105"></td>
          <td id="file-diamond-square-spec-js-LC105" class="blob-code blob-code-inner js-file-line">        const sequence = `diamondStep ${[1,2,3,4].reduce((v) =&gt; v += &#39;squareStep &#39;, &#39;&#39;)}`</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L106" class="blob-num js-line-number js-blob-rnum" data-line-number="106"></td>
          <td id="file-diamond-square-spec-js-LC106" class="blob-code blob-code-inner js-file-line">        const expectedSequence = `${[1,2,3,4,5].reduce(v =&gt; v += sequence, &#39;&#39;)}`;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L107" class="blob-num js-line-number js-blob-rnum" data-line-number="107"></td>
          <td id="file-diamond-square-spec-js-LC107" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L108" class="blob-num js-line-number js-blob-rnum" data-line-number="108"></td>
          <td id="file-diamond-square-spec-js-LC108" class="blob-code blob-code-inner js-file-line">        let output = &#39;&#39;;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L109" class="blob-num js-line-number js-blob-rnum" data-line-number="109"></td>
          <td id="file-diamond-square-spec-js-LC109" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L110" class="blob-num js-line-number js-blob-rnum" data-line-number="110"></td>
          <td id="file-diamond-square-spec-js-LC110" class="blob-code blob-code-inner js-file-line">        jest.spyOn(diamondSquare, &#39;diamondStep&#39;).mockImplementation(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L111" class="blob-num js-line-number js-blob-rnum" data-line-number="111"></td>
          <td id="file-diamond-square-spec-js-LC111" class="blob-code blob-code-inner js-file-line">            output += &#39;diamondStep &#39;;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L112" class="blob-num js-line-number js-blob-rnum" data-line-number="112"></td>
          <td id="file-diamond-square-spec-js-LC112" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L113" class="blob-num js-line-number js-blob-rnum" data-line-number="113"></td>
          <td id="file-diamond-square-spec-js-LC113" class="blob-code blob-code-inner js-file-line">        jest.spyOn(diamondSquare, &#39;squareStep&#39;).mockImplementation(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L114" class="blob-num js-line-number js-blob-rnum" data-line-number="114"></td>
          <td id="file-diamond-square-spec-js-LC114" class="blob-code blob-code-inner js-file-line">            output += &#39;squareStep &#39;;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L115" class="blob-num js-line-number js-blob-rnum" data-line-number="115"></td>
          <td id="file-diamond-square-spec-js-LC115" class="blob-code blob-code-inner js-file-line">        });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L116" class="blob-num js-line-number js-blob-rnum" data-line-number="116"></td>
          <td id="file-diamond-square-spec-js-LC116" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L117" class="blob-num js-line-number js-blob-rnum" data-line-number="117"></td>
          <td id="file-diamond-square-spec-js-LC117" class="blob-code blob-code-inner js-file-line">        diamondSquare.createHeightMap(5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L118" class="blob-num js-line-number js-blob-rnum" data-line-number="118"></td>
          <td id="file-diamond-square-spec-js-LC118" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L119" class="blob-num js-line-number js-blob-rnum" data-line-number="119"></td>
          <td id="file-diamond-square-spec-js-LC119" class="blob-code blob-code-inner js-file-line">        expect(output).toEqual(expectedSequence);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L120" class="blob-num js-line-number js-blob-rnum" data-line-number="120"></td>
          <td id="file-diamond-square-spec-js-LC120" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L121" class="blob-num js-line-number js-blob-rnum" data-line-number="121"></td>
          <td id="file-diamond-square-spec-js-LC121" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L122" class="blob-num js-line-number js-blob-rnum" data-line-number="122"></td>
          <td id="file-diamond-square-spec-js-LC122" class="blob-code blob-code-inner js-file-line">    it(`should do a diamond-square sequence`, function () {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L123" class="blob-num js-line-number js-blob-rnum" data-line-number="123"></td>
          <td id="file-diamond-square-spec-js-LC123" class="blob-code blob-code-inner js-file-line">        dummyMatrix = dummyMatrix5;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L124" class="blob-num js-line-number js-blob-rnum" data-line-number="124"></td>
          <td id="file-diamond-square-spec-js-LC124" class="blob-code blob-code-inner js-file-line">        const heightMap5 = diamondSquare.createHeightMap(5);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L125" class="blob-num js-line-number js-blob-rnum" data-line-number="125"></td>
          <td id="file-diamond-square-spec-js-LC125" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L126" class="blob-num js-line-number js-blob-rnum" data-line-number="126"></td>
          <td id="file-diamond-square-spec-js-LC126" class="blob-code blob-code-inner js-file-line">        expect(heightMap5).toMatchSnapshot();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L127" class="blob-num js-line-number js-blob-rnum" data-line-number="127"></td>
          <td id="file-diamond-square-spec-js-LC127" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-spec-js-L128" class="blob-num js-line-number js-blob-rnum" data-line-number="128"></td>
          <td id="file-diamond-square-spec-js-LC128" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c57f700100c67d12631e722c9ea7743e/raw/780996866e2e1a0d2142a16116ba8b825231ef4c/diamond.square.spec.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c57f700100c67d12631e722c9ea7743e#file-diamond-square-spec-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          diamond.square.spec.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>The diamond square algorithm and its test. The tests came first 😉</figcaption></figure>



<p>Thanks a lot to <a href="https://www.linkedin.com/in/hod-bauer-9786133b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAh0oqwBPCYkshi26qGDzYc8kigkCeI1P_o&amp;lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B0VXd0OyqSEuZ%2BDzSnLvYOQ%3D%3D" target="_blank" data-type="URL" data-id="https://www.linkedin.com/in/hod-bauer-9786133b?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAh0oqwBPCYkshi26qGDzYc8kigkCeI1P_o&amp;lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B0VXd0OyqSEuZ%2BDzSnLvYOQ%3D%3D" rel="noreferrer noopener">Hod Bauer</a> and <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.yaircohen.io%2F%3Ffbclid%3DIwAR1Xw6d_SU6eP4yle1bRLAGXeq7haZabCgTFRZ6Unaf_KbIkwpnE1OiutTE&amp;h=AT0ER9VEZ4Eh2lzcELWjOX6LjS0C4WOtICrdyV_gbl6uLF463gHFEgZcrtDYexS95DIz3cAqnWzhldz6QH6UyDlYYjf3TV64oU3XMR1aIzs7xUl-kyluo9CWuJznIpll-l4POIhJr58" target="_blank" data-type="URL" data-id="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.yaircohen.io%2F%3Ffbclid%3DIwAR1Xw6d_SU6eP4yle1bRLAGXeq7haZabCgTFRZ6Unaf_KbIkwpnE1OiutTE&amp;h=AT0ER9VEZ4Eh2lzcELWjOX6LjS0C4WOtICrdyV_gbl6uLF463gHFEgZcrtDYexS95DIz3cAqnWzhldz6QH6UyDlYYjf3TV64oU3XMR1aIzs7xUl-kyluo9CWuJznIpll-l4POIhJr58" rel="noreferrer noopener">Yair Cohen</a> for the kind and thorough review.</p>



<p><em>Featured Photo by <a href="https://unsplash.com/@pueblovista?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Paul Gilmore</a> on <a href="https://unsplash.com/s/photos/terrain?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></em></p>

