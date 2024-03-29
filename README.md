# Camp Century #

A prototype interactive documentary created at [POV Hackathon](http://www.pbs.org/pov/hackathon/) 7

[View the prototype](http://campcentury.github.io/campcentury)

## Artistic Statement ##

Our prototype was focused on two key challenges. We firstly wanted to create a simple way to introduce some context to the story of Camp Century. It's a complex narrative. So we felt a way to discover the different sides would be valuable. We focused on a mechanic which mimics redacted information from government document, the big black blocked out chunks of text for us felt like a strong visual to play with interactively. 

Our second, and more significant challenge came in the form of 3d photos. We wanted to look at a way to 'bring back to life' some photographs from a long tie ago. Interactivity in it's most simple form still adds a layer of immersion, it still draws the viewer in. So we have explored a technique involving hand-painting depth-maps of some vintage photos, and applying those depth maps to create a sense of 3d space.

Once the basic mechanic of depth was built, we started looking at both lighting and weather effects, to add to the sense of there being some life in these documents of a forgotten moment.

## Authors ##

*Camp Century* is a multi-media documentary project by [Anrick Bregman](http://anrick.com/) and [Nicole Paglia](http://www.nicolepaglia.com/).

The prototype was created at POV Hackathon 7 in November 2014 by Anrick Bregman, [Brian Chirls](http://chirls.com) and [Luigi De Rosa](https://twitter.com/luruke).

## Technology ##

The Century City prototype is entirely on standard web technologies that are available in all modern desktop browsers. High-resolution photos are processed in real time to give viewers a sense of presence in the harsh arctic environment.

### Displacement Maps ###

This is a technique used to distort some of the images to give a perspective effect, as though the user's point of view is changing. It creates a subtle 3D effect, even though the image only contains two-dimensional data. A separate image is used that represents an approximate depth map, where the brightness of each pixel indicates tells the renderer how far to shift vertically and horizontally as the point of view changes.

### Particle Effects ###

The snow effect applied to some of the photos is generated by rendering thousands of "particles" in every frame. Each particle is a small still image individually modified and animated to resemble random and chaotic weather.

### Simplex Noise ###

Simplex noise is a faster, simplified version of Perlin Noise, an algorithm used to generate natural-looking random noise. This project uses simplex noise to generate clouds and to control the flickering light bulbs.

The following open source libraries and web standards were used:

- [Seriously.js](http://github.com/brianchirls/Seriously.js) - A video compositor used for the displacement maps, clouds and light flicker effect
- [Pixi.js](http://www.pixijs.com/) and PixiParticles - For snow effect
- Web Audio API - for seamless looping sound effects
- [simplex-noise.js](https://github.com/jwagner/simplex-noise.js) - A fast simplex noise implementation in Javascript.
- [jQuery](http://jquery.com)
- [Lo-Dash](https://lodash.com)
