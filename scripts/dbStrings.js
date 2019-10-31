export const createCircuits = `
CREATE TABLE circuits(
    "circuitId" VARCHAR(255) PRIMARY KEY,
    "circuitName" VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    country  VARCHAR(255) NOT NULL,
    lat numeric NOT NULL,
    long numeric NOT NULL,
    url VARCHAR(255) NOT NULL
);`