export enum Role {
  DEFAULT,
  ENTREPRENEUR,
  INVESTOR_REP,
  SERVICE_PROVIDER_REP,
}

export function roleToString(role: Role): string {
  if (role == Role.DEFAULT) {
    return 'Default';
  } else if (role == Role.ENTREPRENEUR) {
    return 'Entrepreneur';
  } else if (role == Role.INVESTOR_REP) {
    return 'Investor Representative';
  } else if (role == Role.SERVICE_PROVIDER_REP) {
    return 'Service Provider Representative';
  }
  return 'Default';
}
