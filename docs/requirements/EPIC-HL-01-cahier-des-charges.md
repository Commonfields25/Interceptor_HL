# EPIC-HL-01 — Cahier des charges : drone VTOL gros porteur longue endurance

**Epic ID:** EPIC-HL-01  
**Titre:** Cahier des charges VTOL gros porteur  
**Statut:** 🟡 En cours — premier jet derive de l'AéroVision-X70  
**Repo:** `Commonfields25/Interceptor_HL`  
**Date:** 2026-07-10  
**Responsable projet:** TBD  
**Version:** 0.1 (draft initial)

---

## 1. Contexte et objectifs

Le projet **Interceptor_HL** (Heavy Lift) vise à concevoir un drone VTOL hybride gros porteur longue endurance, concurrent direct de l'AéroVision-X70 (Europe-Connection).

L'objectif est de produire un aéronef capable de missions de surveillance stationnaire et patrol sur de longues périodes, avec une charge utile significative (~50 kg), dans des environnements variés : montagne, côte, forêt, zone urbaine dense.

### 1.1 Référentiel

- **Concurrent principal:** AéroVision-X70 — Europe-Connection
- **Gamme sœeur:** Interceptor_M (Modular) — drone d'interception rapide, 1.6m/6kg
- **Échelle de référence:** environ 4x l'Interceptor_M en dimensions, ~20x en masse

---

## 2. Spécifications fonctionnelles cibles

> ⚠️ Toutes les valeurs ci-dessous sont des **cibles initiales**, à valider par l'analyse technique (EPIC-HL-03).

### 2.1 Aéronef

| Paramètre | Cible | Source / notes |
|---|---|---|
| **Configuration** | VTOL hybride (voilure fixe + rotors) | Analogue AéroVision-X70 |
| **Envergure** | ~6970 mm | Ref AéroVision-X70 |
| **Longueur** | ~3004 mm | Ref AéroVision-X70 |
| **MTOW** | ~120 kg (payload 50kg incluse) | Estimation — à valider |
| **Charge utile** | jusqu'à 50 kg | Ref AéroVision-X70 |
| **Masse à vide** | ~70 kg (estimation) | Estimation — à valider par analyse |
| **Autonomie** | 8–10 h | Ref AéroVision-X70 |
| **Vitesse croisière** | 70–120 km/h | Ref AéroVision-X70 |
| **Vitesse max** | ~120 km/h | Ref AéroVision-X70 |
| **Résistance vent** | 13,8 m/s (≈50 km/h) | Ref AéroVision-X70 |
| **Plafond de vol** | TBD | Recherche concurents + analyse |
| **Rayon d'action** | TBD | Recherche concurents + analyse |

### 2.2 Motorisation

| Paramètre | Cible | Notes |
|---|---|---|
| **Architecture** | Hybride essence + électrique | À valider (tilt-rotor? multi-rotor+pousseur?) |
| **Moteur essence** | ~10–30 kW (estimation) | Alimentation générateur ou propulsion directe |
| **Moteurs électriques** | Poussée VTOL → ~4–8 rotors electriques | Dépend de la config VTOL |
| **Carburant** | Essence sans plomb | Capacité à définir (pour 8–10h) |
| **Batterie** | Li-ion / LiPo (backup VTOL ou hybride série) | Capacité à définir |
| **Transition VTOL→croisière** | Automatique, pilotée par FC | Sécurisée |

### 2.3 Capteurs et avionique

| Paramètre | Cible | Notes |
|---|---|---|
| **EO/IR** | Caméra optronée jour/nuit | Payload standard ~5–10 kg |
| **LRF** | Télémètre laser longue portée | Estimation ~2–5 kg |
| **Relais comm** | Module relais communications | Estimation ~2–5 kg |
| **Flight controller** | Pixhawk ou équivalent | Open-source, redondant |
| **GPS / RTK** | GPS + RTK pour précision | Positionnement stationnaire |
| **Liaison sol** | Radio longue portée (10–30 km?) | TBD |
| **Station sol** | PC terrain + software dédié | TBD |

### 2.4 Structure et matériaux

| Paramètre | Cible | Notes |
|---|---|---|
| **Matériaux principaux** | Composite carbone / fibre de verre sandwich | Réduction masse, rigidité structurelle |
| **Fuselage** | Monocoque ou structurelle composite | Volume pour payload 50kg |
| **Ailes** | Voilure fixe, longerons carbone | Envergure ~7m — structure légère |
| **Nacelles VTOL** | Aluminium ou composite | Rotation tilt ou moteurs fixes dédiés |
| **Train atterrissage** | Tricyle, rétractable ou fixe | Dimensionné pour MTOW 120kg |
| **Sécurité** | Parachute? Redondance? E-STOP? | À definir |

---

## 3. Questions ouvertes / décisions critiques

| # | Question | Impact | Ticket associé |
|---|---|---|---|
| Q1 | **Config VTOL : tilt-rotor ou multi-rotor dédié + moteur pousseur?** | Architecture moteur, masse, complexité | HL-201 |
| Q2 | **MTOW exact de l'AéroVision-X70?** | Base de dimensionnement du projet | HL-101 |
| Q3 | **Type moteur essence : 2T ou 4T? Puissance?** | Autonomie, carburant, générateur | HL-202 |
| Q4 | **Architecture hybride : parallèle ou série?** | Efficacité énergétique, complexité | HL-203 |
| Q5 | **Capacité carburant pour 10h d'autonomie** | Réservoir, masse, centrage | HL-301 |
| Q6 | **Matériaux structure : full carbone ou mixte?** | Coût, masse, fabrication | HL-302 |
| Q7 | **Train atterrissage : fixe ou rétractable?** | Traînée, complexité, masse | HL-303 |
| Q8 | **Sécurité parachute : requis ou optionnel?** | Réglementation, charge utile | HL-304 |

---

## 4. Jalons de l'EPIC

| Jalon | Titre | Livrables | Cible |
|---|---|---|---|
| M1 | Spécifications validées | Cahier des charges v1.0 | Sprint 1 |
| M2 | Architecture VTOL figée | Schéma architecture + sélection moteur | Sprint 2 |
| M3 | Dimensionnement masse/CG | Fichier masse + CG envelope | Sprint 3 |
| M4 | CAD paramétrique préliminaire | Maquette 3D coarse | Sprint 4 |

---

## 5. Critères de succès

- Cahier des charges validé par au moins 2 reviewers techniques
- Toutes les questions ouvertes (Q1–Q8) tranchées
- MTOW < 120 kg avec payload 50kg confirmée
- Autonomie ≥ 8h en configuration payload max
- Configuration VTOL sélectionnée et justifiée