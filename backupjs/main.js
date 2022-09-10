var app = angular.module('blog',['ngRoute','ngAnimate','ngSanitize','ngTouch']);

app.run(function($rootScope){


	$rootScope.db = firebase.firestore();
	$rootScope.showMainContent = true;
	$rootScope.currentPage = 0;
	$rootScope.pageSize = 20;
	$rootScope.pagesList = [];
	$rootScope.pageContent = [];
	$rootScope.urlPair = [];
	$rootScope.Math = window.Math;
	try{
		$rootScope.nightMode = localStorage.nightMode.toString().length == 4  ?localStorage.nightMode: false ;
	}catch(e){
		$rootScope.nightMode = false;
		localStorage.nightMode = false;
	}
	$rootScope.likedPostsList = localStorage.getItem( btoa('likedPostsList') ) ? atob( localStorage.getItem( btoa('likedPostsList') ) ).split(',') : [];


	$rootScope.globalTitleNeutralHeight = 0;
	$rootScope.globalShortnoteNeutralHeight = 0;


	$rootScope.toggleNightMode = function(){

		$rootScope.nightMode = !$rootScope.nightMode;
		localStorage.nightMode = $rootScope.nightMode;

	};

});

app.filter('startFrom', function() {
	return function(input, start) {
		start = +start; //parse to int
		return input.slice(start);
	}
});
// app.filter('roundOff', function() {
//     return function(n) {
//         return Math.ceil(n);
//     }
// });


app.filter('trimStringLength',function(){
	return function(e){
		try{
			if(e.length > 25){
				return e.substring(0,23) + '...';
			}else{

				return e;
			}

		}catch(e){
			//fallback
			return e;
		}

	}
});

app.filter('unsafe',function($sce){
	return function(e){
		try{
			return $sce.trustAsHtml(e);
		}catch(err){

		}
	}
});

app.directive('makeTitleHeightsEqual', function($timeout,$rootScope) {
	return function (scope, el, attrs) {
		$timeout(function(){
			var currentHeight = el[0].offsetHeight;
			if($rootScope.globalTitleNeutralHeight < currentHeight){
				$rootScope.globalTitleNeutralHeight = currentHeight;

			}


		}, false);
	}
});

app.directive('makeShortNoteHeightsEqual', function($timeout,$rootScope) {
	return function (scope, el, attrs) {
		$timeout(function(){
		// console.log(el[0].offsetHeight);
		var currentHeight = el[0].offsetHeight;
		if($rootScope.globalShortnoteNeutralHeight < currentHeight){
			$rootScope.globalShortnoteNeutralHeight = currentHeight;
		}

	}, false);
	}
});

app.directive('fadeIn', function($timeout){
	return {
		restrict: 'A',
		link: function($scope, $element, attrs){
			$element.addClass("ng-hide-remove");
			$element.on('load', function() {
				$element.addClass("ng-hide-add");
			});
		}
	};
});


app.filter('highlight', function($sce) {
	return function(text, phrase) {
		if (phrase) {
			
			try{
				text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="w3-yellow">$1</span>');
			}catch(e){

			}

		}
		try{
			return $sce.trustAsHtml(text.toString())
		}catch(e){
			//fallback
		}
	}
});




app.controller('mainPage',function($rootScope,$scope){

	
	$rootScope.showMainContent = true;
	document.title = 'Niketh Kopparthy Blog - Lets get cursed with knowledge!';

	if($rootScope.pagesList.length == 0){

		$rootScope.pagesList = [];
		$rootScope.pageContent = [];
		$rootScope.pages = [];
		$rootScope.db.collection("pages").where('liveStatus','==',true).orderBy('created_date').limit(50).get().then(querySnapshot=>{
			
			querySnapshot.docs.reverse().forEach((doc) => {
				d = doc.data();
				d.id = doc.id;
				d.likedPost = false;
				$rootScope.urlPair[d.url] = d.id;

				if($rootScope.likedPostsList.includes(d.id)){

					d.likedPost = true;

				}

				if(!$rootScope.pagesList.includes(d.id)){
					$rootScope.pagesList.push(d.id);
					$rootScope.pages.push(d);
				}

				$rootScope.pageContent[d.id] = d;
				$scope.$apply();
			});
			// console.log($rootScope.pages);
			

		});

	}

	$scope.showPost = function(x){
		$rootScope.currentPost = x;
		$rootScope.showMainContent = false;

	};

	$scope.clickLikePost = function(id,index){



		var likedPostsArrayIndex = $rootScope.likedPostsList.indexOf(id);
		if(likedPostsArrayIndex == -1){
			$rootScope.likedPostsList.push(id);
			$rootScope.pageContent[id].likeCount++;
			$rootScope.pages[index].likeCount++;
			$scope.likePost(id,index);
			$rootScope.db.collection("pages").doc(id).update({likeCount:firebase.firestore.FieldValue.increment(1)});
		}else{
			$rootScope.pageContent[id].likeCount--;
			$rootScope.pages[index].likeCount--;
			$rootScope.likedPostsList.splice(likedPostsArrayIndex, 1);
			$scope.unLikePost(id,index);
			$rootScope.db.collection("pages").doc(id).update({likeCount:firebase.firestore.FieldValue.increment(-1)});
		}
		
		localStorage.setItem(btoa('likedPostsList'),btoa($rootScope.likedPostsList.toString()));
		

	};


	$scope.likePost = function(id,index){

		
		$rootScope.pageContent[id].likedPost = true;
		$rootScope.pages[index].likedPost = true;

	};


	$scope.unLikePost = function(id,index){			

		$rootScope.pageContent[id].likedPost = false;
		$rootScope.pages[index].likedPost = false;

	};

	$scope.shareUrl =  function(id){

		var shareTitle = $rootScope.pageContent[id].title;
		var shareText = $rootScope.pageContent[id].shortnote;
		var shareUrl = window.location.origin + "/posts/" +$rootScope.pageContent[id].url;
		// console.log(id);

		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
			){

			if(navigator.share) {

				navigator.share({
					title: shareTitle,
					text: shareText,
					url: shareUrl,
				})
				.then(function(){
						// console.log('Successful share');
					})
				.catch(function(error){
					$scope.fallbackShareUrl(shareUrl);
				});
			}else{

				$scope.fallbackShareUrl(shareUrl);

			}

		}else{

			$scope.fallbackShareUrl(shareUrl);

		}

	};

	$scope.fallbackShareUrl = function(urlToCopy){


		var copyElement = document.createElement("textarea");
		copyElement.style.position = 'fixed';
		copyElement.style.opacity = '0';
		copyElement.style.width = '0';
		copyElement.style.height = '0';
		copyElement.textContent = urlToCopy;
		M.toast({html: '<i class="material-icons-outlined">done</i>	Link copied to clipboard',classes:'custom-blue w3-text-white rounded'});
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(copyElement);
		copyElement.select();
		document.execCommand('copy');
		body.removeChild(copyElement);

	};


});

app.controller('routeController',function($scope,$rootScope,$timeout,$routeParams){

	$scope.incrementViewCount = function(url){

		if($rootScope.pageContent[$rootScope.currentPost] == undefined){

			$timeout(function(){
				$scope.incrementViewCount(url);
			},400);

		}else{
			
			var id = $rootScope.pageContent[$rootScope.currentPost].id;
			$rootScope.db.collection("pages").doc(id).update({viewCount:firebase.firestore.FieldValue.increment(1)});

		}

	};



	$scope.loadUrl = function(r){


		$rootScope.searchPosts = '';


		if($rootScope.pagesList.length == 0){

			$timeout(function(){ $scope.loadUrl(r); },500);

		}else{

			var urlIndex = $rootScope.urlPair[r.url];
			document.title = $rootScope.pageContent[urlIndex].title;
			$rootScope.currentPost = urlIndex;
			$rootScope.showMainContent = false;
			
			$scope.incrementViewCount($routeParams.url);
			$timeout(function(){$scope.scrollToTop(200);},400);

		}

	};


	$scope.loadUrl($routeParams);

	$scope.scrollToTop = function(scrollDuration){
		var scrollStep = -window.scrollY / (scrollDuration / 15);
		var scrollInterval = setInterval(function(){
			if ( window.scrollY != 0 ) {
				window.scrollBy( 0, scrollStep );
			}
			else clearInterval(scrollInterval); 
		},15);
	}


});

app.config( function($routeProvider) {
	$routeProvider
	.when('/',{controller:'mainPage',template:false})
	.when('/posts/:url',{controller:'routeController',template:false})
	.when('/post/:url',{controller:'routeController',template:false})
	.when('/p/:url',{controller:'routeController',template:false})
	.when('/n/:url',{controller:'routeController',template:false});
});