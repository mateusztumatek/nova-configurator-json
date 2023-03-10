import {WatcherClass} from "./WatcherClass";

export class FieldSource extends WatcherClass{

    fieldName = null;
    rootComponent = null;

    setFieldName(fieldName){
        this.fieldName = fieldName;
        if(this.fieldName.field){
            this.input = this.findField(this.fieldName.field);
            if(this.input){
                this.attachListener();
                this.attachListerToDragarea();
            }
        }
        if(this.fieldName.value){
            this.setImage(this.fieldName.value);
        }
    }

    attachListerToDragarea(){
        this.input.parentElement.addEventListener('drop', (event) => {
            [...event.dataTransfer.items].forEach((item, i) => {
                this.processFile(item.getAsFile())
            })
        })
    }


    findField(field) {
        let elements = document.querySelectorAll('[dusk="' + field + '"]');
        let finded = null;
        for (var i in elements) {
            if (typeof elements[i] === 'object' && elements[i].tagName == 'INPUT') {
                finded = elements[i];
            }
        }
        return finded;
    }

    attachListener(){
        this.input.addEventListener('change', (event) => {
            let file = event.target.files[0];
            this.processFile(file);
        });
    }

    processFile(file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setImage(e.target.result);
            console.log(this);
        };
    }

}
