/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = serverGET;
/* harmony export (immutable) */ __webpack_exports__["b"] = serverPOST;
function serverGET(url, callback){
//performs an AJAX GET request from the server
//inputs: request url, callback, returns data
    var serverResponse;
    

    if (window.XMLHttpRequest){
        var requestObject = new XMLHttpRequest();
 

    }else{
        var requestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }

    requestObject.onreadystatechange = function(){

        if (requestObject.readyState==4 & requestObject.status==200){
            
            requestObject.onload=function(){
                serverResponse = requestObject.responseText;
                if (callback) callback(serverResponse);
                           
            }

        }
    }

    requestObject.open('GET',url,true);
    requestObject.send();

    return 'Test Success';
}


function serverPOST (url, callback,data){
//performs an AJAX POST request to the server
//inputs: request url, callback, data to send
    var serverResponse;
    

    if (window.XMLHttpRequest){
        var requestObject = new XMLHttpRequest();
    }else{
        var requestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }

    requestObject.onreadystatechange = function(){

        if (requestObject.readyState==4 & requestObject.status==200){
            requestObject.onload=function(){
                serverResponse = requestObject.responseText;
                if (callback) callback(serverResponse);
            }

        }
    }

    requestObject.open('POST',url,true);
    requestObject.send(data);

    return 'Test Success';
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listSyncMethods_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xhttpFunctions_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__htmlDisplayDraw__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inputAndValidate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addOrder__ = __webpack_require__(5);







function winload(){

	var displayArea = document.getElementById("panelDisplay");
	var btn = document.getElementById("orderNow");
	var doc = document;

	//load up panels on start
	refreshPanels(displayArea);

		
}
window.onload = winload;


function refreshPanels(display){
	//refresh panels
	Object(__WEBPACK_IMPORTED_MODULE_0__listSyncMethods_js__["a" /* serverListSync */])().then((data)=>{
		var localServerList = JSON.stringify(data);
		var displayString = Object(__WEBPACK_IMPORTED_MODULE_2__htmlDisplayDraw__["a" /* htmlDisplayDraw */])(localServerList)
		display.innerHTML=(displayString);
	})

}

window.onCaptcha = function(token){

	var doc = document;
	var displayArea = document.getElementById("panelDisplay");
	
	Object(__WEBPACK_IMPORTED_MODULE_1__xhttpFunctions_js__["b" /* serverPOST */])('/captcha',(res)=>{

		var result = JSON.parse(res);
		if(result.success==true){
			var userInput = Object(__WEBPACK_IMPORTED_MODULE_3__inputAndValidate__["a" /* getInput */])(doc);
			if (Object(__WEBPACK_IMPORTED_MODULE_3__inputAndValidate__["b" /* validate */])(userInput,doc)){
				Object(__WEBPACK_IMPORTED_MODULE_4__addOrder__["a" /* addOrder */])(userInput,()=>{
					refreshPanels(displayArea);
					try{
						grecaptcha.reset();
					}catch(err){
						console.log("Captcha styling insivible");
					}
					
				})
			}
		}else{
			console.log('Captcha-Failed');
			try{
				grecaptcha.reset();
			}catch(err){
				console.log("Captcha styling insivible");
			}
		}


	},token);

}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = serverListSync;
/* unused harmony export serverListMatchCheck */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xhttpFunctions_js__ = __webpack_require__(0);


function serverListSync(){

	return new Promise(function(resolve,reject){

		var serverList;

		Object(__WEBPACK_IMPORTED_MODULE_0__xhttpFunctions_js__["a" /* serverGET */])('/req',(data)=>{
			serverList = JSON.parse(data);
			resolve(serverList);

		});
	})


}




function serverListMatchCheck(localList){
	var syncStatus=false;


	Object(__WEBPACK_IMPORTED_MODULE_0__xhttpFunctions_js__["a" /* serverGET */])('/req',(data)=>{

		if (JSON.parse(data)==localList){

			syncStatus = true;

		}else{

			syncStatus= false;

		}
	})



	console.log('test');
	return syncStatus;


}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = htmlDisplayDraw;
function htmlDisplayDraw(displayJsonString){

	var htmlString="";
	var rawdata = JSON.parse(displayJsonString)
	rawdata = rawdata.orderList;

            for (var i=0;i<rawdata.length;i++)
            {	
                switch (rawdata[i].itemName) {
                //panel color selector
                    case 'Beers':
                         htmlString += " <div class='orderPanel panelBeers' style='margin: 25px; padding:5px;'>";
                         break;

                    case 'Chips':
                         htmlString += " <div class='orderPanel panelChips' style='margin: 25px; padding:5px;'>";
                         break;

                    case 'Balloons':
                         htmlString += " <div class='orderPanel panelBalloons' style='margin: 25px; padding:5px;'>";
                         break;
                }

                htmlString += "<div><p class='panelFont' style='padding-left: 15px;'> " +  rawdata[i].itemName + "</p></div>";
                htmlString += " <div class='panelFont rightText' style='padding-right: 15px;'><p>" + rawdata[i].quantity  + "  </p> </div>";
                htmlString += "<div><p class='panelFont' style='padding-left: 15px;'> Suggested By: <b>" + rawdata[i].orderedBy  + "</b></p></div>";
                htmlString += "</div>";

            }


            try{
            	document.getElementById("panelDisplay").innerHTML=(htmlString);
        	}catch(err){
    			console.log("Display #panelDisplay area not found in html page")
        	}
        

        return htmlString;
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getInput;
/* harmony export (immutable) */ __webpack_exports__["b"] = validate;
function getInput(doc){

	var itemSelected = 'Beers';
    //Default radio button is set to Beers.
    if (doc.getElementById('r2').checked) {
       itemSelected = 'Balloons';
    }else if (doc.getElementById('r3').checked){
        itemSelected = 'Chips';
    }

    var itemAmount = doc.getElementById("itemAmount").value;
    var itemOrderBy = doc.getElementById("itemOrderBy").value;

    return {"itemSelected":itemSelected,"itemAmount":itemAmount,"itemOrderBy":itemOrderBy}
}

function validate(inputObject,doc){

   //Check for empty fields
   var itemAmount = inputObject.itemAmount;
   var itemOrderBy = inputObject.itemOrderBy;
   var validation = true;


        if ((itemOrderBy) == ""){
            doc.getElementById("validationMsgAmount").value = "Please fill in this field.";
            validation = false;
        }

        if ((itemAmount) == ""){
          	doc.getElementById("validationMsgWho").value = "Please fill in this field.";
    	 	validation = false;
        }

        //Check amount is a number between 1 and 10
        if (isNaN(itemAmount)||itemAmount>10||itemAmount<1){
            doc.getElementById("validationMsgAmount").value = "Please ensure amount is a number between 1 and 10";
            validation = false;
        }

        //Check of itemOrderBy field is a name
        var regex = /^([A-Za-z0-9]{3,20})$/;
        if (regex.test(itemOrderBy)==false){
        	doc.getElementById("validationMsgWho").value = "Please ensure 'Who' field only consists of 3 to 20 letters/numbers.";
            validation = false;
        }

        return validation;
}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addOrder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xhttpFunctions_js__ = __webpack_require__(0);


function addOrder(data,callback){
	//Makes a POST request when called pushing the data to the server.

	data = JSON.stringify(data);
	
	Object(__WEBPACK_IMPORTED_MODULE_0__xhttpFunctions_js__["b" /* serverPOST */]) ('/add',null,data);
	callback();

}

/***/ })
/******/ ]);