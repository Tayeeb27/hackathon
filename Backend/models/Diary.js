const db = require('../db/connect');

class Diary {
    constructor({country_id, name, capital, population, languages, fun_fact, map_image_url}) {
        this.country_id = country_id
        this.name = name
        this.capital = capital
        this.population = population
        this.languages = languages
        this.fun_fact = fun_fact
        this.map_image_url = map_image_url
    }

    static async getAll() {
        const response = await db.query("SELECT name FROM diary;");
        if (response.rows.length === 0) {
            throw new Error("No countries available.")
        }
        return response.rows.map(c => new Diary(c));
    }

    static async getOneByCountryName(countryName) {
        const response = await db.query("SELECT * FROM diary WHERE LOWER(name) = $1;", [countryName]);

        if(response.rows.length != 1) {
            throw new Error("Unable to locate diary.")
        }

        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { name, capital, population, languages } = data;
        const response = await db.query("INSERT INTO diary (name, capital, population, languages) VALUES ($1, $2, $3, $4) RETURNING name;", [name, capital, population, languages]);
        const countryName = response.rows[0].name;
        const newCountry = await Diary.getOneByCountryName(countryName);
        return new Diary(newCountry);
    }

    async update(data) {
        const response = await db.query("UPDATE diary SET capital = $1 WHERE name = $2 RETURNING name, capital;",
            [ data.capital, this.name ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update capital.")
        }
        return new Diary(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM diary WHERE name = $1 RETURNING *;", [this.name]);
        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;
