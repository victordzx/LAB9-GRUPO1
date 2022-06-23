
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
        let locacionName = data.name;
        $("#labelLocacion").text("Locación " + locacionName);
        let regionName = data.region.name;
        $("#labelRegion").text("Región " + regionName);
        let listaAreas = data.areas;
        let contenthtml = "";
        let idRegion = data.region.url.split("/");
        for (let i = 0; i < listaAreas.length; i++) {
            contenthtml += "<tr>";
            contenthtml += "   <td>" + (i + 1) + "</td>";
            contenthtml += "   <td>" + listaAreas[i].name + "</td>";
            let id = listaAreas[i].url.split("/");
            contenthtml += "<td><a onclick=\"getpokemons(" + id[6] + ")\" class=\"btn btn-success text-white\">Ver pokemones</a></td>";
            contenthtml += "</tr>";
        }
        let btnreturn = "";
        btnreturn = btnreturn + "<a class=\"btn btn-primary botonDetalle\" role=\"button\" href=\"../detalleRegion/detalleRegion.html?region=" + idRegion[6] + "\">Regresar a la región</a>"
        $("#retroceso").html(btnreturn);
        $("#tablaAreas").html(contenthtml);
    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    })
});

function getpokemons(poke) {
    let cardpokemons = "";
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/location-area/" + poke,
        success: function (response) {
            $("#areaSeleccionada").text("Pokemones en el área: " + response.name);
            $.each(response.pokemon_encounters, function (key, value) {
                let idpoke = value.pokemon.url.split("/");
                cardpokemons = cardpokemons + "<div class=\"text-center col-2\" style='border: solid; margin-left: 50px; margin-right: 50px; margin-bottom: 50px'>" +
                    "<img id=\"imagen" + idpoke[6] + "\" > <br>" + "<h6>" + value.pokemon.name + "</h6>" + "</div>"
                $.ajax({
                    type: "GET",
                    url: "https://pokeapi.co/api/v2/pokemon/" + idpoke[6],
                    success: function (response1) {
                        $.each(response1.sprites, function (key1, value1) {
                            $("#imagen" + idpoke[6]).attr('src', response1.sprites.back_default);
                        });
                    },
                });
            });
            $("#pokemons").html(cardpokemons);
        },
    });
}