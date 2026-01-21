# RenoSmart - Plateforme de Rénovation Immobilière avec Devis Intelligent

Application web front-end dédiée à la rénovation immobilière, permettant aux utilisateurs de décrire leurs besoins en travaux et d'obtenir une estimation automatique (devis) incluant le budget estimatif, les matériaux nécessaires et la durée approximative des travaux.

## 🎯 Fonctionnalités

### Côté Utilisateur
- ✅ Demande de rénovation avec formulaire complet
- ✅ Génération automatique de devis estimatif
- ✅ Chatbot intelligent (IA) pour l'accompagnement
- ✅ Estimation de budget, durée et matériaux nécessaires
- ✅ Interface moderne et intuitive

### Côté Administrateur
- ✅ Dashboard pour consulter toutes les demandes
- ✅ Gestion des statuts (Pending, In Review, Approved, Rejected)
- ✅ Visualisation détaillée de chaque demande
- ✅ Suppression de demandes

## 🛠️ Technologies Utilisées

- **React.js 19+** avec Vite
- **React Router DOM** pour la navigation
- **Redux Toolkit** pour la gestion d'état
- **Axios** pour les appels API
- **Framer Motion** pour les animations
- **Tailwind CSS** pour le styling
- **MockAPI** pour la simulation du backend

## 📦 Installation

1. **Cloner le projet** (si vous avez un dépôt Git)

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer MockAPI**
   - Allez sur [MockAPI](https://mockapi.io/)
   - Créez un compte et un nouveau projet
   - Créez une ressource appelée `renovations`
   - Copiez l'URL de votre API (ex: `https://YOUR_MOCKAPI_ID.mockapi.io/api/v1/renovations`)
   - Ouvrez `src/utils/constants.js`
   - Remplacez `YOUR_MOCKAPI_ID` par votre ID MockAPI :
   ```javascript
   export const MOCKAPI_BASE_URL = 'https://VOTRE_ID.mockapi.io/api/v1/renovations';
   ```

4. **Lancer le projet en développement**
```bash
npm run dev
```

5. **Build de production**
```bash
npm run build
```

## 📁 Structure du Projet

```
RenoSmart/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── chatbot/        # Composant chatbot IA
│   │   ├── layout/         # Navbar, Footer, MainLayout
│   │   └── renovation/     # Composants de rénovation
│   ├── pages/              # Pages de l'application
│   │   ├── admin/         # Pages administrateur
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Renovation.jsx
│   │   └── Services.jsx
│   ├── routes/            # Configuration des routes
│   ├── services/          # Services API et IA
│   ├── store/             # Redux store et slices
│   ├── utils/             # Utilitaires (calculs, constantes)
│   ├── App.jsx
│   └── main.jsx
├── public/
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎨 Design

Le design suit l'inspiration de **Camif Habitat** avec :
- **Couleurs principales** : Teal (#00AEAE) et Orange (#FF6B35)
- **Font** : Inter (Google Fonts)
- **Style** : Moderne, épuré, professionnel

## 🔧 Configuration

### Types de Travaux Disponibles
- Peinture
- Carrelage
- Plomberie
- Électricité
- Autres

### Statuts des Demandes
- `Pending` : En attente
- `In Review` : En cours d'examen
- `Approved` : Approuvé
- `Rejected` : Rejeté

## 📝 Routes Disponibles

- `/` : Page d'accueil
- `/services` : Liste des services
- `/about` : À propos
- `/contact` : Formulaire de contact
- `/renovation` : Formulaire de demande de rénovation
- `/admin` : Dashboard administrateur
- `/admin/requests/:id` : Détails d'une demande

## 🤖 Chatbot IA

Le chatbot utilise une logique simple basée sur l'analyse de mots-clés dans la description de l'utilisateur pour :
- Détecter le type de travaux
- Extraire la surface (en m²)
- Générer une estimation de budget et durée
- Fournir des conseils personnalisés

**Note** : Pour une intégration IA réelle (OpenAI, Claude, etc.), modifiez le fichier `src/services/aiService.js`.

## 📊 Calcul du Devis

Le devis est calculé automatiquement selon :
- **Type de travaux** : Prix par m² variable selon le type
- **Surface** : Multiplié par le prix par m²
- **Durée** : Estimation basée sur le type et la surface
- **Matériaux** : Liste pré-définie par type de travaux

Les règles de calcul se trouvent dans `src/utils/calculateEstimate.js`.

## 🧪 Tests

Les tests peuvent être ajoutés dans le dossier `src/tests/`. Pour installer les outils de test :

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 🚀 Déploiement

### Déploiement sur Vercel

1. **Installer Vercel CLI** (optionnel)
```bash
npm install -g vercel
```

2. **Déployer**
```bash
vercel
```

Ou utilisez directement l'interface Vercel en connectant votre dépôt Git.

3. **Variables d'environnement** (si nécessaire)
   - Ajoutez `VITE_MOCKAPI_BASE_URL` dans les paramètres de déploiement

## 📄 Notes Importantes

- **MockAPI** : Le projet utilise MockAPI pour simuler un backend. Assurez-vous de configurer correctement l'URL dans `src/utils/constants.js`.
- **IA** : Le chatbot utilise actuellement une logique simple. Pour une vraie intégration IA, modifiez `src/services/aiService.js`.
- **Authentification Admin** : L'authentification admin est volontairement simplifiée (pas d'authentification pour la démo).

## 👨‍💻 Développement

Le code est volontairement simple et lisible pour faciliter la compréhension et la présentation au jury. Tous les fichiers sont commentés et structurés de manière logique.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à créer une issue ou à contacter l'équipe de développement.

---

**Projet développé dans le cadre du Projet Fil Rouge – AI Augmented Front-End**
