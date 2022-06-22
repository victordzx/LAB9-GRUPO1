$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    $.ajax({
        method: "GET",
        url: "https://pokeapi.co/api/v2/region/" ,
        datatype: "json",
        crossDomain: true,
    }).done(function (data) {
        let listaRegiones = data.results;
        let contenthtml = "";
        for (let i = 0; i < listaRegiones.length; i++) {
            contenthtml += "<tr>";
            contenthtml += "   <td>" + (i + 1) + "</td>";
            contenthtml += "   <td>" + listaRegiones[i].name + "</td>";
            contenthtml += "   <td><a class=\"btn btn-primary botonDetalle\" href='detalleRegion/detalleRegion.html?region="+(i+1)+"' role=\"button\">Detalles</a></td>";
            contenthtml += "</tr>";
        }
        $("#body-paises").html(contenthtml);

    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });
});
