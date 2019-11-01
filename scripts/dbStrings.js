module.exports.createCircuits = `
CREATE TABLE circuits(
    circuit_id VARCHAR(255) PRIMARY KEY,
    circuit_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    country  VARCHAR(255) NOT NULL,
    lat NUMERIC NOT NULL,
    long NUMERIC NOT NULL,
    url VARCHAR(255) NOT NULL
);`
module.exports.insertCircuits = `
INSERT INTO circuits (circuit_id, circuit_name, location, country, lat, long, url)
VALUES ($1, $2, $3, $4, $5, $6, $7);`
module.exports.dropCircuits = `DROP TABLE circuits;`
module.exports.selectCircuits = `SELECT * FROM circuits;`

module.exports.createRaces = `
CREATE TABLE races(
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    round INT NOT NULL,
    circuit_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    url VARCHAR(255) NOT NULL
);`
module.exports.insertRaces = `
INSERT INTO races (year, round, circuit_id, name, date, time, url)
VALUES ($1, $2, $3, $4, $5, $6, $7);`
module.exports.dropRaces = `DROP TABLE races;`
module.exports.selectRaces = `SELECT * FROM races;`

module.exports.selectCalendar = `
SELECT ROW_TO_JSON(circuits)
FROM circuits;
`
// SELECT ROW_TO_JSON((SELECT d FROM (SELECT lat, long) d)) AS data
// FROM circuits;`
// SELECT races.year AS season, races.round, races.url, races.name AS "raceName",
//     races.date::TEXT, races.time,
//     circuits.circuit_id AS circuitId, circuits.circuit_name AS circuitName
// FROM races
// JOIN circuits
// ON races.circuit_id = circuits.circuit_id;`