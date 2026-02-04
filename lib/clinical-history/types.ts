// Clinical History Types - Dental SaaS
// Ready for backend integration - just swap mock data for API calls

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type TreatmentStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type DocumentStatus = 'active' | 'expired' | 'revoked';
export type BudgetStatus = 'proposed' | 'approved' | 'rejected' | 'partial';
export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'overdue';

export interface ClinicalAlert {
  id: string;
  type: 'allergy' | 'disease' | 'medication' | 'pregnancy' | 'anticoagulant' | 'infectious';
  severity: AlertSeverity;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientClinical {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  phone: string;
  email: string;
  photoUrl?: string;
  bloodType?: string;
  insurancePlan?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  alerts: ClinicalAlert[];
  lastVisit?: string;
  nextAppointment?: string;
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  // Systemic diseases
  systemicDiseases: string[];
  currentMedications: string[];
  allergies: string[];
  previousSurgeries: string[];
  // Dental specific
  chiefComplaint: string;
  habits: string[]; // bruxism, smoking, etc.
  currentPain?: {
    location: string;
    intensity: number; // 1-10
    type: string;
  };
  lastDentalVisit?: string;
  // Validation
  isValidated: boolean;
  validatedAt?: string;
  validatedBy?: string;
  updatedAt: string;
  createdAt: string;
}

export interface DentalTreatment {
  id: string;
  patientId: string;
  toothIds: string[]; // FDI notation
  diagnosis: string;
  procedure: string;
  specialty: 'general' | 'endodontics' | 'orthodontics' | 'periodontics' | 'surgery' | 'prosthetics' | 'pediatric';
  status: TreatmentStatus;
  cost: number;
  doctorId: string;
  doctorName: string;
  notes?: string;
  consentId?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicalEvolution {
  id: string;
  patientId: string;
  treatmentId?: string;
  date: string;
  doctorId: string;
  doctorName: string;
  proceduresPerformed: string[];
  teethTreated: string[];
  observations: string;
  complications?: string;
  nextIndication?: string;
  attachments?: string[];
  signature?: string;
  createdAt: string;
}

export interface Radiograph {
  id: string;
  patientId: string;
  type: 'periapical' | 'panoramic' | 'bitewing' | 'clinical-photo' | 'other';
  toothIds?: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  description?: string;
  doctorId: string;
  doctorName: string;
  takenAt: string;
  createdAt: string;
}

export interface ClinicalDocument {
  id: string;
  patientId: string;
  type: 'informed-consent' | 'treatment-authorization' | 'surgical-consent' | 'legal' | 'other';
  title: string;
  description?: string;
  fileUrl?: string;
  status: DocumentStatus;
  validUntil?: string;
  patientSignature?: string;
  patientSignedAt?: string;
  doctorSignature?: string;
  doctorSignedAt?: string;
  doctorId: string;
  doctorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentPlanItem {
  id: string;
  treatmentId: string;
  procedure: string;
  toothIds: string[];
  priority: number;
  dependsOn?: string[]; // treatment IDs
  estimatedCost: number;
  status: TreatmentStatus;
}

export interface Budget {
  id: string;
  patientId: string;
  items: TreatmentPlanItem[];
  subtotal: number;
  discount: number;
  discountPercentage: number;
  total: number;
  status: BudgetStatus;
  patientSignature?: string;
  patientSignedAt?: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  patientId: string;
  budgetId?: string;
  treatmentId?: string;
  amount: number;
  method: 'cash' | 'card' | 'transfer' | 'insurance';
  status: PaymentStatus;
  reference?: string;
  notes?: string;
  receivedBy: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  patientId: string;
  action: 'view' | 'create' | 'update' | 'sign' | 'export';
  entity: string;
  entityId: string;
  userId: string;
  userName: string;
  userRole: string;
  details?: string;
  reason?: string;
  ipAddress?: string;
  timestamp: string;
}

// Summary types for dashboard
export interface DentalSummary {
  activeTreatments: number;
  pendingTreatments: number;
  completedTreatments: number;
  criticalTeeth: string[];
  lastVisit?: string;
  nextAppointment?: string;
  approvedBudget: number;
  pendingBudget: number;
  totalPaid: number;
  totalOwed: number;
  mainDiagnoses: string[];
}
