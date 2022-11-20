<template>
    <div class="row justify-content-center p-3">
        <h1 class="text-secondary">Edit videos</h1>
        <videoEditor class="col-8" v-for="item in videos" :key="item.id" :item="item" @update="updateItem"/>
        <div v-if="videos.length === 0" class="text-muted"> No videos to edit...</div>
        <button class="btn col-5 bg-success text-secondary" @click="publish">publish</button>
    </div>
</template>

<script>
    import { getDraft, publishDraft } from '@/firebase';
    import videoEditor from '@/components/videoEditor.vue';
    export default {
        name: 'editPostView',
        data() {
            return {
                draft: {
                    title: '',
                    caption: '',
                    contentItems: []
                }
            }
        },
        mounted: async function () {
            this.draft = await getDraft()
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
                this.draft.contentItems = this.draft.contentItems.map((contentItem) => {
                    if(contentItem.id === item.id) {
                        contentItem = item;
                    }
                    return contentItem;
                });
            },
            publish() {
                publishDraft(this.draft);
                this.$router.push('/dashboard');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>