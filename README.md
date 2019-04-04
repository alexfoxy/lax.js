# lax.js

Simple & light weight (<3kb gzipped) vanilla javascript plugin to create *smooth* & beautiful animations when you scrolllll! Harness the power of the most intuitive interaction and make your websites come alive!

[>>> DEMO <<<](https://alexfox.dev/laxxx/)

![](https://i.imgur.com/Jbkna80.gif) 

[>>> MARIO DEMO <<<](https://alexfox.dev/laxxx/sprite.html)

![](https://i.imgur.com/GGQFucZ.gif)

## Getting Started

### NPM Setup

```bash
npm install lax.js
```
```js
import lax from 'lax.js'
```

### Basic Browser Setup
1) Add lax.js to your html

```html
<script src="lib/lax.min.js" >
<!-- or via CDN -->
<script src="https://cdn.jsdelivr.net/npm/lax.js" >
```

2) Initialize the plugin

```javascript
window.onload = function() {
	lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}
```


3) Add class and attributes to the HTML tags you want to animate e.g.
```html
<p class="lax" data-lax-preset="spin fadeInOut">Look at me goooooo!</p>
```

4) Scroll and enjoy!

### Usage With React, Vue.js & DOM Changes
To increase performance lax.js indexes the list of elements to animate when the page loads. If you're using a library like React or vue.js, it is likely that you are adding elements after the initial `window.onload`. Because of this you will need to call `lax.addElement(domElement)` when you add components to the DOM that you want to animate. 

See below for working examples:
* [react](https://codepen.io/alexfoxy/pen/PLaKaE)
* [react (using hooks)](https://github.com/arthurdenner/use-lax)
* [vue](https://codepen.io/alexfoxy/pen/ZPRZBq)

You can also call `lax.removeElement(domElement)` when the component unmounts.


## Presets
The easiest way to get started is to use the presets via the `data-lax-preset` attribute. You can chain multiple presets together for e.g. `data-lax-preset="blurOut fadeOut spin"`. Some presets also support an optional strength e.g. `data-lax-preset="blurOut-50"`.

See the list of [Supported Presets](#supported-presets) for details.

## Custom Animations

You can easily create your own effects. Just add an attribute to your HTML tag (see [Supported Attribute Keys](#supported-attribute-keys)) with an array of values. These arrays take the format of `scrollPos val, scrollPos val, ... | option=val` e.g:
```html
<p class="lax" data-lax-opacity="0 1, 100 1, 200 0 | loop=200">
	I start to fade out after the window scrolls 100px
	and then I'm gone by 200px!
</p>
```

By default the `scrollPos` is `window.scrollY` but you can use an element distance from the top of the screen instead. You can either pass in a selector `data-lax-anchor="#bio"` or set it to use itself `data-lax-anchor="self"` (this is the default for all presets) e.g.
```html
<p class="lax" data-lax-opacity="200 1, 100 1, 0 0" data-lax-anchor="self">
	I start to fade out after I'm 100px away from the top of the window
	and then I'm gone by the time I reach the top!
</p>
```

### Special Values

| Key     	| Value           |
| ------------- | ------------- |
| vw       	| window.innerWidth  |
| vh     	| window.innerHeight |
| elw     	| targetElement.clientWidth |
| elh     	| targetElement.clientHeight |

You can use these instead of integer values for the scrollPos  e.g.
```html
<p class="lax" data-lax-opacity="0 1, vh 0">
	I fade out as the page scrolls down and
	I'm gone when the page has scrolled the view port height!
</p>
```

### Calculated Values

You can also use vanilla JS within `( )` for calculations and access to more variables e.g.
```html
<p class="lax" data-lax-opacity="0 1, (document.body.scrollHeight*0.5) 0">
	I fade out as the page scrolls down and
	I'm gone when the page has scrolled 50%
	down the entire page height!
</p>
```

### Options

You can pass options into your custom animations for more control e.g. 

```html
<p class="lax" data-lax-opacity="0 1, 100 0, 200 100 | loop=200 offset=100 speed=2">
	I start at 0 opacity and
	fade in and out every 50px
</p>
```

| Option     	| Effect  | 
| ------------- | -------------	| 
| loop      	| modulus the input scrollY position so the animation will loop every `loop` pixels |
| offset     	| add `offset` to scrollY position so the animation will begin at this point |
| speed     	| multiplies the input scrollY position by `speed` to change the speed of the animation |


## Responsive Design
You can set multiple presets and animations for different screen widths. When setting up lax you need to pass in your screen width breakpoints e.g.
```javascript
lax.setup({
    breakpoints: { small: 0, large: 992 }
})
```
Then you can define presets or transforms per breakpoint. 
```html
<p class="lax" data-lax-preset_small="spin">
	I only spin when the screen is smaller than 992px.
</p>

<p class="lax" data-lax-scale_small="0 1, 500 0" data-lax-scale_large="0 1, 500 2">
	I shrink when the screen is smaller than 992px but grow when the screen is larger 992px.
</p>
```

## Supported Presets

| Preset     	| Default Strength | 
| ------------- | -------------	| 
| linger      	| n/a 		|
| lazy     	| 100 		|
| eager     	| 100 		|
| lazy     	| 100 		|
| slalom     	| 50 		|
| crazy     	| n/a 		|
| spin     	| 360 		|
| spinRev     	| 360 		|
| spinIn     	| 360 		|
| spinOut     	| 360 		|
| blurInOut     | 40 		|
| blurIn     	| 40 		|
| blurOut     	| 40 		|
| fadeInOut     | n/a 		|
| fadeIn     	| n/a 		|
| fadeOut     	| n/a 		|
| driftLeft     | 100 		|
| driftRight    | 100 		|
| leftToRight   | 1 		|
| rightToLeft   | 1 		|
| zoomInOut    	| 0.2 		|
| zoomIn     	| 0.2 		|
| zoomOut     	| 0.2 		|
| swing     	| 30		|
| speedy     	| 30 		|

## Supported Attribute Keys

Transforms

| Transform     | Key           |
| ------------- | ------------- |
| opacity       | data-lax-opacity  |
| translate     | data-lax-translate |
| translateX     | data-lax-translate-x |
| translateY     | data-lax-translate-y |
| scale     | data-lax-scale |
| scaleX     | data-lax-scale-x |
| scaleY     | data-lax-scale-y |
| skew     | data-lax-skew |
| skewX     | data-lax-skew-x |
| skewY     | data-lax-skew-y |
| rotate     | data-lax-rotate |
| rotateX 	| data-lax-rotate-x |
| rotateY 	| data-lax-rotate-y |

Filters (note - these may be unperformant on low powered machines)

| Filter     | Key           |
| ------------- | ------------- |
| brightness       | data-lax-brightness  |
| contrast     | data-lax-contrast |
| hue-rotate     | data-lax-hue-rotate |
| blur     | data-lax-blur |
| invert     | data-lax-invert |
| saturate     | data-lax-saturate |
| grayscale     | data-lax-grayscale |

Other

| Filter     | Key           |
| ------------- | ------------- |
| background position | data-lax-bg-pos  |
| background position-x | data-lax-bg-pos-x  |
| background position-y | data-lax-bg-pos-y |

	

## Sprite Sheet Animations
You can create animations using sprite sheets. See a demo [here](https://alexfox.dev/laxxx/sprite.html).

The `data-lax-sprite-data` is required and formated like so `[frameWidth, frameHeight, frameCount, columnCount, scrollStep]`. You can either set the image using CSS or the `data-lax-sprite-image` attribute. e.g.

```html
<div 
	class="lax"
	data-lax-sprite-data="500,500,36,36,10"
	data-lax-sprite-image="./spritesheet.png"
/>
```

You can turn a gif or a video into a sprite sheet with this tool: https://ezgif.com/gif-to-sprite

Note: current implimentation requires the element to be the same size as the frame width & height.

## Custom Presets
To avoid duplicate code you can define your own presets with a list of attributes e.g.
```javascript
lax.addPreset("myCoolPreset", function() {
	return { 
		"data-lax-opacity": "(-vh*0.8) 40, (-vh*0.6) 0",
		"data-lax-rotate": "(-vh*2) 1000, (-vh*0.5) 0" 
	}
})
```
You can then access this preset like this:
```html
<p class="lax" data-lax-preset="myCoolPreset">
	I'm the coolest preset in the world 😎
</p>
```

## Performance Tips

* Avoid nesting lax enabled elements within each other, you'll get better performance using lax with smaller elements in the dom tree.
* Avoid transforms on large elements, e.g. full screen backgrounds.
* By default elements that have opacity 0 aren't updated. You can either manually set up a `data-lax-opacity` to control this yourself or use `data-lax-optimize` which will set the elements opacity to 0 when it goes off -screen. 
* By default `-webkit-backface-visibility: hidden;` is added to your elements style to encourage the browser to render that object as a layer on the GPU and increase performance. To turn this off add `data-lax-use-gpu="false"` to your element.


## Notes

### Screen Rotating & Resizing 
As some values (vh, vw, elh, elw) are calculated on load, when the screen size changes or rotates you might want to recalculate these. E.g.
```
window.addEventListener("resize", function() {
	lax.updateElements()
});
```
Be warned, on mobile, a resize event is fired when you scroll and the toolbar is hidden so you might want to check if the width or orientation has changed.

### Scroll Wheels
Scroll wheels only increment the scroll position in steps which can cause the animations to look janky. You can use the SmoothScroll (http://www.smoothscroll.net/) plugin to smooth this out, however there maybe performance implications that need investigating.

### Merging Existing Styles
Only inline styles for transforms and filters will be merged in to the animation. Transforms and filters derived from CSS will be overwritten.

## To Do / Ideas
* Implement a tween for scroll wheels to remove reliance on smoothscroll
* A way to add weight/momentum to moving objecs
* More cool demos
* More concise read me for react / vue.js
* ~~Support for sprite sheet animations~~

