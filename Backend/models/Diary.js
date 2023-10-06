const db = require('../db/connect');

class Diary {
    constructor({diaryid, words, date, time, category}) {
        this.diaryid = diaryid
        this.words = words
        this.date = date
        this.time = time
        this.category = category
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM Diary ORDER BY Date, Time;");
        if (response.rows.length === 0) {
            throw new Error("No diary entries available.")
        }
        return response.rows.map(d => new Diary(d));
    }

    static async getOneByID(id) {
        const response = await db.query("SELECT * FROM diary WHERE DiaryID = $1;", [id]);
        if(response.rows.length != 1) {
            throw new Error("Unable to locate diary.")
        }

        return new Diary(response.rows[0]);
    }

    static async getOneByDate(date) {
        const response = await db.query("SELECT * FROM diary WHERE TO_CHAR(Date, 'YYYY-MM-DD') = $1;", [date]);
        if(response.rows.length != 1) {
            throw new Error("Unable to locate diary.")
        }

        return new Diary(response.rows[0]);
    }

    static async getAllByCategory(category) {
        const response = await db.query("SELECT * FROM diary WHERE LOWER(category) = $1;", [category]);

        if(response.rows.length === 0) {
            throw new Error("Unable to locate diary.")
        }

        return response.rows.map(d => new Diary(d));;
    }

    static async create(data) {
        try{
        const { words, category } = data;
        const response = await db.query("INSERT INTO diary (words, category) VALUES ($1, $2) RETURNING *;", [words, category]);
        return new Diary(response.rows);
        }catch (err) {
            throw new Error(err.message)
        }
    }

    async update(data) {
        const { words } = data
        const response = await db.query("UPDATE diary SET words = $1 WHERE DiaryID = $2 RETURNING *;",
            [ words, this.diaryid ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update capital.")
        }
        return new Diary(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM diary WHERE DiaryID = $1 RETURNING *;", [this.diaryid]);
        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;
