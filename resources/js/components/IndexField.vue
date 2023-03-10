<template>
    <div>
        <div v-if="backgroundWatcherHandler">
            <stage :small="true" v-if="field.value && field.value.width && field.value.height" :value="field.value" @change="handleChange" :background="backgroundWatcherHandler.image" :preview="true"></stage>
        </div>
    </div>
</template>

<script>
import {FieldSource} from "../FieldSource";

export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],
    data:() => {
        return{
            input: null,
            backgroundWatcherHandler : null,
        }
    },
    mounted(){
        setTimeout(() => {
            this.attachEventListenerToInput();
        },500)
    },
    methods:{
        attachEventListenerToInput(){
            if(this.field.image_field){
                let backgroundWatcherHandler = new FieldSource();
                backgroundWatcherHandler.setFieldName(this.field.image_field);
                this.backgroundWatcherHandler = backgroundWatcherHandler;
            }
            if(this.field.image_source)  /*TODO Write watcher for source background*/ ;
        },
    }
}
</script>
