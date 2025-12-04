const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static assets
const assetsPath = path.join(__dirname, '../assets');
console.log('Serving assets from:', assetsPath);
app.use('/assets', express.static(assetsPath));

// Helper to get full menu structure
const getMenu = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM categories ORDER BY orden", [], (err, categories) => {
            if (err) return reject(err);

            const promises = categories.map(cat => {
                return new Promise((resolveDish, rejectDish) => {
                    db.all("SELECT * FROM dishes WHERE category_id = ?", [cat.id], (err, dishes) => {
                        if (err) return rejectDish(err);
                        // Parse tags back to array
                        const parsedDishes = dishes.map(d => ({
                            ...d,
                            tags: JSON.parse(d.tags || '[]')
                        }));
                        resolveDish({ ...cat, platos: parsedDishes });
                    });
                });
            });

            Promise.all(promises).then(resolve).catch(reject);
        });
    });
};

// Ruta para obtener toda la información del restaurante
app.get('/api/info', async (req, res) => {
    try {
        db.get("SELECT data FROM settings WHERE id = 1", [], async (err, row) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            if (!row) {
                return res.status(404).json({ success: false, message: 'Settings not found' });
            }

            const config = JSON.parse(row.data);
            const menu = await getMenu();

            res.json({
                success: true,
                data: {
                    configuracionRestaurante: config,
                    menu: menu
                }
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Obtener todas las reservas (Admin)
app.get('/api/reservas', (req, res) => {
    db.all("SELECT * FROM reservations ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({
            success: true,
            data: rows
        });
    });
});

// Crear una nueva reserva
app.post('/api/reservas', (req, res) => {
    const { date, time, guests, name, email, phone, notes } = req.body;
    const sql = `INSERT INTO reservations (date, time, guests, name, email, phone, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [date, time, guests, name, email, phone, notes || '', new Date().toISOString()];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.status(201).json({
            success: true,
            message: 'Reserva creada con éxito',
            data: { id: this.lastID, ...req.body }
        });
    });
});

// Actualizar estado de reserva
app.put('/api/reservas/:id', (req, res) => {
    const { status } = req.body;
    db.run("UPDATE reservations SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: 'Reserva actualizada' });
    });
});

// Actualizar plato (Admin)
app.put('/api/dishes/:id', (req, res) => {
    const { nombre, descripcion, precio, precio_delivery, activo } = req.body;
    const sql = `UPDATE dishes SET nombre = ?, descripcion = ?, precio = ?, precio_delivery = ?, activo = ? WHERE id = ?`;
    db.run(sql, [nombre, descripcion, precio, precio_delivery, activo, req.params.id], function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: 'Plato actualizado' });
    });
});

// Crear nuevo plato (Admin)
app.post('/api/dishes', (req, res) => {
    const { category_id, nombre, descripcion, precio, precio_delivery, imagen, tags, spicyLevel } = req.body;
    const sql = `INSERT INTO dishes (category_id, nombre, descripcion, precio, precio_delivery, imagen, tags, spicyLevel, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`;
    db.run(sql, [category_id, nombre, descripcion, precio, precio_delivery, imagen || '', JSON.stringify(tags || []), spicyLevel || 0], function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.status(201).json({ success: true, message: 'Plato creado', id: this.lastID });
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
