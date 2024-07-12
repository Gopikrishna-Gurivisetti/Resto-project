<template>
  <Header />
  <div class=" flex justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-4xl p-8 bg-white rounded-md shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">These details are under {{ name }}</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700">
              ID</th>
            <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700">
              Name</th>
            <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700">
              Contact</th>
            <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700">
              Address</th>
            <th class="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-sm font-semibold text-gray-700">
              Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in restaurents" :key="user.id">
            <td class="py-2 px-4 border-b border-gray-200">{{ user.id }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ user.name }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ user.contact }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ user.address }}</td>
            <td class="py-2 px-4 border-b border-gray-200"><router-link
                class="ms-3 border px-2 py-1 rounded-md bg-orange-300 text-white"
                :to="'/update/' + user.id">Update</router-link>
              <button class="ms-3 border px-2 py-1 rounded-md bg-red-400 text-white" type="button"
                @click="daleteRestaurent(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()
const name = ref('')
const restaurents = ref([])
onMounted(() => {
  let user = localStorage.getItem('users-data')
  name.value = JSON.parse(user).name
  if (!user) {
    router.push({ name: 'signup' })
  }
  getData()
})
const getData = async () => {
  let result = await axios.get('http://localhost:3000/restaurants');
  restaurents.value = result.data
}
const daleteRestaurent = async (id) => {
  await axios.delete('http://localhost:3000/restaurants/' + id)
  setTimeout(() => {
    toast.success('Deleted Restaurant !', { autoClose: 2000 });
  }, 0)
  getData()
}
// localStorage.clear()
</script>
<style scoped></style>
