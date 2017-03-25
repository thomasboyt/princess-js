/**
 * Thanks MDN: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
export default function colliding(rect1, rect2) {
  return (
    rect1.position[0] < rect2.position[0] + rect2.width &&
    rect1.position[0] + rect1.width > rect2.position[0] &&
    rect1.position[1] < rect2.position[1] + rect2.height &&
    rect1.height + rect1.position[1] > rect2.position[1]
  );
}