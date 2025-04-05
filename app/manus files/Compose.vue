<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Header -->
    <div class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div class="flex items-center">
        <button 
          @click="goBack" 
          class="mr-4 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <h1 class="text-lg font-medium text-gray-900">{{ isReply ? 'Reply' : isForward ? 'Forward' : 'New Message' }}</h1>
      </div>
      <div class="flex space-x-2">
        <button 
          @click="saveDraft" 
          class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          title="Save Draft"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Compose form -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Recipients -->
        <div class="mb-4">
          <label for="to" class="block text-sm font-medium text-gray-700">To</label>
          <div class="mt-1">
            <input 
              id="to" 
              v-model="to" 
              type="text" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <!-- CC/BCC toggle -->
        <div v-if="!showCcBcc" class="mb-4">
          <button 
            @click="showCcBcc = true" 
            class="text-sm text-primary-600 hover:text-primary-500"
          >
            Add Cc/Bcc
          </button>
        </div>
        
        <!-- CC -->
        <div v-if="showCcBcc" class="mb-4">
          <label for="cc" class="block text-sm font-medium text-gray-700">Cc</label>
          <div class="mt-1">
            <input 
              id="cc" 
              v-model="cc" 
              type="text" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <!-- BCC -->
        <div v-if="showCcBcc" class="mb-4">
          <label for="bcc" class="block text-sm font-medium text-gray-700">Bcc</label>
          <div class="mt-1">
            <input 
              id="bcc" 
              v-model="bcc" 
              type="text" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <!-- Subject -->
        <div class="mb-4">
          <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
          <div class="mt-1">
            <input 
              id="subject" 
              v-model="subject" 
              type="text" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        <!-- Message body -->
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <div class="mt-1">
            <textarea 
              id="message" 
              v-model="message" 
              rows="12" 
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            ></textarea>
          </div>
        </div>
        
        <!-- AI assistance -->
        <div class="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 class="text-sm font-medium text-gray-900 mb-2">AI Assistance</h3>
          
          <div class="space-y-3">
            <!-- Draft with AI -->
            <div>
              <label for="intent" class="block text-sm text-gray-700">What would you like to say?</label>
              <div class="mt-1 flex">
                <input 
                  id="intent" 
                  v-model="intent" 
                  type="text" 
                  placeholder="e.g., Accept the meeting invitation and ask for the agenda"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
                <button 
                  @click="generateDraft"
                  :disabled="isGenerating || !intent"
                  class="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {{ isGenerating ? 'Generating...' : 'Generate' }}
                </button>
              </div>
            </div>
            
            <!-- Improve with AI -->
            <div>
              <div class="flex items-center">
                <button 
                  @click="improveMessage"
                  :disabled="isImproving || !message"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {{ isImproving ? 'Improving...' : 'Improve this message' }}
                </button>
                <span class="ml-2 text-xs text-gray-500">Enhance clarity, tone, and professionalism</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end">
          <button 
            @click="goBack" 
            class="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button 
            @click="sendEmail"
            :disabled="isSending || !to || !subject || !message"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {{ isSending ? 'Sending...' : 'Send' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Compose',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // Form fields
    const to = ref('')
    const cc = ref('')
    const bcc = ref('')
    const subject = ref('')
    const message = ref('')
    const intent = ref('')
    const showCcBcc = ref(false)
    
    // States
    const isGenerating = ref(false)
    const isImproving = ref(false)
    const isSending = ref(false)
    
    // Computed properties
    const isReply = computed(() => route.query.action === 'reply')
    const isForward = computed(() => route.query.action === 'forward')
    
    // Email data for reply/forward
    const emailData = ref(null)
    
    // Methods
    const goBack = () => {
      router.push('/mailbox')
    }
    
    const saveDraft = () => {
      // In a real app, this would save the draft to the server
      alert('Draft saved')
    }
    
    const sendEmail = async () => {
      try {
        isSending.value = true
        
        // In a real app, this would send the email via the API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        alert('Email sent successfully')
        router.push('/mailbox')
      } catch (error) {
        console.error('Error sending email:', error)
        alert('Failed to send email')
      } finally {
        isSending.value = false
      }
    }
    
    const generateDraft = async () => {
      try {
        isGenerating.value = true
        
        // In a real app, this would call the API to generate a draft
        const emailThread = emailData.value ? 
          `Subject: ${emailData.value.subject}\nFrom: ${emailData.value.sender}\n\n${emailData.value.content}` : 
          ''
        
        const response = await fetch('https://moringa.app/api/email/draft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({
            emailThread,
            userIntent: intent.value,
            mailboxId: 1 // In a real app, this would be the actual mailbox ID
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to generate draft')
        }
        
        const data = await response.json()
        message.value = data.draft
      } catch (error) {
        console.error('Error generating draft:', error)
        alert('Failed to generate draft')
      } finally {
        isGenerating.value = false
      }
    }
    
    const improveMessage = async () => {
      try {
        isImproving.value = true
        
        // In a real app, this would call the API to improve the message
        const emailThread = emailData.value ? 
          `Subject: ${emailData.value.subject}\nFrom: ${emailData.value.sender}\n\n${emailData.value.content}` : 
          ''
        
        const response = await fetch('https://moringa.app/api/email/improve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({
            emailThread,
            userDraft: message.value,
            mailboxId: 1 // In a real app, this would be the actual mailbox ID
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to improve message')
        }
        
        const data = await response.json()
        message.value = data.improvedDraft
      } catch (error) {
        console.error('Error improving message:', error)
        alert('Failed to improve message')
      } finally {
        isImproving.value = false
      }
    }
    
    // Initialize form for reply or forward
    const initializeForm = async () => {
      if (!route.query.id) return
      
      try {
        // In a real app, this would fetch the email from the API
        // For now, we'll use mock data
        const emails = [
          {
            id: 1,
            sender: 'John Doe',
            senderEmail: 'john.doe@example.com',
            recipients: ['me@example.com'],
            subject: 'Project Update - Q2 Goals',
            content: 'Hi team,\n\nI wanted to share an update on our Q2 goals and progress so far. We\'ve made significant strides in the following areas:\n\n- Completed the new user onboarding flow\n- Improved conversion rates by 15%\n- Launched the mobile app redesign\n\nLet\'s discuss these in our next meeting.\n\nBest,\nJohn',
            date: new Date(2025, 3, 4, 14, 30)
          },
          {
            id: 2,
            sender: 'Sarah Johnson',
            senderEmail: 'sarah.johnson@example.com',
            recipients: ['me@example.com'],
            subject: 'Meeting Agenda - Tomorrow',
            content: 'Hello,\n\nHere\'s the agenda for tomorrow\'s meeting:\n\n1. Project status updates\n2. Resource allocation for Q3\n3. Client feedback discussion\n4. AOB\n\nPlease come prepared with your updates.\n\nRegards,\nSarah',
            date: new Date(2025, 3, 4, 11, 15)
          }
        ]
        
        const email = emails.find(e => e.id === parseInt(route.query.id))
        if (!email) return
        
        emailData.value = email
        
        if (isReply.value) {
          to.value = email.senderEmail
          subject.value = `Re: ${email.subject}`
          message.value = `\n\nOn ${email.date.toLocaleString()}, ${email.sender} <${email.senderEmail}> wrote:\n\n${email.content.split('\n').map(line => `> ${line}`).join('\n')}`
        } else if (isForward.value) {
          subject.value = `Fwd: ${email.subject}`
          message.value = `\n\n---------- Forwarded message ---------\nFrom: ${email.sender} <${email.senderEmail}>\nDate: ${email.date.toLocaleString()}\nSubject: ${email.subject}\nTo: ${email.recipients.join(', ')}\n\n${email.content}`
        }
      } catch (error) {
        console.error('Error initializing form:', error)
      }
    }
    
    onMounted(() => {
      initializeForm()
    })
    
    return {
      to,
      cc,
      bcc,
      subject,
      message,
      intent,
      showCcBcc,
      isGenerating,
      isImproving,
      isSending,
      isReply,
      isForward,
      goBack,
      saveDraft,
      sendEmail,
      generateDraft,
      improveMessage
    }
  }
}
</script>
