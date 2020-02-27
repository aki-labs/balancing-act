// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the Balancing Act simulation.
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import BalanceLabScreen from './balancelab/BalanceLabScreen.js';
import balancingActStrings from './balancing-act-strings.js';
import BalanceGameScreen from './game/BalanceGameScreen.js';
import BAIntroScreen from './intro/BAIntroScreen.js';

const balancingActTitleString = balancingActStrings[ 'balancing-act' ].title;

// constants
const tandem = Tandem.ROOT;

SimLauncher.launch( function() {

  const simOptions = {
    credits: {
      leadDesign: 'Kathy Perkins, John Blanco, Ariel Paul',
      softwareDevelopment: 'John Blanco',
      graphicArts: 'John Blanco, Mariah Hermsmeyer',
      team: 'Michael Dubson, Trish Loeblein'
    }
  };

  // Create and start the sim
  const screens = [
    new BAIntroScreen( tandem.createTandem( 'introScreen' ) ),
    new BalanceLabScreen( tandem.createTandem( 'balanceLabScreen' ) ),

    // Game screen not available in phet-io
    ...( Tandem.PHET_IO_ENABLED ? [] : [ new BalanceGameScreen( tandem.createTandem( 'gameScreen' ) ) ] )
  ];

  new Sim( balancingActTitleString, screens, simOptions ).start();
} );