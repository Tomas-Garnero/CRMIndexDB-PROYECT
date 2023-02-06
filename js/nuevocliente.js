(function() {

    let DB;

    const formulario = document.querySelector("#formulario");

    document.addEventListener("DOMContentLoaded", () => {
        
        formulario.addEventListener("submit", validarCliente);

        conectarDB();
    });

    function validarCliente(e) {
        e.preventDefault();
        // console.log("Validando...");

        // Leer todos los inputs
        const nombre = document.querySelector("#nombre").value;
        const email = document.querySelector("#email").value;
        const telefono = document.querySelector("#telefono").value;
        const empresa = document.querySelector("#empresa").value;

        if(nombre === "" || email === "" || telefono === "" ||empresa === "") {
            imprimirAlerta("Todos los campos son obligatorios", "error");

            return;
        }

        // Crear un objeto con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }
        // console.log(cliente);

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {

        let transaction = DB.transaction("crm", "readwrite");

        const objectStore = transaction.objectStore("crm");

        objectStore.add(cliente);

        transaction.onerror = () => {
            // console.log("Hubo un error");
            imprimirAlerta("Hubo un error", "error");
        };

        transaction.oncomplete = function() {
            // console.log("Cliente agregado");
            imprimirAlerta("El cliente se agrego correctamente");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
        };
    }
})();