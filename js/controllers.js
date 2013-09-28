'use strict';

/* Controllers */

function BooksCtrl($scope, $navigate){
	$scope.$navigate = $navigate;

	$scope.books = new Array();

	if(localStorage['books']){
		$scope.books = JSON.parse(localStorage['books']);
	}

	if($scope.books.length != 0){
		$scope.nobooks = 'hide';
	}

	$scope.addBook = function() {

		if($('.add-field').hasClass('up')){
			$('.add-field').removeClass("up").addClass("down").slideDown();
		}
		else{
			$('.add-field input').val('');
			$('.add-field').removeClass("down").addClass("up").slideUp();
		}
	}

	$scope.saveBook = function() {

		var bookInfos = new Object();
		bookInfos.id = Math.floor(Math.random()*100001);
		bookInfos.title = $scope.title;
		bookInfos.author = $scope.author;

		if(bookInfos.title.length != 0 || bookInfos.author.length != 0){
			$scope.books.unshift(bookInfos);
			localStorage['books'] = JSON.stringify($scope.books);

			$scope.nobooks = 'hide';

			$('.add-field input').val('');
			$('.add-field').removeClass("down").addClass("up").slideUp();
		}
	}

	$scope.openBook = function(id, title, author, key) {

		var currentBook = {'id': id, 'title': title, 'author': author, 'key': key};
		
		//console.log(currentBook);
		localStorage["current_book"] = JSON.stringify(currentBook);
		$navigate.go('/book','none');
	}
}

function BookCtrl($scope, $navigate){
	$scope.$navigate = $navigate;
	
	$scope.book = JSON.parse(localStorage['current_book']);

	$scope.booknotes = new Array();
	var storage_name = 'booknotes_'+$scope.book.id;

	if(localStorage[storage_name]){
		$scope.booknotes = JSON.parse(localStorage[storage_name]);
	}

	if($scope.booknotes.length != 0){
		$scope.nonotes = 'hide';
	}


	$scope.addNote = function(type) {

		$('.creating textarea, .creating input').val('');
		$('.creating').hide();
		$('.creating.'+type).show();

		// Back to top
		$('body,html').animate({
				scrollTop: 200
		}, 300);
	}

	$scope.save = function(type) {

		var note = new Object();
			note.id = Math.floor(Math.random()*100001);
			note.type = type;

		if(type == 'quote'){
			note.data = $scope.newquote;
		}else if(type == 'idea'){
			note.data = $scope.newidea;
		}else if(type == 'info'){
			note.data = $scope.newinfo;
		}

		if($scope.newquote.length != 0 || $scope.newidea.length != 0 || $scope.newinfo.length != 0){

			$scope.booknotes.unshift(note);
			localStorage[storage_name] = JSON.stringify($scope.booknotes);

			$scope.nonotes = 'hide';

			$('.creating textarea, .creating input').val('');
			$('.creating').hide();
		}
	}

	$scope.cancel = function() {

		$('.creating textarea, .creating input').val('');
		$('.creating').hide();
	}

	$scope.editPanel = function(id) {

		if($('.'+id+' button.delete').hasClass('displayed')){

			$('.'+id+' h1').show();
			$('.'+id+' button.delete, .'+id+' button.cancel').removeClass('displayed').hide();
		}else{
			
			$('.'+id+' h1').hide();
			$('.'+id+' button.delete, .'+id+' button.cancel').addClass('displayed').show();
		}
	}

	$scope.remove = function(id, key) {

		$('.note h1').show();
		$('.note button.delete, .note button.cancel').removeClass('displayed').hide();

		// Remove from Scope
		$scope.booknotes.splice( key, 1 );

		// Remove from LocalStorage
		localStorage[storage_name] = JSON.stringify($scope.booknotes);
	}
}