export function validateRestaurantName(name: string): string {
  if (!name) {
    return "El nombre es requerido";
  }
  if (name.length < 3) {
    return "El nombre debe tener al menos 3 caracteres";
  }
  return "";
}

export function validateRestaurantAddress(address: string): string {
  if (!address) {
    return "La dirección es requerida";
  }
  if (address.length < 3) {
    return "La dirección debe tener al menos 5 caracteres";
  }
  return "";
}

export function validateRestaurantPhone(phone: string): string {
  if (!phone) {
    return "El teléfono es requerido";
  }
  if (phone.length < 3) {
    return "El teléfono debe tener al menos 5 caracteres";
  }

  const phoneRegex = new RegExp(
    /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/
  );

  if (!phoneRegex.test(phone)) {
    return "El teléfono no es válido";
  }

  return "";
}
