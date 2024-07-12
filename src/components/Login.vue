<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
            <h2 class="text-2xl font-bold text-center">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
                    <input v-model="email" type="email" id="email" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400  rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    <span class="text-red-300">{{ errorEmail }}</span>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700" for="password">Password</label>
                    <input v-model="password" type="password" id="password" required
                        class="w-full px-3 py-2 mt-1 border border-gray-400  rounded-md focus:outline-none focus:ring focus:border-blue-300" />
                    <span class="text-red-300">{{ errorPassword }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Login
                    </button>
                </div>
                <p class="mt-3 text-center">Don't have an account? <router-link to="/signup"
                        class="text-blue-500">SignUp</router-link></p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()
const email = ref('');
const password = ref('');
const errorEmail = ref('')
const errorPassword = ref('')
const reset = () => {
    email.value = '',
        password.value = ''
}

const login = async () => {
    await axios.get(`http://localhost:3000/users?email=${ email.value }&password=${ password.value }`)
        .then(response => {
            let users = response.data;
            if (users[0].email !== email.value) errorEmail.value = "email is incorrect";
            else if (users[0].password !== password.value) errorPassword.value = "password is incorrect"
            else if (users.length > 0 && users[0].password === password.value) {
                localStorage.setItem('users-data', JSON.stringify(users[0]));
                setTimeout(() => {
                    toast.success('Login Successfully !', { autoClose: 2000 });
                }, 0)
                router.push({ name: 'home' });
            } else {
                alert('Email or password is incorrect');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        });
};
onMounted(() => {
    let user = localStorage.getItem('users-data')
    console.log(user)
    if (user) {
        router.push({ name: 'home' })
    }
})

// localStorage.clear()
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>