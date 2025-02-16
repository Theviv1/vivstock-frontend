<template>
  <MainLayout>


    <div class=" py-6 lg:pl-64">
      <div class="flex items-center gap-4 mb-6">
        <h1 class="text-2xl font-semibold">History</h1>
      </div>
  
      <!-- Tabs -->
      <div class="flex gap-4 mb-6 border-b border-gray-800">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-2 px-4',
            activeTab === tab.id
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'text-gray-400'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
  
      <!-- Loading State -->
      <template v-if="isLoading">
        <div class="w-full h-[80vh] flex flex-col gap-2 justify-center items-center text-gray-400">
          <svg class="animate-spin h-8 w-8 text-purple-500" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="font-semibold">Loading...</p>
        </div>
      </template>
  
      <!-- Content -->
      <template v-else>
   <template v-if="!hasHistory">
      <div class="w-[330px] h-[]  text-gray-400">
        <!-- Hardcoded deposit history -->
        <div class="  shadow-md ">
          
          <div class="">
            
            <div class="flex justify-between py-3 border-b">
              <!-- For Deposits -->
              <span class="text-gray-600 flex flex-col">
                <span class="text-white">USD</span>
                <span class="text-[14px]">2024-03-12 14:59:24</span>
              </span>
              <span class="font-semibold flex flex-col ">
                <span class="text-green-500 text-right"> 40 </span>
                  <span class="text-[14px]"> Completed</span>
              </span>
            </div>
            <!-- For Withdrawals --> 
            <div class="flex justify-between py-3 border-b">
              <span class="text-gray-600 flex flex-col">
                <span class="text-white">USD</span>
                <span class="text-[14px]">2024-03-12 14:59:24</span>
              </span>
              <span class="font-semibold flex flex-col ">
                <span class="text-green-500 text-right"> 40 </span>
                  <span class="text-[14px]">Withdrawal Completed</span>
              </span>
            </div>
              <!-- For trade Tab -->
            <div class="flex justify-between py-3 border-b">
              <span class="text-gray-600 flex flex-col">
                <span class="text-white">USD</span>
                <span class="text-[14px]">2024-03-12 14:59:24</span>
              </span>
           
              <span class="font-semibold flex flex-col ">
                <span class="text-red-500 text-right"> 40 </span>
                  <span class="text-[14px]"> Failed</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  
        <template v-else>
          <!-- Display deposits, withdrawals, and trades -->
          <!-- (Same code as before) -->
        </template>
      </template>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { supabase } from '../lib/supabase';
import MainLayout from '../Layout/mainLayout.vue';

const authStore = useAuthStore();
const activeTab = ref('deposits');
const deposits = ref([]);
const withdrawals = ref([]);
const trades = ref([]);
const isLoading = ref(true);

const tabs = [
  { id: 'deposits', label: 'Deposits' },
  { id: 'withdrawals', label: 'Withdrawals' },
  { id: 'trades', label: 'Trades' }
];

const hasHistory = computed(() => {
  switch (activeTab.value) {
    case 'deposits':
      return deposits.value.length > 0;
    case 'withdrawals':
      return withdrawals.value.length > 0;
    case 'trades':
      return trades.value.length > 0;
    default:
      return false;
  }
});

const fetchHistory = async () => {
  isLoading.value = true;
  const userId = authStore.user?.id;

 

  try {
    // Fetch deposits
    const { data: depositData, error: depositError } = await supabase
      .from('deposits')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (depositError) throw depositError;
    deposits.value = depositData;

    // Fetch withdrawals
    const { data: withdrawalData, error: withdrawalError } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (withdrawalError) throw withdrawalError;
    withdrawals.value = withdrawalData;

    // Fetch trades
    const { data: tradeData, error: tradeError } = await supabase
      .from('trades')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (tradeError) throw tradeError;
    trades.value = tradeData;
  } catch (error) {
    console.error('Error fetching history:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchHistory();
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-500';
    case 'approved':
      return 'bg-green-500/20 text-green-500';
    case 'rejected':
      return 'bg-red-500/20 text-red-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};
</script>