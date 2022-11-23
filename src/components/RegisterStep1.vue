<template>
    <div>
        <div class="form-group mb-2">
            <label for="emailInput" >Email address*</label>
            <input type="email" class="form-control" id="emailInput" v-model.lazy="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group mb-2">
            <label for="passInput">Password*</label>
            <input type="password" class="form-control" v-model.lazy="password" id="passInput" placeholder="Password">
        </div>
    </div>
</template>

<script>
    const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    import { createUser } from "@/firebase"
    export default {
        name: 'RegisterStep1',
        methods: {
            check(){
                if(!validateEmail(this.email)){
                    return "Invalid email"
                }
                if(this.password.length < 6){
                    return "Password must be at least 6 characters long"
                }
                return ""
            },
            async create(){
                return await createUser(this.email, this.password)
            }
        },
        data(){
            return {
                email: '',
                password: '',
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>