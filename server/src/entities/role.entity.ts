export enum Role {
  DEFAULT = 'Default',
  ENTREPRENEUR = 'Entrepreneur',
  INVESTOR_REP = 'Investor Representative',
  SERVICE_PROVIDER_REP = 'Service Provider Representative',
  MENTOR = 'Mentor',
  ADMIN = 'Admin',
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
      case 'Mentor':
        return Role.MENTOR;
    case 'Admin':
      return Role.ADMIN;
    default:
      return null;
  }
}
