---
title: "GraphQL Alternative: GraphQL vs. AskQL"
slug: on-covid-19-graphql-and-askql
published: 2020-10-24T12:10:20
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: "How does AskQL differ from GraphQL? After writing about AskQL and how to use AskQL with nodejs, the obvious question that repeat itself was: How does it differ from GraphQL? In this article I will try to show the main benefits of AskQL by converting a simple Covid-19 GraphQL project into AskQL. The Project The [&hellip;]"
categories:
  - name: AskQL
    slug: askql
    path: askql
  - name: GraphQL
    slug: graphql
    path: graphql
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - AskQL
  - covid-19
  - GraphQL
  - javascript
  - nodejs
canonical: https://yonatankra.com/on-covid-19-graphql-and-askql/
comments: []
featuredImage: /wp-content/uploads/2020/10/graphQL-covid-askQL-removebg-preview.png
---

<p class="has-medium-font-size">How does AskQL differ from GraphQL? </p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="283" src="/wp-content/uploads/2020/10/image-6.png" alt="" class="wp-image-534" srcset="/wp-content/uploads/2020/10/image-6.png 665w, /wp-content/uploads/2020/10/image-6.png 300w, /wp-content/uploads/2020/10/image-6.png 204w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Efi Shtain&#8217;s question was repeated in various forums</figcaption></figure>



<p>After writing <a href="/introduction-to-askql/">about AskQL</a> and <a href="/askql-nodejs-quickstart/">how to use AskQL with nodejs</a>, the obvious question that repeat itself was: How does it differ from GraphQL?</p>



<p>In this article I will try to show the main benefits of AskQL by converting a simple Covid-19 GraphQL project into AskQL.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1d6cd04d" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1d6cd04d"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/on-covid-19-graphql-and-askql/#The_Project" >The Project</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/on-covid-19-graphql-and-askql/#The_GraphQL_Server" >The GraphQL Server</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-3" href="/on-covid-19-graphql-and-askql/#GET_overall_COVID-19_stats" >GET&nbsp;overall COVID-19 stats</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-4" href="/on-covid-19-graphql-and-askql/#GET_statewise_COVID-19_stats" >GET&nbsp;statewise COVID-19 stats</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-5" href="/on-covid-19-graphql-and-askql/#GET_datewise_COVID-19_stats" >GET&nbsp;datewise COVID-19 stats</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/on-covid-19-graphql-and-askql/#The_AskQL_Server" >The AskQL Server</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-7" href="/on-covid-19-graphql-and-askql/#AskQL_Resolvers" >AskQL Resolvers</a></li></ul></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-8" href="/on-covid-19-graphql-and-askql/#The_Big_Deal" >The Big Deal</a><ul class='ez-toc-list-level-3' ><li class='ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-9" href="/on-covid-19-graphql-and-askql/#No_need_to_deploy_a_new_server_version" >No need to deploy a new server version</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-10" href="/on-covid-19-graphql-and-askql/#Access_to_new_resources" >Access to new resources</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-11" href="/on-covid-19-graphql-and-askql/#Why_no_just_query_from_the_client" >Why no just query from the client?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-12" href="/on-covid-19-graphql-and-askql/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Project"></span>The Project<span class="ez-toc-section-end"></span></h2>



<p>The project is a small Covid-19 api server powered by GraphQL. Here&#8217;s the original repository:</p>



<p><a href="https://github.com/vinitshahdeo/covid19api" target="_blank" rel="noreferrer noopener">https://github.com/vinitshahdeo/covid19api</a> by <a href="https://www.eatmy.news/2020/06/code-like-you-eat-i-mean-code-daily-as.html" target="_blank" rel="noreferrer noopener">Vinit Shahdeo</a></p>



<p>This repository sends some queries to an <a rel="noreferrer noopener" href="https://api.covid19india.org/data.json" target="_blank">open covid-19 api</a> and returns them to the client. </p>



<p>I&#8217;ve <a rel="noreferrer noopener" href="https://github.com/YonatanKra/covid19api" target="_blank">forked the repository</a> and added a simple client to it. Let&#8217;s look at its code.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_GraphQL_Server"></span>The GraphQL Server<span class="ez-toc-section-end"></span></h3>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106060439" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-server-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="server.js content, created by YonatanKra on 12:56PM on October 23, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="server.js">
        <tr>
          <td id="file-server-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-server-js-LC1" class="blob-code blob-code-inner js-file-line">const express = require(&#39;express&#39;);</td>
        </tr>
        <tr>
          <td id="file-server-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-server-js-LC2" class="blob-code blob-code-inner js-file-line">const graphqlHTTP = require(&#39;express-graphql&#39;);</td>
        </tr>
        <tr>
          <td id="file-server-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-server-js-LC3" class="blob-code blob-code-inner js-file-line">const schema = require(&#39;./schema&#39;);</td>
        </tr>
        <tr>
          <td id="file-server-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-server-js-LC4" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-server-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-server-js-LC5" class="blob-code blob-code-inner js-file-line">const app = express();</td>
        </tr>
        <tr>
          <td id="file-server-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-server-js-LC6" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-server-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-server-js-LC7" class="blob-code blob-code-inner js-file-line">app.use(express.static(&#39;public&#39;));</td>
        </tr>
        <tr>
          <td id="file-server-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-server-js-LC8" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-server-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-server-js-LC9" class="blob-code blob-code-inner js-file-line">app.use(</td>
        </tr>
        <tr>
          <td id="file-server-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-server-js-LC10" class="blob-code blob-code-inner js-file-line">  &#39;/graphql&#39;,</td>
        </tr>
        <tr>
          <td id="file-server-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-server-js-LC11" class="blob-code blob-code-inner js-file-line">  graphqlHTTP({</td>
        </tr>
        <tr>
          <td id="file-server-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-server-js-LC12" class="blob-code blob-code-inner js-file-line">    schema,</td>
        </tr>
        <tr>
          <td id="file-server-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-server-js-LC13" class="blob-code blob-code-inner js-file-line">    graphiql: true,</td>
        </tr>
        <tr>
          <td id="file-server-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-server-js-LC14" class="blob-code blob-code-inner js-file-line">  }),</td>
        </tr>
        <tr>
          <td id="file-server-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-server-js-LC15" class="blob-code blob-code-inner js-file-line">);</td>
        </tr>
        <tr>
          <td id="file-server-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-server-js-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-server-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-server-js-LC17" class="blob-code blob-code-inner js-file-line">app.listen(8081);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/d62e88df79bbe5dda632d57dbf2163f4/raw/c1a18bcea0ee7e813a5bb1af8c4f242ed72af14e/server.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/d62e88df79bbe5dda632d57dbf2163f4#file-server-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          server.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption><strong>Code snippet #1</strong>: the GraphQL powered server main file</figcaption></figure>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-flow wp-block-group-is-layout-flow">
<p><strong>Code snippet #1</strong> shows the GraphQL server setup. It sets up the client (line 7). It then sets up a GraphQL endpoint via the GraphQL express middleware (line 9).</p>



<p>By going to <a rel="noreferrer noopener" href="http://localhost:8081" target="_blank">http://localhost:8081</a>, you can actually get to the UI that is connected to the GraphQL server (Figure 1).</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="415" src="/wp-content/uploads/2020/10/image-7.png" alt="" class="wp-image-538" srcset="/wp-content/uploads/2020/10/image-7.png 935w, /wp-content/uploads/2020/10/image-7.png 300w, /wp-content/uploads/2020/10/image-7.png 768w, /wp-content/uploads/2020/10/image-7.png 139w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 1</strong>: the GraphQL query UI. Just enter a valid query and get the results back.</figcaption></figure>



<p>The actual GraphQL magic happens in the <code>schema.js</code> file (Code snippet #2).</p>
</div></div>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106060571" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-schema-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="schema.js content, created by YonatanKra on 01:03PM on October 23, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="schema.js">
        <tr>
          <td id="file-schema-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-schema-js-LC1" class="blob-code blob-code-inner js-file-line">const axios = require(&#39;axios&#39;).default;</td>
        </tr>
        <tr>
          <td id="file-schema-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-schema-js-LC2" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-schema-js-LC3" class="blob-code blob-code-inner js-file-line">const {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-schema-js-LC4" class="blob-code blob-code-inner js-file-line">    GraphQLSchema,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-schema-js-LC5" class="blob-code blob-code-inner js-file-line">    GraphQLString,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-schema-js-LC6" class="blob-code blob-code-inner js-file-line">    GraphQLObjectType,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-schema-js-LC7" class="blob-code blob-code-inner js-file-line">    GraphQLList,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-schema-js-LC8" class="blob-code blob-code-inner js-file-line">    GraphQLInt</td>
        </tr>
        <tr>
          <td id="file-schema-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-schema-js-LC9" class="blob-code blob-code-inner js-file-line">} = require(&#39;graphql&#39;);</td>
        </tr>
        <tr>
          <td id="file-schema-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-schema-js-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-schema-js-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-schema-js-LC12" class="blob-code blob-code-inner js-file-line">const CovidDataType = new GraphQLObjectType({</td>
        </tr>
        <tr>
          <td id="file-schema-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-schema-js-LC13" class="blob-code blob-code-inner js-file-line">    name: &#39;CovidStats&#39;,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-schema-js-LC14" class="blob-code blob-code-inner js-file-line">    fields: () =&gt; ({</td>
        </tr>
        <tr>
          <td id="file-schema-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-schema-js-LC15" class="blob-code blob-code-inner js-file-line">        active: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-schema-js-LC16" class="blob-code blob-code-inner js-file-line">            type: GraphQLInt</td>
        </tr>
        <tr>
          <td id="file-schema-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-schema-js-LC17" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-schema-js-LC18" class="blob-code blob-code-inner js-file-line">        confirmed: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-schema-js-LC19" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-schema-js-LC20" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-schema-js-LC21" class="blob-code blob-code-inner js-file-line">        deaths: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-schema-js-LC22" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-schema-js-LC23" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-schema-js-LC24" class="blob-code blob-code-inner js-file-line">        recovered: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-schema-js-LC25" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-schema-js-LC26" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-schema-js-LC27" class="blob-code blob-code-inner js-file-line">    })</td>
        </tr>
        <tr>
          <td id="file-schema-js-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-schema-js-LC28" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-schema-js-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-schema-js-LC29" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-schema-js-LC30" class="blob-code blob-code-inner js-file-line">const StateCovidDataType = new GraphQLObjectType({</td>
        </tr>
        <tr>
          <td id="file-schema-js-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-schema-js-LC31" class="blob-code blob-code-inner js-file-line">    name: &#39;statewise&#39;,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-schema-js-LC32" class="blob-code blob-code-inner js-file-line">    fields: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-schema-js-LC33" class="blob-code blob-code-inner js-file-line">        state: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-schema-js-LC34" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-schema-js-LC35" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-schema-js-LC36" class="blob-code blob-code-inner js-file-line">        active: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-schema-js-LC37" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-schema-js-LC38" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-schema-js-LC39" class="blob-code blob-code-inner js-file-line">        confirmed: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-schema-js-LC40" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-schema-js-LC41" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-schema-js-LC42" class="blob-code blob-code-inner js-file-line">        deaths: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-schema-js-LC43" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-schema-js-LC44" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-schema-js-LC45" class="blob-code blob-code-inner js-file-line">        recovered: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-schema-js-LC46" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-schema-js-LC47" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-schema-js-LC48" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-schema-js-LC49" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-schema-js-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-schema-js-LC50" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-schema-js-LC51" class="blob-code blob-code-inner js-file-line">const DailyCovidDataType = new GraphQLObjectType({</td>
        </tr>
        <tr>
          <td id="file-schema-js-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-schema-js-LC52" class="blob-code blob-code-inner js-file-line">    name: &#39;daily&#39;,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-schema-js-LC53" class="blob-code blob-code-inner js-file-line">    fields: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-schema-js-LC54" class="blob-code blob-code-inner js-file-line">        date: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-schema-js-LC55" class="blob-code blob-code-inner js-file-line">            type: GraphQLString</td>
        </tr>
        <tr>
          <td id="file-schema-js-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-schema-js-LC56" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-schema-js-LC57" class="blob-code blob-code-inner js-file-line">        dailyconfirmed: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-schema-js-LC58" class="blob-code blob-code-inner js-file-line">            type: GraphQLInt</td>
        </tr>
        <tr>
          <td id="file-schema-js-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-schema-js-LC59" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-schema-js-LC60" class="blob-code blob-code-inner js-file-line">        dailydeceased: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-schema-js-LC61" class="blob-code blob-code-inner js-file-line">            type: GraphQLInt</td>
        </tr>
        <tr>
          <td id="file-schema-js-L62" class="blob-num js-line-number js-blob-rnum" data-line-number="62"></td>
          <td id="file-schema-js-LC62" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L63" class="blob-num js-line-number js-blob-rnum" data-line-number="63"></td>
          <td id="file-schema-js-LC63" class="blob-code blob-code-inner js-file-line">        dailyrecovered: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L64" class="blob-num js-line-number js-blob-rnum" data-line-number="64"></td>
          <td id="file-schema-js-LC64" class="blob-code blob-code-inner js-file-line">            type: GraphQLInt</td>
        </tr>
        <tr>
          <td id="file-schema-js-L65" class="blob-num js-line-number js-blob-rnum" data-line-number="65"></td>
          <td id="file-schema-js-LC65" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L66" class="blob-num js-line-number js-blob-rnum" data-line-number="66"></td>
          <td id="file-schema-js-LC66" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L67" class="blob-num js-line-number js-blob-rnum" data-line-number="67"></td>
          <td id="file-schema-js-LC67" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-schema-js-L68" class="blob-num js-line-number js-blob-rnum" data-line-number="68"></td>
          <td id="file-schema-js-LC68" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L69" class="blob-num js-line-number js-blob-rnum" data-line-number="69"></td>
          <td id="file-schema-js-LC69" class="blob-code blob-code-inner js-file-line">/**</td>
        </tr>
        <tr>
          <td id="file-schema-js-L70" class="blob-num js-line-number js-blob-rnum" data-line-number="70"></td>
          <td id="file-schema-js-LC70" class="blob-code blob-code-inner js-file-line"> * Total data</td>
        </tr>
        <tr>
          <td id="file-schema-js-L71" class="blob-num js-line-number js-blob-rnum" data-line-number="71"></td>
          <td id="file-schema-js-LC71" class="blob-code blob-code-inner js-file-line"> */</td>
        </tr>
        <tr>
          <td id="file-schema-js-L72" class="blob-num js-line-number js-blob-rnum" data-line-number="72"></td>
          <td id="file-schema-js-LC72" class="blob-code blob-code-inner js-file-line">const RootQuery = new GraphQLObjectType({</td>
        </tr>
        <tr>
          <td id="file-schema-js-L73" class="blob-num js-line-number js-blob-rnum" data-line-number="73"></td>
          <td id="file-schema-js-LC73" class="blob-code blob-code-inner js-file-line">    name: &#39;RootQueryType&#39;,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L74" class="blob-num js-line-number js-blob-rnum" data-line-number="74"></td>
          <td id="file-schema-js-LC74" class="blob-code blob-code-inner js-file-line">    fields: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L75" class="blob-num js-line-number js-blob-rnum" data-line-number="75"></td>
          <td id="file-schema-js-LC75" class="blob-code blob-code-inner js-file-line">        total: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L76" class="blob-num js-line-number js-blob-rnum" data-line-number="76"></td>
          <td id="file-schema-js-LC76" class="blob-code blob-code-inner js-file-line">            type: CovidDataType,</td>
        </tr>
        <tr>
          <td id="file-schema-js-L77" class="blob-num js-line-number js-blob-rnum" data-line-number="77"></td>
          <td id="file-schema-js-LC77" class="blob-code blob-code-inner js-file-line">            async resolve() {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L78" class="blob-num js-line-number js-blob-rnum" data-line-number="78"></td>
          <td id="file-schema-js-LC78" class="blob-code blob-code-inner js-file-line">                const data = await axios.get(&#39;https://api.covid19india.org/data.json&#39;)</td>
        </tr>
        <tr>
          <td id="file-schema-js-L79" class="blob-num js-line-number js-blob-rnum" data-line-number="79"></td>
          <td id="file-schema-js-LC79" class="blob-code blob-code-inner js-file-line">                    .then(res =&gt; res.data.statewise[0]);</td>
        </tr>
        <tr>
          <td id="file-schema-js-L80" class="blob-num js-line-number js-blob-rnum" data-line-number="80"></td>
          <td id="file-schema-js-LC80" class="blob-code blob-code-inner js-file-line">                return data;</td>
        </tr>
        <tr>
          <td id="file-schema-js-L81" class="blob-num js-line-number js-blob-rnum" data-line-number="81"></td>
          <td id="file-schema-js-LC81" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L82" class="blob-num js-line-number js-blob-rnum" data-line-number="82"></td>
          <td id="file-schema-js-LC82" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L83" class="blob-num js-line-number js-blob-rnum" data-line-number="83"></td>
          <td id="file-schema-js-LC83" class="blob-code blob-code-inner js-file-line">        statewise: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L84" class="blob-num js-line-number js-blob-rnum" data-line-number="84"></td>
          <td id="file-schema-js-LC84" class="blob-code blob-code-inner js-file-line">            type: new GraphQLList(StateCovidDataType),</td>
        </tr>
        <tr>
          <td id="file-schema-js-L85" class="blob-num js-line-number js-blob-rnum" data-line-number="85"></td>
          <td id="file-schema-js-LC85" class="blob-code blob-code-inner js-file-line">            async resolve() {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L86" class="blob-num js-line-number js-blob-rnum" data-line-number="86"></td>
          <td id="file-schema-js-LC86" class="blob-code blob-code-inner js-file-line">                const data = await axios.get(&#39;https://api.covid19india.org/data.json&#39;)</td>
        </tr>
        <tr>
          <td id="file-schema-js-L87" class="blob-num js-line-number js-blob-rnum" data-line-number="87"></td>
          <td id="file-schema-js-LC87" class="blob-code blob-code-inner js-file-line">                    .then(res =&gt; res.data.statewise.splice(1));</td>
        </tr>
        <tr>
          <td id="file-schema-js-L88" class="blob-num js-line-number js-blob-rnum" data-line-number="88"></td>
          <td id="file-schema-js-LC88" class="blob-code blob-code-inner js-file-line">                return data;</td>
        </tr>
        <tr>
          <td id="file-schema-js-L89" class="blob-num js-line-number js-blob-rnum" data-line-number="89"></td>
          <td id="file-schema-js-LC89" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L90" class="blob-num js-line-number js-blob-rnum" data-line-number="90"></td>
          <td id="file-schema-js-LC90" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-schema-js-L91" class="blob-num js-line-number js-blob-rnum" data-line-number="91"></td>
          <td id="file-schema-js-LC91" class="blob-code blob-code-inner js-file-line">        datewise: {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L92" class="blob-num js-line-number js-blob-rnum" data-line-number="92"></td>
          <td id="file-schema-js-LC92" class="blob-code blob-code-inner js-file-line">            type: new GraphQLList(DailyCovidDataType),</td>
        </tr>
        <tr>
          <td id="file-schema-js-L93" class="blob-num js-line-number js-blob-rnum" data-line-number="93"></td>
          <td id="file-schema-js-LC93" class="blob-code blob-code-inner js-file-line">            async resolve() {</td>
        </tr>
        <tr>
          <td id="file-schema-js-L94" class="blob-num js-line-number js-blob-rnum" data-line-number="94"></td>
          <td id="file-schema-js-LC94" class="blob-code blob-code-inner js-file-line">                const data = await axios.get(&#39;https://api.covid19india.org/data.json&#39;)</td>
        </tr>
        <tr>
          <td id="file-schema-js-L95" class="blob-num js-line-number js-blob-rnum" data-line-number="95"></td>
          <td id="file-schema-js-LC95" class="blob-code blob-code-inner js-file-line">                    .then(res =&gt; res.data.cases_time_series);</td>
        </tr>
        <tr>
          <td id="file-schema-js-L96" class="blob-num js-line-number js-blob-rnum" data-line-number="96"></td>
          <td id="file-schema-js-LC96" class="blob-code blob-code-inner js-file-line">                return data;</td>
        </tr>
        <tr>
          <td id="file-schema-js-L97" class="blob-num js-line-number js-blob-rnum" data-line-number="97"></td>
          <td id="file-schema-js-LC97" class="blob-code blob-code-inner js-file-line">            }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L98" class="blob-num js-line-number js-blob-rnum" data-line-number="98"></td>
          <td id="file-schema-js-LC98" class="blob-code blob-code-inner js-file-line">        }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L99" class="blob-num js-line-number js-blob-rnum" data-line-number="99"></td>
          <td id="file-schema-js-LC99" class="blob-code blob-code-inner js-file-line">    }</td>
        </tr>
        <tr>
          <td id="file-schema-js-L100" class="blob-num js-line-number js-blob-rnum" data-line-number="100"></td>
          <td id="file-schema-js-LC100" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
        <tr>
          <td id="file-schema-js-L101" class="blob-num js-line-number js-blob-rnum" data-line-number="101"></td>
          <td id="file-schema-js-LC101" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-schema-js-L102" class="blob-num js-line-number js-blob-rnum" data-line-number="102"></td>
          <td id="file-schema-js-LC102" class="blob-code blob-code-inner js-file-line">module.exports = new GraphQLSchema({</td>
        </tr>
        <tr>
          <td id="file-schema-js-L103" class="blob-num js-line-number js-blob-rnum" data-line-number="103"></td>
          <td id="file-schema-js-LC103" class="blob-code blob-code-inner js-file-line">    query: RootQuery</td>
        </tr>
        <tr>
          <td id="file-schema-js-L104" class="blob-num js-line-number js-blob-rnum" data-line-number="104"></td>
          <td id="file-schema-js-LC104" class="blob-code blob-code-inner js-file-line">});</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/3f9adc62954939927ccb577467534d96/raw/5225502ded614c7bd9f27c8887dc4ccfdcc057aa/schema.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/3f9adc62954939927ccb577467534d96#file-schema-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          schema.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption><strong>Code snippet #2</strong>: The GraphQL schema used for the covid-19 api.</figcaption></figure>



<p>Lines 12-67 in <strong>Code snippet #2</strong> are the definition of 3 GraphQL object types (<code>CovidDataType</code>, <code>StateCovidDataType</code> and <code>DailyCovidDataType</code>). </p>



<p>Lines 72-100 in <strong>Code snippet #2</strong> define another object type that also includes resolvers for 3 properties: <code>total</code>, <code>statewise</code> and <code>datewise</code>.  Each property is of the Object types defined above respectively. </p>



<p>The resolvers for each property fetch data from the covid api, and return a certain portion of it.</p>



<p>Lines 102-104 just export a GraphQL schema that is passed to the GraphQL express middleware.</p>



<p>If you try to enter the following queries, you will get the wanted results:</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="GET_overall_COVID-19_stats"></span><code>GET</code>&nbsp;overall COVID-19 stats<span class="ez-toc-section-end"></span></h4>



<pre class="wp-block-preformatted">{ 
  total {
    active
    confirmed
    deaths
    recovered
  }
}</pre>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="GET_statewise_COVID-19_stats"></span><a href="https://github.com/YonatanKra/covid19api#get-statewise-covid-19-stats" target="_blank" rel="noopener"></a><code>GET</code>&nbsp;statewise COVID-19 stats<span class="ez-toc-section-end"></span></h4>



<pre class="wp-block-preformatted">{
  statewise {
    state
    active
    confirmed
    deaths
    recovered
  }
}</pre>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="GET_datewise_COVID-19_stats"></span><a href="https://github.com/YonatanKra/covid19api#get-datewise-covid-19-stats" target="_blank" rel="noopener"></a><code>GET</code>&nbsp;datewise COVID-19 stats<span class="ez-toc-section-end"></span></h4>



<pre class="wp-block-preformatted">{
  datewise {
    date
    dailyconfirmed
    dailydeceased
    dailyrecovered
  }
}</pre>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="The_AskQL_Server"></span>The AskQL Server<span class="ez-toc-section-end"></span></h3>



<p>For this purpose, I&#8217;ve just used the AskQL server from the <a href="/askql-nodejs-quickstart/" data-type="post" data-id="493">AskQL Nodejs Quickstart</a> article. By cloning it and using the main branch, you will receive the exact same query UI &#8211; only this time the backend is powered by AskQL.</p>



<p>Now &#8211; part of the power of AskQL is that we don&#8217;t really need to do anything to make the same queries work. For instance, if we&#8217;d like to get the <code>datewise</code> data set, our AskQL query will look like this:</p>



<pre class="wp-block-code"><code>ask {
  fetch('https://api.covid19india.org/data.json')&#91;'cases_time_series']
  :map(fun(dataSet) {
                         return {
                            data: dataSet&#91;'date'],
                            dailyconfirmed: dataSet&#91;'dailyconfirmed'],
                            dailydeceased: dataSet&#91;'dailydeceased'],
                            dailyrecovered: dataSet&#91;'dailyrecovered']
                          }
                        })
}</code></pre>



<p class="has-text-align-center"><strong>Code snippet #3</strong>: An AskScript that can be pasted into the AskQL demo website.</p>



<p>Code snippet #3 is written all client side, but the same as the GraphQL <code>datewise</code> query.</p>



<p>The difference here &#8211; we did not need to make any change serverside.</p>



<h4 class="wp-block-heading"><span class="ez-toc-section" id="AskQL_Resolvers"></span>AskQL Resolvers<span class="ez-toc-section-end"></span></h4>



<p> As shown in <strong>Code snippet #2</strong>, you can create resolvers in GraphQL. For parity sake, I&#8217;m going to show how AskQL resolvers work.</p>



<p>In AskQL, the resolvers are called <code>resources</code>. Let&#8217;s create the <code>statewise</code> resource in AskQL. </p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist106073321" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-askql-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="askql.js content, created by YonatanKra on 03:57AM on October 24, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="askql.js">
        <tr>
          <td id="file-askql-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-askql-js-LC1" class="blob-code blob-code-inner js-file-line">import askql from &quot;askql&quot;;</td>
        </tr>
        <tr>
          <td id="file-askql-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-askql-js-LC2" class="blob-code blob-code-inner js-file-line">import {values} from &#39;../resources/index.js&#39;;</td>
        </tr>
        <tr>
          <td id="file-askql-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-askql-js-LC3" class="blob-code blob-code-inner js-file-line">import middlewareFactory from &quot;askql/askExpressMiddleware/askExpressMiddleware.js&quot;;</td>
        </tr>
        <tr>
          <td id="file-askql-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-askql-js-LC4" class="blob-code blob-code-inner js-file-line">import { customResources } from &quot;./statewise.js&quot;;</td>
        </tr>
        <tr>
          <td id="file-askql-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-askql-js-LC5" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-askql-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-askql-js-LC6" class="blob-code blob-code-inner js-file-line">const { askExpressMiddleware } = middlewareFactory;</td>
        </tr>
        <tr>
          <td id="file-askql-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-askql-js-LC7" class="blob-code blob-code-inner js-file-line">const { resources } = askql;</td>
        </tr>
        <tr>
          <td id="file-askql-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-askql-js-LC8" class="blob-code blob-code-inner js-file-line">export const askMiddleware = askExpressMiddleware(</td>
        </tr>
        <tr>
          <td id="file-askql-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-askql-js-LC9" class="blob-code blob-code-inner js-file-line">    { resources: {&#8230;resources, &#8230;customResources}, values },</td>
        </tr>
        <tr>
          <td id="file-askql-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-askql-js-LC10" class="blob-code blob-code-inner js-file-line">    { callNext: true, passError: true }</td>
        </tr>
        <tr>
          <td id="file-askql-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-askql-js-LC11" class="blob-code blob-code-inner js-file-line">);</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e4ab900af340d17dd84e99f0d603ce95/raw/de295a49f30d4c3259f1874756625927bebb2801/askql.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e4ab900af340d17dd84e99f0d603ce95#file-askql-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          askql.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-statewise-js" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-javascript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="statewise.js content, created by YonatanKra on 03:57AM on October 24, 2020."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="statewise.js">
        <tr>
          <td id="file-statewise-js-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-statewise-js-LC1" class="blob-code blob-code-inner js-file-line">import askql from &#39;askql&#39;;</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-statewise-js-LC2" class="blob-code blob-code-inner js-file-line">import fetch from &#39;node-fetch&#39;;</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-statewise-js-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-statewise-js-LC4" class="blob-code blob-code-inner js-file-line">const { askvm } = askql;</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-statewise-js-LC5" class="blob-code blob-code-inner js-file-line">export const customResources = {</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-statewise-js-LC6" class="blob-code blob-code-inner js-file-line">    statewise: askvm.resource({</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-statewise-js-LC7" class="blob-code blob-code-inner js-file-line">        resolver: async () =&gt; {</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-statewise-js-LC8" class="blob-code blob-code-inner js-file-line">              const res = await fetch(&#39;https://api.covid19india.org/data.json&#39;);</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-statewise-js-LC9" class="blob-code blob-code-inner js-file-line">              const fullData = await res.json();</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-statewise-js-LC10" class="blob-code blob-code-inner js-file-line">              const dataSet = fullData.statewise.splice(1);</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-statewise-js-LC11" class="blob-code blob-code-inner js-file-line">              return dataSet.map(({ state, active, confirmed, deaths, recovered }) =&gt; ({</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-statewise-js-LC12" class="blob-code blob-code-inner js-file-line">                state,</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-statewise-js-LC13" class="blob-code blob-code-inner js-file-line">                active,</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-statewise-js-LC14" class="blob-code blob-code-inner js-file-line">                confirmed,</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-statewise-js-LC15" class="blob-code blob-code-inner js-file-line">                deaths,</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-statewise-js-LC16" class="blob-code blob-code-inner js-file-line">                recovered,</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-statewise-js-LC17" class="blob-code blob-code-inner js-file-line">              }));</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-statewise-js-LC18" class="blob-code blob-code-inner js-file-line">        },</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-statewise-js-LC19" class="blob-code blob-code-inner js-file-line">    }),</td>
        </tr>
        <tr>
          <td id="file-statewise-js-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-statewise-js-LC20" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/e4ab900af340d17dd84e99f0d603ce95/raw/de295a49f30d4c3259f1874756625927bebb2801/statewise.js" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/e4ab900af340d17dd84e99f0d603ce95#file-statewise-js" class="Link--inTextBlock" target="_blank" rel="noopener">
          statewise.js
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption><strong>Code snippet #4</strong>: The statewise resource (<code>statewise.js</code>) and the AskQL express middleware setup with the custom resource (<code>askql.js</code>).</figcaption></figure>



<p>In <strong>Code snippet #4</strong>, in the <code>statewise</code> file (bottom) we have a simple code that does the same as the GraphQL <code>statewise</code> resolver. </p>



<p>Line 8 fetches the data, line 9 returns the JSON, line 10 returns the part of the data we want (all except the first array member) and line 11 does the mapping into the schema we want.</p>



<p>In the <code>askql.js</code> file (top) you can see the custom resource is added to the list of resources sent to the <code>AskQL Express Middleware</code> in line 9.</p>



<p>The query that calls for the <code>statewise</code> resource is shown in <strong>Code Snippet #5</strong>.</p>



<pre class="wp-block-code"><code> ask {
    {
      data: {
        statewise: statewise()
      }
    }
 }</code></pre>



<p class="has-text-align-center"><strong>Code Snippet #5</strong>: The statewise query in AskQL.</p>



<p>This returns exactly the same data as the <strong><em><code>GET</code>&nbsp;statewise COVID-19 stats</em></strong> GraphQL query mentioned above. You can see the two queries side by side in Figure 2.</p>



<figure class="wp-block-image size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="330" src="/wp-content/uploads/2020/10/image-9.png" alt="" class="wp-image-547" srcset="/wp-content/uploads/2020/10/image-9.png 1024w, /wp-content/uploads/2020/10/image-9.png 300w, /wp-content/uploads/2020/10/image-9.png 768w, /wp-content/uploads/2020/10/image-9.png 1536w, /wp-content/uploads/2020/10/image-9.png 175w, /wp-content/uploads/2020/10/image-9.png 1918w, /wp-content/uploads/2020/10/image-9.png 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption><strong>Figure 2</strong>: The two queries return the same statewise data.</figcaption></figure>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Big_Deal"></span>The Big Deal<span class="ez-toc-section-end"></span></h2>



<p>We saw above that while we can create resolvers in AskQL, they are not always needed.</p>



<p>While in GraphQL you&#8217;d need to create resolvers for new types of data, in AskQL you are not limited to what the backend team created for you as a client.</p>



<p>Why is this so valuable?</p>



<p>There are many use cases for this.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="No_need_to_deploy_a_new_server_version"></span>No need to deploy a new server version<span class="ez-toc-section-end"></span></h3>



<p>There might come a time when the client needs some new data from the existing dataset. For instance &#8211; <code>statewise</code> also includes the <code>lastupdatedtime</code> property.</p>



<p>The GraphQL server does not expose this to the client. In order to expose this to the client, the GraphQL server needs to be redeployed with an updated schema.</p>



<p>Not so for AskQL. As we saw in <strong>Code snippet #3</strong>, you can send the mapping instruction via the <strong>AskScript</strong> query, directly from the client.</p>



<p>This means, the client team can move ahead without waiting for a server redeployment.</p>



<h3 class="wp-block-heading"><span class="ez-toc-section" id="Access_to_new_resources"></span>Access to new resources <span class="ez-toc-section-end"></span></h3>



<p>The last use case was accessing data that was hidden by the resource/resolver.</p>



<p>Another use case is a situation in which the remote API was upgraded, or a new microservice was raised with information you need in order to farther enrich your data.</p>



<p>In the GraphQL server, this would again require the backend team to redeploy a new version of the server.</p>



<p>In AskQL, it is as easy as writing a new script.</p>



<p>In our example, the JSON fetched was showing data by states in India.  A new microservice was created that handles the data by districts (https://api.covid19india.org/state_district_wise.json).</p>



<p>Instead of creating a new resolver in the backend, the client side can just do the following:</p>



<pre class="wp-block-code"><code>ask {
  const statewiseData = statewise();
  const districtData = fetch('https://api.covid19india.org/state_district_wise.json');
  statewiseData:map(fun(stateData) {
    {
      stateData,
      districtsData: districtData&#91;stateData&#91;'state']]
    }
  });
}</code></pre>



<p class="has-text-align-center"><strong>Code Snippet #6</strong>: The statewise query enriched with district data in AskQL.</p>



<p>In <strong>Code snippet #6</strong> we get the states data array, and enrich it with the district data fetched from the new server. As easy as that.</p>



<p>You can check the <a rel="noreferrer noopener" href="https://github.com/YonatanKra/askql-demo/tree/covid-19" target="_blank">covid-19 branch</a> in the <a rel="noreferrer noopener" href="https://github.com/YonatanKra/askql-demo" target="_blank">askql-demo repository</a> for the full example.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Why_no_just_query_from_the_client"></span>Why no just query from the client? <span class="ez-toc-section-end"></span></h2>



<p>That&#8217;s a good question, and there are various reasons for that. One reason that comes into mind &#8211; especially in commercial applications &#8211; is security.</p>



<p>The AskQL server will be an internet facing server.  It might be that it has access to non-internet facing servers inside an AWS VPC (or other cloud vendors equivalents).</p>



<p>So the AskQL server is mainly a security gateway for the client to be able to fetch data that is not internet facing and thus is not available directly. </p>



<p>Performance-wise, servers might have an optimised access to some resources. The fetch request might actually be much faster via the AskQL proxy rather than directly from the client. </p>



<p>Another performance use case can be caching &#8211; the AskQL server might handle requests caching and serve them in order to reduce the load on more expansive resources like DB&#8217;s.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>In the past, the DB was the &#8220;King&#8221; and the clients had to code accordingly. DB normalisation came into effect in the client&#8217;s code. </p>



<p>GraphQL came to solve the &#8220;DB is king&#8221; problem. It&#8217;s now possible to allow the frontends to query as they know &#8211; simple JSONs that fit them.</p>



<p>In this article we saw that AskQL solves this issue, just like GraphQL does, but goes one step farther.</p>



<p>AskQL allows more flexibility since the client is not dependent on schemas set in the server. This way, it allows the client(s) to advance without waiting for the server to redeploy.</p>



<p>This reduces the coupling between client and server.</p>



<p>Besides flexibility in a single client, this allows us to build multiple clients that have different needs with only one (scalable) endpoint.</p>



<p>The fact that one endpoint can serve multiple clients, and indeed, multiple types of clients, we can use optimisation techniques like caching in order to improve performance and save valuable money for our growing company.</p>



<p>You can try out AskQL in <a rel="noreferrer noopener" href="https://github.com/xFAANG/askql" target="_blank">the official repository</a>, and also meet the AskQL team over at <a rel="noreferrer noopener" href="https://discord.gg/CGqwrw" target="_blank">the AskQL discord channel</a>.</p>



<p>Thanks a lot for <a rel="noreferrer noopener" href="https://twitter.com/O_Koren" target="_blank">Omer Koren</a> from <a rel="noreferrer noopener" href="http://webiks.com" target="_blank">webiks</a> and <a rel="noreferrer noopener" href="https://twitter.com/Piotr_Zientara" target="_blank">Piotr</a>&nbsp;from&nbsp;<a rel="noreferrer noopener" href="https://twitter.com/XFaang" target="_blank">xFAANG</a> for the kind and thorough review!<br></p>

