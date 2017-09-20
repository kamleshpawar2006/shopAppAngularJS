app.controller("productsController",function($scope,dataFactory,$rootScope){

	dataFactory.getAllCategoriesWithProductCount().success(function(response){
		$scope.products = [];
		if(response.code = 1){
			$scope.ids = [];
			$scope.catWithProdCount = response.data;
			angular.forEach(response.data,function(prod){
				$scope.ids.push(prod.category_id);
			})
		}else if(response.code = 0){
			$scope.catWithProdCount = [];
		}else{
			console.log(response);
		}
	})
	
	dataFactory.getProducts().success(function(response){
		if(response.code = 1){
			$scope.products = response.data;
		}else if(response.code = 0){
			
		}else{
			console.log(response);
		}
	})

	
	$scope.cart = [];
	$scope.addToCart = function(product){
		var add = true;
		if($scope.cart.length >0){
			angular.forEach($scope.cart,function(cp,index){
				if(cp.product_id == product.product_id){
					add = false;
					cp.quantity++;	
				}
			})
		}
		if(add){
			product.quantity = 1;
			$scope.cart.push(product);
		}
	}
	

})