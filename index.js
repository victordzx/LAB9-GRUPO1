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
        $.each(listaRegiones, function (i, location) {
            contenthtml += "<tr>";
            contenthtml += "<td>" + (i + 1) + "</td>";
            contenthtml += "<td>" + location.name + "</td>";
            let slash = location.url.split("/");
            contenthtml += "<td><a href='../detalleRegion/detalleRegion.html?region="+ slash[6]+ "' class='btn btn-primary'>Detalles</a></td>";
            contenthtml += "</tr>";
        });
        $("#body-paises").html(contenthtml);

    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });
});
