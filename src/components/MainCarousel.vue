<template>
    <div class="row">
        <div id="mainCarousel" class="col-8 carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <CarouselItemVue caption="test1" :active="true"/>
                <CarouselItemVue caption="test2"/>
                <CarouselItemVue caption="test3"/>
            </div>
        </div>
    </div>
</template>

<script>

import CarouselItemVue from './CarouselItem.vue';

export default {
    name: 'MainCarousel',
    components: {
        CarouselItemVue
    }
}

</script>

<style lang="scss" scoped>

.carousel-indicators [data-bs-target] {
    width: 10px;
    height: 10px;
    background-color: #fff;
}

.carousel-indicators [data-bs-target].active{
    width: 15px;
    height: 15px;
    background-color: #48BF91;
}

</style>