# Caltria - Automatización de Procesos

Landing page profesional para Caltria, una empresa que automatiza procesos para otras empresas.

## Características

### Diseño Limpio y Profesional
- Sin gradientes ni efectos glassmorphism
- Fondo negro sólido (#0a0a0a)
- Tipografía IBM Plex Sans
- Line-height 1.6 para mejor legibilidad
- Espaciado vertical consistente

### Copy Real y Directo
- Sin palabras como "empower", "unleash", "revolutionize"
- Sin emojis
- Lenguaje natural y conversacional
- Explicaciones concretas de servicios

### Secciones

1. **Hero**: Propuesta de valor clara
2. **Resultados**: 3 casos reales con números concretos
3. **Servicios**: 6 servicios explicados de forma simple
4. **Empresas**: Panel de empresas asociadas
5. **Contacto**: Formulario de 5 pasos con ubicación
6. **Footer**: Información de fundadores y contacto

### Formulario de Contacto

**5 pasos:**
1. Información de la empresa
2. Qué quieren automatizar (no "qué servicios necesitan")
3. Situación actual y timeline
4. Presupuesto estimado
5. Datos de contacto + ubicación (Argentina, barrios, etc.)

**Envío:** Los datos se envían directamente a `theotrosman@gmail.com` usando FormSubmit.co

### Fundadores

- **Theo Trosman**: [LinkedIn](https://www.linkedin.com/in/theotrosman/)
- **Sebastián Calviño**: [LinkedIn](https://www.linkedin.com/in/sebastián-calviño-99073b302/)

## Estructura de Archivos

```
caltria/
├── index.html                    # Página principal
├── css/
│   ├── reset.css                # Reset de estilos
│   ├── variables.css            # Variables CSS
│   ├── animations.css           # Animaciones básicas
│   ├── layout-clean.css         # Estilos principales limpios
│   └── contact-form-clean.css   # Estilos del formulario
├── js/
│   ├── scroll-clean.js          # Efectos de scroll
│   └── contact-form-clean.js    # Lógica del formulario
└── assets/                      # Carpeta para imágenes
```

## Cómo Usar

1. Abrí `index.html` en tu navegador
2. No necesita servidor, funciona directo
3. El formulario envía emails automáticamente

## Tipografía

- **Fuente**: IBM Plex Sans (Google Fonts)
- **Line-height**: 1.6 para texto de cuerpo
- **Tamaños**: Escala consistente de 0.875rem a 4rem

## Colores

```css
--color-bg:         #0a0a0a  /* Fondo negro */
--color-surface:    #1a1a1a  /* Tarjetas */
--color-primary:    #ff006e  /* Rosa */
--color-text:       #ffffff  /* Texto principal */
--color-text-muted: #a0a0a0  /* Texto secundario */
```

## Formulario de Contacto

El formulario usa **FormSubmit.co** (servicio gratuito):
- Email destino: `theotrosman@gmail.com`
- Sin backend necesario
- Funciona desde el frontend
- Incluye campo de ubicación

### Primera vez usando FormSubmit

1. Enviá un formulario de prueba
2. Revisá el email de theotrosman@gmail.com
3. Confirmá el email de FormSubmit (solo la primera vez)
4. A partir de ahí, todos los formularios llegarán automáticamente

## Responsive

- Desktop: 1200px+ (experiencia completa)
- Tablet: 768px - 1199px (adaptado)
- Mobile: < 768px (optimizado)

## Deploy

### Netlify (Recomendado)
```bash
netlify deploy --prod
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
1. Subí el proyecto a GitHub
2. Activá GitHub Pages en Settings
3. Listo

## Contacto

**Email**: theotrosman@gmail.com  
**LinkedIn Theo**: https://www.linkedin.com/in/theotrosman/  
**LinkedIn Sebastián**: https://www.linkedin.com/in/sebastián-calviño-99073b302/

---

2024 Caltria
