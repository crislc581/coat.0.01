
valor = document.getElementById("campo").value;
if( isNaN(valor) ) {
  return false;
}




select

ACACACACACAC este que es una lista
indice = document.getElementById("opciones").selectedIndex;
if( indice == null || indice == 0 ) {
  return false;
}


<select id="opciones" name="opciones">
  <option value="">- Selecciona un valor -</option>
  <option value="1">Primer valor</option>
  <option value="2">Segundo valor</option>
  <option value="3">Tercer valor</option>
</select>



if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(valor)) ) {
  return false;
}



valor = document.getElementById("campo").value;
if( !(/^\d{9}$/.test(valor)) ) {
  return false;
}



 Validar un campo de texto obligatorio
Esta omar .l.
valor = document.getElementById("campo").value;
if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
  return false;
}













";




LINK
http://librosweb.es/libro/javascript/capitulo_7/validacion.html




var ano = document.getElementById("ano").value;
var mes = document.getElementById("mes").value;
var dia = document.getElementById("dia").value;

valor = new Date(ano, mes, dia);
7.3.5. Validar una fecha
validar fecha
if( !isNaN(valor) ) {
  return false;
}



validacion de un correo

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



function phonenumber(inputtxt) {
  if(typeof inputtxt == "undefined")
    return;
  var phoneno = /^\d{10}$/;
  if((inputtxt.match(phoneno))) {
    return true;
  }
  else {
    return false;
  }
}
