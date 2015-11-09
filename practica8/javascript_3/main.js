javascript:
var INFO='[info] ';
var colScore=document.getElementsByClassName('f');//Tabla con valores de Goles a Favor
var arrayScore=[];
var maxScore=0;

//Convertir a array la tabla para trabajar mas fácil
for(i=1;i<colScore.length;i++)
{
	arrayScore.push(colScore[i].innerHTML);
}

maxScore=Math.max.apply(Math,arrayScore);//Calcular la máxima puntuación

console.log(INFO + ' Max Score' + maxScore);

//Comprobar que no hay resultados iguales en la tabla
for(i in arrayScore)
{
	if(maxScore==arrayScore[i])
	{
		console.log(INFO + 'Score: ' + arrayScore[i] + ' Position: ' + i);
	}
}
