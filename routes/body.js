const gpio = require('rpi-gpio');
const led = require('./led');

gpio.setMode(gpio.MODE_BCM);
gpio.setup(22, gpio.DIR_IN, gpio.EDGE_BOTH);

let [l1, l2, l3] = [new led(26), new led(13), new led(19)];


gpio.on('change', function (channel, value) {
    if (value) {
        l3.open();
        l2.close();
        console.log('人有靠近 %s',channel);
    }
    else {
        l3.close();
        l2.open();
        console.log('附近无人 %s',channel);
    }
});









