function generateBescheid(feuerungsanlage, mangel, schwere, bemerkungen) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 42); // 6 Wochen in die Zukunft
  const futureDate = currentDate.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return `
    Bei der Überprüfung Ihrer ${feuerungsanlage} wurde ein ${mangel} festgestellt. 
    Dieser Mangel ist ${schwere} und sollte bis spätestens ${futureDate} behoben werden.
    Bemerkungen: ${bemerkungen}
  `;
}

module.exports = { generateBescheid };
