"use client"

import { ClinicalHistoryLayout } from "@/components/clinical-history/clinical-history-layout"
import { mockPatient } from "@/lib/clinical-history/mock-data"

export default function ClinicalHistoryPage() {
  return <ClinicalHistoryLayout patientId={mockPatient.id} />
}
