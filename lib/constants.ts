export const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
];

export const SYMPTOM_MAP: Record<string, string[]> = {
  Fever: ["General Physician"],
  Headache: ["Neurologist"],
  Vomiting: ["General Physician"],
  "Knee Pain": ["Orthopedic"],
  "Back Pain": ["Orthopedic"],
};