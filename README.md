# Caltria - Landing Page Premium

Landing page moderna y premium para empresa de automatizaciones personalizadas. Diseño inspirado en Apple, Stripe y Vercel con estética limpia y profesional.

## 🎨 Características

- **Diseño Premium**: Estética minimalista tipo Apple/Stripe/Vercel
- **Fondo 8-bit Sutil**: GIF de ciudad al atardecer integrado elegantemente
- **Animaciones Fluidas**: Microinteracciones y transiciones suaves
- **Scroll Storytelling**: Revelación progresiva de secciones
- **Experiencia de Carta**: Formulario innovador que simula escribir una carta física
- **100% Responsive**: Optimizado para todos los dispositivos
- **Performance**: Carga rápida y animaciones optimizadas

## 🚀 Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla (sin dependencias)
- Intersection Observer API para animaciones
- FormSubmit para envío de formularios

## 📁 Estructura

```
├── index.html              # Página principal
├── css/
│   ├── reset.css          # Reset de estilos
│   ├── variables.css      # Variables CSS (colores, tipografía, espaciado)
│   ├── layout.css         # Layout y componentes principales
│   ├── animations.css     # Animaciones y transiciones
│   └── letter-form.css    # Estilos de la experiencia de carta
├── js/
│   ├── scroll.js          # Scroll progress y reveal animations
│   ├── animations.js      # Microinteracciones y efectos
│   └── letter-form.js     # Lógica de la experiencia de carta
└── 8f444a91900373.5e3d63788609e.gif  # Fondo 8-bit
```

## 🎯 Secciones

1. **Hero**: Presentación principal con estadísticas clave
2. **Casos de Éxito**: Resultados medibles de proyectos reales
3. **Servicios**: 6 servicios principales numerados
4. **Proceso**: 4 pasos del flujo de trabajo
5. **Contacto**: Experiencia innovadora de carta física
6. **Footer**: Información de contacto y fundadores

## ✉️ Experiencia de Carta

El formulario de contacto es una experiencia completamente innovadora:

- **Sobre animado**: Se abre automáticamente al hacer scroll
- **Carta interactiva**: Los campos están embebidos en el texto de una carta
- **Inputs inline**: No hay formularios tradicionales, todo fluye naturalmente
- **Animación de envío**: La carta se desliza dentro del sobre, va al buzón
- **Feedback elegante**: Mensaje de éxito después de la animación completa

### Flujo de la experiencia:

1. Usuario llega a la sección de contacto
2. El sobre se abre automáticamente
3. La carta se desliza hacia afuera
4. Usuario completa los campos inline
5. Al enviar, la carta vuelve al sobre
6. El sobre se cierra y aparece un buzón
7. El sobre entra en el buzón
8. Mensaje de éxito

## 🎨 Paleta de Colores

- **Background**: `#0a0a0a` (Negro profundo)
- **Surface**: `#171717` (Gris oscuro)
- **Primary**: `#ff006e` (Rosa vibrante)
- **Text**: `#ffffff` (Blanco)
- **Text Muted**: `#a1a1a1` (Gris medio)
- **Paper**: `#fafafa` (Blanco papel)

## ⚡ Animaciones

- **Fade Up**: Aparición suave desde abajo
- **Reveal on Scroll**: Elementos se revelan al hacer scroll
- **Parallax**: Efecto parallax sutil en el hero
- **Hover Effects**: Microinteracciones en cards y botones
- **Progress Bar**: Barra de progreso del scroll
- **Letter Animation**: Secuencia completa de envío de carta

## 📱 Responsive

- **Desktop**: 1200px+ (experiencia completa)
- **Tablet**: 640px - 1199px (adaptado)
- **Mobile**: <640px (optimizado para móvil)

## 🔧 Configuración

### Formulario de Contacto

El formulario usa FormSubmit.co. Para cambiar el email de destino:

1. Abre `js/letter-form.js`
2. Busca la línea: `const formSubmitURL = 'https://formsubmit.co/caltriasupport@gmail.com';`
3. Reemplaza el email con el tuyo

### Personalización de Colores

Edita `css/variables.css` para cambiar la paleta de colores:

```css
--color-primary: #ff006e;  /* Color principal */
--color-bg: #0a0a0a;       /* Fondo */
```

## 🌐 Deploy

### Netlify / Vercel

1. Conecta tu repositorio
2. Deploy automático (sin configuración adicional)

### GitHub Pages

1. Ve a Settings > Pages
2. Selecciona la rama main
3. Guarda y espera el deploy

## 📄 Licencia

Proyecto privado - Caltria 2024

## 👥 Fundadores

- [Theo Trosman](https://www.linkedin.com/in/theotrosman/)
- [Sebastián Calviño](https://www.linkedin.com/in/sebastián-calviño-99073b302/)

---

**Contacto**: caltriasupport@gmail.com
