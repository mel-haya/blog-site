<template>
    <div>
        <h1>Sign up</h1>
        <small v-if="error" class="text-danger">{{error}}</small>
        <RegisterStep1 v-show="step == 1" ref="step1"/>
        <RegisterStep2 v-show="step == 2" ref="step2"/>
        <div class="row m-0 gap-2 mt-3">
            <button class="btn bg-primary col-md-3" @click="next">{{step === 1 ? 'Next' : 'Previous'}}</button>
            <button class="btn bg-primary col-md-3" @click="submit">submit</button>
        </div>
        <small>Do you have an account? <span class="link text-primary" @click="login">Sign in</span>. </small>
        <br/>
        <small>(*)Required</small>
    </div>
</template>

<script>
    import RegisterStep1 from "@/components/RegisterStep1.vue";
    import RegisterStep2 from "@/components/RegisterStep2.vue";

    export default {
        name: 'RegisterComponent',
        data(){
            return {
                step: 1,
                error: ''
            }
        },
        components: {
            RegisterStep1,
            RegisterStep2
        },
        emits: ['login'],
        methods: {
            next(){
                this.step = this.step === 1 ? 2 : 1;
            },
            login(){
                this.$emit('login');
            },
            async submit(){
                if((this.error=this.$refs.step1.check()))
                    return;
                if((this.error=this.$refs.step2.check()))
                    return;
                this.error=""
                try{
                    await this.$refs.step1.create()
                    await this.$refs.step2.submit()
                    this.$store.commit('updateUser')
                    this.$router.push('/verifyEmail')
                }
                catch(err){
                    console.log(err)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>