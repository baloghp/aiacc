export enum Role {
  Provider = 'Provider',
  Deployer = 'Deployer',
  ProductManufacturer = 'ProductManufacturer',
  AuthorizedRepresentative = 'AuthorizedRepresentative',
  Importer = 'Importer',
  Distributor = 'Distributor',
}

export enum RiskLevel {
  Prohibited = "Prohibited",
  High = "High",
  Limited = "Limited",
  Minimal = "Minimal"
}

export enum AssessmentPhase {
  Company = "Company",
  AISystem = "AISystem", 
  Applicability = "Applicability",
  Roles = "Roles",
  Risk = "Risk",
  GPAI = "GPAI",
  Results = "Results"
} 