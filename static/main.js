import {serverGet,serverPost} from './xhttpFunctions.js';
import {serverListSync} from './listSyncMethods.js'

function winload(){
	
    var displayArea = document.getElementById("panelDisplay");
    var btn = document.getElementById("orderNow");

    var serverStateCode='0';
    var localStateCode='0';

	//load up panels on start
	serverListSync();


	//on button click add to server

}