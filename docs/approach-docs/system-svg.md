# A System For Working With SVGs - Approach Doc

I would like to propose that we establish a delightfully simple and performant system for working with SVGs at Journaly.
I built out a sort-of POC where you can see the scaffolding of this system in [PR #54](https://github.com/Journaly/journaly/pull/54).

## TLDR;

The basis of the system is to use the [SVGR CLI](https://react-svgr.com/docs/cli/) to convert SVGs to React Components.

## Details

The original inspiration came from the following 3 talks: 
1. [SVG Illustrations as React Components](https://www.youtube.com/watch?v=1gG8rtm-rq4&t=266s) by Elizabet Oliveira @ReactConf2018
2. [Animating an SVG cat with React.js](https://youtu.be/7bw56feIdh4) by Elizabet Oliveira @ReactLive2019
3. [SVGR or how a simple problem became a 2k star library](https://youtu.be/geKCzi7ZPkA) by Greg Bergé - creator of SVGR @ReactEurope2018

The general idea is to have a script that we can run with an argument that specifies the path of the original SVG and will output the React component into a directory specified in the configuration file. In the process, we will also run it through SVGO for optimization (which can be configured as part of SVGR as you will see in the PR above) and end up with a really nice React Component that contains an optimized in-line SVG and also takes props that we can manipulate from our `.tsx` files where we use the React Component SVG.
