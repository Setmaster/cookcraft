export function validateString(newValue: string, alternativeValue: string): string {
  return newValue === null || newValue === undefined || newValue === "" ? alternativeValue : newValue;
}