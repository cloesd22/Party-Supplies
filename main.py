from flask import Flask,render_template, request
import jsonpickle
import json
import requests

app = Flask(__name__)

stateCode=0;
orderList = []
#List of all orders.

@app.route('/')
def index():
    return render_template("index.html")

#creates an "Order" object
def createOrder(itemCode,orderedBy,quantity):
    ItemOrder = Order(itemCode,orderedBy,quantity)
    return ItemOrder

#class presenting order
class Order(object):
    itemName = 0
    orderedBy = ''
    quantity = 0

    def __init__(self,itemName,orderedBy,quantity):
        self.itemName = itemName
        self.orderedBy = orderedBy
        self.quantity = quantity


@app.route('/add', methods=['POST'])
def addOrder():
    print(request.data);
    newOrderItem = jsonpickle.decode(request.data);
    orderList.append(createOrder(newOrderItem['itemSelected'], newOrderItem['itemOrderBy'], newOrderItem['itemAmount']));
    global stateCode
    stateCode += 1;
    print(stateCode);
    return 'Added';
#On POST /add, add recieved order to list.

#Starting Orders
orderList.append(createOrder('Beers','Mike',3));
orderList.append(createOrder('Balloons','Julia',9));
orderList.append(createOrder('Chips','Jessica',6));
orderList.append(createOrder('Beers','Julia',1));


@app.route('/state', methods=['GET'])
def get_State():
    print("sending code: "+ str(stateCode));
    return str(stateCode);

@app.route('/req', methods=['GET'])
def get_tasks():
    print(stateCode);
    sendPackage = {'stateCode':stateCode,'orderList':orderList};
    return jsonpickle.encode(sendPackage,unpicklable=False);

@app.route('/captcha', methods=['POST'])
def captchaGO():
   responsedata = request.data;
   urlbuilding = {'secret':'6LeEjjEUAAAAANr9gpnbqrSJcv1udHd0M2caH_Ni','response':responsedata};
   r = requests.post('https://www.google.com/recaptcha/api/siteverify',data=urlbuilding);
   return jsonpickle.encode(r.json(),unpicklable=False);

#On GET request send list

if __name__== "__main__":
    app.run(debug=True)
