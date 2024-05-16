/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { setActiviteDetails } from "@/redux/createUserSlice";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const objectActivites = {
  "Achat-Revente": [
    "Achat-Vente d'accessoires de mode",
    "Achat-Vente d'accessoires de nautisme",
    "Achat-Vente d'accessoires pour animaux de compagnie",
    "Achat-Vente d'alarmes et systèmes de sécurité",
    "Achat-Vente d'aliments pour animaux de compagnie",
    "Achat-Vente d'appareils électroménagers",
    "Achat-Vente d'appareils et/ou accessoires de téléphonie",
    "Achat-Vente d'articles de bazar",
    "Achat-Vente d'articles de décoration",
    "Achat-Vente d'articles de maroquinerie",
    "Achat-Vente d'articles de parfumerie",
    "Achat-Vente d'artisanat d'art (sans fabrication)",
    "Achat-Vente d'encombrants",
    "Achat-Vente d'objets publicitaires",
    "Achat-Vente d'oeuvre d'art",
    "Achat-Vente de bijoux en pierres, métaux précieux",
    "Achat-Vente de bijoux fantaisie",
    "Achat-Vente de bois de chauffage (sans transformation)",
    "Achat-Vente de boissons (non alcoolisées)",
    "Achat-Vente de CD-DVD",
    "Achat-Vente de chocolat (sans fabrication)",
    "Achat-Vente de cigarettes électroniques",
    "Achat-Vente de confiserie (sans fabrication)",
    "Achat-Vente de déchets métalliques",
    "Achat-Vente de ferraille",
    "Achat-Vente de fleurs coupées",
    "Achat-Vente de fromages",
    "Achat-Vente de jouets",
    "Achat-Vente de lingerie",
    "Achat-Vente de livres",
    "Achat-Vente de matériaux recyclables",
    "Achat-Vente de matériel électrique",
    "Achat-Vente de matériel hi-fi et audiovisuel",
    "Achat-Vente de matériel informatique",
    "Achat-Vente de mobilier",
    "Achat-Vente de pièces détachées de véhicules motorisés",
    "Achat-Vente de pièces détachées de véhicules non motorisés",
    "Achat-Vente de produits alimentaires frais non réglementés",
    "Achat-Vente de produits alimentaires secs",
    "Achat-Vente de produits cosmétiques",
    "Achat-Vente de produits d'épicerie (avec vente d'alcool)",
    "Achat-Vente de produits d'épicerie (sans vente d'alcool)",
    "Achat-Vente de produits divers non soumis à réglementation",
    "Achat-Vente de produits électroniques",
    "Achat-Vente de repas à emporter sans fabrication",
    "Achat-Vente de spiritueux (à emporter)",
    "Achat-Vente de véhicules d'occasion",
    "Achat-Vente de vêtements",
    "Achat-Vente de vêtements et accessoires neuf",
    "Achat-Vente de vins (à emporter)",
    "Achat-Vente de vins et spiritueux (à emporter)",
    "Achat-Vente de vinyles",
    "Antiquaire",
    "Brocante / Vide grenier",
    "Friperie",
    "VDI",
    "Je ne trouve pas mon activité...",
  ],
  "Apporteur d'affaires": [
    "Apporteur d'affaires dans le secteur de l'automobile",
    "Apporteur d'affaires dans le secteur de l'énergie",
    "Apporteur d'affaires dans le secteur de la formation",
    "Apporteur d'affaires dans le secteur de la gestion de déchets",
    "Apporteur d'affaires dans le secteur de la santé",
    "Apporteur d'affaires dans le secteur des achats et de la logistique",
    "Apporteur d'affaires dans le secteur des vins et spiritueux",
    "Apporteur d'affaires dans le secteur du bâtiment",
    "Apporteur d'affaires dans le secteur du spectacle",
    "Apporteur d'affaires dans le secteur l'immobilier",
    "Apporteur d'affaires en imprimerie, presse et édition",
    "Courtage en opérations de banque/assurance",
    "Intermédiaire en opérations de banque et en services de paiement",
    "Je ne trouve pas mon activité...",
  ],
  "Artisanat (Création, Réparation, Fabrication)": [
    "Broderie",
    "Cordonnerie",
    "Coutellerie",
    "Entretien de sellerie",
    "Fabrication d'accessoires auto moto",
    "Fabrication d'accessoires de mode",
    "Fabrication d'accessoires en cuir",
    "Fabrication d'accessoires pour animaux de compagnie",
    "Fabrication d'albums photos",
    "Fabrication d'articles de maroquinerie",
    "Fabrication d'articles de puériculture",
    "Fabrication d'articles divers de papeterie",
    "Fabrication d'articles en bois",
    "Fabrication d'articles en matière textile",
    "Fabrication d'objets de décoration en bois",
    "Fabrication d'objets de décoration en céramique",
    "Fabrication d'objets de décoration en métal",
    "Fabrication d'objets de décoration en plastique",
    "Fabrication d'objets en carton, cadres, cartes...",
    "Fabrication de bière",
    "Fabrication de bijoux fantaisie",
    "Fabrication de biscuits - gateaux secs",
    "Fabrication de bougies",
    "Fabrication de chaussures",
    "Fabrication de chichis et churros",
    "Fabrication de chocolat",
    "Fabrication de confiseries",
    "Fabrication de confitures, compotes, gelées",
    "Fabrication de cosmétiques",
    "Fabrication de costumes",
    "Fabrication de diffuseur de parfum",
    "Fabrication de gadgets",
    "Fabrication de gâteaux en bonbons",
    "Fabrication de glaces et sorbets",
    "Fabrication de pâtisseries fraîches",
    "Fabrication de pâtisseries sèches",
    "Fabrication de perruques/postiches",
    "Fabrication de produits textiles",
    "Fabrication de vêtements",
    "Fabrication de vin",
    "Fleuriste/Compositions florales",
    "Lutherie",
    "Montage de meubles (sans raccordement)",
    "Préparation esthetique automobile sans réparation mécanique ni carrosserie",
    "Réparation d'appareils électroménagers",
    "Réparation d'équipements électriques",
    "Réparation d'équipements électroniques",
    "Réparation d'équipements mécaniques industriels",
    "Réparation d'équipements sportifs",
    "Réparation de bateaux",
    "Réparation de meubles",
    "Réparation de motocycles",
    "Réparation de téléphones",
    "Réparation de vélos",
    "Réparation maintenance informatique",
    "Réparation navale",
    "Réparations non soumises à qualification",
    "Sellerie",
    "Tailleur de pierre",
    "Tournage / Fraisage",
    "Travail des métaux",
    "Travail du bois",
    "Travail du marbre",
    "Travail du textile",
    "Travail du verre",
    "Travaux d'ébénisterie",
    "Travaux de coutures/retouches",
    "Travaux de menuiserie",
    "Travaux de peinture en décors",
    "Travaux de petits bricolages hors activités réglementées du bâtiment",
    "Je ne trouve pas mon activité...",
  ],
  "Bâtiment, Gros oeuvre,Second oeuvre": [
    "Assistance à maîtrise d'ouvrage",
    "Canalisateur",
    "Charpentier",
    "Chauffagiste",
    "Chef de chantier",
    "Conducteur d'engins de chantier indépendant (non propriétaire de son engin)",
    "Conducteur de travaux",
    "Construction de piscines",
    "Coordinateur de travaux",
    "Cordiste",
    "Cordiste bâtiment",
    "Cordiste nettoyage",
    "Dessinateur projeteur en bâtiment",
    "Diagnostiqueur immobilier",
    "Electricien",
    "Fabrication de charpente",
    "Fabrication de charpente en bois",
    "Facadier",
    "Geomètre",
    "Géomètre topographe",
    "Installation de réseaux de télécommunications",
    "Installation et maintenance de sanitaire",
    "Installation et maintenance de systèmes électriques (Électricien)",
    "Installation et maintenance des systèmes thermiques",
    "Installation et maintenance du réseaux des eaux potables",
    "Isolation des bâtiments",
    "Maçon",
    "Métreur",
    "Miroiterie",
    "Montage et réparation de câblage",
    "Nettoyage courant de bâtiments",
    "Nettoyage de chantier",
    "Nettoyage de piscines",
    "Nettoyage extérieur des bâtiments",
    "Nettoyage industriel",
    "Peintre en bâtiment",
    "Plaquiste",
    "Plombier",
    "Pose de carrelage/mosaïque",
    "Pose de charpente",
    "Pose de charpente en bois",
    "Pose de charpente métallique",
    "Pose de clôtures / grillages sans travaux de maçonnerie",
    "Pose de dalles",
    "Pose de joints / portes / fenêtres",
    "Pose de plaques de plâtre",
    "Pose de revêtement de moquette",
    "Pose de revêtement de sol",
    "Pose de revêtement des sols et des murs",
    "Ramonage",
    "Ravalement de façades",
    "Serrurerie",
    "Staffeur-ornemaniste",
    "Technique de pose d'enrobé et goudronnage de sol",
    "Travaux d'étanchéité",
    "Travaux de chaudronnerie",
    "Travaux de coffrage/boisage",
    "Travaux de couverture/toiture",
    "Travaux de couverture/zinc",
    "Travaux de démolition",
    "Travaux de façade extérieur des bâtiments mono-couche",
    "Travaux de maçonnerie",
    "Travaux de menuiserie",
    "Travaux de peinture en décors",
    "Travaux de peinture intérieur de bâtiment",
    "Travaux de plomberie",
    "Travaux de soudure",
    "Travaux de terrassement",
    "Je ne trouve pas mon activité...",
  ],
  "Beauté, Bien-être, Esotérisme": [
    "Acupuncteur",
    "Aromathérapeute",
    "Art thérapeute",
    "Astrologue",
    "Bar à sourires",
    "Cartomancie",
    "Coaching personnel",
    "Coaching relooking (Personal shopper)",
    "Coiffure à domicile",
    "Coiffure en salon",
    "Diététicien",
    "Énergéticien",
    "Ésotérisme",
    "Extension de cils sans autre prestation esthétique",
    "Guérisseur",
    "Hypnothérapeute",
    "Kinésiologie",
    "Magnétiseur",
    "Maquillage",
    "Maquillage sans soins esthétiques",
    "Médecine traditionnelle chinoise",
    "Modelage esthétique de confort",
    "Modelage/Massage sans application de produits sur la peau",
    "Naturopathe",
    "Numérologue",
    "Ostéopathe",
    "Personnal shopper",
    "Piercing",
    "Pose de prothèse ongulaire",
    "Pose de prothèse ongulaire sans acte de manucure en salon",
    "Pose de prothèse ongulaire sans acte de manucure à domicile",
    "Praticien bien-être",
    "Praticien PNL",
    "Praticien Shiat Su",
    "Psychanalyste",
    "Psycho-praticien",
    "Psychologue",
    "Psychologue Clinicien",
    "Psychomotricien",
    "Psychothérapeute Sophrologue",
    "Reflexologie",
    "Reiki",
    "Sexothérapeute",
    "Shiatsu",
    "Soins esthétiques à domicile",
    "Sophrologue",
    "Tarologue",
    "Tatoueur",
    "Technique manuelle de bien-être et de lâcher prise",
    "Voyance",
    "Je ne trouve pas mon activité...",
  ],
  "Conseil, Expertise, Conseil aux entreprises": [
    "Agent artistique",
    "Agent de sécurité / Vigile",
    "Agent de sécurité incendie",
    "Animateur de vente",
    "Architecte",
    "Architecte interieur",
    "Assistance à maîtrise d'ouvrage",
    "Assistance administrative (services administratifs combinés de bureau)",
    "Assistance technique par téléphone",
    "Avocat",
    "Bureau d'etudes et etudes techniques",
    "Chercheur independant, recherche et développement",
    "Coaching personnel",
    "Commissaire aux comptes",
    "Commissaire priseur",
    "Comptable",
    "Conseil aux collectivités",
    "Conseil aux entreprises",
    "Conseil culinaire",
    "Conseil en architecture paysagère",
    "Conseil en art",
    "Conseil en bâtiment",
    "Conseil en communication",
    "Conseil en création graphique",
    "Conseil en décoration intérieur / Home staging",
    "Conseil en environnement",
    "Conseil en étude de marque, branding",
    "Conseil en événementiel",
    "Conseil en gestion du patrimoine",
    "Conseil en image personnelle",
    "Conseil en immobilier",
    "Conseil en import export",
    "Conseil en informatique",
    "Conseil en investissement",
    "Conseil en logistique",
    "Conseil en management et organisation",
    "Conseil en marketing",
    "Conseil en méthodes de vente",
    "Conseil en organisation d'événements pour entreprises",
    "Conseil en orientation scolaire",
    "Conseil en production d'énergie",
    "Conseil en projets de construction",
    "Conseil en publicité",
    "Conseil en recrutement",
    "Conseil en relations humaines",
    "Conseil en relations publiques",
    "Conseil en Ressources Humaines",
    "Conseil en restauration",
    "Conseil en stratégie",
    "Conseil en stratégie numérique",
    "Conseil et gestion administrative",
    "Conseil financier",
    "Conseil médico-psychologique",
    "Conseil qualité",
    "Conseil social",
    "Conseiller de vie",
    "Consultant conférencier",
    "Consultant en tourisme",
    "Consultant SEM/SEO",
    "Consultant viticole",
    "Correcteur / Relecteur",
    "Dessinateur projeteur",
    "Diagnostiqueur immobilier",
    "Etat des lieux pour le compte de propriétaires ou de leurs représentants sans gestion locative",
    "Etudes de marché et sondages",
    "Expert Comptable",
    "Expert incendie",
    "Expert industriel",
    "Expert scientifique",
    "Généalogiste",
    "Géomètre",
    "Huissier de justice",
    "Ingenieur",
    "Interprète",
    "Médiateur social",
    "Notaire",
    "Organisation de mariages",
    "Petits travaux de bureautique",
    "Production de vidéos d'entreprises",
    "Secrétariat",
    "Téléconseiller",
    "Traducteur/Interprète",
    "Œnologue",
    "Je ne trouve pas mon activité...",
  ],
  "Cours, formation": [
    "Cours à domicile",
    "Cours de cuisine",
    "Éducateur sportif",
    "Enseignant en activité physique adaptée",
    "Enseignant en langues",
    "Enseignement à la conduite indépendant",
    "Formateur indépendant à l'informatique",
    "Formateur indépendant à la sécurité",
    "Formateur indépendant en langues",
    "Formation continue d'adultes",
    "Instructeur aviation",
    "Moniteur de golf",
    "Moniteur de ski",
    "Moniteur equitation",
    "Professeur indépendant",
    "Professeur indépendant d'art",
    "Professeur indépendant de chant",
    "Professeur indépendant de danse",
    "Professeur indépendant de guitare",
    "Professeur indépendant de mathématiques",
    "Professeur indépendant de musique",
    "Professeur indépendant de natation",
    "Professeur indépendant de piano",
    "Professeur indépendant de tennis",
    "Professeur indépendant de yoga",
    "Professeur indépendant enseignement supérieur",
    "Professeur indépendant enseignement technique et professionnel",
    "Soutien scolaire à domicile",
    "Je ne trouve pas mon activité...",
  ],
  "Culture, Animation, Sports et Spectacles": [
    "Agent artistique",
    "Animateur Ateliers artistiques",
    "Animateur Ateliers culinaires",
    "Animateur Ateliers de théâtre",
    "Animateur culturel",
    "Animateur de jeux de loterie",
    "Animateur intervenant en structures (maisons de retraite, hôpitaux...)",
    "Animateur speaker",
    "Animateur sportif",
    "Animation de communauté virtuelle",
    "Animation de soirées, mariages, anniversaires",
    "Artiste - auteur",
    "Coach sportif",
    "Création artistique relevant des arts plastiques sans droits d'auteur",
    "Diffusion musicale",
    "Disc Jockey avec organisation evenements et avec apport de son matériel",
    "Disc Jockey sans organisation evenements et sans apport de son matériel",
    "Disco Mobile",
    "Écrivain indépendant (auto-édité)",
    "Écrivain indépendant (pour le compte de personnes privées)",
    "Éducateur sportif",
    "Fabrication de costumes",
    "Fabrication de perruques/postiches",
    "Guide de canoë-kayak",
    "Guide de canyoning, escalade",
    "Guide de randonnée",
    "Guide rafting",
    "Joueur professionnel (sport individuel)",
    "Journaliste",
    "Journaliste - pigiste",
    "Lutherie",
    "Maître nageur",
    "Moniteur de ski",
    "Moniteur de sport",
    "Moniteur equitation",
    "Montage de stands",
    "Organisation d'événements divers (séminaires, salons)",
    "Organisation de spectacles",
    "Organisation evenements culturels",
    "Pigiste",
    "Pose d'Affiches",
    "Prestations Techniques De Soutien Au Spectacle (sans cumul avec statut d'intermittent)",
    "Prise de vue Photographique",
    "Production musicale",
    "Professeur de chant",
    "Professeur de danse",
    "Professeur de musique",
    "Professeur de tennis",
    "Professeur de yoga",
    "Promotion d'artistes",
    "Promotion de spectacles",
    "Technicien son et lumière",
    "Je ne trouve pas mon activité...",
  ],
  "Hôtellerie-Restauration, Tourisme": [
    "Barman",
    "Boucherie",
    "Boulangerie",
    "Charcuterie",
    "Chef cuisinier au domicile des clients avec consommation sur place",
    "Commis de cuisine",
    "Consultant en tourisme",
    "Cuisinier",
    "Exploitant de bar",
    "Fabrication de biscuits",
    "Fabrication de chichis et churros",
    "Fabrication de confiseries",
    "Fabrication de confitures, compotes, gelées",
    "Fabrication de pâtisseries fraîches",
    "Fabrication de pâtisseries sèches",
    "Fabrication de plats cuisinés à emporter",
    "Friterie ambulante",
    "Guide touristique",
    "Location de chambres d'hôtes avec prestations para-hôtelières",
    "Location de meublé de tourisme sans prestation para-hôtelières",
    "Organisation et planification de voyages organisés",
    "Pizzeria traditionnelle (consommation principalement sur place)",
    "Plongeur",
    "Préparation de frites",
    "Préparation de pizza à emporter",
    "Prestations d’extra dans la restauration (serveur, barman, etc...)",
    "Restaurant traditionnel (consommation sur place avec débit de boissons)",
    "Restaurant traditionnel (consommation sur place sans débit de boissons)",
    "Salon de thé",
    "Sandwicherie, snack à emporter (avec débit de boissons)",
    "Sandwicherie, snack à emporter (sans débit de boissons)",
    "Sandwicherie, snack sur place (avec débit de boissons)",
    "Sandwicherie, snack sur place (sans débit de boissons)",
    "Serveur",
    "Service de traiteurs avec vente de boisson alcoolisées",
    "Service de traiteurs sans vente de boisson alcoolisées",
    "Soutien aux entreprises dans le domaine de la restauration",
    "Vente de Frites",
    "Vente de parcours et séjours touristiques",
    "Vente de produits alimentaires sur les marchés",
    "Je ne trouve pas mon activité...",
  ],
  "Location d'équipements et de matériel": [
    "Location d'articles de sport et de loisirs",
    "Location d'outillages divers",
    "Location de bateaux",
    "Location de costumes et articles de fête",
    "Location de cycles",
    "Location de matériel audiovisuel",
    "Location de matériel de chantier",
    "Location de matériel informatique",
    "Location de mobilier pour événements divers (séminaires, réceptions, ...)",
    "Location de structures gonflables",
    "Location de véhicules motorisés avec chauffeur",
    "Location de véhicules motorisés sans chauffeur",
    "Location de vêtements et accessoires",
    "Je ne trouve pas mon activité...",
  ],
  "Mécanique / Technique": [
    "Carrosserie automobile",
    "Contrôleur d'engins",
    "Électrotechnicien",
    "Frigoriste",
    "Installation et réparation de systèmes électriques automobile",
    "Mécanique automobile",
    "Mécanique bateaux",
    "Mécanique d'engins agricoles",
    "Mécanique motocycles",
    "Réparation de cycles",
    "Réparation de machines et équipements industriels",
    "Tourneur / Fraiseur",
    "Travaux de peinture en carrosserie",
    "Je ne trouve pas mon activité...",
  ],
  "Médical / Santé": [
    "Aide médico-psychologique",
    "Aide soignant",
    "Diététicien",
    "Doula - Accompagnement à la naissance, en périnatalité et en parentalité",
    "Fabrication de prothèse dentaire",
    "Hypnothérapeute",
    "Infirmier",
    "Masseur - Kinésithérapeute",
    "Médecine traditionnelle chinoise",
    "Naturopathe",
    "Ostéopathe",
    "Psychanalyste",
    "Psycho-praticien",
    "Psychologue",
    "Psychologue Clinicien",
    "Psychomotricien",
    "Psychothérapeute sophrologue",
    "Sexothérapeute",
    "Sophrologue",
    "Je ne trouve pas mon activité...",
  ],
  "Services à la personne et aux animaux": [
    "Accompagnement et soutien scolaire à domicile",
    "Accueil ou accompagnement sans hébergement d'adultes handicapés ou de personnes âgées",
    "Achat/Vente d'accessoires pour animaux de compagnie",
    "Achat/Vente d'aliments pour animaux de compagnie",
    "Agence matrimoniale",
    "Aide à domicile",
    "Aide ménagère à domicile pour particuliers dans le cadre du service à la personne",
    "Assistance aux personnes dépendantes ayant besoin d'aide à domicile (à l'exception d'actes médicaux)",
    "Assistance et conseil administratif aux particuliers",
    "Coach pour propriétaires d'animaux de compagnie",
    "Coaching relooking",
    "Conciergerie privée",
    "Conseiller conjugal",
    "Conseiller de vie",
    "Cours à domicile",
    "Désinsectisation / Destruction de nuisibles",
    "Détective/Enquêteur privé",
    "Écrivain public",
    "Éducateur comportementaliste pour animaux de compagnie sans élevage, ni dressage",
    "Éducateur spécialisé",
    "Enseignement à domicile",
    "Entretien de la maison et les travaux ménagers",
    "Esthétique à domicile",
    "Etat des lieux pour le compte de propriétaires ou de leurs représentants",
    "Fabrication d'accessoires pour animaux de compagnie",
    "Garde à domicile d'animaux de compagnie - prise en pension",
    "Garde à domicile d'animaux de compagnie au domicile du client",
    "Garde d'enfants de moins de 3 ans",
    "Garde d'enfants de plus de 3 ans",
    "Gardiennage - surveillance de domicile",
    "Laverie automatique (exploitant)",
    "Magnétiseur pour animaux",
    "Maréchalerie",
    "Médiateur familial",
    "Médiateur social",
    "Montage de meubles de cuisine (sans raccordement)",
    "Nettoyage automobile",
    "Nettoyage courant de bâtiments",
    "Nettoyage de pierres tombales",
    "Nettoyage de véhicules automobiles",
    "Palefrenier soigneur",
    "Personal shopper",
    "Plombier",
    "Prise en pension d'animaux domestiques (sans élevage, dressage ni entrainement)",
    "Prise en pension de chevaux (sans élevage, dressage ni entrainement)",
    "Promenade de chiens",
    "Repassage",
    "Retouches de vêtements",
    "Soutien scolaire à domicile",
    "Tatoueur",
    "Toilettage d'animaux de compagnie",
    'Travaux de petit bricolage dits "homme toutes mains" dans le cadre du service à la personne',
    "Travaux ménagers",
    "Je ne trouve pas mon activité...",
  ],
  "Transport / Livraison / Logistique": [
    "Chauffeur de bus indépendant non propriétaire de son véhicule",
    "Chauffeur de poids lourds indépendant non propriétaire de son véhicule",
    "Collecte et traitement de matériaux recyclables",
    "Collecte et traitement de métaux",
    "Collecte, traitement et revente de déchets",
    "Collecte, traitement et revente de matériaux recyclables",
    "Collecte, traitement et revente de métaux",
    "Convoyage maritime sans transport marchandise ni personne",
    "Convoyage véhicule sans transport marchandise ni personne",
    "Coursier à vélo",
    "Coursier motorisé",
    "Débarras de déchets",
    "Déménagement par transport routier",
    "Distribution de prospectus",
    "Livraison de meubles (sans installation/montage)",
    "Livreur de repas à domicile (motorisé)",
    "Livreur de repas à domicile à vélo (non motorisé)",
    "Location de voiture de transport avec chauffeur (VTC)",
    "Moto taxi",
    "Remorquage de véhicules",
    "Skipper",
    "Transport de bagages",
    "Transport de voyageurs par taxi",
    "Voiturier indépendant",
    "Je ne trouve pas mon activité...",
  ],
  "Web / Informatique / Multimédias": [
    "Achat-Vente de matériel informatique",
    "Animation de communauté virtuelle",
    "Blogueur professionnel",
    "Community manager",
    "Concepteur graphique sans droits d'auteur",
    "Conception et développement de sites web",
    "Conseil en informatique",
    "Conseil en stratégie numérique",
    "Déblocage et réparation de téléphones",
    "Dessinateur projeteur",
    "Développement d'applications mobiles",
    "Développeur web",
    "Diffusion musicale",
    "E-commerce",
    "E-learning",
    "Edition de logiciels",
    "Exploitation de sites web",
    "Graphisme",
    "Influenceur",
    "Infographisme",
    "Installation de logiciels et systèmes informatiques",
    "Installation et configuration de postes et serveurs",
    "Installation/maintenance de logiciels",
    "Journaliste - pigiste",
    "Photographie",
    "Photographie publicitaire sans droits d'auteur",
    "Photographie/Illustration sans droits d'auteur",
    "Pigiste",
    "Pilotage de drone pour prise de vue aérienne photographique",
    "Pose de fibre optique",
    "Production audiovisuelle",
    "Production de vidéos",
    "Production et réalisation de films publicitaires",
    "Programmation informatique",
    "Rédacteur web",
    "Réparation d'ordinateurs et de ses périphériques",
    "Réparation de matériels informatiques",
    "Réparation de téléphones",
    "Technicien en réseau de communication",
    "Vente d'espaces publicitaires en ligne",
    "Vente de logiciels",
    "Web designer",
    "Web marketer",
    "Web master",
    "Je ne trouve pas mon activité...",
  ],
  "Je ne trouve pas mon domaine d’activité": [
    "Je ne trouve pas mon domaine d’activité",
  ],
};
const Activite = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const currentDate = dayjs();
  const [formValues, setFormValues] = useState<{
    debutActivite: dayjs.Dayjs | null | undefined;
    activite: string;
    activiteDetail: string;
    categorie: string;
    activitePrincipale: string;
    nomCommercial: string;
    activiteNonSalarie: string;
  }>({
    debutActivite: data.debutActivite || currentDate,
    activite: data.activite || "",
    activiteDetail: data.activiteDetail || "",
    categorie: data.categorie || "",
    activitePrincipale: data.activitePrincipale || "",
    nomCommercial: data.nomCommercial || "",
    activiteNonSalarie: data.activiteNonSalarie || "non",
  });

  const [formErrors, setFormErrors] = useState<{
    debutActivite: string;
    activite: string;
    activiteDetail: string;
    categorie: string;
    activitePrincipale: string;
    nomCommercial: string;
    activiteNonSalarie: string;
  }>({
    debutActivite: "",
    activite: "",
    activiteDetail: "",
    categorie: "",
    activitePrincipale: "",
    nomCommercial: "",
    activiteNonSalarie: "",
  });

  const minDate = dayjs().subtract(6, "month");
  const maxDate = dayjs().add(1, "month");

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    // Premier, vérifier si 'newValue' est null ou invalide
    if (!newValue || !newValue.isValid()) {
      // S'occuper des cas où la date est invalide ou non définie
      setFormErrors({
        ...formErrors,
        debutActivite: "",
      });
      setFormValues((prev) => ({ ...prev, debutActivite: null }));
      return; // Quitter la fonction tôt
    }

    // Ensuite, vérifier si 'newValue' est hors de la plage autorisée
    if (newValue.isBefore(minDate, "day") || newValue.isAfter(maxDate, "day")) {
      setFormErrors({
        ...formErrors,
        debutActivite:
          "La date doit être entre 6 mois avant et 1 mois après la date actuelle.",
      });
      setFormValues((prev) => ({ ...prev, debutActivite: null }));
    } else {
      // Si tout est correct, mettre à jour les valeurs et effacer les erreurs
      setFormErrors({ ...formErrors, debutActivite: "" });
      setFormValues((prev) => ({ ...prev, debutActivite: newValue }));
    }
  };

  useEffect(() => {
    if (formValues.activite === "Je ne trouve pas mon domaine d’activité")
      setFormValues({
        ...formValues,
        activitePrincipale: "",
      });
    else if (
      formValues.activite !== "Je ne trouve pas mon domaine d’activité" &&
      formValues.activite !== ""
    ) {
      setFormValues({
        ...formValues,
        activiteDetail: "",
        categorie: "",
      });
    }
    setFormValues({
      ...formValues,
      activitePrincipale: "",
    });
  }, [formValues.activite]);

  useEffect(() => {
    if (
      formValues.activitePrincipale !== "" &&
      formValues.activitePrincipale !== "Je ne trouve pas mon activité..."
    ) {
      setFormValues({
        ...formValues,
        activiteDetail: "",
        categorie: "",
      });
    }
  }, [formValues.activitePrincipale]);

  useEffect(() => {
    let debutActiviteFormatted;
    if (formValues.debutActivite) {
      // Supposant que `formValues.debutActivite` est une chaîne au format "DD/MM/YYYY"
      // et que votre backend nécessite "YYYY-MM-DD"
      const date = dayjs(formValues.debutActivite, "DD/MM/YYYY");
      debutActiviteFormatted = date.isValid()
        ? date.format("YYYY-MM-DD")
        : undefined;
    } else {
      debutActiviteFormatted = undefined;
    }

    dispatch(
      setActiviteDetails({
        ...formValues,
        debutActivite: debutActiviteFormatted,
      })
    );
  }, [formValues, dispatch]);

  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <label htmlFor="debutActivite" className="text-slate-700 text-md">
            Date de début d&apos;activité
          </label>
          <div className="relative flex flex-col w-full">
            <CalendarIcon className="absolute top-3.5 right-3 text-slate-500 h-6 w-6 " />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DateField", "DateField", "DateField"]}
              >
                <DateField
                  value={formValues.debutActivite}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  minDate={minDate} // Converti en Date JavaScript
                  maxDate={maxDate} // Converti en Date JavaScript
                  sx={{
                    "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
                      width: "100%",
                      border: formErrors.debutActivite
                        ? "1px solid red"
                        : "0.05px solid #94a3b8", // Conditionnellement ajuster la bordure ici
                      borderRadius: "0.4rem",
                      color: "#64748b",
                      "&:hover": {
                        borderColor: formErrors.debutActivite
                          ? "red"
                          : "#64748b",
                      },
                      "&.Mui-focused": {
                        borderColor: "#64748b",
                      },
                    },
                    "& .MuiInputBase-input, & .MuiOutlinedInput-input": {
                      padding: "8px !important",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <p className="w-10/12 mt-1 text-xs font-light">
              Entre le {minDate.format("DD/MM/YYYY")} et{" "}
              {maxDate.format("DD/MM/YYYY")}.
            </p>
          </div>
          {formErrors.debutActivite && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors.debutActivite}
            </p>
          )}
        </div>
        <div className="w-full mt-5">
          <label htmlFor="activite" className="text-slate-700 text-md">
            Domaine d&apos;activité
          </label>
          <select
            name="activite"
            id="activite"
            className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md"
            value={formValues.activite}
            onChange={(event) =>
              setFormValues((prevState) => ({
                ...prevState,
                activite: event.target.value,
                activitePrincipale:
                  event.target.value !==
                  "Je ne trouve pas mon domaine d’activité"
                    ? prevState.activitePrincipale
                    : "",
              }))
            }
          >
            <option value="" disabled>
              Sélectionnez votre nouvelle activité
            </option>
            {Object.keys(objectActivites).map((activite) => (
              <option key={activite} value={activite}>
                {activite}
              </option>
            ))}
          </select>
          <p className="w-10/12 mt-1 text-xs font-light">
            Sélectionnez l’option qui correspond le mieux à votre future
            activité.
          </p>
          {formErrors.activite && (
            <p className="mt-1 text-xs text-red-500">{formErrors.activite}</p>
          )}
        </div>
        {formValues.activite &&
          formValues.activite !== "Je ne trouve pas mon domaine d’activité" && (
            <div className="w-full mt-5">
              <label htmlFor="activite" className="text-slate-700 text-md">
                Activité principale
              </label>
              <select
                name="activitePrincipale"
                id="activitePrincipale"
                className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md"
                value={formValues.activitePrincipale}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    activitePrincipale: event.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Sélectionnez votre nouvelle activité
                </option>
                {objectActivites[
                  formValues.activite as keyof typeof objectActivites
                ]?.map((activite) => (
                  <option key={activite.toString()} value={activite}>
                    {activite}
                  </option>
                ))}
              </select>
              <p className="w-10/12 mt-1 text-xs font-light">
                Choisissez l’activité principale que vous souhaitez exercer.
                Celle-ci sera utilisée pour attribuer le code APE de votre
                entreprise.
              </p>
            </div>
          )}
        {(formValues.activite === "Je ne trouve pas mon domaine d’activité" ||
          formValues.activitePrincipale ===
            "Je ne trouve pas mon activité...") && (
          <>
            <div className="w-full mt-5">
              <label htmlFor="activite" className="text-slate-700 text-md">
                Précisez votre domaine d&apos;activité
              </label>
              <input
                type="text"
                id="activiteDetail"
                name="activiteDetail"
                value={formValues.activiteDetail}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteDetail: e.target.value,
                  })
                }
                placeholder="Domaine d’activité"
                className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md"
              />
              {formErrors.activite && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.activite}
                </p>
              )}
            </div>
            <div className="w-full mt-5">
              <label htmlFor="activite" className="text-slate-700 text-md">
                Catégorie d&apos;activité
              </label>
              <select
                name="activitePrincipale"
                id="activitePrincipale"
                className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md"
                value={formValues.categorie}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    categorie: event.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Sélectionnez votre nouvelle activité
                </option>
                <option value="commerciale">Commerciale</option>
                <option value="agentCommercial">Agent Commercial</option>
                <option value="artisanale">Artisanale</option>
                <option value="libérale">Libérale</option>
              </select>
            </div>
          </>
        )}
        <div className="w-full mt-5">
          <label htmlFor="nomCommercial" className="text-slate-700 text-md">
            Nom commercial (facultatif)
          </label>
          <input
            type="text"
            id="nomCommercial"
            name="nomCommercial"
            value={formValues.nomCommercial}
            onChange={(e) =>
              setFormValues({ ...formValues, nomCommercial: e.target.value })
            }
            placeholder="Nom commercial de votre activité"
            className="w-full px-2 py-2 mt-2 border rounded-md border-slate-400 hover:border-slate-500 focus:border-slate-500 text-md"
          />
          {formErrors.nomCommercial && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors.nomCommercial}
            </p>
          )}
          <p className="w-10/12 mt-1 text-xs font-light">
            Le nom de votre micro-entreprise correspond obligatoirement à votre
            nom. Vous pouvez ajouter un nom commercial sous lequel votre
            activité sera connue du public.
          </p>
        </div>
        <div className="flex flex-col justify-between w-full mt-5">
          <label htmlFor="nomCommercial" className="text-slate-700 text-md">
            Avez-vous déjà exercé une activité non-salariée ?
          </label>
          <div className="flex flex-col justify-between w-full md:flex-row">
            <div
              className="flex mt-2 w-full md:w-[30%] flex-col items-end p-3 py-5 border hover:border-slate-500 focus:border-slate-500 rounded-md relative cursor-pointer"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  activiteNonSalarie: "non",
                })
              }
            >
              <input
                id="activiteNonSalarieNon"
                value="non"
                name="activiteNonSalarie"
                checked={formValues.activiteNonSalarie === "non"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteNonSalarie: e.target.value,
                  })
                }
                type="radio"
                className="absolute w-5 h-5 mr-2 cursor-pointer top-2 right-2"
                onClick={(e) => e.stopPropagation()} // Empêcher l'événement de se propager lors du clic direct sur l'input
              />
              <label
                htmlFor="activiteNonSalarieNon"
                className="w-full mt-1  text-md"
              >
                Non
              </label>
            </div>
            <div
              className="flex mt-2 w-full md:w-[30%] flex-col md:items-end p-3 py-5 border hover:border-slate-500 focus:border-slate-500 rounded-md relative cursor-pointer"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  activiteNonSalarie: "oui",
                })
              }
            >
              <input
                id="activiteNonSalarieOui"
                value="oui"
                name="activiteNonSalarie"
                checked={formValues.activiteNonSalarie === "oui"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteNonSalarie: e.target.value,
                  })
                }
                type="radio"
                className="absolute w-5 h-5 mr-2 cursor-pointer top-2 right-2"
                onClick={(e) => e.stopPropagation()}
              />
              <label htmlFor="activiteNonSalarieOui" className="text-md">
                Oui,
                <br />
                <span className="text-xs">
                  en tant que micro-entreprise / entrepreneur individuel
                </span>
              </label>
            </div>

            <div
              className="flex mt-2 w-full md:w-[30%] flex-col md:items-end p-3 py-5 border hover:border-slate-500 focus:border-slate-500 rounded-md relative cursor-pointer"
              onClick={() =>
                setFormValues({
                  ...formValues,
                  activiteNonSalarie: "ouiSa",
                })
              }
            >
              <input
                id="activiteNonSalarieOuiSA"
                value="ouiSa"
                name="activiteNonSalarieSa"
                checked={formValues.activiteNonSalarie === "ouiSa"}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    activiteNonSalarie: e.target.value,
                  })
                }
                type="radio"
                className="absolute w-5 h-5 mr-2 cursor-pointer top-2 right-2"
                onClick={(e) => e.stopPropagation()}
              />
              <label htmlFor="activiteNonSalarieOuiSA" className="text-md">
                Oui,
                <br />
                <span className="text-xs">
                  en tant que EURL, SARL, SASU, SAS, etc.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activite;
