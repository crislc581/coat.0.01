	/*Ocultar mensages de ayuda para el usuario, mesages de error de cursos y de semana*/
      $('.msg-curso').hide();
      $('.msg-semana').hide();
      hoverAsistenciaSemana();

       $('#semana').change(function()
       {
	        /*reiniciamos valores de los input*/
	        $('#semana').removeClass("is-invalid");
	       	$('#curso').removeClass("is-valid");

	        var valor = $(this).val();

          if (valor != 0 || valor != null || valor != "") {
            $.ajax({
              url:'ajax.php?option=accionesasistencia&acciones=buscarcursotomarasistencia',
              method:'post',
              data:{idsemana : valor},
              beforeSend:function(){
                $('.center-loader').removeClass("ocultar-elemento");
                $('.center-loader').html("<div class='loader fadeInUp'>Loading...</div>");
              },
              success:function(response){
                // quitamos el loader
                 // efectos de loader
                $('.center-loader').addClass("ocultar-elemento");
                $('.center-loader').html("");

                var rta = JSON.parse(response);
                if (!rta.estado && rta.msg.ms=="notData") {
                  $('#semana').addClass("is-invalid");
                  $('.msg-curso').show();
                  $('.msg-curso').html("<span class='fadeIn'>No hay registros para el año <strong>"+rta.msg.anio +"</strong>, selecione otra semana por favor.</span>");
                  $('#semana').focus();
                  $('#curso').html("<option value='si'>No hay cursos</option>");
                }else if(rta.estado && rta.msg != null){
                  $('.msg-curso').html("");
                  $('.msg-curso').hide();
                  $('#curso').focus();
                  $('#curso').addClass("is-valid");
                  $('#curso').html(rta.msg);
                }else if(!rta.estado){
                  $('#alertas').html(alertGeneral("danger","flash","warning", "  Error!  ","Ha fallado la consulta vuelva a intentarlo por favor, "+rta.msg));
                }
              }
            });
          }
       });


       //cuando haga click en el boton
        $('#curso').click(function(){
	        var x = document.getElementById("curso").options.length;
	        var msgc = $('.msg-curso');
	        var sem = $('#semana');

	        if (x == 1) {
	          sem.focus();

	          sem.addClass('is-invalid');
	          msgc.show();
	          msgc.html("<span class='fadeIn'>Debe seleccionar una semana para ver la informacion de los cursos matriculados.</span>");
	        }else{
	          sem.removeClass('is-invalid');
	          msgc.hide();
	          msgc.html("");
            //Options All -Indexes
	        }
    	});


    	$('#curso').change(function(){
	        /*Declaramos los notos que vamos a utilizar*/
	        var ind = document.getElementById("curso").selectedIndex;
	        var sem = $('#semana');
	        var cur = $('#curso');
	        var rtaajax = $('#infomarfaciondeasistencia');
	        var alertas = $('#alertas');
	        var msgc = $('.msg-curso');
	        var msgs = $('.msg-semana');
	        var curso = cur.val();
	        var id_sem = sem.val();
	        if (curso == 0 || curso.length == 0) {
	          //hacer focus , que me seleccione una
	          msgc.html("No hay cursos para mostrar en el momento.");
	        }else{
	          $.ajax({
	            url:'ajax.php?option=accionesasistencia&acciones=listarasistenciaporsemana',
	            method:'post',
	            data:{id_sem : id_sem , curso : curso},
	            success:function(response){
                hoverAsistenciaSemana();
	              $('#infomarfaciondeasistencia').html(response);
	            }
	          });
	        }
	      });
