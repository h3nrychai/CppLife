var app = angular.module('cpplife', ['ui.router']);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
    /*
    posts.posts = [{title: 'Funny Photo LoL', img: './img/banner.jpg', upvotes: 5, comments: [{author:'George', body: 'I work!', upvotes:2}]}, {title: 'post 2', upvotes: 5}];
    */
    posts.posts = [
        {title: 'Hot Dog Caper was Intense this week!', img: './img/hotdogcaper.jpg', upvotes: 10, comments: [{author:'George', body: 'The lines were ridiculous!!', upvotes:2}, {author:'Tim', body: 'Lines were too long. Screw it LoL!!', upvotes:2}]},
        {title: 'Jinza is delicious!', link: 'http://www.yelp.com/biz/jinza-teriyaki-pomona', img: './img/jinza.jpg', upvotes: 9, comments: [{author:'Alec', body: 'Delicious chicken bowl! Was definitely worth the price!', upvotes:2}]},                
        {title: 'Here is a link for all your CPP Event Needs!', link: 'http://polycentric.cpp.edu/', upvotes: 9, comments: [{author:'George', body: 'Thanks for the resource!', upvotes:2}]},
        {title: 'Here is more information about the CPP Matt Run!', link: 'http://polycentric.cpp.edu/2013/10/matts_run_builds_community_2013/#.VjWqCq6rSAw', upvotes: 8, comments: [{author:'George', body: 'Thanks for the resource!', upvotes:2}]},
        {title: 'Career fair was packed!', img: './img/careerfair.jpg', upvotes: 5, comments: [{author:'Jason', body: 'Career fair was completely packed!!', upvotes:2}, {author:'Tim', body: 'Definitely Agree with you there!!', upvotes:2}]}
        ];
        
    $scope.posts = posts.posts;
    $scope.addPost = function(){
        if(!$scope.title || $scope.title === ''){
            return;
       } 
        //$scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0});
        $scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0, comments: [
            {author: 'Admin', body: 'Please be considerate of others when commenting', upvotes: 0}
            ]
        });
        $scope.title= '';
        $scope.link= '';
    }

    $scope.incrementUpvotes = function(post){
        post.upvotes +=1;
    }    
}]);

app.factory('posts', [function(){
    var o = {
        posts: []
    };
    return o;
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {
        url: '/home', templateUrl: '/home.html', controller: 'MainCtrl'
        });

    $urlRouterProvider.otherwise('home');

    $stateProvider.state('posts', {
        url: '/posts/{id}', templateUrl: '/posts.html', controller: 'PostsCtrl'
        });
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
        if($scope.body === '' || $scope.author === ''){
            return;
        }
        $scope.post.comments.push({
            body: $scope.body, author: $scope.author, upvotes: 0
        });
        $scope.body = '';
        $scope.author = '';
    };
}]);
