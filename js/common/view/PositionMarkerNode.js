// Copyright 2013-2020, University of Colorado Boulder

/**
 * A marker that is used to mark a position on the plank.
 */

import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import balancingAct from '../../balancingAct.js';
import RasterizedTextNode from './RasterizedTextNode.js';

// constants
const color = 'rgb( 255, 153, 0 )';
const LINE_LENGTH = 14; // empirically chosen
const CIRCLE_RADIUS = 3;

class PositionMarkerNode extends Node {

  /**
   * @param {String} labelText
   * @param {Object} [options]
   */
  constructor( labelText, options ) {
    super();
    const line = new Line( 0, 0, 0, LINE_LENGTH, { stroke: color, lineWidth: 2, lineDash: [ 2, 2 ] } );
    this.addChild( line );
    const circle = new Circle( CIRCLE_RADIUS, { fill: color, centerX: 0, centerY: LINE_LENGTH } );
    this.addChild( circle );
    this.addChild( new RasterizedTextNode( labelText, {
      font: new PhetFont( {
        size: 12,
        weight: 'bold'
      } )
    }, { centerX: 0, top: circle.bottom } ) );
    this.mutate( options );
  }
}

balancingAct.register( 'PositionMarkerNode', PositionMarkerNode );

export default PositionMarkerNode;