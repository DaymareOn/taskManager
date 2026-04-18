# 📋 Vibe Coded Task Manager

Une application web de gestion de tâches moderne, 100% client-side avec stockage en JSON via localStorage.

## 🎯 Caractéristiques

- ✅ Gestion complète des tâches (CRUD)
- 📊 Filtrage par statut, priorité et recherche
- 💾 Persistance locale en JSON (localStorage)
- 🎨 Interface moderne et responsive
- 📱 Compatible mobile
- ⚡ Développement rapide avec Vite
- 🔒 TypeScript pour la sécurité des types
- 📦 Zustand pour la gestion d'état

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Setup

bash
# Cloner le repository
git clone https://github.com/DaymareOn/vibeCodedTaskManager.git
cd vibeCodedTaskManager

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build


L'application sera accessible sur http://localhost:3000

## 📁 Structure du Projet

```
src/
├── components/        # Composants UI
│   ├── FilterBar.ts
│   ├── TaskCard.ts
│   ├── TaskForm.ts
│   └── TaskList.ts
├── store/            # Gestion d'état (Zustand)
│   └── taskStore.ts
├── styles/           # Feuilles de style
│   └── main.css
├── types/            # Définitions TypeScript
│   └── Task.ts
├── utils/            # Utilitaires
│   ├── dom.ts
│   └── storage.ts
└── main.ts           # Point d'entrée
```

## 📋 Modèle de Données

### Task
```typescript
interface Task {
  id: string;                                    // UUID généré
  title: string;                                 // Titre de la tâche
  description: string;                           // Description
  status: 'todo' | 'in-progress' | 'done';      // Statut
  priority: 'low' | 'medium' | 'high';          // Priorité
  createdAt: string;                             // Date de création (ISO)
  updatedAt: string;                             // Dernière modification (ISO)
  dueDate?: string;                              // Date d'échéance optionnelle
  tags: string[];                                // Étiquettes
}
```

## 🛠️ Outils de Développement

- **Vite** - Bundler ultra-rapide
- **TypeScript** - Typage statique
- **Zustand** - Gestion d'état légère
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

### Commandes disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Linting
npm run lint

# Formatage du code
npm run format
```

## 💾 Stockage des Données

Les tâches sont sauvegardées en JSON dans le localStorage du navigateur :

- **Clé de stockage** : tasks_data
- **Format** : JSON array
- **Persistance** : Automatique à chaque modification

### Export/Import

L'utilitaire StorageManager fournit des méthodes pour :
- ✅ Sauvegarder les tâches
- ✅ Charger les tâches
- ✅ Exporter en JSON
- ✅ Importer depuis JSON
- ✅ Effacer les données

## 🎨 Customisation

### Couleurs (CSS Variables)

Modifiez les variables CSS dans src/styles/main.css :

```css
:root {
  --primary: #6366f1;
  --secondary: #ec4899;
  --success: #10b981;
  /* ... */
}
```

### Ajouter une nouvelle fonctionnalité

1. **Créer un nouveau composant** dans src/components/
2. **Ajouter l'action au store** dans src/store/taskStore.ts
3. **Intégrer dans main.ts**
4. **Ajouter les styles** dans src/styles/main.css

## 🔄 Workflow de Développement

1. Créer une branche : git checkout -b feature/ma-fonctionnalite
2. Développer avec npm run dev
3. Formater le code : npm run format
4. Linter : npm run lint
5. Commit et push
6. Créer une PR

## 📦 Déploiement

### Vercel
```bash
npm run build
# Push sur GitHub
# Vercel déploie automatiquement
```

### GitHub Pages
```bash
npm run build
# Copier le contenu de 'dist/' vers gh-pages
git push origin --all
```

### Serveur statique
```bash
npm run build
# Servir les fichiers du dossier 'dist/'
```

## 📝 Licence

GPL v3.0

## 👨‍💻 Auteur

DaymareOn

## 🙏 Best Practices Implémentées

✅ TypeScript pour la sécurité des types  
✅ Composants modulaires et réutilisables  
✅ State management avec Zustand  
✅ Stockage persistant en JSON  
✅ Responsive design  
✅ ESLint + Prettier  
✅ Vite pour les performances  
✅ Code organisé et structuré  

---

Bon développement ! 🚀