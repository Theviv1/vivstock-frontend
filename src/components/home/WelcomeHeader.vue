<template>
  <div class="flex justify-between items-start">
    <div class="flex items-center gap-3">
      <div 
        class="w-12 h-12 bg-[#7F3DFF] rounded-full flex items-center justify-center cursor-pointer"
        @click="showUserMenu = !showUserMenu"
      >
        <span class="text-xl text-white">{{ userInitials }}</span>
      </div>
      <div>
        <p class="text-gray-400">Welcome 👋</p>
        <h1 class="text-2l font-bold">{{ username }}</h1>
      </div>
    </div>
    <div class="flex gap-2">
      <button class="w-10 h-10 bg-[#1E1E1E] rounded-full flex ml-[32px] items-center justify-center">
        <i class="bi bi-chat-dots text-xl"></i>
      </button>
      <button class="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center">
        <i class="bi bi-bell text-xl"></i>
      </button>
    </div>

    <!-- User Menu -->
    <div 
      v-if="showUserMenu" 
      class="absolute top-16 left-4 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-50 min-w-[200px]"
    >
      <div class="px-4 py-2 border-b border-gray-700">
        <p class="text-sm text-gray-400">Signed in as</p>
        <p class="font-semibold">{{ username }}</p>
      </div>
      
      <div class="py-1">
        <button 
          @click="navigateTo('/kyc')"
          class="w-full px-4 py-2 text-left hover:bg-[#2A2A2A] flex items-center gap-2"
        >
          <i class="bi-person-badge text-lg"></i>
          <span>KYC Verification</span>
        </button>
        
        <button 
          @click="navigateTo('/settings')"
          class="w-full px-4 py-2 text-left hover:bg-[#2A2A2A] flex items-center gap-2"
        >
          <i class="bi-gear text-lg"></i>
          <span>Settings</span>
        </button>
        
        <button 
          @click="navigateTo('/reset-password')"
          class="w-full px-4 py-2 text-left hover:bg-[#2A2A2A] flex items-center gap-2"
        >
          <i class="bi-key text-lg"></i>
          <span>Reset Password</span>
        </button>
        
        <div class="border-t border-gray-700 mt-1"></div>
        
        <button 
          @click="handleLogout"
          class="w-full px-4 py-2 text-left hover:bg-[#2A2A2A] text-red-500 flex items-center gap-2"
        >
          <i class="bi-box-arrow-right text-lg"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { toast } from 'vue3-toastify'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const userInitials = ref('')
const showUserMenu = ref(false)

onMounted(async () => {
  if (authStore.user?.user_metadata?.username) {
    username.value = authStore.user.user_metadata.username
    userInitials.value = username.value.substring(0, 2).toUpperCase()
  }

  // Close menu when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  const menu = document.querySelector('.user-menu')
  const avatar = document.querySelector('.avatar')
  if (menu && !menu.contains(event.target) && !avatar?.contains(event.target)) {
    showUserMenu.value = false
  }
}

const navigateTo = (path) => {
  showUserMenu.value = false
  router.push(path)
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
    toast.success('Logged out successfully')
  } catch (error) {
    toast.error('Failed to logout')
  }
}
</script>