<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <!-- App header -->
      <div class="h-16 flex items-center px-4 border-b border-gray-200">
        <h1 class="text-xl font-semibold text-primary-600">Moringa</h1>
      </div>
      
      <!-- Mailbox list -->
      <div class="flex-1 overflow-y-auto p-2">
        <div class="mb-4">
          <h2 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mailboxes</h2>
          <div class="mt-2 space-y-1">
            <button 
              v-for="mailbox in mailboxes" 
              :key="mailbox.id"
              @click="selectMailbox(mailbox)"
              :class="[
                'flex items-center w-full px-3 py-2 text-sm rounded-md',
                selectedMailbox?.id === mailbox.id ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <span class="truncate">{{ mailbox.name }}</span>
              <span class="ml-auto text-xs text-gray-500">{{ mailbox.unread }}</span>
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <h2 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Folders</h2>
          <div class="mt-2 space-y-1">
            <button 
              v-for="folder in folders" 
              :key="folder.id"
              @click="selectFolder(folder)"
              :class="[
                'flex items-center w-full px-3 py-2 text-sm rounded-md',
                selectedFolder?.id === folder.id ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <span class="truncate">{{ folder.name }}</span>
              <span v-if="folder.unread" class="ml-auto text-xs text-gray-500">{{ folder.unread }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="p-4 border-t border-gray-200">
        <button 
          @click="goToCompose"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Compose
        </button>
        
        <button 
          @click="goToSettings"
          class="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Settings
        </button>
      </div>
    </div>
    
    <!-- Email list -->
    <div class="w-80 border-r border-gray-200 flex flex-col">
      <!-- Search bar -->
      <div class="h-16 flex items-center px-4 border-b border-gray-200">
        <input 
          type="text" 
          placeholder="Search emails..." 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <!-- Email list -->
      <div class="flex-1 overflow-y-auto">
        <div 
          v-for="email in emails" 
          :key="email.id"
          @click="selectEmail(email)"
          :class="[
            'border-b border-gray-200 px-4 py-3 cursor-pointer',
            selectedEmail?.id === email.id ? 'bg-primary-50' : 'hover:bg-gray-50',
            email.unread ? 'font-semibold' : ''
          ]"
        >
          <div class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-900 truncate">{{ email.sender }}</span>
            <span class="text-xs text-gray-500">{{ formatDate(email.date) }}</span>
          </div>
          <div class="mt-1 text-sm text-gray-900 truncate">{{ email.subject }}</div>
          <div class="mt-1 text-xs text-gray-500 truncate">{{ email.preview }}</div>
        </div>
        
        <div v-if="emails.length === 0" class="p-4 text-center text-gray-500">
          No emails found
        </div>
      </div>
    </div>
    
    <!-- Email content -->
    <div class="flex-1 flex flex-col">
      <!-- Email header -->
      <div v-if="selectedEmail" class="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900 truncate">{{ selectedEmail.subject }}</h2>
        <div class="flex space-x-2">
          <button 
            class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            title="Reply"
            @click="replyToEmail"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            title="Forward"
            @click="forwardEmail"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <button 
            class="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            title="Delete"
            @click="deleteEmail"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Email content -->
      <div v-if="selectedEmail" class="flex-1 overflow-y-auto p-6">
        <div class="mb-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-600 font-medium">{{ getInitials(selectedEmail.sender) }}</span>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ selectedEmail.sender }}</p>
              <p class="text-sm text-gray-500">{{ selectedEmail.senderEmail }}</p>
              <p class="text-sm text-gray-500">To: {{ selectedEmail.recipients.join(', ') }}</p>
              <p class="text-sm text-gray-500">{{ formatFullDate(selectedEmail.date) }}</p>
            </div>
          </div>
        </div>
        
        <div class="prose max-w-none" v-html="selectedEmail.content"></div>
      </div>
      
      <div v-else class="flex-1 flex items-center justify-center text-gray-500">
        Select an email to view
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Mailbox',
  setup() {
    const router = useRouter()
    const mailboxes = ref([
      { id: 1, name: 'Personal Gmail', unread: 3 },
      { id: 2, name: 'Work Outlook', unread: 5 }
    ])
    const folders = ref([
      { id: 1, name: 'Inbox', unread: 8 },
      { id: 2, name: 'Sent', unread: 0 },
      { id: 3, name: 'Drafts', unread: 0 },
      { id: 4, name: 'Trash', unread: 0 }
    ])
    const emails = ref([
      {
        id: 1,
        sender: 'John Doe',
        senderEmail: 'john.doe@example.com',
        recipients: ['me@example.com'],
        subject: 'Project Update - Q2 Goals',
        preview: 'Hi team, I wanted to share an update on our Q2 goals and progress so far...',
        content: '<p>Hi team,</p><p>I wanted to share an update on our Q2 goals and progress so far. We\'ve made significant strides in the following areas:</p><ul><li>Completed the new user onboarding flow</li><li>Improved conversion rates by 15%</li><li>Launched the mobile app redesign</li></ul><p>Let\'s discuss these in our next meeting.</p><p>Best,<br>John</p>',
        date: new Date(2025, 3, 4, 14, 30),
        unread: true
      },
      {
        id: 2,
        sender: 'Sarah Johnson',
        senderEmail: 'sarah.johnson@example.com',
        recipients: ['me@example.com'],
        subject: 'Meeting Agenda - Tomorrow',
        preview: 'Hello, Here\'s the agenda for tomorrow\'s meeting: 1. Project status updates...',
        content: '<p>Hello,</p><p>Here\'s the agenda for tomorrow\'s meeting:</p><ol><li>Project status updates</li><li>Resource allocation for Q3</li><li>Client feedback discussion</li><li>AOB</li></ol><p>Please come prepared with your updates.</p><p>Regards,<br>Sarah</p>',
        date: new Date(2025, 3, 4, 11, 15),
        unread: true
      },
      {
        id: 3,
        sender: 'Marketing Team',
        senderEmail: 'marketing@example.com',
        recipients: ['me@example.com', 'team@example.com'],
        subject: 'New Campaign Launch',
        preview: 'We\'re excited to announce the launch of our new marketing campaign...',
        content: '<p>Hi everyone,</p><p>We\'re excited to announce the launch of our new marketing campaign next week. The campaign will focus on our premium features and target existing customers for upgrades.</p><p>Key dates:</p><ul><li>April 10: Social media teasers</li><li>April 12: Email campaign</li><li>April 15: Full launch</li></ul><p>Let me know if you have any questions.</p><p>Thanks,<br>Marketing Team</p>',
        date: new Date(2025, 3, 3, 16, 45),
        unread: false
      }
    ])
    
    const selectedMailbox = ref(mailboxes.value[0])
    const selectedFolder = ref(folders.value[0])
    const selectedEmail = ref(null)
    
    const selectMailbox = (mailbox) => {
      selectedMailbox.value = mailbox
      // In a real app, this would fetch emails for the selected mailbox
    }
    
    const selectFolder = (folder) => {
      selectedFolder.value = folder
      // In a real app, this would fetch emails for the selected folder
    }
    
    const selectEmail = (email) => {
      selectedEmail.value = email
      if (email.unread) {
        email.unread = false
        // Update unread counts
        updateUnreadCounts()
      }
    }
    
    const updateUnreadCounts = () => {
      // Count unread emails and update mailbox and folder unread counts
      const unreadCount = emails.value.filter(email => email.unread).length
      selectedMailbox.value.unread = unreadCount
      selectedFolder.value.unread = unreadCount
    }
    
    const formatDate = (date) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday'
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
      }
    }
    
    const formatFullDate = (date) => {
      return date.toLocaleString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const getInitials = (name) => {
      return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
    }
    
    const goToCompose = () => {
      router.push('/compose')
    }
    
    const goToSettings = () => {
      router.push('/settings')
    }
    
    const replyToEmail = () => {
      if (!selectedEmail.value) return
      
      router.push({
        path: '/compose',
        query: {
          action: 'reply',
          id: selectedEmail.value.id
        }
      })
    }
    
    const forwardEmail = () => {
      if (!selectedEmail.value) return
      
      router.push({
        path: '/compose',
        query: {
          action: 'forward',
          id: selectedEmail.value.id
        }
      })
    }
    
    const deleteEmail = () => {
      if (!selectedEmail.value) return
      
      // Remove the email from the list
      emails.value = emails.value.filter(email => email.id !== selectedEmail.value.id)
      selectedEmail.value = null
      
      // Update unread counts
      updateUnreadCounts()
    }
    
    onMounted(() => {
      // In a real app, this would fetch mailboxes, folders, and emails from the API
    })
    
    return {
      mailboxes,
      folders,
      emails,
      selectedMailbox,
      selectedFolder,
      selectedEmail,
      selectMailbox,
      selectFolder,
      selectEmail,
      formatDate,
      formatFullDate,
      getInitials,
      goToCompose,
      goToSettings,
      replyToEmail,
      forwardEmail,
      deleteEmail
    }
  }
}
</script>
