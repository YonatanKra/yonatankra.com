---
title: "Deep dive into an interview question: Array Nesting"
slug: deep-dive-into-an-interview-question-array-nesting
published: 2021-09-02T22:33:41
updated: 2021-12-09T23:12:17
author: Yonatan Kra
description: The Array Nesting interview question might seem complex at first and very simple after you solve it. But sometimes, a deeper dive into it can expose some more performance optimizations that can be interesting. After this article, you’ll be able to amaze your interviewers with some new insights they didn’t think of! What is the [&hellip;]
categories:
  - name: Algorithms
    slug: algorithms
    path: coding/algorithms
  - name: Interview Questions
    slug: interview-questions
    path: coding/interview-questions
  - name: Performance
    slug: performance
    path: performance
tags:
  - algorithms
  - javascript
  - performance
canonical: https://yonatankra.com/deep-dive-into-an-interview-question-array-nesting/
comments: []
---

<p class="has-medium-font-size">The Array Nesting interview question might seem complex at first and very simple after you solve it.  But sometimes, a deeper dive into it can expose some more performance optimizations that can be interesting. After this article, you&#8217;ll be able to amaze your interviewers with some new insights they didn&#8217;t think of!</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1c615a20" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1c615a20"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/deep-dive-into-an-interview-question-array-nesting/#What_is_the_Array_Nesting_problem" >What is the Array Nesting problem?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/deep-dive-into-an-interview-question-array-nesting/#Example_of_a_Array_Nesting" >Example of a Array Nesting</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/deep-dive-into-an-interview-question-array-nesting/#How_to_solve_the_Array_Nesting_problem_in_an_interview" >How to solve the Array Nesting problem in an interview?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/deep-dive-into-an-interview-question-array-nesting/#Brute_Force" >Brute Force</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/deep-dive-into-an-interview-question-array-nesting/#Optimize_for_time" >Optimize for time</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/deep-dive-into-an-interview-question-array-nesting/#Benchmarking" >Benchmarking</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/deep-dive-into-an-interview-question-array-nesting/#Can_we_optimize_more" >Can we optimize more?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/deep-dive-into-an-interview-question-array-nesting/#Optimize_for_time_and_space" >Optimize for time and space</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/deep-dive-into-an-interview-question-array-nesting/#Is_there_anything_else" >Is there anything else?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/deep-dive-into-an-interview-question-array-nesting/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_the_Array_Nesting_problem"></span>What is the Array Nesting problem?<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s get into the problem itself.  </p>



<p>Your input is an array <code>arr</code> of integers of length n.  The integers themselves are some scrambling of the indices.  So building the input might look like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111577856" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-scramblearray-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="scrambleArray.js content, created by YonatanKra on 07:05AM on September 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="scrambleArray.js">
        <tr>
          <td id="file-scramblearray-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-scramblearray-js-LC1" class="blob-code blob-code-inner js-file-line">function scrambleArray(arr) {</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-scramblearray-js-LC2" class="blob-code blob-code-inner js-file-line">  const tmpArray = Array.from(arr);</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-scramblearray-js-LC3" class="blob-code blob-code-inner js-file-line">  const scrambledArray = new Array(arr.length).fill(1);</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-scramblearray-js-LC4" class="blob-code blob-code-inner js-file-line">  let index = 0;</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-scramblearray-js-LC5" class="blob-code blob-code-inner js-file-line">  while (tmpArray.length) {</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-scramblearray-js-LC6" class="blob-code blob-code-inner js-file-line">    const randomIndex = Math.floor(Math.random() * (tmpArray.length &#8211; 1));</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-scramblearray-js-LC7" class="blob-code blob-code-inner js-file-line">    scrambledArray[index++] = tmpArray.splice(randomIndex, 1)[0];</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-scramblearray-js-LC8" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-scramblearray-js-LC9" class="blob-code blob-code-inner js-file-line">  return scrambledArray;</td>
        </tr>
        <tr>
          <td id="file-scramblearray-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-scramblearray-js-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/370daff83af96b4621997fcbd423cfb9/raw/c5b522f98759a0b522863fa2c9147d2e523ae35a/scrambleArray.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/370daff83af96b4621997fcbd423cfb9#file-scramblearray-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          scrambleArray.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>For every member of the scrambled array, you should calculate a series that looks like this:</p>



<p class="has-text-align-center"><code>s[k] = [arr[k], arr[arr[k]], arr[arr[arr[k]], ...]</code></p>



<p>The stop rule is when you get to a number that you already visited, and do not include it.</p>



<p>Eventually, you should return the longest series in <code>s</code>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Example_of_a_Array_Nesting"></span>Example of a Array Nesting<span class="ez-toc-section-end"></span></h3>



<p>Let&#8217;s take the following input: <code>[6, 5, 7, 8, 0, 4, 3, 2, 1, 9]</code>.</p>



<p>The series that are created from this array are:</p>



<pre class="wp-block-code"><code>  &#91;3, 8, 1, 5, 4, 0, 6],
  &#91;4, 0, 6, 3, 8, 1, 5],
  &#91;2, 7],
  &#91;1, 5, 4, 0, 6, 3, 8],
  &#91;6, 3, 8, 1, 5, 4, 0],
  &#91;0, 6, 3, 8, 1, 5, 4],
  &#91;8, 1, 5, 4, 0, 6, 3],
  &#91;7, 2],
  &#91;5, 4, 0, 6, 3, 8, 1],
  &#91;9]</code></pre>



<p>From here it&#8217;s easy to see the longest series&#8217; length is 7.</p>



<p>If you&#8217;ve never solved the Array Nesting problem, I suggest you solve the the problem first because solution spoilers are ahead.  It can be found on <a rel="noreferrer noopener" href="https://leetcode.com/problems/array-nesting/" target="_blank">leetcode</a>. </p>



<p>If you&#8217;re more interested in the juicy part, just read on.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_solve_the_Array_Nesting_problem_in_an_interview"></span>How to solve the Array Nesting problem in an interview?<span class="ez-toc-section-end"></span></h2>



<p>When solving a problem in an interview, you&#8217;d usually follow this pattern:</p>



<ol class="wp-block-list"><li>Solve a brute force solution</li><li>Optimize your solution</li></ol>



<p>Let&#8217;s follow this pattern.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Brute_Force"></span>Brute Force<span class="ez-toc-section-end"></span></h3>



<p>The algorithm for our solution is pretty straight forward:</p>



<pre class="wp-block-code"><code>function getNestedArraysMaxLength(inputArray) {
	let maxLength = -Infinity;

	inputArray.forEach(value =&gt; {
		const seriesLength = findSeriesLength(inputArray, value);
		maxLength = Math.max(seriesLength, maxLength);
	});

	return maxLength;
}</code></pre>



<p>We do exactly as we&#8217;ve been asked. For every member in <code>inputArray</code> we get its <code>seriesLength</code> and keep the maximum length found.  We eventually return the maximum length as requested.</p>



<p>Now we just need to implement <code>findSeriesLength</code>:</p>



<pre class="wp-block-code"><code>function findSeriesLength(arr, nextValue) {
	const series = {&#91;nextValue]: true};

	while (true) {
		nextValue = arr&#91;nextValue];
		if (series&#91;nextValue]) {
			return Object.keys(series).length;
		}
		series&#91;nextValue] = true;
	}
}</code></pre>



<p>This is the more complex bit of the algorithm.  It gets the array and the next value (which is the first value in the series).  The series always includes the first number, so we set it up in the series. We then fill the series until we get to the same number again. Once we do that, we return the length of the series.</p>



<p>The complexity of the Brute Force solution is O(n*n) (O n squared). That&#8217;s because we could, in the worse case, run on all the numbers in the original array and for each, run on them again when we compose the series.  Usually, in interviews, we can do better.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Optimize_for_time"></span>Optimize for time<span class="ez-toc-section-end"></span></h3>



<p>When we look at the example shown above, we can detect a pattern:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="469" height="607" src="/wp-content/uploads/2021/09/cyclic_behavior-1.jpeg" alt="" class="wp-image-1040" srcset="/wp-content/uploads/2021/09/cyclic_behavior-1.jpeg 469w, /wp-content/uploads/2021/09/cyclic_behavior-1.jpeg 232w, /wp-content/uploads/2021/09/cyclic_behavior-1.jpeg 70w" sizes="auto, (max-width: 469px) 100vw, 469px" /><figcaption><strong>Figure 1</strong>: The pattern in the numbers. This illustration demonstrates the cyclic nature of our series.  The first one starts from three and goes all the way to 6 (white arrows).  The next one starts from 6, then 3 and goes the same way to 0 after which always comes 6 (blue arrow) and so on.</figcaption></figure></div>



<p>Figure 1 illustrates the cyclic nature of the series.  The series are just cycles of the same numbers. We can use that in order to optimize our algorithm.  Let&#8217;s add a memory array to keep counts of values we&#8217;ve been to before:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111579684" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-getnestedarraysmaxlength-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="getNestedArraysMaxLength.js content, created by YonatanKra on 08:57AM on September 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="getNestedArraysMaxLength.js">
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-getnestedarraysmaxlength-js-LC1" class="blob-code blob-code-inner js-file-line">function getNestedArraysMaxLength(inputArray) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-getnestedarraysmaxlength-js-LC2" class="blob-code blob-code-inner js-file-line">	let maxLength = -Infinity;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-getnestedarraysmaxlength-js-LC3" class="blob-code blob-code-inner js-file-line">	const memory = [];</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-getnestedarraysmaxlength-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-getnestedarraysmaxlength-js-LC5" class="blob-code blob-code-inner js-file-line">	inputArray.forEach(value =&gt; {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-getnestedarraysmaxlength-js-LC6" class="blob-code blob-code-inner js-file-line">		memory[value] = findSeriesLength(inputArray, value, memory);</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-getnestedarraysmaxlength-js-LC7" class="blob-code blob-code-inner js-file-line">		maxLength = Math.max(maxLength, memory[value]);</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-getnestedarraysmaxlength-js-LC8" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-getnestedarraysmaxlength-js-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-getnestedarraysmaxlength-js-LC10" class="blob-code blob-code-inner js-file-line">	return maxLength;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-getnestedarraysmaxlength-js-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-getnestedarraysmaxlength-js-LC12" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-getnestedarraysmaxlength-js-LC13" class="blob-code blob-code-inner js-file-line">function findSeriesLength(arr, nextValue, memory) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-getnestedarraysmaxlength-js-LC14" class="blob-code blob-code-inner js-file-line">	const series = {[nextValue]: true};</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-getnestedarraysmaxlength-js-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-getnestedarraysmaxlength-js-LC16" class="blob-code blob-code-inner js-file-line">	while (true) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-getnestedarraysmaxlength-js-LC17" class="blob-code blob-code-inner js-file-line">		nextValue = arr[nextValue];</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-getnestedarraysmaxlength-js-LC18" class="blob-code blob-code-inner js-file-line">		if (memory[nextValue]) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-getnestedarraysmaxlength-js-LC19" class="blob-code blob-code-inner js-file-line">			return memory[nextValue];</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-getnestedarraysmaxlength-js-LC20" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-getnestedarraysmaxlength-js-LC21" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-getnestedarraysmaxlength-js-LC22" class="blob-code blob-code-inner js-file-line">		if (series[nextValue]) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-getnestedarraysmaxlength-js-LC23" class="blob-code blob-code-inner js-file-line">			return Object.keys(series).length;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-getnestedarraysmaxlength-js-LC24" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-getnestedarraysmaxlength-js-LC25" class="blob-code blob-code-inner js-file-line">		series[nextValue] = true;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-getnestedarraysmaxlength-js-LC26" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-getnestedarraysmaxlength-js-LC27" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/84c6236ded2cf8fb384e485aa354d68f/raw/d311f3578971ab09d566a6bceba8ed469196b945/getNestedArraysMaxLength.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/84c6236ded2cf8fb384e485aa354d68f#file-getnestedarraysmaxlength-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          getNestedArraysMaxLength.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Let&#8217;s list the difference:</p>



<p>Line 3 defines the memory array.</p>



<p>Line 6 adds the count to the memory array instead of keeping it in a variable. We&#8217;re now using this value in line 7 instead of the <code>seriesLength</code> variable.</p>



<p><code>findSeriesLength</code> now uses the memory it receives as input in order to check if we already have the count for a certain value (lines 18 to 20).</p>



<p>Let&#8217;s look at the complexity (big O) of this solution. We still go over the <code>n</code> values in the <code>inputArray</code>.  But for each cycle as illustrated in figure 1, we will go only once. Our time complexity is now O(n) (linear) because the only place we go over <code>n</code> elements is in the main <code>forEach</code> loop. Our space complexity is now O(n) because we are now using the auxiliary <code>memory</code> array.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Benchmarking"></span>Benchmarking<span class="ez-toc-section-end"></span></h3>



<p>Let&#8217;s see the difference between the optimized and non optimized algorithms. We will use the website <a rel="noreferrer noopener" href="http://jsben.ch" data-type="URL" data-id="jsben.ch" target="_blank">jsben.ch</a> for our performance benchmarking. Our benchmarking will start with n = 10 (yes, I know it&#8217;s small, but bear with me please).</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="177" src="/wp-content/uploads/2021/09/image.png" alt="" class="wp-image-1041" srcset="/wp-content/uploads/2021/09/image.png 1024w, /wp-content/uploads/2021/09/image.png 300w, /wp-content/uploads/2021/09/image.png 768w, /wp-content/uploads/2021/09/image.png 1536w, /wp-content/uploads/2021/09/image.png 268w, /wp-content/uploads/2021/09/image.png 1738w, /wp-content/uploads/2021/09/image.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 2</strong>: The results of running the two solutions a lot of times.  You can see that the solution using the memo for cycles was around 15% better.</figcaption></figure></div>



<p>Figure 2 (you can see the live benchmark here: <a href="https://jsben.ch/nH9tS" target="_blank" rel="noreferrer noopener">https://jsben.ch/GQld2</a>) shows that the optimization worked.  Although&#8230; we&#8217;d expect a much better improvement, no? We improved our complexity by a lot!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Can_we_optimize_more"></span><meta charset="utf-8">Can we optimize more?<span class="ez-toc-section-end"></span></h2>



<p>There are several ways to optimize our algorithm. For starters, let&#8217;s see what happens when we use a counter instead of the <code>series</code> array inside the <code>findSeriesLength</code> function. We will change the function to be like this:</p>



<pre class="wp-block-code"><code>function findSeriesLength(arr, nextValue) {
	const startingNumber = nextValue;
	let count = 1;

	while (true) {
		nextValue = arr&#91;nextValue];

		if (startingNumber === nextValue) {
			return count;
		}
		count++;
	}
}</code></pre>



<p>In the code above, instead of creating the series, which is not needed for our task (we need only return the length), we remember the first value (<code>startingNumber</code>) and create a counter.</p>



<p>The benchmark for this function is shown in Figure 3 (live version <a href="https://jsben.ch/anTQO" data-type="URL" data-id="https://jsben.ch/anTQO" target="_blank" rel="noreferrer noopener">here</a>).</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="236" src="/wp-content/uploads/2021/09/image-1.png" alt="" class="wp-image-1042" srcset="/wp-content/uploads/2021/09/image-1.png 1024w, /wp-content/uploads/2021/09/image-1.png 300w, /wp-content/uploads/2021/09/image-1.png 768w, /wp-content/uploads/2021/09/image-1.png 1536w, /wp-content/uploads/2021/09/image-1.png 244w, /wp-content/uploads/2021/09/image-1.png 1686w, /wp-content/uploads/2021/09/image-1.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure </strong>3: Results of benchmarking Brute Force with the counter (Brute Force less GC) against the Brute Force and the optimized algorithm (Use Memo for Cycles).  This resulted in a huge garbage collection reduction which made the brute force O(n*n) even more efficient than the O(n) algorithm.</figcaption></figure></div>



<p>What would the same optimization do to the complexity optimization? The results shown in Figure 4 might surprise you.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="309" src="/wp-content/uploads/2021/09/image-2.png" alt="" class="wp-image-1043" srcset="/wp-content/uploads/2021/09/image-2.png 1024w, /wp-content/uploads/2021/09/image-2.png 300w, /wp-content/uploads/2021/09/image-2.png 768w, /wp-content/uploads/2021/09/image-2.png 1536w, /wp-content/uploads/2021/09/image-2.png 186w, /wp-content/uploads/2021/09/image-2.png 1716w, /wp-content/uploads/2021/09/image-2.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 4</strong>: Results of the O(n) vs O(n*n) with the optimized <code><meta charset="utf-8">findSeriesLength</code> function. Oh and behold &#8211; the O(n) algorithm is running slower than the Brute Force!!! <a href="https://jsben.ch/tzxEh" data-type="URL" data-id="https://jsben.ch/tzxEh" target="_blank" rel="noreferrer noopener">Live code</a></figcaption></figure></div>



<p>What&#8217;s going on here? Can a brute force O(n*n) algorithm run faster than an O(n) algorithm?</p>



<p>Garbage Collection (GC in short) is a major factor in JavaScript performance. If a function creates and destroys a lot of objects/arrays, it will incur a price: memory allocation and garbage collection. The JS engine has to allocate memory for your Objects and Arrays. The JS engines also clears discarded objects and arrays (the garbage collection). These processes take time. At scale &#8211; it takes even longer.</p>



<p>In addition, the O(n) algorithm, as shown here, is not giving the benefits we&#8217;d expect from a much more efficient algorithgm. That&#8217;s because we have a very low <code>n</code>. If we increase <code>n</code> to 1000, we will see a different picture.  Figure 5 shows the results for <code>n = 1000</code>.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="295" src="/wp-content/uploads/2021/09/image-3.png" alt="" class="wp-image-1044" srcset="/wp-content/uploads/2021/09/image-3.png 1024w, /wp-content/uploads/2021/09/image-3.png 300w, /wp-content/uploads/2021/09/image-3.png 768w, /wp-content/uploads/2021/09/image-3.png 1536w, /wp-content/uploads/2021/09/image-3.png 195w, /wp-content/uploads/2021/09/image-3.png 1672w, /wp-content/uploads/2021/09/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 5</strong>: The same code, but this time the input array is of length 1000. Watch the live demo here: <a href="https://jsben.ch/1EWkg" target="_blank" rel="noreferrer noopener">https://jsben.ch/1EWkg</a></figcaption></figure></div>



<p>So we learn 2 things here: </p>



<ol class="wp-block-list"><li>Complexity improvements are good for bigger <code>n</code>&#8216;s.</li><li>GC can be a major bottleneck in your JavaScript code.</li></ol>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Optimize_for_time_and_space"></span>Optimize for time and space<span class="ez-toc-section-end"></span></h3>



<p>We can also improve the time complexity without increasing the space complexity and completely avoid the GC overhead.</p>



<p>Instead of creating the memory array, we can just set the marker inside our array:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist111585408" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-getnestedarraysmaxlength-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="getNestedArraysMaxLength.js content, created by YonatanKra on 02:48PM on September 02, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="getNestedArraysMaxLength.js">
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-getnestedarraysmaxlength-js-LC1" class="blob-code blob-code-inner js-file-line">function getNestedArraysMaxLength(inputArray) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-getnestedarraysmaxlength-js-LC2" class="blob-code blob-code-inner js-file-line">	let maxLength = -Infinity;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-getnestedarraysmaxlength-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-getnestedarraysmaxlength-js-LC4" class="blob-code blob-code-inner js-file-line">	inputArray.forEach((value, index) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-getnestedarraysmaxlength-js-LC5" class="blob-code blob-code-inner js-file-line">		const seriesLength = findSeriesLength(inputArray, index);</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-getnestedarraysmaxlength-js-LC6" class="blob-code blob-code-inner js-file-line">		maxLength = Math.max(maxLength, seriesLength);</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-getnestedarraysmaxlength-js-LC7" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-getnestedarraysmaxlength-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-getnestedarraysmaxlength-js-LC9" class="blob-code blob-code-inner js-file-line">	return maxLength;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-getnestedarraysmaxlength-js-LC10" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-getnestedarraysmaxlength-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-getnestedarraysmaxlength-js-LC12" class="blob-code blob-code-inner js-file-line">function findSeriesLength(arr, nextIndex) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-getnestedarraysmaxlength-js-LC13" class="blob-code blob-code-inner js-file-line">	let count = 0;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-getnestedarraysmaxlength-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-getnestedarraysmaxlength-js-LC15" class="blob-code blob-code-inner js-file-line">	while (true) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-getnestedarraysmaxlength-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-getnestedarraysmaxlength-js-LC17" class="blob-code blob-code-inner js-file-line">		let nextValue = arr[nextIndex];</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-getnestedarraysmaxlength-js-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-getnestedarraysmaxlength-js-LC19" class="blob-code blob-code-inner js-file-line">		if (nextValue === null) {</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-getnestedarraysmaxlength-js-LC20" class="blob-code blob-code-inner js-file-line">			return count;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-getnestedarraysmaxlength-js-LC21" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-getnestedarraysmaxlength-js-LC22" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-getnestedarraysmaxlength-js-LC23" class="blob-code blob-code-inner js-file-line">		arr[nextIndex] = null;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-getnestedarraysmaxlength-js-LC24" class="blob-code blob-code-inner js-file-line">		nextIndex = nextValue;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-getnestedarraysmaxlength-js-LC25" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-getnestedarraysmaxlength-js-LC26" class="blob-code blob-code-inner js-file-line">		count++;</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-getnestedarraysmaxlength-js-LC27" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-getnestedarraysmaxlength-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-getnestedarraysmaxlength-js-LC28" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/523dd8421aa1d7d8a72da41588da9c21/raw/4b5974f49d21866e6a2775fefcc36c21b39b90f1/getNestedArraysMaxLength.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/523dd8421aa1d7d8a72da41588da9c21#file-getnestedarraysmaxlength-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          getNestedArraysMaxLength.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Note that we removed any mention of <code>memory</code>. The trick here is to set every value we already pass as null (or some other known value).  Then, every time we stumble upon <code>null</code> we know we&#8217;ve already checked this cycle, and there&#8217;s no need to go farther.</p>



<p>The results in Figure 6 are quite decisive. Using O(n) time and improving to O(1) in space also resulted in better performance. We already know the reason for that &#8211; memory allocation and garbage collection. When we do not allocate the <code>memory</code> array, we actually reduce the amount of memory allocated and thus reduce the amount of GC cycles.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="370" src="/wp-content/uploads/2021/09/image-4.png" alt="" class="wp-image-1045" srcset="/wp-content/uploads/2021/09/image-4.png 1024w, /wp-content/uploads/2021/09/image-4.png 300w, /wp-content/uploads/2021/09/image-4.png 768w, /wp-content/uploads/2021/09/image-4.png 1536w, /wp-content/uploads/2021/09/image-4.png 156w, /wp-content/uploads/2021/09/image-4.png 365w, /wp-content/uploads/2021/09/image-4.png 1658w, /wp-content/uploads/2021/09/image-4.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 6</strong>: Comparing all algorithms so far to the improvement of O(n) time and O(1) in space. See the live tests here: <a href="https://jsben.ch/zRThi" target="_blank" rel="noreferrer noopener">https://jsben.ch/zRThi</a><a rel="noreferrer noopener" href="https://jsben.ch/jeHed" target="_blank"> </a></figcaption></figure></div>



<p>In order to prove our hypothesis, we can easily remove the GC from the O(n) space solution.  By changing the line <code>const memory = [];</code> to <code>const memory = new Array(inputArray.length).fill(1);</code> we will preallocate the memory before the function starts and thus have a lot less GC cycles and memory allocation requests.  See the results in Figure 7.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="231" src="/wp-content/uploads/2021/09/image-5.png" alt="" class="wp-image-1046" srcset="/wp-content/uploads/2021/09/image-5.png 1024w, /wp-content/uploads/2021/09/image-5.png 300w, /wp-content/uploads/2021/09/image-5.png 768w, /wp-content/uploads/2021/09/image-5.png 1536w, /wp-content/uploads/2021/09/image-5.png 249w, /wp-content/uploads/2021/09/image-5.png 1682w, /wp-content/uploads/2021/09/image-5.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 7: </strong>Results for the O(n) optimizations &#8211; dynamically allocating <code>memory</code> (bottom) takes significantly longer time to run than preallocated <code>memory</code> (middle). Preallocated <code>memory</code> takes about the same amount of time to run as the fully optimized code. Live code here: <a href="https://jsben.ch/Gllfr" target="_blank" rel="noreferrer noopener">https://jsben.ch/Gllfr</a></figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Is_there_anything_else"></span>Is there anything else?<span class="ez-toc-section-end"></span></h2>



<p>Of course! But from now on, it&#8217;s probably going to be micro optimization that depends on the browser you are using or the JS engine you are using.  For instance, if we change the <code>forEach</code> with a <code>for</code> loop, we&#8217;ll see the following improevement:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="167" src="/wp-content/uploads/2021/09/image-6.png" alt="" class="wp-image-1047" srcset="/wp-content/uploads/2021/09/image-6.png 1024w, /wp-content/uploads/2021/09/image-6.png 300w, /wp-content/uploads/2021/09/image-6.png 768w, /wp-content/uploads/2021/09/image-6.png 1536w, /wp-content/uploads/2021/09/image-6.png 268w, /wp-content/uploads/2021/09/image-6.png 1670w, /wp-content/uploads/2021/09/image-6.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 8</strong>: Results of micro optimization &#8211; replacing the <code>forEach</code> with a <code>for</code> loop.  We see a small increase in performance. This might vary with browser and JS engine. See the live code here: <a href="https://jsben.ch/CRdBH" target="_blank" rel="noopener">https://jsben.ch/CRdBH</a></figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>The Array Nesting task is a relatively simple interview problem.  Its brute force solution is quite straight forward and its optimizations are simple: either save a memory of old results (memoization) or use a flag on the data itself.</p>



<p>We also saw that the way we handle the data can affect the solution&#8217;s speed. Memory allocation and Garbage Collection have a high impact on your code&#8217;s performance.</p>



<p>Finally, we saw that some optimizations that achieved popularity due to their &#8220;fun fact&#8221; and rather notorious nature (like replacing the forEach) are less likely to give you better performance.</p>



<p>For our task &#8211; retrieving the longest series &#8211; our data handling was optimized as we did. We either kept a counter or we pre allocated the <code>memory</code> array.</p>



<p>I hope that now, if asked this question in an interview, you&#8217;ll be able to woo your interviewer with deep explanations about memory allocation and garbage collection, after you finish explaining the obvious big O complexity.  </p>



<p>You can read more about <a href="/memory-allocation-and-garbage-collection-in-javascript/" data-type="post" data-id="185">memory allocation and garbage collection</a> and how to detect and solve them in your code.</p>



<p>If you didn&#8217;t so far, you can try to rest a while and then try to solve the challenge on <meta charset="utf-8"><a rel="noreferrer noopener" href="https://leetcode.com/problems/array-nesting/" target="_blank">leetcode</a>.</p>



<p>Thanks to&nbsp;<a rel="noreferrer noopener" href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank">Miki Ezra Stanger</a>&nbsp;for the very kind and helpful review.</p>



<p>Featured Photo by <a href="https://unsplash.com/@martysouthwell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Marty Southwell</a> on <a href="https://unsplash.com/s/photos/nest?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></p>

