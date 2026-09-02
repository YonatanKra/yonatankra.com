---
title: How we employed the new ECMAScript Module Support in typescript
slug: how-to-use-the-new-ecmascript-module-in-typescript
published: 2022-04-30T14:18:34
updated: 2022-05-07T07:23:55
author: Yonatan Kra
description: What is the new standard to serve both an ECMAScript Module (ESM) as well as Commonjs in the same package? How to use it? And how to make Jest and Playwright to work with it? When developing an npm package, there are many considerations one needs to take regarding consumption. These considerations change with time [&hellip;]
categories:
  - name: typescript
    slug: typescript
    path: javascript/typescript
  - name: Javascript
    slug: javascript
    path: javascript
  - name: jest
    slug: jest
    path: testing/jest
  - name: Playwright
    slug: playwright
    path: testing/playwright
tags:
  - es modules
  - jest
  - playwright
  - typescript
canonical: https://yonatankra.com/how-to-use-the-new-ecmascript-module-in-typescript/
comments:
  - author: Yinon
    date: 2022-05-10T15:25:12
    content: |
      <p>and here&#8217;s <a href="https://github.com/Vonage/vivid-3/pull/348" target="_blank" rel="noopener nofollow ugc">its PR</a></p>
---

<p class="has-medium-font-size">What is the new standard to serve both an ECMAScript Module (ESM) as well as Commonjs in the same package? How to use it? And how to make <code>Jest</code> and <code>Playwright</code> to work with it?</p>



<p>When developing an npm package, there are many considerations one needs to take regarding consumption.  These considerations change with time as more tools and more practices are added and as the language evolves.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b5553a3" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b5553a3"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-use-the-new-ecmascript-module-in-typescript/#Why_use_ECMAScript_modules_import_instead_of_CommonJS_require" >Why use ECMAScript modules (import) instead of CommonJS (require)?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-use-the-new-ecmascript-module-in-typescript/#A_new_ESM_Support_in_typescript" >A new ESM Support in typescript</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_use_nodenext_in_TypeScript" >How to use nodenext in TypeScript?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_exempt_files_from_the_type_generalization" >How to exempt files from the type generalization?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_specify_format_imports" >How to specify format imports?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_change_a_package_from_commonjs_to_module" >How to change a package from commonjs to module</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_make_Jest_work_with_type_module" >How to make Jest work with type: module?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_make_Playwright_work_with_type_module" >How to make Playwright work with type: module?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-9" href="/how-to-use-the-new-ecmascript-module-in-typescript/#How_to_solve_ReferenceError_dirname_is_not_defined" >How to solve ReferenceError: __dirname is not defined?</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-10" href="/how-to-use-the-new-ecmascript-module-in-typescript/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Why_use_ECMAScript_modules_import_instead_of_CommonJS_require"></span>Why use ECMAScript modules (import) instead of CommonJS (require)?<span class="ez-toc-section-end"></span></h2>



<p>The most obvious difference between ESM and CommonJS is the use of <code>import</code> and <code>export</code> vs the use of <code>require</code> and <code>module.exports</code>. But that is not all&#8230;</p>



<p>In regards to performance, with ESM <code>import</code> you can selectively load only the pieces you need. This can save you runtime memory or package size.</p>



<p>CommonJS (<code>require</code>) loads the modules synchronously. ESM (<code>import</code>), on the other hand, can be asynchronous, which allows for better performance multiple modules can be loaded concurrently.</p>



<p>Finally, it seems like the future is ESM, and the proposed solution in this article is an interim before CommonJS will become an obsolete method of requiring.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="A_new_ESM_Support_in_typescript"></span>A new ESM Support in typescript<span class="ez-toc-section-end"></span></h2>



<p>Recently, typescript (TS) announced the <code>nodenext</code> module support from version 4.7.x.  Essentially this means that consumers can now choose whether they want to consume a library with <code>require</code> or <code>import</code>.  But besides that, <code>nodenext</code> means that <code>TS</code> will employ <a href="https://nodejs.org/api/esm.html#resolution-algorithm" data-type="URL" data-id="https://nodejs.org/api/esm.html#resolution-algorithm" target="_blank" rel="noreferrer noopener"><code>Nodejs</code>&#8216;s most recent lookup strategy for (relative path) dependencies</a>.</p>



<p>For anyone following the Nodejs progress, this is nothing new. <a href="https://nodejs.org/api/esm.html#modules-ecmascript-modules" data-type="URL" data-id="https://nodejs.org/api/esm.html#modules-ecmascript-modules" target="_blank" rel="noreferrer noopener">ESM modules has been with us for a while now</a>.  In essence, it allows us to use the wonderful <code>import</code> syntax natively in <code>Nodejs</code> environment. </p>



<p>What is new is the official TS support of these features.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_use_nodenext_in_TypeScript"></span>How to use <code>nodenext</code> in TypeScript?<span class="ez-toc-section-end"></span></h2>



<p>The first step of using <code>nodenext</code> would be to set the <code>module</code> property in the <code>compilerOptions</code> to <code>nodenext</code>:</p>



<pre class="wp-block-code"><code>// tsconfig.json
{
    "compilerOptions": {
        "module": "nodenext",
    }
}</code></pre>



<p>Once that is set, TS will look for the closest <code>package.json</code> with a <code>type</code> property. The <code>type</code> property accepts <code>module</code> or <code>commonjs</code>.  When &#8220;type&#8221; value is &#8220;commonjs&#8221; (or not specified), files expected to be consumed by the commonJS way (&#8220;require&#8221;).</p>



<p>That being said, with TS we could use import even on commonJS mode. When we did that, it worked as follows:</p>



<ol class="wp-block-list"><li>You import a file without a extension &#8211; <code>import { cleanup } from '../utils/helpers';</code>.</li><li> Typescript changes the import depending on your <code>target</code> and <code>module</code> definition in <code>tsconfig</code> (<a href="https://www.typescriptlang.org/tsconfig/#module" data-type="URL" data-id="https://www.typescriptlang.org/tsconfig/#module" target="_blank" rel="noreferrer noopener">see the typescript documentation</a>)</li></ol>



<p>In <code>module</code> mode, TS will throw an error for files without a extension so you will have to import like this: <code>import { cleanup } from '../utils/helpers.js';</code></p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_exempt_files_from_the_type_generalization"></span>How to exempt files from the <code>type</code> generalization?<span class="ez-toc-section-end"></span></h3>



<p>You can also exempt files from this behavior by using special extensions. <code>.mts</code> and <code>.cts</code> are the TS equivalents of <code>.cjs</code> and <code>.mjs</code>.  When seeing these extensions, TS handles them either as a module (<code>.mts</code>) or as commonjs (<code>.cts</code>). It does that disregarding the definition set in the package.json&#8217;s <code>type</code> property. </p>



<p>This is an opt-in feature that helps you override the general configuration for a specific file.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_specify_format_imports"></span>How to specify format imports?<span class="ez-toc-section-end"></span></h3>



<p>Nodejs allows us to specify different files for <code>import</code> and <code>require</code>. Historically, we had only the <code>main</code> property.  Now we can have more control:</p>



<pre class="wp-block-code"><code>{
  "name": "@vonage/vivid",
  "version": "3.0.0-next.4",
  "type": "module",
  "exports": {
    "import": "./index.js",
    "require": "./index.cjs.js"
  },
  "main": "./index.js"
}</code></pre>



<p>In the example above, we set the <code>type</code> to <code>module</code> and we also set <code>main</code> for a default behavior.  The new addition here is <code>exports</code>.  It allows us to define what file <code>nodejs</code> will look for when our consumers use <code>import</code> or <code>require</code>.  Pretty neat.</p>



<p>There are a few more differences between <code>module</code> and <code>commonjs</code> and you can read about them in the <a href="https://nodejs.org/api/esm.html#differences-between-es-modules-and-commonjs" target="_blank" data-type="URL" data-id="https://nodejs.org/api/esm.html#differences-between-es-modules-and-commonjs" rel="noreferrer noopener">nodejs documentation</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_change_a_package_from_commonjs_to_module"></span>How to change a package from <code>commonjs</code> to <code>module</code><span class="ez-toc-section-end"></span></h2>



<p>The change is seemingly simple. Just head over to the <code>package.json</code> and add <code>"type": "module"</code> property. So we did just that:</p>



<pre class="wp-block-code"><code>{
  "name": "@vonage/vivid",
  "version": "3.0.0-next.4",
  "type": "module",
  "exports": {
    "import": "./index.js"
  }
}</code></pre>



<p>This is our simple <code>package.json</code> for the web components package. When we now try to build, everything works fine. This works because our typescript version is not yet 4.7.x and we do not yet use <code>nodenext</code> in our compiler.  If we did that, it will break our build process because our imports are still in the &#8220;old&#8221; style:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="30" src="/wp-content/uploads/2022/04/image-7.png" alt="" class="wp-image-1458" srcset="/wp-content/uploads/2022/04/image-7.png 936w, /wp-content/uploads/2022/04/image-7.png 300w, /wp-content/uploads/2022/04/image-7.png 768w, /wp-content/uploads/2022/04/image-7.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A named import with a relative path. The <code>design-system</code> module is missing the file type extension. This will fail in <code>module</code> mode with <code>ts &gt; 4.7.x</code> with <code>nodenext</code> configuration.</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_make_Jest_work_with_type_module"></span>How to make <code>Jest</code> work with <code>type: module</code>?<span class="ez-toc-section-end"></span></h2>



<p><code>type: module</code> is a NodeJS definition. It is defined like this:</p>



<figure class="wp-block-pullquote"><blockquote><p>The &#8220;type&#8221; field defines the module format that Node.js uses for all .js files that have that package.json file as their nearest parent.</p><p>Files ending with .js are loaded as ES modules when the nearest parent package.json file contains a top-level field &#8220;type&#8221; with a value of &#8220;module&#8221;.</p><p>If the nearest parent package.json lacks a &#8220;type&#8221; field, or contains &#8220;type&#8221;: &#8220;commonjs&#8221;, .js files are treated as CommonJS. If the volume root is reached and no package.json is found, .js files are treated as CommonJS.</p><cite>Taken from https://nodejs.org/api/packages.html</cite></blockquote></figure>



<p>When running our unit tests, we get the following error:</p>



<pre class="wp-block-code"><code>module is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '/vivid-3/libs/components/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.</code></pre>



<p>The problem arise because <code>jest</code> is trying to get the <code>jest.config.js</code> file using <code>Nodejs</code> resolver. Because the <code>type</code> we set is <code>module</code>, node is trying to use <code>import</code>, but the file is in <code>commonjs</code> format. We could set it as <code>cjs</code>, and solve this issue. Here&#8217;s <a href="https://github.com/Vonage/vivid-3/commit/cb2ab95045046f53652dea3f8a5dd09cd1f4f9b0" data-type="URL" data-id="https://github.com/Vonage/vivid-3/commit/cb2ab95045046f53652dea3f8a5dd09cd1f4f9b0" target="_blank" rel="noreferrer noopener">the commit for this one</a>.</p>



<p>Another solution would be to change <code>jest.config.js</code> to <code>jest.config.json</code>. This will also require us to change the file to be a valid JSON.  More change is less desirable.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_make_Playwright_work_with_type_module"></span>How to make Playwright work with <code>type: module</code>?<span class="ez-toc-section-end"></span></h2>



<p>Now let&#8217;s try to run our ui-tests (we use playwright). When trying to run it, we get the following error:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="71" src="/wp-content/uploads/2022/04/image-8.png" alt="" class="wp-image-1459" srcset="/wp-content/uploads/2022/04/image-8.png 1024w, /wp-content/uploads/2022/04/image-8.png 300w, /wp-content/uploads/2022/04/image-8.png 768w, /wp-content/uploads/2022/04/image-8.png 1536w, /wp-content/uploads/2022/04/image-8.png 2048w, /wp-content/uploads/2022/04/image-8.png 268w, /wp-content/uploads/2022/04/image-8.png 1280w, /wp-content/uploads/2022/04/image-8.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The error when running our <code>playwright</code> ui-tests</figcaption></figure></div>



<p>The error is actually this:  </p>



<pre class="wp-block-preformatted has-black-color has-text-color">SyntaxError: The requested module '@playwright/test' does not provide an export named 'PlaywrightTestConfig'</pre>



<p>This happens because of how <code>playwright/test</code> exposes its types.  Because we are just using <code>PlaywrightTestConfig</code> as a type, an easy fix for this issue is to import it as a type:</p>



<pre class="wp-block-code"><code>import type { PlaywrightTestConfig } from '@playwright/test';</code></pre>



<p>Just by adding <code>type</code> after <code>import</code> tells TS this should not be added to the output file.  It then just resolves the type for type checking and the error is resolved.</p>



<p>This error repeated itself throughout our test files &#8211; so we made the adjustments accordingly in all of the files (<a href="https://github.com/Vonage/vivid-3/commit/87b8a027f1c9de1c247640880870cfb23bbd0a58" target="_blank" data-type="URL" data-id="https://github.com/Vonage/vivid-3/commit/87b8a027f1c9de1c247640880870cfb23bbd0a58" rel="noreferrer noopener">see commit</a>).</p>



<p>Now when we run our tests, we stumble into a new difference between <code>module</code> and <code>commonjs</code>:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="84" src="/wp-content/uploads/2022/04/image-9.png" alt="" class="wp-image-1460" srcset="/wp-content/uploads/2022/04/image-9.png 1024w, /wp-content/uploads/2022/04/image-9.png 300w, /wp-content/uploads/2022/04/image-9.png 768w, /wp-content/uploads/2022/04/image-9.png 1536w, /wp-content/uploads/2022/04/image-9.png 268w, /wp-content/uploads/2022/04/image-9.png 2006w, /wp-content/uploads/2022/04/image-9.png 1280w, /wp-content/uploads/2022/04/image-9.png 1920w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><code>ReferenceError: __dirname is not defined</code></figcaption></figure></div>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="How_to_solve_ReferenceError_dirname_is_not_defined"></span>How to solve <code>ReferenceError: __dirname is not defined</code>?<span class="ez-toc-section-end"></span></h3>



<p><code>__dirname</code> does not exist when you use <code>type: module</code>. Same goes for <code>process</code>, <code>require</code>, <code>__filename</code> and <a href="https://nodejs.org/api/modules.html#the-module-scope" data-type="URL" data-id="https://nodejs.org/api/modules.html#the-module-scope" target="_blank" rel="noreferrer noopener">other globals</a>. </p>



<p>The ultimate solution to this is to use <code>fileFromUrl(new URL('.', import.meta.url))</code> instead.  </p>



<p>Note that you can also use the <code>Url</code> directly when using <code>fs</code>:</p>



<p class="has-text-align-center"><code>fs.readFile(new Url('./file.relative.to.script', import.meta.url))</code></p>



<p>Now our package is ready for the change to <code>nodenext</code>. You can <a href="https://github.com/Vonage/vivid-3/pull/368/commits/3d157dd5c9f0fc486a101f9a9911adfb30d8573e" target="_blank" data-type="URL" data-id="https://github.com/Vonage/vivid-3/pull/368/commits/3d157dd5c9f0fc486a101f9a9911adfb30d8573e" rel="noreferrer noopener">see the commit here</a>.</p>



<p>Thanks go to <a href="https://twitter.com/bradleymeck" target="_blank" data-type="URL" data-id="https://twitter.com/bradleymeck" rel="noreferrer noopener">@bradleymeck</a> and <a href="https://twitter.com/jackworks_asref" target="_blank" data-type="URL" data-id="https://twitter.com/jackworks_asref" rel="noreferrer noopener">@jackworks_asref</a> for <a href="https://twitter.com/jackworks_asref/status/1461721295075233796" target="_blank" data-type="URL" data-id="https://twitter.com/jackworks_asref/status/1461721295075233796" rel="noreferrer noopener">pointing this out</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>While developing our design system ui components <a href="https://github.com/Vonage/vivid-3/" target="_blank" rel="noreferrer noopener">Vivid</a>, we gained a lot of knowledge and experience regarding types of consumers. Our consumers vary from Vanilla JS consumers to the top notch of today&#8217;s frontend frameworks, bundlers and transpilers.</p>



<p>While applying new techniques that allow consumers to consume our package more flexibly, we sometimes need to change our code or infrastructure a bit. We would like to allow users to not only fetch the package &#8211; but also be able to use type check, use tree shaking and other capabilities that users expect from modern bundling and transpiling methods.</p>



<p>You can view the typescript announcement regarding this new API <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#ecmascript-module-support-in-node-js" target="_blank" data-type="URL" data-id="https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#ecmascript-module-support-in-node-js" rel="noreferrer noopener">here</a>.</p>



<p>You can view <a href="https://github.com/Vonage/vivid-3/tree/type-module-blog-demo" data-type="URL" data-id="https://github.com/Vonage/vivid-3/tree/type-module-blog-demo" target="_blank" rel="noreferrer noopener">the changes demo branch</a> and play with it yourself to see the errors and fixes.</p>



<p><em>Thanks a lot to&nbsp;<a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener">Yuval Bar Levi</a>, <em><a href="https://www.linkedin.com/in/miki-stanger-153bb365/" target="_blank" rel="noreferrer noopener">Miki Ezra Stanger</a></em>&nbsp;and <a href="https://www.linkedin.com/in/yinonov/" target="_blank" rel="noreferrer noopener">Yinon Oved</a>&nbsp;</em> <em>for the kind and thorough review of this article</em></p>



<p><em>Featured Photo by <a href="https://unsplash.com/@roadtripwithraj?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Road Trip with Raj</a> on <a href="https://unsplash.com/s/photos/spiderman?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></em></p>

