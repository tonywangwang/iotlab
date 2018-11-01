var shell = require('shelljs')

class camera {

    constructor(imgWidth = 1440, imgHeight = 900, quality = 10, preDelay = 1,localPath = './public/images/photo/', extension = '.jpg', ) {
        this.localPath = localPath;
        this.extension = extension;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.quality = quality;
        this.preDelay = preDelay;
        this.capture = this.capture.bind(this);
    }

    capture() {

        var now = new Date();
        var filedate = now.toISOString().replace(/:/g, '');

        // setup capture with time before shot and no preview
        var code = 'raspistill -t ' + this.preDelay + ' -n ';
        // auto white balance
        code += '-awb auto ';
        // dimensions
        code += '-w ' + this.imgWidth + ' -h ' + this.imgHeight + ' ';
        // quality
        code += '-q ' + this.quality + ' ';
        // flip vertical + horizontal (upside-down camera)
        // code += '-vf -hf ';
        // path to file
        code += '-o ' + this.localPath + filedate + this.extension;

        console.log('shooting image:', this.localPath + filedate + this.extension);
        shell.exec(code);

        return filedate + this.extension;
    }

}

module.exports = camera;