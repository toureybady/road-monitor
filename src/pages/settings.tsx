import { useState } from "react"
import {
  Settings,
  User,
  Globe,
  Map,
  Clock,
  AlertCircle,
  Info,
  Mail,
  Lock,
  Sun,
  Moon,
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
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Tabs } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("fr")
  const [timezone, setTimezone] = useState("Europe/Paris")
  const [showNotifications, setShowNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [showMap, setShowMap] = useState(true)
  const [showAlerts, setShowAlerts] = useState(true)
  const [showReports, setShowReports] = useState(true)

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving settings:", {
      isDarkMode,
      language,
      timezone,
      showNotifications,
      emailNotifications,
      showMap,
      showAlerts,
      showReports,
    })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <Tabs.List className="grid w-full grid-cols-4">
          <Tabs.Trigger value="general">Général</Tabs.Trigger>
          <Tabs.Trigger value="security">Sécurité</Tabs.Trigger>
          <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
          <Tabs.Trigger value="appearance">Apparence</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Gérez vos informations de profil et préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Nom complet</Label>
                      <Input placeholder="Votre nom complet" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Email</Label>
                      <Input placeholder="votre@email.com" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Langue</Label>
                      <Select
                        value={language}
                        onValueChange={setLanguage}
                      >
                        <Select.Trigger>
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="fr">Français</Select.Item>
                          <Select.Item value="en">English</Select.Item>
                          <Select.Item value="es">Español</Select.Item>
                        </Select.Content>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Fuseau horaire</Label>
                      <Select
                        value={timezone}
                        onValueChange={setTimezone}
                      >
                        <Select.Trigger>
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="Europe/Paris">
                            Europe/Paris
                          </Select.Item>
                          <Select.Item value="UTC">UTC</Select.Item>
                          <Select.Item value="America/New_York">
                            America/New_York
                          </Select.Item>
                        </Select.Content>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Gérez vos paramètres de sécurité et confidentialité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Mot de passe</Label>
                      <Button variant="outline">Modifier le mot de passe</Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Authentification à deux facteurs</Label>
                      <Switch
                        id="2fa"
                        checked={false}
                        onCheckedChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Historique des connexions</Label>
                      <Button variant="outline">Voir l'historique</Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Map className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Localisation</Label>
                      <Switch
                        id="location"
                        checked={false}
                        onCheckedChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configurez vos préférences de notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Notifications</Label>
                      <Switch
                        id="notifications"
                        checked={showNotifications}
                        onCheckedChange={setShowNotifications}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Notifications par email</Label>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types de notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Map className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Notifications de carte</Label>
                      <Switch
                        id="map-notifications"
                        checked={showMap}
                        onCheckedChange={setShowMap}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Alertes</Label>
                      <Switch
                        id="alerts"
                        checked={showAlerts}
                        onCheckedChange={setShowAlerts}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Rapports</Label>
                      <Switch
                        id="reports"
                        checked={showReports}
                        onCheckedChange={setShowReports}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        <Tabs.Content value="appearance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Sun className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Mode sombre</Label>
                      <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={setIsDarkMode}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label>Thème</Label>
                      <Select value="system" onValueChange={() => {}}>
                        <Select.Trigger>
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="system">Système</Select.Item>
                          <Select.Item value="light">Clair</Select.Item>
                          <Select.Item value="dark">Sombre</Select.Item>
                        </Select.Content>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Label>Mode compact</Label>
                    <Switch
                      id="compact-mode"
                      checked={false}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Label>Animations</Label>
                    <Switch
                      id="animations"
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>
      </Tabs>

      <div className="mt-8">
        <Separator className="my-4" />
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => {}}>Annuler</Button>
          <Button onClick={handleSave} className="ml-2">
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  )
}
