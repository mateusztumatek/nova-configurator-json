<template>
    <PanelItem :field="field">
        <div v-if="backgroundWatcherHandler && backgroundWatcherHandler.image">
            <stage :value="field.value" @change="handleChange" :background="backgroundWatcherHandler.image" :preview="true"></stage>
        </div>
    </PanelItem>
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
            if(this.field.image_field) this.backgroundWatcherHandler = new FieldSource(this.field.image_field, this.$root);
            if(this.field.image_source)  /*TODO Write watcher for source background*/ ;
        },
    }
}
</script>
