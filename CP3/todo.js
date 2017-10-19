angular.module('todo',['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('tasks', {
      url: '/tasks/{id}',
      templateUrl: '/tasks.html',
      controller: 'TasksCtrl'
    });

  $urlRouterProvider.otherwise('home');
}])
.factory('taskFactory', [function(){
  var o = {
    tasks: []
  };
  return o;
}])
.controller('MainCtrl',[
'$scope',
'taskFactory',
function($scope, taskFactory){
  $scope.tasks = taskFactory.tasks;

  $scope.addTask = function(){
    //if($scope.formContent === ''){return;}
//    $scope.tasks = taskFactory.tasks;
    if($scope.toDoInput === '') { return; }
    $scope.tasks.push({
      job:$scope.toDoInput,
      breakdown:[],
      done:false
    });
    $scope.toDoInput = '';
  };//add task
  $scope.removeTask = function(){
    var l = $scope.tasks;
    $scope.tasks = [];

    angular.forEach(l,function(data){
      if (!data.done)
      {
       $scope.tasks.push(data);
      }
  });

      //if(!x.done) $scope.tasks.push(x);
  };//removeTask function

}])//end of controller
.controller('TasksCtrl', [
'$scope',
'$stateParams',
'taskFactory',
function($scope, $stateParams, taskFactory){
  $scope.tasks = taskFactory.tasks[$stateParams.id];

  $scope.addSubJob = function(){
    //if($scope.body === '') { return; }
    if($scope.body === '') { return; }
    $scope.task.subjob.push({
      body: $scope.body,
    });
    $scope.body = '';
  };
}]);
