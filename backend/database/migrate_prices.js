const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'restaurant.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Adding 'precio_delivery' column to 'dishes' table...");

    db.run(`ALTER TABLE dishes ADD COLUMN precio_delivery INTEGER`, (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log("Column 'precio_delivery' already exists.");
            } else {
                console.error("Error adding column:", err.message);
            }
        } else {
            console.log("Column 'precio_delivery' added successfully.");

            // Initialize precio_delivery with current precio + 1000 (mock logic)
            db.run(`UPDATE dishes SET precio_delivery = precio + 1000`, (err) => {
                if (err) console.error("Error updating initial values:", err);
                else console.log("Initialized 'precio_delivery' values.");
            });
        }
    });
});

db.close();
