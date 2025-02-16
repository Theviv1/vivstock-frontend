<template>
  <MainLayout>
    <div class="px-4 py-6 lg:pl-64">
      <!-- Page Title -->
      <div class="flex items-center gap-4 mb-6">
        <h1 class="text-2xl font-bold">Assets</h1>
      </div>

      <!-- Currency Filter -->
      <div class="flex gap-2 mb-8">
        <button
          v-for="currency in currencies"
          :key="currency.value"
          @click="selectedCurrency = currency.value"
          :class="[
            'px-4 py-2 rounded-full text-base sm:text-lg md:text-xl',
            selectedCurrency === currency.value
              ? 'bg-black text-white'
              : 'bg-[#E8F3F1] text-black'
          ]"
        >
          {{ currency.label }}
        </button>
      </div>

      <!-- Referral Banner -->
      <div class="bg-black w-full p-4 rounded-lg mb-8">
        <div class="flex items-center gap-3 cursor-pointer" @click="$router.push('/refer')">
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <img src="" alt="" class="object-contain" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">Refer A Friend To Vivstock</h3>
            <p class="text-gray-600">Get 5% Interest On Their First Deposit</p>
          </div>
        </div>
      </div>

      <h2 class="text-xl font-bold mb-6">All Assets Offerings</h2>

      <!-- Asset Grid -->
      <!-- On small screens, use one column; on larger screens, use two columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
        <!-- Foreign Stocks Card -->
        <template v-if="selectedCurrency === 'all' || selectedCurrency === 'usd'">
          <div
            class="bg-black w-full p-6 rounded-lg cursor-pointer"
            @click="$router.push('/market/foreign-stocks')"
          >
            <div class="w-24 h-12 mb-5">
              <div class="w-full h-full rounded-lg relative -top-5">
                <img src="" alt="" class="object-contain w-full h-full" />
              </div>
            </div>
            <h3 class="text-[15px] font-bold relative top-5 text-white">
              Foreign Stocks
            </h3>
            <p class="text-white text-[12px] relative top-5">
              Buy Foreign Companies
            </p>
          </div>
        </template>

        <!-- Local Stocks Card -->
        <template v-if="selectedCurrency === 'all' || selectedCurrency === 'ngn'">
          <div
            class="bg-black w-full p-6 rounded-lg cursor-pointer"
            @click="$router.push('/market/local-stocks')"
          >
            <div class="w-24 h-16 mb-4">
              <div class="w-full h-full relative -top-5 rounded-lg">
                <img src="" alt="" class="object-contain w-full h-full" />
              </div>
            </div>
            <h3 class="text-lg font-bold">Local Stocks</h3>
            <p class="text-white text-[12px] mb-5">
              Buy local companies
            </p>
          </div>
        </template>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../Layout/mainLayout.vue'

const router = useRouter()
const selectedCurrency = ref('all')

const currencies = [
  { label: 'All', value: 'all' },
  { label: 'USD only', value: 'usd' },
  { label: 'Local only', value: 'ngn' }
]
</script>
