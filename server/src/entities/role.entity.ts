export enum Role {
  DEFAULT = 'Default',
  ENTREPRENEUR = 'Entrepreneur',
  INVESTOR_REP = 'Investor Representative',
  SERVICE_PROVIDER_REP = 'Service Provider Representative',
}

export function stringToRole(role: String) {
  switch(role) {
    case "Default": return Role.DEFAULT;
    case "Entrepreneur": return Role.ENTREPRENEUR;
    case "Investor Representative": return Role.INVESTOR_REP;
    case "Service Provider Representative": return Role.SERVICE_PROVIDER_REP;
    default: return null;
  }
  
}