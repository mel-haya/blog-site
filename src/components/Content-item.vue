<template>
    <div class="mb-3 row justify-content-center">
        <div class = "text-end"> <fa icon="trash" id="delete-item" @click="deleteItem"/> </div>
        <div v-if="type === 'text'" class="col-10 p-2" id="text-content" placeholder="text" contenteditable>
        </div>   
        <div v-else-if="type === 'video'" class="col-10">
            <label for="video-input" class="p-4 fs-3 text-center text-muted">
                <fa icon="images"/> Choose video
            </label>
            <input id="video-input" class="form-control d-none" type="file">
        </div>

        <div v-else-if="type === 'image'" class="col-10">
            <label for="video-input" class="p-4 fs-3 text-center text-muted">
                <fa icon="images"/> Choose image
            </label>
            <input id="video-input" class="form-control d-none" type="file">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'content-item',
        props:['type'],
        emits:['deleteItem'],
        methods: {
            deleteItem() {
                this.$emit('deleteItem');
            }
        }
    }
</script>

<style lang="scss" scoped>
    #text-content{
        border: none;
        background-color: transparent;
        color: #fff;
        border-radius: 5px;

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