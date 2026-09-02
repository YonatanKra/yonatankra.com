---
title: Handling Different Kafka Message Versions
slug: handling-different-kafka-message-versions
published: 2020-06-30T19:17:52
updated: 2021-08-10T16:53:38
author: Yonatan Kra
description: "I was in a job interview a while ago and one of the problems raised there was handling different message versions in the same topic. The problem was described as follows: You have a producer of version 1.0. It sends a message in a topic that gets to a consumer of version 1.0. A need [&hellip;]"
categories:
  - name: Architecture
    slug: architecture
    path: architecture
  - name: Javascript
    slug: javascript
    path: javascript
tags:
  - architecture
  - consumers
  - javascript
  - kafka
  - producers
canonical: https://yonatankra.com/handling-different-kafka-message-versions/
comments: []
---

<figure class="wp-block-image size-large"><img data-recalc-dims="1" decoding="async" src="https://i0.wp.com/kafka.apache.org/images/logo.png?w=640&#038;ssl=1" alt=""/></figure>



<p>I was in a job interview a while ago and one of the problems raised there was handling different message versions in the same topic.</p>



<p>The problem was described as follows:</p>



<p>You have a producer of version 1.0. It sends a message in a topic that gets to a consumer of version 1.0.</p>



<p>A need arise to upgrade our message to version 2 (added features &#8211; our company&#8217;s growing). But we want to have the same topic and not create a new topic for every new version.</p>



<p>We also need to support old messages, because some customers do not update to the new version.</p>



<p>The outcome is a system that sends messages with multiple versions (1.0, 2.0, 2.2, 3.0 etc.). </p>



<p>Figure 1 illustrates how this looks like.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="480" src="/wp-content/uploads/2020/06/kafkaIssue.png" alt="" class="wp-image-406" srcset="/wp-content/uploads/2020/06/kafkaIssue.png 960w, /wp-content/uploads/2020/06/kafkaIssue.png 300w, /wp-content/uploads/2020/06/kafkaIssue.png 768w, /wp-content/uploads/2020/06/kafkaIssue.png 120w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 1: Multiple producers to multiple consumer versions. Consumer is actually a consumer group, so they scale in order to take the load.</figcaption></figure></div>



<p>While that&#8217;s not a problem in itself, a small problem arise. Assuming each message is handled by a different consumer (consumer being a nodejs microservice for instance) &#8211; how would you know to which consumer to send each message?</p>



<p>If you send the same message to all &#8211; it is relevant only to one of the consumers eventually. The heavy load on all of them might make your load balancer work overtime because each consumer group will receive all messages even though they are not relevant.</p>



<p>While the &#8220;bad&#8221; consumers would just quit when they find out they did not get a relevant message, creating an error handler for such a system can become quite a mess. In this case we are waiting for a single &#8220;I handled it&#8221; response from multiple consumer groups. The simpler case we would prefer would be to wait for a single response from one consumer stating if the process succeeded or not.</p>



<p>Let&#8217;s summarise our problems. Kafka just sends the topic to all consumers, even those that cannot handle that message. The naive solution would be to create multiple consumes &#8211; one per version &#8211; that handle the messages.</p>



<p>This creates another problem in regards to traffic and resources &#8211; the raising of so many consumers. In addition, we increase the complexity in error handling.</p>



<p>Kafka has no mechanism (at least not one I heard of) that directs traffic according to content. </p>



<h3 class="wp-block-heading">One Consumer &#8211; Dynamic Handlers</h3>



<p>The solution turned out to be pretty simple</p>



<p>Instead of creating multiple consumers &#8211; we create one consumer that can dynamically handle the correct version.  This way, we just need one consumer group, and the message is always handled correctly (in regards to version).</p>



<p>Here&#8217;s a simple code that does that:</p>



<pre class="wp-block-code"><code>function handleMessage(msg) {
      const { version } = msg.properties.headers;
    
      let handler;
      switch (version) {
        case '1.0':
          handler = require('./handlers/1.0');
          break;
        case '1.1':
          handler = require('./handlers/1.1');
          break;
        case '2.0':
          handler = require('./handlers/2.0');
          break;
        case '2.2':
          handler = require('./handlers/2.2');
          break;
        case '3.0':
          handler = require('./handlers/3.0');
          break;
        default:
          return notifyErrorAndExit(new Error('unknown version'), msg);
      }
      return handler(version, msg);
    }</code></pre>



<p>The handle message function gets the correct handler according to the version &#8211; and activates it on the message received.</p>



<p>Here&#8217;s a simple example of using this handler:</p>



<pre class="wp-block-code"><code>kafkaConsumer.start({
    groupId,
    topicsList: &#91;TOPIC_1],
    onData: handleMessage,
    onError: notifyErrorAndExit
  })</code></pre>



<p>The kafka consumer starts, listens to topic 1 and when data is received, it uses handle message to handle the data.</p>



<p>Figure 2 shows the much simpler architecture we have now.</p>



<div class="wp-block-image"><figure class="aligncenter size-large"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="480" src="/wp-content/uploads/2020/06/Version-handling-kafka.png" alt="" class="wp-image-408" srcset="/wp-content/uploads/2020/06/Version-handling-kafka.png 960w, /wp-content/uploads/2020/06/Version-handling-kafka.png 300w, /wp-content/uploads/2020/06/Version-handling-kafka.png 768w, /wp-content/uploads/2020/06/Version-handling-kafka.png 120w" sizes="auto, (max-width: 640px) 100vw, 640px" /><figcaption>Figure 2: Our multiple consumers are now one dynamic consumer inside a load balanced group.</figcaption></figure></div>



<h2 class="wp-block-heading">Summary</h2>



<p>In this article we saw how we can reduce the complexity of a system using a very simple mechanism.</p>



<p>Our need was to change message versions while keeping backward compatibility. The naive approach of creating a new service that handles the new message created some problems and added a lot of complexity.</p>



<p>Eventually, the solution was to keep to one service that dynamically called the correct data handler.</p>



<p>Thanks to <a rel="noreferrer noopener" href="https://twitter.com/Piotr_Zientara" target="_blank">Piotr</a> from <a rel="noreferrer noopener" href="https://twitter.com/XFaang" target="_blank">xFAANG</a> for the kind review. Remember to visit their project <a rel="noreferrer noopener" href="https://github.com/xFAANG/askql" target="_blank">AskQL </a>&#x1f601;</p>



<p> </p>

