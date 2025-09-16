const WEBHOOK_URL = 'https://hook.us2.make.com/2d5whpt425nxvn1be1xe0vq8w2jiacdd'

type StudentWebhookData = {
  name: string
  program: string
  grad_year: number
  bio?: string
}

export async function sendStudentWebhook(student: StudentWebhookData) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: student.name,
        program: student.program,
        grad_year: student.grad_year,
        bio: student.bio || '',
      }),
    })

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`)
    }

    console.log('Student data sent to webhook successfully')
    return { success: true, error: null }
  } catch (error) {
    console.error('Webhook error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send webhook' 
    }
  }
}

