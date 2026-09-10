# Parking - Sistema de gestion de parqueaderos

Proyecto academico completo con Spring Boot + MySQL + React.

## Credenciales de prueba
- Correo: admin@parking.com
- Contrasena: admin123

## Modulos disponibles
- Registro de cuenta nueva
- Login
- Dashboard con KPIs y graficas
- Parqueaderos (ver y editar info)
- Espacios (crear, cambiar estado, eliminar)
- Reservaciones (crear y cancelar)
- Vehiculos (registrar entrada y salida con cobro automatico)
- Tarifas (editar valor por hora)
- Reportes (graficas e indicadores)
- Usuarios (crear y eliminar)
- Configuracion (ajustes del sistema)

## Requisitos
- Java 17+
- Maven
- MySQL 8
- Node.js 18+

## Pasos para correrlo

### 1. Base de datos
Ajusta usuario y contrasena en:
  backend/src/main/resources/application.properties
  (por defecto usa root / root)

La base de datos parking_db se crea automaticamente.

### 2. Backend
  cd backend
  mvn spring-boot:run

El backend queda en http://localhost:8080

### 3. Frontend
  cd frontend
  npm install
  npm run dev

El frontend queda en http://localhost:5173
# parking-full
# parking-full
# parking-full
