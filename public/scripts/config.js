app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

	//$httpProvider.interceptors.push('myHttpInterceptor');

    $urlRouterProvider.when( '', "/home" );
    $urlRouterProvider.otherwise("notfound");
    $stateProvider
		
		.state('home', {
			url: "/home",
			title : "Home" ,
			views : {
				"main" : {
					templateUrl : "home",
				}
			}
		})

		.state('categoriesandproducts', {
			url: "/categoriesandproducts",
			title : "All Products and Categories" ,
			views : {
				"main" : {
					templateUrl : "categoriesAndProducts",
				}
			},
			resolve: {
			  loadPlugin: function ($ocLazyLoad) {
				return $ocLazyLoad.load([{
					name: 'checklist-model',
					insertBefore: '#lazyLoad',
					files: ['resources/3rdParty/checklist-model.js']
				}]);
			  }
			}
		})

		.state('register', {
			url: "/register",
			title : "Sign Up",
			views : {
				"main" : {
					templateUrl : "register",
					
				}
			}
		})
		.state('login', {
			url: "/login",
			title : "Login",
			views : {
				"main" : {
					templateUrl : "login",
					
				}
			}
		})
		.state('cart', {
			url: "/cart",
			title : "Cart",
			views : {
				"main" : {
					templateUrl : "cart",
					
				}
			}
		})
		.state('admin', {
			url: "/admin",
			redirectTo : "admin.home",
			views : {
				"main" : {
					templateUrl : "admin",
				}
			}
		})
		.state('admin.home', {
			url: "/home",
			title : "Admin Home",
			views : {
				'admin' : {
					templateUrl : "adminhome",
				}
			}
		})
		.state('admin.addcategory', {
			url: "/addcategory",
			title : "Add Category",
			views : {
				'admin' : {
					templateUrl : "addcategory",
				}
			}
		})
		.state('admin.products', {
			url: "/products",
			title : "Products",
			views : {
				'admin' : {
					templateUrl : "products",
				}
			}
		})
		.state('admin.addproduct', {
			url: "/addproduct",
			title : "Add Product",
			views : {
				'admin' : {
					templateUrl : "addproduct",
				}
			}
		})
		.state('admin.categories', {
			url: "/categories",
			title : "Categories",
			views : {
				'admin' : {
					templateUrl : "categories",
				}
			}
		})
		.state('admin.editproduct', {
			url: "/editproduct/:prod_id",
			title : "Edit Product",
			views : {
				'admin' : {
					templateUrl : "editProduct",
				}
			}
		})
		.state('admin.editcategory', {
			url: "/editcategory/:cat_id",
			title : "Edit Category",
			views : {
				'admin' : {
					templateUrl : "editcategory",
				}
			}
		})
		.state('notfound', {
			url: "/notfound",
			title : "Not found" ,
			views : {
				"main" : {
					templateUrl : "notfound.html"
				}
			}
		});
	
})

app.run(function($rootScope, $state, $transitions,dataFactory){

	$transitions.onStart( { }, function(transition) {
		dataFactory.is_user_logged().success(function(user){
			if(user.data.logged && (transition.$to().name == "login" || transition.$to().name == "register" )){
				$state.go("home"); //OR transition.abort();//prevents default behaviour
			}
			//checks if user is logged and admin only 
			if( ( ( user.data.logged && user.data.user_type == 2) || !user.data.logged )  &&transition.$to().name.includes("admin") ){
				$state.go("login");
			}
		});
	});

	$transitions.onSuccess( { }, function(transition) {
		$rootScope.title = $state.current.title;
	});

})