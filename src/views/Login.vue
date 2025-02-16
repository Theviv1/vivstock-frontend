```vue
<template>
  <div class="min-h-screen flex">
    <!-- Left side -->
    <div class="hidden md:flex md:w-1/2 bg-app-dark items-center justify-center p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Welcome back
        </h2>
        <p class="text-gray-400">Login to continue</p>
        <img
          src=""
          alt="Welcome"
          class="mt-8 max-w-xs mx-auto"
        />
      </div>
    </div>

    <!-- Right side -->
    <div class="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
      <div class="w-full max-w-md">
        <div class="flex justify-center items-center">
          <img 
            src=""
            alt="Welcome"
            class="h-[150px] w-[170px] mb-[30px]"
          />
        </div>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Welcome Back</h2>
        
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6 mb-[20px]">
          <FormInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            required
          />

          <FormInput
            v-model="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />

          <div class="flex items-center justify-between relative top-[-10px]">
            <div>
              <label class="text-black">
                <input type="checkbox" v-model="rememberMe" class="mr-1" />
                Remember me
              </label>
            </div>
            <div>
              <router-link to="/forgot-password" class="text-[#7F3DFF]">
                Forgot password?
              </router-link>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#7F3DFF] text-white p-2 rounded-[60px] disabled:opacity-50 relative top-[-15px]"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="mt-1 text-center">
          <p class="text-gray-600">
            Don't have an account?
            <router-link to="/signup" class="text-[#7F3DFF]">
              Sign up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import FormInput from '../components/form/FormInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
```