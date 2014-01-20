function Scale(scales) {
  // default scales
  this.scales = { 
    "C"   : ["", "#"],
    "D"   : ["b", "", "#"],
    "E"   : ["b", ""],
    "F"   : ["", "#"],
    "G"   : ["b", "", "#"],
    "A"   : ["b", "", "#"],
    "B"   : ["b", ""],
    "rest": []
  };
  if(scales != undefined) {
    this.scales = scales;
  }
}

Scale.prototype.getScale = function(scale, $dom) {
  var result = scale;
  var options = this.scales[scale];

  // return rest
  if(scale == "rest") return scale;

  var idString = "";
  if($dom.attr('id') != undefined) {
    idString = $dom.attr('id');
  } 
  var classString = "";
  if($dom.attr('class') != undefined) {
    classString = $dom.attr('class');
  }

  var option = options[idString.length % options.length];
  var num = classString.length % 7 + 1;
  
  return result + option + num;
}
