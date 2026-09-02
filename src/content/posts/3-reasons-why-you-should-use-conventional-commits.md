---
title: 3 Reasons  Why You Should Use Conventional Commits
slug: 3-reasons-why-you-should-use-conventional-commits
published: 2023-10-09T02:16:11
updated: 2023-10-09T02:16:12
author: Yonatan Kra
description: Conventional Commits is a standardized approach to version control that enhances clarity, consistency, and collaboration among developers. We’ll understand what Conventional Commits are, explore how they work, and explain the three main benefits you gain by using them. You develop an application, a library, a microservice, or a monorepo full of services and libraries or [&hellip;]
categories:
  - name: Meta Programming
    slug: meta-programming
    path: meta-programming
  - name: github actions
    slug: github-actions
    path: devops/github-actions
tags: []
canonical: https://yonatankra.com/3-reasons-why-you-should-use-conventional-commits/
comments: []
---


<p class="has-medium-font-size">Conventional Commits is a standardized approach to version control that enhances clarity, consistency, and collaboration among developers. We&#8217;ll understand what Conventional Commits are, explore how they work, and explain the three main benefits you gain by using them. </p>



<p>You develop an application, a library, a microservice, or a monorepo full of services and libraries or (god forbid) a huge monolith. No matter the type of application you develop, if you &#8220;do it right&#8221; you are using some version control (<a href="https://6sense.com/tech/version-control/git-market-share" target="_blank" data-type="link" data-id="https://6sense.com/tech/version-control/git-market-share" rel="noreferrer noopener nofollow">90% it is git</a>).</p>



<p>The question is &#8211; how do you manage your version history? How do you report bug fixing, feature addition, a chore done on the workspace, or even a breaking change? More importantly, how easy it is to see that?</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1a08e9cc" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1a08e9cc"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/3-reasons-why-you-should-use-conventional-commits/#What_do_Git_Messages_Looks_Like_Without_Standards" >What do Git Messages Looks Like Without Standards?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/3-reasons-why-you-should-use-conventional-commits/#What_Does_it_Look_Like_with_Conventional_Commit" >What Does it Look Like with Conventional Commit?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/3-reasons-why-you-should-use-conventional-commits/#The_Benefits_of_Using_Conventional_Commits" >The Benefits of Using Conventional Commits</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/3-reasons-why-you-should-use-conventional-commits/#Auto-generated_changelog" >Auto-generated changelog</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/3-reasons-why-you-should-use-conventional-commits/#Auto_Versioning_According_to_SemVer" >Auto Versioning According to SemVer</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/3-reasons-why-you-should-use-conventional-commits/#Encouraging_Better_Communication_in_the_Team" >Encouraging Better Communication in the Team</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/3-reasons-why-you-should-use-conventional-commits/#Example_from_Production_VIvids_Commit_Message_Standard" >Example from Production: VIvid&#8217;s Commit Message Standard</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/3-reasons-why-you-should-use-conventional-commits/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_do_Git_Messages_Looks_Like_Without_Standards"></span>What do Git Messages Looks Like Without Standards?<span class="ez-toc-section-end"></span></h2>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="614" src="/wp-content/uploads/2023/10/image.png" alt="" class="wp-image-1970" srcset="/wp-content/uploads/2023/10/image.png 872w, /wp-content/uploads/2023/10/image.png 300w, /wp-content/uploads/2023/10/image.png 768w, /wp-content/uploads/2023/10/image.png 94w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>The picture above illustrates git commit sequence. It has only one clear line which is good but&#8230; what can we tell from the commit messages? What does <code>fix path</code> mean? What path? In what component?</p>



<p>One cannot answer that just by looking at the commit history. </p>



<p>Nor can a machine do that. Remember that for later.</p>



<p></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_Does_it_Look_Like_with_Conventional_Commit"></span>What Does it Look Like with Conventional Commit?<span class="ez-toc-section-end"></span></h2>



<p>Here&#8217;s how a sequence of commit messages written according to Conventional Commits standard look like:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="269" src="/wp-content/uploads/2023/10/image-2.png" alt="" class="wp-image-1972" srcset="/wp-content/uploads/2023/10/image-2.png 1024w, /wp-content/uploads/2023/10/image-2.png 300w, /wp-content/uploads/2023/10/image-2.png 768w, /wp-content/uploads/2023/10/image-2.png 214w, /wp-content/uploads/2023/10/image-2.png 1138w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Going bottom up we can see we have added a feature to the <code>fab</code> component, fixed something in typography, added a feature to the date-picker, did some chore in the <code>docs</code>, another feature related to <code>accordion item</code> and <code>tree item</code> (this is actually a mistake in writing conventional commit).</p>



<p>All in all, it is clear just by looking at the commits what was done in every push, don&#8217;t you agree?</p>



<p>But we don&#8217;t usually go around looking at commit messages, right? Let&#8217;s see what the real benefits are.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Benefits_of_Using_Conventional_Commits"></span>The Benefits of Using Conventional Commits<span class="ez-toc-section-end"></span></h2>



<p>There are three main benefits to conventional commits.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Auto-generated_changelog"></span>Auto-generated changelog<span class="ez-toc-section-end"></span></h3>



<p>There are many tools around that can generate a change log according to conventional commit. A changelog looks like this:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="581" src="/wp-content/uploads/2023/10/image-3.png" alt="" class="wp-image-1973" srcset="/wp-content/uploads/2023/10/image-3.png 1024w, /wp-content/uploads/2023/10/image-3.png 300w, /wp-content/uploads/2023/10/image-3.png 768w, /wp-content/uploads/2023/10/image-3.png 1536w, /wp-content/uploads/2023/10/image-3.png 99w, /wp-content/uploads/2023/10/image-3.png 1626w, /wp-content/uploads/2023/10/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>See how our conventional commits turned into an easy-to-read change log? It even splits it into versions with dates to track down any new feature and bug fixes.</p>



<p>How can it know the version? This is the next benefit.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Auto_Versioning_According_to_SemVer"></span>Auto Versioning According to SemVer<span class="ez-toc-section-end"></span></h3>



<p>The Conventional Commit standard has the following structure:</p>



<p class="has-text-align-center"><code>{type}({scope}): {description}</code></p>



<p>The type is what kind of change was done. Was it a feature? A fix? A chore?</p>



<p>The scope is what component/library/app/service is impacted by this change.</p>



<p>The description is&#8230; well&#8230; the description.</p>



<p>That&#8217;s the gist of it. I&#8217;m not going to bore you with <a href="https://www.conventionalcommits.org/en/v1.0.0/#specification" data-type="link" data-id="https://www.conventionalcommits.org/en/v1.0.0/#specification" target="_blank" rel="noreferrer noopener">the full specifications</a>, but I suggest reading it. It&#8217;s short and makes sense.</p>



<p>So, how does this help us with versioning?</p>



<p>SemVer is a way of versioning our software. The version is comprised of 3 digits: <code>X.Y.Z</code>.</p>



<p>X is called <code>Major</code>, Y is called <code>Minor</code> and Z is called <code>Patch</code>.</p>



<p>When you do a breaking change, you raise a major version. That means the interface of this scope changed.</p>



<p>When you add a new feature (without breaking existing ones), you raise a minor version.</p>



<p>When you fix some bug without a feature and without breaking anything, you raise a patch version.</p>



<p>See where we are getting at?</p>



<p>Now a machine can read our commits and decide what version our scope should receive.</p>



<p>And you don&#8217;t have to do it yourself. Because Conventional Commits is a standard, there are many tools that give you auto changelog, auto versioning, and usually both.</p>



<p>One such tool is <code><a href="https://github.com/googleapis/release-please" target="_blank" data-type="link" data-id="https://github.com/googleapis/release-please" rel="noreferrer noopener">release-please</a></code>, which also has a handy <code><a href="https://github.com/google-github-actions/release-please-action" target="_blank" data-type="link" data-id="https://github.com/google-github-actions/release-please-action" rel="noreferrer noopener">github action</a></code>.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Encouraging_Better_Communication_in_the_Team"></span>Encouraging Better Communication in the Team<span class="ez-toc-section-end"></span></h3>



<p>Besides commit messages being more readable, defining the structure gives us something else. It gives the commit message context. Even if the description is <code>meh</code>, the fact the type of the commit and its scope are well known &#8211; the reader can at least anticipate what&#8217;s coming.</p>



<p>Take a look at this example:</p>


<div class="wp-block-image">
<figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="123" src="/wp-content/uploads/2023/10/image-4.png" alt="" class="wp-image-1974" srcset="/wp-content/uploads/2023/10/image-4.png 666w, /wp-content/uploads/2023/10/image-4.png 300w, /wp-content/uploads/2023/10/image-4.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>


<p>There is an attempt at standardisation here. Still, a human looking at it cannot understand what type of change was done (is this a fix or a feature?) nor to what component. A change log cannot be inferred from this too.</p>



<p>If we change this a bit, it will look like this:</p>



<pre class="wp-block-code"><code>fix(button): verified 48 done and fixed 3 (#172/vivid-103)
feat(button): verified 2 and added demo example (#172/vivid-103)
chore(dialog): fixed 1/5 (font) (#172/vivid-103)</code></pre>



<p>This isn&#8217;t much better, because the description non-descriptive. </p>



<p>Then again, if one has to write the commit with <code>fix(button): {description}</code> it is less likely this person would write such description. It is more likely a person would describe the <code>fix</code> or <code>feat</code> done on the <code>button</code>.</p>



<p>As usual, having some standards helps people do things better. It&#8217;s somewhat like <a href="https://en.wikipedia.org/wiki/Broken_windows_theory" data-type="link" data-id="https://en.wikipedia.org/wiki/Broken_windows_theory" target="_blank" rel="noreferrer noopener">the broken window theory</a>.</p>



<p>Try it. See what happens.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Example_from_Production_VIvids_Commit_Message_Standard"></span>Example from Production: VIvid&#8217;s Commit Message Standard<span class="ez-toc-section-end"></span></h2>



<p>We are using Conventional Commits in Vivid. </p>



<p>It helps us generate our <a href="https://github.com/Vonage/vivid-3/blob/main/libs/components/CHANGELOG.md" target="_blank" data-type="link" data-id="https://github.com/Vonage/vivid-3/blob/main/libs/components/CHANGELOG.md" rel="noreferrer noopener">changelog</a> and <a href="https://github.com/Vonage/vivid-3/releases" target="_blank" data-type="link" data-id="https://github.com/Vonage/vivid-3/releases" rel="noreferrer noopener">release log</a> and auto-determine the release version.</p>



<p>In addition, our commit messages have been much better ever since.</p>



<p>But our conventional commit enforcement is not on each and every commit. During development, a developer can add as many commits as one likes with any message.</p>



<p>When someone creates a pull request (PR), though, we enforce conventional commit on the pull request&#8217;s title:</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="36" src="/wp-content/uploads/2023/10/image-6.png" alt="" class="wp-image-1979" srcset="/wp-content/uploads/2023/10/image-6.png 1024w, /wp-content/uploads/2023/10/image-6.png 300w, /wp-content/uploads/2023/10/image-6.png 768w, /wp-content/uploads/2023/10/image-6.png 268w, /wp-content/uploads/2023/10/image-6.png 1484w, /wp-content/uploads/2023/10/image-6.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">A mandatory github action that verifies our PR title follows Conventional Commits</figcaption></figure></div>


<p>We&#8217;ve added another standard that helps us connect the commit to a JIRA ticket. Every PR title ends with (VIV-XXX) where XXX is the issue number. For example:</p>



<p class="has-text-align-center"><code>fix(disabled): adds a consistent cursor to disabled elements (VIV-999)</code></p>



<p>Eventually, in our release log, the <code>VIV-XXX</code> turns into a link to JIRA:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="309" src="/wp-content/uploads/2023/10/image-7.png" alt="" class="wp-image-1980" srcset="/wp-content/uploads/2023/10/image-7.png 1024w, /wp-content/uploads/2023/10/image-7.png 300w, /wp-content/uploads/2023/10/image-7.png 768w, /wp-content/uploads/2023/10/image-7.png 186w, /wp-content/uploads/2023/10/image-7.png 1388w, /wp-content/uploads/2023/10/image-7.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Eventually, when a PR is merged, the PR title is set as the commit. We use <code>squash + merge</code> so all commit history is removed from the <code>main</code> branch and we are left with the one Conventional Commit. It looks like this:</p>


<div class="wp-block-image">
<figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="442" height="120" src="/wp-content/uploads/2023/10/image-8.png" alt="" class="wp-image-1981" srcset="/wp-content/uploads/2023/10/image-8.png 442w, /wp-content/uploads/2023/10/image-8.png 300w, /wp-content/uploads/2023/10/image-8.png 268w" sizes="auto, (max-width: 442px) 100vw, 442px" /><figcaption class="wp-element-caption">Github&#8217;s squash and merge button</figcaption></figure></div>


<p>If a pull request has more than one change (more than one fix or feature), one can always add them in the merge commit&#8217;s comments. We do it like this:</p>


<div class="wp-block-image">
<figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="315" src="/wp-content/uploads/2023/10/image-9.png" alt="" class="wp-image-1982" srcset="/wp-content/uploads/2023/10/image-9.png 834w, /wp-content/uploads/2023/10/image-9.png 300w, /wp-content/uploads/2023/10/image-9.png 768w, /wp-content/uploads/2023/10/image-9.png 183w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Squash and Merge commit message (the <code>feat(dialog)</code> line) and commit message in the comments. You can add more by adding more Conventional Commit lines. All will be added to the changelog.</figcaption></figure></div>


<p>The Conventional Commit tool (in our case, release-please) will consider these comments as if they were part of the message.</p>



<p>This way, we take a relatively <code>lax</code> approach in regard to commit messages, making sure that the last step would be to actually describe the change.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Conventional commits give us two straightforward benefits: Auto changelog and auto versioning.</p>



<p>There are many ways to achieve these goals. </p>



<p>One such tool is <a href="https://github.com/microsoft/beachball/tree/master" data-type="link" data-id="https://github.com/microsoft/beachball/tree/master" target="_blank" rel="noreferrer noopener">Beachball</a>. This tool uses a CLI that generates a JSON file instead of reading git history. The big advantage here is that it is much easier to change the history if one made a mistake (changing git history can be quite messy&#8230;). </p>



<p>Aside from these two clear and immediate benefits, I claim it also helps encourage people to write better commit messages.</p>



<p>I might be wrong 🙂</p>

