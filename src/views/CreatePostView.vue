<template>
    <div class="p-3 container">
        <h1 class="text-light">Create a new post</h1>
        <div class="row form-group mt-4">
            <input type="text" class="form-control fs-1 mb-3" id="title" v-model="title" placeholder="Title">
            <small class="text-danger" v-if="error">Title can't be empty</small>
            <input type="text" class="form-control fs-5 mb-3" id="caption" v-model="caption" placeholder="Caption">
        </div>
        <div id="content">
            <contentItem v-for="item in items" :key="item.id" :item="item" @input="updateContent"  @deleteItem="deleteContent(item)"/>
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
        <div v-if="loading" class="mt-2">
            <div  class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div> 
            <small class="text-secondary">uploading files ...</small>
        </div>
        <div class="row justify-content-start mt-3 gap-2">
            <button class="btn bg-success p-2 col-5 col-md-2 text-secondary" @click.once="submit">Save</button>
            <router-link to="/dashboard" class="btn bg-danger p-2 col-5 col-md-2 text-secondary">back</router-link>
            
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue';
    import contentItem from '@/components/Content-item.vue';
    import { uploadFile, addPost, editPost , getDraft} from '@/firebase';
    import { v4 } from 'uuid'

    export default {
        name: 'CreatePostView',
        components: {
            contentItem
        },
        mounted: async function(){
            let u = this.$store.getters.getUser;
            if(!u){
                this.$router.push('/login');
            }
            else if(!u.emailVerified){
                this.$router.push('/verifyEmail');
            }
            if(this.$route.params.id){
                let post = await this.$store.getters.getPostById(this.$route.params.id);
                this.title = post.title;
                this.caption = post.caption;
                this.items = post.contentItems;
            }
            let draft = this.$store.getters.checkDraft;
            if(draft){
                this.$router.push('/post/edit-videos?r=true');
            }
        },
        data(){
            return {
                title: '',
                caption: '',
                items: [],
                loading: false,
                error: false
            }
        },
        methods: {
            addContent(type){
                this.items.push({
                    id: v4(),
                    type: type,
                    content: ''
                });
            },
            updateContent(item){
                this.items = this.items.map((contentItem) => {
                    if(contentItem.id === item.id) {
                        contentItem = item;
                    }
                    return contentItem;
                });
            },
            deleteContent(item){
                this.items = this.items.filter((contentItem) => contentItem.id !== item.id);
            },
            async submit(){
                try{
                    console.log(this.title)
                    if(this.title === ''){
                        this.error = true;
                        return;
                    }
                    this.loading = true;
                    let post = {
                        title: this.title,
                        caption: this.caption,
                        'contentItems': this.items
                    }
                    if(!this.$route.params.id){
                        this.$store.commit('updateDraft', post);
                        this.$router.push('/post/edit-videos');
                        return;
                    }
                    for(let i = 0; i < post.contentItems.length; i++) {
                        if((post.contentItems[i].content && typeof post.contentItems[i].content !== 'string' )){
                            let file = post.contentItems[i].content;
                            let url = await uploadFile(file);
                            post.contentItems[i].content = url;
                        }
                    }
                    await editPost(this.$route.params.id, post);
                    this.$router.push('/dashboard');  
                }
                catch(err){
                    console.log(err);
                }
                finally{
                    this.loading = false;
                }
            }
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