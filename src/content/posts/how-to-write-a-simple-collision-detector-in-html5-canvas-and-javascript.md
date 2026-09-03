---
title: How to write a simple collision detector in HTML5 canvas and JavaScript?
slug: how-to-write-a-simple-collision-detector-in-html5-canvas-and-javascript
published: 2021-08-12T14:44:53
updated: 2021-08-16T20:38:49
author: Yonatan Kra
description: Collision detection is the basics of entities interaction on canvas. Imagine you have a Player Character (PC) that’s walking through a maze and you’d like to know if this PC bumps into a wall or can keep on going. One can argue that there’s a wall crossing potion somewhere, but let’s assume one doesn’t have [&hellip;]
categories:
  - name: Algorithms
    slug: algorithms
    path: coding/algorithms
  - name: canvas
    slug: canvas
    path: javascript/canvas
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - algorithms
  - canvas
  - javascript
canonical: https://yonatankra.com/how-to-write-a-simple-collision-detector-in-html5-canvas-and-javascript/
comments: []
featuredImage: /wp-content/uploads/2021/08/collision-detection.jpeg
---

<p class="has-medium-font-size">Collision detection is the basics of entities interaction on canvas. Imagine you have a Player Character (PC) that&#8217;s walking through a maze and you&#8217;d like to know if this PC bumps into a wall or can keep on going. One can argue that  there&#8217;s a <code>wall crossing potion</code> somewhere, but let&#8217;s assume one doesn&#8217;t have it (yet). Let&#8217;s see how we can make this work.</p>



<p>We won&#8217;t be starting with something as simple as a maze crawler. We are going to Help the Developer Find the Pizza. It&#8217;s a great game. You&#8217;re going to LOVE it.  Oh, and we&#8217;re also going to do some&#8230; Maths&#8230;</p>



<h2 class="wp-block-heading">What is <meta charset="utf-8">Help the Developer Find the Pizza?</h2>



<p>In essence, there&#8217;s an image of a pizza and an image of a developer.  The developer jumps randomly in the canvas looking for the pizza:</p>



<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-slug-hash="qBmgLqK" data-user="yonatankra" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/yonatankra/pen/qBmgLqK" target="_blank" rel="noopener">
  Canvas collision detection</a> by Yonatan Kra (<a href="https://codepen.io/yonatankra" target="_blank" rel="noopener">@yonatankra</a>)
  on <a href="https://codepen.io" target="_blank" rel="noopener">CodePen</a>.</span>
</p>
<script async="" src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



<p>As you can see, the developer is so wrapped up in coding, the pizza eludes them.  So our coding challenge would be &#8211; create a function that finds out if the developer is on the pizza.</p>



<h2 class="wp-block-heading">How to detect collision in a Canvas?</h2>



<p>In essence, we need to make sure that the rectangle of the developer overlaps with the rectangle of the pizza.</p>



<p>Let&#8217;s do a simple math lesson.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="356" height="340" src="/wp-content/uploads/2021/08/image-4.png" alt="" class="wp-image-967" srcset="/wp-content/uploads/2021/08/image-4.png 356w, /wp-content/uploads/2021/08/image-4.png 300w, /wp-content/uploads/2021/08/image-4.png 94w" sizes="auto, (max-width: 356px) 100vw, 356px" /><figcaption>Figure 1: X coordinates of our developer and pizza.</figcaption></figure></div>



<p>The coordinates illustrated in Figure 1 designate the leftmost X coordinate of each shape (Xd1 and Xp1) and the rightmost X coordinates (Xd2 and Xp2). <code>d</code> and <code>p</code> stand for <code>developer</code> and <code>pizza</code> respectively.</p>



<p>In order to know if developer and pizza collide in the X axis, we need to check the following: either our leftmost developer Xd is between the range of the Pizza&#8217;s X or our rightmost Xd is in that same range. In Math we would write it like this:</p>



<p class="has-text-align-center"><code>Xp1 &lt;= Xd1 &lt;= Xp2 OR Xp1 &lt;= Xd2 &lt;= Xp2</code></p>



<p>In code it will look like this:</p>



<p class="has-text-align-center"><code>const overlapX = (Xd1 &lt;= Xp2 &amp;&amp; Xd1 &gt;= Xp1) || (Xd2 &lt;= Xp2 &amp;&amp; Xd2 &gt;= Xp1);</code></p>



<p>The same applies to the Y axis. This time, the coordinates will be as shown in Figure 2.</p>



<div class="wp-block-image"><figure class="aligncenter size-full"><img data-recalc-dims="1" loading="lazy" decoding="async" width="332" height="450" src="/wp-content/uploads/2021/08/image-5.png" alt="" class="wp-image-971" srcset="/wp-content/uploads/2021/08/image-5.png 332w, /wp-content/uploads/2021/08/image-5.png 221w, /wp-content/uploads/2021/08/image-5.png 66w" sizes="auto, (max-width: 332px) 100vw, 332px" /><figcaption>Figure 2: Y axis coordinates notation</figcaption></figure></div>



<p>We apply the same logic to the Y axis:</p>



<p class="has-text-align-center"><code><meta charset="utf-8">const overlapY = (Yd1 &lt;= Yp2 &amp;&amp; Yd1 &gt;= Yp1) || (Yd2 &lt;= Yp2 &amp;&amp; Yd2 &gt;= Yp1);</code></p>



<p>And we can now easily implement this in our <code>jump</code> function:</p>



<pre class="wp-block-code"><code>function jump(&#91;pizzaImage, developerImage]) {
  ctx.clearRect(0,0,HEIGHT,WIDTH);

  const pizza = drawStaticShape(pizzaImage);
  const dev = drawJumpingShape(developerImage);

  const devXRight = dev.x + dev.width;
  const pizzaXRight = pizza.x + pizza.width;
  const devYBottom = dev.y + dev.height;
  const pizzaYBottom = pizza.y + pizza.height;

  const overlapX = (dev.x &lt;= pizzaXRight &amp;&amp; dev.x &gt;= pizza.x) || 
    (devXRight &lt;= pizzaXRight &amp;&amp; devXRight &gt;= pizza.x);
  const overlapY = (dev.y &lt;= pizzaYBottom &amp;&amp; dev.y &gt;= pizza.y) || 
     (devYBottom &lt;= pizzaYBottom &amp;&amp; devYBottom &gt;= pizza.y);
  const isColliding = overlapX &amp;&amp; overlapY;
  if (isColliding) {
    console.log("A Happy Developer is a Pizza-fed Developer!");
  }
}</code></pre>



<p>Notice that the drawing functions now return the coordinates and dimensions. We use them in order to calculate the right and bottom dev and pizza values (this is just like the coordinates ending with 2 like <code>Xd2</code> and <code>Yp2</code> from the equations above). We then calculate the overlap for every axis and the collision is the <code>AND</code> of both overlaps.</p>



<p>And now we have a rectangles collision detection algorithm we can use! You can view the full code <a rel="noreferrer noopener" href="https://codepen.io/yonatankra/pen/zYweyQJ" data-type="URL" data-id="https://codepen.io/yonatankra/pen/zYweyQJ" target="_blank">here</a>.</p>



<h2 class="wp-block-heading">Summary</h2>



<p>Collision detection is one of the basics of game development. You have to know if entities collide in order to interact with each other in your game or app.</p>



<p>Now &#8211; I don&#8217;t want to be a party pooper, but if you&#8217;ve had enough Math for today think what would it take to calculate collision with polygons or some other custom non-uniformly curved shapes (trust me, I&#8217;ve been there and the Math is BEAUTIFUL 🙂 ). </p>



<p>You could, of course, avoid the Math and the whole wonderful learning process by using frameworks like <a rel="noreferrer noopener" href="https://phaser.io/" data-type="URL" data-id="https://phaser.io/" target="_blank">phaserjs</a>, <a rel="noreferrer noopener" href="https://schteppe.github.io/cannon.js/" data-type="URL" data-id="https://schteppe.github.io/cannon.js/" target="_blank">cannojs</a>, <a rel="noreferrer noopener" href="https://github.com/kripken/ammo.js/" data-type="URL" data-id="https://github.com/kripken/ammo.js/" target="_blank">ammojs</a> and more. Because my aim is to study the basics, I do not use frameworks for these kind of learning projects.  Then again &#8211; one might develop a real game at some point and then one would use a framework that will make the development smoother. I do believe this hard learned knowledge of how things work under the hood comes in handy then.</p>



<p>Hope you enjoyed this one. As always, would love your feedback and to see what you can do with collision detection on Canvas 🙂</p>



<p>Featured Image Photo by <a href="https://unsplash.com/@soberanes?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Uriel Soberanes</a> on <a href="https://unsplash.com/s/photos/collision?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></p>

