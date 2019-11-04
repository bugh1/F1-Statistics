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
    SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'season', r.year,
        'round', r.round,
        'url', r.url,
        'raceName', r.name,
        'Circuits', json_build_object(
            'circuitId', c.circuit_id,
            'url', c.url,
            'circuitName', c.circuit_name,
            'Location', json_build_object(
                'lat', c.lat,
                'long', c.long,
                'locality', c.location,
                'country', c.country
            )
        ),
        'date', r.date,
        'time', r.time || UPPER('Z')
    ) ORDER BY r.round ASC) AS "Races"
    FROM races r
    JOIN circuits c
    ON r.circuit_id = c.circuit_id
    WHERE r.year = $1;`