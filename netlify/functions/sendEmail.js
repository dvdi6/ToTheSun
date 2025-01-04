export async function handler(event) {
  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } = process.env

  // Validate environment variables
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
    console.error("Missing EmailJS environment variables")
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error. Please try again later." })
    }
  }

  try {
    // Parse the request body
    const { name, email, message } = JSON.parse(event.body)

    // Validate the input fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "All fields are required." })
      }
    }

    // Send email via EmailJS API
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_USER_ID,
        template_params: { name, email, message }
      })
    })

    // Check for EmailJS API errors
    if (!response.ok) {
      const errorDetails = await response.text()
      console.error(`EmailJS API Error: ${errorDetails}`)
      throw new Error(`EmailJS API responded with status ${response.status}: ${errorDetails}`)
    }

    // Success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully." })
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email. Please try again later." })
    }
  }
}