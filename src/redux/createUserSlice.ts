import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition de l'état initial avec une structure plus appropriée
const initialState = {
  userCessation: {
    email: "",
    siret: "",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    nationnalite: "",
    villeDeNaissance: "",
    telephone: "",
    sexe: "",
    paysDeNaissance: "",
    dateDeCessation: "",
    adresse: "",
    CGV: false,
  },
  userModification: {
    email: "",
    siret: "",
    typeDeModification: "",
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    nationnalite: "",
    villeDeNaissance: "",
    telephone: "",
    sexe: "",
    paysDeNaissance: "",
    dateDeChangement: "",
    adresse: "",
    activite: "",
    activiteDetail: "",
    categorie: "",
    activitePrincipale: "",
    CGV: false,
  },
  userInfo: {
    nom: "",
    prenom: "",
    email: "",
    dossierId: "",
    telephone: "",
    sexe: "",
    dateDeNaissance: "",
    nationnalite: "Française",
    departement: "",
    paysDeNaissance: "France",
    paysDeNaissanceEtranger: "",
    villeDeNaissance: "",
  },
  userActivite: {
    activite: "",
    activiteDetail: "",
    categorie: "",
    activitePrincipale: "",
    nomCommercial: "",
    activiteNonSalarie: "",
    debutActivite: "",
  },
  userAdresse: {
    adresse: "",
    complementAdresse: "",
    CGV: false,
  },
  userConnectedInformation: {
    date: "",
    numeroDossier: "",
    userActivite: {},
    userInfo: {},
    userAdresse: {},
    userId: "",
    information: {},
    adresseProfessionelle: {
      checked: false,
    },
    entrepriseEtInformation: {},
    document: {},
    filesId: "",
    filesPasseport: "",
    filesAdresse: "",
    filesDeclaration: "",
  },
  userId: "",
  stepCreationCompte: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<typeof initialState.userInfo>) {
      // Mise à jour de chaque champ dans l'état
      Object.assign(state.userInfo, action.payload);
    },
    setActiviteDetails(
      state,
      action: PayloadAction<Partial<typeof initialState.userActivite>>
    ) {
      // Ce reducer est un exemple de la manière dont vous pourriez mettre à jour les détails d'activité
      Object.assign(state.userActivite, action.payload);
    },
    setAdresseDetails(
      state,
      action: PayloadAction<Partial<typeof initialState.userAdresse>>
    ) {
      // Ce reducer est un exemple de la manière dont vous pourriez mettre à jour les détails d'adresse
      Object.assign(state.userAdresse, action.payload);
    },
    setModificationDetails(
      state,
      action: PayloadAction<Partial<typeof initialState.userModification>>
    ) {
      // Ce reducer est un exemple de la manière dont vous pourriez mettre à jour les détails de modification
      Object.assign(state.userModification, action.payload);
    },
    setCessationDetails(
      state,
      action: PayloadAction<Partial<typeof initialState.userCessation>>
    ) {
      // Ce reducer est un exemple de la manière dont vous pourriez mettre à jour les détails de modification
      Object.assign(state.userCessation, action.payload);
    },
    initializeCompte(state) {
      // Réinitialisation de l'état
      state.stepCreationCompte = 1;
    },
    incrementStep(state) {
      state.stepCreationCompte += 1;
    },
    decrementStep(state) {
      // Assurez-vous que le step ne descend pas en dessous de 1
      if (state.stepCreationCompte > 1) {
        state.stepCreationCompte -= 1;
      }
    },
    setuid(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setConnectedInformation(state, action: PayloadAction<any>) {
      state.userConnectedInformation = action.payload;
    },
    setConnectedInformationInformation(state, action: PayloadAction<any>) {
      state.userConnectedInformation.information = action.payload;
    },
    setConnectedInformationAdresseProfessionelle(
      state,
      action: PayloadAction<any>
    ) {
      state.userConnectedInformation.adresseProfessionelle = action.payload;
    },
    setConnectedInformationEntrepriseEtInformation(
      state,
      action: PayloadAction<any>
    ) {
      state.userConnectedInformation.entrepriseEtInformation = action.payload;
    },
    setConnectedInformationDocument(state, action: PayloadAction<any>) {
      state.userConnectedInformation.document = action.payload;
    },
    setConnectedInformationIdFiles(state, action: PayloadAction<string>) {
      // Now safely set the id since we know all properties are properly initialized
      state.userConnectedInformation.filesId = action.payload;
    },
    setConnectedInformationPasseportFiles(state, action: PayloadAction<any>) {
      state.userConnectedInformation.filesPasseport = action.payload;
    },
    setConnectedInformationAdresseFiles(state, action: PayloadAction<any>) {
      state.userConnectedInformation.filesAdresse = action.payload;
    },

    setConnectedInformationDeclarationFiles(state, action: PayloadAction<any>) {
      state.userConnectedInformation.filesDeclaration = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setActiviteDetails,
  setAdresseDetails,
  setModificationDetails,
  setCessationDetails,
  incrementStep,
  decrementStep,
  initializeCompte,
  setuid,
  setConnectedInformation,
  setConnectedInformationInformation,
  setConnectedInformationAdresseProfessionelle,
  setConnectedInformationEntrepriseEtInformation,
  setConnectedInformationDocument,
  setConnectedInformationIdFiles,
  setConnectedInformationPasseportFiles,
  setConnectedInformationAdresseFiles,
  setConnectedInformationDeclarationFiles,
} = userSlice.actions;

export default userSlice.reducer;
