const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const mockDB = require('../data/mockDB');

const dbPath = path.resolve(__dirname, 'restaurant.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log('Initializing database...');

    // 1. Settings Table
    db.run(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY,
        data TEXT
    )`);

    // 2. Categories Table
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        orden INTEGER
    )`);

    // 3. Dishes Table
    db.run(`CREATE TABLE IF NOT EXISTS dishes (
        id INTEGER PRIMARY KEY,
        category_id INTEGER,
        nombre TEXT,
        descripcion TEXT,
        precio REAL,
        imagen TEXT,
        tags TEXT,
        spicyLevel INTEGER,
        activo INTEGER DEFAULT 1,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    )`);

    // 4. Reservations Table
    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        time TEXT,
        guests TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        notes TEXT,
        status TEXT DEFAULT 'pendiente',
        created_at TEXT
    )`);

    // Seed Data
    console.log('Seeding data...');

    // Seed Settings
    const settingsData = JSON.stringify(mockDB.configuracionRestaurante);
    db.run("DELETE FROM settings");
    db.run("INSERT INTO settings (id, data) VALUES (1, ?)", [settingsData]);

    // Seed Menu & Dishes
    db.run("DELETE FROM categories");
    db.run("DELETE FROM dishes");

    const stmtCategory = db.prepare("INSERT INTO categories (id, nombre, orden) VALUES (?, ?, ?)");
    const stmtDish = db.prepare("INSERT INTO dishes (id, category_id, nombre, descripcion, precio, imagen, tags, spicyLevel, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    mockDB.menu.forEach((cat, index) => {
        stmtCategory.run(cat.id, cat.nombre, index + 1);

        cat.platos.forEach(dish => {
            stmtDish.run(
                dish.id,
                cat.id,
                dish.nombre,
                dish.descripcion,
                dish.precio,
                dish.imagen || dish.foto, // Handle both property names
                JSON.stringify(dish.tags || []),
                dish.spicyLevel || 0,
                1 // activo
            );
        });
    });

    stmtCategory.finalize();
    stmtDish.finalize();

    console.log('Database initialized successfully!');
});

db.close();
