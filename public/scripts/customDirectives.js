app.directive("ngUnique", function($http,$timeout,$q,dataFactory) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
       
      element.bind('blur keyup', function (e) {
        var keyProperty = scope.$eval(attrs.ngUnique);
		if (!ngModel || !element.val() || (keyProperty.data == undefined) ) return;
		
		var valid = true;
		
		dataFactory.check_if_email_exists( element.val() ).success(function(response){
			if(response.data == 1)
				valid = false;//false -> exists
			else if(response.data == 0)
				valid = true;
			else
				alert("Internal server error");

			ngModel.$setValidity( 'unique', valid );
			//scope.$broadcast('show-errors-check-validity');
		})
      })
    }
  }
})

app.directive("cartDirective",function($window){
	return {
		restrict : "E",
		scope : {
			cartitems : "="
		},
		controller : function($scope){
			$scope.removeItemFromCart = function(index){
				$scope.cartitems.splice(index,1);
				localStorage.setItem("ci",JSON.stringify($scope.cartitems));
			}
			$scope.getTotal = function(){
				var total = 0;
				angular.forEach($scope.cartitems,function(item){
					total = total + (item.product_price + item.quantity)
				})
				return total;
			}
		},
		link: function(scope, element, attrs) {
            scope.$watch('cartitems', function(newValue, oldValue) {
				if(scope.cartitems != undefined){
					if(scope.cartitems.length > 0){
						localStorage.setItem("ci",JSON.stringify(scope.cartitems));
					}else{
						var existing_data = JSON.parse(localStorage.getItem("ci"));
						if(existing_data != null){
							if(existing_data.length > 0 || existing_data != undefined){
								scope.cartitems = existing_data;
							}
						}
					}
				}else{
					var existing_data = JSON.parse(localStorage.getItem("ci"));
					if(existing_data.length > 0 || existing_data != undefined){
						scope.cartitems = existing_data;
					}
				}
            }, true);
        },
		template : `
		<div><h3>Cart</h3></div>
		<form ng-show="cartitems.length > 0">

			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th colspan="2">Product</th>
							<th width="20px">Quantity</th>
							<th>Unit price</th>
							<th colspan="2">Total</th>
						</tr>
					</thead>
					<tbody >
						<tr ng-repeat="cartProduct in cartitems">
							<td>
								<a href="javascript:void(0);">
									<img width="50" src="http://www.gujaratheritagetourism.com/wp-content/uploads/2017/04/dummy-img.jpg" alt="White Blouse Armani">
								</a>
							</td>
							<td><a href="javascript:void(0);">{{cartProduct.product_name}}</a>
							</td>
							<td width="20px">
								<input type="number" dynamic-name="'name_'+$index" ng-model="cartProduct.quantity" class="form-control">
							</td>
							<td>{{cartProduct.product_price | currency}}</td>
							<td>{{cartProduct.product_price *  cartProduct.quantity | currency}}</td>
							<td><a href="javascript:void(0)" ng-click="removeItemFromCart($index)"><i class="fa fa-trash-o"></i></a>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th colspan="4">Total</th>
							<th colspan="2">{{getTotal() | currency }}</th>
						</tr>
					</tfoot>
				</table>

			</div>
			
		</form>
		
		<div ng-hide="!cartitems.length == 0">Cart is empty.</div>
		`,

	}
})

app.directive("dynamicName",function($compile){
    return {
        restrict:"A",
        terminal:true,
        priority:1000,
        link:function(scope,element,attrs){
            element.attr('name', scope.$eval(attrs.dynamicName));
            element.removeAttr("dynamic-name");
            $compile(element)(scope);
        }
    }
});