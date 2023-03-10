export default {
    fitToSize: (width, height, maxWidth, maxHeight) => {
        if(width >= height){
            var ratio = maxWidth / width;
        }else{
            var ratio = maxHeight / height;
        }
        width = width * ratio;
        height = height * ratio;
        return {
            x: (maxWidth - width) / 2,
            y: (maxHeight - height) / 2,
            width: width,
            height: height
        }
    }
}
