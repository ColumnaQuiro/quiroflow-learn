export interface CollectionMeta {
  slug: string
  title: string
  description: string
  icon: string
}

// Order here is the order collections appear on the homepage and in nav.
export const collections: CollectionMeta[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'New to QuiroFlow? Start here -- account setup and your first steps.',
    icon: '🚀',
  },
  {
    slug: 'calendar-appointments',
    title: 'Calendar & Appointments',
    description: 'Booking, confirming, and keeping track of appointments.',
    icon: '📅',
  },
  {
    slug: 'patients',
    title: 'Patients',
    description: 'Patient records, contact details, and history.',
    icon: '🧑‍⚕️',
  },
  {
    slug: 'billing-payments',
    title: 'Billing & Payments',
    description: 'Packages (bonos), memberships, invoices, and cards on file.',
    icon: '💳',
  },
  {
    slug: 'team-roles',
    title: 'Team & Roles',
    description: 'Inviting staff and setting up roles and permissions.',
    icon: '👥',
  },
  {
    slug: 'communications',
    title: 'Communications',
    description: 'WhatsApp, campaigns, and the shared inbox.',
    icon: '💬',
  },
  {
    slug: 'online-booking',
    title: 'Online Booking',
    description: "Letting patients book their own appointments on your website.",
    icon: '🌐',
  },
  {
    slug: 'reports',
    title: 'Reports',
    description: "Understanding your clinic's financial and activity reports.",
    icon: '📊',
  },
  {
    slug: 'settings',
    title: 'Settings',
    description: 'Clinics, payments, and account-wide configuration.',
    icon: '⚙️',
  },
]

export function collectionBySlug(slug: string): CollectionMeta | undefined {
  return collections.find((c) => c.slug === slug)
}
