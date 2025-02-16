<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>
      <div class="lg:pl-64 p-6">
        <AdminHeader>
          <h1 class="text-2xl font-bold mb-6">Transaction Management</h1>
          
          <!-- Search Bar -->
          <div class="mb-6">
            <div class="relative">
              <input
                type="text"
                v-model="transactionSearch"
                placeholder="Search transactions..."
                class="w-full bg-[#1A1A1A] px-4 py-2 pl-10 rounded-lg"
              />
              <i class="bi-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <!-- Two-column layout for Deposit and Withdrawal History -->
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Deposit History Panel -->
            <div class="flex-1 bg-[#1A1A1A] rounded-lg p-2">
              <h2 class="text-xl font-semibold mb-4">Deposit History</h2>
              <div v-if="filteredDepositTransactions.length === 0" class="text-center text-gray-400">
                No deposit transactions found.
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="transaction in filteredDepositTransactions"
                  :key="transaction.id"
                  class="bg-[#111111] rounded-lg p-2"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="font-semibold">{{ transaction.profiles?.username }}</h3>
                      <p class="text-sm text-gray-400">{{ transaction.profiles?.email }}</p>
                      <p class="text-sm text-gray-400">
                        {{ new Date(transaction.created_at).toLocaleString() }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold">${{ transaction.amount.toFixed(2) }}</p>
                      <p class="text-sm text-green-500">
                        {{ transaction.type.toUpperCase() }}
                      </p>
                      <p
                        :class="[
                          'text-sm',
                          transaction.status === 'pending'
                            ? 'text-yellow-500'
                            : transaction.status === 'approved'
                            ? 'text-green-500'
                            : 'text-red-500'
                        ]"
                      >
                        {{ transaction.status.toUpperCase() }}
                      </p>
                    </div>
                  </div>
                  <div v-if="transaction.status === 'pending'" class="flex gap-2">
                    <button
                      @click="handleTransaction(transaction.id, 'approved')"
                      class="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <i class="bi-check"></i>
                      Approve
                    </button>
                    <button
                      @click="handleTransaction(transaction.id, 'rejected')"
                      class="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <i class="bi-x"></i>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Withdrawal History Panel -->
            <div class="flex-1 bg-[#1A1A1A] rounded-lg p-2">
              <h2 class="text-xl font-semibold mb-4">Withdrawal History</h2>
              <div v-if="filteredWithdrawalTransactions.length === 0" class="text-center text-gray-400">
                No withdrawal transactions found.
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="transaction in filteredWithdrawalTransactions"
                  :key="transaction.id"
                  class="bg-[#111111] rounded-lg p-2"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="font-semibold">{{ transaction.profiles?.username }}</h3>
                      <p class="text-sm text-gray-400">{{ transaction.profiles?.email }}</p>
                      <p class="text-sm text-gray-400">
                        {{ new Date(transaction.created_at).toLocaleString() }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold">${{ transaction.amount.toFixed(2) }}</p>
                      <p class="text-sm text-green-500">
                        {{ transaction.type.toUpperCase() }}
                      </p>
                      <p
                        :class="[
                          'text-sm',
                          transaction.status === 'pending'
                            ? 'text-yellow-500'
                            : transaction.status === 'approved'
                            ? 'text-green-500'
                            : 'text-red-500'
                        ]"
                      >
                        {{ transaction.status.toUpperCase() }}
                      </p>
                    </div>
                  </div>
                  <div v-if="transaction.status === 'pending'" class="flex gap-2">
                    <button
                      @click="handleTransaction(transaction.id, 'approved')"
                      class="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <i class="bi-check"></i>
                      Approve
                    </button>
                    <button
                      @click="handleTransaction(transaction.id, 'rejected')"
                      class="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <i class="bi-x"></i>
                      Reject
                    </button>
                  </div>
                </div>
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

// Dummy data for transactions
const transactions = ref([
  {
    id: 1,
    user_id: 1,
    type: 'deposit',
    amount: 100.0,
    status: 'approved',
    created_at: new Date('2023-01-01T10:00:00').toISOString(),
    updated_at: new Date('2023-01-01T10:00:00').toISOString(),
    profiles: { username: 'john_doe', email: 'john@example.com' }
  },
  {
    id: 2,
    user_id: 2,
    type: 'withdrawal',
    amount: 50.0,
    status: 'approved',
    created_at: new Date('2023-01-02T11:00:00').toISOString(),
    updated_at: new Date('2023-01-02T11:00:00').toISOString(),
    profiles: { username: 'jane_smith', email: 'jane@example.com' }
  },
  {
    id: 3,
    user_id: 3,
    type: 'deposit',
    amount: 200.0,
    status: 'approved',
    created_at: new Date('2023-01-03T12:00:00').toISOString(),
    updated_at: new Date('2023-01-03T12:00:00').toISOString(),
    profiles: { username: 'alex_wong', email: 'alex@example.com' }
  },
  {
    id: 4,
    user_id: 1,
    type: 'withdrawal',
    amount: 75.0,
    status: 'rejected',
    created_at: new Date('2023-01-04T13:00:00').toISOString(),
    updated_at: new Date('2023-01-04T13:00:00').toISOString(),
    profiles: { username: 'john_doe', email: 'john@example.com' }
  },
  {
    id: 5,
    user_id: 2,
    type: 'deposit',
    amount: 150.0,
    status: 'approved',
    created_at: new Date('2023-01-05T14:00:00').toISOString(),
    updated_at: new Date('2023-01-05T14:00:00').toISOString(),
    profiles: { username: 'jane_smith', email: 'jane@example.com' }
  }
])

// Search term for filtering transactions
const transactionSearch = ref('')

const filteredDepositTransactions = computed(() => {
  const search = transactionSearch.value.toLowerCase()
  return transactions.value.filter(
    (t) =>
      t.type === 'deposit' &&
      (!search ||
        t.profiles?.username.toLowerCase().includes(search) ||
        t.profiles?.email.toLowerCase().includes(search))
  )
})

const filteredWithdrawalTransactions = computed(() => {
  const search = transactionSearch.value.toLowerCase()
  return transactions.value.filter(
    (t) =>
      t.type !== 'deposit' &&
      (!search ||
        t.profiles?.username.toLowerCase().includes(search) ||
        t.profiles?.email.toLowerCase().includes(search))
  )
})

const handleTransaction = async (id, status) => {
  try {
    const transaction = transactions.value.find((t) => t.id === id)
    if (!transaction) return
    transaction.status = status
    transaction.updated_at = new Date().toISOString()
    if (status === 'approved') {
      if (transaction.type === 'deposit') {
        toast.success('Deposit approved')
      } else if (transaction.type === 'withdrawal') {
        toast.success('Withdrawal approved')
      }
    } else {
      toast.success(`Transaction ${status}`)
    }
  } catch (error) {
    console.error('Error processing transaction:', error)
    toast.error('Failed to process transaction')
  }
}
</script>
