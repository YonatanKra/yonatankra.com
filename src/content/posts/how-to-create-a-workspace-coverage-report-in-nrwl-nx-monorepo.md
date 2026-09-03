---
title: How to create a workspace coverage report in nrwl/nx monorepo?
slug: how-to-create-a-workspace-coverage-report-in-nrwl-nx-monorepo
published: 2021-02-06T22:50:27
updated: 2021-08-10T16:53:37
author: Yonatan Kra
description: This is going to be a short one. I’m using nrwl/nx a LOT. I’m also testing a LOT. Lately I needed to add a coverage report to one of my nrwl/nx repositories. The coverage tool I was using needed the coverage in one file, while the nrwl/nx creates the reports per library and app. So, [&hellip;]
categories:
  - name: devops
    slug: devops
    path: devops
  - name: github actions
    slug: github-actions
    path: devops/github-actions
  - name: nx
    slug: nx
    path: javascript/nx
  - name: Testing
    slug: testing
    path: testing
tags:
  - code coverage
  - continuous integration
  - testing
canonical: https://yonatankra.com/how-to-create-a-workspace-coverage-report-in-nrwl-nx-monorepo/
comments:
  - author: Mike Graham
    date: 2021-12-30T13:28:58
    content: |
      <p>i documented a recipe for publishing coverage reports in nx / angular / jest to sonar<br />
      <a href="https://stackoverflow.com/a/70530811/7085047" rel="nofollow ugc">https://stackoverflow.com/a/70530811/7085047</a></p>
  - author: Yonatan Kra
    date: 2022-04-28T08:54:40
    content: |
      <p>Thank you!</p>
  - author: Robin
    date: 2022-08-16T17:33:16
    content: |
      <p>works as expected. Thank you very much!</p>
featuredImage: /wp-content/uploads/2021/02/um-yeah-unit-test-report.jpg
---

<p>This is going to be a short one.  I&#8217;m using nrwl/nx a LOT. I&#8217;m also testing a LOT.  Lately I needed to add a coverage report to one of my nrwl/nx repositories. The coverage tool I was using needed the coverage in one file, while the nrwl/nx creates the reports per library and app.</p>



<p>So, a little bit of research showed me I could just concatenate the <code>lcov.info</code> files into one file and it&#8217;s going to do the trick.</p>



<p>I&#8217;ve written a small utility that does that for me:</p>



<pre class="wp-block-code"><code>const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getLcovFiles = function (src) {
  return new Promise((resolve, reject) => {
    glob(`${src}/**/lcov.info`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  })
};

(async function(){
  const files = await getLcovFiles('coverage');
  const mergedReport = files.reduce((mergedReport, currFile) => mergedReport += fs.readFileSync(currFile), '');
  await fs.writeFile(path.resolve('./coverage/lcov.info'), mergedReport, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})();
</code></pre>



<p>I put this file in the tools folder. You might also want to install the <code>glob</code> library:</p>



<pre class="wp-block-code"><code>yarn add -D glob</code></pre>



<p>I&#8217;ve then created a <code>test:ci</code> npm command that runs the tests AND creates the coverage report:</p>



<pre class="wp-block-code"><code>"test:ci": "ng run-many --target=test --all --parallel --coverage --coverageReporters=lcov &amp;&amp; node ./tools/coverageMerger.js",</code></pre>



<p>this results in all the tests running (in parallel) and after they all finish, the script concatenates my coverage into a big lcov file.</p>



<p>Since I&#8217;m using github actions, all I needed to do was add this to my workflow after the tests:</p>



<pre class="wp-block-code"><code>      - name: Coveralls
        uses: coverallsapp/github-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}</code></pre>



<p>And that&#8217;s about it.</p>



<p>I hope this helps you in any way 🙂</p>

