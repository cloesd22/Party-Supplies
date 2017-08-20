function winload(){
//Runs on window open declaring display area, and setting button press functionality.

    var displayArea = document.getElementById("panelDisplay");
    var btn = document.getElementById("orderNow");

    var serverStateCode='0';
    var localStateCode='0';
    //Global serverStateCode holds a string which represents the current state of the list on the serverside.
    //Global localStateCode holds a string , which represents the client's list state.

    reloadDisplay();

    btn.addEventListener("click", function(){
        AddOrder();
    });


    function AddOrder(){
    //Gets values from form elements, validates and sends using POST request.
        var itemSelected = 'Beers';
        //Default radio button is set to Beers.
        if (document.getElementById('r2').checked) {
           itemSelected = 'Balloons';
        }else if (document.getElementById('r3').checked){
            itemSelected = 'Chips';
        }

        var itemAmount = document.getElementById("itemAmount").value;
        var itemOrderBy = document.getElementById("itemOrderBy").value;



        //Check for empty fields
        if ((itemAmount || itemOrderBy) == ""){
            alert("Please fill in all fields.");
            return false;
        }

        //Check amount is a number between 1 and 10
        if (isNaN(itemAmount)||itemAmount>10||itemAmount<1){
            alert("Please ensure amount is a number between 1 and 10")
            return false;
        }

        //Check of itemOrderBy field is a name
        var regex = /^([A-Za-z0-9]{3,20})$/;
        if (regex.test(itemOrderBy)==false){
            alert("Please ensure 'Who' field only consists of 3 to 20 letters/numbers.")
            return false;
        }

        //check if server list has changed since page load.
        updateServerStateCode(function(){
        if (!(serverStateCode == localStateCode)){
            alert("Order List on server has been updated, Please re-submit your order, Refreshing list...")
            return false;
        }

        var orderItem = JSON.stringify({'itemSelected':itemSelected,
                                         'itemAmount':itemAmount,
                                         'itemOrderBy':itemOrderBy
                                      });
        var objRequest = new XMLHttpRequest();

        objRequest.onreadystatechange = function(){
                if (objRequest.readyState == 4 & objRequest.status==200){
                    console.log("Data Sent");
                    localStateCode = parseInt(localStateCode)+1;

                }
            };

            objRequest.open('POST','/add',true);
            objRequest.setRequestHeader("Content-Type","application/json");
            objRequest.send(orderItem);

            //reset form field values.
            document.getElementById("itemAmount").value = '';
            document.getElementById("itemOrderBy").value = '';
        });
    }

    function updateServerStateCode(callback){
    //Updates the global statecode variable with the servers current state.

        var objRequest = new XMLHttpRequest();

        objRequest.onreadystatechange = function(){
            if (objRequest.readyState == 4 & objRequest.status==200){
                objRequest.onload=function(){
                serverStateCode = objRequest.responseText;
                if (callback) callback();
                reloadDisplay();
                };
            };
        }

        objRequest.open('GET', '/state',true);
        objRequest.send();

    }

    function reloadDisplay(){
    //uses GET request to refresh panel data and displays.
    //also sets global variables serverStateCode and localStatecode to the latest server values.

        var objRequest = new XMLHttpRequest();

         objRequest.onreadystatechange = function(){
            if (objRequest.readyState == 4 & objRequest.status==200){
                 objRequest.onload=function(){
                    var ourData = JSON.parse(objRequest.responseText);
                    serverStateCode = ourData.stateCode;
                    localStateCode = serverStateCode;
                    renderPanels(ourData.orderList);
                };
            };
        }

         objRequest.open('GET', '/req',true);
         objRequest.send();


        function renderPanels(data){
        //Draws order panels based on input data from GET request

            var htmlString="";
            for (i=0;i<data.length;i++)
            {
                switch (data[i].itemName) {
                //panel color selector
                    case 'Beers':
                         htmlString += " <div class='orderPanel panelGreen' style='margin: 25px; padding:5px;'>";
                         break;

                    case 'Chips':
                         htmlString += " <div class='orderPanel panelYellow' style='margin: 25px; padding:5px;'>";
                         break;

                    case 'Balloons':
                         htmlString += " <div class='orderPanel panelOrange' style='margin: 25px; padding:5px;'>";
                         break;
                }

                htmlString += "<div><p class='panelFont' style='padding-left: 15px;'> " +  data[i].itemName + "</p></div>";
                htmlString += " <div class='panelFont rightText' style='padding-right: 15px;'><p>" + data[i].quantity  + "  </p> </div>";
                htmlString += "<div><p class='panelFont' style='padding-left: 15px;'> Ordered By: <b>" + data[i].orderedBy  + "</b></p></div>";
                htmlString += "</div>";
            }
            displayArea.innerHTML=(htmlString);
        };


    }

};

window.onload = winload;


