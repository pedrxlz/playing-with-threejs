import { KeyboardControlsEntry } from "@react-three/drei";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

export const keyBoardmap: KeyboardControlsEntry<Controls>[] = [
  { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
  { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
  { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
  { name: Controls.jump, keys: ["Space"] },
];

export function getInput(getKeyboard: () => { [key in Controls]: boolean }): {
  move: [number, number, number];
} {
  let [x, y, z] = [0, 0, 0];
  if (getKeyboard().back) z += 1.0;
  if (getKeyboard().forward) z -= 1.0;
  if (getKeyboard().right) x += 1.0;
  if (getKeyboard().left) x -= 1.0;
  if (getKeyboard().jump) y += 1.0;

  return {
    move: [x, y, z],
  };
}
