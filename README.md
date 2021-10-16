# lax.js

Simple & lightweight (<4kb gzipped) vanilla JavaScript library to create smooth & beautiful animations when you scroll. 

![Lax 2.0 Gif](https://i.imgur.com/XNvvAOv.gif)

[>> DEMO <<](https://alexfox.dev/lax.js/)

---
## What's new with Lax.js 2.0
Lax.js 2.0 has been completely re-written with a focus on modularity and flexibility giving you more tools to create awesome animations.
- New javascript animation syntax, allowing for more advanced effect combos
- Use any value to drive animations, for example mouse position, time of day .. and of course scroll!
- Animations can be given inertia when scrolling
- Create custom CSS bindings 
- Animation easings
- And much more..

## Examples
- [Scroll effect](https://alexfox.dev/lax.js/examples/scroll)
- [Horizontal snap scroll](https://alexfox.dev/lax.js/examples/snap-scroll)
- [Inertia](https://alexfox.dev/lax.js/examples/inertia)
- [Video/Gif playback](https://alexfox.dev/lax.js/examples/sprite)
- [Cursor position](https://alexfox.dev/lax.js/examples/cursor)
- [Text input](https://alexfox.dev/lax.js/examples/input)
- [Update HTML content](https://alexfox.dev/lax.js/examples/on-update)
- [Preset Explorer](https://alexfox.dev/lax.js/preset-explorer)


# Documentation

### 1. Getting started

- [Setup](#setup)
- [Using presets](#using-presets)
- [Usage with UI frameworks](#dom-behavior-and-usage-with-frameworks)
- [Adding drivers](#adding-drivers)
- [Adding elements](#adding-elements)

### 2. Going deeper

- [Custom animations](#custom-animations)
- [Optimising performance](#optimising-performance)

### 3. Glossary

- [CSS properties](#css-properties)
- [Special values](#special-values)
- [Supported easings](#supported-easings)

# Getting started

### NPM Setup

```bash
# https://www.npmjs.com/package/lax.js

npm install lax.js
yarn add lax.js
```
```js
import lax from 'lax.js'
```

### HTML setup

```html
<script src="path-to-lax.min.js"></script>
<!-- or via CDN -->
<script src="https://cdn.jsdelivr.net/npm/lax.js" ></script>
```


## Setup

To implement lax you need to create at least one _driver_, to provide values for animations, as well as the element animation bindings. Below is a simple example:

```html
<!-- JS -->
<script>
  window.onload = function () {
    lax.init()

    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', function () {
      return window.scrollY
    })

    // Add animation bindings to elements
    lax.addElements('.selector', {
      scrollY: {
        translateX: [
          ["elInY", "elCenterY", "elOutY"],
          [0, 'screenWidth/2', 'screenWidth'],
        ]
      }
    })
  }
</script>

<!-- HTML -->
<div class="selector">Hello</div>
```

## Using presets

The easiest way to get started is to use presets via html classes. For example: 

```html
<div class="lax lax_preset_fadeIn:50:100 lax_preset_spin"></div>
```

Multiple presets can be chained together and they can be customised to suit your needs. Use the [preset explorer](https://alexfox.dev/lax.js/preset-explorer) to explore effects and see a simple example [here](https://alexfox.dev/lax.js/examples/html-inline).

## DOM behavior and usage with Frameworks 

To increase performance, `lax.js` indexes the list of elements to animate when the page loads. If you're using a library like React, Vue or EmberJS, it is likely that you are adding elements after the initial window.onload. Because of this you will need to call `lax.addElements` when you add components to the DOM that you want to animate, and `lax.removeElements` when the component unmounts.

Please find a React example [here](https://codesandbox.io/s/laxjs-react-example-nc4h7). Other examples will be available soon for Vue.js and Angular.

## Adding drivers

Drivers provide the values that _drive_ your animations. To set up a driver just call `lax.addDriver` with a name and a function which returns a number. This method is called every frame to calculate the animations so keep the method as computationally _light_ as possible. The example below will be the most common use case for lax which returns the scrollY position of the window.

```javascript
lax.addDriver(
  'scrollY',                          // Driver name
  function(laxFrame) {                     
    return window.scrollY    // Value method
  },
  { }                                 // Options
)
```

### Driver options

#### `inertiaEnabled: boolean = false`

If enabled, the driver will calculate the speed at which its value is changing. Used to add inertia to elements using the [inertia element option](#inertia-number).

See this in action in the [here](https://alexfox.dev/lax.js/examples/inertia).

#### `frameStep: number = 1`

By default each driver updates its value every animation frame, around ~60 times per second. You can use the `frameStep` to reduce frequency of the driver value updating. For example a value of `2` would only update ~30 times per second and a value of `60` would only update about once per second.

## Adding elements

You can add lax animations to an element using the `addElements` method:

```javascript
lax.addElements(
  '.selector',  // Element selector rule
  {             // Animation data
    scrollY: {  
      opacity: [
        [0, 100],
        [1, 0]
      ]
    }
  },
  {             
    style: {}   // Element options
  }
)
```

### Element options

#### `style: StyleObject`

Add static CSS to each element, for example:

```css
{
  transform: '200ms scale ease-in-out';
}
```

#### `elements: Array<DOM nodes>`

Pass references to raw DOM elements to allow for more flexible selection patterns. In this case, a unique `selector` must still be passed as the first argument, however it does _not_ need to be a valid DOM selector.

This allows the library to tag the elements for removal later. Example:

```js
const myDomElements = $('.selector')

{
  elements: myDomElements
}
```

#### `onUpdate: (driverValues: Object, domElement: DomElement) => void`
A method called every frame with the current driverValues and domElement. This could be used to toggle classes on an element or set innerHTML. See it in action [here](https://alexfox.dev/lax.js/examples/on-update).

The driver values are formatted as follows:
```js
{
  scrollY: [  // Driver name
    100,      // Driver value
    0         // Driver inertia
  ]
}
```

# Going deeper

## Custom animations
Custom animations are defined using an object.

```javascript
// Animation data
{
  scrollY: {                // Driver name
    translateX: [           // CSS property
      ['elInY', 'elOutY'],  // Driver value map
      [0, 'screenWidth'],   // Animation value map
      {
        inertia: 10        // Options
      }
    ],
    opacity: [
      // etc
    ]
  }
}
```

### Driver name
The name of the driver you want to use as a source of values to map to your animation, for example, the document's scrollY position. Read about adding drivers [here](#adding-drivers).

### CSS property
The name of the CSS property you want to animate, for example `opacity` or `rotate`. See a list of supported properties [here](#css-properties).

> Some CSS properties, for example `box-shadow`, require a custom function to build the style string. To do this use the [cssFn](#cssfn-value-number--string) element option.

### Value maps
The value maps are used to interpolate the driver value and output a value for your CSS property. For example:

```javascript
[0, 200, 800]  // Driver value map
[0, 10,  20]   // Animation value map

// Result

| In  | Out |
| --- | --- |
| 0   | 0   |
| 100 | 5   |
| 200 | 10  |
| 500 | 15  |
| 800 | 20  |
```

Within the maps you can use strings for simple formulas as well as use special values. e.g:

```javascript
['elInY', 'elCenterY-200', 'elCenterY',
```

See a list of available values [here](#special-values).

You can also use mobile breakpoints within driver value maps and animation maps for more flexibility.

```javascript
scrollY: {
  translateX: [
    ['elInY', 'elCenterY', 'elOutY'],
    {
      500: [10, 20, 50], // Screen width < 500
      900: [30, 40, 60], // Screen width > 500 and < 900
      1400: [30, 40, 60], // Screen width > 900
    },
  ];
}
```

### Options

#### `modValue: number | undefined`
Set this option to modulus the value from the driver, for example if you want to loop the animation value as the driver value continues to increase.

#### `frameStep: number = 1`
By default each animation updates its value every animation frame, around ~60 times per second. You can use the `frameStep` to reduce frequency of the animation updating. For example a value of `2` would only update ~30 times per second and a value of `60` would only update about once per second.

#### `inertia: number`
Use to add inertia to your animations. Use in combination with the [inertiaEnabled](#inertiaenabled-boolean--false) driver option.

See inertia in action [here](https://alexfox.dev/lax.js/examples/inertia).


#### `inertiaMode: "normal" | "absolute"`
Use in combination with `inertia`. If set to `absolute` the inertia value will always be a positive number via the `Math.abs` operator.

#### `cssUnit: string = ""`
Define the unit to be appended to the end of the value, for example 
For example `px` `deg`

#### `cssFn: (value: number, domElement: DomElement) => number | string`
Some CSS properties require more complex strings as values. For example, `box-shadow` has multiple values that could be modified by a lax animation.

```javascript
// Box-shadow example
(val) => {
  return `${val}px ${val}px ${val}px rgba(0,0,0,0.5)`;
};
```

#### `easing: string`
See a list of available values [here](#supported-easings).

## Optimising performance
Lax.js has been designed to be performant but there are a few things to bare in mind when creating your websites.
- Smaller elements perform better. 
- Postion `fixed` and `absolute` elements perform best as they do not trigger a layout change when updated.
- Off-screen elements do not need to be updated so consider that when creating your animation value maps.
- The css properties `blur`, `hue-rotate` and `brightness` are graphically intensive and do not run as smoothly as the other available properties.

# Glossary

## CSS properties

| name       |
| ---------- |
| opacity    |
| scaleX     |
| scaleY     |
| scale      |
| skewX      |
| skewY      |
| skew       |
| rotateX    |
| rotateY    |
| rotate     |
| translateX |
| translateY |
| translateZ |
| blur       |
| hue-rotate |
| brightness |

## Special values

| key          | value                                                                            |
| ------------ | -------------------------------------------------------------------------------- |
| screenWidth  | current width of the screen                                                      |
| screenHeight | current height of the screen                                                     |
| pageWidth    | width of the document                                                            |
| pageHeight   | height of the document                                                           |
| elWidth      | width of the element                                                             |
| elHeight     | height of the element                                                            |
| elInY        | window scrollY position when element will appear at the bottom of the screen     |
| elOutY       | window scrollY position when element will disappear at the top of the screen     |
| elCenterY    | window scrollY position when element will be centered vertically on the screen   |
| elInX        | window scrollX position when element will appear at the right of the screen      |
| elOutX       | window scrollX position when element will disappear at the left of the screen    |
| elCenterX    | window scrollX position when element will be centered horizontally on the screen |
| index        | index of the element when added using `lax.addElements`                          |

## Supported easings

| name           |
| -------------- |
| easeInQuad     |
| easeOutQuad    |
| easeInOutQuad  |
| easeInCubic    |
| easeOutCubic   |
| easeInOutCubic |
| easeInQuart    |
| easeOutQuart   |
| easeInOutQuart |
| easeInQuint    |
| easeOutQuint   |
| easeInOutQuint |
| easeOutBounce  |
| easeInBounce   |
| easeOutBack    |
| easeInBack     |
