# Software Design Description — ProyectaCantos

## 1. Propósito y alcance

ProyectaCantos es una aplicación web estática que convierte la letra introducida por el operador en láminas 16:9 para cantar en congregación. Su alcance termina en la generación, exportación y proyección de la sesión actual. No persiste letras ni incorpora usuarios, catálogo, licencias o servicios de terceros para el contenido.

## 2. Arquitectura

```text
index.html + styles.css
        │
        └── app.js
              ├── entrada: título opcional + letra pegada
              ├── segmentación local: líneas → secciones → láminas
              ├── render de previsualización / PNG / PPTX
              └── BroadcastChannel + localStorage temporal
                            │
                     output.html + output.js
                            │
                    segunda ventana / proyector
```

Todo el procesamiento de letras sucede en el navegador. `localStorage` solo replica el estado actual a la ventana de salida; no constituye una biblioteca de canciones y puede borrarse con los datos del navegador.

## 3. Segmentación de letras

1. Se normalizan los saltos de línea y espacios.
2. Una línea vacía cierra una sección (estrofa, coro o puente).
3. Líneas extensas se envuelven cerca de 46 caracteres, entre palabras.
4. Cada sección se parte en grupos de tres líneas, salvo un remanente de cuatro líneas, que se distribuye en 2 + 2.
5. Si existe un título opcional, se agrega una portada independiente antes de la letra. Las láminas posteriores contienen solo la letra.

El resultado prioriza 2–3 líneas por lámina y evita que una sección se mezcle con otra. El ajuste final de tipografía reduce el tamaño de forma progresiva si una lámina no cabe.

## 4. Presentación y exportación

La previsualización HTML es la fuente única para tres salidas: PNG 1920 × 1080 (`html2canvas`), PPTX panorámico (`PptxGenJS`) y `output.html`. La ventana de salida recibe el estado mediante `BroadcastChannel`, con `localStorage` como respaldo entre pestañas.

Al usar HTTPS y un navegador compatible, la aplicación solicita permiso para identificar monitores y posicionar la ventana en la pantalla secundaria. Si no está disponible, la ventana puede usarse manualmente con F11.

## 5. Dependencias y operación

- Activos locales compartidos: fondos WebP en `../assets/backgrounds/`.
- Red: Google Fonts, `html2canvas` y `PptxGenJS`; la creación de láminas no requiere red.
- Navegadores objetivo: Chrome y Edge actuales.
- Despliegue: cualquier hosting de archivos estáticos; HTTPS habilita la detección de pantallas.

## 6. Límites conocidos

La segmentación se basa en líneas que provee el operador, no interpreta métrica musical ni marca automáticamente coros repetidos. La proyección automática a otra pantalla depende de permisos y soporte del navegador.
