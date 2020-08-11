## Images

### SVGs

SVGs are componentized with `svgr`. To import an SVG into the repo, run `npm run svgr` and follow the prompts. This script will take a `path/to/file.svg` and create a new `<SvgName>Icon.tsx` React component.

Now your new SVG component can take props for colors, sizes, etc. Check out the `components/Icons/` directory for examples.

If you need to add a `<title>` and `aria-labelledby` attribute to the svg for accessibility, you can pass `title` and `titleId` props to the component. Read [this resource](https://css-tricks.com/accessible-svgs/) for information on a11y friendly SVGs.
Note: if the SVG is purely decorative and text already accompanies the icon, you can simply add `aria-hidden="true"` to the SVG component, e.g. `<CircleIcon aria-hidden="true" />`

### JPGs and PNGs

Download [ImageOptim](https://imageoptim.com/mac) and run your `.jpg` and `.png` files through it before commiting them to the repo. After you optimize them, place them in the `public/images/` directory or any of the relevant subdirectories.
