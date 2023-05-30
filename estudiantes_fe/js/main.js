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
                html +='       <button onclick="mostrarFormularioNotas(' + nota.codigoEstudiante + ');">Modificar</button>';
                html +='       <button onclick="eliminarNota(' + nota.id + ');">Eliminar</button>';
                html +='   </td>';
                html +='</tr>';
                sumatoria += +nota.nota;
            });
            const promedio = sumatoria/notas.length;
            const clase = promedio > 3 ? 'aprobado' : 'reprobado'; // operador ternario
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

