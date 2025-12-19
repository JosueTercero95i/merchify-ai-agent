import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Store, 
  Clock, 
  CreditCard, 
  Truck, 
  Globe, 
  Link as LinkIcon,
  Save,
  Bot
} from "lucide-react";

interface StoreSettings {
  storeName: string;
  storeDescription: string;
  workingHours: string;
  deliveryInfo: string;
  paymentMethods: string;
  catalogSummary: string;
  whatsappWebhookUrl: string;
  timezone: string;
}

const SettingsTab = () => {
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: "Mi Tienda Online",
    storeDescription: "Tienda de productos variados con envíos a todo el país.",
    workingHours: "Lunes a Viernes: 9:00 AM - 6:00 PM, Sábados: 9:00 AM - 1:00 PM",
    deliveryInfo: "Envío gratis en compras mayores a $50. Entrega en 2-3 días hábiles.",
    paymentMethods: "Transferencia bancaria, Yape, Plin, Pago contra entrega",
    catalogSummary: "Vendemos ropa, calzado, accesorios y electrónica.",
    whatsappWebhookUrl: "",
    timezone: "America/Lima",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Configuración guardada correctamente");
  };

  const handleChange = (field: keyof StoreSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Configuración</h1>
        <p className="text-muted-foreground">Configura los datos de tu negocio para el agente IA</p>
      </div>

      <div className="space-y-6">
        {/* Store Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Información del Negocio</CardTitle>
                <CardDescription>Datos básicos de tu tienda</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Nombre del negocio</Label>
              <Input
                id="storeName"
                value={settings.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
                placeholder="Mi Tienda Online"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeDescription">Descripción</Label>
              <Textarea
                id="storeDescription"
                value={settings.storeDescription}
                onChange={(e) => handleChange("storeDescription", e.target.value)}
                placeholder="Describe tu negocio..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catalogSummary">Resumen del catálogo</Label>
              <Textarea
                id="catalogSummary"
                value={settings.catalogSummary}
                onChange={(e) => handleChange("catalogSummary", e.target.value)}
                placeholder="¿Qué tipo de productos vendes?"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Horarios de Atención</CardTitle>
                <CardDescription>Configura tus horarios de trabajo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workingHours">Horarios</Label>
              <Textarea
                id="workingHours"
                value={settings.workingHours}
                onChange={(e) => handleChange("workingHours", e.target.value)}
                placeholder="Lunes a Viernes: 9:00 AM - 6:00 PM"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Zona horaria</Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
                placeholder="America/Lima"
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Envíos</CardTitle>
                  <CardDescription>Información de delivery</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="deliveryInfo">Políticas de entrega</Label>
                <Textarea
                  id="deliveryInfo"
                  value={settings.deliveryInfo}
                  onChange={(e) => handleChange("deliveryInfo", e.target.value)}
                  placeholder="Describe tus opciones de envío..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Pagos</CardTitle>
                  <CardDescription>Métodos de pago</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="paymentMethods">Medios de pago aceptados</Label>
                <Textarea
                  id="paymentMethods"
                  value={settings.paymentMethods}
                  onChange={(e) => handleChange("paymentMethods", e.target.value)}
                  placeholder="Transferencia, Yape, Plin..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Webhook */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Integración WhatsApp</CardTitle>
                <CardDescription>Configura el webhook para recibir mensajes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL del Webhook</Label>
              <Input
                id="webhookUrl"
                value={settings.whatsappWebhookUrl}
                onChange={(e) => handleChange("whatsappWebhookUrl", e.target.value)}
                placeholder="https://tu-webhook.com/whatsapp"
              />
              <p className="text-sm text-muted-foreground">
                Esta URL recibirá los mensajes entrantes de WhatsApp
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Info */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Agente MIA</CardTitle>
                <CardDescription>Tu asistente virtual de ventas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              MIA usará toda esta información para responder consultas, recomendar productos y cerrar ventas automáticamente. Asegúrate de que los datos sean precisos y actualizados.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-success font-medium">Agente activo y listo para vender</span>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              "Guardando..."
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Configuración
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
