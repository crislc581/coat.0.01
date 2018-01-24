$(document).ready(function(){


  /*TOMAR ASISTENCIA DEL CURSO*/
  $('#cursoToma').click(function(){
    var curso_toma = $('#select-curso').val();
    if (curso_toma == null || curso_toma == 0) {
      $('#alerta-curso').modal("show");
    }else{
      // $('.form-group.cursos').removeClass("has-error");
      // $('.form-group.cursos').addClass("has-success")
      $('.form-group.cursos').children("select").removeClass("is-invalid");
       $('.form-group.cursos').children("select").addClass("is-valid");

      $.ajax({
        url:'ajax.php?option=accionesasistencia&acciones=buscarCurso',
        method:'POST',
        data:{curso:curso_toma},
        beforeSend:function(){
          $('.nuevo').html("<tr class='active info fadeInUp'>     <td colspan='6'> <div class='loader fadeIn'>Loading...</div><br></td>   </tr>   ");
        },
        success:function(msg){
          console.log(msg);
          var rta = JSON.parse(msg);
          console.log(rta);
          if (rta.estado) {
            $('.nuevo').html(rta.msg);
          }else if(!rta.estad && rta.msg =="notData"){
            $('.nuevo').html(' <tr class="active info fadeInUp">     <td colspan="6">No hay informacion del curso</td>   </tr>   ');
          }

        }
      });
    }

  });

$('#recargar').click(function(){
  location.reload();
});

$('#aceptar-modal-curso').click(function(){
  $('.form-group.cursos').children("select").addClass("is-invalid");
  $('#select-curso').focus();
});






  /*Tomar asistencia total*/
  $('#tomaFin').click(function()
  {

      var fechaActual=new Date(Date.now());
      var dia=fechaActual.getDay();
      //console.log(dia);
      if(dia == 6 || dia == 7){
        alert("No se puede tomar la asistencia el dia de hoy, solo entre semana es valido");
        return;
      }else{
        //var arr=dia.split("");
         /*Decalramos variables*/
         var tarde=[], uniforme=[], evacion=[], falla=[];
         var materia, bloque, dia, descripClas, observacion,periodo;
         var curso_toma = $('#select-curso').val();

         /*le damos valorea a las variables de multiples vectores*/

         /*TARDE*/
         $('input[name=tar]:checked').each(function(a){
           tarde[a] = $(this).val();
         });

         /*UNIFORME*/
         $('input[name=uni]:checked').each(function(e){
           uniforme[e] = $(this).val();
         });

         /*EVACION*/
         $('input[name=eva]:checked').each(function(i){
           evacion[i] = $(this).val();
         });

         /*FALLA*/
         $('input[name=fal]:checked').each(function(o){
           falla[o] = $(this).val();
         });
         periodo=$("#selectP").val();
         /*optenemos los valores de los selects*/
         /*MATERIA*/
         materia = $('select[id=selectMateria]').val();

         /*BLOQUE*/
         bloque = $('select[id=selectBloque]').val();

         /*DIA*/
         dia = $('input[name="dia"]').val();

         /*DEXCRIPCION DE LA CLASE*/
         descripClas =$('textarea[id=descripcionClase]').val();

         /*BSERVACION*/
         observacion =$('textarea[id=observacion]').val();

         var mensaje5='<br><div class="alert alert-danger">';
         mensaje5 += '<a href="#" data-dismiss="alert" class="close">&times;</a>';
         mensaje5 += '<strong><i class="glyphicon glyphicon-alert"></i> Alerta! </strong>';
         mensaje5 += 'Verifique bien los campos que te hacen falta.';
         mensaje5 += '</div>';

         /*Comprobamos si estan vacias los valores*/

         var ima, iblo,ides,iobs;
         ima =$('.form-group.materia select');
         iblo =$('.form-group.bloque select');
         if (curso_toma == null || curso_toma == 0)
         {
            $('#alerta-curso').modal('show');
         }else
         {

           $('.form-group.cursos').children("select").removeClass("is-invalid");
            $('.form-group.cursos').children("select").addClass("is-valid");
            // $('.form-group.cursos').removeClass("has-error");
            // $('.form-group.cursos').addClass("has-success");
            if (materia == null || materia == 0)
            {
              ima.addClass(' is-invalid');
              $('select#selectMateria').focus();
              $('.alerta-toma').html(mensaje5);
            }else
            {
             ima.removeClass('is-invalid');
             ima.addClass('is-valid');

             if (bloque == null || bloque == 0)
             {
               iblo.addClass(' is-invalid');
               $('select#selectBloque').focus();
               $('.alerta-toma').html(mensaje5);
             }else
             {
               iblo.removeClass('is-invalid');
               iblo.addClass('is-valid');

                 /*Correcto*/

                 /*AJAX*/

                 $.ajax({
                   url:'ajax.php?option=accionesasistencia&acciones=actualizarAsistencia',
                   method:'POST',
                   data:{tarde:tarde, uniforme:uniforme, evacion:evacion, falla:falla, materia:materia, bloque:bloque, dia:dia, descripClas:descripClas, observacion: observacion,curso:curso_toma,per:periodo},
                   beforeSend:function(){
                    $('.center-loader').removeClass("ocultar-elemento");

                    $('.center-loader').html("<div class='loader fadeInUp'>Loading...</div><br>");

                   }
                   ,
                   success:function(msg){
                    // efectos de loader
                    console.log(msg);
                    $('.center-loader').addClass("ocultar-elemento");
                    $('.center-loader').html("");

                      //nodo
                    var res = document.querySelector(".alerta-toma");

                    /*valores pero no id de los selects*/
                    var nc,i,nb,j;
                    nc = document.getElementById("select-curso");
                    nb = document.getElementById("selectBloque");
                    i = nc.selectedIndex;
                    j = nb.selectedIndex;
                    nc = nc.options[i].text;
                    nb = nb.options[j].text;

                    // i = nc.selectedIndex;
                    // nc = nc.option[i].text;

                    // j = nb.selectedIndex;
                    // nb = nb.option[j].text;
                    // console.log(cursoo+"   "+horass);



                    var rta = JSON.parse(msg);
                    console.log(msg);
                    console.log(rta);
                    if (!rta.estado && rta.msg == "repitBloqueCurso") {
                      /*El curso ya se le ha tomado la asistencia*/
                      res.innerHTML ="<br>"+alertGeneral("warning","flash","view", "  Nota!  ","Al curso <strong>"+nc+ "</strong>, ya se ha tomado la asistencia de la hora <strong>"+nb+"</strong>, seleccione otro curso curso u otro hora para hacer el registro de los estudiantes.");
                    }else if(rta.estado){
                      res.innerHTML ="<br>"+alertGeneral("success","shake","check", "  Ok!  ","Se han guardado los datos correctamente, para mas informacion de los guardados por los estudiantes, has click asistencia / historial.");

                    }else if((!rta.estado && rta.msg=="errorDetalles") || (!rta.estado && rta.msg=="errorSemana")){
                      res.innerHTML ="<br>"+alertGeneral("danger","shake","warning", "  Error!  ","Al paracer tuvimos un problema con la conexion, volvamos ha intentarlo por favor.");
                    }else if(!rta.estado){
                      res.innerHTML ="<br>"+alertGeneral("danger","shake","times", "  Error!  ","Al paracer tuvimos un problema con la conexion, "+rta.msg);
                    }


                     // if (msg == 1) { /*SE HA TOMADO LA ASISTEMNCIA CORRECTRAMENTE*/
                     //   $('#continuaAsistencia').modal('show');
                     // }else{
                     //   if (msg==3) { El bloque para tomar la asietncia ya esta tomada VALIDACION CON LA TABLA DETALLES ASITENCIA
                     //     $('#cursoRepeti').modal('show');
                     //   }else{
                     //     console.log(msg);
                     //    //  $('.alerta-toma').html(msg);
                     //     alert(msg);
                     //   }
                     // }
                   }
                 });

             }
          }

         }
      }
  });

});
