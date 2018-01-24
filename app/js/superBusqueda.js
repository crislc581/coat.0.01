
$(document).ready(function(){

  document.querySelector(".buscarestudiante").focus();
  $("#buscaro").click(function(e){
    e.preventDefault();
    var dato=document.querySelector(".buscarestudiante").value;
    if(dato.length==0){
      document.querySelector(".rta-busqueda").innerHTML=alertGeneral("info","fadeIn","warning","Alerta","El campo no puede estar vacío");
    }else{
      $.ajax({
        url:'ajax.php?option=buscarestudiante&accion=buscar',
        type:'post',
        data:{datos:dato},
        beforeSend:function(){
          document.querySelector(".rta-busqueda").innerHTML="<div class='loader fadeIn'>Loading...</div><br>";
        },
        success:function(data){
          document.querySelector(".rta-busqueda").innerHTML="";
          if(data==1){
              document.querySelector(".rta-busqueda").innerHTML=alertGeneral("info","fadeIn","warning","Alerta","No hay datos de esta persona");
              document.querySelector(".buscarestudiante").focus();
          }else{
            document.querySelector(".rta-busqueda").innerHTML=data;
          }

        }

      });
    }
  });
});


function vistaObservador(id){
 
  $('#rta-vista-observador').html("");
  $.ajax({
    url:'ajax.php?option=buscarestudiante&accion=getObservador',
    method:'post',
    data:{idusuario:id},
    beforeSend:function(){
      $('#rta-vista-observador').html("<div class='loader fadeIn'>Loading...</div><br>");
    },
    success:function(msg){
      $('#rta-vista-observador').html(msg);
    }
  });
}




function interfazdatosobservador(){


//cuando click en el botonde asignarle una nuevafecha para la citacion para el muchacho

  $('.btn-guardar-fecha-citacion').click(function(){
  $('#modal_horario_profesor').modal("hide");
  $('body').removeClass('modal-open');
  $("[name='fechacitacion']").val($('#fet_cita').val());
  $('#modal-caramelo').modal("show");
});






/*cortar palabras de carmelos*/

$('.btn-cancelar-horario').click(function(e){
  e.preventDefault();
  $('#modal_horario_profesor').modal("hide");
  $('body').removeClass('modal-open');
  $('.frmcaramelodesenfocar').modal("show");
  $("[name='fechacitacion']").val("0000/00/00");
});

var text = document.querySelectorAll('.info_cara');

 

  var ven = $('.view-formulario .panel');
  ven.hide();
  $('#btn-info-padres').click(function(){
    $('.view-formulario #iconos').toggleClass("fa-minus");
    ven.slideToggle();
  });
  $('#total-llamados').hide();
  $('#click_total_atencion').click(function(e){
    e.preventDefault();
    // alert("Dio click");
    $('#total-llamados').slideToggle();
  });

  // validaciones caramelo
  // validarCaramelo();

  //$('#citar_acudiente_opcion').hide();


    /**
    *Efecto para desenfecar la modal del formualrio de llamados de atencion (caramelo)
    */
    $('.bt-cerrar-horarios').click(function(e){
       e.preventDefault();
      $('#modal_horario_profesor').modal("hide");
      $('body').removeClass('modal-open');
      $('.frmcaramelodesenfocar').modal("show");
      $("[name='fechacitacion']").val("0000/00/00");
    });

  // funcion click de registrar
  $('#btn-add-caramelo').click(function(e){
    e.preventDefault();
    var ci = 0;
    $('[name="motivo"] , [name="descargo"] , [name="estrategia"] ,  [name="clave_instructor"],[name="clave_alumno"] ,[name="tipo"] , [name="fechacitacion"] ,  [name="c_acudiente"]').each(function(i){
      var na = $(this).attr("name");
      var f = validarDataCaramelo(na);
      if(f == false){ci++;}
    });

    if (ci > 0) {
      $('#rta-ajax-reg-caramelo').fadeIn();
      document.getElementById("rta-ajax-reg-caramelo").innerHTML= alertGeneral("warning","zoomInUp","warning","  Alerta!","Todos los campos deben ser requeridos");
      setTimeout(function(){ $('#rta-ajax-reg-caramelo').fadeOut(function(){$(this).html(""); }); },5000);
      // alert("Todos los campos deben ser requeridos");

    }else{
      var frm = $('#frm-caramelo-add').serialize();
      // alert(frm);
      $.ajax({
        url:'ajax.php?option=buscarestudiante&accion=registrarcaramelo',
        type:'POST',
        data:frm,
        beforeSend:function(){
          document.getElementById("rta-ajax-claves").innerHTML= "<div class='loader fadeIn'>Loading...</div><br>";
        },
        success:function(msg){
          document.getElementById("rta-ajax-claves").innerHTML= "";

          // alert(msg);

          var rta = JSON.parse(msg);
          $('#rta-ajax-reg-caramelo').fadeIn();
          $('#rta-ajax-claves').fadeIn();
          if (rta.estado==true) {
            $('#modal-caramelo').modal("hide");
            $('#modal_horario_profesor').css({
              display:"none"
            });
            $('#modal_horario_profesor').modal("hide");

            $('#modal_horario_profesor').hide();
            $('body').removeClass('modal-open');
            document.getElementById("rta-ajax-reg-caramelo").innerHTML= alertGeneral("success","zoomInUp","checked","  OK!","Se han guardado los datos correctamente. ");
            
            setTimeout(function(){ $('#rta-ajax-reg-caramelo').fadeOut(function(){$(this).html(""); });
            },8000);

            document.getElementById('frm-caramelo-add').reset();
            limpiarFormularioCaramelo();
            //$('#citar_acudiente_opcion').hide();

            $('#total-llamados').html("");
            $('#total-llamados').html(rta.msg);
            $('#tot_llamados').html(rta.total);



          }else if(rta.estado==false && rta.msg == "pass_incorrec_alu"){
            document.getElementById("rta-ajax-claves").innerHTML= alertGeneral("warning","zoomInUp","times","  Alerta!","La clave del alumno es incorrecta. ");
            $('[name="clave_alumno"]').focus();
            setTimeout(function(){ $('#rta-ajax-claves').fadeOut(function(){$(this).html(""); }); },8000);
          }else if(rta.estado==false && rta.msg == "pass_incorrec_ins"){
            document.getElementById("rta-ajax-claves").innerHTML= alertGeneral("warning","zoomInUp","times","  Alerta!","La clave del instructor es incorrecta. ");
            $('[name="clave_instructor"]').focus();
            setTimeout(function(){ $('#rta-ajax-claves').fadeOut(function(){$(this).html(""); }); },8000);
          }else{
            document.getElementById("rta-ajax-reg-caramelo").innerHTML= alertGeneral("danger","zoomInUp","times","  Alerta!","Hubo una fallo en el sistema vuelva a intentarlo,  "+rta.msg);
            setTimeout(function(){ $('#rta-ajax-reg-caramelo').fadeOut(function(){$(this).html(""); }); },8000);

          }
        }
      });
    }


  });


  $('[name="motivo"] , [name="descargo"] , [name="estrategia"] ,  [name="clave_instructor"],[name="clave_alumno"] ').keyup(function(){
    var nam = $(this).attr("name");
    validarDataCaramelo(nam);
  });

  $('[name="tipo"] , [name="fechacitacion"], [name="c_acudiente"]').change(function(){
    var nam = $(this).attr("name");
    // alert(-$(this).val());
    validarDataCaramelo(nam);
    
  });




}
// fin interfaz caramelo




//valiDr CAMPOS FRM caramelo
function validarDataCaramelo(id){
  var valo = $('[name="'+id+'"]');
  valor=valo.val();
  if (id == "motivo" || id == "descargo" || id == "estrategia" || id == "clave_instructor" || id == "clave_alumno"  ) {
    if (valor == ""  || /^\s+$/.test(valor)  || valor.length == 0 ) {
      valo.removeClass("is-valid");
      valo.addClass("is-invalid");
      return false;
    }else{
      valo.addClass("is-valid");
      valo.removeClass("is-invalid");
      return true;
    }
  }

  if (id == "tipo") {
    var ra = document.getElementsByName("tipo");
    var rta = false;
    for (var i = 0; i < ra.length; i++) {
      if (ra[i].checked) {
        rta = true;
        break;
      }
    }

    rta = rta == true ? true : false;
    return rta;
  }

  if (id == 'c_acudiente') {
    var v = document.getElementsByName('c_acudiente');
    var r = false;
    for (var i = 0; i < 2; i++) {
      if (v[i].checked) {
        r = true;
        var vv = v[i].value;
        if (vv == "si") {
          $('.frmcaramelodesenfocar').modal("hide");
          $('#modal_horario_profesor').modal("show");

          //$('#citar_acudiente_opcion').fadeIn();
          $('#fet_cita').focus();
          $('.fixed-nav.sticky-footer').addClass('modal-open');
          
        }else if(vv == "no"){

        //  $('.frmcaramelodesenfocar').modal("show");
          //$('#modal_horario_profesor').modal("hide");
          
          //$('#citar_acudiente_opcion').fadeOut();
          $('#fet_cita').val("");
          document.querySelector('[name="fechacitacion"]').value="0000/00/00";
        }
        break;
      }
    }

    r = (r == true) ? true : false;
    return r;
  }



}
/*Limpiar formulario de caramelo*/
function limpiarFormularioCaramelo(){
  //limpiamos campos del formulario
  $('[name="motivo"] , [name="descargo"] , [name="estrategia"] ,  [name="clave_instructor"],[name="clave_alumno"]  , [name="fechacitacion"]').each(function(i){
    $(this).val("");
    // $(this).val(NULL);
    $(this).removeClass("is-valid");
    $(this).removeClass("is-invalid");
  });


}
/*actualizar informacion de llamados de atencion o caramelo*/
function informacionLlamdoAtencion(id_alu,estado){
    // var cone = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    var frm = "id_caramelo="+id_alu+"&esta="+estado;

    $.ajax({
      url:'ajax.php?option=buscarestudiante&accion=obtenerdatacaramelo',
      type:'post',
      data:frm,
      beforeSend:function(){

      },
      success:function(dts){
        console.log(dts);
        var dt = JSON.parse(dts);
        var mot=dt.msg[1];
        var feCita=dt.msg[9];
        var desc=dt.msg[2];
        var falta=dt.msg['3002faltaAlManual'];
        var citado=dt.msg[12];
        var fecha=dt.msg[5];
        var estrate=dt.msg[4];
        var asist=dt.msg["3002asistio"];
        document.getElementById("ic_fecha").innerHTML=feCita;
        document.getElementById("ic_motivo").innerHTML=mot;
        document.getElementById("ic_descargo").innerHTML=desc;
        document.getElementById("ic_estrategia").innerHTML=estrate;
        document.getElementById("ic_citado").innerHTML=citado;
        document.getElementById("ic_fecitacion").innerHTML=_firsString(fecha);
        document.getElementById("ic_asipadre").innerHTML=_firsString(asist);





      }
    });
    // cone.onreadystatechange = function(){
    //   if (cone.readyState == 4 && cone.status == 200) {
    //     var ms = cone.responseText;
    //
    //     var msg = JSON.parse(ms);
    //     if (msg.estado == true) {
    //       document.getElementById("").innerHTML = msg.msg;
    //     }else if(msg.estado ==false){
    //       document.getElementById("").innerHTML = msg.msg;
    //     }else{
    //       alert(ms);
    //     }
    //   }else if(cone.readyState != 4){
    //     /*Cargando*/
    //   }
    // }
    //
    // cone.open("POST","ajax.php?option=buscarestudiante&accion=obtenerdatacaramelo",true);
    // con.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    // con.send(frm);
}

  // $('#btn-info-padres').click(function(){
  //
  //   $(".view-formulario .panel").slideToggle();
  // });


document.getElementsByName("c_acudiente").onchange=function(){
var ele=document.getElementsByName("c_acudiente").value;
  
  if(ele=="si"){

  }else{
    document.getElementsByName("fechacitacion").value="0000/00/00";
  }
}