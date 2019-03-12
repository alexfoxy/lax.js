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
<p laxx-presets="spin">
	Look at me goooooo!
</p>
```
or custom
```
<p laxx-translate-y: "200 100, 0 -100">
	Look at me goooooo!
</p>
```

4) Scroll and enjoy!

## Presets

The simplist way to get started is to use presets

Chain together etc..


## Custom Transforms

You choose a key and then [0 1,2 3]
You can use shortcuts for window height e.g.
vw, vh, elw, elh
You can do calculations in brackets e.g. 
```
[(-vw*0.5) 100, 0 0]
```

### Supported Transforms
| Transform     | Key           |
| ------------- | ------------- |
| opacity       | laxx-opacity  |
| translate     | laxx-translate |

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
