---
title: How to easily setup a fullstack react and react-native project in 8 minutes?
slug: fullstack-react-native-project-in-8-minutes
published: 2021-12-28T20:12:02
updated: 2021-12-29T14:43:43
author: Yonatan Kra
description: Setup a fully working fullstack express, react and react-native environment in 8 minutes. We will do it with Nx, express, react and react native. Lately I’ve been part of the organizing team for the Vonage TLV hackathon. A member of the team thought it would be great to create short “how to” videos that will [&hellip;]
categories:
  - name: nx
    slug: nx
    path: javascript/nx
  - name: Javascript
    slug: javascript
    path: javascript
  - name: nodejs
    slug: nodejs
    path: javascript/nodejs
tags: []
canonical: https://yonatankra.com/fullstack-react-native-project-in-8-minutes/
comments: []
---


<p class="has-medium-font-size">Setup a fully working fullstack express, react and react-native environment in 8 minutes. We will do it with Nx, express, react and react native.</p>



<p>Lately I&#8217;ve been part of the organizing team for the Vonage TLV hackathon.  A member of the team thought it would be great to create short &#8220;how to&#8221; videos that will help teams to get up and running real quick.  I created a video on how to setup a fullstack react and react-native project.  Surprisingly, it was really quick!</p>



<p>If you want to watch the video, here it is:</p>



<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/u8QCvrHVZCU?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en-US&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b826ba1" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b826ba1"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/fullstack-react-native-project-in-8-minutes/#How_to_setup_the_fullstack_web_and_mobile_project" >How to setup the fullstack web and mobile project?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/fullstack-react-native-project-in-8-minutes/#How_to_add_react-native_to_an_Nx_monorepo" >How to add react-native to an Nx monorepo?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/fullstack-react-native-project-in-8-minutes/#Adding_more_tech_stacks" >Adding more tech stacks</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/fullstack-react-native-project-in-8-minutes/#Known_issues" >Known issues:</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/fullstack-react-native-project-in-8-minutes/#AndroidiOs_apps_fail_during_build_right_after_a_clean_install" >Android/iOs apps fail during build right after a clean install</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/fullstack-react-native-project-in-8-minutes/#Error_Failed_to_install_the_app_Please_accept_all_necessary_Android_SDK_licenses_using_Android_SDK_Manager" >Error: Failed to install the app. Please accept all necessary Android SDK licenses using Android SDK Manager</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/fullstack-react-native-project-in-8-minutes/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_setup_the_fullstack_web_and_mobile_project"></span>How to setup the fullstack web and mobile project?<span class="ez-toc-section-end"></span></h2>



<p>The project is hosted here: https://github.com/YonatanKra/nx-fullstack-mobile</p>



<p>These are the steps taken in the video:</p>



<ol class="wp-block-list"><li>Run <code>npx create-nx-workspace@latest</code></li><li>Type a project name</li><li>Select the right project for you. In our case, I’ll select React + Express, but you can mix and match everything later on</li><li><code>cd</code> into the project</li><li>The project created holds an api application with a single entry point in <code>apps/api</code><ol><li>Run it with <code>npm start api</code></li><li>You can create a node library by running: <code>nx g @nrwl/node:library</code></li><li>You will then be able to import it into your apps (see the <code>api</code> library in the project).</li></ol></li><li>It also holds a react application<ol><li>Run it with <code>npm start &lt;my-app-name&gt;</code></li><li>You can create a component for the app like this:<br><code>nx g @nrwl/react:component --project=&lt;my-project-name&gt;</code></li><li>Create shared libraries for react with this command:<br><code>nx g @nrwl/react:library</code></li></ol></li></ol>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_add_react-native_to_an_Nx_monorepo"></span>How to add react-native to an Nx monorepo?<span class="ez-toc-section-end"></span></h2>



<ol class="wp-block-list"><li>Let’s add <code>react-native</code> :<ol><li>Install the <code>react-native</code> plugin: <code>npm i @nrwl/react-native -D</code></li><li>Create a <code>react-native</code> app: <code>nx g @nrwl/react-native:application</code></li></ol></li><li>We can also build components and libraries just like we did with node and react apps:<ol><li><code>nx g @nrwl/react-native:component</code></li><li><code>nx g @nrwl/react-native:library</code></li></ol></li><li>Run the app using:<ol><li><code>npm run nx run-android &lt;app-name&gt;</code></li><li><code>npm run nx run-ios &lt;app-name&gt;</code></li></ol></li><li>You can build apps by using the <code>npm run build &lt;app-name&gt;</code><ol><li>This will create a dist folder with your built app in it</li></ol></li><li>You can set environment variables for every app in its environment files and use them in the application. Check the <code>environments</code> folder in each app. Here&#8217;s an <a href="https://github.com/YonatanKra/nx-fullstack-mobile/tree/main/apps/api/src/environments" target="_blank" data-type="URL" data-id="https://github.com/YonatanKra/nx-fullstack-mobile/tree/main/apps/api/src/environments" rel="noreferrer noopener">example</a>.</li><li>There are many more commands and options and you can read more about them in the <a href="https://nx.dev/l/n/getting-started/intro" target="_blank" data-type="URL" data-id="https://nx.dev/l/n/getting-started/intro" rel="noreferrer noopener">official Nx documentation</a>.</li></ol>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Adding_more_tech_stacks"></span>Adding more tech stacks<span class="ez-toc-section-end"></span></h2>



<p>You can easily add angular, vue, nest, python, go etc. by using nx plugins. </p>



<p>Head over to the <a href="https://nx.dev" target="_blank" data-type="URL" data-id="https://nx.dev" rel="noreferrer noopener">nx website</a> and browse the available plugins and <a href="https://nx.dev/community#community-plugin-list" target="_blank" data-type="URL" data-id="https://nx.dev/community#community-plugin-list" rel="noreferrer noopener">community plugins</a>.  </p>



<p>You can also use the <code>nx list</code> command to show available plugins:</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="815" src="/wp-content/uploads/2021/12/image-10.png" alt="Nx plugins list for fullstack development" class="wp-image-1343" srcset="/wp-content/uploads/2021/12/image-10.png 804w, /wp-content/uploads/2021/12/image-10.png 236w, /wp-content/uploads/2021/12/image-10.png 768w, /wp-content/uploads/2021/12/image-10.png 1207w, /wp-content/uploads/2021/12/image-10.png 71w, /wp-content/uploads/2021/12/image-10.png 1282w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>An insane list of plugins</figcaption></figure></div>



<p>Pro tip: You are sometimes better off searching for “nx” and the name of the plugin you are looking on google.  If it is not listed in the official Nx plugins list, it might still exist. That&#8217;s how I found the Nx Python plugin.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Known_issues"></span>Known issues:<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="AndroidiOs_apps_fail_during_build_right_after_a_clean_install"></span>Android/iOs apps fail during build right after a clean install<span class="ez-toc-section-end"></span></h3>



<p>Make sure you have xCode and Android Studio installed.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Error_Failed_to_install_the_app_Please_accept_all_necessary_Android_SDK_licenses_using_Android_SDK_Manager"></span>Error: Failed to install the app. Please accept all necessary Android SDK licenses using Android SDK Manager<span class="ez-toc-section-end"></span></h3>



<p>Go to android studio -&gt; tools -&gt; sdk manager -&gt; sdk tools&nbsp;</p>



<p>Install the sdk cli tool</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In this short tutorial we saw how we can build a fullstack mobile and web application in a few easy steps.  </p>



<p>Nx is packed full of super useful generators that will help you kick-start your project and boost your work on it. However, Nx doesn&#8217;t end with generating code; It&#8217;s a very potent tool for managing monorepos in general. You can manage an army of microservices and apps of all kinds in one place.</p>



<p>I hope you enjoyed this one and that you are ready for your next &#8220;quick coding&#8221; challenge. If you want to know more about Nx, you can read them on the Nx official website. I&#8217;ve written a few articles about it &#8211; you can <a href="/category/javascript/nx/" data-type="URL" data-id="https://yonatankra.com/category/javascript/nx/">read them here</a>.</p>



<p>Thanks a lot to <a href="https://www.linkedin.com/in/tweinfeld" target="_blank" data-type="URL" data-id="https://www.linkedin.com/in/tweinfeld" rel="noreferrer noopener">Tal Weinfeld</a> and <a href="https://www.linkedin.com/in/maor-elimelech-45139417" target="_blank" data-type="URL" data-id="https://www.linkedin.com/in/maor-elimelech-45139417" rel="noreferrer noopener">Maor Elimelech</a> for the kind and thorough review.</p>

