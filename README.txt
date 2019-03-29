This utility aims to implement a better method of creating full-page overlays 
(ie. for mobile nav menus) with JS.

Full page overlays are tricky to get right -> you need to worry about z-index issues,
you should ensure focus stays in the overlay, you should prevent scrolling of the main
document but allow scrolling of the overlay, etc.

I've never seen an implementation that I really like. Here we take a different approach.
We remove the entire body from the DOM, putting a new one in place. When done, we restore
the old body (and manually restore all scroll positions, since those seem to be lost when
elements are removed from the document).

This approach seems pretty bulletproof to me.

The only drawback: you can't animate the transition to the new body, and you can't let
any elements "bleed through" visually. It's an instant, full-page switch.

TODO - better example, with actual nav menu. Example with multiple nested overlays.