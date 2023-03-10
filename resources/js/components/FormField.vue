<template>
  <DefaultField :field="field" :errors="errors" :show-help-text="showHelpText">
    <template #field>
        <div>
            <div v-if="backgroundWatcherHandler && backgroundWatcherHandler.image">
                <div :key="backgroundWatcherHandler.image">
                    <stage ref="stage" :value="field.value" @change="handleChange" :background="backgroundWatcherHandler.image"></stage>
                    <div v-if="!boundinxBoxRatioMatchPrintSizes()" style="padding: 14px; width: 100%; background-color: #b43a3a; color:white; border-radius: 4px">
                        Szerokość i wysokość ustawionego miejsca znakowania nie ma takich samych proporcji jak podane wymiary.
                        <BasicButton @click="setSimilarRatio()" type="button" size="sm" component="button" class="mt-2 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900">
                            Ustaw podobne proporcję
                        </BasicButton>
                    </div>
                </div>
            </div>
        </div>
    </template>
  </DefaultField>
</template>

<script>
import { DependentFormField, HandlesValidationErrors } from 'laravel-nova'
import {FieldSource} from "../FieldSource";

export default {
  mixins: [DependentFormField, HandlesValidationErrors],
    data:() => {
      return{
          input: null,
          backgroundWatcherHandler :  new FieldSource(),
          print_size: {width:null, height:null},
      }
    },
  props: ['resourceName', 'resourceId', 'field'],

    mounted(){
      setTimeout(() => {
          this.attachEventListenerToInput();
      },500)
        setTimeout(() => {
            this.setPrintWidthAndHeight();
        },1000)

        Nova.$on('print_width-change', (value) => {this.setPrintWidthAndHeight()});
        Nova.$on('print_height-change', (value) => {this.setPrintWidthAndHeight()});
    },
  methods: {
      setSimilarRatio(){
          this.$refs.stage.setRectRatio(this.print_size.height / this.print_size.width);
      },
      boundinxBoxRatioMatchPrintSizes(){
          if(typeof this.value == 'string' && this.value != ' ' && this.value != ''){
              var value_obj = JSON.parse(this.value);
          }else{
              var value_obj = this.value;
          }
          if(value_obj && value_obj.width && value_obj.height && this.print_size.width && this.print_size.height){
              return (Math.abs(value_obj.width / value_obj.height - this.print_size.width / this.print_size.height)) <= 0.018;
          }
          return true;
      },
    setPrintWidthAndHeight(){
        var finded_width = null;
        var finded_height = null;
        if((finded_width = document.querySelectorAll('[dusk="print_width"]'))){
            this.print_size.width = finded_width[0].value;
        }
        if((finded_height = document.querySelectorAll('[dusk="print_height"]'))){
            this.print_size.height = finded_height[0].value;
        }
    },
    handleChange(data){
      this.value = JSON.stringify(data);
    },
      attachEventListenerToInput(){
        if(this.field.image_field) this.backgroundWatcherHandler.setFieldName(this.field.image_field);
        if(this.field.image_source)  /*TODO Write watcher for source background*/ ;
      },
    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
      this.value = this.field.value || ''
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      formData.append(this.field.attribute, this.value || '')
    },
  },
}
</script>
