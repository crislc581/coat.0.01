// 1 paso buscar el estudoante para hacer su informacion_new_matricula
// 2 mirar a que año esta matricula do el estuduante, a cuales años se puedes matricular
	// 2-eje Cristian Camilo Romero esta matriculado en el 2017 hacer hacer un boton para que se matricule para el 2018
	// 2-eje Cristian Camilo Romero es un estudiante nuvo y se quiere matricular a mitad de año


	// Ruta de envio de ajax = ajax.php?option=accionesmatricula&accion=buscarinformacion
	// mensage que se da mientras esta cargando; == <div class='loader fadeIn'>Loading...</div><br>

$('#informacion_new_matricula').hide();

$(document).ready(function(){


	// cuando click en el btono de buscar estudoante para hacre la matricula
	$('#btn-buscar_alu').click(function(e){
		var cajaText = $('[name="buscar_alu"]');
		var valor1 = cajaText.val();
		var cajaRespuesta = $('#rta_ajax_datosalumno');
		var msgError = $('#campobusqueda');

		if (/^\s+$/.test(valor1) || valor1 == "" || valor1.length == 0) {
			cajaText.removeClass("is-valid");
			cajaText.addClass("is-invalid");
			msgError.removeClass("desaparecee_texto");
		}else{
			cajaText.addClass("is-valid");
			cajaText.removeClass("is-invalid");
			msgError.addClass("desaparecee_texto");

			$.ajax({
				url:'ajax.php?option=accionesmatricula&accion=buscarinformacion',
				method:'POST',
				data:{valor : valor1},
				beforeSend:function(){
					cajaRespuesta.html("<div class='loader fadeIn'>Loading...</div><br>");
				},
				success:function(rt){
					var rta = JSON.parse(rt);
					if (rta.estado && rta.msg != "") {
						cajaText.removeClass("is-valid");
						cajaRespuesta.html(rta.msg);
						verAlumno();
					}else if(!rta.estado && rta.msg == "notData"){
						cajaRespuesta.html("<div class='col-sm-12'>"+alertGeneral("info","fadeIn","view","  Información !","No se han encontrado resultados de <cite>"+ valor1+" </cite>") + "</div>");
						cajaText.focus();
					}else if(!rta.estado){
						cajaText.focus();
						cajaRespuesta.html("<div class='col-sm-12'>"+alertGeneral("warning","fadeIn","view","  Advertencia !","Se presento un error del sistema vuelva a intentarlo")+ "</div>");
					}else{
						cajaRespuesta.html("<div class='col-sm-12'>"+alertGeneral("danger","fadeIn","view","  Advertencia !","- "+rta.msg)+ "</div>");

					}
				}
			});

		}
	});

	// cuando hacermos click en algun estudiante de los datos listados de la busqueda

});

/**
 * @event return string
 */
function verAlumno(){
	$("a.enlace-alumno").click(function(e){
		$('.alerta').html("");
		$('#modal-info-alu-matricula').modal("show");
		e.preventDefault();
		var loader = $('#loader_pagin_copleta');
		var id = estudiante = $(this).siblings("input").val();
		/*Peticion ajax obtener los datos del estudinayte para ver si se puede hacer la matricula respectiva*/
		$.ajax({
			url:'ajax.php?option=accionesmatricula&accion=informaciondelalumno',
			method:'POST',
			data:{id_alumno : id},
			beforeSend:function(){
				// En este partre la parte donde sale un loader
				loader.css("display" , "block");
				loader.html("<div class='loader fadeIn'>Loading...</div>");
			},
			success:function(rt){

				loader.css("display" , "none");
				document.getElementById("rta_ajax_frm").innerHTML=rt;




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
	                opcionesSlides();


	                matricular();




			}

		});
	});
}




 //   listarDepartamentos();







                      // function modalInformacionMatricula(id_alu){
                      // }


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
                          $('[data-toggle="tooltip"]').tooltip();
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

                        // function listarEps(){
                        //   // alert("entro");
                        //   $.ajax({
                        //     url:'ajax.php?option=listarcombos&option2=lisEps',
                        //     type:'post',
                        //     data:{dato:true},
                        //     beforeSend:function(){

                        //     },
                        //     success:function(msg){
                        //       // alert(msg);
                        //       $("#eps").html("");
                        //       $("#eps").html(msg);
                        //     }
                        //   });
                        // }


                        function opcionesSlides(){
                        		$('#info_padres_madres').hide();
											    	$('#slide_up_slide_down').hide();

														$('a#ver_informacion_matricula').css({
															position:"relative"
														});$('a#ver_informacion_matricula').children('i').css({
															position: "absolute !important",
														  right: "20px"
														});
														$('#ver_informacion_total').css({
															position:"relative"
														});$('#ver_informacion_total').children('i').css({

														  position: "absolute !important",
														  right: "20px"
														});
														$('#btn_info_acudentes_padres').css({
															position:"relative"
														});$('#btn_info_acudentes_padres').children('i').css({
															position: "absolute !important",
														  right: "20px"
														});
											    	// $('#info_matricula').hide();

											    	$('a#ver_informacion_matricula').click(function(){
											    		$('#info_matricula').slideToggle();
											    	});
												    $('#ver_informacion_total').click(function(){
												      $('#slide_up_slide_down').slideToggle();
												    });
												    $('#btn_info_acudentes_padres').click(function(){
												      $("#info_padres_madres").slideToggle();
												    });
                        	}

	function matricular(){




		/*///////////// Vista previa o miniatura de l aimagen ///////////////*/

		$('#foto__').change(function(){
			// alert("Hola mundo");
			var v = $('#vista_previa');
						v.html("");
						var file = document.getElementById("foto__").files;
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



			} //endfor
		});


		$("#btn_click_matricular").click(function(){

						cont=0;
							var j={"anios":$("#m_aniocursado"),"repetidos":$("#gradosr"),"sede":$("#m_sede"),"matricula":$("#m_aniomatricular"),"jornada":$("#m_jornada")};

							if(j.repetidos.val().length==0 || j.repetidos.val()==null || /^\.s+$/.test(j.repetidos.val())){

										j.repetidos.parent().parent().children("span.msg").css({
										color :"red"

									}).addClass("animated fadeInUp").html("Seleccione una opcion");

							}else{

								if(!isNaN(j.repetidos.val())){
									//son numero
									cont++;
								}else{

								}

							}
							if(j.anios.val().length==0 || j.anios.val()==null || /^\.s+$/.test(j.anios.val())){

								j.anios.parent().parent().children("span.msg").css({
										color :"red"
									}).addClass("animated fadeInUp").html("Esta vacio");

							}else{

								if(!isNaN(j.anios.val())){
									//son numero
									cont++;
								}else{
									j.anios.parent().parent().children("span.msg").css({
										color :"red"

									}).addClass("animated fadeInUp").html("Es numerico");
								}

							}

							if(j.sede.val()==0){
								j.sede.parent().parent().children("span.msg").css({
										color :"red"

									}).addClass("animated fadeInUp").html("Seleccione una opcion");
							}else{
								cont++
							}

							if(j.matricula.val()==0){
								j.matricula.parent().parent().children("span.msg").css({
										color :"red"

									}).addClass("animated fadeInUp").html("Seleccione una opcion");
							}else{
								cont++
							}
							if(j.jornada.val()==0){
								j.jornada.parent().parent().children("span.msg").css({
										color :"red"

									}).addClass("animated fadeInUp").html("Seleccione una opcion");
							}else{
								cont++
							}

							if(cont==5){

								// var d=$("#frmatriculalumno").serialize();
								var n = new FormData(document.getElementById('frmatriculalumno'));
								$.ajax({
									// url:'ajax.php?option=accionesmatricula&accion=nueva_matricula',
									url:'ajax.php?option=accionesmatricula&accion=registrar_new_matricula_alumno',
									method:'POST',
									data:n,
									contentType:false,
									processData:false,
									beforeSend:function(){

									},
									success:function(msg){
											var arr=JSON.parse(msg);
											
										
										if (arr.estado==false){
											if (arr.msg.msg2==8) {
												$(".alerta").html(alertGeneral('warning','bounceIn','warning','Advertencia','El tamaño de la imagen superó las 2 MB'));
											}else if(arr.msg.msg2==7){
												$(".alerta").html(alertGeneral('warning','bounceIn','warning','Advertencia','Error al pasar la imagen'));
											}else if(arr.msg.msg2==2){
												$(".alerta").html(alertGeneral('warning','bounceIn','warning','Advertencia','La persona ya está matriculada para el año  '+$('#m_aniomatricular').val()));	
												$('#m_aniomatricular').focus();
											}else if(arr.msg.msg2==0){
												$(".alerta").html(alertGeneral('warning','bounceIn','warning','Error','Error al actualizar'));
											}
											
										}else if(arr.estado==true){
												$(".alerta").html(alertGeneral('success','bounceIn','check','OK','Alumno matriculado'));
										setTimeout(function(){
												$('#modal-info-alu-matricula').modal("hide");
											}, 2000);	
										}else{
											alert("Hubo un error en la conexion vuelva a intentarlo");
										}
									}

									
								});

							}else{
								$(".alerta").html(alertGeneral('warning','bounceIn','warning','Advertencia','No ha llenado todos los campos'));
							}

		});

	}
