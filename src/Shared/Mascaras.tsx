export function parseDate(data: string) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/;
  return data?.replace(regex, '$3/$2/$1');
}

export function cpfMask(cpf: string) {
  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return cpf?.replace(cpfRegex, '$1.$2.$3-$4');
}

export function removeMask(value: any) {
  if (value === undefined || value === null) {
    return 0;
  }
  return value.replace(/[^\w\s]/g, '');
}
