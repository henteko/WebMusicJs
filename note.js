function Note() {
  this.nums = [
    1, 0.75, 0.5, 0.25, 0.125
  ];
  this.notes = { 
    "1": "whole",
    "0.75": "dottedHalf",
    "0.5": "half",
    "0.25": "quarter",
    "0.125": "eighth"
  };
}

Note.prototype.getNum = function($dom) {
  var result = $dom.text().length % this.nums.length;
  return this.nums[3]
}

Note.prototype.convertNote = function(num) {
  return this.notes["" + num];
}
