
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idLocacion = urlParams.get('locacion');
    $.ajax({
        method: "GET",
        url: "https://pokeapi.co/api/v2/location/",
        datatype: "json",
        crossDomain: true,
    }).done(function (data) {
        let locacionName = data.name;
        $("#labelLocacion").text("Locación " + locacionName);
        let regionName = data.name;
        $("#labelRegion").text("Región " + regionName);
        let listaAreas = data.results;
        let contenthtml = "";
        for (let i = 0; i < listaAreas.length; i++) {
            contenthtml += "<tr>";
            contenthtml += "   <td>" + (i + 1) + "</td>";
            contenthtml += "   <td>" + listaAreas[i].name + "</td>";
            contenthtml += "   <td><a class=\"btn btn-primary botonDetalle\" href='detalleRegion/detalleRegion.html?region="+(i+1)+"' role=\"button\">Ver Pokemones</a></td>";
            contenthtml += "</tr>";
        }
        $("#tablaAreas").html(contenthtml);

        $("button").click(function (){

        })
    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });
});