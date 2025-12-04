import React, { useState, useEffect } from 'react';
import { Edit2, Eye, EyeOff, Plus, Save, X, Image as ImageIcon } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

const MenuManager = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDish, setEditingDish] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newDish, setNewDish] = useState({
        category_id: 1,
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        tags: [],
        spicyLevel: 0
    });

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/info');
            const result = await response.json();
            if (result.success) {
                setMenu(result.data.menu);
            }
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (dish) => {
        setEditingDish({ ...dish });
    };

    const handleCancelEdit = () => {
        setEditingDish(null);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/dishes/${editingDish.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingDish)
            });

            if (response.ok) {
                await fetchMenu(); // Refresh data
                setEditingDish(null);
            } else {
                alert('Error al guardar los cambios');
            }
        } catch (error) {
            console.error('Error saving dish:', error);
        }
    };

    const handleToggleVisibility = async (dish) => {
        try {
            const updatedDish = { ...dish, activo: dish.activo ? 0 : 1 };
            const response = await fetch(`http://localhost:3001/api/dishes/${dish.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDish)
            });

            if (response.ok) {
                await fetchMenu();
            }
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/dishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newDish,
                    precio: parseFloat(newDish.precio),
                    tags: newDish.tags.length > 0 ? newDish.tags : []
                })
            });

            if (response.ok) {
                await fetchMenu();
                setIsAdding(false);
                setNewDish({
                    category_id: 1,
                    nombre: '',
                    descripcion: '',
                    precio: '',
                    imagen: '',
                    tags: [],
                    spicyLevel: 0
                });
            } else {
                alert('Error al crear el plato');
            }
        } catch (error) {
            console.error('Error creating dish:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setEditingDish(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleNewDishChange = (e) => {
        const { name, value } = e.target;
        setNewDish(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando menú...</div>;

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-end">
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
                >
                    <Plus size={20} />
                    Nuevo Plato
                </button>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-xl text-secondary">Agregar Nuevo Plato</h3>
                            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="p-6 space-y-6">
                            <div className="flex gap-6 flex-col md:flex-row">
                                <div className="w-full md:w-1/3">
                                    <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative group">
                                        {newDish.imagen ? (
                                            <img src={newDish.imagen} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-gray-400 flex flex-col items-center gap-2">
                                                <ImageIcon size={32} />
                                                <span className="text-xs">Sin imagen</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        name="imagen"
                                        placeholder="URL de imagen"
                                        className="mt-2 border p-2 rounded w-full text-sm"
                                        value={newDish.imagen}
                                        onChange={handleNewDishChange}
                                    />
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                                        <input
                                            name="nombre"
                                            required
                                            className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={newDish.nombre}
                                            onChange={handleNewDishChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Precio Mesa</label>
                                            <input
                                                name="precio"
                                                type="number"
                                                required
                                                className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/20 outline-none"
                                                value={newDish.precio}
                                                onChange={handleNewDishChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Precio Delivery</label>
                                            <input
                                                name="precio_delivery"
                                                type="number"
                                                className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/20 outline-none"
                                                value={newDish.precio_delivery || ''}
                                                onChange={handleNewDishChange}
                                                placeholder={newDish.precio ? `Sug: ${Number(newDish.precio) + 1000}` : ''}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
                                        <select
                                            name="category_id"
                                            className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={newDish.category_id}
                                            onChange={handleNewDishChange}
                                        >
                                            {menu.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                                        <textarea
                                            name="descripcion"
                                            className="border p-2 rounded w-full focus:ring-2 focus:ring-primary/20 outline-none"
                                            rows="3"
                                            value={newDish.descripcion}
                                            onChange={handleNewDishChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancelar</button>
                                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors">Guardar Plato</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {menu.map((category) => (
                <div key={category.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-secondary">{category.nombre}</h3>
                        <span className="text-sm text-gray-400">{category.platos.length} items</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {category.platos.map((dish) => (
                            <div key={dish.id} className={`p-4 flex items-center gap-4 transition-colors ${dish.activo ? 'hover:bg-gray-50' : 'bg-gray-100 opacity-75 grayscale'}`}>
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img
                                        src={dish.imagen || dish.foto}
                                        alt={dish.nombre}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Sin+Imagen' }}
                                    />
                                </div>

                                <div className="flex-1">
                                    {editingDish && editingDish.id === dish.id ? (
                                        <div className="grid gap-2">
                                            <input
                                                name="nombre"
                                                value={editingDish.nombre}
                                                onChange={handleChange}
                                                className="border rounded px-2 py-1 font-bold w-full"
                                            />
                                            <textarea
                                                name="descripcion"
                                                value={editingDish.descripcion}
                                                onChange={handleChange}
                                                className="border rounded px-2 py-1 text-sm w-full"
                                                rows="2"
                                            />
                                            <div className="flex items-center gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">Mesa</span>
                                                    <input
                                                        name="precio"
                                                        type="number"
                                                        value={editingDish.precio}
                                                        onChange={handleChange}
                                                        className="border rounded px-2 py-1 w-20"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">Delivery</span>
                                                    <input
                                                        name="precio_delivery"
                                                        type="number"
                                                        value={editingDish.precio_delivery || editingDish.precio}
                                                        onChange={handleChange}
                                                        className="border rounded px-2 py-1 w-20"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-800">{dish.nombre}</h4>
                                                {!dish.activo && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Inactivo</span>}
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-1">{dish.descripcion}</p>
                                            <div className="flex gap-4 mt-1">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-400 uppercase">Mesa</span>
                                                    <span className="text-primary font-bold text-sm">{formatPrice(dish.precio)}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-400 uppercase">Delivery</span>
                                                    <span className="text-secondary font-bold text-sm">{formatPrice(dish.precio_delivery || dish.precio)}</span>
                                                </div>
                                                <div className="flex items-center gap-1 ml-2">
                                                    {dish.tags?.map(tag => (
                                                        <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {editingDish && editingDish.id === dish.id ? (
                                        <>
                                            <button onClick={handleSaveEdit} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Guardar">
                                                <Save size={18} />
                                            </button>
                                            <button onClick={handleCancelEdit} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Cancelar">
                                                <X size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(dish)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Editar">
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleVisibility(dish)}
                                                className={`p-2 rounded-lg transition-colors ${dish.activo ? 'text-gray-400 hover:text-secondary hover:bg-secondary/10' : 'text-red-500 bg-red-50 hover:bg-red-100'}`}
                                                title={dish.activo ? "Ocultar" : "Mostrar"}
                                            >
                                                {dish.activo ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuManager;
