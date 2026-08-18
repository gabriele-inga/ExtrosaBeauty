const calendarService = require('../services/calendarService');
const sheetsService = require('../services/sheetsService');
const emailService = require('../services/emailService');

exports.createBooking = async (req, res) => {
  try {
    const { nome, cognome, email, telefono, servizio, start, end, note } = req.body;

    // 1. Controlla se l'orario è già occupato
    const isAvailable = await calendarService.checkAvailability(start, end);
    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: 'Purtroppo questo orario non è più disponibile.'
      });
    }

    // 2. Blocca l'orario su Google Calendar
    const event = await calendarService.createEvent(req.body);

    // 3. Salva la traccia su Google Sheets
    await sheetsService.appendBookingRow(req.body, event.id);

    // 4. Invia l'email di conferma e programma il promemoria
    try {
      await emailService.sendBookingConfirmationAndReminder(req.body);
    } catch (emailError) {
      console.error("Errore durante l'invio dell'email:", emailError);
    }

    // 5. Rispondi al frontend con successo
    res.status(200).json({
      success: true,
      message: 'Prenotazione confermata con successo!',
      eventId: event.id
    });

  } catch (error) {
    console.error('Errore durante la prenotazione:', error);
    res.status(500).json({
      success: false,
      message: 'Errore interno del server durante la prenotazione.'
    });
  }
};