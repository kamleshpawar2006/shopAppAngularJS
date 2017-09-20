app.controller("login",function($scope,$http,$rootScope,$state,$timeout,dataFactory){
	
	$scope.validateLogin = function(login){
		if(login.$valid){
			dataFactory.login( $scope.user.email, $scope.user.password ).success(function(response){
			//$http.get("/authenticate/"+$scope.user.email+"/"+$scope.user.password ).then(function(response){
				console.log(response);
				if(response.code == 1){
					$scope.message = "Login successful.";
					$scope.$parent.setLoggedUser(response.data);
					
					$timeout(function(){
						if(response.data.user_type == 2 ){
							$state.go("home");
						}else{
							$state.go("admin");
						}
					},2500);
					
				}else if(response.code == 0){
					$scope.message = "Invalid login.";
				}else{
					$scope.message = "Internal server error.";
				}
			});

		}
	}

})