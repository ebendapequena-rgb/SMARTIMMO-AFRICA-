export type City = "Douala" | "Yaoundé";

export type DoualaDistrict = "Bépanda" | "Bonanjo" | "Bonapriso" | "Bonabéri" | "Deido";
export type YaoundeDistrict = "Bastos" | "Nkolbisson" | "Nkoaban" | "Oyomabang" | "Odza" | "Etoudi" | "Manguier" | "Nsam";
export type District = DoualaDistrict | YaoundeDistrict;

export type PropertyType = "terrain" | "maison" | "appartement" | "bureau" | "commerce";
export type TransactionType = "achat" | "location" | "construction";

export type RiskLevel = "FAVORABLE" | "WARNING" | "RISK";

export interface SearchExtraction {
  city: City;
  district: District | string;
  propertyType: PropertyType;
  surface: number;
  budget: number;
  bedrooms?: number;
  floors?: string;
  projectType: TransactionType;
  summary: string;
}

export interface LandEvaluation {
  id: string;
  title: string;
  city: City;
  district: District;
  surface: number;
  projectType: string;
  floors: string;
  budget: number;
  hasGPS: boolean;
  gpsCoords?: { lat: number; lng: number };
  status: RiskLevel;
  overallScore: number; // 0 to 100
  criteria: {
    accessibility: { status: RiskLevel; text: string; details: string };
    topography: { status: RiskLevel; text: string; details: string };
    floodRisk: { status: RiskLevel; text: string; details: string };
    zoning: { status: RiskLevel; text: string; details: string };
    utilities: { status: RiskLevel; text: string; details: string };
  };
  recommendations: string[];
  imageUrl: string;
  date: string;
}

export interface DocumentAnalysis {
  id: string;
  documentType: "Titre Foncier" | "Certificat de Propriété" | "Plan de Bornage" | "Contrat de Cession" | "Permis de Bâtir";
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: RiskLevel;
  statusLabel: string;
  extractedInfo: {
    volumeFolio?: string;
    landNumber?: string;
    declaredOwner?: string;
    surfaceDeclared?: string;
    cadastralZone?: string;
    issueDate?: string;
    conservatorSeal?: string;
  };
  checks: {
    titleMatch: { status: RiskLevel; label: string; comment: string };
    boundaryCoherence: { status: RiskLevel; label: string; comment: string };
    mortgageOrDispute: { status: RiskLevel; label: string; comment: string };
    administrativeSeal: { status: RiskLevel; label: string; comment: string };
  };
  warnings: string[];
  recommendations: string[];
}

export interface ArchitecturalConcept {
  id: string;
  title: string;
  buildingType: string;
  floors: string;
  bedrooms: number;
  bathrooms: number;
  landSurface: number;
  footprintSurface: number;
  style: string;
  budgetEstimated: number;
  mainFeatures: string[];
  spaces: {
    level: string;
    rooms: { name: string; surface: number; purpose: string }[];
  }[];
  bioclimaticAdvice: string[];
  imageUrl: string;
  elevationUrl: string;
}

export interface BudgetEstimateBreakdown {
  landCost: number;
  earthworks: number;
  structuralWork: number;
  finishingWork: number;
  laborCost: number;
  utilitiesConnection: number; // ENEO + CAMWATER
  contingency: number; // 10%
  totalMin: number;
  totalMax: number;
}

export interface PropertyItem {
  id: string;
  title: string;
  city: City;
  district: District;
  price: number;
  pricePeriod?: "mois" | "total";
  transaction: "vente" | "location";
  type: PropertyType;
  surface: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  images: string[];
  imageUrl?: string;
  hasVirtualTour: boolean;
  virtualTourAvailable?: boolean;
  virtualTourRooms?: {
    id: string;
    name: string;
    icon: string;
    imageUrl: string;
    description: string;
    highlights: string[];
  }[];
  virtualRooms?: {
    id: string;
    name: string;
    icon?: string;
    imageUrl: string;
    description: string;
    highlights?: string[];
  }[];
  isTitled: boolean;
  isVerified?: boolean;
  legalStatus?: string;
  featured?: boolean;
}

export interface SmartManagementAlert {
  id: string;
  propertyTitle: string;
  type: "water" | "electricity" | "maintenance";
  severity: "NORMAL" | "WARNING" | "CRITICAL";
  title: string;
  usualValue: string;
  currentValue: string;
  possibleCause: string;
  recommendedAction: string;
  technicianContact: string;
  timestamp: string;
  isResolved: boolean;
}

export interface BuildingMetric {
  id: string;
  propertyName: string;
  unit: string;
  city: City;
  district: District;
  waterCurrentCost: number;
  waterNormalCost: number;
  waterVolumeM3: number;
  waterAlert: boolean;
  waterAlertReason?: string;
  electricityCurrentCost: number;
  electricityNormalCost: number;
  electricityKWh: number;
  electricityAlert: boolean;
  electricityAlertReason?: string;
  maintenanceTickets: {
    id: string;
    issue: string;
    status: "En cours" | "Planifié" | "Résolu";
    urgency: "Normale" | "Urgente";
    date: string;
  }[];
  occupancyRate: number; // 0 to 100
  tenantName: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export type ActiveTab =
  | "home"
  | "land_analysis"
  | "document_verification"
  | "project_design"
  | "budget_estimation"
  | "property_search"
  | "smart_management"
  | "user_dashboard"
  | "smart_city";
