<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>
      <div class="lg:pl-64 p-6">
        <AdminHeader>
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-2">Users Deposits</h1>
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
                  <th class="px-2 py-1 text-left">Amount</th>
                  <th class="px-2 py-1 text-left">Prove</th>
                  <th class="px-2 py-1 text-left">Type</th>
                  <th class="px-2 py-1 text-left">Status</th>
                  <th class="px-2 py-1 text-right">Actions</th>
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
                  <td class="px-2 py-1 text-sm">
                    ${{ user.amount?.toFixed(2) }}
                  </td>
                  <td class="px-2 py-1 text-sm">
                    ${{ user.prove }}
                  </td>
                  <td class="px-2 py-1 text-sm">
                    ${{ user.Type }}
                  </td>
                  <td
                    class="px-2 py-1 "
                    @click="toggleStatus(user)"
                  >
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs',
                        user.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : user.status === 'processing'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-green-500/20 text-green-500'
                      ]"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-2 py-1">
                    <div class="flex gap-2 justify-end">
                      <button
                        @click="openConfirmModal(user.id, 'approve')"
                        class="p-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                        title="Approve"
                      >
                        <i class="bi bi-check-circle-fill text-base"></i>
                        Approve
                      </button>
                      <button
                        @click="openConfirmModal(user.id, 'reject')"
                        class="p-1.5 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                        title="Reject"
                      >
                        <i class="bi bi-x-circle-fill text-base"></i>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </AdminHeader>
      </div>
    </AdminNavLayout>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-[#1A1A1A] p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 class="text-lg font-semibold mb-4">Confirm Action</h3>
        <p class="mb-4">
          Are you sure you want to
          <span class="capitalize">{{ pendingAction.action }}</span>
          this Deposit?
        </p>
        <div class="flex justify-end gap-4">
          <button
            @click="cancelConfirmModal"
            class="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            @click="executeConfirmAction"
            :class="confirmButtonClass + ' px-4 py-2 rounded hover:opacity-90'"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import AdminHeader from '../../Layout/adminHeader.vue'
import AdminNavLayout from '../../Layout/adminNavLayout.vue'

// Hardcoded users data
const users = ref([
  {
    id: 1,
    username: 'john doe',
    amount: 1231,
    bank_name: 'first Bank',
    account_name: 'John doe',
    account_number: '1234567890',
    status: 'pending',
    Type: 'crypto',
    prove: 'screenshot',
  },
  {
    id: 2,
    username: 'jane doe',
    account_name: 'jane doe',
    bank_name: 'keystone Bank',
    account_number: '9876543210',
    status: 'pending',
    amount: 250.25,
    prove: 'screenshot',
    Type: 'crypto',
  },
  {
    id: 3,
    username: 'bob_smith',
    amount: 334.84,
    bank_name: 'yes bank',
    account_name: 'bob smith',
    account_number: '0987654321',
    status: 'pending',
    prove: 'screenshot',
    Type: 'Bank',
  },
  {
    id: 4,
    username: 'emily_wilson',
    bank_name: 'citibank',
    account_name: 'emily wilson',
    account_number: '2345678901',
    status: 'pending',
    amount: 500.5,
    prove: 'screenshot',
    Type: 'Bank',
  },
  {
    id: 5,
    username: 'tom_jones',
    amount: 120.75,
    bank_name: 'assets bank',
    account_name: 'tom jones',
    account_number: '3456789012',
    status: 'pending',
    prove: 'screenshot',
    Type: 'Crypto',
  },
])

const searchTerm = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.account_name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const toggleStatus = (user) => {
  if (user.status === 'pending') {
   
  } else if (user.status === 'processing') {
    // Additional status handling if needed
  } else if (user.status === 'completed') {
    // Additional status handling if needed
  }
}

const handleAction = async (userId, action) => {
  try {
    const user = users.value.find((u) => u.id === userId)
    if (!user) throw new Error('User not found')

    switch (action) {
      case 'approve':
        user.status = 'completed'
        break
      case 'reject':
        user.status = 'rejected'
        break
    }

    toast.success(`User ${action}d successfully`)
  } catch (error) {
    console.error(`Error ${action}ing user:`, error)
    toast.error(`Failed to ${action} user`)
  }
}

// Confirmation modal state and methods
const showConfirmModal = ref(false)
const pendingAction = ref({ userId: null, action: '' })

const openConfirmModal = (userId, action) => {
  pendingAction.value = { userId, action }
  showConfirmModal.value = true
}

const cancelConfirmModal = () => {
  pendingAction.value = { userId: null, action: '' }
  showConfirmModal.value = false
}

const executeConfirmAction = async () => {
  await handleAction(pendingAction.value.userId, pendingAction.value.action)
  cancelConfirmModal()
}

const confirmButtonClass = computed(() => {
  return pendingAction.value.action === 'approve'
    ? 'bg-green-600 hover:bg-green-500 text-white'
    : 'bg-red-600 hover:bg-red-500 text-white'
})
</script>
