export serverListSync(){
	localList = serverGET('/list');
	return "Sync Successful";
}

export serverListMatchCheck(localList){

	var syncStatus;

	serverGET('/list',function(){

		if (JSON.parse(serverResponse)==localList){
			syncStatus = true;
		}else{
			syncStatus= false;
		}
	}

	return syncStatus;


}