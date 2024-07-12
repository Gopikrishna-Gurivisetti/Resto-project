<template>
  <header class="bg-blue-400 text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center p-4">
      <div class="text-2xl font-bold">
        <h1 to="/" class="hover:text-gray-300 ms-11">My Restaurant</h1>
      </div>
      <nav>
        <ul class="flex space-x-10 me-11">
          <li><router-link to="/" class="hover:text-gray-300">Home</router-link></li>
          <li><router-link to="/add" class="hover:text-gray-300">Add Restaurant</router-link></li>
          <li><a href="#" class="hover:text-gray-300" @click="logout">Logout</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()
const logout = () => {
  localStorage.clear();
  setTimeout(() => {
    toast.success('Logout Successfully !', { autoClose: 2000 });
  }, 0)
  router.push({ name: 'login' });
}
</script>