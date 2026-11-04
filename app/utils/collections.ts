export type Locale = 'en' | 'es'

export interface CollectionMeta {
  slug: string
  title: string
  description: string
  icon: string
}

// Order here is the order collections appear on the homepage and in nav.
const EN: CollectionMeta[] = [
  { slug: 'getting-started', title: 'Getting Started', description: 'New to QuiroFlow? Start here -- account setup and your first steps.', icon: '🚀' },
  { slug: 'calendar-appointments', title: 'Calendar & Appointments', description: 'Booking, moving, confirming and checking patients in.', icon: '📅' },
  { slug: 'patients', title: 'Patients', description: 'Patient records, contact details, documents and files.', icon: '🧑‍⚕️' },
  { slug: 'clinical', title: 'Clinical', description: 'Visit notes, care plans, posture, exercises and education.', icon: '🩺' },
  { slug: 'patient-app', title: 'Patient Portal & App', description: 'What your patients see: the portal, the app, check-in and Wallet passes.', icon: '📱' },
  { slug: 'billing-payments', title: 'Billing & Payments', description: 'Charging, receipts, bonos, memberships, credit and cards on file.', icon: '💳' },
  { slug: 'invoices-verifactu', title: 'Invoices & VeriFactu', description: 'Facturas, corrective invoices and sending records to the AEAT.', icon: '🧾' },
  { slug: 'communications', title: 'Communications', description: 'The inbox, WhatsApp, reminders and automations.', icon: '💬' },
  { slug: 'growth', title: 'Growth', description: 'Leads, the AI receptionist, ads and Google reviews.', icon: '📈' },
  { slug: 'online-booking', title: 'Online Booking', description: 'Letting patients book their own appointments on your website.', icon: '🌐' },
  { slug: 'reports', title: 'Reports', description: "Understanding your clinic's financial and activity reports.", icon: '📊' },
  { slug: 'team-roles', title: 'Team & Roles', description: 'Inviting staff, working hours, absences and permissions.', icon: '👥' },
  { slug: 'settings', title: 'Settings', description: 'Clinics, appointment types, imports and account-wide configuration.', icon: '⚙️' },
  { slug: 'security-privacy', title: 'Security & Privacy', description: 'Two-factor login, the activity log, data retention and GDPR.', icon: '🔒' },
]

const ES: CollectionMeta[] = [
  { slug: 'getting-started', title: 'Primeros pasos', description: '¿Nuevo en QuiroFlow? Empieza aquí -- configuración de la cuenta y tus primeros pasos.', icon: '🚀' },
  { slug: 'calendar-appointments', title: 'Agenda y citas', description: 'Reservar, mover, confirmar y registrar la llegada de los pacientes.', icon: '📅' },
  { slug: 'patients', title: 'Pacientes', description: 'Fichas de pacientes, datos de contacto, documentos y archivos.', icon: '🧑‍⚕️' },
  { slug: 'clinical', title: 'Clínica', description: 'Notas de visita, planes de cuidado, postura, ejercicios y educación.', icon: '🩺' },
  { slug: 'patient-app', title: 'Portal y app del paciente', description: 'Lo que ven tus pacientes: el portal, la app, el check-in y los pases de Wallet.', icon: '📱' },
  { slug: 'billing-payments', title: 'Cobros y pagos', description: 'Cobrar, recibos, bonos, membresías, saldo a favor y tarjetas guardadas.', icon: '💳' },
  { slug: 'invoices-verifactu', title: 'Facturas y VeriFactu', description: 'Facturas, rectificativas y el envío de registros a la AEAT.', icon: '🧾' },
  { slug: 'communications', title: 'Comunicaciones', description: 'La bandeja de entrada, WhatsApp, recordatorios y automatizaciones.', icon: '💬' },
  { slug: 'growth', title: 'Crecimiento', description: 'Contactos, la recepcionista IA, anuncios y reseñas de Google.', icon: '📈' },
  { slug: 'online-booking', title: 'Reservas online', description: 'Permite que los pacientes reserven sus propias citas desde tu web.', icon: '🌐' },
  { slug: 'reports', title: 'Informes', description: 'Entiende los informes financieros y de actividad de tu clínica.', icon: '📊' },
  { slug: 'team-roles', title: 'Equipo y roles', description: 'Invitar al equipo, horarios, ausencias y permisos.', icon: '👥' },
  { slug: 'settings', title: 'Configuración', description: 'Sedes, tipos de cita, importaciones y configuración general de la cuenta.', icon: '⚙️' },
  { slug: 'security-privacy', title: 'Seguridad y privacidad', description: 'Verificación en dos pasos, registro de actividad, conservación de datos y RGPD.', icon: '🔒' },
]

export function collectionsFor(locale: Locale): CollectionMeta[] {
  return locale === 'es' ? ES : EN
}

export function collectionBySlug(locale: Locale, slug: string): CollectionMeta | undefined {
  return collectionsFor(locale).find((c) => c.slug === slug)
}
