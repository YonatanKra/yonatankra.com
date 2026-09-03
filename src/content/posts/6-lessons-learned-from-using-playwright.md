---
title: 6 Lessons Learned from Using Playwright for UI Tests
slug: 6-lessons-learned-from-using-playwright
published: 2022-04-27T15:20:08
updated: 2022-06-07T09:41:25
author: Yonatan Kra
description: Here are 6 practical lessons learned from a production incident, ui-test coverage (using playwright) and code review. Today we had a small incident in production – one of my teammates found out a feature in one of our component doesn’t work. This is a small retro here for the value of ui-tests (using playwright, but not just) [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Coding
    slug: coding
    path: coding
  - name: Playwright
    slug: playwright
    path: testing/playwright
tags:
  - javascript
  - playwright
  - testing
canonical: https://yonatankra.com/6-lessons-learned-from-using-playwright/
comments: []
featuredImage: /wp-content/uploads/2022/04/little-girl-e-lessons.jpeg
---

<p class="has-medium-font-size">Here are 6 practical lessons learned from a production incident, ui-test coverage (using playwright) and code review.</p>



<p>Today we had a small incident in production &#8211; one of my teammates found out a feature in one of our component doesn&#8217;t work. This is a small retro here for the value of <code>ui-tests</code> (using playwright, but not just) and even <code>tdd</code> in ui-tests.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="49" src="/wp-content/uploads/2022/04/image.png" alt="" class="wp-image-1440" srcset="/wp-content/uploads/2022/04/image.png 1024w, /wp-content/uploads/2022/04/image.png 300w, /wp-content/uploads/2022/04/image.png 768w, /wp-content/uploads/2022/04/image.png 268w, /wp-content/uploads/2022/04/image.png 1286w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>What a nice slack message is that?</figcaption></figure></div>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b56ed1e" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b56ed1e"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/6-lessons-learned-from-using-playwright/#Debugging_the_Issue" >Debugging the Issue</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/6-lessons-learned-from-using-playwright/#How_to_NOT_write_a_ui_test" >How to NOT write a ui test</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/6-lessons-learned-from-using-playwright/#How_to_write_the_tests_in_Playwright" >How to write the tests in Playwright?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/6-lessons-learned-from-using-playwright/#Finding_the_truth_thanks_to_failing_tests" >Finding the truth thanks to failing tests</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/6-lessons-learned-from-using-playwright/#Summary_and_takeaways" >Summary and takeaways</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Debugging_the_Issue"></span>Debugging the Issue<span class="ez-toc-section-end"></span></h2>



<p>As noticable from the message above, in the banner component, the remove button stopped working. Quick debugging showed that there was a “typo” in the&nbsp;<code>scss</code>&nbsp;file:<br></p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="306" height="126" src="/wp-content/uploads/2022/04/image-1.png" alt="" class="wp-image-1441" srcset="/wp-content/uploads/2022/04/image-1.png 306w, /wp-content/uploads/2022/04/image-1.png 300w, /wp-content/uploads/2022/04/image-1.png 219w" sizes="auto, (max-width: 306px) 100vw, 306px" /><figcaption><code>&amp; .removing</code>&nbsp;instead of&nbsp;<code>&amp;.removing</code></figcaption></figure></div>



<p>The fix was easy, and manually testing this gave the wanted result &#8211; the element was removed with a nice transition animation.</p>



<p>So far, usual case. Can push my change and call it a day. The PR was even approved as it seemed to be working.</p>



<p>Then, my brain started yelling at me &#8211;&nbsp;&#8220;<code>this bug happened, you should test it!</code>&#8220;</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_NOT_write_a_ui_test"></span>How to NOT write a ui test<span class="ez-toc-section-end"></span></h2>



<p>So… because unit tests covered the functionality (e.g. if an event was emitted, things should happen), and this is clearly a CSS issue, I’ve written a ui-test using our <code>Ultra Marvelous Visual-Regression Behavior-Testing Playwright System</code>. </p>



<p>This test made sure that after clicking the removal button, the element’s height is just like it should be from CSS.&nbsp; <br></p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="377" src="/wp-content/uploads/2022/04/image-2.png" alt="" class="wp-image-1442" srcset="/wp-content/uploads/2022/04/image-2.png 996w, /wp-content/uploads/2022/04/image-2.png 300w, /wp-content/uploads/2022/04/image-2.png 768w, /wp-content/uploads/2022/04/image-2.png 153w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A piece of code that gets the remove button and element, it then clicks the remove button and eventually after the element is not visible, makes sure its height is 0, as expected from the CSS</figcaption></figure></div>



<p>And it worked (a.k.a. tests are green) but… I forgot what was really supposed to happen! </p>



<p>During the code review,&nbsp;the reviewer mentioned the test should be “remove from DOM” and not “see that height is 0”. </p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="199" src="/wp-content/uploads/2022/04/image-4.png" alt="" class="wp-image-1444" srcset="/wp-content/uploads/2022/04/image-4.png 1024w, /wp-content/uploads/2022/04/image-4.png 300w, /wp-content/uploads/2022/04/image-4.png 768w, /wp-content/uploads/2022/04/image-4.png 268w, /wp-content/uploads/2022/04/image-4.png 1364w, /wp-content/uploads/2022/04/image-4.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Reviewer noticing something that was not noticed before &#8211; the remove is not hide!</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_write_the_tests_in_Playwright"></span>How to write the tests in Playwright?<span class="ez-toc-section-end"></span></h2>



<p>Nice catch! Let&#8217;s just change the test. </p>



<p><code>Playwright</code>&nbsp;exposes the&nbsp;<code>locator</code>&nbsp;API that keeps track of the count of elements in the DOM with the wanted selector:</p>



<pre class="wp-block-preformatted">const element = await page.locator('vwc-banner');
numberOfBannerElementsNow = await element.count();</pre>



<p>How cool is that? Now the test looks like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2022/04/image-3.png" alt="" class="wp-image-1443" width="640" height="311" srcset="/wp-content/uploads/2022/04/image-3.png 1012w, /wp-content/uploads/2022/04/image-3.png 300w, /wp-content/uploads/2022/04/image-3.png 768w, /wp-content/uploads/2022/04/image-3.png 185w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Now the test awaits until the element is detached from the page and makes sure the banner elements count is zero using playwright&#8217;s locator API.</figcaption></figure></div>



<p>aaaaaaand…. it failed…</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Finding_the_truth_thanks_to_failing_tests"></span>Finding the truth thanks to failing tests<span class="ez-toc-section-end"></span></h2>



<p>The test that was supposed to be my salvation failed.</p>



<p>But why? Manual test showed that the animation worked and we could not see the banner!</p>



<p>The reason is this &#8211; the element was never removed from the DOM (expected 0, but got 1 &#8211; classic!).</p>



<p>Debugging this I found out that the element was listening to the&nbsp;<code>animationend</code> event, but the&nbsp;<code>css</code>&nbsp;was was using <code>transition</code> for animation!&nbsp; Hence,&nbsp;<code>animationend</code>&nbsp;will NEVER fire!</p>



<p>So, changing&nbsp;<code>animationend</code>&nbsp;to&nbsp;<code>transitionend</code>&nbsp;made the test pass:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="62" src="/wp-content/uploads/2022/04/image-5.png" alt="" class="wp-image-1448" srcset="/wp-content/uploads/2022/04/image-5.png 1024w, /wp-content/uploads/2022/04/image-5.png 300w, /wp-content/uploads/2022/04/image-5.png 768w, /wp-content/uploads/2022/04/image-5.png 268w, /wp-content/uploads/2022/04/image-5.png 1120w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event" target="_blank" data-type="URL" data-id="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationend_event" rel="noreferrer noopener">animationend</a></code> and <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event" target="_blank" data-type="URL" data-id="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event" rel="noreferrer noopener">transitionend</a></code> replacement.  <code>animationend</code> fires when CSS animation finishes. <code>transitionend</code> fires when an animation that uses the CSS <code>transition</code> property ends.</figcaption></figure></div>



<p>I also needed to change the implementation detail of the preparation phase in the unit tests, but that was just like changing&nbsp;<code>animationend</code>&nbsp;to&nbsp;<code>transitionend</code>&nbsp;in one place.</p>



<p>You can view the full PR <a href="https://github.com/Vonage/vivid-3/pull/336" target="_blank" data-type="URL" data-id="https://github.com/Vonage/vivid-3/pull/336" rel="noreferrer noopener">here</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary_and_takeaways"></span>Summary and takeaways<span class="ez-toc-section-end"></span></h2>



<p>Here are the lessons I learned from this incident:You can practice TDD in ui-tests. It is even beneficial (I would have written the test better at onset as well as noticed the&nbsp;<code>animation -&gt; transition</code>&nbsp;issue faster)</p>



<p>There are a few lessons that I&#8217;d like to share from this incident.</p>



<p>First of all, it was the first time I saw how one can practice TDD in ui-tests. Until today, I always thought of ui tests as just testing the final styling implementation. This case shows how beneficial that can be: I would have written the test better at onset as well as noticed the&nbsp;<code>animation -&gt; transition</code>&nbsp;issue faster.</p>



<p>Unit tests and ui-tests (e2e or however you call them) are complementary.  We have 100% unit tests coverage, but when it comes to test integration with the browser ui-tests are there to give the whole picture.</p>



<p>When fixing a bug, always write a test that covers that bug &#8211; don&#8217;t let a bug happen twice!!!</p>



<p>Another piece of knowledge is that there is a difference between transition and animation events. Be aware&#8230;</p>



<p>As for the <code>playwright</code> API, prefer the playwright&nbsp;<code>locator</code>&nbsp;API instead of the&nbsp;<code>$</code>&nbsp;api &#8211; it has features that make testing much easier and more intuitive.</p>



<p>Finally, tests are good for us! Enjoy them!</p>



<p>Thanks to writing a test and not just sharing a fix, we, as a team, managed to find a bigger bug and prevent the occurrence of said bug in the future.</p>



<p>Tests are good for us! Enjoy them!</p>



<p><em>Thanks a lot to <a href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank" rel="noreferrer noopener">Miki Ezra Stanger</a>&nbsp; the kind and thorough review!</em></p>



<p><em>Featured Photo by <a href="https://unsplash.com/@scamartist?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Carl Jorgensen</a> on <a href="https://unsplash.com/s/photos/lessons?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></em></p>

