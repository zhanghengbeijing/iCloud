var reminder = angular.module('reminder',[]);
reminder.controller('ctrl', ['$scope', function($scope){
	$scope.color = ['purple','green','blue','yellow','brown','pink','orange'];
	//创建颜色数组
	$scope.lists = localStorage.data?JSON.parse(localStorage.data):[];//保存列表
	$scope.currentIndex = 0;//创建下标
	$scope.currentEvent = $scope.lists[0];//设定初始状态显示列表第一个
	$scope.event = function(index){//创建事件
		$scope.currentEvent = $scope.lists[index];//将当前点击的列表显示
		$scope.currentIndex = index;//将下表给了创建的下标
	}
	$scope.colorBorder = false;
	$scope.add = function(){
		//创建新数组来存放列表及内容
		var data = {
		name:'新列表 ' + ($scope.lists.length + 1),
			//获取已有列表的长度李艾获得下一个添加的名称是多少
		color:$scope.color[$scope.lists.length%7],//颜色按顺序排列
		items:[]//创建空的内容数组
		};
		//把创建的数组添加到列表中
		$scope.lists.push(data);
		//*保存到本地内存中
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.save = function(){
		localStorage.data = JSON.stringify($scope.lists);
		//localStorage.clear();
	}
	$scope.del = function(){
		var newlist = [];//创建新的数组
		for(var i = 0;i < $scope.lists.length;i++){//遍历所有的列表
			if(i != $scope.currentIndex){//当下标等于当前的列表时
				newlist.push($scope.lists[i]);//将当前的列表添加到新的数组中
			}
		}
		$scope.lists = newlist;
		$scope.currentIndex = 0;
		$scope.currentEvent = $scope.lists[0];
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.flag = false;
	$scope.sele = function(){
		$scope.flag = !$scope.flag;
	}
	$scope.willDo = function(){
		var eventList = $scope.lists[$scope.currentIndex];
		var data = {name:''/* + (eventList.items.length+1)*/,isDone:false,hs:false};
		eventList.items.push(data);
		$scope.lists[$scope.currentIndex] = eventList;
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.delEvent = function(index){
		var eventList = $scope.lists[$scope.currentIndex];
		var newlist = [];
		for(var i = 0;i < eventList.items.length;i++){
			if(i != index){
				newlist.push(eventList.items[i]);
			}
		}
		eventList.items = newlist;
		$scope.lists[$scope.currentIndex] = eventList;
		localStorage.data = JSON.stringify($scope.lists);
	}
	$scope.hideShow = function(index){
		var eventList = $scope.lists[$scope.currentIndex];
		for(var i = 0;i < eventList.items.length;i++){
			if(i == index){
				eventList.items[i].hs = true;
			}else{
				eventList.items[i].hs = false;
			}
		}
		$scope.lists[$scope.currentIndex] = eventList;
	}
}])
//$scope  上的两个方法
    //$watch  监视视图更新

	//$apply  通知视图更新

//自适应
window.onresize = function(){
	var list = document.querySelector('.list');
	var reminder = document.querySelector('.reminder');
	var wid = list.offsetWidth;
	reminder.style.left = wid + 'px';
}
window.onresize();