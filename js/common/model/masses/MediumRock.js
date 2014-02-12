// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var ImageMass = require( 'BALANCING_ACT/common/model/ImageMass' );
  var mediumRockImage = require( 'image!BALANCING_ACT/rock-1.png' );

  // Constants
  var MASS = 40; // In kg
  var HEIGHT = 0.4; // In meters

  /**
   * @param initialPosition
   * @param isMystery
   * @constructor
   */
  function MediumRock( initialPosition, isMystery ) {
    ImageMass.call( this, MASS, mediumRockImage, HEIGHT, initialPosition, isMystery );
  }

  return inherit( ImageMass, MediumRock,
    {
      createCopy: function() {
        return new MediumRock( this.position.copy(), this.isMystery );
      }
    } );
} );