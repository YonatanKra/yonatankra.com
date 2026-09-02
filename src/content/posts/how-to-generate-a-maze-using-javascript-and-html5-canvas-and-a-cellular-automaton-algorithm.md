---
title: How to generate a maze using JavaScript and HTML5 canvas and a Cellular Automaton algorithm?
slug: how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm
published: 2021-07-31T09:01:29
updated: 2021-08-10T16:53:37
author: Yonatan Kra
description: Generating a random map on a canvas is fun. In this article you will learn how to generate a random map or maze on an HTML5 canvas. We will use a model called Cellular Automaton. While there are many ways to create a maze (or a map), what I’d like to create is a map [&hellip;]
categories:
  - name: Algorithms
    slug: algorithms
    path: coding/algorithms
  - name: Coding
    slug: coding
    path: coding
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - algorithms
  - html5
  - javascript
canonical: https://yonatankra.com/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/
comments:
  - author: Viren Mane
    date: 2022-06-15T02:44:08
    content: |
      <p>I would have liked it if you made an example of it and we can run it on the same page and write the code</p>
  - author: Yonatan Kra
    date: 2022-06-30T18:10:17
    content: |
      <p>Isn&#8217;t the <a href="https://codepen.io/yonatankra/pen/LYyQZdO" target="_blank" rel="noopener nofollow ugc">codepen</a> enough?</p>
---

<p class="has-medium-font-size">Generating a random map on a canvas is fun. In this article you will learn how to generate a random map or maze on an HTML5 canvas. We will use a model called Cellular Automaton.</p>



<p>While there are many ways to create a maze (or a map), what I&#8217;d like to create is a map that looks more like a cave or a chasms network rather than a human-built labyrinth. The following codepen shows a live demo of the working algorithm. Just hit &#8220;Step forward&#8221; to see the algorithm iterating until you get a nice looking cave maze.</p>



<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="LYyQZdO" data-user="yonatankra" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/LYyQZdO" target="_blank" rel="noopener">
  Cellular Automaton</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d15e46f" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d15e46f"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#What_is_the_Cellular_Automaton_algorithm" >What is the Cellular Automaton algorithm?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#How_to_implement_the_Cellular_Automaton_algorithm" >How to implement the Cellular Automaton algorithm?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#Generate_a_random_matrix" >Generate a random matrix</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#Calculate_value_according_to_neighbors" >Calculate value according to neighbors</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#Iterate_until_completion" >Iterate until completion</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#Draw_the_results" >Draw the results</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#The_full_working_code" >The full working code</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_the_Cellular_Automaton_algorithm"></span>What is the <meta charset="utf-8">Cellular Automaton algorithm?<span class="ez-toc-section-end"></span></h2>



<p>We will understand the algorithm by imagining our world as binary &#8211; either we are a wall or we are a path. The Cellular Automaton Algorithm works as follows:</p>



<ol class="wp-block-list"><li>Generate a random noise matrix of 0&#8217;s and 1&#8217;s (0 &#8211; walls, 1 &#8211; paths).</li><li>matrix -&gt; originalMatrix</li><li>For every cell:<ol><li>Calculate the number of paths and the number of walls directly around it (edge of canvas is calcaulted as a wall) in the original matrix.</li><li>Set the current cell&#8217;s value as the value of most of its direct neighbors.</li></ol></li><li>Repeat step 3 until satisfied.</li></ol>



<p>Let&#8217;s take a simple example of a matrix. The matrix in Figure 1 is a small 5&#215;5 matrix with randomly assigned values to its cells (pixels).</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="551" height="557" src="/wp-content/uploads/2021/07/Example-Matrix.png" alt="" class="wp-image-857" srcset="/wp-content/uploads/2021/07/Example-Matrix.png 551w, /wp-content/uploads/2021/07/Example-Matrix.png 297w, /wp-content/uploads/2021/07/Example-Matrix.png 89w" sizes="auto, (max-width: 551px) 100vw, 551px" /><figcaption>Figure 1: A random noise matrix</figcaption></figure></div>



<p>The next step in our algorithm would be to take every cell or pixel and calculate its value according to its neighbors.  </p>



<p>Let&#8217;s take the topmost left cell (coordinates 0,0). It is black, it has 3 white neighbors &#8211; (1,0), (1,0), (1,1) but 5 black neighbors (all out of bounds). This is why, in the next iteration it will be black.  </p>



<p>If we take the last cell (4,4), we will see it has only 2 white neighbors and 6 black (1 black neighbor and 5 out of bound neighbors) &#8211; so it will turn black in the next iteration.</p>



<p>Cell (2,1) is black, but it is surrounded by 7 white cells and will become white in the next iteration.</p>



<p>Figure 2 shows the results for steps 2,3 and 4.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="227" src="/wp-content/uploads/2021/07/steps2-3-4.png" alt="" class="wp-image-846" srcset="/wp-content/uploads/2021/07/steps2-3-4.png 1009w, /wp-content/uploads/2021/07/steps2-3-4.png 300w, /wp-content/uploads/2021/07/steps2-3-4.png 768w, /wp-content/uploads/2021/07/steps2-3-4.png 254w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 2: Steps 2,3 and 4 (left to right) for the matrix from Figure 1.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_implement_the_Cellular_Automaton_algorithm"></span>How to implement the Cellular Automaton algorithm?<span class="ez-toc-section-end"></span></h2>



<p>After we understand that the algorithm is all about counting neighbors, let&#8217;s get to work. </p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Generate_a_random_matrix"></span>Generate a random matrix<span class="ez-toc-section-end"></span></h3>



<p>Creating the random noise matrix is pretty easy:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111011098" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-generatewhitenoise-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="generateWhiteNoise.js content, created by YonatanKra on 06:49AM on July 31, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="generateWhiteNoise.js">
        <tr>
          <td id="file-generatewhitenoise-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-generatewhitenoise-js-LC1" class="blob-code blob-code-inner js-file-line">function generateWhiteNoise(size, whiteLevel = .5) {</td>
        </tr>
        <tr>
          <td id="file-generatewhitenoise-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-generatewhitenoise-js-LC2" class="blob-code blob-code-inner js-file-line">	return new Array(size).fill(0)</td>
        </tr>
        <tr>
          <td id="file-generatewhitenoise-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-generatewhitenoise-js-LC3" class="blob-code blob-code-inner js-file-line">		.map(() =&gt; Math.random() &gt;= whiteLevel ? BLACK : WHITE);</td>
        </tr>
        <tr>
          <td id="file-generatewhitenoise-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-generatewhitenoise-js-LC4" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/4e01a3b81ee6e6e462efdac0f2b08394/raw/4da0c99ca933c54f7639f12d718d022104543837/generateWhiteNoise.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/4e01a3b81ee6e6e462efdac0f2b08394#file-generatewhitenoise-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          generateWhiteNoise.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This function returns an array of given size filled with random values.  Using the `whiteLevel` argument, we can determine if the <code>white/block ratio</code> should be skewed towards one or the other. In our case, we assume we&#8217;d like total randomness.</p>



<p>Using the <code>generateWhiteNoise</code> function, we can generate our matrix like that:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111011107" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-createanoisematrix-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="createANoiseMatrix.js content, created by YonatanKra on 06:50AM on July 31, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="createANoiseMatrix.js">
        <tr>
          <td id="file-createanoisematrix-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-createanoisematrix-js-LC1" class="blob-code blob-code-inner js-file-line">const noise_matrix = new Array(MATRIX_DIMENSIONS.height).fill(0).map(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-createanoisematrix-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-createanoisematrix-js-LC2" class="blob-code blob-code-inner js-file-line">		return generateWhiteNoise(MATRIX_DIMENSIONS.width, WHITE_LEVEL);</td>
        </tr>
        <tr>
          <td id="file-createanoisematrix-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-createanoisematrix-js-LC3" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/1ef7a5b3bd3a3779894cc70ff8d7e75b/raw/23abb693a2d45ee312db6eecf875ec513be2cf92/createANoiseMatrix.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/1ef7a5b3bd3a3779894cc70ff8d7e75b#file-createanoisematrix-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          createANoiseMatrix.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>We create an array that is the size of the matrix height (e.g. rows). We then map each row to an array of white noise. Each cell represents a pixel of either 0 or 1.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Calculate_value_according_to_neighbors"></span>Calculate value according to neighbors<span class="ez-toc-section-end"></span></h3>



<p>Now that we have the preliminary matrix, we can handle it according to the Cellular Automaton algorithm:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111011119" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-cellularautomaton-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="cellularAutomaton.js content, created by YonatanKra on 06:52AM on July 31, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="cellularAutomaton.js">
        <tr>
          <td id="file-cellularautomaton-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-cellularautomaton-js-LC1" class="blob-code blob-code-inner js-file-line">function cellularAutomaton(matrix) {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-cellularautomaton-js-LC2" class="blob-code blob-code-inner js-file-line">  const tmpMatrix = copyMatrix(matrix);</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-cellularautomaton-js-LC3" class="blob-code blob-code-inner js-file-line">  tmpMatrix.forEach((row, rowIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-cellularautomaton-js-LC4" class="blob-code blob-code-inner js-file-line">    row.forEach((pixel, pixelIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-cellularautomaton-js-LC5" class="blob-code blob-code-inner js-file-line">      tmpMatrix[rowIndex][pixelIndex] = calculatePixelValueByNeighbors(rowIndex, pixelIndex, matrix);</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-cellularautomaton-js-LC6" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-cellularautomaton-js-LC7" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-cellularautomaton-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-cellularautomaton-js-LC9" class="blob-code blob-code-inner js-file-line">  return tmpMatrix;</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-cellularautomaton-js-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-cellularautomaton-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-cellularautomaton-js-LC12" class="blob-code blob-code-inner js-file-line">function calculatePixelValueByNeighbors(rowIndex, pixelIndex, matrix) {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-cellularautomaton-js-LC13" class="blob-code blob-code-inner js-file-line">	let sum = 0;</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-cellularautomaton-js-LC14" class="blob-code blob-code-inner js-file-line">	for (let y = -1; y &lt; 2; y++) {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-cellularautomaton-js-LC15" class="blob-code blob-code-inner js-file-line">		for (let x = -1; x &lt; 2; x++) {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-cellularautomaton-js-LC16" class="blob-code blob-code-inner js-file-line">			if (!matrix[rowIndex + y] || !matrix[rowIndex + y][pixelIndex + x]) {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-cellularautomaton-js-LC17" class="blob-code blob-code-inner js-file-line">				sum -= 1;</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-cellularautomaton-js-LC18" class="blob-code blob-code-inner js-file-line">			} else {</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-cellularautomaton-js-LC19" class="blob-code blob-code-inner js-file-line">				sum += 1;</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-cellularautomaton-js-LC20" class="blob-code blob-code-inner js-file-line">			}</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-cellularautomaton-js-LC21" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-cellularautomaton-js-LC22" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-cellularautomaton-js-LC23" class="blob-code blob-code-inner js-file-line">	return sum &gt; 0 ? WHITE : BLACK;</td>
        </tr>
        <tr>
          <td id="file-cellularautomaton-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-cellularautomaton-js-LC24" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/47507ae0b4e16a918bc2fc1752d9a9e8/raw/32968566f69f3c61546453c1e2af304acead4134/cellularAutomaton.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/47507ae0b4e16a918bc2fc1752d9a9e8#file-cellularautomaton-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          cellularAutomaton.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The function <code>cellulareAutomaton</code> receives a matrix as a n input. It then copies it (deep copy) into <code>tmpMatrix</code>. For every cell, it calculates the value according to its neighbors in the original <code>matrix</code> and updates the new one (<code>tmpMatrix</code>). It then returns the new matrix (thus keeping this function pure as a bonus).</p>



<p><code>calculatePixelValueByNeighbors</code> does exactly what we would expect: it runs over the neighbors of the cell in <code>(rowIndex, pixelIndex)</code> and if there are more whites than blacks sets its value to white and vice versa.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Iterate_until_completion"></span>Iterate until completion<span class="ez-toc-section-end"></span></h3>



<p>Now that we have the full algorithm parts, let&#8217;s put it all together:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111011138" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-createamaze-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="createAMaze.js content, created by YonatanKra on 06:54AM on July 31, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="createAMaze.js">
        <tr>
          <td id="file-createamaze-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-createamaze-js-LC1" class="blob-code blob-code-inner js-file-line">const matrices = {</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-createamaze-js-LC2" class="blob-code blob-code-inner js-file-line">  last: null,</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-createamaze-js-LC3" class="blob-code blob-code-inner js-file-line">  current: null</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-createamaze-js-LC4" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-createamaze-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-createamaze-js-LC6" class="blob-code blob-code-inner js-file-line">matrices.current = new Array(MATRIX_DIMENSIONS.height).fill(0)</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-createamaze-js-LC7" class="blob-code blob-code-inner js-file-line">			.map(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-createamaze-js-LC8" class="blob-code blob-code-inner js-file-line">				return generateWhiteNoise(MATRIX_DIMENSIONS.width, WHITE_LEVEL);</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-createamaze-js-LC9" class="blob-code blob-code-inner js-file-line">			});</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-createamaze-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-createamaze-js-LC11" class="blob-code blob-code-inner js-file-line">while (areMatricesDifferent(matrices.current, matrices.last) || someCounter &gt; someLimit) {</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-createamaze-js-LC12" class="blob-code blob-code-inner js-file-line">  matrices.last = matrices.current;</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-createamaze-js-LC13" class="blob-code blob-code-inner js-file-line">  matrices.current = cellularAutomaton(matrices.last);</td>
        </tr>
        <tr>
          <td id="file-createamaze-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-createamaze-js-LC14" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0840f38bb3a75c4f3aa5f225e61cb076/raw/abbea5edd8405eb9975dafd4ca7996a35f85878d/createAMaze.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0840f38bb3a75c4f3aa5f225e61cb076#file-createamaze-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          createAMaze.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The code above keeps two matrices: the one we are currently using and the last one used.  It generates the random noise matrix into the current. It then iterates until a convergence occurs. A convergence is a state in which the current matrix is the same as the last (note that &#8220;same&#8221; doesn&#8217;t necessarily mean identical &#8211; similarity can have an error margin but this comment is here just to pacify the nerds in the crowd).</p>



<p>Another thing to note is the limit using <code>someCounter</code> as it is unwise to create a while loop without a deterministic stop signal (and in some cases, Cellular Automatons can be infinite &#8211; don&#8217;t get me started on this&#8230;).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Draw_the_results"></span>Draw the results<span class="ez-toc-section-end"></span></h3>



<p>While drawing the results is not part of the algorithm, it would not be cool to just leave our matrix to the world of arrays and variables. Let&#8217;s write a short function that draws the matrix:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111011148" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-drawmaze-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="drawMaze.js content, created by YonatanKra on 06:55AM on July 31, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="drawMaze.js">
        <tr>
          <td id="file-drawmaze-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-drawmaze-js-LC1" class="blob-code blob-code-inner js-file-line">function draw(matrix) {</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-drawmaze-js-LC2" class="blob-code blob-code-inner js-file-line">	const ctx = canvas.getContext(&#39;2d&#39;);</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-drawmaze-js-LC3" class="blob-code blob-code-inner js-file-line">	ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-drawmaze-js-LC4" class="blob-code blob-code-inner js-file-line">	ctx.beginPath();</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-drawmaze-js-LC5" class="blob-code blob-code-inner js-file-line">	matrix.forEach((pixelsRow, rowIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-drawmaze-js-LC6" class="blob-code blob-code-inner js-file-line">		const y = rowIndex * PIXEL_RATIO;</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-drawmaze-js-LC7" class="blob-code blob-code-inner js-file-line">		pixelsRow.forEach((pixel, pixelIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-drawmaze-js-LC8" class="blob-code blob-code-inner js-file-line">			const x = pixelIndex * PIXEL_RATIO;</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-drawmaze-js-LC9" class="blob-code blob-code-inner js-file-line">			ctx.fillStyle = COLORS[pixel];</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-drawmaze-js-LC10" class="blob-code blob-code-inner js-file-line">			ctx.fillRect(x, y, PIXEL_RATIO, PIXEL_RATIO);</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-drawmaze-js-LC11" class="blob-code blob-code-inner js-file-line">		});</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-drawmaze-js-LC12" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-drawmaze-js-LC13" class="blob-code blob-code-inner js-file-line">	ctx.closePath();</td>
        </tr>
        <tr>
          <td id="file-drawmaze-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-drawmaze-js-LC14" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/30fa243701d3815f821067945f34a34d/raw/28c049546621e7b9f5f7824be53abf87e0977d76/drawMaze.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/30fa243701d3815f821067945f34a34d#file-drawmaze-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          drawMaze.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The <code>draw</code> function receives the matrix as an input. It then gets a handle to our canvas 2d context and clears what&#8217;s currently displayed on screen. It starts a new path and for every pixel, fills a rectangle in the color according to the pixel&#8217;s value.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_full_working_code"></span>The full working code<span class="ez-toc-section-end"></span></h3>



<p>You can find the full code of what we&#8217;ve built <a rel="noreferrer noopener" href="https://codepen.io/yonatankra/pen/qBmxRNr" data-type="URL" data-id="https://codepen.io/yonatankra/pen/qBmxRNr" target="_blank">here</a>.</p>



<p>You can also play around with a <code>cellular automaton stepper app</code> on <a href="https://codepen.io/yonatankra/pen/LYyQZdO" target="_blank" rel="noreferrer noopener">codepen</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>The Cellular Automaton algorithm is a handy tool when you want to create random maps, mazes or a Rorschach card.  Its implementation is pretty straight forward and we&#8217;ve added some fireworks to it (well&#8230; drawing on a canvas &#8211; which is the quiet version of fireworks 🙂 ).</p>



<p>The usage of this algorithm can vary &#8211; as you can add more than the binary state and thus try to create new wonderful worlds (like mountains, rivers, seas, deserts, plains etc.). This algorithm might be too simple to create a rich and real-feel world, but it can be a good starting point.</p>



<p>If this article got you excited, I suggest you read about the Game of Life, which is working according to similar principle to create amazing Cellular Automatons.</p>



<p>I hope you enjoyed this article.  I&#8217;d love to know if you found it useful or just plain fun to play with 🙂</p>



<p>Thanks a lot for <a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" data-type="URL" data-id="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noopener">Yuval Bar Levi</a> and <a rel="noreferrer noopener" href="https://www.linkedin.com/in/amir-lellouche/" target="_blank">Amir Lellouche </a>for their kind and thorough review.</p>

