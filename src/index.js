import './index.css';

import {registerListeners, keysDown} from './util/inputter';
import keyCodes from './util/keyCodes';
import {createSpriteSheet, renderSpriteToCtx} from './util/sprites';
import colliding from './util/colliding';

const spriteData = require('../sprites/sprites.json');
const spriteImageUrl = require('../sprites/sprites.png');
const spriteSheet = createSpriteSheet(spriteData, spriteImageUrl);

registerListeners();

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const width = 320;
const height = 240;

canvas.width = width;
canvas.height = height;

const initialState = {
  playerHasSword: false,
  ganonIsDead: false,

  player: {
    position: [width / 2, 20],
    width: 16,
    height: 24,
    facing: 'down',
  },

  sword: {
    position: [width / 2, height / 2],
    width: 20,
    height: 22,
  },

  ganon: {
    position: [width / 2, height - 40],
    width: 47,
    height: 40,
  },
};

const playerSpeed = 50;

function update(prevState, dt) {
  const newState = {...prevState};

  // Handle input

  if (keysDown.has(keyCodes.UP_ARROW)) {
    newState.player.position[1] -= playerSpeed * dt;
    newState.player.facing = 'up';
  }

  if (keysDown.has(keyCodes.DOWN_ARROW)) {
    newState.player.position[1] += playerSpeed * dt;
    newState.player.facing = 'down';
  }

  if (keysDown.has(keyCodes.LEFT_ARROW)) {
    newState.player.position[0] -= playerSpeed * dt;
    newState.player.facing = 'left';
  }

  if (keysDown.has(keyCodes.RIGHT_ARROW)) {
    newState.player.position[0] += playerSpeed * dt;
    newState.player.facing = 'right';
  }

  newState.player.position = newState.player.position.map((n) => Math.round(n));

  // Test for collisions
  if (colliding(newState.player, newState.sword)) {
    newState.playerHasSword = true;
  }

  if (colliding(newState.player, newState.ganon)) {
    if (newState.playerHasSword) {
      newState.ganonIsDead = true;
    }
  }

  return {...newState};
}

function draw(ctx, state) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // render player
  const spriteForDirection = {
    up: 'zelda-up-1.png',
    down: 'zelda-down-1.png',
    left: 'zelda-left-1.png',
    right: 'zelda-right-1.png',
  }[state.player.facing];

  renderSpriteToCtx(
    ctx,
    spriteSheet,
    spriteForDirection,
    state.player.position[0],
    state.player.position[1]
  );

  // render ganon
  if (!state.ganonIsDead) {
    renderSpriteToCtx(
      ctx,
      spriteSheet,
      'Ganon.png',
      state.ganon.position[0],
      state.ganon.position[1]
    );
  }

  // render sword
  if (!state.playerHasSword) {
    renderSpriteToCtx(
      ctx,
      spriteSheet,
      'sword.png',
      state.sword.position[0],
      state.sword.position[1]
    );
  }

  if (state.ganonIsDead) {
    ctx.font = '12px "Press Start 2P"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('You saved Hyrule!', width / 2, height / 2);
  }
}

function runLoop(prevState = initialState, prevTime = Date.now()) {
  window.requestAnimationFrame(() => {
    const currentTime = Date.now();
    const dt = currentTime - prevTime;
    const newState = update(prevState, dt / 1000);
    draw(ctx, newState);
    runLoop(newState, currentTime);
  });
}

function startGame() {
  runLoop();
}

startGame();