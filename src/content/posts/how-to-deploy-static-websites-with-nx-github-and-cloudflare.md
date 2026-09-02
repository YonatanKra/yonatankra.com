---
title: How to Deploy Static Websites with Nx, GitHub, and Cloudflare?
slug: how-to-deploy-static-websites-with-nx-github-and-cloudflare
published: 2024-06-23T12:34:00
updated: 2024-06-23T13:19:28
author: Yonatan Kra
description: A question was raised in a forum asking how to deploy static websites for free. Then, more specifically, it was mentioned they were using Nx to generate multiple websites. In this article, we will create a new Nx project with a few apps, publish our code to github, deploy all the websites to GitHub actions, [&hellip;]
categories:
  - name: Github
    slug: github
    path: github
  - name: devops
    slug: devops
    path: devops
  - name: github actions
    slug: github-actions
    path: devops/github-actions
  - name: nx
    slug: nx
    path: javascript/nx
tags:
  - angular
  - github
  - github actions
  - nx
  - vue
canonical: https://yonatankra.com/how-to-deploy-static-websites-with-nx-github-and-cloudflare/
comments: []
---

<p class="has-medium-font-size">A question was raised in a forum asking how to deploy static websites for free. Then, more specifically, it was mentioned they were using Nx to generate multiple websites. In this article, we will create a new Nx project with a few apps, publish our code to github, deploy all the websites to GitHub actions, and set up Cloudflare to share our custom domain. Prerequisites: git and nodejs installed.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b19e25016" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b19e25016"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Setup_a_New_Nx_Project" >Setup a New Nx Project</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Install_the_Web_Vue_and_Angular_Packages" >Install the Web, Vue and Angular Packages</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Create_the_projects" >Create the projects</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Configure_the_Builders_to_Serve_the_Applications" >Configure the Builders to Serve the Applications</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Build_the_Apps" >Build the Apps</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Test_the_Apps_Locally" >Test the Apps Locally</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Load_the_Code_to_Github" >Load the Code to Github</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#How_to_Deploy_Apps_to_Github_Pages_Using_Github_Actions" >How to Deploy Apps to Github Pages Using Github Actions?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Setup_Our_Domain_in_Github" >Setup Our Domain in Github</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Setup_Our_Domain_in_Cloudflare" >Setup Our Domain in Cloudflare</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/how-to-deploy-static-websites-with-nx-github-and-cloudflare/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Setup_a_New_Nx_Project"></span>Setup a New Nx Project<span class="ez-toc-section-end"></span></h2>



<p>That&#8217;s easy. We can use <code>npx create-nx-workspace</code>. We answer some setup questions. Here are my answers: </p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="75" src="/wp-content/uploads/2024/06/image.png" alt="" class="wp-image-2042" srcset="/wp-content/uploads/2024/06/image.png 1024w, /wp-content/uploads/2024/06/image.png 300w, /wp-content/uploads/2024/06/image.png 768w, /wp-content/uploads/2024/06/image.png 268w, /wp-content/uploads/2024/06/image.png 1178w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 1: Nx Workspace setup questions</figcaption></figure></div>


<p>For this case, the most important answer is that we&#8217;d like an <strong>integrated monorepo</strong>. This allows us to create multiple projects and deploy them easily.</p>



<p>Once this is setup, we <code>cd</code> into our project (in my case, it is <code>cd y-static-websites</code>). Inside, we can install our wanted packages. Let&#8217;s create three projects: vue, angular and web.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Install_the_Web_Vue_and_Angular_Packages"></span>Install the Web, Vue and Angular Packages<span class="ez-toc-section-end"></span></h3>



<p><code>npm i -D @nx/angular @nx/vue @nx/web</code></p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Create_the_projects"></span>Create the projects <span class="ez-toc-section-end"></span></h3>



<pre class="wp-block-code"><code>npx nx g @nx/web:project apps/app1
npx nx g @nx/vue:project apps/app2
npx nx g @nx/angular:project apps/app3</code></pre>



<p>The above commands will generate 3 projects for us inside the <code>apps</code> folder. For the first two I opted for <code>vite</code> as the builder. For the angular project, I&#8217;ve selected <code>esbuild</code> as the builder.</p>



<p>Each app can be developed using <code>npx nx run {appName}:serve</code> (e.g. <code>nx run app1:serve</code> which loads a dev server for us. But right now, we are focused on deploying our websites.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Configure_the_Builders_to_Serve_the_Applications"></span>Configure the Builders to Serve the Applications<span class="ez-toc-section-end"></span></h3>



<p>Because we are going to serve all websites from the same top domain, we need to tell the browser where to look for the files. In <code>app1</code> and <code>app2</code>, we can just add the <code>base</code> property to <code>vite.config.ts</code>:</p>



<pre class="wp-block-code"><code>export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/app1',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: &#91;nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: &#91; nxViteTsPaths() ],
  // },

  <strong><em>base: '/app1/',</em></strong>
  build: {
    outDir: '../../dist/apps/app1',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});</code></pre>



<p>Note the <code>base: '/app1/'</code> property added to the config. We do the same for <code>app2</code> (only with <code>base: '/app2/'</code>).</p>



<p>For the angular app, we add <code>baseHref</code> to the <code>build</code> configuration in <code>project.json</code>:</p>



<pre class="wp-block-code"><code>"targets": {
    "build": {
      "baseHref": "/app3/browser/",
... rest of config goes here</code></pre>



<p>Notice that the angular build is set inside the <code>app3/browser</code> folder.</p>



<p>Now we are ready to test if this works. </p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Build_the_Apps"></span>Build the Apps<span class="ez-toc-section-end"></span></h3>



<p>We build the apps in a single command:</p>



<p><code>npx nx run-many --target=build --all</code></p>



<p>and <code>dist</code> is generated for us. </p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Test_the_Apps_Locally"></span>Test the Apps Locally<span class="ez-toc-section-end"></span></h3>



<p>In order to test that the apps load locally, let&#8217;s <code>cd</code> into the main deploy folder: <code>cd dist/apps</code>.</p>



<p>Once there, we can setup a local static server like this: <code>npx static-server</code>. This loads a simple server that works kind of like <code>github pages</code>.</p>



<p>It will output the URL where the server is served (default is http://localhost:9080). Browse the URL and append the application&#8217;s folder. So <code>app1</code> will be: <code>http://localhost:9080/app1</code>, and <code>app3</code> will be <code>http://localhost:9080/app3/browser</code>.</p>



<p>If everything works fine, all 3 websites should work.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Load_the_Code_to_Github"></span>Load the Code to Github<span class="ez-toc-section-end"></span></h2>



<p>Loading the code to github requires to create a new github repository. </p>



<p>Create a new github repository (or browser <a href="https://github.com/new" target="_blank" rel="noreferrer noopener">here</a>). Once done, follow the instructions to push an existing repository from the command line:</p>



<pre class="wp-block-code"><code>git remote add origin https://github.com/YonatanKra/my-static-websites.git
git branch -M main
git push -u origin main</code></pre>



<p>Don&#8217;t forget to replace the <code>origin</code> URL with yours. And, of course, you should run it from the project&#8217;s root (just in case you are still in <code>dist/apps</code> 😉 ).</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Deploy_Apps_to_Github_Pages_Using_Github_Actions"></span>How to Deploy Apps to Github Pages Using Github Actions?<span class="ez-toc-section-end"></span></h2>



<p>Now our repository is on Github! Hooray. We want to activate Github pages with Github actions.</p>



<p>We can set it up in the repository&#8217;s settings (orange arrow in Figure 2).</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="349" src="/wp-content/uploads/2024/06/image-1.png" alt="" class="wp-image-2043" srcset="/wp-content/uploads/2024/06/image-1.png 1024w, /wp-content/uploads/2024/06/image-1.png 300w, /wp-content/uploads/2024/06/image-1.png 768w, /wp-content/uploads/2024/06/image-1.png 1536w, /wp-content/uploads/2024/06/image-1.png 165w, /wp-content/uploads/2024/06/image-1.png 2006w, /wp-content/uploads/2024/06/image-1.png 1280w, /wp-content/uploads/2024/06/image-1.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 2: The steps to create github pages. The order of arrows is: Orange, Yellow, Purple, White</figcaption></figure></div>


<p>Once inside <code>Settings</code>, go to <code>Pages</code> (Yellow arrow). Open the select box (Purple arrow) and make sure to select <code>Github Actions</code>. This will display the option to configure Static HTML deployment (White arrow).</p>



<p>After hitting <code>Configure</code> a new screen will open with a workflow file ready to commit. It looks like this:</p>



<pre class="wp-block-code"><code># Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: &#91;"main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
</code></pre>



<p>The important part is the <code>on</code> section and the <code>steps</code> phase. </p>



<p><code>on</code> tells github actions when to run. In our case, on every push to the <code>main</code> branch.</p>



<p><code>steps</code> is what is actually being done in the <code>deploy</code> job.</p>



<p>It currently checks out our code from the repository (the <code>Checkout</code> step), setup <code>github pages</code>, uploads some artifacts (currently the whole project), and finally deploys to GitHub pages.</p>



<p>What we&#8217;d like to do is the following:</p>



<ol class="wp-block-list">
<li>Checkout</li>



<li>Npm install</li>



<li>Build</li>



<li>Configure pages</li>



<li>Upload <code>dist/apps</code> as artifacts</li>



<li>Deploy to github pages</li>
</ol>



<p>So our code will look like this:</p>



<pre class="wp-block-code"><code># Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: &#91;"main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Npm install
        run: npm ci
      - name: Build
        run: npx nx run-many --target=build --all
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload apps dist folder
          path: './dist/apps'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4</code></pre>



<p>Notice the steps added <code>Npm install</code>, <code>Build</code> and the change to <code>upload artifact</code> to upload only the <code>dist/apps</code> folder.<br>Here&#8217;s the repository: <a href="https://github.com/YonatanKra/my-static-websites" target="_blank" rel="noreferrer noopener">https://github.com/YonatanKra/my-static-websites</a></p>



<p>Our websites won&#8217;t show now. We need to set up our custom domain in Cloudflare.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Setup_Our_Domain_in_Github"></span>Setup Our Domain in Github<span class="ez-toc-section-end"></span></h2>



<p>Let&#8217;s assume we have the domain <code>yonatankra.com</code>. We&#8217;d like to set up a subdomain my-static-websites.yonatankra.com to redirect to our GitHub pages static websites.</p>



<p>First, let&#8217;s set it up in the Github repository&#8217;s settings. Go back to Settings => Pages and find the <code>Custom domain</code> input box. Write down your custom domain (in my case <code>my-static-websites.yonatankra.com</code>, but in your case, it should probably be different).</p>



<p>After you save the domain, it will try to verify its settings and will probably fail. That&#8217;s because we need to change the domain&#8217;s settings in Cloudflare.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Setup_Our_Domain_in_Cloudflare"></span>Setup Our Domain in Cloudflare<span class="ez-toc-section-end"></span></h2>



<p>This step assumes you already have a Cloudflare account. If you do not, <a href="https://cloudflare.com" target="_blank" rel="noreferrer noopener">create one</a>.</p>



<p>There are several steps to set up your domain in Cloudflare:</p>



<ol class="wp-block-list">
<li>Create a new website (purple arrow in Figure 3)</li>



<li>Either transfer your domain or register a new one in Cloudflare</li>



<li>Choose the Free program</li>



<li>Follow the instructions to set up your domain on Cloudflare</li>
</ol>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="185" src="/wp-content/uploads/2024/06/image-3.png" alt="" class="wp-image-2045" srcset="/wp-content/uploads/2024/06/image-3.png 1024w, /wp-content/uploads/2024/06/image-3.png 300w, /wp-content/uploads/2024/06/image-3.png 768w, /wp-content/uploads/2024/06/image-3.png 1536w, /wp-content/uploads/2024/06/image-3.png 268w, /wp-content/uploads/2024/06/image-3.png 1886w, /wp-content/uploads/2024/06/image-3.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 3: Adding a new Site to your CloudFlare account</figcaption></figure></div>


<p>Once the domain is set up, you should be able to add DNS records (see DMS Records screen in Figure 4).</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="246" src="/wp-content/uploads/2024/06/image-5.png" alt="" class="wp-image-2047" srcset="/wp-content/uploads/2024/06/image-5.png 1024w, /wp-content/uploads/2024/06/image-5.png 300w, /wp-content/uploads/2024/06/image-5.png 768w, /wp-content/uploads/2024/06/image-5.png 1536w, /wp-content/uploads/2024/06/image-5.png 234w, /wp-content/uploads/2024/06/image-5.png 1952w, /wp-content/uploads/2024/06/image-5.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 4: DNS Records page</figcaption></figure></div>


<p>On this page, add 3 new A records, as shown in Figure 5. Note that you need to add the 3 records because Github pages work with 3 IP addresses:</p>



<pre class="wp-block-code"><code>185.199.109.153
185.199.110.153
185.199.111.153</code></pre>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="201" src="/wp-content/uploads/2024/06/image-7.png" alt="" class="wp-image-2049" srcset="/wp-content/uploads/2024/06/image-7.png 1024w, /wp-content/uploads/2024/06/image-7.png 300w, /wp-content/uploads/2024/06/image-7.png 768w, /wp-content/uploads/2024/06/image-7.png 1536w, /wp-content/uploads/2024/06/image-7.png 2048w, /wp-content/uploads/2024/06/image-7.png 268w, /wp-content/uploads/2024/06/image-7.png 1280w, /wp-content/uploads/2024/06/image-7.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 5: Add a new record. Do this 3 times for the 3 IP addresses.</figcaption></figure></div>


<p>Once that&#8217;s done, your domain will direct to your GitHub pages. If you go to the URL my-static-websites.myDomain.com, you will get an infinite redirect error. That&#8217;s because we need to define how SSL is handled in Cloudflare. By default, the SSL is set to Flexible. Github pages do not support it, so you need to define it to Full for this subdomain.</p>



<p>Under the SSL tab (figure 6) you will have a link to <code>Configuration Rule</code> creation. Click it.</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="303" src="/wp-content/uploads/2024/06/image-9.png" alt="" class="wp-image-2051" srcset="/wp-content/uploads/2024/06/image-9.png 1024w, /wp-content/uploads/2024/06/image-9.png 300w, /wp-content/uploads/2024/06/image-9.png 768w, /wp-content/uploads/2024/06/image-9.png 1536w, /wp-content/uploads/2024/06/image-9.png 2048w, /wp-content/uploads/2024/06/image-9.png 190w, /wp-content/uploads/2024/06/image-9.png 1280w, /wp-content/uploads/2024/06/image-9.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 6: The SSL Tab</figcaption></figure></div>


<p>You will be redirected to the Configuration Rules page (figure 7).</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="207" src="/wp-content/uploads/2024/06/image-10.png" alt="" class="wp-image-2052" srcset="/wp-content/uploads/2024/06/image-10.png 1024w, /wp-content/uploads/2024/06/image-10.png 300w, /wp-content/uploads/2024/06/image-10.png 768w, /wp-content/uploads/2024/06/image-10.png 1536w, /wp-content/uploads/2024/06/image-10.png 2048w, /wp-content/uploads/2024/06/image-10.png 268w, /wp-content/uploads/2024/06/image-10.png 1280w, /wp-content/uploads/2024/06/image-10.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 7: The Configuration Rules Page</figcaption></figure></div>


<p>Click on <code>Create rule</code>. Set a <code>rule name</code> and set the condition as shown in Figure 8 (remember to change the domain name). This will ensure that this rule applies only to this subdomain.</p>


<div class="wp-block-image">
<figure class="aligncenter size-large is-resized"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="404" src="/wp-content/uploads/2024/06/image-11.png" alt="" class="wp-image-2053" style="width:840px;height:auto" srcset="/wp-content/uploads/2024/06/image-11.png 1024w, /wp-content/uploads/2024/06/image-11.png 300w, /wp-content/uploads/2024/06/image-11.png 768w, /wp-content/uploads/2024/06/image-11.png 1536w, /wp-content/uploads/2024/06/image-11.png 2048w, /wp-content/uploads/2024/06/image-11.png 143w, /wp-content/uploads/2024/06/image-11.png 1280w, /wp-content/uploads/2024/06/image-11.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 8: A new Configuration Rule</figcaption></figure></div>


<p>If you create more Github actions in the future, you can add more incoming request matches. Now, we need to define the rule. Scroll down until you see the SSL box (Figure 9).</p>


<div class="wp-block-image">
<figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="241" src="/wp-content/uploads/2024/06/image-13.png" alt="" class="wp-image-2055" srcset="/wp-content/uploads/2024/06/image-13.png 1024w, /wp-content/uploads/2024/06/image-13.png 300w, /wp-content/uploads/2024/06/image-13.png 768w, /wp-content/uploads/2024/06/image-13.png 1536w, /wp-content/uploads/2024/06/image-13.png 2048w, /wp-content/uploads/2024/06/image-13.png 239w, /wp-content/uploads/2024/06/image-13.png 1280w, /wp-content/uploads/2024/06/image-13.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption class="wp-element-caption">Figure 9: The SSL box sets the configuration to FULL encryption mode</figcaption></figure></div>


<p>After you have made sure the encryption mode is full, click on <code>Deploy</code>.</p>



<p>Now you can browse the 3 static websites and do whatever you want with them:</p>



<p><code>https://my-static-websites.yonatankra.com/app1</code></p>



<p><code>https://my-static-websites.yonatankra.com/app</code>2</p>



<p><code>https://my-static-websites.yonatankra.com/app3/browser</code></p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>This guide might seem a bit long but it shouldn&#8217;t take more than 5 minutes after the first initial setup. </p>



<p>Of course, you can optimize the GitHub actions flow, but that&#8217;s a topic from <a href="/7-github-actions-tricks-i-wish-i-knew-before-i-started/" data-type="post" data-id="1195">a different article</a>.</p>

