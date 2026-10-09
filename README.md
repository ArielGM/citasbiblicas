# Herramientas de proyección

Un único sitio estático para preparar contenido de proyección de una iglesia, sin cuentas ni servidor propio.

- [Citas Bíblicas](./citas-biblicas/): busca pasajes en español, los convierte en láminas y permite descargar PNG/PPTX o proyectar en vivo.
- [Proyecta Cantos](./proyecta-cantos/): divide una letra pegada en láminas de dos o tres líneas y permite descargar PNG/PPTX o proyectar en vivo.

La pantalla raíz abre Citas Bíblicas. Cada herramienta ofrece un selector superior para cambiar entre ambas y conserva su propia paleta de color.

## Estructura

```text
assets/backgrounds/   Fondos compartidos para ambas herramientas
shared/               Navegación común
citas-biblicas/       Herramienta de pasajes
proyecta-cantos/      Herramienta de letras
```

El proyecto es HTML, CSS y JavaScript estático: se puede publicar directamente con GitHub Pages.
