# Tu Referencia para Presentación

Web estática y responsiva para transformar una cita bíblica en láminas 16:9 listas para proyectar en vMix. Permite descargar todas las láminas en PNG o incluirlas en una presentación PPTX.

## Objetivo

Agilizar la preparación de pasajes bíblicos para la proyección en iglesias: se ingresa una referencia, se consulta el texto y se generan láminas centradas y legibles sin necesidad de un servidor propio.

## Componentes

- `index.html`: estructura de la interfaz y carga de las bibliotecas externas.
- `styles.css`: diseño responsivo, colores, tipografías y formato visual de las láminas.
- `app.js`: consulta bíblica, interpretación de referencias, agrupación de versículos, carrusel y exportaciones.
- `output.html`, `output.css` y `output.js`: salida limpia para presentar en una segunda pestaña o en pantalla completa.
- `assets/backgrounds/`: seis fondos WebP locales 1920 × 1080 para proyectar sin depender de permisos de imágenes externas.
- API bíblica: [Free Use Bible API](https://bible.helloao.org/docs/).
- `html2canvas`: convierte cada lámina en PNG.
- `PptxGenJS`: crea un archivo PPTX con una lámina por diapositiva.

## Uso

1. Abre `index.html` en un navegador con conexión a internet.
2. Espera la carga inicial: se consulta automáticamente Mateo 5:3–12 en RVG.
3. Escribe una referencia y presiona **Buscar**. El campo sugiere libros bíblicos mientras escribes.
4. Selecciona la versión bíblica y ajusta el diseño de la lámina si lo necesitas.
5. Revisa las láminas con las flechas del carrusel.
6. Descarga todas las imágenes con **Descargar (X PNG)** o crea una presentación con **Descargar PPTX (X diapos.)**.
7. Para presentar directamente, presiona **Presentar**. Se abrirá `output.html` con la lámina actual; usa las flechas del teclado o los controles discretos al mover el puntero. La cita permanece sincronizada con el generador mientras ambas ventanas están abiertas.
8. En Chrome o Edge para Windows, al presionar **Presentar** el navegador puede solicitar permiso para administrar ventanas. Si se concede y hay una segunda pantalla, la salida se abrirá y ajustará automáticamente en ella. Para pantalla completa, utiliza el control de la salida o `F11` cuando esa ventana tenga el foco.

## Formatos de referencia admitidos

- `Mateo 12` — capítulo completo.
- `Mateo 12:1` — un versículo.
- `Mateo 12:1-3` — rango de versículos.
- `Mateo 5:6-` — desde el versículo 6 hasta el final del capítulo. El guion final indica una búsqueda abierta.
- `Mateo 12:1,5-8` — versículos y rangos del mismo capítulo.
- `Mateo 12:3,4 y 7` — versículos individuales.

## Diseño y personalización

- La interfaz usa una composición de cabina oscura, con acentos ámbar y una previsualización 16:9 de la lámina final.
- El texto de los versículos se ajusta dinámicamente al espacio disponible. Si un pasaje es extenso, se reparte automáticamente en varias láminas legibles, incluso cuando un único versículo necesita continuar en otra lámina.
- Se pueden cambiar el color de fondo, el color del versículo y activar fondo transparente.
- El selector **Imagen** incluye luz cálida, montañas, cruz difusa, Biblia abstracta, textura nocturna y paisaje sereno. **Color sólido** quita la imagen de inmediato; los fondos visuales añaden automáticamente una capa de contraste y el fondo transparente siempre tiene prioridad.
- El título de la cita tiene color independiente y cinco tamaños predefinidos: 100%, 120%, 140%, 160% y 180%. El valor inicial es 120%.
- Hay dos tipografías disponibles: Manrope (minimalista) y Cormorant Garamond (clásica). La elección se aplica al título, texto y versión bíblica.
- El diseño se adapta a computador, tablet y móvil. En paneles estrechos, el control de tamaño del título prioriza la barra deslizante y conserva las referencias visuales de A pequeña y A grande.
- Las imágenes PNG, el archivo PPTX y la salida `output.html` conservan la misma apariencia seleccionada.

## Notas técnicas

- La aplicación agrupa hasta tres versículos por lámina, priorizando una lectura legible. Cuando el texto excede el límite, crea nuevas láminas automáticamente.
- Las exportaciones se generan a 1920 × 1080 px; el PPTX usa formato panorámico 16:9.
- No requiere instalación ni backend. Solo necesita internet para cargar la API bíblica, fuentes y bibliotecas de exportación.
