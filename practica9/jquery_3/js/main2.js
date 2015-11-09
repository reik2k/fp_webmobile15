$().ready(function(){
	
	var INFO='[info] ';
	
	//Ejericicio 3 JS
	
	var $col=$('td.f');//Seleccionar toda las columnas de Goles a Favor
	var $names=$('img[style$="margin-left:5px;"]');//Nombres de los equipos
		
	var array= [];//Almacena los goles a favor
	
	$col.splice(0,1);//Eliminar el Título de la columna de Goles a Favor
	
	for(var i=0;i<$col.length;i++)
	{		
		array.push($col.eq(i).text());
	}
	
	var max = Math.max.apply(Math,array);//Conseguir la mayor Puntación
	var pos = array.indexOf(max.toString()) + 1;
	
	console.log(INFO + 'Max Score: ' + max + ' Pos:' + pos);
	
	//comprobamos si está repetido en la tabla
	var arrTeamsScore=[];
	
	$(array).each(function(i){		
		if(array[i]==max)
		{
			console.log(INFO + "Team: " + $names.eq(i).attr('alt') + " Socore: " + array[i]);
		}
	});
});















