---
title: A Tale of Implementation and Detail
slug: a-tale-of-implementation-and-detail
published: 2023-08-27T17:40:48
updated: 2023-08-28T09:41:16
author: Yonatan Kra
description: As a testing advocate, I frequently delve into “implementation details” and “public interfaces.” These terms refer to the inner workings of your API and how it’s presented to users. Rather than just defining them, let’s explore their significance through a real-world example. Witness how grasping these concepts enhances our code in practical scenarios. Once Upon [&hellip;]
categories:
  - name: Testing
    slug: testing
    path: testing
tags:
  - javascript
  - testing
  - unit tests
canonical: https://yonatankra.com/a-tale-of-implementation-and-detail/
comments: []
featuredImage: /wp-content/uploads/2023/08/implementation-details.jpeg
---

<p class="has-medium-font-size">As a testing advocate, I frequently delve into &#8220;<strong>implementation details</strong>&#8221; and &#8220;<strong>public interfaces.</strong>&#8221; These terms refer to the inner workings of your API and how it&#8217;s presented to users. Rather than just defining them, let&#8217;s explore their significance through a real-world example. Witness how grasping these concepts enhances our code in practical scenarios.</p>



<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1a53ae56" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1a53ae56"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-1" href="/a-tale-of-implementation-and-detail/#Once_Upon_a_Date" >Once Upon a Date</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-2" href="/a-tale-of-implementation-and-detail/#Testing_and_Creating_the_Grid" >Testing and Creating the Grid</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-3" href="/a-tale-of-implementation-and-detail/#The_Detail_is_in_the_Implementation" >The Detail is in the Implementation</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-4" href="/a-tale-of-implementation-and-detail/#How_to_Make_Sure_a_Refactor_Didnt_Break_My_Code" >How to Make Sure a Refactor Didn&#8217;t Break My Code?</a></li><li class='ez-toc-page-1 ez-toc-heading-level-2'><a class="ez-toc-link ez-toc-heading-5" href="/a-tale-of-implementation-and-detail/#Summary" >Summary</a></li></ul></nav></div>
<h2 class="wp-block-heading"><span class="ez-toc-section" id="Once_Upon_a_Date"></span>Once Upon a Date<span class="ez-toc-section-end"></span></h2>



<p>Our story begins with a date. Not just any date, though &#8211; a date picker. </p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="833" src="/wp-content/uploads/2023/08/image-5.png" alt="" class="wp-image-1772" srcset="/wp-content/uploads/2023/08/image-5.png 662w, /wp-content/uploads/2023/08/image-5.png 230w, /wp-content/uploads/2023/08/image-5.png 69w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The Date Picker Component</figcaption></figure></div>



<p>While the date picker seems straightforward &#8211; show an input and a dialog with a calendar &#8211; a lot is going on behind the scenes. </p>



<p>For instance, in order to generate the calendar, one needs to generate the grid correctly. Notice that while we have five weeks in the grid, the days of week are not always the same day of the month. In addition, the &#8220;padding&#8221; of the first and last weeks with days of last and next month is also not constant.</p>



<p>The first step would be to generate the data set we will render according to. This will be the part we will focus on in this article.</p>



<p>Let&#8217;s see how it was implemented.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Testing_and_Creating_the_Grid"></span>Testing and Creating the Grid<span class="ez-toc-section-end"></span></h2>



<p>We want to create the utility function <code>buildCalendarGrid</code>. As its name suggests, it&#8217;s going to build the grid for us. The implementation is not that important, but for reference, I&#8217;m going to share an image of the tests so you can see they are quite comprehensive. The code is folded, so there is no need to read:</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="374" src="/wp-content/uploads/2023/08/calendar-tests.jpeg" alt="" class="wp-image-1781" srcset="/wp-content/uploads/2023/08/calendar-tests.jpeg 1024w, /wp-content/uploads/2023/08/calendar-tests.jpeg 300w, /wp-content/uploads/2023/08/calendar-tests.jpeg 768w, /wp-content/uploads/2023/08/calendar-tests.jpeg 1536w, /wp-content/uploads/2023/08/calendar-tests.jpeg 154w, /wp-content/uploads/2023/08/calendar-tests.jpeg 1600w, /wp-content/uploads/2023/08/calendar-tests.jpeg 1280w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>The calendar tests</figcaption></figure></div>



<p>Let&#8217;s take a quick look at the implementation that makes the tests pass. Again, there&#8217;s no need to read the code &#8211; we&#8217;ll dive into relevant parts of it later on. I add it here just so you could get an impression:</p>



<figure class="wp-block-embed aligncenter is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124197359" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-buildcalendargrid-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="buildCalendarGrid.ts content, created by YonatanKra on 01:07PM on August 21, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="buildCalendarGrid.ts">
        <tr>
          <td id="file-buildcalendargrid-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-buildcalendargrid-ts-LC1" class="blob-code blob-code-inner js-file-line">export const buildCalendarGrid = (</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-buildcalendargrid-ts-LC2" class="blob-code blob-code-inner js-file-line">	{ month, year }: Month,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-buildcalendargrid-ts-LC3" class="blob-code blob-code-inner js-file-line">	locale: DatePickerLocale</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-buildcalendargrid-ts-LC4" class="blob-code blob-code-inner js-file-line">): CalendarGrid =&gt; {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-buildcalendargrid-ts-LC5" class="blob-code blob-code-inner js-file-line">	// Shift week days to start from firstDayOfWeek</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-buildcalendargrid-ts-LC6" class="blob-code blob-code-inner js-file-line">	const firstDayOfWeek = locale.firstDayOfWeek;</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-buildcalendargrid-ts-LC7" class="blob-code blob-code-inner js-file-line">	const getShiftedDay = (date: Date): number =&gt;</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-buildcalendargrid-ts-LC8" class="blob-code blob-code-inner js-file-line">		(date.getDay() &#8211; firstDayOfWeek + 7) % 7;</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-buildcalendargrid-ts-LC9" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-buildcalendargrid-ts-LC10" class="blob-code blob-code-inner js-file-line">	const grid: CalendarGridDate[][] = [];</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-buildcalendargrid-ts-LC11" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-buildcalendargrid-ts-LC12" class="blob-code blob-code-inner js-file-line">	const firstDay = new Date(year, month, 1);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-buildcalendargrid-ts-LC13" class="blob-code blob-code-inner js-file-line">	const lastDay = new Date(year, month + 1, 0);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-buildcalendargrid-ts-LC14" class="blob-code blob-code-inner js-file-line">	const daysInMonth = lastDay.getDate();</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-buildcalendargrid-ts-LC15" class="blob-code blob-code-inner js-file-line">	const firstDayInWeek = getShiftedDay(firstDay);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-buildcalendargrid-ts-LC16" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-buildcalendargrid-ts-LC17" class="blob-code blob-code-inner js-file-line">	let week: CalendarGridDate[] = [];</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-buildcalendargrid-ts-LC18" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L19" class="blob-num js-line-number js-blob-rnum" data-line-number="19"></td>
          <td id="file-buildcalendargrid-ts-LC19" class="blob-code blob-code-inner js-file-line">	// Fill in the days before the first day of the month</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L20" class="blob-num js-line-number js-blob-rnum" data-line-number="20"></td>
          <td id="file-buildcalendargrid-ts-LC20" class="blob-code blob-code-inner js-file-line">	for (let i = 0; i &lt; firstDayInWeek; i++) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L21" class="blob-num js-line-number js-blob-rnum" data-line-number="21"></td>
          <td id="file-buildcalendargrid-ts-LC21" class="blob-code blob-code-inner js-file-line">		const date = addDays(firstDay, i &#8211; firstDayInWeek);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L22" class="blob-num js-line-number js-blob-rnum" data-line-number="22"></td>
          <td id="file-buildcalendargrid-ts-LC22" class="blob-code blob-code-inner js-file-line">		week.push({</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L23" class="blob-num js-line-number js-blob-rnum" data-line-number="23"></td>
          <td id="file-buildcalendargrid-ts-LC23" class="blob-code blob-code-inner js-file-line">			date: formatDateStr(date),</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L24" class="blob-num js-line-number js-blob-rnum" data-line-number="24"></td>
          <td id="file-buildcalendargrid-ts-LC24" class="blob-code blob-code-inner js-file-line">			label: `${date.getDate()}`,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L25" class="blob-num js-line-number js-blob-rnum" data-line-number="25"></td>
          <td id="file-buildcalendargrid-ts-LC25" class="blob-code blob-code-inner js-file-line">			isOutsideMonth: true,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L26" class="blob-num js-line-number js-blob-rnum" data-line-number="26"></td>
          <td id="file-buildcalendargrid-ts-LC26" class="blob-code blob-code-inner js-file-line">		});</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L27" class="blob-num js-line-number js-blob-rnum" data-line-number="27"></td>
          <td id="file-buildcalendargrid-ts-LC27" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L28" class="blob-num js-line-number js-blob-rnum" data-line-number="28"></td>
          <td id="file-buildcalendargrid-ts-LC28" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L29" class="blob-num js-line-number js-blob-rnum" data-line-number="29"></td>
          <td id="file-buildcalendargrid-ts-LC29" class="blob-code blob-code-inner js-file-line">	// Fill up days of the month</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L30" class="blob-num js-line-number js-blob-rnum" data-line-number="30"></td>
          <td id="file-buildcalendargrid-ts-LC30" class="blob-code blob-code-inner js-file-line">	for (let i = 1; i &lt;= daysInMonth; i++) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L31" class="blob-num js-line-number js-blob-rnum" data-line-number="31"></td>
          <td id="file-buildcalendargrid-ts-LC31" class="blob-code blob-code-inner js-file-line">		week.push({</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L32" class="blob-num js-line-number js-blob-rnum" data-line-number="32"></td>
          <td id="file-buildcalendargrid-ts-LC32" class="blob-code blob-code-inner js-file-line">			date: formatDateStr(new Date(year, month, i)),</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L33" class="blob-num js-line-number js-blob-rnum" data-line-number="33"></td>
          <td id="file-buildcalendargrid-ts-LC33" class="blob-code blob-code-inner js-file-line">			label: `${i}`,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L34" class="blob-num js-line-number js-blob-rnum" data-line-number="34"></td>
          <td id="file-buildcalendargrid-ts-LC34" class="blob-code blob-code-inner js-file-line">			isOutsideMonth: false,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L35" class="blob-num js-line-number js-blob-rnum" data-line-number="35"></td>
          <td id="file-buildcalendargrid-ts-LC35" class="blob-code blob-code-inner js-file-line">		});</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L36" class="blob-num js-line-number js-blob-rnum" data-line-number="36"></td>
          <td id="file-buildcalendargrid-ts-LC36" class="blob-code blob-code-inner js-file-line">		if (week.length === 7) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L37" class="blob-num js-line-number js-blob-rnum" data-line-number="37"></td>
          <td id="file-buildcalendargrid-ts-LC37" class="blob-code blob-code-inner js-file-line">			grid.push(week);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L38" class="blob-num js-line-number js-blob-rnum" data-line-number="38"></td>
          <td id="file-buildcalendargrid-ts-LC38" class="blob-code blob-code-inner js-file-line">			week = [];</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L39" class="blob-num js-line-number js-blob-rnum" data-line-number="39"></td>
          <td id="file-buildcalendargrid-ts-LC39" class="blob-code blob-code-inner js-file-line">		}</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L40" class="blob-num js-line-number js-blob-rnum" data-line-number="40"></td>
          <td id="file-buildcalendargrid-ts-LC40" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L41" class="blob-num js-line-number js-blob-rnum" data-line-number="41"></td>
          <td id="file-buildcalendargrid-ts-LC41" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L42" class="blob-num js-line-number js-blob-rnum" data-line-number="42"></td>
          <td id="file-buildcalendargrid-ts-LC42" class="blob-code blob-code-inner js-file-line">	// Fill in the days after the last day of the month</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L43" class="blob-num js-line-number js-blob-rnum" data-line-number="43"></td>
          <td id="file-buildcalendargrid-ts-LC43" class="blob-code blob-code-inner js-file-line">	const daysInLastWeek = week.length;</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L44" class="blob-num js-line-number js-blob-rnum" data-line-number="44"></td>
          <td id="file-buildcalendargrid-ts-LC44" class="blob-code blob-code-inner js-file-line">	for (let i = daysInLastWeek; i &lt; 7; i++) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L45" class="blob-num js-line-number js-blob-rnum" data-line-number="45"></td>
          <td id="file-buildcalendargrid-ts-LC45" class="blob-code blob-code-inner js-file-line">		const date = addDays(lastDay, i &#8211; daysInLastWeek + 1);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L46" class="blob-num js-line-number js-blob-rnum" data-line-number="46"></td>
          <td id="file-buildcalendargrid-ts-LC46" class="blob-code blob-code-inner js-file-line">		week.push({</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L47" class="blob-num js-line-number js-blob-rnum" data-line-number="47"></td>
          <td id="file-buildcalendargrid-ts-LC47" class="blob-code blob-code-inner js-file-line">			date: formatDateStr(date),</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L48" class="blob-num js-line-number js-blob-rnum" data-line-number="48"></td>
          <td id="file-buildcalendargrid-ts-LC48" class="blob-code blob-code-inner js-file-line">			label: `${date.getDate()}`,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L49" class="blob-num js-line-number js-blob-rnum" data-line-number="49"></td>
          <td id="file-buildcalendargrid-ts-LC49" class="blob-code blob-code-inner js-file-line">			isOutsideMonth: true,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L50" class="blob-num js-line-number js-blob-rnum" data-line-number="50"></td>
          <td id="file-buildcalendargrid-ts-LC50" class="blob-code blob-code-inner js-file-line">		});</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L51" class="blob-num js-line-number js-blob-rnum" data-line-number="51"></td>
          <td id="file-buildcalendargrid-ts-LC51" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L52" class="blob-num js-line-number js-blob-rnum" data-line-number="52"></td>
          <td id="file-buildcalendargrid-ts-LC52" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L53" class="blob-num js-line-number js-blob-rnum" data-line-number="53"></td>
          <td id="file-buildcalendargrid-ts-LC53" class="blob-code blob-code-inner js-file-line">	if (week.length &gt; 0) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L54" class="blob-num js-line-number js-blob-rnum" data-line-number="54"></td>
          <td id="file-buildcalendargrid-ts-LC54" class="blob-code blob-code-inner js-file-line">		grid.push(week);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L55" class="blob-num js-line-number js-blob-rnum" data-line-number="55"></td>
          <td id="file-buildcalendargrid-ts-LC55" class="blob-code blob-code-inner js-file-line">	}</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L56" class="blob-num js-line-number js-blob-rnum" data-line-number="56"></td>
          <td id="file-buildcalendargrid-ts-LC56" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L57" class="blob-num js-line-number js-blob-rnum" data-line-number="57"></td>
          <td id="file-buildcalendargrid-ts-LC57" class="blob-code blob-code-inner js-file-line">	return {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L58" class="blob-num js-line-number js-blob-rnum" data-line-number="58"></td>
          <td id="file-buildcalendargrid-ts-LC58" class="blob-code blob-code-inner js-file-line">		weekdays: getWeekdays(locale),</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L59" class="blob-num js-line-number js-blob-rnum" data-line-number="59"></td>
          <td id="file-buildcalendargrid-ts-LC59" class="blob-code blob-code-inner js-file-line">		grid,</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L60" class="blob-num js-line-number js-blob-rnum" data-line-number="60"></td>
          <td id="file-buildcalendargrid-ts-LC60" class="blob-code blob-code-inner js-file-line">	};</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L61" class="blob-num js-line-number js-blob-rnum" data-line-number="61"></td>
          <td id="file-buildcalendargrid-ts-LC61" class="blob-code blob-code-inner js-file-line">};</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/c8ece3ff7bf7340d105e647044c77ba1/raw/923828e149bca293d90af16afd613094b70af385/buildCalendarGrid.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/c8ece3ff7bf7340d105e647044c77ba1#file-buildcalendargrid-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          buildCalendarGrid.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption><code>buildCalendarGrid</code> implementation</figcaption></figure>



<p>That&#8217;s a pretty big function, right? Just looking at it causes some cognitive load. The thought of diving into such a long function might be discouraging. Anyway, this implementation makes the tests pass, so it works. Let&#8217;s summarize what&#8217;s happening there: </p>



<ol class="wp-block-list"><li>It starts with setting local variables</li><li>A loop to set the <code>pre-month</code> padding days.</li><li>A loop to set the month days.</li><li>A loop to add the <code>post-month</code> padding days.</li><li>An <code>if</code> statement to see if we actually have these days and push them to the array.</li><li>Return the grid and the weekdays in the calendar grid object.</li></ol>



<p>Lucky us the <code>weekdays</code> are returned from a different function, otherwise we would have gotten ourselves with a much bigger function.</p>



<p>So&#8230; this function works. We can merge it, right?</p>



<p>Technically, yes. </p>



<p>&#8230;</p>



<p>What? Were you waiting for a &#8220;but&#8221;? </p>



<p>Ok, if you insist.</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="The_Detail_is_in_the_Implementation"></span>The Detail is in the Implementation<span class="ez-toc-section-end"></span></h2>



<p>We should separate the <strong>implementation</strong> from the <strong>interface</strong>. The interface includes the function&#8217;s parameters, name, and returned value. The implementation of the algorithm is the details. The implementation detail. </p>



<p>If we change the <strong>implementation</strong> without changing the <strong>interface</strong>, it would mean we are doing a <strong>refactor</strong>.</p>



<p>I&#8217;m going to share with you another implementation. This implementation uses just one loop without the external <code>if</code>. Is it clearer? Easier to read? Less intimidating? More considerate for future generations of developers? You&#8217;ll be the judge of that.</p>



<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
<style>.gist table { margin-bottom: 0; }</style><div style="tab-size: 8" id="gist124204119" class="gist">
    <div class="gist-file" translate="no" data-color-mode="light" data-light-theme="light">
      <div class="gist-data">
        
<div class="js-gist-file-update-container js-task-list-container">
      <div id="file-buildcalendargrid-ts" class="file my-2">
    
    <div itemprop="text"
      class="Box-body p-0 blob-wrapper data type-typescript  "
      style="overflow: auto" tabindex="0" role="region"
      aria-label="buildCalendarGrid.ts content, created by YonatanKra on 06:04PM on August 21, 2023."
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

  <table data-hpc class="highlight tab-size js-file-line-container" data-tab-size="4" data-paste-markdown-skip data-tagsearch-path="buildCalendarGrid.ts">
        <tr>
          <td id="file-buildcalendargrid-ts-L1" class="blob-num js-line-number js-blob-rnum" data-line-number="1"></td>
          <td id="file-buildcalendargrid-ts-LC1" class="blob-code blob-code-inner js-file-line">const grid = [];</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L2" class="blob-num js-line-number js-blob-rnum" data-line-number="2"></td>
          <td id="file-buildcalendargrid-ts-LC2" class="blob-code blob-code-inner js-file-line">let week: CalendarGridDate[] = [];</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L3" class="blob-num js-line-number js-blob-rnum" data-line-number="3"></td>
          <td id="file-buildcalendargrid-ts-LC3" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L4" class="blob-num js-line-number js-blob-rnum" data-line-number="4"></td>
          <td id="file-buildcalendargrid-ts-LC4" class="blob-code blob-code-inner js-file-line">const lastDay = new Date(year, month + 1, 0);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L5" class="blob-num js-line-number js-blob-rnum" data-line-number="5"></td>
          <td id="file-buildcalendargrid-ts-LC5" class="blob-code blob-code-inner js-file-line">const firstDayInWeek = getDay(firstDay);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L6" class="blob-num js-line-number js-blob-rnum" data-line-number="6"></td>
          <td id="file-buildcalendargrid-ts-LC6" class="blob-code blob-code-inner js-file-line">const daysInMonth = lastDay.getDate();</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L7" class="blob-num js-line-number js-blob-rnum" data-line-number="7"></td>
          <td id="file-buildcalendargrid-ts-LC7" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L8" class="blob-num js-line-number js-blob-rnum" data-line-number="8"></td>
          <td id="file-buildcalendargrid-ts-LC8" class="blob-code blob-code-inner js-file-line">const daysOutsideMonthInLastWeek = 7 &#8211; getDay(lastDay);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L9" class="blob-num js-line-number js-blob-rnum" data-line-number="9"></td>
          <td id="file-buildcalendargrid-ts-LC9" class="blob-code blob-code-inner js-file-line">const totalDaysInCalendar = daysInMonth + firstDayInWeek + daysOutsideMonthInLastWeek;</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L10" class="blob-num js-line-number js-blob-rnum" data-line-number="10"></td>
          <td id="file-buildcalendargrid-ts-LC10" class="blob-code blob-code-inner js-file-line">
</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L11" class="blob-num js-line-number js-blob-rnum" data-line-number="11"></td>
          <td id="file-buildcalendargrid-ts-LC11" class="blob-code blob-code-inner js-file-line">for (let i = 0; i &lt; totalDaysInCalendar; i++) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L12" class="blob-num js-line-number js-blob-rnum" data-line-number="12"></td>
          <td id="file-buildcalendargrid-ts-LC12" class="blob-code blob-code-inner js-file-line">  const dayIndexInMonth = i &#8211; firstDayInWeek;</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L13" class="blob-num js-line-number js-blob-rnum" data-line-number="13"></td>
          <td id="file-buildcalendargrid-ts-LC13" class="blob-code blob-code-inner js-file-line">  week.push(createGridDate(addDays(firstDay, dayIndexInMonth), isOutsideMonth(dayIndexInMonth, daysInMonth)));</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L14" class="blob-num js-line-number js-blob-rnum" data-line-number="14"></td>
          <td id="file-buildcalendargrid-ts-LC14" class="blob-code blob-code-inner js-file-line">  if (week.length === 7) {</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L15" class="blob-num js-line-number js-blob-rnum" data-line-number="15"></td>
          <td id="file-buildcalendargrid-ts-LC15" class="blob-code blob-code-inner js-file-line">    grid.push(week);</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L16" class="blob-num js-line-number js-blob-rnum" data-line-number="16"></td>
          <td id="file-buildcalendargrid-ts-LC16" class="blob-code blob-code-inner js-file-line">    week = [];</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L17" class="blob-num js-line-number js-blob-rnum" data-line-number="17"></td>
          <td id="file-buildcalendargrid-ts-LC17" class="blob-code blob-code-inner js-file-line">  }</td>
        </tr>
        <tr>
          <td id="file-buildcalendargrid-ts-L18" class="blob-num js-line-number js-blob-rnum" data-line-number="18"></td>
          <td id="file-buildcalendargrid-ts-LC18" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
  </table>
</div>


    </div>

  </div>

</div>

      </div>
      <div class="gist-meta">
        <a href="https://gist.github.com/YonatanKra/f3fc5927eff52754f224f356f4bc2e6a/raw/741c1ba4ac1d186c0b5576a7c365d6c168b07c14/buildCalendarGrid.ts" style="float:right" class="Link--inTextBlock" target="_blank" rel="noopener">view raw</a>
        <a href="https://gist.github.com/YonatanKra/f3fc5927eff52754f224f356f4bc2e6a#file-buildcalendargrid-ts" class="Link--inTextBlock" target="_blank" rel="noopener">
          buildCalendarGrid.ts
        </a>
        hosted with &#10084; by <a class="Link--inTextBlock" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
</div>

</div><figcaption>One loop to rule them all!</figcaption></figure>



<p></p>



<p>But wait! Can this small snippet replace three loops and an <code>if</code> statement?</p>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="How_to_Make_Sure_a_Refactor_Didnt_Break_My_Code"></span>How to Make Sure a Refactor Didn&#8217;t Break My Code?<span class="ez-toc-section-end"></span></h2>



<p>We made a pretty big change to the code. How can we be certain it still works the same?</p>



<p>Remember that we started by looking at the tests? This is where they shine. The tests ensure that if we change the interface while refactoring, we&#8217;ll get notified. Changing the interface is called &#8220;A Breaking Change&#8221;. Unintentionally changing the interface is called &#8220;A Bug in Production&#8221;. If we have tests in place, the warning is hard to miss:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="83" src="/wp-content/uploads/2023/08/image-7.png" alt="" class="wp-image-1774" srcset="/wp-content/uploads/2023/08/image-7.png 724w, /wp-content/uploads/2023/08/image-7.png 300w, /wp-content/uploads/2023/08/image-7.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>A message we get when something breaks</figcaption></figure></div>



<p>Tell you a secret: I broke the API several times while working on this refactor. The thing is, I knew the job was well done only when the tests passed, so no regression left my own IDE.</p>



<p>With the tests in place, refactoring boils down to just pacifying the test gods. And they send a clear green sign to let you know you are ready:</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="90" src="/wp-content/uploads/2023/08/image-6.png" alt="" class="wp-image-1773" srcset="/wp-content/uploads/2023/08/image-6.png 670w, /wp-content/uploads/2023/08/image-6.png 300w, /wp-content/uploads/2023/08/image-6.png 268w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>My tests have passed. I didn&#8217;t break anything!</figcaption></figure></div>



<h2 class="wp-block-heading"><span class="ez-toc-section" id="Summary"></span>Summary<span class="ez-toc-section-end"></span></h2>



<p>Our <strong>interface</strong> is a sacred contract between us and our consumers. I have written several times about <a href="/3-simple-habits-to-improve-your-tests/" data-type="URL" data-id="https://yonatankra.com/3-simple-habits-to-improve-your-tests/">the importance of covering the public interface</a>. I can&#8217;t stretch enough about the other side of that coin &#8211; test <strong>mostly</strong> your public interface.</p>



<p>If you don&#8217;t test your public interface, you are probably testing the <strong>implementation detail</strong>. This is bad for various reasons, such as <a href="/what-is-the-coupling-pitfall-and-how-to-avoid-it" data-type="URL" data-id="https://yonatankra.com/what-is-the-coupling-pitfall-and-how-to-avoid-it">the coupling pitfall</a>. It is also a cause for frustration with many developers about &#8220;changing the tests every time the implementation changes&#8221;.</p>



<p>Except for a very gifted few, nobody writes a perfect code the first time. A few more people make it beautiful the second time. It usually takes me three iterations to make something I&#8217;m happy with.</p>



<p>The ability to refactor with confidence is only achieved with tests (or with overconfidence, but that&#8217;s a different topic :)). In this example we saw how extensive tests can be for just one crucial function &#8211; and they take a second to run on every code change. You decide if you want your tests to run automatically or manually on every change you make.</p>



<p>What do you think? Do you make sure to distinguish between the two? Can you think of more use cases where this is important? Or maybe problematic?</p>



<p>Thanks a lot to <a href="https://github.com/benjamingr" target="_blank" data-type="URL" data-id="https://github.com/benjamingr" rel="noreferrer noopener">Benjamin Gruenbaum</a>&nbsp;and&nbsp;<em><a href="https://www.linkedin.com/in/yuval-bar-levi-70677748/" target="_blank" rel="noreferrer noopener">Yuval Bar Levi</a></em>&nbsp;for the kind and thorough review.</p>

