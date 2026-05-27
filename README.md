# Salón Belleza

Landing page creada para un salón de belleza con un enfoque visual elegante y una arquitectura basada en Atomic Design y Clean Architecture.

## Estructura principal

- `src/pages/LandingPage.jsx` - Composición de la página principal.
- `src/components/atoms` - componentes básicos y reutilizables.
- `src/components/molecules` - bloques formados por átomos, como el Hero y tarjetas de servicios.
- `src/components/organisms` - secciones completas de la página como servicios, testimonios y contacto.
- `src/data/content.js` - contenido y textos separados de la presentación.

## Qué incluye la landing page

- Hero con llamada a la acción para reservar cita.
- Sección de servicios destacados.
- Valores del salón (atención personalizada, ambiente relajado, productos naturales).
- Testimonios de clientes.
- Sección de contacto con datos de reserva y llamada directa.
- Pie de página simple y estilizado.

## Futuras mejoras

- Agregar reserva en línea con formulario y validación.
- Incluir una galería de antes/después y portafolio de estilos.
- Añadir un FAQ o sección de preguntas frecuentes sobre tratamientos.
- Implementar un sistema de promociones y programa de fidelidad.
- Pasar el proyecto a TypeScript para mayor robustez en componentes.
- Agregar animaciones suaves con `framer-motion` para entradas y botones.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` para ver la landing page.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
