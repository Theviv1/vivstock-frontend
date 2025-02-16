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
            <table class="w-full bg-[#1A1A1A] rounded-lg">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="px-4 py-2 text-left">User</th>
                  <th class="px-4 py-2 text-left">Email</th>
                  <th class="px-4 py-2 text-left">Status</th>
                  <th class="px-4 py-2 text-left">Fixed Balance</th>
                  <th class="px-4 py-2 text-left">Users Profit</th>
                  <th class="px-4 py-2 text-left">Actions</th>
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
                      <span>{{ user.username }}</span>
                    </div>
                  </td>
                  <td class="px-2 py-1">{{ user.email }}</td>
                  <td class="px-2 py-1">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs',
                        user.is_banned
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-green-500/20 text-green-500'
                      ]"
                    >
                      {{ user.is_banned ? 'Banned' : 'Active' }}
                    </span>
                  </td>
                  <td class="px-9 py-1">
                    ${{ user.balance?.toFixed(2) }}
                  </td>
                  <td class="px-7 py-1">
                    ${{ user.Profit?.toFixed(2) }}
                  </td>
                  <td class="px-2 py-1">
                    <div class="flex gap-2">
                      <button
                        v-if="user.is_banned"
                        @click="openModal(user.id, 'unban')"
                        class="p-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                        title="Unban User"
                      >
                        <i class="bi-check text-base"></i>
                      </button>
                      <button
                        v-else
                        @click="openModal(user.id, 'ban')"
                        class="p-1.5 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                        title="Ban User"
                      >
                        <i class="bi-ban text-base"></i>
                      </button>
                      <button
                        @click="openModal(user.id, 'delete')"
                        class="p-1.5 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                        title="Delete User"
                      >
                        <i class="bi-trash text-base"></i>
                      </button>
                      <button
                        @click="viewDetails(user.id)"
                        class="p-1.5 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30"
                        title="View Details"
                      >
                        <i class="bi-gear text-base"></i>
                      </button>
                      <!-- New buttons for funding and deducting balance -->
                      <button
                        @click="openModal(user.id, 'fund')"
                        class="p-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                        title="Fund User"
                      >
                        <i class="bi-plus-circle text-base"></i>
                      </button>
                      <button
                        @click="openModal(user.id, 'deduct')"
                        class="p-1.5 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/30"
                        title="Deduct Balance"
                      >
                        <i class="bi-dash-circle text-base"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Confirmation Modal -->
          <div
            v-if="isModalOpen"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div class="bg-[#1A1A1A] p-6 rounded-lg w-96">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold">Confirm Action</h2>
                <i class="bi bi-x cursor-pointer" @click="cancelAction"></i>
              </div>
              <p class="mt-4">
                Are you sure you want to
                <span v-if="action === 'deduct'">
                  deduct balance from
                </span>
                <span v-else-if="action === 'fund'">
                  fund
                </span>
                <span v-else>
                  {{ action }}
                </span>
                this user?
              </p>
              <div class="mt-6 flex justify-between">
                <button
                  class="bg-gray-600 text-white p-2 rounded-lg"
                  @click="cancelAction"
                >
                  Cancel
                </button>
                <button
                  class="bg-red-500 text-white p-2 rounded-lg"
                  @click="confirmAction"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          <!-- Amount Modal for Fund/Deduct -->
          <div
            v-if="isAmountModalOpen"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div class="bg-[#1A1A1A] p-6 rounded-lg w-96">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold">
                  {{ action === 'fund' ? 'Fund User' : 'Deduct Balance' }}
                </h2>
                <i class="bi bi-x cursor-pointer" @click="cancelAmountAction"></i>
              </div>
              <p class="mt-4">
                Enter the amount you want to
                <span v-if="action === 'fund'">fund</span>
                <span v-else>deduct</span>
                :
              </p>
              <div class="mt-4">
                <input
                  type="number"
                  v-model="transactionAmount"
                  class="w-full bg-[#1A1A1A] px-4 py-2 rounded-lg"
                  placeholder="Enter amount"
                />
              </div>
              <div class="mt-6 flex justify-between">
                <button
                  class="bg-gray-600 text-white p-2 rounded-lg"
                  @click="cancelAmountAction"
                >
                  Cancel
                </button>
                <button
                  :class="[
                    action === 'fund' ? 'bg-green-500' : 'bg-red-500',
                    'text-white p-2 rounded-lg'
                  ]"
                  @click="confirmTransactionAmount"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          <!-- User Details Modal -->
          <div
            v-if="isDetailsOpen"
            class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div class="bg-[#1A1A1A] p-6 rounded-lg w-96">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold">User Details</h2>
                <i class="bi bi-x cursor-pointer" @click="closeDetails"></i>
              </div>
              <div class="mt-4">
                <p>
                  <strong>Username:</strong> {{ currentUser.username }}
                </p>
                <p>
                  <strong>Email:</strong> {{ currentUser.email }}
                </p>
                <p>
                  <strong>Referal Balance:</strong>
                  {{ currentUser.referal_balance }}
                </p>
                <p>
                  <strong>Refered By:</strong>
                  {{ currentUser.refered_by }}
                </p>
                <p>
                  <strong>Total Withdrawals:</strong>
                  {{ currentUser.Withdrawals }}
                </p>
                <p>
                  <strong>Status:</strong>
                  {{ currentUser.is_banned ? 'Banned' : 'Active' }}
                </p>
                <p>
                  <strong>Main Balance:</strong>
                  ${{ currentUser.balance?.toFixed(2) }}
                </p>
                <p>
                  <strong>Referal Balance:</strong>
                  ${{ currentUser.referalWithdrawal?.toFixed(2) }}
                </p>
              </div>
              <div class="mt-6 flex justify-between">
                <button
                  class="bg-gray-600 text-white p-2 rounded-lg"
                  @click="closeDetails"
                >
                  Close
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

const users = ref([
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    is_banned: false,
    referalWithdrawal: 553,
    balance: 100.5,
    refered_by: 'ette',
    referal_balance: 100,
    Withdrawals: 100.0,
    Profit: 100.0
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    is_banned: false,
    referalWithdrawal: 5153,
    balance: 200.75,
    refered_by: 'ette',
    referal_balance: 1040,
    Withdrawals: 1100.0,
    Profit: 1212.0
  },
  {
    id: 3,
    username: 'alex_wong',
    email: 'alex@example.com',
    is_banned: false,
    referalWithdrawal: 5533,
    balance: 150.0,
    refered_by: 'ette',
    referal_balance: 100,
    Withdrawals: 100.0,
    Profit: 232.0
  }
])

const searchTerm = ref('')
const isModalOpen = ref(false)
const isDetailsOpen = ref(false)
const isAmountModalOpen = ref(false)
const action = ref('')
const currentUser = ref(null)
const transactionAmount = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const openModal = (userId, actionType) => {
  const user = users.value.find((u) => u.id === userId)
  if (!user) return
  currentUser.value = user
  action.value = actionType
  isModalOpen.value = true
}

const cancelAction = () => {
  isModalOpen.value = false
}

const confirmAction = () => {
  if (!currentUser.value) return

  if (action.value === 'ban') {
    currentUser.value.is_banned = true
    toast.success('User banned successfully')
    isModalOpen.value = false
  } else if (action.value === 'unban') {
    currentUser.value.is_banned = false
    toast.success('User unbanned successfully')
    isModalOpen.value = false
  } else if (action.value === 'delete') {
    users.value = users.value.filter((u) => u.id !== currentUser.value.id)
    toast.success('User deleted successfully')
    isModalOpen.value = false
  } else if (action.value === 'fund' || action.value === 'deduct') {
    isModalOpen.value = false
    transactionAmount.value = ''
    isAmountModalOpen.value = true
  }
}

const confirmTransactionAmount = () => {
  if (!currentUser.value) return

  let amount = Number(transactionAmount.value)
  if (isNaN(amount) || amount <= 0) {
    toast.error('Please enter a valid amount')
    return
  }

  if (action.value === 'fund') {
    currentUser.value.balance = Number(currentUser.value.balance) + amount
    toast.success('User funded successfully')
  } else if (action.value === 'deduct') {
    currentUser.value.balance = Number(currentUser.value.balance) - amount
    toast.success('User balance deducted successfully')
  }
  isAmountModalOpen.value = false
}

const cancelAmountAction = () => {
  isAmountModalOpen.value = false
}

const viewDetails = (userId) => {
  const user = users.value.find((u) => u.id === userId)
  if (user) {
    currentUser.value = user
    isDetailsOpen.value = true
  }
}

const closeDetails = () => {
  isDetailsOpen.value = false
}
</script>
