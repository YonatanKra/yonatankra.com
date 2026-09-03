---
title: Musings about tests as documentation
slug: musings-about-tests-as-documentation
published: 2021-01-16T09:07:28
updated: 2021-08-10T16:53:37
author: Yonatan Kra
description: "This post originated from a non-english post on Linkedin. Here’s a translation of the original post: Yes, it’s very important to me that the systems I develop are covered by tests. In this approach I trust that external libraries that I use in the system have been tested. A few times I’ve read about how [&hellip;]"
categories:
  - name: Musings
    slug: musings
    path: musings
  - name: Testing
    slug: testing
    path: testing
tags:
  - culture
  - musings
  - testing
canonical: https://yonatankra.com/musings-about-tests-as-documentation/
comments: []
featuredImage: /wp-content/uploads/2021/01/musingDocumentation.jpg
---

<p>This post originated from a non-english post on Linkedin. Here&#8217;s a translation of the original post:</p>



<figure class="wp-block-pullquote"><blockquote><p>Yes, it&#8217;s very important to me that the systems I develop are covered by tests.</p><p>In this approach I trust that external libraries that I use in the system have been tested.</p><p>A few times I’ve read about how high quality tests are a part of the documentation of the source code.</p><p>Recently I realized what I&#8217;m missing.</p><p>If tests are part of the documentation, then how come I don’t know about any tool that can convert tests to documentation?</p><p>What are the recommended rules for writing tests that will also document the system so that it can be understood what the component under test does?</p><p>How can programmers on the team be encouraged to read others’ tests as a document of what the latter wrote (and perhaps create a feedback process that will improve the verbal part of the test)?</p><p>If tests are really part of the system documentation, then what gain do we get from the tests covering the libraries I use, after all, the tests are not part of the content that you look at when reading external library code (somewhat related to the first section)?</p><p>No, I&#8217;m not offering a solution. I continue to look for sources and knowledge.</p><cite>HOD BAUER&#8217;S <a href="https://www.linkedin.com/posts/hod-bauer-9786133b_%D7%9B%D7%9F-%D7%9E%D7%90%D7%95%D7%93-%D7%97%D7%A9%D7%95%D7%91-%D7%9C%D7%99-%D7%A9%D7%99%D7%94%D7%99%D7%95-%D7%98%D7%A1%D7%98%D7%99%D7%9D-%D7%9C%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA-%D7%A9%D7%90%D7%A0%D7%99-activity-6751503486422192128-7aaC" target="_blank" rel="noreferrer noopener">LINKEDIN POST</a></cite></blockquote></figure>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<div class="wp-block-group is-layout-flow wp-block-group-is-layout-flow"><div class="wp-block-group__inner-container"></div></div>
</div></div>



<p>I&#8217;ve written a very long answer and I thought it might be of interest to others (and future me 🙂 ).</p>



<p>I admit that most questions in this field have more than one &#8220;right&#8221; answer, but I hope mine will help others define their own &#8220;right&#8221; answer or enlighten me as to their &#8220;right&#8221; answer.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d207e32" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d207e32"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/musings-about-tests-as-documentation/#Tests_as_documentation" >Tests as documentation</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/musings-about-tests-as-documentation/#Rule_of_thumb_for_writing_tests" >Rule of thumb for writing tests</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/musings-about-tests-as-documentation/#Tests_documentation_culture" >Tests documentation culture</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/musings-about-tests-as-documentation/#How_does_reading_tests_can_help_me_as_a_user_of_a_library" >How does reading tests can help me as a user of a library?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/musings-about-tests-as-documentation/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Tests_as_documentation"></span>Tests as documentation<span class="ez-toc-section-end"></span></h2>



<p>There is no tool I know of that can convert tests to documentation. I believe the reason for this is because the test is code. If there was a tool that could convert code to documentation, we would not have needed stuff like jsdoc comments.  Actually &#8211; we might not even need developers in this case&#8230;</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="276" height="183" src="/wp-content/uploads/2021/01/image.jpeg" alt="File:Terminator in Madame Tussaud London (33465711484).jpg - Wikimedia  Commons" class="wp-image-795" srcset="/wp-content/uploads/2021/01/image.jpeg 276w, /wp-content/uploads/2021/01/image.jpeg 136w" sizes="auto, (max-width: 276px) 100vw, 276px" /><figcaption>We might not even need developers if software could understand and write software&#8230;</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Rule_of_thumb_for_writing_tests"></span>Rule of thumb for writing tests<span class="ez-toc-section-end"></span></h2>



<p>Tests can be used as low level documentation. What does that mean? Let&#8217;s look at an example: </p>



<ul class="wp-block-list"><li>I read a certain test called: <code>should return true if array has elements</code>. </li><li>A good test will test the function just like a user would. I should be able to see what&#8217;s being sent to the function and that way I can see how to use the function. The API and the usage are just there in front of me.</li><li>In addition, I should be able to see the system state that will lead to the desired result. This way, the &#8220;production code&#8221; can be easily understood.</li></ul>



<p>Therefore the rule of thumb is to focus on API testing. Don&#8217;t oil every screw. That&#8217;s a little abstract advice, I know, but it comes with a practice. Like all the skills you acquire in life (end of fortune cookie).</p>



<figure class="wp-block-image"><img decoding="async" src="https://images.unsplash.com/photo-1572081607214-0de94760c0ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="fortune cookies"/><figcaption>Focus on API testing. It will come with practice. Like all skills you acquire in life.<br>Photo by <a href="https://unsplash.com/@merittthomas?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Meritt Thomas</a> on <a href="https://unsplash.com/s/photos/fortune-cookie?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Tests_documentation_culture"></span>Tests documentation culture<span class="ez-toc-section-end"></span></h2>



<p>The process of writing tests should be entwined with the code readability process:</p>



<ul class="wp-block-list"><li>Write a failed test</li><li>Write code that makes the test pass</li><li>Refactor tests for readability</li><li>Make sure all tests are still passing</li><li>Refactor the business logic code for readability</li><li>Make sure all tests are still passing</li><li>Repeat the process</li></ul>



<p>If there is an option of Pair Programming it can be a good way to do practice a testing culture. For example, the driver writes the tests and the navigator makes them pass. The navigator may tell the driver to write both the test and the code that passes and then change place. They might be in the same role without switching. Anyway, there are a few processes going on here:</p>



<ul class="wp-block-list"><li>There is teamwork</li><li>The code review is already done during the process of writing the code</li><li>There&#8217;s someone reading the tests </li></ul>



<p>There are other bonuses for exercises like this. I&#8217;m not suggesting to do it all the time, but exercises like Pair Programming can accustom the team to reading each other&#8217;s code &#8211; including the tests. </p>



<p>Another way to push things is by personal example.  Someone on the team, as a personal example, starts sending snippets from the tests as a response to  &#8220;what does this code do?&#8221;  questions. </p>



<p>If the tests are written according to the above mentioned rules, the snippets should show exactly what that function does and will satisfy as an answer. This will start to catch on (and if not, you can use authority and tell people to start doing it that way).</p>



<figure class="wp-block-image"><img decoding="async" src="https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="three woman performing traditional dance"/><figcaption>You can find ways to develop your own testing culture. You will find it is the same as building your R&amp;D culture.<br>Photo by <a href="https://unsplash.com/@cgram2000?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">pavan gupta</a> on <a href="https://unsplash.com/s/photos/culture?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_does_reading_tests_can_help_me_as_a_user_of_a_library"></span>How does reading tests can help me as a user of a library?<span class="ez-toc-section-end"></span></h2>



<p>The main purpose of tests is not documentation. It&#8217;s a bonus that comes with writing good tests. The main purpose of tests is to prevent regression with code changes. All other bonuses come with good test writing. </p>



<p>Unfortunately, many times the tests written are not good and therefore cannot be used as a documentary. </p>



<p>I personally read a lot of the tests of the libraries I use &#8211; partly because it often helps me understand how they work but also because if you want to contribute to an open source project, you need to know how to write tests for this project. </p>



<p>I mostly start a code reviews by reading the tests. It&#8217;s a habit I picked. This may annoy colleagues, because comments regarding tests and readability are considered taboo in many cases.</p>



<figure class="wp-block-image"><img decoding="async" src="https://images.unsplash.com/photo-1567168544230-d5a9401299a4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="man holding black reading book"/><figcaption>Sometimes reading the source code of a library is just what it takes. Well written tests can help with understanding the actual usage.<br>Photo by <a href="https://unsplash.com/@dollargill?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Dollar Gill</a> on <a href="https://unsplash.com/s/photos/library-user?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>I actually have no idea why I put this summary section. I just hope you enjoyed my musings about testing, culture and fortune cookies.</p>



<p>BTW &#8211; The whole post on linkedin has evolved to an all-out discussion about tests and documentation. You can check it out (and use google translate if Hebrew isn&#8217;t your thing) &#8211; <a href="https://www.linkedin.com/posts/hod-bauer-9786133b_%D7%9B%D7%9F-%D7%9E%D7%90%D7%95%D7%93-%D7%97%D7%A9%D7%95%D7%91-%D7%9C%D7%99-%D7%A9%D7%99%D7%94%D7%99%D7%95-%D7%98%D7%A1%D7%98%D7%99%D7%9D-%D7%9C%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA-%D7%A9%D7%90%D7%A0%D7%99-activity-6751503486422192128-7aaC" target="_blank" rel="noreferrer noopener">link to discussion</a>.</p>

