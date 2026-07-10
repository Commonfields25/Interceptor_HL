# Interceptor_HL — Backlog initial

**Repo:** `Commonfields25/Interceptor_HL`  
**Version:** 0.1 — 2026-07-10  
**Format:** Tickets style Interceptor_M (ID, titre, epic, description, questions ouvertes, criteria done)

---

## EPIC-HL-01 : Cahier des charges VTOL gros porteur

### HL-101 — Spécifications fonctionnelles cibles (AéroVision-X70)

**Epic:** EPIC-HL-01  
**Titre:** Spécifications fonctionnelles cibles (AéroVision-X70)  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Extraire et formaliser toutes les spécifications publiées de l'AéroVision-X70. Rechercher données manquantes (MTOW, config moteur, plafond, rayon d'action) via documentation concurrente et benchmarks marché.

**Livrables:**
- Fiche technique AéroVision-X70 complète (docs/reference/AeroVision-X70.md) ✅ existant
- Tableau comparatif avec Interceptor_M
- Liste des inconnues critiques

**Questions ouvertes:**
- Q1: MTOW exact de l'AéroVision-X70 non publié — comment estimer?
- Q2: D'autres drones VTOL hybrides ~7m有哪些? Y a-t-il des specs公开es?

**Criteria done:**
- [ ] Fiche ref AéroVision-X70 mise à jour avec toutes les specs trouvées
- [ ] Comparatif HL vs M vs X70 en tableau
- [ ] Liste unknowns soumise à review

---

### HL-102 — Analyse réglementaire (catégorie drone, zone de vol)

**Epic:** EPIC-HL-01  
**Titre:** Analyse réglementaire (catégorie drone, zone de vol)  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Identifier la catégorie réglementaire applicable pour un drone de ~120kg, ~7m envergure en France/Europe. Évaluer contraintes : enregistrement, licence pilote, zones de vol autorisées, exigences de sécurité parachute.

**Livrables:**
- Tableau des contraintes réglementaires par pays (France, UE, export)
- Recommandation catégorie et classe
- Liste exigences de sécurité obligatoires

**Questions ouvertes:**
- Q8: Parachute obligatoire? À quelle catégorie?
- Q9: Licence pilote requise pour MTOW > 25kg?

**Criteria done:**
- [ ] Réglementation FR identifiée (catégorie, classe, exigences)
- [ ] Réglementation UE identifiée
- [ ] Checklist conformité parachute/sécurité

---

### HL-103 — Analyse de mission et Use Cases

**Epic:** EPIC-HL-01  
**Titre:** Analyse de mission et Use Cases  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Définir les use cases principaux pour Interceptor_HL : patrol côtier, surveillance montagne, relei communications, inspection d'infrastructure. En déduire les requis secondaires : endurance stationnaire, rayon d'action, altitude operative.

**Livrables:**
- Diagramme use cases
- Matrice missions → specs clés
- Fiche mission type par use case

**Criteria done:**
- [ ] 4+ use cases définis
- [ ] Matrice use cases → specs
- [ ] Validation par retour terrain (si disponible)

---

### HL-104 — Validation cahier des charges v1.0

**Epic:** EPIC-HL-01  
**Titre:** Validation cahier des charges v1.0  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Compiler le cahier des charges v1.0 (EPIC-HL-01.md) et le soumettre à review par au moins 2 reviewers. Intégrer les retours.

**Livrables:**
- Cahier des charges v1.0 finalisé
- Review sign-off documenté

**Criteria done:**
- [ ] Tous les tickets HL-101→103 complétés
- [ ] Review par 2+ reviewers
- [ ] Sign-off dokumenté dans le doc

---

## EPIC-HL-02 : Architecture VTOL et motorisation hybride

### HL-201 — Sélection configuration VTOL (tilt-rotor vs multi-rotor vs hybride)

**Epic:** EPIC-HL-02  
**Titre:** Sélection configuration VTOL  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Comparer les architectures VTOL disponibles pour un drone ~120kg/7m : tilt-rotor (rotors pivotants), multi-rotor dédié (rotors fixes + moteur pousseur), quadplane, hybride à transition. Évaluer compromis masse, complexité, fiabilité, performance.

**Livrables:**
- Analyse de trade-off (poids, complexité, performance)
- Sélection recommandée + justification
- Schéma de l'architecture sélectionnée

**Questions ouvertes:**
- Q1: Config VTOL exacte de l'AéroVision-X70 non connue
- Q4: Hybride parallèle ou série?

**Criteria done:**
- [ ] 3+ architectures évaluées
- [ ] Matrice de trade-off complétée
- [ ] Recommandation validée

---

### HL-202 — Sélection moteur essence / générateur

**Epic:** EPIC-HL-02  
**Titre:** Sélection moteur essence / générateur  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Identifier et sélectionner le moteur essence (2T ou 4T) ou le groupe électrogène approprié pour un drone VTOL ~120kg avec autonomie 10h. Considérer : puissance (10–30kW), poids, consommation spécifique, fiabilité, disponibilité.

**Livrables:**
- Short-list 3–5 moteurs/alternateurs candidates
- Fiche technique par candidate
- Sélection recommandée + justification

**Questions ouvertes:**
- Q3: Type moteur essence et puissance?

**Criteria done:**
- [ ] 3+ candidates identifiées
- [ ] Comparatif poids/puissance/consommation
- [ ] Sélection documentée

---

### HL-203 — Architecture hybride : parallèle vs série

**Epic:** EPIC-HL-02  
**Titre:** Architecture hybride parallèle vs série  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Définir si le système hybride utilise une architecture parallèle (moteur essence + moteurs électriques en direct) ou série (moteur essence → générateur → batteries → moteurs électriques). Évaluer autonomie, complexité, maintenance.

**Livrables:**
- Schéma architecture hybride
- Analyse de trade-off parallèle vs série
- Sélection recommandée

**Questions ouvertes:**
- Q4: Hybride parallèle ou série?

**Criteria done:**
- [ ] Schéma des deux architectures
- [ ] Trade-off autonomie/complexité/masse
- [ ] Sélection documentée

---

### HL-204 — Dimensionnement propulsion VTOL (rotors, ESC, contrôle)

**Epic:** EPIC-HL-02  
**Titre:** Dimensionnement propulsion VTOL  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Dimensionner les rotors et moteurs électriques VTOL (nombre, diamètre, pas, poussée unitaire) pour soutenir le MTOW en vol stationnaire avec marge de sécurité. Sélectionner ESC et système de contrôle.

**Livrables:**
- Tableau dimensionnement rotors (nb x dia x poussée)
- Sélection moteurs et ESC
- Fiche motorisation VTOL

**Criteria done:**
- [ ] Poussée totale ≥ 1.5 x MTOW
- [ ] Nombre de rotors sélectionné
- [ ] Sélection moteurs + ESC documentée

---

### HL-205 — Dimensionnement propulsion croisière (pousseur ou rotors)

**Epic:** EPIC-HL-02  
**Titre:** Dimensionnement propulsion croisière  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Dimensionner le système de propulsion en vol horizontal (moteur pousseur ou rotors inclinés) pour atteindre 70–120 km/h avec consommation optimale. Calculer puissance nécessaire, sélectionner moteur/hélice.

**Livrables:**
- Calcul puissance cruise vs vitesse
- Sélection moteur pousseur ou configuration
- Fiche propulsion cruise

**Criteria done:**
- [ ] Vitesse cruise ≥ 70 km/h confirmée
- [ ] Sélection propulsion cruise documentée

---

### HL-206 — Gestion batterie et gestion d'énergie (BMS, distribution)

**Epic:** EPIC-HL-02  
**Titre:** Gestion batterie et énergie  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Concevoir le système de gestion d'énergie : batterie de vol (Li-ion 6S–12S?), BMS, distribution électrique, protection, monitoring. Définir la capacité pour le режиме VTOL et la marge de sécurité.

**Livrables:**
- Schéma architecture électrique
- Sélection batterie + BMS
- Plan de gestion d'énergie (charge, équilibre, protection)

**Criteria done:**
- [ ] Schéma électrique complet
- [ ] Capacité batterie dimensionnée
- [ ] BMS sélectionné

---

## EPIC-HL-03 : Dimensionnement structure et masse

### HL-301 — Analyse de trade-off structure : full carbone vs composite mixte

**Epic:** EPIC-HL-03  
**Titre:** Trade-off structure full carbone vs composite mixte  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Comparer une structure entièrement en fibre de carbone (légère, rigide, coûteuse) vs une structure composite mixte (carbone/fibre de verre/aluminium) pour le fuselage, les ailes et les nacelles. Estimer le gain/compromis en masse et en coût.

**Livrables:**
- Analyse de trade-off masse/coût/fabrication
- Recommandation matériaux par composant
- Estimation masse totale par scénario

**Questions ouvertes:**
- Q6: Matériaux structure?

**Criteria done:**
- [ ] 2+ scénarios matériaux analysés
- [ ] Estimation masse par scénario
- [ ] Recommandation validée

---

### HL-302 — Dimensionnement fuselage (volume, charge utile, centrage)

**Epic:** EPIC-HL-03  
**Titre:** Dimensionnement fuselage  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Définir la géométrie et les dimensions du fuselage pour accueillir : bay payload 50kg, bay avionique, bay carburant, structures moteur. Vérifier la compatibilité avec le CG en vol VTOL et cruise.

**Livrables:**
- Geométrie fuselage (longueur, section, volume)
- Plan d'implantation (payload, avionique, carburant, moteur)
- Fiche CG et centrage

**Questions ouvertes:**
- Q5: Capacité carburant pour 10h?

**Criteria done:**
- [ ] Volume payload 50kg confirmé
- [ ] Plan d'implantation complet
- [ ] CG en VTOL et cruise calculé

---

### HL-303 — Dimensionnement ailes et voilure

**Epic:** EPIC-HL-03  
**Titre:** Dimensionnement ailes et voilure  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Concevoir la voilure fixe (envergure ~7m) : profil aérodynamique, surface alaire, longerons, longerons. Calculer la portance nécessaire pour le MTOW et la vitesse de croisière. Estimer la masse de la voilure.

**Livrables:**
- Sélection profil (NACA series? Clark? )
- Calcul surface alaire et envergure
- Design structurel de la voilure
- Estimation masse voilure

**Criteria done:**
- [ ] Portance suffisante au MTOW confirmée
- [ ] Structure voilure conçue
- [ ] Masse voilure estimée < X kg

---

### HL-304 — Design train atterrissage et sécurités structurelles

**Epic:** EPIC-HL-03  
**Titre:** Design train atterrissage et sécurités  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Concevoir le train d'atterrissage (tricycle, dimensionné pour MTOW 120kg, vitesse d'approche). Définir les sécurités structurelles : parachute, crash pads, points de rupture intentionnelle.

**Livrables:**
- Design train atterrissage
- Calcul résistance et course de suspension
- Design système parachute si requis
- Points de rupture documentés

**Questions ouvertes:**
- Q8: Parachute obligatoire?

**Criteria done:**
- [ ] Train dimensionné pour MTOW 120kg
- [ ] Parachute décidé (requis ou optionnel)
- [ ] Points de rupture documentés

---

### HL-305 — Budget masse et BOM préliminaire

**Epic:** EPIC-HL-03  
**Titre:** Budget masse et BOM préliminaire  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Établir le budget masse hiérarchique : allouer la masse disponible (MTOW 120kg - payload 50kg = 70kg disponibles pour structure+motorisation+avionique+carburant). Générer une BOM préliminaire avec estimations par sous-système.

**Livrables:**
- Budget masse par sous-système
- BOM préliminaire (Excel/CSV)
- Matrice d'allocation masse → sous-systèmes

**Criteria done:**
- [ ] MTOW < 120kg confirmé
- [ ] BOM préliminaire avec totaux par sous-système
- [ ] Validation budget masse vs réalité

---

### HL-306 — Analyse CG et enveloppe de vol

**Epic:** EPIC-HL-03  
**Titre:** Analyse CG et enveloppe de vol  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Calculer le CG de l'aéronef en configuration nominale et aux limites de charge utile/carburant. Vérifier l'enveloppe CG vs limites structurales. Valider la stabilité en VTOL et cruise.

**Livrables:**
- Fichier CG par configuration (payload, carburant)
- Diagramme enveloppe CG
- Validation stabilité VTOL et cruise

**Criteria done:**
- [ ] CG nominal calculé
- [ ] Enveloppe CG vs limites validée
- [ ] Stabilité en VTOL et cruise confirmée

---

## EPIC-HL-04 : Avionique, capteurs et station sol

### HL-401 — Sélection flight controller et capteurs de vol

**Epic:** EPIC-HL-04  
**Titre:** Sélection flight controller et capteurs de vol  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Sélectionner le flight controller (Pixhawk? CUAV? custom?) pour un drone VTOL ~120kg, supporter la redondance, la transition automatique, et les capteurs de vol (IMU, baro, GPS, compas).

**Livrables:**
- Short-list FC candidates
- Sélection recommandée
- Schéma câblage FC → capteurs

**Criteria done:**
- [ ] FC sélectionné (redondant si nécessaire)
- [ ] Capteurs de vol listés
- [ ] Schéma câblage produit

---

### HL-402 — Sélection package EO/IR et LRF

**Epic:** EPIC-HL-04  
**Titre:** Sélection package EO/IR et LRF  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Identifier et sélectionner les capteurs optroniques (caméra jour/nuit, IR, télémètre laser) pour la charge utile de surveillance. Considérer les contraintes de masse (~5–10kg), de puissance, et d'interface.

**Livrables:**
- Short-list EO/IR candidates
- Short-list LRF candidates
- Sélection recommandée
- Estimation masse + puissance

**Criteria done:**
- [ ] EO/IR sélectionné (masse < 10kg)
- [ ] LRF sélectionné
- [ ] Interface données documentée

---

### HL-403 — Conception système relais communications

**Epic:** EPIC-HL-04  
**Titre:** Conception système relais communications  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Concevoir le module relais communications (payload) : fréquences (UHF? VHF? satellite?), puissance, débit, compatibilité avec stations sol standards.

**Livrables:**
- Spécifications relais comm (fréquence, puissance, portée)
- Design système (antenne, émetteur, interface)
- Estimation masse + puissance

**Criteria done:**
- [ ] Bande de fréquence sélectionnée
- [ ] Portée > X km confirmée
- [ ] Estimation masse + puissance

---

### HL-404 — Sélection liaison sol (radio, portée, latence)

**Epic:** EPIC-HL-04  
**Titre:** Sélection liaison sol  
**Statut:** 🟡 À faire  
**Priorité:** P0 (blocant)

**Description:** Sélectionner la radio de liaison sol (telemetry + video down-link) avec portée suffisante pour les missions HL (estimation 10–30km+). Considérer latence, redondance, encryption.

**Livrables:**
- Short-list radios candidates (siama? crossfire? custom?)
- Sélection recommandée
- Estimation portée + latence

**Criteria done:**
- [ ] Radio sélectionnée (portée ≥ X km)
- [ ] Latence < X ms confirmée
- [ ] Redondance si nécessaire

---

### HL-405 — Conception station sol (hardware, software, interface)

**Epic:** EPIC-HL-04  
**Titre:** Conception station sol  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Concevoir la station sol complète : hardware (PC terrain, écran, contrôleurs), software (QGC? Mission Planner? custom?), et interface opérateur. Définir les protocoles de communication et le flux de données.

**Livrables:**
- Spécifications hardware station sol
- Sélection software GCS
- Design interface opérateur
- Protocoles de communication documentés

**Criteria done:**
- [ ] Hardware station sol spécifié
- [ ] Software GCS sélectionné
- [ ] Protocoles documentés

---

### HL-406 — Redondance avionique et sécurité en vol

**Epic:** EPIC-HL-04  
**Titre:** Redondance avionique et sécurité  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Concevoir le système de redondance avionique : double FC, double GPS, double radio, battery monitoring. Définir les procédures de failover et les sécurités (return-to-home, land, parachute trigger).

**Livrables:**
- Schéma architecture redondante
- Logique de failover documentée
- Plan de tests redondance

**Criteria done:**
- [ ] Architecture redondante conçue
- [ ] Logique failover documentée
- [ ] Scénarios de défaillance analysés

---

### HL-407 — Câblage et connectique complet

**Epic:** EPIC-HL-04  
**Titre:** Câblage et connectique  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Concevoir le harnais électrique complet : câblage moteur, ESC, FC, capteurs, radio, batterie, parachute. Définir les connecteurs, les calibre des câbles, et les protections (fuse, diode).

**Livrables:**
- Schéma de câblage complet
- Liste des connecteurs et calibres
- Plan de routing et protection

**Criteria done:**
- [ ] Schéma câblage complet
- [ ] BOM câblage (connecteurs, câbles, protections)
- [ ] Routing documenté

---

### HL-408 — Intégration software de vol (firmware, tuning, modes)

**Epic:** EPIC-HL-04  
**Titre:** Intégration software de vol  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Configurer et tuner le firmware du FC pour le VTOL HL : modes de vol, transitions, PID tuning, fail-safes, calibration des capteurs. Documenter les paramètres et les procédures de tuning.

**Livrables:**
- Configuration firmware (paramètres clés)
- Procédure de tuning
- Modes de vol documentés
- Checklist pre-flight

**Criteria done:**
- [ ] Firmware configuré pour VTOL HL
- [ ] PID tuning documenté
- [ ] Checklist pre-flight rédigée

---

## EPIC-HL-05 : CAD paramétrique préliminaire

### HL-501 — Setup environnement CAD paramétrique

**Epic:** EPIC-HL-05  
**Titre:** Setup environnement CAD paramétrique  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Choisir et configurer l'environnement CAD (Onshape? Fusion 360? FreeCAD? SolidWorks?) avec templates, bibliothèques de composants standards, et système de versioning CAD. Définir les conventions de nommage.

**Livrables:**
- Choix outil CAD justifié
- Template projet HL créé
- Conventions de nommage documentées
- Bibliothèque composants standards

**Criteria done:**
- [ ] Outil CAD sélectionné
- [ ] Template projet créé
- [ ] Conventions documentées

---

### HL-502 — Maquette fuselage coarse (geometry only, no details)

**Epic:** EPIC-HL-05  
**Titre:** Maquette fuselage coarse  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Créer une maquette CAD coarse du fuselage (geometry only, aucun détail) basée sur les dimensions cibles (longueur ~3004mm, section, volume payload). Valider l'encombrement et l'implantation.

**Livrables:**
- Maquette fuselage coarse
- Validation dimensions vs cahier des charges
- Export STEP/IGES pour review

**Criteria done:**
- [ ] Maquette < 2h de travail
- [ ] Dimensions validées
- [ ] Export disponible

---

### HL-503 — Maquette voilure coarse

**Epic:** EPIC-HL-05  
**Titre:** Maquette voilure coarse  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Créer une maquette CAD coarse de la voilure (envergure ~6970mm) : plan de voilure, profil, longerons approximatifs. Valider la surface alaire et l'intégration avec le fuselage.

**Livrables:**
- Maquette voilure coarse
- Calcul surface alaire
- Validation intégration fuselage/voilure

**Criteria done:**
- [ ] Maquette voilure < 2h
- [ ] Surface alaire calculée
- [ ] Intégration validée

---

### HL-504 — Maquette nacelles VTOL coarse

**Epic:** EPIC-HL-05  
**Titre:** Maquette nacelles VTOL coarse  
**Statut:** 🟡 À faire  
**Priorité:** P2

**Description:** Créer une maquette CAD coarse des nacelles VTOL (nombre, position, dimensions) selon la configuration VTOL sélectionnée (HL-201). Valider la clearance avec les ailes et le fuselage en mode VTOL.

**Livrables:**
- Maquettes nacelles VTOL coarse
- Positionnement validé (clearance VTOL)
- Schéma de rotation/pivot documenté

**Criteria done:**
- [ ] Nacelles positionnées
- [ ] Clearance validée
- [ ] Mécanisme de pivot/rotation esquissé

---

### HL-505 — Assemblage préliminaire HL (full aircraft)

**Epic:** EPIC-HL-05  
**Titre:** Assemblage préliminaire HL  
**Statut:** 🟡 À faire  
**Priorité:** P1

**Description:** Assembler la maquette CAD complète (tous les sous-ensembles coarse) pour valider l'intégration globale : fuselage, voilure, nacelles, train, antennes, capteurs. Vérifier les collisions et les clearance.

**Livrables:**
- Assemblage CAD complet (coarse)
- Vérification collisions
- Export PDF/rendering pour présentation

**Criteria done:**
- [ ] Assemblage complet
- [ ] Zéro collision majeure
- [ ] Rendering disponible pour review

---

## Résumé du backlog

| Epic | Tickets | Status |
|---|---|---|
| EPIC-HL-01 | HL-101 → HL-104 | 🟡 À faire |
| EPIC-HL-02 | HL-201 → HL-206 | 🟡 À faire |
| EPIC-HL-03 | HL-301 → HL-306 | 🟡 À faire |
| EPIC-HL-04 | HL-401 → HL-408 | 🟡 À faire |
| EPIC-HL-05 | HL-501 → HL-505 | 🟡 À faire |
| **Total** | **37 tickets** | |

---

## Format ticket utilisé

Inspiré du repo Interceptor_M (`clipboard.txt` → format ticket backlog) :

- **ID**: HL-XXX (épique + numéro séquentiel)
- **Epic**: Référence à l'épopée
- **Titre**: Résumé court
- **Statut**: 🟡 À faire | 🟢 En cours | ✅ Done | ❌ Bloqué
- **Priorité**: P0 (blocant) | P1 (important) | P2 (secondaire)
- **Description**: Contexte, livrables attendus
- **Questions ouvertes**: Points à trancher avant de avancer
- **Criteria done**: Conditions de complétion