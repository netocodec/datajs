/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/datafor.ts":
/*!************************!*\
  !*** ./src/datafor.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DataFor = void 0;\nvar global_1 = __webpack_require__(/*! ./global */ \"./src/global.ts\");\nvar net_1 = __webpack_require__(/*! ./net */ \"./src/net.ts\");\nvar DataFor = /** @class */ (function () {\n    function DataFor(element) {\n        this.FIELD_SEPARATOR = \";\";\n        this.RAW_FIELD = /`/g;\n        this.RAW_FIELD_STR = \"`\";\n        this.PROTOCOL = \"://\";\n        this.refreshTimer = null;\n        var self = this;\n        var element_tagname = element.tagName.toLowerCase();\n        var element_dataset = element.dataset;\n        var fields = element_dataset.fields.split(this.FIELD_SEPARATOR);\n        var requestMethod = element_dataset.requestMethod;\n        var requestParams = element_dataset.requestParams;\n        var requestRefresh = element_dataset.requestRefresh;\n        var url = element_dataset.requestUrl;\n        if (url.indexOf(this.PROTOCOL) === -1) {\n            self.construct_result(element_tagname, window[url], fields);\n        }\n        else {\n            var refresh_1 = function () {\n                new net_1.Network(url, requestMethod, requestParams, true).call(function (_, data_json) {\n                    self.construct_result(element_tagname, data_json, fields, element);\n                }, function (_) {\n                    self.construct_result(element_tagname, [], fields, element);\n                });\n            };\n            if (requestRefresh) {\n                this.refreshTimer = setInterval(function () {\n                    refresh_1();\n                }, parseInt(requestRefresh) * 1000);\n            }\n            refresh_1();\n        }\n    }\n    DataFor.prototype.construct_result = function (element_tagname, data, fields, element) {\n        for (var data_id = 0; data_id < data.length; data_id++) {\n            var data_item = data[data_id];\n            for (var field_id = 0; field_id < fields.length; field_id++) {\n                var field_element = document.createElement(element_tagname);\n                var field = fields[field_id];\n                var field_id_str = field_id.toString();\n                var query_string = '[data-id=\"' + field_id_str + '\"]';\n                field_element.dataset.id = field_id_str;\n                if (element.querySelector(query_string)) {\n                    field_element = element.querySelector(query_string);\n                }\n                if (field.indexOf(this.RAW_FIELD_STR) !== -1) {\n                    field_element.innerHTML = field.replace(this.RAW_FIELD, '');\n                }\n                else {\n                    field_element.innerHTML = global_1.Global.getStringProperty(data_item, field);\n                }\n                element.appendChild(field_element);\n            }\n        }\n    };\n    DataFor.prototype.error_result = function (element, element_tagname) {\n        var field_element = document.createElement(element_tagname);\n        field_element.innerHTML = 'No Datasource found!';\n        element.appendChild(field_element);\n    };\n    DataFor.prototype.destroy = function () {\n        if (this.refreshTimer !== null) {\n            clearInterval(this.refreshTimer);\n            this.refreshTimer = null;\n        }\n    };\n    return DataFor;\n}());\nexports.DataFor = DataFor;\n\n\n//# sourceURL=webpack://datajs/./src/datafor.ts?");

/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Global = void 0;\nvar Global = /** @class */ (function () {\n    function Global() {\n    }\n    Global.getStringProperty = function (variable, pattern) {\n        var result = variable;\n        var striped_pattern = pattern.replace(/\\[(\\w+)\\]/g, '.$1').replace(/^\\./, '');\n        var pattern_list = striped_pattern.split('.');\n        for (var i = 0; i < pattern_list.length; i++) {\n            var pattern_item = pattern_list[i];\n            if (pattern_item in result) {\n                result = result[pattern_item];\n            }\n            else {\n                return result;\n            }\n        }\n        return result;\n    };\n    return Global;\n}());\nexports.Global = Global;\n\n\n//# sourceURL=webpack://datajs/./src/global.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar datafor_1 = __webpack_require__(/*! ./datafor */ \"./src/datafor.ts\");\nvar vdom_1 = __webpack_require__(/*! ./vdom */ \"./src/vdom.ts\");\nvar DataJS = /** @class */ (function () {\n    function DataJS() {\n        console.log('DataJS v1.0.0');\n        var data_for_elements = document.querySelectorAll('[data-for]');\n        for (var elem_id = 0; elem_id < data_for_elements.length; elem_id++) {\n            var element = data_for_elements[elem_id];\n            var data_element = new datafor_1.DataFor(element);\n            element.dataset.id = elem_id.toString();\n            vdom_1.VDOM.add_element({\n                id: 'dfor-' + elem_id.toString(),\n                element: element,\n                element_class: data_element\n            });\n        }\n        setInterval(function () {\n            console.log(vdom_1.VDOM.dom_list);\n        }, 10000);\n    }\n    DataJS.prototype.clear_datajs = function () {\n        console.log('Clear DataJS...');\n        vdom_1.VDOM.clear();\n    };\n    return DataJS;\n}());\nwindow.DataJS = DataJS;\n\n\n//# sourceURL=webpack://datajs/./src/index.ts?");

/***/ }),

/***/ "./src/net.ts":
/*!********************!*\
  !*** ./src/net.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Network = void 0;\nvar Network = /** @class */ (function () {\n    function Network(url, method, parameters, parse_params_to_json) {\n        if (parse_params_to_json === void 0) { parse_params_to_json = true; }\n        this.url = url;\n        this.method = method;\n        this.params = parameters;\n        this.parse_params_to_json = parse_params_to_json;\n    }\n    Network.prototype.call = function (success_callback, failed_callback) {\n        var xhr = new XMLHttpRequest();\n        xhr.onreadystatechange = function () {\n            if (xhr.readyState === 4 && xhr.status === 200) {\n                var data_json = null;\n                try {\n                    data_json = JSON.parse(xhr.responseText);\n                }\n                catch (ex) {\n                    data_json = xhr.responseText;\n                }\n                success_callback(xhr, data_json);\n            }\n            else if (xhr.readyState === 4 && xhr.status !== 200) {\n                failed_callback(xhr);\n            }\n        };\n        if (failed_callback !== undefined) {\n            xhr.ontimeout = failed_callback;\n        }\n        xhr.open(this.method, this.url, true);\n        xhr.timeout = 30000;\n        xhr.setRequestHeader('Referer', this.url);\n        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');\n        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');\n        if (this.method === 'POST' && this.params !== undefined) {\n            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');\n            if (typeof this.params === 'string' && this.parse_params_to_json) {\n                this.params = JSON.parse(this.params);\n            }\n            if (this.params.time !== undefined && this.params.time === 'DATE_NOW') {\n                var date_now = new Date();\n                this.params.time = \"\".concat(date_now.getHours(), \":\").concat(date_now.getMinutes());\n            }\n            xhr.send(JSON.stringify(this.params));\n        }\n        else {\n            xhr.send();\n        }\n    };\n    return Network;\n}());\nexports.Network = Network;\n\n\n//# sourceURL=webpack://datajs/./src/net.ts?");

/***/ }),

/***/ "./src/vdom.ts":
/*!*********************!*\
  !*** ./src/vdom.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.VDOM = void 0;\nvar VDOM = /** @class */ (function () {\n    function VDOM() {\n    }\n    VDOM.add_element = function (element) {\n        console.log(\"add_element::\".concat(element.id));\n        VDOM.dom_list.push(element);\n    };\n    VDOM.clear = function () {\n        for (var c = 0; c < VDOM.dom_list.length; c++) {\n            VDOM.dom_list[c].element_class.destroy();\n            VDOM.dom_list[c].element.remove();\n        }\n        VDOM.dom_list = [];\n    };\n    VDOM.remove_element = function (id) {\n        var result_id = -1;\n        for (var c = 0; c < VDOM.dom_list.length; c++) {\n            var dom_i = VDOM.dom_list[c];\n            if (dom_i.id === id) {\n                result_id = c;\n                break;\n            }\n        }\n        if (result_id !== -1) {\n            VDOM.dom_list[result_id].element_class.destroy();\n            VDOM.dom_list[result_id].element.remove();\n            VDOM.dom_list.splice(result_id, 1);\n        }\n    };\n    VDOM.dom_list = [];\n    return VDOM;\n}());\nexports.VDOM = VDOM;\n\n\n//# sourceURL=webpack://datajs/./src/vdom.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;