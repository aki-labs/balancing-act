/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
