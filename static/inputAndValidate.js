export function getInput(doc){

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

export function validate(inputObject,doc){

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
        var regex = /^([A-Za-z0-9_ -]{3,20})$/;
        if (regex.test(itemOrderBy)==false){
        	doc.getElementById("validationMsgWho").value = "Please ensure 'Who' field only consists of 3 to 20 letters/numbers.";
            validation = false;
        }

        return validation;
}

