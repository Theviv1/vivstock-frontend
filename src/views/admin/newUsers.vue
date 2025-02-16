<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>

    <div class="lg:pl-64 p-6">
      <AdminHeader>

      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2">New Users</h1>
        <p class="text-gray-400">Total Users: {{ users.length }}</p>
      </div>

      <div class="mb-6">
        <div class="relative">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search users..."
            class="w-full bg-[#1A1A1A] px-4 py-2 pl-10 rounded-lg"
          />
          <i class="bi-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      <div class="overflow-x-auto">
        <h2>New Users</h2>
        <table class="w-full bg-[#1A1A1A] rounded-lg">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="px-2 py-1 text-left">User</th>
              <th class="px-2 py-1 text-left">Email</th>
              <th class="px-2 py-1 text-left">Status</th>
            
              <th class="px-2 py-1 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-gray-700">
              <td class="px-2 py-1">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-[#7F3DFF] rounded-full flex items-center justify-center">
                    {{ user.username?.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm">{{ user.username }}</span>
                </div>
              </td>
              <td class="px-2 py-1 text-sm">{{ user.email }}</td>
              <td class="px-2 py-1">
                <span
                  :class="[ 
                    'px-2 py-1 rounded-full text-xs',
                    user.is_Accepted
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-green-500/20 text-green-500'
                  ]"
                >
                  {{ user.is_Accepted ? 'Rejected' : 'Accepted' }}
                </span>
              </td>
       
              <td class="px-2 py-1">
                <div class="flex gap-2 justify-end">
                  <button
                    v-if="!user.is_Accepted"
                    @click="showConfirmationModal(user.id, 'Accept')"
                    class="p-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                    title="Accept User"
                  >
                    <i class="bi bi-check-circle-fill text-base"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <i class="bi bi-x right-0 relative left-[350px] top-[-70px] " @click="cancelAction"></i>
        <div class="bg-[#1A1A1A] p-6 rounded-lg w-96 text-center">
          <h3 class="text-lg font-bold mb-4">Are you sure you want to accept this user?</h3>
          <div class="flex justify-center gap-4">
            <button @click="handleActionWithConfirmation" class="px-4 py-2 bg-green-500 text-white rounded-lg">
              Yes
            </button>
            <button @click="cancelAction" class="px-4 py-2 bg-gray-500 text-white rounded-lg">
              No
            </button>
          </div>
        </div>
      </div>

    </AdminHeader>
    </div>
  </AdminNavLayout>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import AdminNav from '../../components/admin/AdminNav.vue'
import AdminHeader from '../../Layout/adminHeader.vue'
import AdminNavLayout from '../../Layout/adminNavLayout.vue'

// Hardcoded users data
const users = ref([
  {
    id: 1,
    username: 'doe',
    email: 'john@example.com',
    is_Accepted: false,
    balance: 100.5,
    Profit: 50.25
  },
  {
    id: 2,
    username: 'doe',
    email: 'john@example.com',
    is_Accepted: false,
    balance: 100.5,
    Profit: 502.25
  },
  {
    id: 3,
    username: 'doe',
    email: 'john@example.com',
    is_Accepted: false,
    balance: 100.5,
    Profit: 50.25
  },
  {
    id: 4,
    username: 'jhon smith',
    email: 'jane@example.com',
    is_Accepted: false,
    balance: 200.75,
    Profit: 25.75
  },
  {
    id: 5,
    username: 'alex_thahenk',
    email: 'alex@example.com',
    is_Accepted: false,
    balance: 150.0,
    Profit: 5110.25
  }
])

const searchTerm = ref('')
const showModal = ref(false)
const userIdToAccept = ref(null)

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const showConfirmationModal = (userId, action) => {
  userIdToAccept.value = userId
  showModal.value = true
}

const handleActionWithConfirmation = async () => {
  if (!userIdToAccept.value) return
  try {
    const user = users.value.find((u) => u.id === userIdToAccept.value)
    if (!user) throw new Error('User not found')

    user.is_Accepted = true  // Accept the user
    showModal.value = false
    toast.success('User accepted successfully')
  } catch (error) {
    console.error('Error accepting user:', error)
    toast.error('Failed to accept user')
  }
}

const cancelAction = () => {
  showModal.value = false
  userIdToAccept.value = null
}
</script>
