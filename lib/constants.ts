export const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "Gastroenterologist",
  "Psychiatrist",
  "ENT Specialist",
  "Ophthalmologist",
  "Urologist",
  "Oncologist",
  "Pulmonologist",
  "Endocrinologist",
  "Nephrologist",
  "Dentist",
  "Physiotherapist",
];


  export const SYMPTOM_MAP: Record<
  string,
  string[]
> = {
  // General
  Fever: ["General Physician"],
  Fatigue: ["General Physician"],
  Weakness: ["General Physician"],

  // Head / Brain
  Headache: ["Neurologist"],
  Migraine: ["Neurologist"],
  Dizziness: ["Neurologist"],

  // Stomach
  Vomiting: ["General Physician", "Gastroenterologist"],
  "Stomach Pain": ["Gastroenterologist"],
  Acidity: ["Gastroenterologist"],

  // Bones
  "Knee Pain": ["Orthopedic"],
  "Back Pain": ["Orthopedic"],
  "Joint Pain": ["Orthopedic"],

  // Skin
  Acne: ["Dermatologist"],
  Rash: ["Dermatologist"],
  Allergy: ["Dermatologist"],

  // Child
  "Child Fever": ["Pediatrician"],
  "Child Cold": ["Pediatrician"],

  // Women
  "Pregnancy Check": ["Gynecologist"],
  "Period Pain": ["Gynecologist"],

  // Mental
  Anxiety: ["Psychiatrist"],
  Depression: ["Psychiatrist"],

  // ENT
  "Ear Pain": ["ENT Specialist"],
  "Throat Pain": ["ENT Specialist"],

  // Eyes
  "Eye Pain": ["Ophthalmologist"],
  "Vision Issue": ["Ophthalmologist"],

  // Lungs
  Cough: ["Pulmonologist"],
  Asthma: ["Pulmonologist"],

  // Hormone
  Diabetes: ["Endocrinologist"],

  // Kidney
  "Kidney Pain": ["Nephrologist"],

  // Dental
  Toothache: ["Dentist"],
};