
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idLocacion = urlParams.get('locacion');
    $.ajax({
        method: "GET",
        url: "https://pokeapi.co/api/v2/location/" + idLocacion,
        datatype: "json",
        crossDomain: true,
    }).done(function (data) {
        let listaAreas = data.results;
        let contenthtml = "";
        for (let i = 0; i < listaAreas.length; i++){
            contenthtml += "<tr>";
            contenthtml += "   <td>" + (i + 1) + "</td>";
            contenthtml += "   <td>" + listaAreas[i].name + "</td>";
            contenthtml += "   <td><a class=\"btn btn-primary botonDetalle\" href='pokemon_encounters' role=\"button\">Ver Pokemons</a></td>";
            contenthtml += "<tr>";
        }
        $("#tablaAreas").html(contenthtml);
    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });
});