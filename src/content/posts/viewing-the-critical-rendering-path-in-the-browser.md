---
title: Viewing the Critical Rendering Path in the browser
slug: viewing-the-critical-rendering-path-in-the-browser
published: 2020-02-20T12:08:27
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: "The critical rendering path (CRP from now on) is also known as The Pixel Path. It’s actually what happens from the moment your javascript code runs, until the moment the pixels are shown on screen. We can also call it a “frame”. This is the flow of the CRP: The colors are purposefully as they [&hellip;]"
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
tags: []
canonical: https://yonatankra.com/viewing-the-critical-rendering-path-in-the-browser/
comments: []
---


<p>The critical rendering path (CRP from now on) is also known as The Pixel Path. It’s actually what happens from the moment your javascript code runs, until the moment the pixels are shown on screen. We can also call it a “frame”. </p>



<p>This is the flow of the CRP:<br></p>



<figure class="wp-block-image"><img decoding="async" src="https://docs.google.com/drawings/u/0/d/sMcBy1m2RlD5Clzo4clAj6Q/image?w=624&amp;h=55&amp;rev=193&amp;ac=1&amp;parent=1bYIH6w43Jesje6NDEuijKq3ytzKsCtnwbwhQO1H0-LU" alt=""/><figcaption><strong>Figure 1:</strong> The Critical Rendering Path</figcaption></figure>



<p>The colors are purposefully as they are. This is how they are represented in the profile visualization.&nbsp;</p>



<p>Here&#8217;s a performance recording of a simple app:</p>



<figure class="wp-block-image"><img decoding="async" src="https://docs.google.com/drawings/u/0/d/saCMPN9_HOQ3qX4W-AtazJQ/image?w=624&amp;h=250&amp;rev=336&amp;ac=1&amp;parent=1bYIH6w43Jesje6NDEuijKq3ytzKsCtnwbwhQO1H0-LU" alt=""/><figcaption><strong>Figure 2:</strong> Recording of a simple application. In this recording each arrow shows the different phases of the CRP. The parts in the recording are: Yellow for JS, purple for Style and Layout and green for Paint and Composite.</figcaption></figure>



<h2 class="wp-block-heading">Do it yourself</h2>



<ol class="wp-block-list"><li>Open the app: <a href="/performance/crp.html">https://yonatankra.com/performance/crp.html</a></li><li>Start profiling</li><li>Click the button a few times</li><li>Stop the profiling</li><li>Zoom into one of the click events</li></ol>



<p>You can view the CRP in your app &#8211; just go to chrome dev tools&#8217; performance tab and start recording. </p>



<p>I&#8217;ve recently added a video to <a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="http://bit.ly/egghead-site" target="_blank">egghead.io</a> about this topic. If you prefer to watch a video &#8211; here is it: <a rel="noreferrer noopener" aria-label="See the Critical Rendering Path in the browser (opens in a new tab)" href="http://bit.ly/critical-rendering-path" target="_blank">See the Critical Rendering Path in the browser</a> <br></p>

