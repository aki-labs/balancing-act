// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that, when parameterized correctly, can be used to represent the sky in
 * a simulation screen.
 *
 * @author John Blanco
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var GradientBackgroundNode = require( 'BALANCING_ACT/common/view/GradientBackgroundNode' );
  var Color = require( 'SCENERY/util/Color' );

  /**
   * @param {ModelViewTransform2} mvt Model/View transform
   * @param {Bounds2} modelRect
   * @param {number} modelGradientHeight
   * @param {Object} options
   * @constructor
   */
  function SkyNode( mvt, modelRect, modelGradientHeight, options ) {
    options = _.extend(
      {
        topColor: new Color( 1, 172, 228 ),
        bottomColor: new Color( 1, 172, 228 )
      }, options );
    GradientBackgroundNode.call( this, mvt, modelRect, options.bottomColor, options.topColor, 0, modelGradientHeight );
  }

  return inherit( GradientBackgroundNode, SkyNode );
} );

