<template>
    <div class="mb-3 card row py-4 position-relative">
        <div class = "text-end position-absolute"> <fa icon="trash" id="delete-item" @click="deleteItem"/> </div>
        <div v-if="item.type === 'text'" class="col-10 p-2" id="text-content" @focusout="onInput" contenteditable>
            {{src}}
        </div>   
        <div v-else-if="item.type === 'image'" class="col-10">
            <img v-if="src" :src="src" alt="" class="img-thumbnail" crossorigin/>
            <label v-else :for="`image-input-${item.id}`" class="p-4 fs-3 text-center text-muted">
                <fa icon="images"/> Choose image
            </label>
            <input :id="`image-input-${item.id}`" accept="image/*" class="d-none" type="file" @change="changeImage">
            
        </div>

        <div v-else-if="item.type === 'video'" class="col-10">
            <video v-if="src" width="640" height="480" controls>
                <source :src="src">
            </video>
            <label v-else :for="`video-input-${item.id}`" class="p-4 fs-3 text-center text-muted">
                <fa icon="images"/> Choose video
            </label>
            <input :id="`video-input-${item.id}`" accept="video/mp4,video/x-m4v,video/*" class="d-none" @change="changeImage" type="file">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'content-item',
        props:['item'],
        emits:['deleteItem','input'],
        mounted: function(){
            if(this.item.content){
                this.src = this.item.content;
            }
        },
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
                let payload = this.item;
                payload.content = e.target.files[0];
                this.$emit('input', this.item.id, payload);
            },
            onInput(e) {
                let payload = this.item;
                payload.content = e.target.innerText;
                this.$emit('input', this.item.id, payload);
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