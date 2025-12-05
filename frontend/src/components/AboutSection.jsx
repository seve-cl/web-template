import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full z-0"></div>
                        <img
                            src="/web-template/assets/hero_banner.jpg"
                            alt="Nuestra Historia"
                            className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[400px] transform hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>

                    <div className="md:w-1/2">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Nuestra Historia</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2 mb-6">
                            Tradición y Sabor en Cada Bocado
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            En Los Pollos Hermanos, nos enorgullecemos de ofrecer el pollo frito más crujiente y sabroso de la región.
                            Fundado con la pasión por la cocina auténtica, utilizamos una mezcla secreta de especias y los ingredientes
                            más frescos para garantizar una experiencia inolvidable.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Más que un restaurante, somos una familia dedicada a servir a nuestra comunidad con excelencia y calidez.
                            Ven y descubre por qué somos los favoritos de Albuquerque.
                        </p>

                        <div className="flex gap-8">
                            <div>
                                <span className="block text-3xl font-bold text-primary">15+</span>
                                <span className="text-gray-500 text-sm">Años de Experiencia</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-primary">50k+</span>
                                <span className="text-gray-500 text-sm">Clientes Felices</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-primary">100%</span>
                                <span className="text-gray-500 text-sm">Sabor Auténtico</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
