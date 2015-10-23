$(document).ready(function()
{
	console.log('he entrado');
	var click=$('#send')
	
	click.on('click',
		function()
		{
			console.log('he entrado');
			$.ajax()
			{
				url:'http://img.memecdn.com/just-christiano-ronaldo-wait-what_o_285635.jpg',
				method:"GET",
				success:function(xhr,picture)
					{
						var container=$('#picture'); 
						container.html(picture);
			
					}
			};
		});

});
