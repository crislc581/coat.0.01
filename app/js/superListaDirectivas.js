
let _URL ="ajax.php?option=accionesdirectivas&acciones=";

(function(){

  loadData();
  showModalNewData();

})();

$("#frmDataDirectivas").submit(function(e){
  e.preventDefault();
  let url=null;

  if($(this).attr("action") == "update" ){
    url = 'updateDirectivas';
  }else{
    url = 'newDirectiva';
  }
  var frm = $('form#frmDataDirectivas').serialize();
  //Ajax
   console.log(`${_URL}${url}`);
  $.ajax({
    url:`${_URL}${url}`,
    type:'post',
    data:frm,
    beforeSend:function(){
      //document.querySelector(".datosT").innerHTML="cargando...";
    },
    success:function(response){
      console.log(response);
      
      let data = JSON.parse(response);
      console.log(data);

      //validacion al agregar nuevo directiva
      if( data.estado &&  data.msg == 9 ){  //El documento ya existe
        $('[name="documento"]').focus();
        swal("Advertencia","El documento que intenta registrar ya existe, intentelo nuevamente","warning");
      }else if(data.estado && data.msg ){
        loadData();
        reiniciarFrmMoldal();
        swal("OK","Los datos se han guardado correctamente","success");
      } else if(!data.estado && !data.msg){
        swal("Advertencia","Hubo un problema con la conexión , vuelva a intentarlo.","warning");
      }else if( !data.estado || data.estado ==null ){
        swal("Advertencia","Hubo un problema con la conexión , vuelva a intentarlo, o comuníquese con un soporte del software al número 3114573204, "+data.msg,"warning");
      }else{
        swal("Advertencia","Hubo un problema con la conexión , vuelva a intentarlo, o comuníquese con un soporte del software al número 3114573204, "+data.msg,"warning");
      }
    }

  });
  //fin Ajax
  return true;
});


function reiniciarFrmMoldal(){
  $('#modalFrmData').modal("hide");
  $("#limpiarFrm").click();
  $('#frmDataDirectivas').attr("action","nuevaDirectiva");
}

function showModalNewData(){
  $('#newUsuario').click(function(event) {
    event.preventDefault();
    reiniciarFrmMoldal();
    $('#frmDataDirectivas').attr("action","nuevaDirectiva");
  });
}

function loadData(){
  try {
    // statements
    var respon = null;
        $.ajax({
        url:`${_URL}listardirectivas`,
        type:'post',
        data:{id:0},
        beforeSend:function(){
          document.querySelector(".datosT").innerHTML="cargando...";
        },
        success:function(response){
          console.log( response);
          respon = response;
          let status = JSON.parse( response );
          if( status.estado && status.msg != ""){
              document.querySelector(".datosT").innerHTML=status.msg;
              onclickEditData();
          }else{
              swal("Nota","No hay registros en el sistema" , "success");
          }
        }
      });
  } catch(e) {
    // statements
    swal("Advertencia","Emos tenido un error de conexion vuelva cargar la pagina, si quieres mas ayuda contacte soporte tecnico 314 855 47 26.\n  "+  respon +" \n"+e.message , "warning");
  }
}

function  onclickEditData(){
  /**
   * Event btn editar get data
   */
  $('a.btn-edit').click(function(e){
    e.preventDefault();

    $("#frmDataDirectivas").attr("action","update");

    let dataObjetUser = JSON.parse( $(this).attr("data") );
  
    //Seteamos todos los campos
    $('[name="idDirectiva"]').val(dataObjetUser['008id']);
    $('[name="tipoDocumento"]').val(dataObjetUser['0019id']);
    $('[name="documento"]').val(dataObjetUser['008documento']);
    $('[name="nombre"]').val(dataObjetUser['008nombres']);
    $('[name="apellido"]').val(dataObjetUser['008apellidos']);
    $('[name="direccion"]').val(dataObjetUser['008direccion']);
    $('[name="email"]').val(dataObjetUser['008email']);
    $('[name="celular"]').val(dataObjetUser['008celular']);
    $('[name="tel"]').val(dataObjetUser['008telFijo']);
    $('[name="fechaNacimiento"]').val(dataObjetUser['008fecNacimiento']);
    $('[name="genero"]').val(dataObjetUser['008genero']);
    $('[name="estadoCivil"]').val(dataObjetUser['008estaCivil']);
    $('[name="eps"]').val(dataObjetUser['008eps']);
    $('[name="jornada"]').val(dataObjetUser['008jornada']);
    //barrio
    let nodoHtmlOption = `<option selected="" value="${dataObjetUser['0010id']}"> ${dataObjetUser['0010desBarrio']} </option>`;
    $('[name="barrio"]').html( nodoHtmlOption );
    $('[name="barrio"]').val(dataObjetUser['0010id']);
    $('[name="rol"]').val(dataObjetUser['008rol']);

    $('[name="nombreAcu"]').val(dataObjetUser['008nomAcu']);
    $('[name="apellidoAcu"]').val(dataObjetUser['008apelAcu']);
    $('[name="celularAcu"]').val(dataObjetUser['008celAcu']);
    $('[name="telAcu"]').val(dataObjetUser['008fijoAcu']);
    

  });


  $('a.btn-remove').click(function(e){
    e.preventDefault();
    let object = JSON.parse( $(this).attr("data") );
    console.log(object);
    swal({
      title: `Desea eliminar a ${ object['nombres'] }?`,
      text: "Recuerde que una vez eliminados no se podra recuperar la información !",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Si, deseo eliminarlo!",
      closeOnConfirm: false
    },
    function(){
      $.ajax({
        url:`${_URL}deleteDirective`,
        type:'post',
        data:{ idDirective: object['008id'] , documento: object['documento']  } ,
        beforeSend:function(){
          //document.querySelector(".datosT").innerHTML="cargando...";
        },
        success:function(response1){
      
          console.log(response1);
          response = JSON.parse(response1);
          console.log(response);
          if(response.estado){
            loadData();
            swal("Ok!", "Se ha eliminado correctamente", "success");
          }else if(!response.estado){
             swal("Advertencia","Hubo un problema con la conexión , vuelva a intentarlo, o comuníquese con un soporte del software al número 3114573204, "+response.msg,"warning");

          }
        }
      });
    });

  });
}

/*function saveInfoDetail(){
  $('#saveInfoDetail').click(e=>{
    e.preventDefault();

    html2canvas(document.body, {
    onrendered (canvas) {
      var link = document.getElementById('saveInfoDetail');;
      var image = canvas.toDataURL();
      link.href = image;
      link.download = 'Informacion de errores.png';
    }
   });
  });
}*/

$('#showLoadFileCvs').click(function(e){
  e.preventDefault();

  $(this).addClass("disabled");
  $('#newUsuario').addClass('disabled');

  $("#boxFrmLoadCvs").fadeIn(500);
});

$('#btnHideBoxFrmLoadCvs').click(function(e){
  e.preventDefault();
  $("#showLoadFileCvs").removeClass("disabled");
  $('#newUsuario').removeClass('disabled');
  $("#boxFrmLoadCvs").hide(500);
  document.getElementById("frmLoadSvc").reset();
});

//cuando haya un acabio en el archivo, validar si es un archivo csv

$('#fileDirective').change(function(event) {
  console.log("Huvo un cambio") ;
  var ele = $("#rta_ajax_info");
  var archivo = document.getElementById("fileDirective").files;
  var navegador = window.URL || window.webKitURL;
  archivo = archivo[0];  
  console.log( $(this).val() );
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

      //Validamos los formularios de errores hasta al final, en pocas palabras en la parte de abajo esta el exito
      if(!rta.estado && rta.msg == "fileIncorrect"){
        swal( "Advertencia","El tipo de archivo seleccionado no es valido, asegurece de que la extención del archivo sea csv, vuela a seleccionar otro archivo","warning" );
      }else if(!rta.estado && rta.msg=="notColumns"){
        swal( "Advertencia","El numero de columnas del archivo no es valido, reptifique queel numero de columnas sea igual al material de apoyo que se encuntre en la ejemplo de arriba","warning" );
      }else if( rta.estado=="errorCampus"){
        info = rta.msg;
        let msg = `
          Total de errores en el documento \n
           Genero: ${ info.errGenero }.
           Estado civil: ${ info.errEstadoCivil }.
           Eps: ${ info.errEps }.
           Barrio: ${ info.errBarrio }.
           Jornada: ${ info.errJornada }.
           Rol: ${ info.errRol }.
           Tipo documento: ${ info.errTipoDocumento }.
        `;
        swal( "Se han encontrado errores al subir el archivo","Verifique los registros que esten bien deligenciados.\n" + msg ,"warning" );
      }else if( rta.estado == "dataExist"){   // la informacion entra aca
        let dat = rta.msg; 
          swal({
            title: "Advertencia",
            text: "Se han encontrado registros existentes en el sistema, elimine los registros repetidos",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Ver detalles de los registros existentes",
            cancelButtonText: "Cerrar",
            closeOnConfirm: false,
            confirmButtonClass: "btn-danger"
          },
          function() {
              let msgs = "CORREOS EXISTENTES  \n\n";
              console.log( "La informacion que necesito", dat );
                for( let i=0; i < dat.errroCorreo.length ; i++ ){
                //for( let i=0; i < dat.correo.data.length ; i++ ){
                 // msgs +=  dat.correo.data['008email'] + "  \n";
                  msgs += "* De " + dat.errroCorreo[i]['008nombres'] +":   "+  dat.errroCorreo[i]['008email'] + "  \n";
                }

              msgs += "\n DOCUMENTOS EXISTENTES \n\n";

                for( let i=0; i < dat.errorDocumento.length; i++ ){
                //for( let i=0; i < dat.correo.data.length; i++ ){
                  //msgs +=  dat.documento.data['008documento'] + "  \n";
                  msgs +="* De "+ dat.errroCorreo[i]['008nombres'] +":   "+  dat.errorDocumento[i]['008documento'] + "  \n";
                }
              swal("Detalles", msgs , "info");
              //let button = '<a href="#" id="saveInfoDetail" class="btn btn-info btn-sm"> <i class="fa fa-save"></i> Guardar información</a>';
             // $('.sa-button-container .sa-confirm-button-container').append(button);

              //saveInfoDetail();
          });
      }else if(rta.estado == "dataBdExistDoc"){
        let dat =rta.msg; 
          swal({
            title: "Advertencia",
            text: "Se han encontrado registros existentes en el sistema, elimine los registros repetidos",
            type: " ",
            showCancelButton: true,
            confirmButtonText: "Ver detalles de los registros existentes",
            cancelButtonText: "Cerrar",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm) {
            if (isConfirm) {  
              console.log(dat);
              msgs = "Documentos repetidos";
                if(dat.length != 0){
                    //for( let i of dat){
                      //msgs +="De " i['008documento']+":  " + i['008documento'] + "  \n";
                    //}
                }
              swal("Detalles", msgs , "info");
            }else{
              swal("Ok");
            }
          });
      }else if(rta.estado && rta.msg){
        swal( "Ok","Se ha subido correctamente","success" );
        loadData();
        $('#btnHideBoxFrmLoadCvs').click();
      }else if (!rta.estado){
        swal( "Advertencia","Se ha perdido la conexion, vuelva a intentarlo "+ rta.msg,"warning" );
      }else{
        swal( "Advertencia","Se ha perdido la conexion, vuelva a intentarlo "+ rta.msg,"warning" );
      }
    }
  });
  return true;
});



