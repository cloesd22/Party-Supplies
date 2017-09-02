export function getInput(){

	var itemSelected = 'Beers';
    //Default radio button is set to Beers.
    if (document.getElementById('r2').checked) {
       itemSelected = 'Balloons';
    }else if (document.getElementById('r3').checked){
        itemSelected = 'Chips';
    }

    var itemAmount = document.getElementById("itemAmount").value;
    var itemOrderBy = document.getElementById("itemOrderBy").value;

    return {"itemSelected":itemSelected,"itemAmount":itemAmount,"itemOrderBy":itemOrderBy}
}

export function validate(inputObject){

   //Check for empty fields
   var itemAmount = inputObject.itemAmount;
   var itemOrderBy = inputObject.itemOrderBy;
   var validation = true;


        if ((itemOrderBy) == ""){
            document.getElementById("validationMsgAmount").value = "Please fill in this field.";
            validation = false;
        }

        if ((itemAmount) == ""){
          	document.getElementById("validationMsgWho").value = "Please fill in this field.";
    	 	validation = false;
        }

        //Check amount is a number between 1 and 10
        if (isNaN(itemAmount)||itemAmount>10||itemAmount<1){
            document.getElementById("validationMsgAmount").value = "Please ensure amount is a number between 1 and 10";
            validation = false;
        }

        //Check of itemOrderBy field is a name
        var regex = /^([A-Za-z0-9]{3,20})$/;
        if (regex.test(itemOrderBy)==false){
        	document.getElementById("validationMsgWho").value = "Please ensure 'Who' field only consists of 3 to 20 letters/numbers.";
            validation = false;
        }

        return validation;
}

