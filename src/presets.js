const presets = {
  "scroll-y-fade-in-out":
    ['scroll-y',
      {
        "opacity": [
          ["elInBottom", "elCenterVert", "elOutTop"],
          [0, 1, 0],
          {
            easing: 'easeInOutCubic'
          }
        ]
      }
    ],
  "scroll-y-blur-in-out":
    ['scroll-y',
      {
        "blur": [
          ["elInBottom", "elCenterVert", "elOutTop"],
          [10, 0, 10],
          {
            easing: 'easeInOutCubic',
          }
        ],
      }
    ],
  "scroll-y-ltr":
    ['scroll-y',
      {
        "translateX": [
          ["inv", "outv"],
          [0, 'vw']
        ]
      }
    ]
}