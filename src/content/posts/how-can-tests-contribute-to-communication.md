---
title: How Can Tests Contribute to Communication?
slug: how-can-tests-contribute-to-communication
published: 2023-09-01T01:05:00
updated: 2023-09-01T11:30:14
author: Yonatan Kra
description: Tests can improve communication and save time (and frustration). Bad tests can do the opposite. In this article, we’ll explore an example from real life of how bad tests are harmful and how good ones convey the right information. A Tale About a Title In Vivid, we needed to add a title to our button. [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Meta Programming
    slug: meta-programming
    path: meta-programming
tags:
  - javascript
  - meta programming
  - soft skills
  - testing
canonical: https://yonatankra.com/how-can-tests-contribute-to-communication/
comments: []
---

<p class="has-medium-font-size">Tests can improve communication and save time (and frustration). Bad tests can do the opposite. In this article, we&#8217;ll explore an example from real life of how bad tests are harmful and how good ones convey the right information.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1a3a1967" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1a3a1967"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-can-tests-contribute-to-communication/#A_Tale_About_a_Title" >A Tale About a Title</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-can-tests-contribute-to-communication/#Lesson_1_Changing_the_Interface_is_a_Red_Flag" >Lesson #1: Changing the Interface is a Red Flag</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-can-tests-contribute-to-communication/#How_Bad_Tests_Lead_to_Bad_Code" >How Bad Tests Lead to Bad Code</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-can-tests-contribute-to-communication/#Mistake_2_You_Shall_Not_Pass_for_the_Right_Reason" >Mistake #2: You Shall Not Pass (for the Right Reason)</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-can-tests-contribute-to-communication/#Wrong_Reason_1_The_test_is_made_on_the_element_and_not_the_internal_button" >Wrong Reason #1: The test is made on the element and not the internal button</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-can-tests-contribute-to-communication/#Wrong_Reason_2_The_expectation_is_not_according_to_the_description" >Wrong Reason #2: The expectation is not according to the description</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-can-tests-contribute-to-communication/#Communication_is_Key" >Communication is Key</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-can-tests-contribute-to-communication/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_Tale_About_a_Title"></span>A Tale About a Title<span class="ez-toc-section-end"></span></h2>



<p>In <a href="https://vivid.deno.dev" data-type="URL" data-id="https://vivid.deno.dev" target="_blank" rel="noreferrer noopener">Vivid</a>, we needed to add a <code>title</code> to our <a href="https://vivid.deno.dev/components/button" data-type="URL" data-id="https://vivid.deno.dev/components/button" target="_blank" rel="noreferrer noopener">button</a>. It&#8217;s not that the button didn&#8217;t have one. Vivid is a web components based library, and inside our button element, there&#8217;s a hidden native button under the Shadow DOM. </p>



<p>This native button did not get its parent&#8217;s title, which was bad for <a href="https://en.wikipedia.org/wiki/Web_accessibility" target="_blank" data-type="URL" data-id="https://en.wikipedia.org/wiki/Web_accessibility" rel="noreferrer noopener">a11y</a>.</p>



<p>So&#8230; the task was pretty simple. Get a title from the host (the custom element) and reflect it on the internal button. Just like that: </p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="610" height="164" src="/wp-content/uploads/2023/08/image-8.png" alt="" class="wp-image-1788" srcset="/wp-content/uploads/2023/08/image-8.png 610w, /wp-content/uploads/2023/08/image-8.png 300w, /wp-content/uploads/2023/08/image-8.png 268w" sizes="auto, (max-width: 610px) 100vw, 610px" /><figcaption>The <code>vwc-button</code> element with a title reflecting it on the internal <code>button</code> element</figcaption></figure></div>



<p>We will use this example and follow its commit path to understand and learn how to avoid simple testing mistakes.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Lesson_1_Changing_the_Interface_is_a_Red_Flag"></span>Lesson #1: Changing the Interface is a Red Flag<span class="ez-toc-section-end"></span></h2>



<p>The first commit in this Pull Request meddled with the interface. Here&#8217;s the change in the test:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="96" src="/wp-content/uploads/2023/08/image-9.png" alt="" class="wp-image-1789" srcset="/wp-content/uploads/2023/08/image-9.png 1024w, /wp-content/uploads/2023/08/image-9.png 300w, /wp-content/uploads/2023/08/image-9.png 768w, /wp-content/uploads/2023/08/image-9.png 268w, /wp-content/uploads/2023/08/image-9.png 1496w, /wp-content/uploads/2023/08/image-9.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The test that was changed in the first commit</figcaption></figure></div>



<p>You can see that the test changed from <code>toBeFalsy</code> to &#8220;be equal to an empty string&#8221;. While not much of a change &#8211; it is a change. <code>toBeFalsy</code> can be many things (empty string, null, undefined, NaN, 0 and false). An empty string can be many things.</p>



<p>There are two errors in this case:</p>



<ol class="wp-block-list"><li>The Interface was not documented well enough, because <code>toBeFalsy</code> is too broad.</li><li>The interface was changed to <code>''</code> in the test for some reason.</li></ol>



<p>Here, the plot thickens. These two mistakes are just the appetizers for a loss of 24 hours of development. Let&#8217;s get to the main dish.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_Bad_Tests_Lead_to_Bad_Code"></span>How Bad Tests Lead to Bad Code<span class="ez-toc-section-end"></span></h2>



<p>A side story to this one is that while I was trying to help sort out the failing test, I was on the way back from a vacation. I know, excuses&#8230; but here&#8217;s what happened.</p>



<p>I looked at the test code using my phone and saw that the documented interface implied the <code>title</code> value was supposed to be an empty string.</p>



<p>&#8220;Why, of course it fails! The initial value is not an empty string. Just set it as an empty string, and it&#8217;ll work.&#8221;</p>



<p>So, the change was pretty easy. Just set the value in the constructor, and the test will pass:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="304" height="174" src="/wp-content/uploads/2023/08/image-10.png" alt="" class="wp-image-1790" srcset="/wp-content/uploads/2023/08/image-10.png 304w, /wp-content/uploads/2023/08/image-10.png 300w, /wp-content/uploads/2023/08/image-10.png 157w" sizes="auto, (max-width: 304px) 100vw, 304px" /><figcaption>Set the title as an empty string in the constructor</figcaption></figure></div>



<p>This fix worsened the issue we saw in the first mistake. Not only did we change the documentation &#8211; we also changed the actual interface. Yes, the tests passed,  but was it the right test? And how did such a simple thing cost us 24 hours of work? Let&#8217;s get to the second mistake.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Mistake_2_You_Shall_Not_Pass_for_the_Right_Reason"></span>Mistake #2: You Shall Not Pass (for the Right Reason)<span class="ez-toc-section-end"></span></h2>



<p>The interface change was just the first step. There was actual logic to implement, right? Here&#8217;s the test for the next implementation:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="355" src="/wp-content/uploads/2023/08/image-11.png" alt="" class="wp-image-1791" srcset="/wp-content/uploads/2023/08/image-11.png 660w, /wp-content/uploads/2023/08/image-11.png 300w, /wp-content/uploads/2023/08/image-11.png 162w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The first test that was written for the title addition</figcaption></figure></div>



<p>The first thing that pops up is the test&#8217;s description. The typo (missing <code>set</code> after the <code>not</code>) is the most prominent error there, but there&#8217;s something else.</p>



<p>The description is written in negative form. In science, you cannot prove that something does not exist. Because software falls into Computer <strong>Science</strong> we can look at it the same. Don&#8217;t tell me what it should not do &#8211; tell me what it should do.</p>



<p>The other two things that are even worse than the description lie in the test code itself. Take a minute to see if you find them.</p>



<p>&#8230;</p>



<p>&#8230;</p>



<p>Okay, the minute has passed. Did you find one or two more errors?</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Wrong_Reason_1_The_test_is_made_on_the_element_and_not_the_internal_button"></span>Wrong Reason #1: The test is made on the element and not the internal button<span class="ez-toc-section-end"></span></h3>



<p>I mentioned at the beginning our missing was to set the title on the internal button. This test doesn&#8217;t describe that scenario.</p>



<p>Can you see that the test is done on the <code>element</code>, and not the internal <code>button</code>? When I read the test, I assumed the author wanted the title to appear on the <code>element</code>. That&#8217;s the documentation. And that&#8217;s what I expect the component to do.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Wrong_Reason_2_The_expectation_is_not_according_to_the_description"></span>Wrong Reason #2: The expectation is not according to the description<span class="ez-toc-section-end"></span></h3>



<p>Another thing is that the expectation in this test is to have a title with an empty string. What we want to achieve is completely different &#8211; we want to remove the <code>title</code> attribute in such a case.</p>



<p>12 hours passed, and I was back home from my vacation, thinking about how to implement the code to comply with the given spec.</p>



<p>A few Slack messages confirmed my suspicions &#8211; the <code>title</code> attribute should be removed when the <code>title</code> is falsy. I did not doubt for a minute that the title should not be set on the element.</p>



<p>I changed the test a bit to make sure we&#8217;re on the right path:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="308" src="/wp-content/uploads/2023/08/image-12.png" alt="" class="wp-image-1792" srcset="/wp-content/uploads/2023/08/image-12.png 648w, /wp-content/uploads/2023/08/image-12.png 300w, /wp-content/uploads/2023/08/image-12.png 187w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A test with a better description and better expectation</figcaption></figure></div>



<p>Now, the expectation is to actually remove the attribute.</p>



<p>In order for it to pass, I had to change a few things in the component&#8217;s template and class. In the class, I had to override the <code>title</code> attribute (our class extends another basic Element class). I also had to set a converter that sets the value to <code>null</code> in the template, if the value is <code>falsy</code>, but leave it as a string if changed from the view itself:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="120" src="/wp-content/uploads/2023/08/image-13.png" alt="" class="wp-image-1793" srcset="/wp-content/uploads/2023/08/image-13.png 660w, /wp-content/uploads/2023/08/image-13.png 300w, /wp-content/uploads/2023/08/image-13.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Overriding the <code>title</code> property and setting a converter for it in the class</figcaption></figure></div>



<p>Everything worked as expected. I pushed and expected the praise from the PR author of how I saved her day. Or&#8230; not?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Communication_is_Key"></span>Communication is Key<span class="ez-toc-section-end"></span></h2>



<p>The expected slack message came in a few hours later. The contents of the message were less expected, though:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="113" src="/wp-content/uploads/2023/08/image-15.png" alt="" class="wp-image-1795" srcset="/wp-content/uploads/2023/08/image-15.png 1024w, /wp-content/uploads/2023/08/image-15.png 300w, /wp-content/uploads/2023/08/image-15.png 768w, /wp-content/uploads/2023/08/image-15.png 1536w, /wp-content/uploads/2023/08/image-15.png 2048w, /wp-content/uploads/2023/08/image-15.png 268w, /wp-content/uploads/2023/08/image-15.png 1280w, /wp-content/uploads/2023/08/image-15.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Wait, WAT?!?</figcaption></figure></div>



<p>And so started another slack correspondence. It was a short one, but in the end, that was my take:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="157" src="/wp-content/uploads/2023/08/image-16.png" alt="" class="wp-image-1796" srcset="/wp-content/uploads/2023/08/image-16.png 872w, /wp-content/uploads/2023/08/image-16.png 300w, /wp-content/uploads/2023/08/image-16.png 768w, /wp-content/uploads/2023/08/image-16.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>My shocked response after the new revelation the issue was with the internal button</figcaption></figure></div>



<p>The fix, as expected, was very small. I had to do the test both on the element as well as on the internal button (a.k.a. <code>control element</code>):</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="231" src="/wp-content/uploads/2023/08/image-17.png" alt="" class="wp-image-1797" srcset="/wp-content/uploads/2023/08/image-17.png 988w, /wp-content/uploads/2023/08/image-17.png 300w, /wp-content/uploads/2023/08/image-17.png 768w, /wp-content/uploads/2023/08/image-17.png 250w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The actual test</figcaption></figure></div>



<p>Now that we had a test in place, could also ensure our initial value will be more specific and according to the HTML spec (<code>null</code>):</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="38" src="/wp-content/uploads/2023/08/image-18.png" alt="" class="wp-image-1798" srcset="/wp-content/uploads/2023/08/image-18.png 1024w, /wp-content/uploads/2023/08/image-18.png 300w, /wp-content/uploads/2023/08/image-18.png 768w, /wp-content/uploads/2023/08/image-18.png 268w, /wp-content/uploads/2023/08/image-18.png 1240w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Back to HTML spec is safe ground for me</figcaption></figure></div>



<p>This simple fix took us 24 hours (yes, I know I was on vacation half that time, but excuses are for the weak 😉 ).  It could have been saved with better tests or better communication skills on my part.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Tests are meant to fail when you write code that doesn&#8217;t do what it&#8217;s supposed to do. Tests are also supposed to be a straightforward description of how things work. If the test says a title should be on the <code>element</code>, then these are the instructions for the implementor.</p>



<p>The interface is also guarded by tests. If the test doesn&#8217;t guard the interface correctly or tightly enough (as in the <code>toBeFalsy</code> instead of <code>toBeNull</code> example here), then we do not really know what to expect as developers and consumers of the interface. You can read more about the importance of interface testing <a href="/a-tale-of-implementation-and-detail/" data-type="post" data-id="1771">here</a>.</p>



<p>Good communication skills are important. Not everyone has them. Especially not in remote working environments. If we were coding together in person, this would not have taken so long. Our team works remotely (an international team), and the communication is usually &#8220;offline&#8221; &#8211; meaning there&#8217;s usually a delay in response.</p>



<p>Writing the tests correctly, with a clear description and a logic that describes how things <strong>should</strong> be helps mitigate such communication errors in the team.</p>



<p><em>Thanks a lot to <a href="https://www.rachelbt.co.il/" target="_blank" rel="noreferrer noopener">Rachel B. Tannenbaum</a>, <a href="https://developer.vonage.com/en/blog/authors/benjamin-aronov" data-type="URL" data-id="https://developer.vonage.com/en/blog/authors/benjamin-aronov" target="_blank" rel="noreferrer noopener">Benjamin Aronov</a>, and <a href="https://about.me/nickribal" target="_blank" data-type="URL" data-id="https://about.me/nickribal" rel="noreferrer noopener">Nick Ribal</a> for the kind and thorough review.</em></p>

