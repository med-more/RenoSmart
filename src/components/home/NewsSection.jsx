import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const img1 = '/1.png';
const img2 = '/2.png';
const img3 = '/3.png';

const NewsSection = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const newsItems = [
        { 
            id: 1, 
            image: img1, 
            title: 'Comment bien préparer son budget rénovation en 2025 ?',
            category: 'Conseils & Astuces',
            excerpt: 'Découvrez les étapes clés pour estimer le coût de vos travaux et les aides financières disponibles pour votre projet.',
            content: `La préparation d'un budget de rénovation nécessite une approche méthodique et une bonne connaissance des coûts du marché. En 2025, les prix des matériaux et de la main-d'œuvre continuent d'évoluer, rendant cette étape cruciale pour la réussite de votre projet.

**1. Évaluer l'ampleur des travaux**

Avant de chiffrer votre projet, il est essentiel de définir précisément l'ampleur des travaux à réaliser. Faites un état des lieux complet de votre bien et listez toutes les interventions nécessaires. N'hésitez pas à faire appel à un professionnel pour un diagnostic approfondi.

**2. Estimer les coûts par poste**

Chaque type de travaux a son propre coût au m² :
- Rénovation complète : entre 800€ et 1 500€/m²
- Rénovation énergétique : entre 200€ et 400€/m²
- Aménagement intérieur : entre 500€ et 1 000€/m²

**3. Prévoir une marge de sécurité**

Il est recommandé de prévoir une marge de sécurité de 10 à 15% pour faire face aux imprévus, fréquents dans les travaux de rénovation.

**4. Les aides financières disponibles**

En 2025, plusieurs dispositifs peuvent vous aider à financer vos travaux :
- MaPrimeRénov' : jusqu'à 90% des travaux pour les ménages modestes
- Éco-PTZ : prêt à taux zéro jusqu'à 50 000€
- TVA réduite à 5,5% pour certains travaux
- Certificats d'économie d'énergie (CEE)

**5. Planifier le financement**

Une fois le budget estimé, planifiez votre financement. Vous pouvez combiner plusieurs sources : épargne personnelle, prêt bancaire, aides publiques. N'hésitez pas à consulter votre banque pour étudier les meilleures options de financement adaptées à votre situation.`
        },
        { 
            id: 2, 
            image: img2, 
            title: 'Les tendances déco à suivre cette année',
            category: 'Conseils & Astuces',
            excerpt: 'Découvrez les tendances déco qui marqueront l\'année 2025 et comment les intégrer dans votre projet de rénovation.',
            content: `L'année 2025 apporte son lot de nouvelles tendances en matière de décoration intérieure. Entre retour aux matériaux naturels et innovations technologiques, découvrez les styles qui vont marquer cette année.

**1. Les matériaux naturels à l'honneur**

Le bois, la pierre naturelle et les matériaux bruts sont plus que jamais à la mode. Ils apportent chaleur et authenticité à votre intérieur. Privilégiez les essences locales et les finitions naturelles pour un style authentique et durable.

**2. Les couleurs douces et apaisantes**

Les tons beiges, sables et terres cuites remplacent peu à peu les gris froids. Ces couleurs créent une atmosphère cocooning et apaisante, parfaite pour se ressourcer après une longue journée.

**3. L'éclairage intelligent**

L'éclairage devient de plus en plus intelligent et personnalisable. Les systèmes domotiques permettent d'ajuster l'intensité et la couleur de la lumière selon les moments de la journée, créant des ambiances sur mesure.

**4. Les espaces modulaires**

La flexibilité est le maître-mot de 2025. Les espaces modulaires et les cloisons amovibles permettent de s'adapter aux besoins changeants de la famille tout en optimisant l'espace disponible.

**5. Le mix and match des styles**

Fini les intérieurs uniformes ! Le mélange des styles (moderne et vintage, minimaliste et cosy) crée des intérieurs uniques et personnalisés qui reflètent votre personnalité.`
        },
        { 
            id: 3, 
            image: img3, 
            title: 'Rénovation énergétique : les aides disponibles',
            category: 'Conseils & Astuces',
            excerpt: 'Tout savoir sur les différentes aides financières pour vos travaux de rénovation énergétique en 2025.',
            content: `La rénovation énergétique est un enjeu majeur pour réduire votre consommation et vos factures. Heureusement, de nombreuses aides sont disponibles pour vous accompagner dans cette démarche.

**1. MaPrimeRénov' 2025**

MaPrimeRénov' est l'aide principale pour la rénovation énergétique. Elle est accessible à tous les propriétaires, qu'ils soient occupants ou bailleurs. Les montants varient selon vos revenus et les travaux réalisés :
- Ménages très modestes : jusqu'à 90% du montant des travaux
- Ménages modestes : jusqu'à 75%
- Ménages intermédiaires : jusqu'à 50%
- Autres ménages : jusqu'à 30%

**2. L'Éco-PTZ (Éco-Prêt à Taux Zéro)**

Ce prêt sans intérêt peut financer jusqu'à 50 000€ de travaux de rénovation énergétique. Il est cumulable avec MaPrimeRénov' et remboursable sur 20 ans maximum.

**3. La TVA réduite à 5,5%**

Pour les travaux d'amélioration énergétique réalisés dans un logement de plus de 2 ans, la TVA est réduite à 5,5% au lieu de 20%. Cette réduction s'applique automatiquement sur votre facture.

**4. Les Certificats d'Économies d'Énergie (CEE)**

Les CEE, aussi appelés "prime énergie", sont des aides versées par les fournisseurs d'énergie. Le montant varie selon les travaux et peut atteindre plusieurs milliers d'euros.

**5. Les aides locales**

De nombreuses collectivités locales proposent des aides complémentaires. Renseignez-vous auprès de votre mairie ou de votre région pour connaître les dispositifs disponibles dans votre secteur.

**6. Comment bénéficier de ces aides ?**

Pour bénéficier de ces aides, vous devez :
- Faire appel à un professionnel certifié RGE (Reconnu Garant de l'Environnement)
- Respecter les conditions d'éligibilité de chaque dispositif
- Déposer votre dossier avant le début des travaux
- Conserver tous les justificatifs

N'hésitez pas à vous faire accompagner par un conseiller pour optimiser vos démarches et maximiser vos aides.`
        }
    ];

    const openModal = (article) => {
        setSelectedArticle(article);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedArticle(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Notre actualité</h2>
                    <div className="h-1 w-16 bg-orange rounded-full mx-auto mb-12"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newsItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group overflow-hidden border border-gray-100">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="text-orange text-xs font-bold uppercase mb-2 block">Conseils & Astuces</span>
                                    <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug group-hover:text-teal transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                                        {item.excerpt}
                                    </p>
                                    <button 
                                        onClick={() => openModal(item)}
                                        className="inline-flex items-center text-teal font-bold text-sm hover:text-orange transition-colors group/btn"
                                    >
                                        Lire la suite
                                        <svg className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedArticle && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 flex items-center justify-center"
                        >
                            <div className="bg-white rounded-asymmetric shadow-2xl w-full h-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                                <div className="relative h-64 sm:h-80 overflow-hidden">
                                    <img
                                        src={selectedArticle.image}
                                        alt={selectedArticle.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all shadow-lg hover:scale-110 z-10"
                                        aria-label="Fermer"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                                        <span className="inline-block bg-orange text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
                                            {selectedArticle.category}
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                            {selectedArticle.title}
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto">
                                    <div className="p-6 sm:p-8 md:p-10">
                                        <div className="prose prose-sm sm:prose-base max-w-none">
                                            {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                                                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                                    const title = paragraph.replace(/\*\*/g, '');
                                                    return (
                                                        <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3 text-orange">
                                                            {title}
                                                        </h3>
                                                    );
                                                } else if (paragraph.startsWith('**')) {
                                                    // Texte en gras
                                                    const parts = paragraph.split('**');
                                                    return (
                                                        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                                                            {parts.map((part, i) => 
                                                                i % 2 === 1 ? <strong key={i} className="text-gray-900">{part}</strong> : part
                                                            )}
                                                        </p>
                                                    );
                                                } else {
                                                    return (
                                                        <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 bg-gray-50 p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-sm text-gray-600 text-center sm:text-left">
                                            Besoin d'aide pour votre projet de rénovation ?
                                        </p>
                                        <button className="btn-orange whitespace-nowrap">
                                            Demander un devis gratuit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default NewsSection;
