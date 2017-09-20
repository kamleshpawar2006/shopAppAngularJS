# shopAppAngularJS

After downloading the repo:
1. Make sure your system have node js and mysql installed in it.
2. Change following block of code in backend.js
```
var con  = mysql.createConnection({
     host     : 'localhost',
     port     : '',
     user     : 'root',
     password : '',
	 database : 'mydbnew',
});
```
with the details configured in your system i.e. hostname,port,user,password and database.

3. import "mydbnew.sql" file in your database.

4. Change following if your system has already using port 3000
```
app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
```
replace 3000 with any other available port.

5. open any browser and hit http://localhost:3000


>important: users table has user_type field wherein values 1 and 2 corresponds to admin and website visitor respectively.