---
title: How to Create Terrain and Heightmaps using the Diamond-Square Algorithm in JavaScript?
slug: how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript
published: 2021-08-22T17:29:24
updated: 2021-08-22T17:44:52
author: Yonatan Kra
description: The diamond-square algorithm is a procedural terrain generation algorithm. It makes it easy to generate Heightmaps and Terrain for games. In this article we will implement the diamond-square algorithm in JavaScript, plot our terrain on a canvas and see how a player can interact with its various terrain types. Many games are using Procedural Terrain [&hellip;]
categories: []
tags: []
canonical: https://yonatankra.com/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/
comments:
  - author: Stefan
    date: 2022-09-28T13:03:15
    content: |
      <p>Excellent explanation for the algorithm and it also produces quite nice terrain.</p>
      <p>One small thing, the normalizeMatrix function does not (always) work properly because there can be negative numbers in the matrix.</p>
      <p>It should be something like this:</p>
      <p>function normalizeMatrix(matrix) {<br />
      &nbsp;&nbsp;&nbsp;const maxValue = matrix.reduce((max, row) =&gt; {<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return row.reduce((max, value) =&gt; Math.max(value, max));<br />
      &nbsp;&nbsp;&nbsp;}, -Infinity);<br />
      &nbsp;&nbsp;&nbsp;const minValue = matrix.reduce((min, row) =&gt; {<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return row.reduce((min, value) =&gt; Math.min(value, min));<br />
      &nbsp;&nbsp;&nbsp;}, +Infinity);</p>
      <p>&nbsp;&nbsp;&nbsp;return matrix.map((row) =&gt; {<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return row.map((val) =&gt; Math.abs(minValue &#8211; val) / Math.abs(minValue &#8211; maxValue));<br />
      &nbsp;&nbsp;&nbsp;});<br />
      }</p>
  - author: Yonatan Kra
    date: 2022-10-04T08:27:42
    content: |
      <p>Thanks for that!<br />
      That&#8217;s an edge case I should cover with tests I guess 🙂<br />
      Thanks again Stefan!</p>
---


<p class="has-medium-font-size">The diamond-square algorithm is a procedural terrain generation algorithm. It makes it easy to generate Heightmaps and Terrain for games.  In this article we will implement the diamond-square algorithm in JavaScript, plot our terrain on a canvas and see how a player can interact with its various terrain types.</p>



<p>Many games are using <em>Procedural Terrain Generation</em>.  This cool and geeky term means that one generates the terrain in one&#8217;s game&#8230; well&#8230; procedurally. Procedurally means we have a loop (or recursion), and on every step of the loop, the terrain is being refined until we reach the wanted result.</p>



<p>Figure 1 shows the terrain generated using the Diamond-Square algorithm. Let&#8217;s see how you can generate such maps, play with their parameters to generate a more refined map and eventually, use it in a game (or any other interaction you can think of).</p>



<div class="wp-block-jetpack-tiled-gallery aligncenter is-style-columns"><div class="tiled-gallery__gallery"><div class="tiled-gallery__row"><div class="tiled-gallery__col" style="flex-basis:50.00000%"><figure class="tiled-gallery__item"><a href="/wp-content/uploads/2021/08/image-6.png" data-lbwps-width="514" data-lbwps-height="514" data-lbwps-srcsmall="/wp-content/uploads/2021/08/image-6-90x90.png" data-lbwps-caption="Figure 1a: A terrain created using the algorithm. White marks snowpeaks, red/brown marks mountains, green is grassland and blue/purple is water."><img decoding="async" srcset="/wp-content/uploads/2021/08/image-6.png 514w" alt="" data-height="514" data-id="983" data-link="https://yonatankra.com/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/image-6-4/" data-url="/wp-content/uploads/2021/08/image-6.png" data-width="514" src="/wp-content/uploads/2021/08/image-6.png" data-amp-layout="responsive"/></a></figure></div><div class="tiled-gallery__col" style="flex-basis:50.00000%"><figure class="tiled-gallery__item"><a href="/wp-content/uploads/2021/08/realisticOne.png" data-lbwps-width="514" data-lbwps-height="514" data-lbwps-srcsmall="/wp-content/uploads/2021/08/realisticOne-90x90.png" data-lbwps-caption="Figure 1b: A terrain created using the algorithm. White marks snowpeaks, brown marks mountains, green is grassland and blue is water."><img decoding="async" srcset="/wp-content/uploads/2021/08/realisticOne.png 514w" alt="" data-height="514" data-id="1016" data-link="https://yonatankra.com/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/realisticone/" data-url="/wp-content/uploads/2021/08/realisticOne.png" data-width="514" src="/wp-content/uploads/2021/08/realisticOne.png" data-amp-layout="responsive"/></a></figure></div></div></div></div>



<p class="has-text-align-center"><meta charset="utf-8">Figure 1: A terrain created using the algorithm. White marks snowpeaks, red/brown marks mountains, green is grassland and blue/purple is water.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1cac7edd" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1cac7edd"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#The_Algorithm" >The Algorithm</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#How_to_Implement_Diamond-Square_in_JavaScript" >How to Implement Diamond-Square in JavaScript?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Step_1_Generate_a_random_matrix" >Step 1: Generate a random matrix</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Step_2_Iterate_until_matrix_is_full" >Step 2: Iterate until matrix is full</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Step_3_Calculate_Diamond" >Step 3: Calculate Diamond</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Step_4_Calculate_Square" >Step 4: Calculate Square</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Generating_a_heightmap" >Generating a heightmap</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Generating_a_simple_terrain" >Generating a simple terrain</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Generating_a_more_realistic_terrain" >Generating a more realistic terrain</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Using_the_terrain_in_a_game" >Using the terrain in a game</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-create-terrain-and-heightmaps-using-the-diamond-square-algorithm-in-javascript/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Algorithm"></span>The Algorithm<span class="ez-toc-section-end"></span></h2>



<p>As usual, we need to remember our canvas is a matrix.  That means, it is an N x M table with pixels in it. Figure 2 illustrates the phases of the algorithm.</p>



<ol class="wp-block-list"><li>Start with a matrix width and height of 2^n+1 and fill the 4 corners with random numbers (can do non random 🙂 ). <strong>Start</strong> in <strong>Figure 2</strong>.</li><li>In each iteration: <ol><li>Calculate the center of the available diamonds such that their value is equal to the mean of the 4 closest diagonals.<br><strong>Iteration 1 &#8211; Diamond step </strong>and <strong>Iteration 2 &#8211; Diamond step </strong>in <strong>Figure 2</strong>.</li><li>Calculate the center of the available squares such that their value is equal to the 4 closest top, left, right and bottom values. <br><strong>Iteration 1 &#8211; Square step </strong>and <strong>Iteration 2 &#8211; <strong>Square </strong>step </strong>in <strong>Figure 2</strong>.</li></ol></li><li>When the matrix is full, the algorithm finishes.</li></ol>



<p>One thing to note, to make it a bit more interesting &#8211; the calculation should actually be:</p>



<p class="has-text-align-center"><code>mean(4 corners) + jitter</code></p>



<p class="has-text-align-left">Where <code>jitter</code> is a random number proportionate to the iteration index: </p>



<p class="has-text-align-center"><code>jitter = intInRange(-RANDOM/Math.pow(2,i), RANDOM/Math.pow(2,i))</code></p>



<p>That&#8217;s kind of it&#8230; Figure 2 shows the direction of calculations (blue arrows) in every step for a matrix with N = 2. You can click on the figure to enlarge it.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><a href="/wp-content/uploads/2021/08/Diamond-Square-demo.png" data-lbwps-width="2442" data-lbwps-height="485" data-lbwps-srcsmall="/wp-content/uploads/2021/08/Diamond-Square-demo-268x53.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="127" src="/wp-content/uploads/2021/08/Diamond-Square-demo.png" alt="" class="wp-image-1003" srcset="/wp-content/uploads/2021/08/Diamond-Square-demo.png 1024w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 300w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 768w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 1536w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 2048w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 268w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 1280w, /wp-content/uploads/2021/08/Diamond-Square-demo.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /></a><figcaption>Figure 2: On the right side, a random starting state is generated.  We then calculate the middle middle of the matrix in a diamond step &#8211; the blue arrows mark the parameters of the calculation. We then calculate the middle of the squares. The next iteration calculates the middle of the next diamonds and then calculate the relevant squares.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Implement_Diamond-Square_in_JavaScript"></span>How to Implement Diamond-Square in JavaScript?<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Step_1_Generate_a_random_matrix"></span>Step 1: Generate a random matrix<span class="ez-toc-section-end"></span></h3>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111369098" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-generate-matrix-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="generate-matrix.js content, created by YonatanKra on 04:01PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="generate-matrix.js">
        <tr>
          <td id="file-generate-matrix-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-generate-matrix-js-LC1" class="blob-code blob-code-inner js-file-line">const N = 2;</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-generate-matrix-js-LC2" class="blob-code blob-code-inner js-file-line">const RANDOM_INITIAL_RANGE = 10;</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-generate-matrix-js-LC3" class="blob-code blob-code-inner js-file-line">const MATRIX_LENGTH = Math.pow(2, N) + 1;</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-generate-matrix-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-generate-matrix-js-LC5" class="blob-code blob-code-inner js-file-line">function randomInRange(min, max) {</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-generate-matrix-js-LC6" class="blob-code blob-code-inner js-file-line">  return Math.floor(Math.random() * (max - min + 1) + min);</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-generate-matrix-js-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-generate-matrix-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-generate-matrix-js-LC9" class="blob-code blob-code-inner js-file-line">function generateeMatrix() {</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-generate-matrix-js-LC10" class="blob-code blob-code-inner js-file-line">  const matrix = new Array(MATRIX_LENGTH)</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-generate-matrix-js-LC11" class="blob-code blob-code-inner js-file-line">    .fill(0)</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-generate-matrix-js-LC12" class="blob-code blob-code-inner js-file-line">    .map(() =&gt; new Array(MATRIX_LENGTH).fill(null));</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-generate-matrix-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-generate-matrix-js-LC14" class="blob-code blob-code-inner js-file-line">  matrix[0][MATRIX_LENGTH - 1] = randomInRange(0, RANDOM_INITIAL_RANGE);</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-generate-matrix-js-LC15" class="blob-code blob-code-inner js-file-line">  matrix[MATRIX_LENGTH - 1][0] = randomInRange(0, RANDOM_INITIAL_RANGE);</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-generate-matrix-js-LC16" class="blob-code blob-code-inner js-file-line">  matrix[0][0] = randomInRange(0, RANDOM_INITIAL_RANGE);</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-generate-matrix-js-LC17" class="blob-code blob-code-inner js-file-line">  matrix[MATRIX_LENGTH - 1][MATRIX_LENGTH - 1] = randomInRange(</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-generate-matrix-js-LC18" class="blob-code blob-code-inner js-file-line">    0,</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-generate-matrix-js-LC19" class="blob-code blob-code-inner js-file-line">    RANDOM_INITIAL_RANGE</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-generate-matrix-js-LC20" class="blob-code blob-code-inner js-file-line">  );</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-generate-matrix-js-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-generate-matrix-js-LC22" class="blob-code blob-code-inner js-file-line">  return matrix;</td>
        </tr>
        <tr>
          <td id="file-generate-matrix-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-generate-matrix-js-LC23" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e27899e67d44e24961fb68a80bedb070/raw/89ce7b3d8c9e3b8e54e9e0503141baeabee9d6b7/generate-matrix.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e27899e67d44e24961fb68a80bedb070#file-generate-matrix-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          generate-matrix.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The function <code>generateMatrix</code> creates a two dimensional array of the size MATRIX_LENGTH. As mentioned in the algorithm, we set it to be <code>Math.pow(2, N) + 1</code>. N is 2 in this example, but you can set any N depending on the pixel resolution you are interested in.</p>



<p>After creating the matrix, the function then sets the 4 corners of the matrix with random values. Eventually, the function returns a starting matrix much like the <strong>Start</strong> matrix in <strong>Figure 2</strong>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Step_2_Iterate_until_matrix_is_full"></span>Step 2: Iterate until matrix is full<span class="ez-toc-section-end"></span></h3>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111369146" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-diamond-square-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="diamond-square.js content, created by YonatanKra on 04:07PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="diamond-square.js">
        <tr>
          <td id="file-diamond-square-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-diamond-square-js-LC1" class="blob-code blob-code-inner js-file-line">function diamondSquare(matrix) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-diamond-square-js-LC2" class="blob-code blob-code-inner js-file-line">  let chunkSize = MATRIX_LENGTH - 1;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-diamond-square-js-LC3" class="blob-code blob-code-inner js-file-line">  let randomFactor = RANDOM_INITIAL_RANGE;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-diamond-square-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-diamond-square-js-LC5" class="blob-code blob-code-inner js-file-line">  while (chunkSize &gt; 1) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-diamond-square-js-LC6" class="blob-code blob-code-inner js-file-line">    calculateSquare(matrix, chunkSize, randomFactor)</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-diamond-square-js-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-diamond-square-js-LC8" class="blob-code blob-code-inner js-file-line">    calculateDiamond(matrix, chunkSize, randomFactor)</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-diamond-square-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-diamond-square-js-LC10" class="blob-code blob-code-inner js-file-line">    chunkSize /= 2;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-diamond-square-js-LC11" class="blob-code blob-code-inner js-file-line">    randomFactor /= 2;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-diamond-square-js-LC12" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-diamond-square-js-LC13" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-diamond-square-js-LC14" class="blob-code blob-code-inner js-file-line">  return matrix;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-diamond-square-js-LC15" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/d8ac5aa2664b934435492ccb434d30b0/raw/e9e9d3593dba9585b245919fa6c26b8f8960b9ab/diamond-square.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/d8ac5aa2664b934435492ccb434d30b0#file-diamond-square-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          diamond-square.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This function is pretty simple and implements the algorithm quite literally. It starts with <code>chunkSize</code> as the length of the matrix and the <code>randomFactor</code> as our jitter. </p>



<p>On every iteration it calculates the diamonds, then the squares and divides the <code>chunkSize</code> and <code>randomFactor</code> by 2.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Step_3_Calculate_Diamond"></span>Step 3: Calculate Diamond<span class="ez-toc-section-end"></span></h3>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111369217" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-calculate-diamond-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="calculate-diamond.js content, created by YonatanKra on 04:17PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="calculate-diamond.js">
        <tr>
          <td id="file-calculate-diamond-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-calculate-diamond-js-LC1" class="blob-code blob-code-inner js-file-line">function calculateDiamond(matrix, chunkSize, randomFactor) {</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-calculate-diamond-js-LC2" class="blob-code blob-code-inner js-file-line">  let sumComponents = 0;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-calculate-diamond-js-LC3" class="blob-code blob-code-inner js-file-line">  let sum = 0;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-calculate-diamond-js-LC4" class="blob-code blob-code-inner js-file-line">  for (let i = 0; i &lt; matrix.length - 1; i += chunkSize) {</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-calculate-diamond-js-LC5" class="blob-code blob-code-inner js-file-line">    for (let j = 0; j &lt; matrix.length - 1; j += chunkSize) {</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-calculate-diamond-js-LC6" class="blob-code blob-code-inner js-file-line">      const BOTTOM_RIGHT = matrix[j + chunkSize]</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-calculate-diamond-js-LC7" class="blob-code blob-code-inner js-file-line">        ? matrix[j + chunkSize][i + chunkSize]</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-calculate-diamond-js-LC8" class="blob-code blob-code-inner js-file-line">        : null;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-calculate-diamond-js-LC9" class="blob-code blob-code-inner js-file-line">      const BOTTOM_LEFT = matrix[j + chunkSize]</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-calculate-diamond-js-LC10" class="blob-code blob-code-inner js-file-line">        ? matrix[j + chunkSize][i]</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-calculate-diamond-js-LC11" class="blob-code blob-code-inner js-file-line">        : null;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-calculate-diamond-js-LC12" class="blob-code blob-code-inner js-file-line">      const TOP_LEFT = matrix[j][i];</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-calculate-diamond-js-LC13" class="blob-code blob-code-inner js-file-line">      const TOP_RIGHT = matrix[j][i + chunkSize];</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-calculate-diamond-js-LC14" class="blob-code blob-code-inner js-file-line">      const { count, sum } = [</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-calculate-diamond-js-LC15" class="blob-code blob-code-inner js-file-line">        BOTTOM_RIGHT,</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-calculate-diamond-js-LC16" class="blob-code blob-code-inner js-file-line">        BOTTOM_LEFT,</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-calculate-diamond-js-LC17" class="blob-code blob-code-inner js-file-line">        TOP_LEFT,</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-calculate-diamond-js-LC18" class="blob-code blob-code-inner js-file-line">        TOP_RIGHT</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-calculate-diamond-js-LC19" class="blob-code blob-code-inner js-file-line">      ].reduce(</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-calculate-diamond-js-LC20" class="blob-code blob-code-inner js-file-line">        (result, value) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-calculate-diamond-js-LC21" class="blob-code blob-code-inner js-file-line">          if (isFinite(value) &amp;&amp; value != null) {</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-calculate-diamond-js-LC22" class="blob-code blob-code-inner js-file-line">            result.sum += value;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-calculate-diamond-js-LC23" class="blob-code blob-code-inner js-file-line">            result.count += 1;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-calculate-diamond-js-LC24" class="blob-code blob-code-inner js-file-line">          }</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-calculate-diamond-js-LC25" class="blob-code blob-code-inner js-file-line">          return result;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-calculate-diamond-js-LC26" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-calculate-diamond-js-LC27" class="blob-code blob-code-inner js-file-line">        { sum: 0, count: 0 }</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-calculate-diamond-js-LC28" class="blob-code blob-code-inner js-file-line">      );</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-calculate-diamond-js-LC29" class="blob-code blob-code-inner js-file-line">      const changed = {row: j + chunkSize / 2, column: i + chunkSize / 2};</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-calculate-diamond-js-LC30" class="blob-code blob-code-inner js-file-line">      matrix[changed.row][changed.column] =</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-calculate-diamond-js-LC31" class="blob-code blob-code-inner js-file-line">        sum / count + randomInRange(-randomFactor, randomFactor);</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-calculate-diamond-js-LC32" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-calculate-diamond-js-LC33" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-calculate-diamond-js-LC34" class="blob-code blob-code-inner js-file-line">  return matrix;</td>
        </tr>
        <tr>
          <td id="file-calculate-diamond-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-calculate-diamond-js-LC35" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0dd50d5f85d83fa849b0251821f8c327/raw/ec1d66abe0f82bcab55463c05e8890ee57ea4aa6/calculate-diamond.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0dd50d5f85d83fa849b0251821f8c327#file-calculate-diamond-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          calculate-diamond.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This is the first &#8220;complex&#8221; bit of logic in our algorithm. </p>



<p>It runs on the matrix in chunks so for every chunk it sums the 4 corners (BOTTOM_RIGHT, BOTTOM_LEFT, TOP_RIGHT, TOP_LEFT) and calculates the mean into the center.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="400" height="400" src="/wp-content/uploads/2021/08/image-8.png" alt="" class="wp-image-994" srcset="/wp-content/uploads/2021/08/image-8.png 400w, /wp-content/uploads/2021/08/image-8.png 300w, /wp-content/uploads/2021/08/image-8.png 150w, /wp-content/uploads/2021/08/image-8.png 90w, /wp-content/uploads/2021/08/image-8.png 210w, /wp-content/uploads/2021/08/image-8.png 200w" sizes="auto, (max-width: 400px) 100vw, 400px" /><figcaption>Figure 3: Iteration 1 diamond calculation. Runs on (0,0), (0, chunkSize), (chunkSize, 0), (chunkSize, chunkSize). This results in the 4 corners.</figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="400" height="400" src="/wp-content/uploads/2021/08/image-9.png" alt="" class="wp-image-995" srcset="/wp-content/uploads/2021/08/image-9.png 400w, /wp-content/uploads/2021/08/image-9.png 300w, /wp-content/uploads/2021/08/image-9.png 150w, /wp-content/uploads/2021/08/image-9.png 90w, /wp-content/uploads/2021/08/image-9.png 210w, /wp-content/uploads/2021/08/image-9.png 200w" sizes="auto, (max-width: 400px) 100vw, 400px" /><figcaption>Figure 4: Iteration 2 diamond calculation. Now chunkSize is half the length of the matrix.  In order to calculate (1,1) (the value 0.79) it takes (0,0), (0, chunkSize), (chunkSize , chunkSize), (chunkSize, 0), sums them up, divides by 4 and adds the jitter. </figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Step_4_Calculate_Square"></span>Step 4: Calculate Square<span class="ez-toc-section-end"></span></h3>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111369168" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-calculate-square-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="calculate-square.js content, created by YonatanKra on 04:10PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="calculate-square.js">
        <tr>
          <td id="file-calculate-square-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-calculate-square-js-LC1" class="blob-code blob-code-inner js-file-line">function calculateSquare(matrix, chunkSize, randomFactor) {</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-calculate-square-js-LC2" class="blob-code blob-code-inner js-file-line">  const half = chunkSize / 2;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-calculate-square-js-LC3" class="blob-code blob-code-inner js-file-line">  for (let y = 0; y &lt; matrix.length; y += half) {</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-calculate-square-js-LC4" class="blob-code blob-code-inner js-file-line">    for (let x = (y + half) % chunkSize; x &lt; matrix.length; x += chunkSize) {</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-calculate-square-js-LC5" class="blob-code blob-code-inner js-file-line">      const BOTTOM = matrix[y + half] ? matrix[y + half][x] : null;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-calculate-square-js-LC6" class="blob-code blob-code-inner js-file-line">      const LEFT = matrix[y][x - half];</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-calculate-square-js-LC7" class="blob-code blob-code-inner js-file-line">      const TOP = matrix[y - half] ? matrix[y - half][x] : null;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-calculate-square-js-LC8" class="blob-code blob-code-inner js-file-line">      const RIGHT = matrix[y][x + half];</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-calculate-square-js-LC9" class="blob-code blob-code-inner js-file-line">      const { count, sum } = [BOTTOM, LEFT, TOP, RIGHT].reduce(</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-calculate-square-js-LC10" class="blob-code blob-code-inner js-file-line">        (result, value) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-calculate-square-js-LC11" class="blob-code blob-code-inner js-file-line">          if (isFinite(value) &amp;&amp; value != null) {</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-calculate-square-js-LC12" class="blob-code blob-code-inner js-file-line">            result.sum += value;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-calculate-square-js-LC13" class="blob-code blob-code-inner js-file-line">            result.count += 1;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-calculate-square-js-LC14" class="blob-code blob-code-inner js-file-line">          }</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-calculate-square-js-LC15" class="blob-code blob-code-inner js-file-line">          return result;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-calculate-square-js-LC16" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-calculate-square-js-LC17" class="blob-code blob-code-inner js-file-line">        { sum: 0, count: 0 }</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-calculate-square-js-LC18" class="blob-code blob-code-inner js-file-line">      );</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-calculate-square-js-LC19" class="blob-code blob-code-inner js-file-line">      matrix[y][x] = sum / count + randomInRange(-randomFactor, randomFactor);</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-calculate-square-js-LC20" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-calculate-square-js-LC21" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-calculate-square-js-LC22" class="blob-code blob-code-inner js-file-line">  return matrix;</td>
        </tr>
        <tr>
          <td id="file-calculate-square-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-calculate-square-js-LC23" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e92395daae7e47a28b89faeda63c8a55/raw/3ed484f6c2bb71b5101d550d0f4ea8eb0fb8fe36/calculate-square.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e92395daae7e47a28b89faeda63c8a55#file-calculate-square-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          calculate-square.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>It first takes half the chunk sent to it and runs over the matrix in half chunks. So if we sent the whole length, it starts by calculating for the middle (length/2, length/2). It then gets the values of the <code>BOTTOM</code>, <code>TOP</code>, <code>LEFT</code> and <code>RIGHT</code>, calculates the mean, adds the jitter and assigns the value to the middle.</p>



<p>On the next iteration, it will get <code>chunkSize = length/2</code> so it will run on the smaller squares.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="400" height="400" src="/wp-content/uploads/2021/08/image-10.png" alt="" class="wp-image-996" srcset="/wp-content/uploads/2021/08/image-10.png 400w, /wp-content/uploads/2021/08/image-10.png 300w, /wp-content/uploads/2021/08/image-10.png 150w, /wp-content/uploads/2021/08/image-10.png 90w, /wp-content/uploads/2021/08/image-10.png 210w, /wp-content/uploads/2021/08/image-10.png 200w" sizes="auto, (max-width: 400px) 100vw, 400px" /><figcaption>Figure 5: End of the first iteration&#8217;s square phase. On this step, there are only 3 numbers surrounding the assigned value. For instance, -3.83 (2,4) was calculated with (0, chunkSize*2) &#8211; value of 2.00, (chunkSize, chunkSize) &#8211; value of 0.5 and (chunkSize*2, chunkSize*2) &#8211; value of 4.00. </figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="400" height="400" src="/wp-content/uploads/2021/08/image-11.png" alt="" class="wp-image-997" srcset="/wp-content/uploads/2021/08/image-11.png 400w, /wp-content/uploads/2021/08/image-11.png 300w, /wp-content/uploads/2021/08/image-11.png 150w, /wp-content/uploads/2021/08/image-11.png 90w, /wp-content/uploads/2021/08/image-11.png 210w, /wp-content/uploads/2021/08/image-11.png 200w" sizes="auto, (max-width: 400px) 100vw, 400px" /><figcaption> Figure 6: End of the 2nd iteration&#8217;s square phase. </figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Generating_a_heightmap"></span>Generating a heightmap<span class="ez-toc-section-end"></span></h2>



<p>Now that we have our algorithm, we can generate a heightmap using canvas.</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111370570" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-draw-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="draw.js content, created by YonatanKra on 05:55PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="draw.js">
        <tr>
          <td id="file-draw-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-draw-js-LC1" class="blob-code blob-code-inner js-file-line">function normalizeMatrix(matrix) {</td>
        </tr>
        <tr>
          <td id="file-draw-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-draw-js-LC2" class="blob-code blob-code-inner js-file-line">  const maxValue = matrix.reduce((max, row) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-draw-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-draw-js-LC3" class="blob-code blob-code-inner js-file-line">    return row.reduce((max, value) =&gt; Math.max(value, max));</td>
        </tr>
        <tr>
          <td id="file-draw-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-draw-js-LC4" class="blob-code blob-code-inner js-file-line">  }, -Infinity);</td>
        </tr>
        <tr>
          <td id="file-draw-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-draw-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-draw-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-draw-js-LC6" class="blob-code blob-code-inner js-file-line">  return matrix.map((row) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-draw-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-draw-js-LC7" class="blob-code blob-code-inner js-file-line">    return row.map((val) =&gt; val / maxValue);</td>
        </tr>
        <tr>
          <td id="file-draw-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-draw-js-LC8" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-draw-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-draw-js-LC9" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-draw-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-draw-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-draw-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-draw-js-LC11" class="blob-code blob-code-inner js-file-line">function draw(matrix, canvas) {</td>
        </tr>
        <tr>
          <td id="file-draw-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-draw-js-LC12" class="blob-code blob-code-inner js-file-line">  const ctx = canvas.getContext(&quot;2d&quot;);</td>
        </tr>
        <tr>
          <td id="file-draw-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-draw-js-LC13" class="blob-code blob-code-inner js-file-line">  const normalizedMatrix = normalizeMatrix(matrix);</td>
        </tr>
        <tr>
          <td id="file-draw-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-draw-js-LC14" class="blob-code blob-code-inner js-file-line">  ctx.beginPath();</td>
        </tr>
        <tr>
          <td id="file-draw-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-draw-js-LC15" class="blob-code blob-code-inner js-file-line">  normalizedMatrix.forEach((pixelsRow, rowIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-draw-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-draw-js-LC16" class="blob-code blob-code-inner js-file-line">    const y = rowIndex * MATRIX_DIMENSIONS.pixelHeight;</td>
        </tr>
        <tr>
          <td id="file-draw-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-draw-js-LC17" class="blob-code blob-code-inner js-file-line">    pixelsRow.forEach((pixel, pixelIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-draw-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-draw-js-LC18" class="blob-code blob-code-inner js-file-line">      const x = pixelIndex * MATRIX_DIMENSIONS.pixelWidth;</td>
        </tr>
        <tr>
          <td id="file-draw-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-draw-js-LC19" class="blob-code blob-code-inner js-file-line">      ctx.fillStyle = getColor(pixel);</td>
        </tr>
        <tr>
          <td id="file-draw-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-draw-js-LC20" class="blob-code blob-code-inner js-file-line">      ctx.fillRect(</td>
        </tr>
        <tr>
          <td id="file-draw-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-draw-js-LC21" class="blob-code blob-code-inner js-file-line">        x,</td>
        </tr>
        <tr>
          <td id="file-draw-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-draw-js-LC22" class="blob-code blob-code-inner js-file-line">        y,</td>
        </tr>
        <tr>
          <td id="file-draw-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-draw-js-LC23" class="blob-code blob-code-inner js-file-line">        MATRIX_DIMENSIONS.pixelWidth,</td>
        </tr>
        <tr>
          <td id="file-draw-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-draw-js-LC24" class="blob-code blob-code-inner js-file-line">        MATRIX_DIMENSIONS.pixelHeight</td>
        </tr>
        <tr>
          <td id="file-draw-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-draw-js-LC25" class="blob-code blob-code-inner js-file-line">      );</td>
        </tr>
        <tr>
          <td id="file-draw-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-draw-js-LC26" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-draw-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-draw-js-LC27" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-draw-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-draw-js-LC28" class="blob-code blob-code-inner js-file-line">  ctx.closePath();</td>
        </tr>
        <tr>
          <td id="file-draw-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-draw-js-LC29" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6b3e42bedfbf9932d279d4c573079e3b/raw/27b6c925830430aa119e2858f9479393ffb80c3b/draw.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6b3e42bedfbf9932d279d4c573079e3b#file-draw-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          draw.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>Our drawing function gets a matrix and a canvas to draw on.  It normalizes the matrix to its maximum, which means that the maximum value in the matrix will be 1 and the rest will be a fraction. This creates the effect of values as  percentages. Then, for each pixel in our matrix, we draw a rectangle with a color that is represented by the value in the cell. </p>



<p>The <code>getColor</code> function can be anything we want. Let&#8217;s start with something simple:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111370604" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-get-color-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="get-color.js content, created by YonatanKra on 05:58PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="get-color.js">
        <tr>
          <td id="file-get-color-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-get-color-js-LC1" class="blob-code blob-code-inner js-file-line">function getColor(percentage) {</td>
        </tr>
        <tr>
          <td id="file-get-color-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-get-color-js-LC2" class="blob-code blob-code-inner js-file-line">  const hue = percentage * 360;</td>
        </tr>
        <tr>
          <td id="file-get-color-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-get-color-js-LC3" class="blob-code blob-code-inner js-file-line">  return `hsl(${hue}, 100%, 50%)`;</td>
        </tr>
        <tr>
          <td id="file-get-color-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-get-color-js-LC4" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c0e2b85a710c5659417fa257c4642f2e/raw/2e140545fce21e38ac8c639a8c0e7a12f5b94eb3/get-color.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c0e2b85a710c5659417fa257c4642f2e#file-get-color-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          get-color.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The <code>getColor</code> function above will generate a random color in <code><a rel="noreferrer noopener" href="https://www.w3schools.com/colors/colors_hsl.asp" data-type="URL" data-id="https://www.w3schools.com/colors/colors_hsl.asp" target="_blank">HSL</a></code>. HSL has hue values between 0 and 360, so multiplying our percentage (normalized values) will give us a value between 0 and 360.  Watch a live demo here:</p>



<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjNpOar" data-user="yonatankra" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/JjNpOar" target="_blank" rel="noopener">
  Diamond Square</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Generating_a_simple_terrain"></span>Generating a simple terrain<span class="ez-toc-section-end"></span></h2>



<p>The heatmap or heightmap generated using HSL in the former section is nice. But what if we want to generate something more meaningful to our strategy game? We&#8217;d like to actually show mountains, plains and water&#8230;</p>



<p>Here&#8217;s a simple function that generates these colors:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111370723" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-landscape-colors-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="landscape-colors.js content, created by YonatanKra on 06:15PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="landscape-colors.js">
        <tr>
          <td id="file-landscape-colors-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-landscape-colors-js-LC1" class="blob-code blob-code-inner js-file-line">function landscapeColors(percentage) {</td>
        </tr>
        <tr>
          <td id="file-landscape-colors-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-landscape-colors-js-LC2" class="blob-code blob-code-inner js-file-line">  const hue = percentage &gt;= .66 ? 240 : percentage &gt;= .33 ? 120 : 0;</td>
        </tr>
        <tr>
          <td id="file-landscape-colors-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-landscape-colors-js-LC3" class="blob-code blob-code-inner js-file-line">  const lightness = 50;</td>
        </tr>
        <tr>
          <td id="file-landscape-colors-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-landscape-colors-js-LC4" class="blob-code blob-code-inner js-file-line">  const saturation = 100;</td>
        </tr>
        <tr>
          <td id="file-landscape-colors-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-landscape-colors-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-landscape-colors-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-landscape-colors-js-LC6" class="blob-code blob-code-inner js-file-line">  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;</td>
        </tr>
        <tr>
          <td id="file-landscape-colors-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-landscape-colors-js-LC7" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/817e728b611845faffccfce8e35206c2/raw/9fd218c7be6bfbe90f93621972c3687374c932c3/landscape-colors.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/817e728b611845faffccfce8e35206c2#file-landscape-colors-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          landscape-colors.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This simple function simply returns 3 colors: red for mountains, green for plains and blue for water.</p>



<p>Check out this live demo:</p>



<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZEyzeRZ" data-user="yonatankra" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/ZEyzeRZ" target="_blank" rel="noopener">
  Diamond Square Height Map</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Generating_a_more_realistic_terrain"></span>Generating a more realistic terrain<span class="ez-toc-section-end"></span></h2>



<p>The simple terrain we&#8217;ve generated reminds us games we played in the 80&#8217;s. Ok, some of us played in the 80&#8217;s 😉</p>



<p>But we can play with the code to return much more complex terrain types. Here&#8217;s a code that generates a smoother terrain and adds snow in the mountains:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111370745" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-smoother-landscape-colors-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="smoother-landscape-colors.js content, created by YonatanKra on 06:19PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="smoother-landscape-colors.js">
        <tr>
          <td id="file-smoother-landscape-colors-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-smoother-landscape-colors-js-LC1" class="blob-code blob-code-inner js-file-line">function landscapeColors(percentage) {</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-smoother-landscape-colors-js-LC2" class="blob-code blob-code-inner js-file-line">  const colorVariety = 3;</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-smoother-landscape-colors-js-LC3" class="blob-code blob-code-inner js-file-line">  const colorStep = 360 / colorVariety;</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-smoother-landscape-colors-js-LC4" class="blob-code blob-code-inner js-file-line">  const colorIndex = Math.floor(percentage * colorVariety);</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-smoother-landscape-colors-js-LC5" class="blob-code blob-code-inner js-file-line">  const hue =</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-smoother-landscape-colors-js-LC6" class="blob-code blob-code-inner js-file-line">    colorStep * colorIndex + colorStep * (percentage - (colorIndex * 100) / 3);</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-smoother-landscape-colors-js-LC7" class="blob-code blob-code-inner js-file-line">  const lightness = percentage &lt; 0.01 ? 100 : 50;</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-smoother-landscape-colors-js-LC8" class="blob-code blob-code-inner js-file-line">  const saturation = 100;</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-smoother-landscape-colors-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-smoother-landscape-colors-js-LC10" class="blob-code blob-code-inner js-file-line">  return `hsl(${hue &lt; 360 ? hue : hue - 360}, ${saturation}%, ${lightness}%)`;</td>
        </tr>
        <tr>
          <td id="file-smoother-landscape-colors-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-smoother-landscape-colors-js-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/840b620107a25c3008297ef2c64f1bf5/raw/177f5df9f18c6e7b4d317fd68a35ee8e677b1ab8/smoother-landscape-colors.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/840b620107a25c3008297ef2c64f1bf5#file-smoother-landscape-colors-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          smoother-landscape-colors.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>In this code example, I smooth the experience by adding more hues with a more complex hue equation. In addition, I add a rule to set lightness to 100 in case of a very small percentage &#8211; that in high chance appears in the middle of a mountain range.</p>



<p>Check out the live demo with another more complex example here (complements of <meta charset="utf-8"><a rel="noreferrer noopener" href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank">Miki Ezra Stanger</a>):</p>



<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gORYmdX" data-user="yonatankra" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/gORYmdX" target="_blank" rel="noopener">
  Diamond Square Terrain</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Using_the_terrain_in_a_game"></span>Using the terrain in a game<span class="ez-toc-section-end"></span></h2>



<p>Now let&#8217;s assume that in our game, we&#8217;d like the user to click on a terrain and see its details.  There are many ways to do this, but the new Path2D API makes collision detection a breeze.</p>



<p>We&#8217;re going to change our code a bit:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111371199" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-diamond-square-user-interaction-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="diamond-square-user-interaction.js content, created by YonatanKra on 07:12PM on August 21, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="diamond-square-user-interaction.js">
        <tr>
          <td id="file-diamond-square-user-interaction-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-diamond-square-user-interaction-js-LC1" class="blob-code blob-code-inner js-file-line">function landscapeColors(percentage) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-diamond-square-user-interaction-js-LC2" class="blob-code blob-code-inner js-file-line">  const colorVariety = 3;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-diamond-square-user-interaction-js-LC3" class="blob-code blob-code-inner js-file-line">  const colorStep = 360 / colorVariety;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-diamond-square-user-interaction-js-LC4" class="blob-code blob-code-inner js-file-line">  const colorIndex = Math.floor(percentage * colorVariety);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-diamond-square-user-interaction-js-LC5" class="blob-code blob-code-inner js-file-line">  const hue =</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-diamond-square-user-interaction-js-LC6" class="blob-code blob-code-inner js-file-line">    colorStep * colorIndex + colorStep * (percentage - (colorIndex * 100) / 3);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-diamond-square-user-interaction-js-LC7" class="blob-code blob-code-inner js-file-line">  const lightness = percentage &lt; 0.01 ? 100 : 50;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-diamond-square-user-interaction-js-LC8" class="blob-code blob-code-inner js-file-line">  const saturation = 100;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-diamond-square-user-interaction-js-LC9" class="blob-code blob-code-inner js-file-line">  const terrainType =</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-diamond-square-user-interaction-js-LC10" class="blob-code blob-code-inner js-file-line">    lightness === 100</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-diamond-square-user-interaction-js-LC11" class="blob-code blob-code-inner js-file-line">      ? &quot;snow&quot;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-diamond-square-user-interaction-js-LC12" class="blob-code blob-code-inner js-file-line">      : colorIndex === 0</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-diamond-square-user-interaction-js-LC13" class="blob-code blob-code-inner js-file-line">      ? &quot;mountains&quot;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-diamond-square-user-interaction-js-LC14" class="blob-code blob-code-inner js-file-line">      : colorIndex === 1</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-diamond-square-user-interaction-js-LC15" class="blob-code blob-code-inner js-file-line">      ? &quot;plains&quot;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-diamond-square-user-interaction-js-LC16" class="blob-code blob-code-inner js-file-line">      : &quot;water&quot;;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-diamond-square-user-interaction-js-LC17" class="blob-code blob-code-inner js-file-line">  return {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-diamond-square-user-interaction-js-LC18" class="blob-code blob-code-inner js-file-line">    hsl: `hsl(${hue &lt; 360 ? hue : hue - 360}, ${saturation}%, ${lightness}%)`,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-diamond-square-user-interaction-js-LC19" class="blob-code blob-code-inner js-file-line">    terrainType</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-diamond-square-user-interaction-js-LC20" class="blob-code blob-code-inner js-file-line">  };</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-diamond-square-user-interaction-js-LC21" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-diamond-square-user-interaction-js-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-diamond-square-user-interaction-js-LC23" class="blob-code blob-code-inner js-file-line">function draw(terrain_matrix) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-diamond-square-user-interaction-js-LC24" class="blob-code blob-code-inner js-file-line">  const ctx = canvas.getContext(&quot;2d&quot;);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-diamond-square-user-interaction-js-LC25" class="blob-code blob-code-inner js-file-line">  const paths = {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-diamond-square-user-interaction-js-LC26" class="blob-code blob-code-inner js-file-line">    water: new Path2D(),</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-diamond-square-user-interaction-js-LC27" class="blob-code blob-code-inner js-file-line">    plains: new Path2D(),</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-diamond-square-user-interaction-js-LC28" class="blob-code blob-code-inner js-file-line">    mountains: new Path2D(),</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-diamond-square-user-interaction-js-LC29" class="blob-code blob-code-inner js-file-line">    snow: new Path2D()</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-diamond-square-user-interaction-js-LC30" class="blob-code blob-code-inner js-file-line">  };</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-diamond-square-user-interaction-js-LC31" class="blob-code blob-code-inner js-file-line">  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-diamond-square-user-interaction-js-LC32" class="blob-code blob-code-inner js-file-line">  ctx.beginPath();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-diamond-square-user-interaction-js-LC33" class="blob-code blob-code-inner js-file-line">  terrain_matrix.forEach((pixelsRow, rowIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-diamond-square-user-interaction-js-LC34" class="blob-code blob-code-inner js-file-line">    const y = rowIndex * MATRIX_DIMENSIONS.pixelHeight;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-diamond-square-user-interaction-js-LC35" class="blob-code blob-code-inner js-file-line">    pixelsRow.forEach((pixel, pixelIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-diamond-square-user-interaction-js-LC36" class="blob-code blob-code-inner js-file-line">      const x = pixelIndex * MATRIX_DIMENSIONS.pixelWidth;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-diamond-square-user-interaction-js-LC37" class="blob-code blob-code-inner js-file-line">      const { hsl, terrainType } = getColor(pixel);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-diamond-square-user-interaction-js-LC38" class="blob-code blob-code-inner js-file-line">      ctx.fillStyle = hsl;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-diamond-square-user-interaction-js-LC39" class="blob-code blob-code-inner js-file-line">      ctx.fillRect(</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-diamond-square-user-interaction-js-LC40" class="blob-code blob-code-inner js-file-line">        x,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-diamond-square-user-interaction-js-LC41" class="blob-code blob-code-inner js-file-line">        y,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-diamond-square-user-interaction-js-LC42" class="blob-code blob-code-inner js-file-line">        MATRIX_DIMENSIONS.pixelWidth,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-diamond-square-user-interaction-js-LC43" class="blob-code blob-code-inner js-file-line">        MATRIX_DIMENSIONS.pixelHeight</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-diamond-square-user-interaction-js-LC44" class="blob-code blob-code-inner js-file-line">      );</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-diamond-square-user-interaction-js-LC45" class="blob-code blob-code-inner js-file-line">      const tmpPath = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-diamond-square-user-interaction-js-LC46" class="blob-code blob-code-inner js-file-line">      tmpPath.rect(</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-diamond-square-user-interaction-js-LC47" class="blob-code blob-code-inner js-file-line">        x,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-diamond-square-user-interaction-js-LC48" class="blob-code blob-code-inner js-file-line">        y,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-diamond-square-user-interaction-js-LC49" class="blob-code blob-code-inner js-file-line">        MATRIX_DIMENSIONS.pixelWidth,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-diamond-square-user-interaction-js-LC50" class="blob-code blob-code-inner js-file-line">        MATRIX_DIMENSIONS.pixelHeight</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-diamond-square-user-interaction-js-LC51" class="blob-code blob-code-inner js-file-line">      );</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-diamond-square-user-interaction-js-LC52" class="blob-code blob-code-inner js-file-line">      paths[terrainType].addPath(tmpPath);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-diamond-square-user-interaction-js-LC53" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-diamond-square-user-interaction-js-LC54" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-diamond-square-user-interaction-js-LC55" class="blob-code blob-code-inner js-file-line">  ctx.closePath();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-diamond-square-user-interaction-js-LC56" class="blob-code blob-code-inner js-file-line">  return paths;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-diamond-square-user-interaction-js-LC57" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-diamond-square-user-interaction-js-LC58" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-diamond-square-user-interaction-js-LC59" class="blob-code blob-code-inner js-file-line">canvas.addEventListener(&quot;click&quot;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-diamond-square-user-interaction-js-LC60" class="blob-code blob-code-inner js-file-line">  const pathsNames = Object.keys(paths);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-diamond-square-user-interaction-js-LC61" class="blob-code blob-code-inner js-file-line">  const ctx = canvas.getContext(&quot;2d&quot;);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-diamond-square-user-interaction-js-LC62" class="blob-code blob-code-inner js-file-line">  const { top, left } = canvas.getBoundingClientRect();</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-diamond-square-user-interaction-js-LC63" class="blob-code blob-code-inner js-file-line">  for (let i = 0; i &lt; pathsNames.length; i++) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-diamond-square-user-interaction-js-LC64" class="blob-code blob-code-inner js-file-line">    if (</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-diamond-square-user-interaction-js-LC65" class="blob-code blob-code-inner js-file-line">      ctx.isPointInPath(</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-diamond-square-user-interaction-js-LC66" class="blob-code blob-code-inner js-file-line">        paths[pathsNames[i]],</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-diamond-square-user-interaction-js-LC67" class="blob-code blob-code-inner js-file-line">        event.clientX - left,</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-diamond-square-user-interaction-js-LC68" class="blob-code blob-code-inner js-file-line">        event.clientY - top</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-diamond-square-user-interaction-js-LC69" class="blob-code blob-code-inner js-file-line">      )</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-diamond-square-user-interaction-js-LC70" class="blob-code blob-code-inner js-file-line">    ) {</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-diamond-square-user-interaction-js-LC71" class="blob-code blob-code-inner js-file-line">      alert(`I&#39;ve just hit the ${pathsNames[i]}`);</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-diamond-square-user-interaction-js-LC72" class="blob-code blob-code-inner js-file-line">      return;</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-diamond-square-user-interaction-js-LC73" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-diamond-square-user-interaction-js-LC74" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-diamond-square-user-interaction-js-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-diamond-square-user-interaction-js-LC75" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/bd49d529bebf356ea9ca14b9738da1ed/raw/4bb6540dc4dadced503d3cc57c9a0b55b9a4f1c0/diamond-square-user-interaction.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/bd49d529bebf356ea9ca14b9738da1ed#file-diamond-square-user-interaction-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          diamond-square-user-interaction.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>In the code above we can see 3 parts: 2 changed functions and one event listener.</p>



<p>Our <code>landscapeColors</code> function now also returns a terrain type.</p>



<p>Our <code>draw</code> function now creates paths (instances of <code>Path2D</code>) that will hold each terrain type in a path of its own. It then returns this paths object to its caller.</p>



<p>The event listener listens to user clicks on the canvas. It then checks for every terrain path if the click was on it or not. If it was, it raises an alert with the terrain type we clicked on.</p>



<p>Here&#8217;s the live demo:</p>



<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bGRbWKP" data-user="yonatankra" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/bGRbWKP" target="_blank" rel="noopener">
  Diamond Square Better Terrain</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<p>The example above can be used in order to create all sorts of interactions. For instance, you can use <a href="/how-to-write-a-simple-collision-detector-in-html5-canvas-and-javascript/" data-type="post" data-id="869" target="_blank" rel="noreferrer noopener">collision detection</a> between a player moving on the screen and the terrain. Maybe a user can&#8217;t move through mountains, or needs to purchase a boat to enter water terrain.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Procedural generators are awesome. I really enjoy using them. They can easily give you random imagery or data that has some &#8220;hidden&#8221; rule in it. Just like <a rel="noreferrer noopener" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/" data-type="post" data-id="833" target="_blank">maze generation with Cellular Automaton</a>, here we procedurally generated a terrain map that can be used in a game.</p>



<p>The algorithm to generate the matrix is pretty simple and the outcome is really up to how you implement your coloring function.</p>



<p>Using <code>Path2D</code> for user interaction and collision detection is also awesome. It makes the whole user interaction in a canvas so easy &#8211; just give me x and y coordinates, and I&#8217;ll let you know if it falls inside a path. You just have to generate your paths so they will fit your needs.</p>



<p>I hope you enjoyed this one! Would love to see if you can come up with cool maps, so feel free to fork the codepen and play around.</p>



<p>Thanks to <a rel="noreferrer noopener" href="https://dolevoper.io/" target="_blank">Omer Dolev</a> from Microsoft and <a rel="noreferrer noopener" href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank">Miki Ezra Stanger</a> for their very kind and helpful review.</p>



<p>Featured Photo by <a href="https://unsplash.com/@eiskonen?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Hans Eiskonen</a> on <a href="https://unsplash.com/s/photos/diamond-square?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></p>

