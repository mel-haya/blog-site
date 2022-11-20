<template>
    <div v-if="item.type === 'text'" class="w-75">
        {{item.content}}
    </div>
    <div v-else-if="item.type === 'image'" class="w-75">
        <img :src="item.content" alt="image" class="img-thumbnail">
    </div>
    <div v-else-if="item.type === 'video'" class="w-75">
        <video :src="`${item.content}#t=${item.start},${item.end}`" controls></video>
    </div>
</template>

<script>
    export default {
        name: 'DisplayItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        setup(props) {
            
        }
    }
</script>

<style lang="scss" scoped>

</style>