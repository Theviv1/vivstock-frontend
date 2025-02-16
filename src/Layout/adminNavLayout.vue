<!-- File: src/layouts/AdminLayout.vue -->
<template>
    <div class="min-h-screen">
      <!-- Navigation Area -->
     
  <AdminNav/>
      <!-- Main Content Area -->
      <div class="ml-0 ">
        <!-- Render page content here -->
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
import AdminNav from '../components/admin/AdminNav.vue';


  </script>
  