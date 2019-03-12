# LAXX

Light weight vanilla javascript plugin to do awesome things when you scroll!!

## Demos


## Getting started

1) Add laxx.js to your html page

```
<script src="js/laxx.js" >
```


2) Initialize the plugin 

```
window.onload = function() {
	laxx.setup({ /* opts */ }) // init
	  
	document.addEventListener('scroll', function(e) {
	  laxx.update(window.scrollY) // update every scroll
	}, false)

	laxx.update(window.scrollY) // set initial positions
}
```


3) Add attributes to HTML tags you want to animate 
```
	<p laxx-presets="spin fadeInOut">Look at me goooooo!</p>
```
or custom
```
	<p laxx-translate-y: "200 100, 0 -100">Look at me goooooo!</p>
```

4) Scroll and enjoy!

## Presets

The easiest way to get started is to use the built in presets. E.g.
```
	<p laxx-presets="spin fadeInOut">Look at me goooooo!</p>
```
The available presets are:
```
linger, lazy, eager, slalom, crazy, spin, spinIn, spinOut, 
blurInOut, blurIn, blurOut, fadeInOut, fadeIn, fadeOut, driftLeft, 
driftRight, slideLeft, slideRight, zoomInOut, zoomIn, zoomOut

```

## Custom Effects

You can easily create your own effects. 

choose a key and then [0 1,2 3]
You can use shortcuts for window height e.g.
vw, vh, elw, elh
You can do calculations in brackets e.g. 
```
[(-vw*0.5) 100, 0 0]
```

### Supported Keys

Transforms

| Transform     | Key           |
| ------------- | ------------- |
| opacity       | laxx-opacity  |
| translate     | laxx-translate |
| translateX     | laxx-translate-x |
| translateY     | laxx-translate-y |
| scale     | laxx-scale |
| scaleX     | laxx-scale-x |
| scaleY     | laxx-scale-y |
| skew     | laxx-skew |
| skewX     | laxx-skew-x |
| skewY     | laxx-skew-y |
| rotate     | laxx-rotate |

Filters (note - these may be unperformant on low powered machines)

| Filter     | Key           |
| ------------- | ------------- |
| brightness       | laxx-brightness  |
| contrast     | laxx-contrast |
| hue-rotate     | laxx-hue-rotate |
| blur     | laxx-blur |
| invert     | laxx-invert |
| saturate     | laxx-saturate |
| grayscale     | laxx-grayscale |

### Anchor
Default is dcument.scrollTop
can use "self" to use its own el top
can use query selector 

## Scroll Wheels
use super scroll

## To Do
* Add scroll momentum as option for anchor with presets
* Optimise elements that go off screen
* Better error reporting
