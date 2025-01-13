var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var webcrypto = crypto.webcrypto;

async function wait (ms) {
    var arr = new Uint8Array(1);
    var salt = (crypto.getRandomValues(arr));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(salt);
    }, ms)
  });
}

router.get('/', async function(req, res){
  console.log('before wait', new Date());
  var result = 0;

  await wait(5 * 1000)
  .then(data => {
    console.log('after wait', data);
    res.send(data);
  })
  .catch(error => {
    console.log('after wait,', error);
    res.send(error);
  })
});

module.exports = router;
