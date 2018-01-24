
function htmlLiTag(desBloque,ii){
	var html = '<li class="nav-item">';
	html += '<a class="nav-link" data-toggle="tab" href="#h'+ii+'" role="tab">'+desBloque+' Hora</a>';
	html += '</li>';
	return html;
}

function faltasAcademicas(colorr,mensage){
     var html = '<div class="alert alert-'+colorr+'" role="alert">';
	 html += mensage+' <a href="#" class="alert-link" style="float: right;">Hacer citacion  <i class="fa fa-id-card-o" aria-hidden="true"></i></a>. ';
	 html += '</div>';
	 return html;
}


function htmlBoxTabs(data,iii , faltas){
	var html = '<div class="tab-pane" id="h'+iii+'" role="tabpanel">';


		html += '<div class="row">';
		html += '<div class="col-md-4">';
		html += '<label>Hora de clase:  </label> <span>'+data['0018desBloque']+'</span> <br>';
		html += '</div>';
		html += '<div class="col-md-8">';
		html += '<label>Hora que se tomo la asistencia  </label> <span>'+data['2000hora']+'</span><br>';
		html += '</div>';

		html += '<div class="col-md-12"><label>Nombre instructor: </label> '+_firsString(data['008apellidos'].toLowerCase())+'   '+_firsString(data['008nombres'].toLowerCase())+ '</div>';
		html += '<div class="col-md-12"><label>Asignatura de clase</label> '+_firsString(data['0016desMateria'].toLowerCase())+ '</div>';

		html += '<div class="col-sm-6">';
		html += '<label style="margin-bottom: 0px;">Descripcion de la clase: </label>';
		html += '<div class="border border-primary rounded" style="padding: 4px;">';
		html +=  _firsString(data['2000descripcion'].toLowerCase());
		html += '</div>';
		html += '</div>';

		html += '<div class="col-sm-6">';
		html += '<label style="margin-bottom: 0px;">Observaciòn de la clase: </label>';
		html += '<div class="border border-primary rounded" style="padding: 4px;">';
		html += _firsString(data['2000observacion'].toLowerCase());
		html += '</div>';
		html += '</div>';




		html += '<div class="col-md-12">';
		html += '<label style="margin-bottom: 0px;">Falta academica: </label>';


		//aquiiiiiiiiii
		html += faltas;
				  

		html += '</div>';
		html += '</div>';

		html += '</div>';
		return html;
}	


function abrirModalVisualizarInformacionAlumno(){
	$('table tbody td > a').click(function(){

		////recuperar datos para hacer la consulta a la bd
		var rutafoto,nombre,fecha,falta,nodo;
		nodo = $(this).children("input");

		//datos
		rutafoto = nodo.attr("ruta");
		nombre = nodo.attr("nombre");
		fecha = nodo.attr("fecha");
		falta = nodo.attr("falta");
		attrid=nodo.attr("attrid");
		curso=nodo.attr("curso");

		listarFaltasAcademicas(attrid);
		
		$.ajax({
			url:'ajax.php?option=accionesasistencia&acciones=visualizarasistenciapordia',
			method:'POST',
			data:{fecha:fecha, id_usu : attrid},
			beforeSend:function(){
				$('.center-loader').removeClass("ocultar-elemento");
                $('.center-loader').html("<div class='loader fadeInUp'>Loading...</div>");
			},
			success:function(response){
				var rta = JSON.parse(response);
				
				
				if (rta.estado) {
					
					$('#horas_por_clase').html("");
					$('#tab_panel_opciones').html("");
					
					var ht="";
					
					for (var i = 0; i < rta.msg.length; i++) {
						
						ht = "";
						if (rta.msg[i]['2000tarde'] !="") ht +=  faltasAcademicas("warning","El joven ha llegado tarde");
						
						if (rta.msg[i]['2000uniforme'] !="") ht += faltasAcademicas("primary","El joven incumplio con el uniforme");
						
						if (rta.msg[i]['2000falla'] !="") ht += faltasAcademicas("danger","El joven fallo a clase <strong> <a href='#' class='alert-link justificarexcusaalumno'>Justificar excusa.</a></strong>");
						
						if (rta.msg[i]['2000evasion'] !="" ) {ht += faltasAcademicas("info","El joven ha evadido clase");}
						
						
						$('#horas_por_clase').append(htmlLiTag(rta.msg[i]['0018desBloque'] , i));
						$('#tab_panel_opciones').append(htmlBoxTabs(rta.msg[i], i , ht));
						
					}
					
					
					var datAlu = rta.msg[0];
					
					$('#info_nombre').text(nombre);
					$('#info_curso').text(datAlu['0020desCurso']);
					$('#info_curso').text(datAlu['0020desCurso']);
					$('#info_fecha').text(datAlu['2000fecha']);
					$('#img-fot-est').attr("src" , rutafoto);
					
				

					$('#informacionEstudiantePorDia').modal("show");


					$("#horas_por_clase li:first a").addClass("active");
					$("#tab_panel_opciones div:first").addClass("active");





				}else if(!rta.estado){
					$('.msg-alertas-dia-asistencia').html(alertGeneral("warning","flash","warning"," Error! ","Emos encontrao un error en la conexion vuelve a intentarlo " +rta.msg));
				}
				//efectos loader
				$('.center-loader').addClass("ocultar-elemento");
                $('.center-loader').html("");

                $('[name=observacionexcusa]').val("");
                $('#fotexcusa').val("");
                $('.cajavistaprevia').html("");
                $('#frm_caja_justicar_excusa').slideUp();


                $('[name=fecha_inasistencia]').val(fecha);
                $('[name=id_alumno]').val(attrid);
				justificarFallaAlumno();
			}
		});

	});
}


function listarFaltasAcademicas(idusu){
	$.ajax({
		url:'ajax.php?option=accionesasistencia&acciones=faltasacademicasgenerales',
		method:'POST',
		data:{id_usu : idusu},
		beforeSend:function(){

		},
		success:function(response){
		
			var rta = JSON.parse(response);
		
			if (rta.estado) {
				$('#tabla-rta-info-alumno').html(rta.msg);
				totalDeLlamadosAtencionEnElAnio();
			}else if(!rta.estado){
				$('#tabla-rta-info-alumno').html(alertGeneral("warning","flash","warning"," Error ! ","Tuvimos un error con la conexion por favor vuelva a intentarlo"));
			}else{
				$('#tabla-rta-info-alumno').html(alertGeneral("danger","flash","warning"," Error ! ","Tuvimos un error con la conexion por favor vuelva a intentarlo"+rta.msg));
			}
		}	
	});
}

function totalDeLlamadosAtencionEnElAnio(){
	var totFal=0  , totEva=0 , totRet=0 , totUni = 0; 
	$('.count_fal').each(function(i){    totFal += parseInt($(this).text());   	});
	$('.count_eva').each(function(i){    totEva += parseInt($(this).text());   	});
	$('.count_ret').each(function(i){    totRet += parseInt($(this).text());   	});
	$('.count_uni').each(function(i){    totUni += parseInt($(this).text());   	});
	$('#tot-fal').text(totFal);
	$('#tot-eva').text(totEva);
	$('#tot-ret').text(totRet);
	$('#tot-uni').text(totUni);
}


//slider up down de faltas
	
$('#btn-open-faltas').click(function(){
	$('#info_faltas').slideToggle();
	$(this).children("i").toggleClass("fa-angle-down");
	//$(this).children("i").toggleClass("angle-up");
});



