# Body Stack

A new approach to full-page overlays on the web.

## The Problem

When creating full-page overlays (ie. for navigation menus) there are a lot of details to get right, especially if you're concerned about accessibility. You need to be aware of z-index and stacking contexts, focus management, scroll-locking, alerting changes to screen readers, etc.

## The Solution

Body Stack helps you create an entirely new body element, maintain a reference to the old one, and replace the old body with the new body. 

The old body is kept in memory, and all dynamic state and event listeners are maintained. However, since it's removed from the document entirely, there's absolutely no way for it to interfere with your overlay.

### A Few More Details

Rather than maintaining a single reference to the "old body", Body Stack actually maintains a stack of "ancestor bodies" (hence the name). This means you can push as many overlays as you'd like, and pop them one by one.

When popping a body from the stack and restoring the previous body, Body Stack also restores all scroll positions and element focus, since that state is lost when you take elements out of the document.

## Demo

https://a-p-f.github.io/body_stack/index.html

## Accessibility

With this approach, focus management basically takes care of itself.

It seems to me that this approach is screen-reader friendly, too. I tried out the demo page quickly using ChromeVox, and it seemed perfectly navigable (though I'm not a regular screen-reader user, so my opinion isn't worth much). I'd love to hear other people's thoughts on this. 

I did notice that the orange ChromeVox outline disappeared while the overlay was open, but it still read elements correctly. This seems to be a bug with ChromeVox.

## Other Existing Solutions

### Separate Page
The closest solution to Body Stack is actually implementing your "overlay" as a full separate page. This can actually work quite well in some situations, especially if you have your "close" button fire `history.back()`. However, Body Stack makes more sense if:

- the overlay makes no sense on its own, and should not be directly accessible via url
- the original page is highly dynamic, and you don't want to manually restore state upon closing the overlay

### Libraries
There are a number of libraries out there for this sort of thing, which help take care of some of the accessibility and usability issues for you, like [Modaal](http://humaan.com/modaal/). Modaal requires jQuery. I've also seen (but never used) other libraries that are built for React. 

By comparison, Body Stack is much smaller in scope. It has no external requirements. It's more of a concept than anything.

## Limitations

You can't use any kind of transition with this approach. You must cover the entire viewport - there is no way to have part of the original page visible "underneath" your overlay. 

For a no-nonsense full-page overlay menu, this is no problem. For some projects, these limitations will be deal-breakers.

## TODO

Build a more fully-developed demo, with more dynamic pages.

## Feedback
Have any thoughts to share on this project? Please [share them in the comments issue](https://github.com/a-p-f/body_stack/issues/1).