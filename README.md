# node-imagetype

This is a simple module to check the type of an image from its magic number (without having to load the whole image).
It currently works for JPEGs, PNGs, GIFs, BMPs and ICOs.

## Example

```js
var imagetype = require('imagetype');

imagetype(pathToImage, function(type) {
  // type can take the following values:
  // 'jpeg', 'png', 'gif', 'bmp', 'ico' or null if the type is not recognized
  console.log('The image type is', type);
});
```
