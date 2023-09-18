function getRandomInstitutionsFromDepartment(department, number, scope, level) {
  const result = db.establecimientos.aggregate([
    {
      $match: {
        jurisdicción: /Formosa/i,
        localidad: new RegExp(`${department}`, "i"),
        ambito: scope,
        [level]: 1,
      },
    },
    {
      $project: {
        nombre: 1,
        jurisdiccón: 1,
        departamento: 1,
        localidad: 1,
        ec_jar: 1,
        ec_pri: 1,
        ec_sec: 1,
        ec_SNU: 1,
        ambito: 1,
        CUEanexo: 1
      },
    },
    {
      $merge: {
        into: `Establecimientos-elegidos`,
        on: "_id",
        whenMatched: "replace",
      },
    },
  ]);
}

const LOCATIONS = [
  "Formosa",
  "Laguna Blanca",
  "Pirane",
  "Las Lomitas",
  "Buena Vista"
];

let quantity = 30;

for (const location of LOCATIONS) {
  for (const scope of ["Rural", "Urbano"]) {
    if (scope == "Urbano") {
        quantity -= 20;
    }
    getRandomInstitutionsFromDepartment(location, quantity, scope, "ec_jar");
    getRandomInstitutionsFromDepartment(location, quantity, scope, "ec_sec");
    getRandomInstitutionsFromDepartment(location, quantity, scope, "ec_sec");
    getRandomInstitutionsFromDepartment(location, quantity, scope, "ec_SNU");
    if (scope == "Urbano") {
        quantity += 20
    }
  }
}

// Agregar el instituto a la colección
db.establecimientos.aggregate([
  {
    $match: {
      jurisdicción: /Formosa/i,
      localidad: /Formosa/i,
      ec_SNU: 1,
      nombre: /Instituto Politécnico/i,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      nombre: 1,
      jurisdiccón: 1,
      departamento: 1,
      localidad: 1,
      ambito: 1,
      ec_jar: 1,
      ec_pri: 1,
      ec_sec: 1,
      ec_SNU: 1,
    },
  },
  {
    $merge: { into: `Establecimientos-elegidos`, on: "_id", whenMatched: "replace" },
  },
]);
