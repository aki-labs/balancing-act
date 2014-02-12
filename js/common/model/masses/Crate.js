// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var ImageMass = require( 'BALANCING_ACT/common/model/ImageMass' );
  var crateImage = require( 'image!BALANCING_ACT/wood-crate-tall.png' );

  // Constants
  var MASS = 45; // In kg
  var HEIGHT = 0.6; // In meters

  /**
   * @param initialPosition
   * @param isMystery
   * @constructor
   */
  function Crate( initialPosition, isMystery ) {
    ImageMass.call( this, MASS, crateImage, HEIGHT, initialPosition, isMystery );
  }

  return inherit( ImageMass, Crate,
    {
      createCopy: function() {
        return new Crate( this.position.copy(), this.isMystery );
      }
    } );
} );