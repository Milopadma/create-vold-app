// ----- HELPER FUNCTIONS ----- //

// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

// Map number x from range [a, b] to [c, d]
export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Clamp
export const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

// Gets the mouse position
export const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (document.documentElement.classList.contains('has-scroll-smooth') && (e.pageX || e.pageY)) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    // posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    // posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    posx = e.clientX + document.body.scrollLeft;
    posy = e.clientY + document.body.scrollTop;
  }

  return { x: posx, y: posy };
};

// Generate a random float.
export const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

// Get index of an element in its parent node
export function indexInParent(node) {
  let children = node.parentNode.childNodes;
  let num = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  return -1;
}

// Element(index) selector
export function eq(index) {
  if (index >= 0 && index < this.length) return this[index];
  else return -1;
}

// Detect mobile
export function isMobile() {
  return !!(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
}

// var ua = navigator.userAgent.toLowerCase();
// if (ua.indexOf("safari") != -1) {
//   if (ua.indexOf("chrome") > -1) {
//     document.body.classList.remove("safari");
//     document.body.classList.add("chrome");
//   } else {
//     document.body.classList.remove("chrome");
//     document.body.classList.add("safari");
//   }
// }

// Trigger resize
export function triggerResize() {
  let ev = document.createEvent('HTMLEvents');
  ev.initEvent('resize', true, false);
  window.dispatchEvent(ev);
}
