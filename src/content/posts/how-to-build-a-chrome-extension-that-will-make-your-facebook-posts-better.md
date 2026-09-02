---
title: How to Build a Chrome Extension that will Make Your Facebook Posts Better?
slug: how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better
published: 2022-08-31T20:30:52
updated: 2022-09-01T06:31:07
author: Yonatan Kra
description: How to build a chrome extension, manipulate and interact with a page and publish it to the Chrome Web Store? Here’s how I created a Chrome extension that enables me to style the text in my posts and comments – and how you can do it too I post on Facebook occasionally. I guess many [&hellip;]
categories:
  - name: jest
    slug: jest
    path: testing/jest
  - name: Testing
    slug: testing
    path: testing
tags: []
canonical: https://yonatankra.com/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/
comments: []
---


<p class="has-medium-font-size">How to build a chrome extension, manipulate and interact with a page and publish it to the Chrome Web Store? Here&#8217;s how I created a Chrome extension that enables me to style the text in my posts and comments &#8211; and how you can do it too</p>



<p>I post on Facebook occasionally. I guess many other people do that too. Sometimes, I want to emphasize a particular word or phrase in my posts. I got used to tools such as Slack or Google docs, where I press <code>ctrl/cmd + b</code>, and my text turns <strong>bold</strong>.</p>



<p>On Facebook, it doesn&#8217;t work. The solutions I found were to go to a website, paste your phrase, click on a button to change your text to bold, copy it, and paste it back on Facebook.</p>



<p>That is tiresome. I&#8217;m a developer &#8211; there must be a better way, right?</p>



<p>A week ago, I published <a href="/how-to-create-a-chrome-extension/" data-type="post" data-id="1565">an article inspired by Keren Kenzi&#8217;s talk on how to build a chrome extension</a>. I promised I would build something useful with it and couldn&#8217;t find the time, but some of you readers contacted me to ask what&#8217;s with my project &#8211; so here it is now. A chrome extension to help you write bold text on Facebook posts and comments (even messenger, Twitter, and LinkedIn work&#8230;).</p>



<p>If you are not into the technical stuff &#8211; you can <a href="https://chrome.google.com/webstore/detail/social-styled-text/djfiljkiflkjpdlefbdigfeaiomeeafo" target="_blank" data-type="URL" data-id="https://chrome.google.com/webstore/detail/social-styled-text/djfiljkiflkjpdlefbdigfeaiomeeafo" rel="noreferrer noopener">grab the extension here</a>.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b4705a4" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b4705a4"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#How_did_I_Build_the_Social_Text_Style_Chrome_Extension" >How did I Build the Social Text Style Chrome Extension?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#How_to_Setup_Testing_Infrastructure_for_a_Chrome_Extension" >How to Setup Testing Infrastructure for a Chrome Extension?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#Test_a_Click_Event_in_a_Chrome_Extension" >Test a Click Event in a Chrome Extension</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#How_to_Trigger_a_Script_on_the_Current_Tab" >How to Trigger a Script on the Current Tab?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#How_to_Make_a_Text_Bold" >How to Make a Text Bold?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#How_to_Use_Our_Extension_Locally" >How to Use Our Extension Locally?</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#A_manifestjson_file" >A manifest.json file</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#A_popuphtml_file" >A popup.html file</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#Test_the_Extension_Locally" >Test the Extension Locally</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#How_to_publish_the_chrome_extension" >How to publish the chrome extension?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-build-a-chrome-extension-that-will-make-your-facebook-posts-better/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_did_I_Build_the_Social_Text_Style_Chrome_Extension"></span>How did I Build the Social Text Style Chrome Extension?<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Setup_Testing_Infrastructure_for_a_Chrome_Extension"></span>How to Setup Testing Infrastructure for a Chrome Extension?<span class="ez-toc-section-end"></span></h3>



<p>After creating a folder, initiating it with <code>git init</code> and <code>npm init</code>, I installed some needed dependencies:</p>



<p><code>npm i -D jest babel-jest @babel/core @babel/plugin-transform-module-commonjs jest-environment-jsdom sinon-chrome</code></p>



<p>These are all <code>devDependencies</code> needed for testing our code.</p>



<p>Then we need to configure <code>babel</code> and <code>jest</code> to work nicely together:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="505" src="/wp-content/uploads/2022/08/image-10.png" alt="" class="wp-image-1596" srcset="/wp-content/uploads/2022/08/image-10.png 1024w, /wp-content/uploads/2022/08/image-10.png 300w, /wp-content/uploads/2022/08/image-10.png 768w, /wp-content/uploads/2022/08/image-10.png 1536w, /wp-content/uploads/2022/08/image-10.png 114w, /wp-content/uploads/2022/08/image-10.png 1584w, /wp-content/uploads/2022/08/image-10.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Babel and Jest configuration. See the commit <a href="https://github.com/YonatanKra/social-styled-text/commit/6f0d418fe889bd25f0a2e417506fd71638722380" target="_blank" data-type="URL" data-id="https://github.com/YonatanKra/social-styled-text/commit/6f0d418fe889bd25f0a2e417506fd71638722380" rel="noreferrer noopener">here</a></figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Test_a_Click_Event_in_a_Chrome_Extension"></span>Test a Click Event in a Chrome Extension<span class="ez-toc-section-end"></span></h3>



<p>Our extension is going to be simple for now. We will have a <code>boldenizer</code> button. On click, we will get the selected text and replace it with a <code>bold</code> version of it.</p>



<p>Our first test is going to look like this:</p>



<pre class="wp-block-code"><code>describe(`popup`, function () {
    it(`should set a listener on the bolderize button`, async function () {
        document.body.innerHTML = '&lt;button class="bolderize"&gt;Bolderize&lt;/button&gt;';
        const bolderizeButton = document.querySelector('.bolderize');
        const originalAddEventListener = bolderizeButton.addEventListener;
        const spy = jest.fn();
        jest.spyOn(bolderizeButton, 'addEventListener').mockImplementation((eventName, _) =&gt; {
            originalAddEventListener(eventName, spy);
        });
        await import('./popup.js');
        bolderizeButton.click();
        expect(spy).toHaveBeenCalled();
    });
});</code></pre>



<p>In the code above, we are testing our extension&#8217;s popup script. The first test is simple &#8211; it should set a listener on a <code>bolderize</code> button.</p>



<p>We create the needed HTML (a button with a class <code>bolderize</code>). We then mock the <code>addEventListener</code> and set a mock implementation in its stead. What it does is set our spy instead of any callback set in the <code>addEventListener</code>. This way, we can expect our spy to be called when the button is clicked.</p>



<p>The <code>await import ('./popup.js')</code> acts as calling our script via a <code>script</code> tag (as we would do in our HTML file).</p>



<p>Running the test with a simple <code>jest</code> command fails because <code>jest</code> cannot do dynamic imports on its own (with <code>node 16</code>, at least). Adding <code>NODE_OPTIONS=--experimental-vm-modules</code> solves this issue.</p>



<p>See the commit <a href="https://github.com/YonatanKra/social-styled-text/commit/434e23945f7aad43a4786ae35f0b92cbfdbabbef" target="_blank" data-type="URL" data-id="https://github.com/YonatanKra/social-styled-text/commit/434e23945f7aad43a4786ae35f0b92cbfdbabbef" rel="noreferrer noopener">here</a>.</p>



<p>Now that the test fails for a real reason, we can work on the code that makes it pass. In our <code>popup.js</code> file, we add the following code:</p>



<pre class="wp-block-code"><code>const button = document.querySelector('.bolderize');
button.addEventListener('click', () =&gt; {

});</code></pre>



<p>As simple as that, the test passes, and everybody&#8217;s happy. A small refactor to our tests would make it much more straightforward for future developers:</p>



<pre class="wp-block-code"><code>describe(`popup`, function () {
    it(`should set a listener on the bolderize button`, async function () {
        setButtonInPage();
        const bolderizeButton = document.querySelector('.bolderize');
        const spy = spyOnClickCallback(bolderizeButton);
        await import('./popup.js');

        bolderizeButton.click();
        
        expect(spy).toHaveBeenCalled();
    });
});</code></pre>



<p>The test I wrote at first was a bit clumsy. With the power of refactoring, I made it more welcoming to others. See the commit <a href="https://github.com/YonatanKra/social-styled-text/commit/1f43abcb08949e5209f4d8f6ffc289b4ab34795e" data-type="URL" data-id="https://github.com/YonatanKra/social-styled-text/commit/1f43abcb08949e5209f4d8f6ffc289b4ab34795e" target="_blank" rel="noreferrer noopener">here</a>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Trigger_a_Script_on_the_Current_Tab"></span>How to Trigger a Script on the Current Tab?<span class="ez-toc-section-end"></span></h3>



<p>A little <code>Chrome API</code> voodoo comes into play now. <code><a href="https://developer.chrome.com/docs/extensions/reference/tabs/#method-query" data-type="URL" data-id="https://developer.chrome.com/docs/extensions/reference/tabs/#method-query" target="_blank" rel="noreferrer noopener">chrome.tabs.query</a></code> is the API that allows us to query for open tabs and get their IDs. You could, for instance, find all the tabs with a certain URL (which can be super handy). For us, all we need is the current tab, so we need to call it like this:</p>



<p class="has-text-align-center"><code>chrome.tabs.query({active: true, currentWindow: true})</code></p>



<p>Here&#8217;s what we want to happen:</p>



<pre class="wp-block-code"><code>    it(`should work on current tab`, async function () {
        jest.spyOn(chrome.tabs, 'query');

        setButtonInPage();
        const bolderizeButton = document.querySelector('.bolderize');
        await import('./popup.js');

        bolderizeButton.click();

        expect(chrome.tabs.query).toHaveBeenCalledWith({active: true, currentWindow: true}, expect.any(Function));
    });</code></pre>



<p>We want our code to work on our current tab. It has the value of giving us the tab&#8217;s ID for future use. We are going to mock Chrome&#8217;s API here using <code>jest.spy</code>. We make the same move of adding a button, importing our script, and clicking the button. We eventually wish the query to be called with the object that ensures we are on the current tab.</p>



<p>Here&#8217;s <a href="https://github.com/YonatanKra/social-styled-text/commit/5a7f3856dbde609e43c151bd8b37c4c4f2fc9cb1" target="_blank" data-type="URL" data-id="https://github.com/YonatanKra/social-styled-text/commit/5a7f3856dbde609e43c151bd8b37c4c4f2fc9cb1" rel="noreferrer noopener">the commit for this test</a>.</p>



<p>The implementation is simple:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="154" src="/wp-content/uploads/2022/08/image-14.png" alt="" class="wp-image-1610" srcset="/wp-content/uploads/2022/08/image-14.png 1024w, /wp-content/uploads/2022/08/image-14.png 300w, /wp-content/uploads/2022/08/image-14.png 768w, /wp-content/uploads/2022/08/image-14.png 268w, /wp-content/uploads/2022/08/image-14.png 1386w, /wp-content/uploads/2022/08/image-14.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The lines that were added to make the &#8220;current tab&#8221; test pass</figcaption></figure></div>



<p>While working on the implementation, I couldn&#8217;t make it work. I found out I made a mistake and had to fix the <code>addEventListener</code> mock to also call the original callback &#8211; otherwise, our wonderful script doesn&#8217;t run at all. Whoopsy&#8230;</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="74" src="/wp-content/uploads/2022/08/image-12.png" alt="" class="wp-image-1598" srcset="/wp-content/uploads/2022/08/image-12.png 1024w, /wp-content/uploads/2022/08/image-12.png 300w, /wp-content/uploads/2022/08/image-12.png 768w, /wp-content/uploads/2022/08/image-12.png 1536w, /wp-content/uploads/2022/08/image-12.png 268w, /wp-content/uploads/2022/08/image-12.png 1914w, /wp-content/uploads/2022/08/image-12.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Adding the call to the original callback of the click listener</figcaption></figure></div>



<p>You can find the full commit <a href="https://github.com/YonatanKra/social-styled-text/commit/172a43a826aae1f2d199986c9eb4637a1c0ee18c" target="_blank" data-type="URL" data-id="https://github.com/YonatanKra/social-styled-text/commit/172a43a826aae1f2d199986c9eb4637a1c0ee18c" rel="noreferrer noopener">here</a>.</p>



<p>Now that everything&#8217;s passing, a small refactor is in order for the tests. The following lines repeat themselves:</p>



<pre class="wp-block-code"><code>setButtonInPage();
const bolderizeButton = document.querySelector('.bolderize');</code></pre>



<p><a href="https://github.com/YonatanKra/social-styled-text/commit/44d54328bcdd3d912f80f604ba2bc5ce943ed0e3" target="_blank" data-type="URL" data-id="https://github.com/YonatanKra/social-styled-text/commit/44d54328bcdd3d912f80f604ba2bc5ce943ed0e3" rel="noreferrer noopener">This commit</a> just extracted them to a <code>beforeEach</code> statement.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Make_a_Text_Bold"></span>How to Make a Text Bold?<span class="ez-toc-section-end"></span></h3>



<p>We will not go over the implementation in detail, but it is pretty straightforward and can be seen in the <a href="https://github.com/YonatanKra/social-styled-text/commit/f5158c4537fe25f7a1a6f5d51a68bc240ea232ab" target="_blank" rel="noreferrer noopener">implementation commit</a>. The file <code>utils/bolderizeWord.js</code> holds all of the <code>bolding</code> logic. It is an implementation detail, so no tests are written for this file &#8211; its effects are tested in the public API.</p>



<p>What we would like to focus is the usage of the <code>executeScipt</code> API.</p>



<figure class="wp-block-image"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/cdn-images-1.medium.com/max/800/0%2AWjUswcBQFOJ0A9MD.png?w=640&#038;ssl=1" alt=""/></figure>



<p>We need to send it a configuration object and an optional callback. </p>



<p>The object must contain a <code>target</code>property which is a tab ID. We get this from the <code>tabs.query</code> we already have in place. </p>



<p>It also optionally accepts a <code>func</code> property &#8211; a function we write to run on the page (just like you&#8217;d run it in the console). There are a few more options that you can read about in the docs.</p>



<p>The optional callback returns the result from the function we sent it to execute via the <code>func</code> attribute. This callback runs in the context of our popup, so we cannot use DOM manipulation of the page the user interacts with.</p>



<p>The <code>getSelectionText</code> function looks like this:</p>



<pre class="wp-block-code"><code>function getSelectionText() {<br>    return window.getSelection().toString();<br>}</code></pre>



<p>Remember it runs in the context of the page the user is visiting right now (for instance &#8211; facebook).</p>



<p>The callback for this script execution looks like this:</p>



<pre class="wp-block-code"><code>function(results) {<br>            const boldValues = bolderizeWord(results&#91;0].result);<br>            chrome.scripting.executeScript( {<br>                target: {tabId},<br>                func: modifySelection,<br>                args: &#91;boldValues]<br>            });<br>          }</code></pre>



<p><code>results[0].result</code> is the selected text sent to us from <code>getSelectionText</code>. We use this to get the bold version of the text and send it to another <code>executionScript</code> call. This time &#8211; it will run the <code>modifySelection</code> function that will replace our selected text with the bold one.</p>



<p>Notice the <code>args</code> property &#8211; an array of arguments to send to the <code>func</code> function. Hence, <code>modifySelection</code> looks like this:</p>



<pre class="wp-block-code"><code>function modifySelection(newValue) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const clone = range.cloneRange();

    range.endContainer.textContent = range.endContainer.textContent.replace(range.cloneContents().textContent, newValue);

    selection.addRange(clone);
}</code></pre>



<p>It accepts the <code>newValue</code> &#8211; which is the bold text &#8211; and replaces the selected value in the page with the bold value.</p>



<p>See the full file <a href="https://github.com/YonatanKra/social-styled-text/blob/c7725b18ed63f0aa83d4f9a7b5974a69ee4fdd01/ui/popup.js" target="_blank" rel="noreferrer noopener">here</a>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Use_Our_Extension_Locally"></span>How to Use Our Extension Locally?<span class="ez-toc-section-end"></span></h3>



<p>Our extension is not yet an extension. We need a few more things to make it so.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="A_manifestjson_file"></span>A manifest.json file<span class="ez-toc-section-end"></span></h4>



<p>I’ll dive into the essential parts here. You can read <a href="/how-to-create-a-chrome-extension/" target="_blank" rel="noreferrer noopener">the former article</a> about the basics. We will populate the file with the following:</p>



<pre class="wp-block-code"><code>{<br>  "name": "Social Styled Text",<br>  "version": "0.1",<br>  "manifest_version": 3,<br>  "action": {<br>    "default_icon": "assets/images/bold-option.png",<br>    "default_popup": "ui/popup.html"<br>  },<br>  "icons": {<br>    "128": "assets/images/bold-option.png"<br>  },<br>  "description": "This extension allows you to add bold text to facebook posts",<br>  "permissions": &#91;<br>    "scripting",<br>    "activeTab"<br>  ]<br>}</code></pre>



<p>We tell the extension where to look for the <code>popup.html</code> file, and the icons. We also describe the permissions &#8211; <code>scripting</code> and <code>activeTab</code> in this case &#8211; otherwise, chrome would not let our <code>query</code> and <code>executeScript</code> run. Each API requires a different permission, as stated in the documentation.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="A_popuphtml_file"></span>A <code>popup.html</code> file<span class="ez-toc-section-end"></span></h4>



<p>We stated the location of the popup file — so we will create it there and set its content:</p>



<pre class="wp-block-code"><code>&lt;html&gt;
&lt;head&gt;
    &lt;style&gt;
        body {
            width: 100px;
            padding: 25px;
            text-align: center;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;button class="bolderize"&gt;Bolderize&lt;/button&gt;
    &lt;script type="module" src="popup.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>



<p>It simply adds a button with the class <code>bolderize</code> and imports the <code>popup.js</code> &#8211; much like what we did in our&#8230; test&nbsp;🙂</p>



<p>I also added the image file (bold-option.png) to the repository, but that doesn’t require too much explaining.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Test_the_Extension_Locally"></span>Test the Extension Locally<span class="ez-toc-section-end"></span></h4>



<p>This was explained in detail <a href="/how-to-create-a-chrome-extension/#How_to_Run_Your_Extension_Locally" target="_blank" rel="noreferrer noopener">here</a>. In essence, you should open the extension manager in the browser and turn <code>Developer mode</code> on. Then you will have a button to load an extension from a local folder. When I do that, my extension will be installed, and I&#8217;ll be able to use it:</p>



<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-4-3 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/uAi3zCc31Tc?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en-US&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div><figcaption>The Boldenizer button in action on Facebook</figcaption></figure>



<p>The fun thing is — this trick works in every social network. I tried it on Twitter and LinkedIn too. Check it out&nbsp;🙂</p>



<p><a href="https://github.com/YonatanKra/social-styled-text" rel="noreferrer noopener" target="_blank">See the full code in the repository</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_publish_the_chrome_extension"></span>How to publish the chrome extension?<span class="ez-toc-section-end"></span></h2>



<p>This is actually the easy part. Just head over to <a href="https://chrome.google.com/webstore/developer/dashboard" target="_blank" rel="noreferrer noopener">https://chrome.google.com/webstore/developer/dashboard</a> and follow <a href="https://developer.chrome.com/docs/webstore/publish/" target="_blank" rel="noreferrer noopener">the instructions</a>. Note it costs 5$ to open a Chrome Web Store account, but once your extension is out there — it’s the best 5$ you will ever invest. Ok — except for that delicious Waffle with ice cream and melted chocolate…</p>



<p>Just a small note to save you frustration &#8211; average approval time for new extensions is three days. If you require more complex permissions (like file system) &#8211; you&#8217;d might have to wait longer.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>This was a somewhat hacky TDD demonstration. There are some other tests I could have done to make me feel better about my code. Testing my HTML to ensure the button exists (integration-test) could come in handy.</p>



<p>More features can obviously be added to the extension, like more languages (it currently supports only English and numbers), more styles (italic, underline, strikethrough, etc.), design, documentation, and more.</p>



<p>If you want to help, feel free to contribute to<a href="https://github.com/YonatanKra/social-styled-text" target="_blank" rel="noreferrer noopener"> the repository</a>. As always, feel free to reach out with questions in the comments or on social media.</p>



<p><em>Thanks a lot to <a href="https://www.linkedin.com/in/michal-porag-9522b5142/" data-type="URL" data-id="https://www.linkedin.com/in/michal-porag-9522b5142/" target="_blank" rel="noreferrer noopener">Michal Porag</a> from <a href="https://pullrequest.co.il/" data-type="URL" data-id="https://pullrequest.co.il/" target="_blank" rel="noreferrer noopener">Pull Request</a> and <em><a href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank" rel="noreferrer noopener">Miki Ezra Stanger</a></em></em> <em>for the kind and thorough review of this article</em></p>

