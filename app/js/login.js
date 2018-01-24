      function enter(ev){
        //ev.preventDefault();
        if (ev.keyCode==13) {
          logueo();
        }
      }



    $(document).ready(function(){


			$('#bnt-olvidar').click(function(){
				$('#modal-login').modal("hide");

        $('#n_login').click(function(e){
          e.preventDefault();
          $('#Recuperar_clave').modal("hide");
        });

			});


			$('#restablecer_clave').click(function(e){
				e.preventDefault();
				var rta =$("#rta_ajax_msg");

				// console.log(rta);
				var co = $('#correo_');
				var correo = co.val();
				if (correo == null || correo.length == 0 || /^\s+$/.test(correo)){
					rta.html(alertGeneral("warning","fadeIn","warning","Advertencia! ","El campo debe ser requerido"));
					co.focus();
				}else{
					if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+/.test(correo)) ) {
						rta.html(alertGeneral("warning","fadeIn","warning","Advertencia! ","El correo electronico no es valido"));
						co.focus();
						console.log("Entro false correo");
					}else{
						$.ajax({
							url:'ajax.php?option=recuperarclave',
							method:'post',
							data:{email : correo},
              beforeSend:function(){
                rta.html("<div class='loader fadeIn'>Loading...</div><br>");
              },
							success:function(e){
								var rtaa = JSON.parse(e);
								// console.log(frm);
                if (rtaa.estado && rtaa.msg) {
                  co.val("");;
                  rta.html(alertGeneral("success","fadeIn","check","Ok! ","Se le ha envado un correo electronico a "+ correo + ", sigue los pasos que te piden."));
                }else if(rtaa.estado && rtaa.msg =="fallo_envio"){
                  rta.html(alertGeneral("danger","fadeIn","times"," Error! ","Se produjo un error al enviar el correo, vuelva a intentarlo."));
  								co.focus();
                }else if(!rtaa.estado && rtaa.msg =="email_falso"){
                  rta.html(alertGeneral("warning","fadeIn","warning"," Advertencia! ","El correo que intentas ingresar es incorrecto, intentelo de nuevo."));
  								co.focus();
                }else if(!rtaa.estado && rtaa.msg != ""){
                  rta.html(alertGeneral("info","fadeIn","info"," Informacion! ","Sugerencias de programador , "+rtaa.msg));
                }

							}
						});
					}
				}
			});





    });

     function logueo(){
            var usu=$("#usu").val();
            var pass=$("#pass").val();
            if(usu=="" || pass==""){
              $('#rta_ajax_login').html(alertGeneral("warning","fadeIn","warning","  Advertencia! ","Algunos de los campos estan vacios."));

            }else{
                $.ajax({

                    url:'ajax.php?option=login',
                    type:'post',
                    data:{usuario:usu,clave:pass},
                      beforeSend:function(){
                      $('#rta_ajax_login').html("<div class='loader fadeInLeft'>Loading...</div><br>");
                    },
                    success:function(msg){
                      // console.log(msg);
                      $('#rta_ajax_login').html("");
                        if(msg==4){
                          $('#rta_ajax_login').html(alertGeneral("warning","fadeIn","warning","  Advertencia! ","Datos incorrectos vuelva a intentarlo"));
                        }else if(msg==5){
                          $('#rta_ajax_login').html(alertGeneral("danger","fadeIn","times","  Error! ","Hubo un error en el servidor vuelva a intentarlo"));
                        }else if (msg.length > 90) {
                               $('#rta_ajax_login').html(alertGeneral("warning","fadeIn","warning","  Advertencia! ","Error en la conexion, vuelva a intentarlo, "+msg));
                        }else{
                            //window.location.href="admin/";
                            console.log( msg );
                            window.location.href = msg;
                            //console.log(msg);
                        }
                            //alert(msg);
                           // if (msg.length) {}
                            //console.log(msg);


                    }

                });
            }

        }

        document.querySelector("#btnlogin").onclick=function(){
          logueo();
        }
