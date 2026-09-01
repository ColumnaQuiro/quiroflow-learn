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
  { slug: 'calendar-appointments', title: 'Calendar & Appointments', description: 'Booking, confirming, and keeping track of appointments.', icon: '📅' },
  { slug: 'patients', title: 'Patients', description: 'Patient records, contact details, and history.', icon: '🧑‍⚕️' },
  { slug: 'billing-payments', title: 'Billing & Payments', description: 'Packages (bonos), memberships, invoices, and cards on file.', icon: '💳' },
  { slug: 'team-roles', title: 'Team & Roles', description: 'Inviting staff and setting up roles and permissions.', icon: '👥' },
  { slug: 'communications', title: 'Communications', description: 'WhatsApp, campaigns, and the shared inbox.', icon: '💬' },
  { slug: 'online-booking', title: 'Online Booking', description: 'Letting patients book their own appointments on your website.', icon: '🌐' },
  { slug: 'reports', title: 'Reports', description: "Understanding your clinic's financial and activity reports.", icon: '📊' },
  { slug: 'settings', title: 'Settings', description: 'Clinics, payments, and account-wide configuration.', icon: '⚙️' },
]

const ES: CollectionMeta[] = [
  { slug: 'getting-started', title: 'Primeros pasos', description: '¿Nuevo en QuiroFlow? Empieza aquí -- configuración de la cuenta y tus primeros pasos.', icon: '🚀' },
  { slug: 'calendar-appointments', title: 'Agenda y citas', description: 'Reservar, confirmar y hacer seguimiento de las citas.', icon: '📅' },
  { slug: 'patients', title: 'Pacientes', description: 'Fichas de pacientes, datos de contacto e historial.', icon: '🧑‍⚕️' },
  { slug: 'billing-payments', title: 'Facturación y pagos', description: 'Bonos, membresías, facturas y tarjetas guardadas.', icon: '💳' },
  { slug: 'team-roles', title: 'Equipo y roles', description: 'Invitar personal y configurar roles y permisos.', icon: '👥' },
  { slug: 'communications', title: 'Comunicaciones', description: 'WhatsApp, campañas y la bandeja de entrada compartida.', icon: '💬' },
  { slug: 'online-booking', title: 'Reservas online', description: 'Permite que los pacientes reserven sus propias citas desde tu web.', icon: '🌐' },
  { slug: 'reports', title: 'Informes', description: 'Entiende los informes financieros y de actividad de tu clínica.', icon: '📊' },
  { slug: 'settings', title: 'Configuración', description: 'Clínicas, pagos y configuración general de la cuenta.', icon: '⚙️' },
]

export function collectionsFor(locale: Locale): CollectionMeta[] {
  return locale === 'es' ? ES : EN
}

export function collectionBySlug(locale: Locale, slug: string): CollectionMeta | undefined {
  return collectionsFor(locale).find((c) => c.slug === slug)
}
