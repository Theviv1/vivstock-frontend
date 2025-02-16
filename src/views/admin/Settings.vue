<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>
      <div class="lg:pl-64 p-6">
        <AdminHeader>
          <h1 class="text-2xl font-bold mb-6">Settings</h1>
          <div class="max-w-2xl">
            <!-- General Settings -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">General Settings</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium">Allow New Signups</h3>
                    <p class="text-sm text-gray-400">
                      Enable or disable new user registrations
                    </p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="settings.allowSignups"
                      class="sr-only peer"
                      @change="updateSettings"
                    />
                    <div
                      class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F3DFF]"
                    ></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="font-medium">Email Verification</h3>
                    <p class="text-sm text-gray-400">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="settings.requireEmailVerification"
                      class="sr-only peer"
                      @change="updateSettings"
                    />
                    <div
                      class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F3DFF]"
                    ></div>
                  </label>
                </div>
              </div>
              <!-- Save Button for General Settings -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('General Settings')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

            <!-- Transaction Settings -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">Minimum Deposit And Withdrawal Settings</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Minimum Deposit Amount ($)
                  </label>
                  <input
                    type="number"
                    v-model="settings.minDeposit"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Minimum Withdrawal Amount ($)
                  </label>
                  <input
                    type="number"
                    v-model="settings.minWithdrawal"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <!-- Save Button for Transaction Settings -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('Transaction Settings')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

            <!-- Profit Settings -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">Stocks And Referal Profit Settings</h2>
              <div class="space-y-4">
                <div class="mb-6">
                  <div class="relative">
                    <!-- Allows admin to search for stocks to approve -->
                    <input
                      type="text"
                      placeholder="Search Stocks..."
                      class="w-full bg-[#1A1A1A] px-4 py-2 pl-10 border-gray-400 rounded-lg"
                    />
                    <i class="bi-search absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Stocks profit (%)
                  </label>
                  <input
                    type="number"
                    v-model="settings.profitSettings"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Referal Profit (%)
                  </label>
                  <input
                    type="number"
                    v-model="settings.referalProfitSettings"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <!-- Save Button for Profit Settings -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('Profit Settings')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

            <!-- Bank Account Details -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">Bank Account Details</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    v-model="settings.accountNumber"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    v-model="settings.accountName"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Bank
                  </label>
                  <input
                    type="text"
                    v-model="settings.bank"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <!-- Save Button for Bank Account Details -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('Bank Account Details')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

            <!-- Crypto Account Details -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">Crypto Account Details</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    LTC Address
                  </label>
                  <input
                    type="text"
                    v-model="settings.ltcAddress"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>
                <!-- LTC QR Code Upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    LTC QR Code
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleQRCodeUpload"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                  <div v-if="settings.ltcQRCode" class="mt-2">
                    <img
                      :src="settings.ltcQRCode"
                      alt="LTC QR Code"
                      class="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
              </div>
              <!-- Save Button for Crypto Account Details -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('Crypto Account Details')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

       

            <!-- Market Opening Time Section -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">Market Opening Time</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Opening Time (in hours)
                  </label>
                  <input
                    type="number"
                    step="1"
                    v-model.number="settings.marketClosingTime"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <!-- Save Button for Market Closing Time -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('Market Closing Time')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
            <!-- Market Closing Time Section -->
            <div class="bg-[#1A1A1A] rounded-lg p-6 mb-6">
              <h2 class="text-xl font-semibold mb-4">Market Closing Time</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">
                    Closing Time (in hours)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    v-model.number="settings.marketClosingTime"
                    class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <!-- Save Button for Market Closing Time -->
              <div class="flex justify-end mt-4">
                <button
                  @click="openConfirmationModal('Market Closing Time')"
                  class="px-4 py-2 bg-[#7F3DFF] text-white rounded-lg hover:bg-[#6C2BD9] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>

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
            <h3 class="text-xl font-bold mb-4">Confirm Save</h3>
            <p class="mb-6">{{ confirmationMessage }}</p>
            <div class="flex justify-end gap-3">
              <button
                @click="cancelSave"
                class="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                @click="confirmSave"
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
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../../lib/supabase'
import { toast } from 'vue3-toastify'
import AdminHeader from '../../Layout/adminheader.vue'
import AdminNavLayout from '../../Layout/adminNavLayout.vue'

const settings = ref({
  allowSignups: true,
  requireEmailVerification: false,
  minDeposit: 40,
  minWithdrawal: 10,
  profitSettings: 0.8,
  referalProfitSettings: 5,
  accountNumber: '',
  accountName: '',
  bank: '',
  ltcAddress: '',
  ltcQRCode: '', // This will hold the QR code image URL or base64 data
  stats: {
    open: "₦25.95",
    high: "₦26.95",
    low: "₦22.55",
    volume: "0.00",
    avgVol: "---",
    mktCap: "---"
  },
  marketClosingTime: 0 // New field for market closing time in hours
})

// Confirmation modal states
const showConfirmationModal = ref(false)
const pendingSection = ref('')

const confirmationMessage = computed(() => {
  return `Are you sure you want to save changes for ${pendingSection.value}?`
})

const openConfirmationModal = (section) => {
  pendingSection.value = section
  showConfirmationModal.value = true
}

const confirmSave = async () => {
  await updateSettings()
  showConfirmationModal.value = false
  pendingSection.value = ''
}

const cancelSave = () => {
  showConfirmationModal.value = false
  pendingSection.value = ''
}

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('auth_settings')
      .select('*')
      .single()

    if (error) throw error
    if (data) {
      settings.value = {
        ...settings.value,
        ...data
      }
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    toast.error('Failed to load settings')
  }
})

const updateSettings = async () => {
  try {
    const { error } = await supabase
      .from('auth_settings')
      .update(settings.value)
      .eq('id', 1)

    if (error) throw error
    toast.success('Settings updated successfully')
  } catch (error) {
    console.error('Error updating settings:', error)
    toast.error('Failed to update settings')
  }
}

// Handle file upload for the LTC QR Code
const handleQRCodeUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      settings.value.ltcQRCode = e.target.result
      updateSettings()
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge, and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
