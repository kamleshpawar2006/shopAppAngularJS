app.filter('getCatProducts', function () {
  return function (items,myCat) {
	var filtered = [];
	angular.forEach(items, function (item) {
		if(myCat.indexOf(item.category_id) != -1){
			filtered.push(item);
		}
	});
    return filtered;
  };
});