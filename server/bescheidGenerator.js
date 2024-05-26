function generateBescheid(feuerungsanlage, mangel, schwere, bemerkungen) {
    return `
      Bei der Überprüfung Ihrer ${feuerungsanlage} wurde ein ${mangel} festgestellt. 
      Dieser Mangel ist ${schwere} und sollte bis spätestens [Datum] behoben werden.
      ${bemerkungen}
    `;
  }
  
  module.exports = { generateBescheid };
  