<template>
    <div class="row justify-content-center p-3">
        <h1 class="text-secondary">Edit videos</h1>
        <videoEditor class="col-8" v-for="item in videos" :key="item.id" :item="item" @update="updateItem"/>
        <div v-if="videos.length === 0" class="text-muted"> No videos to edit...</div>
        <button class="btn col-5 bg-success text-secondary" @click="publish">publish</button>
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

</style>