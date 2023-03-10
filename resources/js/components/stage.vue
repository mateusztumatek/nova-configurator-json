<template>
    <div>
        <div :id="uuid+'_konva-container'"></div>
    </div>
</template>
<script>
    import {Stage} from "../Stage";
    import {hash} from "../helpers";

    export default {
        props:['background', 'value', 'preview', 'small'],
        data:() => {
            return{
                config:{
                    width: 200,
                    height: 200
                },
                stage : null,
                uuid: null
            }
        },
        computed:{
            rectSettings(){
                return (this.stage)? this.stage.rectPosition : null;
            }
        },
        watch:{
            rectSettings(){
                this.$emit('change', this.stage.rectPosition);
            },
            background(){
                if(this.background){
                    this.stage.changeBackground(this.background);
                }
            }
        },
        mounted(){
            this.uuid = hash();
            setTimeout(() => {
                var width = 600;
                var height = 600;
                if(this.preview){
                    var width = 250;
                    var height = 250;
                }
                if(this.small){
                    var width = 60;
                    var height = 60;
                }
                this.stage = new Stage('#'+this.uuid+'_konva-container', width, height);

                this.stage.attachRectangle(this.preview);
                if(this.background){
                    this.loadBackground();
                }
            },100)
        },
        methods:{
            setRectRatio(ratio){
                this.stage.rect.scaleX(1);
                this.stage.rect.scaleY(1);
                this.stage.rect.height(this.stage.rect.width() * ratio);
                this.stage.updateRectPosition(this.stage.rect);

            },
            loadBackground(){
                return this.stage.loadBackground(this.background).then(res => {
                    if(this.value){
                        this.stage.setDefaultRectPosition(this.value);
                    }
                    if(this.preview){
                        this.stage.disableTransformer();
                    }
                });
            }
        }
    }
</script>
