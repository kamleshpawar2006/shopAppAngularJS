app.controller("categoryController",function($scope,dataFactory,$stateParams){
	$scope.addCategory = function(form){
		if(form.$valid){
			dataFactory.addCategory($scope.category).success(function(response){
				if(response == 1){
					form.$submitted = false;
					$scope.category = undefined;
					$scope.message = "Category Added Successfully";
				}else{
					$scope.message = "Internal server error";
				}
			})
		}
	}
	$scope.getCategories = function(){
		$scope.categories = [];
		dataFactory.getCategories().success(function(response){
			if(response.code == 1){
				$scope.categories = response.data;
			}else{
				console.log(response);
			}
		})
	}
	
	$scope.getSingleCategory = function(){
		dataFactory.getSingleCategory($stateParams.cat_id).success(function(response){
			if(response.code == 1){
				$scope.category = response.data;
			}else{
				console.log(response);
			}
		})
	}
	
	$scope.updateCategory = function(){
		dataFactory.updateCategory($scope.category).success(function(response){
			if(response == 1){
				$scope.message = "Category updated successfully";
			}else{
				console.log(response);
			}
		})
	}
	
	$scope.deleteCategory = function(cat_id,index){
		dataFactory.deleteCategory(cat_id).success(function(response){
			if(response == 1){
				$scope.categories.splice(index,1);
			}else{
				console.log(response);
			}
		})
	}
})

app.controller("productController",function($scope,dataFactory,$stateParams){

	$scope.getCategories = function(){
		dataFactory.getCategories().success(function(response){
			if(response.code == 1){
				$scope.categories = response.data;
			}else{
				console.log(response);
			}
		})
	}

	$scope.addProduct = function(form){
		if(form.$valid){
			dataFactory.addProduct($scope.product).success(function(response){
				if(response == 1){
					form.$submitted = false;
					$scope.product = undefined;
					$scope.message = "Product Added Successfully";
				}else{
					$scope.message = "Internal server error";
				}
			})
		}
	}
	
	$scope.getProducts = function(){
		$scope.products = [];
		dataFactory.getProducts().success(function(response){
			if(response.code == 1){
				$scope.products = response.data;
			}else{
				console.log(response);
			}
		})
	}
	
	$scope.deleteProduct = function(prod_id,index){
		dataFactory.deleteProduct(prod_id).success(function(response){
			if(response == 1){
				$scope.products.splice(index,1);
			}else{
				console.log(response);
			}
		})
	}
	
	$scope.getSingleProduct = function(){
		dataFactory.getSingleProduct($stateParams.prod_id).success(function(response){
			if(response.code == 1){
				$scope.product = response.data;
				$scope.product.category = { category_id : response.data.category_id };
			}else{
				console.log(response);
			}
		})
	}
	
	$scope.updateProduct = function(form){
		$scope.product.category_id = $scope.product.category.category_id;
		if(form.$valid){
			dataFactory.updateProduct($scope.product).success(function(response){
				if(response == 1){
					form.$submitted = false;
					$scope.message = "Product Updated Successfully";
				}else{
					$scope.message = "Internal server error";
				}
			})
		}
	}
	
})