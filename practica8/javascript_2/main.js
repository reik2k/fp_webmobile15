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
javascript:var img=document.getElementsByTagName('img'); var i = 0;
console.log("Elementos " + img.length);

for(i=0;i<img.length;i++)
{
	console.log(img[i].getAttribute('src'));
	if(img[i].getAttribute('src')=='http://i.blogs.es/2cc1d9/gmailwebmovil/1366_2000.jpg')
	{
		var dad=img[i].parentNode;
		dad.removeChild(img[i]);
		console.log("Imagen eliminada");
	}
}

/* EJERCICIO 2.3 Obtener autores de las noticias*/p[i].firstChild.innerHTML
javascript:var p=document.getElementsByClassName("comment-author-name");
console.log(p.length);
for(i=0;i<p.length;i++)
{
	console.log('Authores: ' + p[i].textContent);
}
/*Obtener autor pasando el enlace a la noticia*/
javascript:
function autor(p)
{
	console.log(p.textContent);
}
var comment=document.getElementsByClassName("comment-author-name");
autor(comment[1]);//autor del primer comentario

/*EJERCICIO 2.4 Copiar el �ltimo commentario*/
javascript:var dad=document.getElementById('comments-list');
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

