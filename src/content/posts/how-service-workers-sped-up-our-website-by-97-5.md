---
title: How Service Workers Sped Up Our Website by 97.5%?
slug: how-service-workers-sped-up-our-website-by-97-5
published: 2023-06-21T15:38:56
updated: 2023-06-21T15:45:50
author: Yonatan Kra
description: Here’s how we made our website load 97.5% faster by using service workers, how we ensure the users will get the newest version every time, and how you can do it too. Our website is more than 1 year old. It started from a few static pages and has grown to a fully-fledged documentation with [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Performance
    slug: performance
    path: performance
  - name: vivid
    slug: vivid
    path: vivid
tags:
  - code splitting
  - performance
  - rollup
  - service workers
  - vivid
canonical: https://yonatankra.com/how-service-workers-sped-up-our-website-by-97-5/
comments: []
---

<p><strong>Here’s how we made our website load 97.5% faster by using service workers, how we ensure the users will get the newest version every time, and how you can do it too.</strong></p>



<p>Our <a href="https://vivid.deno.dev" target="_blank" rel="noopener">website</a> is more than 1 year old. It started from a few static pages and has grown to a fully-fledged documentation with live examples of how to use our product. Our code uses code splitting heavily, and our product has a lot of static resources like icons and CSS files.</p>



<p>To top it all, our documentation uses iFrames to present our components, each calling its dependencies separately (yes&#8230; like a Microfrontend architecture&#8230;).</p>



<p>At some point, things started to break.</p>



<p>It started with our own dev environment. After a few reloads, it would just get stuck. We could live with that. Like that:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="416" src="/wp-content/uploads/2023/06/Docs-error.gif" alt="" class="wp-image-1745"/></figure></div>



<p>We couldn’t live with a ticket coming from our consumers showing us how bad the situation really is&#8230;</p>



<p>We had to do something about it. This is how we solved it.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1ab8db2c" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1ab8db2c"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-service-workers-sped-up-our-website-by-97-5/#The_Performance_Boost" >The Performance Boost</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/how-service-workers-sped-up-our-website-by-97-5/#Before" >Before</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-service-workers-sped-up-our-website-by-97-5/#After" >After</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-service-workers-sped-up-our-website-by-97-5/#The_Chrome_Connection_Limit" >The Chrome Connection Limit</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_Reduce_the_Number_of_Files" >How to Reduce the Number of Files?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-service-workers-sped-up-our-website-by-97-5/#Attempt_1_Remove_Prefetch" >Attempt #1: Remove Prefetch</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/how-service-workers-sped-up-our-website-by-97-5/#_Attempt_Number_2_Bundle_all_of_the_Files_into_One_Big_Bundle" ># Attempt Number 2: Bundle all of the Files into One Big Bundle</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_Cache_with_a_Service_Worker" >How to Cache with a Service Worker?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-9" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_Register_a_Service_Worker" >How to Register a Service Worker?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-10" href="/how-service-workers-sped-up-our-website-by-97-5/#The_Service_Worker" >The Service Worker</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_Handle_Versions_in_a_Service_Worker" >How to Handle Versions in a Service Worker?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-12" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_state_the_version_in_a_Service_Worker" >How to state the version in a Service Worker?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-13" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_create_a_versioned_cache_in_a_Service_Worker" >How to create a versioned cache in a Service Worker?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-14" href="/how-service-workers-sped-up-our-website-by-97-5/#How_to_delete_obsolete_cache_in_a_Service_Worker" >How to delete obsolete cache in a Service Worker?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-15" href="/how-service-workers-sped-up-our-website-by-97-5/#Why_Didnt_My_Service_Worker_Update" >Why Didn’t My Service Worker Update?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-16" href="/how-service-workers-sped-up-our-website-by-97-5/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Performance_Boost"></span>The Performance Boost<span class="ez-toc-section-end"></span></h2>



<p>Let’s start from the end. Our main goal was to reduce the number of calls to the server. A secondary goal (or bonus, if you will) was speeding up the load time of pages in our app. Here’s an example of how good we did:</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Before"></span>Before<span class="ez-toc-section-end"></span></h3>



<figure class="wp-block-image"><img decoding="async" src="https://lh3.googleusercontent.com/1Un-9Yk1xFjGPI07Os_GJnnDSaiC0oMW_t8hyzIO0hBrj_ApxDvz7doGRq3Q_uTucrxunF6oGC2vzzvYYBnaaHcgHZs4Bcoy2Cdqy2G-7Yr3HXHtSE_4D8SECprVz5_Viqi_-1fi0KGmHhdjgzWTh4g" alt=""/></figure>



<p>In the image above, we can see the profile of the network requests before the change. At some points, the page load took 860ms &#8211; a huge amount of time! The average load time of a page was around 400ms. In the rightmost section, you can see the gray bar of the site trying to load the `all.css` file, which keeps going forever. This is the part in which the site stops loading for the user, and refresh doesn’t help (actually, makes it worse&#8230;).</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="After"></span>After<span class="ez-toc-section-end"></span></h3>



<figure class="wp-block-image"><img decoding="async" src="https://lh6.googleusercontent.com/VVGzqeqT2IhfHHiVkAWfsXtco0blgiLEh8nPwSAPUe9WfhP5sfT4aWcjMOJup6q7iq9I5pUPbolDgrkcyfjKcXP_JzBzAbbfjsanMjap9KOpj6nMalQBF9twhCWnjrJJ34TU9vYzJ3FQOhy0Ptym310" alt=""/></figure>



<p>After the change, we see each page loads really fast. We found pages that took less than 10ms to load. The average was around 10ms. That is a whooping 97.5% increase in speed (or decrease in load time).</p>



<p>So&#8230; how did we do it?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Chrome_Connection_Limit"></span>The Chrome Connection Limit<span class="ez-toc-section-end"></span></h2>



<p>We got lucky. Our consumers are developers, and one of the reporters tested the website in various browsers and hinted it happens only in Chrome.</p>



<p>I don’t know how common knowledge it is that chrome limits the number of connections to a server to 6 concurrent connections. While that’s not surprising, what surprised us was the long timeout and the fact that the requests remain “live” even when refreshing or browsing to a different page.</p>



<p>Because we had almost a hundred requests coming out on every page (we code-split to an extreme, it seems), it didn’t take much time for chrome to just shut down the connection to our documentation website for every chrome user after just a few minutes of browsing the website.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Reduce_the_Number_of_Files"></span>How to Reduce the Number of Files?<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Attempt_1_Remove_Prefetch"></span>Attempt #1: Remove Prefetch<span class="ez-toc-section-end"></span></h3>



<p>If the problem is too many files, then we need to do something about it.</p>



<p>All in all, our documentation code looked like this:</p>



<figure class="wp-block-image"><img decoding="async" src="https://lh5.googleusercontent.com/VG-IStTZh2rGSGE9MYx5kUrIh93mdCJ0K9f9r-hBtkpsIBQNEIziylnLYKZ6QB_rdy0G8jj3u0BoUdC9nTzwxaavmtNdMxzyQtDVc2OZhm6FcD6xeeoYy_khBafjY7h94AoxvaP83paKOCeu98jTMvA" alt=""/></figure>



<p>These files are just a small part of our files manifesto. See that we also prefetch the files, trying to speed up the load time of the next pages.</p>



<p>Our first step was to stop the prefetch. This, while reducing the amount of requests, did not really help because the prefetch happened only when the network was idle, so there wasn’t much effect. We needed to remove the number of scripts requested.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="_Attempt_Number_2_Bundle_all_of_the_Files_into_One_Big_Bundle"></span># Attempt Number 2: Bundle all of the Files into One Big Bundle<span class="ez-toc-section-end"></span></h3>



<p>In our project we use `rollup` to bundle our files. Our configuration is meant to code split everything and let the consumers use their own bundlers to code split, bundle, and tree shake.</p>



<p>In this step, we just went over all of the components, created a barrel file, and bundled all of them into one big `vivid-components.js` file we used instead of all the other script tags.</p>



<p>This is the commit if it is of interest: <a href="https://github.com/Vonage/vivid-3/pull/1208/commits/83d9b8fe1a2ce9452bcabb40fdc6123efef4c777" target="_blank" rel="noopener">https://github.com/Vonage/vivid-3/pull/1208/commits/83d9b8fe1a2ce9452bcabb40fdc6123efef4c777</a></p>



<p>It helped on most pages but &#8211; remember the iFrames? They still brought a lot of stuff with them. Duplicates of the files already brought by the top page&#8230;</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Cache_with_a_Service_Worker"></span>How to Cache with a Service Worker?<span class="ez-toc-section-end"></span></h2>



<p>A service worker is a layer between our app and the network. It can listen to all requests coming in and out of the app and handle them.</p>



<p>In our case, we wanted to handle the requests, cache the response, and return the response on consequent requests.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Register_a_Service_Worker"></span>How to Register a Service Worker?<span class="ez-toc-section-end"></span></h3>



<p>The first step is to register the service worker in the client:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123080859" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-activate-service-worker-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="activate-service-worker.js content, created by YonatanKra on 01:25PM on June 19, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="activate-service-worker.js">
        <tr>
          <td id="file-activate-service-worker-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-activate-service-worker-js-LC1" class="blob-code blob-code-inner js-file-line">(async function() {</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-activate-service-worker-js-LC2" class="blob-code blob-code-inner js-file-line">	const registration = await navigator.serviceWorker.register(</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-activate-service-worker-js-LC3" class="blob-code blob-code-inner js-file-line">		&#39;/sw.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-activate-service-worker-js-LC4" class="blob-code blob-code-inner js-file-line">		{</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-activate-service-worker-js-LC5" class="blob-code blob-code-inner js-file-line">			scope: &#39;/&#39;,</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-activate-service-worker-js-LC6" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-activate-service-worker-js-LC7" class="blob-code blob-code-inner js-file-line">	);</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-activate-service-worker-js-LC8" class="blob-code blob-code-inner js-file-line">})();</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/53cc8901eaa3ec3021b83e5aa261c850/raw/aead63a5d56904c302385be79341c7ce19086ae7/activate-service-worker.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/53cc8901eaa3ec3021b83e5aa261c850#file-activate-service-worker-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          activate-service-worker.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The service worker can fetch requests according to its containing folder. This is why I put it at the root of my project.</p>



<p>In our project, the actual file is not in the root. It moves there in our build process, hence giving us a nice development experience while still allowing us to fetch requests from the root.You could use the <a href="https://www.w3.org/TR/service-workers/#service-worker-allowed" target="_blank" rel="noopener">service-worker-allowed http-header</a> to serve it in a different folder, but using the “build to root” trick, I had no need for it.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Service_Worker"></span>The Service Worker<span class="ez-toc-section-end"></span></h3>



<p>Our service worker looks like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123080704" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-sw-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="sw.js content, created by YonatanKra on 01:15PM on June 19, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="sw.js">
        <tr>
          <td id="file-sw-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-sw-js-LC1" class="blob-code blob-code-inner js-file-line">const addResourcesToCache = async (resources) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-sw-js-LC2" class="blob-code blob-code-inner js-file-line">	const cache = await caches.open(&#39;vivid-cache&#39;);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-sw-js-LC3" class="blob-code blob-code-inner js-file-line">	await cache.addAll(resources);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-sw-js-LC4" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-sw-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-sw-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-sw-js-LC6" class="blob-code blob-code-inner js-file-line">const putInCache = async (request, response) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-sw-js-LC7" class="blob-code blob-code-inner js-file-line">	const cache = await caches.open(&#39;vivid-cache&#39;);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-sw-js-LC8" class="blob-code blob-code-inner js-file-line">	await cache.put(request, response);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-sw-js-LC9" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-sw-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-sw-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-sw-js-LC11" class="blob-code blob-code-inner js-file-line">const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-sw-js-LC12" class="blob-code blob-code-inner js-file-line">	const responseFromCache = await caches.match(request);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-sw-js-LC13" class="blob-code blob-code-inner js-file-line">	if (responseFromCache) {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-sw-js-LC14" class="blob-code blob-code-inner js-file-line">		return responseFromCache;</td>
        </tr>
        <tr>
          <td id="file-sw-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-sw-js-LC15" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-sw-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-sw-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-sw-js-LC17" class="blob-code blob-code-inner js-file-line">	const preloadResponse = await preloadResponsePromise;</td>
        </tr>
        <tr>
          <td id="file-sw-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-sw-js-LC18" class="blob-code blob-code-inner js-file-line">	if (preloadResponse) {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-sw-js-LC19" class="blob-code blob-code-inner js-file-line">		console.info(&#39;using preload response&#39;, preloadResponse);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-sw-js-LC20" class="blob-code blob-code-inner js-file-line">		await putInCache(request, preloadResponse.clone());</td>
        </tr>
        <tr>
          <td id="file-sw-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-sw-js-LC21" class="blob-code blob-code-inner js-file-line">		return preloadResponse;</td>
        </tr>
        <tr>
          <td id="file-sw-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-sw-js-LC22" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-sw-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-sw-js-LC23" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-sw-js-LC24" class="blob-code blob-code-inner js-file-line">	try {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-sw-js-LC25" class="blob-code blob-code-inner js-file-line">		const responseFromNetwork = await fetch(request);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-sw-js-LC26" class="blob-code blob-code-inner js-file-line">		await putInCache(request, responseFromNetwork.clone());</td>
        </tr>
        <tr>
          <td id="file-sw-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-sw-js-LC27" class="blob-code blob-code-inner js-file-line">		return responseFromNetwork;</td>
        </tr>
        <tr>
          <td id="file-sw-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-sw-js-LC28" class="blob-code blob-code-inner js-file-line">	} catch (error) {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-sw-js-LC29" class="blob-code blob-code-inner js-file-line">		const fallbackResponse = await caches.match(fallbackUrl);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-sw-js-LC30" class="blob-code blob-code-inner js-file-line">		if (fallbackResponse) {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-sw-js-LC31" class="blob-code blob-code-inner js-file-line">			return fallbackResponse;</td>
        </tr>
        <tr>
          <td id="file-sw-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-sw-js-LC32" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-sw-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-sw-js-LC33" class="blob-code blob-code-inner js-file-line">		return new Response(&#39;Network error happened&#39;, {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-sw-js-LC34" class="blob-code blob-code-inner js-file-line">			status: 408,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-sw-js-LC35" class="blob-code blob-code-inner js-file-line">			headers: { &#39;Content-Type&#39;: &#39;text/plain&#39; },</td>
        </tr>
        <tr>
          <td id="file-sw-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-sw-js-LC36" class="blob-code blob-code-inner js-file-line">		});</td>
        </tr>
        <tr>
          <td id="file-sw-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-sw-js-LC37" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-sw-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-sw-js-LC38" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-sw-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-sw-js-LC39" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-sw-js-LC40" class="blob-code blob-code-inner js-file-line">const enableNavigationPreload = async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-sw-js-LC41" class="blob-code blob-code-inner js-file-line">	if (self.registration.navigationPreload) {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-sw-js-LC42" class="blob-code blob-code-inner js-file-line">		await self.registration.navigationPreload.enable();</td>
        </tr>
        <tr>
          <td id="file-sw-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-sw-js-LC43" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-sw-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-sw-js-LC44" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-sw-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-sw-js-LC45" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-sw-js-LC46" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;activate&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-sw-js-LC47" class="blob-code blob-code-inner js-file-line">	event.waitUntil(enableNavigationPreload());</td>
        </tr>
        <tr>
          <td id="file-sw-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-sw-js-LC48" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-sw-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-sw-js-LC49" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-sw-js-LC50" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;install&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-sw-js-LC51" class="blob-code blob-code-inner js-file-line">	event.waitUntil(</td>
        </tr>
        <tr>
          <td id="file-sw-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-sw-js-LC52" class="blob-code blob-code-inner js-file-line">		addResourcesToCache([</td>
        </tr>
        <tr>
          <td id="file-sw-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-sw-js-LC53" class="blob-code blob-code-inner js-file-line">			&#39;./&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-sw-js-LC54" class="blob-code blob-code-inner js-file-line">			&#39;./index.html&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-sw-js-LC55" class="blob-code blob-code-inner js-file-line">			&#39;/assets/styles/core/all.css&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-sw-js-LC56" class="blob-code blob-code-inner js-file-line">			&#39;/assets/scripts/vivid-components.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-sw-js-LC57" class="blob-code blob-code-inner js-file-line">			&#39;/assets/scripts/live-sample.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-sw-js-LC58" class="blob-code blob-code-inner js-file-line">		])</td>
        </tr>
        <tr>
          <td id="file-sw-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-sw-js-LC59" class="blob-code blob-code-inner js-file-line">	);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-sw-js-LC60" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-sw-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-sw-js-LC61" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-sw-js-LC62" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;fetch&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-sw-js-LC63" class="blob-code blob-code-inner js-file-line">	event.respondWith(</td>
        </tr>
        <tr>
          <td id="file-sw-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-sw-js-LC64" class="blob-code blob-code-inner js-file-line">		cacheFirst({</td>
        </tr>
        <tr>
          <td id="file-sw-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-sw-js-LC65" class="blob-code blob-code-inner js-file-line">			request: event.request,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-sw-js-LC66" class="blob-code blob-code-inner js-file-line">			preloadResponsePromise: event.preloadResponse,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-sw-js-LC67" class="blob-code blob-code-inner js-file-line">			fallbackUrl: &#39;./assets/images/vivid-logo.jpeg&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-sw-js-LC68" class="blob-code blob-code-inner js-file-line">		})</td>
        </tr>
        <tr>
          <td id="file-sw-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-sw-js-LC69" class="blob-code blob-code-inner js-file-line">	);</td>
        </tr>
        <tr>
          <td id="file-sw-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-sw-js-LC70" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/26019e8fbf312d89abfe07b9d2bfc857/raw/dec93fe4f84af953bb05f7a16706fc03b8498b28/sw.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/26019e8fbf312d89abfe07b9d2bfc857#file-sw-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          sw.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>We have two utility functions: addResourcesToCache to add a resource to the cache and `putInCache` to put a request and its response into the cache.</p>



<p>They are both using the <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/caches" data-type="URL" data-id="https://developer.mozilla.org/en-US/docs/Web/API/caches" target="_blank" rel="noreferrer noopener">caches</a></code> global object that gives us access to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage" target="_blank" data-type="URL" data-id="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage" rel="noreferrer noopener">CacheStorage</a> object.</p>



<p>`cacheFirst` is where the magic happens:</p>



<p>It tries to get the response from cache. If it finds it, it returns the cached response. (Lines 12-15)</p>



<p>If not, it tries to get the response from a preload. If it works, we’re good &#8211; we cache it and return the preloaded response. (Lines 17-22)</p>



<p>If this fails, we move on to request from the network (e.g. the server), get the response and cache it. (Lines 24-27)</p>



<p>If all fails, we just return an error with a picture (but why should we fail?). Lines 29-35</p>



<p>Now, a service worker has a lifecycle:</p>



<ol class="wp-block-list"><li>Registration (we’ve been through that)</li><li>Installation</li><li>Activation</li></ol>



<p>In our service worker, we listen to the installation phase and add our main resources to the cache.</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123093239" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-sw-install-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="sw-install.js content, created by YonatanKra on 06:25AM on June 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="sw-install.js">
        <tr>
          <td id="file-sw-install-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-sw-install-js-LC1" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;install&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-sw-install-js-LC2" class="blob-code blob-code-inner js-file-line">	event.waitUntil(</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-sw-install-js-LC3" class="blob-code blob-code-inner js-file-line">		addResourcesToCache([</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-sw-install-js-LC4" class="blob-code blob-code-inner js-file-line">			&#39;./&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-sw-install-js-LC5" class="blob-code blob-code-inner js-file-line">			&#39;./index.html&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-sw-install-js-LC6" class="blob-code blob-code-inner js-file-line">			&#39;/assets/styles/core/all.css&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-sw-install-js-LC7" class="blob-code blob-code-inner js-file-line">			&#39;/assets/scripts/vivid-components.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-sw-install-js-LC8" class="blob-code blob-code-inner js-file-line">			&#39;/assets/scripts/live-sample.js&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-sw-install-js-LC9" class="blob-code blob-code-inner js-file-line">		])</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-sw-install-js-LC10" class="blob-code blob-code-inner js-file-line">	);</td>
        </tr>
        <tr>
          <td id="file-sw-install-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-sw-install-js-LC11" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/f5d61c3feb2b33a8f21f309e11872307/raw/9fcbd14eb96387d40ebf6c45ce7025ee0a804402/sw-install.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/f5d61c3feb2b33a8f21f309e11872307#file-sw-install-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          sw-install.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Notice the utility `waitUntil` we get on the event object. This utility helps us avoid race conditions as it awaits for async operations to finish.</p>



<p>Then in the `activate` phase, we enable pre-loading of content (again, with `waitUntil`).</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123093269" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-sw-activate-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="sw-activate.js content, created by YonatanKra on 06:28AM on June 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="sw-activate.js">
        <tr>
          <td id="file-sw-activate-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-sw-activate-js-LC1" class="blob-code blob-code-inner js-file-line">const enableNavigationPreload = async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-sw-activate-js-LC2" class="blob-code blob-code-inner js-file-line">	if (self.registration.navigationPreload) {</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-sw-activate-js-LC3" class="blob-code blob-code-inner js-file-line">		await self.registration.navigationPreload.enable();</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-sw-activate-js-LC4" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-sw-activate-js-LC5" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-sw-activate-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-sw-activate-js-LC7" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;activate&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-sw-activate-js-LC8" class="blob-code blob-code-inner js-file-line">	event.waitUntil(enableNavigationPreload());</td>
        </tr>
        <tr>
          <td id="file-sw-activate-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-sw-activate-js-LC9" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/af121427a00b336ea0a93df685cdf764/raw/b632c1a7c2d5ed6b3b4081578b520578190bcb9e/sw-activate.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/af121427a00b336ea0a93df685cdf764#file-sw-activate-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          sw-activate.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The final step is to add a listener to `fetch`. This listener intercepts the requests and allows us to handle them using our `cacheFirst` function:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123093292" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-sw-fetch-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="sw-fetch.js content, created by YonatanKra on 06:30AM on June 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="sw-fetch.js">
        <tr>
          <td id="file-sw-fetch-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-sw-fetch-js-LC1" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;fetch&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-sw-fetch-js-LC2" class="blob-code blob-code-inner js-file-line">	event.respondWith(</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-sw-fetch-js-LC3" class="blob-code blob-code-inner js-file-line">		cacheFirst({</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-sw-fetch-js-LC4" class="blob-code blob-code-inner js-file-line">			request: event.request,</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-sw-fetch-js-LC5" class="blob-code blob-code-inner js-file-line">			preloadResponsePromise: event.preloadResponse,</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-sw-fetch-js-LC6" class="blob-code blob-code-inner js-file-line">			fallbackUrl: &#39;./assets/images/vivid-logo.jpeg&#39;,</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-sw-fetch-js-LC7" class="blob-code blob-code-inner js-file-line">		})</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-sw-fetch-js-LC8" class="blob-code blob-code-inner js-file-line">	);</td>
        </tr>
        <tr>
          <td id="file-sw-fetch-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-sw-fetch-js-LC9" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/eba75e5fcf23fc0f6f40178d14af2b8f/raw/1fc5cf52fa1f43bb682d8c4b70f2d73895aa5490/sw-fetch.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/eba75e5fcf23fc0f6f40178d14af2b8f#file-sw-fetch-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          sw-fetch.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Notice the `respondWith` utility. It actually does what it says &#8211; given the request, we can return any response. In this case, we return the result of `cacheFirst`.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Handle_Versions_in_a_Service_Worker"></span>How to Handle Versions in a Service Worker?<span class="ez-toc-section-end"></span></h2>



<p>There might be a time in which you’d like to update a service worker’s version. In our case, it is needed in the case of our library’s update.</p>



<p>For this, we must state the version in our Service Worker’s file, create a versioned cache and delete the old cache.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_state_the_version_in_a_Service_Worker"></span>How to state the version in a Service Worker?<span class="ez-toc-section-end"></span></h3>



<p>Adding a version is easy: `const VERSION = ‘3.17.0’;`</p>



<p>This can be changed manually on every release.</p>



<p>In our project, for example, we use rollup to bundle so we did the following “trick”:</p>



<ol class="wp-block-list"><li>We set the version this way: `const VERSION = &#8216;SW_VERSION&#8217;;`</li><li>During the build, we extract the version from our `package.json`</li><li>We use the rollup’s replace plugin to set the version on every build.</li></ol>



<p>You can see our setup <a href="https://github.com/Vonage/vivid-3/blob/main/apps/docs/rollup.config.js#L64" target="_blank" rel="noopener">here</a>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_create_a_versioned_cache_in_a_Service_Worker"></span>How to create a versioned cache in a Service Worker?<span class="ez-toc-section-end"></span></h3>



<p>If you noticed, the `caches.open` method accepts a string:</p>



<p>`const cache = await <strong><em>caches</em></strong>.open(<strong><em>VERSION</em></strong>);`</p>



<p>It expects a cache name or id we can later reference. </p>



<p>In many cases, you&#8217;ll need to update the service worker or your website&#8217;s cache. For instance, when you bump a version of a library, add a new section to the page etc.</p>



<p>Using the version as the id allows us to address the cache of each version and thus display the current version and delete old ones.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_delete_obsolete_cache_in_a_Service_Worker"></span>How to delete obsolete cache in a Service Worker?<span class="ez-toc-section-end"></span></h3>



<p>Now that we have versioned cache, we can go ahead and delete it.&nbsp;</p>



<p>Let’s create a function `removeOldCache`:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123093525" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-removeoldcache-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="removeOldCache.js content, created by YonatanKra on 06:50AM on June 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="removeOldCache.js">
        <tr>
          <td id="file-removeoldcache-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-removeoldcache-js-LC1" class="blob-code blob-code-inner js-file-line">async function removeOldCache(event) {</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-removeoldcache-js-LC2" class="blob-code blob-code-inner js-file-line">	await caches.keys().then(function (keys) {</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-removeoldcache-js-LC3" class="blob-code blob-code-inner js-file-line">		return Promise.all(keys.filter(function (key) {</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-removeoldcache-js-LC4" class="blob-code blob-code-inner js-file-line">			return key !== VERSION;</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-removeoldcache-js-LC5" class="blob-code blob-code-inner js-file-line">		}).map(function (key) {</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-removeoldcache-js-LC6" class="blob-code blob-code-inner js-file-line">			return caches.delete(key);</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-removeoldcache-js-LC7" class="blob-code blob-code-inner js-file-line">		}));</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-removeoldcache-js-LC8" class="blob-code blob-code-inner js-file-line">	}).then(function () {</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-removeoldcache-js-LC9" class="blob-code blob-code-inner js-file-line">		return self.clients.claim();</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-removeoldcache-js-LC10" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-removeoldcache-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-removeoldcache-js-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2e69cdd031efb8dbd39f6f9d58ed62fb/raw/e19815e167db95ff5a9212cc81c262c5f5757936/removeOldCache.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2e69cdd031efb8dbd39f6f9d58ed62fb#file-removeoldcache-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          removeOldCache.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>The function goes over all the cache keys (line 2), and for every key that is not the new activated version, we delete it (line 6). Once this is done, we use the `self.clients.claim` method to tell the browser our new Service Worker controls all of the tabs now (line 9).</p>



<p>We call this function during activation:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist123093558" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-activate-service-worker2-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="activate-service-worker2.js content, created by YonatanKra on 06:53AM on June 20, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="activate-service-worker2.js">
        <tr>
          <td id="file-activate-service-worker2-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-activate-service-worker2-js-LC1" class="blob-code blob-code-inner js-file-line">self.addEventListener(&#39;activate&#39;, (event) =&gt; {</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker2-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-activate-service-worker2-js-LC2" class="blob-code blob-code-inner js-file-line">	event.waitUntil(removeOldCache(event));</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker2-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-activate-service-worker2-js-LC3" class="blob-code blob-code-inner js-file-line">	event.waitUntil(enableNavigationPreload());</td>
        </tr>
        <tr>
          <td id="file-activate-service-worker2-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-activate-service-worker2-js-LC4" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/8298bf5f593473ec996f163d6a5db8ca/raw/893989d59925fc4684398d27e7ce24a0898ad994/activate-service-worker2.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/8298bf5f593473ec996f163d6a5db8ca#file-activate-service-worker2-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          activate-service-worker2.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Notice that the cache is the global cache for all the service workers. In our case, we can safely remove them, but in your case, you&#8217;d might have more than one cache and thus might consider using a suffix to the version to remove only the cache you want.</p>



<p>An example of that is a case in which you&#8217;d want to separate HTML and server requests caches. The HTML cache will be cleared when you change clientside-related areas, while the server requests cache will change on some other term.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Why_Didnt_My_Service_Worker_Update"></span>Why Didn’t My Service Worker Update?<span class="ez-toc-section-end"></span></h3>



<p>New Service Workers have a waiting period. It might take a few hours to replace them. We can skip this waiting period by adding `self.skipWaiting()` in our install phase.</p>



<p>Now our Service Worker will update immediately when we change it (e.g., upload a new version of the library).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Service Workers are a very powerful tool for web developers. They allow us to control the communication between the server and the client. Here we saw the classic example of caching content, but there are many more use cases.</p>



<p>For instance, if we cache the server’s responses and return them, the user can keep using our application while offline.</p>



<p>This caching example shows our solution to our problem &#8211; and it indeed solves it. But Service Workers answer many other needs in development. I’d be happy to hear yours &#x1f642;</p>



<p><em>Thanks a lot to <a href="https://www.linkedin.com/in/michal-porag-9522b5142/" target="_blank" rel="noreferrer noopener"><a href="https://www.linkedin.com/in/oria-biton-2930a522b/" target="_blank" rel="noreferrer noopener">Oria Biton</a></a></em> <em>and <em><a href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank" rel="noreferrer noopener">Miki Ezra Stanger</a></em></em> <em>for the kind and thorough review of this article</em></p>

