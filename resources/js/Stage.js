import FitMixin from './fitMixin'
import Konva from 'konva';
export class Stage {

    constructor(container, width = null, height = null){
        this.container = container;
        this.minWidth = (width)? width : 600;
        this.minHeight = (height)? height : 600;
        this.initContainer();
        this.rectPosition = {};
    }

    initContainer(){
        this.stage = new Konva.Stage({
            container: this.container,   // id of container <div>
            width: this.minWidth,
            height: this.minHeight
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
    }


    setBackgroundSize(imageObj){
        let fit = this.fitToSize(imageObj.width, imageObj.height, this.minWidth, this.minHeight);
        this.background_obj.width(fit.width);
        this.background_obj.height(fit.height);
        this.background_obj.x(fit.x);
        this.background_obj.y(fit.y);
    }

    loadBackground(background){
        return new Promise((resolve, reject) => {
            var imageObj = new Image();
            imageObj.onload = () => {
                this.background_obj = new Konva.Image({
                    x: 0,
                    y: 0,
                    image: imageObj
                });
                this.layer.add(this.background_obj);
                this.background_obj.moveToBottom();
                this.setBackgroundSize(imageObj);
                resolve();
            };
            imageObj.src = background;
        })
    }

    changeBackground(src){
        var imageObj = new Image();
        imageObj.src = src;
        imageObj.onload = () => {
            this.background_obj.image(imageObj);
            this.setBackgroundSize(imageObj);
        }
    }

    attachRectangle(preview = false){
        let layer = new Konva.Layer();
        let width = this.minWidth / 3;
        var rect1 = new Konva.Rect({
            name: 'rect',
            x: (this.minWidth - width) / 2,
            y: (this.minWidth - width) / 2,
            width: width,
            draggable: preview == false,
            height: width,
            fill: 'red',
            opacity: 0.4
        });
        this.rect = rect1;
        layer.add(rect1);
        this.stage.add(layer);
        rect1.moveToTop();

        this.transformer = new Konva.Transformer({
            nodes: [rect1]
        });
        this.transformer.rotateEnabled(false);

        rect1.on('dragmove', () => {
            this.updateRectPosition(rect1);
        });
        rect1.on('transform', () => {
            this.updateRectPosition(rect1);
        });
        layer.add(this.transformer);
    }

    updateRectPosition(elem){
        this.rectPosition = {
            originalWidth : parseFloat(this.minWidth),
            originalHeight: parseFloat(this.minHeight),
            width: parseFloat((elem.width() * elem.scaleX()).toFixed(2)),
            height: parseFloat((elem.height() * elem.scaleY()).toFixed(2)),
            x: parseFloat((elem.x()).toFixed(2)),
            y: parseFloat((elem.y()).toFixed(2))
        }
    }

    setDefaultRectPosition(config){
        try {
            if(config.width && config.height){
                let ratio = this.minWidth / config.originalWidth;
                this.rect.width(config.width * ratio);
                this.rect.height(config.height * ratio);
                this.rect.x(config.x * ratio);
                this.rect.y(config.y * ratio);
                this.updateRectPosition(this.rect);
            }
        }catch (e) {
            console.error('Cant set rect '+e.message, config);
        }
    }

    disableTransformer(){
        this.transformer.destroy();
    }
}

Object.assign(Stage.prototype, FitMixin);
