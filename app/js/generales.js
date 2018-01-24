
function alertGeneral(color,animacion,icono,titulo,descripcion){

    var html='<div class="alert alert-'+color+' alert-dismissible fade show animated '+animacion+'" role="alert">';
    html+='<button class="close" data-dismiss="alert" type="button"><span>&times;</span></button>';
    html+='<strong><i class="fa fa-'+icono+'"></i>'+titulo+'</strong>';
    html+='<p>'+descripcion+'</p></div>';

  return html;
}


function cadenacorta(cadena,fin){
  var text = cadena.substring(0,fin);
  return text;
}

function _firsString(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}


///sistema operativo linux rutas de imagenes o archivos
_rutalinux = "/opt/lampp/htdocs/controlestudiantiloc/";



