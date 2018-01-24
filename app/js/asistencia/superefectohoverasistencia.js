function hoverAsistenciaSemana(){

	$(document).ready(function(){
		abrirModalVisualizarInformacionAlumno();
		if ($(document).width() > 576 ) {
			$('table tbody td > a').hover(
			function(){ //entra
				var rutafoto,nombre,fecha,falta,nodo;
				nodo = $(this).children("input");

				//datos
				rutafoto = nodo.attr("ruta");
				nombre = nodo.attr("nombre");
				fecha = nodo.attr("fecha");
				falta = nodo.attr("falta");
				attrid=nodo.attr("attrid");
				curso=nodo.attr("curso");
				//console.log(rutafoto);

				/*var html = '<div class="cajathumnail">';
					html +=	    '<img src="'+rutafoto+'" alt="'+nombre+'" height="80" width="80">';
					html +=	    '<div style="width:98px;">';
					html +=	      '<span><strong>'+nombre+'</strong></span>';
					html +=	      '<span style="font-size:12px;color:gray">'+fecha+'</span>';
					html +=	      '<hr>';
					html +=	      '<span style="color:gray; float: right;">'+falta+'</span>';
					html +=	   '</div>';
					html += '</div>';*/

					html = '<div class="cajathumnail">';
					html += '<div class="row">';
					html += '<div class="col-sm-4">';
					html += '<img  src="'+rutafoto+'" alt="'+nombre+'"  height="100%" width="100%">';
					html += '</div>';
					html += '<div class="col-sm-8">';
					html += '<span><strong>'+nombre+'</strong></span>';
					html += '';
					html += '<span class="fechatu" style="font-size:12px;color:gray">'+fecha+'</span>';
					html += '';
					html += '<span style="color:gray; float: right;">'+falta+'</span></div>';
					html += '</div>';
					html += '</div>';


			  	nodo.parent().parent("td").append(html);
			},

			function(){ //sale
			  $('.cajathumnail').remove();
			}
			);
		}	
	});
}


 
