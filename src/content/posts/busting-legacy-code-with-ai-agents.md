---
title: Busting Legacy Code with AI Agents and Test Driven Development
slug: busting-legacy-code-with-ai-agents
published: 2025-11-25T08:05:44
updated: 2025-11-25T10:11:21
author: Yonatan Kra
description: Introduction How to eliminate legacy code? Martin Fowler and Michael Feathers both agree that lack of tests are core factor in legacy code. With AI agents, tackling legacy code and turning it into “evergreen” code is easier than ever. What is legacy code? Ah, the familiar smell of legacy code waiting to be tackled. Do [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
  - name: Javascript
    slug: javascript
    path: javascript
  - name: Uncategorized
    slug: uncategorized
    path: uncategorized
tags:
  - ai agents
  - javascript
  - tdd
  - testing
canonical: https://yonatankra.com/busting-legacy-code-with-ai-agents/
comments: []
---

<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b192e1990" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b192e1990"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/busting-legacy-code-with-ai-agents/#Introduction" >Introduction</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/busting-legacy-code-with-ai-agents/#What_is_legacy_code" >What is legacy code?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/busting-legacy-code-with-ai-agents/#What_does_legacy_code_look_like" >What does legacy code look like?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/busting-legacy-code-with-ai-agents/#Is_the_code_legacy_code" >Is the code legacy code?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/busting-legacy-code-with-ai-agents/#How_to_Convert_Legacy_Code_to_Clean_Code" >How to Convert Legacy Code to Clean Code?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/busting-legacy-code-with-ai-agents/#What_we_used_to_do" >What we used to do</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/busting-legacy-code-with-ai-agents/#Covering_the_code_with_AI" >Covering the code with AI</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-8" href="/busting-legacy-code-with-ai-agents/#Setting_Up_Our_Environment" >Setting Up Our Environment</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-9" href="/busting-legacy-code-with-ai-agents/#Prompting_Up_Tests" >Prompting Up Tests</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/busting-legacy-code-with-ai-agents/#Small_Step_to_AI_Big_Step_for_Devkind" >Small Step to AI, Big Step for Devkind</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/busting-legacy-code-with-ai-agents/#Preventing_Regressions_when_working_with_AI_agents" >Preventing Regressions when working with AI agents</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-12" href="/busting-legacy-code-with-ai-agents/#Testing_Complex_Legacy_Code" >Testing Complex Legacy Code</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-13" href="/busting-legacy-code-with-ai-agents/#Coupling_and_Hidden_Meaning" >Coupling and Hidden Meaning</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-14" href="/busting-legacy-code-with-ai-agents/#Leveraging_the_Experience" >Leveraging the Experience</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-15" href="/busting-legacy-code-with-ai-agents/#Summary" >Summary</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-16" href="/busting-legacy-code-with-ai-agents/#What_AI_Is_Good_and_Bad_At_in_TDD" >What AI Is Good and Bad At in TDD</a></li></ul></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Introduction"></span><strong>Introduction</strong><span class="ez-toc-section-end"></span></h2>



<p>How to eliminate legacy code? Martin Fowler and Michael Feathers both agree that lack of tests are core factor in legacy code. With AI agents, tackling legacy code and turning it into &#8220;evergreen&#8221; code is easier than ever. </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_legacy_code"></span><strong>What is legacy code?</strong><span class="ez-toc-section-end"></span></h2>



<p>Ah, the familiar smell of legacy code waiting to be tackled. Do you like it as well? Wait, what? You don’t like handling legacy code?</p>



<p>But&#8230; but&#8230; it’s the kind of code developers work with 80% of the time!</p>



<p>It’s not surprising at all that developers think badly of legacy code. After all, it has the tendency to be less readable, more prone to break and harder to maintain. So in the least, it slows us down and tends to break when trying to speed up.</p>



<p>Martin Fowler defines legacy code as code that’s usually quite complex, often lacks good tests and is sometimes simply code written by someone else.</p>



<p>That’s quite an obscure definition.&nbsp;</p>



<p>Michael Feathers, in his book &#8220;Working Effectively with Legacy Code,&#8221; offers a closely related but more specific definition: &#8220;Legacy code is code without tests.&#8221;</p>



<p>No matter which side you’re on &#8211; Fowler or Feathers &#8211; they both share two things: a surname starting with “F”, and the same core complaint about legacy code: not enough tests.</p>



<p>Hence, tests must be at least a major part of the solution.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="What_does_legacy_code_look_like"></span><strong>What does legacy code look like?</strong><span class="ez-toc-section-end"></span></h3>



<p>We will take a look at code from this repository:</p>



<p><a href="https://github.com/lucaminudel/TDDwithMockObjectsAndDesignPrinciples" target="_blank" rel="noopener">https://github.com/lucaminudel/TDDwithMockObjectsAndDesignPrinciples</a></p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="304" src="/wp-content/uploads/2025/11/image-4.png" alt="GitHub repository file listing showing folders and files with last modified dates ranging from 5 months to 13 years ago" class="wp-image-2241" srcset="/wp-content/uploads/2025/11/image-4.png 1024w, /wp-content/uploads/2025/11/image-4.png 300w, /wp-content/uploads/2025/11/image-4.png 768w, /wp-content/uploads/2025/11/image-4.png 1536w, /wp-content/uploads/2025/11/image-4.png 190w, /wp-content/uploads/2025/11/image-4.png 1600w, /wp-content/uploads/2025/11/image-4.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>As you can see, the code is old. Some of the files were not updated for 13 years.</p>



<p>Does this make it legacy code?</p>



<p>Not necessarily. If it’s easy to run the tests, and the tests are sufficient, then it should be easy to maintain the code.</p>



<p>Let’s dive deep and see.</p>



<p>* For the purpose of this article we will focus on the JavaScript exercise in this repository.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Is_the_code_legacy_code"></span><strong>Is the code legacy code?</strong><span class="ez-toc-section-end"></span></h3>



<p>Let’s focus on the telemetry-system folder and its tests. While probably not as complex as systems you develop in your day-to-day, it is certainly not a simple Fizz-Buzz.</p>



<p>The code consists of two implementation files that were written and updated 12 to 14 years ago.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="130" src="/wp-content/uploads/2025/11/image-5.png" alt="GitHub file listing showing two JavaScript implementation files: telemetry-client.js and telemetry-diagnostic-controls.js with modification dates from 12-14 years ago" class="wp-image-2243" srcset="/wp-content/uploads/2025/11/image-5.png 1024w, /wp-content/uploads/2025/11/image-5.png 300w, /wp-content/uploads/2025/11/image-5.png 768w, /wp-content/uploads/2025/11/image-5.png 1536w, /wp-content/uploads/2025/11/image-5.png 268w, /wp-content/uploads/2025/11/image-5.png 1600w, /wp-content/uploads/2025/11/image-5.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>There’s also a test file, also written 14 years ago:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="103" src="/wp-content/uploads/2025/11/image-9.png" alt="GitHub file listing showing test file telemetry-diagnostic-controls-test.js last modified 14 years ago" class="wp-image-2246" srcset="/wp-content/uploads/2025/11/image-9.png 1024w, /wp-content/uploads/2025/11/image-9.png 300w, /wp-content/uploads/2025/11/image-9.png 768w, /wp-content/uploads/2025/11/image-9.png 1536w, /wp-content/uploads/2025/11/image-9.png 268w, /wp-content/uploads/2025/11/image-9.png 1600w, /wp-content/uploads/2025/11/image-9.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>So, just from looking at the files we see we have an old code base with a single test file that probably tests only the telemetry-diagnostic-controls.&nbsp;</p>



<p>Because both definitions of legacy code mention tests, let’s take a peek into the test file.</p>



<pre class="wp-block-code"><code>describe('Telemetry System', function () {

    describe('TelemetryDiagnosticControls', function () {

       it('CheckTransmission() should send a diagnostic message and receive a status message response', function () {

       const target = new TelemetryDiagnosticControls();
target.checkTransmission();

       const result = target.readDiagnosticInfo();

       });

    });

});</code></pre>



<p><br>The obvious is that there aren’t enough tests. Actually, there are no tests at all, since there’s no expectation. That’s expected as the Kata is meant to train us in covering the code with tests &#8211; but is it different from most code bases?</p>



<p>Both definitions of legacy code mention lack of or low quality of tests as a criteria.</p>



<p>So this code is not only old, but also not tested. Hence, it is legacy code.</p>



<p>Moreover, because we were never involved in this project, it is also legacy code in the sense we didn’t write it (Fowler, et. al.). We need to read most of its lines of code in order to understand what it does.</p>



<p>Is there a way to make code not legacy? To be both tested and easily understandable without reading every line of code?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Convert_Legacy_Code_to_Clean_Code"></span><strong>How to Convert Legacy Code to Clean Code?</strong><span class="ez-toc-section-end"></span></h2>



<p>Since testing is emphasized in both definitions of legacy code, writing tests will satisfy most of the requirements to eliminate legaciness.</p>



<p>We will skip the part in which we “revive” the testing infrastructure. 14 years can make a mess of old libraries. Let’s start to cover our code.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="What_we_used_to_do"></span><strong>What we used to do</strong><span class="ez-toc-section-end"></span></h3>



<p>In the “past”, when one needed to cover legacy code in tests, one would go over the lines of the old code, test them, refactor and move on to the next lines of code.</p>



<p>This process, while worthwhile and definitely preferable to just going over the lines, understanding what the code does and not testing it in the process,&nbsp;</p>



<p>Today we have AI, and the process is so much faster.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Covering_the_code_with_AI"></span><strong>Covering the code with AI</strong><span class="ez-toc-section-end"></span></h3>



<p>For this part, we will be working with VSCode and github co-pilot. Feel free to use any other co-pilot.</p>



<p>We will start by testing the <a href="https://github.com/lucaminudel/TDDwithMockObjectsAndDesignPrinciples/blob/master/TDDMicroExercises/Javascript/telemetry-system/telemetry-diagnostic-controls.js" target="_blank" rel="noopener">telemetry-diagnostic-controls</a>.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Setting_Up_Our_Environment"></span>Setting Up Our Environment<span class="ez-toc-section-end"></span></h4>



<p>Because the current test is meaningless, we can start with a blank test suite:</p>



<pre class="wp-block-code"><code>describe('TelemetryDiagnosticControls', function () {

});</code></pre>



<p>And now set our IDE to show the test file, the implementation file and our co-pilot chat window:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="416" src="/wp-content/uploads/2025/11/image-26.png" alt="VSCode IDE screenshot showing three panes with test file on left, implementation file in center, and GitHub Copilot chat window on right for AI-assisted test development" class="wp-image-2263" srcset="/wp-content/uploads/2025/11/image-26.png 1024w, /wp-content/uploads/2025/11/image-26.png 300w, /wp-content/uploads/2025/11/image-26.png 768w, /wp-content/uploads/2025/11/image-26.png 1536w, /wp-content/uploads/2025/11/image-26.png 139w, /wp-content/uploads/2025/11/image-26.png 1600w, /wp-content/uploads/2025/11/image-26.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="Prompting_Up_Tests"></span>Prompting Up Tests<span class="ez-toc-section-end"></span></h4>



<p>Prompting is easy; writing effective prompts requires practice.</p>



<p>I could ask it the following:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p><code>Write the tests for the component</code></p>
</blockquote>



<p><code>The tests suite the AI Agent generated is long and cumbersome.</code></p>



<details class="wp-block-details is-layout-flow wp-block-details-is-layout-flow"><summary><code>Click here to see the tests code. While at it, answer honestly: how eager are you to read them? (pro tip: don't read the tests - keep reading the article)</code></summary>
<pre class="wp-block-code"><code>describe("TelemetryDiagnosticControls", function () {


   describe("constructor", function () {
       it("should initialize with empty diagnostic info", function () {
           var controls = new TelemetryDiagnosticControls();
           expect(controls.readDiagnosticInfo()).toBe('');
       });


       it("should accept a telemetry client as parameter", function () {
           var mockClient = jasmine.createSpyObj('TelemetryClient', &#91;'disconnect', 'connect', 'onlineStatus', 'send', 'receive']);
           var controls = new TelemetryDiagnosticControls(mockClient);
           expect(controls._telemetryClient).toBe(mockClient);
       });


       it("should create default telemetry client if none provided", function () {
           var controls = new TelemetryDiagnosticControls();
           expect(controls._telemetryClient).toBeDefined();
           expect(controls._telemetryClient instanceof TelemetryClient).toBe(true);
       });
   });


   describe("readDiagnosticInfo", function () {
       it("should return empty string initially", function () {
           var controls = new TelemetryDiagnosticControls();
           expect(controls.readDiagnosticInfo()).toBe('');
       });


       it("should return the diagnostic info that was written", function () {
           var controls = new TelemetryDiagnosticControls();
           controls.writeDiagnosticInfo('test diagnostic data');
           expect(controls.readDiagnosticInfo()).toBe('test diagnostic data');
       });
   });


   describe("writeDiagnosticInfo", function () {
       it("should set the diagnostic info", function () {
           var controls = new TelemetryDiagnosticControls();
           controls.writeDiagnosticInfo('new diagnostic info');
           expect(controls._diagnosticInfo).toBe('new diagnostic info');
       });


       it("should overwrite existing diagnostic info", function () {
           var controls = new TelemetryDiagnosticControls();
           controls.writeDiagnosticInfo('first info');
           controls.writeDiagnosticInfo('second info');
           expect(controls.readDiagnosticInfo()).toBe('second info');
       });
   });


   describe("checkTransmission", function () {
       var mockClient;
       var controls;


       beforeEach(function () {
           mockClient = jasmine.createSpyObj('TelemetryClient', &#91;'disconnect', 'connect', 'onlineStatus', 'send', 'receive']);
           controls = new TelemetryDiagnosticControls(mockClient);
       });


       it("should clear diagnostic info at the start", function () {
           controls.writeDiagnosticInfo('old info');
           mockClient.onlineStatus.and.returnValue(true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           // Should be cleared before receiving new data
           expect(mockClient.disconnect).toHaveBeenCalled();
       });


       it("should disconnect the telemetry client first", function () {
           mockClient.onlineStatus.and.returnValue(true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           expect(mockClient.disconnect).toHaveBeenCalled();
       });


       it("should connect successfully on first attempt", function () {
           mockClient.onlineStatus.and.returnValue(true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           expect(mockClient.connect).toHaveBeenCalledWith('*111#');
           expect(mockClient.connect.calls.count()).toBe(1);
       });


       it("should retry connection up to 3 times if offline", function () {
           mockClient.onlineStatus.and.returnValues(false, false, false, true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           expect(mockClient.connect.calls.count()).toBe(3);
           expect(mockClient.onlineStatus.calls.count()).toBe(4);
       });


       it("should throw exception if unable to connect after 3 retries", function () {
           mockClient.onlineStatus.and.returnValue(false);
          
           expect(function () {
               controls.checkTransmission();
           }).toThrow('Unable to connect');
       });


       it("should send diagnostic message after successful connection", function () {
           mockClient.onlineStatus.and.returnValue(true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           expect(mockClient.send).toHaveBeenCalledWith(TelemetryClient.diagnosticMessage());
       });


       it("should receive and store diagnostic info after sending message", function () {
           var expectedDiagnosticData = 'LAST TX rate................ 100 MBPS';
           mockClient.onlineStatus.and.returnValue(true);
           mockClient.receive.and.returnValue(expectedDiagnosticData);
          
           controls.checkTransmission();
          
           expect(mockClient.receive).toHaveBeenCalled();
           expect(controls.readDiagnosticInfo()).toBe(expectedDiagnosticData);
       });


       it("should connect on second retry if first fails", function () {
           mockClient.onlineStatus.and.returnValues(false, true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           expect(mockClient.connect.calls.count()).toBe(2);
           expect(mockClient.send).toHaveBeenCalled();
       });


       it("should connect on third retry if first two fail", function () {
           mockClient.onlineStatus.and.returnValues(false, false, true);
           mockClient.receive.and.returnValue('diagnostic data');
          
           controls.checkTransmission();
          
           expect(mockClient.connect.calls.count()).toBe(3);
           expect(mockClient.send).toHaveBeenCalled();
       });


       it("should not send message if connection fails", function () {
           mockClient.onlineStatus.and.returnValue(false);
          
           expect(function () {
               controls.checkTransmission();
           }).toThrow();
          
           expect(mockClient.send).not.toHaveBeenCalled();
           expect(mockClient.receive).not.toHaveBeenCalled();
       });


       it("should use diagnostic channel connection string", function () {
           mockClient.onlineStatus.and.returnValue(true);
           mockClient.receive.and.returnValue('data');
          
           controls.checkTransmission();
          
           expect(mockClient.connect).toHaveBeenCalledWith('*111#');
       });
   });
});</code></pre>



<p></p>
</details>



<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>



<p>But hey, who cares, right? It&#8217;s amazing! The AI generated tests for our code with a single prompt!</p>



<p>Now we have tested code. No more legacy code. Problem solved.</p>



<p>Or is it?</p>



<p>When trying to run the tests, we get a disturbing picture:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="497" src="/wp-content/uploads/2025/11/image-27.png" alt="Test results showing 18 specs with 5 failures displayed in red, indicating test execution errors from AI-generated test code" class="wp-image-2264" srcset="/wp-content/uploads/2025/11/image-27.png 1024w, /wp-content/uploads/2025/11/image-27.png 300w, /wp-content/uploads/2025/11/image-27.png 768w, /wp-content/uploads/2025/11/image-27.png 1536w, /wp-content/uploads/2025/11/image-27.png 116w, /wp-content/uploads/2025/11/image-27.png 1600w, /wp-content/uploads/2025/11/image-27.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>5 of our new and shining tests fail!</p>



<p>Did the AI just create legacy code we need to fix?</p>



<p>Remember I told you not to read the tests? Most developers will skip reading the code generated by the AI. Why? Because it is a lot of code to read! Just like <a href="https://graphite.com/blog/how-large-prs-slow-down-development" target="_blank" data-type="link" data-id="https://graphite.com/blog/how-large-prs-slow-down-development" rel="noreferrer noopener">many developers will just write LGTM when faced with a huge PR</a>.</p>



<p>Aside from the tests not passing, looking deeper at the tests, we see the AI made some basic testing errors:</p>



<ol class="wp-block-list">
<li>It is testing private variables &#8211; when testing, one should test the components’s/module’s interface. <a href="/a-tale-of-implementation-and-detail/">Testing private properties or functions is actually testing implementation detail</a>. This makes our tests fragile.</li>



<li>It created a test description that didn’t match the test itself &#8211; It is critical that a test&#8217;s description clearly conveys its meaning and matches the code&#8217;s intent for both easy maintenance and verifying the correct functionality.<br><br>In the code below we see a description: <code>should clear diagnostic info at the start</code>. The test itself expects a disconnect method to be called on the mockClient object.<br><br><img loading="lazy" decoding="async" width="1082" height="454" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDoAAAHGCAYAAACVRet8AAAQAElEQVR4AexdBWBVNxf+Xr1UKFAoWtzd3d0dhrszbGPIYGNj/NuADRkyBozh7g5DBgx3d4a7Flrqf07am3vf63vte+17NQI9LyfJyUnyJTf35tzcxM7X1zdcksRA9gHZB2QfkH1A9gHZB2QfkH1A9gHZB2QfkH1A9oFk3Qc+mbm/HeQ/iYBEQCIgEZAISAQkAhIBiYBEQCIgEZAIfLIIyIonNwSkoSO5taisj0RAIiARkAhIBCQCEgGJgERAIiARsAYCUodEIIkiIA0dSbThZLElAhIBiYBEQCIgEZAISAQkAhKBhEFA5ioRkAgkbgSkoSNxt48snURAIiARkAhIBCQCEgGJgEQgqSAgyykRkAhIBBIFAtLQkSiaQRZCIiARkAhIBCQCEgGJgEQg+SIgayYRkAhIBCQC8YmANHTEJ9oyL4mAREAiIBGQCEgEJAISARUByUkEJAISAYmARMAGCEhDhw1AlSolAhIBiYBEQCIgEZAIxAUBmVYiIBGQCEgEJAISgdgjIA0dscdOppQISAQkAhIBiYBEIH4RkLlJBCQCEgGJgERAIiARiBEBaeiIESIpIBGQCEgEJAISgcSOgCyfREAiIBGQCEgEJAISAYmAgoA0dChISFciIBGQCEgEkh8CskYSAYmAREAiIBGQCEgEJAKfHALS0PHJNbmssERAIiARACQGEgGJgERAIiARkAhIBCQCEoHkioA0dCTXlpX1kghIBGKDgEwjEZAISAQkAhIBiYBEQCIgEZAIJHEEpKEjiTegLL5EIH4QkLlIBCQCEgGJgERAIiARkAhIBCQCEoGkgYA0dCSNdpKlTKwIyHJJBCQCEgGJgERAIiARkAhIBCQCEgGJQKJCQBo6ElVzJJ/CyJpIBCQCEgGJgERAIiARkAhIBCQCEgGJgEQgIRCQho74RV3mJhGQCEgEJAISAYmAREAiIBGQCEgEJAISAYmADRFIJIYOG9ZQqpYISAQkAhIBiYBEQCIgEZAISAQkAhIBiYBEIJEgYPtiJFtDh6uDC0aU+hKjSn+FBtnq2h5JmYNEQCIgEZAISAQkAhIBiYBEQCIgEZAISARii4AZ6ZyKNINDy2mcdK5eZqQAnMv34PJOTX6Czs7erDTxJWTvmQFO9cbCrud6hA05iLBRFxH+5Yk4Z29VQ0f27OlRuHB2FCqUPc4Fi6uCLvk7obZvLdTMUgN+Qe+jVZcyhQvSeKTg5ObspCdrb6fj4Uq8vZ1VIdPLizxFsvigeNYMnMif1Ilwq1UoJ4xRqRyZrFY9Rwd7jhlhlzl1SqvptYUi6lPG8FDC7HQ6W2QrdUYikMrdVfQVuvYjg2N00nt5IHu6VMiW1rwbSowKpUCiQ8DFyYG3MbWzl5tLoiufpQVKjPWhe2z+jGnFNUhjtqX1kvIJiwD1K2o3olzpUydsYWTuiRqBFE6O4hna2JhK92N6TiQi2URdGTMK5+DiBs8sBeCVs4QgM5JJkWgQcEmVEe4+OeGWLjuiEfukonQpUuNd81/wnhk7grKUQHjAG7PqHxYaxNO8K9kODuV7mpUmPoQcs5XFhy+O4h0rkz+rT1AqXwS5eCDQLe73F6vO2ufN+xLTpg3A9OkD4gMXk3mkS5EWrXK35PGP3j/GwUf/ct7Uz9TO9TG/dzNOE9vX0RMrlysLD1fiC2ZKqxdvbc93rWvg21bVOVlbd0LoK+qbHgPrljVKn7Nwa5WpXtFcHDPCrlvV4tZSaxM9zg4ORvFQcHKwt+plaZM6JGWlQ+qVF32lQu4sZldldvdGmNKpPqZ2bmB2GimYtBBoV6EIb2Nq546ViiWtwhspbWKqT90iubFycBssHdgKP7arLa5BGrMzpHI3UnoZlFgRyJrGS7TfyCaVE2sxZbkSAQL9apcRz9AL+jTXKxE961CY8nzdoVJRvfik5PEp2QBlRm1Eqa/WokC3X5Gvw/8EuaTOaOuqJGv9RQfOR6E+M1G47+xkXU9LKmdfZzRg58CTuOwYz11zfkJOLoOT/2su6lfrK5i7EoQnsOFPUOMfVe1hIfC4sBGeB2bAY9f/1PBYcoliRpU2bUr89ttATl991TaWVVGTDSjST3hmX/hd8OYwdgaIONjbm5NMyphAICAoxESMdYN10FlXoQ21hYaH21C7VB0TAtoVM2GyKWKCK1HHF8nig9HNqnCqmt+6KwnDk9l1mpD1ISNHv9qlQUZe4x3K4MZrXCjZhA6oU5b32RGNK8HeLuHuXbSiTbl+OlVO+oa9xNRBbDk2JUQ9rVEfnU6/r9sZ+K1fr/jRSEaO7A0Hwc7R2WiGuiT0fGq0AhYGZijXHPnafstJrsKwEDwzxO29c+J98dZc0vXlbQRd3cV5c37Cw0Lh/PfPEaLMUOLAjB0RnoT7pU9oAlmdlBK4z2mM4DWDELRnEoKPzFeCY+0miqcLLy93FCyYjVPVqkViXRlKmMY1DSpmrEAs3gW9w5HHxzgvfxIGgSM37qHTzLXoNCuCvlm1J2EKkohyDQwOQfvfVgtMCBtp/EhEDSSLkmQQyJUhDcrkzMypQh7zV+ckmQomk4J2q6ausnv85h0W/HMav2z9V9Cr9/7JpKbmVaNagWy8z5bP4wsXR0fzEtlAys3FkZeDrqE6RXLaIIdPV2WiHpti0SzJrT6xgMBkkqy1e4u4jy8f4t7uP3Bz3U+CgvxeiPhPgUmTryK88pbn5JYp76dQ5Xito66S+jLf4cBMi/MOObMa9iGBPJ1fibbQOaXgfEL92KfKKrK2D/qAkCeXhd8ajFUNHTt3nsS+feewceNha5QtVjqa5Wgs0m27s13wkkk4BPw+BsIvIILeMT7hSpJ4cvYPChaYEDYJ+bY18aCSuEuy/uQVbDlzHcsPX0jcBZWlizUCJ2495G1M7bzz/I1Y60ksCRNDfWhPDhfHiCW2ZNAdtHA7Np68ioNX7woi429iwUyW49NFQNZcImApAvbObrBzcolIxt6Wn5/TD4+OrMOLi/sFhQZHTCojhOSvpQg8ObwaT49vxMP9iy1NmuzkySjxvmjziHqFhSDk0tYI3oLfcJbO7eKWiBR2DnAs3iaCT6DfcCdXkbP9h5eCtxZjVUPHxIkrMH78Ykybts5a5bNIj06nQxOtoeO/nRall8ISAYmARMAUAosOnMW8vSex8og0dJjCKKmHX7z/lLcxtfPNJ6+SenWQGOqTJY2nwPGVnz+CQ0KFXzJJAgFZSImARMAEAm5p1bfRgX4vEBYSZEJSBscWgbt7/sSdHbNx/8DS2KpINumcirUCmHGCKuR+bQ/CgwOItZjCTi0TaQIr9hF8QjP2zAhj7TLEydDhyN7SuLo6wxhFV1CSz5AhNRRKl049xcDBwV6EK/HkpkrlEZ1KHpc3VR64Obpx/nnACzz68IjzCfGTJ30a1C6cC12qFufUsHgevsu8vZ3lkNMO5+Vz+6J7tRJcpyUbt+lY5emUiPrFcqNH9ZKoWTAHzEnvyNrBw8UZRE6MZ2qM/lHZSMbN4LQao8JWCKS8KubxRTeGRbUC2Xn5rKA2TiroO+fSOTKhfcUioO+ca3CM1Yd7xMM/HctDaWfqJ4RNupTmb/BHu53TKTiNSuTl/ax12YKgb3IpnKk264/6SRr3FCDS9gdf75RozPRS/2tRpgDXa5bCOApR/WlvAOorJbNnhIO9ZdeevZ0dqE7GyJKi0W7y1Gebly7Ar0EaC3KlTw17O8vKk97LAw3YdUxjCp12oNSHvnNWyki8YdnomqE2IdKmKZg5He+vTUvlQ+4MaSz6iph0Up/vWKko2pQrxNvU2dHBMOto/XTdlM2ZGdQnetYoxfQUBPVbn2j6LfUrqodC7i5OIg/ilXCtS2OUEDJgdMyvYGfo2ttRLBOw8I/qRdgkxHhAJTash+I3pz78BITIa1ipNuFnyf2H5LX4U79VdIWFh/PxQRtPeCnxplxr9DdTui0JpzGW+uhnFQqje7USoLE+Y+ron02oTbT1JV6bZxoP1yiYUDvABv+oL1D+CqVKob5Jc7S3j1IOkiPszS0KlVsZc2nMM6dttbrTerqB9tqhexiNk3T6EeGnlYkPnp6RquTLhnasnem+1axUflB9aPwxlT/FEV4K0XikyBKvhGtdulYUGWNubPqboR5qAyVPO/YykOLpPlApb1b+zEL3R3pWJTmKU8gW9VF0J2WXVm84e3hDIZfUGUR1wsPDRLgS7+iWUsQrjE5nBwdXjwjSvM2GwT87B6cIGSZLaQyieZySj529A48mOc+shZG1ZndkLN8C7hnzsnDLriLaM8EtfU6kL9UI2er2RcYKLZEqV2koeTCFen9UR6Uc5OocnEW8k3vqKJhwmWiONtXZOcCe1d0YCcVmMi4pfZC2cA1kr9MHGcs2g3uGPNDpYn72cnJPI8qtZEVt752/EteVrng9JMQmsyGFmyrFge7iZsFbyoTcOyk+XwlMmRH2XpktVZFk5GNu7WiqsnPnT9i6dYJRiiYZ2rSpgqVLRwsaP76bECfjiTZO4WfNGiRkTDEl05UQURdfXhJ8fDL04L6gb3NM7FAXA+qUQXN2gyTqxR7kaXf5NUPa4qvGlcwqkr2dHSa2r4sVn7fBiCaV0KRkPq5zdvcmGFi3HGIausiosWZYO9ApEX1qluaTzc/rlQOlXzGoDWiiY6ogdINfPKAliPrVKm1KDMsHtuYyS5isSSErRNjb6fBNi2o8r+EMv6YMiyH1y3P/d61qwC7yBm6FrMxWQYaAJQNbYWG/Fvi6eVU2USuElmwiP4hj3AizezRCiWwZzdYXW8F2FYpgnaadqZ8QNn/0bIL5fZpFa9iiI22pnMs+b40xrA49mTGM0tPu59+3qQkKn8P00GQdMfyrWSgHz4/yHNW0CuhhanLHepjepSGf4DcukRedKxcD6V3YvwV/qI5BZayi6WF7Xu+moPrTBojUV8ayvrNmyGdoyQw45ipdO/QzrBrc1iiZo4MekKlv0I7y1Ge7VCnGr0EaCyZ3qAfST/2GcIpOH9WHMP29R2P0ZtcxjScRY8lnICPFyKaVRRnrFskVRdUPrB0pPVHJ7Jl4W1DeE9rWAvXXblVLYBIbZ6awdqKH2ygKNAE06fmFtSmNC1T2VgxPmtBTm65kYwqNbfZ2dpoUUdkUTo74omFF/MXGyVHNqvA+0YgZgttXLArqt9TfqH/ky+gdJfEXDSuIPkb1acGMR4oQjWcUZkh0fSgyhi4ZWEy1cb/aZQ3Fo/UnhvEgrvX5s3czga+9XezuP22Y4UvbBtSmCnBkxNLGEU/XCE1wFRmta43+ptUXG57KMKZZVX5iDN1LqT6flS/M78c01s/q1hjr2fhramzxcncVmFJ9iciooJSFxkcK0xK1gxJvTVc7RlN+NAYo+unzIgozpPFsnFBkTLnUfnTN0gkayphLYx5d4/QcYiqdEk6GwZWD22Bur6YY2qA8x5bGSTr9aDUbhylekbWlS6uPJrFnN3pGGsbGWVrviQAAEABJREFUmrasnem+1ZW9sKL60IlBdL80ZtS11tgU1/5miM8sdt9Q2pSM/2TAoee/LxtV5M8sdH+kZ1VqK3pRo6S3Vn0UfcnFzVK5PYoPXSIoR7PhomouXhlEuCJT8ouVcEmZTsgQ454xD0oNX82pSP8/KMgoFek9k8uQrIdvoSgyBTtPFPmlyl2GGSX6oMyYrSjQZRIyVGwD39q9UajnNBTtMwsOLm5R0hsG2DHjQp4WI1GW6SjM8s7WYCDSl20G31q9kLf9eH6qTK6mX4LktGmLDVwgykH1dsuYW0Rnrt5ZL47iiTyi2buj7JgtKD16k1ESimNg3JihptRXa1Bs8ELkbP4VfMo1h2/dvijUazrHKAPzR6eCyqiQjhleCnWfijIjNyBX6zFcV47GQ1Bs4J/I1XgoU6NjFA9/zEDzIXMxkVHY3ROCjw3j/OCsSGaXs5LgkxsT/RNpEqttaZ+SosQXXsT/8vJS7K3+KPbgnspNfUsiChTJ6HQ6lGBvlyO90To0QcnD3rQaE6rFJpWd2MTJWByF0cPY52zCbc/yI78hubC3r/SQ07x0fsMoi/w6ne0vcHoLNYM9TJrCrWjW9IgOC4sqZKYw4UuTO/doVrJk8PLkE1EzVVosRg9Ev3VtiLblC0GnM94O9CaHHsRLmuhzdYvmApUzusxpckKTT1M6TKUd0aQycvmkNhqd0tUFqdxdYO1/tHqEDALeHsZv6p0qFUWhLPoPHdYug6KvfrHcMHxLpsQpLj3A08N9Wk/j5aUHb6oPtaOSRut2Y0YK7XUR0ykydL3Tg7tOF7W/ZPNOif9FM6mht4vz+jRFThNtSuWqkMcXc3s3NVlvMkjSRKJyvqwm+yzpof6RJ0NUQwfFWUph4aaP1nFwMH0LDI8mnWEZzBkP6Dojw5RhWmv6rVUfKlNc7j+U3hJysLePIm6N/hZFaSwCaMVFqZyZojkxBrwv09gyvnVNi1dqIYn/c2GGyymd64OuWcOq6HQ60HNI/oxpDaOEn66dr5mR3dnBQYRpGQc7O/4ioVPlotpgq/Nk5J3EDNC506eJVjddxzGN69Eq0EQaG5ts2d9806TkhiTCVFMMzup0OhRjz1LcE8sfY/WJpapklUxn7xir+ugc1RWLMSlIX74VM0o052ORoayrT3YU7DLZMFjP754xL0p+sQKpC1XTC9fz2NnDu2gtOKZIqRccK4/p23Ks1GkT0WqLQr1mwMHFXRsseJ1Oh6x1+iB/h/+JsOiYAl0mwj1zPqMi3sXrImtN9WW9USErBTpkLAQwowupo007Q/2eEBtrsrurHtYRnrNyrPXENaGdq1dcVUSb3vRTXrTJIiJnztyIP//cKSgiNObfXbtOYcqUtYKWL98rEoWEhIpwrcy33y4UMqaY7J7q8YLX35i/kdyr9wH4GBzC6YWf/vdO/oFBPFyJf+2vH68tC73JUPxvAz5ixs5j6PfnJkZb8OPGg9h+7gaCQ0MVkRjd/JnSIiQsDMv+PYdxq/dizp4TCAxRj2ulpZ00cTBUlD9zWtDyWiX8hd8HzNx1HKOW78b8fad4fZQ4esNurZu2otPaLi2Nz+ClDlhHb9zH92v3Y/y6/Th+6wHPzpRBh0da+adukdx6+H4ICsbiQ+fw9cq/OcZ/7j+N/168tXKuUdXRm68s7MFFiTl56yH+t+EAhi3Zjtm7T4DKRXE6nQ70NsrB3vTlTv1146mr+HXrYQxZtA3Dl+3E/P2nhA56MPqqSSXoSKEZVJD1QZrEk+j9l++w9cx1zN17krsvbXjCwpD6FfQmJGuPX+ZtMmXbETx+856KA53OvFpQGsJRIZ44Fj/3X75l1/B53jYDF2zl/WTz6WsIjZxIk2GUHvaNqTaszxaGI/Wznzcdwn/PXvMk1DacMeNHWSWx88JN/LD+H0ze8i/D5Z1ImTWtF4hEgIYZ0qCiHrbUpt+t2YcJTM+R6/eEZGo3V/Sopq6uExGMKZsrCzKl9mRcxN++S7fx1dKd6PHHBoxcvouPcXefv4mINPK7hI2FkzYfgkL/XrsrpAgPJVzrrmN9QAgZMJtPXuPXitLGpMNAJEZvYhkPqKDWqA/pIYrt/Wc361t6+J9Qd1APCA4WbaeVecnuUZSnlqzR37T64sqT4evsf4/5uPjNqj2ga5nuQaduq5/IFvb1QZOStFRczY02m9bWlXjl2icpek6gMC2NYfopztp0/OZDPfzpXqXkQc8W2jIo/GR2vSkyxlwy9hPRuD7n7xP8WWXt8UsgvBT5LlWLK6yeS8Zg7bPK4zfvQOMu3YMof+1Y0LJMQZDxS0+BFT29a5QEvQAildQ+tOn0oIVb0WvuRtA4R/63/h8p2ihZe2wi/GLT34wWLjJwRNPK/P5Hz5VH2HPUooNn2b3pHOjZgfKLFOOOterzhmGmPD8rzyQ8A/ZDc10ljtxHr9V7EYtOlH9Pz+zAjTX/E/T431WinKFBASJcKxP07rmQsRXjkaUAV/389DZcW/Etbq79EXQCDA9kP2TsMHXUq05nh3wdJ8DeOQWTjPh7c+UQbm2YhAu/9+N1enpiExAWGhFp8HtjzQ9cRqlz4Gt1THxmgBeXWfU93j24YqBF9d5aPxF3tk4XpMbEzNk7OiN7g4HQ6SKe88JDQ3Dv73m4vOAL3N4wCR9f3BdKUuYsgTQFqgi/KYawJT0P9v2FK0tG4b/tMxCm2WDWp0xTlp/p52tTei0N16UvKJK4PDGNnxCKgbF7pC4ICMnAjCgxyNsq2s5HNSLZv31s9Wzi1DJr1x7EkiW7BUU+t8dYyMePX2Hz5iOC9u8/J9IEM4ODNk7hr1+PmNAKQSOMsj8HRb35aPphmeK19MWSHfhs+ipOYw0eME7cfsjDlXiatGnTKjy9DdC+dR301zb8ffEWHr9+z+gdjt28D3oIID0T2SRFSRedSzfbfvM3Y9XRSzh77wm2n72Bz5leJQ29AaGHUcWvuH1qllFYPHv3Hv3/3AJ6+Lzy6DlogtXvz83C2KHT6UxOSoSSBGTs7ez0VkX8ffE2ftp0EKf/e4RTdx7xyeOeC7fjrYQuTg7oWUOdxN18+grdf1+Ptccu4dKDZyCMNzGDwRD2gDRr9zHcY5NcWxSO9oApoVmlQQ+HP2z4hxt+bj99DToxgsqlPJjRA1xX9vbfsCxbTl/nD3FdZq3DAmagOXD1P/z3/A1uPH6Jzaeuoe+8TdzYRumov1Vib+KJj4l0uoibDBk3Pv9rizBykL/HnA3cCPj07YeY1FgUnz1dKuRghMh//2NGn8XsQY7a5J8rd9i1s4VN6iOMHZEisIsopuLVcykN4aiQ4YOgnrARz/LDF9B/wWaW71Z2DV/kbfPg1VveT8jg+AMz1inJ6LMLWqGj+AGAHuq1qyfIKEGbZF5i/ezIjXvMoLUjikEtuvoousnoOpsZPk+yse0QMxT0n78F75lBV4k3ttScjKe04kORoUkIteWZu49BY+TPbDJERiUlnlZseLlFXbFTJZ+vIgIyWE7bcRTXn7zESz9/XH30go9xgxdt47id0EwglUTUt/9lRhWFbkUaeyj+6bsPUMK1Lk00Kd4YUXso7UvuuftPjYmZDEss44FSwLjWR9FDbmzvP3TP0+J/8d4zUsfpFXuRoI1T+KCQUB6v/Firvyn64uI+Y+MUbUDcceZajFu7j4+L51k/IazpHjR+/X5sPXtdZNGkpPrQRoEhoWFR+mUYe4FBcURH2IRTwUFx6RqnOGsTGSOUPMg9eeehyILagMIMieophEwwT9++Rx92r6CXOfSssvjgOfyx56SQzpsh6ioJZ0cHvh+UIkSn8PRjYxGNu3QPonLQWEDjiyIzvFElhbW6m0ez6oTGR2rze+yFxXM2rtA4R/4us9eBjFzKfVVbCGuNTXHtb9oyGfL0QugxM/iT8eZn9hy1jhmB6fmSnh16s/bbcFKdPFmrPnSvo+deog6/rdYrEm1MTOEKkfFcTyARej6+eoSXlw8IendXnSwGv3shwrUyofG0QekNZkC4tWU6Xl8/hheX/sHZmT0R8lF95klXrI5RRLNU7yxWP9BzzvWV3+Hq6h/w/PwefHh2h9fpzvZZOD21M/zuXmT2jiA9PW9uneYySp2D/dSNvN8/uKoXx2Wu0smcZObSUyM8zy/sxdNT2wRRmURkDEyWap2hi9yvhIwT52f3waPDa/Du/iU8Y/U593tffHh0Q2jJVq+P4E0yzMBzbkZ3PDi4Am9vn8GTE1twbnZvIW7HjCueWVQjhIiwNuOeVmi0e/9c8LFlwj+8EEnDUkQdo0WkDRk7l5T4UHmAyEH38KzgrcXEydBhrUJYQ4+rg/5D9bug+LUMu7noLzHTmZhAhYaF80m6OXXeee4m6CarlX3GHijuszfkSlgGLw+F5W4qd1doJyRz95wCPcDwyMif1+8DQMf7RXpR0czJqyIfn26lvFmhfM9Mg92f+05FyX7+/lN6b4+iCFgxgN4qactDb/RMHY246/wtvoLGitkLVX1qlRY8vY2hh0MREMlQuX5hb+wjvaicV51kKmGUjh7iFL+hS5PEU5oJZz7Nw6ChrKH/4NX/+AoOw3DykxGQdBNvEUUj3KpMxBsNEqHrRlntQ34imnDQQxfx8UFk/Hr0ys9kVoS738dAEZ89rZfgiaENYcklesHeeJNRgniFaJkwGT4UvznuY/bGlIyuWll63Nh36Y4ISmfkM5rW7G2qIkDGU5qEKH7FpZVn9KaQ/DqdDo2K5yVWj9xdnPX8pjyE2+Mk8HYvsYwHpnCMS3hs7j9xyU+b1lr9Tasztrx/UDDIaPlBYww01LXs0HkR5JVC/1lERCRj5vfdJ0Djq7aKO8/fFPdlnU4HN4PPPGl/H+VeSuPg1O00+dFqiOCnbD0sVr/RarAUTo4REVb+TWXEMGssCzJy0b3VWJw1wmzZ3+gZatSKXaBnQMOy0j3z4NW7hsHSn0QQoNUbL7kBQVvgcLw4t1sEOHmlE7yWyVihtfC+PL8Hr64dEX4tE/T+JS4t/BLBH95qgxMVn7ZEfVEeqkvAq4fCT0w4M1rc3jKVWE6O7mlAG5Ryj4kfMrp8fKsa7Eks8M1TBDy/RywnF82mtDzABj86d29Vq3/Eil41wHIu7INqkApy8bBcQSxS2Hukh1PxNnAq2wUODb5D4BdHEOIWYWRx+uiH0EN/xEJr9EmSkaHDVa+mAaEf9fy29rxgVn9tHp/XKQd626cNs5Q/eOU/o0mevFUnT4bf9mdNrX47R5/JaN+GaJXRqgPFT1Z+w4cQJS6hXV9vdZk7vb2lhwDDMlHY9ccvDYNt4s+t2Z/gMHuzbOzNjk0yNlBKD3xK0DM/f5TPnQUq+TLel+8S7+GqTizpEyX7aF7565hC2nS0SBYfVMmXTZCTvT2Lifjz1OiLCDH9O2/fadORNojJlErtK3s1E3dtVidvP7To8zFt2rjw9nZ2yJjaA7SPjxbbYPa2V9Gb0uBBW8U7jdsAABAASURBVFufPReNr1q6yN4s05JzRUdM7vFbj4yKPNAYT72NGDroFAIl4e7ztxRWzyUj7vGbD0RYZs0nKkrg4zfq2FU6V2bkt8BwpuhITG5iGQ9sgUls7j/WKoe1+pu1yqPVQ/d1Wj1G461yLdP+RTSJJDmdTofoPhMkmeREVG8y2hrWiQyx2k8VfLz09yGiVYlKmjcfPqJMzszsvpUlktR7WPFsGfDOX32eM7aKFVb495qVQVHTrmJhGD5bKXHx7Vqzv/177R4I6/iug8zP9gi8uX7UaCYBmk81nDyjGjroBBTY2Yu0/+2aI/ikyGg/v3l0ZK3RKnx4cgsh/qqxxs0nm1E5JfDlxX0Kq+cGvn4i/E5e6QVvKybcWWOMCFJX6sQ2v/Agf/2kOjt9vw189sVa4l2zSXjX4Hu8L9sVoU5uSPHsOjx3jof95NII+2j+1xjmFs/2tTK3JHGUexukPkCTKndHTYegABsT3dRvPVWtYyVzZOQnkvzWtRF61SgF+jbd0UEdTMwpziPNpEAr/+6D+hbY0UG/CWkypci+0dy4lTDFpbdTtDRZ8WdKFb94KfnG5GpXrDx+rd/G2rQmvu3UiliF1+J79bG67Msqys1UQsYKF0cHId2gWG7Qxp8qVWL+SnxfjuGNKwk5YrR7epCfKHeGNPipXR2s/6I95vduBtpkdVjDClCoePYMJMaJNoblTAw/H9hb0Pg2AqXyUI2d0S23js9yVc2fHXQCDJ1yMqtbY36yjYIrubSfhQKli6P+m0r9+rxTxKK47/zV8SBKpEEArZQwCOLe1x8CuEs/jswoQ66WvNxUbGk5tzZOyz94pZYzfUp1Xx1FRmuwIQPrj+1qg04uGtu8GmjJf2aNoVZJk5jdxDAe2Aqf2Nx/rFUWa/U3a5WHxr12FQpjxaA2/BQ0Og2Exlu6hhXS6XQiO2cHdXwWgcmUobHeVNUCAoNFlKNmMkWBGTXPHHRfIjxV0r+HpdKMP3S/ovTWpkPX1NUM9BkybRJNY/ewBhVQq1BOkxssW7scpM9W/e3Cff230pSXpOSBgOHKBaVWwe/VN//GjodNkSGnIoqwoI8ICTD9nC0EEynj5B6xMkApXsBL9cWLEqa4gW/Ua8ElTWYl2Kgb8NL4C6JgzaoKY9gaVRaHQJ0mv3BX/RXAsVGrc/FUk4WFAOFhqt9GnM7IHhf+6fIguGgrOGQqYpNc7WyiNQGUhrJGCgsLFTmndNI0oAi1LUN7R9CmjkouOp0OWdJ4gjYNHdW0MlaxhyR6oCcLvSITnWvOhMxR87addGXUTBTeBpiaAJEkEMAmoxEckFmzqaUSlhhcOvFDKUd09Xn5Xp2oKfK2cLUPXA9fJswNwZptRQ/vk9rXRb6M3mbBRZNTcwTpW3xz5Kwpo/0s4m00Rr53Afrfl1qzDIoumvJMZLgObVAe3iZOgFFkFVeno49IFB+grQ8tK1Zj9LkPQewGpR9k0vdG82bUlJCxt9Eumonb8/em91ahT2wUvVpDjRJ2jRkHtXt5UDhtZEiG4e7VSmBGt4ZYPKAlNwxTXGKnxDAe2Aqj2Nx/rFUWa/U3a5SHVsIt6NcCbcsXFptVxqTXLpqVczGlTWrxHzXPEdGV3dHBXi+aPrPVCzDTY+Q52cyU0Yst//c8bjzRXxlKY3eV/NkwsG5ZLGR9YGa3RnxlXvSa4hZry/4W3QuAuJVapk5oBEI+xPwmXBe5d4W2rG7pcghvsOZTBhGYhJgU3hqDBZsPhkczcQ9+r76Ydk6dMdpaBvubga2DU7Q6rBKp2VMDkZ97xEWvzi2VSE6fjQiPDZnAQ7Pg8m1WuP6QDx7zmiPF40s8t4D0+eHXbRUc0qj9kUdY4SfZGDoIi3fB6sQzjavagBRnFsVRiCYjtAEk7WT934u3CDe4I+t0OtAD/ezujWHH+DhmZzS5Nk+abBkVMhJIy86NBCd4kLZc2roZFsxGcBpmo+dPiDypAIY40IaXveZu5LvDR+fSJqC0yRvpICLjBj28E0/0NuAjlh46xzdb6zt/M0ieaKtmoz2SM4feMV3myFlTRotLdHbp+Bj0OlQqijwZ1LcLNB7M3HWcnyxCbUS4Emn32zHEIkyzYaH28yFDufj2Rzeu6KBBV99uA+Xf4oNn8eXSHXwz0o/BUY00tCkrGYZrFLT+DU8pgy3chBoPbFGXxKQzrv0trnX5tmV1uGn2hTh1+xF+3nQIdLoVXcMKaVdIxjXPTyG9dryev/9UjPcvGjeJ1hy7aBN4aFXu8KU7+ak01x69EJtwazPLlNoTM7s2gvYFjDbeGrwt+9urD/7WKKLUkYwQCA8PFbUJT+I3sTCDOZeomFFGvbOEa561jIomksBwv2eiJKHu6QQfW0bnkV4kdbDC5qZCmRlMeHAAgu+fRvicxnB8p34CZFextxmpLRPRPJWaTphUYq6+uiaKWiB1AcHHJ0MTc9rJmk7daPHrcj6xoYlicKg6mNBbQFrlYYtyaT/hSJnCOdosXDUPb4/eqEvOKRHthk1udERvHqKLt0Yc7eau6EltsIeBEk6ut3sKcmxOL/zUlSOZ03jaPD9jGWj3U6B4emAkI1tM9PK9/kNO01L5KTkn2omdjHSrj13C+ftP8eSNH0ieKFUsNtez6H7DSxD3Hz/NCiZaemxKo0cM14WpdJaE1y6iLgelk4JoPKCTj+hkEWonwpXIM4XptwDaN+o+BpsOa8uS0tW0Dq1cXHh/jUHC2yPqJymKbm9P9To0tuGdInfzySt+ehLttt9p1lp+xKv20z+S612zFDmJmhLDeJCoAYpl4azd32JZDP65gvYkJzJw0CkrR27cA51KQdcwEa2ONHe1W2zLktzSaT+Xc7Cz4xuv09gYE9Ezli2xoI2WRyzfhVZTVqDfn1v48avasup0OvSvXcYmRaBnKlv2t/BwdXJnkwpIpWYhEB4SbJacvbP+vjZmJbJQyP+puhG5k1tqC1MnLnHakFWUyM4+2iNfHd1TCdHA148Fn5iZ8PunRPFoBQQQt+s53LcUlH/2D84orJ5ra084M7S5HJwhsgn5FFZ02LEbnqixhczJZ2onKOxd2MLU1hcPZyppYjN3z0l0nLkW2mXdhX19WKz1/x5qNhWk75xNXQZ0Q9U+mGnTUam0O6h7pXCloCiUwcv0hCeKcGSAduNEJ0f7yFDTjnbzwgypTBsWMsXTpzePNHsQFMgUd4uqUvNQjUWZ3mgr4cbcsPBwBASrN8pMqVIaE4sxLHd69aa24vAFhIZRj42aLEuauH8LGFWr9UNeaT5fok/GjOVA1wP1fWNx1gqj1VopXV2EOmMnBVGkvZ0Oni6mjZHaSbSpTTsdHezhFQtDFOVvCb3RfAqUPZ3p/uCruQ611250eZGBauf5G/hiyQ5M36FuqObi6ICYrgWtXposaf3xwdtqPIiPsifmPGzZ3yypd4FMaYU4GR7JwCECNEz2dOpDsybYLNbB3s4sOVsL2cXh2Ss2ZXukOZEqYzT39tjotlaax6/fgY5f7fb7evyr2cMjp+beaU5e5o5N8dHfzClvTDLm1icmPbGNb968OQYPHiyoR48esVWVIOnCQtXnN3sX08/R8WHo+PD4psDAztEZhvtciMhYMrp4HFeC3r/UW0mfIm1Wk6V2SaWuZvgYzV4eJhQkSHDIyzuwD/oQkbedA+y91RdqEYGW/Yb5llYT3Dqg8vHMhT+9KnIM91DvuSIwjkyiuMM+evRKVMOJPdwKj4XM6WeqRapgavVttYVqbCJOx5FpT4LwMmE8iGvm9169FSroZlQhj6/wa5mmpfIJLy259Tf4zvbJW3VH3/SpjG9UWrOQ5RfZ0zeRFynLnb7Dpk23GGvy784zdSMletPhZnBEHSWksFya01AozFZ0XfMNb9lcmUGnlFgjL3qIVvRkS2t6IqnIaFd1dKxcTAm2yNU+2H4wcXQiPcCbMhpYlFk8CN97oX5HWb1gdqM50vVA14XRSCsF2tvrD6vGPs+grFqWKQCdjkwv5ItKlx+qyxQr5/eFnRHZWoVyRKsjqtbYhWhXitUpksuoEns7O5TKmUnE3dcYBUVgDMzeS7dB45EillqzwawSpnW1xq007sYNslp5a/O2Gg+sXc6kpi+++ltMuNjbqdey1khvmK6ThWOw9n6bLqWbobp482uvHzIsxlvGLCPar4c5/I/Ga+c4PPtxJTb+WXfissjBHKy02Jo7Ntnb2aa/iYLHgYlNfeKQXbRJW7Rogbp16wpq2bIlnJycok2TmCI/vtEs1Xd0gbGNLFPlLhMv9/agD68RHhoi4MlWv5/gLWciUgRpNkB1Tmmbl7oROUX9DQ1U5xgZK7aJKsBCPDLlg72rOq/5oFnVwqIT9Z/rf8dE+eyzlRW8pYyOGUr8ffKKZCG3Dws+vpkop79YuQDqqGplxZao+/AhAOGRb5N1djo0alTOkuRC9p7ffTz58JT73RzdUDBNfs7Hx0+6lO6gzfS8ovm8okyuLKIoT9+q+4mIQCsw9CZMuwS8R42SSKH5RIWy8GFlbVwiL7Gc/rn0H3e1P9q3sRm83OHrrb9qIAN7A1ODTbK0aczhtasRdDodaC+D6NIdvXFfb/VC/9oaC2RkwgF1ykRytnfoYUf7wPt9qxom3zrT50ndqpUwq1CPX6uGpU5Vihud1GoV/f73ceHNxtqmcUm1PUVEJEN9kk7+qVskd2RIhPNI80atflH9OJIgAxLtlUB8UqBVmm+36dOVqvn1jR0uTg7oVq24zatCn31p+0jtwlENA2RAalM++lVna45eEpN+R3t7jG5aBVqzSHovD3Stavv6EGCrjqrfxad2c4VhXyKZ3rVKQVklRp9TbT6tfkpI8UQtmHGnbE7NhmEUqKGCmdMJHRT8/K360EJ+Q9JurpeVGQhtvVrHMH9bjQeG+Xxqfmv1t7jidlNzklpaDzejG1HWLJgD+czczFkpz0vNJ5ANi+VRguPd/RgUIsYYunbL5/aNtzKsOX4ZyjhJxuevGlUyeSwvrVyjU5n61Cpts/KRbhqXTWVQRXM/eaf5TNKUfGzGJlv1N1NltCQ8NvWxRH+yljWoXFhIEBAW8Tm7TqdDhnIt9CTsHZ2RrcEAvTBbeh7+s1SoT52/EnyK1RF+LePs4Y2C3X6Fg8ZIoI1X+I+vHiosvIvUYLyOUfz8PT2+SWSUpmAVuPvov5C1c3BCzqZfCJnAt0/x4Ym6qkVEJFJGd2aVKFlIsVaCt5RxyFcbYMYOSpfi4TmE+6sLDigsOVGsDB3O7K16z571YUjsehXYGMZ17lwHdnams3uieaAYNqwV5swZitGj22Po0FacmjWrJHRHx6y+uUZEN8hWX/C2ZrxcnfnxiH/1bYGJ7euiTbmCKJUjE4pnzYBeNUuBjiqjCalSjm1nbiis1d3f95wQOmlSMrtnYzQvnR/0EEOnbNDJBjRxIiGakCw4cJpYPbr15JWegeHXTvVZnQqhYh5fNllDEsfgAAAQAElEQVQsAdJBD0Z6icz0bD19XUg2LZkPv3VthC8aVgQd40aUJ30aEU8fU6w5dln4K+bNivFtaoI2KqQJ5IS2tUBv6YWAjRmaxM7ereJLm5PN69OUY1KWGbJKszZvX7EIaHd2Mi5k8455dQYVedm/58nhRP1kQb/moKP2CA+iWgarZ249fY0j1+9xefrpUa0kpnZpyNu5mG961tZZQOX4qV0dUJ8ko0sWZhAhWYVO3VFvRnyT3B6N0LpsQRTJ4sPauiDm92mGdJ6ml1UqehKLS8aiKw+fi+LQiSf9mBGscr6saMQMe9Qm3myyIgRMMI4O9iDDkSHpdDqRwjCODEV2mnjag0IR7ssMANQO1IbUP6hf/NqxHujhXpEx5tJb370Xb4uoUjkzYX7f5hhSvzy+bl6VX4PODg4i3pbMjccvcUszRverXZpfr2RMonqNb10TdTUGnX3MeEqfpBiWqQq7fkc1q4Llg1pjQJ2yoGuYJon1i+XGd8xoSEcbK2loA1fCQPEbc+++eCs2DdTpdLzPDm9UEfSGvV2FIiDKm8HbWFIUYv3csB21sjl9UkfpB7kMlqzbajwwWuAYAq1RnxiyiLdoa/W3uBaY9ipSJuM6nQ7T2Rg7onEl0HVMfZ9OUfu8XjmLszl955FIU61Adkzr3AA00ab+StSSjcNCwMbM3efqSrgRTSqBrsPuzEBP5SCi8dMWRaBrZ87fJ4Vqugf91a8Fv2bLMGMoPTs1L10Ao5iBd8WgNvxFEt2bRAIrM7RSjY4Npmc1Gj8qsbGKPhn8rEJh/MLGa3pWUbI8eFU9ilYJM3RjMzbZqr8Zli02/tjUJ6Z8PuX4t3fOiepnqdkdORoPQZoCVZC5UjsUH7wI8bkS4sGhFQjxV1eDZ28yDAU7T0T6sk3hla0ofEo2QK6mX6LYkMXwyFIA9o7qp7miEhrm9TX1E1Qnz7Qo9eUKlv4L+FbviizVOnNy0pz4oSS1Y0aIDOWaM8OPPul06rOXYXz6Uo2g09kpKvCQ1SWcDEkUYmePQr2mIyvDl7DNWLYZig6YCxdv9aXzvZ2/k2SSoZAru6CckOKfpQTs3NPGquxhpdqLdPaH/xB8QjC6SKMf5R3mEH3fIhlLSe0dFqT09HRF+/Y1o5BWhWF81651kCNHeq2IHj9hwjI9f+7cmVCrVgk0blyOU9u2VfXiTXl23d2NsEjQqmepBvtIi5UpeVuE58mQBu0rFsUYNhn5tlV1NCyWB2k91eWpB678hyuPntsia66THhK3ak7KSOnqgi5VirOJcyV+RJ4jezvMBdnP3L0nYWxCQgaGdRoDA03K2rMJ/HD2kEc3fDJynLylTpSZKrP/Vhy5wDe6VBLQpxH0MFUlfzYQ5Wb4KXHkbjx5RW+SVZhNUAaxh8sBbBJLb4BJRnkYJd7WtP/yHWw5oxpraLJJmIxqWplPQNuUKwQygMCCf7SMV/sNMLVZ+dxZOB6ESaW8vlG0/bbzGK5oJvbZmCGD2nlc6xqsrSszY0WhaN80bjhxBc/eqStJMnh58hU2NNlsz/qvi6MDyBBGpwxEyTyRBkzdfgQfNJ9h0eSbjGg9q5cErfKgYodo9kMhvyHRCigyHBmSVs4wjiYpPl4eQmTy1n/Fm1KdTsfbgY4oJAMFGZ10Oh38PgYiulNXSNnvfx/HubvqMlcyXNLEiCZadE1SXbUGCEpjK5qyTR9b6pdkTKJ6FdbsOUR9av7+U9EWw9XRkRk5cjJjRxmQEahPzdIomjW9WM1BbfTzpoPR6qBImiwtOnCWWE6ECRlDW5YpwMa6QpwqGLl2SLh5qfwwbEcyulAcEX0qZxjfrWoJitIjW4wHehmY6bFWfczMzuZi1uxvcSnsr1vUJb3Uv8rn8eXjPPV9mpyT7ksPngmDG/ljouWHL+iNU7QaiYylbctH9NmO7F4bkw5rxU/bcURPFV2HTdgLCKUsLcsW0ou3poc+VdOu/HJ3duLX7GhmDKVnpy5ViqFsrsxiXLBm3qZ0pWXPajR+fMkMpj+2q43PyhcGGT0VedoslU6OUvym3NiOTb9uOSxUWqu/CYVxYGJbnzhkaTKpsc9UtKeUmUyYiCLu/z1frzTpitdD7lajkblGFzikSIngD6/0jA96wlb3hOPywq/08vPIVgTZ6vZDvs4/I3vDQfAuWgs6nc6snP0eXsXb2+pWAlQf76K1kbHyZ8hUpT0nl9QZouiyd3ZF1jp9opBW0DA+W4OBcEml6qLVMrc2/sKfXXk6ZuzIULENx9a3bl9oDUivrhzCy6v64x9Pk4h/wmnzzuOLRAkdircWvLmMnYsXPuSswsXtgz4g5PJ2zifUT6jmNJkQN/VFt7XKY2ctRXHVc/nyXXTrNgnXrt5HQEAgwiM/ZVH0BgdHLPNS/KbcgJCPWHdrI492snNC4+wNOG/rn+fv/XHh/lNoT1cxzJMmJfP2ncKv29QHJ0MZ7ffphnGW+OfuOQmaKJgqD02yvly6A9vO3jCplk7gWHv8UpR4mvzSG6kJG/6JEmdOQEhoGHrP3YjdF26B9qYgfdp0QSH6h4OS/JdLdoAMRFo5hae3K8s0KyKCQtTvDRUZa7vzmIGI8KMd903ppgmodgm2KTklfNKWf/HHnhOgiaJhPwgKjdr/6W33qBW7+QaO0Rl6qN/tu3QbOwzamoxZXyzZCWpLpQxa931gEEav+htXNUa56PLRpg0OiVpebbyteDqlp/cfG40aEAhTWo1z5YFqZAy0UTnpxBHqs1QeY3V9/OYdBi7YCu3eKIHB+v2e0tEGsd+u2QvqR9q+9jE4BBfuPcWXrP1ITqE3/h8VVrjavhOXdqGlyz3mrMfF++reISKTSGbPhdvoO2+zXr0io7iz5/Jt3r+5x8QPGXY+/2sLaCNAEyJ6wZtOXcU3q/bgv2ev+So0w/GElufrJYj0WHOcsMV4EFlMsx1r1IeuEbMzjIUgjeXmJrNGfzM3r+jkjt16gF+Y4ZKuOUM56mvHWfyYlX+DeCU+lN3jFN6YG8qMrZ1nrsV89jzwij7dDafRWJWMOhKocdbmaEVHn3mbcObOY258NewDIUbuPXpjSqh+2S0tH2FA99IXfqY/UyPD55k7jzFv7ylL1Zstf4C9wKDnIlMJCJdt7B46eOE2mNuPYzM22aK/KXWKy/hPOmJTH0pnTUqRIgU8PNSXCqT7+vXrCImH5z7KKzrS7nURnRzFvX96C9dXfgflExYKU+jjm8e48PsAhAZHvZ8rMuTSpJ5cojAzT3IhWWPk//wuTv3aHk9PbNYby7SyYcGBeHJsAzPCqHvnaeO1/JUlo3Btxbf48OSW0TqGMl1aeWvyLy79g/OzeiHI74Vxtexl+O3NU3F99Q/G4ymUyZCTGCn4yDyGacQ852Ol/tBZ+ELfoWJvUS23AzMQnsB11X42E+rgDMe8tUT5rMHEytDx/Plb1KjxpcV086a6XNNY4e/efYp+/aehYcOvUbPWcD39nTv/ZCyJ0bCFVxYhKCyIx3UrwKyjFnYCntDCH5rYjGUP262nruQTGDIyLPjnNGgCPplNYIcs2oaOv63GFiPfrWuzoiPNmv2yDETacC3/266jPJ5k6CFBG6flj9y4DypPjz828Ac1Ksv/NhwAHefYiT1kaZfXa9Np+cUHz6HL7HX4ceNBzGGTcJpQtJq6At+v2w96vKEyEDX/dTks+RfKDFkzdx3juikt6VBo94Wo38tRXmQgasXypjIs+/ccxrMytJ62ktdt48mrApOfNx9CfPwj/HrM2YA2rAyjlu/GzF3HQW+yf1j/D7r+vg5fMOPMJfamz5Ky0INU77mb0JLhqeBBLrWbKT30VqzttFWgNv1+7X5+VKdSDnqA7cD63bQdR0ETB0MdtJqH2pL6CB2dSH2E3A4z1qAjIzIKkMGLykBExhhDHYp/O3sIJBmi79btU4Lj3SXjAU2UqQ5Ul6WHzuGrpTvRimFKp3uMXb1H9BXCzrCAb5mxgOpgKRlOzGkjXcJ/0MKt+I3hT32W+m4r1of7zd/CjXwjl+8SZfnnyh2Y+kftQn2t5ZQVvG/RsaxUD8ozlburSEafewhPJDOc1V2py+n/HkWG6js0WVNkBizYoh+p8ZHRYAwzfrVidaA+/9c/Z7hxbtiS7aDjtGlsCjOYtEHzb/Opa8zIuQltp6/ixgm6ZmiFFxn4CBsaa8iwQ58haZLFyNKRyEMWb0e76athOJ4sP6x+FqZVROOEUmdz3a/ZhFarQ8vbYjzQ6o+Jt0Z9WrH+pWBhKj9qY0UmuvuPkp76nCI/mN0HlXBz3Lj2N3PyMEeGjOkdZ67hx8XPZUZu6vdDWX+jvkZjM92f6F6r1JOM0DHpDWXGDlrNQMd6kx4lLbk0/seUXsRbgSGDLI3ZdA+hvKkMCn3J7mOGWdDYpsT3m7/JMFr4e7EXGorcRfYiSEQYMHTt9GQGarqf05hI48Kf+09jEruX07NTa9YvqXxn7j42SGk9L90jqf7dmDGXni3oeYfGphk7j2HEsl1oz+6jNE6Z07baUsVmbLJmf6P7v9IGWmO5toyW8LGpjyX6Y5KtVq1aFJFff/01Slh8Bby+eQJHv6/H6dycfhZl++raEZz4qTmuLhqBO1un4+baH3H8p2Y4O70baJPQM9O6cL2k/93dqPexC/MHi3gqh7HMKQ9KT3R2Vi9jIiKMJrx3ts/EsfH1cZblfWPN/3B3x2zc2fQrLs4bjOM/NsN/O39ntpkQkSY65vX1Y7jwxwAc/aGhKCeVg4gbQAwSB394G0WOZGOigFcPDTQBAS8f4PSUjjjxc0tcWz4WD/b9hdsbJuHM9K68PM/O7IiSRhtwbEIjURZtuJa/tWmKkCFctHG25Mkw4LF/Gs8iyMUDjqU7ct6cH52zB95V6sNFnfxfI/jfPzif0D/ut/8VRfBrPx/hn++Ffce/4NBskgiPLRMrQ0dsM4uvdLSqY86FuTw7N0c3NMnRiPPx9UMTSjIy0OSb3sQeunYX/z1/A3oYiq8yaPN56ecPunFSWWhCQ5NbbXxMPE38jt28D5rI0k0ulBkpYkpjq3h6k0JlWHX0Ek7deYTgkFBbZWW23iBWhiuPnoMMNDSRO3n7Id58+Gh2emsJ+n0MBE0qaDKvlIMeYM3RT33kyI17fOUAuWQsMCddYpahOlBdyFBDp2Mk1PV378Vb7Ll0m2F7CdR3qQ/HFrdQNjnS9i0PV2ekSuEi1D19Y5tNjkUGkQzVgfr8hpNX+Kqw209fIzoDR2Qy4dApVIQFXTN0tDEZ+MhPY40QSqJMYhkPkih8Rosdm/5mVFEcAqkMVx+9wNYz10H9nib7cVAnkxpBgO7nhDGNC7R64N/r9+L92YleWtGzBT3v0Nj098VboE9LacwyUmSbBcn+ZhzaihUr6kVcvnwZ9+7d0wtLSp7QkCC8+e8cnp7ahheX/kFYUPw/OxrD6+Pbp3h5+QAeH9+Ip2d34f2ja0wsoZ6iWNaxCovYzQAAEABJREFU/KNTWF7fOIEHB1fg2fk9CNSceBNLlYkiWcih2SBDBRXmY40vobN3JDZGcqwyAIh8+e+yZQzCw8wzWsWoOI4C4ZtHwz4kUGgJ9M6JD7mr431R/Y16hYAFTLI0dFD9N93egqlnpmP62Rm4//4BBUmSCEgEJAJJCoE0HilAJyQ5OzoYLXf/2mXEd7P/MYOKJcYGowplYHJHQNZPIiARkAgkWQRy584tyk6fi02ePFn4JSMR+FQQCA8NhtOSzvDYOgbOe34GnNzNqnrYzX94Gs8NwxF0aYtZaeJDKPTVf3D6XyF4bBoBzyPz4XF5O9wenEWKe6finH2yNXTQALjlzjaQwePEk5NxBkoqkAhIBCQC8Y1AWmbo6FG9JFZ83pqfhkCnJlXNnx1tyxfG7B6NUD53FlGkadtN7/0jhCRjAgEZLBGQCEgEJAKJGQFPT0+4u6sTunPnzuHJE3Wz7sRcdlk2iYC1EQh5eB7BxxdzCg94bZb6kDtHuHzQGfWYWrMSxoNQeGgQgk+tQNCO7xG8si9C5zZF2II2cc452Ro64oyMVCARkAhIBBIJAjqdjp9KQgYOOu2BDB50So5SPPo8xyZL6ZUMpCsRkAhIBCQCEoEERCBVqlR4/fo1p5cvXyIh9+ZIQBhk1hIBiYAFCEhDhwVgSVGJgERAIkAIxBc9ffeBn4YQEBwcJUs6BeDhq3f4Ysl20IarUQRkgERAIiARkAhIBJIJAnfv3kWHDh04derUCS9evEgmNZPVkAhIBGyFgDR02ApZqVci8OkhIGtsZQRoYzw6bYBOE2k9bSX6zt/MTwCg00nodAQ6IeXWU/OWLFq5aFKdREAiIBGQCEgEJAISAYmARCDRIiANHYm2aWTBkg8CsiYSgbgjQCcSPHnjx08ASA6nk8QdEalBIiARkAhIBCQCEgGJgERAImAcAWnoMI6LDI0PBGQeEgGJgERAIiARkAhIBCQCEgGJgERAIiARsDIC0tBhZUCtoU7qkAhIBCQCEgGJgERAIiARkAhIBCQCEgGJgEQgdggkJUNH7GooU0kEJAISAYmAREAiIBGQCEgEJAISAYmAREAikJQQiFNZpaEjTvDJxBIBiYBEQCIgEZAISAQkAhIBiYBEQCIgEYgvBGQ+5iBgkaEjR44cIEqVKpU5uqWMREAiIBGQCEgEJAISAYmAREAiIBGQCEgEbI+AzEEioEHAIkOHJp1kJQISAYmAREAiIBGQCEgEJAISAYmARCCRIyCLJxH4FBGQho5PsdVlnSUCEgGJgERAIiARkAhIBCQCnzYCsvYSAYlAMkZAGjqScePKqkkEJAISAYmAREAiIBGQCEgELENASksEJAISgaSPgDR0JP02lDWQCEgEJAISAYmAREAiIBGwNQJSv0RAIiARkAgkGQSkoSPJNJUsqERAIiARkAhIBCQCEoHEh4AskURAIiARkAhIBBIbAtLQkdhaRJZHIiARkAhIBCQCEoHkgICsg0RAIiARkAhIBCQCCYSANHQkEPAyW4mAREAiIBGQCHyaCCRsrb087bBlRhC2zQrGmF4OCVsYmbtEwIYIrJ8azPv5lOE6G+YiVUsEJAISgcSJgDR0JM52kaWyAQJF67ZEhbZ9jFLqDFlskOOnrTJ79vQoXDg7ChXK/mkDoam9m5srx4RwSZfOSxMj2eSCgE6nQ4ECWXk7Z2fXgEX1+gSEvbzcUbZsflSvXkxQfFd7xsgQFM71DAVzPMXLt5ZPAAtmToeyOTNzyp4uVbwVP41HCtQqlNMolcqRyarloDoWz5oB+TJ6W1WvOcrSe3mAcM2W1ssccZvLODrYI6dPKhAeCrk5O9k8XyUDaovY9reUHsG8n7eoeR81yjoqKqUrEZAISAQ+CQSkoeOTaGZZSUKg/qDvUKvPKKOUu0JtEpFkRQTmzfsS06YNwPTpA6yo1baqihfPjS5d6upRs2YVkStXRuh0ujhnPmhQc44J4TJ4cPM46/tUFCSletIkfsaMz3k7//JL33gpuqOjAzp2rKXXbw37sdbftm31eCmXNhMq365dP2PdunH48cceGDu2o6AcOTJoRW3K58vhgMolHvE83n90xexVwZy35Gdcq+oY1awKp+7VSliSNE6yRX3TY2DdskbpcxYeJ+WaxGk93TChbS18y+o5tmX895XZ3RthSqf6mNq5gaZU8c+SkWde76ZYPbgtfulYn+NBmBDVKZIz3goUl/721RRPUc5fvnwieMlIBCQCEoFPAQG7T6GSso5xQ8AzbXp0n76WU9OvJsVNWQKmDg0JScDcZdaWIPDDD93w228DMWVKPziwt2mWpI2LbKtWldlksbYekXHijz+GYc+eSdi27X+gyWuKFC5xyYanDQ/nTlx+ZForIZBQ/c1KxYcPe9vcvXs9vX7bpYt+P9b6e/eK3wkkGTmofKauZTs7nbWgiFHPjFHvhcyvC9MLPtZMPF7HAUHxcw/T6eKvPWKNu40T0qqSn9rVgbeHm4mcEggjC/vbyYshuHE/YlVOao8A9GktV3WYaFAZLBGQCCRDBKShIxk2qrWr5JYyDTIXKskpf9X4fUC2Zl2mf1YBU1qVEfT26UNrqpe6rIhAmTL5ULBgNhQtmhPu7q4WaraduIuLE4oXz4X168ehdu2StstIao5XBBJrf4tXEGyYWadOtYT2ly/fYfnyvZg+fYOgR49eiXhbMjmzOCB3lhc8i6BQB8xfb/lqDp44gX6O3LiHTjPXotOsCPpm1Z4EKknyz7ZfrdKikgHBwVh55AKmbDuCX7b+y+nf6/dEfGJnJi7wEEXs20au6hBgSEYiIBFI9ghIQ0eyb2JZQQWBwAB/+L16Jig0OEiJ+jTceK7lzp0nsW/fOWzceDiec7ZOdgEBgVi2bA+vw40bD+Hn5y8U06cCo0a1458LiEAzmIMHz3N9hMvatYfMSCFFkhoCd+8+EW28ZEn8TESfPXvDjG+HsHnTEUEfP6rj24sXb0U4yaxa/U+8wZoypRvoeqEMw8PC2TXzE+bO3YYNGw4J8vf/SNE2p697qisiDpzysXl+tsjA72Mg/NjYRPSO8bbII6F1rj95BVvOXMfywxcSrCjZ0qn7g3y/Zj8vyz9X7uDg1bucnr1VVwYlWCHNzHjX4WAERnZ9WtVRrohc1WEmdFJMIiARSOIISENHEm9AWfy4IyA12AaBiRNXYPz4xZg2bZ1tMrCx1g8fPmLevO28Dn36TEHTpt9g5syNCA0NEznTm2oHCz6tOXToItdHuJw5c0PokUzyQeDx41eijdetOxgvFQsKCsZvv23AlKlrBb175y/yvn37sQgnmTlztog4WzN582YRWbxjxsLAQNUAIyLigbG306FK6Yi9OSi76UvlZI9wSIy06MBZzNt7kq+iSKjyebo4i6yvPY5YBSQCkiCz73hmUeoR3dWxQQRKRiIgEZAIJEMEpKHDho1q7+AA38JlULXzYLQaMx21+4xC4ZpN4OCk3kCjy97R2RV5KtRCvQHfgPbGKN6gLTzTxvxNsXsqb9ApIkRKXnZ29shbsTbXU6vXSOQoWQk6nfHmd3ZNQekFefpkFMWkOpFeQ6I8hZARJkXKVEIf6VdE8lepz+tH+FTrNgyZ8hdXooy6VOYshUqhWpchaP71NFRo2xs+OfIblbV1oKe3D4rXb4O6/cei5djfUO/zcSjXqifSZs1ts6zTp0+FDBlSc7IkEwc2GVfSeXikiJKU3roq8a6uav+sUqUwBgxoijFjOqJbt7rIn983SlolgN7aUlpjpMgYc3U6Ha+Pkj+5WjnyGyOtjCne1zcdWrasjNGj2/Py02knOl3sv61eu/Ygw2M6lH9U5759GyveKK5Op4MxPCiM2iRKAhMB1Gb0qQztc0B1GTiwGahtKNxEEqPBqVJ5oFmzShyPFi0qw8vLXchRmYioTiIwkqGyKm3g7a1ubkf9sWPH2qDVLY0bl4c2LjKpScfZ2QnlyxdkeDbFV199hgYNyiBt2pQm5Y1FODk58pM7CJevv+6AYcNaoUOHGihZMo8xcR6m01m/v1FdCDtDovLxTC38IbwLF86Bzp3r8GuvT59GqFGjOGKrz9zsqT2VdlbSuLm5olGjcrzPtGtXAzFtHEryig5y6RpUdIWFhUW51s1pc+q3deuWwpdftgHtmUN939J9cupUdICjXYSRMiDIAeeuRb7iVgoXj64Hm0SXzpEJHSsVRZtyhVAkiw+cHR3isQQRWTnY26GYb3pejiYl88EnpToeREjEz6+9nR2c2D3KGMVUAhcnB6RxT8EpBRsPFHlf75RoXbYg2lUoAjophXQrcYauPTOCKToUV6fTCbFU7BpQwhVXjRViegzF06kx9YvlRo/qJVGzYA5kSJUw+FLBFm5yJIdT4TzPuWvJj7OzMxvfvfXIkvRSViIgEZAIJAQCxme6CVGSJJNnzAUlA0XHSUvx9a6b6DptFap2HYoCNZqgfNs+bHI+HaO2X0X7nxaC5Ixpo8l82/F/MLkr+OyHeSjTsjuK1muNxl/+jCErj2LYmuNIld7XWFIe1n3WBgxcepBT4VrNWJ7T8PXuW2g7fi7XU6FdX3SctASDlh2Em1dqnkb7U75Nb55W0UHplHh7R2e9OEWmx6yNiohRt93//hLpqjDDT4ZcBTFy60W0Hjeb14/wqdJpEHrMXI9+f/1tVEcFZtQY8/ctdJu+BlW6DGFGo6ao1Wc0+rC37l/vvMaNQkYTWjnQ1dMLnSYvw+CVx9B4+ESUbdUDBas3RpnmXVGn/xj0W7Cb1y1nmapWzhlYuHAEli4dzSlrVh+z9TdoUJanobSzZg2Oku7HH3uI+M6dayN37kzYsmUCxo3rwg0FNWoUQ6dOtTFz5iAsWPBVlPQUsHPnT9i6dYJRonhT5OPjJfKm8hE5sIdeRZ7ypDAtLVkyWok26tKkiE54+Ouvr/hEulatErz8dNoJhVO80YRmBF6//gBPn74Wko0blxO8ITN2bEejeBBO333X2VA8ir9t2+pYvfobbNz4PTcmdOxYC1SXFi0q8bah8LVrv0WmTN5R0moDCM/ZrN1JdtCgZlzHwIFNQSdgzJo1CDSBpTIRTZ3aX5uU87QviYL/vHlfgCav1D+WLfsa3bvX5fuVDB3aEitXfoM2barxNKZ+dDodxo/viu3b/4cJE7rx/lWvXik+iV25ciyvL02QTaVXwgcPbsH66A8gjAmXmjWL8wl5jx4NMGlSb1A79zKy6aa1+xtNuqkuhJ0hrVjxtVJcs1xnZvyZNKkPL/u0af3RtWsdZuAohrZtqzGDRwds3/Y//PRTT5AcbPBv6dKvxbVIBi8abzZvHs8NSNTvCE9qf2o3nY6mclELQYbRpZFjFLn9+zcRQmSwoDAtUZtnzpxWyGgZkl+8eBSo344YEWEMa9asImhc2rLlB/z6az9QObVpTPENKweLqDsPo973RKQNGTJw/NKxHhYPaImvm1dFKzYRb1+xCKtnmLcAABAASURBVL5vUxMrB7XBV40rwd7OzoYlUFW3KFMAa4Z8hnGta/BydK9WAnN6NsGCvs3h6eqkCsYDt3boZ1g1uK1Riil7MhTN79MMRL1qlAQdw7qG6ZvepSE6MENS2/KF8G2r6ljYvwU/staYvlw+aXh60qGQVk4J07oNiufRiujxZNRYM6wd6NSYPjVLo3GJvPi8XjnM7t4EK1g703GxegniwXP0XDDCdREZkcGvYC7LDGvdu3fHokWL9Kh169YRCuWvREAiIBFIpAjYWa1cUhFHgFZKfLnhNHKUrMj9xn50Oh1ysUmwh3e6KNEuKdyZIeMY8lasEyVOCXBPnQ4DF+81a2Jfrk0vbhBgWSrJhZvSJxN6zN4k/PHFODi7oMu0lXByNf52wztLzihF6fDzIm7U0Oki79QGEmSAIaNQ7b7RT4ANklnstbOzR995O5C9RAWYKArXSXXLVtT0BJgLxeLn0aOXIlXlykUEHxNTurT6UHbzZvSbsDo7O2LKlP5IkcLZqFrfLGmNhieWwJ9/7gWaFNHk3liZ7O3tePzw4W2MRZsVtmbNASHn6OjAV23AyD8HB9MPk+acutKwYVmkSeNpRLMaRJNBMujQRF8NVTlXV2csX/418ubLogZquHz5fPlqF01QtKwTe2v6++9DjPYPuib69m0EOmLVmJIUKVy4IaNixULGonkY1XfRopF8tQcPMPLzzTed0LRphWhP5HFgxrLSpfMZSW3dIGp/a2gsWTIPNmz4DiVL5japTsfePNPGqZasnDGpLIaIP/4YiiwmrvXy5Qti+PC2MWgwP9rFRX3brKQqVCg7M5yNYUa8NEpQFLdYsZxYs+Zb9pY5+muEEpYu9JYcTqcuuXI3Pn+ypfXCvD5NkdPHtJGlQh5fzO3dFClTuNi0aIPZpLtz5WJG80jl5oofP6ttNC6xB2ZnBouRTSvDwYixyNXREZM61IUjGxesUQ8nB+Nj+5D65blRw54GQyMZuTg68KN7m5fObyTWdkFh4cDLN+ozV/Pqcc/L1cW2/TTuJZQaJAISAZsjkMgzkIYOKzaQnZ092o7/Q2+lxr3zJ7Bz1ngsGNQK26eNweX9WxEezQyn3uDv4ZYqrSjVkxuXsHnyCKwe1w/ndqxmaSOidPYOaDrylwhPNL9pfXPx2GuHdmLDT0OxY/pYvH/1jIfRj5dPZmQuUIJYQed3rcW2qV8L+nf5bBEXEhIkwrUyq77tK2RiYko17QIyBJDck5uXcWbbSlAet47tR2io+taN4olyl6uBnKWrEMvJ/91r7Jn7M5aP7oaDS2YgNDgQyr9yrXub9XmPIm+pW7xBG3h4pxfJbh7/B0tGdMaMTlWxdGQXHFg4FW+ePhDx1mbOnbslVJYokVPwMTG5c2cWIocPXxS8MaZp04pQjBw3bz7Ctm3H2UR5L44fv4qQkFBjSXgY7V/x5587oRAPNOPn1av3zLCyVo9o00Il6Zw5W/XipkxZy95uL1Ci9Vw6QrN06bwijE54mDlzEwYNmompU9fhyZNXIq5+/TKgyZQIsIC5dOmunnTOnBn1/IpnyZLdAg/C5fFj1VClyJjj+vsHYvfuU5gxYyOvy/Dhf/CNUgMDI64Xe/sI441Op4uirl+/xnrGEtpYdeLElRg3biFOnbrO5R0sePink2eIaHPWv/7ahe++W4Tt24+LsYkU9u3bmJwoNHhwc6RO7SHCqSyTJ6/iZdmx44TQQfUZOfIzIadlPD3dUK1aURH08OFLTJiwFF27TuTYUHtfvnxX6BKCkYw1+xupPHHiOmvjHYwi+v6RI5cp2CKyYxOz8eO7goyMSsILF+6A6qL03X/+OQ/tdaHI2cqlFWO0H8369Yd4Gy9cuFPv+q9Vqzio3Ib5r1nzD+gaVWjHjpNCJCgoRC9OkaE2FEKRzNdft9czZO3ffw7jxy/Bzz+vgHYc9PBw5YbLyGQmnTReH0Tcv+fi9ujz1v8jPgaHcLr3UjWgiAyMMEMaVISzZnK89cx1fLdmHyas/wdHNCd4pGaGhh7VShjRYJ2g3BnSoHrBHELZw9d++HXrYYxauRu0CShFONrbkxNvRKeZzN59AgrFNuNs3inZCwgdLt5/xuv0A8P26I37Qh0ZQJqVzCf8CnOfteGkzYegJSWOXG24wh+6pn8PILn8mdOiWoHsxHJ64fcBM3cdx6jluzF/3yneX3gE+yFDk7kGrdj0N5ZFlL9b91RDR5E88bMBcJRCyACJwCeCgKxm4kAgbnf7xFGHRFOKhsP+B0eXiP0PyJaxaeKX+GtIaxxbMx/3L57EiY1LsOb7AZjRoTKe3b6GkKBAvbK7pHBH4RrqMt9bJw/ijz4NuSHgyoHt2DhxONZ8pxoUXN1TonTTjno6jHnIULLymz44v2s9jm9YjCmtyyH4o78QLd2ss+CJefX4Pk5uWiro8r4tFMwpLDhYhGtlHl83f3d0mouRwYQMFX/0bsANOXuY4WLpqK6Y3KQoM178xvNSfhoMHq+w8H/zAr+1q8gNIzeO7sO+PydjVpeawthBupsMnyzkrc0UqtlMqLx/4SSWMePG7RMH8OrhXdxiRo/9zNAxvV0l9lauIS7t3SxkrcXs339eqIrpW3khyJi07AGQOfzvwIHoDR2EIRk0Ro2aj969fwVNROmUhJEj57G36N9gyVLjnxbR/hU0sVeIrgGeYQw/tJHi5s1HoKXQsDCRaufOE3pxJHfkyCURrzAp2FvQDh1qKV6cPn0DrVt/j7VrD+DixTvYtOkw2rf/H2gSrAh9803M148iq3UfPnyh9Zrct4A+c1HwIPfixagPx3qKDDx0Yg1N7ho1+ho//rgctLkl1YUMFLRRaseO/2PGwQisHBzsWfvorySjsHr1Sgutp07dAG2sSkaFAwcusLfyfzADymkRby7zmk2OWrcej0WLdoEm4JMmrcLChbtEcvq0RXgiGWqfGjWKR/qAkyev8bKQIY3KohhfFAGawDZpUkHxCldbHzIAde78E/bsOYN7957xdqb2HjjwN7RsOQ7z528X6RTGWv1N0ffu3QcsWfI3o92cNm8+qkSZ7dLeImQ8ogR03RAWgwfP1Ou7ZFDqwNr79u0noDqQrC2JjCrduk3im5xSGy9cuBu9ev0qsqS+ZWzlDm18SteoQtTOSiLCSgnXugEB+vfCcuUKwMcnlZIMU5mR8vvvF2PfvrOg05yGDp0N6sOKQIkSeZAunZfiNerScn0l4sEThYud2/OPjfhs+ipOc/eqhhxT2mgCTJNwJZ4my5TuzN3HOHH7IX5mk+y1xy8r0aicLyu83GzztrxntZIin8dv3mPQX1tx4Op/uPLgORb+cwY/bjgg4uOLodNMdp6/AYWiexkUU5n2srF+zKq/eZ1OMmx/2nQQp24/Esmq5M8ueIXxDwoGHRerJSWOyqINV/jn7LpXZBS3T80yCotn796j/59bsPvCTVx59BybT19Dvz83C2OHTqeDuQYtS/ubKIQB8+KN+klSaq8Qg1jplQjECwIyE4lAvCIgDR1WhLtYfXUp/K0T/+DsjjVGtb9+8gC/96yLd8/1n7bKte4JnX3Eckh62F33w+dR0l85sAMvH94R4eXa9Ba8MYZWb9CKCW1ceHgYrv67WwTRqg7hiSfm71njQYYKw+wCA/yxf4H6ME17kaT0ySTEds/5ESQjAhhDeGqxzl5Sf7LHRKz25+ymvo2OTunjm5fw5Jb64BqdrCVxZ8/eFG91PTzc9N54Vq1ahL3Z7sYpd24VMzr1QGcX8abfzy8AgWacejBr1iYcO3YlStFoQrJgwc4o4YkhoF+/xgIPKicZZoyViww4NImjOG9mAPIwsjkrxUVHfn7+oGtUkcmWzUdhrerSpJ0md6aUvnzphytX7onoIkX0H+KbNq0gMKHy0soHIRzJ/PrrGr26RAZH69DKEsPJNk32KQ9KqGPdjTa4JV6h1q0rg1ZqkJ/kfvhhGbF6dPDgBTx4oBqR2ratqhdPnpQpI4zJxFM+4aSMPAb0hk3ijPVhA7FE4a2vMUadOHFVbxKvLeCTJ6/Rs+dkPH/+VhtsE/4Ab4vnerrv3n2KZ8/eiDBjBi0RGQemc2fVYEntSEZKQ3XUb2nFCYVTP6CNW4k3Rl7u+o86j55FGAeNydoirHWZgkItTYBpsiwCIpll/55DSKSBV6fToVHxvJEx1nNos868Gb2FwgX7T0NrVKaIY7ce8Ek68UmNQtlYMG9fVMPTuhOXRVW83JwFb00mlbsrtMasuXtOIchgBeTr9wHYePKqyLZivqyCjw/m1Vs2MEdm5OkWGMlJJ3EgIEshEZAI2AIB/bu/LXL4RHSmzpCFL5lUqrt54nCFNdv11pzW8eL+TQS8Ux8otUpObVwqvG5eaQRvjLl96pCxYDy/e0OEp0gdvQ4haCXm4/t3fGWJOeoy5iskxOizlnM71wq/lqGVHYpfp9OBTnlR/NZ03zxWJ5WZC5VE7nJW+NDVwgI+fxExyWHVRMmSeUTq7t3ro3z5gpxoc0klomJF9SH71q3o9+egNO/Zw9iGDf8Sm6QoTx718xwyRNStWxoNG5bjRKdGEDVuXJ5/9vDB/6OoW5kysZxQsIdqRYmXl7okWAmztqvT6UCbjlauXBgtWlQW5OigLjP39Eyhl632kxpahUKTRj0B5iHD1507+kZXFmzyj6ptzPgSxiZppEtJ6Ourb/zJli2DEsVXX9DbfRGgYbSTWmO43rr1WEjT/iO0QaZOpz7Ai8gkwtDGq4ohkoo8adJKchKctCsmtIV5ETn+UFjGjLa5d6RN60XqOe3de5a7hj+06ow+71HCTe0nQvFenvr9441f/Bo6tKdt7D5/i4oUhULDwnH85gMRnjm1p+CtxWTS7PdDRpXjzKhhTPffF24bC070YfdfvgOtzjAs6INX70RQCmd1VYMItAKTNXVKoSU4NJSv1BEBGmbTKdXQQft4uNmoPJosBatdhOLsFC7CzWH27t2LFStW6NGhf+PhOcGcwkkZiYBEQCJgAgE7E+Ey2EIEMhcuJVLQnhF+mn0wREQMjFf6LELi7SP1u1IRGMk8uXEhkoP4VEYEGDAv7ht/YHn/Qp3Y2Ds4GqSyrfeliTIZyzVtVnUSGvTez5gID/N/+5q9lVZv3OnzFObh1v45vUV9C63T6dDufwswattl9Ji5ATV7jUAGG+WrrYf204sK5QvwKJ1Oh8yZvDlPP8WK5SSHE52YwRn2c/So+pDFvEb/7t/Xf4trVCgRBmqXrqdLlwpffNFKEH0aQEQngxC5s7dvShUKF86usBa52slpbPfeMCdDMmbRSTd79kzC4sUj8d13XUAnpiik3WTUyUn/WibDiJLHs2evFTaK+/TpqyhhpgK0xgxDmcDAYBHk4qJflvSaTxGiw+vGDdUY52JkEnD06BXQJFfJiIx6dOIPYTR0aCtu6FPikoKr3ScmODgEtEonMZTblFH07dsPonjW2ohVKIxktKvmq8J2AAAQAElEQVSsbt1SPzuIjBbOgwfqWOWtOfZYCEQyj1+ERnIRTrrUdhFMPP16ubmKnO5pDEUiMJLRTsjT2+Co10ypVOOJn8HnQpFF4A7tWcGZJPbz/N17oyWmPS6UCFu1fEbN3kNvPqiGdCVfxf0QGARaeaL4M6Uyb5WoIq+4sXE1zY+Ajw4Wqbh27RoMT125fdv486VFiqWwREAiIBGwIQK2GvNtWOTEqTpDniKiYLRiQXgsYDw0p7C8fW764e7lffXTFZ1OBxePlCZz+fBKfRA0JWQf+bmMqXhrh796ZP4+BWl81U3T/N9HrGQwVZ6QwAAR5ZNdNZCIQCswN08c4JvCalXRviyZ8hdDxXb90Ov3zRi59RKKN2irFbEqf+jQRaGvYKGISXqFCgWgnXjTm3BlspA1q/pmfd++MyKtKUZ7sospmcQYrjVeWFI+WqFgiTzJpk2rf839959qOKR4a9HQIS35UalZs6YzS6Vd5CdKirB28hfd5w60ikdJE5Nr+MmKKXntxpokk0YzEY2uLA8ePCNxTtSnlX7MA9iPv/9HhskqhLM34MzL/2i/CMKoceNy/NMtOlp2eBxO1eFK4+mHPi1TsvLzU8cwJSyh3Bcv1Lfgpsrg5GTZZMmUHsNwrQFF+ymToZzWQJcyGsMAm1uKozVJR2af+H30cXFQcXr+XjUUUVm09MJPjUvloRpHtDJx4TNqJtX+GqOkoc7nmnIYxiVm//uAwAQrXkbNio630RiRqIABQapBOHMa/XsJxduK0niFCNVv3jsKXjISAYmARCC5IhC/d/vkiiLVK0y7FFZ/mSxFW0o6nWkd9PCv1Reul7c2JnHy718+NbtgOs0sVKczjYmhQlpGbxhmLf/GicOx+Mv2oM1IQzUnvij6nVzd0PjLn1G+TS8lyKruv/9eEvoyZYpYOl63bsSKIj/aOyJyAkinijixN/yKAYDetkc3wVSUvnwZvUFJkUtsrnavhmXL9oBO4TCH6LQYS+uSObO+4YFOp7FUR0zydIxo4yblhZi/fyDWrTuEb79diB49JqNDh/9xoo0ihZABExSkvsk2NDxoRcMi+4w2zJZ8dJeyTqd/nRsrG51A0679BOzffw7U5w3LSoYP6v+//qpu3mwok1j8YZrx26DqiaWICVoOQ+OdtjA6nfYRRl3Rp5VR+OBg9ZMFX/UrKiU63lz93q2frQ6a+kRfHVj2L0KaPo+J4KL/1emiK2X0aT/VWO39xxL0zG0Ta+CaLrX6nPryjWp8s4ZuqUMiIBGQCCRGBDR31cRYvKRTpkfXzonCOnuoy0NFoBnMu+eqASBl2owmU6TJrK5yoJtr4AfTn3SYVJKQERrjRUzF0H564+Ie/ZsPB2f1DdjzO9diUh2n+DunD2PB4FaYUDcvprQqg71/TsarR//p6azR40s9vzGPnZ0dHNjbPi3pdNE/JgWy15PK/gY0efXyckfhwhF94vTpm7gX+elJ1apFULZsPij/6FQKhY/OtaB5olMT73HaVQk00aX6mkPazyDMLXTVqoX1RO/eVVch6EXEwdOhQ02R+tUrPzRr9g1mzNgA2rCT9tR4/PgViFKmdBNyhoz2jbfhKhStbHRxWrm48Nq9HdKlU/dgMNSpNSKFMwPMhw/GVznQpph0EkfTpt+gfv3RfJUH7dmg7b/FiuUyeSKOYb4J5b96Vf1M0XD1SkKVKaHz1a4aUoy5xsrko/kcSvtJjTHZB8/U66RKyUgDoDFBG4T5B6tv0r093E3m4K3ZY+f1e+P93mRiMyIevVZX6bi7qIYfw6TpPFSsDOOk3zgCWmxTpoh+w1NX9gJC0fLojdomSpit3Ny+6kbPR87Z5lQfW5Vd6pUISAQkArFBQBo6YoOakTT3Lqg7fTs4OCFVenVjRCPiRoPePlUfeFNlMr0bd8b8xUT64I/qUlcRaENGxybmNlQfRfVTjcHC1c0DOr03eKq4p7cPdDrVQPD4hvp5hyqlz4UEBYkAV0/TEy8hZIKh/VgOLZmBGR2rYffvE4SUvaMz3FOp+2aICA2zefNmbNq0SY86deyokTDOalcQ0JtrZbK7desxNhE+zxPRySvlyuXnPP3QcavkJjVydFQ324yu7DTxVeIzZ06rsDZx69YtLfS+efMe2rfyIiKODH2KoahYvnyv3r4USji50W0IqV32Hx0mvr7pSJVNiU4MUTLIqDn5QQlT3Pz5fRUWAR/Va1QEGmHI+Ld9+3HQkaz9+0/T+6ylbFn1GjCSNEqQuf0tSsJYBly8qH6K6OBgj/Tp1WNVY6kyzskSWsH79/6iCNpNhkVgJJM1q08kB73TYESghjl8xkP4iueL3/umds+G7OlM32t8NZ8xPH4T8wuMwBDVgOJkxjipnYy7uzpDJxDRZ3y9TZdRX1L6FAQevlQNFrQniylsU6ZwAW1CaiydEmYL19VZB3fXYKF6/R51dYcIjIZJnz49G18H61GRIuon29EklVESAYmARCDBEJCGDitB//bZI4SHqg8dTUb8YrHmJ7fVjSJTZ85ucpJcskkHofv9a9VCLwKtzLzSnDTi4BS/bwEeXT0nakNH75Zq0l74tUz17urqCVrlYurEGm2at0/UHe59cuTTRsWaP7JqLih/RYFXBnXSpoRZw6UNGRU97dpFnPxCKxNOnrzGjCaHeRRNmipVUlceGDspgwsmwp+gIPVa8jU4vcNUca9p3ozT5DYFe6A0JRuXcDrlw9lZ/b75t982xEWdybQ6jVHv3Tt14qdNQBuppotm4nT8uDqmkDFMu/GloocMIN7eKRWvzdzbtx8L3ZkzeyOVZr8AEcEY2meDOfzv9WvjmwvySBM/167dx6PHr0RsdPgoQmb2N0Xcqi4Z6EJD1UnHiBGfWVV/UlT29Kl64lj16sWNVsHR0QEFC6gvBO5HrmQzKswCN+xXH3cy+rxmIfH3pzUw1CmSy2jG9nZ2KJUzk4i7rzkpRAQaME/fqAYb2gfEiRnKDET0vA9fq8YTmmxXyGP8/lQrcoWgXmLpiRaBe6/UTz4dWFuawrZpKfVZIzQ83OgpMdFmFMvI2hXUT1UCghzw8FmoRZpy5syJunXr6tFnn8mxCvKfREAikKgRUO/8ibqYSaNwxzcuFgXNWrQsKrTtI/xaJnWGLOj/5254pE6nDcax1fMRGqpa3Nt+/4dePHmK128DL5/MxHL6d+ks7tryhz6NUSbvOp0OJRu1s2V2errfMgOS9pOQaj2Gw3D1RdqsuVGodjOR7tax/YKPjnly+7KIzlWuOjy91beDIsKAqdt/LKgNDIKFN0+FWtDp1Hc5Lx/cFnHWZLSbirpHniBCnzNQHrSJoLJvgUfkhnY0kbp+/QFFJwl6+1ad4LZpU9WsMs+avVmserC3t8OkSb3hpFkirFXi7OwEMliMG9dFGxwtTyeYzJv3JeiUD0WQJqm2MiA9f65O9po1q6hkKVwvL3d+AosIMMKQoeOl5k3jhAnd9AwMhM/kycbHKSPqTASZF7x69QHRPpRi/Piu5OgRrU5Knz61CKO9VoQnkiGZnj3rg9owMkjPIQOKj4/6Rvru3ad68cY8selvxvTENmzjxgjjJKUvWjQn2raNMF6SX0sZMqTGggXDkSaNujpBG59c+AULdoqq0BjWsWMt4VeYsWM7QRe5+S6bL2LhQjWNIqN1T1wIwYdAZx7kaBeGxtVMf7rBhaz4s+qousIwtZsr6hbJHUV771qlxJv+cFahzadj/vwyjMkFBEc8M+h0OnSoVDSKXm3AR2ZAPndX3Ti5W7XicHZUJ8AkW6NgDqRxT0GsJAsQoFU7tzSnV/WoURIpDO4/Pind0bhEXqH1n0v6n7uKCBswXZuon0IdPJ3eBjlIlRIBiYBEIPEhIA0dVmyTXTPHI9BffWNSq88o9J27A9W7f4H8VeqhSqfP0f6nhRiw5CC8s+WGo6urXu7BgQE4v2OtCMtUsAQGLN6HSu37o0yLbmg7/g80Hj5RxAe8fYUz21cJvy2ZN0/uC/UNh/2IXr9vQfPRU9Fw6AROpZt3FvHWZrZNGSNUurqnxODlh1C772hucGk4ZAJ6z9sGe/uIN+zsuQ+bJ48Q8tExh5fPFoYlSv8509tz1iZ0nLiEU7MRk6Mkz1upDm+D0Tuu8fagtslZpiqqdRnCMWk7fq5I8/bpQ5izskQksIB5+dIPgQa75u/fr65+OXPmlp427WcDehFW8NCEkyaehsSeu4V2w7jOnevAjr31EgIGjLb8pUvnxbJlo0FGCTo+lGjAgKYGKcDwCMK8edtFOH0CsWHDdyD5evVKo3r1YujbtzGmTx+IbVsncINFgQLG32iSkjSpPXm+W7b8gD17JvOjXXPkUB8QaQXNhAnqccOURkuVKhWCYb21y/CzZ08fJZ72lFB00Oochae6rF79DQYObIYqVQrj88+bYeXKMSBjhyJjyp3Hrg8lzsMjBU9HGJAhaP36cTBnxYOSPi5uYGAQdu5UP/ErwN7GL1o0krdDixaVQYYP7Ukpb99+AH2OYpgnrWJp374mb0OqR/fu9VCJYd2kSQX88ktfLF/+NRwi32zTHh/0OZehDkN/bPob6ciRI0OUNqS+RnFErq7OUeLJUENxWqINcf39P4qgPn0asr78BahulSsXRseOtfHTTz2xZMloZM3qAxcXZyFLjLe3J9au/VaP0nqrq3RKlMitF7d48ShKlmjp1KnrePjwpSgf4UD9tWXLytwI9Mcfw1ibFxTxx45dAY2JIsAEs/5vHxHTs4XxVVJCwIrMjccvoZ0E96tdGsMaVEDV/NlRq1BOjG9dE3ULqys99rEJsF8MJ3coxdt6+rrComnJfPitayN80bAi10955EmfRsQTM3//KXI4eXu4YWa3hmhYPA+q5MuGAXXKYlC9coivf47sOm1cMi8MSafTiSIYxtUvmht2mnghmAiY3/ecEKUgg9bsno3RvHR+lM/ti3YVCmMGw9rR3p7LkDFrwYHTnLf1j4ODDsXzPxLZ/DgvogwiQDISAYmARCCZImCXTOuVINUKDw/DkuGd9Ywd6XLmQ+WOn6P1uN9RrdsXyMUmxdHdo3fM+A5vnqpv3tNkyo4aPb9CvYHfIm/FOlD+0cqPtf8bonht7q6foJ9XhjyFULhWM5Rs3IFThTZ9bFaG26cO4fL+rUK/k6s7yrfpDTK40Gc8ZKRQIg8umgbaM0PxR+cGBvjjn4XThAjpyZivCHKUqsSpQPXGIs6QcXBy5u1BbdOBGa+qMEMHYaLTRTyg0WdMK8f0MkxmVb/hm+otW44K/Vu3qjwF0iaN5NqCPD1dQRNPQ9LmpY0jvmvXOsihMRpoZYmfNm0dM1wEE8uJ3vJXYRN8+qyBiCbGPMLgZ9Wq/di796wIdXFxAsl/9VVbjB3bEbQ6pFChbNDZRbSTEDTCkAzlmyKFC3QG4pcv30XLlt/hwgXTK3Zo5QfVVUtZs6YTOWXIkCYKbmTIUATmzNmKN2/UhRbAwgAAEABJREFUlS1p0niiRYtK3ODTvHkl0NJ9MuxduXJPSWLUJePC2rUHRZyDgz0Ig5Il84Am4qTj7NmbIt6WzIwZG/HkifpZSebM3ujVqwEz4DRFxYqFRNYxGZFIkNqH6tGRve3//vuuGDKkBYoXzwUnJweK5jRr9iYEazaC5IFGfmLb3ypUKBSlDamfKlnQJ07a9id+6NCWSrRww1kjDB/+B7TGjhzMiEJ1++67LszgURd0Co9hP1QUuDDDB61k0RLho8RTm2vjMmZQV80oMonNHT9+sd4YQP2VDJxkBMqVK6MoLl0jEyeuFP7omEkLgXBdhESRPI/g7BTBx8fvlG1H8EFzrGiV/NkwtEF5DKxbFoV9VQPMs3fvMV9jjIipbCuOXMBLzZ4mWdg4UTlfVpB+otxsnIHm370Xb7Hx1FURQsaOXjVKYVjDCqhdOCcPV1aJcI8Nf1I4OaJHtZJRSJulYXyfWqXh4+WhFUk0PBm0tp5VDU8pXV3QpUpxjGhSCW3LF4ZjpJGDCjx370mYa8wi+bhQ50YOsGP/Scfdp6lw+4Fln61QOi8vL3L0KEizz5lehPRIBCQCEoFEgoBdIilHsinGwytnMLlZcVz5ZxvYs6vReoWEBOHy3k149/xJlHha1TG9XSWc27HaZPrXj+9hetuKuH3iQJT0FBAWuZSV+JBAdbki+WNLDy6fxuxutfHo6nkEBXxgZQvXU0V10guIxhP8UX1zGY2YXtSa7wdgy68jxQoMvUjmoTItHtYO+xdOYT7z/2gT0eWju4FWX5DxSJsyPCzqw8DFvZvh/yb6fVEeX7+IP/o0xpNb6qcxWr0meIuD6a2nkohO5VA+V6GwEyeugSaLxBPRSR3kmkMfPwabI2ZTGZqcNmkylr3B/ht+fgGsvxlkZ+riYmI//LAEw4b9DuVkGhYU5Y8+5aE9PWbP3qwXp92rQYmgrPz9A3Hv3jMcPnwJ3323iE3Mf2Pliv6NcJBmUqPossSlyW+vXr/g6lXjhoyPH4Pw9dd/QmvoMJUnrRj45Zc1oJNPaJUDlYPcx+xN86RJK6HdtNTPL2q9KC9KQxQSou4nQX5LiFZ1tG//P+zYcTJqm0YqojK1a/cDtCtaIqO4c+TIZZAMtQsPMPLz8uU73k5aA48RMREU2/5mCm+h2AKG2rFZs2/xzz/nTWJD1/TevWfx/Lm6H4AFWQjR0DDjbRhmIlwkjCND5TdXBX1q16rV99Du7WKYlvoCybzRGAQNZbT+N+/CcOh0Bh5EE79v+sTfI9CDV2/RY856XLz/jOdv7GcPM5z2nbcZHwLN24SXdISEhqH33I3YfeEW3vp/ZH1H/94cZOR6XbCf3c93nwDtEUE6tET7eIxavlsEhYRGvQ+KyETABIeo5QtmWCR0kebuOYmfNx1EcKhaLm2Z/D4G4sulO7Dt7A1tsE35ge2eC/0T5kQ1WIjIaJjy5ctHiV24kFkOo4TKAImAREAikHgQiL+7fOKps81LEhoSgtXf9cf4mtkwq2stbJ82BgcWT8ffc37EkuEd8WPdfFjzwyCEBAWaLMvGicPxQ60cmD+gOfYv+AVHV83FyrG98HPDAvitQ5VoVy3M6Fwd39fIxunCnk0w9u/sjjU8nuSmtClnTCRK2PO7NzCvfxP81LAgq1t2kZ50zOxUPYq8NmD+gKZC3jJjhKrl9JYVmFA7N2Z0qortv32DExsWYtPELzGlVRlepjtnj6jCFnA3ju7DtHYVuW6qi0I/NigQRcveeRMxuUUpTGxUCKvH9cWeuT/j5KYlOLBwGvP3w9Q2ZTG3byM8vX0lSlpjAQ0bNkSDBg30aNFida8XY2mUsLlzt6FGjS85tWr1nRIs3Dp1RvA4kjly5JIIN8b07z9dyMb0rbthepp0UR6WkvbkGEOd5KfJ559/7kDTpmNRs2ZEPZU8atYaTiIm6ezZm2jGJo3164/GyJHzQFjRySVTpqzFoEEzQdj06z8N+/apqz9IGRkxlDwUl/Ju1OhrdO06EWPGLOATUZKNiYYOnS0wVXTF5PbsOVlP7cuXfqC26dTpJ/z66xps2PAvd5s3/5b1mdE4evQyZszYIPIhA4+eAo2HVvm0aTMehB3pI7dDhx+Z0eEEMmje8P/331NNqgj2woU7Ig9jfS1CCqByKXU8dOiiEhzFnThxBWqxNhwwYDr+/HMnVq36B2PHLkDDhl+DykT1jpIoMoCMdiRTu/ZXoFUQM2ZsxLp1h5iO/fj55xXo1m0SWrf+3ux2ilTLV378aWF/W7Vqv8BFqXdMLvU9JU9DlwwB1Aepz1F/mzp1HRYv3g1a3UN1rVt3JMiQZ2hgefDguUXlMFUGwlQpv2HZFP/XzLimyFBZlHBT7t69Z0TZyMhlSs5Y+IcPAejZ8xfUqzcKo0bNx8qV+7Fw4W4MHjwLtWp9xQ19lhpnPv/JEWHsP+XXtv4DuDpHLvGgABsT7ZExZtXfaDV1BciY8Nc/Z/DHnhMYtmQ7Wvy6HL/tOoqw6Cx4MP4vNCwcM3cdQ5fZ69Cc6Wn2yzIotPuC8dVaO8/fQCsmS3kv+Oc0pu84ik4z12LAn5vx3/M3In2XWeuMZ2qF0Lf+H0U+SnnNcR9rjsldfviC0DFr93GTpVL0Ej4mhTQRlsprkuLIjftoPXUlevyxAb9s/RfL/j2P/204gE6z1nKMb2pWtWnT2YJvVdsRaVK+56pv3PfGzsPBnLf0J0+ePHpJrl69ijt37uiFSY9EQCIgEUhsCEhDh41b5MW9mzixcQkzVvyKwyvngD7DCA8PMytXkqMVIgcW/4Zdv0/AtX93IzDAPyLtJ/z76uFdnFi/CNunfwsy2Jj7qYo1Ifvo/x5XDuzAv8tnY9vUMXwlyZUD2/HuxVNrZiN1xREBWkFw/PhVkJGDjB2bNx/BxYt3orz1jGM2Nk/+8OEL0KdJ06ev5+7btx/ilCfp0yrQ7h1y69YjbZTN+HA2oaNVDEuW7Mbvv2/Gv/9eQoCZ+xJQoWiCS6ua1q07yI09v/++he8BYvhJF8kmRaIVRJs2HQZtzLly5T5QXQmzpFiXuJaZDDu0D8ecOVuYoWMn/2SM2j82el+/DcOyrdl4Uke7MIzrp+N8fP7QKowrj55jw8kr/M3+7aevY2XgiGuZw5kCynvjyavYe+k2aLUBC5J/VkLgpZ8/Dl69C9qM9vitB/H2qYq2+F/3fiK8Aya4Cd4SxtPTE+7u7npJfvnF8pMF9RRIj0RAIiARiAcEkp2hIx4wk1lIBCQCEoEkhQBt/qpdtaEtfJs21UCblFJYaGgYDh+27SdXlI8kiUBCIvDNzHD8tSkbFm/Jisu37BOyKDJviYBNEVi61Yf38zEzsuPaf8Y/p4mpADVr1tQTOX/+PB4+fKgXJj0SAYmARCAhETCVtzR0mEJGhksEJAISgWSCQJcudbB06WjQiSSjRrUHGTdoE9A5c4aib99Gopb0aQx9LiACJCMRSIYI0Kce384KwZgZoVi4OXZL+ZMhLLJKyRCByX9F9PPFW2LfzwsXLiyQoVVlU6ZYtheaSCwZiYBEIL4R+OTzk4aOT74LSAAkAhKBTwUBH59UqF27BDdu0KkwuXNnElW/ffsJDDdnFZGSkQhIBCQCEoFPEoHx48ejWbNmgp4+lZ/ofpIdIVlVWlbmU0FAGjo+lZaW9ZQISAQ+WQRo01I/v4Ao9Q8PB96/D8CsWZvQs+dkxHbfgyiKZYBEQCIgEZAIJAsEaBVHUFAQiII1p/oli8rJSugjIH0SgWSGgDR0JLMGldWRCEgEJAKGCNBJGXR6DZ1UQSeufPXVXH46CZ3uQcf4rllzwDCJ9EsEJAISAYmAREAiAECCIBGQCCRNBKShI2m2myy1REAiIBGwGAFasUEnrpw8eQ3J5XQSi0GQCSQCEgGJgETAGghIHRIBiYBEIFEjIA0dibp5ZOEkAhIBiYBEQCIgEZAISASSDgKypBIBiYBEQCKQGBCQho7E0AqyDBIBiYBEQCIgEZAISASSMwKybhIBiYBEQCIgEYhHBKShIx7BlllJBCQCEgGJgERAIiAR0CIgeYmAREAiIBGQCEgErI+ANHRYH1OpUSIgEZAISAQkAhKBuCEgU0sEJAISAYmAREAiIBGINQLS0BFr6GRCiYBEQCIgEZAIxDcCMj+JgERAIiARkAhIBCQCEoGYEJCGjpgQkvESAYmAREAikPgRkCWUCEgEJAISAYmAREAiIBGQCEQiIA0dkUBIRyIgEZAIJEcEZJ0kAhIBiYBEQCIgEZAISAQkAp8aAtLQ8am1uKyvREAiQAhIkghIBCQCEgGJgERAIiARkAhIBJIpAtLQkUwbVlZLIhA7BGQqiYBEQCIgEZAISAQkAhIBiYBEQCKQtBGQho6k3X6y9PGFgMxHIiARkAhIBCQCEgGJgERAIiARkAhIBJIEAtLQkSSaKfEWUpZMIiARkAhIBCQCEgGJgERAIiARkAhIBCQCiQkBaeiwTWtIrRIBiYBEQCIgEZAISAQkAhIBiYBEQCIgEZAIJAAC8WzoSIAayiwlAhIBiYBEQCIgEZAISAQkAp84AjXKOmLbrGBOjas5feJoxL76BXM5cAwJyx7NHWOvSKaUCHwSCCRcJaWhI+GwT/Q5ZytaFoWqN+LkksI9wcpr7+CACm37mCQ7O/tYly1luozwLVSaU0LWMdYVkAn1EEidKavJflKkTnM9WUs96bLl5f0kS6FSliaV8hIBiYABAnkq1OL3lpxlqhrESK9EIP4RKF48N9q2rW6UihXLFf8FslGOU4Y/R8EcTzlduhlqo1ySv9qb90KQJ1sElqN734aHm13yr7SsofURkBptjoC8Mm0OcdLNoMPERWgxdganDHkKW6Ui7qm8UbxBW7Qc+xsGLtqHz5ceQNepq9FwyASQ0cFYJo6ubqjVZ5RJcnR2NpbMrLCu09eg6/TVnPJWrmtWGimUeBHIW7GOyX5Sf9D3cSp4n/k7eT/pxvpMnBQlYOLc5WqgyfCJ6D5jPYasPIwBC/eg8y/LUHfgt0ibNXcClkxm/Skh4O2bC5/9MI/fW9p89/unVHVZV4ZA4cLZ0aVLXU61a5dkITH/tWxZhctTusKFc8ScwEKJzp1roU+fhkaJ4ixUlyjFh3R0gJf7e16245cy4vYDaejgYMTiJzAIWLrFl6d00OkwdYTEkoNhpR+pRiJgLQSkocNaSEo9MSJAE6xha0+i8Zc/o2D1xkidOTtSZfCFb5HSKNmkAwavOMwmXcuj6gmNnxtIeHhY1LyTSMhnP8xF9+lr0WXKStAKmCRSbKsXM8g/4iHO6oqTuEIyYpBRo93//kSx+m2QuUBxeKbNiDRZciJb8Qoo26Ib+i3YjZFbL4EmoTFVN7H0t/xV6vN+T32/bMvuMRVbxicSBHQ6XSIpScIU44cfuuG33wZiypR+cHCI/YrEhCl93HONMFrUZoaL2hg+vE2MClOl8sCAAU24fJcutVGoUF71ypEAABAASURBVLYY01gqEBQUYmmSJCXv5KjDgHYPeJnD2eU3bJIT58398cpWFPnafsspbeEa5iZL1nIT5oYiKNSB17FWmYfImSWC5wG2+ZFaJQISAQsRkIYOCwGT4pYj4OyaAn3n7eQTrJhS++TKH0XkI5u8TmpWDFNalREUHh4eRe5TDshZthoyFyqJrEXLwsXd85OF4tSW5fi1ZSnRT1aP6/vJYqFUPFX6zOz62w4yaihhplwnVzekSJnaVLQITyz9zbdQKd7vqe/nr9pAlE8yEoHEjECZMvlQsGA2FC2aE+7urom5qDYp27Ztx4ReMvQUKpRd+I0x9eqV1gveulVNrxcRB8/XX/+J1q2/E7R379k4aEt8Sfu3tYeTfYQx58rtdLj/JIKHmf/cMuWFV97ynFIXqGJmqvgSS5h8goLDse1gRpH5172DBC8ZiYBEIHEgIA0diaMdknUpeszciHQ58oo6vnn6ALtm/YBpn1XA1LblsOXXkXh4JfqHioB3b+D36pkghFlnlcfpzUtxad9mXN67CbdPHBRllEzSReD96xein7x/9cJqFTm/czXvKyc3LraazvhQRJ9n6ewj3jSRffDG4T2Y27shfqiVE7+1r4SNP3+Bm0f3geLiozwyD4mARODTRuD48asICVHv4XXrlooWkEqVCon4V6/88O7dB+G3FkPlefnSDwq9f+9vLdUJp0eTc+fG6r1w/jo3TYxk44LA9KXqNKpqqYdwcNDFRZ1MKxGQCFgZAfUKtbJiqU4iQAhkLlAC3tlyE8uJDBq/ta+Co2vm4e2zR3j3/AlOb1mB+QOaYcnwjrh79iiXi6+fg0tnYu34z7Hmh0GgCXJ85SvzSXoIbJw4nPeVbdPGJpnC0+asHt7pRXl3TB+D5WN64PHNSwhjxsLXTx7g3M61WDa6GyY3L4bzO9fg5f2bQl4yEgGJgETAFgjcufNEqC1RIpfgjTE5c6pvzU+dum5MxKKwT024VCEHpEn5nlc7OMwO6/4O5rz8iTsCt+6H4PkbT67IQadD31af3qdovPLyRyKQSBGwS6TlSlLFcvNKjdQZsnCiE0DyVaqDZiMmo0yzTqDPNqgyDo5OKFq3JZqNmoIyLbrBxSMlBUdLjs6uyFOhFuoN+AZNv5rEN/H0TJs+2jSmIp3dPJC3Ym3U7jsazb+ehqqdByNX6bgvPyS9St2Nla3RsB9FkYICPnCDRriJvTBunzqEVd/a9lMDewcH3ibULoak09mJsprL0H4GtDdA89FTUa3bMH4qR0x6aENWBTMHJ2eeFfUbah9q51q9RiJHyUrQmSgPhSvpFZcrifzxypCV90UljtxU6X0jY23rUNnoVJJqXYbwflahbW/45Ij6OZJhKahdqJxEnt4+Ipo+u6jS6XM0G/UrSjXpAG2cELIRQ9esYR9R/DFlaav6WNrfitRpKYoa8P4tTmxcIvyGDK2a2vDzl/jw5pVeFLUptYuWtAKx6W80/hWp0xzVu38BunZoM1Tab4PCtboN+RQpU+n1be1nWi4pPPTilPLSGGWox87OHnQdEkWXJ43BJENEaQz1aP3UN4vXb4O6/cfyzZbrfT4O5Vr1jPdNXsm4RddKnb5fo9WY6Xxcyl6iAqg/a8trjKfrTcFNiSf8SjZqx9upUvv+Zl3PSloHNr4VrNaA78tUs9eIeMdCKUfKlG7IkCE1J1dXZyUYVaoUxoABTTFmTEd061YX+fP7ijhTjLOzE8qXL8jTffVVW9BnFbSHhCl5nU7H81XyJ1crS35jpJVReDc3V1BeRA7R7O3h5eXO5Tw8UihJo7g6nVqudOm8KJ5T2rQp0a5dDYwa1Q5Dh7ZCkyYV4OTkyOOUH8pbKbO3t6cSjPTpU6Fjx9o8bePG5aGNE0KRjPbTkPTp08DOzvj9N2tWH5a/Q2QqYOPGw4I3ZAoVyo5WrapgyJAWGD26Pdq0qYbcuTMZitnMb832UQppaX9T0mndbk3Vz1Qu3vBBmBlf/to7u8HZw1uQg4u7UEm8Nk7h7ZxchExURid0ObmlEtGObimRrng9ZKvdC1mqdUaaAlVgF7kCURGie5CDqwc4ObkqwVFcOwenCBkmS2miCBgEkL7UecvBt0ZXZK78GTyzFgbpMBCL0bvnqHr9NKsZYVCKMZFGwNPTk10r3oK8vLw0sZKVCEgE4oKAXVwSy7QRCHSdthoDlx7k1P+vv9Hm+z9QpG4r1Bs0Hl9sPIs0mXPgyw1n0HTELyhSuznqDfwWQ1YchkfqdBEKDH5pgG47/g+M2n6F70xfpmV3FK3Xmj8sDll5FMPWHIe5E1fKe/DyfzFi8wW0HT8X5dv0RuGaTVG161C0/3kRRm27zI0fBkUwy5shTxF8sf4UrzfVn06lsGMTCCUx5a39ZOXy/q1KVIK5gwiLrZcxwggVYRMvcwtWlBmtRu+6DmrvuswQVbhWM1TpNAh0gssYFk7xpnR1n7VBYEbpyPD09e5bvH2onSu064uOk5Zg0LKDcGNGNEM9Xj4ZRXrCncjeXn0Q7TFzfZT4gUsPGKqxur8CM2qM+fsW6FSSKl2G8H5Wq89o9Jm3HV/vvMaNdqYyzV68gihz73k7QBP6kVsv4vNlh9hE7Qt23bRAgyETMHjlMVA+pvRYM3z0zutG+wn1nZjysXZ9qD+NZv3K0v7mnSVHTEWNMd6a/a1C2z58/Ppq4zk0GzkFlTt+DroGaDPU1uNmg8K/WHsSNFk3VrB2//tL9JOBbMyl60WRo7GGwgyp/qDvFBHh5ihZEbQxMtHAxftFuCEzcPE+IZenQk3DaO539fRCp8nLeN9sPHwiyrbqwTdbLtO8K+r0HxO5yetF5LTxMapk1Bix5QIGLv6HXyvl2vRCgRpN+LhE5aP+TKftODg583Ib+xm49JDAlwwjAxbu5feOhsxgTe1Uo+dX/Hpu98N86HR2xlSIMDL4jN5xDS2/mcWN9BXb9eNYfLXpPNzTpBVy8cH8+GMPLF06mlPnzrVBk98tWyZg3LguaNmyMmrUKIZOnWpj5sxBWLDgK4MiRXhTpHDB7FmDsX37/zBhQjeejowcZOxYu/ZbzJkzFCQTIa3++vh48XyV/Ml10BgpKE8K09KSJaNVBRpu7tyhoLyI6tQpqYlR2cqVC2PdunFcbv78L9QIA05briVLRvHYb7/tjBUrxqJXrwaoXbskGjcux40GW7dOgPbzkuLFc4k6zZv3BXx904HwXLbsa3TvXpenHTq0JVau/IYbG2Dkn3afDmZzQcWKBY1IAfXrlxHhwcEhuHz5rvATQ0afGTM+x65dP2P69AHo378JN87UqlUCffs24u2yZ89kbpiCjf9Zs32oL8WmvxmrYqmCb0XwsXPOgo+Oyd1yFIoPXSIoQ8U2QtwjayERrpXxrdpJyBgyTu6pRZpig/7i0dnr90eJYSuQo/EQpC/fEpmqtEfuVqNReuQGkAGCC7Ef94x5UGr4ak5F+v/BQoz/Fek9k8uQrIdvIeNCLNQldUYUH7yQy+ZpOw4ZK32GzNW7okCXSSgzehM3uDAxs/92H1VXcWTLpP+iwBwlkyZNwqJFiwQtW7aMGz3MSStlJAISgegRsIs+WsZaikDqzNn1kjgwC/OARXtBm/xpI8jfcNgEbRDnXVK4Y9iaY6BjMnmAkR/31OnYw+zeaCeOlKxSx4Hozx5UU/qYfqPh6JICpZt1IXGLyLdQafScuQ5UP0oY8PYVZnaqBloOT36i7CXKkyNo/4JfBJ9QjNYQY1iGcBMrTQzlOjADUVNmtFLqbhhP+yFQPJ0yYxhn6KfJCBme6EHPMI7arcfsTYbBidJPmJBRQ6fTGS2fvaMzN9rRiiKjAppARzYR6/X7JnbNuGtCI1hST/nkLlc9IiAJ/Ma1PoQt9afY9Lc3jx8IhFzdUyJ9zgLCnxBMiYafgcav6PJ2S+WNAX/t4Yay6OTMjgsLM1vUUJAm+4ZhWj+NJ32ZYY5WTOiMd30u7uTqjmxFy3HeVj/5qzaAcwqPaNVnLlCc3V9OcENitIIssvecrUhjwlCWmxl9mgz/mUkZ/2v/00Ju8DEW6+LuyYzsC41FxUuYs7Mjpkzpz4wSzkbz882SNkp48eK5ufEgb74sUeKUgNy5M2HNmm/46g0lLCFcNzeXWGVLKzGqVi0CY/3Y3t4OhQplN6rXyckRv/8+xCiepIuMDWXLRl3V5+fnj5cv3wmdNWoUF7yW0aa9dk0dzxSZTJm8UaBAVvYsYq8ERXGpHGTQ+uOPYXB0dIgSH58B5rSPNfubvZ0OPmn8RBV3HtUJ3uqMBRs9+ZRsAJ/STVh/i1oeeoZyz5jP4uLpHJ1iTONToj6KDpgP55Q+JmXJ4FK4xzQWH7VsLDDK34FT6ooZR7swFMgZ9z7m5BRzXaIURAZIBCQCURCQho4okMQtgJaHrxjTEw8vndZTFPzRH8tGdMaBhTR4RkRlKVw6gtH81hv8PdxSqQ9aT25cwubJI7B6XD+c27FabBhIN4KmI00bDnxy5EeN7l+ym0iEcrr/XPh7A9948K/BbbB33kTcu3gyItLCX/qsosu0VaAyUNL3r57htw5V4P/2NXkFpc2WR/AhIUF49+Kp8CcUs23aGJDBRaHQ4ECLilKtyxDkLF1FpKG675w1HgsGtcJ2pps2WlUi6RhP+oxD8Rtz0/rm4sHXDu3Ehp+GYsf0sSCdPJD9ePlkRuYCJRin/vm9eo5tU7/Wo3Bq4EiRv+f8qBdHsivH9oyMtb6Tu1wNPUz8373Gnrk/Y/nobji4ZAa0GJdr3RueMXx+RcY3ogC/N/jnrylY+31/nN2+SvR9sH+1+n7Nfm37t3Pm93p9Jba5UV2IYlOfuPa3uxeO6xW74y9LQdevXmAMHlv0t6CA9zi/ex12zPiOXztLhnfEoWWzEBwYwEtDY0vjEZPY+GXH/crP7t8n6PXt/84cUaLw5sl9vbhtkdfInrkThYy1meIN2sBDswfKzeP/YAkb52d0qoqlI7uw8X4qtGOCtfM3pu/ts0c4sWEhNk38EnP7NsbKsb1wYc9Gdv1ErFcnQ0Orb2YaS6oX5p0tN8JDQ3B8/V/8GjywcCpoHFeECtZqCju7qJNL6l+5NKtX/F4+5e28fHR3vgcMpdeuQCN/fFLTphWRIoUzz/LmzUfYtu04li/fC8MNMrkA+7Gzs+MrOJycIiYvNNTu3n0aY8cuwMiR87B581GGLRNkfy4uThg/vjvj1L9Xr94zw8paPQrXfDswhxmUpkzRjx8zZoGqIB44Bwd7/ukOZRUQEMixWLLkb2zffhwPHrygYJNEdSYiw8Vff+3Cd98t4ukIJyVRX9YPFV7rnjhxTXiLFDFuSMmc2VvI7N59SvCGDOV3/foDLFu2B+PGLUTfvlNZuy3FlSv3hGiuXBnRo0c94U+MTFz7m2GdaNKti7j0Ea4DTl8ONhQx6r+/dwFurPmfoJeX1FWhH57cEuFamQf/rjSqyzDQztEZ2RrxF3vCAAAQAElEQVR8zoNDA/zw4txu3Nv5Ox4dWokPj27wcFv8uKbOhOyNBrP7CgOCZRAW9BF3d83BxbmDcHXpaLy6uJ+FRvzRKTOZKraK8MTwGxQcjvcfXYVUpWKClYxEQCKQwAjYJXD+yS77E2sX4PrhvzH/8xYIDVVvKKe3LMfNEwewf+EUkNGDKu7i7kWOIFrNUbhGE+G/dfIg/ujTEGe2rcSVA9tBmyGu+a6viKc3tKWbdhR+LdNm/BzhpcnD3N4NsP5/Q0AbD95jkx+aVPzFJudkfHn+33UhGxOTp0ItdJi4WNwo3j59yIwcVUFHwBqmTZ1JfXAJ+fjRMDpB/FcO7MCBxb8Jev/6pdnloPap2HGAkL9z+jB+bVUGx9bMx31mNDqxcQmmt6uEB5fPCJlW38wQvCmGDFkrv+mD87vW4/iGxZjSupzoI5SmdLPO5AgKCQrEyU1L9SgsTH2jcG7nar04kqU+KRRYmWkweLzQ6P/mBX5rVxH/Lp+NG0f3Yd+fkzGrS01h7NCx54smwycLeVPMh9cvGA5l8c+iabi0fxs2TfqKTRqnCHHvLBEGIhFgA+bY2j9FP6E+Qw/Ssc0mNvWxRn+7cXQvPrx+LoqdwjMV/yyKPovr/Mty0OcEbkY+jxIJGGOl/sY0ASc2LcG68QPxU8NC2PDjMBxft4BfO7dPHeLG1xkdqvLJNQnTCpZSzfTHNxq7qD8r9PTWZRLlRIZUJVzr+jFDLBewwU+hms2E1vsXTmIZM27cZuP8q4d3cev4P9i/cCofE+b2bohLezcLWVswJzYsAuVDp1ltn/4tzu5Yg8fXL+Dav7uxfsJgrP8hYmJBeafLkRfuqdQJJIUZUjjr8LO61cGO38bxa5DqMrdXQyFG7ZPLyMoq7adCH1jf+619Zd7O1BdpD5jN7FoWShKAoTGITtgYNWo+evf+FZMnr8Lcudu40aJp02+wZOnfeqUaMqQFaCJPgeHMQNG37xT8+OMy/PvvJW4QmDJlDfr1myqMHTlypOd7f5A8UVBQMDOGHNGjUM0qo507T+jFbd58BEeOXKKk8UqEy9mzN9Gs2bcciz//3IFJk1ahc+efMHo0GwsPnDdZntev/dC69XgsWrQL//xznqdbuHCXkKdPW4RHw2zadET46BMUV1dn4SeGVjbY29sRy/HdufMk57U/d+8+xWamp2XLcdy4MW/edhw4cAFk9Niz5wwGDJjOy6SkadCgrMImSjeu/c2wUpnTqyEhoRFYqiGmOTJmvLx8AAr5P7kphIPePhfhSjy5IcxoIYRiYHQ6Hch4cvKXdri58Rc8OrYB95hx5cK8z3F5wRd4ff1oDBosj87VYqRIFPj2KU7++hkeH12P94+v482t07i+7ifc2TpdyGSp3hX2zm7CHx3jH6D23Qxpw6MTlXESAYlAPCJg/qgXj4VKyln9d1a9cQdoVjjc0YS/Z5M4qiMb52Hv4EAsp3Kte0IXuQkTe8bEOs2DKRdgPzRRf/nwDuMi/sq16R3BaH6zFyuPVBl8RcjOmd/hiWZCICIYQ8YXeuvH2Bj/ClVvhLbj5wkjx6sHdzCzc3WQIcVYYk+fjCI48IOf4JMqU7vfGNhH7oURFPCBTWr0DRBKvZaN6soeyiJudB7sbW90mx3S6o0zzJClpCU3PDwMV9nkhHgiWtVBbmIk2iuGPrFRyrZ7zo8IDPBXvNylkz1o0sU97Cd7yYrsN/q/nTPGgSbYWilaHULXBYXpmMGENqYkPimQ6fpElN5YfWpbqb8tG9E1Cpa0yWa24uVBG0R+se40aC+GgtUaRBTGhr9kFLy4b4vJHMgocf/KWRGftbD6fb4ITEQMbdRpTnHolBtTY7A56c2R2THze36ajilZwp3GLSXe2IpCJY7cq8y4/vLBbWIFPb97A++ePxJ+7yw5BU8M7VeSRhNGK7tCgoMoStCZ7atABlERkADMrFmbcOzYlSg5BwQEYsGCnXrhDTUT4z8XbMeNGw/14slDk+p//jlHLKdmzWIe47hgIvrx8wvAsGG/IzhYNZorxTt69DK0qy+UcMWdMWMjyKCj+MmlFSHa8Zo2hKVwLV29eo+lU/OjfTW08dp9SJ4+fcVkg7XRnPfz88eUqWvx5s177jf2M23aOhHs5qa+eReBiYixdn/Lki7iWYSqGBSs7uVF/oSk4PcvcWPt/xCueUmjlOfd/Uvwe3hV8VrFdc+QB24ZcwtdlxeOAK3oEAGRzNNT2/DxxYMIn509UucpG8HH8Ovnr06n0qUJjUFaRksEJALxhYB6ZcZXjsk8H+2JBdqJmr/mJIOQjxHLswkKN81bNe+s6iD84v5N0CkIJGNIpzYuFUFuXmkErzBZ2QRG4QP9/fjxrYo/tm6Bao3QfMwMZuSI0PD01hXM6loLhg+xEbERv/RGOoIDgiKXpCv+pOhmyFNYFDvA7y2K1muFEo0+41SyUTsQlWrSAWQQ0hp2cpepJtIZMvQm2zCM/DShIJcoReqobUzhiYEy5iskikErmGjFkAjQMLSyQ/HqdDpEZ6Sgh+OLRibDYWGhCAlUjSjevur1ouhOjG5s62Ot/kaT7F9algJ9VkGfIhjDKE2WHHzTyLbfqyvBjMlZM0yns0PqTFmRv0o9fhJVmRbduEsrBZR8XD1TK2yidN88VpfFZy5UErmNrHBIiII7ODohQ66CKFKnOcdUwTY0VJ1UxrQh6Nmdq40W/d1z9RPEVBl99WQy5FbHA+prWgOnVvBSAm5M/f59ADZs+FdbHJN85sxpobNjVtVIiQ8fAtGwYTlOjRqVg0KNG5fHhw/qqkU6KSQySZJxtCswLCk0jW/79qnGSSVtWFgYAgNVI5evr48Spedeu3Zf+GmPEOFhTPHi6sq9I0cus5CY/8iQUbhwdt5GLVpUBhHt/0HlpNQ61pxOTolnwk9lUsgW/c3DXdEOZsRKPPW+t3ueWrB44Dx91f2pwkOC4JYhF1Lnr8TJm7kK0akvQe/UVZCeWdUxLbpifgxUsfV0C4tONErc0qVLsWLFCj16/fp1FDkZIBGQCFiOgJ3lSWSK6BAgw4ISH6p5k6Wd+GqNA24p1UmsV/osSlK8faTe/EVgJPPkxoVIDqBv/4UnkkmfU9346/VD9UE8MjpWTkk2gacHBCXxf+eO6m08qoRr3Q+az0Jc3T21UUmST5kugyh3ynQZ0WjYT4IaDvsRRA2GTOAnHtB38IpwdG9OX9zXf2OqpHn/4onCwt5BvYGKwETCpM2aV5Qk6L3pVTu0f0u48qTJUqTXGI2YV+9Pa8zQi2CekEB1MuHk4sJCEv9fbOtjzf5G4w99VvG/+vmw5deR3Ojh/+ZFFPDyVqqLWr1GRgm3ZkCOkpXQ76+/MXbPbQxc/A9aj/sddBKVQhnzFRHZ2Ts5CT4xMqe3LBPF0ul0aPe/Bfwkqx4zN/DVMlpjlRC0IVO2ZXd+whedsNLrj62gk20UXMl1dU8pcndycRO8MebpTeMTS+1KRTKoaNOmy55PeA1XdokIxjy9HXU1BQuOl7/795+bnQ9NmLXCgwY1xxdftOI0bFgrKEQnjDRsWFaIenpGj60QTETMwYPnY1UarTHDUEFgoLoCw8XF+H1s165TIlm+fL6Cd3R0QNq06ue90R0r6+rqjKFDWmLnzp+wefN4TJs2gLfRwIFNoRC7PIVuZY8WEZBIGFv0t5evmWUnsn7OTur9MzIowZw3t0/Ha94p0ucU+ekcnJCn9RhBuRivEJ364pmjuJBN4aOmE4FGGHfXEBH66q2D4M1hDhw4AO2pK8QHBKgvRM3RIWUkAhIB4wjYGQ+WobFFQLuKI1SzBDQkMFCoDAvVLGuzUzdz8/BOJ2TeapYHi8BI5uV99dMVnU4Hw08jUmlOfnnzxLTBJFJdrJwyzbvBN4Zl5W+fRi7/YznQKTPMsdVfvOjVGi8sylAzwTdM9+FVzA/d9pGfMxmmTQz+NL45RDH8378VvDEmRLOqxye7aiAxlA0OUq8Vwzit38HZRetNtHxs62OL/hYaEsJXeJHRY3KLUpjSqgzOaTY5JhDLt+kJB0fbGBgaMkNgx0lLoGzCS/lFR/a6xH2Lok//CD9tHcj4nCl/Mb7/Sa/fN2Pk1kso3qCtVsTqPK2Ooc+P6g74Bik8U5ml384uemxpz5OYFDk6qd+lk6y3ZjwI/qiuvqI4Lb1+ZB0DvFanufyjRy/NFUWePJnNlk3KgnSLev48+vHbVP2CglRjhikZCnd2diQnCtEGo5Q/RZABwtvbk1jQMbns8Ybz9EnRvXvPOG/4Q/J0nG7jJuXhyIwjhvHG/Pb26uTfWHxChdmivz3QwOboaF5b2br+9NIj+EPs+ltsy+aSRn2RaIkOKqs58m4p1OeWJy8TZ/8ypx5SRiKQ3BCI/kknudU2CdVHpzM9UOrs9OPCwwyWyQlDCqCL4WEWFvyjU1sC/SPe2utYETr8/BfoW39TKrQGGcMHYlNpEnN4GMJF8WgzV/p0xxzaOfM7kS65MTrlCZVVTKdjnYK55vzRsmZz5D5lmbB46G+0J8bGicOxedKXAmodM6xlzFtU+K3F5CxTFbQyTNEXFPAex9YtwOpxffF797qY0aEyp8sJ+FmDUjZLXMJv8ZftQZuRhho5xcnJ1Q2Nv/wZ5dv0skStRbKNvvgR9PmRkujt04d8c1c6+WVm5xocV8L3XTQGdCVtXFw9I340isgwE020TaNevjR/gqUdp/z9A9G160Sz6LPPxtu0DtZWHqp5ZrC27pj0kaHkyRPV+FSvXhmepGbNYtyln4sX/yPHKNHqDa0RhU5Z+fXXNRg8eBY6dPifoPAw9f5tVFEiCLRFf7v7WH0+dGD3aAcH8+/TtoIkPET9pMlWeRjqDQ9XcXh74wTOTutiFl1eYt4KRzdXdbXMo6dyamWIv/RLBBIKgU/zakwotGPIV/vtc8q06kaehsnSZFbfooeziSYtS9fKvHygrvjQfg6jlbGUP7N1BT+1ZcnwzmBZ8uT05rLTL+rSbR6o+Xl295rw0eTJt1Bp4U+KTKCf+oBs7+CAF/dumkX0Fj0p1NeB1cmQYiq39tMbF82yeGPpHJxdRfDzO2rfEIGS0UMgPvsb7aWgXY2WuaC6dFevUHHwVG4/UKT+8Po5JjUthp0zvgNtsPzsv2t49fg+Jzcj+w6JhFZigsxcFuxg5qohOoFpweBWmFA3L18ls/fPyXj1SH9yVqOHakwyVQ2dTgfDazCmlRekq2B19TSUG4f3YFq7iiBjLJ388vLBbSjYutj4E8Ln99SjIZ1SmP58g/ZmoXKbS4aYkN/ctIZyyv3LMNyY/+pVdUWkk5MDaFWBOfTyZcQLAWM64xIWEqJO1kwZi7y9U8YliwRJe/iw+plUxQoFeRkKFszGXfrZseMEOVEobdqUyJBB/fyXDBx0ysqWLUdx4cJtPH78itP79x9h+IIoijIrBMS1fWzR327cDUWIptNXK2XZZxVWgCXOKsJDrpRvFAAAEABJREFUgs3SYR/NCSkBL9RVZHZOrvj49qlZZGzDUsPCeLnbwdVJ/XTl72PqdWooK/0SAYlA/CJgp81O8gmLwNun6kNVqkxZTRYmY371TUfwxw9R5GijUCUwlcFmcUq4pe7FPRt5kodXzuD42vmcp5/MBYqjQts+xEahG0f3CaMIRVbrNowcq1CoxjrvFg8TIyr022ePyeGURvN5EA9IRD/2sfjsoGTJkti0aVMUypjRtMGNqvxUY7BwdfOATmdHwVHI09sHOp36JunxjYtRZGwREOSvXh/2Dk62yMJmOuO7v4Vq3rLZW7AvjLn9zTtbLoHVoWWzERqiPhiKCMakyqR+p8+8Zv9Z8olXsObzKCeXFCbzcHA2HWcqkd+rZzi0ZAZmdKyG3b9PEGL2js4xHun6559/RrkGp06dKnQYY+zs7OHkqu44uP5n4+OsPTNkOrqocrDBv+e3VQMmlUlnYjzwyaluDBhTMYYOHRoFkzVr1sSUzCrxFy+qLw0cHOzh7OwEa/9zdLQ3W2VoqDqBMmXQyJTJ22x9iUVQu/9GjpwZQHucEFH5aCXG/v3niI1CZcrkF2H+/h9BBg4RoGGKFMmu8ZnHfvyorjpIkcLFrERxbR9b9bd7j9VNnWuWVfuQWZUyIkRjjpFgmwWFhaqGDvtoxrBoDR1P1WvZySutVctap6L63BMQ5ICHzzSfp5uRU5kyZTB48GA98vLyMiOlFJEIWAeB5KxFvTqTcy2TSN2e3L4qSpqaTaTdNSeyiAjGaJd/v38ddUPB26fVHeWdXN2svmR656zxePlQvWnU7D0SaTUnxrAi8r+Ad29w48huztNP1mLl4JE6HbFxpqD374SOTIVKCd6WzKOr6mZtuctWh0sKd1tmZ5HuUM3EzdtXnVCaq8TJKXYP8I+uqg+gtGqnVJP2RrOs3l19mx3O3i5R3zAqaOXA5/9dFxppounsavnEVSiIZ8Ya/Y3270mVPuZ9BuhYUCdXD1HDO2eOCN4YE5v+pv2MLsDP+I7ytOrLM5rVbIZl0RqD3FKpb3YN5Qz9L+6qKw+oXzg46e81QfKFazeHxjZHQRbTkVVzmbE3XKTzyuAreGOMAzNGGAuPLszeUf/aDfpg/JhNOq44rvWJrhwU91izgalOp0PJxu0oOAoVqKauQIkSaRDgFMuxyUBNrLy0IkA7eR0ypEWs9BgmCgpSjXymTiMxTEN+7Wc32bOnp6AoVKaM6f2PoggnkoAHD57D3z9ijwPaZ6N797qiZPfuP9e7hkQEY7RGIi2mLErvr2dP8/ubkvDOnScKC1o5IjzRMHFtH1v1tyNnI/Y9oaKXLvSBHIsp2E/9vMjBQzWcWKwoFgk+vlHbws7RBXb2UVelpMpdho3XOpPa391TX644p/SBZ5aCJmUtjahZVr2er96x3IhSo0YN1K1bV48qV65saTGkvPURkBqTAQLS0JGIGvHY6vkI1Viu237/R5TSFa/fBl4+6sTl36Wzosjcv3gSz+/dFOHVew5HtqJlhV/L5KlQCz1nbdIGmcUvGtxWlFWn06Hr1JUwZuXf+uvX7CElQqVOp8PAJfuRRvPpTUQM4ODohFZjpmPQsoNKULTu22fqja8Gm0QbyztaBbGI3DX7B4REvvWmSX2HSUtgbIJEqh2dXfmpC63HzSavzenDm1cij/Jtegve1szbZ4+gXaJfrcdw0KRZmy8ZwQrVbiaCbh3bL3hbM2F0JG2kEYh1P9Qfor5ht3XecdVvjf6WtUgZfL7sELs+Vxu97sD+0bXXY9YG9pDIPJF/D69EPS4yMoo7selvfk/VFVGlm3bherQ/bl6p0eZ7y66Xp7fVJe8pfbLAM63xyZ82H+KDAwPYuBRhgKB+UbPnVxQsiIyY9fqPFX5TTF0mQ2OyqXgaX3U69eGbPiMxJRvbcKqLMi6Rjkod+pOjR2RAKt2ko16YLTyBH/zw+Lo6oajGxmbCUpsX7VXi6uGlDUrU/KZNh0X56tQuibJl8wu/IVO4cHZMnz4QhQpFv4Lg7dv3ImmbNlUFHxPz5IlqICxfPj8cHR30ktBRqqlSeeiFJRWPdjVD40blRbEPHFCN6SIwkjl37lYkB6RM6Y7cuTMJv8K0aVMNWbNa/oLlyhX1UwfCtGLFgopKk6412scW/W32KnUMyuX7AilcVb/JyhhE+D+/L0JS+OSAo1tK4bc1E0bPXexeTvnodDpkKKdvcLR3dEa2BgMo2iR9eHILfvfV+0Xu1qPh5G7aOJ4mXwUU6PijSX3aiColnwvvwo3mrf4RCZIkIwstEUg6CNglnaIm/5LSA+v5HWtFRTMVLIEBi/ehUvv+KNOiG9qO/wONh08U8QFvX+HM9lXCr2VWjenNHuQjQhwcnNDp15Vo/9NCVGjbGwWrNUDtvqPR6/ct+OyHeUiXw/I3QLQ8e/MkdXLgmjI1jBlmSO7C3+sjCsJ+aV+P/gt28bzrDfgGNFHoOn0NRmy5gAI1msDZzYNJxfy3b76KQ0qfTPhq8zl0nboaHScu4VTByOc0ZVv1QA02odGSq4enyKxw9aZR4lOmyyjiqX32zZsk/JnyF8PwDWfQcOgEFKvXCoWqN0Kdvl+D6jNy22V+6kLmAsWFvC2Z/zRv4HOWroJByw+hNTOyUNmICGtb5b9tyhihmo6vHMzypv5VslE7NGSGhd7ztsHePmLH/XA2t9w8eYSQjw+GNtFV8inC3tIPWXkYnSYv4/2E+ksOhpcST66js2uUfkB9hj1fUTQn8mupaufBRg19XDiWP9bsb75FSmPAor0YxAyJHX78C/QZWbUuQ9Dmu98xYtslpM6YDcq/K/9sY2NH9MubY9Pfbp06oGQBunaGrTmOugO/Rf4q9VHv83EYsvIIUnhZtuz+waUzCA+NeJtG7TOYGXU6/7IcTb+aBOr3RLkM2heR/55oPp+iseGzH+aidNOOvExDVh8FjWmRoiadvJXq8DF59I5roPGZxuqcZaqCsKXxte34uSItbRBqq5VMr+6pK+yqdv2CH99LY2DRui3R6psZ6DJtNcg4KwpjQ2bbNNVARCfADGR9jvob3cMI49psjLRh9lZXPWPGRvj7f+R6dXY6/PhjD/z220B07FgbNPlt1aoKRo9uj7Vrv+XHmhYqlA2pUrlzeVM/Z86oE/TSpfNi2bLRGDeuC4YObcVpwICmRpOuXXtAhJORY82ab9GlS21QGX75pS8/SlUIJDFm27ZjosSEs+LRTvyVMMWlVRchIRGfCejY3H3WrMGYMqUf6tYthZYtq2DmzEHo27eRIm6RS3uxPH6srmL4/vtuWLDgK0ya1FuQh0cKPZ3WaB9b9Lf7T0Jw+1HEaUw6dg/u3dJer9zmePyf/6cZa3UoMWQpcrccjaw1uyNLtc6cPDLlM0dVrGTe3lENXllYnjkaD0GaAlWQuVI7FB+8CLRKIybFt9b9zO5tDAAm6MiMHCWGLEL2+gOQtnANeGYtjPSlGyFX46EoPXI9crf5Bh7ZizHJ6P8qlXBACueI1UgBQQ5Yv1f9zCb6lDJWIiARiA8EpKEjPlC2II8dM77Dm6cPRIo0mbLzSVc9NiHIW7EOlH+08mPt/4Yo3iguvTncMeMbzY0JyMUewGv1GY2W38xCefbWP0OeQlHSWRJwftd63Dz+j0iSu0JNFKnTXPgVZsOPQ3FwyQzFC3rgprzLtOwOmmD4FioFssgLATMYOtZRO9lycnUHTeZylKoEooLM6GCohjYDpImIliidIpezbDVuVNLGl2UGJiWeXFqKfnnvJmI5keGmZOMOaPLVZLQYOwPl2vQC1Uen0/H4+PrZziYXNDFW8qNVPzSBpLIRlW7RXYmyunv71CFc1pyUQZiWZ/2r4bAf+SkbipGDMj64aBrI+EV8fNH26d8gwO+NyM4zbUZkL1GB9xPqK9ReIpIxrp4po/QD6hMsSvyRX0tVuw5FumiOzBUJLWTi2t90Ov1+SJsTUz+v0mkQqjBDR77K9WBv7yhK9eH1c6z5fqDwm2Ji09/+nvMT/N+on9q5p06Hsuz6IoNcmeZd+RhAhrCHMawm0ZaJ+vzhVaoxgcaWbMXLo2i91qB+T1SoVjNtEsHvnPG94InJU6E26g/+gZeJ+vDH9+8QGHnKFMVHR7Syi8ZnMn51+Gkhx5bGOJ0uAn8yxqwc0ys6FXGKWzmmh3iApyzT+uZCrT6j0HTELyhQrRFfrRMU8AG2PnWFKvHwyhmc372eWE5k7KD+RvcwwpgCtRvfkj8xUzjrlMOH/yGMHVTWggWzgT6vGD++G/r3b4JatUow44YHRZlF06atQ2CgOiFKnz41qlQpjMaNy3GilRnGFNHE/u7dZyLKw8OVGTrq8jIUL56Lh1++fJe7Se3n4MGLCDc4GeXduw+IaWPXKVPUl0P29nYoWjQnRoz4DAMGNEH+/L4chtu3n0D7CRIPNONnwoRlIh1dV7QypGTJPFDI3V3/7b012scW/Y2qOmOZFzmcPqun3g95gBk/tKri3p75QpLG2jQFqyBDxTbIVKU9pzQFjH9uIRLFgbn/t5o3qUlXvB5ytxqNzDW6wCFFSgR/eIUQf3XDeJIxpI9vn+LWembsiDSOw84ePqUbI2fzr1CgyyRkqz8Q3sXrwt7J1TCpSf/AzwJF3KZ9GQVvCePh4RFF/OPHCONqlAgZIBGQCFiEgDR0WASXceHQIPWBJSxY5UM1O0WHBKmDVkjkUnrSFhIYQI4genCf3q4Szu1YDfZ8JcK1zOvH9zC9bUXcPqG+3dHGK/yJ9YswrV1FvPhP/R5diVPcgPdvcWDJb4pXz9XmH/RRv5yKID1g04RA8dOKEzt281D8irvvz8lYProbaBWKVq8STy7FHV4xh1izaNEX7XBg4TQ+eaKHA22i0KAgrZfz4ZFLH7knDj9rfhiExcPawf+duozYUB1NbGiPhd2zfzCMgraPGLZ/FGEzA0KCgzCpSVFuUKI2jYpxxFsMU+pCTGwMaUreMHzN9wOw5deR7KFQ7f9aGZpkEWb7F07RBgteewoGYScirMCEsOvt15alcO3fXXziaohNSKB6bVohO67CmvWJS3/77/RhHFn1B2g1AS+YiR/69OHw8t8xpXU5Nu5Ev5qDVMSmv4WHh2FOzwZ4eEV9M0e6FAr+6I8VX3fHAzZRFmGs7RTelLtn7s9YPa4v3jy5D2prw/YNNjF23bt4ApsmfsnqG/Xa+PD6BStrPb1r1Vj+F/du5uOPsTgljD7l+KNPYzy5pS6bVuIM3dBYHvP5+skDLBzcBlRuQ53kf//qGWZ1qYHAAH/ycgoy1u/DIlbHcIE4/JBxm06eCTdsDKbT7+VTLP6yA+Mi/sJjGJdji0mE9qi/Hz8aH6OiSqoh9BlDkybf4J9/zrP+ooYbcm/ffgCdEHLu3G3DKD1/cHAImjQZiyVL/oafX0BUnUZwUxT07z8NNHFX/IpLE/kNG/41uSGnImfMDTMwMBiT0YZ91GzUGeK8jeoAABAASURBVKI5CUYrYylPfeW/u0/1kp3RrHzRi9B4tm8/junTN4Aw1QRzlmC8dOk/9Or1C8NYvc6Dg8N4fEw/ZDTq1OlH3Lz5SM8wpaQL0jz7KWEWtI+SJIpr7f5GGaz9OxhvP6QgFhm836BCMdXAzQPN+Hl8dD2uLhoB+gwkNIj6rYopJQ8NVif95DdF4exeYCrOVPj7p7dwfeV3gJHx4uObx7jw+wCEBsd8L39xcT9OT+mI95o9OwzzDGcdx//xLdzb+bthlJ4/bSo7lCsa8UlmCEvzv/l60WZ7cuXKpScbGBiIv//+Wy9MeiQCEoHYISANHbHDTS/V773q4fsa2Th99Fe/vZ3btxEPozjtW+yFQ9uK8OeaTfG0SjdOHI4fauXA/AHNsX/BLzjK3lquHNsLPzcsgN86VDH7rfi7F08xq3ttpisn/hzYAnvnTeTGge3TxmBu74Z8cnxIs9pCW4b/1csryvnwqvFv9kPZBHlikyJCbkLt3AgzciMivTeO7sOk5iVYWXJgEcPg7zk/giZX9AnM7G61edy/y2fDkn80cZ7cohTG18wuykB4/zmoZRQ1PzUspCdDcjHRLs2pCVqFd84eweRmxfFj/fxYOrILCFcq+7apX2PBoFb4oU4ezGNv+i7u2wLDfzM6VxfluLBnE4z9o+M+lbJNaVPOmEiUsBBm7CCDEhk8xteM6I+KjvEMnygJNAEnTpxAgwYNotCjR480UtGzp7esALX/jE5Vsf23b3Biw0I+kZzSqgx+algQhJkpDTTpVMr6S8vSpsR4H1Hkrh7aZVLOMIL66cqxvfFzo8Ksr+hjc2jZLD3xd8+fiPZR8jLHfaKZyFq7PoRdbPobjUe7f/8fN3hObFQIS4Z35G1zYOFUUH/d8NNQ/N69Ln6smw9/z/3J5LWrB1CkJzb9jcbB+QOagvrI1l9H8T5C7uTmxfFjgwK4cXQvP3JWwZuMmZHZRetcObAD09tXBo1Z4w36/tYpX5tMS9fZxEYFuaGExtkd08fi58aF8QszjNH+MzReKWUx1t/ouqfxh7BdPa4vyOhyctMSPsauHtcPU9uUBd0Hnt6+YrIM2oiuXbtGuQYHDRqkFTHJU5+jctM94+85/8Px9X/xehEmv7JrkO4Fs7vWEn372JqoT+Xja+cS8aYyWs6MUQomZIQzJUf3lR9q5cRfzABD4/xuNpaSwXFK67K4f/GkyIfGZVM6KHzy5MlRMGnWrBlFmU39+09HjRpfclq4cKfZ6bSCYWFh+O67RahZ80t07vwzaCXB4sW78eefO/HttwvRuvV3aN78W0ycuBK0EkGb1hhPE/M//9yBpk3Hcp1K+citWWu4sSQ8LCAgED17TkaPHpPx++9bMH/+Ngwc+Btq1/6KTfjXc0ML6SBq02Y8T2Psh/aTIBmievVGGhMxGXbhwh2OJaVt1eo7k3KEB8kQHTp00aScEkF1qlEjop0oDeGtxEXnbthwCI0bj8XIkfNAbbJy5X4MHjyT4/r55zO4kaNOnRGizOa0j5If4dS796+oX3+USE9lIzK22sRa7WPt/kb1GTXNhxxOPw7y466lP2/+O4cLfwzAiZ+a49j4+jj6fT1B9/cvMqku6P1LIUdpTQpGE/Hq2hGeLxlb7mydjptrf8Txn5rh7PRuCPrwGmemdRF5vLt73qSmYP83uPjXl6z8DXB+dh/c3jwVd3fMxu0Nk3Bp/hCc/LEpzs8dgMfHN5rUQRE/DQ0FfQpE/OJNWfHmXRixFpG7uzsMV3SsXLmS91mLFElhiYBEwCgC0tBhFJbEERjOrN4P2dvNA4t/wy72kHjt3916b+QsKSUZHx5cPg2a1JFx4MTGJXh885IlKqwmS/X679wxHF45h0+uaJ8RUwYfq2VqI0XBgQG4dfwfjmvEJGcpf4inOtooy0Sv9tXDuzixfhG2T/8WNJGkyW2iL3QSKWBc+hsZPW6fOsTbZv/CqaD+en7Xejz77xp7qLL8AS0ukFEfObVlOe8j5Pq/Nb06Ki75mJM2MMAfZCihcfb4hsWgDTXNSaeVIWxJBxmPtk0dAxpjrxzYDjIuaOXig3/I7hmHV/6BHb+N4/WiVS7xka+xPGgcvHfhOB/njzBjvbFTwoylS+xhdErI5s1HsGDBTixZshsHD16I8ROLONfJQAF9JrFq1X4sXboXl5Po5yoGVYqTl1ZXHD9+lbfJnDlbQMaYOCmMY2Jrto+1+tvWA8Fir45sGV+gUgmHONYy/pOHhgSBjC1PT23Di0v/IEyzWtrS0tD45P/8Lp6d2cGNGs/O74Hfw6ugPGLSlS61HWqWfcjF/AOdMX6O/uoWHmHGT82aNfWkAgICsGLFCr0w6ZEISARij4A0dMQeO5lSIiARkAhIBCQCEoEEREBmLRGQCJiPQO/vPLF4S1ZOdrTxiPlJpaQGgdBQHZZsjsCx13cZEGrh51+KqvLlyyssdxcvXsxd+SMRkAhYBwFp6LAOjlKLREAiIBGQCEgEEgsCshwSAYmARCAKAjfuhmLMjAg6cMry/WqiKPxEA16+jcCQsDx0OiTWKPj6+oq079+/x4YNG4RfMhIBiUDcEZCGjrhjKDVIBCQCEgGJQJJAQBZSIiARkAhIBCQCiQOBjh07olmzZpw+++yzxFEoWQqJQDJCQBo6klFjyqpIBCQCEoFYISATSQQkAhIBiYBEQCIQrwiEhYUhKCiIE/HxmrnMTCLwCSAgDR2fQCPLKkoEJAKxQ0CmkghIBCQCEgGJgERAIiARkAhIBJIeAtLQkfTaTJZYIpDQCMj8JQISAYmAREAiIBGQCEgEJAISAYlAokVAGjoSbdPIgiU9BGSJJQISAYmAREAiIBGQCEgEJAISAYmARCChEZCGjoRugU8hf1lHiYBEQCIgEZAISAQkAhIBiYBEQCIgEZAIxBMC0tART0Aby0aGSQQkAhIBiYBEQCIgEZAISAQkAhIBiYBEQCJgXQQSo6HDujWU2iQCEgGJgERAIiARkAhIBCQCEgGJgERAIiARSIwI2KRM0tBhE1ilUomAREAiIBGQCEgEJAISAYmAREAiIBGQCMQWAZkuLghIQ0dc0JNpJQISAYmAREAiIBGQCEgEJAISAYmARCD+EJA5SQTMQEAaOswASYpIBCQCEgGJgERAIiARkAhIBCQCEoHEjIAsm0RAIqAiIA0dKhaSkwhIBCQCEgGJgERAIiARkAhIBJIXArI2EgGJwCeIgDR0fIKNLqssEZAISAQkAhIBiYBEQCLwqSMg6y8RkAhIBJIvAtLQkXzbVtZMIiARkAhIBCQCEgGJgETAUgSkvERAIiARkAgkeQSkoSPJN6GsgERAIiARkAhIBCQCEgHbIyBzkAhIBCQCEgGJQFJBQBo6kkpLyXJKBCQCEgGJgERAIpAYEZBlsjIC88cB22YFY8mPoVbWLNVJBCQCEoH4Q6BLY0c+ltF4ViyfQ/xlLHPiCEhDB4dB/hhDIFvRsihUvREnlxTuxkTiJczewQEV2vYxSXZ29rEuR8p0GeFbqDSnhKxjrCsgEyYpBJzdPHhfoz5HfS9JFf4TLGym/MX5+EfjII1DnyAEcayyTG5NBDJl8kbbttWNUu3aJa2ZVYLq6tjQAbXKPUDBHE/h6hxucVkKZk6Hsjkzc8qeLpXF6U0l8PVOieJZM3Cyt9OZEosSnt7LA1SObGm9osTJgOSBgJebC29jamdnx+Q3maVrivp+vozeyaPBLKxFyhQufDxRxhVHB/PnHZf/C+djGY1ns75+a2HOUjyuCNjFVYFMn3wR6DBxEVqMncEpQ57CVqmoeypvFG/QFi3H/oaBi/bh86UH0HXqajQcMgGmJn6Orm6o1WeUSXJ0do512bpOX4Ou01dzylu5bqz1yIQSAXMQqD/oe97XqM81GDTenCRSJgER6Dp1BR//aBx0T53OeiWRmhI9At7enujSpS6njh1rmVXeypULc3lKZwvDQ8WKhdCnT0OjNHhwc7PKmNiFyIDwde/HophfTLb8/j6uVXWMalaFU/dqJYSuuDIT29fFt0w3kYer+eWa3b0RpnSqj6mdG8S1CDJ9IkVgfOuavI2pnYtk8UmkpYxdsdJ6umFC21q8749tWT12SpJ4qrpFcvLxRBlXUru5ml2jExdCcON+hIEoU9rXaFPXwey0UjDuCNjFXYXUIBEwD4Emwydi2NqTaPzlzyhYvTFSZ86OVBl84VukNEo26YDBKw6j8y/LoyoLjZ+lq+HhYVHzTiIhn/0wF92nr0WXKSsh3zwnjUYLR9Ltb7ZCODHrTcrjQ2xw7dmzPn77bSCnAgWy4lP7V7hwDma0qM2pe/d6yJs3S4wQjBjxGZfv0qU2mjQpH6O8pQL+/h8tTZLk5L/pa48UzoG83EfOZ8B/j+J4/7d8QQjPO6afcBvpjSlfGW8dBMgYMZoZw4iq5s9uHaWRWpJb19DpdJE1iz/Hlu1jjVpY2sZfTfEQ2Y7rrxpyRaBkbIaANHTYDFqpWEHA2TUF+s7biWL12yhBJl2fXPmjxH30f49JzYphSqsygsLlU4YeTjnLVkPmQiWRtWhZuLh76sVJT5JHQFZAIhDvCJQvXxAFC2bjVLRoznjPP6Ez/Oef8wgPUx9n69cvHW2R0qZNiRQp1Lf8u3efjlY+NpFbthxFy5bfoXXrCPr224WxUZOo07St90CUb9zvKp4iUDISASsgkCtDGpTJmZlThTwxGzGtkKVUYQECya19Tl8OxuMXEZ+uuTFDrlzVYUFniKOoNHTEEUCZPGYEeszciHQ58grBN08fYNesHzDtswqY2rYctvw6Eg+vnBXxxpiAd2/g9+qZIITF8S1PZCanNy/FpX2bcXnvJtw+cTAyVDpJA4GkV8qrB7fz/kZ97ti6BUmvArLEEoFPBIGwsDDcf/Bc1LZkSfUeJgI1TP36ZYWP7PA7d54Ufmsyr1/74eXLCHr9+r01VSe4rpa1HOHqFMLL8crPFVdvR/A8IAn/rD95BVvOXMfywxeScC1k0aNDYPPpq7yNN5++hmuPXkQnKuM+UQRW7kwpaj6gbfIau0XFEiEjDR2JsFGSU5EyFygB72y5RZXIoPFb+yo4umYe3j57hHfPn+D0lhWYP6AZlgzviLtnjwrZ+GAOLp2JteM/x5ofBuH962Ryc4oP4GQesULg6qFdvL9Rn7tz+nCsdMhEEgGJQPwgcODAeZFRxgypodPphN+QqVChgAh69uw1AgODhF8y5iEwsP0bIbhpX/LZ52DRgbOYt/ckVh6Rhg7RwMmM2XX+Fm/j+ftOwe9jxKdXyayKsjpxRGDOmjCER95CsmV8Ad8M5m9oGsesP+nkdp907a1UeTev1EidIQsnOzt75KtUB81GTEaZZp1An21QNg6OTihatyWajZqCMi26wcVDtexRvDFydHZFngq1UG/AN2j61SS+iadn2vTGRGMMo9Me8lasjdp9R6P519NQtfNg5CpdJcZ0MQmQXqU37AJbAAAQAElEQVTuxsrWaNiPQkVQwAdu0Ag3sRfG7VOHsOrbvkLe2gzpo/0rqE2MkU5nRyIWkbdvLpRt2R3NR09FtW7D+IkaMemhDVkVzBycnHl+1G+ofaida/UaiRwlK0FnojwUrqRXXK4k8scrQ1beF5U4clOl942MtZ1DmFJeRG7smlByypS/OKp3/xKtxkxH3f5jkb9KfSXKpEt1zFKoFKp1GcKxLdeqJ9JmVQ1mJhMaiaB+WZRde42G/Y9fR+Xb9EL6nOqkxEgSvSBqL0pPe8vU+3wcqJ3o2tQTMuGhehAuxoj6oolkoH5BOBJ5evuYEhPh2uswprLFpT4iwzgyNP4VqdOc9YsvePvWHfgt7xcUHpNqKj/hQkQ4kbwl1w/Ja4naKFvRsrxvNhw6IdprT5vO2rxOp0OGDKk5pUsXscSV8qBPItq1q4FRo9ph6NBWaNKkApycHCnKJOl0OhQqlB20V8To0e3RqlUVZM3qY1KeIigfJX9yHR3VDdMM4yieyMHIzvPOzk5IlcqDk2s0Gza6ublyGS8vd8reJGnztrOz43JU/2bNKmLYsFYcF8KH5Hik5id9+lQcTyqrEkz5NmpUDoQLpcuRI4MSFcXdvPmICNPZ6VC2bNRPKxWB7NnVe/PRo1eU4ChupkzeaNy4PPr2bYwxYzqiW7e6KF48N7R4R0lkxQBrtw8VTafTWdzfKJ2WHBx0yJ7ptQiau1b9bEgExgOjY3nk9EmFFmUKoF2FIsidIQ0ojAWb/WdvZwcndm0YI7OVMEE6paVagez4rEJhdK9WAjUK5kDG1B4sxvw/HRPNlT412pQriLblC4N4RP6zZ31aKWNkkJ7j4eKMNO4pODnY2/E4O9bWdAJHp8rF0LRUPovxoY0taU8Mqk/jEnl5eUgnV27mT4ZU7qiSLxtrn8LoUb0kmpXKj4p5fOHGxh5TKihOqQu57i5OQpR4CjMkFyd1DBTCkYy9nc5kGxPmkWIWOVQvwqYba2tqq/K5fUGnfVikJA7C1MbFfNOjY6WiaFIyH3xSulusLQW7N5XKkQmNWNtSG7cuWxC03waFR6fM2u1DeVnj+iE91iL/gHDce5RGqOvWVLBmMXZsXPH29oaWnJzUfmyWkk9QyO4TrLPVq9x12moMXHqQU/+//kab7/9AkbqtUG/QeHyx8SzSZM6BLzecQdMRv6BI7eaoxx7qh6w4DA8Tu/jrdHZoO/4PjNp+BZ/9MA9l2ES6aL3WoInWkJVHMWzNcaQyc+JKeQ9e/i9GbL7AdM5F+Ta9UbhmU1TtOhTtf16EUdsuc+NHbEDJkKcIvlh/iteb6t9n/k7YMUOPoovy1n6ycnn/ViUqwdxBhMXWyxhhhIqwiZe5BaOJ7+hd10HtXZcZogrXaoYqnQaBTtMYw8Ip3pSu7rM2CMwoHRmevt59i7cPtXOFdn3RcdISDFp2EG4ag4Giz8sno0hPuBPZ2zsq0egxc32U+IFLD4h4WzHUtwZGXgedJi3jk/UBi/fx8lTuOBAFajRB2VY90HrcbIzcepEbY4yVhSabY/6+jW7T16BKlyEgjOr0H4N+C3ZjOLuefHLkN5YsSlj+KvV4/6Zrhq69Eo3ag/Ct3fdr9J67jV9HhWs2iZJOCaB8vlx3ErSBLqWn04LKNO/K24muTTKcKLKm3JZjpxvta9T/2oybYyoZshQqKdpw8MpjiMl40eO3dUK+2ahfjeq1Rn2MKrYgsELbPqDx66uN59Bs5BRU7vg5b9+yzPhL/YLCv1h7Eqkzmd78Mq7Xj7a4+ZhRevSua+g8ZSXvmyUbd+DXHl3DucvV0IranPfx8cLSpaM5LVkyiuf37bedsWLFWPTq1QB0ikfjxuUwZEgLbN06AXXrloKxf2QM+fvvSZg+fQAzdNRFrVol0L9/EyxYMBwbN34PUxP7RYtG8ryVMmTO7C3UN2NGBSVc65YsmUfIKMzgwS2wdu23nL79tpMSHMXdtGk8l1m7dlyUOG2AtlxZs6ZDixaVef0HDWoOMlgQLoQP4fTVV221SVl9vmYUgSkZEhYuHIHNm8eDDCSEC6WbN+8LTJjQDTqdTi8teZ4/fws/P39iOVFenDH4yZ07k56hYsOGfw0kwI0aW7b8gMWLRzKDVUu0aVMVNWoUQ6dOtfHLL32wc+dPmDHj8xiNWFEUWxhg7faJbX8zLHatcg7QRdo2gkId8OCpdT5PNcwnOn+hLD5YNaQtfulYH50rF2OGgUKY1L4uVg/9DPkzp40uqV7cWia/anBbGCM9QSMeMi6MaVYVKwe3AZ3SMqR+eXzGDBQ08RxUrxxmdWuM9cPaoSWbQBpJrhdE9aGyT+5QD+0rFuWGAeLXsPLlSZ8GC/u3FGWk41H1EjPPD21qYn6fZpxKZs8EMipQ3egEjpbMENStagmOz5QuDaM1MjBVyMGMR0sGtsLcXk0xtEF5PpEmfVQe0kn1I7noKEsaT0zqUBezuzfBsIYVWPsUBhlLulYtjuGNK2Ep0z+7RyMYO971Cyav1IXcFqULiKzIcENhhtSOGbqEkAEzvWsjgZ1hO5diE30D8Wi9VPe1rE2pXoRNU2ZkaFehMEY0qYSF/Vrghza1QEaQaJXEMZIMe/9n7zwAoyi6OP4uDUIIBAih9957700QUDqIIIhKEZD2oahgBUQBpQgogiLSEQQB6dIRpCO9907oJIQUvvlvMrN7l7vLXXIXEvIgc9Pbb2ZnZ97Ozi4a8Bp93q4+tRV96y0hbJn6zqs0o1crSufrE2fqDUsWILCf+147GtaqDr0jBFCoVychNPlS9CO4I71M/mmspuWq9nHl9WO1oAl03H/cT6VQo5xzr68UKlSIfvvtNzP11VdfqfTYYJ2Ah3Vndo0vgYw5zU9v9vLyoT6/bSAfX71zI23Ymw0aCaOZSp0mrVgI/EtFarxk5m60pBUCkr6zNmi7PYzuluaaYnHZe+YGSp8lh6WXsnunTkOVWnZVdkcNuUtWoncm/0GoH+KE3r9Dk9+oS1GGszPyla8GL6U2zfhWmZ+XwcMgiLEsg62dJpbhOgkBUQshtJJ1t/Q3eXoR/PGVGUs/S3vV9t01wZOVObbWbm//sMwySrKxd/luPmXKYX49yML7+KYV9csprZqeNkOg9uUdLDat8UAgX/8AIaRYpTGD3ZZCG7X7/EdC/7YVBtdR1XY9rHrX6tRHyydNgL7YI4t/EJz0/W2jWCDZHkY9vbwtYunWZ3a+unJu3z8U/iR6gQUWVdp00yNamLBbJJNht8vuJb9ahCByVX1iJeykQ/lmrxG424vmJ/pBn1//jrONkUZCrh/s7IFQ2igkRJpQuIZfG/kzeXqngvW5qM6dG1GdOqVF/4qdvaenB2HHhtEnQwZ/IRQZShCGmExGH93sLyaZ06b9jxo0KKc7JsD0DIdRxDO+rTLaS65IkVzUp08LQv0twyE9fCnF0l3af/ppIOXKlVlazfRq1UrQ+++bC0lkgH37TksjlS5tfTxr0qSSChMaGkYXLtxQdmlAW6ZJk1parer4us2iRZ9S7txBVv0T0xE87eXn6v7WrJZ+Hsel6+nsZe0WP+yWwMLe29MzVvpe4kkqFpupvb1i+bnaIZO/L1UskINSednOy2Qy0RtiAYlPmnp6WL//YGcA6oOyW5YRbl91bERpDTsg4rqUW1UqpgkVTKbYg0vewPT0VYeGltkoe6NSBelbIWwx5qc8hcFkMmk7Vj5vY/vTpXjiP0akUUgIaEQUm3/ZAtK5bBdEVDQUq3l5ecTmIAPGyOuk1aaORfl4ISSCUMFTMLAVsGSuIIKgyZZ/Qt37CwEaBHvW0sng50ujXmtkzcvMrXGZggT2Zo4WFuwQgbCjQr7sFj7xs1prH1ddP/ErUdyxNuzWx5d8Oe/HHSGOELyjIw5Awtv6CCk8+C9+BEIf3af5w96hK0fMT1zHomXukC60ZeYElXCuUvrkSDo26f8l+WXQJ2PXTx2h5WOH0O+fv0sHV/9Octw1YTH9oW3BQRbx1Lv+W4PVJBnxDq1fSn9+8z/6VTwp2DB9NF08HL/D0vBaRdcJCwllQLkf3blJ33eqTSH378KqVOa8+tO+iIin9OB27MmfCpxIhpUThhEELlJFhoc5lXPdrgOogOGVH9R9zZThNKNfW1ol0sZBqzJBfGUGr19IuzU9c+6CmvOJbWto6dcDafXETwhpao7iJyBLTsI5J8Ko/h7euUUrxw81U8YFx/qpo8z8EHbBJ++o+IlhyJy/qCh39GLqwa2rdHTTCtoya6Kmhz7U38M2lqXDiJ8pfZB+A8Q1tGz04Oj++stYCg8L1YKbTESvfjCavHxSaXbLn9pvvGfWRoi3a/EvtOCT7jTv4260fd4PdP/GFctoyp61QHGq9/b76tqJFH1k29wpNEs8cfljeF+CEEIGhmCzUc/op+/SzahvmT3JrL/du37J6G3XfGrnRuVftml7ZbY0YJcMmMD9aehjOn/wXxiVcmV9VKIJNDwNfUT/rfuDVk/6Qrt2cD4PGKOtkDTGlleGjBFtYP8WFZ/rB+ljh0zD7kNg1BTaGP1zthijt87+njBemUyio2m+if/j5eWpvdKAnEPFwnnXruM0e/Z6WrVqF12+fBvOsRR2JQQFZVDuR49eoNGjF1D//lPol19WU1hYuOaHamHng4+PuRAOYceNW0xS3bnzUAuPn3/+OaLcpf/YsQtp9+4T8E409f7g9qJPEEVGRtGhQ+do0aIttGTJNkJdcY+zV5A8ebJo8RD+iy9+o5kz14h21ncNNGxYjjysLBr/+ku/njKJJ8qW3JBnpUpFoWnqyJHzmm7rB+d3YMcHePfqNZ4++WQG/f33fnoW84WXtGl96dNPu9iKnmTcE9rfLCtSLH/0+A73Y2fTQIu3uh/yhJ6ER2jqYvD9ONPxFtdb75cqq3CIO23DHvpgzhqavnEvhUVEkL2FqIoYYxi3cgf9sG63UjHOTmm4px84f41+3rSXPl34N/Wd8RcN/2MT7T17VaVTKncWetXKIbl4BaFvY70+4ZGRNGPzPq0+KNfjp+EEYYdKyAFD0eyBWqg1h07TiCWbaeyK7XTt3gPNDT95MgcQFMxGhd0VPRtWFNdt9HgaERVFM7fsp48WrKPxq3bQlTt6GmXzZtNeQTHGl+Ye9SuQFDRFiot93j+HqN/Mv6j7tD/pi0UbtYNe0e4yvKU+e/tBGrN8m1LbT1xQQc7fvKvcjWH+2HVUhbE0TF7zr2pfMEWfsQwTlx27dSAkkuHO375PU//eTYPnrKYvF2/SznR55Oazfgply0T1SuSXRaArdx/Sd3/9o7UPDtGFh7enJzSH1P3QJ/Tn3uNaGgN+W0nvz12j9WH0OSSAfvfBqzUpujfAJVq5un0Scv1El8j89+GTp9p4gnZGXUJj7qfmoeK2bd4VqQL5eEZQQFr7cxwVmA3xJsCE443OesTdi2fQyX/W08/vtRaTqnAVaN+KeXR69xbaNHMcAeOGEwAAEABJREFUQegBj9RpA6AplTpNWipV/1VlP7NnK/3UsxntX7mAjm1ZRX+Ofp8WfdFL+fumTU+VWnRWdqOh/XB9WzwWD9N6NKUlXw2gg2sW08VDuwiLil/F4hzCl1vnTxqj2jXjzJBOo2eRyRQ9TN0XC8bvO9UhfALWMmJGw9P8iCdPLL2fi/3YltViwf29Uo/uBjtcDrRPjc59VHgseL9rW5n+XfQzXRJCo91/zqaJHWvS5aP7VZi2n05SZlsGCLIWfNqT/lu7hHYtnUXj2lVVfQRxKrU0n/RGPA2jPcvmmKmoKP1p2ME1v5v5ISz6JNJKLBXTPQTniTS+Q3Va9GVfseD/TtPHtChLEMbcvnhGFSe/EB7lKFZG2SE8wjV0YPWi6P4qBAbj2lSisJCHWhg8aW8xZKxmNv7grIpaXfopp+Ar5wjxVk/+kk5sX0cQHvw97Rua0LEGbfx5DN29fFaFlYa2X0yRRgq5d5vGtq5IG4Rg8NyBHXR44wqaNfh12iAELzJQlXbvUJr0+gJTukO/dvKQYKD3t4uH9sDZIbVtzmQVLmP2vDbP9cHrODLgCTH2SLPUXVkfmWZ89d3LZhOERV83K0lLRw2iXX/M0K4dnM8DxpPEWPIsMkJLHjumKra0Pr5pAWJ+nL1+EK1hzw/J5OkFIyG/qd2b0aYZ39FZMUZv/OVbmibscNcCxPyYTIl7uzSJIfbAgdPUsuVn9OGH0wnCijFjFlKXLl/Txx//QsaDMitWLEJFi+aOKSnR5MnLqG/f72n16t1CIHCWICTBZ0lDxAIQgfAax5Ahr8Go1MaNBwhnUkh1//5j5XfkyAUzP4RZuXIXYTKpAiWCwSSeokIA88Ybo4QAZzJNmbKMvv9+qVbXrl2/ocWLt9osxTMhSOjWbYwWHp+OnTlzHXXv/p0KD+FSlSrFlF0a9uw5YSYQsdwNYzKZKEf2TDI4rVq1W5mNBgg3evYcR6+9NpImTlyitc3Jk5dp+/YjNHLkHBohlAyfP39W7fwSaU9quiv6m2Wd0vmFKaebwY4vrFQkg+Gdn/6k1yYu1BQEFgYvq8ZWFYuphT8W4u/9+hf9tf8knbweTCv2naD3fl1JcDdGFs1utOpmYdp87Byt+e+UUs5cJzfFdYdDSztPXkyfL95Iy/eeoP8u3aDLd+7T3nNXafiSTfTXgZMil+g/vB4QbdJ/W1cqRnJxGimEAv1mrqI/9xzX6oNy9Z2xQhPe6DGI7NWHYv6N+nMr/bB2F+05e4W2CUFB759XkHEh3qCEvmCOiUKv1yhtwXYlLdl9jI5dvkWbjp4jCCvO3Lgjg9PbQqChLAZD4eyZlQ1lAKOLQjBw68Fj2n/hmiYU6PrDH5pQyJrA4+yNu7T95EWlzgjhhkzwhkjD6CfND4WQWYax1NEmYCkVymEZxp4dgqMK+bOrIBAODBCCm1UHTtHp63do3/mrmvCm65Q/aO1/p+neY/fMod+pW0GV4dq9R9RP9P0tx89r7TNz834atXSL8rdnWLHvpCZwQnlnbNpHSOP8rXt06lqw1od7TV+mrqFUXl5Us2ges+Rc1T6uuH7MChZjQbvIMaXT97/H+8DZe4+iYlKM1nJlS9hYF50K/9ojkLgzN3sleUH8zovFkKxKqGGHwzmD+6OYr3vgxuIpLngZvqpYMKnJ9zOiP0a8J72UjoU6Fm/SoWr72Fvv85WtRhmy6ZPeNZO/oOtnjsooZjqEL9N6vWLmZstSsl5z6jB8urghihm4CHTn8jma3KUeQZAirLH+0mXJrtzCHj9U5uRqaPTuMPL09NaK/1Q8OZ/7obkAQvMQP3M/elMtAPwDs9pcoIqghN0bEGTBLNWzZ1F0XCzKpT0gS05pTFb62b3btcWjtUL/s2Cq9qlg6de0/5fSqO2GgvBIOcQYIExbNvqDGBtRwSp1lVkaXuo1lDxj2kjM72jWwNcI8aS/UccXd/C1HaNbvvLVCUIF6TZzYEey1ne3CcHLw+DoHUomk4lKNWwlo7hMxzUb8uCuSq96h57KLA0QsBivdZRL+kFPSvVBedCuEBbBbE09vHOTLh3TPzWdp1Rla8GUW3yvn9IvtVZpnN61hW5fPK3sMNy6cIpO/bsRxuemHj4MpUGDfqTw8GjBj7EgO3ceJeNuCpy7IP2xu2Hx4tiT0xAh5Bg9eoEMRlWqFFHm5GLANd279wS6fl2/LmTZL4uF09Kl26Q1lr5l6yFCGKPHhQs36OZNfYeZrVdGzp27rqLVq6cLZOFYqVIRggAGZghTIESB2VJNnvwnnTp1xdJZ2TduPEChhoVVqVJ5lV9SM8Snv8XV3/zS6P385p3EnZo2K1dYId585DxZLlpv3n9EG4+cU2HcaQh5Gq4tcB/beZI/d9t/qggBVl6HalauiPLfIoQJ1+4+UHYY7j4KFYvnMzA6rLB749/T5jsSxTTVjEtQOr9Y6TUsVUC5bTp6nizLEikEkJPX/avCZPTz1Q4oVQ4xhgx+9l/7igmmCYXCrIyZ0j+p6N3rV1RFuf3wMUE4oBwMhsioKJqybpcmWDI4u8SYxsebisTs1EGCKAPyg1mqf89cppsPHkmrTR3CPQicbAWA0GivYTdSUYPgylac+Li74vqJT77OxInAjSwmQs6sMQbW3EYgce8mbqtG0kn48T1dMo0n77JkIUb3J6HSmfwyRG8HhEOg4T3725dOU+gDfQIGf6n2/jlHGskvQH+SJB3zlNPPxsATcHy+VfrFVy9etzm1GjZJCDmiU7hx5hhNebMhRYQ/jXaw8osdENL5acxrB9KeHPVshUupYoc+vE9lmrSl8s1f01SF5h0JquKrnQgCIePiuFDluiqepeHsXusTcyy0ZNg0GWO3sfRLyvqybwY5XLz0mbOpsA9uX9eYWmPrZzicNVUaf/I0CAqRQNZCJaBp6oIQLj5w8nWpvGWra3HxExkZTrlKVVBlQftKhXZ+fOc2gmkqb5kqmu7qn2ObVqokSzdqqczSUOM1fYdXyL3bZOw3CJPU6oMySWUyeRAOHcWhsZVbdyOpsJNDhvFNl1EarerxvX5wRoxMcPv8H6XRTN86R9/ZY+aRSJaZM9c6nFNQUHoV9tat+9SsWVWlmjevqh3a+cor1Si94RT9NGKB5OWVvJ4mYYeLUTChKu2AAbtbrAW7LZ4KS/fshp0Z0g06Xi2BDmXcOQN7o0YVoGnq4qVbFCUWJprFzg921BQqlIMaNaqgHa6KA1ahIiL0p30ZM+ptaiep5+Lljv7m7aXPix4+xhI68aqW1ld/DfKvgyesZrx833Gr7u52TO3jRfmCMlC1Qrm0L43gayMV8mVXD1NMJhPhVRVjOYz1WbbPen1WHrDubkzHaN515qrRqsyXgx8oc6AVQYefT/TDIQT6c89RaLHU2Rt36X7oE+WeNzD2Dsm7hh0NHWuUosxW8lIJJANDdsPXc2Zt1QVXiVn0HJnSqewixLi1Swg1lIPBsP7QWYMtbiMehWbyT6N9bQX9VSofT08VOZ3hmlOObjDE5/pxQzHMkoyK1MebAH8zL7uWa9eu0fz5883UggX6wwu7kVOwp0cKrrtbqg7Bgkw40iAEMC58jcIBv/T6IjYgay4Zle5fNZecKw9huH7qkPiN/rN22GLWAvr227tXLkYHTOBvBbGAF/dTlcr5gzvFhE5/10x5GAyPDa+F+KbVB1RDkGRlTB+kL8ZxlkTzQV+TVM0GjSKopgNGElRqQ32tncUiK377kvUbyCOx2JdhPO0caCnDJDUdu3wcFTJ4CmEFXkWRdShWp6ni2lwwbmbBVoaDnr1oWWhKGdvo8rH9yt1RQ7aCuqAEO0Oai/ylahZTDuhoY6NQJbPhPBpH83Ik3NY536tg6TJnp3QWn5ot2VAXfhzasFyFlYakVh+UC2f8vPvrevrk77PUd9Zmavf5j9Sk72dKZS9aGsE05enjo+m2fuJz/eATtiYTpmLRqeL1omiT+a9xnDX3SRzbVgcnv15CWOHtHf0aDkpWp05p+t//2iqFL4xADRzYRvvaB8JIZblol+7PX7degv37nXsKbUzlzBnruymMr+gYORrjGs/pwBkaAQFplXfZsvp2/bjarE2bWrR06Re0Zs3XNHXqQProo47Ut28Lpfz9fVW6vr72+74KmMgGLzf1t7CnqVVNMqTXr0/l6CYDnmp7GsaDS4aFuzHLK3f0Bb3R3R1mH8EYX92Y3689zX+vPY1742Ua8mot7Usj+NoIlMmkM0rl5aWKYVmfyzbKff1u3E/pVaLCcNVwZo+wqr+7j3UBlbfFGTcZ0ur9GRGu2EgDfrcfRB++DXO2DLFXf3hVBn5QmdKmoWndW9D0Hi1oUNPqhC9+pBeCW/glB+Uh2s7XWxcAHb1y87kUO0cGfV6OHRe2CnHJgXNuEBfnfXzd8SVa8r/X6eceLQlfW0FflapcvmwIpin0cc3ghh+kHd/rxw3FiZWkl5cu1LulPxuPFc7S4cGDB2T51ZXt22N/4csyXkq3e6R0AK6uv3EXR6Rh+1xEmP7+aVSkQUDgoUs4/QODVHHu37IuPUeA4Ev6FkqTyRTr1YgMOfMhmKbuOXH4oRbBwZ/KrbpR7ji2ld+/cVmlhq/MKEsyNRiFF05VwbBNzTLe4zu3LJ1i2T1jzhKI5ZGEHUINr1zEVUx8pjiuMI76p/LXn4LeOuf8E7gMOfI4mpVZuGd22tgsoJOWB7eu0/2b+lhQveO7KgUI2/wzZVH27XMmK7M0JLX6NBOCwM5jZpM8RFSW05buabJ/i4rP9ZM1f1GVHZot3MZus8iICPXUVEVIJAPKhZ0ZsbKz4lC4cPJ8tc1KVeJ0OndOvxbiDGwR4PbtuBeqPj76gtEY/bFYzAUbFsAvv1xZ8/YRT6uNOy+WLftHc7f8MZlMNHPmEO2LMenS+Vl6W7VbrBmthnkeju7qb49DdEFH1kyGOZKbK5ktgy60wjgeHmE978ioZxSJC9PN5cGCfca7ralDtVKU2tt6f7QsgoeHSTkZdwrYqw/2zMBfRYzDcC9EX5zZCmq5sySXYSENdta+kiHTwus00pzdIEiUbvO2/0enrgdLq6YH+vtR7WJ5qW/jKjRTMJvcrTkZ668FSoI/OTKaC3IsX5VKrCJnz6CXIyQs3Ga2tx4+tuknPSBYGPN6YypqeBVG+lnTjcJFa/7xdUvo9RPffJ2J50H6vObSdX0XnzNpcFjHCei0HY/DIROBgMmk37gsszMZbmrwexZlcaEYBCkmD9c1Mb7aEhZzGCSK1+mbXwlfL0AZrCmjQMbbxhcyrMVLqm5RhKlBdOlwmCte3XFE4YyU6Fgp5/fJQ8fPZLHsv9N6NNNei4qL7aROtbSDLMnWP4MQ0VYQS/eoZ/q1dOXYAYfKgXJO793CMimX2Q+u+l2lVaJuc2Wu+XofZYZA81HM2T/KURiSUn0KVK5D2BkmiqX9PQ19RP/+MYN+/7wX/fhWY0J7Qh3d9Jfm78yPM0zURAwAABAASURBVGEjwm1P6JxJx51hIw1jeFz5RIkFmDEMDrx8883RFJfq1OkrOnxYF5ob00iq5mvXnHj85eJK4Ms3MskaNaJ3fuG8DtwL4f7wYQjZEqb873/tKFcu/TDFGzfu0rRpK7VDZrt0+YbQFlDxfS0H+SeWcld/u/NA386dLVAfh91drwiL68fd+cWV/mdt6pGfEKDJcDjX4Jtl22jQ7FX09tSlSkXaELoYz6cwmWzPI2X67tSdacVnhqJGWakb3N6fs4bwVZQTV2+rgy2N5c+RMR1NfrM5ZUmvC6+M/knFbNl2hqonahEhvHMkQ5PJfgkh3IBgTqZ1P/QJzdl2UDsYttfPy1Wf/ctwiK4M62o9odePq8tjmV6OIE8zp4vXnLlKzKKyxUECrlsFO5ghB7NN4MGt6MMNESJ9Zv0gT9iNKlNOfassJPLG12IQLviyPnk1vg4Dv/iq/X/N177aMvv9LuIpZ3QqeG3mjW/nRlus/N68oL8DavL0otwlY39O10q0JOsU9vC+Khtet8ABho4oPBlWEZOwwcvLiyxVvItrZaJiKy3LVweihODOEa53rsV+vevJg3sqmyx5iyizo4a7hmsHQjxHyoEwltego/k5Em7n79PUNeeXIVA71wLxitd5GZqm9q20+p4muas+lv0Edq0gdn5qvd5X+T6+e4vw9Z01k76gY1tW083zJwjtCeVn5dwhFdEFBpwvJJMxiflbKt800mqme3n7kMkkApi52raAgaWyHdp1PidPXjZLLDIyii5evBmncpfQIPxp3IKkwEB9y7RZ4eOwPHNiXIkjKae9ly3boeIULJhDM9erV1bT8bNv32loVlXduvoBpjt2HKGOHUfSvHkbCMITHJCKtoDCazFWE3ChY0Lbx139bf8xXdBRvIBzr1UkBM/Vu7pQ3mQyEba9W0vP08OD3PUUWuaXPk1qyh+UQVoJAo7hSzbRjlMX6awQjgU/CiGoUHGN2SrLVYtXUvxT61xVwsLg7eXp1Pgmojj9d8VwCCrK6yH42koEh5BKv+v3bbc/vogyZN5aajtuPr37ywqau/0gGV+fMZlM1LtR9I4rmV5S069ZvMIT9JwEM1cN7ZM2tY9NTEH+fjb94NGiYjFomrp27xG99eMS+v3fI4Qv01y/91Drs+i3GUT/1gK56ccV14+biqaSbVzdQ5lDwlJRaNgzZWeDewjoxN2TPqfqBIH7N/SFm70t59mL6ZOr8Cext5TdOHNM5Zohe25lTojh8N9/atGvHNtPuxb/rJnxk7N4Oapu5WsQ8MOnPI3z0rrdBsHZJSrS8OTdz80LI1ng+zevSSNlyplPmZOawVMs0JwtU4UKFWjZsmWxVPbstgVuzuZhK3xUVCQZX/nKUlB/tcBWHFvu967r7+HnLFXRRjDbztcN107aJHIILL4ac1sIAmSpa3XqS5nzFCLf9NEHdeIa+/d3/ZqU4aC7oz4DBw6M1U8WLVqE7OyqwLwFlf+2uT+QLQFghhyuGbNUZhaG8LBQITjSJxfG8dQYNHtRfZw1ulszP9/rJ4qePo1QxSpQwPXXrKenp0o/LoNx6396G69p5M/v+jLGVa6E+p84cUlx9vHxInyhpVgx/VU34zkexrw8xAI5TRp9sfn119aFkl5i4enrq4czpmHLjC/pSD8vLy9ptKsntH0giHZHf1uy0UOVO0vgHWV2twE8IjGIxmSUO1B//THGSdPyZLburnm66Kd4Dn3Xz/2QJ5qAw1rSOJzUmjvcIsWDgnDDjjBjmvCXqli2QGl0m47XUYzCydw22KIAQen9oGnK3lkeWoCYH3zBZeHOI9RNLKy3n7gQ40pUIGv0vVE5xGHwEtdoHEFc6o27z2MhrJKJls6dVRoTVTcTdIixx5ZYP3dggN1yFTLwnv/PIYq0sUsqVyb76djKxNH2Mfb1+F4/tsrgKveaFcJUUifOO9dPEbFPnz7Uv39/pZo2bQpnVnYI6HcWO4HYK3EIXD97XGWUUSyk04qnt8rBYDBu/35kZbv62X3bVWicjVGtfXdld4VhzZThZPzEbYMeH2oLL8u08dWYUzvWKec8ZauSf8YgZU+I4emjByp6jpLOL2hVZCcMV4/rJ2MXqlKPUqdJOtsjI5/qg2dgbn1B6Wj1fHx8iBwN7IZwDwznUNTrNjjeORh3h+QW/QJf9XAmsbN7tqngaQICqVDV+pQU/u1ZNksVo3DNl6jG672V/ebZY4TFu3IwGNxRn/j2FeNrdKEP7xpKqRtzl6xE6TK7fxEc+lDf+VP9Nf3cE70kRLXeeM9otWuOLxO7iTrhaXzl4a23mjgR03ZQ4yGd2bJlsB3Qwufy5dvKJXOQ9YntK69UVWGSk+HoUX0x1b59XfKPOTw0IiKS9uzRdzAa6+TtbS6AeGz4eoQx3LvvviKesBtd4jafP39DBUI+jghKXNE+7uhvew5HUESMwMGDPKhMEXNuqqJuMNx9pB+E+Yrh06zGrFqUL2q0usXs6aFPycMidOGlZWZv1LIvhDUeHNqmSvRrVpZptKxUzNLJLXbjgr51peJW8yiSLZD8DTtPLty2fn+wGjnG8Y/dR2NMRI6cbXLnkX6IaiaLQ1NVQm40XAnW57Cda+kHcLsxy1hJXzHsZsKOm+qFc8cKA4eGpfRd5LBbKghzpdtjG59FhnAul+ErLzK8LT0+7ePp4Zrrx1aZXOFeupC+W2njLucE28gfgo3GjRuTVN26dYMzKzsE9F5hJxB7JQ4BPJWNjNS3/Xb48qdYGZd7uT0FZMmp3Ldb+QTipcN76NZFfRttvXfeJ1ufvyxcvSG9M2WZSs9Rw2/9O5Asq8lkojfHLyAPD89Y0f/6bqh4ehrtbDKZqO/sTZTJ8OpNtA+Rl7cPtR02kfrN3Sqd7Or3b15X/vXfGmw1bxUggQYZfe0PIygi4qlmNXl6Uacxs8nLxtkjeO2hQfch1O7zH7Tw7v55fE9/AlatfQ93Z+fy9Fd8+6FKM32WHFT/nQ+U3dKQPig7tf10EtXsrL8KIcOs+/Er1UZw6zpuAdkSGGKHUcuPxiGYUhcP7TK7dlp+PI4yZM2t/C0N5Zp2oB5T3XumBPLcu3wePYuMnvj6pk1PpRrqX1vZteRXBLGqklJ9Ht7Qd0RVatE1Vnn9AjJS+y8T53rZu2y2yh9fgclWuJSyw5CjaFmCO8zJQX37rX6OS5YsGeidd/TXmizLHySED59++gZ17tzQ0svMfvWqfvAfzqQwmWw97zOLRhcu6IvvjBn9qVgx8+unYMHsVL2a9cWXeUpJz7Z+/V5VqJeb6K9inj2r920VIMYQJib+EITEWOn11xtIo9JLlcpHr75aXdkdNUSJp/dydwWaZ8CANnFGdUX7uKO/oeAHjmWDpqle7SI1PTF+lu45rrKpWSwv5bT4tG/uwPQEdxXITYbTN/T7eGZ/P8ourh/LrBqUyB/ngY+/bta/OFY4WyZqVq6wWTL4VG35fO4XKCPTlftPQtNUjaJ5tE/lapaYH28vT+rXRBd84mDOMzdiCzp6NqwUK25MEppWu1g+TcfPg1D9wQ/s1tTlO/qryHkyBxBee7AWzl1uP/69SyWd3jc19RcMrI2wOOC1X+NqVKVgLhXeVYYnTyPo4AV9Lt2tbjlK5e1llnx90d/wlRszRwuLUbD2cplCFr5Efql86KMWtWK523OIT/u46vqxV66E+OXM4kmZA6IFXDiTZuaffD5HQng6GtfD0YAczv0EwsNC6b/Vi1VGOUqUpz6zNlJN8fS2cutu1GH4T/TK+6OVf+j9O7R/1UJlNxoWDuuhBAxeXj70xncL6PWvZ1L1Dj2oRN2m1KjXx9T9xxX02ojpFJTf+bMMHt65ScvH6ItRbKO3Jph5eOcmHVq/RBUN53r0nrFWy7tJn0+pce9P6M2Ji2jIikNUvP6rlMrPX4W1Z9j4s84hvVgYf7D8IL05/nfqPHq2pqpbeZ2mStu3tQU0FtFS+fqnU9mUqtcilj8W1TIA2mfj9DHSSjmKlaX3l+6nZgNHUtkmbalkveb0Uq+hWn0+XHmUanR8l3IWL6fCu9Nwfr/+/niBSrWp37xtmpAFZYMCa3fmn9C0zx/8ly4IJdNBn+8/b7vWT0uI/lq++WvUfNBX9O6v66n//H+oeN3mlCVf7H6LNtrw02iZDPkHZqV+C/6hlh99RxBKlGncRktn4MKdVPuNflZ3Iv3+aS917UCo0HfOZmr32RSq0uYtKlKjEdXtOoA6jviZPl59gl4Z/A1lKWh90Va05kux+lO2IvqCOrMov+yHUs9Xtpoqu9GA13suHTugnEym6CkRhB8HDIeVqgAGg6vqY0gyXsYze7eoeLh2Bi3aRY37fkbFar9MTd77nAYs2EFpAgIpMf5t+W0CKaGlYPnW5D+oaf/hVPHVTtRswEh66/tF4ul6NOPEKE9C8zh48AxByXSwmJ43byj16tWc6tQpTc2aVaVBg9rSjBkf0Pz5wwhnRuQzfOpPxjPqmzcfVFZ8KWT58uH09dfvEA7WHDiwLUFBaKICxRgOHDitXvGA08SJfalfv1baQh6fU53640AyeZjglezUunX71NhgrMOGDfq1aa1SFy/eUs7dujXW2qFDh3riqVxFgtBp/Pg+5OkZv+nY+vX7VNqNGpXX2nfs2J40ZkwPTVWsaD5OHnBB+6CvQcmMXdHfkNbXM1JD01S9ytc0PTF+Vh04SXIHBZ5sj+vSRPvqSQ3xhBtfk/jujZcdOp8Di/ZXKhQhS2UymVQ1LP1eFgtDjxh/nGcgy2EymWhi12Y05JWaVCl/DqojFvKftKpL74kFsUrMhmH/hWt084H+5Lh7/Yo0XtShz0tV6OuOL2mfqrUR1eXOOKtBvkoDtmM7NyHsSAHbV8oXoSndmlOOjOlUvtM36MJE5SgML5UuqH1mF5+VRfyaRfJQseyZ6bXqpehbkWaLCkVFqOi/rccvRBvs/F64fZ8ihKAQQUwmE/3csyW937yGVraO1UsTFHaawN9SoS0s2zGd4fW0GoVzxeoDAX5630Z6OHPln5MXYdRUvRL56afuLah91ZJULk82ql00L71drwLN7N2G6pfMR5nTpdHCufrn500670AhXJvcrZkmGEP+6C9GIZStvPeeu6K8KuTPTj+83ZzaVSlBpXNlEfUpobENSpdWhXHEEJ/2cdX140j54hOmfyddsHHgeDa690i3xyc9juMYAQ/HgnEoxwkkLOTqSV/QvRv64XKZcuTTFktNxIKgSI2XSP7DborFXw2Q1lh68OWztHrSp+opsBjHqWDlOtSw58fU5tMphKf+2QqXjBXPGYf/1i6h07s2qyiFqjeg0i+1UnZpWDpqIG2dPUlaCbshkHdlsXCE8CF3yYrk6Z1K+TtiOL17CxkX9z6+aSl36UqUv2JNTZUQQgfLdOq/PVgTGmERLRXiyXAFqtSN5V9FCJikP/QdC6fR0Q3LYNQUBDcVXulEr34wllp/MonLkGCxAAAQAElEQVSqtu9OqI/JZNL8E+tn1YRPzF5fwK4fLCBRNqhKrd+ipP5vwac96Pb5U6qYEGBVa99D66/NB31N5Zu/TplzF1T+tgw7F02nIxuXK28I+ko3ak0QSrQY8q2WDgQgKoCFAYeLml87JipWpyk1FoK5DsOnUW0h6EBf9/Kx32drdOwdqz8Zy58hW+5Y/o37fk62/u1cGHuH18VDe8TCy/7N0lX1sVUuR93XT/2aQu7przWkzRhEVcT11e7zH6hyqze1MQA7168YBDqOpu1sOJwPsmrcMMEuOqanpzdVbPEGNRVCjgpC2IExCkKkaN/k8fvppzPJ+LQeOzvwesVnn3URwom21Lx5VcqTJ8jhyuzefYJOndInsGnSpKbKlYsKoUkVwqsnUNaEJXgnf8WKnSofT7GAb9myBg0Y0JoaNapAEBAYXwFRAZOBITw8gq5bfOISxbZ1Pgf8oIYN+5mexby3bhK3BrRDz57NaMiQ1zShE9xCxVNo4yshiOeImjhxCeGLLzIshE/lyxeiChUKa6pUqbzSS9Nd1T6u7m8o3O5DERR8P3pB5OsTQQ2resPZ7QpnCny34h8CG2Tm7ekpFrql6H0hZMDXJLw8PNSiGP62VBofb3q7boVYyhje0r9nw0qUJcBfBUE5pAX5VhPClqGt6tDAptWoglhEwu/I5ZtxlmfIvHVkPKQzb1AGalSqgNoNcuzKLSXcQZruUjgDZcKqnYothB1tKhfX2GIhn9lwjs8OsfD/94w+/7VWJoRH/MFCKDGqYyN6rVopKpAlowqKHSGzttoXPCIwyvXbFj0cWNcQwhOk3aFaSSHoKknVi+RG0FiqR8OKsdoYuzJkwHpCaGHZzvWK55feSp+05l86flW/J6Jur9coTZ+1rUeDmlUnCIKMX+BREV1ouCgEPn/u1Xc0QdgBwRjyR39BVqFxfKls6e5jZoK1bAHpqFPNMvRl+wb0eo0y2qtEuLbwBSGk54iKb/u46vpxpIzOhmlaS989M8Yg1HU0nTRp0sR6ABMZmXg73xwtZ1IL55FoBXqBM4o0HCoUZRgQIiPCVa0jnj4xmMN0c5j+niAc8UR6YseadHD17+LGAJfY6u61izSxQw06Kxb7sX11l91LfqMJHWuYLR5132hT6KP7tGX299EWi18sOqTT0yfm5ZTuC4a9TU8M52Vgx4mHh6f0VvrGX8bSvI+7EXahGNNVAYQBfv/MnypMjv399r+OtGXmBG3xhEHUGCvyafQrJka3Z1GuGRAWjehHswZ1pJAHd43Jm5mxSMKZHut+GGHmDouxj0SEWeeKcM6oiPCnNObVMppACW0am/Ezu8lF2Hkf2G5EG54ojw0vm85PHt6nKW81onU/jlRP260FxjUCAds/C2Iv/GX4xcPf09rIeBaD9JP6navnafNv46XVTJfXzq1z1t+7R2AwxrW4dfZEWGOpCMO5KbE84+FwfNtaigzXxw4k8c9Cx64XV9QH+UFFxvPG+uxZFE19pyldOXYQycRS4U9CaP7Qt+jyMX3bdbgVhq66fvavWkizxRiC/mRZGLTdzIEdzXhHGMbwWOFdfP1ExSyKLfOxZ3/4MIS6dRtDP/64Qlw/tse6sLBw7WsfCxZstJec5tez5zgaNWoeXbsWTHKhrnnE/ISEmPfHGGeaNGkprVq1S1qVjmvm+PGL9N57k5SbM4YnT2KP6/biR8U8sbUXxlm/7duPmEUJDn5Ajx/bH8evX79LAwZOobuGd+KNiSCNrl2/odBQvX5PnkS/qmYMZ838VMw/2rT5grZvP0whIU8IjI3hnjwJN1o1syvaxx39DYUbNyszNE0N7XFP0xPjBwvs9+euoceCp2V+WOjh06ZPhKBL+oVH2Bcwy3DO6ijHt39tJ2NeMo1nonF3CUHAsAXrRTvr9/TIyNhlufsolPBpTwgPHoXp/ep+6BPCjodPfv+bvIRAR6b90ND3pNtTw1iPhad0d1bfduIC9fl1hfb1DWtxI0W9Jq/dRd8s32bNW3PbcvQcPXxifbxBAKSx8sAp6j9zJUVY4YEwlmqZWOB/uvBvOn/zLqGNwdcYBq92GO3SHGHgIt3io4eIvvbhvLX0/eqdNoVOKNO/py8TVHzycCTOjE376Id1uwkMLcPjHI+PhNBMulurO3ri/2avoX3nrspgZjr638cL1wuhzi3lLncuKQcrhvi0j6uuHyvFSZBTm4belNY3eiy+djuAth+INjuTaN26dWMFX758eSy3JOfwnAvEgg4XNMCP3ZvQl/XzagpfSJBJTuvVXHODH17hkO4zB3ZQ7rcunJLOZvqfo9+nEQ3z0899WtGmGd/SzoXTaMEn3embZsXp+061yZieWUQLy4PbN7TF44iGBeiXvq1pw/TRmnBg1YRhNK1HM21xvM2w28IY/asmRVQ5rxw/YPRSZjwZHf1qaRVuZKNCFGVDoHBq50Ya06q8Vq/fBIP1U0fRP/N+JLwC80O3Rprf9nk/kDP/Ns0cR2NbV6ThDfKpMoD3L/3axErm62YlzcIgXFxqrVh0x0pIOJw7sIPGtixHo14uRnM+7ErgirKvHD+UZvRrSyNeKkzTe79KhzeuIMt/k7rUU+U49PcysvbvwOpFKsy49lWtBYnlFiGEHRAoQeAxvEF0f5T1Gy74xIpgcNi9ezfhkCNLdfWq9RuXIaoybpo5XpUZdVceThp2iL7+leD3XZuKtGRkP63/b5s7hZZ+PZDQT8B8rmBuPHjUWhZoI3zCFNfMPCFkQxvJdCa8Vp0mda5LJ/9Zby2q5oZr54e3G4v+WkC7Dv+e9g1tmTWR1k4ZQXOHdKHRzYtr1+KmGd9p4S1/jNe5bIe49B/faWyZjJl9ZGP9mkRauKbMAtixJLQ+MumxY8fG6istW7aU3nZ1jFs/92lBk96oQ3999xHtXjpT08e2EtdS0+J0aucGwidnUTcoCDMtE3Tl9XNOXMfoT1PebEgbfx6jCQp/fKsxYey7eHg3GXk/NpyDY1kmV1w/WAzXrz+YoJo0+dAyC4ftCxduopdeGkJY/I4YMYd++WUNzZ37tyawgCDk5Zc/og8/nE6Wnwm1lcG6dXupU6dR1KDh+1rZUD6pDh06aysajRmzkNq3/5LGjl1IM2euoc8+m0mNGw+h3r0naos0mUaDBoNtpgEPlFeGxSdY4eaoatToA1VmW3GGDv1FhRkxQj+7xVb4KVOWqfAoV7t2X9oKauZ+6NA5rU369JmoCaOWLNmmMWnS5CNCGrdvPxCCqtEq7cWLt5jFt2eJiIikTz75lZo3H0bgiXJJNW/eBqtRXdU+ru5vs1aE0407/lqZ82e/SzXKemvmxPg5ff0Odfr+d+o+7U+asu5f+nnjXk1Y0HHi73ROLIZfm7iQWn47V1PWDl28LwRN0t8ZHV8PMdYPgojOkxcRFsHTNuwhnLkxcNYqavXdPPpq6RbCwrLd+AVaOZBPiFgwG+NLc1h4hCY86DxpEb0u6tVJ6F2n/EEQpCAMdldAx6Iz0opQEMIdpA+177z1uQAEL/CH6jNjBZKzqq7eeUhvT11KKMPwPzZpn4Udv2oH9Zy+jNqIeq07pJ8rZy2BCUIY8MbkxdRt6hJC/Kl/76b5Ow4RdkUMmbtWq99Pws0WC2tpwu2/SzdogGCLNgZf1EOqef/oB9AjrFRgKMM4qi8xHJYq05H630fOUocJCwn1+3LxJpq6fjeh3YcJIUzHSb/TqD+3EHaqyPDu0Nf8d4rainYYNHsVzdi8jybG8O7zy3I6f+ue6muou7X8H4aG0ZeiXd/+aSl9s2ybaN//NB3tjf537PItwmtMkteYFfpHE6ylJ93i0z6uun5kGVyhD+t5XSXz3jcBmtnZnxo1aphFefLkibi3zzVzY0tsAizoiM0kybg8E09Ar4inm1tmfU9rfxxJJ7avo7DQkHiVD8KHy0f3ERZ6EA7s/nM2XTtt/mQqXgnHIxLqhTMZ/lkwldZP+5rwZNWWwCceySdqFDwNPrNrs8YVC+E9y+bQpcN7xEQ+KlHL8SJm9ujubYIgCP1/gxDQ/bd2CcWnn+CaOSWEbOj7Mp37hq+8xMUO184VcR1uF0I4CDV2LppOp3dvife1GFd+7vZPCvW5c+UC7V0xj1ZN/EzTQ+7fdXe17aaP13u2zplMEBTePG97F4/dRJKYJ3YPbNiwn2bPXkfTp68iCCyMr7YkRnFvi8X7ypW7hKBjHW3deoiwIE+MfJNyHseOXSQIB77/fqnGBDsynld5Xdk+ruxvA0frZ/WM6v8g0fFgUbn2vzO0fN8Jun7vYaLnjwyxKwGvNfy1/yQt3XNME7TAPb4KAgCjcKZS/pwqKQholMXNBpRhr3jyj8/Cbjp6jm7cf+RUjtipgvirDpwifMp0/eEzdOLabYJQx6mEkmBg7FiBQGnVwVOEdj8shDC2dpW4o/gQoJ29cZf+3HOcNgjhC8rjbD7BD0O0zyIv3HlY09HeTqbhkuCuvn4SUqj2jb0oo3/0rr/9J4IIr+jFJ73ChQubRZs7Z45Ya6DVzJzZYkGABR0WQNjKBJgAE2ACTIAJMAEm8HwIbD8QTiOn56VZK/LQ2n/8n08hknmuOAgSX1cxWalHah8veqd+eeWz/eQlZWZDUiXA5UquBM5eIW0sw3j27nDfeFUjffr05Ofnp+KGhITQosWLlZ0NtgmwoMM2G/ZhAkyACTABJsAEmAATSGQCPy2KoGGTImnEtIhEzvnFyK5c/uza11Xm929P7zevQa0qFSN8KrRrnXL0a6/WJD8ZitdW5mw7mHwrzSVnAkmcwJ7D0WMZxrNrt22fn2WvGhUqVDDz/vXXX83sbLFNgAUdttmwDxNgAkyACTABJsAEmAATSFYEZGFTeXkRvibStXY56tekKrWqWEz7Cgb8I6KiaMzy7YRt/rCzYgJMIGkS2LBhA7Vs2VKpFStsn4eTNGvw/ErFgo7nx55zZgJMgAkwASbABJgAE0gcAikml/1nr9Kp68EEYYZlpbGL4+CF69TtxyW0B/vqLQOwnQkwgSRH4OnTpyRVkitcEi4QCzqScONw0ZgAE2ACTIAJMAEm4F4CnPqLRgBfq8BXU9qOm699kaTfzL/o/blrqMPEhdoXPj5btIHwpYwXrd5cHybABJiAkQALOow02MwEmAATYAJMgAkwARBgxQReAAL44srF2/fp1LXgF+LrJC9Ak3AVmAATSCQCLOhIJNCcDRNgAkyACTCBF4EA14EJMAEmwASYABNgAkmdAAs6knoLcfmYABNgAkwgORDgMjIBJsAEmAATYAJMgAkkEQIs6EgiDcHFYAJMgAm8mAS4VkyACTABJsAEmAATYAJMIHEJsKAjcXlzbkyACTCBaAL8ywSYABNgAkyACTABJsAEmIBbCLCgwy1YOVEmwATiS4DjMQEmwASYABNgAkyACTABJsAEEkKABR0JocdxmUDiEeCcmAATYAJMgAkwASbABJgAE2ACTMAB8q8AGAAAEABJREFUAizocAASB0nKBLhsTIAJMAEmwASYABNgAkyACTABJsAEdAIs6NBZvFgmrg0TYAJMgAkwASbABJgAE2ACTIAJMIEUSCDFCTpSYBtzlZkAE2ACTIAJMAEmwASYABNgAkyACaQYAlLQkWIqzBVlAkyACTABJsAEmAATYAJMgAkwASaQggm88FVnQccL38RcQSbABJgAE2ACTIAJMAEmwASYABOImwCHeFEIsKDjRWlJrgcTYAJMgAkwASbABJgAE2ACTMAdBDhNJpDMCLCgI5k1GBeXCTABJsAEmAATYAJMgAkwgaRBgEvBBJhA0iTAgo6k2S5cKibABJgAE2ACTIAJMAEmkFwJcLmZABNgAs+VAAs6nit+zpwJMAEmwASYABNgAkwg5RDgmjIBJsAEmEBiEGBBR2JQ5jyYABNgAkyACTABJsAEbBNgHybABJgAE2ACLiTAgg4XwuSkmAATYAJMgAkwASbgSgKcFhNgAkyACTABJuA8ARZ0OM+MYzABJsAEmAATYALPlwDnzgSYABNgAkyACTABmwRY0GETDXswASbABJgAE0huBLi8TIAJMAEmwASYABNgAizo4D7ABJgAE2ACLz4BriETYAJMgAkwASbABJhAiiHAgo4U09RcUSbABJhAbALswgSYABNgAkyACTABJsAEXjQCLOh40VqU68MEmIArCHAaTIAJMAEmwASYABNgAkyACSRTAizoSKYNx8VmAs+HAOfKBJgAE2ACTIAJMAEmwASYABNI2gRY0JG024dLl1wIcDmZABNgAkyACTABJsAEmAATYAJMIEkQYEFHkmiGF7cQXDMmwASYABNgAkyACTABJsAEmAATYAKJSYAFHYlJW8+LTUyACTABJsAEmAATYAJMgAkwASbABJiAGwgkMUGHG2rISTIBJsAEmAATYAJMgAkwASbABJgAE2ACSYyA+4rDgg73seWUmQATYAJMgAkwASbABJgAE2ACTIAJOEeAQyeYAAs6EoyQE2ACTIAJMAEmwASYABNgAkyACTABdxPg9JmAowRY0OEoKQ7HBJgAE2ACTIAJMAEmwASYABNIegS4REyACVgQYEGHBRC2MgEmwASYABNgAkyA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" alt="A screenshot of a code snippet displaying a unit test in a dark-themed code editor. The test is titled 'should clear diagnostic info at the start.' It sets up mock values, executes the function controls.checkTransmission(), and concludes with an assertion checking that mockClient.disconnect was called."><br>While using &#8220;start&#8221; instead of &#8220;init&#8221; can pass my scrutiny, it is unclear how calling disconnect clears the diagnostic info. Moreover, what disconnect does is either implementation detail or we make it part of the interface of our component (e.g. <a href="/what-is-the-coupling-pitfall-and-how-to-avoid-it/">the coupling pitfall</a>).</li>
</ol>



<p>So not only we had failing tests to debug &#8211; the tests were created with less than optimal practices. Probably also because the code was not written with tests in mind.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Small_Step_to_AI_Big_Step_for_Devkind"></span><strong>Small Step to AI, Big Step for Devkind</strong><span class="ez-toc-section-end"></span></h2>



<p>The ideal of working in small steps comes into focus here. We want to work with the AI much like we work with other developers.&nbsp;</p>



<p>That means to ship out smaller pieces of code (like small Pull requests).&nbsp;</p>



<p>These smaller pieces of code can be more reasonably evaluated. Moreover, the AI learns from one step to the next &#8211; and fits itself to your coding style and standards.</p>



<p>Working in smaller chunks of code helps us make sure each one is good or better than good (but certainly not “Best”).</p>



<p>Smaller chunks it is, then.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Preventing_Regressions_when_working_with_AI_agents"></span><strong>Preventing Regressions when working with AI agents</strong><span class="ez-toc-section-end"></span></h2>



<p>Let’s try our chunking approach.</p>



<p><strong>Prompt 1</strong>: </p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Let&#8217;s start with the simplest interface &#8211; readDiagnosticInfo Create a describe for it, with a simple it that it should return the default empty string</p>
</blockquote>



<p>This results in the passing test:</p>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="116" src="/wp-content/uploads/2025/11/image-11.png" alt="" class="wp-image-2248" srcset="/wp-content/uploads/2025/11/image-11.png 1018w, /wp-content/uploads/2025/11/image-11.png 300w, /wp-content/uploads/2025/11/image-11.png 768w, /wp-content/uploads/2025/11/image-11.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="161" src="/wp-content/uploads/2025/11/image-29.png" alt="Code snippet and test results showing readDiagnosticInfo test with 1 spec passing and 0 failures, demonstrating successful test execution" class="wp-image-2266" srcset="/wp-content/uploads/2025/11/image-29.png 1024w, /wp-content/uploads/2025/11/image-29.png 300w, /wp-content/uploads/2025/11/image-29.png 768w, /wp-content/uploads/2025/11/image-29.png 1536w, /wp-content/uploads/2025/11/image-29.png 268w, /wp-content/uploads/2025/11/image-29.png 1626w, /wp-content/uploads/2025/11/image-29.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>That’s great. Our test is doing exactly as expected. If we remove the line of code from the method or from the constructor that sets the default value, the test fails. And that is what we expect.</p>



<p>The second prompt would be:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Now let&#8217;s write a test that it should return the value set by the write method</p>
</blockquote>



<p>It generated a plain and simple test that does the job:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="125" src="/wp-content/uploads/2025/11/image-12.png" alt="" class="wp-image-2249" srcset="/wp-content/uploads/2025/11/image-12.png 1024w, /wp-content/uploads/2025/11/image-12.png 300w, /wp-content/uploads/2025/11/image-12.png 768w, /wp-content/uploads/2025/11/image-12.png 268w, /wp-content/uploads/2025/11/image-12.png 1252w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="163" src="/wp-content/uploads/2025/11/image-30.png" alt="" class="wp-image-2267" srcset="/wp-content/uploads/2025/11/image-30.png 1024w, /wp-content/uploads/2025/11/image-30.png 300w, /wp-content/uploads/2025/11/image-30.png 768w, /wp-content/uploads/2025/11/image-30.png 1536w, /wp-content/uploads/2025/11/image-30.png 268w, /wp-content/uploads/2025/11/image-30.png 1798w, /wp-content/uploads/2025/11/image-30.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>We covered the first interface point!&nbsp;</p>



<p>We did that while setting the testing standards and style.&nbsp;</p>



<p>Let’s move on to the second API &#8211; writeDiagnosticInfo.</p>



<p>Prompt 3:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Now we will test the write method in the same manner</p>
</blockquote>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="284" src="/wp-content/uploads/2025/11/image-19.png" alt="" class="wp-image-2256" srcset="/wp-content/uploads/2025/11/image-19.png 1024w, /wp-content/uploads/2025/11/image-19.png 300w, /wp-content/uploads/2025/11/image-19.png 768w, /wp-content/uploads/2025/11/image-19.png 203w, /wp-content/uploads/2025/11/image-19.png 1308w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Here we let the AI do more work in bulk, because we already know what to expect. Moreover &#8211; the AI learned our style and standards.&nbsp;</p>



<p>This saves us time so we can speed up the work and skim parts that the AI and us are already versed in. Like repeating and similar use cases.</p>



<p>This way, AI saves us more and more time as we move forward, while still being easy to follow.</p>



<p>Now that we understand the main idea, we can start working on the main logic &#8211; the checkTransmission method.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Testing_Complex_Legacy_Code"></span><strong>Testing Complex Legacy Code</strong><span class="ez-toc-section-end"></span></h2>



<p>The way we do that is much like documenting the old code.&nbsp;</p>



<p>Here’s the code:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="383" src="/wp-content/uploads/2025/11/image-1.png" alt="" class="wp-image-2238" srcset="/wp-content/uploads/2025/11/image-1.png 1024w, /wp-content/uploads/2025/11/image-1.png 300w, /wp-content/uploads/2025/11/image-1.png 768w, /wp-content/uploads/2025/11/image-1.png 151w, /wp-content/uploads/2025/11/image-1.png 1386w, /wp-content/uploads/2025/11/image-1.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>We follow the code line by line and as the AI to cover it.</p>



<p>The first line resets the diagnosticInfo to an empty string. A few lines later, we see we should expect that if connection fails three times. Easy?</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Coupling_and_Hidden_Meaning"></span><strong>Coupling and Hidden Meaning</strong><span class="ez-toc-section-end"></span></h3>



<p>But before this rule is tested, we see a line with telemetryClient.disconnect. That’s a clear sign of legacy code and that the code was not written with testability &#8211; and hence readability &#8211; in mind.</p>



<p>It’s just a single line of code, you might say, right?</p>



<p>The problem is, that in order to understand what this line of code is doing, you need to actually read the code. Moreover &#8211; you need to read the implementation of the disconnect method to understand if there are implications on TelemetryDiagnosticControls itself.</p>



<p>If telemetryClientalso affected TelemetryDiagnosticControls, it would have created coupling between the TelemetryDiagnosticControls and the telemetryClient.&nbsp;</p>



<p>By injecting the client to the controls (via the constructor), we partly decouple them by making TelemetryDiagnosticControls care only about the interface and not the implementation of telemetryClient. In other words, we eliminated <em>construction</em> and <em>bidirectional</em> coupling, but <strong>not</strong> the dependency itself.</p>



<p>Because of that, we still need to make sure TelemetryDiagnosticControls is calling the client’s disconnect method, but not care what it is doing.</p>



<p>Prompt 4:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Now we will test the checkTransmission method.</p>
</blockquote>



<p>The first test will be to mock the client instance to make sure we call the disconnect method.</p>



<p>The test that was generated now is more complex than before. This is expected, as this is not a simple getter or setter.</p>



<p>The AI created mocks for us, as seen in the first 3 lines of the test case. It analyzed the code and interface of our dependency (the client) and generated the needed stubs and mock return values. This in itself saves a lot of time.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="281" src="/wp-content/uploads/2025/11/image-31.png" alt="" class="wp-image-2268" srcset="/wp-content/uploads/2025/11/image-31.png 1024w, /wp-content/uploads/2025/11/image-31.png 300w, /wp-content/uploads/2025/11/image-31.png 768w, /wp-content/uploads/2025/11/image-31.png 205w, /wp-content/uploads/2025/11/image-31.png 1328w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="284" src="/wp-content/uploads/2025/11/image-32.png" alt="" class="wp-image-2269" srcset="/wp-content/uploads/2025/11/image-32.png 1024w, /wp-content/uploads/2025/11/image-32.png 300w, /wp-content/uploads/2025/11/image-32.png 768w, /wp-content/uploads/2025/11/image-32.png 1536w, /wp-content/uploads/2025/11/image-32.png 203w, /wp-content/uploads/2025/11/image-32.png 1802w, /wp-content/uploads/2025/11/image-32.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>If we delete the line that calls disconnect, the test fails for it &#8211; which is a good sign our test is valid.</p>



<p>We are now ready to prompt our way to test the diagnosticInfo reset.</p>



<p>Prompt 5:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Add a test to verify readDiagnosticInfo resets if connection fails 3 times.</p>
</blockquote>



<p>Again the AI agent created the relevant mocks and stubs for us, and we have a test that verifies the info is reset on every call to the checkTransmission.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="333" src="/wp-content/uploads/2025/11/image-8.png" alt="" class="wp-image-2245" srcset="/wp-content/uploads/2025/11/image-8.png 1024w, /wp-content/uploads/2025/11/image-8.png 300w, /wp-content/uploads/2025/11/image-8.png 768w, /wp-content/uploads/2025/11/image-8.png 173w, /wp-content/uploads/2025/11/image-8.png 1350w, /wp-content/uploads/2025/11/image-8.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="313" src="/wp-content/uploads/2025/11/image-17.png" alt="" class="wp-image-2254" srcset="/wp-content/uploads/2025/11/image-17.png 908w, /wp-content/uploads/2025/11/image-17.png 300w, /wp-content/uploads/2025/11/image-17.png 768w, /wp-content/uploads/2025/11/image-17.png 184w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Amazing!</p>



<p>The next lines in the method throw an error if we fail to connect 3 times:</p>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="92" src="/wp-content/uploads/2025/11/image.png" alt="" class="wp-image-2237" srcset="/wp-content/uploads/2025/11/image.png 956w, /wp-content/uploads/2025/11/image.png 300w, /wp-content/uploads/2025/11/image.png 768w, /wp-content/uploads/2025/11/image.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>That is easy to test:</p>



<p>Prompt 6:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Add a test to verify it throws &#8216;Unable to connect&#8217; if connection failed 3 times</p>
</blockquote>



<p>The test is straight forward here &#8211; we expect the function to throw, just as we asked.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="199" src="/wp-content/uploads/2025/11/image-33.png" alt="" class="wp-image-2270" srcset="/wp-content/uploads/2025/11/image-33.png 1024w, /wp-content/uploads/2025/11/image-33.png 300w, /wp-content/uploads/2025/11/image-33.png 768w, /wp-content/uploads/2025/11/image-33.png 268w, /wp-content/uploads/2025/11/image-33.png 1424w, /wp-content/uploads/2025/11/image-33.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="301" src="/wp-content/uploads/2025/11/image-2.png" alt="" class="wp-image-2239" srcset="/wp-content/uploads/2025/11/image-2.png 986w, /wp-content/uploads/2025/11/image-2.png 300w, /wp-content/uploads/2025/11/image-2.png 768w, /wp-content/uploads/2025/11/image-2.png 191w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>*** Side note: I could have let the AI to analyze the function for me, or tell it to generate a test for the lines of code &#8211; and it would probably have been similar. ***</p>



<p>We’re almost done!</p>



<p>Before we continue, I want to emphasize a very important principle in making sure we don’t leave a legacy where we go: Refactoring. This part should be done after every step &#8211; but I do it here one time, and the AI will learn to suggest it on its own.</p>



<p>Prompt 7:&nbsp;</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Refactor the tests to reduce boilerplate &#8211; add beforeEach and extract to helper functions as needed</p>
</blockquote>



<p>The agent extracts the relevant code and uses the functions to reduce boilerplate.</p>



<p>Extraction:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="275" src="/wp-content/uploads/2025/11/image-15.png" alt="" class="wp-image-2252" srcset="/wp-content/uploads/2025/11/image-15.png 1024w, /wp-content/uploads/2025/11/image-15.png 300w, /wp-content/uploads/2025/11/image-15.png 768w, /wp-content/uploads/2025/11/image-15.png 210w, /wp-content/uploads/2025/11/image-15.png 1234w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Before:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="199" src="/wp-content/uploads/2025/11/image-37.png" alt="A screenshot of a code snippet showing a JavaScript unit test in a dark-themed editor. The test case is titled &quot;should throw 'Unable to connect' if connection fails 3 times.&quot; The code sets up a mockClient using Jasmine, mocks the client's onlineStatus to return false, and then uses an expect block to verify that calling controls.checkTransmission() throws an error with the message 'Unable to connect'." class="wp-image-2314" srcset="/wp-content/uploads/2025/11/image-37.png 1024w, /wp-content/uploads/2025/11/image-37.png 300w, /wp-content/uploads/2025/11/image-37.png 768w, /wp-content/uploads/2025/11/image-37.png 268w, /wp-content/uploads/2025/11/image-37.png 1424w, /wp-content/uploads/2025/11/image-37.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>After:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="142" src="/wp-content/uploads/2025/11/image-10.png" alt="" class="wp-image-2247" srcset="/wp-content/uploads/2025/11/image-10.png 1024w, /wp-content/uploads/2025/11/image-10.png 300w, /wp-content/uploads/2025/11/image-10.png 768w, /wp-content/uploads/2025/11/image-10.png 268w, /wp-content/uploads/2025/11/image-10.png 1428w, /wp-content/uploads/2025/11/image-10.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Now that our code is leaner, let’s finish covering it with tests.</p>



<p>The last two lines of code are:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="54" src="/wp-content/uploads/2025/11/image-7.png" alt="" class="wp-image-2244" srcset="/wp-content/uploads/2025/11/image-7.png 1024w, /wp-content/uploads/2025/11/image-7.png 300w, /wp-content/uploads/2025/11/image-7.png 768w, /wp-content/uploads/2025/11/image-7.png 268w, /wp-content/uploads/2025/11/image-7.png 1140w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>The first line is much like the disconnect method &#8211; we will make sure it is fired with the relevant data.&nbsp;</p>



<p>Here we find another coupling &#8211; TelemetryClient.diagnosticMessage().</p>



<p>We’ll leave it coupled, because we just want to make sure it is covered. Worst case, we can remove the coupling later by allowing the user to inject a diagnosticMessage to the TelemetryDiagnosticControls.</p>



<p>We will ask the agent to cover this part with Prompt 8:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>test that on successful connection we call the client&#8217;s send with the diagnostic message</p>
</blockquote>



<p>Which results with the following test. It should be very familiar to you by now, so code reviewing the AI’s work takes no longer than a few seconds.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="158" src="/wp-content/uploads/2025/11/image-16.png" alt="Code snippet showing a test for sending diagnostic message on successful connection with mockClient methods and expect assertions" class="wp-image-2253" srcset="/wp-content/uploads/2025/11/image-16.png 1024w, /wp-content/uploads/2025/11/image-16.png 300w, /wp-content/uploads/2025/11/image-16.png 768w, /wp-content/uploads/2025/11/image-16.png 268w, /wp-content/uploads/2025/11/image-16.png 1528w, /wp-content/uploads/2025/11/image-16.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="318" src="/wp-content/uploads/2025/11/image-34.png" alt="Screenshot showing test specifications for a TelemetryClient including tests for readDiagnosticInfo, writeDiagnosticInfo, and checkTransmission methods with expected behaviors" class="wp-image-2271" srcset="/wp-content/uploads/2025/11/image-34.png 974w, /wp-content/uploads/2025/11/image-34.png 300w, /wp-content/uploads/2025/11/image-34.png 768w, /wp-content/uploads/2025/11/image-34.png 181w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Finally, the last line of code can be covered with Prompt 9:</p>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>Test that diagnosticInfo is updated with what&#8217;s returned from _telemetryClient.recieve</p>
</blockquote>



<p>Which results in the following test:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="141" src="/wp-content/uploads/2025/11/image-35.png" alt="" class="wp-image-2272" srcset="/wp-content/uploads/2025/11/image-35.png 1024w, /wp-content/uploads/2025/11/image-35.png 300w, /wp-content/uploads/2025/11/image-35.png 768w, /wp-content/uploads/2025/11/image-35.png 1536w, /wp-content/uploads/2025/11/image-35.png 268w, /wp-content/uploads/2025/11/image-35.png 1600w, /wp-content/uploads/2025/11/image-35.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="354" src="/wp-content/uploads/2025/11/image-3.png" alt="" class="wp-image-2240" srcset="/wp-content/uploads/2025/11/image-3.png 940w, /wp-content/uploads/2025/11/image-3.png 300w, /wp-content/uploads/2025/11/image-3.png 768w, /wp-content/uploads/2025/11/image-3.png 163w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>And just like that, with nine prompts, we covered our module and turned it into a “non legacy” code.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Leveraging_the_Experience"></span><strong>Leveraging the Experience</strong><span class="ez-toc-section-end"></span></h2>



<p>We made it! We successfully covered a section of code with tests and freed it from being Legacy.</p>



<p>We saw we can let the AI work more freely with experience.</p>



<p>How does one uses the experience with the AI?</p>



<p>I found that asking the AI what it learned as a good method to transfer its experience from session to session.</p>



<p>My prompt varies but it’s something of the form: generate a set of instructions based on our last session for future chats</p>



<p>This will generate instructions you can copy-paste to your favorite agent tool, project MD file etc.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span><strong>Summary</strong><span class="ez-toc-section-end"></span></h2>



<p>Legacy code, with its dual definitions of being complex and lacking tests, is indeed a tricky creature.&nbsp;</p>



<p>However, with the aid of modern AI agents, the transition to clean, tested code is more achievable than ever before, provided we follow a key principle: work in small, deliberate steps.</p>



<p>The more we work with the AI, the more it learns our style and imitates it. Our style includes not only best practices &#8211; but also how we phrase the tests.</p>



<p>What we did in this small example is an implicit way of instructing our agent. One can finish a good session with the agent and then ask it to generate a set of instructions to add to any tool to follow.</p>



<p>The end result is not just tests &#8211; it is a live documentation of our code that both humans and AI can understand easily. And we earned it by getting rid of legacy code. Three for the price of one &#8211; that’s a win!</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="What_AI_Is_Good_and_Bad_At_in_TDD"></span><strong>What AI Is Good and Bad At in TDD</strong><span class="ez-toc-section-end"></span></h3>



<p>AI is good at things, weak at others. Our “job” as the people responsible for the outcome is to supervise and add our value where it struggles.</p>



<p>AI struggles with:</p>



<ul class="wp-block-list">
<li>Understanding business intent<br></li>



<li>Avoiding implementation-detail tests<br></li>



<li>Choosing good test names<br></li>



<li>Ensuring failing tests fail for the right reason</li>
</ul>



<p>It excels at:</p>



<ul class="wp-block-list">
<li>Boilerplate test structure and mocks<br></li>



<li>Repetitive test generation<br></li>



<li>Fast refactoring (e.g., beforeEach extraction)</li>
</ul>



<p>When I say “struggle” I don’t mean it can’t do it. I just mean we need to be extra careful with output that is related to these tasks. Work in small steps, so you could double check and guide the agent.</p>



<p>By breaking down the testing process, we ensure that each chunk of code is thoroughly documented and covered by a solid test, making the code easy to follow and understand.&nbsp;</p>



<p>More importantly, these passing tests create a vital safety net, preventing regressions and ensuring nothing breaks when we inevitably need to change or refactor the code later on, which is invaluable in a more complex codebase.</p>



<p>Extracting rules from the session is a good way to speed up future work &#8211; in this project and others. It will also help maintain similar standards.</p>



<p>Ultimately, the goal is confident development.&nbsp;</p>



<p>One way to increase confidence is to code review the small chunks. Another way that we mentioned here is to perform a mutation test: temporarily change or remove the line of code being tested. If the test fails for the precise reason you expect, you have a solid, reliable test that truly covers your logic.</p>



<p>AI and TDD go well hand in hand &#8211; the more you work with the agent, the faster the workflow will be. This will increase development velocity while ennsuring high quality and maintainability.</p>

