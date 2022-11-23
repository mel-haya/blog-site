<template>
    <div>
        <div class="form-group mb-2">
            <label for="fnameInput">Display name*</label>
            <input type="text" class="form-control" id="fnameInput" placeholder="First name" v-model="displayName">
        </div>
        <div class="form-group mb-2">
            <label for="imageIntput">Avatar</label>
            <input type="file" class="form-control" id="imageIntput" accept="image/*" @change="changeImage">
        </div>
        <div class="form-group mb-2">
            <label for="phoneInput">Phone number</label>
            <input type="text" class="form-control" id="phoneInput" placeholder="Phone number" v-model="phone">
        </div>
    </div>
</template>

<script>

    import { updateUser, uploadFile, sendVerification } from '@/firebase';
    const validatePhone = (phone) => {
    return String(phone)
        .match(
        /^\d+$/
        );
    };

    export default {
        name: 'RegisterStep2',
        data(){
            return{
                displayName: "",
                image: null,
                phone: ""
            }
        },
        methods: {
            check(){
                if(this.displayName == "")
                    return "Please enter your name"
                if(!validatePhone(this.phone))
                    return "Phone number must contain digits only"
                return ""
            },
            changeImage(e)
            {
                this.image = e.target.files[0];
            },
            async submit(){
                if(this.image)
                    this.image = await uploadFile(this.image)
                await updateUser({
                    displayName: this.displayName,
                    photoURL: this.image,
                })
                await sendVerification()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>