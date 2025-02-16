<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>
      <div class="lg:pl-64 p-6">
        <AdminHeader>
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-2">KYC Verification</h1>
            <p class="text-gray-400">Total KYC Requests: {{ kycRequests.length }}</p>
          </div>

          <div class="mb-6">
            <div class="relative">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Search KYC requests..."
                class="w-full bg-[#1A1A1A] px-4 py-2 pl-10 rounded-lg"
              />
              <i class="bi-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <div class="overflow-x-auto">
            <h2>KYC Requests</h2>
            <table class="w-full bg-[#1A1A1A] rounded-lg">
              <thead>
                <tr class="border-b border-gray-700">
                  <th class="px-2 py-2 text-left border-r border-white">User</th>
                  <th class="px-2 py-2 text-left border-r border-white">Name</th>
                  <th class="px-2 py-2 text-left border-r border-white">Country</th>
                  <th class="px-2 py-2 text-left border-r border-white">Phone</th>
                  <th class="px-2 py-2 text-left border-r border-white">Address</th>
                  <th class="px-2 py-2 text-left border-r border-white">Status</th>
                  <th class="px-2 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="request in filteredKYCRequests"
                  :key="request.id"
                  class="border-b border-gray-700"
                >
                  <td class="px-2 py-2 border-r border-white">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-[#7F3DFF] rounded-full flex items-center justify-center">
                        {{ request.username?.charAt(0).toUpperCase() }}
                      </div>
                      <span>{{ request.username }}</span>
                    </div>
                  </td>
                  <td class="px-2 py-2 border-r border-white">{{ request.Name }}</td>
                  <td class="px-2 py-2 border-r border-white">{{ request.country }}</td>
                  <td class="px-2 py-2 border-r border-white">{{ request.Phone }}</td>
                  <td class="px-2 py-2 border-r border-white">{{ request.Address }}</td>
                  <td class="px-2 py-2 border-r border-white">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs',
                        request.status === 'verified'
                          ? 'bg-green-500/20 text-green-500'
                          : request.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-red-500/20 text-red-500'
                      ]"
                    >
                      {{ request.status }}
                    </span>
                  </td>
                  <td class="px-2 py-2">
                    <div class="flex gap-2">
                      <button
                        v-if="request.status === 'pending'"
                        @click="showConfirmationModal('verify', request.id)"
                        class="p-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30"
                        title="Verify KYC"
                      >
                        Accept
                      </button>
                      <button
                        @click="showConfirmationModal('delete', request.id)"
                        class="p-1.5 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                        title="Delete KYC"
                      >
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

      <!-- Confirmation Modal -->
      <div
        v-if="isModalVisible"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-[#2C2C2C] p-6 rounded-lg w-1/3 relative">
          <h3 class="text-xl text-white mb-4">
            Are you sure you want to {{ action }} this KYC request?
          </h3>
          <div class="flex justify-end gap-4">
            <button
              @click="cancelAction"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              @click="confirmAction"
              :class="[confirmButtonClass, 'px-4 py-2 rounded-lg']"
            >
              Confirm
            </button>
          </div>
          <i
            class="bi-x absolute right-0 top-[-91px] text-white cursor-pointer"
            @click="cancelAction"
          ></i>
        </div>
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

// Hardcoded KYC data
const kycRequests = ref([
  {
    id: 1,
    username: 'john_doe',
    Name: 'John main Doe',
    Phone: '069484008',
    email: 'john@example.com',
    status: 'pending',
    document: 'ID Card',
    country: 'US',
    Address: '456 Elm Street'
  },
  {
    id: 2,
    username: 'jane_smith',
    Name: 'jane loner smith',
    Phone: '069484008',
    email: 'jane@example.com',
    status: 'pending',
    document: 'Passport',
    country: 'Nigeria',
    Address: '123 Main Street Suite'
  },
  {
    id: 3,
    username: 'alex_wong',
    Name: 'alex de wong',
    Phone: '069484008',
    email: 'alex@example.com',
    status: 'pending',
    document: "Driver's License",
    country: 'United States of America',
    Address: '123 secondary Street Suite'
  }
])

const searchTerm = ref('')
const isModalVisible = ref(false)
const action = ref('')
const requestId = ref(null)

const filteredKYCRequests = computed(() => {
  return kycRequests.value.filter(request =>
    request.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    request.email?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const showConfirmationModal = (actionType, id) => {
  action.value = actionType
  requestId.value = id
  isModalVisible.value = true
}

const cancelAction = () => {
  isModalVisible.value = false
}

const confirmAction = () => {
  if (!requestId.value) return

  const request = kycRequests.value.find(r => r.id === requestId.value)
  if (!request) return

  switch (action.value) {
    case 'verify':
      request.status = 'verified'
      break
    case 'reject':
      request.status = 'rejected'
      break
    case 'delete':
      kycRequests.value = kycRequests.value.filter(r => r.id !== requestId.value)
      break
  }

  toast.success(`KYC request ${action.value}ed successfully`)
  cancelAction()
}

const confirmButtonClass = computed(() => {
  // For a 'verify' action, use green; for all other actions, use red.
  return action.value === 'verify'
    ? 'bg-green-600 hover:bg-green-500 text-white'
    : 'bg-red-600 hover:bg-red-500 text-white'
})
</script>
