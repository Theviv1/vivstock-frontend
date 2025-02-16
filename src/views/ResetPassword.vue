<template>
    <div class="px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <button @click="$router.back()" class="p-2 hover:bg-[#1E1E1E] rounded-full transition-colors">
          <i class="bi-arrow-left text-2xl"></i>
        </button>
        <h1 class="text-2xl font-bold">Reset Password</h1>
        <div class="w-10"></div>
      </div>
  
      <div class="max-w-md mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
            <input
              v-model="formData.currentPassword"
              type="password"
              required
              class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">New Password</label>
            <input
              v-model="formData.newPassword"
              type="password"
              required
              class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              required
              class="w-full bg-[#1A1A1A] rounded-lg px-4 py-2"
            />
          </div>
  
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '../lib/supabase'
  import { toast } from 'vue3-toastify'
  
  const router = useRouter()
  const loading = ref(false)
  
  const formData = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const handleSubmit = async () => {
    if (formData.value.newPassword !== formData.value.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
  
    try {
      loading.value = true
  
      const { error } = await supabase.auth.updateUser({
        password: formData.value.newPassword
      })
  
      if (error) throw error
  
      toast.success('Password updated successfully')
      router.push('/settings')
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Failed to update password')
    } finally {
      loading.value = false
    }
  }
  </script>