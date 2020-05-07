# lax.js 2.0
This is a work in progress re-write of lax.js

The goals were to iron out some of the bugs in version 1.0 and add a few nice features. I also wanted to create a cleaner implimentation so it was easier to work on moving forward.

### Main improvements
- You can now add several "drivers" to control different animations, for example scroll-x and scroll-y
- Updated the syntax for declaring animations, allowing for more advanced combinations
- Declare animations in JS as well as inline HTML
- Add custom CSS values
- Easings 

### Updated animation interface

You can now write your animations in javascript. e.g.

```
// Javascript 

lax.addElements(".myelement", {
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

Or within the HTML like lax 1.0, e.g.

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