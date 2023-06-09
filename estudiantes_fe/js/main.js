$(document).ready(function() {
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/index'
    }).done(estudiantes => {
        const table = $('#estudiantes');
        let html = '';
        estudiantes.forEach(estudiante => {
            html +='<tr>';
            html +='    <td>'+ estudiante.codigo +'</td>';
            html +='    <td>'+ estudiante.nombres+ '</td>';
            html +='    <td>'+ estudiante.apellidos+ '</td>';
            html +='    <td>';
            html +='       <button type="button" onclick="obtenerNotas(' + estudiante.codigo + ');">Notas</button>';
            html +='       <button type="button" onclick="eliminarEstudiante(' + estudiante.codigo + ');">Eliminar</button>';
            html +='   </td>';
            html +='</tr>';
        });
        table.append(html);
    }).fail((error)=>{
        console.error(error);
    });   
});

function obtenerNotas(codigoEstudiante) {
    $.ajax({
        url:'http://localhost:8000/actividades/' + codigoEstudiante,
        method: 'get',
    }).done(notas => {
        const notesTable = $('#notas');
        let sumatoria = 0;
        let html = '';
        notesTable.html(html);
        if (notas && notas.length > 0) {
            notas.forEach(nota => {
                html +='<tr>';
                html +='    <td>'+ nota.id +'</td>';
                html +='    <td>'+ nota.codigoEstudiante+ '</td>';
                html +='    <td>'+ nota.descripcion+ '</td>';
                html +='    <td>'+ nota.nota+ '</td>';
                html +='    <td>';
                html +='       <button onclick="mostrarFormularioNotas(' + nota.codigoEstudiante + ',' + nota.id+ ');">Modificar</button>';
                html +='       <button onclick="eliminarNota(' + nota.id + ');">Eliminar</button>';
                html +='   </td>';
                html +='</tr>';
                sumatoria += +nota.nota;
            });
            const promedio = sumatoria/notas.length;
            const clase = promedio >= 3 ? 'aprobado' : 'reprobado'; // operador ternario
            html +='<tr>';
            html +='    <td>Promedio</td>';
            html +='    <td>'+ promedio +'</td>';
            html +='    <td class="nota ' + clase + '">' + clase +'</td>';
            html +='</tr>';
            html +='<tr>';
            html +='    <td>';
            html +='        <button type="button" onclick="mostrarFormulario('+ codigoEstudiante +');">Crear nota</button>';
            html +='    </td>';
            html +='</tr>';
        } else {
            alert('El estudiante no cuenta con notas');
            html += '<button type="button" onclick="mostrarFormulario('+ codigoEstudiante +');">Crear nota</button>';
        }
        notesTable.append(html);
        $('.info-notas').css('display', 'block');
    }).fail(error => {
        console.error(error);		
    }); 
}

function mostrarFormulario(codigo){
    if (!codigo) {
        const formulario = $('#formulario'); 
        let html = '';
        formulario.html(html);
        html +='    <h1>Crear Estudiante</h1>';
        html +='    <label><span>Codigo</span></label>';
        html +='    <input type="text" name="codigo" id="codigo">';
        html +='    <hr>';
        html +='    <label><span>Nombre</span></label>';
        html +='    <input type="text" name="nombre" id="nombre">';
        html +='    <hr>';
        html +='    <label><span>Apellidos</span></label>';
        html +='    <input type="text" name="apellido" id="apellido">';
        html +='    <hr>';
        html +='    <button type="button" onclick="btnCrear();">Crear</button>';
        formulario.prepend(html);
    } else  {
        const formulario = $('#formulario-notas'); 
        $.ajax({
            method: 'get',
            url: 'http://localhost:8000/estudiante/' +codigo
        }).done(estudiante => {
            let html = '';
            formulario.html(html);
            html +='    <h1>Crear Nota para estudiante:'+ estudiante.nombres +'</h1>';
            html +='    <label><span>Descripcion</span></label>';
            html +='    <input type="text" name="descripcion" id="descripcion">';
            html +='    <hr>';
            html +='    <label><span>Nota</span></label>';
            html +='    <input type="text" name="calificacion" id="calificacion">';
            html +='    <hr>';
            html +='    <button type="button" onclick="btnCrearNota('+ codigo +');">Crear</button>';
            formulario.prepend(html);
        }).fail((error)=>{
            console.error(error);
        }); 
    }
}

function btnCrear() {
    const code= $('#codigo').val();
    const names= $('#nombre').val();
    const lastNames= $('#apellido').val();
    crearEstudiante(code,names,lastNames);
}

function crearEstudiante(codigo, nombres, apellidos) {
    $.ajax({
        url:'http://localhost:8000/create',
        method: 'post',
        data:{
                codigo: codigo,
                nombres: nombres,
                apellidos: apellidos
        }
    }).done(response=>{
        alert(response);
        location.reload();
    });

}

function btnCrearNota(codigoEstudiante) {
    const description= $('#descripcion').val();
    const note= $('#calificacion').val();
    if (note > 0 && note <= 5) {
        crearNota(codigoEstudiante,description,note);
    } else {
        alert('La nota no es valida');
    }
}

function crearNota(codigoEstudiante, descripcion, nota) {
    $.ajax({
        url:'http://localhost:8000/create-grade',
        method: 'post',
        data:{
                codigoEstudiante: codigoEstudiante,
                descripcion: descripcion,
                nota: nota
        }
    }).done(response=>{
        alert(response);
        location.reload();
    });

}

function eliminarEstudiante(codigo){       
    $.ajax({
        url:'http://localhost:8000/delete/' + codigo,
        method: 'delete',
    }).done(response => {
        alert(response);
        location.reload();
    });
}

function eliminarNota(id){       
    $.ajax({
         url:'http://localhost:8000/delete-grade/'+id,
         method: 'delete',
    }).done(response=>{
         alert(response);
         location.reload();
    });
}

function mostrarFormularioNotas(codigoEstudiante, id){
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/estudiante/' + codigoEstudiante 
    }).done(estudiante => {
        const lista = $('#lista');
        let html = '';
        lista.html(html);
            html +='    <h1>Modificar nota</h1>';
            html +='    <h3>Modificando notas estudiante: '+ estudiante.nombres+ ' ' + estudiante.apellidos + '</h3>';
            html +='    <h3>Con codigo: '+ estudiante.codigo+ '</td>';
        lista.prepend(html);
    }).fail((error)=>{
        console.error(error);
    }); 
    mostrarFormularioActividades(id);
}

function mostrarFormularioActividades(id){
    $('#derecha').css('display', 'block');
    $.ajax({
        method: 'get',
        url: 'http://localhost:8000/actividad/' + id
    }).done(actividad => {
        const table = $('#modificar_nota');
        let html = '';
        table.html(html);
            html +='<tr>';
            html +='    <td>';
            html +='        <input type="text" value="' + actividad.descripcion+ '" id="actividad">';
            html +='    </td>';
            html +='    <td>';
            html +='        <input type="number" min="0" max="5" value="' + actividad.nota+ '" id="nota">';
            html +='    </td>';
            html +='</tr>';

        html +='<tr>';
        html +='    <td>';
        html +='        <button type="button" onclick="btnModificar('+ id +');">Guardar</button>';
        html +='    </td>';
        html +='</tr>';
        table.prepend(html);
    }).fail((error)=>{
        console.error(error);
    }); 
}

function btnModificar(id) {
    const activity = $('#actividad').val();
    const note = $('#nota').val();
    if (activity != '') {
        if (note > 0 && note <= 5) {
            modificar(id,activity,note);   
        } else {
            alert('La nota no es válida')
        }

    } else {
        alert('Ingrese un valor válido');
    }
}

function modificar(id,actividad,nota){
    $.ajax({
         url:'http://localhost:8000/actividades/update/'+id,
         method: 'put',
         data:{ 
                descripcion: actividad,
                nota: nota
         }
     }).done(response=>{
         alert(response);
         location.reload();
     });
}