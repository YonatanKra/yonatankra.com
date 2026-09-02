---
title: Bitwise Operators
slug: bitwise-operators-565e3ceb90cd
published: 2018-10-03T00:00:00
updated: 2021-08-10T16:53:39
author: Yonatan Kra
description: Bitwise Operators Bitwise operators are frequently used by the pros, usually for memory-related performance boosts. What are they, when should you use them, and how do they impact performance? Stay tuned for answers to all of this and more! This subject irked me for a long time. I saw it. I heard about it. I [&hellip;]
categories:
  - name: Coding
    slug: coding
    path: coding
tags: []
canonical: https://yonatankra.com/bitwise-operators-565e3ceb90cd/
comments: []
---

<div id="ez-toc-container" class="ez-toc-v2_0_87 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">
<p class="ez-toc-title" style="cursor:inherit">Table of Contents</p>
<label for="ez-toc-cssicon-toggle-item-6a97b1ecb0dbf" class="ez-toc-cssicon-toggle-label"><span class=""><span class="eztoc-hide" style="display:none;">Toggle</span><span class="ez-toc-icon-toggle-span"><svg style="fill: #999;color:#999" xmlns="http://www.w3.org/2000/svg" class="list-377408" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z" fill="currentColor"></path></svg><svg style="fill: #999;color:#999" class="arrow-unsorted-368013" xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 24 24" version="1.2" baseProfile="tiny"><path d="M18.2 9.3l-6.2-6.3-6.2 6.3c-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3h11c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7s-.1-.5-.3-.7zM5.8 14.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7s.1.5.3.7z"/></svg></span></span></label><input type="checkbox"  id="ez-toc-cssicon-toggle-item-6a97b1ecb0dbf"  aria-label="Toggle" /><nav><ul class='ez-toc-list ez-toc-list-level-1 ' ><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-1" href="/bitwise-operators-565e3ceb90cd/#Bitwise_Operators" >Bitwise Operators</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-2" href="/bitwise-operators-565e3ceb90cd/#The_Bits_and_Pieces" >The Bits and Pieces</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-3" href="/bitwise-operators-565e3ceb90cd/#The_Meaning_of_Nothing" >The Meaning of Nothing</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-4" href="/bitwise-operators-565e3ceb90cd/#Signed_Integers" >Signed Integers</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-5" href="/bitwise-operators-565e3ceb90cd/#Bitwise_Shift_Operators" >Bitwise Shift Operators</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-6" href="/bitwise-operators-565e3ceb90cd/#Bitwise_Left_Shift" >Bitwise Left Shift (&lt;&lt;)</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-7" href="/bitwise-operators-565e3ceb90cd/#Bitwise_Right_Shift_%3E%3E%3E_and_%3E%3E" >Bitwise Right Shift (&gt;&gt;&gt; and &gt;&gt;)</a></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-8" href="/bitwise-operators-565e3ceb90cd/#The_Bitwise_Logic_Operators" >The Bitwise Logic Operators</a><ul class='ez-toc-list-level-4' ><li class='ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-9" href="/bitwise-operators-565e3ceb90cd/#1_Bitwise_AND" >1. Bitwise AND (&amp;)</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-10" href="/bitwise-operators-565e3ceb90cd/#2_Bitwise_OR" >2. Bitwise OR (|)</a></li><li class='ez-toc-page-1 ez-toc-heading-level-4'><a class="ez-toc-link ez-toc-heading-11" href="/bitwise-operators-565e3ceb90cd/#4_NOT" >4. NOT (~)</a></li></ul></li><li class='ez-toc-page-1 ez-toc-heading-level-3'><a class="ez-toc-link ez-toc-heading-12" href="/bitwise-operators-565e3ceb90cd/#Parting_Thoughts" >Parting Thoughts</a></li></ul></nav></div>
<h3 id="1d5d" class="graf graf--h3 graf--leading graf--title"><span class="ez-toc-section" id="Bitwise_Operators"></span>Bitwise Operators<span class="ez-toc-section-end"></span></h3>
<figure><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/cdn-images-1.medium.com/max/800/0%2AMxQStmus2ovu-Unv.jpg?w=640&#038;ssl=1" alt="" /><figcaption></figcaption></figure>
<p id="3ac2" class="graf graf--p graf-after--figure">Bitwise operators are frequently used by the pros, usually for memory-related performance boosts. What are they, when should you use them, and how do they impact performance? Stay tuned for answers to all of this and more!</p>
<p id="7e0a" class="graf graf--p graf-after--p">This subject irked me for a long time. I saw it. I heard about it. I even <em class="markup--em markup--p-em">used </em>it without fully understanding it (at least at first). It can certainly be confusing for newbies (heck — it was confusing for me when I already had 10 years’ experience).</p>
<p id="8a79" class="graf graf--p graf-after--p">I believe we are only confused by concepts we’ve learned if they’re taught to us poorly. So, in the name of dispelling confusion, here’s my attempt at <em class="markup--em markup--p-em">effectively</em> explaining <strong class="markup--strong markup--p-strong">the bit only wise people can see</strong>.</p>
<blockquote id="b0d8" class="graf graf--pullquote graf-after--p"><p>This article assumes that you know what binary numbers are and how to read them. If not, you might want to <a class="markup--anchor markup--pullquote-anchor" href="https://en.wikipedia.org/wiki/Binary_number" target="_blank" rel="noopener noreferrer" data-href="https://en.wikipedia.org/wiki/Binary_number" data->read this</a> before proceeding.</p></blockquote>
<h3 id="db9a" class="graf graf--h3 graf-after--pullquote"><span class="ez-toc-section" id="The_Bits_and_Pieces"></span>The Bits and Pieces<span class="ez-toc-section-end"></span></h3>
<p id="22ca" class="graf graf--p graf-after--h3">Imagine you have an app (go ahead… I’ll wait) with several boolean flags that declare the state of your app. For instance, here is a list of some of these hypothetical flags and what they might mean:</p>
<ol class="postList">
<li id="19a2" class="graf graf--li graf-after--p"><strong class="markup--strong markup--li-strong">Menu open</strong>: Should I show the side menu?</li>
<li id="489a" class="graf graf--li graf-after--li"><strong class="markup--strong markup--li-strong">List focused</strong>: Should I highlight the list component?</li>
<li id="6f2a" class="graf graf--li graf-after--li"><strong class="markup--strong markup--li-strong">Request ongoing</strong>: Should I show the progress circle?</li>
<li id="c934" class="graf graf--li graf-after--li"><strong class="markup--strong markup--li-strong">Process X running</strong>: Should I show the <em class="markup--em markup--li-em">process X running </em>sign?</li>
</ol>
<p id="9ce0" class="graf graf--p graf-after--li">And let’s further image these flags’ current individual states are as follows:</p>
<ol class="postList">
<li id="7c85" class="graf graf--li graf-after--p">0 (false)</li>
<li id="9e8f" class="graf graf--li graf-after--li">0 (false)</li>
<li id="3062" class="graf graf--li graf-after--li">1 (true)</li>
<li id="98eb" class="graf graf--li graf-after--li">0 (false)</li>
</ol>
<p id="e3ad" class="graf graf--p graf-after--li">So… you can represent your app’s state as follows: 0010 (see image below):</p>
<figure><img loading="lazy" decoding="async" class="aligncenter" src="https://miro.medium.com/max/1200/0*KQMEyVnU3k2v5knE" alt="" width="960" height="540" />These 0s and 1s are our bits. Each bit is <a class="markup--anchor markup--p-anchor" href="https://www.youtube.com/watch?v=lhDY-0La81Y" target="_blank" rel="noopener noreferrer" data-href="https://www.youtube.com/watch?v=lhDY-0La81Y" data-><em class="markup--em markup--p-em">binary</em></a>, which means that every bit has two states: 1 and 0.</figure>
<p id="f295" class="graf graf--p graf-after--p">This <em class="markup--em markup--p-em">binary sequence</em> (0010) can be converted into decimal (the intuitive way we humans look at numbers (i.e., 1, 2, 3, 4, etc.)). In JavaScript, we can convert between the two representations easily.</p>
<p id="6fad" class="graf graf--p graf-after--p">From binary to decimal:</p>
<blockquote id="2b38" class="graf graf--blockquote graf-after--p"><p><code class="markup--code markup--blockquote-code u-paddingRight0 u-marginRight0">parseInt(“0010”, 2); <em class="markup--em markup--blockquote-em">// results in “2”</em></code></p></blockquote>
<p id="12a1" class="graf graf--p graf-after--blockquote">And from decimal to binary:</p>
<blockquote id="3e9b" class="graf graf--blockquote graf-after--p"><p><code class="markup--code markup--blockquote-code u-paddingRight0 u-marginRight0">const x = 2; x.toString(2); <em class="markup--em markup--blockquote-em">// results in “10”</em></code></p></blockquote>
<p id="d1e2" class="graf graf--p graf-after--blockquote">That means that every binary sequence (or each of your app’s binary state sequences) can be represented as a single integer!!!</p>
<p id="7fa6" class="graf graf--p graf-after--p"><a class="markup--anchor markup--p-anchor" href="https://www.youtube.com/watch?v=re7O5q3xuTg" target="_blank" rel="noopener noreferrer" data-href="https://www.youtube.com/watch?v=re7O5q3xuTg" data->How about that?</a> Can you think of any implications this might have for your app?</p>
<figure><img decoding="async" src="https://miro.medium.com/max/738/0*ajV2cWsi0j9NxEGQ" /></figure>
<p id="c799" class="graf graf--p graf-after--figure">Just sayin’…</p>
<h3 id="3aa3" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="The_Meaning_of_Nothing"></span>The Meaning of Nothing<span class="ez-toc-section-end"></span></h3>
<p id="5c20" class="graf graf--p graf-after--h3">Did you notice that when I converted 0010 to binary, the result was 2, but when I converted 2 back to binary, the result was only 10? This happens because leading zeros are meaningless; they add no information and hence are not needed. Here’s why:</p>
<blockquote id="95c9" class="graf graf--blockquote graf-after--p"><p>000000000000000000000000010 = 10</p></blockquote>
<p id="f5a1" class="graf graf--p graf-after--blockquote">This concludes the philosophical portion of this article.</p>
<h3 id="1116" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="Signed_Integers"></span>Signed Integers<span class="ez-toc-section-end"></span></h3>
<p id="4c8f" class="graf graf--p graf-after--h3">You may have heard this phrase (or a fuller version like “32/64-bit signed integers”) before. The bitwise operators work with 32-bit signed integers. They actually convert the integers you supply as input (more on that later) to 32-bit signed integers. Let’s discuss what a signed integer is, beginning with signed 32-bit integers:</p>
<p id="ac81" class="graf graf--p graf-after--p">32 bits means the number is represented by, well, 32 bits.</p>
<blockquote id="5061" class="graf graf--blockquote graf-after--p"><p>00000000000000000000000001100000 //96</p></blockquote>
<p id="cd01" class="graf graf--p graf-after--blockquote">If the left-most bit signifies the sign of the number (i.e., 96 vs -96), then the left-most bit is called the <em class="markup--em markup--p-em">sign bit</em>.</p>
<p id="0e21" class="graf graf--p graf-after--p">This 32 bit, signed binary format is called the two’s complement format. In this format, a number’s negative counterpart is the reverse of all bits in the number (one’s complement) plus one. So, noting the 32-bit representation of 96 above, -96 would be calculated like this, in two steps:</p>
<blockquote id="ea78" class="graf graf--blockquote graf-after--p"><p>11111111111111111111111110011111 // -97 -&gt; <a class="markup--anchor markup--blockquote-anchor" href="http://en.wikipedia.org/wiki/Ones%27_complement" target="_blank" rel="noopener noreferrer" data-href="http://en.wikipedia.org/wiki/Ones%27_complement" data->one’s complement</a></p></blockquote>
<blockquote id="758c" class="graf graf--blockquote graf-after--blockquote"><p>+ 1</p></blockquote>
<blockquote id="95bd" class="graf graf--blockquote graf-after--blockquote"><p>11111111111111111111111110100000 // -96 -&gt; <a class="markup--anchor markup--blockquote-anchor" href="http://en.wikipedia.org/wiki/Two%27s_complement" target="_blank" rel="noopener noreferrer" data-href="http://en.wikipedia.org/wiki/Two%27s_complement" data->two’s complement</a></p></blockquote>
<p id="b986" class="graf graf--p graf-after--blockquote">The reason for using two’s complement is out of the scope of this article, but is explained <a class="markup--anchor markup--p-anchor" href="https://stackoverflow.com/questions/11054213/advantage-of-2s-complement-over-1s-complement" target="_blank" rel="noopener noreferrer" data-href="https://stackoverflow.com/questions/11054213/advantage-of-2s-complement-over-1s-complement" data->here</a>.</p>
<h3 id="f169" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="Bitwise_Shift_Operators"></span>Bitwise Shift Operators<span class="ez-toc-section-end"></span></h3>
<p id="57a3" class="graf graf--p graf-after--h3">Bitwise shift operators are just what their name implies — they shift the bits either to the left or the right.</p>
<h3 id="39bc" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="Bitwise_Left_Shift"></span>Bitwise Left Shift (&lt;&lt;)<span class="ez-toc-section-end"></span></h3>
<p id="9a04" class="graf graf--p graf-after--h3">Adds zeros from the right. This means the number is doubled with every shift, until we reach the 32 bit boundary. Then, we start using our knowledge regarding the sign bit.</p>
<p id="10ef" class="graf graf--p graf-after--p"><a class="markup--anchor markup--p-anchor" href="https://next.plnkr.co/plunk/vhMH3W90KowX2cwS" target="_blank" rel="noopener noreferrer" data-href="https://next.plnkr.co/plunk/vhMH3W90KowX2cwS" data->Let’s see an example</a>.</p>
<p id="e034" class="graf graf--p graf-after--p">1 &lt;&lt; 0 = “1&#8243; = 1</p>
<p id="679a" class="graf graf--p graf-after--p">1 &lt;&lt; 1 = “10” = 2</p>
<p id="4293" class="graf graf--p graf-after--p">1 &lt;&lt; 2 = “100” = 4</p>
<p id="1ddf" class="graf graf--p graf-after--p">Here’s an example showing this concept in action:</p>
<p id="98ab" class="graf graf--p graf-after--p">The number five is represented by three bits: <em class="markup--em markup--p-em">101</em>. Recall the sign bit rule: If we have a signed bit of 0, our number is positive. If it is 1, our number is negative. Recall that five can be written like this:</p>
<blockquote id="3145" class="graf graf--blockquote graf-after--p"><p>00000000000000000000000000000101</p></blockquote>
<p id="aae8" class="graf graf--p graf-after--blockquote">If we choose to do so, our signed (left-most) bit is zero.</p>
<p id="2699" class="graf graf--p graf-after--p">If you shift this number 27 bits to the left (5 &lt;&lt; 27), 27 zeros are added to the right of the 101, doubling the decimal value with each zero. Since the number started with three bits, adding 27 zeros on the right means we now have 30 bits including and to the right of 101.</p>
<blockquote id="cb10" class="graf graf--blockquote graf-after--p"><p>01010000000000000000000000000000</p></blockquote>
<p id="563c" class="graf graf--p graf-after--blockquote">That still leaves us positive, since our left-most bit is still 0.</p>
<p id="3a6f" class="graf graf--p graf-after--p">Left shifting five for 28 bits (5 &lt;&lt; 28) gives us a total of 31 bits to the right. Still positive.</p>
<p id="45fd" class="graf graf--p graf-after--p">However, if we left shift five by 29 bits (5 &lt;&lt; 29), we will reach 32 bits, and the left-most bit will be 1. <em class="markup--em markup--p-em">Finally</em>, our number is negative!</p>
<figure>
<p><figure style="width: 960px" class="wp-caption alignnone"><img loading="lazy" decoding="async" src="https://miro.medium.com/max/1200/0*6HjozKH5RMlF4Ky_" alt="" width="960" height="540" /><figcaption class="wp-caption-text">Left shifting the number 5</figcaption></figure></p>
<p>I’ve built this <a class="markup--anchor markup--p-anchor" href="https://next.plnkr.co/plunk/vhMH3W90KowX2cwS" target="_blank" rel="noopener noreferrer" data-href="https://next.plnkr.co/plunk/vhMH3W90KowX2cwS" data->simple tool</a>. With it, you can enter a number and see its left-shifted values up to a maximum of 32 shifts.</figure>
<figure>Notice that the bigger the number, the sooner there are negative values; this is because, once any 1 in the binary number is pushed to the left-most (32nd) bit, it becomes the <em class="markup--em markup--p-em">signed bit </em>and flips the number’s sign to negative.</figure>
<p id="a19d" class="graf graf--p graf-after--p">Still confused? You can play around some more with the online tool <a class="markup--anchor markup--p-anchor" href="https://next.plnkr.co/plunk/vhMH3W90KowX2cwS" target="_blank" rel="noopener noreferrer" data-href="https://next.plnkr.co/plunk/vhMH3W90KowX2cwS" data->here</a>.</p>
<h3 id="8300" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="Bitwise_Right_Shift_%3E%3E%3E_and_%3E%3E"></span>Bitwise Right Shift (&gt;&gt;&gt; and &gt;&gt;)<span class="ez-toc-section-end"></span></h3>
<p id="60aa" class="graf graf--p graf-after--h3">We have two types of right shifts: Zero-fill (<strong class="markup--strong markup--p-strong"><em class="markup--em markup--p-em">&gt;&gt;&gt;</em></strong>) and sign-preserving (<strong class="markup--strong markup--p-strong"><em class="markup--em markup--p-em">&gt;&gt;</em></strong>).</p>
<p id="d2c4" class="graf graf--p graf-after--p">Zero-fill does the same as left shift, only it adds the zeros from the left (pushing to the right). This can result in a sign change if our number is negative (since it will change the sign bit). You can use it as follows:</p>
<blockquote id="317b" class="graf graf--blockquote graf--hasDropCapModel graf-after--p"><p>5000 &gt;&gt;&gt; 3 <em class="markup--em markup--blockquote-em">//625</em><br />
-5000 &gt;&gt;&gt; 3 <em class="markup--em markup--blockquote-em">//536870287</em></p></blockquote>
<p id="18f4" class="graf graf--p graf-after--blockquote">Sign-preserving adds a copy of the left-most bit — hence preserving the the sign bit. You can use it like this:</p>
<blockquote id="8c15" class="graf graf--blockquote graf-after--p"><p>5000 &gt;&gt; 3 <em class="markup--em markup--blockquote-em">//625</em><br />
-5000 &gt;&gt; 3 <em class="markup--em markup--blockquote-em">//-625</em></p></blockquote>
<p id="218f" class="graf graf--p graf-after--blockquote">You can see it in action with <a class="markup--anchor markup--p-anchor" href="https://next.plnkr.co/plunk/8Hs1NGBF1RWxn4xp" target="_blank" rel="noopener noreferrer" data-href="https://next.plnkr.co/plunk/8Hs1NGBF1RWxn4xp" data->this tool</a>.</p>
<h3 id="0037" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="The_Bitwise_Logic_Operators"></span>The Bitwise Logic Operators<span class="ez-toc-section-end"></span></h3>
<p id="55ba" class="graf graf--p graf-after--h3">Now that we know what bits are and how to manipulate them, we can move on to bitwise logic operators. There are four bitwise logic operators:</p>
<h4 id="4a96" class="graf graf--h4 graf-after--p"><span class="ez-toc-section" id="1_Bitwise_AND"></span>1. Bitwise AND (&amp;)<span class="ez-toc-section-end"></span></h4>
<p id="35d5" class="graf graf--p graf-after--h4">Here’s an example of bitwise AND:</p>
<blockquote id="e8eb" class="graf graf--blockquote graf-after--p"><p>5 &amp; 13 <em class="markup--em markup--blockquote-em">// output is 5</em></p></blockquote>
<p id="aad9" class="graf graf--p graf-after--blockquote">What’s happening behind the scenes is well-represented by <a class="markup--anchor markup--p-anchor" href="https://gist.github.com/YonatanKra/a4d059a115aa00cadb3620df364615de" target="_blank" rel="noopener noreferrer" data-href="https://gist.github.com/YonatanKra/a4d059a115aa00cadb3620df364615de" data->this algorithm</a>.</p>
<p id="ce4c" class="graf graf--p graf-after--p">Holla!</p>
<h4 id="4723" class="graf graf--h4 graf-after--p"><span class="ez-toc-section" id="2_Bitwise_OR"></span>2. Bitwise OR (|)<span class="ez-toc-section-end"></span></h4>
<p id="8808" class="graf graf--p graf-after--h4">The bitwise OR operator ( | ) acts the same as AND, except that it returns true whenever at least one of the relative bits is 1. Here’s an example operation:</p>
<blockquote id="f8e9" class="graf graf--blockquote graf-after--p"><p>5 | 13 <em class="markup--em markup--blockquote-em">// output is 13</em></p></blockquote>
<p id="f2aa" class="graf graf--p graf-after--blockquote">And <a class="markup--anchor markup--p-anchor" href="https://gist.github.com/YonatanKra/c19e36140a9604222cbae1e7cf09d12b" target="_blank" rel="noopener noreferrer" data-href="https://gist.github.com/YonatanKra/c19e36140a9604222cbae1e7cf09d12b" data->here’s an algorithm</a>!</p>
<p id="f473" class="graf graf--p graf-after--p">Why do I spoil you so?…</p>
<p id="eec7" class="graf graf--p graf-after--p"><strong class="markup--strong markup--p-strong">3. Bitwise XOR (^)</strong></p>
<p id="bf9e" class="graf graf--p graf-after--p">XOR (^) returns 1 every time only one of the bits in a pair is 1, but 0 when the bits are the same. So 0/0 returns 0, 1/1 returns 0 but 1/0 and 0/1 return 1. It is used like this:</p>
<blockquote id="3222" class="graf graf--blockquote graf-after--p"><p>5 ^ 13 <em class="markup--em markup--blockquote-em">// output is 8</em></p></blockquote>
<p id="c494" class="graf graf--p graf-after--blockquote">Implementing the XOR is your homework. It’s the same algorithm — with different validation.</p>
<p id="f8d5" class="graf graf--p graf-after--p">You can verify your results via the browser’s console (using the parseInt and toString(2) methods to verify your answer). You can also debug using a binary calculator like <a class="markup--anchor markup--p-anchor" href="https://www.calculator.net/binary-calculator.html" target="_blank" rel="noopener noreferrer" data-href="https://www.calculator.net/binary-calculator.html" data->this one</a>.</p>
<h4 id="3c98" class="graf graf--h4 graf-after--p"><span class="ez-toc-section" id="4_NOT"></span>4. NOT (~)<span class="ez-toc-section-end"></span></h4>
<p id="c1d5" class="graf graf--p graf-after--h4">The NOT operator (~) just flips the bits. So every 1 bit turns to 0, and vice versa. It only receives one operand, like this:</p>
<p id="20d3" class="graf graf--p graf-after--p">~ 16 <em class="markup--em markup--p-em">// </em>output is -17</p>
<p id="4524" class="graf graf--p graf-after--p">The algorithm is simple to implement. In decimals, it would look like this:</p>
<p id="fd6e" class="graf graf--p graf-after--p">-(x + 1)</p>
<h3 id="9c4d" class="graf graf--h3 graf-after--p"><span class="ez-toc-section" id="Parting_Thoughts"></span>Parting Thoughts<span class="ez-toc-section-end"></span></h3>
<p id="e477" class="graf graf--p graf-after--h3">Now you know all about bitwise operators and how they work!</p>
<p id="a195" class="graf graf--p graf-after--p">While I’m sure you’re super eager to try out what you’ve learned, in most cases it’s a best practice to avoid using bitwise operators for readability’s sake. However, in performance-sensitive operations (especially in games or other rendering engines like Angular), bitwise operators may be just the ticket.</p>
<p id="a2d5" class="graf graf--p graf-after--p">Bitwise operators are widely used in graphics-rendering (gaming anyone?) but not just. There are plenty more use cases as well; flags, compression, and encryption are among the most common use-cases of bitwise operators.</p>
<p id="6cb8" class="graf graf--p graf-after--p graf--trailing">In my upcoming articles, I will show you real world use-cases in JavaScript, as well as their performance implications.</p>

