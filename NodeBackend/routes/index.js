
/*
 * GET home page.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Restbucks";

exports.index = function(req, res){
    res.render('index', { title:'HI'});
};

exports.getOrders = function(req,res) {
    res.render('orders',{ title:'ALL ORDERS'});
}

exports.getAllOrders=function(req,res) {
    var json_res={};



    mongo.connect(mongoURL, function(){

        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('order');



        coll.find({"location":"Palo Alto"}).toArray( function(err, user){

            if (user) {

                // This way subsequent requests will know the user is logged in.

                /*req.session.username = user.username;*/
                console.log(user.length +" is the session");

                json_res = {"statusCode" : 200,"orders":user};



            } else {

                console.log("returned false login");

                json_res = {"statusCode" : 401};

            }

            res.send(json_res);

        });



    });

}