export function validateString(newValue: string, supportingValue: string): string {
  return newValue === null || newValue === undefined || newValue === "" ? supportingValue : newValue;
}