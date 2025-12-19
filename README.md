# 🤖 Merchify - Agente IA de Ventas

**Merchify** es una plataforma web que automatiza las ventas mediante un agente de inteligencia artificial que atiende clientes 24/7 por WhatsApp Business. Permite gestionar productos, conversaciones, pedidos y configurar tu negocio desde un dashboard intuitivo.

## ✨ Características Principales

- 🤖 **Agente IA Conversacional**: Responde consultas y cierra ventas automáticamente
- 💬 **Gestión de Conversaciones**: Visualiza y gestiona todas las conversaciones de WhatsApp
- 📦 **Catálogo de Productos**: CRUD completo para gestionar tu inventario
- 🛒 **Gestión de Pedidos**: Seguimiento de leads, negociaciones y ventas confirmadas
- ⚙️ **Configuración Flexible**: Personaliza horarios, métodos de pago, envíos y más
- 📊 **Dashboard en Tiempo Real**: Estadísticas y métricas de tu negocio
- 🎨 **UI Moderna**: Interfaz intuitiva construida con shadcn/ui y Tailwind CSS

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3.1** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite 5.4.19** - Build tool y dev server
- **React Router DOM 6.30.1** - Enrutamiento
- **Tailwind CSS 3.4.17** - Estilos
- **shadcn/ui** - Componentes UI basados en Radix UI
- **Framer Motion 12.23.26** - Animaciones
- **TanStack Query 5.83.0** - Gestión de estado del servidor

### Backend/Base de Datos
- **Supabase** - Backend as a Service (configurado, pendiente implementación)

### UI/UX
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast
- **Recharts** - Gráficos y visualizaciones

## 📁 Estructura del Proyecto

```
merchify-ai-agent/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Componentes del dashboard
│   │   │   ├── ChatsTab.tsx       # Gestión de conversaciones
│   │   │   ├── ProductsTab.tsx    # Gestión de productos
│   │   │   ├── OrdersTab.tsx      # Gestión de pedidos/ventas
│   │   │   └── SettingsTab.tsx    # Configuración del negocio
│   │   └── ui/                 # Componentes UI reutilizables (shadcn)
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Autenticación
│   │   └── OnboardingContext.tsx   # Flujo de onboarding
│   ├── pages/
│   │   ├── Landing.tsx             # Página de inicio
│   │   ├── Auth.tsx                # Login/Registro
│   │   ├── Onboarding.tsx          # Configuración inicial
│   │   ├── Dashboard.tsx            # Dashboard principal
│   │   └── NotFound.tsx             # Página 404
│   ├── integrations/
│   │   └── supabase/               # Cliente Supabase
│   ├── hooks/                      # Hooks personalizados
│   └── lib/                        # Utilidades
├── public/                         # Archivos estáticos
├── supabase/                       # Configuración de Supabase
└── package.json
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18+ (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- npm o yarn
- Cuenta de Supabase (para backend)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <YOUR_GIT_URL>
   cd merchify-ai-agent
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica_de_supabase
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en `http://localhost:8080`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo en puerto 8080

# Build
npm run build            # Build de producción
npm run build:dev        # Build en modo desarrollo

# Calidad de código
npm run lint             # Ejecuta ESLint

# Preview
npm run preview          # Preview del build de producción
```

## 🔐 Autenticación

Actualmente la autenticación está **simulada** usando localStorage. Para producción, se debe implementar la integración real con Supabase Auth.

### Estado Actual
- ✅ UI de login/registro completa
- ✅ Contexto de autenticación implementado
- ⚠️ Autenticación simulada (localStorage)
- ❌ Integración con Supabase Auth pendiente

## 📊 Estado del Proyecto

### ✅ Implementado

- [x] UI/UX completa y responsive
- [x] Navegación y routing
- [x] Componentes del dashboard (Chats, Productos, Pedidos, Configuración)
- [x] Contextos de autenticación y onboarding
- [x] Datos mock para desarrollo
- [x] Animaciones y transiciones
- [x] Sistema de notificaciones

### 🚧 Pendiente/En Desarrollo

- [ ] Integración real con Supabase
- [ ] Autenticación real (actualmente simulada)
- [ ] Backend API para operaciones CRUD
- [ ] Integración con WhatsApp Business API
- [ ] Implementación del agente de IA
- [ ] Persistencia de datos en base de datos
- [ ] Manejo de errores robusto
- [ ] Tests unitarios e integración
- [ ] Documentación de API

## 🎯 Próximos Pasos

1. **Backend**
   - Configurar tablas en Supabase (usuarios, productos, pedidos, conversaciones)
   - Implementar autenticación real con Supabase Auth
   - Crear funciones serverless para operaciones CRUD

2. **Integración WhatsApp**
   - Configurar WhatsApp Business API
   - Implementar webhook para recibir mensajes
   - Conectar con el agente de IA

3. **Agente de IA**
   - Integrar modelo de lenguaje (OpenAI, Anthropic, etc.)
   - Implementar lógica de conversación
   - Sistema de recomendación de productos
   - Cierre automático de ventas

4. **Mejoras**
   - Sistema de notificaciones en tiempo real
   - Analytics y reportes avanzados
   - Exportación de datos
   - Multi-idioma

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 📞 Soporte

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ usando React, TypeScript y Vite**
