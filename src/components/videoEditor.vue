<template>
    <div class="mb-3 card row py-4">
        <video v-if="item" width="640" height="480" controls ref="video">
            <source :src="item.content">
        </video>
        <div>video duration is : {{duration}} seconds</div>
        <div class="row mt-3">
            <label :for="`start-${item.id}`" class="col-lg-2  col-form-label">start:</label>
            <div class="col-lg-3">
                <input type="number" class="form-control" :id="`start-${item.id}`" v-model.lazy.number="start" @focusout="update"> seconds
            </div>
            <label :for="`end-${item.id}`" class="col-lg-2 col-form-label">end:</label>
            <div class="col-lg-3">
                <input type="number" class="form-control" id="`end-${item.id}`" v-model.lazy.number="end" @focusout="update"> seconds
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
    export default {
        name: 'videoEditor',
        props: ['item'],
        setup(props, context) {
            const video = ref(null);
            const start = ref(0);
            const end = ref(0);
            const duration = ref(0)
            onMounted(function() {
                video.value.addEventListener('loadedmetadata', function(){
                    duration.value = video.value.duration;
                    end.value = video.value.duration;
                    update()
                });
            });

            function update(){
                context.emit("update", {...props.item, start: start.value, end: end.value});
            }

            return {
                video,
                start,
                end,
                duration,
                update
            }
        },

        watch: {
            start: function (val) {
                val = parseInt(val)
                if (val > this.end) {
                    this.start = this.end;
                }
                else if( val < 0 ){
                    this.start = 0;
                }
            },
            end: function (val) {
                val = parseInt(val)
                if(val == '' || val > this.duration){
                    this.end = this.duration;
                }
                else if (val < this.start) {
                    this.end = this.start;
                }
            }
        }
        

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