var express = require('express');
var gpio = require('rpi-gpio');
var path = require('path');
var led = require('./led');
var camera = require('./camera');
var router = express.Router();


gpio.setMode(gpio.MODE_BCM);

let [l1, l2, l3] = [new led(26), new led(13), new led(19)];
let cam = new camera(1440, 900);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { photoUrl: "/images/photo/favicon.png" });
});


router.get('/chat', function (req, res) {
  console.log(path.join(__dirname, '../views/chat.html'));

  res.sendFile(path.join(__dirname, '../views/chat.html'));
});

router.get('/led/switch', function (req, res, next) {
  l1.switch();
  l2.switch();
  l3.switch();
  res.end();
});

router.get('/led/switch/:led', function (req, res, next) {
  if (req.param('led') == '1') l1.switch();
  if (req.param('led') == '2') l2.switch();
  if (req.param('led') == '3') l3.switch();
  res.end();
});

var t1, t2, t3;

router.get('/led/blink', function (req, res, next) {
  t1 = setInterval(() => l1.switch(), 100);
  t2 = setInterval(() => l2.switch(), 250);
  t3 = setInterval(() => l3.switch(), 500);
  res.end();
});

router.get('/led/stop', function (req, res, next) {
  clearInterval(t1);
  clearInterval(t2);
  clearInterval(t3);
  res.end();
});


router.get('/camera/capture', function (req, res, next) {
  l3.open();
  let photoName = cam.capture();
  res.json({ url: '/images/photo/' + photoName });
  setTimeout(l3.close, 200);
});

module.exports = router;
