const gpio = require('rpi-gpio');
const led = require('./led');

gpio.setMode(gpio.MODE_BCM);

let [l1, l2, l3] = [new led(26), new led(13), new led(19)];

setInterval(l1.switch, 50);
setInterval(l2.switch, 1000);
setInterval(l3.switch, 50);
