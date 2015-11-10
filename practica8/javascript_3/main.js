javascript:var INFO='[info] ';
var colScore=document.getElementsByClassName("f");
var colNames=document.getElementsByClassName('equipo');
var arrayScore=[];
var maxScore=0;

for(i=1;i<colScore.length;i++)
{
	arrayScore.push(colScore[i].innerHTML);
}

maxScore=Math.max.apply(Math,arrayScore);

for(i in arrayScore)
{
	if(maxScore==arrayScore[i])
	{
		console.log(INFO + 'Score: ' + arrayScore[i] + ' Position: ' + i + ' Name: ' +colNames[i].firstChild.getAttribute('alt'));
	}
}


