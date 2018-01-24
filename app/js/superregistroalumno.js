



function rf(ele,icono,estado,color,texto){

	// ele.parent().children("span.input-group-addon").html('<i class="aparece '+icono+'" style="color:white"></i>');
	ele.removeClass("is-invalid is-valid");


	ele.parent().children("span").removeClass("b-c b-i");


	ele.parent().children(".derecha").addClass("input-group-addon").html('<i class="fa fa-'+icono+' aparece" style="color:white"></i>');
	ele.addClass(estado);
	ele.parent().children("span").addClass(color);
	// ele.parent().children("span i").addClass('aparece');
	ele.parent().parent().children('span.msg').html('');
	ele.parent().parent().children('span.msg').html(texto);
}


function validarformulario(va){
	var valor=$("#"+va).val();

	if (va == 'nombres' || va == 'apellidos' || va=='nomAcu' || va=='apelAcu' || va=='nomMad' || va=='apelMad' || va=='nomPad' || va=='apelPad' || va=='direccion' || va=='nuevoBarrio' || va=='nuevaEps') {
		var ele = $('#'+va);
		if (valor == null || valor.length == 0 || /^\s+$/.test(valor)) {

			// console.log("mal");
		 	rf(ele,'times','is-invalid','b-i','Los campos deben ser requeridos');
			return false;
		}else{

			if(!isNaN(valor) ) {

				rf(ele,'times','is-invalid','b-i','Solo se permite caracteres');

			  return false;

			}else{

				rf(ele,'check','is-valid','b-c','');
				return true;
			}
		}
	}

	if (va == 'email' || va == 'emailAcu' || va == 'emailMad' || va == 'emailPad') {
		//email
	var ele=$("#"+va);
		if (valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			rf(ele,'times','is-invalid','b-i','El campo debe ser requrido');
			return false;
		}else{
			if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+/.test(valor)) ) {
				rf(ele,'times','is-invalid','b-i','Solo se permite correos');
	  				return false;
			}else{
					rf(ele,'check','is-valid','b-c','');

						return true;
			}
		}
	}

	//aqui
	if (va == 'documento' || va == 'docMad' || va=='docPad'|| va == 'gradosc' || va=='gradosr') {
		var ele=$("#"+va);
		if (valor == null || valor.length == 0 || /^\s+$/.test(valor)){
			rf(ele,'times','is-invalid','b-i','El campo debe ser requrido');

			return false;
		}else{
			if(isNaN(valor) ) {
				rf(ele,'times','is-invalid','b-i','campo Numerico');
			  return false;
			}else{
				rf(ele,'check','is-valid','b-c','');

				return true;
			}
		}

	}

	if (va=='telFijo' || va=='fijoPad' || va=='fijoMad')
	{
		var ele=$("#"+va);
		if (valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			rf(ele,'times','is-invalid','b-i','El campo debe ser requrido');
			return false;
		}else{
			if(isNaN(valor) ) {
				rf(ele,'times','is-invalid','b-i','Campo numerico y de 7 digitos');
			  return false;
			}else{
				if (valor.length==7) {
					rf(ele,'check','is-valid','b-c','');
					return true;
				}else{
					rf(ele,'times','is-invalid','b-i','Mas de 7 digitos');

						return false; //mas o menos de 7
				}

			}

		}
	}

		if(va=='celular' || va=='celMad' || va=='celPad' || va=='celAcu' || va=='fijoAcu')
		{
			var ele=$("#"+va);
		if (valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			rf(ele,'times','is-invalid','b-i','El campo debe ser requrido');
			return false;
		}else{
			if(isNaN(valor) ) {
				rf(ele,'times','is-invalid','b-i','campo numerico y de 10 digitos');
			  return false;
			}else{
				if (valor.length==10) {
					rf(ele,'check','is-valid','b-c','');
					return true;
				}else{
					rf(ele,'times','is-invalid','b-i','Mas de 10 digitos');
						return false; //mas o menos de 7
					}

				}

			}
	}

	if(va=='tipDocumento' || va=='genero' || va=='jornada' || va=='eps' || va=='ciudad' || va=='sede' || va=='rh' ||va=='departamento' || va=='tipDocMad' || va=='tipDocPad' || va=='barrio' || va=='departamento1' || va=='ciudad1' || va=='curso' || va=='sede'|| va=='jornada' || va=='matricula')
	{
		var ele=$("#"+va);
		var val2=document.getElementById(va).selectedIndex;
		if( val2 == null || val2 == 0 )
		{
			rf(ele,'times','is-invalid','b-i','Seleccione una opcion');

	 	 return false;
		}else{
			rf(ele,'check','is-valid','b-c','');
			return true;
		}
	}
	if (va=='fecNacimiento') {
		var ele=$("#"+va);
		var dato=ele.val();
		if (dato=="" || dato.length==0) {
			rf(ele,'times','is-invalid','b-i','Seleccione una fecha');
			return false;
		}else{
			rf(ele,'check','is-valid','b-c','');
			return true;
		}

	}

	if (va=='telEps') {
	var ele=$("#"+va);
	var tl=ele.val();
		if (tl=="" || tl.length==0) {
			rf(ele,'times','is-invalid','b-i','campo requerido');
			return false;
		}else{
			if(!isNaN(tl)){
				if (tl.length>=7 && tl.length<12){
					rf(ele,'check','is-valid','b-c','');
			return true;

				}else{
					rf(ele,'times','is-invalid','b-i','minimo 7 digitos y maximo 11');
					return false;
				}

		}else{
			rf(ele,'times','is-invalid','b-i','El campo debe ser numerico');
			return false;
		}
	}


	}

	if(va=='foto'){
	// var ele=document.getElementById(va).files;

	var v = $('#vista_previa');
				v.html("");
				var file = document.getElementById(va).files;
				var navegador = window.URL  || window.webkitURL;
				// recorrer los archivos
				for (var i = 0; i < file.length; i++) {
					// validar el tamaño y el tipo de  archivo
					var size = file[i].size;
					var nombre = file[i].name;
					var type = file[i].type;

					if (size > 2048*2048) { /*1M*/

						v.append("El tamaño del "+nombre+" maximo es de 2MB");

					}else if(type != "image/png" && type != "image/jpg" && type != "image/jpeg" ){

						v.append("El tipo de imagen no permitida");
					}else{
						var url = navegador.createObjectURL(file[i]);
							v.html("");
					        v.append('<img src="'+url+'" height="80" width="80" style="border-radius: 50%;" >');

				}



	}

}
}



// cuando hace click en el boton registrar alumno
$('#enviartodo').click(function(){
	var cont1=0;


	$("#frmregistroalumno input[type='text'], #frmregistroalumno input[type='email'],#frmregistroalumno input[type='number'],#frmregistroalumno select,#frmregistroalumno input[type='date']").each(function(cont){
		var rta=validarformulario($(this).attr("id"));
		if(rta==false){
			cont1++;
		}
	});
	if(cont1>0){

		$("#addAlumno").html("");
		//$(".content-wrapper").stop().animate({scrollTop:jQuery(document.querySelector("#addAlumno")).offset().top-10},1500);
		$("#addAlumno").html(alertGeneral('warning','bounceIn','warning','Advertencia','verifique que los campos esten bien diligenciados'));
		$(".scroll-to-top").click();


	}else{
		var datos = new FormData(document.getElementById('frmregistroalumno'));
		$.ajax({
			url:'ajax.php?option=registraralumno',
			type:'post',
			data:datos,
			contentType:false,
			processData:false,
			beforeSend:function(){
			},
			success:function(msg){
				console.log(msg);
				if (msg==9) {
		$(".scroll-to-top").click();
					$("#addAlumno").html(alertGeneral('warning','bounceIn','warning','Advertencia','El alumno que intenta registrar ya existe, cambie el documento del estudiante para continuar con el proceso'));
					$('#documento').focus();
				}else if(msg==1){
					document.getElementById("frmregistroalumno").reset();
		$("#frmregistroalumno select ,#frmregistroalumno input").removeClass("is-valid");
		$("#frmregistroalumno .input-group>span").removeClass("b-c");
					
		$(".scroll-to-top").click();
				$("#addAlumno").html(alertGeneral('info','bounceIn','check','  Ok','Los datos se han registrado correctamente'));
				document.getElementById("frmregistroalumno").reset();
				}else if(msg==8){
					$(".scroll-to-top").click();
					$("#addAlumno").html(alertGeneral('warning','bounceIn','times','Advertencia','La imagen supera el peso de 2MB'));
				}else if(msg==7){
					$(".scroll-to-top").click();
					$("#addAlumno").html(alertGeneral('danger','bounceIn','times','Error','No se pudo guardar la imagen'));
				}else{
					$(".scroll-to-top").click();
					$("#addAlumno").html(alertGeneral('danger','bounceIn','times','   Error','Error al registrar el alumno, vuelva a intentarlo'));
				}

			}

		});

		// $("#addAlumno").html("");
		// $("#addAlumno").html(alertGeneral('info','bounceIn','check','Bien','Los datos se han registrado correctamente'));

	}
});


var empresa={
	"direccion":"",
	"nombre":"",
	"telefono":"",
	"personaContacto":"",
	"fecha":"",
	"Adicional":"",
	"setAll":function(di,no,tel,per,fec,adi){
		this.direccion=di;
		this.nombre=no;
		this.telefono=tel;
		this.personaContacto=per;
		
		this.Adicional=adi;
	},
	getAll:function(){
	//	alert("la direccion es: "+this.direccion+", el nombre de la empresa es: "+this.nombre+" el telefono es: "+this.telefono+" la persona de contacto es: "+this.personaContacto+" fecha de entrevista: "+this.fecha+" datos auxiliares: "+this.Adicional);
	}
}

empresa.setAll("calle 93 # 12 14 Bogota oficina 501","GEA Andina S.A.S","celular","leidY pulido, sergio celedon","Lunes a las 3:00pm","Www.gea.com");
empresa.getAll();