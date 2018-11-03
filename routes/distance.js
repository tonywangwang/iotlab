const gpio = require('rpi-gpio');
const sleep = require('sleep');

class distance {
    constructor(triger_pin, ehco_pin) {
        this.t1 = 0;
        this.t2 = 0;
        this.triger_pin = triger_pin;
        this.ehco_pin = ehco_pin;
        this.check = this.check.bind(this);
        gpio.setup(this.triger_pin, gpio.DIR_OUT);
        gpio.setup(this.ehco_pin, gpio.DIR_IN, gpio.EDGE_BOTH);
    }

    check() {
        gpio.write(this.triger_pin, true);
        sleep.usleep(1000);
        gpio.write(this.triger_pin, false);

        while (this.t2 == 0) {
            gpio.read(this.ehco_pin, function (err, value) {
                if (value)
                    this.t1 = Date.now();
                else
                    this.t2 = Date.now();
            });
        }

        console.log('Distance is %s cm', (this.t2 - d.t1) / 1000 * 340 * 100 / 2);
        this.t2 = 0;
        this.t1 = 0;


    }
}


gpio.setMode(gpio.MODE_BCM);

let d = new distance(21, 20);

setInterval(function f() {
    d.check();
}, 500);

/*
gpio.on('change', function (channel, value) {
    if (value) {
        d.t1 = Date.now();
    }
    if (!value) {
        console.log('Distance is %s cm', (Date.now() - d.t1) / 1000 * 340 * 100 / 2);
    }
});*/


module.exports = distance;


