// Mock Data for Clinical History Module
// Ready for backend integration - replace with API calls

import type {
  PatientClinical,
  MedicalHistory,
  DentalTreatment,
  ClinicalEvolution,
  Radiograph,
  ClinicalDocument,
  Budget,
  Payment,
  DentalSummary,
  AuditLog,
} from './types';

export const mockPatient: PatientClinical = {
  id: 'PAT-001',
  name: 'María García López',
  age: 34,
  gender: 'F',
  phone: '+52 55 1234 5678',
  email: 'maria.garcia@email.com',
  bloodType: 'O+',
  insurancePlan: 'MetLife Dental Premium',
  emergencyContact: {
    name: 'Juan García',
    phone: '+52 55 8765 4321',
    relationship: 'Esposo',
  },
  alerts: [
    {
      id: 'ALT-001',
      type: 'allergy',
      severity: 'critical',
      title: 'Alergia a Penicilina',
      description: 'Reacción anafiláctica documentada. Usar alternativas.',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'ALT-002',
      type: 'disease',
      severity: 'warning',
      title: 'Diabetes Tipo 2',
      description: 'Controlada con metformina. Verificar niveles antes de cirugías.',
      createdAt: '2024-02-20T14:30:00Z',
      updatedAt: '2024-02-20T14:30:00Z',
    },
    {
      id: 'ALT-003',
      type: 'medication',
      severity: 'info',
      title: 'Anticonceptivos',
      description: 'Toma anticonceptivos orales diarios.',
      createdAt: '2024-03-10T09:00:00Z',
      updatedAt: '2024-03-10T09:00:00Z',
    },
  ],
  lastVisit: '2024-12-15',
  nextAppointment: '2025-01-20',
};

export const mockMedicalHistory: MedicalHistory = {
  id: 'MH-001',
  patientId: 'PAT-001',
  systemicDiseases: ['Diabetes Tipo 2', 'Hipertensión controlada'],
  currentMedications: ['Metformina 850mg', 'Losartán 50mg', 'Anticonceptivos'],
  allergies: ['Penicilina', 'Látex'],
  previousSurgeries: ['Apendicectomía (2018)', 'Cesárea (2020)'],
  chiefComplaint: 'Dolor en molar inferior derecho al masticar',
  habits: ['Bruxismo nocturno'],
  currentPain: {
    location: 'Pieza 46',
    intensity: 6,
    type: 'Punzante al masticar',
  },
  lastDentalVisit: '2024-06-15',
  isValidated: true,
  validatedAt: '2024-12-01T10:00:00Z',
  validatedBy: 'Dr. Carlos Méndez',
  updatedAt: '2024-12-15T14:30:00Z',
  createdAt: '2024-01-10T09:00:00Z',
};

export const mockTreatments: DentalTreatment[] = [
  {
    id: 'TRT-001',
    patientId: 'PAT-001',
    toothIds: ['46'],
    diagnosis: 'Caries profunda con compromiso pulpar',
    procedure: 'Endodoncia + Corona',
    specialty: 'endodontics',
    status: 'in-progress',
    cost: 8500,
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    notes: 'Primera sesión de conductos completada. Requiere 2 sesiones más.',
    consentId: 'DOC-001',
    startedAt: '2024-12-15T10:00:00Z',
    createdAt: '2024-12-10T09:00:00Z',
    updatedAt: '2024-12-15T12:00:00Z',
  },
  {
    id: 'TRT-002',
    patientId: 'PAT-001',
    toothIds: ['36'],
    diagnosis: 'Caries oclusal media',
    procedure: 'Resina compuesta',
    specialty: 'general',
    status: 'completed',
    cost: 1200,
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    startedAt: '2024-11-20T11:00:00Z',
    completedAt: '2024-11-20T12:00:00Z',
    createdAt: '2024-11-15T09:00:00Z',
    updatedAt: '2024-11-20T12:00:00Z',
  },
  {
    id: 'TRT-003',
    patientId: 'PAT-001',
    toothIds: ['17', '27'],
    diagnosis: 'Terceros molares impactados',
    procedure: 'Extracción quirúrgica bilateral',
    specialty: 'surgery',
    status: 'pending',
    cost: 6000,
    doctorId: 'DOC-002',
    doctorName: 'Dra. Ana Rodríguez',
    notes: 'Programar cirugía. Paciente prefiere sedación consciente.',
    createdAt: '2024-12-01T09:00:00Z',
    updatedAt: '2024-12-01T09:00:00Z',
  },
  {
    id: 'TRT-004',
    patientId: 'PAT-001',
    toothIds: ['11', '21'],
    diagnosis: 'Desgaste por bruxismo',
    procedure: 'Carillas de porcelana',
    specialty: 'prosthetics',
    status: 'pending',
    cost: 12000,
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    notes: 'Requiere guarda nocturna previamente.',
    createdAt: '2024-12-05T09:00:00Z',
    updatedAt: '2024-12-05T09:00:00Z',
  },
  {
    id: 'TRT-005',
    patientId: 'PAT-001',
    toothIds: [],
    diagnosis: 'Bruxismo nocturno',
    procedure: 'Guarda oclusal',
    specialty: 'general',
    status: 'pending',
    cost: 2500,
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    createdAt: '2024-12-05T09:30:00Z',
    updatedAt: '2024-12-05T09:30:00Z',
  },
];

export const mockEvolutions: ClinicalEvolution[] = [
  {
    id: 'EVO-001',
    patientId: 'PAT-001',
    treatmentId: 'TRT-001',
    date: '2024-12-15',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    proceduresPerformed: ['Apertura cameral', 'Conductometría', 'Preparación biomecánica'],
    teethTreated: ['46'],
    observations: 'Se realizó primera sesión de endodoncia. Tres conductos localizados (MV, DV, D). Longitud de trabajo establecida. Paciente toleró bien el procedimiento.',
    nextIndication: 'Continuar preparación y obturación en siguiente cita. Mantener medicación intraconducto.',
    signature: 'Dr. Carlos Méndez - MP 12345',
    createdAt: '2024-12-15T12:00:00Z',
  },
  {
    id: 'EVO-002',
    patientId: 'PAT-001',
    treatmentId: 'TRT-002',
    date: '2024-11-20',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    proceduresPerformed: ['Eliminación de caries', 'Grabado ácido', 'Aplicación de adhesivo', 'Restauración con resina'],
    teethTreated: ['36'],
    observations: 'Caries oclusal clase I eliminada completamente. Restauración con resina A2. Ajuste oclusal realizado.',
    createdAt: '2024-11-20T12:00:00Z',
  },
  {
    id: 'EVO-003',
    patientId: 'PAT-001',
    date: '2024-10-05',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    proceduresPerformed: ['Examen clínico completo', 'Toma de radiografías', 'Plan de tratamiento'],
    teethTreated: [],
    observations: 'Primera consulta. Se realiza examen completo y plan de tratamiento integral. Paciente acepta presupuesto para tratamientos prioritarios.',
    nextIndication: 'Iniciar con tratamiento de pieza 36 por ser menos invasivo.',
    createdAt: '2024-10-05T11:00:00Z',
  },
];

export const mockRadiographs: Radiograph[] = [
  {
    id: 'RAD-001',
    patientId: 'PAT-001',
    type: 'panoramic',
    imageUrl: '/placeholder.svg?height=400&width=800',
    thumbnailUrl: '/placeholder.svg?height=100&width=200',
    description: 'Radiografía panorámica inicial',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    takenAt: '2024-10-05',
    createdAt: '2024-10-05T10:30:00Z',
  },
  {
    id: 'RAD-002',
    patientId: 'PAT-001',
    type: 'periapical',
    toothIds: ['46'],
    imageUrl: '/placeholder.svg?height=300&width=300',
    thumbnailUrl: '/placeholder.svg?height=100&width=100',
    description: 'Periapical pieza 46 - Evaluación pulpar',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    takenAt: '2024-12-10',
    createdAt: '2024-12-10T09:30:00Z',
  },
  {
    id: 'RAD-003',
    patientId: 'PAT-001',
    type: 'bitewing',
    toothIds: ['16', '17', '46', '47'],
    imageUrl: '/placeholder.svg?height=200&width=400',
    thumbnailUrl: '/placeholder.svg?height=100&width=200',
    description: 'Bitewing derecho',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    takenAt: '2024-10-05',
    createdAt: '2024-10-05T10:45:00Z',
  },
  {
    id: 'RAD-004',
    patientId: 'PAT-001',
    type: 'clinical-photo',
    toothIds: ['11', '21'],
    imageUrl: '/placeholder.svg?height=400&width=600',
    thumbnailUrl: '/placeholder.svg?height=100&width=150',
    description: 'Fotografía frontal - Desgaste incisivos',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    takenAt: '2024-12-05',
    createdAt: '2024-12-05T10:00:00Z',
  },
];

export const mockDocuments: ClinicalDocument[] = [
  {
    id: 'DOC-001',
    patientId: 'PAT-001',
    type: 'informed-consent',
    title: 'Consentimiento para Endodoncia',
    description: 'Autorización para tratamiento de conductos en pieza 46',
    status: 'active',
    patientSignature: 'María García López',
    patientSignedAt: '2024-12-10T09:00:00Z',
    doctorSignature: 'Dr. Carlos Méndez',
    doctorSignedAt: '2024-12-10T09:05:00Z',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    createdAt: '2024-12-10T08:50:00Z',
    updatedAt: '2024-12-10T09:05:00Z',
  },
  {
    id: 'DOC-002',
    patientId: 'PAT-001',
    type: 'treatment-authorization',
    title: 'Autorización de Plan de Tratamiento',
    description: 'Aceptación del plan de tratamiento integral propuesto',
    status: 'active',
    patientSignature: 'María García López',
    patientSignedAt: '2024-10-05T11:30:00Z',
    doctorSignature: 'Dr. Carlos Méndez',
    doctorSignedAt: '2024-10-05T11:35:00Z',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Carlos Méndez',
    createdAt: '2024-10-05T11:00:00Z',
    updatedAt: '2024-10-05T11:35:00Z',
  },
  {
    id: 'DOC-003',
    patientId: 'PAT-001',
    type: 'surgical-consent',
    title: 'Consentimiento Quirúrgico - Terceros Molares',
    description: 'Pendiente de firma para extracción de terceros molares',
    status: 'active',
    doctorId: 'DOC-002',
    doctorName: 'Dra. Ana Rodríguez',
    validUntil: '2025-03-01',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
];

export const mockBudget: Budget = {
  id: 'BUD-001',
  patientId: 'PAT-001',
  items: [
    {
      id: 'BI-001',
      treatmentId: 'TRT-001',
      procedure: 'Endodoncia + Corona pieza 46',
      toothIds: ['46'],
      priority: 1,
      estimatedCost: 8500,
      status: 'in-progress',
    },
    {
      id: 'BI-002',
      treatmentId: 'TRT-003',
      procedure: 'Extracción terceros molares',
      toothIds: ['17', '27'],
      priority: 2,
      estimatedCost: 6000,
      status: 'pending',
    },
    {
      id: 'BI-003',
      treatmentId: 'TRT-005',
      procedure: 'Guarda oclusal',
      toothIds: [],
      priority: 3,
      estimatedCost: 2500,
      status: 'pending',
    },
    {
      id: 'BI-004',
      treatmentId: 'TRT-004',
      procedure: 'Carillas de porcelana',
      toothIds: ['11', '21'],
      priority: 4,
      dependsOn: ['TRT-005'],
      estimatedCost: 12000,
      status: 'pending',
    },
  ],
  subtotal: 29000,
  discount: 2900,
  discountPercentage: 10,
  total: 26100,
  status: 'partial',
  patientSignature: 'María García López',
  patientSignedAt: '2024-10-05T11:30:00Z',
  validUntil: '2025-04-05',
  createdAt: '2024-10-05T11:00:00Z',
  updatedAt: '2024-12-15T12:00:00Z',
};

export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    patientId: 'PAT-001',
    budgetId: 'BUD-001',
    treatmentId: 'TRT-002',
    amount: 1200,
    method: 'card',
    status: 'paid',
    reference: 'TXN-2024-11-20-001',
    receivedBy: 'Recepción',
    createdAt: '2024-11-20T12:30:00Z',
  },
  {
    id: 'PAY-002',
    patientId: 'PAT-001',
    budgetId: 'BUD-001',
    treatmentId: 'TRT-001',
    amount: 4250,
    method: 'transfer',
    status: 'paid',
    reference: 'SPEI-2024-12-10-001',
    notes: 'Anticipo 50% endodoncia',
    receivedBy: 'Recepción',
    createdAt: '2024-12-10T09:30:00Z',
  },
];

export const mockDentalSummary: DentalSummary = {
  activeTreatments: 1,
  pendingTreatments: 3,
  completedTreatments: 1,
  criticalTeeth: ['46', '17', '27'],
  lastVisit: '2024-12-15',
  nextAppointment: '2025-01-20',
  approvedBudget: 26100,
  pendingBudget: 20650,
  totalPaid: 5450,
  totalOwed: 20650,
  mainDiagnoses: ['Caries profunda', 'Terceros molares impactados', 'Bruxismo'],
};

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'LOG-001',
    patientId: 'PAT-001',
    action: 'view',
    entity: 'clinical-history',
    entityId: 'PAT-001',
    userId: 'DOC-001',
    userName: 'Dr. Carlos Méndez',
    userRole: 'doctor',
    timestamp: '2024-12-15T10:00:00Z',
  },
  {
    id: 'LOG-002',
    patientId: 'PAT-001',
    action: 'update',
    entity: 'evolution',
    entityId: 'EVO-001',
    userId: 'DOC-001',
    userName: 'Dr. Carlos Méndez',
    userRole: 'doctor',
    details: 'Agregó evolución de tratamiento',
    timestamp: '2024-12-15T12:00:00Z',
  },
  {
    id: 'LOG-003',
    patientId: 'PAT-001',
    action: 'sign',
    entity: 'document',
    entityId: 'DOC-001',
    userId: 'DOC-001',
    userName: 'Dr. Carlos Méndez',
    userRole: 'doctor',
    details: 'Firmó consentimiento de endodoncia',
    timestamp: '2024-12-10T09:05:00Z',
  },
];

// Service functions - ready to swap for API calls
export const clinicalHistoryService = {
  getPatient: async (id: string): Promise<PatientClinical> => {
    // TODO: Replace with API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPatient;
  },

  getMedicalHistory: async (patientId: string): Promise<MedicalHistory> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockMedicalHistory;
  },

  getTreatments: async (patientId: string): Promise<DentalTreatment[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockTreatments;
  },

  getEvolutions: async (patientId: string): Promise<ClinicalEvolution[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockEvolutions;
  },

  getRadiographs: async (patientId: string): Promise<Radiograph[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockRadiographs;
  },

  getDocuments: async (patientId: string): Promise<ClinicalDocument[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockDocuments;
  },

  getBudget: async (patientId: string): Promise<Budget> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockBudget;
  },

  getPayments: async (patientId: string): Promise<Payment[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPayments;
  },

  getDentalSummary: async (patientId: string): Promise<DentalSummary> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockDentalSummary;
  },

  getAuditLogs: async (patientId: string): Promise<AuditLog[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAuditLogs;
  },

  // Mutations - ready for backend
  updateTreatment: async (id: string, data: Partial<DentalTreatment>): Promise<DentalTreatment> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const treatment = mockTreatments.find(t => t.id === id);
    if (!treatment) throw new Error('Treatment not found');
    return { ...treatment, ...data, updatedAt: new Date().toISOString() };
  },

  createEvolution: async (data: Omit<ClinicalEvolution, 'id' | 'createdAt'>): Promise<ClinicalEvolution> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      ...data,
      id: `EVO-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  },

  signDocument: async (id: string, signature: string, role: 'patient' | 'doctor'): Promise<ClinicalDocument> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const doc = mockDocuments.find(d => d.id === id);
    if (!doc) throw new Error('Document not found');
    const timestamp = new Date().toISOString();
    return {
      ...doc,
      ...(role === 'patient' ? { patientSignature: signature, patientSignedAt: timestamp } : {}),
      ...(role === 'doctor' ? { doctorSignature: signature, doctorSignedAt: timestamp } : {}),
      updatedAt: timestamp,
    };
  },
};
