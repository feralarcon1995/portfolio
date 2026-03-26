# 🚀 Animaciones de Scroll con Lenis

Este proyecto ahora incluye animaciones de scroll fluidas y suaves usando **Lenis** y **Framer Motion**, similares a las que se ven en [deiv.dev](https://deiv.dev/).

## ✨ Características

- **Scroll suave**: Animaciones fluidas y naturales
- **Efectos parallax**: Diferentes velocidades de movimiento
- **Transformaciones suaves**: Con spring physics para mayor realismo
- **Performance optimizada**: Usando requestAnimationFrame
- **Responsive**: Funciona en todos los dispositivos

## 🛠️ Instalación

Las dependencias ya están instaladas:
- `lenis` - Para scroll suave
- `framer-motion` - Para animaciones

## 📖 Uso Básico

### 1. Hook useLenisScroll

```tsx
import { useLenisScroll } from '@/hooks/useLenisScroll';

const MyComponent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { elementProgressMotion } = useLenisScroll(sectionRef);

  // Crear transformaciones suaves
  const y = useTransform(elementProgressMotion, [0, 1], [0, -100]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <motion.div style={{ y: smoothY }}>
      Contenido animado
    </motion.div>
  );
};
```

### 2. Flujo de Animaciones

```tsx
// 1. Obtener el MotionValue del scroll
const { elementProgressMotion } = useLenisScroll(sectionRef);

// 2. Crear transformaciones
const transformY = useTransform(elementProgressMotion, [0, 1], [0, -200]);

// 3. Aplicar spring para suavizar
const smoothTransform = useSpring(transformY, { 
  stiffness: 60, 
  damping: 35 
});
```

## 🎯 Ejemplos de Animaciones

### Efecto Parallax Simple

```tsx
const backgroundY = useTransform(elementProgressMotion, [0, 1], [0, -200]);
const smoothBackgroundY = useSpring(backgroundY, { 
  stiffness: 50, 
  damping: 15 
});

<motion.div style={{ y: smoothBackgroundY }}>
  Elemento de fondo
</motion.div>
```

### Animación de Entrada/Salida

```tsx
const opacity = useTransform(elementProgressMotion, [0, 1], [0, 1]);
const scale = useTransform(elementProgressMotion, [0, 1], [0.8, 1.1]);

const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
const smoothScale = useSpring(scale, { stiffness: 90, damping: 25 });
```

### Movimiento en Múltiples Ejes

```tsx
const x = useTransform(elementProgressMotion, [0, 1], [-300, 300]);
const y = useTransform(elementProgressMotion, [0, 1], [-100, 100]);

const smoothX = useSpring(x, { stiffness: 60, damping: 20 });
const smoothY = useSpring(y, { stiffness: 80, damping: 25 });
```

## ⚙️ Configuración de Lenis

El scroll suave se configura en `SmoothScrollProvider`:

```tsx
new Lenis({
  duration: 1.8,                    // Duración de la animación
  easing: (t: number) => {          // Función de easing personalizada
    return t < 0.5 
      ? 2 * t * t 
      : -1 + (4 - 2 * t) * t;
  }
});
```

## 🎨 Consejos de Diseño

### 1. **Velocidades Diferentes**
- Elementos de fondo: `stiffness: 30-50, damping: 10-15`
- Contenido principal: `stiffness: 70-90, damping: 20-25`
- Elementos flotantes: `stiffness: 40-60, damping: 15-20`

### 2. **Rangos de Movimiento**
- Parallax sutil: `[0, -50]` o `[0, 50]`
- Parallax moderado: `[0, -100]` o `[0, 100]`
- Parallax dramático: `[0, -200]` o `[0, 200]`

### 3. **Transiciones Suaves**
- Usar `stiffness` alto (80-100) para movimientos rápidos
- Usar `damping` alto (25-35) para movimientos suaves
- Combinar ambos para el efecto perfecto

## 🔧 Componentes Actualizados

- ✅ **About**: Animaciones de título, imagen y texto
- ✅ **Hero**: Efectos de entrada y movimiento
- ✅ **Experience**: Transición fluida desde About
- ✅ **ParallaxSection**: Ejemplo de efectos parallax

## 🚀 Próximos Pasos

1. **Aplicar a otros componentes**: Projects, Contact
2. **Efectos avanzados**: Rotación 3D, distorsión, blur
3. **Animaciones de texto**: Reveal, typewriter, split
4. **Interacciones**: Hover effects, click animations

## 📱 Responsive

Las animaciones se adaptan automáticamente a diferentes tamaños de pantalla. Los valores de `stiffness` y `damping` pueden ajustarse según el dispositivo:

```tsx
const isMobile = window.innerWidth < 768;
const stiffness = isMobile ? 60 : 80;
const damping = isMobile ? 20 : 25;
```

## 🎯 Performance

- Las animaciones usan `transform` para mejor performance
- Lenis optimiza el scroll con `requestAnimationFrame`
- Framer Motion optimiza las re-renderizaciones
- Las transformaciones se calculan solo cuando es necesario

---

¡Disfruta creando animaciones fluidas y atractivas! 🎉
