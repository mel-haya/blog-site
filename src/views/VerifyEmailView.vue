<template>
    <div class="row justify-content-center mt-2 mt-md-5">
        <div class="col-10 col-md-5 bg-light p-3 rounded">
            <h1>Confirm Email</h1>
            <p>Please check your email for a confirmation link.</p>
            <button @click="login" class="btn btn-success">Back to login</button>
        </div>
    </div>
</template>

<script>
import { logout } from "@/firebase"
    export default {
        methods: {
            login: async function(){
                await logout();
                this.$store.commit('updateUser');
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>