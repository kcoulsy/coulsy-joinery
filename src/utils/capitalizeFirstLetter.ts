export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatLocationName(location?: string): string {
  if (!location) return "York";
  
  // Split by hyphens and capitalize each word
  return location
    .split('-')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}
