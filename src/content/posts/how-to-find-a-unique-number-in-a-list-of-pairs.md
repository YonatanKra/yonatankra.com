---
title: How to find a unique number in a list containing pairs?
slug: how-to-find-a-unique-number-in-a-list-of-pairs
published: 2021-10-03T13:43:01
updated: 2021-10-07T16:04:58
author: Yonatan Kra
description: "Finding a single unique number in a list containing pairs might sound pretty simple, right? Because a one-sentence description might be misleading, let’s start with an example of an input array: [1,3,17,3,1] Given such an array, the unique number is the one that appears only once (17). The rest of the numbers (1 and 3) [&hellip;]"
categories:
  - name: Algorithms
    slug: algorithms
    path: coding/algorithms
  - name: Interview Questions
    slug: interview-questions
    path: coding/interview-questions
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - javascript
  - performance
canonical: https://yonatankra.com/how-to-find-a-unique-number-in-a-list-of-pairs/
comments:
  - author: David
    date: 2021-10-03T14:50:10
    content: |
      <p>What do you mean by &#8220;list of pairs&#8221;? </p>
      <p>You start with the example: [1,3,17,3,1]</p>
      <p>I would have expected a list of pairs such as: ((1 3) (17 3) (1 137))</p>
      <p>That is, a list containing pairs (an even number of elements).</p>
  - author: Yonatan Kra
    date: 2021-10-06T15:28:46
    content: |
      <p>Hi,<br />
      Sorry for not being clear enough for you, but I hope the example makes it clear.<br />
      Do you believe `a list containing pairs` is clearer?</p>
  - author: zhu
    date: 2021-11-05T15:35:52
    content: |
      <p>I get another functions to solve it with a linear time<br />
      def FindUniqueNumber(nums):<br />
          res = 0<br />
          memo = {}<br />
          for i in nums:<br />
              if not memo .get(str(i)):<br />
                  memo [str(i)] = 1<br />
                  res +=i<br />
              else:<br />
                  res -=i<br />
          return res</p>
---

<p class="has-medium-font-size">Finding a single unique number in a list containing pairs might sound pretty simple, right? </p>



<p class="has-normal-font-size">Because a one-sentence description might be misleading, let&#8217;s start with an example of an input array:</p>



<p class="has-text-align-center"><meta charset="utf-8"><code>[1,3,17,3,1]</code></p>



<p>Given such an array, the unique number is the one that appears only once (17). The rest of the numbers (1 and 3) will appear twice. For the sake of this exercise, we can assume this is always true.</p>



<p class="has-normal-font-size">Performance wise, there are 3 main ways to do that. O(n*n), O(n) time and O(n) space and, with a little bitwise trick, O(n) time and O(1) space. After reading this article, you&#8217;ll know all three.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1be0ac8a" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1be0ac8a"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-find-a-unique-number-in-a-list-of-pairs/#The_Naive_Solution" >The Naive Solution</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-find-a-unique-number-in-a-list-of-pairs/#How_to_solve_finding_unique_value_in_a_list_containing_pairs_in_linear_time" >How to solve finding unique value in a list containing pairs in linear time?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-find-a-unique-number-in-a-list-of-pairs/#How_to_Use_Bitwise_XOR_to_find_a_unique_value_in_a_list_containing_pairs_in_linear_time" >How to Use Bitwise XOR to find a unique value in a list containing pairs in linear time?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-find-a-unique-number-in-a-list-of-pairs/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Naive_Solution"></span>The Naive Solution<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s find the unique number in <code>[1,3,17,3,1]</code>.  Easy peasy:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112156359" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-find-unique-naive-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="find-unique-naive.js content, created by YonatanKra on 07:11AM on October 03, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="find-unique-naive.js">
        <tr>
          <td id="file-find-unique-naive-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-find-unique-naive-js-LC1" class="blob-code blob-code-inner js-file-line">function singleNumber(nums) {</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-find-unique-naive-js-LC2" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; nums.length; i++) {</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-find-unique-naive-js-LC3" class="blob-code blob-code-inner js-file-line">        let found = false;</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-find-unique-naive-js-LC4" class="blob-code blob-code-inner js-file-line">        for (let j = 0; j &lt; nums.length; j++) {</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-find-unique-naive-js-LC5" class="blob-code blob-code-inner js-file-line">            if (nums[j] === nums[i] &amp;&amp; i != j) {</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-find-unique-naive-js-LC6" class="blob-code blob-code-inner js-file-line">                found = true;</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-find-unique-naive-js-LC7" class="blob-code blob-code-inner js-file-line">                break;</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-find-unique-naive-js-LC8" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-find-unique-naive-js-LC9" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-find-unique-naive-js-LC10" class="blob-code blob-code-inner js-file-line">        if (!found) return nums[i];</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-find-unique-naive-js-LC11" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-find-unique-naive-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-find-unique-naive-js-LC12" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/d7e62748dc52a66826fe53e3d9aa0600/raw/2b3c5c810978fe02c2c2b6f9b926716de182b2ff/find-unique-naive.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/d7e62748dc52a66826fe53e3d9aa0600#file-find-unique-naive-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          find-unique-naive.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>This solution goes over all the numbers and verifies they are not duplicate. Worst case, we go over the list once for every member in the list.  That means, O(n*n). </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_solve_finding_unique_value_in_a_list_containing_pairs_in_linear_time"></span>How to solve finding unique value in a list containing pairs in linear time?<span class="ez-toc-section-end"></span></h2>



<p>When writing a solution to a problem, we&#8217;d usually like to solve it linearly. The solution would be to use a <code>hash</code> or a <code>memo</code> object to remember what numbers appeared more than once:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112155985" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-linear-find-unique-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="linear-find-unique.js content, created by YonatanKra on 06:04AM on October 03, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="linear-find-unique.js">
        <tr>
          <td id="file-linear-find-unique-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-linear-find-unique-js-LC1" class="blob-code blob-code-inner js-file-line">function findUniqueNumber(nums) {</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-linear-find-unique-js-LC2" class="blob-code blob-code-inner js-file-line">    let memo = {};</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-linear-find-unique-js-LC3" class="blob-code blob-code-inner js-file-line">    for (let i = 0; i &lt; nums.length; i++) {</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-linear-find-unique-js-LC4" class="blob-code blob-code-inner js-file-line">        const num = nums[i];</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-linear-find-unique-js-LC5" class="blob-code blob-code-inner js-file-line">        if (!memo[num]) {</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-linear-find-unique-js-LC6" class="blob-code blob-code-inner js-file-line">            memo[num] = 1;</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-linear-find-unique-js-LC7" class="blob-code blob-code-inner js-file-line">        } else {</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-linear-find-unique-js-LC8" class="blob-code blob-code-inner js-file-line">            memo[num] += 1;</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-linear-find-unique-js-LC9" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-linear-find-unique-js-LC10" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-linear-find-unique-js-LC11" class="blob-code blob-code-inner js-file-line">    return Object.keys(memo).reduce((unique,num) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-linear-find-unique-js-LC12" class="blob-code blob-code-inner js-file-line">        return memo[num] === 1 ? Number(num) : unique;</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-linear-find-unique-js-LC13" class="blob-code blob-code-inner js-file-line">    }, NaN);</td>
        </tr>
        <tr>
          <td id="file-linear-find-unique-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-linear-find-unique-js-LC14" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/10670b467ac695247a56c863c820ed39/raw/20b8c612f13fbc79b9b65973db2daf6373768943/linear-find-unique.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/10670b467ac695247a56c863c820ed39#file-linear-find-unique-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          linear-find-unique.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<p>The <code>memo</code> object on line 2 will be our memory of what numbers we saw more than once.  Then we iterate over our <code>nums</code> array. If the number appears for the first time, we initialize a memory hash for this number with the value of 1. That means, it appeared once.  If we stumble upon this number again, we raise the counter by 1 for this number.</p>



<p>In lines 11-13 we go over our hash table and extract the value that appeared only once.</p>



<p>This code works linearly (<code>O(n)</code>), because we don&#8217;t have a nested loop. On the other hand, we are now using the <code>memo</code> object which is using <code>O(n/2)</code> space (which is actually <code>O(n)</code>). Can we make it better?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Use_Bitwise_XOR_to_find_a_unique_value_in_a_list_containing_pairs_in_linear_time"></span>How to Use Bitwise XOR to find a <meta charset="utf-8">unique value in a list containing pairs in linear time? <span class="ez-toc-section-end"></span></h2>



<p>I&#8217;ve written in the past about <a href="/bitwise-operators-565e3ceb90cd/" data-type="post" data-id="42">the merits of bitwise operators</a>. Here&#8217;s a trick that I hope will help you remember the bitwise XOR (<code>^</code>) operator.</p>



<p>Bitwise XOR has two steps:</p>



<ol class="wp-block-list"><li>Turn the numbers into a 32-bit signed binary number.</li><li>Return a new number with the following rules: if both bits are 1 or 0, return 0. Otherwise &#8211; return 1.</li></ol>



<p>Here&#8217;s an example: <code>4 ^ 5</code></p>



<p>4 in binary is <code>100</code> while 5 is <code>101</code>. Turning them into 32 bits will just pad them in zeros to the left.</p>



<p>Eventually, we will need to XOR these two binary numbers: <code>100</code> and <code>101</code>. </p>



<p>Going from left to write we have: </p>



<p><code>1</code> and <code>1</code> =&gt; <code>0</code></p>



<p><code>0</code> and <code>0</code> =&gt; <code>0</code></p>



<p><code>0</code> and <code>1</code> =&gt; 1</p>



<p>So the final result will be: <code>001</code> which is <code>1</code>. You can try it in the console right now.</p>



<p>The trick is this &#8211; XORing the same number (e.g. <code>4 ^ 4</code>) will always result in <code>0</code>.  So if we have an array containing pairs, doing the following will result in zero: </p>



<p class="has-text-align-center"><code>[1,2,3,4,5,6,7,1000000,1,2,3,4,5,6,7,1000000].reduce((val, num) =&gt; val ^ num)</code></p>



<p>If we had one unique number in the list&#8230; you see where it&#8217;s going? Try this in the console:</p>



<p class="has-text-align-center"><meta charset="utf-8"><code>[1,2,3,4,5,6,7,1000000,8,1,2,3,4,5,6,7,1000000].reduce((val, num) =&gt; val ^ num)</code></p>



<p>Because similar pairs cancel each other, having one unique value will &#8220;stand out&#8221; when XORing all of the numbers.  And for bitwise XOR the order of the elements doesn&#8217;t matter. If we have an odd amount of 1&#8217;s, the resulting bit will be 1. Otherwise it will be 0.</p>



<p>And now we have a one line linear time solution for our problem with an O(1) space complexity:</p>



<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist112156500" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-find-unique-number-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="find-unique-number.js content, created by YonatanKra on 07:33AM on October 03, 2021."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="find-unique-number.js">
        <tr>
          <td id="file-find-unique-number-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-find-unique-number-js-LC1" class="blob-code blob-code-inner js-file-line">function findUniqueNumber(nums) {</td>
        </tr>
        <tr>
          <td id="file-find-unique-number-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-find-unique-number-js-LC2" class="blob-code blob-code-inner js-file-line">  return nums.reduce((val, num) =&gt; val ^ num); </td>
        </tr>
        <tr>
          <td id="file-find-unique-number-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-find-unique-number-js-LC3" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/47d86d26afe1968d7dd02a30287fb3b3/raw/6571e217273e41a586e959cea978db33c9cdffe2/find-unique-number.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/47d86d26afe1968d7dd02a30287fb3b3#file-find-unique-number-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          find-unique-number.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>




<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Finding a unique value in a list containing pairs is a small problem that is mostly used in interviews.  It&#8217;s not very interesting unto itself.</p>



<p>In this article, we saw two ways to solve it in linear time. I hope that it also tricked you to know what bitwise XOR is :). Note that this trick is good to separate odd and even. If we had more than pairs, this would not have worked&#8230;</p>



<p>If you want to know more ways of how Bitwise operations can be good for performance, I&#8217;ve written about it <a href="https://medium.com/walkme-engineering/bitwise-operators-and-runtime-4f4a118fa775" data-type="URL" data-id="https://medium.com/walkme-engineering/bitwise-operators-and-runtime-4f4a118fa775" target="_blank" rel="noopener">here</a> and <a href="/bitwise-operators-565e3ceb90cd/" data-type="post" data-id="42">here</a>.</p>



<p>Thanks a lot to <a href="https://www.linkedin.com/in/tweinfeld/" data-type="URL" data-id="https://www.linkedin.com/in/tweinfeld/" target="_blank" rel="noreferrer noopener">Tal Weinfeld</a> for the kind review.</p>

