"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Button,
  Input,
  Label,
  Textarea,
  AspectRatio,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import type { Radiograph } from "@/lib/clinical-history/types";
import {
  Plus,
  Search,
  Filter,
  Image,
  Camera,
  ZoomIn,
  ZoomOut,
  Download,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  Grid3X3,
  List,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { toast } from "sonner";

interface RadioGraphsSectionProps {
  radiographs: Radiograph[];
}

const typeConfig: Record<Radiograph["type"], { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  panoramic: { label: "Panorámica", icon: Image, color: "text-sky-600 bg-sky-100 dark:bg-sky-900/30" },
  periapical: { label: "Periapical", icon: Image, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
  bitewing: { label: "Bite-wing", icon: Image, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
  clinical_photo: { label: "Foto Clínica", icon: Camera, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
  other: { label: "Otro", icon: Image, color: "text-gray-600 bg-gray-100 dark:bg-gray-800" },
};

export function RadioGraphsSection({ radiographs }: RadioGraphsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<Radiograph | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Filter radiographs
  const filteredRadiographs = radiographs.filter((rad) => {
    const matchesSearch =
      rad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rad.toothNumbers?.some((num) => String(num).includes(searchTerm));

    const matchesType = typeFilter === "all" || rad.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Group by type for grid view
  const groupedByType = filteredRadiographs.reduce<Record<string, Radiograph[]>>((acc, rad) => {
    if (!acc[rad.type]) acc[rad.type] = [];
    acc[rad.type].push(rad);
    return acc;
  }, {});

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleImageSelect = (index: number) => {
    setSelectedImage(filteredRadiographs[index]);
  };

  const currentIndex = selectedImage
    ? filteredRadiographs.findIndex((r) => r.id === selectedImage.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredRadiographs[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredRadiographs.length - 1) {
      setSelectedImage(filteredRadiographs[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Radiografías e Imágenes</h2>
          <p className="text-muted-foreground">
            {radiographs.length} imágenes diagnósticas
          </p>
        </div>

        <Button onClick={() => setIsUploadDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Subir Imagen
        </Button>
      </div>

      {/* Type Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = radiographs.filter((r) => r.type === type).length;
          const Icon = config.icon;
          return (
            <Card
              key={type}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                typeFilter === type && "ring-2 ring-primary"
              )}
              onClick={() => setTypeFilter(typeFilter === type ? "all" : type)}
            >
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por descripción o pieza dental..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            {Object.entries(typeConfig).map(([value, { label }]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-10 w-10 rounded-r-none"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            className="h-10 w-10 rounded-l-none"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {filteredRadiographs.length > 0 ? (
        viewMode === "grid" ? (
          <div className="space-y-6">
            {Object.entries(groupedByType).map(([type, rads]) => {
              const config = typeConfig[type as Radiograph["type"]];
              const Icon = config.icon;
              return (
                <div key={type}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn("p-1.5 rounded-md", config.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-foreground">{config.label}</h3>
                    <Badge variant="secondary" className="ml-auto">
                      {rads.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {rads.map((rad, index) => (
                      <ImageCard
                        key={rad.id}
                        radiograph={rad}
                        onClick={() => handleImageSelect(filteredRadiographs.indexOf(rad))}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredRadiographs.map((rad) => (
                  <ImageListItem
                    key={rad.id}
                    radiograph={rad}
                    onClick={() => handleImageSelect(filteredRadiographs.indexOf(rad))}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Image className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">No hay imágenes</p>
            <p className="text-sm text-muted-foreground mt-1">
              Sube radiografías o fotos clínicas para el expediente
            </p>
            <Button onClick={() => setIsUploadDialogOpen(true)} className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Subir Primera Imagen
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Image Viewer Dialog */}
      <ImageViewerDialog
        radiograph={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredRadiographs.length - 1}
        currentIndex={currentIndex}
        totalCount={filteredRadiographs.length}
      />

      {/* Upload Dialog */}
      <UploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </div>
  );
}

interface ImageCardProps {
  radiograph: Radiograph;
  onClick: () => void;
}

function ImageCard({ radiograph, onClick }: ImageCardProps) {
  const config = typeConfig[radiograph.type];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
    });

  return (
    <Card
      className="group cursor-pointer overflow-hidden hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img
            src={radiograph.imageUrl}
            alt={radiograph.description || "Radiografía"}
            className="object-cover w-full h-full bg-muted"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <Badge
          variant="secondary"
          className={cn("absolute top-2 left-2 text-xs", config.color)}
        >
          {config.label}
        </Badge>
        {radiograph.toothNumbers && radiograph.toothNumbers.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1">
            {radiograph.toothNumbers.slice(0, 2).map((num) => (
              <Badge key={num} variant="outline" className="font-mono text-xs bg-black/50 text-white">
                #{num}
              </Badge>
            ))}
            {radiograph.toothNumbers.length > 2 && (
              <Badge variant="outline" className="text-xs bg-black/50 text-white">
                +{radiograph.toothNumbers.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <p className="text-sm font-medium text-foreground truncate">
          {radiograph.description || "Sin descripción"}
        </p>
        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
          <span>{formatDate(radiograph.takenAt)}</span>
          <span className="truncate">{radiograph.doctorName}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface ImageListItemProps {
  radiograph: Radiograph;
  onClick: () => void;
}

function ImageListItem({ radiograph, onClick }: ImageListItemProps) {
  const config = typeConfig[radiograph.type];
  const Icon = config.icon;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
        <img
          src={radiograph.thumbnailUrl || radiograph.imageUrl}
          alt={radiograph.description || "Radiografía"}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("gap-1 text-xs", config.color)}>
            <Icon className="h-3 w-3" />
            {config.label}
          </Badge>
          {radiograph.toothNumbers && radiograph.toothNumbers.length > 0 && (
            <span className="text-xs text-muted-foreground font-mono">
              #{radiograph.toothNumbers.join(", #")}
            </span>
          )}
        </div>
        <p className="font-medium text-foreground mt-1 truncate">
          {radiograph.description || "Sin descripción"}
        </p>
        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(radiograph.takenAt)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {radiograph.doctorName}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onClick}>
            <Maximize2 className="h-4 w-4 mr-2" />
            Ver Imagen
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface ImageViewerDialogProps {
  radiograph: Radiograph | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
}

function ImageViewerDialog({
  radiograph,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: ImageViewerDialogProps) {
  const [zoom, setZoom] = useState(100);

  if (!radiograph) return null;

  const config = typeConfig[radiograph.type];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <Dialog open={!!radiograph} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={config.color}>
              {config.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} de {totalCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 25))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative bg-black overflow-auto">
          <div
            className="min-h-full flex items-center justify-center p-4"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
          >
            <img
              src={radiograph.imageUrl}
              alt={radiograph.description || "Radiografía"}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation Buttons */}
          {hasPrev && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
              onClick={onPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {hasNext && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
              onClick={onNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-3 border-t bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="font-medium text-foreground">
                {radiograph.description || "Sin descripción"}
              </p>
              {radiograph.toothNumbers && radiograph.toothNumbers.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {radiograph.toothNumbers.map((num) => (
                    <Badge key={num} variant="outline" className="font-mono text-xs">
                      #{num}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{radiograph.doctorName}</p>
              <p>{formatDate(radiograph.takenAt)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [teeth, setTeeth] = useState("");

  const handleSubmit = () => {
    toast.success("Imagen subida correctamente");
    onOpenChange(false);
    setType("");
    setDescription("");
    setTeeth("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            Subir Nueva Imagen
          </DialogTitle>
          <DialogDescription>
            Adjunta radiografías o fotografías clínicas al expediente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Image className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              Arrastra una imagen o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG hasta 10MB
            </p>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Tipo de Imagen *</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeConfig).map(([value, { label }]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Teeth */}
          <div className="space-y-2">
            <Label>Piezas Relacionadas (opcional)</Label>
            <Input
              value={teeth}
              onChange={(e) => setTeeth(e.target.value)}
              placeholder="Ej: 46, 47"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la imagen..."
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!type}>
            Subir Imagen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
