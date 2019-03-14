# laxxx.js

Simple & light weight (12kb) vanilla javascript plugin to create beautiful animations when you scrolllll! Harness the power of the most intuitive interaction and make your websites come alive!

[>>> DEMO <<<](https://alexfox.dev/laxxx/)


## Getting started

1) Add laxxx.js to your html

```html
<script src="lib/laxxx.js" >
```


2) Initialize the plugin 

```javascript
window.onload = function() {
	laxxx.setup({ /* opts */ }) // init
	  
	document.addEventListener('scroll', function(e) {
	  laxxx.update(window.scrollY) // update every scroll
	}, false)

	laxxx.update(window.scrollY) // set initial positions
}
```


3) Add attributes to the HTML tags you want to animate e.g.
```html
<p laxxx-preset="spin fadeInOut">Look at me goooooo!</p>
```

4) Scroll and enjoy!

## Presets

The easiest way to get started is to use the presets via the `laxxx-preset` attribute. You can chain multiple presetes together for e.g. `laxxx-preset="blurOut fadeOut spin"`. Some presets also support an optional strength e.g. `laxxx-preset="blurOut-50"`

See the list of [Supported Presets](#supported-presets) for details.

## Custom Animations

You can easily create your own effects. Just add an attribute to your HTML tag (see [Supported Attribute Keys](#supported-attribute-keys)) with an array of values. These arrays take the format of `scrollPos val, scrollPos val, ...` e.g:
```html
<p laxxx-opacity="0 1, 100 1, 200 0">
	I start to fade out after the window scrolls 100px
	and then I'm gone by 200px!
</p>
```

By default the `scrollPos` is `window.scrollY` but you can use an element distance from the top of the screen instead. You can either pass in a selector `laxxx-anchor="#bio"` or set it to use itself `laxxx-anchor="self"` (this is the default for all presets) e.g.
```html
<p laxxx-opacity="200 1, 100 1, 0 0" laxxx-anchor="self">
	I start to fade out after I'm 100px away from the top of the window
	and then I'm gone by the time I reach the top!
</p>
```

There are also some shortcuts for useful values: 

| Key     	| Value           |
| ------------- | ------------- |
| vw       	| window.innerWidth  |
| vh     	| window.innerHeight |
| elw     	| targetElement.clientHeight |
| elh     	| targetElement.clientWidth |

You can use these instead of integer values for the scrollPos  e.g.
```html
<p laxxx-opacity="0 1, vh 0">
	I fade out as the page scrolls down and
	I'm gone when the page has scrolled the view port height!
</p>
```

You can also do calculations using `( )` e.g.
```html
<p laxxx-opacity="0 1, (vh*0.5) 0">
	I fade out as the page scrolls down and
	I'm gone when the page has scrolled half the view port height!
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


## Supported Attribute Keys

Transforms

| Transform     | Key           |
| ------------- | ------------- |
| opacity       | laxxx-opacity  |
| translate     | laxxx-translate |
| translateX     | laxxx-translate-x |
| translateY     | laxxx-translate-y |
| scale     | laxxx-scale |
| scaleX     | laxxx-scale-x |
| scaleY     | laxxx-scale-y |
| skew     | laxxx-skew |
| skewX     | laxxx-skew-x |
| skewY     | laxxx-skew-y |
| rotate     | laxxx-rotate |

Filters (note - these may be unperformant on low powered machines)

| Filter     | Key           |
| ------------- | ------------- |
| brightness       | laxxx-brightness  |
| contrast     | laxxx-contrast |
| hue-rotate     | laxxx-hue-rotate |
| blur     | laxxx-blur |
| invert     | laxxx-invert |
| saturate     | laxxx-saturate |
| grayscale     | laxxx-grayscale |

## Custom Presets
To avoid duplicate code you can define your own presets with a list of attributes e.g.
```javascript
laxxx.addPreset("myCoolPreset", function() {
	return { 
		"laxxx-opacity": "(-vh*0.8) 40, (-vh*0.6) 0",
		"laxxx-rotate": "(-vh*2) 1000, (-vh*0.5) 0" 
	}
})
```
You can then access this preset like this:
```html
<p laxxx-preset="myCoolPreset">
	I'm the coolest preset in the world 😎
</p>
```

## Notes

### Performance
By default `-webkit-backface-visibility: hidden;` is added to your elements style to encourage the browser to render that object as a layer on the GPU and increase performance. To turn this off add `laxx-optimize="false"` to your element.

### Scroll Wheels
Scroll wheels only icrement the scroll position in steps which can cause the animations to look janky. You can use the SmoothScroll (http://www.smoothscroll.net/) plugin to smooth this out, however there maybe performance implications that need investigating.

## To Do / Ideas
* Add debug mode
* Elastic bouncing values
* Optimise elements that go off screen
* Impliment a tween for scroll wheels to reduce dependancy on smoothscroll
* Better error reporting
* Add "momentum" as option for anchor & presets

