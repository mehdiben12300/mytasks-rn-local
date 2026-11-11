# MyTasks React Native — Version 100% Locale (AsyncStorage)

Application mobile de gestion de tâches réalisée avec **React Native (Expo)**, **React Navigation** et **AsyncStorage** pour une persistance 100% locale sur l'appareil.

## Fonctionnalités
- Composant `TaskCard` avec bordures colorées selon la priorité (`Faible`, `Moyenne`, `Élevée`) et badges de statut (`À faire`, `Terminée`).
- Tableau de bord avec statistiques en temps réel (`Total`, `Terminées`, `À faire`).
- Recherche instantanée et filtres (`Toutes`, `À faire`, `Terminées`).
- Formulaire CRUD réutilisable (Création, Modification, Suppression avec validation).
- Navigation multi-écrans (Accueil, Liste, Détails, Formulaire, Profil) avec barre d'onglets inférieure.
- Persistance hors-ligne complète via `@react-native-async-storage/async-storage`.

## Installation & Lancement
```bash
npm install
npx expo start
```
- Appuyez sur `w` pour lancer dans le navigateur web, ou scannez le QR code avec **Expo Go**.
