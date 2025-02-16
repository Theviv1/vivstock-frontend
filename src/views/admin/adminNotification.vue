<template>
  <AdminNavLayout>
    <div class="lg:pl-64 p-6 min-h-screen bg-gray-900">
      <AdminHeader>
        <div class="max-w-3xl mx-auto">
          <!-- User Notifications Section -->
          <h1 class="text-2xl font-bold text-white mb-8">User Notifications</h1>
          
          <!-- Search Section -->
          <div class="mb-6">
            <div class="relative">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Search users..."
                class="w-full bg-gray-800 px-4 py-3 pl-12 rounded-lg border border-gray-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900 text-white placeholder-gray-400 transition-all"
              />
              <i class="bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <!-- User Results -->
          <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-6">
            <div class="max-h-96 overflow-y-auto p-4">
              <template v-if="searchTerm">
                <div 
                  v-for="user in filteredUsers" 
                  :key="user.id"
                  class="p-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-white">{{ user.name }}</p>
                      <p class="text-sm text-gray-300">{{ user.email }}</p>
                    </div>
                    <span class="bi-chevron-right text-gray-400"></span>
                  </div>
                </div>
              </template>
              <div v-else class="text-center p-6">
                <p class="text-gray-400">Start typing to search users</p>
              </div>
            </div>
          </div>

          <!-- Notification Actions for Individual Users -->
          <div class="bg-gray-800 p-4 rounded-lg mb-12">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-300 mb-2">Notification Message</label>
              <textarea 
                rows="4"
                v-model="notificationMessage"
                class="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900 placeholder-gray-400 transition-all"
                placeholder="Type your notification message here..."
              ></textarea>
            </div>
            
            <div class="flex justify-end">
              <button 
                @click="sendNotification"
                class="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
              >
                <i class="bi-send"></i>
                Send Notification
              </button>
            </div>
          </div>

          <!-- Bulk Notifications Section -->
          <h1 class="text-2xl font-bold text-white mb-8">Bulk Notifications</h1>
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-300 mb-2">Bulk Notification Message</label>
              <textarea 
                rows="4"
                v-model="bulkMessage"
                class="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-900 placeholder-gray-400 transition-all"
                placeholder="Type your bulk notification message here..."
              ></textarea>
            </div>
            
            <div class="flex justify-end">
              <button 
                @click="sendBulkNotification"
                class="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
              >
                <i class="bi-send"></i>
                Send Bulk Notification
              </button>
            </div>
          </div>
        </div>
      </AdminHeader>
    </div>
  </AdminNavLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminNavLayout from '../../Layout/adminNavLayout.vue'
import AdminHeader from '../../Layout/adminheader.vue'

// Dummy data and logic for demonstration purposes.
const searchTerm = ref('')
const notificationMessage = ref('')
const bulkMessage = ref('')

// Sample users for filtering (replace with real data as needed)
const users = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' }
])

const filteredUsers = computed(() => {
  if (!searchTerm.value) return []
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const sendNotification = () => {
  // Implement individual notification sending logic
  console.log('Sending individual notification:', notificationMessage.value)
  // Reset the message if needed
  notificationMessage.value = ''
}

const sendBulkNotification = () => {
  // Implement bulk notification sending logic
  console.log('Sending bulk notification:', bulkMessage.value)
  // Reset the bulk message if needed
  bulkMessage.value = ''
}
</script>

<style scoped>
/* Add any additional styling as needed */
</style>
