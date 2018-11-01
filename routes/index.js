var express = require('express');
var gpio = require('rpi-gpio');
var led = require('./led');
var camera = require('./camera');
var router = express.Router();

gpio.setMode(gpio.MODE_BCM);

let [l1, l2, l3] = [new led(26), new led(13), new led(19)];
let cam = new camera(1440,900);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ photoUrl: "/images/photo/favicon.png" });
});

router.get('/led/1', function(req, res, next) {
  l1.switch();
  res.end();
  
});

router.get('/led/2', function(req, res, next) {
  l2.switch();
  res.end();
});

router.get('/led/3', function(req, res, next) {
  l3.switch();
  res.end();
});

router.get('/camera/capture', function(req, res, next) {
   l3.open();
   let photoName = cam.capture();
   res.json({url:'/images/photo/'+photoName});
   setTimeout(l3.close,200);
});

module.exports = router;
