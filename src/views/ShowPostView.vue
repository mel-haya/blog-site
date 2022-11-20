<template>
    <div class="container p-3 ">
        <h1 class="display-2 text-secondary">{{post.title }}</h1>
        <h5 class="lead text-primary">{{post.caption}}</h5>
        <div class="mb-3 card row py-4 ">
            <DisplayItem v-for="item in post.contentItems" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<script>
    import DisplayItem from '@/components/DisplayItem.vue';
    export default {
        name: 'ShowPostView',
        components: {
            DisplayItem
        },
        data() {
            return {
                post: {
                    title: '',
                    caption: '',
                    contentItems: []
                },
            }
        },
        mounted: async function() {
            this.post = await this.$store.getters.getPostById(this.$route.params.id);
        },
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
</style>