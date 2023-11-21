wildle/
|-- client/
|   |-- src/
|   |   |-- actions/
|   |   |   |-- authActions.ts
|   |   |   |-- types.ts
|   |   |-- components/
|   |   |   |-- ... 
|   |   |-- pages/
|   |   |   |-- Home.tsx
|   |   |   |-- Rankings.tsx
|   |   |   |-- Login.tsx
|   |   |   |-- Register.tsx
|   |   |-- reducers/
|   |   |   |-- authReducer.ts
|   |   |   |-- index.ts
|   |   |-- services/
|   |   |   |-- authService.ts
|   |   |-- App.tsx
|   |   |-- index.tsx
|-- server/
|   |-- src/
|   |   |-- controllers/
|   |   |   |-- authController.ts
|   |   |-- models/
|   |   |   |-- User.ts
|   |   |-- routes/
|   |   |   |-- authRoutes.ts
|   |   |-- utils/
|   |   |   |-- authMiddleware.ts
|   |   |-- database.ts
|   |   |-- server.ts
|-- .env
|-- package.json
|-- tsconfig.json

Descripción de carpetas y archivos:

client/: Carpeta que contiene el código del cliente.
    src/: Carpeta principal del código fuente del cliente.
        actions/: Contiene acciones Redux.
            authActions.ts: Acciones específicas de autenticación.
            types.ts: Tipos de acciones.
        components/: Contiene componentes React reutilizables.
        pages/: Contiene componentes React para páginas específicas.
            Home.tsx: Página principal.
            Rankings.tsx: Página de clasificaciones.
            Login.tsx: Página de inicio de sesión.
            Register.tsx: Página de registro.
        reducers/: Contiene reductores Redux.
            authReducer.ts: Reductor específico de autenticación.
            index.ts: Combinación de reductores.
        services/: Contiene servicios para realizar solicitudes al servidor.
            authService.ts: Servicio de autenticación.
        App.tsx: Componente principal de la aplicación React.
        index.tsx: Archivo principal que inicia la aplicación.

server/: Carpeta que contiene el código del servidor.
    src/: Carpeta principal del código fuente del servidor.
        controllers/: Contiene controladores para las rutas.
            authController.ts: Controlador de autenticación.
        models/: Contiene modelos de datos para la base de datos.
            User.ts: Modelo de usuario.
        routes/: Contiene rutas del servidor.
            authRoutes.ts: Rutas relacionadas con la autenticación.
        utils/: Contiene utilidades, como middleware.
            authMiddleware.ts: Middleware de autenticación.
        database.ts: Configuración de conexión a la base de datos.
        server.ts: Archivo principal del servidor.

.env: Archivo de configuración para variables de entorno.
package.json: Archivo de configuración de npm que contiene las dependencias y scripts.
tsconfig.json: Archivo de configuración de TypeScript.
