// utils/notifications.js
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

// Enviar correo al administrador
async function sendAdminEmail({ nombre, correo, empresa, total_agentes, generatedPassword }) {
  try {
    // Configura tu transporter SMTP aquí
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true si usas 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Sistema Registro" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Nuevo usuario registrado',
      html: `
        <h2>Nuevo usuario registrado</h2>
        <ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Correo:</strong> ${correo}</li>
          <li><strong>Empresa:</strong> ${empresa}</li>
          <li><strong>Total de agentes:</strong> ${total_agentes}</li>
          <li><strong>Contraseña generada:</strong> ${generatedPassword}</li>
        </ul>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado al administrador.');
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
}

// Enviar WhatsApp al administrador vía API Twilio o Meta WhatsApp Cloud API
async function sendAdminWhatsApp({ nombre, correo, empresa, total_agentes, generatedPassword }) {
  try {
    // Aquí un ejemplo básico con Twilio (modifica con tus credenciales)
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    await client.messages.create({
      body: `Nuevo usuario registrado:\nNombre: ${nombre}\nCorreo: ${correo}\nEmpresa: ${empresa}\nAgentes: ${total_agentes}\nContraseña: ${generatedPassword}`,
      from: 'whatsapp:+14155238886', // número de Twilio WhatsApp sandbox
      to: process.env.ADMIN_WHATSAPP
    });
    */

    // Alternativa: llamada API Meta WhatsApp Cloud API con axios
    /*
    await axios.post(
      `https://graph.facebook.com/v15.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: process.env.ADMIN_WHATSAPP,
        text: { body: `Nuevo usuario registrado:\nNombre: ${nombre}\nCorreo: ${correo}\nEmpresa: ${empresa}\nAgentes: ${total_agentes}\nContraseña: ${generatedPassword}` }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    */

    console.log('Notificación WhatsApp enviada (simulada).');
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
  }
}

// Función principal para enviar ambas notificaciones
async function sendAdminNotifications(userData) {
  await Promise.all([
    sendAdminEmail(userData),
    sendAdminWhatsApp(userData)
  ]);
}

module.exports = { sendAdminNotifications };
