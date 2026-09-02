---
title: Measuring used JS heap size in the browser
slug: measuring-used-js-heap-size
published: 2020-03-20T06:19:26
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: Part of the tools frontend developers have in their arsenal is the performance API. Part of it is the memory object. It can be used for various causes – from debugging performance through experimenting to performance budget monitoring.
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: javascript engine
    slug: javascript-engine
    path: javascript/javascript-engine
  - name: Memory
    slug: memory
    path: javascript/memory
  - name: Performance
    slug: performance
    path: performance
tags:
  - javascript
  - jsheap
  - performance
canonical: https://yonatankra.com/measuring-used-js-heap-size/
comments: []
---

<p>Part of the tools frontend developers have in their arsenal is the performance API. Part of it is the memory object. It can be used for various causes &#8211; from debugging performance through experimenting to performance budget monitoring.</p>



<div class="wp-block-image"><figure class="aligncenter size-medium"><img data-recalc-dims="1" loading="lazy" decoding="async" width="300" height="300" src="/wp-content/uploads/2020/03/aHeapOfTrash.jpg" alt="" class="wp-image-345" srcset="/wp-content/uploads/2020/03/aHeapOfTrash.jpg 300w, /wp-content/uploads/2020/03/aHeapOfTrash.jpg 150w, /wp-content/uploads/2020/03/aHeapOfTrash.jpg 90w, /wp-content/uploads/2020/03/aHeapOfTrash.jpg 210w, /wp-content/uploads/2020/03/aHeapOfTrash.jpg 200w, /wp-content/uploads/2020/03/aHeapOfTrash.jpg 640w" sizes="auto, (max-width: 300px) 100vw, 300px" /><figcaption>A heap of tools<br> Photo by&nbsp;<a href="https://unsplash.com/@randomlies?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Ashim D’Silva</a>&nbsp;on&nbsp;<a href="https://unsplash.com/s/photos/memory-heap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a> </figcaption></figure></div>



<blockquote class="wp-block-quote has-text-align-center is-layout-flow wp-block-quote-is-layout-flow"><p>I&#8217;ve created an <a rel="noreferrer noopener" aria-label="egghead (opens in a new tab)" href="http://bit.ly/egghead-site" target="_blank">egghead</a> lesson about this subject if you prefer a video tutorial: <a rel="noreferrer noopener" aria-label="click here for the video (opens in a new tab)" href="https://bit.ly/2U3fXZC" target="_blank">click here for the video</a></p></blockquote>



<p>There are three pieces of information in the memory object:</p>



<p> <strong>jsHeapSizeLimit</strong>  &#8211; the maximum amount of heap size that your JS engine can ask from the operating system.</p>



<p> <strong>totalJSHeapSize</strong> &#8211; the actual memory allocated by the JS engine from the operating system.</p>



<p> <strong>usedJSHeapSize</strong>  &#8211; the active memory in the allocated heap.</p>



<p>The usage is pretty simple:</p>



<pre class="wp-block-code"><code>console.log(performance.memory.usedJSHeapSize);</code></pre>



<p>will log the memory in bytes currently used by the JS engine. Something like this:</p>



<p class="has-text-align-center">11900000</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>This feature is <strong>non standard</strong>. It is currently not available in firefox and safari.</p><cite> <a href="https://caniuse.com/#feat=mdn-api_performance_memory" target="_blank" rel="noopener">https://caniuse.com/#feat=mdn-api_performance_memory</a> </cite></blockquote>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1dcf0f12" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1dcf0f12"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/measuring-used-js-heap-size/#Units" >Units</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/measuring-used-js-heap-size/#Comparing_memory_before_and_after" >Comparing memory before and after</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/measuring-used-js-heap-size/#Remember_the_Garbage_Collector" >Remember the Garbage Collector</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/measuring-used-js-heap-size/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Units"></span>Units<span class="ez-toc-section-end"></span></h2>



<p>Because most of us are more used to Megabyte units, we can easily log a Megabytes output:</p>



<pre class="wp-block-code"><code>console.log(`${performance.memory.usedJSHeapSize / Math.pow(1000, 2)} MB`);</code></pre>



<p>Now we can get a nicer output:</p>



<p class="has-text-align-center">11.9 MB</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Comparing_memory_before_and_after"></span>Comparing memory before and after<span class="ez-toc-section-end"></span></h2>



<p>Our JS code creates and deletes objects and arrays all the time. We can set a before and after test to measure the memory intake.</p>



<p>For instance, let&#8217;s look at the following code:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<p><iframe style="height: 60vh; width: 100%;" src="https://embed.plnkr.co/plunk/QS6sCvd4qASwFxc4"></iframe></p>



<p class="has-text-align-center has-very-dark-gray-color has-text-color has-small-font-size"><strong>Code snippet 1</strong>: Two arrays are created one after another, taking more and more memory in the JS heap. The first array is an array of floating numbers &#8211; taking roughly double the amount of memory the second integers array takes.</p>
</div></div>



<p>Open the console in the plnkr above (just click the console pane). Now press the <code>Measure Memory</code> button. You will see three measurements of memory:</p>



<ol class="wp-block-list"><li>Before we&#8217;ve done anything</li><li>After we&#8217;ve created an array of floats</li><li>After we&#8217;ve created an array of integers</li></ol>



<p>The result will look like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/03/image-3.png" alt="" class="wp-image-335" width="426" height="210" srcset="/wp-content/uploads/2020/03/image-3.png 450w, /wp-content/uploads/2020/03/image-3.png 300w, /wp-content/uploads/2020/03/image-3.png 182w" sizes="auto, (max-width: 426px) 100vw, 426px" /><figcaption>Figure 1: Memory logged to the console. Top &#8211; before allocating an array. Middle &#8211; after allocating an array of floating numbers. Bottom &#8211; after allocating another array of integers.</figcaption></figure></div>



<p><strong>Figure1 </strong>clearly shows that an array of floats (middle row) took more memory than an array of integers (bottom row). An array of floats took 422.76567 &#8211; 123.546093 =  299.219577 MB. An array of integers took 521.969676 &#8211; 422.76567 = 99.204006 MB.</p>



<p>Of course the numbers will change every time you run the code &#8211; but they won&#8217;t change significantly.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Remember_the_Garbage_Collector"></span>Remember the Garbage Collector<span class="ez-toc-section-end"></span></h2>



<p>The garbage collection (GC) is the periodical process that clears unneeded memory from the heap.  For instance &#8211; if you allocated an array and then cleared it or created and object and discarded of it or just created variables in a function and it has finished its job.</p>



<p>I&#8217;ve written about GC in <a href="/memory-allocation-and-garbage-collection-in-javascript/">several articles before</a> (also in regards to <a href="/improve-performance-with-object-pool/">the object pool design pattern</a>).</p>



<p>Let&#8217;s see another example for the workings of the GC:</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<p><iframe style="height: 80vh; width: 100%;" src="https://embed.plnkr.co/plunk/MoOb8TXdVoZwvBQQ"></iframe></p>



<p class="has-text-align-center has-small-font-size"><strong>Code snippet 2</strong>: Arrays are created inside functions. A timeout is set so that a GC might be called after both functions finish.</p>
</div></div>



<p></p>



<p>In the code above, open the terminal and click the start again. This time, the arrays creation is done inside functions. Once the functions finish, the arrays are no longer needed and they are marked for GC.</p>



<p>Here&#8217;s a result:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="625" height="276" src="/wp-content/uploads/2020/03/image-4.png" alt="" class="wp-image-337" srcset="/wp-content/uploads/2020/03/image-4.png 625w, /wp-content/uploads/2020/03/image-4.png 300w, /wp-content/uploads/2020/03/image-4.png 204w" sizes="auto, (max-width: 625px) 100vw, 625px" /><figcaption>Figure 2: Results of running code snippet 2.</figcaption></figure>



<p>Note that each time you&#8217;ll get a different result due to the nature of the JS engine and garbage collection (you&#8217;d might get only one GC or two):</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="558" height="223" src="/wp-content/uploads/2020/03/image-5.png" alt="" class="wp-image-338" srcset="/wp-content/uploads/2020/03/image-5.png 558w, /wp-content/uploads/2020/03/image-5.png 300w, /wp-content/uploads/2020/03/image-5.png 225w" sizes="auto, (max-width: 558px) 100vw, 558px" /><figcaption>Figure 3: Showing results that exhibit only one GC.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In the above short article, we learned about the memory object in the Performance API.</p>



<p>We saw how we can measure the maximum heap size, the current heap size and the current memory used inside the heap by our running application.</p>



<p>We experimented a bit and saw the difference in memory taken by an array of integers vs. floats.</p>



<p>The same technique can be applied to take measurements from code running in production (using automation tools like pupeteer or cypress) and build some performance dashboard like we did at WalkMe.</p>



<p>If after a push to production there&#8217;s an increase in memory beyond a certain threshold, you can do something with it (log, revert, alert &#8211; whatever).</p>



<p>Finally, we saw we can use this tool to experiment and demonstrate JS principles like the garbage collector.</p>



<p>If you have other use cases or some cool stuff to show off &#8211; use the comments section below or get in touch with me. I&#8217;m always happy to learn!</p>

