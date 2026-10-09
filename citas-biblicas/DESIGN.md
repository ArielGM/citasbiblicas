# Design system

## Visual direction

Control de proyección nocturno: una interfaz operativa de alto contraste pensada para cabina técnica, con azul profundo, acento ámbar y una previsualización negra que representa la salida de pantalla.

## Tokens

- Fondo: `#07121f`; superficie: `#10233a`; texto: `#f5f7fb`; acento: `#f7b733`.
- Tipografía de interfaz: Manrope. La lámina exportable permite Manrope (minimalista) o Cormorant Garamond (clásica), con una lectura ligera y centrada.
- Controles con bordes suaves de 14px; foco visible en ámbar.

## Behavior

La composición se apila en móvil y mantiene los controles junto a la previsualización en escritorio. El selector de versión se mantiene junto a la referencia para escoger la fuente del pasaje. La lámina reserva una zona central fija para el texto; si una agrupación no cabe incluso tras reducir la tipografía, se parte automáticamente a la mitad antes de exportar. Las exportaciones PNG y PPTX usan la misma lámina renderizada y respetan sus ajustes visuales.
