<template>
    <div :class="`carousel-item ${active ? 'active' : ''}`">
        <img src="@/assets/taiga.jpg" class="d-block w-100" >
        <div class="carousel-caption d-none d-md-block">
            <h5>{{caption}}</h5>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CarouselItemVue',
    props: {
        caption: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    }
}

</script>

<style lang="scss" scoped>

</style>