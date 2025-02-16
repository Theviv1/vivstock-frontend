<!-- LoginLayout.vue -->
<template>
    <div class="flex min-h-screen">
      <!-- Left side: Welcome message -->
      <div class="hidden md:flex md:w-1/2 bg-app-dark items-center justify-center p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Welcome to Vivstock
        </h2>
        <p class="text-gray-400">Welcome to Vivstock</p>
        <img
          src=""
          alt="Welcome"
          class="mt-8 max-w-xs mx-auto"
        />
      </div>
    </div>

  
      <!-- Right side: Login form (add your actual login form here) -->
      <div class="flex-1 flex items-center justify-center p-8  bg-white">
        <slot></slot> <!-- This will allow dynamic content to be injected, like the login form -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'signUp',
  };
  </script>
  
  <style scoped>
  
  </style>
  