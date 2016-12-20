(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var myApp = angular.module('myToDoApp', []);

	myApp.controller('TodoController', ['$scope', function ($scope) {

		$scope.text = '';

		$scope.todos = [
			{id : 1, text: '学习', completed: false},
			{id : 2, text: '休息', completed: true},
			{id : 3, text: '游戏', completed: false}
		];


		//增加任务
		$scope.add = function () {
			if($scope.text != ''){
				$scope.todos.push({
					id : getId(),
					text : $scope.text,
					completed : false
				});

				console.log(11);

				$scope.text = '';
			}
		};

		function getId() {
			var id = Math.random();
			for (var i=0,len=$scope.todos.length; i<len; i++){
				if (id === $scope.todos[i].id){
					//可能需要递归
					id = getId();
				}
			}
			return id;
		}


		//删除
		 $scope.remove = function (id) {
			 for(var i=0; i<$scope.todos.length; i++){
				 if($scope.todos[i].id = id){
					 $scope.todos.splice(i, 1);
					 break;
				 }
			 }
		 };


    //controller结尾
	}]);






})(angular);



