import { useState } from "react"
import {
  Upload,
  FileText,
  Folder,
  Check,
  X,
  AlertCircle,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog } from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files))
    }
  }

  const handleUpload = () => {
    // TODO: Implement file upload logic
    console.log("Uploading files:", {
      files: selectedFiles,
      project: selectedProject,
      type: selectedType,
      description,
      isPublic,
    })
    setIsProcessing(true)
    // Simulate upload
    setTimeout(() => {
      setIsProcessing(false)
      setSelectedFiles([])
      setSelectedProject("")
      setSelectedType("")
      setDescription("")
      setIsPublic(false)
      setShowPreview(false)
    }, 2000)
  }

  const handlePreview = () => {
    // TODO: Implement file preview logic
    setShowPreview(true)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Upload de documents</h1>
        <Button onClick={handleUpload} disabled={isProcessing}>
          {isProcessing ? "En cours..." : "Uploader"}
        </Button>
      </div>

      <Tabs defaultValue="files" className="space-y-4">
        <Tabs.List className="grid w-full grid-cols-4">
          <Tabs.Trigger value="files">Fichiers</Tabs.Trigger>
          <Tabs.Trigger value="folders">Dossiers</Tabs.Trigger>
          <Tabs.Trigger value="history">Historique</Tabs.Trigger>
          <Tabs.Trigger value="settings">Paramètres</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="files">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sélection des fichiers</CardTitle>
                <CardDescription>
                  Sélectionnez les fichiers à uploader
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 flex flex-col items-center justify-center space-y-2">
                    <Button variant="outline" asChild>
                      <label htmlFor="file-upload">
                        <span>Choisir des fichiers</span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileSelect}
                        />
                      </label>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      ou glissez-déposez ici
                    </p>
                  </div>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium">Fichiers sélectionnés</h3>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{file.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedFiles(
                                  selectedFiles.filter((_, i) => i !== index)
                                )
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détails du document</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Projet</Label>
                    <Select
                      value={selectedProject}
                      onValueChange={setSelectedProject}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Sélectionner un projet" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="">Aucun</Select.Item>
                        <Select.Item value="1">Route A12</Select.Item>
                        <Select.Item value="2">Pont du Rhône</Select.Item>
                        <Select.Item value="3">Tunnel A34</Select.Item>
                      </Select.Content>
                    </Select>
                  </div>
                  <div>
                    <Label>Type de document</Label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Sélectionner un type" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="">Aucun</Select.Item>
                        <Select.Item value="plan">Plan</Select.Item>
                        <Select.Item value="rapport">Rapport</Select.Item>
                        <Select.Item value="photo">Photo</Select.Item>
                        <Select.Item value="video">Vidéo</Select.Item>
                      </Select.Content>
                    </Select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      placeholder="Description du document..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="public"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                    <Label htmlFor="public">Document public</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prévisualisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    disabled={!selectedFiles.length}
                  >
                    Prévisualiser
                  </Button>
                  {showPreview && (
                    <div className="space-y-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index}>
                          <h4 className="font-medium">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {file.size.toLocaleString()} bytes
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="folders">
          <Card>
            <CardHeader>
              <CardTitle>Sélection de dossiers</CardTitle>
              <CardDescription>
                Sélectionnez les dossiers à uploader
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Folder className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4 flex flex-col items-center justify-center space-y-2">
                  <Button variant="outline">Sélectionner un dossier</Button>
                  <p className="text-sm text-muted-foreground">
                    ou glissez-déposez ici
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* TODO: Add upload history */}
                <div className="flex items-center justify-center text-muted-foreground">
                  Aucun historique d'upload
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox id="compress" />
                  <Label htmlFor="compress">
                    Compresser les fichiers avant l'upload
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="notify" />
                  <Label htmlFor="notify">
                    Recevoir une notification à la fin de l'upload
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="backup" />
                  <Label htmlFor="backup">
                    Créer une copie de sauvegarde
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs.Content>
      </Tabs>
    </div>
  )
}
