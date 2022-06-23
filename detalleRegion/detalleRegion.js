$(document).ready(function () {
// Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    $.ajax({
        method: "GET",
        url: "https://pokeapi.co/api/v2/region/" + idRegion,
        datatype: "json",
        crossDomain: true,
    }).done(function (data) {
        var pagina = 1;
        var cantpaginas = 10;
        let regionName = data.name;
        $("#labelRegion").text("Región " + regionName);
        let listalocations = data.locations.slice((pagina - 1) * cantpaginas, pagina * cantpaginas);
        let numpaginas = Math.ceil(data.locations.length / cantpaginas);
        let paginadohtml = "<li class='page-item disabled'><button class='page-link' id='previous' >Previous</button></li>";
        for (let i = 1; i <= numpaginas; i++) {
            if (i == pagina) {
                paginadohtml += "<li class='page-item active'><button value='" + i + "' class='page-link'>" + i + "</button></li>";
            } else {
                paginadohtml += "<li class='page-item'><button value='" + i + "' class='page-link'>" + i + "</button></li>";
            }
        }
        paginadohtml += "<li class='page-item'><button class='page-link' id='next' >Next</button></li>";
        $("#paginador").html(paginadohtml);

        let contenthtml = "";
        $.each(listalocations, function (i, location) {
            contenthtml += "<tr>";
            contenthtml += "<td>" + (i + 1) + "</td>";
            contenthtml += "<td>" + location.name + "</td>";
            let slash = location.url.split("/");
            contenthtml += "<td><a href='../detalleLocacion/detalleLocacion.html?locacion=" + slash[6] + "' class='btn btn-primary botonDetalle'>Detalles</a></td>";
            contenthtml += "</tr>";
        });
        $("#locationtables").html(contenthtml);

        $("button").click(function () {
            let pag = $("li[class='page-item active']");
            $(pag).attr("class", "page-item");
            let id = $(this).attr("id");
            if (id != null && id === "next") {
                pagina++;
            } else if (id != null && id === "previous") {
                pagina--;
            } else {
                pagina = $(this).val();
            }
            pag = $("button[value='" + pagina + "']").parent();
            $(pag).attr("class", "page-item active");
            let btnprevnext;
            if (pagina == numpaginas) {
                btnprevnext = $("#next").parent();
                $(btnprevnext).attr("class", "page-item disabled");
                $("#next").attr("disabled", "disabled");
                btnprevnext = $("#previous").parent();
                $(btnprevnext).attr("class", "page-item");
                $("#previous").removeAttr("disabled");
            } else if (pagina == 1) {
                btnprevnext = $("#previous").parent();
                $(btnprevnext).attr("class", "page-item disabled");
                $("#previous").attr("disabled", "disabled");
                btnprevnext = $("#next").parent();
                $(btnprevnext).attr("class", "page-item");
                $("#next").removeAttr("disabled");
            } else {
                btnprevnext = $("#next").parent();
                $(btnprevnext).attr("class", "page-item");
                $("#next").removeAttr("disabled");
                btnprevnext = $("#previous").parent();
                $(btnprevnext).attr("class", "page-item");
                $("#previous").removeAttr("disabled");
            }

            listalocations = data.locations.slice((pagina - 1) * cantpaginas, pagina * cantpaginas);
            contenthtml = "";
            $.each(listalocations, function (i, location) {
                contenthtml += "<tr>";
                contenthtml += "<td>" + (i + 1 + (cantpaginas * (pagina - 1))) + "</td>";
                contenthtml += "<td>" + location.name + "</td>";
                let slash = location.url.split("/");
                contenthtml += "<td><a href='../detalleLocacion/detalleLocacion.html?locacion=" + slash[6] + "' class='btn btn-primary'>Detalles</a></td>";
                contenthtml += "</tr>";
            });
            $("#locationtables").html(contenthtml);
        });
    }).fail(function (err) {
        alert("Ocurrio un error al cargar la página")
    });
});