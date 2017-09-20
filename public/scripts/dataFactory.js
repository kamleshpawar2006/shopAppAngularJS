app.factory('dataFactory',  function($http){
	var dataFactory = {};

	dataFactory.login = function(email,password){
		return $http.get("/authenticate/"+email+"/"+password);
	}

	dataFactory.signup = function(user){
		return $http({
			method  : 'POST', 
			url     : "/registerUser",
			data    : user,
		})
	}
	
	dataFactory.check_if_email_exists = function(email){
		return $http.get("/check_if_email_exists/"+email);
	}

	dataFactory.is_user_logged = function(email){
		return $http.get("/check_user_logged");
	}

	dataFactory.logout = function(){
		return $http.get("/logout");
	}
	
	dataFactory.addCategory = function(category){
		return $http({
			method  : 'POST', 
			url     : "/newCategory",
			data    : category,
		})
	}
	
	dataFactory.addProduct = function(product){
		return $http({
			method  : 'POST', 
			url     : "/newProduct",
			data    : product,
		})
	}	
	
	dataFactory.getCategories = function(){
		return $http.get("/getCategories");
	}
	
	dataFactory.getProducts = function(){
		return $http.get("/getProducts");
	}
	dataFactory.deleteCategory = function(cat_id){
		return $http.get("/deleteCategory/"+cat_id);
	}
	dataFactory.deleteProduct = function(prod_id){
		return $http.get("/deleteProduct/"+prod_id);
	}
	dataFactory.getSingleProduct = function(prod_id){
		return $http.get("/getSingleProduct/"+prod_id);
	}
	dataFactory.getSingleCategory = function(cat_id){
		return $http.get("/getSingleCategory/"+cat_id);
	}
	dataFactory.updateCategory = function(category){
		return $http({
			method  : 'POST', 
			url     : "/updateCategory",
			data    : category,
		})
	}
	dataFactory.updateProduct = function(product){
		return $http({
			method  : 'POST', 
			url     : "/updateProduct",
			data    : product,
		})
	}
	dataFactory.getAllCategoriesWithProductCount = function(cat_id){
		return $http.get("/getAllCategoriesWithProductCount");
	}
	
	return dataFactory;
})

/*
app.factory('myHttpInterceptor', function($q) {
  return {
    // optional method
    'request': function(config) {
      // do something on success

      return config;
    },

    // optional method
   'requestError': function(rejection) {
      // do something on error
      
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
      
      return $q.reject(rejection);
    }
  };
});
*/
