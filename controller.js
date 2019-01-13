
var app=angular.module("app",['ngMaterial', 'ngMessages']);
app.controller("ctrl",function($scope,$http){

	$scope.shownItemsResponse=[];
	$scope.visiblePages=5;
	$scope.itemsPerPage=5;	
	$scope.currentPage=0;
	$scope.pagesOption=[5,10,25,50,75];
	$scope.pages=[];	
	$scope.totalPages=[];
	
	
	
	$scope.specificPage=1;
	
	$scope.GetNewsDetails=function(){
		$http.get("https://newsapi.org/v2/sources?apiKey=bc7fe6f6acf048faaef232fe45980a2e").then(function(response) {
		//$http.get("response.json").then(function(response) {
				$scope.response=response.data.sources;
				$scope.calculatePages();	
				$scope.setPage(0);		
	});
		}
	
	
	$scope.loadPerPageItems=function(){
		$scope.calculatePages();
		$scope.setPage(0);
	}
	$scope.setPage=function(index){
		if(index>-1&&index<$scope.totalPages.length){
		$scope.currentPage=index;
		$scope.shownItemsResponse=$scope.response.slice($scope.itemsPerPage*(index),$scope.itemsPerPage*(index+1));
		$scope.setPageIndex(index);
	}}

	$scope.setPageIndex=function(index){
		if(index==0){
			start=0;
			end=$scope.visiblePages;
		}
		else if(index>$scope.totalPages.length-4){
			start=$scope.totalPages.length-$scope.visiblePages;
			end=$scope.totalPages.length;
		}
		else{
	     start=index-($scope.visiblePages-4);
		end=index+($scope.visiblePages-1);
		}
		$scope.pages=$scope.totalPages.slice(start,end)	;
	}
	
	$scope.calculatePages=function(){
		$scope.totalPages=[];
		for(i=0;i<($scope.response.length/$scope.itemsPerPage);i++){
			$scope.totalPages.push(i);
		}
	}
});
