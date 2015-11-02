$().ready(
function(){
	
	$('button').click(function()
	{	
		if($('p').css('display')=='none')
		{
			$('p').show();
		}else
		{
			$('p').hide();
		}
	});
});
