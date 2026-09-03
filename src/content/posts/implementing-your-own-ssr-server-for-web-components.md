---
title: Implementing Your Own SSR Server for Web Components
slug: implementing-your-own-ssr-server-for-web-components
published: 2024-05-27T17:11:51
updated: 2024-05-27T17:13:05
author: Yonatan Kra
description: Server Side Rendering (SSR) is a very hot topic today. What’s with React Server Components bringing all these buzz words that “I just have to implement in my project”… Let’s see what’s all the fuss about by implementing our own SSR server for web components. At Vonage we have a public project called Developer Portal. [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: javascript engine
    slug: javascript-engine
    path: javascript/javascript-engine
  - name: nodejs
    slug: nodejs
    path: javascript/nodejs
  - name: Performance
    slug: performance
    path: performance
tags:
  - javascript
  - SSR
  - web components
canonical: https://yonatankra.com/implementing-your-own-ssr-server-for-web-components/
comments: []
featuredImage: /wp-content/uploads/2024/05/image-1.png
---

<p class="has-medium-font-size">Server Side Rendering (SSR) is a very hot topic today. What’s with React Server Components bringing all these buzz words that “I just have to implement in my project”&#8230; Let’s see what’s all the fuss about by implementing our own SSR server for web components.</p>



<p>At Vonage we have a public project called Developer Portal. It’s a documentation website that’s not behind a login page (a.k.a. public) and holds mostly content. We also want the content to be Search Engines Optimized (SEO). This makes it a good candidate for SSR.</p>



<p>The developer portal is written in Vue and is served using <a href="https://nuxt.com/" target="_blank" rel="noreferrer noopener">Nuxt</a>. Nuxt allows for SSR via its <a href="https://nuxt.com/docs/guide/concepts/rendering#universal-rendering" target="_blank" rel="noreferrer noopener">Universal Rendering</a> mechanism. We needed to allow Nuxt to also SSR our <a href="https://vivid.deno.dev" target="_blank" rel="noreferrer noopener">design system’s web components</a>. Hence started our journey of building an SSR mechanism for Web Components.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1a03db33" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1a03db33"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/implementing-your-own-ssr-server-for-web-components/#What_is_SSR" >What is SSR?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/implementing-your-own-ssr-server-for-web-components/#How_to_Build_Your_Own_SSR_Server" >How to Build Your Own SSR Server?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/implementing-your-own-ssr-server-for-web-components/#Setting_Up_the_HTTP_Server" >Setting Up the HTTP Server</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/implementing-your-own-ssr-server-for-web-components/#A_Simple_Routing" >A Simple Routing</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/implementing-your-own-ssr-server-for-web-components/#Lets_Add_a_Better_Template" >Let’s Add a Better Template</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/implementing-your-own-ssr-server-for-web-components/#How_to_Load_CSS_and_JavaScript" >How to Load CSS and JavaScript?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/implementing-your-own-ssr-server-for-web-components/#Creating_the_Rendering_Function" >Creating the Rendering Function</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-8" href="/implementing-your-own-ssr-server-for-web-components/#How_can_you_render_HTML_on_a_server" >How can you render HTML on a server?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-9" href="/implementing-your-own-ssr-server-for-web-components/#How_to_Explicitly_Render_Shadow_DOM_without_JavaScript" >How to Explicitly Render Shadow DOM without JavaScript?</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/implementing-your-own-ssr-server-for-web-components/#Handling_Complex_Components" >Handling Complex Components</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-11" href="/implementing-your-own-ssr-server-for-web-components/#Solving_the_Icon_not_Getting_Attributes" >Solving the Icon not Getting Attributes</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-12" href="/implementing-your-own-ssr-server-for-web-components/#Loading_Internal_Components" >Loading Internal Components</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-13" href="/implementing-your-own-ssr-server-for-web-components/#Can_We_Serve_More" >Can We Serve More?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-14" href="/implementing-your-own-ssr-server-for-web-components/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_SSR"></span>What is SSR?<span class="ez-toc-section-end"></span></h2>



<p>In a nutshell &#8211; SSR is the process in which we run our app on a server and return plain HTML to the client.&nbsp;</p>



<p>In our portal, the vue code is rendered on a nodejs (nuxt) server. The output of the rendering is HTML (with possibly inlined CSS). This HTML (+CSS) is sent to the browser and shown there &#8211; without any JavaScript. Hence, the user gets to see the website really fast.</p>



<p>In addition, showing the website&#8217;s layout as it should be with JavaScript avoids heavy layout shifts resulting from components suddenly getting content and expanding once JavaScript kicks in.</p>



<p>Note that bots (such as search engine crawlers) usually don’t see JavaScript, so getting this bunch of contentful HTML right away could do wonders for your search engine ranking.</p>



<p>The one caveat here is that without JavaScript, we have no functionality or interactivity. So, the user gets to see the website but not interact with non-native functionality. Forms, links, videos, etc., should work in non-complex examples.&nbsp;</p>



<p>Remember that the Developer Portal is mostly documentation? This is a classic example for when SSR is truly needed. Documentation is mostly just text and images shown to the user. The interactivity is mainly scrolling to see more of the text and images. You can call this “thin” view layer as the <code>dehydrated</code> version of our application.</p>



<p>What if we need to interact with the page? We will need to <code>hydrate</code> our components. <code>Hydration</code> is a marketable name for “load our JavaScript”. Once JavaScript loads, we get our functionality.</p>



<p>So in essence, SSR helps us load our content faster so users can consume it &#8211; but not interact with it. It also contributes to our SEO ranking.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Build_Your_Own_SSR_Server"></span>How to Build Your Own SSR Server?<span class="ez-toc-section-end"></span></h2>



<p>The first thing I recommend to most people is: Don’t Build Your Own SSR Server.</p>



<p>Having said that, in this article we will build our own server to learn the mechanics behind the SSR paradigm and its possible extensions. Understanding how SSR works will help you extend current SSR solutions to fit your needs. For instance, you’d might find yourself in need to&nbsp; SSR web components in a <code>nuxt</code> server.</p>



<p>Now that we understand the usefulness of building an SSR server (or lack thereof 😉 ), let’s build one for learning purposes.</p>



<p>An SSR server is essentially an HTTP server that receives a request from the client, and through this request parses a template and returns HTML to the client.</p>



<p>Here’s an illustration of the process:</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="177" src="/wp-content/uploads/2024/05/image.png" alt="" class="wp-image-2014" srcset="/wp-content/uploads/2024/05/image.png 1024w, /wp-content/uploads/2024/05/image.png 300w, /wp-content/uploads/2024/05/image.png 768w, /wp-content/uploads/2024/05/image.png 268w, /wp-content/uploads/2024/05/image.png 1232w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>


<p>From this we can define the building blocks of our server:</p>



<ol class="wp-block-list">
<li>An HTTP server that handles routes&nbsp;</li>



<li>A rendering function</li>
</ol>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Setting_Up_the_HTTP_Server"></span>Setting Up the HTTP Server<span class="ez-toc-section-end"></span></h3>



<p>The HTTP server is pretty simple:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="326" src="/wp-content/uploads/2024/05/image-13.png" alt="" class="wp-image-2029" srcset="/wp-content/uploads/2024/05/image-13.png 1020w, /wp-content/uploads/2024/05/image-13.png 300w, /wp-content/uploads/2024/05/image-13.png 768w, /wp-content/uploads/2024/05/image-13.png 177w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>The code is folded for readability purposes.</p>



<p>On line 13 we create the server.&nbsp;</p>



<p>On line 46 we set the server to listen on a port, so we can access the server in <code>localhost:3000</code></p>



<p>The full code for the server is here:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>The createServer callback handles the request. It gets the URL of the request and parses it.</p>



<p>If the extension’s name is one of <code>CONTENT_TYPES</code> (defined in line 5), it just returns the file with the content type in the header (the logic of <code>returnFileContent</code> defined in line 13).</p>



<p>In any other case, we return <code>text/html</code>.</p>



<p>We return only ‘Hello World’, but we will change that momentarily.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="A_Simple_Routing"></span>A Simple Routing<span class="ez-toc-section-end"></span></h3>



<p>According to our specification, the server needs to accept routes and handle them. The routes will be URLs like: <code>localhost:3000/home-page</code>. We’ll use a simple hash to create our router.</p>



<p>In our project we’ll have a <code>routes</code> folder that’s going to hold an <code>index.mjs</code> file.</p>



<p>Beside it we will create a <code>home-page</code> folder in which the homepage route will reside. It’ll look like this:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="226" height="140" src="/wp-content/uploads/2024/05/image-4.png" alt="" class="wp-image-2020" srcset="/wp-content/uploads/2024/05/image-4.png 226w, /wp-content/uploads/2024/05/image-4.png 145w" sizes="auto, (max-width: 226px) 100vw, 226px" /></figure>



<p><code>home-page</code> will hold its own <code>index.mjs</code> file:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="121" src="/wp-content/uploads/2024/05/image-12.png" alt="" class="wp-image-2028" srcset="/wp-content/uploads/2024/05/image-12.png 986w, /wp-content/uploads/2024/05/image-12.png 300w, /wp-content/uploads/2024/05/image-12.png 768w, /wp-content/uploads/2024/05/image-12.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>This HomePage object will also be exported from the <code>routes/index.mjs</code> file:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="52" src="/wp-content/uploads/2024/05/image-2.png" alt="" class="wp-image-2017" srcset="/wp-content/uploads/2024/05/image-2.png 640w, /wp-content/uploads/2024/05/image-2.png 300w, /wp-content/uploads/2024/05/image-2.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Now we just need to implement <code>getHomePageTemplate</code> in <code>home-page.template.mjs</code>:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>Finally, we need&nbsp; to use the route in our server, so we will change the main index.mjs file:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>Here we import the routes (line 5) and use the routes when we return text/html (line 41).</p>



<p>The results are astounding!</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="279" src="/wp-content/uploads/2024/05/image-11.png" alt="" class="wp-image-2027" srcset="/wp-content/uploads/2024/05/image-11.png 852w, /wp-content/uploads/2024/05/image-11.png 300w, /wp-content/uploads/2024/05/image-11.png 768w, /wp-content/uploads/2024/05/image-11.png 206w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Lets_Add_a_Better_Template"></span>Let’s Add a Better Template<span class="ez-toc-section-end"></span></h3>



<p>This template is quite boring… let’s return something spicy. For this, I’ll use the <a href="https://vivid.deno.dev/" target="_blank" rel="noreferrer noopener">Vivid</a> design system. <a href="https://vivid.deno.dev/" target="_blank" rel="noreferrer noopener">Vivid</a> components are pure web components. We will use them to spice up our template and render them server side.&nbsp;</p>



<p>In Vivid’s <a href="https://vivid.deno.dev/components/button/#appearance" target="_blank" rel="noreferrer noopener">button component page</a> we can take the appearance example which exhibits four different buttons:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="178" src="/wp-content/uploads/2024/05/image-20.png" alt="" class="wp-image-2036" srcset="/wp-content/uploads/2024/05/image-20.png 1600w, /wp-content/uploads/2024/05/image-20.png 300w, /wp-content/uploads/2024/05/image-20.png 1024w, /wp-content/uploads/2024/05/image-20.png 768w, /wp-content/uploads/2024/05/image-20.png 1536w, /wp-content/uploads/2024/05/image-20.png 268w, /wp-content/uploads/2024/05/image-20.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>We can replace our template in <code>home-page.template.mjs</code>: with the example code:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>And the result here is:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="217" src="/wp-content/uploads/2024/05/image-14.png" alt="" class="wp-image-2030" srcset="/wp-content/uploads/2024/05/image-14.png 1328w, /wp-content/uploads/2024/05/image-14.png 300w, /wp-content/uploads/2024/05/image-14.png 1024w, /wp-content/uploads/2024/05/image-14.png 768w, /wp-content/uploads/2024/05/image-14.png 266w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>A blank page beside a not-so-empty body. Where are the components from the code example?</p>



<p>They do not load because they require us to load JS and CSS.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Load_CSS_and_JavaScript"></span>How to Load CSS and JavaScript?<span class="ez-toc-section-end"></span></h3>



<p>This is usually a trivial question &#8211; but how is it done in an SSR server?</p>



<p>Let’s go for the simplest way to do this by using a CDN. You can import Vivid components by using this convention:</p>



<p><code>https://unpkg.com/@vonage/vivid@latest/{pathToFile}</code></p>



<p>Using this, we can import our code in the template:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>If we go test our client we will see our components. Well… kinda:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="244" src="/wp-content/uploads/2024/05/image-19.png" alt="" class="wp-image-2035" srcset="/wp-content/uploads/2024/05/image-19.png 1600w, /wp-content/uploads/2024/05/image-19.png 300w, /wp-content/uploads/2024/05/image-19.png 1024w, /wp-content/uploads/2024/05/image-19.png 768w, /wp-content/uploads/2024/05/image-19.png 1536w, /wp-content/uploads/2024/05/image-19.png 236w, /wp-content/uploads/2024/05/image-19.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>One thing we need to make <code>Vivid</code> components to work is to add the <code>vvd-root</code> class to the element that wraps the components (usually the body…).</p>



<p>Let’s define a wrapper to our template:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>Here’s the outcome:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="442" height="314" src="/wp-content/uploads/2024/05/image.gif" alt="" class="wp-image-2019"/></figure>



<p>So the buttons work but… can you see the issue?</p>



<p>The HTML loads &#8211; as we can see from the wrapping div &#8211; and then the buttons render once the JS kicks in, creating a major layout shift. Imagine this happening in a bigger app with a lot more components.&nbsp;</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="400" height="223" src="/wp-content/uploads/2024/05/image-9.png" alt="" class="wp-image-2025" srcset="/wp-content/uploads/2024/05/image-9.png 400w, /wp-content/uploads/2024/05/image-9.png 300w, /wp-content/uploads/2024/05/image-9.png 161w" sizes="auto, (max-width: 400px) 100vw, 400px" /></figure>



<p>How can we prevent this flash? Let’s render the components on the server!</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Creating_the_Rendering_Function"></span>Creating the Rendering Function<span class="ez-toc-section-end"></span></h3>



<p>Instead of loading the JS on the client side, we can render the components on the server and send a complete HTML. So we need to find a way to render our components on the server as if they were in a browser.</p>



<p>Every framework has a different rendering method.&nbsp;</p>



<p>Web components are rendered natively by the browser. Web components also bring the idea of shadow DOM. In essence, the shadow DOM is a document fragment in which you can add HTML and CSS. For this, browser creates a shadow root inside our component:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="406" height="106" src="/wp-content/uploads/2024/05/image-5.png" alt="" class="wp-image-2021" srcset="/wp-content/uploads/2024/05/image-5.png 406w, /wp-content/uploads/2024/05/image-5.png 300w, /wp-content/uploads/2024/05/image-5.png 268w" sizes="auto, (max-width: 406px) 100vw, 406px" /></figure>



<p>Everything outside the shadow-root is “in the light” while the rest is in the shadow. The advantage of a shadowDOM is that it encapsulates the styles. Styles inside do not affect anything outside and (almost completely) vice-versa.</p>



<p>That means that if we take our template and set it as the innerHTML of a div, we should get rendered components. Let’s try that in the browser:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>If you paste this code into your browser, you should see the crimson div without the button because the JS would not be imported.</p>



<p>Nevertheless &#8211; if you’d have imported the JS beforehand, it would have worked:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist130364396" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-injecting-template-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="injecting-template.js content, created by YonatanKra on 10:51AM on May 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="injecting-template.js">
        <tr>
          <td id="file-injecting-template-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-injecting-template-js-LC1" class="blob-code blob-code-inner js-file-line">const script = document.createElement(&#39;script&#39;);</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-injecting-template-js-LC2" class="blob-code blob-code-inner js-file-line">script.type = &#39;module&#39;;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-injecting-template-js-LC3" class="blob-code blob-code-inner js-file-line">script.src = &#39;https://unpkg.com/@vonage/vivid@latest/button&#39;;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-injecting-template-js-LC4" class="blob-code blob-code-inner js-file-line">const div = document.createElement(&#39;div&#39;);</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-injecting-template-js-LC5" class="blob-code blob-code-inner js-file-line">div.innerHTML = `</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-injecting-template-js-LC6" class="blob-code blob-code-inner js-file-line">&lt;style&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-injecting-template-js-LC7" class="blob-code blob-code-inner js-file-line">            @import &quot;https://unpkg.com/@vonage/vivid@latest/styles/tokens/theme-light.css&quot;;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-injecting-template-js-LC8" class="blob-code blob-code-inner js-file-line">            @import &quot;https://unpkg.com/@vonage/vivid@latest/styles/core/all.css&quot;;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-injecting-template-js-LC9" class="blob-code blob-code-inner js-file-line">            @import &quot;https://unpkg.com/@vonage/vivid@latest/styles/fonts/spezia-variable.css&quot;;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-injecting-template-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-injecting-template-js-LC11" class="blob-code blob-code-inner js-file-line">            #buttons-wrapper {</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-injecting-template-js-LC12" class="blob-code blob-code-inner js-file-line">                min-width: 50px;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-injecting-template-js-LC13" class="blob-code blob-code-inner js-file-line">                min-height: 50px;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-injecting-template-js-LC14" class="blob-code blob-code-inner js-file-line">                background-color: crimson;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-injecting-template-js-LC15" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-injecting-template-js-LC16" class="blob-code blob-code-inner js-file-line">        &lt;/style&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-injecting-template-js-LC17" class="blob-code blob-code-inner js-file-line">        &lt;div id=&quot;buttons-wrapper&quot; class=&quot;vvd-root&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-injecting-template-js-LC18" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;ghost&quot; appearance=&quot;ghost&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-injecting-template-js-LC19" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;ghost-light&quot; appearance=&quot;ghost-light&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-injecting-template-js-LC20" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;filled&quot; appearance=&quot;filled&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-injecting-template-js-LC21" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;outlined&quot; appearance=&quot;outlined&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-injecting-template-js-LC22" class="blob-code blob-code-inner js-file-line">        &lt;/div&gt;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-injecting-template-js-LC23" class="blob-code blob-code-inner js-file-line">`;</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-injecting-template-js-LC24" class="blob-code blob-code-inner js-file-line">document.body.appendChild(div);</td>
        </tr>
        <tr>
          <td id="file-injecting-template-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-injecting-template-js-LC25" class="blob-code blob-code-inner js-file-line">document.body.appendChild(script);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6038e183f18c976817705486a65f94ea/raw/4453484e8b833387cee37b3921d0e651ae022b59/injecting-template.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6038e183f18c976817705486a65f94ea#file-injecting-template-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          injecting-template.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>As tested on Google.com:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="519" src="/wp-content/uploads/2024/05/image-15.png" alt="" class="wp-image-2031" srcset="/wp-content/uploads/2024/05/image-15.png 1600w, /wp-content/uploads/2024/05/image-15.png 300w, /wp-content/uploads/2024/05/image-15.png 1024w, /wp-content/uploads/2024/05/image-15.png 768w, /wp-content/uploads/2024/05/image-15.png 1536w, /wp-content/uploads/2024/05/image-15.png 111w, /wp-content/uploads/2024/05/image-15.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Thing is &#8211; document, body and HTML elements do not exist natively server-side. So…</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="How_can_you_render_HTML_on_a_server"></span>How can you render HTML on a server?<span class="ez-toc-section-end"></span></h4>



<p>Great question! Glad you asked.</p>



<p>There are several ways to render HTML server-side.&nbsp;</p>



<p>Because Vivid tests its components using jsdom, we know it can render our components without a browser.</p>



<p>Hence, if we create a JSDOM environment in our server, we can use our code to render our components.</p>



<p>That’s easy enough because of the almighty NPM!</p>



<p><code>npm i global-jsdom/register jsdom</code> will add <code>jsdom</code> &#8211; a library that mocks the browser’s DOM API in the server runtime, allowing it to create markup as if it were in the browser. <code>global-jsdom/register</code> exposes browser API globally so we can use it in our code. Hence, we can render our components serverside.</p>



<p>Let’s change our template’s code a bit to use that:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>We import <code>global-jsdom/register</code>. Note that we import the <code>@vonage/vivid/button </code>package server-side, so the web component will be rendered as one.</p>



<p>We let <code>jsdom</code> render our template just by adding it to the DOM and returning its <code>innerHTML</code>. It looks like this:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="302" src="/wp-content/uploads/2024/05/image-18.png" alt="" class="wp-image-2034" srcset="/wp-content/uploads/2024/05/image-18.png 1596w, /wp-content/uploads/2024/05/image-18.png 300w, /wp-content/uploads/2024/05/image-18.png 1024w, /wp-content/uploads/2024/05/image-18.png 768w, /wp-content/uploads/2024/05/image-18.png 1536w, /wp-content/uploads/2024/05/image-18.png 191w, /wp-content/uploads/2024/05/image-18.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>OH NO! No buttons in the view! They are indeed in the DOM. We can also see the input in the light DOM inside every button (it’s there to solve form association).&nbsp;</p>



<p>The reason we do not see anything is that <code>innerHTML</code> does not get us the content of the shadowDOM.</p>



<p>So what we could try doing is getting the <code>shadowDOM</code> of every component like this:</p>



<pre class="wp-block-code"><code>function appendOwnShadow(element) {
    const shadowTemplate = `${element.shadowRoot.innerHTML}`;
    const tmpElement = document.createElement('div');
    tmpElement.innerHTML = shadowTemplate;
    element.appendChild(tmpElement.children&#91;0]);
}

Array.from(div.querySelectorAll(‘vwc-button’))
    .forEach(button =&gt; button.appendChild(appendOwnShadow(button)));</code></pre>



<p>Which give us this UI:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="398" height="340" src="/wp-content/uploads/2024/05/image-7.png" alt="" class="wp-image-2023" srcset="/wp-content/uploads/2024/05/image-7.png 398w, /wp-content/uploads/2024/05/image-7.png 300w, /wp-content/uploads/2024/05/image-7.png 105w" sizes="auto, (max-width: 398px) 100vw, 398px" /></figure>



<p>Yay! We can see something but… it’s not exactly the same, right?</p>



<p>And looking at the HTML, we can see the shadowroot is missing:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist130367432" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-innerhtml-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="innerHTML.html content, created by YonatanKra on 01:21PM on May 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="innerHTML.html">
        <tr>
          <td id="file-innerhtml-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-innerhtml-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;div id=&quot;buttons-wrapper&quot; class=&quot;vvd-root&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-innerhtml-html-LC2" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;ghost&quot; appearance=&quot;ghost&quot; role=&quot;presentation&quot;&gt;&lt;input style=&quot;display: none;&quot; slot=&quot;form-associated-proxy&quot; type=&quot;undefined&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-innerhtml-html-LC3" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt; &lt;button class=&quot;control appearance-ghost&quot; value=&quot;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-innerhtml-html-LC4" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;slot name=&quot;icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/slot&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-innerhtml-html-LC5" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;span class=&quot;text&quot; role=&quot;presentation&quot;&gt;ghost&lt;/span&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-innerhtml-html-LC6" class="blob-code blob-code-inner js-file-line">	&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-innerhtml-html-LC7" class="blob-code blob-code-inner js-file-line">		</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-innerhtml-html-LC8" class="blob-code blob-code-inner js-file-line">	&lt;style class=&quot;fast-style-class-1&quot;&gt;:host{display:inline-block}.control{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;border:0 none;border-radius:var(&#8211;_button-border-radius);margin:0;background-color:var(&#8211;_appearance-color-fill);block-size:var(&#8211;_button-block-size);box-shadow:inset 0 0 0 1px var(&#8211;_appearance-color-outline);color:var(&#8211;_appearance-color-text);gap:var(&#8211;_button-icon-gap);text-decoration:none;vertical-align:middle;&#8211;focus-stroke-gap-color: transparent}.control.connotation-cta{&#8211;_connotation-color-primary: var(&#8211;vvd-button-cta-primary, var(&#8211;vvd-color-cta-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-cta-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-cta-primary-increment, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-cta-contrast, var(&#8211;vvd-color-cta-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-cta-fierce, var(&#8211;vvd-color-cta-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-cta-firm, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-cta-soft, var(&#8211;vvd-color-cta-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-cta-faint, var(&#8211;vvd-color-cta-50))}.control.connotation-success{&#8211;_connotation-color-primary: var(&#8211;vvd-button-success-primary, var(&#8211;vvd-color-success-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-success-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-success-primary-increment, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-success-contrast, var(&#8211;vvd-color-success-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-success-fierce, var(&#8211;vvd-color-success-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-success-firm, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-success-soft, var(&#8211;vvd-color-success-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-success-faint, var(&#8211;vvd-color-success-50))}.control.connotation-alert{&#8211;_connotation-color-primary: var(&#8211;vvd-button-alert-primary, var(&#8211;vvd-color-alert-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-alert-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-alert-primary-increment, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-alert-contrast, var(&#8211;vvd-color-alert-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-alert-fierce, var(&#8211;vvd-color-alert-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-alert-firm, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-alert-soft, var(&#8211;vvd-color-alert-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-alert-faint, var(&#8211;vvd-color-alert-50))}.control:not(.connotation-cta,.connotation-success,.connotation-alert){&#8211;_connotation-color-primary: var(&#8211;vvd-button-accent-primary, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-accent-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-accent-primary-increment, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-accent-contrast, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-accent-fierce, var(&#8211;vvd-color-neutral-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-accent-firm, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-soft: var(&#8211;vvd-button-accent-soft, var(&#8211;vvd-color-neutral-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-accent-faint, var(&#8211;vvd-color-neutral-50))}.control.appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-outline: transparent}.control.appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary-increment);&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-filled{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: var(&#8211;vvd-color-neutral-100);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;vvd-color-neutral-300)}.control:where(.disabled,:disabled){&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-fierce);&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.active,:active):where(:not(.disabled,:disabled)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: transparent}.control .text{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:var(&#8211;button-line-clamp, 1);max-inline-size:100%}.control:not(.icon-only){inline-size:100%}.control.appearance-filled{&#8211;focus-stroke-gap-color: unset}.control:focus-visible{box-shadow:inset 0 0 0 3px var(&#8211;focus-stroke-gap-color, currentColor);outline:2px solid var(&#8211;focus-stroke-color, var(&#8211;vvd-color-canvas-text));outline-offset:calc(-2px &#8211; var(&#8211;focus-inset, 0px))}@supports (user-select: none){.control{user-select:none}}.control:not(:disabled){cursor:pointer}.control:disabled{cursor:not-allowed}.control.icon-only{contain:size;padding-inline:0;place-content:center}@supports (aspect-ratio: 1){.control.icon-only{aspect-ratio:1}}@supports not (aspect-ratio: 1){.control.icon-only{inline-size:var(&#8211;_button-block-size)}}.control:not(.stacked).size-super-condensed{&#8211;_button-block-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:8px}.control:not(.stacked).size-condensed{&#8211;_button-block-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-condensed:not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:12px}.control:not(.stacked).size-expanded{&#8211;_button-block-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-extended-bold)}.control:not(.stacked).size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;_button-block-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-bold)}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}.control:not(.shape-pill){&#8211;_button-border-radius: 8px}.control:not(.shape-pill).size-condensed:not(.stacked),.control:not(.shape-pill).size-super-condensed:not(.stacked){&#8211;_button-border-radius: 4px}.control.shape-pill:not(.icon-only,.stacked.size-super-condensed,.stacked.size-condensed,.stacked.normal){&#8211;_button-border-radius: 24px}.control.shape-pill.stacked.size-condensed,.control.shape-pill.stacked.size-super-condensed{&#8211;_button-border-radius: 16px}.control.shape-pill.stacked.size-normal{&#8211;_button-border-radius: 20px}.control.shape-pill.icon-only{&#8211;_button-border-radius: 50%}.control.stacked{flex-direction:column;justify-content:center}.control.stacked.size-super-condensed{&#8211;stacked-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 20px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:16px}.control.stacked.size-condensed{&#8211;stacked-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 24px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-condensed:not(.icon-only){&#8211;_button-icon-gap: 6px;padding-inline:12px}.control.stacked.size-expanded{&#8211;stacked-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 32px);font:var(&#8211;vvd-typography-base-extended-bold)}.control.stacked.size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;stacked-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 28px);font:var(&#8211;vvd-typography-base-bold)}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}slot[name=icon]{line-height:1}.icon-trailing slot[name=icon]{display:flex;order:1}.control.stacked&gt;slot[name=icon]{font-size:calc(var(&#8211;stacked-size) / 2)}.control:not(.stacked)&gt;slot[name=icon]{font-size:calc(var(&#8211;_button-block-size) / 2)}:host(:not([icon])) .pending{position:absolute}:host(:not([icon])) .pending+.text{visibility:hidden}</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-innerhtml-html-LC9" class="blob-code blob-code-inner js-file-line">&lt;/style&gt;&lt;slot name=&quot;form-associated-proxy&quot;&gt;&lt;/slot&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-innerhtml-html-LC10" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;ghost-light&quot; appearance=&quot;ghost-light&quot; role=&quot;presentation&quot;&gt;&lt;input style=&quot;display: none;&quot; slot=&quot;form-associated-proxy&quot; type=&quot;undefined&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-innerhtml-html-LC11" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt; &lt;button class=&quot;control appearance-ghost-light&quot; value=&quot;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-innerhtml-html-LC12" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;slot name=&quot;icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/slot&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-innerhtml-html-LC13" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;span class=&quot;text&quot; role=&quot;presentation&quot;&gt;ghost-light&lt;/span&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-innerhtml-html-LC14" class="blob-code blob-code-inner js-file-line">	&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-innerhtml-html-LC15" class="blob-code blob-code-inner js-file-line">		</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-innerhtml-html-LC16" class="blob-code blob-code-inner js-file-line">	&lt;style class=&quot;fast-style-class-1&quot;&gt;:host{display:inline-block}.control{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;border:0 none;border-radius:var(&#8211;_button-border-radius);margin:0;background-color:var(&#8211;_appearance-color-fill);block-size:var(&#8211;_button-block-size);box-shadow:inset 0 0 0 1px var(&#8211;_appearance-color-outline);color:var(&#8211;_appearance-color-text);gap:var(&#8211;_button-icon-gap);text-decoration:none;vertical-align:middle;&#8211;focus-stroke-gap-color: transparent}.control.connotation-cta{&#8211;_connotation-color-primary: var(&#8211;vvd-button-cta-primary, var(&#8211;vvd-color-cta-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-cta-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-cta-primary-increment, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-cta-contrast, var(&#8211;vvd-color-cta-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-cta-fierce, var(&#8211;vvd-color-cta-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-cta-firm, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-cta-soft, var(&#8211;vvd-color-cta-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-cta-faint, var(&#8211;vvd-color-cta-50))}.control.connotation-success{&#8211;_connotation-color-primary: var(&#8211;vvd-button-success-primary, var(&#8211;vvd-color-success-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-success-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-success-primary-increment, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-success-contrast, var(&#8211;vvd-color-success-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-success-fierce, var(&#8211;vvd-color-success-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-success-firm, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-success-soft, var(&#8211;vvd-color-success-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-success-faint, var(&#8211;vvd-color-success-50))}.control.connotation-alert{&#8211;_connotation-color-primary: var(&#8211;vvd-button-alert-primary, var(&#8211;vvd-color-alert-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-alert-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-alert-primary-increment, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-alert-contrast, var(&#8211;vvd-color-alert-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-alert-fierce, var(&#8211;vvd-color-alert-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-alert-firm, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-alert-soft, var(&#8211;vvd-color-alert-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-alert-faint, var(&#8211;vvd-color-alert-50))}.control:not(.connotation-cta,.connotation-success,.connotation-alert){&#8211;_connotation-color-primary: var(&#8211;vvd-button-accent-primary, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-accent-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-accent-primary-increment, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-accent-contrast, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-accent-fierce, var(&#8211;vvd-color-neutral-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-accent-firm, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-soft: var(&#8211;vvd-button-accent-soft, var(&#8211;vvd-color-neutral-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-accent-faint, var(&#8211;vvd-color-neutral-50))}.control.appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-outline: transparent}.control.appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary-increment);&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-filled{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: var(&#8211;vvd-color-neutral-100);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;vvd-color-neutral-300)}.control:where(.disabled,:disabled){&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-fierce);&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.active,:active):where(:not(.disabled,:disabled)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: transparent}.control .text{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:var(&#8211;button-line-clamp, 1);max-inline-size:100%}.control:not(.icon-only){inline-size:100%}.control.appearance-filled{&#8211;focus-stroke-gap-color: unset}.control:focus-visible{box-shadow:inset 0 0 0 3px var(&#8211;focus-stroke-gap-color, currentColor);outline:2px solid var(&#8211;focus-stroke-color, var(&#8211;vvd-color-canvas-text));outline-offset:calc(-2px &#8211; var(&#8211;focus-inset, 0px))}@supports (user-select: none){.control{user-select:none}}.control:not(:disabled){cursor:pointer}.control:disabled{cursor:not-allowed}.control.icon-only{contain:size;padding-inline:0;place-content:center}@supports (aspect-ratio: 1){.control.icon-only{aspect-ratio:1}}@supports not (aspect-ratio: 1){.control.icon-only{inline-size:var(&#8211;_button-block-size)}}.control:not(.stacked).size-super-condensed{&#8211;_button-block-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:8px}.control:not(.stacked).size-condensed{&#8211;_button-block-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-condensed:not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:12px}.control:not(.stacked).size-expanded{&#8211;_button-block-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-extended-bold)}.control:not(.stacked).size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;_button-block-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-bold)}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}.control:not(.shape-pill){&#8211;_button-border-radius: 8px}.control:not(.shape-pill).size-condensed:not(.stacked),.control:not(.shape-pill).size-super-condensed:not(.stacked){&#8211;_button-border-radius: 4px}.control.shape-pill:not(.icon-only,.stacked.size-super-condensed,.stacked.size-condensed,.stacked.normal){&#8211;_button-border-radius: 24px}.control.shape-pill.stacked.size-condensed,.control.shape-pill.stacked.size-super-condensed{&#8211;_button-border-radius: 16px}.control.shape-pill.stacked.size-normal{&#8211;_button-border-radius: 20px}.control.shape-pill.icon-only{&#8211;_button-border-radius: 50%}.control.stacked{flex-direction:column;justify-content:center}.control.stacked.size-super-condensed{&#8211;stacked-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 20px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:16px}.control.stacked.size-condensed{&#8211;stacked-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 24px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-condensed:not(.icon-only){&#8211;_button-icon-gap: 6px;padding-inline:12px}.control.stacked.size-expanded{&#8211;stacked-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 32px);font:var(&#8211;vvd-typography-base-extended-bold)}.control.stacked.size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;stacked-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 28px);font:var(&#8211;vvd-typography-base-bold)}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}slot[name=icon]{line-height:1}.icon-trailing slot[name=icon]{display:flex;order:1}.control.stacked&gt;slot[name=icon]{font-size:calc(var(&#8211;stacked-size) / 2)}.control:not(.stacked)&gt;slot[name=icon]{font-size:calc(var(&#8211;_button-block-size) / 2)}:host(:not([icon])) .pending{position:absolute}:host(:not([icon])) .pending+.text{visibility:hidden}</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-innerhtml-html-LC17" class="blob-code blob-code-inner js-file-line">&lt;/style&gt;&lt;slot name=&quot;form-associated-proxy&quot;&gt;&lt;/slot&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-innerhtml-html-LC18" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;filled&quot; appearance=&quot;filled&quot; role=&quot;presentation&quot;&gt;&lt;input style=&quot;display: none;&quot; slot=&quot;form-associated-proxy&quot; type=&quot;undefined&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-innerhtml-html-LC19" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt; &lt;button class=&quot;control appearance-filled&quot; value=&quot;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-innerhtml-html-LC20" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;slot name=&quot;icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/slot&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-innerhtml-html-LC21" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;span class=&quot;text&quot; role=&quot;presentation&quot;&gt;filled&lt;/span&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-innerhtml-html-LC22" class="blob-code blob-code-inner js-file-line">	&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-innerhtml-html-LC23" class="blob-code blob-code-inner js-file-line">		</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-innerhtml-html-LC24" class="blob-code blob-code-inner js-file-line">	&lt;style class=&quot;fast-style-class-1&quot;&gt;:host{display:inline-block}.control{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;border:0 none;border-radius:var(&#8211;_button-border-radius);margin:0;background-color:var(&#8211;_appearance-color-fill);block-size:var(&#8211;_button-block-size);box-shadow:inset 0 0 0 1px var(&#8211;_appearance-color-outline);color:var(&#8211;_appearance-color-text);gap:var(&#8211;_button-icon-gap);text-decoration:none;vertical-align:middle;&#8211;focus-stroke-gap-color: transparent}.control.connotation-cta{&#8211;_connotation-color-primary: var(&#8211;vvd-button-cta-primary, var(&#8211;vvd-color-cta-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-cta-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-cta-primary-increment, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-cta-contrast, var(&#8211;vvd-color-cta-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-cta-fierce, var(&#8211;vvd-color-cta-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-cta-firm, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-cta-soft, var(&#8211;vvd-color-cta-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-cta-faint, var(&#8211;vvd-color-cta-50))}.control.connotation-success{&#8211;_connotation-color-primary: var(&#8211;vvd-button-success-primary, var(&#8211;vvd-color-success-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-success-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-success-primary-increment, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-success-contrast, var(&#8211;vvd-color-success-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-success-fierce, var(&#8211;vvd-color-success-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-success-firm, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-success-soft, var(&#8211;vvd-color-success-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-success-faint, var(&#8211;vvd-color-success-50))}.control.connotation-alert{&#8211;_connotation-color-primary: var(&#8211;vvd-button-alert-primary, var(&#8211;vvd-color-alert-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-alert-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-alert-primary-increment, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-alert-contrast, var(&#8211;vvd-color-alert-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-alert-fierce, var(&#8211;vvd-color-alert-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-alert-firm, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-alert-soft, var(&#8211;vvd-color-alert-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-alert-faint, var(&#8211;vvd-color-alert-50))}.control:not(.connotation-cta,.connotation-success,.connotation-alert){&#8211;_connotation-color-primary: var(&#8211;vvd-button-accent-primary, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-accent-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-accent-primary-increment, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-accent-contrast, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-accent-fierce, var(&#8211;vvd-color-neutral-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-accent-firm, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-soft: var(&#8211;vvd-button-accent-soft, var(&#8211;vvd-color-neutral-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-accent-faint, var(&#8211;vvd-color-neutral-50))}.control.appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-outline: transparent}.control.appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary-increment);&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-filled{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: var(&#8211;vvd-color-neutral-100);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;vvd-color-neutral-300)}.control:where(.disabled,:disabled){&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-fierce);&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.active,:active):where(:not(.disabled,:disabled)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: transparent}.control .text{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:var(&#8211;button-line-clamp, 1);max-inline-size:100%}.control:not(.icon-only){inline-size:100%}.control.appearance-filled{&#8211;focus-stroke-gap-color: unset}.control:focus-visible{box-shadow:inset 0 0 0 3px var(&#8211;focus-stroke-gap-color, currentColor);outline:2px solid var(&#8211;focus-stroke-color, var(&#8211;vvd-color-canvas-text));outline-offset:calc(-2px &#8211; var(&#8211;focus-inset, 0px))}@supports (user-select: none){.control{user-select:none}}.control:not(:disabled){cursor:pointer}.control:disabled{cursor:not-allowed}.control.icon-only{contain:size;padding-inline:0;place-content:center}@supports (aspect-ratio: 1){.control.icon-only{aspect-ratio:1}}@supports not (aspect-ratio: 1){.control.icon-only{inline-size:var(&#8211;_button-block-size)}}.control:not(.stacked).size-super-condensed{&#8211;_button-block-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:8px}.control:not(.stacked).size-condensed{&#8211;_button-block-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-condensed:not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:12px}.control:not(.stacked).size-expanded{&#8211;_button-block-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-extended-bold)}.control:not(.stacked).size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;_button-block-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-bold)}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}.control:not(.shape-pill){&#8211;_button-border-radius: 8px}.control:not(.shape-pill).size-condensed:not(.stacked),.control:not(.shape-pill).size-super-condensed:not(.stacked){&#8211;_button-border-radius: 4px}.control.shape-pill:not(.icon-only,.stacked.size-super-condensed,.stacked.size-condensed,.stacked.normal){&#8211;_button-border-radius: 24px}.control.shape-pill.stacked.size-condensed,.control.shape-pill.stacked.size-super-condensed{&#8211;_button-border-radius: 16px}.control.shape-pill.stacked.size-normal{&#8211;_button-border-radius: 20px}.control.shape-pill.icon-only{&#8211;_button-border-radius: 50%}.control.stacked{flex-direction:column;justify-content:center}.control.stacked.size-super-condensed{&#8211;stacked-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 20px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:16px}.control.stacked.size-condensed{&#8211;stacked-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 24px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-condensed:not(.icon-only){&#8211;_button-icon-gap: 6px;padding-inline:12px}.control.stacked.size-expanded{&#8211;stacked-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 32px);font:var(&#8211;vvd-typography-base-extended-bold)}.control.stacked.size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;stacked-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 28px);font:var(&#8211;vvd-typography-base-bold)}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}slot[name=icon]{line-height:1}.icon-trailing slot[name=icon]{display:flex;order:1}.control.stacked&gt;slot[name=icon]{font-size:calc(var(&#8211;stacked-size) / 2)}.control:not(.stacked)&gt;slot[name=icon]{font-size:calc(var(&#8211;_button-block-size) / 2)}:host(:not([icon])) .pending{position:absolute}:host(:not([icon])) .pending+.text{visibility:hidden}</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-innerhtml-html-LC25" class="blob-code blob-code-inner js-file-line">&lt;/style&gt;&lt;slot name=&quot;form-associated-proxy&quot;&gt;&lt;/slot&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-innerhtml-html-LC26" class="blob-code blob-code-inner js-file-line">            &lt;vwc-button label=&quot;outlined&quot; appearance=&quot;outlined&quot; role=&quot;presentation&quot;&gt;&lt;input style=&quot;display: none;&quot; slot=&quot;form-associated-proxy&quot; type=&quot;undefined&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-innerhtml-html-LC27" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt; &lt;button class=&quot;control appearance-outlined&quot; value=&quot;&quot;&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-innerhtml-html-LC28" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;slot name=&quot;icon&quot; aria-hidden=&quot;true&quot;&gt;&lt;/slot&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-innerhtml-html-LC29" class="blob-code blob-code-inner js-file-line">		&lt;!&#8212;-&gt;&lt;span class=&quot;text&quot; role=&quot;presentation&quot;&gt;outlined&lt;/span&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-innerhtml-html-LC30" class="blob-code blob-code-inner js-file-line">	&lt;/button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-innerhtml-html-LC31" class="blob-code blob-code-inner js-file-line">		</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-innerhtml-html-LC32" class="blob-code blob-code-inner js-file-line">	&lt;style class=&quot;fast-style-class-1&quot;&gt;:host{display:inline-block}.control{display:inline-flex;box-sizing:border-box;align-items:center;justify-content:center;border:0 none;border-radius:var(&#8211;_button-border-radius);margin:0;background-color:var(&#8211;_appearance-color-fill);block-size:var(&#8211;_button-block-size);box-shadow:inset 0 0 0 1px var(&#8211;_appearance-color-outline);color:var(&#8211;_appearance-color-text);gap:var(&#8211;_button-icon-gap);text-decoration:none;vertical-align:middle;&#8211;focus-stroke-gap-color: transparent}.control.connotation-cta{&#8211;_connotation-color-primary: var(&#8211;vvd-button-cta-primary, var(&#8211;vvd-color-cta-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-cta-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-cta-primary-increment, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-cta-contrast, var(&#8211;vvd-color-cta-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-cta-fierce, var(&#8211;vvd-color-cta-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-cta-firm, var(&#8211;vvd-color-cta-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-cta-soft, var(&#8211;vvd-color-cta-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-cta-faint, var(&#8211;vvd-color-cta-50))}.control.connotation-success{&#8211;_connotation-color-primary: var(&#8211;vvd-button-success-primary, var(&#8211;vvd-color-success-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-success-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-success-primary-increment, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-success-contrast, var(&#8211;vvd-color-success-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-success-fierce, var(&#8211;vvd-color-success-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-success-firm, var(&#8211;vvd-color-success-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-success-soft, var(&#8211;vvd-color-success-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-success-faint, var(&#8211;vvd-color-success-50))}.control.connotation-alert{&#8211;_connotation-color-primary: var(&#8211;vvd-button-alert-primary, var(&#8211;vvd-color-alert-500));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-alert-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-alert-primary-increment, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-alert-contrast, var(&#8211;vvd-color-alert-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-alert-fierce, var(&#8211;vvd-color-alert-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-alert-firm, var(&#8211;vvd-color-alert-600));&#8211;_connotation-color-soft: var(&#8211;vvd-button-alert-soft, var(&#8211;vvd-color-alert-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-alert-faint, var(&#8211;vvd-color-alert-50))}.control:not(.connotation-cta,.connotation-success,.connotation-alert){&#8211;_connotation-color-primary: var(&#8211;vvd-button-accent-primary, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-primary-text: var(&#8211;vvd-button-accent-primary-text, var(&#8211;vvd-color-canvas));&#8211;_connotation-color-primary-increment: var(&#8211;vvd-button-accent-primary-increment, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-contrast: var(&#8211;vvd-button-accent-contrast, var(&#8211;vvd-color-neutral-800));&#8211;_connotation-color-fierce: var(&#8211;vvd-button-accent-fierce, var(&#8211;vvd-color-neutral-700));&#8211;_connotation-color-firm: var(&#8211;vvd-button-accent-firm, var(&#8211;vvd-color-canvas-text));&#8211;_connotation-color-soft: var(&#8211;vvd-button-accent-soft, var(&#8211;vvd-color-neutral-100));&#8211;_connotation-color-faint: var(&#8211;vvd-button-accent-faint, var(&#8211;vvd-color-neutral-50))}.control.appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-outline: transparent}.control.appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-primary-increment);&#8211;_appearance-color-outline: transparent}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.hover,:hover):where(:not(.disabled,:disabled,.readonly)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-faint);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-filled{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: var(&#8211;vvd-color-neutral-100);&#8211;_appearance-color-outline: transparent}.control:where(.disabled,:disabled).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: var(&#8211;vvd-color-neutral-300)}.control:where(.disabled,:disabled){&#8211;_appearance-color-text: var(&#8211;vvd-color-neutral-300);&#8211;_appearance-color-fill: transparent;&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-filled{&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary-text);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-fierce);&#8211;_appearance-color-outline: transparent}.control:where(.active,:active):where(:not(.disabled,:disabled)).appearance-outlined{&#8211;_appearance-color-text: var(&#8211;_connotation-color-firm);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: var(&#8211;_connotation-color-firm)}.control:where(.active,:active):where(:not(.disabled,:disabled)){&#8211;_appearance-color-text: var(&#8211;_connotation-color-primary);&#8211;_appearance-color-fill: var(&#8211;_connotation-color-soft);&#8211;_appearance-color-outline: transparent}.control .text{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:var(&#8211;button-line-clamp, 1);max-inline-size:100%}.control:not(.icon-only){inline-size:100%}.control.appearance-filled{&#8211;focus-stroke-gap-color: unset}.control:focus-visible{box-shadow:inset 0 0 0 3px var(&#8211;focus-stroke-gap-color, currentColor);outline:2px solid var(&#8211;focus-stroke-color, var(&#8211;vvd-color-canvas-text));outline-offset:calc(-2px &#8211; var(&#8211;focus-inset, 0px))}@supports (user-select: none){.control{user-select:none}}.control:not(:disabled){cursor:pointer}.control:disabled{cursor:not-allowed}.control.icon-only{contain:size;padding-inline:0;place-content:center}@supports (aspect-ratio: 1){.control.icon-only{aspect-ratio:1}}@supports not (aspect-ratio: 1){.control.icon-only{inline-size:var(&#8211;_button-block-size)}}.control:not(.stacked).size-super-condensed{&#8211;_button-block-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:8px}.control:not(.stacked).size-condensed{&#8211;_button-block-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-condensed-bold)}.control:not(.stacked).size-condensed:not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:12px}.control:not(.stacked).size-expanded{&#8211;_button-block-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-extended-bold)}.control:not(.stacked).size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;_button-block-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));font:var(&#8211;vvd-typography-base-bold)}.control:not(.stacked):not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}.control:not(.shape-pill){&#8211;_button-border-radius: 8px}.control:not(.shape-pill).size-condensed:not(.stacked),.control:not(.shape-pill).size-super-condensed:not(.stacked){&#8211;_button-border-radius: 4px}.control.shape-pill:not(.icon-only,.stacked.size-super-condensed,.stacked.size-condensed,.stacked.normal){&#8211;_button-border-radius: 24px}.control.shape-pill.stacked.size-condensed,.control.shape-pill.stacked.size-super-condensed{&#8211;_button-border-radius: 16px}.control.shape-pill.stacked.size-normal{&#8211;_button-border-radius: 20px}.control.shape-pill.icon-only{&#8211;_button-border-radius: 50%}.control.stacked{flex-direction:column;justify-content:center}.control.stacked.size-super-condensed{&#8211;stacked-size:calc(1px*(24 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 20px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-super-condensed:not(.icon-only){&#8211;_button-icon-gap: 4px;padding-inline:16px}.control.stacked.size-condensed{&#8211;stacked-size:calc(1px*(32 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 24px);font:var(&#8211;vvd-typography-base-condensed-bold)}.control.stacked.size-condensed:not(.icon-only){&#8211;_button-icon-gap: 6px;padding-inline:12px}.control.stacked.size-expanded{&#8211;stacked-size:calc(1px*(48 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 32px);font:var(&#8211;vvd-typography-base-extended-bold)}.control.stacked.size-expanded:not(.icon-only){&#8211;_button-icon-gap: 10px;padding-inline:20px}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed){&#8211;stacked-size:calc(1px*(40 + 4*clamp(-1, var(&#8211;vvd-size-density, 0), 2)));&#8211;_button-block-size: calc(var(&#8211;stacked-size) + 28px);font:var(&#8211;vvd-typography-base-bold)}.control.stacked:not(.size-condensed,.size-expanded,.size-super-condensed):not(.icon-only){&#8211;_button-icon-gap: 8px;padding-inline:16px}slot[name=icon]{line-height:1}.icon-trailing slot[name=icon]{display:flex;order:1}.control.stacked&gt;slot[name=icon]{font-size:calc(var(&#8211;stacked-size) / 2)}.control:not(.stacked)&gt;slot[name=icon]{font-size:calc(var(&#8211;_button-block-size) / 2)}:host(:not([icon])) .pending{position:absolute}:host(:not([icon])) .pending+.text{visibility:hidden}</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-innerhtml-html-LC33" class="blob-code blob-code-inner js-file-line">  &lt;/style&gt;&lt;slot name=&quot;form-associated-proxy&quot;&gt;&lt;/slot&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-innerhtml-html-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-innerhtml-html-LC34" class="blob-code blob-code-inner js-file-line">&lt;/div&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/2a99dea788eff825e9ec844e63eb1e60/raw/054439c2e94629e517babb8c5f574346ac7d5f23/innerHTML.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/2a99dea788eff825e9ec844e63eb1e60#file-innerhtml-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          innerHTML.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>This definitely might affect the component’s styling, since we are losing the encapsulation.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Explicitly_Render_Shadow_DOM_without_JavaScript"></span>How to Explicitly Render Shadow DOM without JavaScript?<span class="ez-toc-section-end"></span></h4>



<p>For this purpose, the HTML spec now defines a <code>shadowrootmode</code> attribute for the template tag. When the browser encounters <code>&lt;template shadowrootmode=”open”&gt;</code> it knows to take everything inside that template and render it inside a shadow DOM.</p>



<p>Using this knowledge, we can change our code as follows:</p>



<pre class="wp-block-code"><code>function appendOwnShadow(element) {
    const shadowTemplate = `&lt;template shadowrootmode="open"&gt;   ${element.shadowRoot.innerHTML}&lt;/template&gt;`;
    const tmpElement = document.createElement('div');
    tmpElement.innerHTML = shadowTemplate;
    element.appendChild(tmpElement.children&#91;0]);
}

Array.from(div.querySelectorAll(‘vwc-button’))
    .forEach(button =&gt; button.appendChild(appendOwnShadow(button)));</code></pre>



<p>It now renders like this:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="406" height="190" src="/wp-content/uploads/2024/05/image-6.png" alt="" class="wp-image-2022" srcset="/wp-content/uploads/2024/05/image-6.png 406w, /wp-content/uploads/2024/05/image-6.png 300w, /wp-content/uploads/2024/05/image-6.png 192w" sizes="auto, (max-width: 406px) 100vw, 406px" /></figure>



<p>Which is how we expected it to render! Hooray!</p>



<p>If you look at the DOM now, it looks like this:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="309" src="/wp-content/uploads/2024/05/image-16.png" alt="" class="wp-image-2032" srcset="/wp-content/uploads/2024/05/image-16.png 1194w, /wp-content/uploads/2024/05/image-16.png 300w, /wp-content/uploads/2024/05/image-16.png 1024w, /wp-content/uploads/2024/05/image-16.png 768w, /wp-content/uploads/2024/05/image-16.png 187w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>How cool is that? We rendered our web components server-side and prevented the layout shift in our app!</p>



<p>Let’s try to spice up our application.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Handling_Complex_Components"></span>Handling Complex Components<span class="ez-toc-section-end"></span></h2>



<p>The button we used was quite basic. Let’s try to use a button with an icon inside:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist130367776" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-buttons-with-icons-html" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-html  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="buttons-with-icons.html content, created by YonatanKra on 01:40PM on May 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="buttons-with-icons.html">
        <tr>
          <td id="file-buttons-with-icons-html-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-buttons-with-icons-html-LC1" class="blob-code blob-code-inner js-file-line">&lt;vwc-button icon=&quot;facebook-color&quot; label=&quot;ghost&quot; appearance=&quot;ghost&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-buttons-with-icons-html-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-buttons-with-icons-html-LC2" class="blob-code blob-code-inner js-file-line">&lt;vwc-button icon=&quot;linkedin-color&quot; label=&quot;ghost-light&quot; appearance=&quot;ghost-light&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-buttons-with-icons-html-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-buttons-with-icons-html-LC3" class="blob-code blob-code-inner js-file-line">&lt;vwc-button icon=&quot;twitter-color&quot; label=&quot;filled&quot; appearance=&quot;filled&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
        <tr>
          <td id="file-buttons-with-icons-html-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-buttons-with-icons-html-LC4" class="blob-code blob-code-inner js-file-line">&lt;vwc-button icon=&quot;instagram-color&quot; label=&quot;outlined&quot; appearance=&quot;outlined&quot;&gt;&lt;/vwc-button&gt;</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/88545258fe8ec7370ae5cc6d1cfdbfb0/raw/b60346c60a50242229932d11806cdef8699ddd7f/buttons-with-icons.html" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/88545258fe8ec7370ae5cc6d1cfdbfb0#file-buttons-with-icons-html" class="Link--inTextBlock" target="_blank" rel="noopener">
          buttons-with-icons.html
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>And it looks like this in the browser:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="402" height="270" src="/wp-content/uploads/2024/05/image-3.png" alt="" class="wp-image-2018" srcset="/wp-content/uploads/2024/05/image-3.png 402w, /wp-content/uploads/2024/05/image-3.png 300w, /wp-content/uploads/2024/05/image-3.png 134w" sizes="auto, (max-width: 402px) 100vw, 402px" /></figure>



<p>Something changed, but we can’t see any icons…</p>



<p>The HTML inside the button looks like this:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="309" src="/wp-content/uploads/2024/05/image-17.png" alt="" class="wp-image-2033" srcset="/wp-content/uploads/2024/05/image-17.png 1196w, /wp-content/uploads/2024/05/image-17.png 300w, /wp-content/uploads/2024/05/image-17.png 1024w, /wp-content/uploads/2024/05/image-17.png 768w, /wp-content/uploads/2024/05/image-17.png 186w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>We can see <code>vwc-icon</code> right there in the middle. We can see two problems here:</p>



<ol class="wp-block-list">
<li>The icon has no attributes &#8211; so it doesn’t really know how to render itself.&nbsp;</li>



<li>The icon has no content &#8211; mainly, no shadowroot</li>
</ol>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Solving_the_Icon_not_Getting_Attributes"></span>Solving the Icon not Getting Attributes<span class="ez-toc-section-end"></span></h3>



<p>Let’s solve the simpler issue. The icon gets its attributes from the button component. The template is rendered asynchronously. That means that after we add the <code>div</code> to the DOM, the actual update happens after another iteration of <a href="/the-event-loop-and-your-code/">the event loop</a>. So, we need to await the completion of the rendering process.</p>



<p>For this, we can set the template function to be async and await one event loop cycle:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>Notice we’ve added the magic <code>await new Promise(res =&gt; setTimeout(res));</code> in line 28. Because we changed the template method to be async, we also need to change our server function to be async and await the template:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>Now when we glimpse at our HTML we see the icon gets the attributes:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="143" src="/wp-content/uploads/2024/05/image-8.png" alt="" class="wp-image-2024" srcset="/wp-content/uploads/2024/05/image-8.png 644w, /wp-content/uploads/2024/05/image-8.png 300w, /wp-content/uploads/2024/05/image-8.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Loading_Internal_Components"></span>Loading Internal Components<span class="ez-toc-section-end"></span></h3>



<p>The second issue &#8211; because of which we do not see the icons &#8211; arise from the fact we do not get the shadowroot’s HTML of the internal components.</p>



<p>One way to fix this would be to find all the web components recursively and render them as well.</p>



<p>To find the components, we can traverse the DOM tree like this:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist130368064" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-getallnestedshadowrootsparents-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="getAllNestedShadowRootsParents.js content, created by YonatanKra on 01:58PM on May 21, 2024."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="getAllNestedShadowRootsParents.js">
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC1" class="blob-code blob-code-inner js-file-line">function getAllNestedShadowRootsParents(element) {</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC2" class="blob-code blob-code-inner js-file-line">    const nestedShadowRoots = [];</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC4" class="blob-code blob-code-inner js-file-line">    function traverseShadowRoot(node) {</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC5" class="blob-code blob-code-inner js-file-line">        if (node.shadowRoot) {</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC6" class="blob-code blob-code-inner js-file-line">            nestedShadowRoots.push(node);</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC7" class="blob-code blob-code-inner js-file-line">            node.shadowRoot.querySelectorAll(&#39;*&#39;).forEach(child =&gt; {</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC8" class="blob-code blob-code-inner js-file-line">                traverseShadowRoot(child);</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC9" class="blob-code blob-code-inner js-file-line">            });</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC10" class="blob-code blob-code-inner js-file-line">        } else {</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC11" class="blob-code blob-code-inner js-file-line">            Array.from(node.querySelectorAll(&#39;*&#39;)).forEach(child =&gt; traverseShadowRoot(child));</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC12" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC13" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC14" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC15" class="blob-code blob-code-inner js-file-line">    traverseShadowRoot(element);</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC16" class="blob-code blob-code-inner js-file-line">    return Array.from(new Set(nestedShadowRoots));</td>
        </tr>
        <tr>
          <td id="file-getallnestedshadowrootsparents-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-getallnestedshadowrootsparents-js-LC17" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/5092049caec303b06f913ee5a2a62735/raw/1fc8a421e0e797a781dfb9b9939857540e8a0270/getAllNestedShadowRootsParents.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/5092049caec303b06f913ee5a2a62735#file-getallnestedshadowrootsparents-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          getAllNestedShadowRootsParents.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>This function gets an element (supposedly our wrapping div) and gets all the web components with shadowDOM.</p>



<p>Now, all that’s left to do is parse each one of them in our template file:</p>



<p>Let’s do that:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<!-- Invalid Gist ID -->
</div></figure>



<p>Notice the change in line 54 &#8211; we’re going over all the elements with shadow DOM in reverse order and append a <code>shadowroot</code> template with their innerHTML for each of them.</p>



<p>The result is astounding:</p>



<figure class="wp-block-image"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="292" src="/wp-content/uploads/2024/05/image-10.png" alt="" class="wp-image-2026" srcset="/wp-content/uploads/2024/05/image-10.png 666w, /wp-content/uploads/2024/05/image-10.png 300w, /wp-content/uploads/2024/05/image-10.png 197w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>If you followed so far &#8211; good job! You got the basics of SSR.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Can_We_Serve_More"></span>Can We Serve More?<span class="ez-toc-section-end"></span></h2>



<p>Our simple SSR server can be optimized further. For instance, some things, such as the CSS and the icons’ SVGs, are still dependent on servers far away. We can add more logic to our SSR server to fetch them and inline them in the returned HTML.</p>



<p>More ideas can be taken from other SSR systems. For instance, react server components have a dedicated API to fetch and send requests to the server, which in turn requests the data and renders the needed view.</p>



<p>Qwik sets up service workers to fetch the JS in the background.</p>



<p>All of the SSR frameworks have many optimizations done for you, but they do not always fit your needs, so knowing how they work is a good start to extending them.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>That was quite a ride, wasn’t it?</p>



<p>Building an SSR mechanism is quite simple in essence, but it can always be improved, tweaked, and optimized. You might possibly find yourself maintaining a big codebase just to handle SSR.</p>



<p>You can choose to use nextjs (react), nuxtjs (vue) or some other SSR library. If you are using web components, SSR libraries like litssr or fastssr can take the heavy lifting from you.&nbsp;</p>



<p>One big caveat with these SSR frameworks or libraries is that they work only for the framework or library they were meant to work with.&nbsp;</p>



<p>Our use case was to build an SSR mechanism to work alongside <code>nuxt</code>. So you can call my code an SSR plugin. I hope this article gave you a hint on how to get started building a plugin like that if the need ever arises.&nbsp;</p>



<p>The commonality to all SSRs is that there is some rendering function. This function is used on your template and returns an HTML string that is sent to the client (well, except React Server Components that actually send a JSON &#8211; but that’s beyond the scope of this article).&nbsp;</p>



<p>Some of this HTML is <code>hydrated</code> later on after the JavaScript loads asynchronously, without blocking the page. In this article, we learned how to do it with web components and shadow DOM.</p>



<p>The fact we do not block the page with JS load helps us serve content faster, avoid heavy layout shifts, and possibly enhance our SEO ranking.</p>



<p>Thanks a lot to <a href="https://github.com/ealush" target="_blank" data-type="link" data-id="https://github.com/ealush" rel="noreferrer noopener">Evyatar Alush</a>, the Author of <a href="https://github.com/ealush/vest" target="_blank" data-type="link" data-id="https://github.com/ealush/vest" rel="noreferrer noopener">Vest</a>, for the kind and thorough review of this article.</p>

