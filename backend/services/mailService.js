import nodemailer from 'nodemailer';

const isMailConfigured = () => {
  return Boolean(
    process.env.MAIL_HOST &&
    process.env.MAIL_PORT &&
    process.env.MAIL_USER &&
    process.env.MAIL_PASS &&
    process.env.MAIL_FROM
  );
};

const getTransporter = () => {
  if (!isMailConfigured()) return null;

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
};

const sendSessionScheduledEmail = async ({
  learnerEmail,
  learnerName,
  teacherName,
  skillName,
  scheduledAt,
  meetingLink
}) => {
  const transporter = getTransporter();

  if (!transporter || !learnerEmail) {
    return { skipped: true, reason: 'Mail provider not configured or recipient missing' };
  }

  const when = new Date(scheduledAt).toLocaleString();
  const safeSkill = skillName || 'your selected skill';

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
      <h2 style="margin-bottom: 8px;">Your session request was accepted</h2>
      <p>Hi ${learnerName || 'there'},</p>
      <p>${teacherName || 'Your tutor'} accepted your session for <strong>${safeSkill}</strong>.</p>
      <p><strong>Scheduled time:</strong> ${when}</p>
      ${meetingLink ? `<p><strong>Join link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>` : ''}
      <p>You can also open the Sessions page in SkillSwap and join from there.</p>
      <p>Happy learning,<br/>SkillSwap</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: learnerEmail,
    subject: 'SkillSwap: Your session is scheduled',
    html
  });

  return { skipped: false };
};

export { sendSessionScheduledEmail };
