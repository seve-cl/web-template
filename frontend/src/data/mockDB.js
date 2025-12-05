export const mockDB = {
    configuracionRestaurante: {
        id: 1,
        nombre: "Los Pollos Hermanos",
        logo: "/web-template/assets/pollos_logo.png",
        banner: "/web-template/assets/pollos_banner.jpg",
        colores: {
            primario: "#F59E0B",
            secundario: "#D92626",
            fondo: "#FFFFFF",
            texto: "#1F2937"
        },
        contacto: {
            direccion: "Av. Los Pollos 88, Albuquerque",
            telefono: "+1 505 555 0142",
            email: "contacto@lospolloshermanos.com",
            redes: {
                instagram: "@lospollos_hermanos_fan",
                facebook: "/lospollosfan"
            }
        },
        descripcion: "Comida rápida estilo casero: los mejores pollos fritos, combos familiares y salsas secretas.",
        horario: {
            lunes_a_viernes: "10:00 - 22:00",
            sabado: "10:00 - 23:00",
            domingo: "11:00 - 20:00"
        }
    },
    menu: [
        {
            id: 1,
            nombre: "Platos Fuertes",
            platos: [
                {
                    id: 101,
                    nombre: "Pollo Clásico (2 Piezas)",
                    descripcion: "Nuestra receta original, crujiente por fuera y jugoso por dentro.",
                    precio: 8.99,
                    imagen: "/web-template/assets/pollo_clasico.jpg",
                    tags: ["popular", "clásico"],
                    spicyLevel: 0,
                    activo: true
                },
                {
                    id: 102,
                    nombre: "Combo Familiar",
                    descripcion: "8 piezas de pollo, 2 acompañamientos grandes y 4 biscuits.",
                    precio: 24.99,
                    imagen: "/web-template/assets/combo_familiar.jpg",
                    tags: ["familiar", "compartir"],
                    spicyLevel: 1,
                    activo: true
                },
                {
                    id: 103,
                    nombre: "Alitas Picantes",
                    descripcion: "6 alitas bañadas en nuestra salsa especial picante.",
                    precio: 9.99,
                    imagen: "/web-template/assets/alitas_picantes.png",
                    tags: ["picante", "entrante"],
                    spicyLevel: 3,
                    activo: true
                }
            ]
        },
        {
            id: 2,
            nombre: "Acompañamientos",
            platos: [
                {
                    id: 201,
                    nombre: "Papas Fritas",
                    descripcion: "Corte rizado con sazón de la casa.",
                    precio: 3.99,
                    imagen: "/web-template/assets/papas_fritas.png",
                    tags: ["vegetariano"],
                    spicyLevel: 1,
                    activo: true
                },
                {
                    id: 202,
                    nombre: "Salsa Especial",
                    descripcion: "Nuestra famosa salsa azul, el complemento perfecto.",
                    precio: 1.99,
                    imagen: "/web-template/assets/salsa.png",
                    tags: ["extra"],
                    spicyLevel: 0,
                    activo: true
                },
                {
                    id: 203,
                    nombre: "Ensalada César",
                    descripcion: "Lechuga fresca, crutones y aderezo césar.",
                    precio: 5.99,
                    imagen: "/web-template/assets/ensalada.png",
                    tags: ["vegetariano", "fresco"],
                    spicyLevel: 0,
                    activo: true
                }
            ]
        },
        {
            id: 3,
            nombre: "Bebidas y Postres",
            platos: [
                {
                    id: 301,
                    nombre: "Limonada Fresca",
                    descripcion: "Recién exprimida, con un toque de menta.",
                    precio: 2.99,
                    imagen: "/web-template/assets/bebida.png",
                    tags: ["bebida", "refrescante"],
                    spicyLevel: 0,
                    activo: true
                },
                {
                    id: 302,
                    nombre: "Pastel de Chocolate",
                    descripcion: "Decadente pastel de chocolate con ganache.",
                    precio: 4.99,
                    imagen: "/web-template/assets/postre.jpg",
                    tags: ["postre", "dulce"],
                    spicyLevel: 0,
                    activo: true
                }
            ]
        }
    ],
    reservas: []
};
