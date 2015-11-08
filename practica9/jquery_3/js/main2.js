$().ready(function(){
	
	//Ejericicio 3 JS
	
	var $col=$('td.f');//Seleccionar toda las columnas de Goles a Favor
	var $name=$('td.equipo');
	
	var array= [];
	
	//Eliminar el título de la columna de Goles a Favor
	$col.splice(0,1);
	
	for(var i=0;i<$col.length;i++)
	{		
		array.push($col.eq(i).text());
	}
	var max = Math.max.apply(Math,array);
	var pos = array.indexOf(max.toString()) + 1;
	
	console.log('max: ' + max + ' Pos:' + pos);
			
});















