---
share: true
title: "Boosting Hotel Room Wi-Fi: A Simple Hack for Travelers"
date: 2023-08-25 06:00:00 -0400
filename: guide/_posts/2023-08-25-hotel-wifi
tags:
  - travel
  - hack
excerpt: A little hack for improving hotel wifi.
---


**tl;dr** buy a gl-iNet wifi router; use it as a repeater and put it close to the room door. Connect it to the hotel wifi, and your laptop to it.

![IMG_3568 1](../../../images/obsidian/IMG_3568%201.jpeg)

In the past decade, I visited tons of hotels in dozens of countries. I’ve had countless situations in which the Wi-Fi was terrible. For someone who is working constantly, even when traveling, that’s a huge burden and source of stress due to the uncertainty on what the connection quality is going to be like. Researching the hotel's connection ahead of time isn't always a reliable alternative.

This is usually due to two problems, one of which can be improved quite substantially: either bad internet or bad wifi. We can’t really fix the Internet if the provider is offering a bad service to the hotel.

The second problem, however, is manageable. Once the connection arrives at the hotel, they distribute it throughout the floors using Wi-Fi. This signal is usually ignored by people, but is generally the major cause of issues. It's impacted by furniture, interference, walls, and other manageable issues.

If you work asynchronously, you're probably fine. But if you rely on meetings and real-time collaboration, you will suffer due to these Wi-Fi antennas being positioned in poor spots. Hotels tend to put the Wi-Fi antennas in the corridors to cover all rooms. The signal needs to travel far to get to you, cross thick walls, doors and other materials. If the packets are lost along the way, which they likely will, your video call will freeze.

If you don't want to get in too many details, the trick is to buy one of these small routers to serve as a closer antenna. I travel with a small one that fits in my pocket (from gl-iNet). I set it up close to the room's door, so it's closer to the antenna. Then I connect my laptop to it.


## How Wi-Fi signal works

If you don’t know how this works, you can think of packets of data that go in and out of your computer to the antenna.

When the antenna is far away, or there are thick walls in between your device and the antenna, some of these packets get lost, and never reach or arrive in either the antenna or your device. 

For video streaming, this is generally fine because when packets are lost, your device will request them again (either TCP/IP or some streaming algorithm for UDP, basically), and your video player will buffer that data faster than you can watch (unless the internet connection itself is slow). In other words, it will store more packets than you need right now so that, even if you lose some of them, your video can continue playing. 

However, that doesn’t work for real-time meetings such as Zoom calls. In that situation you need the packet instantaneously, right now, otherwise your video will freeze. So losing packets between your device and the antenna is no bueno.

**How do I check if I'm losing signal?**

There are several ways to check the quality of the signal, but the one more often use is opening a command-line terminal and running `ping google.com`. It will show each package that is sent and received. 

Blank lines mean that the respective sent packet never returned, it was lost. When you run it over a period of a minute, you’re going to see a percentage of lost packets. 100% means nothing is lost and the connection is great. I'd say up to 1% can be considered _fine_. More than that and it means your connection is not reliable and you might lose important information during calls. 

