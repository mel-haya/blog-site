<template>
    <div v-if="item.type === 'text'" class="w-75">
        {{item.content}}
    </div>
    <div v-else-if="item.type === 'image'" class="w-75">
        <img :src="item.content" alt="image" class="img-thumbnail">
    </div>
    <div v-else-if="item.type === 'video'" class="w-75" >
        <video class="w-100" :src="`${item.content}#t=${item.start},${item.end}`" ref="video" @click="pause" @timeupdate="reset"></video>
    </div>
</template>

<script>
import { watch } from 'vue';
    export default {
        name: 'DisplayItem',
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            pause(){
                if(this.$refs.video.paused){
                    this.$refs.video.play();
                }
                else{
                    this.$refs.video.pause();
                }    
            },
            reset(){
                let current = this.$refs.video.currentTime;
                console.log(current)
                if(current >= this.item.end){
                    this.$refs.video.currentTime = this.item.start;
                    this.$refs.video.pause()
                }
                else if(current < this.item.start){
                    this.$refs.video.currentTime = this.item.start;
                }
            }
        },
       
        
    }
</script>

<style lang="scss" scoped>

</style>