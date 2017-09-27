import {serverListSync,serverListMatchCheck} from './listSyncMethods.js'
import {serverGET,serverPOST} from './xhttpFunctions.js'
import {htmlDisplayDraw} from './htmlDisplayDraw';
import {getInput,validate} from './inputAndValidate';
import {addOrder} from './addOrder';


function winload(){

	var displayArea = document.getElementById("panelDisplay");
	var btn = document.getElementById("orderNow");
	var doc = document;
	document.getElementById('orderNow').disabled=true;
	addfieldListeners();
	//load up panels on start
	refreshPanels(displayArea);

	document.getElementById("orderNow").addEventListener("click",()=>{
		window.onCaptcha();
	})

		
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

/* window.onCaptcha = function(token){
	//captcha misbehaving removed for now.
	var doc = document;
	var displayArea = document.getElementById("panelDisplay");
	
	window.scrollTo(0, 0);

	serverPOST('/captcha',(res)=>{

		var result = JSON.parse(res);
		if(result.success==true){
			var userInput = getInput(doc);
			if (validate(userInput,doc)){
				addOrder(userInput,()=>{
					refreshPanels(displayArea);
					clearInputs();
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

} */

window.onCaptcha = function(){
	//stand in temporary function
	var doc = document;
	var displayArea = document.getElementById("panelDisplay");
	var userInput = getInput(doc);
	if (validate(userInput,doc)){
			addOrder(userInput,()=>{
				refreshPanels(displayArea);
				clearInputs();
		window.scrollTo(0, 0);
		})
	}else{
		alert("Please limit names to letters and spaces. No symbols.");
	}
}

function addfieldListeners(){
	// Listens to input fields and disables button if they are empty
	// Server side validaiton throws an error if empty values are submited.
	document.getElementById('itemAmount').addEventListener("keypress",()=>{
		if((document.getElementById('itemAmount').value.length!=0)&&(document.getElementById('itemOrderBy').value.length!=0)){
			document.getElementById('orderNow').disabled=false;

		}else{
			document.getElementById('orderNow').disabled=true;
		}

		if(!(checknumericInput(document.getElementById('itemAmount').value))){
			document.getElementById('orderNow').disabled=false;
		}else{
			document.getElementById('orderNow').disabled=true;
		}
	})
	document.getElementById('itemOrderBy').addEventListener("keypress",()=>{
		if((document.getElementById('itemAmount').value.length!=0)&&(document.getElementById('itemOrderBy').value.length!=0)){
			document.getElementById('orderNow').disabled=false;

		}else{
			document.getElementById('orderNow').disabled=true;
		}
	})

	document.getElementById('itemAmount').addEventListener("blur",()=>{
		if((document.getElementById('itemAmount').value.length!=0)&&(document.getElementById('itemOrderBy').value.length!=0)){
			document.getElementById('orderNow').disabled=false;

		}else{
			document.getElementById('orderNow').disabled=true;
		}
		
		if(!(checknumericInput(document.getElementById('itemAmount').value))){
			document.getElementById('orderNow').disabled=false;
		}else{
			document.getElementById('orderNow').disabled=true;
		}
	})
	document.getElementById('itemOrderBy').addEventListener("blur",()=>{
		if((document.getElementById('itemAmount').value.length!=0)&&(document.getElementById('itemOrderBy').value.length!=0)){
			document.getElementById('orderNow').disabled=false;

		}else{
			document.getElementById('orderNow').disabled=true;
		}
	})
}

function clearInputs(){
	document.getElementById('itemAmount').value="";
	document.getElementById('itemOrderBy').value="";
}

function checknumericInput(value){
	if(value>10||value<1){
		return false;
	}else{
		return true;
	}
}