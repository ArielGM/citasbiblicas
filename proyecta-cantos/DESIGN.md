# Design system

## Visual direction

Cabina de proyección nocturna, hermana de CitasBíblicas: selva casi negra como base, verde petróleo para las superficies y ámbar/cobre como señal de acción. Las superficies internas se escalonan para distinguir los grupos de edición sin añadir ruido visual.

## Tokens

- Fondo del editor: `#08110F`; fondo sólido predeterminado de láminas: `#05070B` (compartido con Citas Bíblicas); superficie: `#102C29`; superficies internas: `#134B42`; línea: `#2D6258`; acción y título predeterminado: `#EEA83B`; estado hover: `#CA763B`; texto secundario: `#AEB8AA`; texto principal: `#F7F5EC`.
- Interfaz: Manrope. Láminas: Manrope o Cormorant Garamond.
- Bordes suaves de 12–14 px, foco ámbar y controles de alto contraste.

## Behavior

El editor y los ajustes permanecen en el panel izquierdo; la salida 16:9 gobierna el derecho. El panel de personalización empieza cerrado y se sitúa antes del editor de texto. El tamaño del título se controla con una escala de 100–200%, reducida visualmente al 60% de la escala original, y se transmite a la previsualización, a las exportaciones y a la ventana de presentación. Cada salto de línea representa una frase completa: nunca se corta por cantidad de caracteres ni se deja una palabra huérfana en otra línea. Los saltos vacíos separan secciones. La segmentación crea grupos de dos o tres frases y conserva los saltos en PNG, PPTX y en la ventana de presentación; antes de dividir una frase, la tipografía se reduce gradualmente según el ancho disponible. Si se indica título, se crea una portada independiente; la letra empieza en la segunda lámina. Las siguientes usan toda la composición para la letra, sin firma.
