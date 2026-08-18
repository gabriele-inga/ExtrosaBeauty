const { google } = require('googleapis');
const path = require('path');

// Indichiamo dove si trova il file delle credenziali
const KEYFILEPATH = path.join(__dirname, '..', 'credentials.json');

// Definiamo i permessi che il nostro "dipendente virtuale" richiederà
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/spreadsheets'
];

// Inizializziamo il client di Google Auth
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// Funzione opzionale per testare subito la connessione all'avvio
async function testGoogleConnection() {
  try {
    const client = await auth.getClient();
    console.log('✅ Connessione alle API di Google stabilita con successo!');
  } catch (error) {
    console.error('❌ Errore di connessione a Google:', error.message);
  }
}

testGoogleConnection();

module.exports = auth;