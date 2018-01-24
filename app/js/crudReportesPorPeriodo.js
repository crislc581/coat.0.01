//Variables Globales
let _URL ="ajax.php?option=accionesReportes&opcion=";


//Funciones



//Jquery
$(document).ready(function() {
	
});

//Hacer click para mostrar dialogo de nuevo archivo, mostramos en div
$('#showLoadFileCvs').click(function(e){
  e.preventDefault();

  $(this).addClass("disabled");
  $('#newUsuario').addClass('disabled');

  $("#boxFrmLoadCvs").fadeIn(500);
});

//Cancelar subida de archivo scv
$('#btnHideBoxFrmLoadCvs').click(function(e){
  e.preventDefault();
  $("#showLoadFileCvs").removeClass("disabled");
  $('#newUsuario').removeClass('disabled');
  $("#boxFrmLoadCvs").hide(500);
  document.getElementById("frmLoadSvc").reset();
});

//Evento que activo auando hay un cambio en el archivo
$('#fileDirective').change(function(event) {
  var ele = $("#rta_ajax_info");
  var archivo = document.getElementById("fileDirective").files;
  var navegador = window.URL || window.webKitURL;
  archivo = archivo[0];  

  if (archivo.type != "text/csv") {
    $('#btnSaveSvcFile').attr( "disabled","" );
    ele.html(alertGeneral("warning","flash","warning","  Advertencia!  ","Deve seleccionar un documento <strong>csv </strong>de lo alcontrario no se podra importar la informacion."));
  }else{
     ele.html("");
    var valor = $(this).val();
    if(valor == "" || valor ==null || valor.length == 0){
      ele.html(alertGeneral("warning","flash","warning","  Advertencia!  ","Seleccione un documento, con la estencion csv."));
    }else{
         $('#btnSaveSvcFile').removeAttr("disabled");
         //var url = navegador.createObjectURL(d);
         //url = navegador.createObjectURL( file[i] );
         ele.html("");
         $('#btnSaveSvcFile').focus();
    }
  }
});


//Cuando se envia la informacion al servidor
$('#frmLoadSvc').submit(function(e){
  var ele = $("#rta_ajax_info");
  e.preventDefault();
  let datos = new FormData(document.getElementById('frmLoadSvc'));
  $.ajax({
    url: `${_URL}sevaFileCvs`,
    type: 'post',
    data: datos,
    contentType: false,
    processData: false,
    beforeSend:function(){
      ele.html("Cargando ...");
    },
    success:function(msg){
      console.log( "Aca " ,msg );
      console.log( JSON.parse( msg )  );

     let rta = JSON.parse( msg );

     switch (rta.estado) {

      case 'notDoc':
          let message = ` DESCRIPCION DEL LOS REGISTROS `;
            message += `Los siguientes numeros de documento no se encuentran en el sistema. \n`;
            for(let f=0; f < rta.msg.length; f++ ) {
              message +=  `  - De ${rta.msg[f].nombre}, numero no encontrado ${rta.msg[f].documento}\n`;
            }

           swal( "Advertencia\nError al encontrar el documento", message,"warning" );
         break;

      case 'dataExist':
        
         message1 = `\n DESCRIPCION DE LOS REGISTROS EXISTENTES \n\n`;
         for(let f=0; f < rta.msg.length; f++ ) {
              message1 += `  - El estudiante ${rta.msg[f]}, ya se le hizo este proceso\n`;
            }

         swal( "Advertencia\nRegistros existentes", message1,"warning" );
         break;

      case 'malEscrito':
         let message2 = `\n DESCRIPCION DEL CURSO \n`;
            for(let f=0; f < rta.msg.errCurso.length; f++ ) {
              message2 += `  - De ${rta.msg.errCurso[f].nombre}, en '${rta.msg.errCurso[f].data}' \n`;
            }
         message2 += `\n DESCRIPCION DEL PERIODO \n`;
         for(let f=0; f < rta.msg.errPeriodo.length; f++ ) {
              message2 += `  - De ${rta.msg.errPeriodo[f].nombre}, en '${rta.msg.errPeriodo[f].data}' \n`;
            }

         swal( "Advertencia\nSe han encontrado los siguientes errores", message2,"warning" );
         break;

      case 'notRows':
         swal( "Advertencia", rta.msg ,"warning" );
         break;

      case 'notColumns':
         swal( "Advertencia", rta.msg ,"warning" );
         break;

      case 'notType':
         swal( "Advertencia", rta.msg ,"warning" );
         break;

      case 'empty':
         swal( "Advertencia", rta.msg ,"warning" );
         break;

       case 'error':
         swal( "Advertencia","Se ha perdido la conexion, vuelva a intentarlo "+ rta.msg,"danger" );
         break;
      case true:
        swal( "Ok","La informacion se ha guardado correctamente","success" );
        document.getElementById('frmLoadSvc').reset();
        $('#btnHideBoxFrmLoadCvs').click();
        break;
       default:
          swal( "Advertencia","Se ha perdido la conexion, vuelva a intentarlo "+ rta.msg,"danger" );
         break;
     }
    }
  });
  return true;
});