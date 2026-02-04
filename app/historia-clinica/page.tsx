"use client"

import { useState } from "react"
import { ClinicalHistoryLayout } from "@/components/clinical-history/clinical-history-layout"
import { DentalSummary } from "@/components/clinical-history/dental-summary"
import { ClinicalOdontogram } from "@/components/clinical-history/clinical-odontogram"
import { MedicalHistorySection } from "@/components/clinical-history/medical-history-section"
import { TreatmentsSection } from "@/components/clinical-history/treatments-section"
import { EvolutionsSection } from "@/components/clinical-history/evolutions-section"
import { RadiographsSection } from "@/components/clinical-history/radiographs-section"
import { DocumentsSection } from "@/components/clinical-history/documents-section"
import { BudgetSection } from "@/components/clinical-history/budget-section"
import { PaymentsSection } from "@/components/clinical-history/payments-section"
import {
  mockPatient,
  mockMedicalHistory,
  mockTreatments,
  mockEvolutions,
  mockRadiographs,
  mockDocuments,
  mockBudgets,
  mockTreatmentPlans,
  mockPayments,
} from "@/lib/clinical-history/mock-data"

export default function ClinicalHistoryPage() {
  const [activeSection, setActiveSection] = useState("summary")

  const renderSection = () => {
    switch (activeSection) {
      case "summary":
        return (
          <DentalSummary
            patient={mockPatient}
            treatments={mockTreatments}
            evolutions={mockEvolutions}
            budgets={mockBudgets}
            payments={mockPayments}
            onNavigate={setActiveSection}
          />
        )
      case "odontogram":
        return (
          <ClinicalOdontogram
            patientId={mockPatient.id}
            treatments={mockTreatments}
            onTreatmentAdd={(data) => console.log("Add treatment:", data)}
          />
        )
      case "medical-history":
        return (
          <MedicalHistorySection
            medicalHistory={mockMedicalHistory}
            onUpdate={(data) => console.log("Update medical history:", data)}
          />
        )
      case "treatments":
        return (
          <TreatmentsSection
            treatments={mockTreatments}
            patientId={mockPatient.id}
            onTreatmentAdd={(data) => console.log("Add treatment:", data)}
            onTreatmentUpdate={(id, data) => console.log("Update treatment:", id, data)}
          />
        )
      case "evolutions":
        return (
          <EvolutionsSection
            evolutions={mockEvolutions}
            treatments={mockTreatments}
            patientId={mockPatient.id}
            onEvolutionAdd={(data) => console.log("Add evolution:", data)}
          />
        )
      case "radiographs":
        return (
          <RadiographsSection
            radiographs={mockRadiographs}
            patientId={mockPatient.id}
            onRadiographAdd={(data) => console.log("Add radiograph:", data)}
          />
        )
      case "documents":
        return (
          <DocumentsSection
            documents={mockDocuments}
            patientId={mockPatient.id}
            onDocumentAdd={(data) => console.log("Add document:", data)}
            onDocumentSign={(id) => console.log("Sign document:", id)}
          />
        )
      case "budget":
        return (
          <BudgetSection
            budgets={mockBudgets}
            treatmentPlans={mockTreatmentPlans}
            treatments={mockTreatments}
            patientId={mockPatient.id}
            onBudgetCreate={(data) => console.log("Create budget:", data)}
            onBudgetApprove={(id) => console.log("Approve budget:", id)}
            onPlanCreate={(data) => console.log("Create plan:", data)}
          />
        )
      case "payments":
        return (
          <PaymentsSection
            payments={mockPayments}
            budgets={mockBudgets}
            patientId={mockPatient.id}
          />
        )
      default:
        return (
          <DentalSummary
            patient={mockPatient}
            treatments={mockTreatments}
            evolutions={mockEvolutions}
            budgets={mockBudgets}
            payments={mockPayments}
            onNavigate={setActiveSection}
          />
        )
    }
  }

  return (
    <ClinicalHistoryLayout
      patient={mockPatient}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </ClinicalHistoryLayout>
  )
}
