---
title: Debug Jest in a NRWL/nx project with webstorm
slug: debug-jest-in-a-nrwl-nx-project-with-webstorm
published: 2020-05-05T07:23:03
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: Lately I’ve started a to migrate our 5 y/o code base into a NRWL/nx monorepo. I’d might write the process of choosing NRWL/nx as our tech of choice in a different post (write in the comments or message me so I can see if there’s any demand for that 🙂 ). Anyway, while migrating the [&hellip;]
categories:
  - name: nx
    slug: nx
    path: javascript/nx
  - name: Testing
    slug: testing
    path: testing
tags: []
canonical: https://yonatankra.com/debug-jest-in-a-nrwl-nx-project-with-webstorm/
comments: []
---


<p>Lately I&#8217;ve started a to migrate our 5 y/o code base into a <a rel="noreferrer noopener" href="https://nx.dev/" target="_blank">NRWL/nx monorepo</a>.  I&#8217;d might write the process of choosing NRWL/nx as our tech of choice in a different post (write in the comments or message me so I can see if there&#8217;s any demand for that 🙂 ).</p>



<p>Anyway, while migrating the code, I had to to debug some of the tests, to see why they are not running correctly (hint: it might be someone not knowing how to use Jest&#8217;s <code>mock</code> or just someone not really understanding how <code>toString()</code> works&#8230;).</p>



<p>Here&#8217;s the video for those of you who like this kind of media:</p>



<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<span class="embed-youtube" style="text-align:center; display: block;"><iframe loading="lazy" class="youtube-player" width="640" height="360" src="https://www.youtube.com/embed/9NXlYW2gUec?version=3&#038;rel=1&#038;showsearch=0&#038;showinfo=1&#038;iv_load_policy=1&#038;fs=1&#038;hl=en-US&#038;autohide=2&#038;wmode=transparent" allowfullscreen="true" style="border:0;" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-popups-to-escape-sandbox"></iframe></span>
</div></figure>



<p>If you prefer the written word (with some static images) here it goes.</p>



<ol class="wp-block-list"><li>Open your NRWL/nx project in webstorm (we have to start with some common ground here&#8230;)</li><li>Make sure you have a lib or an app with tests (again &#8211; common ground is important)</li><li>Inside one of the tests, setup a breakpoint by clicking to the right of the line number you want to debug (figure 1).</li><li>Now setup a script to be run by webstorm by going to the top toolbar and selecting Run => Edit Configurations (Figure 2).</li><li>In the edit configurations screen, click the + sign at the top left corner and create a new Node.js configuration.</li><li>In the configuration screen you need to setup 3 things (Figure 3):<ol><li><strong>Name</strong> &#8211; just set a name for your convenience</li><li><strong>Node parameters</strong> &#8211; set it to:<br><code>./node_modules/@nrwl/cli/bin/nx test</code></li><li><strong>Working directory</strong> &#8211; should be the path to your project folder (e.g. ~/projects/my-current-awesome-project)</li></ol></li><li>Click the debug icon near the running configuration name in the toolbar (Figure 4).</li></ol>



<p>That&#8217;s it! The debugger will stop in your</p>



<p>Note that you can set the node parameters to run tests for a certain lib or app by adding its name after <code>test</code> like this:</p>



<p class="has-text-align-center"><code>./node_modules/@nrwl/cli/bin/nx test distributed-cache</code></p>



<p>The above command will run the tests for the lib <code>distributed-cache</code>.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="246" height="236" src="/wp-content/uploads/2020/05/image.png" alt="" class="wp-image-370" srcset="/wp-content/uploads/2020/05/image.png 246w, /wp-content/uploads/2020/05/image.png 94w" sizes="auto, (max-width: 246px) 100vw, 246px" /><figcaption>Figure 1: Green circle with a V mark &#8211; the break point in webstorm on Mac. It is usually a red dot on windows.</figcaption></figure></div>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="502" height="1024" src="/wp-content/uploads/2020/05/image-1.png" alt="" class="wp-image-371" srcset="/wp-content/uploads/2020/05/image-1.png 502w, /wp-content/uploads/2020/05/image-1.png 147w, /wp-content/uploads/2020/05/image-1.png 44w, /wp-content/uploads/2020/05/image-1.png 724w" sizes="auto, (max-width: 502px) 100vw, 502px" /><figcaption>Figure 2:  The <code>Run</code> toolbar panel. The blue-highlighted option is Edit Configuration.</figcaption></figure></div>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="201" src="/wp-content/uploads/2020/05/image-2.png" alt="" class="wp-image-372" srcset="/wp-content/uploads/2020/05/image-2.png 1024w, /wp-content/uploads/2020/05/image-2.png 300w, /wp-content/uploads/2020/05/image-2.png 768w, /wp-content/uploads/2020/05/image-2.png 1536w, /wp-content/uploads/2020/05/image-2.png 2048w, /wp-content/uploads/2020/05/image-2.png 268w, /wp-content/uploads/2020/05/image-2.png 1280w, /wp-content/uploads/2020/05/image-2.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 3: A new Nodejs configuration example</figcaption></figure>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="33" src="/wp-content/uploads/2020/05/image-4.png" alt="" class="wp-image-375" srcset="/wp-content/uploads/2020/05/image-4.png 1024w, /wp-content/uploads/2020/05/image-4.png 300w, /wp-content/uploads/2020/05/image-4.png 768w, /wp-content/uploads/2020/05/image-4.png 1536w, /wp-content/uploads/2020/05/image-4.png 268w, /wp-content/uploads/2020/05/image-4.png 1676w, /wp-content/uploads/2020/05/image-4.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 4: The debug button</figcaption></figure>

