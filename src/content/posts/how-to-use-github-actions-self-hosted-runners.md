---
title: How to Use Github Actions Self-Hosted Runners?
slug: how-to-use-github-actions-self-hosted-runners
published: 2023-03-04T20:15:02
updated: 2023-03-04T20:15:02
author: Yonatan Kra
description: How and when to run Github Actions jobs on your own machine? In a previous blog, I wrote about using your own Docker images with Github actions. One of the comments was about contacting private or custom docker registries (like Amazon’s ECR). It also mentioned Self Hosted runners as a means to run on your [&hellip;]
categories:
  - name: github actions
    slug: github-actions
    path: devops/github-actions
  - name: devops
    slug: devops
    path: devops
  - name: docker
    slug: docker
    path: docker
tags:
  - docker
  - github
  - github actions
  - self-hosted runners
canonical: https://yonatankra.com/how-to-use-github-actions-self-hosted-runners/
comments:
  - author: Cyril
    date: 2024-08-30T11:48:06
    content: |
      <p>&gt; <span>Self-hosted runners are meant to be used in private github repositories. Why? Because forks of the main repository might be able to run the jobs on your self-hosted runner.</span></p>
      <p><span>They can&#8217;t run jobs on your self-hosted runners directly from their forks, but they could if they manage to get a pull request approved to run jobs on your self-hosted runners. More details about self-hosted runner security on </span><a href="https://runs-on.com/security/#the-problem-with-self-hosted-runners" rel="nofollow ugc">https://runs-on.com/security/#the-problem-with-self-hosted-runners</a>.</p>
---

<p class="has-medium-font-size">How and when to run Github Actions jobs on your own machine?</p>



<p>In a previous blog, I wrote about <a href="/2-ways-to-use-your-docker-image-in-github-actions/" data-type="post" data-id="1569">using your own Docker images with Github actions</a>. One of the comments was about contacting private or custom docker registries (<a href="https://aws.amazon.com/ecr/" data-type="URL" data-id="https://aws.amazon.com/ecr/" target="_blank" rel="noreferrer noopener">like Amazon&#8217;s ECR</a>). It also mentioned Self Hosted runners as a means to run on your own machine (and hence, your own docker image).</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="183" src="/wp-content/uploads/2023/02/image-15.png" alt="" class="wp-image-1705" srcset="/wp-content/uploads/2023/02/image-15.png 1024w, /wp-content/uploads/2023/02/image-15.png 300w, /wp-content/uploads/2023/02/image-15.png 768w, /wp-content/uploads/2023/02/image-15.png 268w, /wp-content/uploads/2023/02/image-15.png 1484w, /wp-content/uploads/2023/02/image-15.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Anony Mouse&#8217;s remark regarding the article</figcaption></figure></div>



<p>I appreciate Anony&#8217;s comment, and in this article, we will talk about self-hosted runners in github actions.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1abe7594" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1abe7594"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-use-github-actions-self-hosted-runners/#Why_run_self-hosted_runners" >Why run self-hosted runners?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-use-github-actions-self-hosted-runners/#Special_Hardware_Needs" >Special Hardware Needs</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-use-github-actions-self-hosted-runners/#Large_Images" >Large Images</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-use-github-actions-self-hosted-runners/#Debugging" >Debugging</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-use-github-actions-self-hosted-runners/#Security" >Security</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-use-github-actions-self-hosted-runners/#How_do_self-hosted_runners_work" >How do self-hosted runners work?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-use-github-actions-self-hosted-runners/#Setup_a_self-hosted_runner_in_the_repo" >Setup a self-hosted runner in the repo</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-use-github-actions-self-hosted-runners/#A_Word_about_Security" >A Word about Security</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-use-github-actions-self-hosted-runners/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Why_run_self-hosted_runners"></span>Why run self-hosted runners?<span class="ez-toc-section-end"></span></h2>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Special_Hardware_Needs"></span>Special Hardware Needs<span class="ez-toc-section-end"></span></h3>



<p>In the <code><a href="/2-ways-to-use-your-docker-image-in-github-actions/" data-type="post" data-id="1569">2 ways to use docker with github actions</a></code> article, I already mention one reason: when you want to use ARM (<strong>Advanced RISC Machines</strong>) architecture related artifacts and builds. For instance, images built on an ARM machine will not always run on an x86 machine and vice versa.  You can setup a self-hosted runner on an ARM machine (either locally or on any cloud vendor) and run your workflow on it.</p>



<p>Another reason is mentioned in the <a href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/" data-type="post" data-id="1195">7 tricks for github actions beginners</a> article. MacOS github runners are slow. Not only they are slow, for some reason they have a slow internet connection. We got timeouts plenty of times just for running <code>npm install</code> for projects.  By running the flow on your own MacOS machine, you can get a faster machine and also cut costs, as MacOS machines cost much more than linux.</p>



<p>All in all, if you need a stronger or specific machine, you can get one from your cloud vendor or use your own laptop and set it up as a sefl-hosted runner.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Large_Images"></span>Large Images<span class="ez-toc-section-end"></span></h3>



<p>This reason was mentioned in the comment. It might be that your image is heavy in size &#8211; or even some installation. A machine that already has this image locally can save you a lot of time as opposed to a github actions standard machine that needs to pull the image.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Debugging"></span>Debugging<span class="ez-toc-section-end"></span></h3>



<p>When you are running on your own machine, you have full access to it. You can SSH into the machine and control it, change code, read logs and everything you&#8217;d do on&#8230; well&#8230; your own machine 🙂</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Security"></span>Security<span class="ez-toc-section-end"></span></h3>



<p>You can set up a non-internet-facing machine (e.g. behind some VPN) and ensure more privacy for your flow&#8217;s internals.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_do_self-hosted_runners_work"></span>How do self-hosted runners work?<span class="ez-toc-section-end"></span></h2>



<p>Self-hosted runners are machines that run the self-hosted runner script (see &#8220;Install a local runner&#8221; for more details). When you run the script, you set the self-hosted key you get from your github UI (see &#8220;Setup a self-hosted runner in the repo&#8221;).</p>



<p>Once the script runs on the machine, it opens a long poll connection (50 seconds) with github.</p>



<p>In an action in the repository you set the action&#8217;s trigger to be <code>self-hosted</code> and github actions knows to send messages to the machine running the script above. These messages are the commands laid out in the workflow that was triggered.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Setup_a_self-hosted_runner_in_the_repo"></span>Setup a self-hosted runner in the repo<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s get to business. The first step is to go to your repository&#8217;s settings (red square). In there, select <code>runners</code> under <code>Actions</code> (blue square) and click on <code>New self-hosted runner</code> (gree square).</p>



<figure class="wp-block-image size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="253" src="/wp-content/uploads/2023/03/self-hosted-2.jpg" alt="self-hosted runner settings" class="wp-image-1713" srcset="/wp-content/uploads/2023/03/self-hosted-2.jpg 966w, /wp-content/uploads/2023/03/self-hosted-2.jpg 300w, /wp-content/uploads/2023/03/self-hosted-2.jpg 768w, /wp-content/uploads/2023/03/self-hosted-2.jpg 228w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>This will lead you to the set up page. You&#8217;ll be able to download the runner script for the OS and hardware you need with clear to follow instructions:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="538" src="/wp-content/uploads/2023/03/image.png" alt="" class="wp-image-1714" srcset="/wp-content/uploads/2023/03/image.png 1024w, /wp-content/uploads/2023/03/image.png 300w, /wp-content/uploads/2023/03/image.png 768w, /wp-content/uploads/2023/03/image.png 1536w, /wp-content/uploads/2023/03/image.png 107w, /wp-content/uploads/2023/03/image.png 1594w, /wp-content/uploads/2023/03/image.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Below that, you will have configuration setup instructions:</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="233" src="/wp-content/uploads/2023/03/image-1.png" alt="" class="wp-image-1715" srcset="/wp-content/uploads/2023/03/image-1.png 1024w, /wp-content/uploads/2023/03/image-1.png 300w, /wp-content/uploads/2023/03/image-1.png 768w, /wp-content/uploads/2023/03/image-1.png 1536w, /wp-content/uploads/2023/03/image-1.png 2048w, /wp-content/uploads/2023/03/image-1.png 247w, /wp-content/uploads/2023/03/image-1.png 1280w, /wp-content/uploads/2023/03/image-1.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure>



<p>Note the <code>--token</code> part (I hid it for obvious reasons). This will make sure the script handshakes with the right repository.</p>



<p>If you follow the steps above, you will see the runner working on your machine.</p>



<p>For instance, I just opened a new folder on my machine, ran the install commands, configured the token and ran the script. This resulted in this:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="204" src="/wp-content/uploads/2023/03/image-2.png" alt="" class="wp-image-1716" srcset="/wp-content/uploads/2023/03/image-2.png 966w, /wp-content/uploads/2023/03/image-2.png 300w, /wp-content/uploads/2023/03/image-2.png 768w, /wp-content/uploads/2023/03/image-2.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>Yea! My machine is listening for jobs!</p>



<p>The next step was to set the trigger of the action (the <code>on</code> property) to <code>self-hosted</code>. Once I did that, the actions started running on my machine. You can see the run <a href="https://github.com/Vonage/vivid-3/actions/runs/4278943544" data-type="URL" data-id="https://github.com/Vonage/vivid-3/actions/runs/4278943544" target="_blank" rel="noreferrer noopener">here</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_Word_about_Security"></span>A Word about Security<span class="ez-toc-section-end"></span></h2>



<p>Self-hosted runners are meant to be used in private github repositories. Why? Because forks of the main repository might be able to run the jobs on your self-hosted runner. Just make sure you&#8217;re good with that. In addition, I mentioned you can set a VPN-only access to the machine and allow github actions access only via your VPN token (or however you enforce it 🙂 ).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Github actions allow you to run workflows on a set hardware spec. Self-hosted runners allow you to run your workflows on a machine of your own choosing.</p>



<p>Its other benefits should be considered vs. the obvious cons like higher maintenance, more configuration and possible high cloud costs (depending on your needs of course).</p>



<p>Our team (<a href="https://vivid.deno.dev" target="_blank" data-type="URL" data-id="https://vivid.deno.dev" rel="noreferrer noopener">vivid</a>) does not use it, as we have no need, but for many people (especially with complex hardware-dependent builds) it can be a lifesaver.</p>



<p><em>Thanks a lot to <a href="https://www.linkedin.com/in/keren-kenzi/" target="_blank" data-type="URL" data-id="https://www.linkedin.com/in/keren-kenzi/" rel="noreferrer noopener">Keren Kenzi</a> for her thorough and kind review.</em></p>

