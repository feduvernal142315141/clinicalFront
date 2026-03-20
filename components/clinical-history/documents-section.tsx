"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Checkbox,
} from "@/components/ui"
import {
  FileText,
  Plus,
  Search,
  MoreVertical,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  FileSignature,
  Shield,
  Calendar,
  User,
  Pen,
  Upload,
  FilePlus,
  History,
  Lock,
} from "lucide-react"
import { Document } from "@/lib/clinical-history/types"
import { cn } from "@/lib/utils/utils"

interface DocumentsSectionProps {
  documents: Document[]
  patientId: string
  onDocumentAdd?: (document: Partial<Document>) => void
  onDocumentSign?: (documentId: string) => void
}

const documentTypeLabels: Record<string, string> = {
  consent: "Consentimiento Informado",
  authorization: "Autorización de Tratamiento",
  surgical_consent: "Consentimiento Quirúrgico",
  legal: "Documento Legal",
  other: "Otro Documento",
}

const documentTypeIcons: Record<string, React.ReactNode> = {
  consent: <FileSignature className="h-4 w-4" />,
  authorization: <CheckCircle2 className="h-4 w-4" />,
  surgical_consent: <Shield className="h-4 w-4" />,
  legal: <FileText className="h-4 w-4" />,
  other: <FilePlus className="h-4 w-4" />,
}

const statusConfig = {
  pending: {
    label: "Pendiente de Firma",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: Clock,
  },
  signed: {
    label: "Firmado",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: CheckCircle2,
  },
  expired: {
    label: "Expirado",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: AlertTriangle,
  },
  revoked: {
    label: "Revocado",
    color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    icon: XCircle,
  },
}

export function DocumentsSection({
  documents,
  patientId,
  onDocumentAdd,
  onDocumentSign,
}: DocumentsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const pendingCount = documents.filter((d) => d.status === "pending").length
  const signedCount = documents.filter((d) => d.status === "signed").length
  const expiredCount = documents.filter((d) => d.status === "expired").length

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const isExpiringSoon = (expirationDate?: string) => {
    if (!expirationDate) return false
    const expDate = new Date(expirationDate)
    const now = new Date()
    const daysUntilExpiration = Math.ceil(
      (expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0
  }

  const handleAddDocument = () => {
    // Mock implementation - ready for backend integration
    onDocumentAdd?.({
      type: "consent",
      status: "pending",
      patientId,
    })
    setIsAddDialogOpen(false)
  }

  const handleSignDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsSignDialogOpen(true)
  }

  const confirmSign = () => {
    if (selectedDocument) {
      onDocumentSign?.(selectedDocument.id)
    }
    setIsSignDialogOpen(false)
    setSelectedDocument(null)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{documents.length}</p>
                <p className="text-xs text-muted-foreground">Total Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{signedCount}</p>
                <p className="text-xs text-muted-foreground">Firmados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{expiredCount}</p>
                <p className="text-xs text-muted-foreground">Expirados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-primary" />
              Documentos y Consentimientos
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Documento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Documento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Tipo de Documento</Label>
                    <Select defaultValue="consent">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consent">Consentimiento Informado</SelectItem>
                        <SelectItem value="authorization">Autorización de Tratamiento</SelectItem>
                        <SelectItem value="surgical_consent">Consentimiento Quirúrgico</SelectItem>
                        <SelectItem value="legal">Documento Legal</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Título del Documento</Label>
                    <Input placeholder="Ej: Consentimiento para Extracción Dental" />
                  </div>

                  <div className="space-y-2">
                    <Label>Descripción</Label>
                    <Textarea
                      placeholder="Descripción detallada del documento..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tratamiento Relacionado (Opcional)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tratamiento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t1">Endodoncia - Pieza 36</SelectItem>
                          <SelectItem value="t2">Corona - Pieza 36</SelectItem>
                          <SelectItem value="t3">Implante - Pieza 46</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Fecha de Expiración (Opcional)</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Plantilla o Archivo</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Arrastra un archivo o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC hasta 10MB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="require-signature" defaultChecked />
                    <label
                      htmlFor="require-signature"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Requiere firma del paciente
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddDocument}>Crear Documento</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="consent">Consentimiento</SelectItem>
                <SelectItem value="authorization">Autorización</SelectItem>
                <SelectItem value="surgical_consent">Quirúrgico</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="signed">Firmado</SelectItem>
                <SelectItem value="expired">Expirado</SelectItem>
                <SelectItem value="revoked">Revocado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Documents List */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-[300px] grid-cols-2">
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-4">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {filteredDocuments.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground">No se encontraron documentos</p>
                    </div>
                  ) : (
                    filteredDocuments.map((doc) => {
                      const status = statusConfig[doc.status]
                      const StatusIcon = status.icon
                      const expiringSoon = isExpiringSoon(doc.expirationDate)

                      return (
                        <div
                          key={doc.id}
                          className={cn(
                            "group p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-200",
                            doc.status === "pending" && "border-l-4 border-l-amber-500",
                            doc.status === "expired" && "border-l-4 border-l-red-500"
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                "p-3 rounded-xl",
                                doc.status === "signed"
                                  ? "bg-emerald-500/10"
                                  : doc.status === "pending"
                                  ? "bg-amber-500/10"
                                  : doc.status === "expired"
                                  ? "bg-red-500/10"
                                  : "bg-zinc-500/10"
                              )}
                            >
                              {documentTypeIcons[doc.type]}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-medium text-foreground truncate">
                                    {doc.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {documentTypeLabels[doc.type]}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={cn("border", status.color)}>
                                    <StatusIcon className="h-3 w-3 mr-1" />
                                    {status.label}
                                  </Badge>
                                  {expiringSoon && (
                                    <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 border">
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Por expirar
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {doc.description && (
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {doc.description}
                                </p>
                              )}

                              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Creado: {formatDate(doc.createdAt)}
                                </span>
                                {doc.signedAt && (
                                  <span className="flex items-center gap-1 text-emerald-500">
                                    <Pen className="h-3.5 w-3.5" />
                                    Firmado: {formatDate(doc.signedAt)}
                                  </span>
                                )}
                                {doc.expirationDate && (
                                  <span
                                    className={cn(
                                      "flex items-center gap-1",
                                      expiringSoon && "text-orange-500",
                                      doc.status === "expired" && "text-red-500"
                                    )}
                                  >
                                    <Clock className="h-3.5 w-3.5" />
                                    Expira: {formatDate(doc.expirationDate)}
                                  </span>
                                )}
                                {doc.signedBy && (
                                  <span className="flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    {doc.signedBy}
                                  </span>
                                )}
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedDocument(doc)
                                    setIsViewDialogOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Documento
                                </DropdownMenuItem>
                                {doc.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleSignDocument(doc)}>
                                    <Pen className="h-4 w-4 mr-2" />
                                    Firmar Documento
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <History className="h-4 w-4 mr-2" />
                                  Ver Historial
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="grid" className="mt-4">
              <ScrollArea className="h-[500px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map((doc) => {
                    const status = statusConfig[doc.status]
                    const StatusIcon = status.icon

                    return (
                      <Card
                        key={doc.id}
                        className={cn(
                          "group hover:shadow-lg transition-all duration-200 cursor-pointer",
                          doc.status === "pending" && "border-t-4 border-t-amber-500",
                          doc.status === "signed" && "border-t-4 border-t-emerald-500",
                          doc.status === "expired" && "border-t-4 border-t-red-500"
                        )}
                        onClick={() => {
                          setSelectedDocument(doc)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={cn(
                                "p-2 rounded-lg",
                                doc.status === "signed"
                                  ? "bg-emerald-500/10"
                                  : doc.status === "pending"
                                  ? "bg-amber-500/10"
                                  : "bg-zinc-500/10"
                              )}
                            >
                              {documentTypeIcons[doc.type]}
                            </div>
                            <Badge className={cn("border text-xs", status.color)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>

                          <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            {documentTypeLabels[doc.type]}
                          </p>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{formatDate(doc.createdAt)}</span>
                            {doc.status === "pending" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSignDocument(doc)
                                }}
                              >
                                <Pen className="h-3 w-3 mr-1" />
                                Firmar
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocument && documentTypeIcons[selectedDocument.type]}
              {selectedDocument?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 py-4">
                <div className="flex items-center gap-3">
                  <Badge className={cn("border", statusConfig[selectedDocument.status].color)}>
                    {statusConfig[selectedDocument.status].label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {documentTypeLabels[selectedDocument.type]}
                  </span>
                </div>

                {selectedDocument.description && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Descripción</h4>
                    <p className="text-sm text-muted-foreground">{selectedDocument.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Fecha de Creación</p>
                    <p className="text-sm font-medium">{formatDate(selectedDocument.createdAt)}</p>
                  </div>
                  {selectedDocument.signedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground">Fecha de Firma</p>
                      <p className="text-sm font-medium text-emerald-500">
                        {formatDate(selectedDocument.signedAt)}
                      </p>
                    </div>
                  )}
                  {selectedDocument.expirationDate && (
                    <div>
                      <p className="text-xs text-muted-foreground">Fecha de Expiración</p>
                      <p className="text-sm font-medium">{formatDate(selectedDocument.expirationDate)}</p>
                    </div>
                  )}
                  {selectedDocument.signedBy && (
                    <div>
                      <p className="text-xs text-muted-foreground">Firmado por</p>
                      <p className="text-sm font-medium">{selectedDocument.signedBy}</p>
                    </div>
                  )}
                </div>

                {/* Document Preview Placeholder */}
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Vista previa del documento</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    El contenido del documento se mostrará aquí
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Este documento está protegido y no puede ser eliminado. Solo se puede marcar como inactivo.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Descargar PDF
                  </Button>
                  {selectedDocument.status === "pending" && (
                    <Button
                      className="gap-2"
                      onClick={() => {
                        setIsViewDialogOpen(false)
                        handleSignDocument(selectedDocument)
                      }}
                    >
                      <Pen className="h-4 w-4" />
                      Firmar Documento
                    </Button>
                  )}
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Sign Document Dialog */}
      <Dialog open={isSignDialogOpen} onOpenChange={setIsSignDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-primary" />
              Firmar Documento
            </DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-1">{selectedDocument.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {documentTypeLabels[selectedDocument.type]}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Firma Digital</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
                  <Pen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Área de firma digital
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Toque o dibuje su firma aquí
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="confirm-read" />
                <label
                  htmlFor="confirm-read"
                  className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirmo que he leído y entendido completamente el contenido de este documento
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsSignDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={confirmSign} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Confirmar Firma
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
