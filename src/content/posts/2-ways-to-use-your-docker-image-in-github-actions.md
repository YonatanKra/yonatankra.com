---
title: 2 Ways to Use Your Own Docker Image in Github Actions
slug: 2-ways-to-use-your-docker-image-in-github-actions
published: 2022-09-26T10:30:58
updated: 2022-09-26T16:12:05
author: Yonatan Kra
description: How to use the docker image to run Github Actions? How to use them to speed up the flows and stabilize tests? And when you should not use them? This article assumes you have prior knowledge of github actions and what Docker is. If you need a beginner’s tutorial for github actions, click here. Docker [&hellip;]
categories:
  - name: github actions
    slug: github-actions
    path: devops/github-actions
  - name: devops
    slug: devops
    path: devops
tags: []
canonical: https://yonatankra.com/2-ways-to-use-your-docker-image-in-github-actions/
comments:
  - author: Anony Mouse
    date: 2023-02-15T09:23:10
    content: |
      <p>Dockerhub is the default, should have mentioned how to use container images with authentication to a private registry, or even locally without pulling. Sometimes it&#8217;s justified for images to be heavy and when using self-hosted runners we may not want to attempt pulling them if they already exist locally.</p>
      <p>For an article about using container images in GitHub actions, you spoke too little about them, just &#8220;add this one line and the magic happens&#8221;. What if it doesn&#8217;t happen?</p>
  - author: Yonatan Kra
    date: 2023-02-19T13:03:36
    content: |
      <p>Good points. Thanks!<br />
      Added to my to-do list!</p>
---


<p class="has-medium-font-size">How to use the docker image to run Github Actions? How to use them to speed up the flows and stabilize tests? And when you should not use them?</p>



<p>This article assumes you have prior knowledge of github actions and what Docker is. If you need a beginner&#8217;s tutorial for github actions, <a href="/how-to-setup-ci-cd-with-github-actions/" data-type="post" data-id="816">click here</a>. </p>



<p>Docker images are a great way to create consistency and avoid complex setup processes. For instance, in <code>Vivid</code> we are using an image to run our visual regression tests. This reduces the flakiness that might arise from different OS versions, different browser versions and even missing fonts on various machines. It can also be used to raise a DB image with pre-made data to run tests on during your CI/CD process.</p>



<p>Here are two ways of using them in Github Actions.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b461c87" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b461c87"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/2-ways-to-use-your-docker-image-in-github-actions/#How_to_Run_Your_Workflow_on_Your_Own_Docker_Image" >How to Run Your Workflow on Your Own Docker Image?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/2-ways-to-use-your-docker-image-in-github-actions/#How_to_Run_Services_in_Containers_During_a_Workflow" >How to Run Services in Containers During a Workflow?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/2-ways-to-use-your-docker-image-in-github-actions/#When_Not_to_Use_Your_Own_Docker_Images_in_Github_Actions" >When Not to Use Your Own Docker Images in Github Actions?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/2-ways-to-use-your-docker-image-in-github-actions/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Run_Your_Workflow_on_Your_Own_Docker_Image"></span>How to Run Your Workflow on Your Own Docker Image?<span class="ez-toc-section-end"></span></h2>



<p>This one is easy. When you select a machine to run your workflow on, you can also state the image you would like to use. In <code>Vivid</code> we have our own image that already has <code>playwright</code> installed. This way, we can run the tests locally just like we run them in the CI and it doesn&#8217;t matter what machine the developer is using.</p>



<p>Here&#8217;s the workflow file:</p>



<pre class="wp-block-code"><code>name: &#x1f3a8; Test Visual Regression

on: workflow_call

jobs:
  test:
    runs-on: ubuntu-latest
    container: drizzt99/vonage:1.2.0
    steps:
      - run: echo "Running 1.2.0"

      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'

      - run: apt-get install tar -y

      - uses: actions/cache@v3
        id: cache
        with:
          path: node_modules/
          key: ${{ runner.os }}-${{ hashFiles('package-lock.json') }}

      - name: Install Dependencies
        if: steps.cache.outputs.cache-hit != 'true'
        run: npm ci

      - run: npm run nx e2e components -- --task=local
      - uses: actions/upload-artifact@v3
        with:
          name: visual-regression-artifact
          path: test-results/</code></pre>



<p>In the code snippet above, we see our whole visual regression flow. You can <a href="https://github.com/Vonage/vivid-3/blob/main/.github/workflows/_visual-regression.yml" target="_blank" data-type="URL" data-id="https://github.com/Vonage/vivid-3/blob/main/.github/workflows/_visual-regression.yml" rel="noreferrer noopener">see the full file here</a>.</p>



<p>You can see the <code>on: workflow_call</code> that states this is a reusable workflow.</p>



<p>The docker &#8220;magic&#8221; happens in the following line:</p>



<p class="has-text-align-center"><code>container: drizzt99/vonage:1.2.0</code></p>



<p>This tells <code>github actions</code> to run the test in a container of the image stated in this line. The <code>drizzt99/vonage:1.2.0</code> image is published to the docker hub (you could use your own private hub) and pulled by github actions for you during the run (with various optimizations and caching to make this super fast.</p>



<p>From then on, all the job runs on this image.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Run_Services_in_Containers_During_a_Workflow"></span>How to Run Services in Containers During a Workflow?<span class="ez-toc-section-end"></span></h2>



<p>Now let&#8217;s say you would like to run a service against a postgress DB. You could raise a DB and populate it with data on the run. You could also setup a mock DB docker image and set it as a service available for your workflow.</p>



<pre class="wp-block-code"><code>jobs:
  container-job:
    runs-on: ubuntu-latest

    services:
      communication-db:
        image: drizzt99/communication-db
        env:
          POSTGRES_PASSWORD: {{ secrets.COMMUNICATION-DB-PASSWORD }}
        ports:

          - 5432:5432

    steps:
      - name: Check out repository code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Run my service test
        run: npm run test-communication-service
        env:
          POSTGRES_HOST: localhost
          POSTGRES_PORT: 5432</code></pre>



<p>The new property here is <code>services</code>. In this property, we state various containers that will be available for the main process. In this case, we set up our DB:</p>



<p>The service&#8217;s label <code>communication-db</code> is set and under it, we state the image we&#8217;d like to use (in this case, a pre-made image of a DB), pass environment variables (in this case, a password we saved as a repository secret), and a <code>ports</code> property. The <code>ports</code> property maps tcp port on the db container to the host.</p>



<p>Finally, we use the DB in our test. Note that we use <code>localhost</code> because github actions maps the ports according to the <code>ports</code> property.</p>



<p>Note that we can also use our own container to run the flow as we did in the former section by adding:</p>



<p class="has-text-align-center"><code>container: drizzt99/communication-service</code></p>



<p>to our job.</p>



<p>In this case, github actions maps all the ports automagically between services and the main container so we do not need to map our container. The configuration will look like this:</p>



<pre class="wp-block-code"><code>jobs:
  container-job:
    runs-on: ubuntu-latest
    <span style="background-color: inherit; font-size: inherit; color: initial;">container: drizzt99/communication-service</span>    

    services:
      communication-db:
        image: drizzt99/communication-db
        env:
          POSTGRES_PASSWORD: {{ secrets.COMMUNICATION-DB-PASSWORD }}
        
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Run my service test
        run: npm run test-communication-service
        env:
          POSTGRES_HOST: <strong>communication-db</strong>
          POSTGRES_PORT: 5432</code></pre>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="When_Not_to_Use_Your_Own_Docker_Images_in_Github_Actions"></span>When Not to Use Your Own Docker Images in Github Actions?<span class="ez-toc-section-end"></span></h2>



<p>On September 16th I talked about optimizing github actions in <a href="https://codetalks.de/" data-type="URL" data-id="https://codetalks.de/" target="_blank" rel="noreferrer noopener">code.talks 2022 in Hamburg</a>. After the talk, people approached me for questions beyond the scope of the 15 minutes Q&amp;A. One of them asked me about ARM architecture. </p>



<p>I did not have prior experience with it, and he explained that you cannot run a docker image created on an ARM machine on a different architecture without setting up an emulator. Apparently, the installation of the emulator and working with the image using the emulator made a process that takes minutes take almost an hour.</p>



<p>In this case, I offered the following solution &#8211; don&#8217;t run your ARM setup on github actions machines. You can trigger a call for an ARM architecture machine set on your cloud provider and wait for a response to continue the rest of the action&#8217;s flow.</p>



<p>One way to do it is to set up an HTTP request from your action. You could do it in many ways: from using <code>curl</code>, through custom nodejs code, to using a custom action that does that like the <a href="https://github.com/marketplace/actions/http-request-action" data-type="URL" data-id="https://github.com/marketplace/actions/http-request-action" target="_blank" rel="noreferrer noopener">http-request-action</a>. Call the remote machine, wait for its response and use the data in the rest of the flow. Faster, cleaner and simpler.</p>



<p>The ARM architecture is one example, but I believe any example with a large resource overhead would fall into that category. The github actions machines are rather basic in computational power, so keep that in mind.</p>



<p>An example from our setup is our attempt to increase the number of visual tests parallel processes. Playwright has a built-in parallelism mechanism, so instead of running the tests serially, you could run them 3 or more at the same time. Locally on a strong modern laptop, it works great &#8211; but when we tried to run 10 parallel processes on a github actions machine, it took longer than running them serially. That&#8217;s because it consumed more resources than the basic github actions machine had.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In a previous article I shared <a href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/" data-type="post" data-id="1195">7 tips and tricks I wish I knew before starting with github actions</a>. I went over using a docker image in a shallow manner. In this article, we saw to run our flow using a docker image and how to use images as services to be used in our flow.</p>



<p>Using docker is the industry standard for encapsulation and quick setup of complex configurations. You can use it to allow developers to run various environments on their end machine, improve CI/CD stability and deploy whole contained services to production.</p>



<p>There is more than one use case in which you should not use you <code>container</code> or <code>service</code> directly in github actions. That&#8217;s due to simple performance measurements &#8211; github actions are meant to automate simple processes. More complex ones should be delegated to external &#8211; more powerful &#8211; machines.</p>



<p><em>Thanks a lot to&nbsp;<a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener">Yuval Bar Levi</a>&nbsp;for the kind and thorough review of this article</em></p>

