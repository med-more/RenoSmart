# RenoSmart

**Plateforme de rénovation immobilière** – Site vitrine, demande de devis en ligne et back-office de gestion.

Application web front-end permettant aux clients de déposer une demande de devis et aux administrateurs de gérer ces demandes, consulter des statistiques et des insights générés par l’IA.

---

## Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du projet](#-structure-du-projet)
- [Routes](#-routes)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Documentation](#-documentation)
- [Design](#-design)

---

## Fonctionnalités

### Côté public (client)

| Fonctionnalité | Description |
|----------------|-------------|
| Site vitrine | Pages Accueil, Services, Réalisations, À propos, Contact |
| Demande de devis | Formulaire complet (nom, type de travaux, budget, description) |
| Estimation | Budget estimatif, durée et matériaux suggérés |
| Réalisations | Galerie de projets réalisés avec détails |
| Autres pages | Extension, Aménagement, Conseils, FAQ, Politiques |

### Côté administrateur

| Fonctionnalité | Description |
|----------------|-------------|
| Dashboard | Statistiques, graphiques, dernières demandes, insights IA |
| Demandes | Liste avec filtres, pagination, tri par date |
| Détail demande | Infos complètes, changement de statut, notes internes |
| Réalisations | Ajout et gestion des projets réalisés |
| Insights IA | Recommandations générées par Gemini (Google) à partir des données |

---

## Technologies

| Technologie | Rôle |
|-------------|------|
| **React 19** | Interface utilisateur, composants |
| **Vite** | Build et développement |
| **React Router DOM** | Navigation et routing |
| **Redux Toolkit** | État global (demandes, chargement, UI) |
| **Axios** | Appels API HTTP |
| **Tailwind CSS** | Styles |
| **Framer Motion** | Animations |
| **Formik + Yup** | Formulaires et validation |
| **Mock API** | Simulation du backend (données) |
| **n8n** | Automatisations (webhooks : notifications, emails) |
| **Google Gemini** | Insights IA sur le dashboard |
| **Vitest + Testing Library** | Tests unitaires |

---

## Installation

### Prérequis

- Node.js 18+
- npm ou pnpm

### Étapes

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd RenoSmart

# Installer les dépendances
npm install

# Créer un fichier .env et renseigner les variables (voir Configuration)

# Lancer en développement
npm run dev
```

L’application sera disponible sur `http://localhost:5173`.

---

## Configuration

### Variables d’environnement

Créer un fichier `.env` à la racine :

```env
# Mock API (requis)
VITE_MOCKAPI_BASE_URL=https://VOTRE_ID.mockapi.io/api/v1/renovations

# n8n – webhooks (optionnel)
VITE_N8N_QUOTE_WEBHOOK_URL=https://...
VITE_N8N_STATUS_WEBHOOK_URL=https://...
VITE_N8N_SEND_DETAILS_WEBHOOK_URL=https://...

# Gemini – insights IA sur le dashboard (optionnel)
VITE_GEMINI_API_KEY=...
```

### Mock API

1. Créer un compte sur [MockAPI](https://mockapi.io/)
2. Créer un projet avec les ressources `renovations` (et optionnellement `projects` pour les réalisations)
3. Copier l’URL dans `VITE_MOCKAPI_BASE_URL`

### Images

Les images sont servies depuis le dossier `public/` :

- Racine : `1.png`, `2.png`, `3.png`, `4.png`, `5.png`, `6.png`, `alOmran.png`, etc.
- Sous-dossier : `public/images/` pour la page About (`about.png`, `construction-batiments.png`, etc.)

Voir `public/images/IMAGES_NEEDED.md` pour la liste complète.

---

## Structure du projet

```
RenoSmart/
├── public/                 # Assets statiques (images)
│   └── images/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── home/          # Sections page d'accueil
│   │   ├── layout/        # MainLayout, Navbar, Footer, AdminLayout
│   │   └── renovation/    # Composants liés à la rénovation
│   ├── pages/             # Pages de l'application
│   │   ├── admin/        # Dashboard, Requests, RenovationDetails, Realizations
│   │   └── ...
│   ├── routes/           # AppRoutes.jsx
│   ├── services/         # API, renovationService, realizationsService, aiService
│   ├── store/            # Redux (renovationSlice, uiSlice)
│   ├── tests/            # Setup Vitest
│   ├── utils/            # Constantes, validation, calculs
│   ├── App.jsx
│   └── main.jsx
├── docs/                  # Documentation détaillée
│   ├── TECHNOLOGY_EXPLAINED.md
│   ├── TESTS_README.md
│   └── PRESENTATION_JURY_CANVA.md
├── vercel.json           # Config Vercel (rewrites SPA)
├── vite.config.js
└── package.json
```

---

## Routes

### Public

| Route | Page |
|-------|------|
| `/` | Accueil |
| `/services` | Liste des services |
| `/services/:id` | Détail d'un service |
| `/about` | À propos |
| `/contact` | Contact |
| `/renovation` | Rénovation |
| `/realisations` | Réalisations |
| `/realisations/:id` | Détail d'une réalisation |
| `/devis` | Demande de devis |
| `/faq` | FAQ |
| `/politiques` | Politiques |
| `/extension` | Extension |
| `/amenagement` | Aménagement |
| `/conseils` | Conseils |

### Admin

| Route | Page |
|-------|------|
| `/admin/login` | Connexion admin |
| `/admin` | Dashboard |
| `/admin/requests` | Liste des demandes |
| `/admin/requests/:id` | Détail d'une demande |
| `/admin/realizations` | Liste des réalisations |
| `/admin/realizations/add` | Ajouter une réalisation |

---

## Tests

Le projet utilise **Vitest** et **React Testing Library**.

```bash
# Lancer les tests en mode watch
npm run test

# Lancer une seule fois (CI)
npm run test:run

# Interface UI des tests
npm run test:ui
```

Voir `docs/TESTS_README.md` pour la documentation détaillée des tests.

---

## Déploiement

### Vercel

1. Connecter le dépôt Git à [Vercel](https://vercel.com)
2. Configurer les variables d’environnement dans le projet Vercel
3. Le fichier `vercel.json` gère les rewrites pour les routes SPA (ex. `/admin`)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

4. Le build utilise `npm run build` ; le dossier de sortie est `dist/`.

### Variables d'environnement en production

- `VITE_MOCKAPI_BASE_URL` : requis pour les données
- `VITE_GEMINI_API_KEY` : optionnel (insights IA)
- `VITE_N8N_*_WEBHOOK_URL` : optionnel (automatisations)

---

## Documentation

| Document | Contenu |
|----------|---------|
| `docs/TECHNOLOGY_EXPLAINED.md` | React, Redux, Axios, Mock API, n8n, IA (Gemini) |
| `docs/TESTS_README.md` | Tests : stack, commandes, exemples |
| `docs/PRESENTATION_JURY_CANVA.md` | Plan de présentation jury |
| `docs/PROMPT_GAMMA_PRESENTATION.md` | Prompt pour générer une présentation (Gamma) |

---

## Design

- **Couleurs** : Teal (#00AEAE), Orange (#FF6B35)
- **Typographie** : Inter (Google Fonts)
- **Style** : Moderne, épuré, responsive

---

## Notes

- **Authentification admin** : simplifiée pour la démo (pas de vraie auth).
- **Mock API** : backend simulé ; en production, remplacer par une vraie API.
- **Images** : doivent être présentes dans `public/` et commitées pour le déploiement.

---

**Projet développé dans le cadre du Projet Fil Rouge – AI Augmented Front-End**
