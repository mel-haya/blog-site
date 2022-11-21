<template>
    <div class="p-3 container">
        <h1 class="text-light">Create a new post</h1>
        <div class="row form-group mt-4">
            <input type="text" class="form-control fs-1 mb-3" id="title" v-model="title" placeholder="Title">
            <input type="text" class="form-control fs-5 mb-3" id="caption" v-model="caption" placeholder="Caption">
        </div>
        <div id="content">
            <contentItem v-for="item in items" :key="item.id" :item="item" @input="updateContent"  @deleteItem="deleteContent(item)"/>
        </div>
        <div class="row justify-content-start gap-2 mt-3" v-if="postId === ''">
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
        <div v-if="loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="row justify-content-start mt-3 gap-2">
            <button class="btn bg-success p-2 col-5 col-md-2 text-secondary" @click="submit">Save</button>
            <router-link to="/dashboard" class="btn bg-danger p-2 col-5 col-md-2 text-secondary">back</router-link>
            
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue';
    import contentItem from '@/components/Content-item.vue';
    import { uploadFile, addPost, editPost , getDraft} from '@/firebase';
    // import router from '@/router';
    import {useRouter} from 'vue-router/composables'

    export default {
        name: 'CreatePostView',
        components: {
            contentItem
        },
        mounted: async function(){
            if(this.$route.params.id){
                let post = await this.$store.getters.getPostById(this.$route.params.id);
                this.title = post.title;
                this.caption = post.caption;
                this.items = post.contentItems;
                this.postId = post.id;
            }
            let draft = await getDraft();
            if(draft){
                this.$router.push('/post/edit-videos');
            }
        }
        ,setup(props, context) {
            const title = ref('');
            const caption = ref('');
            const items = ref([])
            const postId = ref("");
            const id = ref(0);
            let loading = ref(false);
            const router = useRouter();

            function addContent(type) {
                items.value.push({id: id.value, type: type});
                id.value++;
            }

            function deleteContent(item) {
                items.value = items.value.filter((contentItem) => contentItem.id !== item.id);
            }

            function updateContent(id, value){
                items.value = items.value.map((contentItem) => {
                    if(contentItem.id === id) {
                        contentItem = value;
                    }
                    return contentItem;
                });
            }

            async function submit() {
                try{
                    if(loading.value) return;
                    loading.value = true;
                    let post = {
                        title: title.value,
                        caption: caption.value,
                        'contentItems': items.value
                    }
                    if(postId.value !== ""){
                        console.log(postId.value);
                        await editPost(postId.value, post);
                        router.push('/dashboard');
                        loading.value = false;
                        return;
                    }
                    for(let i = 0; i < post.contentItems.length; i++) {
                        if((post.contentItems[i].type === 'image' || post.contentItems[i].type === 'video') && post.contentItems[i].content) {
                            let file = post.contentItems[i].content;
                            let url = await uploadFile(file);
                            post.contentItems[i].content = url;
                        }
                    }
                    await addPost(post);
                    loading.value = false;
                    router.push('/post/edit-videos');
                } catch (error) {
                    console.log(error);
                }
            }

            return {title,postId, loading,caption, items, id, addContent, deleteContent, updateContent, submit}
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