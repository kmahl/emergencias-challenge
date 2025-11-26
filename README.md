# API RESTful - Agenda de Contactos

API RESTful para gestión de agenda de contactos con actividades, desarrollada con Node.js, TypeScript, Express y Prisma.

## 📁 Documentación Adicional

- **[Postman Collection](docs/Agenda_Contactos.postman_collection.json)** - Colección completa de pruebas
- **[Notas del Proyecto](docs/notas.md)** - Decisiones técnicas y notas adicionales

## 🚀 Características

- ✅ CRUD completo de contactos con teléfonos y direcciones
- ✅ Registro de actividades (llamadas, reuniones, emails)
- ✅ Búsqueda dinámica (?q= o parámetros específicos)
- ✅ Documentación con Swagger (`/api-docs`)
- ✅ Tests unitarios con Jest
- ✅ Arquitectura en capas (Repository + Service + Controller)
- ✅ Validación con Zod
- ✅ Docker y Docker Compose
- ✅ ESLint + Prettier

## 📋 Requisitos

- Node.js 22.x
- npm >= 10.0.0

## 🛠️ Instalación y Ejecución

```bash
# Clonar e instalar
npm install

# Configurar base de datos
npm run prisma:generate
npm run prisma:migrate

# Iniciar servidor (http://localhost:3000)
npm run dev
```

**Con Docker:**
```bash
docker-compose up -d
```

## 📖 API Endpoints

Documentación interactiva: **http://localhost:3000/api-docs**

### Contactos
```
POST   /api/persons          # Crear contacto
GET    /api/persons/search   # Búsqueda dinámica
PUT    /api/persons/:id      # Actualizar contacto
DELETE /api/persons/:id      # Eliminar contacto
```

**Búsqueda dinámica:**
- `?q=Juan` - Búsqueda general en nombre, apellido, email y teléfono
- `?email=juan@example.com` - Por email específico
- `?firstName=Juan&lastName=Pérez` - Por datos personales
- `?phone=555-1234&phoneType=mobile` - Por teléfono y tipo

### Actividades
```
POST   /api/activities       # Crear actividad
GET    /api/activities       # Buscar actividades por contacto/tipo
```

### Tipos de Teléfono
```
GET    /api/phone-types      # Listar tipos disponibles
```

## 🧪 Tests

```bash
npm test              # Ejecutar tests
npm run test:watch    # Modo watch
```

## 🏗️ Arquitectura

```
Repository Layer (Prisma) → Service Layer (Lógica) → Controller Layer (HTTP) → Routes
```

**Patrones aplicados:**
- Repository Pattern
- Dependency Injection
- Singleton (Logger, Database)
- DTO Pattern

## 📝 Scripts

```bash
npm run dev              # Desarrollo con hot reload
npm run build            # Compilar a JavaScript
npm start                # Producción
npm test                 # Tests con coverage
npm run lint             # Verificar código
npm run lint:fix         # Corregir código
npm run prisma:studio    # Abrir Prisma Studio
```

## 🐳 Docker

```bash
docker-compose up -d          # Iniciar
docker-compose logs -f        # Ver logs
docker-compose down           # Detener
```

## 👤 Autor

Carlos Vizcaya

## 📄 Licencia

ISC
