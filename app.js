// CODIGO ABIERTO BY YUNG SAMY - ADAPTADO AL SHERIFF PARA MYSTICOS RP
// DISCORD: likeadversario
// GITHUB: https://github.com/yungsamy4p/fdn-portal
// INSTAGRAM: https://www.instagram.com/yungsamy4p

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1573149300622499932/icxVVeIRR6c8f1Y2bqud2aSrFThb2yg8vViNsKn3H14_MHcJ65e5bhbwZnqKkIcMdqV4";

document.getElementById('enlistForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const statusMsg = document.getElementById('statusMessage');

  const callsign = document.getElementById('callsign').value;
  const discord = document.getElementById('discord').value;
  const division = document.getElementById('division').value;
  const motivation = document.getElementById('motivation').value;

  submitBtn.disabled = true;
  submitBtn.innerText = "TRANSMITIENDO EXPEDIENTE AL CONDADO...";
  statusMsg.innerText = "";

  // ID del Rol de Jefatura del Sheriff
  const ROL_JEFATURA_SHERIFF_ID = "1573098131812524173";

  const payload = {
    username: "DESPACHO CENTRAL // BLAINE COUNTY SHERIFF'S OFFICE",
    avatar_url: "https://cdn.discordapp.com/attachments/1573129337744396378/1573138685195456602/logo_sheriff.png",
    content: `🛡️ **NOTIFICACIÓN DE POSTULACIÓN / LEGAJO DE SERVICIO** <@&${ROL_JEFATURA_SHERIFF_ID}>`,
    embeds: [
      {
        title: "NUEVA SOLICITUD DE ADHESIÓN AL SHERIFF RECIBIDA",
        description: "Se ha radicado un nuevo expediente de postulación para incorporarse al **Blaine County Sheriff's Office** en el Condado de Blaine • Mysticos RP.",
        color: 0x2d4c3b,
        fields: [
          { name: "👤 Identificador / Nombre IC", value: `\`${callsign}\``, inline: true },
          { name: "📋 Contacto de Discord", value: `\`${discord}\``, inline: true },
          { name: "🛡️ División Solicitada", value: `\`${division}\``, inline: false },
          { name: "📜 Declaración de Intenciones / Antecedentes", value: motivation, inline: false }
        ],
        footer: {
          text: "Blaine County Sheriff's Office • Registro Departamental Automático | Mysticos RP"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      statusMsg.style.color = "#55ff55";
      statusMsg.innerText = "TRANSMISIÓN EXITOSA: Su expediente ha sido remitido formalmente a la Jefatura del Sheriff.";
      document.getElementById('enlistForm').reset();
    } else {
      throw new Error("Fallo en la respuesta del servidor");
    }
  } catch (error) {
    statusMsg.style.color = "#ff5555";
    statusMsg.innerText = "ERROR CRÍTICO: No se pudo enlazar con la terminal central de datos del Sheriff.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "TRANSMITIR SOLICITUD AL DESPACHO";
  }
});