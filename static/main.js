import {serverListSync,serverListMatchCheck} from './listSyncMethods.js'
import {serverGET,serverPOST} from './xhttpFunctions.js'
import {htmlDisplayDraw} from './htmlDisplayDraw';
import {getInput,validate} from './inputAndValidate';
import {addOrder} from './addOrder';


function winload(){

	var displayArea = document.getElementById("panelDisplay");
	var btn = document.getElementById("orderNow");
	var doc = document;

	//load up panels on start
	refreshPanels(displayArea);

	//on button click add to server

	//TO DO LIST: THis is where we're up to: Try to debug the input and Validate script there's an error in there.
	

	
}
window.onload = winload;


function refreshPanels(display){
	//refresh panels
	serverListSync().then((data)=>{
		var localServerList = JSON.stringify(data);
		var displayString = htmlDisplayDraw(localServerList)
		display.innerHTML=(displayString);
	})

}

window.onCaptcha = function(token){

	var doc = document;
	var displayArea = document.getElementById("panelDisplay");
	
	serverPOST('/captcha',(res)=>{

		var result = JSON.parse(res);
		console.log(result.success);
		if(result.success==true){
			var userInput = getInput(doc);
			if (validate(userInput,doc)){
				addOrder(userInput,()=>{
					refreshPanels(displayArea);
				})
			}
		}else{
			console.log('failcaptcha');
		}


	},token);

}
