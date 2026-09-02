---
title: How to Create a Chrome Extension?
slug: how-to-create-a-chrome-extension
published: 2022-08-21T06:54:49
updated: 2022-08-21T07:03:43
author: Yonatan Kra
description: Did you know you can improve your (and your colleagues’) life by developing chrome extensions? Keren Kenzi showed how to do it in Fullstack Exchange 2022 In Fullstack Exchange 2022, Keren Kenzi gave an excellent talk about a chrome extension she built. What I like in Kenzi’s talk is that it doesn’t really matter what [&hellip;]
categories:
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - chrome extensions
  - javascript
canonical: https://yonatankra.com/how-to-create-a-chrome-extension/
comments: []
---

<p class="has-medium-font-size">Did you know you can improve your (and your colleagues&#8217;) life by developing chrome extensions? Keren Kenzi showed how to do it in Fullstack Exchange 2022</p>



<p>In Fullstack Exchange 2022, Keren Kenzi gave <a href="https://skillsmatter.com/skillscasts/17683-keren-kenzi" data-type="URL" data-id="https://skillsmatter.com/skillscasts/17683-keren-kenzi" target="_blank" rel="noreferrer noopener">an excellent talk about a chrome extension</a> she built. What I like in Kenzi&#8217;s talk is that it doesn&#8217;t really matter what the extension is doing &#8211; what matters is that in less than fifteen minutes, Keren live-coded a fully working chrome extension.</p>



<p>I love demos like these. You can take this demo, and because getting something up and running is so fast, you can start playing with it.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b483c16" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b483c16"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-create-a-chrome-extension/#What_are_the_Steps_Needed_to_Build_a_Chrome_Extension" >What are the Steps Needed to Build a Chrome Extension?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-create-a-chrome-extension/#Create_a_Folder_and_Git_Project" >Create a Folder and Git Project</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-create-a-chrome-extension/#The_Chrome_Extension_manifestjson_File" >The Chrome Extension manifest.json File</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-create-a-chrome-extension/#How_to_Run_Your_Extension_Locally" >How to Run Your Extension Locally</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-create-a-chrome-extension/#How_to_Set_Chrome_Extension_Icons" >How to Set Chrome Extension Icons?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-create-a-chrome-extension/#How_to_Add_a_Description_to_a_Chrome_Extension" >How to Add a Description to a Chrome Extension?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-create-a-chrome-extension/#How_to_Add_a_Popup_to_a_Chrome_Extension" >How to Add a Popup to a Chrome Extension?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-create-a-chrome-extension/#Use_the_Chrome_API_to_Change_the_Extensions_Badge" >Use the Chrome API to Change the Extension&#8217;s Badge</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-create-a-chrome-extension/#Where_to_go_from_here" >Where to go from here?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-create-a-chrome-extension/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_are_the_Steps_Needed_to_Build_a_Chrome_Extension"></span>What are the Steps Needed to Build a Chrome Extension?<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Create_a_Folder_and_Git_Project"></span>Create a Folder and Git Project<span class="ez-toc-section-end"></span></h3>



<p>That&#8217;s easy&#8230; I&#8217;ll create a folder and call it &#8211; the-best-extension:</p>



<p>`mkdir the-best-extension &amp;&amp; cd the-best-extension &amp;&amp; git init`</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Chrome_Extension_manifestjson_File"></span>The Chrome Extension <code>manifest.json</code> File<span class="ez-toc-section-end"></span></h3>



<p>The first file in a chrome extension is the <code>manifest.json</code> file. Let&#8217;s create this file with the following content:</p>



<pre class="wp-block-code"><code>{
    "name": "The Best Extension",
    "version": "0.1",
    "manifest_version": 3
}</code></pre>



<p>The <code>name</code> field is quite self explanatory. </p>



<p>The <code>version</code> field states the version of the extension. This way, chrome will know when to update the extension for users when you update your extension&#8217;s code.</p>



<p>The <code>manifest_version</code> states how chrome should parse the file. We will focus on version 3 &#8211; the latest version at the time of writing this post.</p>



<p>And&#8230; that&#8217;s kind of it. We created an extension 🙂</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Run_Your_Extension_Locally"></span>How to Run Your Extension Locally<span class="ez-toc-section-end"></span></h3>



<p>Browse to the extension manager in chrome:</p>



<p class="has-text-align-center"><code>chrome://extensions/</code></p>



<p> If you are using the Brave brave browser, just replace <code>chrome</code> with <code>brave</code>:</p>



<p class="has-text-align-center"><code>brave://extensions/</code></p>



<p>(You can copy the relevant URL to your browser)</p>



<p>On this page, you have a switch to activate Developer mode at the top right of the screen. Activate it.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="342" height="102" src="/wp-content/uploads/2022/08/image-1.png" alt="" class="wp-image-1576" srcset="/wp-content/uploads/2022/08/image-1.png 342w, /wp-content/uploads/2022/08/image-1.png 300w, /wp-content/uploads/2022/08/image-1.png 268w" sizes="auto, (max-width: 342px) 100vw, 342px" /><figcaption>The Developer mode switch</figcaption></figure></div>



<p>You will have several new options to manage your extensions when you do that. We will now use the <code>Load unpacked</code> button.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="178" src="/wp-content/uploads/2022/08/image.png" alt="" class="wp-image-1575" srcset="/wp-content/uploads/2022/08/image.png 806w, /wp-content/uploads/2022/08/image.png 300w, /wp-content/uploads/2022/08/image.png 768w, /wp-content/uploads/2022/08/image.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The new options added when switching Developer mode on</figcaption></figure></div>



<p>When you click the <code>Load unpacked</code> button, you will be prompted to browse for the extension&#8217;s folder. Once you select the folder, if the <code>manifest.json</code> is correct, you should see the extension in the list of extensions:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="330" src="/wp-content/uploads/2022/08/image-2.png" alt="" class="wp-image-1577" srcset="/wp-content/uploads/2022/08/image-2.png 1024w, /wp-content/uploads/2022/08/image-2.png 300w, /wp-content/uploads/2022/08/image-2.png 768w, /wp-content/uploads/2022/08/image-2.png 1536w, /wp-content/uploads/2022/08/image-2.png 175w, /wp-content/uploads/2022/08/image-2.png 1684w, /wp-content/uploads/2022/08/image-2.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The Best Extension version 0.1 is live (top-left)! Hooray!</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Set_Chrome_Extension_Icons"></span>How to Set Chrome Extension Icons?<span class="ez-toc-section-end"></span></h3>



<p>Our extension, despite being the best, is rather boring. If I stick it to the extensions list on the toolbar:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="865" src="/wp-content/uploads/2022/08/image-3.png" alt="" class="wp-image-1578" srcset="/wp-content/uploads/2022/08/image-3.png 688w, /wp-content/uploads/2022/08/image-3.png 222w, /wp-content/uploads/2022/08/image-3.png 67w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The Best Extension is now pinned to the toolbar. You can see the &#8220;T&#8221; icon was added to the toolbar at the top of the screenshot.</figcaption></figure></div>



<p>But that&#8217;s rather boring. We want to add our own icon. Keren shows us how to do it in her video. We should add an image to our repository and add a reference to it from our <code>manifest.json</code>:</p>



<pre class="wp-block-code"><code>{
    "name": "The Best Extension",
    "version": "0.1",
    "manifest_version": 3,
    "action": {
        "default_icon": "coffee_mug.png"
    },
    "icons": {
        "128": "coffee_mug.png"
    }
}</code></pre>



<p>Two things were added to the <code>manifest</code> file:</p>



<p><code>action.default_icon</code> &#8211; this changes the icon in the tool bar.</p>



<p><code>icons.128</code> &#8211; this changes the icon in the extensions manager.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="500" src="/wp-content/uploads/2022/08/image-5.png" alt="" class="wp-image-1580" srcset="/wp-content/uploads/2022/08/image-5.png 1024w, /wp-content/uploads/2022/08/image-5.png 300w, /wp-content/uploads/2022/08/image-5.png 768w, /wp-content/uploads/2022/08/image-5.png 115w, /wp-content/uploads/2022/08/image-5.png 1188w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The new &#8220;actions.default_icon&#8221; (red arrow) and &#8220;icons.128&#8221; (orange arrow)</figcaption></figure></div>



<p>You can add more icon sizes for various screen resolutions. You can read more about it <a href="https://developer.chrome.com/docs/extensions/mv3/manifest/icons/" target="_blank" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/mv3/manifest/icons/" rel="noreferrer noopener">here</a>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Add_a_Description_to_a_Chrome_Extension"></span>How to Add a Description to a Chrome Extension?<span class="ez-toc-section-end"></span></h3>



<p>Extensions also have descriptions in the extension manager:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="181" src="/wp-content/uploads/2022/08/image-6.png" alt="" class="wp-image-1581" srcset="/wp-content/uploads/2022/08/image-6.png 800w, /wp-content/uploads/2022/08/image-6.png 300w, /wp-content/uploads/2022/08/image-6.png 768w, /wp-content/uploads/2022/08/image-6.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Our Best Extension is lacking a description. The Accessibility Insights for Web looks much more informative.</figcaption></figure></div>



<p>In order to add a description we will add the <code>description</code> property to our <code>manifest.json</code> file:</p>



<pre class="wp-block-code"><code>{
    "name": "The Best Extension",
    "version": "0.1",
    "manifest_version": 3,
    "action": {
        "default_icon": "coffee_mug.png"
    },
    "icons": {
        "128": "coffee_mug.png"
    },
    "description": "This is the best extension! Ever!"
}</code></pre>



<p>The description property accepts a string that will be displayed in our extension:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="371" height="209" src="/wp-content/uploads/2022/08/image-7.png" alt="" class="wp-image-1582" srcset="/wp-content/uploads/2022/08/image-7.png 371w, /wp-content/uploads/2022/08/image-7.png 300w, /wp-content/uploads/2022/08/image-7.png 160w" sizes="auto, (max-width: 371px) 100vw, 371px" /><figcaption>Our extension now has a description!</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Add_a_Popup_to_a_Chrome_Extension"></span>How to Add a Popup to a Chrome Extension?<span class="ez-toc-section-end"></span></h3>



<p>Our extension sure looks awesome &#8211; but it does nothing&#8230; we&#8217;d like to create some friendly UI for its control screen like other extensions have:</p>



<p></p>



<p>The first thing to do is to create an <code>HTML</code> file. Let&#8217;s create the <code>popup.html</code> file with the following content:</p>



<pre class="wp-block-code"><code>&lt;html&gt;
    &lt;head&gt;
        &lt;link rel="stylesheet" href="vivid/styles/themes/light.css"/&gt;
        &lt;link rel="stylesheet" href="vivid/styles/fonts/spezia.css"/&gt;
        &lt;script src="vivid/index.js" type="module"&gt;&lt;/script&gt;
        &lt;style&gt;
            body {
                width: 250px;
                height: 125px;
                text-align: center;
            }

            vwc-textfield {
                text-align: left;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;vwc-layout column-basis="block"&gt;
            &lt;vwc-text-field max-length="4" appearance="filled" label="name"&gt;&lt;/vwc-text-field&gt;
            &lt;vwc-button appearance="filled" label="Submit"&gt;&lt;/vwc-button&gt;
        &lt;/vwc-layout&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>



<p>In this file, I import our UI components library <code>vivid</code> (I copied it to our folder after installing it using <code>npm i @vonage/vivid@next</code>). The great thing about <code>vivid</code> is that it is a web components library &#8211; so it adds custom DOM elements without needing a framework like React, Angular, or Vue.</p>



<p>I also set some styles to the page and then in the body add the HTML of a text-field and a button. </p>



<p>Now we need to set our popup in the <code>manifest.json</code>:</p>



<pre class="wp-block-code"><code>{
    "name": "The Best Extension",
    "version": "0.1",
    "manifest_version": 3,
    "action": {
        "default_icon": "coffee_mug.png",
        "default_popup": "popup.html"
    },
    "icons": {
        "128": "coffee_mug.png"
    },
    "description": "This is the best extension! Ever!"
}</code></pre>



<p>Notice the <code>default_popup</code> that was added to the <code>action</code> property.</p>



<p>It now looks like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="285" height="195" src="/wp-content/uploads/2022/08/image-8.png" alt="" class="wp-image-1583" srcset="/wp-content/uploads/2022/08/image-8.png 285w, /wp-content/uploads/2022/08/image-8.png 132w" sizes="auto, (max-width: 285px) 100vw, 285px" /><figcaption>Our Extension&#8217;s popup</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Use_the_Chrome_API_to_Change_the_Extensions_Badge"></span>Use the Chrome API to Change the Extension&#8217;s Badge<span class="ez-toc-section-end"></span></h3>



<p>We can add and change the extension&#8217;s icon badge using the extensions API. We already know how to add JavaScript to the popup (using a simple <code>script</code> tag). Let&#8217;s add a new JavaScript file <code>popup.js</code>:</p>



<pre class="wp-block-code"><code>const button = document.querySelector('vwc-button');
const textField = document.querySelector('vwc-text-field');
button.addEventListener('click', () =&gt; {
    const textValue = textField.value ? textField.value : 'NONE';
    chrome.action.setBadgeText({
        text: textValue.toUpperCase()
    });
    chrome.action.setBadgeBackgroundColor({
        color: 'green'
    });
});</code></pre>



<p>This script works as follows: </p>



<ol class="wp-block-list"><li>Get handles to the button and the text-field.</li><li>Set an event listener on the button click</li><li>On click <ol><li>get the value from the text field or set the default &#8220;NONE&#8221;</li><li>Set the badge text to <code>textValue</code></li><li>Change the badge background to green</li></ol></li></ol>



<p>Note that the badge text is limited to 4 characters. We&#8217;ve set the <code>max-length</code> property of the <code>text-field</code> to 4 so that users will not enter more than four characters (if there are more, only the first four will be shown in the badge). </p>



<p>In order to use the file, we will add the following line before the closing <code>&lt;/body&gt;</code> of our <code>popup.html</code> file:</p>



<p class="has-text-align-center"><code>&lt;script src="popup.js"&gt;&lt;/script&gt;</code></p>



<p>Now the badge will show when we click on the submit button:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="272" height="185" src="/wp-content/uploads/2022/08/image-9.png" alt="" class="wp-image-1584" srcset="/wp-content/uploads/2022/08/image-9.png 272w, /wp-content/uploads/2022/08/image-9.png 132w" sizes="auto, (max-width: 272px) 100vw, 272px" /><figcaption>Our green Badgy</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Where_to_go_from_here"></span>Where to go from here?<span class="ez-toc-section-end"></span></h2>



<p>We now have our extension with its popup and changing badge. That&#8217;s awesome!</p>



<p>But extensions can do so much more. Here are some useful examples: </p>



<ul class="wp-block-list"><li>You can inject scripts to a page or a frame inside a page using <a href="https://developer.chrome.com/docs/extensions/reference/scripting/" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/reference/scripting/" target="_blank" rel="noreferrer noopener">the <code>scripting</code> API</a></li><li>You can create <a href="https://developer.chrome.com/docs/extensions/reference/alarms" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/reference/alarms" target="_blank" rel="noreferrer noopener">alarms</a>(timers) that will trigger <a href="https://developer.chrome.com/docs/extensions/mv3/service_workers/#react" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/mv3/service_workers/#react" target="_blank" rel="noreferrer noopener">listeners</a> in <a href="https://developer.chrome.com/docs/extensions/mv3/service_workers/" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/mv3/service_workers/" target="_blank" rel="noreferrer noopener">service workers</a> (<a href="https://skillsmatter.com/skillscasts/17683-keren-kenzi" target="_blank" data-type="URL" data-id="https://skillsmatter.com/skillscasts/17683-keren-kenzi" rel="noreferrer noopener">watch Keren&#8217;s talk</a> to see her live example)</li><li><a href="https://developer.chrome.com/docs/extensions/reference/contextMenus/" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/reference/contextMenus/" target="_blank" rel="noreferrer noopener">Add options to the chrome context menu</a></li></ul>



<p>And so much more. I urge you to watch Keren&#8217;s talk for a great live explanation.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Creating a chrome extension is easy and can be fun. If you have an idea that can better your or some else&#8217;s life &#8211; just do it.</p>



<p>If you are interested in some inspiration and haven&#8217;t already, <a href="https://skillsmatter.com/skillscasts/17683-keren-kenzi" data-type="URL" data-id="https://skillsmatter.com/skillscasts/17683-keren-kenzi" target="_blank" rel="noreferrer noopener">watch Keren&#8217;s talk</a> now. </p>



<p>If you want to browse the extensions&#8217; docs, <a href="https://developer.chrome.com/docs/extensions/reference/" target="_blank" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/reference/" rel="noreferrer noopener">click here</a>.</p>



<p>If you build anything nice &#8211; I&#8217;d love to see it.</p>

