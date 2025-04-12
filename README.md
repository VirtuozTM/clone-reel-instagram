# 📱 Clone Reel Instagram

## 📌 Objectif

Ce projet est né d'une simple expérimentation : créer une liste verticale avec des vidéos. Rapidement, le rendu s'est approché du design des Reels d'Instagram… alors j’ai décidé d’aller jusqu’au bout et de cloner l’expérience utilisateur de A à Z. Résultat : une app fluide, animée, immersive et modulable.

## 🎯 Fonctionnalités principales

- **🎥 Lecture auto des vidéos** : Présentation des vidéos dans une grille LegendList irrégulière et optimisée
- **🎮 Swipe vertical fluide** : Navigation par catégories d'images
- **💬 Commentaires** : Application de différents filtres pour affiner les résultats
- **📤 Partage personnalisé** : Recherche d'images via une barre de recherche
- **⚙️ Options rapides** : Affichage des détails d'image dans un BottomSheetModal avec effet de flou en arrière-plan
- **💓 Like animé** : Bouton de retour en haut qui apparaît lors du défilement
- **📝 Description interactive** : Possibilité de rafraîchir la liste d'images
- **🔊 Contrôle play/pause** : Visualisation des images en plein écran
- **🧑‍🤝‍🧑 Suivre un utilisateur** : Sauvegarde des images dans la galerie de l'appareil
- **🎵 Affichage de la musique** : Partage des images sur différentes plateformes et réseaux sociaux

## ⚙️ Technologies utilisées

L'application est développée avec :

- **React Native** via **Expo** pour une expérience fluide et performante
- **Pixabay** pour récupérer des vidéos via leur API.
- **Reanimated** pour des animations fluides et optimisées
- **Skia** pour le rendu graphique haute performance et les effets visuels avancés
- **phosphor-react-native** : icônes stylées et cohérentes
- **legend-list** : liste performante avec recycling
- **expo-image** : pour afficher les images de profil et miniatures

## 📦 Bibliothèques principales

Voici un aperçu des dépendances utilisées dans le projet :

### 🏗️ **Technologies utilisées**

- [@legendapp/list](https://legendapp.com/open-source/list/api/gettingstarted/) - Liste performante avec pagination
- [expo-video](https://docs.expo.dev/versions/latest/sdk/video/) - Composant vidéo avancé
- [react-native-reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/) - Animations fluides et non bloquantes
- [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/) - Bottom sheets dynamiques
- [phosphor-react-native](https://phosphoricons.com/) - Pack d’icônes léger et moderne
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) - Chargement d’image performant

## 🚀 **Comment démarrer ?**

### 1️⃣ Cloner le projet

`git clone https://github.com/VirtuozTM/clone-reel-instagram.git`

`cd clone-reel-instagram`

### 2️⃣ Installer les dépendances

`npm install`

### 3️⃣ Lancer l'application en mode développement

`npm run start`

📌 **Astuce** : Utilisez l'application Expo Go sur votre téléphone pour tester immédiatement l'application !

## 🏆 **Gestion de l’autoplay grâce à Zustand**

Dans cette application, nous avons un feed vertical (type Reels/TikTok) avec FlashList ou LegendList.

Le problème classique : ces listes recyclent les vues pour améliorer les performances. Un état local ou un ref dans le parent ne suffit pas toujours à forcer le re-render correct — ça peut produire un délai avant que la vidéo se lance, voire des vidéos qui ne se lancent pas du tout.

### **La solution** : un store global (Zustand)

1. Stocker l’index visible

`onViewableItemsChanged` détecte l’item majoritairement à l’écran. On appelle `setVisibleVideoIndex(index)` dans le store.

2. Au niveau de chaque composant vidéo, on récupère l’index globalement :

```
const visibleVideoIndex = useVideoStore((state) => state.visibleVideoIndex);
const shouldPlay = (index === visibleVideoIndex);
```

3. Lecture ou pause automatique

Dans le composant vidéo, si shouldPlay est true et que le player est prêt (status === 'readyToPlay'), on appelle player.play(), sinon player.pause().

Résultat : chaque vidéo sait immédiatement quand se lancer ou s’arrêter, sans attendre un re-render incertain du parent.

Pourquoi ça marche ?

- FlashList/LegendList peuvent recycler les composants, mais le store est toujours à jour.
- Dès que l’index visible change, tous les items abonnés reçoivent la mise à jour.
- On évite les soucis de timing ou d’état local potentiellement obsolète dans le parent.

## 📬 Contact

Si vous avez des questions ou suggestions, n'hésitez pas à me contacter ! 😊

**Armand PETIT**

🖥️ Développeur React Native

📧 [armand_petit@outlook.fr](mailto:armand_petit@outlook.fr)

📅 [Réserver un appel](https://calendly.com/armand_petit/30min)
