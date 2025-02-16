<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>

    
    <div class="lg:pl-64 p-6">
      <AdminHeader>
        <div class="mb-8">
          <h1 class="text-2xl font-bold mb-2">Users Management</h1>
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
            
              
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="border-b border-gray-700"
              >
                <td class="px-2 py-1">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-[#7F3DFF] rounded-full flex items-center justify-center"
                    >
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
                    {{ user.is_Accepted ? 'Unverified' : 'Verified' }}
                  </span>
                </td>
         
              </tr>
            </tbody>
          </table>
        </div>
      </AdminHeader>
    </div>

    <!-- Confirmation Modal -->
    <transition name="fade">
      <div
        v-if="showConfirmationModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-[#1A1A1A] p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 class="text-xl font-bold mb-4">Confirm Action</h3>
          <p class="mb-6">{{ confirmationMessage }}</p>
          <div class="flex justify-end gap-3">
            <button
              @click="cancelAction"
              class="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              @click="confirmAction"
              class="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </transition>
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
    is_Accepted: true,
    balance: 100.5,
    Profit: 50.25
  },
  {
    id: 2,
    username: 'doe',
    email: 'john@example.com',
    is_Accepted: true,
    balance: 100.5,
    Profit: 510.25
  },
  {
    id: 3,
    username: 'doe',
    email: 'john@example.com',
    is_Accepted: true,
    balance: 100.5,
    Profit: 450.25
  },
  {
    id: 4,
    username: 'jhon smith',
    email: 'jane@example.com',
    is_Accepted: true,
    balance: 200.75,
    Profit: 100.5
  },
  {
    id: 5,
    username: 'alex_thahenk',
    email: 'alex@example.com',
    is_Accepted: true,
    balance: 150.0,
    Profit: 150.25
  }
])

const searchTerm = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Modal state variables
const showConfirmationModal = ref(false)
const pendingAction = ref('')
const pendingUserId = ref(null)

const confirmationMessage = computed(() => {
  const action = pendingAction.value
  if (action === 'Accept') return 'Are you sure you want to accept this user?'
  if (action === 'reject') return 'Are you sure you want to reject this user?'
  if (action === 'delete') return 'Are you sure you want to delete this user?'
  return ''
})

// Opens the modal and sets the pending action and user
const openConfirmationModal = (userId, action) => {
  pendingUserId.value = userId
  pendingAction.value = action
  showConfirmationModal.value = true
}

const cancelAction = () => {
  showConfirmationModal.value = false
  pendingAction.value = ''
  pendingUserId.value = null
}

// Executes the confirmed action
const confirmAction = async () => {
  try {
    const user = users.value.find((u) => u.id === pendingUserId.value)
    if (!user) throw new Error('User not found')

    switch (pendingAction.value) {
      case 'reject':
        user.is_Accepted = true
        break
      case 'Accept':
        user.is_Accepted = false
        break
      case 'delete':
        users.value = users.value.filter((u) => u.id !== pendingUserId.value)
        break
    }

    toast.success(`User ${pendingAction.value}ned successfully`)
  } catch (error) {
    console.error(`Error ${pendingAction.value}ing user:`, error)
    toast.error(`Failed to ${pendingAction.value} user`)
  } finally {
    cancelAction()
  }
}
</script>

<style scoped>
/* Optional fade transition for modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
