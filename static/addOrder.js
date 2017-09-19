import {serverGET,serverPOST} from './xhttpFunctions.js'

export function addOrder(data,callback){
	//Makes a POST request when called pushing the data to the server.

	data = JSON.stringify(data);
	
	serverPOST ('/add',null,data);
	callback();


}