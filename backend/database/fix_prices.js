const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'restaurant.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Fixing NULL 'precio_delivery' values...");

    db.run(`UPDATE dishes SET precio_delivery = precio + 1000 WHERE precio_delivery IS NULL`, function (err) {
        if (err) {
            console.error("Error fixing values:", err.message);
        } else {
            console.log(`Updated ${this.changes} rows.`);
        }
    });
});

db.close();
