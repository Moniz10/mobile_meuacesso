export function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-PT');
}

export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
