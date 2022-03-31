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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DataFor = void 0;\nvar global_1 = __webpack_require__(/*! ./global */ \"./src/global.ts\");\nvar net_1 = __webpack_require__(/*! ./net */ \"./src/net.ts\");\n/**\n * Data For Class - This is similar has a loop for to present the result on HTML code.\n *\n * ```HTML\n *\n * <TAGNAME data-for\n *\t\tdata-fields=\"FIELD_NAME;FIELD_NAME;`STRING_FIELD`;FIELD_NAME;...\"\n * \t\tdata-request-url=\"URI\"\n * \t\tdata-request-method=\"METHOD_TYPE\"\n * \t\tdata-request-params='{ \"FIELD_NAME\": \"FIELD_VALUE\" }'\n * \t\tdata-request-refresh=\"TIME_IN_SECONDS\"\n *\t\tdata-request-value=\"FIELD_NAME\"></TAGNAME>\n * ```\n *\tdata-for --> Required\n *\tdata-fields --> Required\n *\tdata-request-url --> Required\n *\tdata-request-method --> Required\n *\tdata-request-params --> Required only on POST method\n *\tdata-request-refresh --> Optional\n *\tdata-request-value --> Optional\n *\n *\tThe field \"data-request-value\" is used to tell the code where is the real result.\n *\n *\tExample:\n *\t\tResult of the request is: {  result: [ \"hello\", \"world\", \"123\"] }\n *\n *\t\tBut your result on HTML is : [object] Object.\n *\t\tYou use the attiribute \"data-request-value='result'\" and then you have the result in the HTML \"helloworld123\"\n *\n *\tOn data-request-params attribute if you want use the date in real time you can use this \"time\": \"DATE_NOW\"\n *  and the DataJS will put on the request the current HOUR:MINUTE payload.\n *\n *\tOn data-fields you can explore the data structure object. For example \"propertyname.insideproperty.array[0].valueproperty\"\n *\n *\tFor data-for work properly your request must return JSON structure\n */\nvar DataFor = /** @class */ (function () {\n    function DataFor(element) {\n        this.FIELD_SEPARATOR = \";\";\n        this.RAW_FIELD = /`/g;\n        this.RAW_FIELD_STR = \"`\";\n        this.PROTOCOL = \"://\";\n        this.SEARCH_ELEMENTS = '[data-for-subid][data-for-id]';\n        this.refreshTimer = null;\n        var self = this;\n        var element_tagname = element.tagName.toLowerCase();\n        var element_dataset = element.dataset;\n        var fields = element_dataset.fields;\n        var requestMethod = element_dataset.requestMethod;\n        var requestParams = element_dataset.requestParams;\n        var requestRefresh = element_dataset.requestRefresh;\n        var requestValue = element_dataset.requestValue;\n        var url = element_dataset.requestUrl;\n        if (url.indexOf(this.PROTOCOL) === -1) {\n            self.construct_result(element_tagname, window[url], fields);\n        }\n        else {\n            var refresh_1 = function () {\n                new net_1.Network(url, requestMethod, requestParams, true).call(function (_, data_json) {\n                    var request_result = data_json;\n                    if (requestValue) {\n                        request_result = global_1.Global.getStringProperty(data_json, requestValue);\n                    }\n                    self.construct_result(element_tagname, request_result, fields, element);\n                }, function (_) {\n                    self.construct_result(element_tagname, [], fields, element);\n                });\n            };\n            if (requestRefresh) {\n                this.refreshTimer = setInterval(function () {\n                    refresh_1();\n                }, parseInt(requestRefresh) * 1000);\n            }\n            refresh_1();\n        }\n    }\n    DataFor.prototype.construct_result = function (element_tagname, data, field, element) {\n        for (var data_id = 0; data_id < data.length; data_id++) {\n            var data_item = data[data_id];\n            var data_sub_id = data_id.toString();\n            var fields = global_1.Global.createStringValue(field, data_item);\n            for (var field_id = 0; field_id < fields.fields_list.length; field_id++) {\n                var field_element = document.createElement(element_tagname);\n                var field_1 = fields.fields_list[field_id];\n                var field_id_str = field_id.toString();\n                var query_string = '[data-for-subid=\"' + data_sub_id + '\"][data-for-id=\"' + field_id_str + '\"]';\n                field_element.dataset.forId = field_id_str;\n                field_element.dataset.forSubid = data_sub_id;\n                if (element.querySelector(query_string)) {\n                    field_element = element.querySelector(query_string);\n                }\n                field_element.innerHTML = field_1;\n                element.appendChild(field_element);\n            }\n        }\n        this.clean_up_unwanted_result(data.length, global_1.Global.getFieldsLength(field), element);\n    };\n    DataFor.prototype.clean_up_unwanted_result = function (total_data, total_fields, element) {\n        var elements_to_clean = element.querySelectorAll(this.SEARCH_ELEMENTS);\n        for (var d = total_data; d < elements_to_clean.length; d++) {\n            for (var f = 0; f < total_fields; f++) {\n                var query_string = '[data-for-subid=\"' + d + '\"][data-for-id=\"' + f + '\"]';\n                var target_element = element.querySelector(query_string);\n                if (target_element) {\n                    target_element.remove();\n                }\n            }\n        }\n    };\n    DataFor.prototype.error_result = function (element, element_tagname) {\n        var field_element = document.createElement(element_tagname);\n        field_element.innerHTML = 'No Datasource found!';\n        element.appendChild(field_element);\n    };\n    DataFor.prototype.destroy = function () {\n        if (this.refreshTimer !== null) {\n            clearInterval(this.refreshTimer);\n            this.refreshTimer = null;\n        }\n    };\n    return DataFor;\n}());\nexports.DataFor = DataFor;\n\n\n//# sourceURL=webpack://datajs/./src/datafor.ts?");

/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Global = void 0;\n/**\n@class Global\n\nThis is the global class. It is used to create helpfull functions for the dataset structures.\n*/\nvar Global = /** @class */ (function () {\n    function Global() {\n    }\n    /**\n        @param variable{any}\n        @param pattern{string}\n\n       This function will search for the property inside of an JSON object.\n\n      For example:\n\n     ```\n        let obj_json:any = { foo: \"bar\", hello: \"world\", this_is: \"a test\", obj_t:{ foo:\"bar2\" } };\n\n       // This will return \"a test\" has an output.\n       console.log(Global.getStringProperty(obj_json, 'this_is'));\n\n      // This will return \"bar2\" has a string output.\n       console.log(Global.getStringProperty(obj_json, 'obj_t.foo'));\n      ```\n    */\n    Global.getStringProperty = function (variable, pattern) {\n        var result = variable;\n        var striped_pattern = pattern.replace(/\\[(\\w+)\\]/g, '.$1').replace(/^\\./, '');\n        var pattern_list = striped_pattern.split('.');\n        for (var i = 0; i < pattern_list.length; i++) {\n            var pattern_item = pattern_list[i];\n            if (pattern_item in result) {\n                result = result[pattern_item];\n            }\n            else {\n                return result;\n            }\n        }\n        return result;\n    };\n    Global.createStringValue = function (string_pattern, value_object) {\n        var result = {\n            result: '',\n            fields_list: []\n        };\n        var fields = string_pattern.split(Global.FIELD_SEPARATOR);\n        for (var field_id = 0; field_id < fields.length; field_id++) {\n            var field = fields[field_id];\n            var field_result = '';\n            if (field.indexOf(Global.RAW_FIELD_STR) !== -1) {\n                field_result = field.replace(Global.RAW_FIELD, '');\n            }\n            else {\n                field_result = Global.getStringProperty(value_object, field);\n            }\n            result.fields_list.push(field_result);\n            result.result += field_result;\n        }\n        return result;\n    };\n    Global.getFieldsLength = function (string_pattern) {\n        return string_pattern.split(Global.FIELD_SEPARATOR).length;\n    };\n    Global.FIELD_SEPARATOR = \";\";\n    Global.RAW_FIELD = /`/g;\n    Global.RAW_FIELD_STR = \"`\";\n    return Global;\n}());\nexports.Global = Global;\n\n\n//# sourceURL=webpack://datajs/./src/global.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar datafor_1 = __webpack_require__(/*! ./datafor */ \"./src/datafor.ts\");\nvar vdom_1 = __webpack_require__(/*! ./vdom */ \"./src/vdom.ts\");\n/**\n    @class DataJS\n\n    DataJS main class.\n */\nvar DataJS = /** @class */ (function () {\n    function DataJS() {\n        console.log('DataJS v1.0.0');\n        var data_for_elements = document.querySelectorAll('[data-for]');\n        for (var elem_id = 0; elem_id < data_for_elements.length; elem_id++) {\n            var element = data_for_elements[elem_id];\n            var data_element = new datafor_1.DataFor(element);\n            element.dataset.id = elem_id.toString();\n            vdom_1.VDOM.add_element({\n                id: 'dfor-' + elem_id.toString(),\n                element: element,\n                element_class: data_element\n            });\n        }\n    }\n    /**\n        Clears all the timers, VDOM and every element connected with the DataJS.\n    */\n    DataJS.prototype.clear_datajs = function () {\n        console.log('Clear DataJS...');\n        vdom_1.VDOM.clear();\n    };\n    return DataJS;\n}());\nwindow.DataJS = DataJS;\n\n\n//# sourceURL=webpack://datajs/./src/index.ts?");

/***/ }),

/***/ "./src/net.ts":
/*!********************!*\
  !*** ./src/net.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Network = void 0;\n/**\n@class Network\n\n@param url{string}\n@param method{string}\n@param parameters{any}\n@param parse_params_to_json[boolean]\n\nThis is the Network class. It is used for requests and similar.\n*/\nvar Network = /** @class */ (function () {\n    function Network(url, method, parameters, parse_params_to_json) {\n        if (parse_params_to_json === void 0) { parse_params_to_json = true; }\n        this.url = url;\n        this.method = method;\n        this.params = parameters;\n        this.parse_params_to_json = parse_params_to_json;\n    }\n    /**\n        @param success_callback{any}\n        @param failed_callback{any}\n\n       This function is to do the request of the given resource.\n    */\n    Network.prototype.call = function (success_callback, failed_callback) {\n        var xhr = new XMLHttpRequest();\n        xhr.onreadystatechange = function () {\n            if (xhr.readyState === 4 && xhr.status === 200) {\n                var data_json = null;\n                try {\n                    data_json = JSON.parse(xhr.responseText);\n                }\n                catch (ex) {\n                    data_json = xhr.responseText;\n                }\n                success_callback(xhr, data_json);\n            }\n            else if (xhr.readyState === 4 && xhr.status !== 200) {\n                failed_callback(xhr);\n            }\n        };\n        if (failed_callback !== undefined) {\n            xhr.ontimeout = failed_callback;\n        }\n        xhr.open(this.method, this.url, true);\n        xhr.timeout = 30000;\n        xhr.setRequestHeader('Referer', this.url);\n        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');\n        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');\n        if (this.method === 'POST' && this.params !== undefined) {\n            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');\n            if (typeof this.params === 'string' && this.parse_params_to_json) {\n                this.params = JSON.parse(this.params);\n            }\n            if (this.params.time !== undefined && this.params.time === 'DATE_NOW') {\n                var date_now = new Date();\n                this.params.time = \"\".concat(date_now.getHours(), \":\").concat(date_now.getMinutes());\n            }\n            xhr.send(JSON.stringify(this.params));\n        }\n        else {\n            xhr.send();\n        }\n    };\n    return Network;\n}());\nexports.Network = Network;\n\n\n//# sourceURL=webpack://datajs/./src/net.ts?");

/***/ }),

/***/ "./src/vdom.ts":
/*!*********************!*\
  !*** ./src/vdom.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.VDOM = void 0;\n/**\n    @class VDOM\n\n    @static\n\n    Virtual DOM sector of the libary.\n*/\nvar VDOM = /** @class */ (function () {\n    function VDOM() {\n    }\n    /**\n    Function to add an element into the virtual DOM.\n    */\n    VDOM.add_element = function (element) {\n        VDOM.dom_list.push(element);\n    };\n    /**\n    Clears outall the elements of the DOM and clears the virtual DOM list.\n    */\n    VDOM.clear = function () {\n        for (var c = 0; c < VDOM.dom_list.length; c++) {\n            VDOM.dom_list[c].element_class.destroy();\n            VDOM.dom_list[c].element.remove();\n        }\n        VDOM.dom_list = [];\n    };\n    /**\n        Removes an element by his ID.\n    */\n    VDOM.remove_element = function (id) {\n        for (var c = 0; c < VDOM.dom_list.length; c++) {\n            var dom_i = VDOM.dom_list[c];\n            if (dom_i.id === id) {\n                VDOM.dom_list[c].element_class.destroy();\n                VDOM.dom_list[c].element.remove();\n                VDOM.dom_list.splice(c, 1);\n                break;\n            }\n        }\n    };\n    // Elements list\n    VDOM.dom_list = [];\n    return VDOM;\n}());\nexports.VDOM = VDOM;\n\n\n//# sourceURL=webpack://datajs/./src/vdom.ts?");

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