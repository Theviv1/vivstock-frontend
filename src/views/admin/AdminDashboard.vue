<template>
  <div class="min-h-screen bg-[#111111] text-white">
    <AdminNavLayout>

    <div class="lg:pl-64 p-6">
      <AdminHeader>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total Users Card -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Total Users</h3>
                <p class="text-2xl font-bold">{{ stats.totalUsers }}</p>
              </div>
              <i class="bi-people text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          <!-- Total Verified Users Card -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Total Verifed Users</h3>
                <p class="text-2xl font-bold">{{ stats.totalVerifedUsers }}</p>
              </div>
              <i class="bi-people text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          <!-- Total Unverified Users Card -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Total Unverified Users</h3>
                <p class="text-2xl font-bold">{{ stats.totalUnverifiedUsers }}</p>
              </div>
              <i class="bi-people text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          <!--Total deposits  -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Total deposits </h3>
                <p class="text-2xl font-bold">$ {{ stats.totalDeposits }}</p>
              </div>
              
              <i class="bi bi-cash-stack mr-2 text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          <!--Total Withdrawals  -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Total Withdrawals</h3>
                <p class="text-2xl font-bold">$ {{ stats.totalWithdrawals }}</p>
              </div>
              <i class="bi bi-wallet  text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          <!-- deposit fee  -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">deposit Fee</h3>
                <p class="text-2xl font-bold">$ {{ stats.totalDepositsFee}}</p>
              </div>
              <i class="bi bi-arrow-up-circle  text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          
          <!-- withdrawal fee  -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Withdraw Fee</h3>
                <p class="text-2xl font-bold">$ {{ stats.totalWithdrawalsFee}}</p>
              </div>
              <i class="bi-people text-[#7F3DFF] text-2xl"></i>
            </div>
          </div>
          <!-- Pending Transactions Card -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Pending Deposits</h3>
                <p class="text-2xl font-bold">{{ stats.pendingDeposits }}</p>
              </div>
              <i class="bi-clock-history text-yellow-500 text-2xl"></i>
            </div>
          </div>
          <!-- Pending Transactions Card -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Pending Withdrawals</h3>
                <p class="text-2xl font-bold">{{ stats.pendingWithdrawals }}</p>
              </div>
              <i class="bi-clock-history text-yellow-500 text-2xl"></i>
            </div>
          </div>
  
          <!-- Completed Transactions Card -->
          <div class="bg-[#1A1A1A] p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-gray-400">Completed Transactions</h3>
                <p class="text-2xl font-bold">{{ stats.completedTransactions }}</p>
              </div>
              <i class="bi-check-circle text-green-500 text-2xl"></i>
            </div>
          </div>
         
  
          
        </div>
      </AdminHeader>
    </div>
  </AdminNavLayout>

      
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminNav from '../../components/admin/AdminNav.vue'
import AdminHeader from '../../Layout/adminHeader.vue';
import AdminNavLayout from '../../Layout/adminNavLayout.vue';

// Mock stats data
const stats = ref({
  totalUsers: 1200,
  pendingTransactions: 15,
  completedTransactions: 350,
  totalRevenue: 12500,
  totalWithdrawals: 15000,
  totalDeposits : 33000,
  totalVerifedUsers: 12000,
  totalDepositsFee: 12.5,
  totalWithdrawalsFee: 15.7,
  totalUnverifiedUsers : 121200,
  totalTransactionsFees :1221324,
  pendingWithdrawals: 25,
  pendingDeposits: 12
})
</script>