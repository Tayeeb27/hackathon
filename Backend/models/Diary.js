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

    static async getOneByCategory(category) {
        const response = await db.query("SELECT * FROM diary WHERE LOWER(category) = $1;", [category]);

        if(response.rows.length != 1) {
            throw new Error("Unable to locate diary.")
        }

        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { words, category } = data;
        const response = await db.query("INSERT INTO diary (words, category) VALUES ($1, $2) RETURNING *;", [words, category]);
        const id = response.rows[0].id;
        const newDiary = await Diary.getOneByID(id);
        return new Diary(newDiary);
    }

    // async update(data) {
    //     const response = await db.query("UPDATE diary SET capital = $1 WHERE name = $2 RETURNING name, capital;",
    //         [ data.capital, this.name ]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to update capital.")
    //     }
    //     return new Diary(response.rows[0]);
    // }

    async destroy() {
        const response = await db.query("DELETE FROM diary WHERE DiaryID = $1 RETURNING *;", [this.diaryid]);
        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;
