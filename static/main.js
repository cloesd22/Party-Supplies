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

		
}
window.onload = winload;

function refreshPanels(display){
	//refresh panels
	var doc = document;
	serverListSync().then((data)=>{
        console.log(data.orderList.length > 0);
	    if(data.orderList.length > 0){
		    doc.getElementById("emptyText").style.display = 'none';
		}else{
		    doc.getElementById("emptyText").innerText = 'No one has suggested an order yet!';
            doc.getElementById("emptyText").style.display = 'block';
		}

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
		if(result.success==true){
			var userInput = getInput(doc);
			if (validate(userInput,doc)){
				addOrder(userInput,()=>{
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
