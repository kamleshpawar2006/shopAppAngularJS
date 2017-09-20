app.controller("register",function($scope,$http,$rootScope,dataFactory){
	
	$scope.validateSignup = function(register){
		if(register.$valid){
			dataFactory.signup( $scope.user ).success(function(response){
				if(response == 1){
					$scope.message = "Registration Successful.";
				}else{
					$scope.message = "Internal server error.";
				}
			});
		}
	}

})