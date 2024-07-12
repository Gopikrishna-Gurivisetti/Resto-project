<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-center">Add Your Restaurant Details</h2>
            <form @submit.prevent="addrestaurant">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700" for="name">Name</label>
                    <input v-model="restaurant.name" type="text" id="name" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700" for="contact">Contact</label>
                    <input v-model="restaurant.contact" type="text" id="contact" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700" for="address">Address</label>
                    <textarea v-model="restaurant.address" id="address" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"></textarea>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Add Restaurant
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()
const baseUrl = ref('http://localhost:3000/restaurants')
const restaurant = ref({ name: '', contact: '', address: '' });
const addrestaurant = async () => {
    let payload = {
        name: restaurant.value.name,
        contact: restaurant.value.contact,
        address: restaurant.value.address
    }
    let data = await axios.post(baseUrl.value, payload)
    if (data.status == 201) {
        setTimeout(() => {
            toast.success('Added Restaurant !', { autoClose: 2000 });
        }, 0)
        router.push({ name: 'home' })
    }
}
onMounted(() => {
    let user = localStorage.getItem('users-data')
    if (!user) {
        router.push({ name: 'signup' })
    }
})
</script>
<style scoped></style>