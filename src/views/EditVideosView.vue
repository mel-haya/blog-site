<template>
    <div class="row justify-content-center p-3">
        <h1 class="text-secondary">Edit videos</h1>
        <videoEditor class="col-8" v-for="item in videos" :key="item.id" :item="item" @update="updateItem"/>
        <div v-if="videos.length === 0" class="text-muted"> No videos to edit...</div>
        <button class="btn col-5 bg-success text-secondary" @click="publish">publish</button>
        <div id="submit-popup-container" v-if="popup">
            <div id="submit-popup-body"  class="px-4 py-3  text-secondary bg-dark">
                <h2 class="text-danger">Submit post</h2>
                <p>you must submit this post before creating new one.</p>   
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-danger" @click="popup=false">Ok</button>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
    import { publishDraft } from '@/firebase';
    import videoEditor from '@/components/videoEditor.vue';
    import { uploadFile } from '@/firebase';


    export default {
        name: 'editPostView',
        data() {
            return {
                draft: this.$store.state.draft,
                popup: false
            }
        },
        mounted: function() {
            let u = this.$store.getters.getUser;
            if(!u){
                this.$router.push('/login');
            }
            else if(!u.emailVerified){
                this.$router.push('/verifyEmail');
            }
            if(this.$route.query.r)
                this.popup= true
        },
        components: {
            videoEditor
        },
        computed: {
            videos() {
                return this.draft.contentItems.filter((item) => item.type === 'video');
            }
        },
        methods: {
            updateItem(item) {
                console.log(item)
                this.draft.contentItems = this.draft.contentItems.map((contentItem) => {
                    if(contentItem.id === item.id) {
                        contentItem = item;
                    }
                    return contentItem;
                });
            },
            async publish() {
                for(let i = 0; i < this.draft.contentItems.length; i++) {
                    if((this.draft.contentItems[i].content && typeof this.draft.contentItems[i].content !== 'string' )){
                        let file = this.draft.contentItems[i].content;
                        let url = await uploadFile(file);
                        this.draft.contentItems[i].content = url;
                    }
                }
                publishDraft(this.draft);
                this.$store.commit('emptyDraft');
                this.$router.push('/dashboard');
            }
        }
    }
</script>

<style lang="scss" scoped>
#submit-popup-container{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
}

#submit-popup-body{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    border-radius:10px;
    padding:25px;
    border:  5px solid #333;
}
</style>