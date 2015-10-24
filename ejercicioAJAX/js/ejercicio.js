$(document).ready(function()
{
	console.log('he entrado al JS');
	var click=$('#send');
	
	click.on('click',
		function()
		{
			console.log('he entrado a la petcición');
			
			$.ajax(
			{
				url:'http://www.omdbapi.com/?t=rambo&y=&plot=short&r=json',
				success:function(json,status,jqXHR)
				{
					var divResult=$('#result');
					var pTitle="<p>Title: "+json["Title"]+"</p><br/>";
					var pYear="<p>Year: "+json["Year"]+"</p><br/>";
					var pRated="<p>Rated: "+json["Rated"]+"</p><br/>";
					
					divResult.html(pTitle+pYear+pRated).fadeIn(1000);
				}
			});
			var divPicture=$('#picture');
			divPicture.html('<img src="./pictures/fondo.jpeg"/>').fadeIn(1000);
		});

	

});
