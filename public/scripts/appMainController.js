app.controller("appMain",function($scope,$http,$state,dataFactory){
	$scope.loggedUser = {};
	$scope.setLoggedUser = function(data){
		$scope.loggedUser = data;
	}
	$scope.check_user_logged = function(){
		dataFactory.is_user_logged().success(function(response){
			if(response.code == 1 || response.code == 0){
				$scope.loggedUser = response.data;
			}else{
				alert("Internal server error.");
			}
		});
	}
	$scope.logout = function(){
		dataFactory.logout().success(function(response){
			if(response.code == 1){
				$scope.setLoggedUser({logged : false});
				$state.go("login");
			}else{
				alert("Internal server error.");
			}
		});
	}
})