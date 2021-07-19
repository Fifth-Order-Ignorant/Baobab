export enum Role {
  DEFAULT = 'Default',
  ENTREPRENEUR = 'Entrepreneur',
  INVESTOR_REP = 'Investor Representative',
  SERVICE_PROVIDER_REP = 'Service Provider Representative',
  ADMIN = 'Admin',
  MENTOR = 'Mentor'
}

export function stringToRole(role: string) {
  switch (role) {
    case 'Default':
      return Role.DEFAULT;
    case 'Entrepreneur':
      return Role.ENTREPRENEUR;
    case 'Investor Representative':
      return Role.INVESTOR_REP;
    case 'Service Provider Representative':
      return Role.SERVICE_PROVIDER_REP;
    case 'Admin':
      return Role.ADMIN;
    case 'Mentor':
      return Role.MENTOR;
    default:
      return null;
  }
}
