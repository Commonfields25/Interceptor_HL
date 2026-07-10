# Note : séparation des gammes Interceptor_M et Interceptor_HL

**Date:** 2026-07-10  
**Contexte:** Création du repo `Interceptor_HL` (Heavy Lift) — séparation d'avec `Interceptor_M`

---

## Contexte

Jusqu'à présent, le projet **Interceptor** ne ciblait qu'une seule configuration : le drone d'interception rapide, léger, agile (actuellement en développement v3-parametric dans le repo `Interceptor_M_Commonfields_25`).

Le nouveau positionnement marché (concurrent AéroVision-X70, drone VTOL hybride gros porteur ~7000mm, 50kg payload, 10h endurance) impose une **gamme distincte** :

| Gamme | Nom | Description | Repo |
|---|---|---|---|
| **M** | Modular | Interception rapide, agile, léger | `Interceptor_M_Commonfields_25` (repo existant) |
| **HL** | Heavy Lift | Surveillance longue endurance, charge utile élevée | `Interceptor_HL` (nouveau repo) |

---

## Comparatif rapide des deux gammes

| Paramètre | Interceptor_M (Modular) | Interceptor_HL (Heavy Lift) |
|---|---|---|
| **Envergure** | ~1600 mm | ~7000 mm |
| **Longueur** | ~1000 mm | ~3004 mm |
| **MTOW** | ~6 kg | ~120 kg (cible) |
| **Payload** | ~1–2 kg | jusqu'à 50 kg |
| **Autonomie** | ~45–60 min | ~8–10 h |
| **Vitesse max** | ~180 km/h | ~120 km/h |
| **Motorisation** | Électrique pure (4 tilt-rotors) | Hybride essence/électrique |
| **Configuration** | X-tail asymétrique 60/30 | VTOL (config à définir) |
| **Usage principal** | Interception, monitoring rapide | Surveillance stationnaire, patrol, relais |
| **Repo** | `Interceptor_M_Commonfields_25` | `Interceptor_HL` ← ce repo |
| **Backlog** | Tickets INT-XXX | Tickets HL-XXX |
| **Statut** | v3-parametric en cours | Cahier des charges initial |

---

## Conséquences organisationnelles

- **Les deux repos sont indépendants.** Chaque gamme a son propre backlog, BOM, CAD, et cycle de développement.
- **Pas de partage de code direct** (sauf principes architecturaux documentés dans un possible `Interceptor_Common/` si pertinent).
- **Les décisions de design Interceptor_M ne contraignent pas Interceptor_HL** et vice versa.
- **Un même utilisateur** peut piloter les deux projets en parallèle avec des équipes différentes.

---

## Prochaines étapes

1. Créer le repo GitHub `Interceptor_HL` sur le compte Commonfields25
2. Initialiser avec la structure ci-dessous (voir `GIT_PUSH_HOWTO.md` dans le repo parent)
3. Lancer EPIC-HL-01 (cahier des charges) en parallèle du développement v3 de Interceptor_M

---

## Commandes GitHub (créer le repo)

```bash
# Option 1 — via GitHub UI
# Créer un nouveau repo "Interceptor_HL" sur github.com/Commonfields25
# puis cloner et pousser le contenu de ce dossier

# Option 2 — via gh CLI (si configuré)
gh repo create Commonfields25/Interceptor_HL --public --clone
# puis copier le contenu de ce dossier dans le clone

# Option 3 — pousser depuis ce dossier (après création manuelle du repo)
cd /path/to/Interceptor_HL
git init
git remote add origin https://github.com/Commonfields25/Interceptor_HL.git
git add .
git commit -m "feat: init Interceptor_HL repo — heavy lift VTOL branch"
git branch -M main
git push -u origin main
```