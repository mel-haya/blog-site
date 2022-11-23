<template>
    <div>
        <h1>Login</h1>
            <small v-if="error" class="text-danger">{{error}}</small>
            <div class="form-group">
                <label for="emailIntput">Email address</label>
                <input type="email" class="form-control" id="emailIntput" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            </div>
            <div class="form-group">
                <label for="passInput">Password</label>
                <input type="password" class="form-control" id="passInput" placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary mt-3" @click="login">Submit</button>
            <br/>
            <small>Do you have an account? <span class="text-primary link" @click="register">Create an account</span>. </small>  
    </div>
</template>

<script>
    import { login } from "@/firebase"

    export default {
        name: 'LoginComponent',
        emits: ['login', 'register'],
        data(){
            return {
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            async login(){
                try{
                    let res = await login(this.email, this.password)
                    this.$store.commit('updateUser')
                    this.$router.push('/dashboard')
                }
                catch(err){
                    this.error = err.message
                }
            },
            register(){
                this.$emit('register');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>