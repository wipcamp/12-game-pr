(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory();
	else
		root["app"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dev/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: D:\\Work\\WIP Camp#12 Game\\src\\main.js: Unexpected token, expected \",\" (24:0)\n\n\u001b[0m \u001b[90m 22 | \u001b[39m    scene\u001b[33m:\u001b[39m [\u001b[0m\n\u001b[0m \u001b[90m 23 | \u001b[39m        \u001b[33mComicPage1\u001b[39m\u001b[33m,\u001b[39m\u001b[33mMainMenu\u001b[39m\u001b[33m,\u001b[39m\u001b[33mGameScene\u001b[39m\u001b[33m,\u001b[39m\u001b[33mComicPage2\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 24 | \u001b[39m}\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 25 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 26 | \u001b[39m\u001b[36mconst\u001b[39m game \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mPhaser\u001b[39m\u001b[33m.\u001b[39m\u001b[33mGame\u001b[39m(config)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 27 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mdefault\u001b[39m game\u001b[33m;\u001b[39m\u001b[0m\n    at Parser.raise (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:6387:17)\n    at Parser.unexpected (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:7704:16)\n    at Parser.expect (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:7690:28)\n    at Parser.parseExprList (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9532:14)\n    at Parser.parseExprAtom (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8841:32)\n    at Parser.parseExprSubscripts (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8483:23)\n    at Parser.parseMaybeUnary (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8463:21)\n    at Parser.parseExprOps (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8329:23)\n    at Parser.parseMaybeConditional (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8302:23)\n    at Parser.parseMaybeAssign (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8249:21)\n    at Parser.parseObjectProperty (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9352:101)\n    at Parser.parseObjPropValue (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9377:101)\n    at Parser.parseObjectMember (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9301:10)\n    at Parser.parseObj (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9225:25)\n    at Parser.parseExprAtom (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8855:28)\n    at Parser.parseExprSubscripts (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8483:23)\n    at Parser.parseMaybeUnary (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8463:21)\n    at Parser.parseExprOps (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8329:23)\n    at Parser.parseMaybeConditional (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8302:23)\n    at Parser.parseMaybeAssign (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:8249:21)\n    at Parser.parseVar (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:10551:26)\n    at Parser.parseVarStatement (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:10370:10)\n    at Parser.parseStatementContent (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9967:21)\n    at Parser.parseStatement (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9900:17)\n    at Parser.parseBlockOrModuleBlockBody (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:10476:25)\n    at Parser.parseBlockBody (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:10463:10)\n    at Parser.parseTopLevel (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:9829:10)\n    at Parser.parse (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:11341:17)\n    at parse (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\parser\\lib\\index.js:11377:38)\n    at parser (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:166:34)\n    at normalizeFile (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:100:11)\n    at runSync (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\core\\lib\\transformation\\index.js:44:43)\n    at runAsync (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\core\\lib\\transformation\\index.js:35:14)\n    at process.nextTick (D:\\Work\\WIP Camp#12 Game\\node_modules\\@babel\\core\\lib\\transform.js:34:34)\n    at process._tickCallback (internal/process/next_tick.js:61:11)");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Work\WIP Camp#12 Game\src\main.js */"./src/main.js");


/***/ })

/******/ });
});
//# sourceMappingURL=app.js.map