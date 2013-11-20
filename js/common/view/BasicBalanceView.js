// Copyright 2002-2013, University of Colorado Boulder

/**
 * ScreenView that displays items in the balance model, primarily the balance
 * beam (i.e. the plank), the various masses, and a floating control panel for
 * controlling the visibility of labels, rulers, etc.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var AttachmentBarNode = require( 'BALANCING_ACT/common/view/AttachmentBarNode' );
  var FulcrumNode = require( 'BALANCING_ACT/common/view/FulcrumNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var MassNodeFactory = require( 'BALANCING_ACT/common/view/MassNodeFactory' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var LevelSupportColumnNode = require( 'BALANCING_ACT/common/view/LevelSupportColumnNode' );
  var OutsideBackgroundNode = require( 'BALANCING_ACT/common/view/OutsideBackgroundNode' );
  var PlankNode = require( 'BALANCING_ACT/common/view/PlankNode' );
  var Property = require( 'AXON/Property' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // Images and Strings
  var balanceWithSupportsIcon = require( 'image!BALANCING_ACT/balance-with-supports-icon.png' );
  var balanceWithoutSupportsIcon = require( 'image!BALANCING_ACT/balance-without-supports-icon.png' );

  // Constants
  var BUTTON_ICON_WIDTH = 70;

  /**
   * @param {BalanceModel} model
   * @constructor
   */
  function BasicBalanceView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );
    var thisView = this;
    thisView.model = model;

    // Define the properties that control visibility of various display elements.
    thisView.massLabelsVisible = new Property( true );
    thisView.distancesVisible = new Property( false );
    thisView.forceVectorsFromObjectsVisible = new Property( false );
    thisView.levelIndicatorVisible = new Property( false );

    // Create the model-view transform.  The primary units used in the model
    // are meters, so significant zoom is used.  The multipliers for the 2nd
    // parameter can be used to adjust where the point (0, 0) in the model,
    // which is on the ground just below the center of the balance, is located
    // in the view.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( thisView.layoutBounds.width * 0.4, thisView.layoutBounds.height * 0.75 ),
      120 );
    thisView.mvt = mvt; // Make mvt available to descendant types.

    // Add the background, which portrays the sky and ground.
    thisView.addChild( new OutsideBackgroundNode( mvt, 3, -1 ) );

    // Set up a layer for non-mass model elements.
    var nonMassLayer = new Node();
    thisView.addChild( nonMassLayer );

    // Set up a separate layer for the masses so that they will be out in
    // front of the other elements of the model.
    var massesLayer = new Node();
    thisView.addChild( massesLayer );

    function handleMassAdded( addedMass ) {
      // Create and add the view representation for this mass.
      var massNode = MassNodeFactory.createMassNode( addedMass, mvt, thisView.massLabelsVisible );
      massesLayer.addChild( massNode );

      // Add the removal listener for if and when this mass is removed from the model.
      var removalListener = function( removedMass ) {
        assert( removedMass === addedMass );
        massesLayer.removeChild( massNode );
        model.massList.removeItemRemovedListener( removalListener );
      };
      model.massList.addItemRemovedListener( removalListener );
    }

    // Add initial mass representations.
    model.massList.forEach( handleMassAdded );

    // Whenever a mass is added to the model, create a graphic for it.
    model.massList.addItemAddedListener( handleMassAdded );

    // Add graphics for the plank, the fulcrum, the attachment bar, and the columns.
    nonMassLayer.addChild( new FulcrumNode( mvt, model.fulcrum ) );
    nonMassLayer.addChild( new PlankNode( mvt, model.plank ) );
    nonMassLayer.addChild( new AttachmentBarNode( mvt, model.attachmentBar ) );
    model.supportColumns.forEach( function( supportColumn ) {
      nonMassLayer.addChild( new LevelSupportColumnNode( mvt, supportColumn, model.columnStateProperty ) );
    } );

    // TODO: Add the ruler.

    // TODO: Add the level indicator.

    // TODO: Add the force vectors and the code that updates them.

    // TODO: Add everything else from BasicBalanceCanvas in Java.

    // Add the buttons that will control whether or not the support columns are in place.
    var balanceWithSupportsIconImage = new Image( balanceWithSupportsIcon );
    balanceWithSupportsIconImage.scale( BUTTON_ICON_WIDTH / balanceWithSupportsIconImage.width );
    var insertColumnsButton = new InOutRadioButton( model.columnStateProperty, 'doubleColumns', balanceWithSupportsIconImage,
      {
        xMargin: 0,
        yMargin: 0,
        cornerRadius: 5,
        stroke: null
      } );
    insertColumnsButton.centerX = mvt.modelToViewX( -0.4 );
    insertColumnsButton.centerY = mvt.modelToViewY( -0.5 );
    nonMassLayer.addChild( insertColumnsButton );
    var balanceWithoutSupportsIconImage = new Image( balanceWithoutSupportsIcon );
    balanceWithoutSupportsIconImage.scale( BUTTON_ICON_WIDTH / balanceWithoutSupportsIconImage.width );
    var removeColumnsButton = new InOutRadioButton( model.columnStateProperty, 'noColumns', balanceWithoutSupportsIconImage,
      {
        xMargin: 0,
        yMargin: 0,
        cornerRadius: 5,
        stroke: null
      } );
    removeColumnsButton.centerX = mvt.modelToViewX( 0.4 );
    removeColumnsButton.centerY = mvt.modelToViewY( -0.5 );
    nonMassLayer.addChild( removeColumnsButton );

    // Reset All button.
    nonMassLayer.addChild( new ResetAllButton( function() { model.reset(); },
      {
        radius: 20,
        centerX: mvt.modelToViewX( 2 ),
        centerY: mvt.modelToViewY( -0.5 )
      } ) );

    // TODO: Temp for testing button
    var SimpleClockIcon = require( 'SCENERY_PHET/SimpleClockIcon' );
    var PushButtonNew = require( 'SCENERY_PHET/PushButtonNew' );
    var Text = require( 'SCENERY/nodes/Text' );
    var PhetFont = require( 'SCENERY_PHET/PhetFont' );
    nonMassLayer.addChild( new PushButtonNew(
      function() { model.reset(); },
      new SimpleClockIcon( 12 ),
      {
        centerX: mvt.modelToViewX( 2.4 ),
        centerY: mvt.modelToViewY( -0.5 )
      } ) );
    nonMassLayer.addChild( new PushButtonNew(
      function() { model.reset(); },
      new Text( 'Test Button', { font: new PhetFont( { size: 14 } ) } ),
      { centerX: mvt.modelToViewX( 2.2 ), centerY: mvt.modelToViewY( -0.8 ) } ) );
  }

  return inherit( ScreenView, BasicBalanceView, {
    //TODO prototypes
  } );
} );