---
title: What is the Coupling Pitfall and how to Avoid it?
slug: what-is-the-coupling-pitfall-and-how-to-avoid-it
published: 2022-07-31T17:37:32
updated: 2022-08-01T21:06:54
author: Yonatan Kra
description: How to avoid constant tests maintenance and regressions in your code? In this article, we will talk about a new term “the Coupling Pitfall”, what harm it is doing to your code, and a way to fix it. What are regressions and where can we catch them? Last week we had a production incident. An [&hellip;]
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
tags: []
canonical: https://yonatankra.com/what-is-the-coupling-pitfall-and-how-to-avoid-it/
comments: []
---


<p class="has-medium-font-size">How to avoid constant tests maintenance and regressions in your code? In this article, we will talk about a new term &#8220;the Coupling Pitfall&#8221;, what harm it is doing to your code, and a way to fix it.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b492221" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b492221"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#What_are_regressions_and_where_can_we_catch_them" >What are regressions and where can we catch them?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#The_Best_Case_Scenario" >The Best Case Scenario</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#The_Worst_Case_Scenario" >The Worst Case Scenario</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#What_happened_to_us_in_production" >What happened to us in production?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#The_Pitfall_in_Developers_Logic_when_Testing" >The Pitfall in Developers Logic when Testing</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#How_to_avoid_the_coupling_pitfall" >How to avoid the coupling pitfall?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_are_regressions_and_where_can_we_catch_them"></span>What are regressions and where can we catch them?<span class="ez-toc-section-end"></span></h2>



<p>Last week we had a production incident. An API that used to work stopped working. Luckily it was caught (accidentally) by one of our team members.</p>



<p>Such incidents are called &#8220;Regressions&#8221;. It means something worked &#8211; and after a change to the code it didn&#8217;t. This is a very bad thing to your app&#8217;s or code reputation as well as a frustrating user experience.</p>



<p>There are many places along the way one might catch such regressions:</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Best_Case_Scenario"></span><strong>The Best Case Scenario</strong><span class="ez-toc-section-end"></span></h3>



<p>The best place regressions can be caught is the developer&#8217;s computer &#8211; before one commits or pushes to the repository. This is a fast feedback loop that involves the developer alone when the metal is still warm. Easy and fast to debug and fix. It also doesn&#8217;t involve other people&#8217;s time and effort.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Worst_Case_Scenario"></span>The Worst Case Scenario<span class="ez-toc-section-end"></span></h3>



<p>The worst place regressions can appear is in production. I don&#8217;t believe I need to explain why.<br>The closer the regression is to production, the more costly its damage. It can be caught in both ends, but it can also be caught during CI, code review, or any other process you have in place between implementation to production.</p>



<p>The odds someone will notice a broken API during a code review is slim. It is not the reviewer&#8217;s job to do so, anyway.</p>



<p>What about the CI? First of all, the CI takes time to run and there&#8217;s a context switch between its failure and the developer&#8217;s attention to the branch/pull request. The second thing is &#8211; if there are no automated tests to capture the error, the CI will not help us.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_happened_to_us_in_production"></span><strong><u>What happened to us in production? </u></strong><span class="ez-toc-section-end"></span></h2>



<p class="has-text-align-left">One of our developers created a component that extended a third party library component:</p>



<p class="has-text-align-center"><em><code>export class Disclosure extends FoundationDisclosure</code></em></p>



<p class="has-text-align-left">The extended class had some properties and methods the <em><code>Disclosure</code></em>&nbsp;class depended upon. More specifically &#8211; it had the&nbsp;<em><code>open</code></em>&nbsp;property.</p>



<p class="has-text-align-left">This API was projected outside via the&nbsp;<em><code>Disclosure</code></em>&nbsp;component and everything worked fine.<br>During a refactor in the code it was decided the&nbsp;<em><code>FoundationDisclosure</code></em>&nbsp;class was not what we needed, and we should revert to a different implementation:</p>



<p class="has-text-align-center"><em><code>export class Disclosure extends FoundationElement</code></em></p>



<p class="has-text-align-left"><em><code>FoundationElement</code></em>&nbsp;is missing the&nbsp;<em><code>open</code></em>&nbsp;property and hence it was non existent on <em><code>Disclosure</code></em>&nbsp;anymore. This broke the API. Luckily this API was used in our own components, and a developer noticed it while working on one of them. Can you base your reputation and code quality on luck?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Pitfall_in_Developers_Logic_when_Testing"></span><strong><u>The Pitfall in Developers Logic when Testing</u></strong><span class="ez-toc-section-end"></span></h2>



<p>The developer didn&#8217;t write tests because:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="84" src="/wp-content/uploads/2022/07/testingNo.png" alt="A manifestation of the Coupling Pitfall in real life slack chat" class="wp-image-1554" srcset="/wp-content/uploads/2022/07/testingNo.png 1024w, /wp-content/uploads/2022/07/testingNo.png 300w, /wp-content/uploads/2022/07/testingNo.png 768w, /wp-content/uploads/2022/07/testingNo.png 1536w, /wp-content/uploads/2022/07/testingNo.png 2048w, /wp-content/uploads/2022/07/testingNo.png 268w, /wp-content/uploads/2022/07/testingNo.png 1280w, /wp-content/uploads/2022/07/testingNo.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>What the developer told me is that because the class was extending a tested class, the API was already tested on the other class. If I had 1 cent for every time I heard this logic explaining why no test was written, I&#8217;d probably had 30 to 40 cents&#8230;</p>



<p>Seriously though, this is one of the biggest pitfalls when trying to decide what to test: when you extend a class, you create the tightest coupling known in the computer science world (my opinions are my own).</p>



<p>The end consumer of your API is not aware of the class you extend. This, by definition, makes this class an implementation detail. It doesn&#8217;t make your API implementation detail.</p>



<p>If your class exposes an&nbsp;<em>open</em>&nbsp;property &#8211; then you must test it. It doesn&#8217;t matter if you wrote the property explicitly or if was added by an extended class/mixin/function/watnot. Your consumers expect this property and if it is removed you get a regression.</p>



<p>I shall call this pitfall &#8211; <strong><em>The Coupling Pitfall</em></strong>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_avoid_the_coupling_pitfall"></span><strong>How to avoid the coupling pitfall?</strong><span class="ez-toc-section-end"></span></h2>



<p>Now that we named our pitfall, let&#8217;s suggest a solution. We need a way to decouple our tests from our implementation details and focus on the API.</p>



<p>Here&#8217;s an idea: what if we wrote the test to the API before we implemented the solution?&nbsp;</p>



<p>We know how the API should work before we implement the solution.&nbsp;Here&#8217;s a possible test:</p>



<div class="wp-block-image"><figure class="aligncenter"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/hostedimages-cdn.aweber-static.com/MTY0MDEyOA%3D%3D/optimized/51e0940fc16347c1aba1ff88fc442e8e.jpeg?w=640&#038;ssl=1" alt=""/><figcaption>In the above test we make sure the initial state of the&nbsp;<em><code>open</code></em>&nbsp;attribute and also make sure it toggles when changing the value.</figcaption></figure></div>



<p>The test is so simple and takes two minutes to write. Much less time than creating a new branch, creating a pull request, waiting for a review, pass all the CI and finally push the change to production, right?</p>



<p>We accomplished 2 things here:</p>



<ol class="wp-block-list"><li>We covered our API with a test (which we need to do anyway)</li><li>We decoupled our tests from any implementation detail &#8211; we test only API. This makes any refactor safe because our tests are now sensitive to changes in the API.</li></ol>



<p>So how is it that people don&#8217;t decouple their tests from their implementation?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span><strong>Summary</strong><span class="ez-toc-section-end"></span></h2>



<p>The production incident described here is a real-world use case that shows the importance of testing &#8211; and the importance of experience in writing tests.</p>



<p>The pitfall described here is not relevant only for this use case &#8211; coupling between test and implementation is a major problem in most code bases. It creates bad tests and frustration among developers, because changing implementation detail requires to change tests. In worse cases, it misses regressions.</p>



<p>The solution offered here is to write the test before writing the implementation &#8211; hence decoupling the two from the start.</p>



<p>This solution has a name that fills developers&#8217; hearts with terror. It is called <a href="/?s=tdd" data-type="URL" data-id="https://yonatankra.com/?s=tdd">TDD</a> 😉</p>



<p><em>Thanks a lot to&nbsp;<a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener">Yuval Bar Levi</a> for the kind and thorough review of this article</em></p>



<p><em>If you liked the article, please share it:</em></p>

