(function() {

    document.addEventListener("DOMContentLoaded", () => {
        crearDB();

        // Crea la DB de IndexDB
        function crearDB() {
            const crearDB = window.indexedDB.open("crm", 1);

            crearDB.onerror = function() {
                console.log("Hubo un error");
            };

            crearDB.onsuccess = function() {
                DB = crearDB.result; 
                // console.log(DB);
            };

            crearDB.onupgradeneeded = function(e) {
                const db = e.target.result;
                // console.log(db);

                const objectStore = db.createObjectStore("crm", { keyPath: "id", autoIncrement: true });

                objectStore.createIndex("nombre", "nombre", { unique: false });
                objectStore.createIndex("email", "email", { unique: true });
                objectStore.createIndex("telefono", "telefono", { unique: false });
                objectStore.createIndex("empresa", "empresa", { unique: false });
                objectStore.createIndex("id", "id", { unique: true });

                console.log("DB Creada y Lista");
            }
        }
    })
})();