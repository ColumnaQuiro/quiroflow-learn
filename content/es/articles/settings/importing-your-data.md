---
title: Importar y migrar tus datos
description: Trae pacientes, citas y archivos desde PracticeHub u otro sistema.
collection: settings
order: 8
---

Si te estás pasando a QuiroFlow desde otro sistema de gestión de clínicas, tres páginas de Settings se encargan de traer tus datos existentes: primero los registros, luego los archivos asociados a ellos, y después una pasada de limpieza sobre esos archivos.

::image-carousel
---
images:
  - src: /screenshots/settings-import.png
    alt: Página de Import Patients (CSV) con una pestaña PracticeHub mostrando los campos URL, API Key y correo, y botones de importación por tipo de registro
    caption: "Una conexión dedicada a PracticeHub, o un importador CSV genérico"
  - src: /screenshots/settings-migrate-attachments.png
    alt: Página de Migrate Attachments con una barra de progreso y una guía de cuatro pasos para ejecutar un script de migración local
    caption: "Traer el contenido real de los archivos, paso a paso"
---
::

## Import Patients (CSV)

**Settings &rarr; Import Patients (CSV)** tiene dos pestañas:

- **PracticeHub** -- si vienes específicamente de PracticeHub, guarda tu URL de PracticeHub, tu API key y tu correo una vez aquí, y a partir de ahí cada tipo de importación se conecta automáticamente: Patients, Appointments, Appointment Types, Payments, Packages / Bonos, Patient Logs, Sticky Notes, Treatment Notes, Care Plans, Custom Form Responses y File Attachments -- sin tener que volver a pegar la API key para cada uno, ni después de recargar la página.
- **Other system** -- un importador CSV genérico para cualquier otro caso. Exporta los pacientes como CSV desde tu sistema actual y súbelo; los nombres de columna no tienen que coincidir con los de QuiroFlow, ya que los asocias a los campos correctos en el siguiente paso.

## Migrate Attachments

Los archivos de los pacientes (radiografías, informes, formularios firmados) necesitan un segundo paso después de la importación principal, porque PracticeHub en sí no ofrece una API de descarga masiva de archivos -- solo una exportación de metadatos y un enlace "View" de uno en uno en su propia interfaz. **Settings &rarr; Migrate Attachments** resuelve esto con un script que ejecutas tú mismo:

1. **Importa la lista de adjuntos** -- exporta "File Attachments - List" desde PracticeHub (Reports &rarr; Data Exports), y luego impórtala mediante Import Patients (CSV) de arriba. Esto crea los registros de archivo con nombres, tamaños y fechas, pero todavía sin contenido.
2. **Descarga el script de migración** desde esta página -- se ejecuta en tu propio ordenador, ya que necesita una ventana de navegador real para que inicies sesión tú mismo en PracticeHub.
3. **Instala las dependencias una vez** (`npm install playwright @supabase/supabase-js papaparse ws` y `npx playwright install chromium`).
4. **Ejecútalo**, rellenando tu URL de PracticeHub y el nombre del CSV. Te pedirá tu inicio de sesión de QuiroFlow en la terminal, y luego abrirá una ventana de navegador real para que inicies sesión en PracticeHub -- a partir de ahí, controla ese navegador él solo para traer cada archivo y adjuntarlo al paciente correspondiente.

Es seguro pararlo y volver a ejecutarlo en cualquier momento: solo procesa los archivos a los que todavía les falta contenido, así que no se repite ni se pierde nada a medio camino. Tus contraseñas de QuiroFlow y PracticeHub las escribes tú directamente en sus propias pantallas de inicio de sesión -- el script en sí nunca las guarda ni las transmite.

## Compress Files

Una vez que los archivos están dentro, **Settings &rarr; Compress Files** recodifica las imágenes incrustadas en los PDFs e imágenes subidos con una calidad alta pero no original -- normalmente un 40-60% más pequeños sin diferencia visible en pantalla. Se ejecuta una vez por archivo (los que ya están comprimidos se saltan), así que es seguro pararlo y reanudarlo, y cada archivo nuevo que subas a partir de ese momento se comprime automáticamente sin necesidad de volver a ejecutar esto.
