var fs = require('fs');
var Buffer = require('buffer').Buffer;

function checkSignature(buf, sig) {
  for (var i = 0; i < sig.length; i++)
  {
    if (sig[i] instanceof Array)
    {
      var ok = false;
      for (var c in sig[i])
      {
        if (c == bug[i])
        {
          ok = true;
          break;
        }
      }

      if (!ok)
        return false;
    }
    else if (buf[i] != sig[i])
      return false;
  }

  return true;
}

module.exports = function imageType(path) {
  var types = [
    { name: "jpeg", sig: [0xff, 0xd8, 0xff] },
    { name: "png", sig: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] },
    { name: "gif", sig: [0x47, 0x49, 0x46, 0x38, [0x37, 0x39], 0x61] },
    { name: "bmp", sig: [0x42, 0x4D] },
    { name: "ico", sig: [ 0x00, 0x00, 0x01, 0x00] }
  ];

  var buf = new Buffer(8);
  var fd = fs.openSync(path, 'r');
  var count = fs.readSync(fd, buf, 0, 8, 0);
  fs.closeSync(fd);

  if (count < 8)
    return null;

  for (var i = 0; i < types.length; i++)
  {
    if (checkSignature(buf, types[i].sig))
      return types[i].name;
  }

  return null;
};
