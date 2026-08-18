const nodemailer = require('nodemailer');

function getSmtpCredentials() {
  return {
    user: (process.env.SMTP_USER || '').trim(),
    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
    from: (process.env.SMTP_FROM || process.env.SMTP_USER || '').trim(),
  };
}

function createTransporter() {
  const { user, pass } = getSmtpCredentials();

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

function buildConfirmationHtml(bookingData) {
  const { nome, cognome, servizio, start, telefono, note } = bookingData;
  const appointmentDate = new Date(start).toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #cda250;">Prenotazione ricevuta</h2>
      <p>Ciao ${nome} ${cognome},</p>
      <p>Abbiamo ricevuto la tua richiesta per <strong>${servizio}</strong>.</p>
      <p><strong>Data e ora:</strong> ${appointmentDate}</p>
      <p><strong>Telefono:</strong> ${telefono}</p>
      <p><strong>Note:</strong> ${note || 'Nessuna nota'}</p>
      <p>Ti contatteremo al più presto per confermare definitivamente l'appuntamento.</p>
      <p style="margin-top: 20px;">A presto,<br/>Extrosa Beauty</p>
    </div>
  `;
}

function buildReminderHtml(bookingData) {
  const { nome, cognome, servizio, start } = bookingData;
  const appointmentDate = new Date(start).toLocaleString('it-IT', { timeZone: 'Europe/Rome' });

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #cda250;">Promemoria appuntamento</h2>
      <p>Ciao ${nome} ${cognome},</p>
      <p>Ti ricordiamo il tuo appuntamento per <strong>${servizio}</strong> previsto per <strong>${appointmentDate}</strong>.</p>
      <p>Se devi cambiare o annullare, rispondi a questa email o contattaci al più presto.</p>
      <p style="margin-top: 20px;">A presto,<br/>Extrosa Beauty</p>
    </div>
  `;
}

async function sendBookingConfirmation(bookingData) {
  const { email } = bookingData;
  const { user, pass, from } = getSmtpCredentials();
  const to = email || user;

  if (!to || !user || !pass) {
    return { success: false, message: 'Credenziali SMTP non configurate' };
  }

  const transporter = createTransporter();
  const mailOptions = {
    from,
    to,
    subject: `Extrosa Beauty - Conferma prenotazione per ${bookingData.servizio}`,
    html: buildConfirmationHtml(bookingData),
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
}

function scheduleReminderEmail(bookingData) {
  const appointmentTime = new Date(bookingData.start).getTime();
  const reminderTime = appointmentTime - (24 * 60 * 60 * 1000);
  const delay = reminderTime - Date.now();

  if (delay <= 0) {
    return;
  }

  setTimeout(async () => {
    const { email } = bookingData;
    const { user, pass, from } = getSmtpCredentials();
    if (!email || !user || !pass) {
      return;
    }

    const transporter = createTransporter();
    await transporter.sendMail({
      from,
      to: email,
      subject: `Extrosa Beauty - Promemoria appuntamento per ${bookingData.servizio}`,
      html: buildReminderHtml(bookingData),
    });
  }, delay);
}

async function sendBookingConfirmationAndReminder(bookingData) {
  const result = await sendBookingConfirmation(bookingData);
  scheduleReminderEmail(bookingData);
  return result;
}

module.exports = { sendBookingConfirmation, sendBookingConfirmationAndReminder };