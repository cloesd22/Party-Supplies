import json
from flask import Flask, render_template, request
import jsonpickle
import requests
from firebase import firebase;
import sys;



app = Flask(__name__)

stateCode = 0
orderList = []
firebase = firebase.FirebaseApplication('https://psaas-e0396.firebaseio.com/', None)
# List of all orders.


@app.route('/')
def index():
    return render_template("index.html")

# creates an "Order" object


def createOrder(itemCode, orderedBy, quantity):
    ItemOrder = Order(itemCode, orderedBy, quantity)
    return ItemOrder

# class presenting order


class Order(object):
    itemName = 0
    orderedBy = ''
    quantity = 0

    def __init__(self, itemName, orderedBy, quantity):
        self.itemName = itemName
        self.orderedBy = orderedBy
        self.quantity = quantity

    def exportJson(self):
        # exports JSON object representing object.
        return ({'itemName': self.itemName, 'orderedBy': self.orderedBy, 'quantity': self.quantity});


@app.route('/add', methods=['POST'])
def addOrder():
    print(request.data)
    loadItemsfromDatabase();
    newOrderItem = jsonpickle.decode(request.data)
    addsingletodatabase((createOrder(
        newOrderItem['itemSelected'], newOrderItem['itemOrderBy'], newOrderItem['itemAmount'])));
    orderList.append(createOrder(
        newOrderItem['itemSelected'], newOrderItem['itemOrderBy'], newOrderItem['itemAmount']))
    return 'Added'
# On POST /add, add recieved order to list.


# Starting Orders, Default list

@app.route('/state', methods=['GET'])
def get_State():
    print("sending code: " + str(stateCode));
    return str(stateCode)


@app.route('/req', methods=['GET'])
def get_tasks():
    refreshOrderList();
    sendPackage = {'stateCode': stateCode, 'orderList': orderList};
    return jsonpickle.encode(sendPackage, unpicklable=False)


@app.route('/captcha', methods=['POST'])
def captchaGO():
    responsedata = request.data
    urlbuilding = {
        'secret': '6LeEjjEUAAAAANr9gpnbqrSJcv1udHd0M2caH_Ni', 'response': responsedata};
    r = requests.post(
        'https://www.google.com/recaptcha/api/siteverify', data=urlbuilding);
    return jsonpickle.encode(r.json(), unpicklable=False)


def addItemstoDatabase(itemstoAdd):
    #takes in list of order objects, and pushes to noSQL database.
    for x in itemstoAdd:
        result = firebase.post('/orders', x.exportJson())
    return "success loop";

def addsingletodatabase(orderToAdd):
    try:
        # adds a single order to the database.
        name = orderToAdd.itemName;
        orderby = orderToAdd.orderedBy;
        ordertoadd =  orderToAdd.quantity;
        packetToadd = {'itemName':name,'orderedBy':orderby,'quantity':ordertoadd}
        result = firebase.post('/orders', packetToadd);
    except Exception as e:
        print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)

def ordertoJson(order):
    #convert order into JSON object
    name = order.itemName;
    orderby = order.orderedBy;
    ordertoadd = order.quantity;
    packetToadd = {'itemName': name, 'orderedBy': orderby, 'quantity': ordertoadd}
    return packetToadd;


def loadItemsfromDatabase():
    #get items from database, return array of order objects.
    print("Loading list of ordered items from database");
    newListArray = [];
    result = firebase.get('/orders', None);
    #import pdb;
    #pdb.set_trace()
    if result is not None:
        for v in result:
            newListArray.append(createOrder(result[v]['itemName'], result[v]['orderedBy'] ,result[v]['quantity']));

    return newListArray;

def refreshOrderList():
    #refreshes server orderlist with database orderlist.
    global orderList;
    orderList = loadItemsfromDatabase();



if __name__ == "__main__":
    app.run(debug=True)
