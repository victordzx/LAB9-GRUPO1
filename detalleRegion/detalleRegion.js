$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    $.ajax({
        method: "GET",
        url: "https://pokeapi.co/api/v2/region/" + idRegion,
    }).done(function (data) {
        let listalocations = data.locations; // locaciones
        const locacionesxpagina = 10;
        const cantidadpaginas = Math.ceil(listalocations.length/locacionesxpagina);
        let i = 1;
        $("#paginador").append("<li class=\"page-item disabled\"><span class=\"page-link\">Previous</span></li>")
        for (i; i < cantidadpaginas; i++){
            $("#paginador").append("<li class=\"page-item \" id='pag"+i+"'><button value=\"1\" class=\"page-link\">"+i+"</button></li>")
        }
        $("#paginador").append("<li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>")

        let tblDinamic = ""; // inicializamos tabla dinámica
        for (let i = 0; i < listalocations.length ; i++) {
                // método
                let id = listalocations[i].url.substr(35,2); // detalles de locación
                tblDinamic += "<tr>";
                tblDinamic += "   <td>" + (i+1) + "</td>";
                tblDinamic += "   <td>" + listalocations[i].name + "</td>";
                tblDinamic += "   <td> <a class=\"btn btn-primary botonDetalle\" role=\"button\" href='../detalleLocacion/detalleLocacion.html?locacion=" + id + "'>Detalles</a>  </td>";
                tblDinamic += "</tr>";
        }
        $("tbody").html(tblDinamic);
    }).fail(function (e) {
        console.log(e);
    });
});