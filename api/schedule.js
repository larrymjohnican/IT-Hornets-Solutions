import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Hornets IT Solutions <noreply@hornetsitsolutions.com>'
const TO = 'itsolutionshornet@gmail.com'

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#888;width:130px;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${value || '&mdash;'}</td>
    </tr>`
}

function shell(headerHtml, bodyHtml) {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.07);max-width:560px;">
        <tr>
          <td style="background:#2d8ef5;padding:28px 32px;">
            <p style="margin:0;color:rgba(255,255,255,0.75);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Hornets IT Solutions</p>
            ${headerHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#aaa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              Hornets IT Solutions &nbsp;&middot;&nbsp; <a href="https://hornetsitsolutions.com" style="color:#aaa;text-decoration:none;">hornetsitsolutions.com</a> &nbsp;&middot;&nbsp; Charlotte, NC
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function fmtAddress({ street, apt, city, state, zip }) {
  const line1 = apt ? `${street}, ${apt}` : street
  return `${line1}, ${city}, ${state} ${zip}`
}

function internalEmail({ name, phone, email, service, street, apt, city, state, zip, notes, date, slot }) {
  const header = `<h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">New Walkthrough Request</h1>`
  const body = `
    <p style="margin:0 0 20px;font-size:14px;color:#555;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      A new walkthrough has been requested via the website. Reply directly to this email to respond to the customer.
    </p>
    <div style="background:#f4f9ff;border:1px solid #d0e6ff;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#2d8ef5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Requested Appointment</p>
      <p style="margin:0;font-size:18px;font-weight:700;color:#111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${date} &nbsp;at&nbsp; ${slot}</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Name', name)}
      ${row('Phone', phone)}
      ${row('Email', `<a href="mailto:${email}" style="color:#2d8ef5;">${email}</a>`)}
      ${row('Service', service)}
      ${row('Street', apt ? `${street}, ${apt}` : street)}
      ${row('City', city)}
      ${row('State', state)}
      ${row('ZIP', zip)}
      ${notes ? row('Notes', `<span style="white-space:pre-wrap;">${notes}</span>`) : ''}
    </table>`
  return shell(header, body)
}

function confirmationEmail({ name, service, street, apt, city, state, zip, date, slot }) {
  const header = `
    <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Walkthrough Requested!</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">We'll confirm your appointment within 1 business day.</p>`
  const body = `
    <p style="margin:0 0 16px;font-size:15px;color:#222;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Hi ${name},</p>
    <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.65;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      Thanks for scheduling a walkthrough with <strong>Hornets IT Solutions</strong>! We've received your request and will reach out to confirm your appointment within <strong>1 business day</strong>.
    </p>
    <div style="background:#f4f9ff;border:1px solid #d0e6ff;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#2d8ef5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">Appointment Details</p>
      <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:#111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${date} &nbsp;at&nbsp; ${slot}</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('Service', service)}
        ${row('Address', fmtAddress({ street, apt, city, state, zip }))}
      </table>
    </div>
    <p style="margin:0 0 24px;font-size:14px;color:#666;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      During your free walkthrough, a technician will visit your location, assess your space, and provide a clear itemized quote — no pressure, no obligation.
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:#666;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      Need to reach us sooner? Email us at <a href="mailto:itsolutionshornet@gmail.com" style="color:#2d8ef5;text-decoration:none;">itsolutionshornet@gmail.com</a>.
    </p>
    <p style="margin:0;font-size:15px;color:#222;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      &mdash; The Hornets IT Solutions Team
    </p>`
  return shell(header, body)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, email, service, street, apt, city, state, zip, notes, date, slot } = req.body

  if (!name || !email || !service || !street || !city || !state || !zip || !date || !slot) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `New Walkthrough Request — ${name} · ${date} at ${slot}`,
        html: internalEmail({ name, phone, email, service, street, apt, city, state, zip, notes, date, slot }),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: 'Your walkthrough request — Hornets IT Solutions',
        html: confirmationEmail({ name, service, street, apt, city, state, zip, date, slot }),
      }),
    ])
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error (schedule):', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
