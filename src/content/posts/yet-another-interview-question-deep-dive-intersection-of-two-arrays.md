---
title: "Yet another interview question deep dive: Intersection of Two Arrays"
slug: yet-another-interview-question-deep-dive-intersection-of-two-arrays
published: 2021-10-06T15:08:00
updated: 2021-10-06T15:08:00
author: Yonatan Kra
description: Can we learn something practical from a pure computer science interview question? In this article we will solve an interview question and optimize it – but we will also look at a practical way to handle data in real life. The problem of finding intersecting numbers between two arrays is simple. Assuming an input of [&hellip;]
categories:
  - name: Algorithms
    slug: algorithms
    path: coding/algorithms
  - name: Interview Questions
    slug: interview-questions
    path: coding/interview-questions
  - name: nodejs
    slug: nodejs
    path: javascript/nodejs
tags:
  - nodejs
  - performance
  - streams
canonical: https://yonatankra.com/yet-another-interview-question-deep-dive-intersection-of-two-arrays/
comments:
  - author: Miki
    date: 2021-10-06T15:21:43
    content: |
      <p>There&#8217;s one more optimization you can do here:<br />
      In the optimized solution, instead of creating a new array in each iteration (as is done with &#8220;intersection = [&#8230;intersection, &#8230;newValues]&#8221;), you could just push numbers into the original array, then return it.<br />
      By using a single array instead of creating n or m different ones, you should see a significant performance improvement &#8211; especially when working with very large datasets.</p>
      <p>Another one, which I&#8217;m not sure about, is to use an array with predefined number of cells, instead of just an empty one: nums1.reduce(() =&gt; { &#8230; }, new Array(Math.max(m, n)).<br />
      This should allow the engine to allocate adjacent bytes for the result, and thus require less movement/search over memory. I&#8217;m not sure how much of an improvement it&#8217;ll translate to in most cases though.</p>
  - author: Yonatan Kra
    date: 2021-10-07T16:02:27
    content: |
      <p>You are correct. I&#8217;m a big fan of <a href="/?s=pre+allocation" rel="noopener" target="_blank">pre allocation</a> for performance boosts.<br />
      Didn&#8217;t want to delve too much into it, but if it is of interest to anyone, here is a link to articles in which I speak about it and how to measure its implications: <a href="/?s=pre+allocation" rel="noopener" target="_blank">https://yonatankra.com/?s=pre+allocation</a>.</p>
featuredImage: /wp-content/uploads/2021/10/intersections.jpeg
---

<p class="has-medium-font-size">Can we learn something practical from a pure computer science interview question? In this article we will solve an interview question and optimize it &#8211; but we will also look at a practical way to handle data in real life.</p>



<p>The problem of finding intersecting numbers between two arrays is simple. Assuming an input of two number arrays, return an array that is composed of numbers they have in common.  A number might appear more than once. If it appears twice in each array, the resulting array will have two instances of the same number. </p>



<p>Let&#8217;s look at an example:</p>



<p class="has-text-align-center"><code>nums1 = [1, 3, 5, 1, 7, 9, 3]</code></p>



<p class="has-text-align-center"><code>nums2 = [2, 1, 9, 7, 1, 3]</code></p>



<p>The intersection between them is:</p>



<p class="has-text-align-center"><code>[1, 1, 9, 7, 3]</code></p>



<p>We have two instances of <code>1</code>, once instance of <code>7</code> and one instance of <code>9</code>. <code>3</code> appears only once in the result despite appearing twice in <code>nums1</code>, because <code>nums2</code> has only one instance of <code>3</code>.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1bc8048a" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1bc8048a"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#Naive_Solution" >Naïve Solution</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#Optimized_Solution" >Optimized Solution</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#Small_Numbers_Solution" >Small Numbers Solution</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#Very_Big_num2_Array" >Very Big num2 Array</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#How_to_stream_a_file_in_Nodejs" >How to stream a file in Nodejs?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#How_to_use_Streams_to_complete_our_task" >How to use Streams to complete our task?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/yet-another-interview-question-deep-dive-intersection-of-two-arrays/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Naive_Solution"></span>Naïve Solution<span class="ez-toc-section-end"></span></h2>



<p>As usual when tackling a new problem, we try to solve it as naively as possible.  We will iterate over the first array and for each number in the first array we will search for a similar number in the second array. If we find one, we will push it in the new array we intend to return. We will also take it out of the second array, so we won&#8217;t count it twice&#8230;</p>



<p>It will look something like this:</p>



<pre class="wp-block-code"><code>
function naiveIntersection(nums1: number&#91;], nums2: number&#91;]): number&#91;] {
    // iterate over nums1
    return nums1.reduce((intersection, valueInNums1) => { 
        // search for the current value in nums2 
        const index = nums2.indexOf(valueInNums1); 
        // if we found one
        if (index > -1) { 
            // push the number to the intersection array
            intersection.push(valueInNums1); 
            // get the number out of nums2
            nums2.splice(index, 1); 
        }
        return intersection;
    }, &#91;]);
};</code></pre>



<p>The complexity is O(n*m), <code>n</code> being the length of one array and <code>m</code> the length of the second array. That&#8217;s because we have a nested loop (<code>reduce</code> and <code>indexOf</code> are iterating over the data set).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Optimized_Solution"></span>Optimized Solution<span class="ez-toc-section-end"></span></h2>



<p>You&#8217;d might say &#8211; let iterate over the longer array first and then the loop that repeats itself will run more efficiently.  Well&#8230; that&#8217;s still O(n*m), so we won&#8217;t get much benefit from this strategy.</p>



<p>We can get an O(n+m) complexity by using a different approach. If we iterate over <code>nums1</code> once, and keep a counter for each number in a hash table (hash table &#8211; fancy name for an object), we would be able to create the intersection array with one sweep over <code>nums2</code>. One loop for <code>nums1</code> and another for <code>nums2</code> &#8211; no nested loops, better complexity, right?</p>



<p>Here&#8217;s an implementation for this one:</p>



<pre class="wp-block-code"><code>function optimizedIntersection(nums1: number&#91;], nums2: number&#91;]): number&#91;] {
    // create the frequency map in one sweep of nums1
    const nums1Counter = nums1.reduce((counterMap, value) =&gt; {
        counterMap.set(value, counterMap.get(value) ? counterMap.get(value) + 1 : 1);
        return counterMap;
    }, new Map());

    // create the new array in one sweep of nums2
    return nums2.reduce((intersection, val) =&gt; {
        if (nums1Counter.get(val)) {
            intersection.push(val);
            nums1Counter.set(val, nums1Counter.get(val) - 1);
        }
        return intersection;
    }, &#91;]);
}</code></pre>



<p>This simple solution is more efficient by far when it comes to longer arrays. How long? When tested on <code>nums1.length =&gt; 10</code> and <code>nums2.length =&gt; 1000</code> the difference was that the optimized solution ran ~75% faster (figure 1). </p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="174" src="/wp-content/uploads/2021/10/image.png" alt="" class="wp-image-1160" srcset="/wp-content/uploads/2021/10/image.png 1024w, /wp-content/uploads/2021/10/image.png 300w, /wp-content/uploads/2021/10/image.png 768w, /wp-content/uploads/2021/10/image.png 268w, /wp-content/uploads/2021/10/image.png 1406w, /wp-content/uploads/2021/10/image.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 1: Performance benchmark of the optimized solution vs the naive solution. Source code is <meta charset="utf-8"><a rel="noreferrer noopener" href="https://jsben.ch/4AJc0" data-type="URL" data-id="https://jsben.ch/4AJc0" target="_blank">here</a>.</figcaption></figure></div>



<p>You can play with the performance benchmark <a href="https://jsben.ch/4AJc0" data-type="URL" data-id="https://jsben.ch/4AJc0" target="_blank" rel="noreferrer noopener">here</a> (change the sizes of the arrays for instance).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Small_Numbers_Solution"></span>Small Numbers Solution<span class="ez-toc-section-end"></span></h2>



<p>We could optimize more if we know certain things about our data.  For instance, if we knew one of our datasets is small or if we knew we had lots of repeating numbers (e.g. the count maps would be much smaller than the lengths of the arrays) we could do something like this:</p>



<pre class="wp-block-code"><code>function frequencyMap(nums: number&#91;]) {
    const map = new Map&lt;number, number&gt;();
    for (const num of nums) {
        map.set(num, map.has(num) ? map.get(num) + 1 : 1);
    }
    return map;
}

function intersect(nums1: number&#91;], nums2: number&#91;]): number&#91;] {
    const nums1CounterMap = frequencyMap(nums1);
    const nums2CounterMap = frequencyMap(nums2);
    
    let intersection = &#91;];
    
    for (const &#91;num, count] of nums1CounterMap.entries()) {
        if (nums2CounterMap.has(num)) {
            const commonCount = Math.min(count, nums2CounterMap.get(num));
            intersection = &#91;...intersection, ...new Array(commonCount).fill(num)];
        }
    }
    
    return intersection;
};</code></pre>



<p>The magic here happens in the loop that iterates over <code>nums1CounterMap.entries()</code>. If <code>nums2CounterMap</code> also has this number, we find how many times it repeats and just add a whole array of repeating numbers in one go into the intersection array.</p>



<p>This way, if we have a lot of repeats or one of our arrays is small, we get much better results because there are much less iterations while building the array.</p>



<p>Note that we still go over the data O(m+n), so we didn&#8217;t improve the complexity &#8211; we just used a trick for characteristics of specific possible data.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="243" src="/wp-content/uploads/2021/10/image-1.png" alt="" class="wp-image-1161" srcset="/wp-content/uploads/2021/10/image-1.png 1024w, /wp-content/uploads/2021/10/image-1.png 300w, /wp-content/uploads/2021/10/image-1.png 768w, /wp-content/uploads/2021/10/image-1.png 237w, /wp-content/uploads/2021/10/image-1.png 1406w, /wp-content/uploads/2021/10/image-1.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 2: Running the test for nums1 with 100 members and nums2 with 1000 members.</figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="248" src="/wp-content/uploads/2021/10/image-2.png" alt="" class="wp-image-1162" srcset="/wp-content/uploads/2021/10/image-2.png 1024w, /wp-content/uploads/2021/10/image-2.png 300w, /wp-content/uploads/2021/10/image-2.png 768w, /wp-content/uploads/2021/10/image-2.png 233w, /wp-content/uploads/2021/10/image-2.png 1408w, /wp-content/uploads/2021/10/image-2.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 3: Running the test for nums1 with 10 members and nums2 with 1000 members</figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="243" src="/wp-content/uploads/2021/10/image-3.png" alt="" class="wp-image-1167" srcset="/wp-content/uploads/2021/10/image-3.png 1024w, /wp-content/uploads/2021/10/image-3.png 300w, /wp-content/uploads/2021/10/image-3.png 768w, /wp-content/uploads/2021/10/image-3.png 237w, /wp-content/uploads/2021/10/image-3.png 1416w, /wp-content/uploads/2021/10/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 4: Running the test for nums1 and nums2 both with 100,000 members</figcaption></figure></div>



<p>Figures 2, 3 and 4 visualize the differences when optimizing for certain data characteristics. You can see that changing the data&#8217;s characteristics changes how better the different algorithms play. Eventually for bigger numbers, optimized solution and small numbers are roughly the same. You can play with the numbers <a rel="noreferrer noopener" href="https://jsben.ch/efVJW" data-type="URL" data-id="https://jsben.ch/efVJW" target="_blank">here</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Very_Big_num2_Array"></span>Very Big <code>num2</code> Array<span class="ez-toc-section-end"></span></h2>



<p>Another variation of this problem might be the following: what happens if <code>nums2</code> is being fetched from a file on disk that is too big for memory?</p>



<p>One fun fact is that JavaScript is limited (by default) to 2 GB.  You can play with it with certain flags, but it highly not recommended to load big data sets into memory in most cases.</p>



<p>What can we do then? We load <code>nums2</code> in chunks and test each chunk vs. <code>nums1</code>.</p>



<p>That means 2 things:</p>



<ol class="wp-block-list"><li>We cannot use the <code>Small Numbers</code> solution because in this solution, we count all of the numbers in <code>nums2</code> in advance. If all the numbers in <code>nums2</code> are unique, it will result in us storing all of <code>nums2</code> in memory again (inside <code>counterMap</code>).</li><li>We need to use a tool that allows us to get the file in chunks. The most prominent tool (and the only one I can think of because I never needed anything else) is: Nodejs Streams.</li></ol>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_stream_a_file_in_Nodejs"></span>How to stream a file in Nodejs?<span class="ez-toc-section-end"></span></h3>



<p>Using streams is pretty simple.  In the case of reading a file, all you need to do is create a file <code>readStream</code> using node&#8217;s <code>fs.createReadStream</code>.  Let&#8217;s first see the code without streaming:</p>



<pre class="wp-block-code"><code>const fs = require('fs');
const server = require('http').createServer();

server.on('request', async (req, res) =&gt; {
    res.writeHead(200);

    fs.readFile('./data2.file', async (err, data) =&gt; {
        if (err) throw err;
        res.end(data);
    });
});

server.listen(8000);</code></pre>



<p>This code, on request to the server, reads the file without a stream.  Trying to read a big file will result in a server that is stuck. I&#8217;ve taken a screenshot after waiting for the server for around 20 minutes:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="96" src="/wp-content/uploads/2021/10/image-4.png" alt="" class="wp-image-1169" srcset="/wp-content/uploads/2021/10/image-4.png 1024w, /wp-content/uploads/2021/10/image-4.png 300w, /wp-content/uploads/2021/10/image-4.png 768w, /wp-content/uploads/2021/10/image-4.png 1536w, /wp-content/uploads/2021/10/image-4.png 268w, /wp-content/uploads/2021/10/image-4.png 1938w, /wp-content/uploads/2021/10/image-4.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 5: Waiting for the server to respond after asking it to consume an 18.3GB file using <code>fs.readFile</code></figcaption></figure></div>



<p>Legends say, this server is still trying to consume this file till today 😉</p>



<p>Now, doing the same with a stream is simple. We replace <code>readFile</code> with <code>createDataStream</code> and  pipe <code>res</code> to it so it will output the contents of the file it processes: </p>



<pre class="wp-block-code"><code>const fs = require('fs');
const server = require('http').createServer();

server.on('request', async (req, res) =&gt; {
    res.writeHead(200);
    const data = fs.createReadStream('./data2.file');
    data.pipe(res);
});

server.listen(8000);</code></pre>



<p>Figure 6 shows that this code completed the task in 90 seconds:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="108" src="/wp-content/uploads/2021/10/image-5.png" alt="" class="wp-image-1170" srcset="/wp-content/uploads/2021/10/image-5.png 1024w, /wp-content/uploads/2021/10/image-5.png 300w, /wp-content/uploads/2021/10/image-5.png 768w, /wp-content/uploads/2021/10/image-5.png 1536w, /wp-content/uploads/2021/10/image-5.png 268w, /wp-content/uploads/2021/10/image-5.png 1920w, /wp-content/uploads/2021/10/image-5.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 6: Completing the 18.3Gb file read took 90.32 seconds using streaming.</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_use_Streams_to_complete_our_task"></span>How to use Streams to complete our task?<span class="ez-toc-section-end"></span></h3>



<p>Now that we know how to stream a file, we can use this technique to output our intersection result. There are several ways we can do this.</p>



<p>To make things simple, let&#8217;s make use of the functions we already have.  What we&#8217;d like to do it get the biggest possible chunk in our stream and run it in our function.  </p>



<p>We will have to change our functions though&#8230; so let&#8217;s take the <code>optimizedIntersection</code> function and use it. </p>



<p>Our algorithm should be as follows:</p>



<ol class="wp-block-list"><li>Create a frequencyMap of nums1</li><li>Start streaming nums2 from a file</li><li>On every chunk, iterate over current chunk and add intersecting numbers.</li><li>For simplicity sake, we&#8217;ll run this until the stream ends</li></ol>



<p>So our <code><meta charset="utf-8"><code>optimizedIntersection</code></code> function will look like this:</p>



<pre class="wp-block-code"><code>function optimizedIntersection(nums1: Number&#91;], nums2Path: string) {
    // create the frequency map in one sweep of nums1
    const nums1Counter = frequencyMap(nums1);

    // create the new array while reading nums2 from file
    const nums2FileStream = fs.createReadStream(nums2Path);

    let intersection = &#91;]; // the array

    // listen to new chunks coming in and add the relevant elements to the array
    nums2FileStream.on('data', (data) =&gt; {
        const nums2 = data.toJSON().data;
        const chunkIntersection = nums2.reduce((intersection, val) =&gt; {
            if (nums1Counter.get(val)) {
                intersection.push(val);
                nums1Counter.set(val, nums1Counter.get(val) - 1);
            }
            return intersection;
        }, &#91;]);
        intersection = &#91;...intersection, ...chunkIntersection];
    });
    
    // when we are done, we can log it or do anything else we want
    nums2FileStream.on('end', function() {
        console.log('Finished streaming stuff: ', intersection);
    });

    // we now return the stream where users can listen to some event and on stream end...
    return nums2FileStream;
}</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Interview questions might not seem very practical most of the times.  When digging deeper and asking followup questions, one might get some practical practices from doing simple code practice.</p>



<p>In this article we saw how to classically solve the Intersection of Two Arrays problem.  The solution of O(m*n) was optimized to O(m+n).  In addition, the optimization could be done better if we knew how our data might look.  For instance, there&#8217;s a solution that is optimized for the case of sorted arrays.</p>



<p>Finally, we meddled a bit with streams in the case when we had a large file to consume that could not be kept in memory.</p>



<p>There are several ways to implement almost everything. The more complex that thing is &#8211; the more ways there are to do it. I&#8217;d love to read your suggestions to solution to the various problems presented here.</p>



<p>Thanks to <a rel="noreferrer noopener" href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank">Miki Ezra Stanger</a> for the very kind and helpful review.</p>



<p><em>Featured Photo by <a href="https://unsplash.com/@dnevozhai?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Denys Nevozhai</a> on <a href="https://unsplash.com/s/photos/intersection?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></em></p>

