$().ready(function(){
	
	var url='http://www.genbeta.com/correo/google-relanza-la-aplicacion-nativa-de-gmail-para-ios-corrigiendo-el-error-de-las-notificaciones';
	
	alert('Bienvenido al Máster de Telefonía de la USAL');
	
	//Ejercicio JS 2.1
	var $a=$('a[href$="'+url+'"]');	
	
	var event = jQuery.Event( "click" );
	
	var action= function(){
	
		console.log('You emulate a click event');
	};
		
	$a.click(action).trigger(event);
	
	//Ejercicio JS 2.2
	var $picture=$('img.centro_sinmarco:first');
	
	console.log('imagen: ' + $picture);
	
	$picture.remove();
	
	//Ejercicio JS 2.3
	/*
		Function authorName()
		Proporse It takes the author's name
		
		IN i INTEGER comment's number 
	*/
	function authorName(i){
	
		var $name=$('h3.comment-author-name');
		
		if (isNaN(i))
		{
			console.error('The variable (i) is not a number.')
		}else{
			console.log('The name of author is ' + $name.eq(i).first().text());
		}
	}
	authorName(1);// 1 --> Juan Aguilera	
	
	//Ejercicio JS 2.4
	/*
		Function: cloneComment()
		Proporse: Clone a comment and It will append to the last comment
		
		IN i INTEGER comment's number 
	*/

	function cloneComment(i)
	{
		var $comment=$('ul.comment-list li');
		var $lastComment=$comment.eq($comment.length-1);
		
		console.log($lastComment.html());
		if (isNaN(i))
		{
			console.error('The variable (i) is not a number.')
		}else{
			
			
			$lastComment.append($comment.eq(i).clone());
		}
	}
	cloneComment(0); //Coge el primer comentario y lo añade al final "0 --> rserantes".
	
});















