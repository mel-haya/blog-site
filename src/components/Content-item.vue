<template>
    <div class="mb-3 card row py-4 position-relative">
        <div class = "text-end position-absolute"> <fa icon="trash" id="delete-item" @click="deleteItem"/> </div>
        <div v-if="type === 'text'" class="col-10 p-2" id="text-content" placeholder="text" contenteditable>
        </div>   
        <div v-else-if="type === 'image'" class="col-10">
            <img v-if="src" :src="src" alt="" class="img-thumbnail"/>
            <label v-else :for="`image-input-${itemId}`" class="p-4 fs-3 text-center text-muted">
                <fa icon="images"/> Choose image
            </label>
            <input :id="`image-input-${itemId}`" accept="image/*" class="d-none" type="file" @change="changeImage">
            
        </div>

        <div v-else-if="type === 'video'" class="col-10">
            <video v-if="src" width="640" height="480" controls>
                <source :src="src">
            </video>
            <label v-else :for="`video-input-${itemId}`" class="p-4 fs-3 text-center text-muted">
                <fa icon="images"/> Choose video
            </label>
            <input :id="`video-input-${itemId}`" accept="video/mp4,video/x-m4v,video/*" @change="changeImage" type="file">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'content-item',
        props:['type','itemId'],
        emits:['deleteItem'],
        data: function() {
            return {
                src: ""
            }
        },
        methods: {
            deleteItem() {
                this.$emit('deleteItem');
            },
            changeImage(e)
            {
                this.src = URL.createObjectURL(e.target.files[0]);
            }

        }
    }
</script>

<style lang="scss" scoped>
    .card{
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #00000044;
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: white;
    }

    label{
        cursor: pointer;
    }

    #text-content{
        border: none;
        background-color: transparent;
        color: #fff;
        border-radius: 5px;
        outline: 1px solid #48BF9166;
    }

    #text-content:focus{
        outline: 4px solid #48BF9166;
        
    }

    #text-content::placeholder {
        color: rgb(209, 209, 209);
    }

    #delete-item{
        color: rgb(209, 209, 209);
        cursor: pointer;

    }

    #delete-item:hover{
        color: #fff;
    }
    
</style>