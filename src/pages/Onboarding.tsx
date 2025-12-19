import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bot, 
  ArrowRight, 
  Store, 
  ShoppingBag, 
  Briefcase,
  Check,
  Sparkles
} from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";

const industries = [
  { value: "direct-sales", label: "🤝 Venta Directa y Multinivel" },
  { value: "finance", label: "💰 Finanzas y Seguros" },
  { value: "marketing", label: "📢 Marketing y Publicidad" },
  { value: "real-estate", label: "🏡 Bienes Inmuebles" },
  { value: "electronics", label: "📱 Electrónica" },
  { value: "startups", label: "🚀 Emprendimientos" },
  { value: "logistics", label: "🚚 Logística" },
  { value: "commerce", label: "🛒 Comercio" },
  { value: "education", label: "🎓 Educación" },
  { value: "consulting", label: "🧑‍💼 Consultoría" },
  { value: "health", label: "💊 Salud" },
  { value: "tech", label: "💻 Tecnología" },
  { value: "fashion", label: "👗 Moda" },
  { value: "hospitality", label: "🏨 Turismo y Hospitalidad" },
];

const adSpendOptions = [
  { value: "0-300", label: "0 – 300 USD" },
  { value: "300-1000", label: "300 – 1,000 USD" },
  { value: "1000-2500", label: "1,000 – 2,500 USD" },
  { value: "2500+", label: "Más de 2,500 USD" },
];

const teamSizeOptions = [
  { value: "1-2", label: "1 – 2 personas" },
  { value: "3-5", label: "3 – 5 personas" },
  { value: "6-10", label: "6 – 10 personas" },
  { value: "11-25", label: "11 – 25 personas" },
  { value: "25+", label: "25+ personas" },
];

const problemOptions = [
  { value: "inventory", label: "Tener mi inventario en WhatsApp y generar pedidos" },
  { value: "integration", label: "Conectar mi WhatsApp con otros sistemas (CRM, ERP)" },
  { value: "team", label: "Conectar a mi equipo a un solo número de WhatsApp" },
  { value: "automation", label: "Automatizar mi negocio con IA" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { data, updateData, setComplete, currentStep, setCurrentStep } = useOnboarding();
  const [showWelcome, setShowWelcome] = useState(true);

  const steps = [
    {
      id: "business-name",
      question: "¿Cuál es el nombre de tu negocio?",
      type: "input" as const,
      field: "businessName" as const,
    },
    {
      id: "business-type",
      question: "¿Qué vendes?",
      type: "options" as const,
      field: "businessType" as const,
      options: [
        { value: "services", label: "Vendo servicios", icon: Briefcase },
        { value: "products", label: "Vendo productos", icon: ShoppingBag },
      ],
    },
    {
      id: "ad-spend",
      question: "¿Cuánto inviertes al mes en publicidad (Meta, Google, TikTok)?",
      type: "options" as const,
      field: "monthlyAdSpend" as const,
      options: adSpendOptions,
    },
    {
      id: "industry",
      question: "¿A qué industria pertenece tu empresa?",
      type: "grid" as const,
      field: "industry" as const,
      options: industries,
    },
    {
      id: "team-size",
      question: "¿Cuántas personas atienden clientes por WhatsApp actualmente?",
      type: "options" as const,
      field: "teamSize" as const,
      options: teamSizeOptions,
    },
    {
      id: "main-problem",
      question: "¿Qué problema deseas resolver con Merchify?",
      type: "options" as const,
      field: "mainProblem" as const,
      options: problemOptions,
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setComplete(true);
      navigate("/dashboard");
    }
  };

  const canProceed = () => {
    if (!currentStepData) return false;
    const value = data[currentStepData.field];
    return value && value.length > 0;
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                👋 Te damos la bienvenida a Merchify
              </h1>
              
              <p className="text-muted-foreground mb-6">
                Automatiza tus ventas y atención con IA 🚀
              </p>
              
              <div className="space-y-3 text-left mb-8">
                {[
                  "Conecta tus canales fácilmente",
                  "Vende con IA por WhatsApp",
                  "Automatiza tu atención al cliente",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <Button
                variant="hero"
                size="lg"
                onClick={() => setShowWelcome(false)}
                className="w-full"
              >
                Comenzar
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Store className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Configuración</span>
                </div>
                
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {currentStepData.question}
                </h2>

                {currentStepData.type === "input" && (
                  <Input
                    value={data[currentStepData.field]}
                    onChange={(e) => updateData(currentStepData.field, e.target.value)}
                    placeholder="Escribe aquí..."
                    className="text-lg h-14"
                    autoFocus
                  />
                )}

                {currentStepData.type === "options" && (
                  <div className="space-y-3">
                    {currentStepData.options?.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateData(currentStepData.field, option.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                          data[currentStepData.field] === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-accent"
                        }`}
                      >
                        {"icon" in option && option.icon && (
                          <option.icon className="w-5 h-5 text-primary" />
                        )}
                        <span className="font-medium text-foreground">{option.label}</span>
                        {data[currentStepData.field] === option.value && (
                          <Check className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {currentStepData.type === "grid" && (
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {currentStepData.options?.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateData(currentStepData.field, option.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          data[currentStepData.field] === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-accent"
                        }`}
                      >
                        <span className="font-medium text-foreground text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="hero"
                    onClick={handleNext}
                    disabled={!canProceed()}
                  >
                    {currentStep === steps.length - 1 ? (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Finalizar
                      </>
                    ) : (
                      <>
                        Siguiente
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
