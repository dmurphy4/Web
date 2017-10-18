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
    //.state('tasks', {
    //  url: '/tasks/{id}',
    //  templateUrl: '/tasks.html',
    //  controller: 'TasksCtrl'
    //});

  $urlRouterProvider.otherwise('home');
}])
.factory('taskFactory', [function(){
  var o = {
    tasks: []
  };
  return o;
}])

.controller('MainCtrl',['$scope','postFactory',
function($scope,taskFactory){
  $scope.tasks = [];

  $scope.addTask = function(){
    //if($scope.formContent === ''){return;}
    $scope.test = 'Hello world!';
    console.log($scope.test);
    $scope.tasks.push({
      job:$scope.toDoInput,
      breakdown:[],
      done:false
    });
    console.log($scope.tasks)
    $scope.toDoInput = 'Add New Task';
  };//add task

  $scope.removeTask = function(){
    var l = $scope.tasks;
    $scope.tasks = [];
    angular.forEach(x in l)
      if(!x.done) $scope.tasks.push(x);
  };//removeTask function

}])//end of controller
.controller('TasksCtrl', [
'$scope',
'$stateParams',
'postFactory',
function($scope, $stateParams, postFactory){
  $scope.post = postFactory.posts[$stateParams.id];

  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      upvotes: 0
    });
    $scope.body = '';
  };

  $scope.incrementUpvotes = function(comment){
    comment.upvotes += 1;
  };
}]);
