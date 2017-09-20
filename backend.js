var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');

var con  = mysql.createConnection({
     host     : 'localhost',
     port     : '',
     user     : 'root',
     password : '',
	 database : 'mydbnew',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql");
});

//session handling
app.use(session({secret: 'ssshhhhh'}));
var sess;

app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/', function(req, res){
   res.sendFile(__dirname+"/index.html");
});

app.get('/header', function(req, res){
   res.sendFile(__dirname+"/header.html");
});

app.get('/footer', function(req, res){
   res.sendFile(__dirname+"/footer.html");
});

app.get('/categoriesAndProducts', function(req, res){
   res.sendFile(__dirname+"/categoriesAndProducts.html");
});

app.get('/home', function(req, res){
   res.sendFile(__dirname+"/home.html");
});

app.get('/login', function(req, res){
   res.sendFile(__dirname+"/login.html");
});

app.get('/register', function(req, res){
   res.sendFile(__dirname+"/register.html");
});

app.get('/cart', function(req, res){
   res.sendFile(__dirname+"/cart.html");
});

//admin pages
app.get('/admin', function(req, res){
   res.sendFile(__dirname+"/admin/dashboard.html");
});

app.get('/adminhome', function(req, res){
   res.sendFile(__dirname+"/admin/home.html");
});

app.get('/addcategory', function(req, res){
   res.sendFile(__dirname+"/admin/addnewcategory.html");
});

app.get('/addproduct', function(req, res){
   res.sendFile(__dirname+"/admin/addnewproduct.html");
});

app.get('/products', function(req, res){
   res.sendFile(__dirname+"/admin/products.html");
});

app.get('/categories', function(req, res){
   res.sendFile(__dirname+"/admin/categories.html");
});
app.get('/editProduct', function(req, res){
   res.sendFile(__dirname+"/admin/editProduct.html");
});
app.get('/editcategory', function(req, res){
   res.sendFile(__dirname+"/admin/editcategory.html");
});

app.get("/getAllCategoriesWithProductCount",function(req,res){
	
	var sql = "select c.*,COUNT(p.category_id) as p_count from categories as c left join products as p on c.category_id = p.category_id group by c.category_id";
	con.query(sql, function (err, result, fields) {
		var response = {};
		if (err){
			response.code = -1;
			console.log(err);
		}else if(result.length > 0){
			response.code = 1;
			response.data = result;
		}else{
			response.code = 0;
		}
		res.send(response);
	});
	
})

/*
app.post('/getProductsByCategory', function(req, res){
	var sql = "insert into categories (category_name,category_description) values('"+req.body.name+"','"+req.body.description+"')";
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
	});
});
*/

app.get('/getSingleProduct/:id', function(req, res){
	var sql = "select * from products where product_id = "+req.params.id;
	con.query(sql, function (err, result, fields) {
		var response = {} ;
		if (err){
			response.code = -1;
			console.log(err);
		}else if(result.length > 0){
			response.code = 1;
			response.data = result[0];
		}else{
			response.code = 0;
		}
		res.send(response);
	});
});

app.get('/getSingleCategory/:cat_id', function(req, res){
	var sql = "select * from categories where category_id = "+req.params.cat_id;
	con.query(sql, function (err, result, fields) {
		var response = {} ;
		if (err){
			response.code = -1;
			console.log(err);
		}else if(result.length > 0){
			response.code = 1;
			response.data = result[0];
		}else{
			response.code = 0;
		}
		res.send(response);
	});
});

app.post('/updateProduct', function(req, res){
	var sql = "update products  set product_name = '"+req.body.product_name+"',product_price='"+req.body.product_price+"',product_description ='"+req.body.product_description+"', category_id = '"+req.body.category_id+"' where product_id = "+req.body.product_id;
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
		
	});
});
app.post('/updateCategory', function(req, res){
	var sql = "update categories set category_name = '"+req.body.category_name+"',category_description ='"+req.body.category_description+"' where category_id = "+req.body.category_id;
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
		
	});
});
app.post('/newCategory', function(req, res){
	var sql = "insert into categories (category_name,category_description) values('"+req.body.name+"','"+req.body.description+"')";
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
	});
});

app.get('/getCategories', function(req, res){
	var sql = "select * from categories";
	con.query(sql, function (err, result, fields) {
		var response = {} ;
		if (err){
			response.code = -1;
			console.log(err);
		}else if(result.length > 0){
			response.code = 1;
			response.data = result;
		}else{
			response.code = 0;
		}
		res.send(response);
	});
});

app.post('/newProduct', function(req, res){
	var sql = "insert into products (product_name,product_description,category_id,product_price) values('"+req.body.name+"','"+req.body.description+"','"+req.body.category+"','"+req.body.price+"')";
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
	});
});

app.get('/getProducts', function(req, res){
	var sql = "select p.*,c.category_name from products as p left join categories as c on p.category_id = c.category_id";
	con.query(sql, function (err, result, fields) {
		var response = {} ;
		if (err){
			response.code = -1;
			console.log(err);
		}else if(result.length > 0){
			response.code = 1;
			response.data = result;
		}else{
			response.code = 0;
		}
		res.send(response);
	});
});

app.get('/deleteCategory/:cat_id', function(req, res){
	var sql = "delete from categories where category_id = "+req.params.cat_id;
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
		
	});
});

app.get('/deleteProduct/:product_id', function(req, res){
	var sql = "delete from products where product_id = "+req.params.product_id;
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
		
	});
});
//admin pages end


//front end
app.post('/registerUser', function(req, res){
	var sql = "insert into users (full_name,email,mobile_no,password) values('"+req.body.fullName+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.password+"')";
	con.query(sql, function (err, result, fields) {
		if (err){
			console.log(err);
			res.send("0");
		}else{
			res.send("1");
		};
	});
});

app.get('/authenticate/:email/:password', function(req, res){
	var sql = "select * from users where email = '"+req.params.email+"' and password = '"+req.params.password+"'";
	con.query(sql, function (err, result, fields) {
		var response = {} ;
		if (err){
			response.code = -1;
			console.log(err);
		}else if(result.length > 0){
			// session code
			sess = req.session;
			sess.user = result[0];
			// session code end
			response.code = 1;
			result[0].logged = true;
			response.data = result[0];
		}else{
			response.data = {};
			response.data.logged = false;
			response.code = 0;
		}
		res.send(response);
	});
});


app.get('/check_if_email_exists/:email', function(req, res){
	var response = {};
	var sql = "select * from users where email = '"+ req.params.email+"'";
	con.query(sql, function (err, result, fields) {
		if (err){
			response.data = -1;
			console.log(err);
		}else if(result.length > 0){
			response.data = 1;
		}else{
			response.data = 0;
		}
		res.send(response);
	});
	
});


app.get('/check_user_logged', function(req, res){
	var response = {} ;
	sess = req.session;
	//console.log(sess.user);

	if(sess.user){
		var sql = "select * from users where user_id = "+sess.user['user_id'];	
		//console.log(sql);
		con.query(sql, function (err, result, fields) {
			if (err){
				console.log("if error block");
				response.code = -1;
				//console.log(err);
			}else if(result.length > 0){
				//console.log("else if");
				response.code = 1;
				result[0].logged = true;
				response.data = result[0];
			}else{
				//console.log("else first");
				response.data = {};
				response.data.logged = false;
				response.code = 0;
			}
			res.send(response);
		});

	}else{
		//console.log("else end");
		response.data = {};
		response.data.logged = false;
		response.code = 0;
		res.send(response);
	}
	
});

app.get('/logout', function(req, res){
	var response = {};
	sess = req.session;
	req.session.destroy(function(err) {
	  if(err) {
		response.code = -1;
		res.send(response);
	  } else {
	    response.code = 1;
	    res.send(response);
	  }
	});
	
});

//frontend end

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
