
const pool = require("./dbconnection");

async function getCategories() {
    const result = await pool.query("SELECT DISTINCT category FROM jokebook");
    return result.rows.map(row => row.category);
}

async function getJokesbyCategory(category,limit) {
    let query = "SELECT * FROM jokebook WHERE LOWER(category)= LOWER($1)";
    const params = [category];
    if (limit){
        query += " LIMIT $2" ;
        params.push(limit);
    }
    const result = await pool.query(query, params);
    return result.rows;
}

async function getRandomJoke() {
    const result = await pool.query( "SELECT * FROM jokebook ORDER BY RANDOM() LIMIT 1");
    return result.rows[0];
}

async function addJoke(category, setup, delivery) {
    const query = `INSERT INTO jokebook (category, setup, delivery) VALUES ($1, $2, $3)`;
    await pool.query(query, [category, setup, delivery]);
}
module.exports = {
    getCategories,
    getJokesbyCategory,
    getRandomJoke,
    addJoke
};