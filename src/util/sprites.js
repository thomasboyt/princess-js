function getSprite(spriteSheet, spriteName) {
  const sprite = spriteSheet.data.frames[spriteName];

  if (!sprite) {
    throw new Error(`no sprite named ${spriteName} found`);
  }

  const {x, y, w, h} = sprite.frame;
  return {x, y, width: w, height: h};
}

export function renderSpriteToCtx(ctx, spriteSheet, spriteName, destX, destY) {
  const sprite = getSprite(spriteSheet, spriteName);

  ctx.drawImage(
    spriteSheet.image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    Math.round(destX - sprite.width / 2),
    Math.round(destY - sprite.height / 2),
    sprite.width,
    sprite.height,
  );
}

export function createSpriteSheet(data, imageUrl) {
  const image = new Image();
  image.src = imageUrl;

  return {
    image,
    data,
  };
}