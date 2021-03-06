export function htmlDisplayDraw(displayJsonString){

	var htmlString="";
	var rawdata = JSON.parse(displayJsonString)
	rawdata = rawdata.orderList;

            for (var i=0;i<rawdata.length;i++)
            {	
                switch (rawdata[i].itemName) {
                //panel color selector
                    case 'Beers':
                         htmlString += " <div class='orderPanel panelBeers' style='margin: 25px; padding:5px;'>";
                         break;

                    case 'Chips':
                         htmlString += " <div class='orderPanel panelChips' style='margin: 25px; padding:5px;'>";
                         break;

                    case 'Balloons':
                         htmlString += " <div class='orderPanel panelBalloons' style='margin: 25px; padding:5px;'>";
                         break;
                }

                htmlString += "<div><p class='panelFont' style='padding-left: 15px;'> " +  rawdata[i].itemName + "</p></div>";
                htmlString += " <div class='panelFont rightText' style='padding-right: 15px;'><p>" + rawdata[i].quantity  + "  </p> </div>";
                htmlString += "<div><p class='panelFont' style='padding-left: 15px;'> Suggested By: <b>" + rawdata[i].orderedBy  + "</b></p></div>";
                htmlString += "</div>";

            }


            try{
            	document.getElementById("panelDisplay").innerHTML=(htmlString);
        	}catch(err){
    			console.log("Display #panelDisplay area not found in html page")
        	}
        

        return htmlString;
};