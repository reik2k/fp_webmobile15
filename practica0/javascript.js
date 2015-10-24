//3.1

//3.2)
javascript:javascript:console.log(document.getElementById('calsificacion_completa').rows[2].style.background="green")

//3.3)
javascript:javascript:console.log(document.getElementsByClassName('pts seleccionado').item(1).textContent)

var table=document.getElementById('calsificacion_completa');
var rowFirst=table.rows[2];
var rowLast=table.rows[21];

table.insertRow(1).innerHTML='prueba';
