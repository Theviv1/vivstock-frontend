<!-- Layout.vue -->
<template>
    <div class="layout">
      <Navbar />
      <main>
        <slot></slot> <!-- Content from child components will be injected here -->
      </main>
    </div>
  </template>
  
  <script>

import Navbar from '../components/Navbar.vue';

  
  
  export default {
    name: 'mainLayout',
    components: {
      Navbar,
    },
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    min-height: 100vh;
  }
  
  main {
    flex-grow: 1;
    padding: 20px;
  }
  </style>
  