document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for "Beca Parcial" button
    const btnVerParcial = document.getElementById("btn-ver-parcial");
    if (btnVerParcial) {
        btnVerParcial.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.getElementById("parcial-beca");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Smooth scrolling for "Exoneración" button
    const btnVerExoneracion = document.getElementById("btn-ver-exoneracion");
    if (btnVerExoneracion) {
        btnVerExoneracion.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.getElementById("complete");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Smooth scrolling for "Formulario" button
    const btnVerForm = document.getElementById("btn-ver-form");
    if (btnVerForm) {
        btnVerForm.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.getElementById("form");
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
