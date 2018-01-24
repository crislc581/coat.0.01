$(document).ready(function(){

	listarEps();
	listarDepartamentos();
		$('#departamento').change(function(){
			listarCiudad($(this).val());
		});
		$('#ciudad').change(function(){
			listarBarrio($(this).val());
		});
		$('#departamento1').change(function(){
			listarCiudad($(this).val());
		});
		$('#ciudad1').change(function(){
			listarBarrio($(this).val());
		});








			$("#registrarBarrio").click(function(){


				var dep,ciu,bar;
				dep=validarformulario("departamento1");
				ciu=validarformulario("ciudad1");
				bar=validarformulario("nuevoBarrio");

				if (dep==false || ciu==false || bar==false) {
					swal("Advertencia","Revise que los campos esten completados correctamente","warning");
				}else{
					var ciudads=$("#ciudad1").val();
					var barrios=$("#nuevoBarrio").val();

					$.ajax({

						url:'ajax.php?option=listarcombos&option2=insBarrio',
						type:'post',
						data:{ciu:ciudads,bari:barrios},
						beforeSend:function(){

						},
						success:function(msg){
							if (msg==9) {
								$("#rta-barrio").html("");
								$("#rta-barrio").html(alertGeneral("danger","bounceIn","times","Advertencia","El barrio que intenta registrar ya existe"));


		       				 }else if(msg==0){
								$("#rta-barrio").html("");
								$("#rta-barrio").html(alertGeneral("danger","bounceIn","times","Error","Hubo un error en la consulta"));

		        			}else{
		        			 $("#rta-barrio").html("");
		        			 $("#rta-barrio").html(alertGeneral("success","bounceIn","checked","OK","Barrio registrado Correctamente"));
		        			 listarBarrio(ciudads);
							 $("#ciudad1").val("").removeClass("is-valid");
							 $("#nuevoBarrio").val("").removeClass("is-valid");
							 $('#departamento1').removeClass("is-valid");
		        			}

						}
					});
					//alert("Nuevo barrio registrado");

				}


			});

			$("#registrarEps").click(function(){
				var dato=$("#nuevaEps").val();
				var telf=$("#telEps").val();
				if(dato == "" || telf == ""){
					$("#nuevaEps").focus();
					$("#telEps").focus();
					swal("Advertencia","Los campos deben ser requeridos" ,"warning");
				}else{

						
						$.ajax({

						url:'ajax.php?option=listarcombos&option2=insEps',
						type:'post',
						data:{nombre:dato,telefono:telf},
						beforeSend:function(){

						},
						success:function(msg){

							if (msg==9) {
								$("#rta-eps").html("");
								$("#rta-eps").html(alertGeneral("danger","bounceIn","times","Advertencia","La Eps que intenta registrar ya existe"));


							}else if(msg==0){
								$("#rta-eps").html("");
								$("#rta-eps").html(alertGeneral("danger","bounceIn","times","Error","Hubo un error en la consulta"));

							}else{
								listarEps();
								$("#nuevaEps").val("").removeClass("is-valid");
								$("#telEps").val("").removeClass("is-valid");
								$("#rta-eps").html("");
								$("#rta-eps").html(alertGeneral("success","bounceIn","checked","OK","Eps registrada Correctamente"));


							}

						}
					});
				}
			});

});

function listarDepartamentos(){
	var a=1;
		$.ajax({
			url:'ajax.php?option=listarcombos&option2=listardepartamento',
			type:'post',
			data:{dato:a},
			beforeSend:function(){

			},
			success:function(msg){

				$("#departamento , #departamento1").html("");
				$("#departamento , #departamento1").html(msg);
			}
		});


}

function listarCiudad(fkdepartamento){
	$.ajax({
		url:'ajax.php?option=listarcombos&option2=listarciudad',
		type:'post',
		data:{dato:fkdepartamento},
		beforeSend:function(){

		},
		success:function(msg){

			$("#ciudad , #ciudad1").html("");
			$("#ciudad , #ciudad1").html(msg);
		}
	});
}

function listarBarrio(fkciudad){
	$.ajax({
		url:'ajax.php?option=listarcombos&option2=listarbarrios',
		type:'post',
		data:{dato:fkciudad},
		beforeSend:function(){

		},
		success:function(msg){

			$("#barrio").html("");
			$("#barrio").html(msg);
		}
	});
}

function listarEps(){
	// alert("entro");
	$.ajax({
    url:'ajax.php?option=listarcombos&option2=lisEps',
    type:'post',
    data:{dato:true},
    beforeSend:function(){

    },
    success:function(msg){
      // alert(msg);
      $("#eps").html("");  //esto?
      $("#eps").html(msg);
    }
  });
}


		function validarformulario( idHtml) {

			let valor = $(`#${idHtml}`).val();
			if(valor == "" || valor.length == 0 || valor == null){
				return false;
			}else{
				return true;
			}
		}