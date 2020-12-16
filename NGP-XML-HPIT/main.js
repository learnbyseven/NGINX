const express = require('express');
var EasyXml = require('easyxml');
var serializer = new EasyXml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});
var products = {
   "p1" : {
      "name" : "jeans",
      "company" : "lewis",
      "size" : "34",
      "instock": 10
   },
   
   "p2" : {
      "name" : "tshirt",
      "company" : "uspolo",
      "size" : "42",
      "instock": 2
   },
   
   "p3" : {
      "name" : "shirt",
      "company" : "johnplayer",
      "size" : "40",
      "instock": 3
   }
};
const app = express();
app.use('/products', function(req, res, next) {
	 if (req.accepts('json') || req.accepts('text/html')) {
		 res.header('Content-Type', 'application/json');
		 res.send(products);
	} else if (req.accepts('application/xml')) {
		res.header('Content-Type', 'application/xml');
	  	var xml = serializer.render(products);
		res.send(xml);
	} else { 
		res.send(406);
	}
});
app.listen(3000);
