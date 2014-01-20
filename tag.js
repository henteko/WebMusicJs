function Tag(tags, scales) {
  // default tags
  this.tags = {
    "P"  : "C",
    "IMG" : "D",
    "SPAN"  : "E",
    "FORM" : "F",
    "UL"   : "G",
    "A"    : "A",
    "TABLE": "B",
    "CODE" : "rest"
  };
  if(tags != undefined) {
    var _tags = {};
    for(key in tags) {
      _tags[key.toUpperCase()] = tags[key];
    }
    this.tags = _tags;
  }

  if(scales != undefined) {
    this.scale = new Scale(scales);
  }else {
    this.scale = new Scale();
  }
}

Tag.prototype.convert = function($dom) {
  var result = "";
  var tag = $dom[0].tagName;
  var self = this;
  $.each(this.tags, function(key, scale) {
    if(tag == key) {
      var scale = self.tags[tag];
      if(scale != 'rest') {
        result = self.scale.getScale(self.tags[tag].toUpperCase(), $dom);
      }else {
        result = self.scale.getScale(self.tags[tag], $dom);
      }
    }
  });

  return result;
}
