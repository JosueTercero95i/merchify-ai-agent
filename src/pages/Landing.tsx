import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Bot, 
  TrendingUp, 
  Clock, 
  Zap, 
  ShieldCheck,
  ArrowRight,
  Check
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Atención 24/7",
      description: "Tu agente IA responde consultas y atiende clientes las 24 horas, sin descanso."
    },
    {
      icon: Bot,
      title: "IA Conversacional",
      description: "Respuestas naturales y personalizadas que guían al cliente hasta la compra."
    },
    {
      icon: TrendingUp,
      title: "Cierre de Ventas",
      description: "Automatiza el proceso de venta completo, desde la consulta hasta el pedido."
    },
    {
      icon: Clock,
      title: "Seguimiento Automático",
      description: "Reactivación inteligente de leads que no completaron su compra."
    },
    {
      icon: Zap,
      title: "Integración Rápida",
      description: "Conecta tu WhatsApp Business en minutos y comienza a vender."
    },
    {
      icon: ShieldCheck,
      title: "Control Total",
      description: "Dashboard completo para gestionar productos, pedidos y conversaciones."
    }
  ];

  const benefits = [
    "Responde consultas automáticamente",
    "Recomienda productos personalizados",
    "Procesa pedidos sin intervención",
    "Seguimiento inteligente de leads",
    "Integración con WhatsApp Business",
    "Dashboard en tiempo real"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Merchify</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button variant="hero">Comenzar Gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Agente de Ventas con IA
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Vende{" "}
              <span className="text-gradient-primary">24/7</span>{" "}
              con un Agente IA
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Automatiza la atención al cliente, responde consultas, recomienda productos 
              y cierra ventas automáticamente por WhatsApp.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/auth?mode=register">
                <Button variant="hero" size="xl">
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl">
                  Ver Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-primary-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Check className="w-5 h-5" />
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Todo lo que necesitas para vender más
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un agente inteligente que trabaja por ti, atendiendo clientes y cerrando ventas automáticamente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para automatizar tus ventas?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Configura tu agente IA en minutos y comienza a vender 24/7 por WhatsApp.
            </p>
            <Link to="/auth?mode=register">
              <Button variant="hero" size="xl">
                Empezar Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Merchify</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Merchify. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
