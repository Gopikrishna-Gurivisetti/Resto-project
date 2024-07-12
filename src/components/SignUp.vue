<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-center">Sign Up</h2>
            <form @submit.prevent="signUp">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700" for="name">Name</label>
                    <input v-model="name" type="text" id="name" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
                    <input v-model="email" type="email" id="email" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400  rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700" for="password">Password</label>
                    <input v-model="password" type="password" id="password" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400  rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Sign Up
                    </button>
                </div>
                <p class="mt-3 text-center">Already have an account? <router-link to="/login"
                        class="text-blue-500">Login</router-link></p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()
const name = ref('');
const email = ref('');
const password = ref('');
const baseUrl = ref('http://localhost:3000/users');
const reset = () => {
    name.value = '',
        email.value = '',
        password.value = ''
}
const signUp = async () => {
    // Handle form submission, e.g., send data to an API
    let payload = {
        name: name.value,
        email: email.value,
        password: password.value,
    };
    let usersData = await axios.post(baseUrl.value, payload)
    reset()
    if (usersData.status == 201) {
        setTimeout(() => {
            toast.success('Sign-up Successfully !', { autoClose: 2000 });
        }, 0)
        // localStorage.setItem('users-data', JSON.stringify(usersData.data))
        router.push({ name: 'login' })
    }
};
onMounted(() => {
    let user = localStorage.getItem('users-data')
    if (user) {
        router.push({ name: 'home' })
    }
})
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>