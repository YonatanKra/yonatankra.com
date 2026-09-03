---
title: Simple Collision Detection with Path2D
slug: simple-collision-detection-with-path2d
published: 2021-09-27T17:57:34
updated: 2021-11-30T08:16:06
author: Yonatan Kra
description: How to create a simple and efficient collision detection between paths in your HTML5 Canvas app or game? In this article we will create a maze, allow a player to navigate through the maze and detect when the player collides with the walls. The End Goal Let’s build a simple game. The game will look [&hellip;]
categories:
  - name: canvas
    slug: canvas
    path: javascript/canvas
  - name: Gaming
    slug: gaming
    path: coding/gaming
tags:
  - canvas
  - collision detection
  - javascript
canonical: https://yonatankra.com/simple-collision-detection-with-path2d/
comments: []
featuredImage: /wp-content/uploads/2021/09/stars-collision.jpeg
---

<p class="has-medium-font-size">How to create a simple and efficient collision detection between paths in your HTML5 Canvas app or game? In this article we will create a maze, allow a player to navigate through the maze and detect when the player collides with the walls.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1bfedfbc" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1bfedfbc"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/simple-collision-detection-with-path2d/#The_End_Goal" >The End Goal</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/simple-collision-detection-with-path2d/#What_is_Path2D" >What is Path2D?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/simple-collision-detection-with-path2d/#Set_paths_for_collision" >Set paths for collision</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/simple-collision-detection-with-path2d/#Start_the_game" >Start the game</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/simple-collision-detection-with-path2d/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_End_Goal"></span>The End Goal<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s build a simple game. The game will look kind of like this:</p>



<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/SSMuu-F-OBo?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en-US&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<p>You can view the full code and play with it here: </p>



<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="VwWVOVR" data-user="yonatankra" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/VwWVOVR" target="_blank" rel="noopener">
  </a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_Path2D"></span>What is Path2D?<span class="ez-toc-section-end"></span></h2>



<p>Path2D is a lightweight class that allows a user to generate or duplicate 2 dimensional paths and easily draw them on a canvas 2D context.  Ok &#8211; so many phrases in one sentence.  Let&#8217;s try to break it down.</p>



<p>Essentially, when you create a <code>new Path2D()</code> you get a path. A path is a shape (can be a rectangle, a cirlce, an SVG path or a combination of them). So you could create whole drawings inside a <code>Path2D</code> instance. Let&#8217;s see an example. You can also combine a few <code>Path2D</code> instances by using the <code>addPath</code> method. </p>



<p>Eventually, once you have a path, you can just draw it on any canvas like this:</p>



<pre class="wp-block-code"><code>function draw(pathInstance) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
  ctx.fillStyle = COLORS&#091;BLACK];
  ctx.fill(<meta charset="utf-8">pathInstance);
}</code></pre>



<p>There&#8217;s a lot more to Path2D, which I might cover in a different article (if there&#8217;s a demand for it in the crowd 🙂 ). </p>



<p>In this article, we will use Path2D in order to create our background layer and see how we can detect collision between background and dynamic layers &#8211; on totally different canvases. More specifically, we&#8217;re going to use the useful <code>isPointInPath</code> method to see if our player hits a wall.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Set_paths_for_collision"></span>Set paths for collision<span class="ez-toc-section-end"></span></h2>



<p>The magic starts with the creation of the paths:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112040485" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-generatebackgroundpaths-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="generateBackgroundPaths.js content, created by YonatanKra on 03:28PM on September 27, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="generateBackgroundPaths.js">
        <tr>
          <td id="file-generatebackgroundpaths-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-generatebackgroundpaths-js-LC1" class="blob-code blob-code-inner js-file-line">function generateBackgroundPaths(matrix) {</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-generatebackgroundpaths-js-LC2" class="blob-code blob-code-inner js-file-line">  const wallsPath = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-generatebackgroundpaths-js-LC3" class="blob-code blob-code-inner js-file-line">  const roadsPath = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-generatebackgroundpaths-js-LC4" class="blob-code blob-code-inner js-file-line">  const mazePaths = {</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-generatebackgroundpaths-js-LC5" class="blob-code blob-code-inner js-file-line">    wallsPath,</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-generatebackgroundpaths-js-LC6" class="blob-code blob-code-inner js-file-line">    roadsPath,</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-generatebackgroundpaths-js-LC7" class="blob-code blob-code-inner js-file-line">  };</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-generatebackgroundpaths-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-generatebackgroundpaths-js-LC9" class="blob-code blob-code-inner js-file-line">  matrix.forEach((pixelsRow, rowIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-generatebackgroundpaths-js-LC10" class="blob-code blob-code-inner js-file-line">    const y = rowIndex * PIXEL_RATIO;</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-generatebackgroundpaths-js-LC11" class="blob-code blob-code-inner js-file-line">    pixelsRow.forEach((pixel, pixelIndex) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-generatebackgroundpaths-js-LC12" class="blob-code blob-code-inner js-file-line">      const x = pixelIndex * PIXEL_RATIO;</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-generatebackgroundpaths-js-LC13" class="blob-code blob-code-inner js-file-line">      const currPath = pixel === BLACK ? roadsPath : wallsPath;</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-generatebackgroundpaths-js-LC14" class="blob-code blob-code-inner js-file-line">      currPath.rect(x, y, PIXEL_RATIO, PIXEL_RATIO);</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-generatebackgroundpaths-js-LC15" class="blob-code blob-code-inner js-file-line">    });</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-generatebackgroundpaths-js-LC16" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-generatebackgroundpaths-js-LC17" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-generatebackgroundpaths-js-LC18" class="blob-code blob-code-inner js-file-line">  return mazePaths;</td>
        </tr>
        <tr>
          <td id="file-generatebackgroundpaths-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-generatebackgroundpaths-js-LC19" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/cca327e6c30b12982fb27a96b97013f8/raw/8f572a0e4211661779cd9eaf27926fd90b902988/generateBackgroundPaths.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/cca327e6c30b12982fb27a96b97013f8#file-generatebackgroundpaths-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          generateBackgroundPaths.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The function <code>generateBackgroundPaths</code> takes a matrix that represents a maze (created with <a href="/how-to-generate-a-maze-using-javascript-and-html5-canvas-and-a-cellular-automaton-algorithm/" data-type="post" data-id="833">the Cellular Automaton algorithm described here</a>). It then creates two Path2D objects. The first is the walls and the second is the road (or wall free).</p>



<p>Now that we have the paths, we can actually draw them using the <code>drawBackground</code> function that accepts the walls and road paths and just adds them to the background canvas.</p>



<p>The function <code>generateBackground</code> (that uses the <code>generateBackgroundPaths</code> and <code>drawBackground</code>) are shown here:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112053876" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-generatebackground-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="generateBackground.js content, created by YonatanKra on 08:42AM on September 28, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="generateBackground.js">
        <tr>
          <td id="file-generatebackground-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-generatebackground-js-LC1" class="blob-code blob-code-inner js-file-line">function drawBackground(mazePaths) {</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-generatebackground-js-LC2" class="blob-code blob-code-inner js-file-line">  const ctx = canvas.getContext(&quot;2d&quot;);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-generatebackground-js-LC3" class="blob-code blob-code-inner js-file-line">  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-generatebackground-js-LC4" class="blob-code blob-code-inner js-file-line">  ctx.fillStyle = COLORS[BLACK];</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-generatebackground-js-LC5" class="blob-code blob-code-inner js-file-line">  ctx.fill(mazePaths.roadsPath);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-generatebackground-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-generatebackground-js-LC7" class="blob-code blob-code-inner js-file-line">  ctx.fillStyle = COLORS[WHITE];</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-generatebackground-js-LC8" class="blob-code blob-code-inner js-file-line">  ctx.fill(mazePaths.wallsPath);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-generatebackground-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-generatebackground-js-LC10" class="blob-code blob-code-inner js-file-line">  return mazePaths;</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-generatebackground-js-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-generatebackground-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-generatebackground-js-LC13" class="blob-code blob-code-inner js-file-line">function generateBackground() {</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-generatebackground-js-LC14" class="blob-code blob-code-inner js-file-line">  const matrices = {</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-generatebackground-js-LC15" class="blob-code blob-code-inner js-file-line">    last: null,</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-generatebackground-js-LC16" class="blob-code blob-code-inner js-file-line">    current: null,</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-generatebackground-js-LC17" class="blob-code blob-code-inner js-file-line">  };</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-generatebackground-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-generatebackground-js-LC19" class="blob-code blob-code-inner js-file-line">  matrices.current = new Array(MATRIX_DIMENSIONS.height)</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-generatebackground-js-LC20" class="blob-code blob-code-inner js-file-line">    .fill(0)</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-generatebackground-js-LC21" class="blob-code blob-code-inner js-file-line">    .map(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-generatebackground-js-LC22" class="blob-code blob-code-inner js-file-line">    return generateWhiteNoise(MATRIX_DIMENSIONS.width, WHITE_LEVEL);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-generatebackground-js-LC23" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-generatebackground-js-LC24" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-generatebackground-js-LC25" class="blob-code blob-code-inner js-file-line">  let count = 0;</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-generatebackground-js-LC26" class="blob-code blob-code-inner js-file-line">  const ITERATIONS_LIMIT = 100;</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-generatebackground-js-LC27" class="blob-code blob-code-inner js-file-line">  while (</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-generatebackground-js-LC28" class="blob-code blob-code-inner js-file-line">    areMatricesDifferent(matrices.current, matrices.last) ||</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-generatebackground-js-LC29" class="blob-code blob-code-inner js-file-line">    count &gt; ITERATIONS_LIMIT</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-generatebackground-js-LC30" class="blob-code blob-code-inner js-file-line">  ) {</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-generatebackground-js-LC31" class="blob-code blob-code-inner js-file-line">    matrices.last = matrices.current;</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-generatebackground-js-LC32" class="blob-code blob-code-inner js-file-line">    matrices.current = cellularAutomaton(matrices.last);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-generatebackground-js-LC33" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-generatebackground-js-LC34" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-generatebackground-js-LC35" class="blob-code blob-code-inner js-file-line">  const backgroundPaths = generateBackgroundPaths(matrices.current);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-generatebackground-js-LC36" class="blob-code blob-code-inner js-file-line">  return drawBackground(backgroundPaths);</td>
        </tr>
        <tr>
          <td id="file-generatebackground-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-generatebackground-js-LC37" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3a3b6c2862d3302cd4c626ccbe3c3feb/raw/19a2ae8bed2c2097fa0a6c88f9cd0c48c2fb55c3/generateBackground.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3a3b6c2862d3302cd4c626ccbe3c3feb#file-generatebackground-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          generateBackground.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Start_the_game"></span>Start the game<span class="ez-toc-section-end"></span></h2>



<p>The function <code>start</code> starts the game. Because the background is static, we just leave it as it is.  What&#8217;s changing is the player&#8217;s position.</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112040597" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-start-game-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="start-game.js content, created by YonatanKra on 03:35PM on September 27, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="start-game.js">
        <tr>
          <td id="file-start-game-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-start-game-js-LC1" class="blob-code blob-code-inner js-file-line">function start(canvas, radius = 10) {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-start-game-js-LC2" class="blob-code blob-code-inner js-file-line">  const mazesPaths = generateBackground();</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-start-game-js-LC3" class="blob-code blob-code-inner js-file-line">  const { x, y } = findAStartingPoint(mazesPaths.wallsPath, radius);</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-start-game-js-LC4" class="blob-code blob-code-inner js-file-line">  renderPlayer(canvas, {currX: x, currY: y, playerRadius: radius}, mazesPaths.wallsPath);</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-start-game-js-LC5" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-start-game-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-start-game-js-LC7" class="blob-code blob-code-inner js-file-line">function renderPlayer(canvas, {currX, currY, playerRadius}, wallsPath) {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-start-game-js-LC8" class="blob-code blob-code-inner js-file-line">  let radius = playerRadius, x = currX, y = currY;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-start-game-js-LC9" class="blob-code blob-code-inner js-file-line">  if (spaceClicked) {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-start-game-js-LC10" class="blob-code blob-code-inner js-file-line">    radius = 2;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-start-game-js-LC11" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-start-game-js-LC12" class="blob-code blob-code-inner js-file-line">  const ctx = canvas.getContext(&quot;2d&quot;);</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-start-game-js-LC13" class="blob-code blob-code-inner js-file-line">  if (clickedKey) {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-start-game-js-LC14" class="blob-code blob-code-inner js-file-line">    if (clickedKey.includes(&#39;Down&#39;) || clickedKey.includes(&#39;Up&#39;)) {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-start-game-js-LC15" class="blob-code blob-code-inner js-file-line">      y = currY + KEYBOARD_KEYS[clickedKey] * PIXEL_RATIO / 2;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-start-game-js-LC16" class="blob-code blob-code-inner js-file-line">    } else {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-start-game-js-LC17" class="blob-code blob-code-inner js-file-line">      x = currX + KEYBOARD_KEYS[clickedKey] * PIXEL_RATIO / 2;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-start-game-js-LC18" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-start-game-js-LC19" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-start-game-js-LC20" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-start-game-js-LC21" class="blob-code blob-code-inner js-file-line">  if (y - radius &lt; 0 || y + radius &gt;= CANVAS_HEIGHT || x - radius &lt; 0 || x + radius &gt;= CANVAS_WIDTH || isCircleInPath({radius, x, y}, wallsPath)) {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-start-game-js-LC22" class="blob-code blob-code-inner js-file-line">    x = currX;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-start-game-js-LC23" class="blob-code blob-code-inner js-file-line">    y = currY;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-start-game-js-LC24" class="blob-code blob-code-inner js-file-line">  } else {</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-start-game-js-LC25" class="blob-code blob-code-inner js-file-line">    const playerPath = new Path2D();</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-start-game-js-LC26" class="blob-code blob-code-inner js-file-line">    playerPath.arc(x, y, radius, 0, 2 * Math.PI);</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-start-game-js-LC27" class="blob-code blob-code-inner js-file-line">    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-start-game-js-LC28" class="blob-code blob-code-inner js-file-line">    ctx.fillStyle = &quot;blue&quot;;</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-start-game-js-LC29" class="blob-code blob-code-inner js-file-line">    ctx.fill(playerPath);</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-start-game-js-LC30" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-start-game-js-LC31" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-start-game-js-LC32" class="blob-code blob-code-inner js-file-line">  requestAnimationFrame(() =&gt; renderPlayer(canvas, {currX: x, currY: y, playerRadius}, wallsPath));</td>
        </tr>
        <tr>
          <td id="file-start-game-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-start-game-js-LC33" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2326bfa030bc1937862e0499fd966a58/raw/d4ee4685f48f523cd7b953cdcc9d42e6f1dd9ed0/start-game.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2326bfa030bc1937862e0499fd966a58#file-start-game-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          start-game.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>Start uses <meta charset="utf-8"><code>generateBackground</code> in order to generate a background and get the walls and roads paths.  It then uses some function that helps to find a wall-less spot as a starting point to the player.  It finally calls <code>renderPlayer</code>. </p>



<p><code>renderPlayer</code> responds to use keyboard presses for motion (lines 9-11 respond to spacebar press and lines 13-19 to arrows). It accepts the former <code>x,y</code> coordinates and changes them according to the keys pressed. If no key pressed, the coordinates just remain the same. </p>



<p>The collision detection happens on line 21.  We first check if the movement didn&#8217;t take us out of the canvas bounds:</p>



<p class="has-text-align-center"><code>y - radius &lt; 0 || y + radius &gt;= CANVAS_HEIGHT || x - radius &lt; 0 || x + radius &gt;= CANVAS_WIDTH</code></p>



<p>Which is a kind of wall.</p>



<p>We also call the function <code>isCircleInPath</code> which accepts a radius, the coordinates and the walls path. This function compares the player&#8217;s path (a circle with a given radius and the center in <code>x,y</code> coordinates) with the walls path:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112040811" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-iscircleinpath-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="isCircleInPath.js content, created by YonatanKra on 03:46PM on September 27, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="isCircleInPath.js">
        <tr>
          <td id="file-iscircleinpath-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-iscircleinpath-js-LC1" class="blob-code blob-code-inner js-file-line">function isCircleInPath(circleData, path) {</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-iscircleinpath-js-LC2" class="blob-code blob-code-inner js-file-line">  const ctx = document.createElement(&quot;canvas&quot;).getContext(&quot;2d&quot;);</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-iscircleinpath-js-LC3" class="blob-code blob-code-inner js-file-line">  const radius = circleData.radius;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-iscircleinpath-js-LC4" class="blob-code blob-code-inner js-file-line">  for (</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-iscircleinpath-js-LC5" class="blob-code blob-code-inner js-file-line">    let x = circleData.x - radius;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-iscircleinpath-js-LC6" class="blob-code blob-code-inner js-file-line">    x &lt;= circleData.x + 2 * radius;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-iscircleinpath-js-LC7" class="blob-code blob-code-inner js-file-line">    x += radius</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-iscircleinpath-js-LC8" class="blob-code blob-code-inner js-file-line">  ) {</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-iscircleinpath-js-LC9" class="blob-code blob-code-inner js-file-line">    for (</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-iscircleinpath-js-LC10" class="blob-code blob-code-inner js-file-line">      let y = circleData.y - radius;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-iscircleinpath-js-LC11" class="blob-code blob-code-inner js-file-line">      y &lt;= circleData.y + 2 * radius;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-iscircleinpath-js-LC12" class="blob-code blob-code-inner js-file-line">      y += radius</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-iscircleinpath-js-LC13" class="blob-code blob-code-inner js-file-line">    ) {</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-iscircleinpath-js-LC14" class="blob-code blob-code-inner js-file-line">      if (ctx.isPointInPath(path, x, y)) return true;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-iscircleinpath-js-LC15" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-iscircleinpath-js-LC16" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-iscircleinpath-js-LC17" class="blob-code blob-code-inner js-file-line">  return false;</td>
        </tr>
        <tr>
          <td id="file-iscircleinpath-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-iscircleinpath-js-LC18" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6b3e85c685fc5e717c066bbe2bfcf7e0/raw/e3cda80cd3ef09667197639dd8ada8e4d9de9f08/isCircleInPath.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6b3e85c685fc5e717c066bbe2bfcf7e0#file-iscircleinpath-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          isCircleInPath.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This function is a bit tricky. What we do here is check 4 points on the circle in the possible motion direction (we can move only up/down/left/right &#8211; hence the fancy loop) and use the native <code>isPointInPath</code> method on the context to see if one of the points on the circle is inside the wall&#8217;s path (line 14).</p>



<p>Back in <code>renderPlayer</code>, if we had a collision (either with the wall or the canvas borders), we just change the <code>x</code> and <code>y</code> values to what they were before.  This results in no movement (e.g. we hit a wall&#8230; we can&#8217;t move through it).  If there was no collision, we just render the player in its new position (lines 26-29).</p>



<p>The render player calls itself recursively using <code>requestAnimationFrame</code>, so on every frame, if a user clicked, we will see a motion on screen.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Path2D is an awesome addition to the Canvas toolkit.  Here we demonstrated how we can create a simple collision detection mechanism that is quite efficient using Path2D. There are many more things you can do with Path2D&#8230; <a rel="noreferrer noopener" href="https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D" data-type="URL" data-id="https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D" target="_blank">You can check it out its documentation and play around with it</a>.</p>



<p>Thanks to&nbsp;<a rel="noreferrer noopener" href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank">Miki Ezra Stanger</a>&nbsp;for the very kind and helpful review.</p>



<p>Featured <em>Image by <a href="https://pixabay.com/users/nasa-imagery-10/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=971" target="_blank" rel="noopener">NASA-Imagery</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=971" target="_blank" rel="noopener">Pixabay</a></em></p>

