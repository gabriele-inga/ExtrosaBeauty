const { google } = require('googleapis');
const auth = require('../config/googleAuth');

const sheets = google.sheets({ version: 'v4', auth });

async function appendBookingRow(bookingData, eventId) {
  if (!process.env.GOOGLE_SHEET_ID) {
    return;
  }

  const { nome, cognome, email, telefono, servizio, start } = bookingData;

  // Formattiamo la data e l'ora in modo leggibile per l'Excel
  const dataCreazione = new Date().toLocaleString('it-IT');
  const dataAppuntamento = new Date(start).toLocaleDateString('it-IT');
  const oraAppuntamento = new Date(start).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  const values = [
    [
      dataCreazione,
      nome,
      cognome,
      email,
      telefono,
      servizio,
      dataAppuntamento,
      oraAppuntamento,
      'Confermato',
      eventId
    ]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Foglio1!A:J', // ATTENZIONE: Assicurati che in basso nel tuo Google Sheet la scheda si chiami "Foglio1"
    valueInputOption: 'USER_ENTERED',
    requestBody: { values }
  });
}

module.exports = { appendBookingRow };