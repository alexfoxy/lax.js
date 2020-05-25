# lax.js
Simple & light weight (<3kb gzipped) vanilla javascript plugin to create smooth & beautiful animations when you scrolllll! Harness the power of the most intuitive interaction and make your websites come alive!

### [What's new in lax.js 2.0](#whats-new)

## Examples

[Momentum scrolling](https://codesandbox.io/embed/lax-examples-momentum-tisoc?fontsize=14&hidenavigation=1&theme=dark&view=preview)
[TODO]

# Documentation
### 1. Getting started
- [Setup](#setup)
- [Usage with UI frameworks](#usage-with-react-vuejs-emberjs--dom-changes)
- [Using presets](#using-presets)
- [Adding drivers](#adding-drivers)
- [Adding elements](#adding-elements)
### 2. Going deeper
- [Custom animations](#custom-animations)
- [Optimising performance](#optimising-performance)
### 3. Glossary
- [Presets](#presets)
- [CSS properties](#css-properties)
- [Special values](#special-values)
- [Easings](#easings)


# Getting started

## Setup

To impelemnt lax you need to create at least one *driver*, to provide values for animations, as well the element animation bindings. Below is a simple example:

```html
<!-- JS -->
<script>
  window.onload = function() {
    lax.init()

    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', function() {
      return document.body.scrollTop
    })
    
    // Add animation bindings to elements
    lax.addElements('.selector', {
      scrollY: {
        presets: ['fadeInOut']
      }
    }
  })
</script>

<!-- HTML -->
<div class='selector'>Hello</div>
```
## Usage With React, Vue.js, EmberJS & DOM Changes
To increase performance lax.js indexes the list of elements to animate when the page loads. If you're using a library like React, vue.js or EmberJS, it is likely that you are adding elements after the initial window.onload. Because of this you will need to call `lax.addElements` when you add components to the DOM that you want to animate, and `lax.removeElements` when the component unmounts. 

- React - use-lax ?
- Vue.js: [TODO]
- Angular.js[TODO]

## Using presets
The easiest way to get started is to use presets. Multiple presets can be chained together and they can be customised to suit your needs. See a full list of presets [here](#presets).

See an example below: 

```javascript
lax.addElements('.selector', {
  scrollY: {
    presets: ['fadeInOut', 'scaleInOut 0.2,0.1']
  }
}
```

## Adding drivers
Drivers provide the values that *drive* your animations. To set up a driver just call `lax.addDriver` with a name and a method which returns a numerical value. This method is called every frame to calculate the animations so keep the method as *light* as possible. The example below will be the most common use case for lax which returns the scrollY position of the window. 

```javascript
lax.addDriver(
  'scrollY',                          // Driver name
  function(laxFrame) {                     
    return document.body.scrollTop    // Value method
  },
  { }                                 // Options
)
```

### Driver options

#### `momentumEnabled: boolean = false`
If enabled, the driver will calculate the speed at which its value is changing. Used to add momentum to elements using the [momentum element option](#momentum-number).

See this in action in the [momentum example](#).

#### `frameStep: number = 1`
By default each driver updates its value every animation frame, around ~60 times per second. You can use the `frameStep` to reduce frequency of the driver value updating. For example a value of `2` would only update ~30 times per second and a value of `60` would only update about once per second.

### Driver examples
[TODO]
Take a look at [examples/drivers](examples/drivers.html) to see more.

## Adding elements
You can add lax animations to an element using javascript or inline HTML. 

Use the `addElements` method in Javasript:
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
    style: {}   // Options
  }
)
```

For inline HTML use the `data-lax` attribute:
```html
<div class='selector' lax-data='{
  scrollY: {
    opacity: [
      [0, 100],
      [1, 0]
    ]
  }
}, {}'>
```

### Element options

#### `style: {}`
Add static css to each element, for example:

```javascript
{
  transform: "200ms scale ease-in-out"
}
```


# Going deeper

## Custom animations
Custom animations are defined using an object. 

```javascript
{
  scrollY: {                // Driver name 
    translateX: [           // CSS property
      ['elInY', 'elOutY'],  // Driver value map
      [0, 'screenWidth'],   // Animation value map
      { 
        momentum: 10        // Options
      }                   
    ],
    opacity: [
      // etc
    ]
  }
}
```

### Driver name
The name of the driver you want to use as a source of values to map to your animation, for example the documents scrollY position. Read about adding drivers [here](#adding-drivers).

### CSS property
The name of the CSS property you want to animate, for example `opacity` or `rotate`. See a list of supporter properties [here](#css-properties).

### Custom properties using `cssFn`
Some css properties, for example `box-shadow`, require a custom function to build the style string. To do this use the [cssFn](#cssfn-value-number--string) element option.

### Value Maps
The value maps are used to interpolate the driver value and output a value for your CSS property. See an example below:

```javascript
[0, 200, 800]  // Driver map
[0, 10,  20]   // Animation map

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

You can also use mobile breakpoints within animation maps for more flexibility.

```javascript
  scrollY: {
    translateX: [
      ["elInY", "elCenterY", "elOutY"],
      {
        500: [10,20,50], // Screen width < 500
        900: [30,40,60], // Screen width > 500 and < 900
        1400: [30,40,60] // Screen width > 900
      }
    ]
  }
```

### Options

#### `modValue: number | undefined`
Set this option to modulus the value from the driver, for example if you want to loop an animation while the driver value increases.

#### `frameStep: number = 1`
By default each animation updates its value every animation frame, around ~60 times per second. You can use the `frameStep` to reduce frequency of the animation updating. For example a value of `2` would only update ~30 times per second and a value of `60` would only update about once per second.

#### `momentum: number`
[TODO]
See momentum in action [here](https://codesandbox.io/embed/lax-examples-momentum-tisoc?fontsize=14&hidenavigation=1&theme=dark&view=preview).

#### `momentumMode: "normal" | "absolute"`
Use in combination with `momentum`. If set to `absolute` the momentum value will always be a positive number via the `Math.abs` operator.

#### cssUnit: string = ""
[TODO]

#### round
[TODO]

#### `cssFn: (value: number) => string`
Some css properties require more complex strings as values. For example `box-shadow` has multiple values that could be modified by a lax animation.

```javascript
  // Box-shadow example
  (val) => {
    return `${val}px ${val}px ${val}px rgba(0,0,0,0.5)`
  }
```

## Optimising performance


## Presets

[TODO]

| name      | paramA       | paramB |
| --------- | ------------ | ------ |
| fadeInOut | startOpacity | speed  |
| fadeInOut | startOpacity | speed  |
| fadeInOut | startOpacity | speed  |

## CSS properties

[TODO]

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


## Version 2.0 improvements
- You can now add several "drivers" to control different animations, for example scroll-x and scroll-y
- Momentum on driver values (see momentum example)
- Updated the syntax for declaring animations, allowing for more advanced combinations
- Declare animations in JS as well as inline HTML
- Add custom CSS values
- Easings 