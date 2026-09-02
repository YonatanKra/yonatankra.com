---
title: How to Remote Debug and Profile Node.js Apps?
slug: how-to-remote-debug-and-profile-node-js-apps
published: 2021-12-28T13:36:14
updated: 2021-12-28T13:36:15
author: Yonatan Kra
description: Debugging is an important skill for every developer. Here’s how to quickly setup debugging for nodejs with free tools everyone has. Introduction There are many fancy tools for debugging your application.  Data dog, rookout, aspecto and sentry to name a few. They are all commercial solutions though. They cost money, and have their learning curve [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: nodejs
    slug: nodejs
    path: javascript/nodejs
tags: []
canonical: https://yonatankra.com/how-to-remote-debug-and-profile-node-js-apps/
comments: []
---


<p class="has-medium-font-size">Debugging is an important skill for every developer. Here’s how to quickly setup debugging for nodejs with free tools everyone has.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b83129a" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b83129a"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-remote-debug-and-profile-node-js-apps/#Introduction" >Introduction</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-remote-debug-and-profile-node-js-apps/#Logs_debugging" >Logs debugging</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_really_debug_a_nodejs_application" >How to really debug a nodejs application?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_add_a_debug_point_to_a_nodejs_application" >How to add a debug point to a nodejs application?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_profile_the_CPU_usage_of_a_nodejs_application" >How to profile the CPU usage of a nodejs application?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_profile_the_memory_of_a_nodejs_application" >How to profile the memory of a nodejs application?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_debug_multiple_applications" >How to debug multiple applications?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_solve_%E2%80%9Caddress_already_in_use%E2%80%9D_error_when_debugging_nodejs" >How to solve “address already in use” error when debugging nodejs?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-remote-debug-and-profile-node-js-apps/#How_to_debug_and_profile_a_nodejs_app_remotely" >How to debug and profile a nodejs app remotely?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-remote-debug-and-profile-node-js-apps/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Introduction"></span>Introduction<span class="ez-toc-section-end"></span></h2>



<p>There are many fancy tools for debugging your application.  <a href="https://www.datadoghq.com/" target="_blank" rel="noreferrer noopener nofollow">Data dog</a>, <a href="https://www.rookout.com/" target="_blank" rel="noreferrer noopener nofollow">rookout</a>, <a href="https://www.aspecto.io/" target="_blank" rel="noreferrer noopener">aspecto</a> and <a href="https://sentry.io/for/node" target="_blank" rel="noreferrer noopener nofollow">sentry</a> to name a few. They are all commercial solutions though. They cost money, and have their learning curve for new developers coming into the team.</p>



<p>There is a tool that almost every computer in the world has that can give you debugging and profiling capabilities for your nodejs applications: chrome dev tools.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Logs_debugging"></span>Logs debugging<span class="ez-toc-section-end"></span></h2>



<p>When it comes to debugging nodejs applications, the first tool that comes to mind is the almighty `console.log`.</p>



<p>You just sprinkle your codebase with&nbsp;<code>console.log</code> s in the right places, spin up your nodejs server and see the values of your objects at any given time.</p>



<p>But that’s a primitive way of debugging. More like logs reading&#8230; And what about profiling your application and checking memory usage and cpu consumption?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_really_debug_a_nodejs_application"></span>How to really debug a nodejs application?<span class="ez-toc-section-end"></span></h2>



<p>With Chrome dev tools it’s very easy.&nbsp;&nbsp;</p>



<p>Let’s demo that. For this demo I’ll be using this repository: <a href="https://github.com/YonatanKra/nodejs-perf-demo" target="_blank" rel="noreferrer noopener">https://github.com/YonatanKra/nodejs-perf-demo</a></p>



<p>1. You can clone it and try along (don’t forget to <code>yarn</code> or <code>npm install</code> after you clone it).</p>



<p class="has-text-align-left">2. We start the application with the <code>--inspect</code> flag:</p>



<p class="has-text-align-center"><code>node --inspect gc/gc-example.js</code></p>



<p>3. We head over to chrome and browse to <code>chrome://inspect</code>:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh6.googleusercontent.com/oct1megX8muN4GIq8rMH8x6_e6Q_Q7hZiZ9GvzNSJToMx3JclWcqQ7PIrxgwzf72TTzpPgbGnGeKGrPQEjV9h17n1nEi0KlUrjdH7ANtMQI0dZmway11fuB7fR5XtZKEEN1nIS82" alt=""/><figcaption><strong>Figure 1</strong> Browsing to the chrome inspect page</figcaption></figure></div>



<p>4. Inside, we should see our server running (see the Target section in the image below).</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh6.googleusercontent.com/CXzCWChJFtMui9hIoMKYLfddInOf9CwelUC6gLhG6wP50Og1kXyN3bl4VA0UPHshagWLW2xcud7VFiEWiBQ96GUnD1cDsdM4Wapr8908roYGftZeaEWMqGlWRLi7QtkhmKkpAHYW" alt=""/><figcaption><strong>Figure 2</strong> The chrome inspect page</figcaption></figure></div>



<p>5. Click the <code>inspect</code> link under the running process’s name and you should get to the nodejs chrome dev tools:<br></p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh4.googleusercontent.com/JpfuGhIJHBLxgiqn5KQ6ny0GuRncjK7Hpe_x5FJlUWXZL5xkhZd6Cz1WNIoQAdLvZ_Ykw55E59gFo3M1jOXavB2jC1vtBU9XVPgfYoi7Mz02kKzFsayzsk2oCdDIo2Dezx1epgm2" alt=""/><figcaption><strong>Figure 3 </strong>Chrome DevTools for nodejs</figcaption></figure></div>



<p>Once there, you can use the nodejs console, see the source files and add debug points, and profile the app’s memory or CPU usage.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_add_a_debug_point_to_a_nodejs_application"></span>How to add a debug point to a nodejs application?<span class="ez-toc-section-end"></span></h3>



<p>We head over to the <code>Sources</code> tab and hit Ctrl+P (or cmnd + p on Mac).  This will allow you to search for your file. In my case, I’ll search for <code>gc-example.js</code>:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh3.googleusercontent.com/uywImXKl-YkZRrKXGpwMrnm2dxSFavSweSLo51HXFVqv8EhvHcC60eO16LRYbSfq-PAE3tOH61LnydjP80JalIyxkotYld6-KCKLU4PwQ2DtrJGxVg0fZzSx7q4M5t3lhMyKsx-8" alt=""/><figcaption><meta charset="utf-8"><strong>Figure 4</strong> searching for a file using Ctrl/Cmnd + P in the Sources tab</figcaption></figure></div>



<p>After I open the file, I just set a debug point wherever I want. In this case, I’ll add it to the API entry point:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh6.googleusercontent.com/WBQB5OYdljT6vypeXPFyRXt0xCXWMN-2f74DGDVISdjuG1f-RmiYwsV5xdtk8yUjjNI2uMYY0HivD6gy3Ce02_ZGnQyGab_PDzmNs6yWqoGFsZLs2JXlxJSVHRiCLaIihKlkGqAr" alt="Add a debug breakpoint in google chrome DevTools"/><figcaption><strong>Figure 5</strong> Setting a debug point in line 34</figcaption></figure></div>



<p>Because in my case, the server is running locally on port 8080, I can trigger my API using <a href="https://en.wikipedia.org/wiki/CURL" target="_blank" rel="noreferrer noopener"><code>curl</code></a> like this:</p>



<p class="has-text-align-center"><code>curl localhost:8080</code></p>



<p>Because our server is serving using the GET method, we could have reached the same effect by browsing to this URL. Sometimes you have a POST gateway to test, so you’d have to use <code>curl</code> or tools like <code>postman</code>.</p>



<p>Triggering the API will result in the code stopping at the breakpoint:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh5.googleusercontent.com/Fe6735hfS7-l9ER4G9OY90hh84jrydZYh7-cTWss3oVY87nhpmYPaOOARhmv9XT1CIwFr0q5xvy869qRWODKwQtscdis_xtW7xbIXljZfupMjfIHBVYDzP94luFB-L1KsYNDD6il" alt=""/><figcaption><strong>Figure 6 </strong>Debug point triggered after triggering the API</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_profile_the_CPU_usage_of_a_nodejs_application"></span>How to profile the CPU usage of a nodejs application?<span class="ez-toc-section-end"></span></h3>



<p>For this part, we’ll head over to the Profiler tab:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh3.googleusercontent.com/gNZJ1Ts055a5t3L3s9sTOmFO9ngg8ZLO1HFsKJ2gqe9AzHhGLPhwBOxGeu5tARsSBRCbJuCpdwqK0qtjYwrrjKxuDE2I_8GSdVpXgmf2UPUNZRZWjn8VQvD4oUa1dXUjb8opdK8u" alt=""/><figcaption><strong>Figure 7 </strong>The profiler tab. You can start recording the CPU.</figcaption></figure></div>



<p>We can click on the “Start” button or the small record button at the top left part and it will start recording our application.<br></p>



<p>We will use the <code>curl</code> trick from above to trigger the code of our application and then click on the record button again or on the Stop button that replaced the start button:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh4.googleusercontent.com/T7ANqxdv4axZ__qpztfdYqzhjCJqwJM8ZR_W_XcmD-pLfisiWvjj9HlKzWjjIk-3hRIrIXV9AP_blB1MazVfPfwzUZ24lLoJ22lbDV8BsDYok_BqMA30VTFgJM8VCx9HjOAURJKK" alt=""/><figcaption><strong>Figure 8 </strong>The profiler tab while recording</figcaption></figure></div>



<p>Once we stop the recording, we will get to a flame chart of the recording:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="466" src="/wp-content/uploads/2021/12/image-5.png" alt="" class="wp-image-1325" srcset="/wp-content/uploads/2021/12/image-5.png 1024w, /wp-content/uploads/2021/12/image-5.png 300w, /wp-content/uploads/2021/12/image-5.png 768w, /wp-content/uploads/2021/12/image-5.png 124w, /wp-content/uploads/2021/12/image-5.png 1512w, /wp-content/uploads/2021/12/image-5.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 9</strong> The flame chart of a recording. The flame chart shows when code ran during the recording and how long it took it to run. We can see some “flames” where code runs. The first “flame” (A in Figure 9) is the request handler.&nbsp; At around 3000ms we see the first function that ran (B) and at around 4500ms the second function (C).</figcaption></figure></div>



<p>A record item, named “Profile 1”, is created. If we record again, we’d have more than one recording and we can browse them using the left CPU profiles menu.</p>



<p>You can zoom in and see exactly what functions ran, how long it took every function to run, garbage collection instances etc.:</p>



<figure class="wp-block-image is-resized"><img loading="lazy" decoding="async" src="https://lh6.googleusercontent.com/Tzn17TEz8FkBChiLFzpmvqM3Seb8qFVnj3c_tqhdfIVpX3M3MEBDp4Xi0asYFhkHjtibp92IW5eGyodctNoHoCF9kBhjl3jQss1SzeEsiCsV2Mpj4x81N2rwEgx76GDtAn19-z1V" alt="" width="840" height="679"/><figcaption><strong>Figure 10</strong> Zooming in on the first function (Figure 9 B). It shows a lot of garbage collection instances (gray bars under <code>buildArray1</code>.</figcaption></figure>



<p>There’s much more information but that’s beyond the scope of this article.&nbsp;</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_profile_the_memory_of_a_nodejs_application"></span>How to profile the memory of a nodejs application?<span class="ez-toc-section-end"></span></h3>



<p>Now we head over to the memory tab:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh6.googleusercontent.com/ZN9MjAsdYFSMUPO73lvUsX2qxrtZ7mjLBXzUUACcsUuarCAMiBqvPIi54wNJDQPNVQFmQCZZRIX4f3e9l1tjqlUFGsM5kinNhhirnDEvtpYH8_L-LUGq69HDtfhDHGMBbR66o2gt" alt=""/><figcaption><strong>Figure 11</strong> The memory tab in Chrome DevTools for nodejs</figcaption></figure></div>



<p>Explaining about it is a bit out of the scope of this article, but you can take a heap snapshot (what objects live in your app’s memory), track allocation of memory in your app and even what applications allocated how much memory.&nbsp;&nbsp;</p>



<p>With all of these tools you can easily solve memory issues &#8211; the most (in)famous of them is the dreadful memory leak. You can dig a bit deeper with <a href="https://www.youtube.com/watch?v=nPBkBXhmUhE" target="_blank" rel="noreferrer noopener">this video</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_debug_multiple_applications"></span>How to debug multiple applications?<span class="ez-toc-section-end"></span></h2>



<p>The <code>--inspect</code> flag opens the debugging connection on <code>127.0.0.1:9229</code> as default. Trying to run two debugging instances will result in an error:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh6.googleusercontent.com/PsCCSfz5Q8ZYvUYY4JD7etFKP0nBgv9hSpjU1mGejje5F30SlOhJAoyUhJcudVZcxH4yu3AXq7GNWe29JskhNK4iCtYD7EwAkhfPhkPOi3NBEwdBvhyTjNZpTEnjS2tpoRFbsydU" alt=""/><figcaption><strong>Figure 12</strong> &#8220;address already in use&#8221; error when trying to debug with the default debug URL twice.</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_solve_%E2%80%9Caddress_already_in_use%E2%80%9D_error_when_debugging_nodejs"></span>How to solve “address already in use” error when debugging nodejs?<span class="ez-toc-section-end"></span></h3>



<p>In order to solve this, you can set the url and port when starting your debug session like this:</p>



<p class="has-text-align-center"><code>node --inspect=127.0.0.1:9230</code></p>



<p>Doing that, will not show your app in the <code>chrome://inspect</code> page automatically. There’s another step you need to do in order to make this work.</p>



<p>In the <code>chrome://inspect</code> page there’s a link to open the nodejs dedicated devtools:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh4.googleusercontent.com/QtO8U4uMooIbq1cO1TwQVK9WloIepYzu2r0GD9f7l1T99vP24yfjNAAMOhdGdEqtxt8SUoXsTj_vF4sJexDy2P0pLIAxG99LaXHO--RKA-1d7q-DHOJJYL2D_MCWJEsPgKAjklss" alt=""/><figcaption><strong>Figure 13</strong> The link to. open the dedicated DevTools for node</figcaption></figure></div>



<p>This will open the dedicated devtools where you will have a Connection page:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://lh6.googleusercontent.com/I33FGpDI5tslgo85vFLEIuUFJFLsw1tnbbbhIyiB9AquMsRz-1BFzox6wXmHZ7OVHS_mjXss4p1FjkEnWeQJRk7pXqkCvZdKV57t1RHU8iqWN7th-CsE7Y1CbpkNBkfOFGDS7N37" alt=""/><figcaption><strong>Figure 14</strong> Dedicated DevTools for node connection tab.</figcaption></figure></div>



<p>Just click the “Add connection” button and add your debug url and port (the one you set when running the <code>--inspect=&lt;yourDebugUrl&gt;:&lt;port&gt;</code>).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_debug_and_profile_a_nodejs_app_remotely"></span>How to debug and profile a nodejs app remotely?<span class="ez-toc-section-end"></span></h2>



<p>All this is nice, and we can debug and profile the application when it is running locally. How about remotely?&nbsp;</p>



<p>In order for an app to be exposed to the world, you should expose it in the url <code>0.0.0.0:&lt;port&gt;</code>.</p>



<p>Serving your app through <code>0.0.0.0</code> exposes your server to everyone.&nbsp; This is highly insecure and blocked by most cloud vendors by default (and probably your devops team will object to that as well).&nbsp;&nbsp;</p>



<p>In order to get over this obstacle, you can leave the debug URL local (e.g. <code>127.0.0.1:&lt;port&gt;</code>) like this:<br></p>



<p class="has-text-align-center"><code>node --inspect=localhost:9230</code></p>



<p><br>and access the server via SSH tunnel like this:</p>



<p class="has-text-align-center"><code>ssh -L 9221:localhost:9230 user@myServiceDomain.com</code></p>



<p>You would usually be prompted for a password or use a key file (<code>pem</code>) in order to access the machine, but your computer will have access to the machine’s <code>localhost</code> just as if you debug it locally.</p>



<p>Chrome dev tools have <code>localhost:9221</code> set up by default.&nbsp; If you are using a different port, just set it up in the connection page.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Debugging is a necessary phase in the development process.&nbsp; No matter how many tests you write, and how many years of experience you have &#8211; solving a bug will require a kind of debugging (I usually debug the code when running the tests).</p>



<p>Using the knowledge in this article, you can now debug nodejs applications using chrome dev tools. More than that &#8211; you can profile your applications and solve performance issues. If you want to read more about profiling JS applications <a href="/how-to-profile-javascript-performance-in-the-browser/" data-type="post" data-id="580">click here</a>.  You can <a href="http://performance" data-type="URL" data-id="performance">browse the performance category</a> to see more related articles.</p>



<p>Remote debugging is rarely needed in my experience, but chrome dev tools allows you that as well by connecting to remote servers via the Connection tab.</p>



<p><em>Thanks a lot to </em><a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener"><em>Yuval Bar Levi</em></a><em> and <a rel="noreferrer noopener" href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank">Miki Ezra Stanger</a>  the kind and thorough review!</em></p>



<p></p>

