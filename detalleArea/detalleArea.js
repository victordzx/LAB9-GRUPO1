
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idArea = urlParams.get('area');
    $.ajax({
        method: "GET",
        url: "https://https://pokeapi.co/api/v2/location-area/" + idArea,
        datatype: "json",
        crossDomain: true,
    }).done(function (data) {
        let locacionName = data.locacion.name;
        $("#labelLocacion").text("Locación " + locacionName);
        $("#pokemons").url("https://pokeapi.co/api/v2/location-area/" + idArea);

    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });
});