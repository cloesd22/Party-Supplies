import {serverGET,serverPOST} from './xhttpFunctions.js'

export function serverListSync(){

	return new Promise(function(resolve,reject){

		var serverList;

		serverGET('/req',(data)=>{
			serverList = JSON.parse(data);
			resolve(serverList);

		});
	})


}




export function serverListMatchCheck(localList){
	var syncStatus=false;


	serverGET('/req',(data)=>{

		if (JSON.parse(data)==localList){

			syncStatus = true;

		}else{

			syncStatus= false;

		}
	})



	console.log('test');
	return syncStatus;


}