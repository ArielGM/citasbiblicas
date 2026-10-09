# ProyectaCantos

Herramienta web estática para transformar la letra pegada de un canto en láminas 16:9 listas para proyectar. No usa cuentas, servidor ni guarda letras.

## Uso

1. Abre `index.html` en un navegador.
2. Escribe un título opcional y pega la letra, una frase por línea.
3. Separa estrofas, coros y puentes con una línea vacía.
4. Pulsa **Generar láminas**. La herramienta agrupa las líneas en vistas de dos o tres líneas; una línea extensa se divide de forma segura.
5. Revisa la secuencia, personaliza tipografía, texto y fondo, y descarga PNG/PPTX o pulsa **Presentar**.

La salida se abre en `output.html`; usa las flechas del teclado para avanzar y `F` para pantalla completa. Con Edge actualizado, HTTPS y dos monitores extendidos, puede enviarse a la segunda pantalla automáticamente.

## Proyecto

- `index.html`, `styles.css`, `app.js`: generador y previsualización.
- `output.html`, `output.css`, `output.js`: salida limpia de proyección.
- `../assets/backgrounds/`: fondos locales 1920 × 1080 compartidos y reutilizables.
- `SDD.md`: diseño y decisiones técnicas.

Las exportaciones son 1920 × 1080 y el PPTX utiliza formato 16:9. Las únicas dependencias remotas son fuentes, `html2canvas` y `PptxGenJS` para exportación.
