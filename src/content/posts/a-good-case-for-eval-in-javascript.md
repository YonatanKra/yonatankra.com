---
title: A good case for Eval in JavaScript
slug: a-good-case-for-eval-in-javascript
published: 2022-02-07T21:39:49
updated: 2022-04-28T09:01:48
author: Yonatan Kra
description: "Or: How to generate dynamic html tags inside lit-html templates? eval is sometimes mixed up with evil. We also hear sometimes that there are cases in which it is needed. This is one such case… Notice: this article is for an old version of lit. I was notified in the comments by Justin that in [&hellip;]"
categories:
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Web Component
    slug: web-component
    path: web-component
tags:
  - eval
  - lit-element
  - lit-html
  - web components
canonical: https://yonatankra.com/a-good-case-for-eval-in-javascript/
comments:
  - author: Justin
    date: 2022-02-10T21:16:57
    content: |
      <p>I would use static expressions for this instead: <a href="https://lit.dev/docs/templates/expressions/#static-expressions" rel="nofollow ugc">https://lit.dev/docs/templates/expressions/#static-expressions</a></p>
  - author: Yonatan Kra
    date: 2022-04-28T08:49:02
    content: |
      <p>Thanks!<br />
      It didn&#8217;t work at the time, and we have left <code>lit</code> in favor of <code>fast</code> so for us it is irrelevant anymore 🙂<br />
      This would be beneficial for future readers who are lit users I guess 🙂<br />
      I&#8217;ll update the article with your comment.</p>
---

<p class="has-medium-font-size">Or: How to generate dynamic html tags inside lit-html templates? <code>eval</code> is sometimes mixed up with <code>evil</code>. We also hear sometimes that there are cases in which it is needed. This is one such case&#8230;</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow"><p>Notice: this article is for an old version of <code>lit</code>. I was notified in the comments by Justin that in the new <code>lit</code> versions there is <a href="https://lit.dev/docs/templates/expressions/#static-expressions" data-type="URL" data-id="https://lit.dev/docs/templates/expressions/#static-expressions" target="_blank" rel="noreferrer noopener">better support for static expressions</a>.<br>As I mention in the article, it did not work at the time and I came up with this solution. <br>This solution is also not performant when <a href="https://jsben.ch/hhXYS" data-type="URL" data-id="https://jsben.ch/hhXYS" target="_blank" rel="noreferrer noopener">compared to other solutions</a>. It did leave our code cleaner and overall performance in the app was not harmed so this is what we used.<br>Since we are not using <code>lit</code> anymore in <code>vivid 3.x</code> this is considered legacy code in our project.<br></p></blockquote>



<p>The <code><a href="https://lit.dev/" data-type="URL" data-id="https://lit.dev/" target="_blank" rel="noreferrer noopener">lit</a></code> project is a framework for working with web components.  In vivid 1.x and 2.x we relied heavily on <code>lit</code>.  While we are working hard on vivid 3.x, we still support and add features to <code>2.x</code>. </p>



<p>One such feature was to add an H tag around the expansion panel component. Because expansion panels can be used as headers (and mostly they do), we need to set them up semantically as headers.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="473" src="/wp-content/uploads/2022/02/image-16.png" alt="" class="wp-image-1417" srcset="/wp-content/uploads/2022/02/image-16.png 1024w, /wp-content/uploads/2022/02/image-16.png 300w, /wp-content/uploads/2022/02/image-16.png 768w, /wp-content/uploads/2022/02/image-16.png 122w, /wp-content/uploads/2022/02/image-16.png 1210w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The expansion panel before the change. Closed state (top) and open state (bottom). You can see in the green area the button that&#8217;s not wrapped in any indication it is a header.</figcaption></figure></div>



<p>We&#8217;ve decided the default H level to be 3 (<code>&lt;h3&gt;</code>). That&#8217;s not enough because the expansion panel can also be a sub header of any other header level:</p>



<pre class="wp-block-code"><code>&lt;h1&gt;Is there alien life out there?&lt;/h1&gt;
&lt;expansion-panel&gt;
  &lt;h2&gt;&lt;button&gt;What is life?&lt;/button&gt;&lt;/h2&gt;
&lt;/expansion-panel&gt;
<meta charset="utf-8">&lt;expansion-panel&gt;
  &lt;h2&gt;&lt;button&gt;What is alien?&lt;/button&gt;&lt;/h2&gt;
&lt;/expansion-panel&gt;</code></pre>



<p>So you see &#8211; setting up <code>h3</code> in this case would be wrong. The same is true for expansion panels under <code>h3</code>, <code>h4</code> and <code>h5</code>.</p>



<p>Some would say to use a <code>div</code> with <code>aria-level</code> and <code>role=header</code>.  While this would have worked, there&#8217;s this quote from MDN (and other places):</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="156" src="/wp-content/uploads/2022/02/image-2.png" alt="" class="wp-image-1387" srcset="/wp-content/uploads/2022/02/image-2.png 1024w, /wp-content/uploads/2022/02/image-2.png 300w, /wp-content/uploads/2022/02/image-2.png 768w, /wp-content/uploads/2022/02/image-2.png 1536w, /wp-content/uploads/2022/02/image-2.png 268w, /wp-content/uploads/2022/02/image-2.png 1540w, /wp-content/uploads/2022/02/image-2.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A friendly suggestion from MDN regarding the usage (or non-usage) of <code>aria-level</code></figcaption></figure></div>



<p>Taking all this into account, we wanted to keep the MDN&#8217;s best practices while still allowing for dynamic tags.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b815f93" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b815f93"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/a-good-case-for-eval-in-javascript/#Trying_to_setup_a_dynamic_tag_with_lit-html" >Trying to setup a dynamic tag with lit-html</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/a-good-case-for-eval-in-javascript/#How_do_lit_templates_work" >How do lit templates work?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/a-good-case-for-eval-in-javascript/#How_to_not_dynamically_change_a_tag_name_in_lit-html" >How to not dynamically change a tag name in lit-html?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/a-good-case-for-eval-in-javascript/#Trying_to_use_unsafeHTML" >Trying to use unsafeHTML</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/a-good-case-for-eval-in-javascript/#Trying_to_use_unsafeStatic" >Trying to use unsafeStatic</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/a-good-case-for-eval-in-javascript/#How_to_use_Eval_in_order_to_generate_dynamic_tags_in_lit-html_templates" >How to use Eval in order to generate dynamic tags in lit-html templates</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/a-good-case-for-eval-in-javascript/#Lets_bundle_it_all_up" >Let&#8217;s bundle it all up</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/a-good-case-for-eval-in-javascript/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Trying_to_setup_a_dynamic_tag_with_lit-html"></span>Trying to setup a dynamic tag with lit-html<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_do_lit_templates_work"></span>How do lit templates work?<span class="ez-toc-section-end"></span></h3>



<p>Let&#8217;s first explain how templating works in <code>lit</code> without getting too much into details. </p>



<p><code>lit-html</code> is a utility function that turns our strings into live templates.  The <code>lit</code> render method then &#8220;magically&#8221; listens to changes in properties in the template and updates the view accordingly.  </p>



<p>So you&#8217;ll have a <code>render</code> function that looks kind of like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="237" src="/wp-content/uploads/2022/02/image.png" alt="" class="wp-image-1385" srcset="/wp-content/uploads/2022/02/image.png 868w, /wp-content/uploads/2022/02/image.png 300w, /wp-content/uploads/2022/02/image.png 768w, /wp-content/uploads/2022/02/image.png 243w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A method render on the custom element. It returns a TemplateResult using the <code>html</code> lit function.</figcaption></figure></div>



<p>The panel header would be the content we&#8217;d like to designate as a header.</p>



<p>As I mentioned, we wanted to wrap it with <code>h3</code> as default, so it might look something like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="298" src="/wp-content/uploads/2022/02/image-1.png" alt="" class="wp-image-1386" srcset="/wp-content/uploads/2022/02/image-1.png 872w, /wp-content/uploads/2022/02/image-1.png 300w, /wp-content/uploads/2022/02/image-1.png 768w, /wp-content/uploads/2022/02/image-1.png 193w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Same render function &#8211; only this time the header is wrapped with an <code>h3</code> tag</figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_not_dynamically_change_a_tag_name_in_lit-html"></span>How to not dynamically change a tag name in lit-html?<span class="ez-toc-section-end"></span></h3>



<p>The second requirement was to have the <code>h tag</code> dynamic.  That means, we&#8217;d like to have a user editable property that will change the header&#8217;s level. Looking at the template, this might seem an easy task. Just set the variable inside the template string near the <code>h</code>:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="300" src="/wp-content/uploads/2022/02/image-3.png" alt="" class="wp-image-1388" srcset="/wp-content/uploads/2022/02/image-3.png 836w, /wp-content/uploads/2022/02/image-3.png 300w, /wp-content/uploads/2022/02/image-3.png 768w, /wp-content/uploads/2022/02/image-3.png 192w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Adding <code>${this.headerLevel}</code> near the <code>h</code> tag</figcaption></figure></div>



<p>How wonderful it looks! And how spectacularly it fails 🙂</p>



<p>You see &#8211; <code>lit-html</code> and templating system does not work well with static data. I&#8217;ll spare you the creepy details, but the error that we get is that it fails to parse the template &#8211; and this happens in runtime! (ouch &#8211; imagine what would have happened if we didn&#8217;t have tests)</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Trying_to_use_unsafeHTML"></span>Trying to use <code>unsafeHTML</code><span class="ez-toc-section-end"></span></h3>



<p>You know what they say: &#8220;If you can&#8217;t fight them &#8211; use their methods&#8221;.  A lit method called <code>unsafeHTML</code> promises to do the following: <code>Renders the result as HTML, rather than text.</code>  <meta charset="utf-8">Since the documentation was lacking, I turned to the official documentation &#8211; the unit tests: </p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="249" src="/wp-content/uploads/2022/02/image-12.png" alt="" class="wp-image-1402" srcset="/wp-content/uploads/2022/02/image-12.png 1024w, /wp-content/uploads/2022/02/image-12.png 300w, /wp-content/uploads/2022/02/image-12.png 768w, /wp-content/uploads/2022/02/image-12.png 231w, /wp-content/uploads/2022/02/image-12.png 1098w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Part of the <code>unsafeHTML</code> unit test that shows how to use it.  It seems we can actually parse anything as HTML.</figcaption></figure></div>



<p>Applying that to our code looks like:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="328" src="/wp-content/uploads/2022/02/image-13.png" alt="" class="wp-image-1403" srcset="/wp-content/uploads/2022/02/image-13.png 828w, /wp-content/uploads/2022/02/image-13.png 300w, /wp-content/uploads/2022/02/image-13.png 768w, /wp-content/uploads/2022/02/image-13.png 176w, /wp-content/uploads/2022/02/image-13.png 820w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Applying <code>unsafeHTML</code> in our code</figcaption></figure></div>



<p>Ok &#8211; build passed. Tests failed (but who looks at tests, right?). Why did they fail? Here&#8217;s how it looks like when using this solution:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="269" src="/wp-content/uploads/2022/02/image-14.png" alt="" class="wp-image-1404" srcset="/wp-content/uploads/2022/02/image-14.png 1024w, /wp-content/uploads/2022/02/image-14.png 300w, /wp-content/uploads/2022/02/image-14.png 768w, /wp-content/uploads/2022/02/image-14.png 214w, /wp-content/uploads/2022/02/image-14.png 1350w, /wp-content/uploads/2022/02/image-14.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The DOM after applying <code>unsafeHTML</code>.  You can see all it did was generate an orphaned <code>h3</code> tag instead of wrapping our button with <code>h3</code> tag.  That&#8217;s mostly why the tests failed &#8211; because they expected the button to be wrapped with <code>h3</code>&#8230; post in the comments below if you&#8217;d like to see how I <code>tdd</code>ed this one 🙂</figcaption></figure></div>



<p>I won&#8217;t go into details why this didn&#8217;t work &#8211; suffice to say that the way <code>lit-html</code> renders its templates doesn&#8217;t allow for &#8220;loose&#8221; HTML tags ends.</p>



<p>We&#8217;re back to point zero. We tried something that didn&#8217;t work&#8230; time to move on!</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Trying_to_use_unsafeStatic"></span>Trying to use <code>unsafe</code>Static<span class="ez-toc-section-end"></span></h3>



<p>Our third attempt was to use another built in function of <code>lit</code> called <code>unsafeStatic</code>.  Again the documentation isn&#8217;t too helpful, so&#8230; you know&#8230; unit tests:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="271" src="/wp-content/uploads/2022/02/image-4.png" alt="" class="wp-image-1389" srcset="/wp-content/uploads/2022/02/image-4.png 1024w, /wp-content/uploads/2022/02/image-4.png 300w, /wp-content/uploads/2022/02/image-4.png 768w, /wp-content/uploads/2022/02/image-4.png 1536w, /wp-content/uploads/2022/02/image-4.png 213w, /wp-content/uploads/2022/02/image-4.png 1616w, /wp-content/uploads/2022/02/image-4.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The test where the <code>unsafeHTML</code> does exactly what we need!</figcaption></figure></div>



<p>Seems like our problem is solved. Let&#8217;s just implement this in our code:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="344" src="/wp-content/uploads/2022/02/image-7.png" alt="" class="wp-image-1392" srcset="/wp-content/uploads/2022/02/image-7.png 868w, /wp-content/uploads/2022/02/image-7.png 300w, /wp-content/uploads/2022/02/image-7.png 768w, /wp-content/uploads/2022/02/image-7.png 168w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Adding the <code>unsafeStatic</code> to the mix just like in the docs and unit tests of the library.</figcaption></figure></div>



<p>And then&#8230; we get this:</p>



<div class="wp-block-image is-style-default"><figure class="aligncenter size-full is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2022/02/image-6.png" alt="" class="wp-image-1391" width="252" height="290" srcset="/wp-content/uploads/2022/02/image-6.png 252w, /wp-content/uploads/2022/02/image-6.png 78w" sizes="auto, (max-width: 252px) 100vw, 252px" /><figcaption>Instead of a beautiful expansion panel, we get something odd that&#8217;s yelling <code>object object</code>!<br>Hey Element &#8211; next time you yell <code>object</code> no one will believe you!</figcaption></figure></div>



<p>Apparently, while their tests worked with the <code>unit-tests</code> render, it did not work in the &#8220;real world&#8221;. Running <code>render</code> on my own showed me the exact same thing.</p>



<p>So&#8230; <code>unsafeStatic</code> doesn&#8217;t work. What&#8217;s next?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_use_Eval_in_order_to_generate_dynamic_tags_in_lit-html_templates"></span>How to use <code>Eval</code> in order to generate dynamic tags in lit-html templates<span class="ez-toc-section-end"></span></h2>



<p>In our former failed attempt we tried to add the <code>headerLevel</code> dynamically like this:</p>



<pre class="wp-block-code"><code>&lt;h${this.headerLevel}&gt;
	${this.renderPanelHeader()}
&lt;/h${this.headerLevel}&gt;</code></pre>



<p>Let&#8217;s try to tackle this differently. Because we can call rendering functions that return <code>TemplateResult</code> objects, we can create a function that returns an <code>eval</code>ed <code>TemplateResult</code> like this:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="101" src="/wp-content/uploads/2022/02/image-9.png" alt="" class="wp-image-1395" srcset="/wp-content/uploads/2022/02/image-9.png 1024w, /wp-content/uploads/2022/02/image-9.png 300w, /wp-content/uploads/2022/02/image-9.png 768w, /wp-content/uploads/2022/02/image-9.png 1536w, /wp-content/uploads/2022/02/image-9.png 268w, /wp-content/uploads/2022/02/image-9.png 1638w, /wp-content/uploads/2022/02/image-9.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Our new <code>renderPanelHeader</code> method. It first verifies that our input is correct (we don&#8217;t want someone injecting stuff into our code). Then it returns the evaluated value of running the string inside the <code>eval</code> call.</figcaption></figure></div>



<p>Our solution now return a dynamic template with a dynamic tag name for our header:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="252" src="/wp-content/uploads/2022/02/image-10.png" alt="" class="wp-image-1396" srcset="/wp-content/uploads/2022/02/image-10.png 1024w, /wp-content/uploads/2022/02/image-10.png 300w, /wp-content/uploads/2022/02/image-10.png 768w, /wp-content/uploads/2022/02/image-10.png 228w, /wp-content/uploads/2022/02/image-10.png 1112w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>On the left side &#8211; our greeting panel. On the right side &#8211; the HTML structure of the panel with a dynamic header. You can view an animation here:</figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-full is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" src="/wp-content/uploads/2022/02/dynamicHeader.gif" alt="" class="wp-image-1413" width="441" height="405"/><figcaption>Animation showing the dynamic change of a tag name in a lit-element</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Lets_bundle_it_all_up"></span>Let&#8217;s bundle it all up<span class="ez-toc-section-end"></span></h2>



<p>It seems like we succeeded in what we wanted. We have a dynamic tag inside our <code>lit-html</code> &#8211; and we even used <code>eval</code>&#8230;</p>



<p>We did find another &#8220;small&#8221; issue.  While running our ui visual regression tests (that are being bundled by webpack) we got the following error:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="107" src="/wp-content/uploads/2022/02/image-11.png" alt="" class="wp-image-1398" srcset="/wp-content/uploads/2022/02/image-11.png 785w, /wp-content/uploads/2022/02/image-11.png 300w, /wp-content/uploads/2022/02/image-11.png 768w, /wp-content/uploads/2022/02/image-11.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>An error seen in runtime when using the imported <code>html</code> function inside an <code>eval</code></figcaption></figure></div>



<p>The same error showed up in our storybook (webpack, again&#8230;).</p>



<p>Oh no! Now our components are not usable in bundled applications (which are like&#8230; 99% of the applications consuming Vivid). </p>



<p>What to do? What to do? I know &#8211; let&#8217;s get depressed and give up!</p>



<p>Or&#8230; we could come up with another nasty solution!</p>



<p>If we just set the <code>html</code> as a local variable and use the local variable, it should be available in runtime.  </p>



<p>So adding <code>const safeHTML = html;</code> at the top of the file and then using <code>safeHTML</code> instead of <code>html</code> solves our problem.</p>



<p>Actually &#8211; a variable might be problematic since an uglifier/minifier might change it.  We could use a static method on the class itself to make sure it is more resilient.  It depends how &#8220;aggressive&#8221; your uglifier/minifier is&#8230;</p>



<p>Not my problem at the moment 🙂</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Accessibility is an important matter. We don&#8217;t want to leave anyone behind, and make sure our apps are as accessible to as many people as possible.</p>



<p>Using correct semantics in your HTML is a big part of that. This is why the <code>vivid</code> team is constantly working on adding accessibility features to our Design System&#8217;s components.</p>



<p>In our case we wanted to make sure the <code>expansion panels</code> get the right semantics as headers.  Because we wanted to allow the consumers to determine the header&#8217;s level, we wanted the <code>h</code> tag to be dynamic.</p>



<p><code>lit-html</code> was not really cool with that, so after trying out some ways of doing that, we found that by using <code>eval</code> we can create a dynamic tag inside <code>lit-html</code>.</p>



<p>We then found another small problem: when bundling our component inside other apps (in our case, the ui visual regression tests and storybook), we found out that using <code>eval</code> is tricky. It wouldn&#8217;t find the imported <code>html</code> since the <code>eval</code> expression is evaluated in runtime and bundlers tend to give imports their own names&#8230;</p>



<p>We solved it by creating a local property on the class and it did the trick. We had a dynamic tag that was also working with bundlers.</p>



<p>The operation was a success.</p>



<p>Thanks a lot to<a href="https://www.rachelbt.co.il/" target="_blank" data-type="URL" data-id="https://www.rachelbt.co.il/" rel="noreferrer noopener"> Rachel B. Tannenbaum</a> and <a href="https://www.linkedin.com/in/yinonov/" target="_blank" data-type="URL" data-id="https://www.linkedin.com/in/yinonov/" rel="noreferrer noopener">Yinon Oved</a> for the inspiration and review of this article.</p>

