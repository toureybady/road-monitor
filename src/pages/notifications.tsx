import { useState } from "react"
import {
  Bell,
  Check,
  X,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  Info,
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
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nouveau projet en cours",
      description: "Le projet 'Route A12' est maintenant en cours",
      type: "project",
      date: new Date("2025-06-01"),
      read: false,
    },
    {
      id: 2,
      title: "Alerte de retard",
      description: "Retard sur le projet 'Pont du Rhône'",
      type: "alert",
      date: new Date("2025-06-02"),
      read: false,
    },
    {
      id: 3,
      title: "Nouvelle documentation",
      description: "Nouveau rapport disponible pour le projet 'Tunnel A34'",
      type: "document",
      date: new Date("2025-06-03"),
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button variant="outline" onClick={markAllAsRead}>
          Marquer tout comme lu
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="unread">Non lues</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="projects">Projets</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {notification.read ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Bell className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        {notification.read ? "Lu" : "Marquer comme lu"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {notification.date.toLocaleDateString()} à {notification.date.toLocaleTimeString()}
                    </span>
                    <Badge variant="outline">
                      {notification.type.charAt(0).toUpperCase() +
                        notification.type.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-yellow-500" />
                        <div>
                          <h3 className="font-medium">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marquer comme lu
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {notification.date.toLocaleDateString()} à {notification.date.toLocaleTimeString()}
                      </span>
                      <Badge variant="outline">
                        {notification.type.charAt(0).toUpperCase() +
                          notification.type.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-4">
            {notifications
              .filter((n) => n.type === "alert")
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <h3 className="font-medium">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          {notification.read ? "Lu" : "Marquer comme lu"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {notification.date.toLocaleDateString()} à {notification.date.toLocaleTimeString()}
                      </span>
                      <Badge variant="outline">Alerte</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-4">
            {notifications
              .filter((n) => n.type === "project")
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          {notification.read ? "Lu" : "Marquer comme lu"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {notification.date.toLocaleDateString()} à {notification.date.toLocaleTimeString()}
                      </span>
                      <Badge variant="outline">Projet</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Paramètres des notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox id="email" />
            <Label htmlFor="email">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Recevoir les notifications par email</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="priority" />
            <Label htmlFor="priority">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>Notifications prioritaires uniquement</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="daily" />
            <Label htmlFor="daily">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Résumé quotidien</span>
              </div>
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
