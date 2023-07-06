# balades-immersives

Projet réalisé dans le cadre de l'UE5 - Projets Tutorés.
Par Julien CHAMPOL, Maxime DUCAMIN, Julien DESSAIGNE et Olivier BUTTNER.

L'Université de Bordeaux a souhaité offrir la possibilité de découvrir le patrimoine de ses bâtiments.

Il consiste en la prise de photos panoramique travaillées pour permettre un déplacement dans l'espace.

### Répartition

Julien DESSAIGNE 

- Montée en compétences sur Three.js et interaction avec React
- Création des points d'intérets et des déplacements
- Utilisation de l'API pour le fonctionnement des vues 360°
- Prise de photos
- Intégration des vues 360° dans le front
- Typage des points d'intérets
- CSS

Julien CHAMPOL

- Gestion des repos Github
- Déploiement des projets
- CI/CD
- Nom de domaine
- Passage en https avec Certbot
- Review de code
- Administration du VPS : mise en place pm2, nginx ...
- Déplacement sur la carte interactive
- Liste des bâtiments
- Mise à jour des utilisateurs
- Mise à jour des bâtiments

Olivier BUTTNER

- Création de l'API
- Création de la carte interactive
- Création des markers
- Interface administration
- Création de bâtiments ou d'utilisateurs
- Création des supports autour du projet ( email, mongoDB, Cloudinary)

Maxime DUCAMIN

- Mdp hash + page de login
- Model des scene 360
- Mise en place de la vue 360
- Fondu d’entrée et de sortie de scene
- Garder la caméra dans le sens du déplacement
- Prise de photo du rez de chaussée
- Rework des sprites pour les tooltip

### Lancement déployé

Aucune commande à prévoir, un CI/CD est présent pour déployer la branche master automatiquement
Il suffit de faire un push de sa branche et faire un merge request pour que le déploiement se fasse.
ATTENTION, le push sur la branche master n'est pas possible

### Lancement en local

En local, le projet se lance par les commandes:
- npm i       pour installer les dépendances
- npm start pour lancer le serveur sur le port 3002




