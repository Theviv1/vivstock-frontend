<template>
 <Navbar/>

    <div class="px-4 py-4">
      <h1 class="text-2xl font-semibold mb-6 text-center relative left-[-15px] top-[-20px]">Trade</h1>

      <h3 class="flex justify-center gap-56 relative left-[-20px] top-[-30px] mb-[25px]  items-center text-white text-xl">Balance: <span class="relative left-[10px] text-bold text-xl">$213</span></h3>
      
      <div class="space-y-4">
        <!-- Display trades if there are active trades -->
        <div 
          v-for="stock in groupedTrades" 
          :key="stock.symbol"
          v-show="stock.quantity > 0"
          class="bg-[#1A1A1A] rounded-lg p-4 cursor-pointer"
          @click="handleStockClick(stock.symbol)"
        >
          <div class="flex items-center justify-between mb-2">
            <div>
              <h3 class="text-lg font-semibold">{{ stock.name }}</h3>
              <p class="text-sm text-gray-400">{{ stock.symbol }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatCurrency(stock.lastPrice) }}</p>
              <p class="text-sm text-gray-400">
                Qty: {{ stock.quantity }}
              </p>
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Total Value:</span>
            <span class="font-medium">
              {{ formatCurrency(stock.quantity * stock.lastPrice) }}
            </span>
          </div>
        </div>
  
        <!-- Display a design if there are no active trades -->
        <div 
          v-if="!hasActiveTrades" 
          class="w-full h-[80vh] flex flex-col items-center justify-center text-gray-400"
        >
          <NoTrade/>
          
        </div>
      </div>
    </div>
 
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../Layout/mainLayout.vue'
import NoTrade from './noTrade.vue'
import Navbar from '../components/Navbar.vue'
const router = useRouter()
const trades = ref([])

onMounted(() => {
  const savedTrades = JSON.parse(localStorage.getItem('trades') || '[]')
  trades.value = savedTrades
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const handleStockClick = (symbol) => {
  router.push(`/trade/${symbol}`)
}

const groupedTrades = computed(() => {
  return trades.value.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = {
        symbol: trade.symbol,
        name: trade.name,
        quantity: 0,
        totalValue: 0,
        lastPrice: parseFloat(trade.price),
        trades: []
      }
    }
    
    acc[trade.symbol].quantity += trade.type === 'buy' ? 1 : -1
    acc[trade.symbol].totalValue += trade.type === 'buy' ? 
      parseFloat(trade.price) : -parseFloat(trade.price)
    acc[trade.symbol].trades.push(trade)
    
    return acc
  }, {})
})

// Check if there are any active trades
const hasActiveTrades = computed(() => {
  return Object.values(groupedTrades.value).some(stock => stock.quantity > 0)
})
</script>
