
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
        document.getElementById("imagen1").scr="raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/79.gif";
        $("#pokemons").url("https://pokeapi.co/api/v2/location-area/" + idArea);
    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });

    function areaNombre(nombre){
        $('#areaSeleccionada').html("Pokemones a encontrarse en el Area: "+ nombre);
    }
});