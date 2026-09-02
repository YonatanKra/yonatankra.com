---
title: How to profile javascript performance in google chrome?
slug: how-to-profile-javascript-performance-in-the-browser
published: 2020-11-06T09:32:12
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: In order to solve performance issues, you must learn how to profile and monitor an application. How to do that using Google Chrome developer tools? How to start a recording Open the chrome browser with any website. Hit F12 OR right click on the screen and select “inspect element” In the dev tools screen that [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
tags:
  - chrome devtools
  - how to
  - profiling performance
canonical: https://yonatankra.com/how-to-profile-javascript-performance-in-the-browser/
comments: []
---

<p class="has-medium-font-size">In order to solve performance issues, you must learn how to profile and monitor an application. How to do that using Google Chrome developer tools?</p>



<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2020/11/luke-chesser-JKUTrJ4vK00-unsplash.jpg" alt="" class="wp-image-588" width="580" height="386" srcset="/wp-content/uploads/2020/11/luke-chesser-JKUTrJ4vK00-unsplash.jpg 640w, /wp-content/uploads/2020/11/luke-chesser-JKUTrJ4vK00-unsplash.jpg 300w, /wp-content/uploads/2020/11/luke-chesser-JKUTrJ4vK00-unsplash.jpg 135w" sizes="auto, (max-width: 580px) 100vw, 580px" /></figure></div>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d51ff87" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d51ff87"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-profile-javascript-performance-in-the-browser/#How_to_start_a_recording" >How to start a recording</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-profile-javascript-performance-in-the-browser/#What_are_Performance_Recording_Settings" >What are Performance Recording Settings</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-profile-javascript-performance-in-the-browser/#How_to_Read_Performance_Recording_Results" >How to Read Performance Recording Results?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-profile-javascript-performance-in-the-browser/#The_Performance_Profile_Timeline" >The Performance Profile Timeline</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-profile-javascript-performance-in-the-browser/#The_Performance_Profile_Flamechart" >The Performance Profile Flamechart</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-profile-javascript-performance-in-the-browser/#The_Performance_Profile_Memory_Area" >The Performance Profile Memory Area</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-profile-javascript-performance-in-the-browser/#The_Performance_Profile_Bottom_Panel" >The Performance Profile Bottom Panel</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-profile-javascript-performance-in-the-browser/#The_Summary_tab" >The Summary tab</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-profile-javascript-performance-in-the-browser/#Bottom_up" >Bottom up</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-profile-javascript-performance-in-the-browser/#Call_Tree" >Call Tree</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-profile-javascript-performance-in-the-browser/#Events_log" >Events log</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-12" href="/how-to-profile-javascript-performance-in-the-browser/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_start_a_recording"></span>How to start a recording<span class="ez-toc-section-end"></span></h2>



<ol class="wp-block-list"><li>Open the chrome browser with any website.</li><li>Hit F12 OR right click on the screen and select “inspect element”</li><li>In the dev tools screen that opens, select the “Performance” tab (1 in <strong>Figure </strong>1)</li><li>Click the “record” button (2 in the <strong>Figure </strong>1)</li></ol>



<p>Now the app is being recorded.</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh5.googleusercontent.com/M5syD92CalwetGUkw6oadFeQE_50nrgSqElQIV1jldCuT0PXHAHtqjfF0uLk9lqccSnvneD2P6VvRD5DzU2n1q7NUf5BOLD4Zyz6MuPilsHtD3gx9gO5CM0karINn-lJmCuRsz6e" alt=""/><figcaption>F<strong>igure </strong>1: The performance tab in google chrome.</figcaption></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="What_are_Performance_Recording_Settings"></span>What are Performance Recording Settings<span class="ez-toc-section-end"></span></h3>



<p>Button 3 in <strong>Figure </strong>1 forces garbage collection. If you don’t know what it is, don’t worry &#8211; we’ll go over it later on.</p>



<p>Number 4 in <strong>Figure 1 </strong>(the checkbox) denotes whether the performance tool should take snapshots during the run. This can be removed for better performance, but cannot be done after the recording was taken, so plan ahead.</p>



<p>Now that all is set up, we can click the record button. Your performance tab will look like <strong>Figure </strong>2.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="263" src="/wp-content/uploads/2020/11/image-4-e1605623425593.png" alt="" class="wp-image-703" srcset="/wp-content/uploads/2020/11/image-4-e1605623425593.png 682w, /wp-content/uploads/2020/11/image-4-e1605623425593.png 300w, /wp-content/uploads/2020/11/image-4-e1605623425593.png 219w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure </strong>2: Shhhh&#8230; Profiling&#8230;.</figcaption></figure>



<p>During the recording, nothing exciting happens on screen. This is the time for you to play around with your application or reproduce a scenario that you know or assume causes a performance issue.</p>



<p>Once you are done, click on the “Stop” button to stop the recording. You will now see the recording’s result.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Read_Performance_Recording_Results"></span>How to Read Performance Recording Results?<span class="ez-toc-section-end"></span></h2>



<p>Now you have a recording result. This is the basic monitoring of the app’s runtime. Here you can see EVERYTHING that happened during the run.</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh4.googleusercontent.com/fPkQxS0NmYFl-hJo50S_ncbhVSsk4afmiGhansW8rkkEaj5Xy-8i-_Lu2D70bz_7tHe2GFUF_q_jPztx78Ok99SzmW4gghFRmf2TzpmtMSpix30u6cZGxXskAEJSAEHKHbOBAuXh" alt=""/><figcaption><br><strong>Figure </strong>3: Recording results screen.</figcaption></figure>



<p>The results of the recording are shown in Figure 3. This might seem overwhelming when you view this screen for the first time.&nbsp; There is a lot of information in this window and we will go over its parts to clarify.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Performance_Profile_Timeline"></span>The Performance Profile Timeline<span class="ez-toc-section-end"></span></h3>



<figure class="wp-block-image"><img decoding="async" src="https://lh3.googleusercontent.com/y-pJn1l3yNc4ddS5DO7beAXxdJoK-EJKmpWOJbd0fJPO2KUNRyuaG-zadO46m1Up5WyqIGbjnJRB3R3LKH1uJnMaQmIk9lRG4u0jfvMtOzUnWTXgtaPnjXimYTQ5VEfJR6bWOGdX" alt=""/><figcaption><br><strong>Figure </strong>4: The results’ timeline</figcaption></figure>



<p>The timeline shows you a birds-eye view of what happened in the app.&nbsp;</p>



<p>The top part shows the <a href="/viewing-the-critical-rendering-path-in-the-browser/" data-type="post" data-id="292">Critical Rendering Path</a> parts (Javascript, style, layout, paint and composite) as well as user interactions, ajax calls etc.</p>



<p>The middle part, which exists only when you check the “Screenshot” option, is the actual screenshots taken during the recording. This can help you if you wish to examine things that happen in accordance to visual state of the application.</p>



<p>The bottom part shows you memory trends of the application. In this example, you can see the memory rises and after a while it drops. This is common for games that have a rendering engine. The memory rises until a garbage collection process occurs.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Performance_Profile_Flamechart"></span>The Performance Profile Flamechart<span class="ez-toc-section-end"></span></h3>



<figure class="wp-block-image"><img decoding="async" src="https://lh5.googleusercontent.com/vlRDD1y0hj_yc9LZOKdGdJV0X9RQ9ZI-d7QfWNzd_TQdLW_53vUhgi40YxL0L76QtZsYMDv9_Nhuo8Qr2PxVi9EZa7xgWaMmnCQA-_abB-dWAxAnD34dh3k330IPfwnTLA_ngSsf" alt=""/><figcaption><strong>Figure 5</strong>: The flame chart</figcaption></figure>



<p>This is the most overwhelming part in the performance tool &#8211; by far.&nbsp; In <strong>Figure 5</strong>, all of the data is folded.&nbsp;</p>



<p>You can unfold Frames, Interactions, the main thread and more.</p>



<p>The most useful part for debugging performance issues (and debugging in general) is the <strong>Main</strong> part (<strong>Figure 6</strong>).  We will use other parts at times, but since this is the most useful tool, let’s see an example of what it gives you.</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh5.googleusercontent.com/GwlZfrKPUHNvpNelO3cMcmsngbiJvaa33WSmt8vyoa_G28--B89w-kYPpv1nakilz1NN5aJEtdoAJMggRQfo-0vlM-hZ_dzMjxwqluFEtVLFLVMLZ1zOyT7RF0aT5jJgZuW8esOQ" alt=""/></figure>



<figure class="wp-block-image"><img decoding="async" src="https://lh4.googleusercontent.com/pMA0i3ok0uuYmjBSdhbB7gPII7r_y24TycavdoiJgoHGm6tDlOC1p-3ZudddoFf_ln0-Gr9RR0vdFKAzw-dokJhwn2XbNACZRAzVs_9VcupMvX6dH_f6Q-iyFe0naOxEriuQvX7B" alt=""/><figcaption><strong>Figure 6</strong>: (top) The main flame chart. (bottom) A part of the main flame chart zoomed in to see the actual functions.</figcaption></figure>



<p>All of the yellow parts indicate javascript running. You can zoom in on any part of the flame chart to see more details &#8211; and actually search for function names (just hit ctrl/cmnd + f to open the search box).</p>



<p>This way, you can quickly see what is the overall time of the frame and what functions made the most impact lengthening it.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Performance_Profile_Memory_Area"></span>The Performance Profile Memory Area<span class="ez-toc-section-end"></span></h3>



<p>Below the flame chart, there’s another chart (Figure 7). DOM nodes and other assets that can accumulate over time.</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh4.googleusercontent.com/Z618TX64s1uLka3UTYkYJTcfU2zou__cRETS6IJ8aOxOYjPC-3l9EUdw6_xX8l3TYM5eMnh9dUG_L9jaCR8s-mt9BWE1_LwbtTX9CmYUjTuiihnLaXZRo8KnvvETxkL2v64AaWuQ" alt=""/><figcaption><strong>Figure 7</strong>: The memory, DOM nodes, listeners and more metrics are being summarized in this chart.</figcaption></figure>



<p>The blue part is memory, red is document, green is DOM nodes, yellow is listeners and purple is GPU memory.&nbsp; This part shows you trends in your app and can be useful when tracking down memory leaks.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Performance_Profile_Bottom_Panel"></span>The Performance Profile Bottom Panel<span class="ez-toc-section-end"></span></h3>



<p>The above-mentioned panels give you an overview of the app’s runtime.&nbsp; It allows you to “get a feeling” of where the bottlenecks are.&nbsp; Once you suspect a part to be at fault, you can drill down into the code itself and find not only the faulty function, but the exact line that causes the issue.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="The_Summary_tab"></span>The Summary tab<span class="ez-toc-section-end"></span></h4>



<p>The summary view has 2 modes.</p>



<p>The first is a summary of a whole recording or a certain zoomed range (<strong>Figure 8</strong>).</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh4.googleusercontent.com/MINy5sNPcrhJnODCjPwp8okTYHZBw-zH4lcN1NhKxlvcdjwHMEpmTkyZRG3iPioa6XHOJhZ2WyUhI64we24dl7PPFmN8PTNLRfhlgXyeerhzlcflhXco5K225NtsOfPE0zBTDzjm" alt=""/><figcaption><strong>Figure 8</strong>: The summary for a whole recording</figcaption></figure></div>



<p><strong>Figure 8</strong> shows the summary for the range 12.33s to 12.71s of an app’s recording.&nbsp; It shows you how much time was spent in the various lifecycles of the app.&nbsp;</p>



<p>What we can deduce here is that during this time range:</p>



<ol class="wp-block-list"><li>The CPU was busy for 224ms parsing JS.&nbsp;</li><li>An insignificant amount of time was spent on rendering and painting&nbsp;</li><li>The rest of the recording the browser was idle.</li></ol>



<p>The second summary view is valuable information about a segment (<strong>Figure 9</strong>).</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><img loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/JpbBF9omEXx6i8KTneVPeSyo3pdUeFHnjNGzIeZMcokuD6qsJnI9lpIe3NTaxPr73SFIfUEGyIq59ks398pSkxzq8mgBAb-EI_9Wegfs_qBWd53qT9AwvOk2suYOUDcrn0wTCMnm" width="555" height="642"></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>Figure 9</strong>: A selected function in the flame chart (top) and its corresponding summary (bottom). Red arrows mark areas of interest.</td></tr></tbody></table></figure>



<p>In the flame chart shown in <strong>Figure 9</strong> a function render is selected (top red arrow). The summary part (bottom) shows relevant information regarding the render method (bottom red arrow).&nbsp; See that it gives a specific line in the code &#8211; clicking the link (highlighted in yellow marker) will get us to the line of code in the Source panel of the dev tools.</p>



<p>The following other tabs in the bottom section will show you a list of all the functions that ran during the recording or selected time range.&nbsp;</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Bottom_up"></span><em>Bottom up</em><span class="ez-toc-section-end"></span></h4>



<p>This view allows us to see functions and their callees (<strong>Figure 10</strong>).</p>



<p><br>This view can be sorted by <em>self time</em> or <em>total time</em>. Self time is the time that the function itself took to run. Total time is the time it took the function we chose as well as its children to complete.&nbsp; We will usually look for high self time functions.&nbsp;</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><img loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/QSiCBWfzKpBol60C8bf4qHgid1Ld4on-Ug6w-5yAKNTgJ_YZmncYrwSPveFzxx_pjaR3573GzXsN6SL0JMtBrUeST0VcmmQOhZrIz7MFycaFqEwCxPaef84auX0PljLGxp7yu-Cf" width="610" height="131"></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>Figure 10</strong>: The Bottom-Up view. Self time is marked with orange, total time is marked with green.</td></tr></tbody></table></figure>



<p>The “alert” function (marked with light blue) took around 2 seconds. We can drill down to see what function called it. Its parent is anonymous, and we can click a link (red arrow) to see where it was called in our code.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Call_Tree"></span><em>Call Tree</em><span class="ez-toc-section-end"></span></h4>



<p>Like the bottom-up view, you can sort this section by self and total time.&nbsp; The difference between Call Tree and Bottom Up is that in Call Tree you get to see the top level functions, and you drill down to see the children.</p>



<p>This way, you can track functions that had long total time, and then look for the children with long self time to track the performance issue.</p>



<figure class="wp-block-table aligncenter"><table><tbody><tr><td class="has-text-align-center" data-align="center"><img loading="lazy" decoding="async" src="https://lh4.googleusercontent.com/o5qyQj6Z0XORFIq0eQgr4ahthigLJzIL-moRHwaNAh2pFNT8sRtDojjzXOW6w4MrUoqbIXGFLGgcTUdak2gC0Squ9WrjhUrgQT-Qw-6afA3-XM8SlTYiUWtJWEE9kqYdYZMIL95n" width="610" height="128"></td></tr><tr><td class="has-text-align-center" data-align="center"><strong>Figure 11</strong>: The Call Tree view.</td></tr></tbody></table></figure>



<p><strong>Figure 11</strong> illustrates such a case.</p>



<p>We found a function with a long Total Time and 0 self time (marked with the red arrow). We unravel the tree until we get to the alert which took a self time of 2 seconds.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Events_log"></span><em>Events log</em><span class="ez-toc-section-end"></span></h4>



<p>As its name implies &#8211; it shows a chronological list of the functions that ran in the current zoom:</p>



<figure class="wp-block-table"><table><tbody><tr><td><img loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/NlvC9Oo1S_emSDxsvcF8Hxci--67hT-1QyGedOjMkKGFpB-oniykEWiVoA1IyyMvPcrgff2sShnDUb0lw5nQQ-3wJfV3FB1T7e-LJtWBITR9sm-KT8NfJvI2V4JTYUIIUVmKebLI" width="610" height="173"></td></tr><tr><td><strong>Figure 12</strong>: The Event Log.</td></tr></tbody></table></figure>



<p>In <strong>Figure 12</strong> the click event (marked with orange) initiated a process that resulted in togglePlay (marked with yellow). You can keep tracking the whole chronological flow of the click event.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>These are the essentials of performance profiling of a frontend Javascript Application.  I personally use them daily &#8211; both at work and when I contribute to open source projects.</p>



<p>Many of the posts in this blog show results of performance profiling to show problems and solutions of performance issues.</p>

