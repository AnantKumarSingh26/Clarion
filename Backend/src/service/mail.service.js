export async function sendEmail(to, subject, html, text) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.BREVO_SMTP_USER || process.env.GOOGLE_USER;

    if (!apiKey) {
        throw new Error("BREVO_API_KEY is missing in environment variables.");
    }
    if (!senderEmail) {
        throw new Error("Sender email (BREVO_SENDER_EMAIL or BREVO_SMTP_USER) is missing in environment variables.");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": apiKey,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            sender: {
                name: "Clarion",
                email: senderEmail
            },
            to: [{ email: to }],
            subject,
            htmlContent: html,
            textContent: text || ""
        })
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Brevo API Error:", data);
        throw new Error(data.message || `Brevo API error: ${response.statusText}`);
    }

    console.log("Email sent successfully via Brevo API:", data);
    return data;
}