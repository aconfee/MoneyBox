(function(){
	Array.prototype.remove = function(index){
		this.splice(index, 1);
	};
})();

function ListController($scope){
	var self = this;
	$scope.createMode = false;
	$scope.total = 0;

	$scope.newItem = {title: 'Title', price: 0};

	//var id = id; //#incomes or #expenses
	$scope.listItems = [
		{title: 'PaperG', price: 1500},
		{title: 'GangsterG', price: 1500},
		{title: 'OriginalG', price: 1500}
	];

	$scope.toggleCreateMode = function(){
		$scope.createMode = !$scope.createMode;

		// Reset if just entering create mode
		if($scope.createMode){
			$scope.newItem = {title: '', price: 0};
		}
	};

	$scope.saveListItem = function(){
		$scope.listItems.push($scope.newItem);
		$scope.newItem = {title: 'Title', price: 0};
	};

	$scope.deleteItem = function(index){
		$scope.listItems.remove(index);
	};

	$scope.calculateTotal = function(){
		$scope.total = 0;
		for(var i = 0; i < $scope.listItems.length; ++i){
			var value = parseFloat($scope.listItems[i].price);
			if(isNaN(value) || typeof value === 'undefined'){
				value = 0;
			}

			$scope.total += value;
		}
	};

	$scope.$watch('listItems', $scope.calculateTotal, true);
}

