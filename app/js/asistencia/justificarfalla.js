function justificarFallaAlumno(){

    $('.justificarexcusaalumno').click(function(){
        $('#tab_panel_opciones').slideUp();
        $('#frm_caja_justicar_excusa').slideDown();
        $('.btn-subir-informe').addClass("fa fa-long-arrow-up");

    });



    $('#mostrarinfodetagsdehoras').click(function(){
        $(this).parent("div").children("#tab_panel_opciones").slideDown();
        $(this).parent("div").children('#frm_caja_justicar_excusa').slideUp();
        $('.btn-subir-informe').removeClass("fa fa-long-arrow-up");
    });


    $('#frm_envio_justificacion').submit(function(e){
        e.preventDefault();
        var frm = new FormData(document.getElementById("frm_envio_justificacion"));
        $.ajax({
            url:'ajax.php?option=accionesasistencia&acciones=guardarjustificaciondefallas',
            method:'POST',
            data:frm,
            contentType:false,
            processData:false,
            beforeSend:function(){

            },
            success:function(res){
                console.log(res);
                var frm = JSON.parse(res);
                if (frm.estado) {
                    swal("Ok","Los datos se ha guardado correctamente","success");
                    $('[name=rei]').click();
                    $('.cajavistaprevia').html("");
                }else{
                    swal("Advertencia" , "Error con la conexion, vuelva a intentarlo","warning");
                }
            }
        });

        return true;
    });

    $('#fotexcusa').change(function(event) {
        event.preventDefault();
        //nodos
        var cvista = $('.cajavistaprevia');
        cvista.html("");
        var archivos = document.getElementById("fotexcusa").files;
        var navegador = window.URL || window.webKitUrl;

        for (var i = 0; i < archivos.length; i++) {
            var size = archivos[i].size;
            var type = archivos[i].type;
            var name = archivos[i].name;

            if (size > 1024 * 1024) {
                alert("El archivo "+name+" supera 2M tiene que ser menor");
            }else if(type != "image/jpeg" && type != "image/jpg" && type != "image/png"&& type != "image/gif"){
                alert("El archivo "+name+" , no es permitido solo se permite imagenes.");
            }else{
                var ruta = navegador.createObjectURL(archivos[i]);
                cvista.append('<img src="'+ruta+'" alt="'+name+'" width="70" height="70" style="margin:08px 12px">')
            }
        }
    });
}
