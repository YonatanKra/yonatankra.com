---
title: The One Trick to Writing Effective Tests
slug: the-one-trick-to-writing-effective-tests
published: 2023-02-20T09:42:19
updated: 2023-02-20T09:49:50
author: Yonatan Kra
description: How do you know your test is effective? How do you know your test protects you from breaking changes? And how can you do TDD without doing TDD? The best distillment of TDD taken from a TDD workshop in JFokus. We all know that tests are good, right? Reduce regressions, and increase confidence. If done [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
tags: []
canonical: https://yonatankra.com/the-one-trick-to-writing-effective-tests/
comments: []
---


<p class="has-medium-font-size">How do you know your test is effective? How do you know your test protects you from breaking changes? And how can you do TDD without doing TDD? The best distillment of TDD taken from a TDD workshop in JFokus.</p>



<p>We all know that tests are good, right? Reduce regressions, and increase confidence. If <a href="/3-simple-habits-to-improve-your-tests/" data-type="post" data-id="1645">done right, they can be a live documentation for our code</a>. Many developers do write tests, and that is a day-brightening thought for me.</p>



<p>I&#8217;m not one to delude myself. Even though the benefits of TDD are well understood, I know most people do not practice TDD. I&#8217;ve been wondering what&#8217;s missing in After-the-Fact tests that usually make developers claim that tests are &#8220;useless&#8221;, &#8220;time-consuming&#8221; and have small to no value at all.</p>



<p>When I visited <a href="https://www.jfokus.se/schedule" target="_blank" rel="noreferrer noopener">JFokus</a>, the first workshop I went to was a TDD workshop ran by <a href="https://www.linkedin.com/in/raneland/" target="_blank" rel="noreferrer noopener">Raniz</a>. Besides being a brilliant workshop, one part caught me as it described something I’ve been trying to grasp for a long time: the essential part in writing a test!</p>



<p>This is what Raniz said:</p>



<div class="wp-block-image"><figure class="aligncenter"><img decoding="async" src="https://pbs.twimg.com/media/FoRl43WWQAEKtcU?format=jpg&amp;name=large" alt="Image"/><figcaption>TDD for cheaters, by Raniz </figcaption></figure></div>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b187d06" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b187d06"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/the-one-trick-to-writing-effective-tests/#What_is_the_problem_with_so_many_tests_that_Raniz_solves_here" >What is the problem with so many tests that Raniz solves here?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/the-one-trick-to-writing-effective-tests/#The_One_Trick_to_Write_Effective_Tests" >The One Trick to Write Effective Tests</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/the-one-trick-to-writing-effective-tests/#TDD_without_TDD" >TDD without TDD</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/the-one-trick-to-writing-effective-tests/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_the_problem_with_so_many_tests_that_Raniz_solves_here"></span>What is the problem with so many tests that Raniz solves here?<span class="ez-toc-section-end"></span></h2>



<p>The problem we are talking about is tests that do not really test.</p>



<p>Let me explain. When you write your code, and it works via manual test, you are happy. Then you write a test for this working code and expect it to work. Why, of course! The code is working!</p>



<p>What&#8217;s the problem with that? Let&#8217;s look at an example:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="212" src="/wp-content/uploads/2023/02/image-5.png" alt="" class="wp-image-1667" srcset="/wp-content/uploads/2023/02/image-5.png 1024w, /wp-content/uploads/2023/02/image-5.png 300w, /wp-content/uploads/2023/02/image-5.png 768w, /wp-content/uploads/2023/02/image-5.png 268w, /wp-content/uploads/2023/02/image-5.png 1458w, /wp-content/uploads/2023/02/image-5.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Test the <code>expandmode</code> API. The <code>multi</code> mode should allow both items to be expanded.</figcaption></figure></div>



<p>The test above looks logical. </p>



<ol class="wp-block-list"><li>We arrange the API to be in the right state &#8211; <code>element.expandMode = 'multi'</code>. </li><li>Act by changing the <code>expanded</code> state of the items to true. </li><li>We would expect both items to be true.</li></ol>



<p>But&#8230; (you expected a &#8220;But&#8221; here, right?)</p>



<p>This test will pass without any code. Why? Because we set the values of the items&#8217; expanded to <code>true</code> and expect them to be true. Hence, this should work even if we have an empty class! </p>



<p>Needless to say, this test will pass even if we change the <code>expandMode</code> to <code>single</code>.</p>



<p>Can you see the problem? Our test doesn&#8217;t really test anything except that setting something to true sets it to true.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_One_Trick_to_Write_Effective_Tests"></span>The One Trick to Write Effective Tests<span class="ez-toc-section-end"></span></h2>



<p>What Raniz distilled in his talk is the importance of failing a test. For any TDD practitioner, this is as obvious as the sun rising in the east, the north star shining in the north, and that Sith lords come in twos.</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/storage.googleapis.com/pai-images/upscaled_image-5c9330bb-9903-47f6-9610-b2baadc60e5a.png?w=640&#038;ssl=1" alt="pltn style, Master and apprentice sith lord, cute big circular reflective eyes, Pixar render, unreal engine cinematic smooth, intricate detail"/><figcaption>We all know they come in twos, right? Master and apprentice?</figcaption></figure></div>



<p>In our example, simply changing the state in the first line of the test case from <code>multi</code> to <code>single</code> would let us know if we are expecting the right thing.</p>



<p>Now, for those of you who are not writing tests before implementation, this is great news! </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="TDD_without_TDD"></span>TDD without TDD<span class="ez-toc-section-end"></span></h2>



<p>I like the phrase <code>TDD for Cheaters</code>. </p>



<p>Why? Because it allows developers to write more meaningful tests in a kind-of TDD fashion.</p>



<p>Just follow the steps outlined in the TDD for cheaters &#8220;algorithm&#8221;. How to write TDD after the fact:</p>



<ol class="wp-block-list"><li>Write the code</li><li>Comment it out</li><li>Write the test</li><li>See that it fails for the right reason</li><li>Make it pass</li><li>Refactor</li><li>Repeat (from step 3)</li></ol>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>The one trick to make sure your tests are solid is to make sure the test fails with the wrong conditions or when you delete the code that&#8217;s supposed to make it pass.</p>



<p>This one simple trick will prevent cases in which your test doesn&#8217;t really protect. Moreover, the wrong test can mislead a developer trying to understand how the API works.</p>



<p>Looking for more testing tips on how to write better tests? <a href="/category/testing/" data-type="URL" data-id="https://yonatankra.com/category/testing/">You can look here</a>.</p>



<p><em>Thanks a lot to <a href="https://www.linkedin.com/in/yishai-nachaliel-a36689129" data-type="URL" data-id="https://www.linkedin.com/in/yishai-nachaliel-a36689129" target="_blank" rel="noreferrer noopener">Yishai Nachliel</a> for the kind and thorough feedback.</em><br><br><br></p>

