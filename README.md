# Dashboard Backend (NestJS + Aerospike)

[![NestJS](https://img.shields.io/badge/NestJS-11.0.8-red)](https://nestjs.com/)
[![Aerospike](https://img.shields.io/badge/Aerospike-6.0.2-orange)](https://www.aerospike.com/)

Backend para la gestión de productos mediante una API RESTful, utilizando NestJS y Aerospike como base de datos.

## ✨ Características Principales

- **API RESTful**

  - Endpoints para operaciones CRUD de productos
  - Validación de datos con `class-validator`
  - Documentación de API con Swagger

- **Base de Datos Aerospike**

  - Conexión y manejo de datos en Aerospike
  - Índices automáticos y datos de ejemplo al iniciar

- **Versionado de API**
  - Soporte para múltiples versiones de API

## 🛠 Stack Tecnológico

| Tecnología | Uso                      | Versión |
| ---------- | ------------------------ | ------- |
| NestJS     | Framework principal      | 11.0.8  |
| Aerospike  | Base de datos            | 6.0.2   |
| TypeScript | Lenguaje de programación | 5.7.3   |
| Swagger    | Documentación de API     | 11.0.3  |
| Jest       | Testing                  | 29.7.0  |

## 📂 Estructura del Proyecto

```
src/
├─ app.controller.spec.ts
├─ app.controller.ts
├─ app.module.ts
├─ app.service.ts
├─ constants/
│  └─ dummy-products.constants.ts
├─ main.ts
├─ resources/
│  ├─ aerospike/
│  │  ├─ aerospike.module.ts
│  │  ├─ aerospike.service.spec.ts
│  │  └─ aerospike.service.ts
│  └─ product/
│     ├─ dto/
│     │  ├─ create-product.dto.ts
│     │  ├─ get-product.dto.ts
│     │  ├─ response.dto.ts
│     │  └─ update-product.dto.ts
│     ├─ entities/
│     │  └─ product.entity.ts
│     ├─ product.controller.spec.ts
│     ├─ product.controller.ts
│     ├─ product.module.ts
│     └─ product.service.ts
├─ swagger/
│  └─ index.ts
test/
├─ app.e2e-spec.ts
└─ jest-e2e.json
```

## 🚀 Instalación

1. Clonar repositorio:

   ```bash
   git clone https://github.com/hsvchcl/blackboard-backend.git
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Variables de entorno (crear `.env`):

   ```env
   PORT=3010
   ```

4. Iniciar servidor de desarrollo:
   ```bash
   npm run start:dev
   ```

## 📌 Scripts Disponibles

| Comando             | Descripción                           |
| ------------------- | ------------------------------------- |
| `npm run start`     | Inicia el servidor en modo producción |
| `npm run start:dev` | Inicia el servidor en modo desarrollo |
| `npm run build`     | Compila el proyecto                   |
| `npm run lint`      | Ejecuta linter (ESLint)               |
| `npm run test`      | Ejecuta pruebas unitarias             |
| `npm run test:e2e`  | Ejecuta pruebas end-to-end            |

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Add nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
