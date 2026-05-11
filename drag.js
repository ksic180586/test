const arena = document.getElementById('arena');
const box = document.getElementById('box');
const coords = document.getElementById('coords');

const SIDE = 72;
let arenaW, arenaH;

function measure() {
  const r = arena.getBoundingClientRect();
  arenaW = r.width;
  arenaH = r.height;
}

measure();

let px = arenaW / 2 - SIDE / 2;
let py = arenaH / 2 - SIDE / 2;
let offsetX = 0, offsetY = 0;
let active = false;

function place(x, y) {
  px = Math.max(0, Math.min(arenaW - SIDE, x));
  py = Math.max(0, Math.min(arenaH - SIDE, y));
  box.style.left = px + 'px';
  box.style.top = py + 'px';
  coords.textContent = 'x: ' + Math.round(px) + '   y: ' + Math.round(py);
}

place(px, py);

function getPos(e) {
  if (e.touches) {
    const t = e.touches[0];
    const r = arena.getBoundingClientRect();
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }
  const r = arena.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function startDrag(e) {
  measure();
  active = true;
  box.classList.add('dragging');
  const p = getPos(e);
  offsetX = p.x - px;
  offsetY = p.y - py;
  e.preventDefault();
}

function moveDrag(e) {
  if (!active) return;
  const p = getPos(e);
  place(p.x - offsetX, p.y - offsetY);
  e.preventDefault();
}

function endDrag() {
  active = false;
  box.classList.remove('dragging');
}

box.addEventListener('touchstart', startDrag, { passive: false });
box.addEventListener('mousedown', startDrag);
window.addEventListener('touchmove', moveDrag, { passive: false });
window.addEventListener('mousemove', moveDrag);
window.addEventListener('touchend', endDrag);
window.addEventListener('mouseup', endDrag);
window.addEventListener('resize', () => { measure(); place(px, py); });