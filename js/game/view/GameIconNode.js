// Copyright 2014-2019, University of Colorado Boulder

/**
 * Convenience type for creating the icons used on the game level start buttons.
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import balancingActStrings from '../../balancing-act-strings.js';
import balancingAct from '../../balancingAct.js';

const levelString = balancingActStrings.level;
const pattern0Label1ValueString = balancingActStrings.pattern0Label1Value;

// constants
const FONT = new PhetFont( 16 );
const IMAGE_SIZE = new Dimension2( 100, 65 );

function GameIconNode( image, levelNumber ) {
  Node.call( this );
  const title = new Text( StringUtils.format( pattern0Label1ValueString, levelString, levelNumber ), { font: FONT } );
  this.addChild( title );
  const imageNode = new Image( image );
  imageNode.scale( new Vector2( IMAGE_SIZE.width / imageNode.width, IMAGE_SIZE.height / imageNode.height ) );
  imageNode.top = title.bottom + 4;
  this.addChild( imageNode );
  imageNode.centerX = title.centerX;
}

balancingAct.register( 'GameIconNode', GameIconNode );

inherit( Node, GameIconNode );
export default GameIconNode;