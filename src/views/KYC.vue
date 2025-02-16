<template>
    <div class="px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <button @click="$router.back()" class="p-2 hover:bg-[#1E1E1E] rounded-full transition-colors">
          <i class="bi-arrow-left text-2xl"></i>
        </button>
        <h1 class="text-2xl font-bold">KYC Verification</h1>
        <div class="w-10"></div>
      </div>
  
      <div class="max-w-md mx-auto">
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
  
        <template v-else-if="kycStatus === 'pending'">
          <div class="bg-yellow-500/10 text-yellow-500 p-4 rounded-lg mb-6">
            Your KYC verification is pending review. We'll notify you once it's processed.
          </div>
        </template>
  
        <template v-else-if="kycStatus === 'approved'">
          <div class="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6">
            Your KYC verification has been approved!
          </div>
        </template>
  
        <template v-else>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">First Name</label>
              <input
                v-model="formData.firstName"
                type="text"
                required
                class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
              <input
                v-model="formData.lastName"
                type="text"
                required
                class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
              <input
                v-model="formData.phoneNumber"
                type="tel"
                required
                class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">National ID Number</label>
              <input
                v-model="formData.nationalId"
                type="text"
                required
                class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Country</label>
              <input
                v-model="formData.country"
                type="text"
                required
                class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Address</label>
              <textarea
                v-model="formData.address"
                required
                rows="3"
                class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
              ></textarea>
            </div>
  
            <button
              type="submit"
              :disabled="submitting"
              class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Submit KYC' }}
            </button>
          </form>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '../lib/supabase'
  import { toast } from 'vue3-toastify'
  
  const router = useRouter()
  const loading = ref(true)
  const submitting = ref(false)
  const kycStatus = ref(null)
  
  const formData = ref({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nationalId: '',
    country: '',
    address: ''
  })
  
  onMounted(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data: kyc } = await supabase
        .from('kyc_submissions')
        .select('status')
        .eq('user_id', user.id)
        .single()
  
      if (kyc) {
        kycStatus.value = kyc.status
      }
    } catch (error) {
      console.error('Error fetching KYC status:', error)
    } finally {
      loading.value = false
    }
  })
  
  const handleSubmit = async () => {
    try {
      submitting.value = true
      const { data: { user } } = await supabase.auth.getUser()
  
      const { error } = await supabase
        .from('kyc_submissions')
        .insert([{
          user_id: user.id,
          first_name: formData.value.firstName,
          last_name: formData.value.lastName,
          phone_number: formData.value.phoneNumber,
          national_id: formData.value.nationalId,
          country: formData.value.country,
          address: formData.value.address
        }])
  
      if (error) throw error
  
      toast.success('KYC submission successful')
      kycStatus.value = 'pending'
    } catch (error) {
      console.error('Error submitting KYC:', error)
      toast.error('Failed to submit KYC')
    } finally {
      submitting.value = false
    }
  }
  </script>