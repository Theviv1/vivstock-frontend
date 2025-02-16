```vue
<template>
  <div class="min-h-screen flex">
    <div class="hidden md:flex md:w-1/2 bg-app-dark items-center justify-center p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Welcome to Vivstock
        </h2>
        <p class="text-gray-400">Welcome to Vivstock</p>
        <img
          src=""
          alt="Welcome"
          class="mt-8 max-w-xs mx-auto"
        />
      </div>
    </div>

    <div class="w-full md:w-1/2 bg-white">
      <div class="sticky top-0 left-0 w-full bg-white shadow-md z-50 px-8 py-4">
        <div class="flex flex-col items-start">
          <img 
            src=""
            alt="Vivstock"
            class="w-[60px] h-[60px] object-contain"
          />
          <span class="text-[#7F3DFF] font-semibold text-lg">Vivstock</span>
        </div>
      </div>

      <div class="p-8 flex items-center justify-center">
        <div class="w-full max-w-md">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Welcome To Vivstock</h2>
          
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-2">
            <FormInput
              v-model="formData.username"
              type="text"
              label="Username"
              placeholder="Enter username"
              required
            />

            <FormInput
              v-model="formData.email"
              type="email"
              label="Email"
              placeholder="Enter email"
              required
            />

            <FormInput
              v-model="formData.password"
              type="password"
              label="Password"
              placeholder="Create password"
              required
            />

            <div>
              <button
                type="button"
                @click="showReferral = !showReferral"
                class="text-gray-500 flex items-center gap-2"
              >
                Referral Code 
                <i :class="showReferral ? 'bi-chevron-up' : 'bi-chevron-down'" class="text-xs"></i>
              </button>
              
              <FormInput
                v-if="showReferral"
                v-model="formData.referral"
                type="text"
                placeholder="Enter referral code"
              />
            </div>

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                v-model="isAgreed"
                class="rounded text-[#7F3DFF]"
              />
              <label for="terms" class="text-sm text-gray-700">
                I agree to the <router-link to="/terms" class="text-[#7F3DFF]">Terms of Service</router-link> and
                <router-link to="/privacy" class="text-[#7F3DFF]">Privacy Policy</router-link>
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading || !isAgreed"
              class="w-full bg-[#7F3DFF] text-white p-3 rounded-[60px] disabled:opacity-50"
            >
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Already have an account?
              <router-link to="/login" class="text-[#7F3DFF]">
                Login
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { toast } from 'vue3-toastify'
import FormInput from '../components/form/FormInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const formData = reactive({
  username: '',
  email: '',
  password: '',
  referral: ''
})

const showReferral = ref(false)
const isAgreed = ref(false)
const loading = ref(false)
const error = ref('')

const validateForm = () => {
  if (!formData.username || !formData.email || !formData.password) {
    error.value = 'All fields are required'
    return false
  }
  if (!isAgreed.value) {
    error.value = 'You must agree to the terms and conditions'
    return false
  }
  if (formData.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  try {
    loading.value = true
    error.value = ''
    
    await authStore.signup(formData.email, formData.password, formData.username)
    toast.success('Account created successfully!')
    router.push('/login')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
```