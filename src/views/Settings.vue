<template>
  <div class="px-4 py-6">
    <div class="flex items-center justify-between mb-6">
      <button @click="$router.back()" class="p-2 hover:bg-[#1E1E1E] rounded-full transition-colors">
        <i class="bi-arrow-left text-2xl"></i>
      </button>
      <h1 class="text-2xl font-bold">Settings</h1>
      <div class="w-10"></div>
    </div>

    <div class="max-w-md mx-auto space-y-6">
      <!-- Profile Settings -->
      <div class="bg-[#1A1A1A] rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">Profile Settings</h2>
        <!-- Profile Image Upload -->
        <div class="flex flex-col items-center mb-4">
          <img
            :src="profileImageUrl"
            alt="Profile Image"
            class="w-24 h-24 rounded-full object-cover bg-purple-500"
          />
          <label class="mt-2 cursor-pointer bg-[#2A2A2A] px-4 py-2 rounded-lg hover:bg-[#333333] text-sm">
            Upload Image
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
          </label>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Username</label>
            <input
              v-model="settings.username"
              type="text"
              class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              v-model="settings.email"
              type="email"
              disabled
              class="w-full bg-[#2A2A2A] rounded-lg px-4 py-2 opacity-50"
            />
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-[#1A1A1A] rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">Notifications</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Email Notifications</p>
              <p class="text-sm text-gray-400">Receive updates via email</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                v-model="settings.emailNotifications"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F3DFF]"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Push Notifications</p>
              <p class="text-sm text-gray-400">Receive updates on your device</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                v-model="settings.pushNotifications"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7F3DFF]"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="bg-[#1A1A1A] rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">Security</h2>
        <button 
          @click="$router.push('')"
          class="w-full bg-[#2A2A2A] text-left px-4 py-3 rounded-lg hover:bg-[#333333] flex items-center justify-between"
        >
          <span>Change Email</span>
          <i class="bi-chevron-right"></i>
        </button><br>
        <button 
          @click="$router.push('/reset-password')"
          class="w-full bg-[#2A2A2A] text-left px-4 py-3 rounded-lg hover:bg-[#333333] flex items-center justify-between"
        >
          <span>Change Password</span>
          <i class="bi-chevron-right"></i>
        </button>
      </div>

      <button
        @click="saveSettings"
        :disabled="saving"
        class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {{ saving ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../lib/supabase'
import { toast } from 'vue3-toastify'

const router = useRouter()
const authStore = useAuthStore()
const saving = ref(false)

const settings = ref({
  username: '',
  email: '',
  emailNotifications: false,
  pushNotifications: false
})

// Set a default profile image or use the one from user metadata if available
const profileImageUrl = ref('https://via.placeholder.com/150')

onMounted(async () => {
  if (authStore.user) {
    settings.value.username = authStore.user.user_metadata?.username || ''
    settings.value.email = authStore.user.email

    // You might also load the current profile image from user metadata/storage
    if (authStore.user.user_metadata?.avatar_url) {
      profileImageUrl.value = authStore.user.user_metadata.avatar_url
    }

    // Fetch user settings from profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('email_notifications, push_notifications')
      .eq('id', authStore.user.id)
      .single()

    if (!error && data) {
      settings.value.emailNotifications = data.email_notifications
      settings.value.pushNotifications = data.push_notifications
    }
  }
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Create a local URL for preview
    profileImageUrl.value = URL.createObjectURL(file)
    // TODO: Upload the file to your storage and update the user's avatar URL accordingly.
  }
}

const saveSettings = async () => {
  try {
    saving.value = true

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        email_notifications: settings.value.emailNotifications,
        push_notifications: settings.value.pushNotifications
      })
      .eq('id', authStore.user.id)

    if (updateError) throw updateError

    // Update user metadata if username changed
    if (settings.value.username !== authStore.user.user_metadata?.username) {
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { username: settings.value.username }
      })

      if (metadataError) throw metadataError
    }

    toast.success('Settings saved successfully')
  } catch (error) {
    console.error('Error saving settings:', error)
    toast.error('Failed to save settings')
  } finally {
    saving.value = false
  }
}
</script>
