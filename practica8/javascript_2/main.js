/*EJERCICIO 2.1 Clickar en el elemento A*/
javascript:var a=document.getElementsByTagName("a");
console.log("Elementos " + a.length);

for(var i in a)
{
	console.log(a[i].getAttribute('href'));
	if(a[i]=='http://www.genbeta.com/correo/google-relanza-la-aplicacion-nativa-de-gmail-para-ios-corrigiendo-el-error-de-las-notificaciones')
	{
		a[i].click();
	}
}

/*EJERCICIO 2.2 Eliminar IMG*/
javascript:var img=document.getElementsByTagName('img');
console.log("Elementos " + img.length);

for(var i in img)
{
	if(img[i].getAttribute('src')=='http://i.blogs.es/2cc1d9/gmailwebmovil/450_1000.jpg')
	{
		var dad=img[i].parentNode;
		dad.removeChild(img[i]);
		console.log("Imagen eliminada: ");
	}
}

/* EJERCICIO 2.3 Obtener autores de las noticias*/
javascript:var h3=document.getElementsByClassName("comment-author-name");
for(i in h3)
{
	if(i< (h3.length-1))
	{
		console.log(h3[i].firstChild.innerHTML);
	}
}
/*Obtener autor pasando el enlace a la noticia*/
function autor(h3)
{
	console.log(h3[i].firstChild.innerHTML);
}
autor(document.getElementsByClassName("comment-author-name"));

/*EJERCICIO 2.4 Copiar el último commentario*/
javascript:var dad=document.getElementsByClassName('comment-list')[0];
console.log(dad.childNodes.length);
var childNodes=dad.childNodes;
var a=true;
for(i in childNodes)
{
	if((i = (childNodes.length-1))&&(a))
	{
		console.log("Ultimo nodo");
		a=false;
		dad.insertBefore(childNodes[i].cloneNode(true),childNodes[i]);
	}
}