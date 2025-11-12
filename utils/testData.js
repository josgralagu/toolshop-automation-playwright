import { generateUniqueEmail } from "./helpers";

// ====================================================================
// TEST DATA CONFIGURATION
// ====================================================================
// Centralized test data definitions for consistent test execution
// Includes user profiles, product data, filters, and translations
// ====================================================================

// ==================== USER DATA SECTION ====================

/**
 * Generate complete user profile with unique email
 * Provides valid registration data for test scenarios
 */
export function generateValidUser() {
  return {
    firstName: "Test",
    lastName: "User",
    dateOfBirth: "1990-01-01",
    address: "123 Test Street",
    postcode: "12345",
    city: "Test City",
    state: "Test State",
    country: "MX",
    phone: "3384518349",
    email: generateUniqueEmail(),
    password: "Cn20nH1]",
  };
}

/**
 * Valid profile update data for successful update scenarios
 */
export const validProfileUpdate = {
  phone: "3384518342",
};

/**
 * Invalid profile update data for error handling scenarios
 * Exceeds maximum phone number length constraint
 */
export const invalidProfileUpdate = {
  phone: "2294333810192371892738127",
};

// ==================== PRODUCT DATA SECTION ====================

/**
 * Product names for search and detail view tests
 */
export const searchProducts = ["Bolt Cutters", "Belt Sander", "Safety Goggles"];

/**
 * Category-specific keywords for filter validation
 * Used to verify products match expected category criteria
 */
export const categoryKeywords = {
  handTools: [
    "Hammer",
    "Saw",
    "Wrench",
    "Spanner",
    "Screwdriver",
    "Pliers",
    "Cutters",
    "Chisels",
    "Tape",
    "Ruler",
  ],
  powerTools: ["Sander", "Saw", "Drill", "Excavator", "Bulldozer", "Crane"],
  other: [
    "toolbelt",
    "Cabinet",
    "Workbench",
    "Goggles",
    "Helmet",
    "Gloves",
    "Protection",
    "Nuts",
    "Screws",
    "Washers",
  ],
};

/**
 * Cart configuration scenarios for subtotal calculation tests
 * Tests various product and quantity combinations
 */
export const cartConfigurations = [
  { productCount: 1, quantityPerProduct: 1 },
  { productCount: 2, quantityPerProduct: 3 },
  { productCount: 3, quantityPerProduct: 2 },
];

// ==================== FILTER DATA SECTION ====================

/**
 * Complete list of subcategories for filter testing
 */
export const subcategories = [
  "Hammer",
  "Hand Saw",
  "Wrench",
  "Screwdriver",
  "Pliers",
  "Chisels",
  "Measures",
  "Grinder",
  "Sander",
  "Saw",
  "Drill",
  "Tool Belts",
  "Storage Solutions",
  "Workbench",
  "Safety Gear",
  "Fasteners",
];

/**
 * Available brands for brand filter testing
 */
export const brands = ["ForgeFlex Tools", "MightyCraft Hardware"];

/**
 * Multiple filter combinations for complex filter scenarios
 */
export const multipleFilters = [
  { category: "Hand Tools", brand: "ForgeFlex Tools" },
  { category: "Power Tools", brand: "MightyCraft Hardware" },
];

/**
 * Subcategory-specific keywords for filter validation
 * Maps each subcategory to expected product name keywords
 */
export const subcategoryKeywords = {
  Hammer: ["Hammer"],
  "Hand Saw": ["Saw"],
  Wrench: ["Wrench", "Spanner"],
  Screwdriver: ["Screwdriver"],
  Pliers: ["Pliers", "Cutters"],
  Chisels: ["Chisels"],
  Measures: ["Measur", "Ruler"],
  Sander: ["Sander"],
  Saw: ["Saw"],
  Drill: ["Drill"],
  "Tool Belts": ["toolbelt"],
  "Storage Solutions": ["Cabinet"],
  Workbench: ["Workbench"],
  "Safety Gear": ["Gloves", "Helmet", "Protection", "Goggles"],
  Fasteners: ["Screws", "Nuts", "Washers"],
};

/**
 * Subcategories expected to return no results
 * Used for empty results scenario testing
 */
export const subcategoriesWithNoResults = ["Grinder"];

// ==================== TRANSLATION DATA SECTION ====================

/**
 * Complete translation mappings for contact page language tests
 * Supports DE, EN, ES, FR, NL, TR languages
 */
export const languageMap = {
  contactTranslations: {
    EN: {
      mainHeading: "Contact",
      homeLink: "Home",
      categoriesLink: "Categories",
      contactLink: "Contact",
      signInLink: "Sign in",
      firstNameField: "First name",
      lastNameField: "Last name",
      emailField: "Email address",
      subjectField: "Subject",
      messageField: "Message *",
      attachmentLabel: "Attachment",
      submitButton: "Send",
      warningLabel:
        "Only files with the txt extension are allowed, and files must be 0kb.",
      infoLabel:
        "This is a DEMO application (GitHub repo), used for software testing training purpose.",
      firstNamePlaceholder: "Your first name *",
      lastNamePlaceholder: "Your last name *",
      emailPlaceholder: "Your email *",
      subjectPlaceholder: "Select a subject *",
    },
    DE: {
      mainHeading: "Kontakt",
      homeLink: "Start",
      categoriesLink: "Kategorien",
      contactLink: "Kontakt",
      signInLink: "Einloggen",
      firstNameField: "Vorname",
      lastNameField: "Nachname",
      emailField: "Email Adresse",
      subjectField: "Betreff",
      messageField: "Nachricht *",
      attachmentLabel: "Anhang",
      submitButton: "Senden",
      warningLabel: "Nur Dateien mit der Endung txt sind erlaubt.",
      infoLabel:
        "Das ist eine Demo Applikation (GitHub repo), um Software Test Workshops zu unterstützen.",
      firstNamePlaceholder: "Ihr Vorname *",
      lastNamePlaceholder: "Ihr Nachname *",
      emailPlaceholder: "Ihre EMail *",
      subjectPlaceholder: "Betreff auswählen *",
    },
    // Additional language translations follow same structure...
    ES: {
      mainHeading: "Contacto",
      homeLink: "Inicio",
      categoriesLink: "Categorías",
      contactLink: "Contacto",
      signInLink: "Iniciar sesión",
      firstNameField: "Nombre",
      lastNameField: "Apellido",
      emailField: "Dirección de correo electrónico",
      subjectField: "Asunto",
      messageField: "Mensaje *",
      attachmentLabel: "Adjunto",
      submitButton: "Enviar",
      warningLabel:
        "Solo se permiten archivos con la extensión txt, y los archivos deben estar vacíos.",
      infoLabel:
        "Esta es una aplicación DEMO (GitHub repo), utilizada para propósitos de formación en pruebas de software.",
      firstNamePlaceholder: "Tu nombre *",
      lastNamePlaceholder: "Tu apellido *",
      emailPlaceholder: "Tu correo electrónico *",
      subjectPlaceholder: "Selecciona un asunto *",
    },
    FR: {
      mainHeading: "Contact",
      homeLink: "Accueil",
      categoriesLink: "Catégories",
      contactLink: "Contact",
      signInLink: "Se connecter",
      firstNameField: "Prénom",
      lastNameField: "Nom de famille",
      emailField: "Adresse email",
      subjectField: "Sujet",
      messageField: "Message *",
      attachmentLabel: "Pièce jointe",
      submitButton: "Envoyer",
      warningLabel:
        "Seuls les fichiers avec l'extension txt sont autorisés, et les fichiers doivent être de 0ko.",
      infoLabel:
        "Ceci est une application de démonstration (GitHub repo), utilisée à des fins de formation aux tests logiciels.",
      firstNamePlaceholder: "Votre prénom *",
      lastNamePlaceholder: "Votre nom de famille *",
      emailPlaceholder: "Votre email *",
      subjectPlaceholder: "Sélectionner un sujet *",
    },
    NL: {
      mainHeading: "Contact",
      homeLink: "Home",
      categoriesLink: "Categorieën",
      contactLink: "Contact",
      signInLink: "Inloggen",
      firstNameField: "Voornaam",
      lastNameField: "Achternaam",
      emailField: "E-mailadres",
      subjectField: "Onderwerp",
      messageField: "Bericht *",
      attachmentLabel: "Bijlage",
      submitButton: "Verzenden",
      warningLabel:
        "Alleen bestanden met de txt extensie zijn toegestaan, en bestanden moeten 0kb zijn.",
      infoLabel:
        "Dit is een DEMO-applicatie (GitHub repo), die wordt gebruikt voor trainingsdoeleinden in softwaretesten.",
      firstNamePlaceholder: "Uw voornaam *",
      lastNamePlaceholder: "Uw achternaam *",
      emailPlaceholder: "Uw e-mail *",
      subjectPlaceholder: "Kies een onderwerp *",
    },
    TR: {
      mainHeading: "İletişim",
      homeLink: "Anasayfa",
      categoriesLink: "Kategoriler",
      contactLink: "İletişim",
      signInLink: "Giriş Yap",
      firstNameField: "Ad",
      lastNameField: "Soyad",
      emailField: "E-posta adresi",
      subjectField: "Konu",
      messageField: "Mesaj *",
      attachmentLabel: "Ek",
      submitButton: "Gönder",
      warningLabel:
        "Sadece txt uzantılı dosyalara izin verilir ve dosyalar 0kb olmalıdır.",
      infoLabel:
        "Bu bir DEMO uygulamasıdır (GitHub repo), yazılım testi eğitimi amacıyla kullanılır.",
      firstNamePlaceholder: "Adınız *",
      lastNamePlaceholder: "Soyadınız *",
      emailPlaceholder: "E-posta adresiniz *",
      subjectPlaceholder: "Bir konu seçin *",
    },
  },
};
