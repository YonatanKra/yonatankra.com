---
title: How to Remove a Secret Token from Your Git History
slug: how-to-remove-a-secret-token-from-your-git-history
published: 2024-12-04T15:42:32
updated: 2024-12-12T10:57:17
author: Yonatan Kra
description: "Learn how to safely remove exposed authentication tokens from your Git repository’s entire history using BFG, a powerful cleanup tool. Understand the security risks of committed secrets and master the step-by-step process to sanitize your code repository and protect your organization’s digital assets. The Unexpected Security Alert Picture this: You’re a developer, deep in the [&hellip;]"
categories:
  - name: Github
    slug: github
    path: github
  - name: Security
    slug: security
    path: security
tags:
  - cybersecurity
  - git
  - github
canonical: https://yonatankra.com/how-to-remove-a-secret-token-from-your-git-history/
comments: []
featuredImage: /wp-content/uploads/2024/12/image.png
---

<p class="has-medium-font-size">Learn how to safely remove exposed authentication tokens from your Git repository&#8217;s entire history using BFG, a powerful cleanup tool. Understand the security risks of committed secrets and master the step-by-step process to sanitize your code repository and protect your organization&#8217;s digital assets.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b19e19110" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b19e19110"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-remove-a-secret-token-from-your-git-history/#The_Unexpected_Security_Alert" >The Unexpected Security Alert</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-remove-a-secret-token-from-your-git-history/#The_Hidden_Risks_of_Exposed_Tokens" >The Hidden Risks of Exposed Tokens</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-remove-a-secret-token-from-your-git-history/#Enter_BFG_Your_Git_History_Cleanup_BFF" >Enter BFG: Your Git History Cleanup BFF</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-remove-a-secret-token-from-your-git-history/#Pro_Tips_for_Token_Management" >Pro Tips for Token Management</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-remove-a-secret-token-from-your-git-history/#Final_Thoughts" >Final Thoughts</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Unexpected_Security_Alert"></span>The Unexpected Security Alert<span class="ez-toc-section-end"></span></h2>



<p>Picture this: You&#8217;re a developer, deep in the middle of a meaningful sprint, when suddenly a JIRA ticket lands in your inbox. The subject line sends a chill down your spine: &#8220;Critical Security Issue &#8211; Exposed NPM Token in Repository History.&#8221;</p>



<p>The automated security scan has uncovered something alarming &#8211; an authentication token accidentally committed to the repository years ago, buried in commits from 4, 7, and 8 years back. It might seem like ancient history, but in the world of cybersecurity, old secrets can be ticking time bombs. And your CISO can be very insistent on solving such issues (with merit&#8230;) </p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Hidden_Risks_of_Exposed_Tokens"></span>The Hidden Risks of Exposed Tokens<span class="ez-toc-section-end"></span></h2>



<p>An exposed authentication token is more than just a minor oversight. It represents a significant security vulnerability that could potentially:</p>



<ul class="wp-block-list">
<li>Allow unauthorized access to private package registries</li>



<li>Expose sensitive company infrastructure</li>



<li>Provide a potential entry point for malicious actors</li>



<li>Risk company intellectual property</li>



<li>Potentially violate compliance requirements</li>
</ul>



<p>The reputational damage of a security breach can far outweigh the momentary convenience of a hastily committed token.</p>



<p>The first thing you&#8217;d like to do in such a case is to &#8220;rotate&#8221; the secret key(s) involved. Just null them and create new ones. But the risk doesn&#8217;t end there, because as someone put it in a JavaScript group discussion &#8211; old obsolete keys might hold a clue to the key generator&#8217;s algorithm itself. I&#8217;m not a cyber security expert (not even close), so I&#8217;ll take the experts&#8217; words on it. How do we get rid of the exposed key in the repo then?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Enter_BFG_Your_Git_History_Cleanup_BFF"></span>Enter BFG: Your Git History Cleanup BFF<span class="ez-toc-section-end"></span></h2>



<p>Our solution? BFG (Big Fast Git), a powerful tool designed to clean up Git repository histories quickly and efficiently. Here&#8217;s a step-by-step guide to token removal:</p>



<ol class="wp-block-list">
<li>Tell everyone who&#8217;s working on the repository to hold their work for a few minutes until you push your changes.</li>



<li><a href="https://rtyley.github.io/bfg-repo-cleaner/" target="_blank" data-type="link" data-id="https://rtyley.github.io/bfg-repo-cleaner/" rel="noreferrer noopener">Download BFG</a> and cd into its folder.</li>



<li>Clone the repository with a mirror:</li>
</ol>



<pre class="wp-block-preformatted">git<code> clone --mirror https://github.com/your-name/your-repo.git</code></pre>



<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>I suggest doing it twice to two different folders so you will have a backup of your &#8220;old&#8221; repository if something goes wrong.</p>
</blockquote>



<ol start="4"><li>Create a tokens.txt file with the replacement syntax:</li></ol>



<pre class="wp-block-preformatted"><code>old_token1==&gt;</code>PLACE_HOLDER1<br><code>old_token2==&gt;</code>PLACE_HOLDER2<br>...</pre>



<p>This will tell BFG to replace any instance of the old tokens with their placeholders.</p>



<p>An example of this would be:</p>



<pre class="wp-block-code"><code>ab23234-89723c-aa7b7c==&gt;${NPM_TOKEN}</code></pre>



<ol start="5"><li>Run BFG with the replacement file (make sure you are in the repository’s parent folder):</li></ol>



<pre class="wp-block-preformatted"><code>java -jar bfg-1.14.0.jar --replace-text tokens.txt your-repo.git</code> --no-blob-protection</pre>



<ol start="6"><li>Clean up the repository:</li></ol>



<pre class="wp-block-preformatted"><code>cd your-repo.git<br>git reflog expire --expire=now --all &amp;&amp; git gc --prune=now --aggressive</code></pre>



<ol start="7"><li>Check the token was replaced by cloning the local mirror and “grepping” it:</li></ol>



<pre class="wp-block-code"><code>cd .. &amp;&amp; git clone your-repo.git &amp;&amp; cd your-repo &amp;&amp; git grep -n "REPLACE _WITH_YOUR_TOKEN"</code></pre>



<p>     If this returns 0 results, it means it worked.</p>



<ol start="8"><li>Force push the changes:</li></ol>



<pre class="wp-block-code"><code>cd your-repo.git<code class=" prettyprinted" style=""><span class="pln">git push --mirror</span></code></code></pre>



<ol start="9">
<li>Tell your team mates to fetch and apply the changes:
</ol>



<pre class="wp-block-preformatted">git fetch<br>git reset --hard origin/main </pre>



<p>That&#8217;s it. Your repository is now clean. From now on, I guess the same tool that alerted you about the tokens can raise the alarm during a PR process before the token &#8220;spreads&#8221; to the main branch. Make sure it does 😉</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Pro_Tips_for_Token_Management"></span>Pro Tips for Token Management<span class="ez-toc-section-end"></span></h2>



<ul class="wp-block-list">
<li>Never commit tokens directly to repositories</li>



<li>Use environment variables or secure secret management tools</li>



<li>Implement pre-commit hooks to prevent accidental token commits</li>



<li>Regularly audit your repository history</li>



<li>Rotate tokens periodically, especially if you suspect exposure</li>
</ul>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Final_Thoughts"></span>Final Thoughts<span class="ez-toc-section-end"></span></h2>



<p>In an era of increasing cybersecurity threats, proactive repository management isn&#8217;t just good practice—it&#8217;s a necessity. Tools like BFG provide developers with powerful mechanisms to clean up historical mistakes and maintain the integrity of their code repositories.</p>



<p>While we&#8217;ve focused on token replacement, <a href="https://rtyley.github.io/bfg-repo-cleaner/" target="_blank" rel="noreferrer noopener">BFG</a> is a versatile tool capable of:</p>



<ul class="wp-block-list">
<li>Removing large files from repository history</li>



<li>Cleaning sensitive information</li>



<li>Reducing repository size</li>



<li>Sanitizing commits before open-sourcing projects</li>
</ul>



<p>If you adhere to&nbsp;<a href="/3-reasons-why-you-should-use-conventional-commits/" data-type="post" data-id="1957">the reasons you should use conventional commits</a>, BFG can allow you to spice up your old commits with some meaningful version and changelog text.</p>



<p>Remember: In software development, what&#8217;s committed isn&#8217;t always forever, thanks to tools like BFG.</p>

