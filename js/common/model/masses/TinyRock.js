// Copyright 2013-2017, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const balancingAct = require( 'BALANCING_ACT/balancingAct' );
  const ImageMass = require( 'BALANCING_ACT/common/model/ImageMass' );
  const inherit = require( 'PHET_CORE/inherit' );
  const tinyRockImage = require( 'image!BALANCING_ACT/tiny-rock.png' );

  // constants
  var MASS = 4; // In kg
  var HEIGHT = 0.09; // In meters

  /**
   * @param initialPosition
   * @param isMystery
   * @constructor
   */
  function TinyRock( initialPosition, isMystery ) {
    ImageMass.call( this, MASS, tinyRockImage, HEIGHT, initialPosition, isMystery );
  }

  balancingAct.register( 'TinyRock', TinyRock );

  return inherit( ImageMass, TinyRock );
} );