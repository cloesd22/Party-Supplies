import {serverListSync,serverListMatchCheck} from './listSyncMethods.js'
import {serverGET,serverPOST} from './xhttpFunctions.js'
import {htmlDisplayDraw} from './htmlDisplayDraw';
import {getInput,validate} from '/inputAndValidate.js';


function winload(){

    var displayArea = document.getElementById("panelDisplay");
    var btn = document.getElementById("orderNow");

    var serverStateCode='0';
    var localStateCode='0';
    var localServerList;

	//load up panels on start
	serverListSync().then((data)=>{

		localServerList = JSON.stringify(data);

		var displayString = htmlDisplayDraw(localServerList)

		displayArea.innerHTML=(displayString);

	})


	//on button click add to server

	//TO DO LIST: THis is where we're up to: Try to debug the input and Validate script there's an error in there.
	
	btn.addEventListener("click", function(){
		var userInput = getInput();
		if (validate(userInput)){
			console.log('beeoootiful');

		}


	});


}
window.onload = winload;