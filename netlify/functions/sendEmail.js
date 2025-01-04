import fetch from "node-fetch"

const rateLimitCache = {}

export async function handler(event) {
  try {
    const { name, email, message } = JSON.parse(event.body)

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "All fields are required" })
      }
    }

    const currentTime = Date.now()
    const cacheKey = "global-limit"
    const timeWindow = 60 * 1000
    const maxRequests = 5

    rateLimitCache[cacheKey] = rateLimitCache[cacheKey] || []
    rateLimitCache[cacheKey] = rateLimitCache[cacheKey].filter(
      (timestamp) => currentTime - timestamp < timeWindow
    )

    if (rateLimitCache[cacheKey].length >= maxRequests) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          error: "Rate limit exceeded. Please try again later"
        })
      }
    }

    rateLimitCache[cacheKey].push(currentTime)

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: { name, email, message }
      })
    })

    if (!response.ok) {
      const errorDetails = await response.text()
      console.error("EmailJS API Error:", errorDetails)
      throw new Error(`EmailJS API responded with status ${response.status}`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" })
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email. Please try again later" })
    }
  }
}