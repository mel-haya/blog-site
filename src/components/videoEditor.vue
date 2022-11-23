<template>
    <div class="mb-3 card row py-4">
        <video v-if="item" width="640" height="480" controls ref="video">
            <source :src="src">
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
    export default {
        name: 'videoEditor',
        props: ['item'],
        emits: ['trim'],
        data: function() {
            return {
                start: 0,
                end: 0,
                duration: 0,
                loading: 'trim'
            }
        },
        computed: {
            src() {
                return URL.createObjectURL(this.item.content);
            }
        },
        mounted: function() {
            this.$refs.video.addEventListener('loadedmetadata', () => {
                this.duration = this.$refs.video.duration;
                this.end = this.duration;
                this.update()
            });
        },
        methods:{
            update(){
                this.$emit("update", {...this.item, start: this.start, end: this.end});
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