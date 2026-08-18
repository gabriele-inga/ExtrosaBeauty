const { google } = require('googleapis');
const auth = require('../config/googleAuth');

const calendar = google.calendar({ version: 'v3', auth });

// Funzione per controllare se l'orario è libero
async function checkAvailability(startTime, endTime) {
  if (!process.env.GOOGLE_CALENDAR_ID) {
    return true;
  }

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime,
        timeMax: endTime,
        timeZone: 'Europe/Rome',
        items: [{ id: process.env.GOOGLE_CALENDAR_ID }]
      }
    });

    const busySlots = response.data.calendars[process.env.GOOGLE_CALENDAR_ID]?.busy || [];
    return busySlots.length === 0;
  } catch (error) {
    console.warn('Disponibilità Google Calendar non verificabile, procedo comunque:', error.message);
    return true;
  }
}

// Funzione per creare l'evento
async function createEvent(bookingData) {
  if (!process.env.GOOGLE_CALENDAR_ID) {
    return { id: 'local-booking' };
  }

  const { nome, cognome, email, telefono, servizio, start, end, note } = bookingData;

  const event = {
    summary: `💇‍♀️ ${servizio} - ${nome} ${cognome}`,
    description: `📞 Telefono: ${telefono}\n✉️ Email: ${email}\n📝 Note: ${note || 'Nessuna nota'}`,
    start: { dateTime: start, timeZone: 'Europe/Rome' },
    end: { dateTime: end, timeZone: 'Europe/Rome' },
  };

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: event,
  });

  return response.data;
}

module.exports = { checkAvailability, createEvent };