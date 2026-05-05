const baseWrapper = (content: string) => `
  <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; padding:20px;">
      ${content}
      <hr style="margin:20px 0;" />
      <p style="font-size:12px; color:#6b7280;">
        © HealthCare System
      </p>
    </div>
  </div>
`;

//  PATIENT EMAIL
export const patientTemplate = (data: any) =>
  baseWrapper(`
    <h2 style="color:#2563eb;">✅ Appointment Confirmed</h2>

    <p>Hello <b>${data.patientName}</b>,</p>

    <p>Your appointment has been successfully booked.</p>

    <div style="background:#f3f4f6; padding:12px; border-radius:8px;">
      <p><b>Doctor:</b> ${data.doctor}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      <p><b>Problem:</b> ${data.problem}</p>
    </div>

    <p style="margin-top:15px;">
      Please arrive 10 minutes early.
    </p>
  `);

//  DOCTOR EMAIL
export const doctorTemplate = (data: any) =>
  baseWrapper(`
    <h2 style="color:#16a34a;">📅 New Appointment Request</h2>

    <p>Hello Doctor,</p>

    <p>You have received a new appointment request.</p>

    <div style="background:#f3f4f6; padding:12px; border-radius:8px;">
      <p><b>Patient:</b> ${data.patientName}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
      <p><b>Problem:</b> ${data.problem}</p>
    </div>

    <p style="margin-top:15px;">
      Please login to your dashboard to accept or reject.
    </p>
  `);

//  ADMIN EMAIL
export const adminTemplate = (data: any) =>
  baseWrapper(`
    <h2 style="color:#7c3aed;">🏥 New Appointment Booked</h2>

    <p>A new appointment has been created in the system.</p>

    <div style="background:#f3f4f6; padding:12px; border-radius:8px;">
      <p><b>Patient:</b> ${data.patientName}</p>
      <p><b>Doctor:</b> ${data.doctor}</p>
      <p><b>Date:</b> ${data.date}</p>
      <p><b>Time:</b> ${data.time}</p>
    </div>

    <p style="margin-top:15px;">
      This is for monitoring purposes.
    </p>
  `);