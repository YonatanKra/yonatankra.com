---
title: "Meaningful Tests: Human Hubris vs. AI"
slug: meaningful-tests-human-hubris-vs-ai
published: 2025-09-09T10:41:19
updated: 2025-09-09T10:42:49
author: Yonatan Kra
description: What makes a test meaningful? How can tests shape better architecture? And what roles do humans and AI play? A few years ago I made a comment in a code review about a test description. That simple remark evolved into a few days’ debate that included architecture, code smells and other cool terms. How is [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Architecture
    slug: architecture
    path: architecture
  - name: Flutter
    slug: flutter
    path: flutter
  - name: Meta Programming
    slug: meta-programming
    path: meta-programming
tags: []
canonical: https://yonatankra.com/meaningful-tests-human-hubris-vs-ai/
comments: []
---


<p class="has-medium-font-size">What makes a test meaningful? How can tests shape better architecture? And what roles do humans and AI play?</p>



<p>A few years ago I made a comment in a code review about a test description. That simple remark evolved into a few days’ debate that included architecture, code smells and other cool terms.</p>



<p>How is it that a simple test description, that most people tend to just sprinkle (or worse &#8211; let AI write for them) can give rise to an “all important” software architecture and design debate? Read on to find out.</p>



<p>(Note: Examples are in flutter, but they convey a general idea that can be translated to any language. If there will be a demand I can easily “translate” this to JavaScript/Python/Rust/{holy grail language})</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1965806d" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1965806d"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/meaningful-tests-human-hubris-vs-ai/#A_simple_case" >A simple case</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/meaningful-tests-human-hubris-vs-ai/#Specificity" >Specificity</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/meaningful-tests-human-hubris-vs-ai/#Coupling_and_the_Human_Hubris" >Coupling (and the Human Hubris)</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/meaningful-tests-human-hubris-vs-ai/#Clearer_Feedback" >Clearer Feedback</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/meaningful-tests-human-hubris-vs-ai/#AI" >AI</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/meaningful-tests-human-hubris-vs-ai/#The_Results_of_AI_Tests_Generation" >The Results of AI Tests Generation</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/meaningful-tests-human-hubris-vs-ai/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_simple_case"></span>A simple case<span class="ez-toc-section-end"></span></h2>



<p>Let’s say we have a Card widget that displays text, and we are using it to display certain text in our app.&nbsp;</p>



<p>Our test is simple, right?</p>



<p>testWidgets(‘should display “mock_first” text’)</p>



<p>And how do we test it? A simple way to do it would be like this: Find the widget by text and expect it to appear in a single widget only:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist140747271" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-first_test-dart" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-dart  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="first_test.dart content, created by YonatanKra on 08:29AM on September 09, 2025."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="first_test.dart">
        <tr>
          <td id="file-first_test-dart-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-first_test-dart-LC1" class="blob-code blob-code-inner js-file-line">testWidgets(‘should display “mock_first” text’, (WidgetTester tester) async {</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-first_test-dart-LC2" class="blob-code blob-code-inner js-file-line">  await tester.pumpWidget(</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-first_test-dart-LC3" class="blob-code blob-code-inner js-file-line">    ChangeNotifierProvider&lt;MyAppState&gt;(</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-first_test-dart-LC4" class="blob-code blob-code-inner js-file-line">      create: (context) =&gt; MockAppState(),</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-first_test-dart-LC5" class="blob-code blob-code-inner js-file-line">      child: MaterialApp(home: MyHomePage()),</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-first_test-dart-LC6" class="blob-code blob-code-inner js-file-line">    ),</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-first_test-dart-LC7" class="blob-code blob-code-inner js-file-line">  );</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-first_test-dart-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-first_test-dart-LC9" class="blob-code blob-code-inner js-file-line">  expect(find.text(‘mock_first’), findsOneWidget);</td>
        </tr>
        <tr>
          <td id="file-first_test-dart-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-first_test-dart-LC10" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/9984e00f79661cadf56348989b11c5c6/raw/3a908ae684cf037b1e3583c37761bcb0ee3cade1/first_test.dart" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/9984e00f79661cadf56348989b11c5c6#file-first_test-dart" class="Link--inTextBlock" target="_blank" rel="noopener">
          first_test.dart
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>On the other hand, one can be more specific in the specifics:</p>



<p>testWidgets(&#8216;should display “mock_first” in a big card&#8217;)</p>



<p>This is way more specific and assumes much about the widget-in-test. First, we know there’s a BigCard in it and that the text should be inside that card. Here’s how that test looks like:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist140747358" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-second_test-dart" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-dart  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="second_test.dart content, created by YonatanKra on 08:31AM on September 09, 2025."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="second_test.dart">
        <tr>
          <td id="file-second_test-dart-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-second_test-dart-LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-en">testWidgets</span>(<span class="pl-s">&#39;should display “mock_first” in a big card&#39;</span>, ( <span class="pl-c1">WidgetTester</span> tester, ) <span class="pl-k">async</span> {</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-second_test-dart-LC2" class="blob-code blob-code-inner js-file-line">    <span class="pl-k">await</span> tester.<span class="pl-en">pumpWidget</span>(</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-second_test-dart-LC3" class="blob-code blob-code-inner js-file-line">      <span class="pl-c1">ChangeNotifierProvider</span>&lt;<span class="pl-c1">MyAppState</span>&gt;(</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-second_test-dart-LC4" class="blob-code blob-code-inner js-file-line">        create<span class="pl-k">:</span> (context) <span class="pl-k">=&gt;</span> <span class="pl-c1">MockAppState</span>(),</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-second_test-dart-LC5" class="blob-code blob-code-inner js-file-line">        child<span class="pl-k">:</span> <span class="pl-c1">MaterialApp</span>(home<span class="pl-k">:</span> <span class="pl-c1">MyHomePage</span>()),</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-second_test-dart-LC6" class="blob-code blob-code-inner js-file-line">      ),</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-second_test-dart-LC7" class="blob-code blob-code-inner js-file-line">    );</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-second_test-dart-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-second_test-dart-LC9" class="blob-code blob-code-inner js-file-line">    <span class="pl-en">expect</span>(<span class="pl-en">getBigCardText</span>(tester), <span class="pl-en">equals</span>(<span class="pl-s">&#39;mock_first&#39;</span>));</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-second_test-dart-LC10" class="blob-code blob-code-inner js-file-line">  });</td>
        </tr>
        <tr>
          <td id="file-second_test-dart-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-second_test-dart-LC11" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c6da689f410118cb7a63deba2d0cd86f/raw/c6c4bdd6f2cead370baa3649fd6bb6ebfba321bb/second_test.dart" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c6da689f410118cb7a63deba2d0cd86f#file-second_test-dart" class="Link--inTextBlock" target="_blank" rel="noopener">
          second_test.dart
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>Both tests have a similar boilerplate (the pumpWidget) part. At first glance they seem to test the same thing &#8211; verify “mock_first” appears on screen.&nbsp;</p>



<p>Even so, we can learn important principles from the nuances.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Specificity"></span>Specificity<span class="ez-toc-section-end"></span></h2>



<p>In the first example we look for the wanted text and verify it appears only once (in a single widget): expect(find.text(&#8216;mock_first&#8217;), findsOneWidget);. We do not care what widget or how the widgets are arranged &#8211; we just make sure it appears only once in the page.</p>



<p>In the second example, we are more specific: expect(getBigCardText(tester), equals(&#8216;mock_first&#8217;));. We specifically look for the big card and extract the text out of it.&nbsp;</p>



<p>As opposed to the more general approach in the first example, this implies that the card is part of the interface. The developer expects to have a “big card” with the wanted text inside.</p>



<p>If, for some reason, we change the implementation not to use a card, that would be considered an interface change and the test will fail.&nbsp;</p>



<p>The developer who writes the widget must convey through the test if one meant to set the big card specifically as part of the interface or leave the interface more general.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Coupling_and_the_Human_Hubris"></span>Coupling (and the Human Hubris)<span class="ez-toc-section-end"></span></h2>



<p>The developer should also be aware of coupling. Notice that “magic” function in the second test? getBigCardText?&nbsp;</p>



<p>Let’s dive inside:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist140747375" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-getbigcardtext-dart" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-dart  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="getBigCardText.dart content, created by YonatanKra on 08:32AM on September 09, 2025."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="getBigCardText.dart">
        <tr>
          <td id="file-getbigcardtext-dart-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-getbigcardtext-dart-LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-c1">String</span><span class="pl-k">?</span> <span class="pl-en">getBigCardText</span>(<span class="pl-c1">WidgetTester</span> tester) {</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-getbigcardtext-dart-LC2" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">final</span> bigCard <span class="pl-k">=</span> find.<span class="pl-en">byType</span>(<span class="pl-c1">BigCard</span>);</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-getbigcardtext-dart-LC3" class="blob-code blob-code-inner js-file-line"> </td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-getbigcardtext-dart-LC4" class="blob-code blob-code-inner js-file-line">  <span class="pl-c">// Find the Text widget inside the BigCard</span></td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-getbigcardtext-dart-LC5" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">final</span> textWidget <span class="pl-k">=</span> find.<span class="pl-en">descendant</span>(</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-getbigcardtext-dart-LC6" class="blob-code blob-code-inner js-file-line">    of<span class="pl-k">:</span> bigCard,</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-getbigcardtext-dart-LC7" class="blob-code blob-code-inner js-file-line">    matching<span class="pl-k">:</span> find.<span class="pl-en">byType</span>(<span class="pl-c1">Text</span>),</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-getbigcardtext-dart-LC8" class="blob-code blob-code-inner js-file-line">  );</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-getbigcardtext-dart-LC9" class="blob-code blob-code-inner js-file-line"> </td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-getbigcardtext-dart-LC10" class="blob-code blob-code-inner js-file-line">  <span class="pl-c">// Get the actual text content from the rendered widget</span></td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-getbigcardtext-dart-LC11" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">final</span> textWidgetInstance <span class="pl-k">=</span> tester.<span class="pl-en">widget</span>&lt;<span class="pl-c1">Text</span>&gt;(textWidget);</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-getbigcardtext-dart-LC12" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">return</span> textWidgetInstance.data;</td>
        </tr>
        <tr>
          <td id="file-getbigcardtext-dart-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-getbigcardtext-dart-LC13" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/0d240d70e05568678ccb1586607ef882/raw/e36ccf297f3985507a7283f8370853dcb1aea29d/getBigCardText.dart" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/0d240d70e05568678ccb1586607ef882#file-getbigcardtext-dart" class="Link--inTextBlock" target="_blank" rel="noopener">
          getBigCardText.dart
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>See that it is looking for BigCard? This function is coupled to the BigCard widget. It is good practice to extract such parts to their own utility functions. This way, we can change it in one place if we decide to replace BigCard at some point.</p>



<p>This helper function also signals that our widget is now coupled to the&nbsp; BigCard.</p>



<p>Do we want to couple them? Or do we want to decouple them using some design pattern? Maybe create a facade that allows our widget to use the BigCard without knowing it is using it? Or would dependency injection be more relevant in this case?</p>



<p>It is an architecture/design decision that arises from the test &#8211; without even looking at the implementation itself.&nbsp;</p>



<p>Moreover, the implementation itself might not even exist when we write the test. Why is that important?</p>



<p><a href="https://blog.nareshak.com/dont-fall-in-love-with-your-code/" target="_blank" rel="noopener">We tend to fall in love with our implementation</a>. That’s where hubris creeps in.</p>



<p>Not only that, <a href="https://arxiv.org/abs/2107.07357" target="_blank" rel="noopener">a survey conducted by JetBrains</a> supports this claim, showing that developers are often reluctant to refactor.&nbsp;</p>



<p><a href="https://arxiv.org/abs/1607.02459" target="_blank" rel="noopener">Another study</a> found that code smells (such as coupling) are not the main motivators for refactoring. Instead, the introduction of new features is what usually drives it.</p>



<p>It is clear from the research it is harder for developers to change the design after it is written. You can call it Hubris, you can call it sunk cost, but the fact is it is there and shown in multiple studies.</p>



<p>Using tests to find code smells can help. Writing the tests before implementation would surely improve the chances of thinking about the architecture before committing to one we fall in love with.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Clearer_Feedback"></span>Clearer Feedback<span class="ez-toc-section-end"></span></h2>



<p>There’s also a difference in the feedback we receive from a failed test.</p>



<p>The first test returns:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><tbody><tr><td>The following TestFailure was thrown running a test:<br>Expected: exactly one matching candidate<br>&nbsp; Actual: _TextWidgetFinder:&lt;Found 0 widgets with text &#8220;mock_first&#8221;: []&gt;<br>&nbsp; Which: means none were found but one was expected</td></tr></tbody></table></figure>



<p>The second returns:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><tbody><tr><td>The following TestFailure was thrown running a test:<br>Expected: &#8216;mock_first&#8217;<br>&nbsp; Actual: &#8216;mock_first mock&#8217;<br>&nbsp; Which: is different. Both strings start the same, but the actual value also has the following trailing characters:&nbsp; mock</td></tr></tbody></table></figure>



<p>We can see that in flutter, the way we test and the matchers we use reflect in the tests feedback. The feedback looks exactly what we wanted to do in each test in (kinda) plain english.</p>



<p>It’s not so different in other languages:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="277" src="/wp-content/uploads/2025/09/image-1.png" alt="A screenshot of a code test failure in a dark-mode terminal. The test title is &quot;diamond square &gt; should run diamond-square sequences&quot; with a red dot. The main body of the output shows a diff between an &quot;Expected&quot; and &quot;Received&quot; value. The &quot;Expected&quot; text is a long string of &quot;diamondStep squareStep&quot; values, highlighted in green to show what was missing. The &quot;Received&quot; text is a shorter string of the same values, highlighted in red. The code comment above the output says expect(received).toEqual(expected) // deep equality." class="wp-image-2208" srcset="/wp-content/uploads/2025/09/image-1.png 1024w, /wp-content/uploads/2025/09/image-1.png 300w, /wp-content/uploads/2025/09/image-1.png 768w, /wp-content/uploads/2025/09/image-1.png 208w, /wp-content/uploads/2025/09/image-1.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>In this JavaScript test feedback (taken from <a href="/5-tdd-lessons-when-writing-javascript-algorithm/#Lesson_1_Start_with_the_simplest_test_possible">this article</a>), the expected vs. the received is quite obvious.</p>



<p>So the way we write the tests also affects how useful the feedback is.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="AI"></span>AI<span class="ez-toc-section-end"></span></h2>



<p>We mentioned human hubris. Can we trust AI to avoid such mistakes?</p>



<p>Here are my thoughts right now on the state-of-AI in software development: it is a very good, very fast, copy-paster of code. So the more examples it has of a way to solve a problem, the more likely it will use it.</p>



<p>It has a huge dataset to learn from, and it is as good as we are as humanity.</p>



<p>And this is how humanity ranges (according to <a href="https://survey.stackoverflow.co/2022/#developer-profile-experience" target="_blank" rel="noopener">surveys</a> and <a href="https://www.levels.fyi/?compare=Intel,Microsoft,Check%20Point%20Software%20Technologies&amp;track=Software%20Engineer" target="_blank" rel="noopener">data</a>):</p>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="369" src="/wp-content/uploads/2025/09/image-3.png" alt="A hand-drawn graph shows a downward-sloping curve on a background that resembles a whiteboard. The X-axis is labeled with developer seniority levels, from &quot;Junior&quot; on the left to &quot;Principal/Superb&quot; and &quot;Martin Fowler&quot; on the right. The Y-axis has a vertical arrow pointing up. The curve is labeled with percentages at various points, corresponding to the seniority levels: &quot;50%&quot; for Junior, &quot;33%&quot; for Mid-Level, &quot;16%&quot; for Senior, &quot;10%&quot; for Staff/Expert, and &quot;3%&quot; and &quot;1%&quot; for Principal/Superb. The graph illustrates the decreasing probability of a developer solving a problem alone as their seniority increases." class="wp-image-2215" srcset="/wp-content/uploads/2025/09/image-3.png 1552w, /wp-content/uploads/2025/09/image-3.png 300w, /wp-content/uploads/2025/09/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>This distribution explains why AI-generated code often looks like mid-junior work: there’s simply more of it to learn from.</p>



<p>So you see &#8211; senior and above developers have no chance at generating the amount of code Mid-junior devs generate.</p>



<p>That means, that’s the level one can expect from AI. Not that I’m saying there’s something wrong with Mid-Juniors &#8211; it’s just that their code still lacks that of developers with more seniority and expertise.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_Results_of_AI_Tests_Generation"></span>The Results of AI Tests Generation<span class="ez-toc-section-end"></span></h3>



<p>What happened when I asked AI to generate tests for my first flutter tutorial led app?</p>



<p>The usecase was a bit more complex &#8211; but not by much.</p>



<p>The app was taking “random” text from a WordPair 3rd party library and showed it in the BigCard component. There was also a button that clicking it generated a new random pair of words and replace the old one in the BigCard.</p>



<p>Before going over the solution, I need a moment of honesty from you. Think (or even write down) how you&#8217;d test this scenario.</p>



<p>Finished? Let’s see what the AI did.</p>



<p>As we’ve seen, descriptions matter. Here’s what AI produced.</p>



<p>As we already understand, the description tells a lot about the author’s logic, so let’s look at it:</p>



<p>testWidgets(&#8216;should display a WordPair and update on button press&#8217;)</p>



<p>In this case, we quite a lot of things &#8211; with quite a lot of assumptions. And by “a lot” I mean “a lot relative to how simple the scenario is”. Remember that in real life, we usually develop much more complex scenarios.</p>



<p>What is assumed here?</p>



<ol class="wp-block-list">
<li>That we are using WordPair</li>



<li>That we display the WordPair</li>



<li>That we have a (<em>single</em>)<strong> </strong>button</li>



<li>That clicking this button updates the text</li>
</ol>



<p>While limiting us with all this coupling and assumptions, it has a few “gotchas”:&nbsp;</p>



<ol class="wp-block-list">
<li>It describes two scenarios: display and update on button press</li>



<li>What we should expect (besides a very general display a WordPair mention)</li>
</ol>



<p>This creates quite a vague description that not only allows for a lot of interpretation, it also hints on a code smell (coupling, remember?)</p>



<p>And how did the AI write the test? Here it is:</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist140747400" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-ai_test-dart" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-dart  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="ai_test.dart content, created by YonatanKra on 08:32AM on September 09, 2025."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="ai_test.dart">
        <tr>
          <td id="file-ai_test-dart-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-ai_test-dart-LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-en">testWidgets</span>(<span class="pl-s">&#39;should display a WordPair and update on button press&#39;</span>, (<span class="pl-c1">WidgetTester</span> tester) <span class="pl-k">async</span> {</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-ai_test-dart-LC2" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">await</span> tester.<span class="pl-en">pumpWidget</span>(</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-ai_test-dart-LC3" class="blob-code blob-code-inner js-file-line">    <span class="pl-c1">ChangeNotifierProvider</span>(</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-ai_test-dart-LC4" class="blob-code blob-code-inner js-file-line">      create<span class="pl-k">:</span> (context) <span class="pl-k">=&gt;</span> <span class="pl-c1">MyAppState</span>(),</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-ai_test-dart-LC5" class="blob-code blob-code-inner js-file-line">      child<span class="pl-k">:</span> <span class="pl-c1">MaterialApp</span>(home<span class="pl-k">:</span> <span class="pl-c1">MyHomePage</span>()),</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-ai_test-dart-LC6" class="blob-code blob-code-inner js-file-line">    ),</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-ai_test-dart-LC7" class="blob-code blob-code-inner js-file-line">  );</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-ai_test-dart-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-ai_test-dart-LC9" class="blob-code blob-code-inner js-file-line">  <span class="pl-c">// Verify initial WordPair is displayed</span></td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-ai_test-dart-LC10" class="blob-code blob-code-inner js-file-line">  <span class="pl-en">expect</span>(find.<span class="pl-en">textContaining</span>(<span class="pl-s">&#39;_&#39;</span>), findsOneWidget);</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-ai_test-dart-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-ai_test-dart-LC12" class="blob-code blob-code-inner js-file-line">  <span class="pl-c">// Tap the &#39;Next&#39; button</span></td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-ai_test-dart-LC13" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">await</span> tester.<span class="pl-en">tap</span>(find.<span class="pl-en">text</span>(<span class="pl-s">&#39;Next&#39;</span>));</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-ai_test-dart-LC14" class="blob-code blob-code-inner js-file-line">  <span class="pl-k">await</span> tester.<span class="pl-en">pump</span>();</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-ai_test-dart-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-ai_test-dart-LC16" class="blob-code blob-code-inner js-file-line">  <span class="pl-c">// Verify the WordPair has changed</span></td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-ai_test-dart-LC17" class="blob-code blob-code-inner js-file-line">  <span class="pl-en">expect</span>(find.<span class="pl-en">textContaining</span>(<span class="pl-s">&#39;_&#39;</span>), findsOneWidget);</td>
        </tr>
        <tr>
          <td id="file-ai_test-dart-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-ai_test-dart-LC18" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/6042e6fecfbb54df7b21e8a655ebe170/raw/d3e411666ae8d476e8fc86fa64c89d757b5db729/ai_test.dart" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/6042e6fecfbb54df7b21e8a655ebe170#file-ai_test-dart" class="Link--inTextBlock" target="_blank" rel="noopener">
          ai_test.dart
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>What can we understand from this test?</p>



<p>The first thing that’s prevalent is that it is not following the Arrange-Act-Assert (AAA) pattern. This might be a thing of preference. Do note that it arises from the description having two use cases for a single test block. Even if you do not “believe” in testing principles, it still violates separation of concerns, which is a general software principle.</p>



<p>Looking deeper into the code we see that we expect a single widget to contain an underscore on line 10:&nbsp;</p>



<p>expect(find.textContaining(&#8216;_&#8217;), findsOneWidget);</p>



<p>We then tap a button with the text Next, and expect&#8230; wait, what? That a single widget contains underscore? You can probably see where this is going…</p>



<p>Now comes the moment of honesty &#8211; what test description did you have in mind? Would it have led to the AI generating a similar vague (not to mention useless) test?</p>



<p>AI can generate code, but it cannot design meaningfully. That’s where human judgment is irreplaceable. We are here to make things meaningful.</p>



<p>This is where we &#8211; humans &#8211; make the difference.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Meaningful testing isn’t just about verifying functionality—it shapes software architecture and clarity. Humans remain essential to bring intentionality, design thinking, and meaningfulness where AI falls short.</p>



<p>In this article we explored how the way we write tests reflects and influences software design decisions and what to take into account to avoid wrong use of AI in testing.</p>



<p>Even small details in test descriptions (e.g., “should display text” vs. “should display text in a big card”) carry architectural implications such as specificity, coupling, and interface contracts.</p>



<p>Current AI-generated tests often lack meaningful design insight, producing vague or overly coupled tests. AI behaves like a fast, large-scale copy-paster at a mid-junior developer level, but lacks the critical thinking needed for meaningful software &#8211; and tests specifically &#8211; design.</p>



<p>Can it be different? Yes it can. I actually trained my copilot to write better tests &#8211; even TDD. Here’s one of its answers after brainstorming about architecture.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="128" src="/wp-content/uploads/2025/09/image.png" alt="A screenshot of a code test failure in a dark-mode terminal. The test title is &quot;diamond square &gt; should run diamond-square sequences&quot; with a red dot. The main body of the output shows a diff between an &quot;Expected&quot; and &quot;Received&quot; value. The &quot;Expected&quot; text is a long string of &quot;diamondStep squareStep&quot; values, highlighted in green to show what was missing. The &quot;Received&quot; text is a shorter string of the same values, highlighted in red. The code comment above the output says expect(received).toEqual(expected) // deep equality." class="wp-image-2207" srcset="/wp-content/uploads/2025/09/image.png 1024w, /wp-content/uploads/2025/09/image.png 300w, /wp-content/uploads/2025/09/image.png 768w, /wp-content/uploads/2025/09/image.png 268w, /wp-content/uploads/2025/09/image.png 1124w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>If you’re interested in that experience, do let me know in the comments (or DM) &#x1f642;</p>



<p></p>

