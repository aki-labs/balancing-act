// Copyright 2013-2020, University of Colorado Boulder

/**
 * This class represents an adult male human in a toolbox.  When the user
 * clicks on this node, the corresponding model element is added to the model at
 * the user's mouse position.
 *
 * @author John Blanco
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import balancingAct from '../../balancingAct.js';
import Man from '../../common/model/masses/Man.js';
import ImageMassNode from '../../common/view/ImageMassNode.js';
import ImageMassCreatorNode from './ImageMassCreatorNode.js';

// Model-view transform for scaling the node used in the toolbox.  This
// may scale the node differently than what is used in the model so that
// items in the toolbox can be sized differently (generally smaller).
const SCALING_MVT = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, 80 );

/**
 * @param {BalanceLabModel} model
 * @param {ModelViewTransform2} modelViewTransform
 * @constructor
 */
function ManCreatorNode( model, modelViewTransform ) {
  ImageMassCreatorNode.call( this, model, modelViewTransform, new Man(), true );
  this.setSelectionNode( new ImageMassNode( this.prototypeImageMass, SCALING_MVT, false, new Property( false ), false, model.columnStateProperty ) );
  this.positioningOffset = new Vector2( 0, -modelViewTransform.modelToViewDeltaY( this.prototypeImageMass.heightProperty.get() / 2 ) );
}

balancingAct.register( 'ManCreatorNode', ManCreatorNode );

inherit( ImageMassCreatorNode, ManCreatorNode );
export default ManCreatorNode;
