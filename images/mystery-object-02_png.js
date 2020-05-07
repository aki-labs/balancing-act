/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;