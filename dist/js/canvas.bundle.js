/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((module) => {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}
function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// Objects
function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: 0,
    y: 3
  };
  this.friction = 0.8;
  this.gravity = 1;
}
Star.prototype.draw = function () {
  context.save();
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  context.fillStyle = this.color;
  context.shadowColor = '#E3EAEF';
  context.shadowBlur = 20;
  context.fill();
  context.closePath();
  context.restore();
};
Star.prototype.update = function () {
  this.draw();

  // When ball hits the bottom of screen
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction;
    this.shatter();
  } else {
    this.velocity.y += this.gravity;
  }
  this.y += this.velocity.y;
};
Star.prototype.shatter = function () {
  this.radius -= 3;
  for (var i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 2));
  }
};
function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: _utils__WEBPACK_IMPORTED_MODULE_0___default().randomIntFromRange(-5, 5),
    y: _utils__WEBPACK_IMPORTED_MODULE_0___default().randomIntFromRange(-15, 15)
  };
  this.friction = 0.8;
  this.gravity = 0.1;
  this.ttl = 100;
  this.opacity = 1;
}
MiniStar.prototype.draw = function () {
  context.save();
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  context.fillStyle = "rgba(227, 234, 239, ".concat(this.opacity = this.ttl / 100, ")");
  context.shadowColor = '#E3EAEF';
  context.shadowBlur = 20;
  context.fill();
  context.closePath();
  context.restore();
};
MiniStar.prototype.update = function () {
  this.draw();

  // When ball hits the bottom of screen
  if (this.y + this.radius + this.velocity.y > canvas.height) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.ttl -= 1;
};
function createMountainRange(mountainAmount, height, color) {
  for (var i = 0; i < mountainAmount; i++) {
    var mountainWidth = canvas.width / mountainAmount;
    context.beginPath();
    context.moveTo(i * mountainWidth, canvas.height);
    context.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    context.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
    context.lineTo(i * mountainWidth - 325, canvas.height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}

// Implementation
var backgroundGrad = context.createLinearGradient(0, 0, 0, canvas.height);
backgroundGrad.addColorStop(0, '#171e26');
backgroundGrad.addColorStop(1, '#3f586b');
var stars;
var miniStars;
var backgroundStars;
var ticker = 0;
var randomSpawnRate = 75;
function init() {
  stars = [];
  miniStars = [];
  backgroundStars = [];

  // for (let i = 0; i < 1; i++) {
  //   stars.push(new Star(canvas.width / 2, 30, 30, '#E3EAEF'));
  // }

  for (var i = 0; i < 150; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 3;
    backgroundStars.push(new Star(x, y, radius, 'white'));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = backgroundGrad;
  context.fillRect(0, 0, canvas.width, canvas.height);
  backgroundStars.forEach(function (backgroundStar) {
    backgroundStar.draw();
  });
  createMountainRange(1, canvas.height - 50, '#384551');
  createMountainRange(2, canvas.height - 100, '#2b3843');
  createMountainRange(3, canvas.height - 300, '#26333e');
  stars.forEach(function (star, index) {
    star.update();
    if (star.radius == 0) {
      stars.splice(index, 1);
    }
  });
  miniStars.forEach(function (miniStar, index) {
    miniStar.update();
    if (miniStar.ttl == 0) {
      miniStars.splice(index, 1);
    }
  });
  ticker++;
  if (ticker % randomSpawnRate == 0) {
    var x = Math.random() * canvas.width;
    stars.push(new Star(x, -100, 12, 'white'));
    randomSpawnRate = _utils__WEBPACK_IMPORTED_MODULE_0___default().randomIntFromRange(75, 200);
  }
}
init();
animate();
})();

/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map