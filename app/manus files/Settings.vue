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
        <h1 class="text-lg font-medium text-gray-900">Settings</h1>
      </div>
    </div>
    
    <!-- Settings content -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Account</h2>
        
        <div class="flex items-center mb-6">
          <div class="flex-shrink-0">
            <div class="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span class="text-primary-700 font-medium">{{ userInitials }}</span>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-900">{{ user.name || 'User' }}</p>
            <p class="text-sm text-gray-500">{{ user.email }}</p>
          </div>
          <div class="ml-auto">
            <button 
              @click="openAccountPage"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Manage Account
            </button>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-medium text-gray-900">Subscription</p>
              <p class="text-sm text-gray-500">{{ subscriptionInfo }}</p>
            </div>
            <button 
              @click="openSubscriptionPage"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Manage Subscription
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Connected Mailboxes</h2>
        
        <div v-if="mailboxes.length === 0" class="text-center py-4">
          <p class="text-sm text-gray-500">No mailboxes connected</p>
          <button 
            @click="connectMailbox"
            class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Connect Mailbox
          </button>
        </div>
        
        <div v-else>
          <div 
            v-for="mailbox in mailboxes" 
            :key="mailbox.id"
            class="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ mailbox.name }}</p>
                <p class="text-sm text-gray-500">{{ mailbox.email }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2',
                  mailbox.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ mailbox.status === 'connected' ? 'Connected' : 'Syncing' }}
              </span>
              <button 
                @click="() => disconnectMailbox(mailbox.id)"
                class="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="mt-4">
            <button 
              @click="connectMailbox"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Connect Another Mailbox
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Application Settings</h2>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Dark Mode</p>
              <p class="text-sm text-gray-500">Use dark theme for the application</p>
            </div>
            <button 
              @click="toggleDarkMode"
              :class="[
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                darkMode ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span 
                :class="[
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                ]"
              ></span>
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Notifications</p>
              <p class="text-sm text-gray-500">Receive desktop notifications for new emails</p>
            </div>
            <button 
              @click="toggleNotifications"
              :class="[
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                notifications ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span 
                :class="[
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  notifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              ></span>
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Auto-start</p>
              <p class="text-sm text-gray-500">Launch application on system startup</p>
            </div>
            <button 
              @click="toggleAutoStart"
              :class="[
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                autoStart ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span 
                :class="[
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  autoStart ? 'translate-x-5' : 'translate-x-0'
                ]"
              ></span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          Version 0.1.0
        </div>
        <button 
          @click="logout"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/tauri'

export default {
  name: 'Settings',
  setup() {
    const router = useRouter()
    
    // User data
    const user = ref({
      name: 'John Doe',
      email: 'john.doe@example.com'
    })
    
    // Subscription data
    const subscription = ref({
      plan: 'Pro',
      status: 'active',
      renewalDate: new Date(2025, 4, 15)
    })
    
    // Mailboxes
    const mailboxes = ref([
      {
        id: 1,
        name: 'Personal Gmail',
        email: 'john.doe@gmail.com',
        provider: 'gmail',
        status: 'connected'
      },
      {
        id: 2,
        name: 'Work Outlook',
        email: 'john.doe@company.com',
        provider: 'outlook',
        status: 'connected'
      }
    ])
    
    // Settings
    const darkMode = ref(false)
    const notifications = ref(true)
    const autoStart = ref(false)
    
    // Computed properties
    const userInitials = computed(() => {
      if (!user.value.name) return ''
      return user.value.name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
    })
    
    const subscriptionInfo = computed(() => {
      if (!subscription.value) return 'No active subscription'
      
      const renewalDate = subscription.value.renewalDate.toLocaleDateString()
      return `${subscription.value.plan} Plan - Renews on ${renewalDate}`
    })
    
    // Methods
    const goBack = () => {
      router.push('/mailbox')
    }
    
    const openAccountPage = () => {
      // Open account page in browser
      invoke('open_browser', { url: 'https://moringa.app/dashboard' })
    }
    
    const openSubscriptionPage = () => {
      // Open subscription page in browser
      invoke('open_browser', { url: 'https://moringa.app/dashboard/subscriptions' })
    }
    
    const connectMailbox = () => {
      // In a real app, this would open a dialog to connect a new mailbox
      alert('This would open a dialog to connect a new mailbox')
    }
    
    const disconnectMailbox = (id) => {
      // In a real app, this would disconnect the mailbox
      if (confirm('Are you sure you want to disconnect this mailbox?')) {
        mailboxes.value = mailboxes.value.filter(mailbox => mailbox.id !== id)
      }
    }
    
    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
      // In a real app, this would update the theme
    }
    
    const toggleNotifications = () => {
      notifications.value = !notifications.value
      // In a real app, this would update the notification settings
    }
    
    const toggleAutoStart = () => {
      autoStart.value = !autoStart.value
      // In a real app, this would update the auto-start settings
    }
    
    const logout = () => {
      // Clear local storage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      
      // Redirect to login
      router.push('/login')
    }
    
    onMounted(() => {
      // In a real app, this would fetch user data, subscription, and mailboxes from the API
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    })
    
    return {
      user,
      subscription,
      mailboxes,
      darkMode,
      notifications,
      autoStart,
      userInitials,
      subscriptionInfo,
      goBack,
      openAccountPage,
      openSubscriptionPage,
      connectMailbox,
      disconnectMailbox,
      toggleDarkMode,
      toggleNotifications,
      toggleAutoStart,
      logout
    }
  }
}
</script>
