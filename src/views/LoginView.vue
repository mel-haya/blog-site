<template>
    <div class="row justify-content-center">
        <div class="col-10 col-md-6 bg-light p-4 rounded mt-5">
            <LoginComponent v-if="login" @register="login=false"/>
            <RegisterComponent v-else @login="login=true"/>
        </div>
    </div>
</template>

<script>

    import LoginComponent from '../components/LoginComponent.vue';
    import RegisterComponent from '../components/RegisterComponent.vue';
    export default {
        name: 'LoginView',
        components: {
            LoginComponent,
            RegisterComponent
        },
        data(){
            return {
               login: true 
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>