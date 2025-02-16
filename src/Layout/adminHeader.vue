<template>
  <div class="flex flex-col items-center p-6">
    <!-- Sticky header -->
    <header
      class="sticky top-0 z-50 w-full max-w-6xl backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl border border-white/10"
    >
      <div class="flex justify-between items-center px-8 py-4">
        <!-- Revenue Cards, Profile, etc. remain unchanged -->
        <div class="flex-1 max-w-md mx-4">
          <div class="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 shadow-lg transition-all hover:border-purple-500/50">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-500/10 rounded-lg">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-400">Total Transactions Fees</h3>
                  <p class="text-xl font-semibold text-green-400">$12,322,920</p>
                </div>
              </div>
              <span class="flex items-center text-green-400 text-sm">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd" />
                </svg>
                +12.4%
              </span>
            </div>
          </div>
        </div>

        <!-- Second Revenue Card -->
        <div class="flex-1 max-w-md mx-4">
          <div class="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30 shadow-lg transition-all hover:border-purple-500/50">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-500/10 rounded-lg">
                  <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-400">Total Revenue</h3>
                  <p class="text-xl font-semibold text-green-400">$783,830,920</p>
                </div>
              </div>
              <span class="flex items-center text-green-400 text-sm">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd" />
                </svg>
                +12.4%
              </span>
            </div>
          </div>
        </div>

        <!-- Profile Section with dropdown -->
        <div class="relative inline-block">
          <div @click="toggleDropdown" class="flex items-center space-x-4 group cursor-pointer">
            <div class="relative">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
              >
                <span class="text-white font-medium">MG</span>
              </div>
              <div
                class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white border-2 border-gray-900"
              >
                3
              </div>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-300">Admin Account</span>
              <span class="text-xs text-gray-500">maskgang@admin.com</span>
            </div>
            <ChevronDownIcon
              class="w-5 h-5 text-gray-400 transform transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
            />
          </div>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-2 z-10"
          >
            <button
              @click="logout"
              class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-[#2A2A2A] transition-colors"
            >
              <i class="bi-box-arrow-right text-xl"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content; add top padding to prevent overlap with sticky header -->
    <main class="w-full max-w-6xl pt-20">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const logout = () => {
  console.log('Logging out...')
  // Add your logout logic here
}
</script>

<style scoped>
header {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  transition: all 0.3s ease;
}
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.1);
}
</style>
