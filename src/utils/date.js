// Returnerar dagens datum i ISO-format (YYYY-MM-DD)
export const getTodayISO = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Formatterar ett datum till svensk stil med veckodag
export const formatDateSV = (dateInput) => {
  const date = new Date(dateInput);
  return date.toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Ökar ett datum med antal dagar (positivt eller negativt)
export const addDays = (dateInput, days) => {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0]; // returnerar YYYY-MM-DD
};
