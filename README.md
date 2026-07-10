# Interceptor_HL — Heavy Lift VTOL UAV

**Version:** V4 (HL — Heavy Lift)  
**Gamme:** Interceptor Heavy Lift  
**Repo:** `Commonfields25/Interceptor_HL`  
**Date:** 2026-07-10  
**Status:** 🟡 Cahier des charges initial — en attente de kick-off

---

## Positionnement produit

L'**Interceptor_HL** est la branche **Heavy Lift** de la gamme Interceptor, conçue pour les missions de surveillance longue endurance à charge utile élevée.

- **Gamme Interceptor_M** (Modular) = drone d'interception rapide, léger, agile
- **Gamme Interceptor_HL** (Heavy Lift) = drone gros porteur longue endurance, surveillance stationnaire et patrol

> **Référence marché :** l'AéroVision-X70 (Europe-Connection, VTOL hybride, ~7000mm envergure, 50kg payload, 10h endurance) est le concurrent direct et la source principale de spécifications fonctionnelles.

---

## Comparatif gamme Interceptor

| Paramètre | Interceptor_M (Modular) | Interceptor_HL (Heavy Lift) |
|---|---|---|
| **Envergure** | ~1600 mm | ~7000 mm |
| **Longueur** | ~1000 mm | ~3000 mm |
| **MTOW** | ~6 kg | ~120 kg (cible, à valider) |
| **Charge utile** | ~1–2 kg | ~50 kg |
| **Autonomie** | ~45–60 min | ~8–10 h |
| **Vitesse max** | ~180 km/h | ~120 km/h |
| **Motorisation** | Électrique pure 4x tilt-rotor | Hybride essence/électrique (config TBD) |
| **Configuration** | X-tail asymétrique | VTOL à définir |
| **Usage** | Interception, monitoring rapide | Surveillance longue, patrol, relais comm |
| **Repo** | `Interceptor_M_Commonfields_25` | `Interceptor_HL` ← ce repo |
| **Statut** | v3-parametric en cours | Cahier des charges initial |

---

## Spécifications cibles (à valider — EPIC-HL-01)

> Basées sur l'AéroVision-X70. Toutes sont des cibles, à confirmer par l'ingénierie.

| Paramètre | Cible |
|---|---|
| **Envergure** | ~6970 mm |
| **Longueur** | ~3004 mm |
| **MTOW** | ~120 kg (incluant payload 50 kg) |
| **Payload** | jusqu'à 50 kg |
| **Autonomie** | jusqu'à 10 h |
| **Vitesse croisière** | 70–120 km/h |
| **Vitesse max** | ~120 km/h |
| **Résistance vent** | 13,8 m/s |
| **Motorisation** | Hybride (essence + électrique) — configuration VTOL à définir |
| **Capteurs** | EO/IR + télémètre laser (LRF) + relais communications |
| **Terrain** | Montagne, côte, forêt, zone urbaine dense |

### Inconnues critiques à résoudre (EPIC-HL-01)

- MTOW exact (non publié par Europe-Connection)
- Configuration VTOL exacte (tilt-rotor ? multi-rotor dédié + moteur pousseur ?)
- Plafond de vol
- Rayon d'action / portée radio
- Station sol (type, portée, interface)
- Matériaux et structure (composite carbone ? aluminium ?)
- Prix / positionnement commercial

---

## Structure du repo

```
Interceptor_HL/
├── README.md                        ← ce fichier
├── LICENSE
├── .gitignore
└── docs/
    ├── RENAME-NOTE.md               ← note sur la separation des gammes
    ├── reference/
    │   └── AeroVision-X70.md        ← fiche technique de reference
    └── requirements/
        ├── EPIC-HL-01-cahier-des-charges.md
        └── backlog-HL.md
```

---

## Roadmap initiale (backlog)

| Epic | Titre | Tickets |
|---|---|---|
| EPIC-HL-01 | Cahier des charges VTOL gros porteur | HL-101 → HL-104 |
| EPIC-HL-02 | Architecture VTOL et motorisation hybride | HL-201 → HL-206 |
| EPIC-HL-03 | Dimensionnement structure et masse | HL-301 → HL-306 |
| EPIC-HL-04 | Avionique, capteurs et station sol | HL-401 → HL-408 |
| EPIC-HL-05 | CAD paramétrique preliminaire | HL-501 → HL-505 |

→ Voir `docs/requirements/backlog-HL.md`

---

## License

MIT License — voir fichier `LICENSE`.