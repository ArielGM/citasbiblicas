# Tu Referencia para Presentación

Web estática y responsiva para transformar una cita bíblica en láminas 16:9 listas para proyectar en vMix. Permite descargar todas las láminas en PNG o incluirlas en una presentación PPTX.

## Objetivo

Agilizar la preparación de pasajes bíblicos para la proyección en iglesias: se ingresa una referencia, se consulta el texto y se generan láminas centradas y legibles sin necesidad de un servidor propio.

## Componentes

- `index.html`: estructura de la interfaz y carga de las bibliotecas externas.
- `styles.css`: diseño responsivo, colores, tipografías y formato visual de las láminas.
- `app.js`: consulta bíblica, interpretación de referencias, agrupación de versículos, carrusel y exportaciones.
- API bíblica: [Free Use Bible API](https://bible.helloao.org/docs/).
- `html2canvas`: convierte cada lámina en PNG.
- `PptxGenJS`: crea un archivo PPTX con una lámina por diapositiva.

## Uso

1. Abre `index.html` en un navegador con conexión a internet.
2. Espera la carga inicial: se consulta automáticamente Mateo 5:3–12 en RVG.
3. Escribe una referencia y presiona **Buscar**. El campo sugiere libros bíblicos mientras escribes.
4. Selecciona la versión bíblica, colores, tipografía y, si es necesario, fondo transparente.
5. Revisa las láminas con las flechas del carrusel.
6. Descarga todas las imágenes con **Descargar (X PNG)** o crea una presentación con **Descargar PPTX (X diapos.)**.

## Formatos de referencia admitidos

- `Mateo 12` — capítulo completo.
- `Mateo 12:1` — un versículo.
- `Mateo 12:1-3` — rango de versículos.
- `Mateo 12:1,5-8` — versículos y rangos del mismo capítulo.
- `Mateo 12:3,4 y 7` — versículos individuales.

## Notas

- La aplicación agrupa hasta tres versículos por lámina, priorizando una lectura legible. Cuando el texto excede el límite, crea nuevas láminas automáticamente.
- Las exportaciones se generan a 1920 × 1080 px; el PPTX usa formato panorámico 16:9.
- No requiere instalación ni backend. Solo necesita internet para cargar la API bíblica, fuentes y bibliotecas de exportación.
