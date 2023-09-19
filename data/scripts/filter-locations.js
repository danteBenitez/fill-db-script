const ALL_DOCUMENTS_COLLECTION = "Establecimientos-elegidos";
const FILTERED_COLLECTION = "Establecimientos-filtrados";

const MERGE_OPTIONS = {
    $merge: {
        into: FILTERED_COLLECTION,
        on: "_id",
        whenMatched: "replace"
    }
}

// Primero, recuperamos todas las instituciones de ámbito rural
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            ambito: /Rural/i
        }
    },
    MERGE_OPTIONS
]);

// Dos establecimientos de nivel inicial
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            ec_jar: 1
        }
    },
    {
        $limit: 2
    },
    MERGE_OPTIONS
])

// Siete establecimientos de nivel primario
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            ec_pri: 1,
            localidad: { $not: /Formosa/i }
        }
    },
    {
        $limit: 7
    },
    MERGE_OPTIONS
]);

// Nos aseguramos de agregar instituciones de la 
// localidad de Laguna Blanca
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            localidad: /Laguna Blanca/i
        }
    },
    {
        $limit: 7
    },
    MERGE_OPTIONS
]);

// Doce establecimientos de nivel secundario
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            ec_sec: 1
        }
    },
    {
        $limit: 7
    },
    MERGE_OPTIONS
]);

// Un establecimiento de nivel superior que no 
// es el instituto
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            ec_SNU: 1,
            nombre: { $not: /Instituto Poli/i }
        },
    }, 
    {
        $limit: 1
    },
    MERGE_OPTIONS
])

// Y el instituto
db[ALL_DOCUMENTS_COLLECTION].aggregate([
    {
        $match: {
            ec_SNU: 1,
            nombre: /Instituto Poli/i
        },
    }, 
    {
        $limit: 1
    },
    MERGE_OPTIONS
])