---
title: How to create a workspace generator as a library in Nx workspace?
slug: how-to-create-a-workspace-generator-in-nx-workspace
published: 2022-05-19T05:06:39
updated: 2022-05-19T06:51:41
author: Yonatan Kra
description: How to create an Nx generator? How to use it in your Nx workspace? How we converted a workspace generator into a publishable library? And how can boring be good for you? Nx is a powerful monorepo management tool. It helps you utilize one of the most powerful monorepo advantages (IMO) – standards. By standards [&hellip;]
categories:
  - name: nx
    slug: nx
    path: javascript/nx
tags:
  - javascript
  - nx
  - nx plugin
  - nx workspace
canonical: https://yonatankra.com/how-to-create-a-workspace-generator-in-nx-workspace/
comments: []
featuredImage: /wp-content/uploads/2022/05/workspace-generator.jpg
---

<p class="has-medium-font-size">How to create an Nx generator? How to use it in your Nx workspace? How we converted a workspace generator into a publishable library? And how can boring be good for you?</p>



<p>Nx is a powerful monorepo management tool. It helps you utilize one of the most powerful monorepo advantages (IMO) &#8211; standards. By standards I mean &#8211; no matter what you develop, or what team you are coming from, you are going to feel at home as a developer. </p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1b532ecc" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1b532ecc"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/how-to-create-a-workspace-generator-in-nx-workspace/#The_Standards_Advantage_or_Why_Boring_is_Good" >The Standards Advantage or: Why Boring is Good?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/how-to-create-a-workspace-generator-in-nx-workspace/#What_is_a_Workspace_Generator" >What is a Workspace Generator?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/how-to-create-a-workspace-generator-in-nx-workspace/#How_to_build_an_Nx_Plugin_inside_an_Nx_workspace" >How to build an Nx Plugin inside an Nx workspace?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/how-to-create-a-workspace-generator-in-nx-workspace/#How_to_write_the_an_Nx_plugin" >How to write the an Nx plugin?</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/how-to-create-a-workspace-generator-in-nx-workspace/#Writing_Nx_Plugin_E2E" >Writing Nx Plugin E2E</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/how-to-create-a-workspace-generator-in-nx-workspace/#Adding_a_generator_to_Nx_Plugin" >Adding a generator to Nx Plugin</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-7" href="/how-to-create-a-workspace-generator-in-nx-workspace/#Testing_your_Nx_plugin" >Testing your Nx plugin</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/how-to-create-a-workspace-generator-in-nx-workspace/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Standards_Advantage_or_Why_Boring_is_Good"></span>The Standards Advantage or: Why Boring is Good?<span class="ez-toc-section-end"></span></h2>



<p>In order to run a build process for a library, a developer can type this in the cli:</p>



<p><code>npx nx run myLibrary:build</code></p>



<p>If said developer wants to run the tests?</p>



<p><code>npx nx run myLibrary:test</code></p>



<p>But what if this developer wants to run the super-duper server?</p>



<p><code>npx nx run mySuperDuperServer:serve</code></p>



<p>And if I want to build it for production with docker goodies?</p>



<p><code>npx nx run mySuperDuperServer:build</code></p>



<p>And how to test said server?</p>



<p><code>npx nx run mySuperDuperServer:test</code></p>



<p>This is boring, right? You get to build, test and serve the same way.  Even running <code>e2e</code> tests look like:</p>



<p><code>npx nx run components:e2e</code></p>



<p>BORING!</p>



<p>But that&#8217;s the power of standards.  Let&#8217;s say a developer comes from the <code>components</code> team to the <code>super duper server</code> team? Easy peasy! No need to explain about infra, installation etc.  Just remember <code>npx</code>, <code>nx run</code>, the name of the component you are working on and what target you want to run (e2e/serve/build/test etc.).</p>



<p>Do you understand now why boring is good?  This is the power of standards.  Developers&#8217; productivity is so way better when they need to remember less troublesome things. Now we can focus on what matters most 🙂</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="What_is_a_Workspace_Generator"></span>What is a Workspace Generator?<span class="ez-toc-section-end"></span></h2>



<p>As with the build/test/e2e etc. executors, we also have generators. Generators are there to allow us to generate (well&#8230; dah!!!) new pieces of code from a template.</p>



<p>Let&#8217;s say you are creating ui components or an injectable service or angular modules&#8230; you don&#8217;t want to always write the same boilerplate all over again.  Or even worse&#8230; copy from a different folder and manually change the names of files, classes, tests, watnot&#8230;</p>



<p>And, to make it boring, we want to have the same syntax for everything:</p>



<p><code>npx nx generate @nrwl/angular:library</code></p>



<p>This will generate an angular library using a pre-built nrwl plugin for angular. What if we have our own needs and want our own generator? Enters Workspace Generators!</p>



<p>With workspace generators you can build your own generators and run them like this:</p>



<p><code>npx nx workspace-generator vivid-component my-component</code></p>



<p>This looks kind of the same but not exactly.  Why? Because <code>workspace generator</code> is a separate command. So you are running a different command that runs a generator that’s not part of a plugin. This breaks our boredom (e.g. we have another pattern to remember).  Why can&#8217;t we have:</p>



<p><code>npx nx g @vonage/nx-vivid:component my-component</code></p>



<p>Well&#8230; we can, only now it is not a workspace generator &#8211; it is an Nx plugin used inside our Nx Workspace!</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_build_an_Nx_Plugin_inside_an_Nx_workspace"></span>How to build an Nx Plugin inside an Nx workspace?<span class="ez-toc-section-end"></span></h2>



<p>That&#8217;s the easy part. Let&#8217;s do this.</p>



<ol class="wp-block-list"><li>Add the Nx plugin library to the workspace: <code>npm i -D @nrwl/nx-plugin</code></li><li>Generate a plugin library in the workspace: <code>npx nx g @nrwl/nx-plugin:plugin nx-vivid --import-path @vonage/nx-vivid</code></li></ol>



<p>These two steps result in a new library called <code>nx-vivid</code> which hold a stub generator and a stub executor. It also added an <code>e2e</code> test for the generator.  The <code>e2e</code> test helps you test file operations usually done by generators.</p>



<p>Now all that&#8217;s left is to actually write the plugin.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_write_the_an_Nx_plugin"></span>How to write the an Nx plugin?<span class="ez-toc-section-end"></span></h2>



<p>Just like writing any other code. Let&#8217;s first see what we want to do. In our repository, we have a <code>components</code> library that holds our UI components library.</p>



<p>All of our components live there inside the <code>src/lib</code> folder.</p>



<p>They all look kind of the same &#8211; or at least start the same:</p>



<ol class="wp-block-list"><li>An index entry file</li><li>A base class file</li><li>A template fille</li><li><code>scss</code> file</li><li>Readme file</li><li>UI test file</li></ol>



<p>Their content is also pretty repetitive. Because I&#8217;m a <code>test first</code> kinda guy, let&#8217;s start with the <code>e2e</code> tests.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Writing_Nx_Plugin_E2E"></span>Writing Nx Plugin E2E<span class="ez-toc-section-end"></span></h3>



<p><code>Nx</code> has lots of utilities to write and test plugins.  Hence, the tests are as simple as:</p>



<pre class="wp-block-code"><code>import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('nx-vivid e2e', () =&gt; {
  beforeAll(() =&gt; {
    ensureNxProject('@vonage/nx-vivid', 'dist/libs/nx-vivid');
  });

  afterAll(() =&gt; {
    runNxCommandAsync('reset');
  });

  describe('--directory', () =&gt; {
    it('should create src in the specified directory', async () =&gt; {
      const project = uniq('nx-vivid');
      await runNxCommandAsync(
        `generate @vonage/nx-vivid:component ${project}`
      );
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/index.ts`)
      ).not.toThrow();
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/ui.test.ts`)
      ).not.toThrow();
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/README.md`)
      ).not.toThrow();
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/${project}.ts`)
      ).not.toThrow();
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/${project}.template.ts`)
      ).not.toThrow();
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/${project}.spec.ts`)
      ).not.toThrow();
      expect(() =&gt;
        checkFilesExist(`libs/components/src/lib/${project}/${project}.scss`)
      ).not.toThrow();
    }, 120000);
  });
});</code></pre>



<p>Here&#8217;s what&#8217;s happening:</p>



<ol class="wp-block-list"><li>The code above starts a new Nx workspace (<code>ensureNxProject('@vonage/nx-vivid', 'dist/libs/nx-vivid');</code>). </li><li>It then runs the command we want:<br><code>await runNxCommandAsync(         generate @vonage/nx-vivid:component ${project}       );</code> . It is equivalent to running <code>npx nx generate @vonage/nx-vivid:component my-project</code>, and that is what we want!</li><li>After that it expects to have all the files generated in the library&#8217;s folder.</li></ol>



<p>Pretty simple!</p>



<p><a href="https://github.com/Vonage/vivid-3/pull/393/commits/a0dc62a0ab362b653d788aa771cecc15202c6645" data-type="URL" data-id="https://github.com/Vonage/vivid-3/pull/393/commits/a0dc62a0ab362b653d788aa771cecc15202c6645" target="_blank" rel="noreferrer noopener">Here&#8217;s the commit for that one</a></p>



<p>Can you guess how to run the e2e tests? Prepare your bored yawn: <code>npx nx run nx-vivid-e2e:e2e</code>. The tests fail because we didn&#8217;t setup the component&#8217;s generator yet!</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Adding_a_generator_to_Nx_Plugin"></span>Adding a generator to Nx Plugin<span class="ez-toc-section-end"></span></h3>



<p>A generator is composed of 3 main things:</p>



<ol class="wp-block-list"><li>Schema &#8211; the schema for the generator&#8217;s input</li><li>Template files &#8211; files with placeholders that will be copied and manipulated into a fully working library/app/component/whatever</li><li>The actual logic and its test file (in our case <code>index.ts</code> and <code>index.spec.ts</code>) file &#8211; where we tell what should go where.</li></ol>



<p>The schema is a <code>json</code> file along with an optional <code>d.ts</code> file if you want type checking in your logic file. </p>



<pre class="wp-block-code"><code>{
  "$schema": "http://json-schema.org/schema",
  "cli": "nx",
  "$id": "vivid-component",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Component name",
      "$default": {
        "$source": "argv",
        "index": 0
      }
    }
  },
  "required": &#91;"name"]
}</code></pre>



<p>This is how it looks like.  There are many types of properties and the <code>Nx</code> mechanism also allows you to ask the consumer questions (like use <code>express</code> or <code>nestjs</code>). You can read more about it in <a href="https://nx.dev/generators/generator-options" target="_blank" data-type="URL" data-id="https://nx.dev/generators/generator-options" rel="noreferrer noopener">the Nx documentation.</a></p>



<p>The template files are what you&#8217;d expect to see in the output &#8211; with placeholders.  For instance, you set <code>__fileName__</code> in the file and folder names as a placeholder for component related file names.  Inside the files you use tags like <code>{&lt;%= className %&gt;}</code> or <code>&lt;%= name %&gt;</code> as placeholders for dynamic properties.</p>



<p>Finally, the <code>logic</code> file binds them all. It exports an async function that is used when the generator is called:</p>



<pre class="wp-block-code"><code>import {
  Tree,
  formatFiles,
  names,
  joinPathFragments,
  getWorkspaceLayout,
  generateFiles, offsetFromRoot
} from '@nrwl/devkit';
import {VividComponentGeneratorOptions} from "./schema";
import {join} from "path";

export interface NormalizedSchema extends VividComponentGeneratorOptions {
  fileName: string;
  className: string;
  projectRoot: string;
}

function normalizeOptions(tree: Tree, options: VividComponentGeneratorOptions): NormalizedSchema {
  const projectDirectory = names(options.name).fileName;
  const className = names(options.name).className;

  const name = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const fileName = names(projectDirectory).fileName;

  const { libsDir, npmScope } = getWorkspaceLayout(tree);

  const projectRoot = joinPathFragments(libsDir, 'components/src/lib', projectDirectory);

  return {
    ...options,
    fileName,
    name,
    className,
    projectRoot
  };
}

function createFiles(tree: Tree, options: NormalizedSchema) {
  const {className, name, propertyName} = names(options.name);

  generateFiles(tree, join(__dirname, './files'), options.projectRoot, {
    ...options,
    dot: '.',
    className,
    name,
    propertyName,
    cliCommand: 'nx',
    strict: undefined,
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot)
  });
}

export default async function vividComponentGenerator(tree: Tree, schema: VividComponentGeneratorOptions) {
  const options = normalizeOptions(tree, schema);
  createFiles(tree, options);
  await formatFiles(tree);
}</code></pre>



<p>In the above example, the function <code>vividComponentGenerator</code> is exported.  It handles the options received from the user, creates the files and then runs <code>formatFiles</code> which, well&#8230; formats the files (linting mostly).</p>



<p>Finally, we need to tell the plugin that the generator exists and how to reach it. This is done in the main plugin&#8217;s <code>generators.json</code> file:</p>



<pre class="wp-block-code"><code>{
  "$schema": "http://json-schema.org/schema",
  "name": "nx-vivid",
  "version": "0.0.1",
  "generators": {
    "component": {
      "factory": "./src/generators/component/index",
      "schema": "./src/generators/component/schema.json",
      "description": "nx-vivid component generator"
    }
  }
}</code></pre>



<p>After adding all of these, the <code>e2e</code> tests pass.</p>



<p><a href="https://github.com/Vonage/vivid-3/pull/393/commits/300128442bf4025f1ce9a175bcdeb0998aa9aebd#diff-a90080815abcb99f4ed3dbf945b04e2975d952c14972536df29691a87196eb68" target="_blank" rel="noreferrer noopener">View the code in the commit of this part</a>.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Testing_your_Nx_plugin"></span>Testing your Nx plugin<span class="ez-toc-section-end"></span></h2>



<p>We saw the <code>e2e</code> tests for the plugin. Note that I&#8217;ve also written <code>unit tests</code> (in the <a href="https://github.com/Vonage/vivid-3/pull/393/commits/300128442bf4025f1ce9a175bcdeb0998aa9aebd#diff-a90080815abcb99f4ed3dbf945b04e2975d952c14972536df29691a87196eb68" data-type="URL" data-id="https://github.com/Vonage/vivid-3/pull/393/commits/300128442bf4025f1ce9a175bcdeb0998aa9aebd#diff-a90080815abcb99f4ed3dbf945b04e2975d952c14972536df29691a87196eb68" target="_blank" rel="noreferrer noopener">commit</a>). I actually write them before I write the actual code. While <a href="/5-tdd-lessons-when-writing-javascript-algorithm/" data-type="post" data-id="1283">TDD</a> is beyond the scope of this article, let&#8217;s talk about the tests of a plugin.</p>



<p>The unit tests in this case do the same thing the <code>e2e</code> tests do &#8211; they make sure the right files are generated when we give a certain input (e.g. the component&#8217;s name):</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist116359610" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-generator-unit-tests-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="generator-unit-tests.ts content, created by YonatanKra on 06:18PM on May 18, 2022."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="generator-unit-tests.ts">
        <tr>
          <td id="file-generator-unit-tests-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-generator-unit-tests-ts-LC1" class="blob-code blob-code-inner js-file-line">import {names, Tree} from &#39;@nrwl/devkit&#39;;</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-generator-unit-tests-ts-LC2" class="blob-code blob-code-inner js-file-line">import {createTreeWithEmptyWorkspace} from &#39;@nrwl/devkit/testing&#39;;</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-generator-unit-tests-ts-LC3" class="blob-code blob-code-inner js-file-line">import {VividComponentGeneratorOptions} from &#39;./schema&#39;;</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-generator-unit-tests-ts-LC4" class="blob-code blob-code-inner js-file-line">import vividComponentGenerator from &#39;./index&#39;;</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-generator-unit-tests-ts-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-generator-unit-tests-ts-LC6" class="blob-code blob-code-inner js-file-line">describe(`vivid component generator`, function () {</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-generator-unit-tests-ts-LC7" class="blob-code blob-code-inner js-file-line">	let tree: Tree;</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-generator-unit-tests-ts-LC8" class="blob-code blob-code-inner js-file-line">	const options: VividComponentGeneratorOptions = {</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-generator-unit-tests-ts-LC9" class="blob-code blob-code-inner js-file-line">		name: &#39;test-component&#39;</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-generator-unit-tests-ts-LC10" class="blob-code blob-code-inner js-file-line">	};</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-generator-unit-tests-ts-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-generator-unit-tests-ts-LC12" class="blob-code blob-code-inner js-file-line">	beforeEach(() =&gt; {</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-generator-unit-tests-ts-LC13" class="blob-code blob-code-inner js-file-line">		tree = createTreeWithEmptyWorkspace();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-generator-unit-tests-ts-LC14" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-generator-unit-tests-ts-LC15" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-generator-unit-tests-ts-LC16" class="blob-code blob-code-inner js-file-line">	it(`should generate files`, async function () {</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-generator-unit-tests-ts-LC17" class="blob-code blob-code-inner js-file-line">		const {fileName} = names(options.name);</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-generator-unit-tests-ts-LC18" class="blob-code blob-code-inner js-file-line">		await vividComponentGenerator(tree, options);</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-generator-unit-tests-ts-LC19" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-generator-unit-tests-ts-LC20" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-generator-unit-tests-ts-LC21" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/index.ts`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-generator-unit-tests-ts-LC22" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-generator-unit-tests-ts-LC23" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/README.md`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-generator-unit-tests-ts-LC24" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-generator-unit-tests-ts-LC25" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/ui.test.ts`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-generator-unit-tests-ts-LC26" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-generator-unit-tests-ts-LC27" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.ts`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-generator-unit-tests-ts-LC28" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-generator-unit-tests-ts-LC29" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.spec.ts`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-generator-unit-tests-ts-LC30" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-generator-unit-tests-ts-LC31" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.template.ts`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-generator-unit-tests-ts-LC32" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-generator-unit-tests-ts-LC33" class="blob-code blob-code-inner js-file-line">		expect(tree.exists(`libs/components/src/lib/${options.name}/${fileName}.scss`))</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-generator-unit-tests-ts-LC34" class="blob-code blob-code-inner js-file-line">			.toBeTruthy();</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-generator-unit-tests-ts-LC35" class="blob-code blob-code-inner js-file-line">	});</td>
        </tr>
        <tr>
          <td id="file-generator-unit-tests-ts-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-generator-unit-tests-ts-LC36" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/dcdca872ddd62ef04898ba68f89a3d45/raw/6765a526b935c14f7a3af4d322760172e4ec4de5/generator-unit-tests.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/dcdca872ddd62ef04898ba68f89a3d45#file-generator-unit-tests-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          generator-unit-tests.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div></figure>



<p>In the code snippet above, we use Nx devkit to generate a virtual filetree of our workspace. We then run the generator with the needed options. We expect the resulting tree to have the files from the template with the placeholders replaced.</p>



<p>The rule of thumb in tests is this: if you can cover the same thing with unit tests and E2E &#8211; prefer unit tests. They are much faster. As simple as that.</p>



<p>Why does Nx set us up with an E2E infrastructure for plugins then? While talking with <a href="https://twitter.com/EnderAgent" target="_blank" data-type="URL" data-id="https://twitter.com/EnderAgent" rel="noreferrer noopener">Craigory</a> from <a href="https://nrwl.io/" target="_blank" data-type="URL" data-id="https://nrwl.io/" rel="noreferrer noopener">Nrwl</a>, he gave quite a definite answer:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="83" src="/wp-content/uploads/2022/05/image.png" alt="Advice about NX workspace Testing by a Nrwlist:
&quot;Ideally, you should have some e2e test that generates an app with your custom executor and then runs the target that consumes it.
But if you aren't doing executors, they are much less useful&quot;" class="wp-image-1515" srcset="/wp-content/uploads/2022/05/image.png 1024w, /wp-content/uploads/2022/05/image.png 300w, /wp-content/uploads/2022/05/image.png 768w, /wp-content/uploads/2022/05/image.png 1536w, /wp-content/uploads/2022/05/image.png 268w, /wp-content/uploads/2022/05/image.png 1628w, /wp-content/uploads/2022/05/image.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /></figure></div>



<p>This answer is great for people who love rules of thumb:</p>



<ol class="wp-block-list"><li>It supports our rule of thumb for &#8220;more unit &#8211; less e2e&#8221;</li><li>I gives us another rule of thumb specific to Nx plugins &#8211; &#8220;e2e is for executors &#8211; unit is for generators&#8221;</li></ol>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Standards are important. They contribute to Developer Experience, scalability, agility and I probably forgot some benefits of standards.</p>



<p><code>Nx</code> allows you to utilize standards and not only that &#8211; its mechanism compels you to standardize your workspace.</p>



<p>We migrated from Lerna to Nx and bless the day.  Everything is standardized. Even custom generators, linters and others look the same for all developers.  A developer that works on the documentation uses the same command syntax as the developer working on the components or any other part.  Even the generator plugin itself has the same developer experience.</p>



<p>I didn&#8217;t mention the other benefits you can get like dependency graphs, dry run for almost everything, parallel execution, caching, cloud caching and much more.</p>



<p>Where do we go from here? Well &#8211; this generator is for generating an internal code snippet in our own library.  This was our first designs due to some build limitations.  We believe we overcome these limitations and intend to extract the components from the lib &#8211; so each component will live &#8220;alone&#8221;. </p>



<p>This means, our generator will generate full libraries for components instead of generating code snippets inside an existing library. Or better yet, we can compose a <code>component library</code> generator that will use our <code>component generator</code> under the hood.</p>



<p>Thanks a lot to <a href="https://twitter.com/EnderAgent" target="_blank" data-type="URL" data-id="https://twitter.com/EnderAgent" rel="noreferrer noopener">Craigory</a> from <a href="https://nrwl.io/" data-type="URL" data-id="https://nrwl.io/" target="_blank" rel="noreferrer noopener">Nrwl</a> for a great review and discussion!</p>



<p><em>Featured Photo by <a href="https://unsplash.com/@carlheyerdahl?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Carl Heyerdahl</a> on <a href="https://unsplash.com/s/photos/workspace-generator?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></em></p>

