# lax.js 2.0
This is a work in progress re-write of lax.js. The primary goals are to iron out some of the bugs in version 1.0 and add a few nice features. I also wanted to create a cleaner implimentation so it was easier to work on moving forward.

### Main improvements
- You can now add several "drivers" to control different animations, for example scroll-x and scroll-y
- Momentum on driver values (see momentum example)
- Updated the syntax for declaring animations, allowing for more advanced combinations
- Declare animations in JS as well as inline HTML
- Add custom CSS values
- Easings 

### Getting started
I am yet to complete a proper readme so the best thing to do is play around with the examples in the `/examples` folder.

If you have any questions or issues please report them so I can improve the code before finishing up the release.

Below is a very simple example to get started:
```
    // JS
    window.onload = () => {
      lax.init()

      lax.addDriver('scrollY', () => {
        return document.body.scrollTop
      })
      
      lax.addElements('.selector', {
        scrollY: {
            translateX: [
                [0, "screenHeight"],
                [0, "screenWidth"]
            ]
        }
    })
    
    // HTML
    <div class="selector">Hello</div>
```

### Updated animation interface
I wanted to change the way you declared animations for a few reasons:
- Javascript implimentation to enable the creation of many lax enabled elements easilly.
- Clearer value maps, taking influence from React Native animated implimentation
- Allow multiple css keys per driver

You can create lax elements with Javascript like this:
```
lax.addElements(".myelement", { // HTML Selector
  "scroll-y": { // Driver value to bind to 
    "translateX": [ // CSS property name
      [0, "screenHeight"], // Driver value map
      [0, "screenWidth"], // CSS value map
    ],
    "opacity": [ 
      [0, "screenHeight-300"],
      [1, 0],
    ],
  },
  'cursor-x': {
    // etc
  }
]
```

Or inline like lax 1.0 like this:
```
<div class="myblock" data-lax='{ 
  scrollY: {
    translateX: [
      [0, "screenHeight"],
      [0, "screenWidth"]
    ]
  }
}'></div>

```

### Custom values
.replace(/screenWidth/g, screenWidth)
.replace(/screenHeight/g, screenHeight)
.replace(/elInBottom/g, offsetTop - screenHeight)
.replace(/elOutTop/g, offsetTop + offsetHeight)
.replace(/elCenterVert/g, offsetTop + (offsetHeight / 2) - (screenHeight / 2))
.replace(/elInRight/g, offsetLeft - screenWidth)
.replace(/elOutLeft/g, offsetLeft + offsetWidth)
.replace(/elCenterHoriz/g, offsetLeft + (offsetWidth / 2) - (screenWidth / 2))
.replace(/index/g, index)

### TODO
- Presets
- Breakpoints for screen width
- Remove element 