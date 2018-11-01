const gpio = require('rpi-gpio');

class led {
    constructor(pin) {
        this.pin = pin;
        this.value = false;
        this.switch = this.switch.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        gpio.setup(this.pin, gpio.DIR_OUT);
    }
    switch() {
        this.value = this.value ? false : true
        gpio.write(this.pin, this.value);
    }

    open() {
        gpio.write(this.pin, true);
    }

    close() {
        gpio.write(this.pin, false);
    }
}

module.exports=led;






