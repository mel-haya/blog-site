<template>
    <div class="p-3 container">
        <h1 class="text-light">Create a new post</h1>
        <div class="row form-group mt-4">
            <input type="text" class="form-control fs-1 mb-3" id="title" v-model="title" placeholder="Title">
            <input type="text" class="form-control fs-5 mb-3" id="caption" v-model="caption" placeholder="Caption">
        </div>
        <div id="content">
            <contentItem v-for="item in content" :key="item.id" :itemId="item.id" :type="item.type" @deleteItem="deleteContent(item)"/>
        </div>
        <div class="row justify-content-start gap-2 mt-3">
            <div class="col-8 col-md-3" id="addContent" @click="addContent('text')">
                <fa icon="align-left" /> new text
            </div>
            <div class="col-8 col-md-3" id="addContent" @click="addContent('image')">
                <fa icon="image" /> new image
            </div>
            <div class="col-8 col-md-3" id="addContent" @click="addContent('video')">
                <fa icon="video" /> new video
            </div>
        </div>
        <div class="row justify-content-start mt-3 gap-2">
            <button class="btn bg-success p-2 col-5 col-md-2 text-secondary">Save</button>
            <button class="btn bg-danger p-2 col-5 col-md-2 text-secondary">back</button>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import contentItem from '@/components/Content-item.vue';

    export default {
        name: 'CreatePostView',
        components: {
            contentItem
        },
        setup(){
            const title = ref('');
            const caption = ref('');
            const content = ref([])
            let id = ref(0);

            function addContent(type) {
                content.value.push({id: id.value, type: type});
                id.value++;
            }

            function deleteContent(item) {
                console.log(item);
                content.value = content.value.filter((contentItem) => contentItem.id !== item.id);
            }

            return {title, caption, content, id, addContent, deleteContent}
        },
        mounted: function() {
            console.log('CreatePostView mounted');
        }
        
        
    }
</script>

<style lang="scss" scoped>

    #title, #caption{
        border: none;
        background-color: transparent;
        color: #fff;
    }

    #title::placeholder, #caption::placeholder {
        color: rgb(209, 209, 209);
    }

    #addContent{
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        text-align: center;
        border: #aaa dashed 2px;
        border-radius: 10px;
        padding: 1rem 0;
        transition: border 0.5s ease;
    }

    #addContent:hover{
        border: #fff dashed 2px;
    }

</style>