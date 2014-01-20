function WebMusic($dom, option) {
  if(typeof option === 'undefined') option = {};
  this.$dom = $dom;
  this.option = option;

  this.data = [];
  this.note = new Note();
  this.instrument = new Instrument();

  if(this.option['tags'] == undefined) {
    this.tag = new Tag();
  }else {
    this.tag = new Tag(this.option['tags'], this.option['scales']);
  }
}

WebMusic.prototype.getData = function() {
  var self = this;

  var $divs = this.$dom.find('div');
  var datas = [];
  $divs.each(function(key, div) {
    var $div = $(div);
    var count = self.findChildrenCount($div);
    if(datas[count] == undefined) datas[count] = [];
    datas[count].push($div);
  });

  for(index in datas) {
    var doms = datas[index];
    var count = 0;
    $.each(doms, function(key, $dom) {
      var noteNum = self.note.getNum($dom);
      var note = self.note.convertNote(noteNum);
      var scales = self.parse($dom, [], false);
      var instrument = self.instrument.getInstrument(count);

      var _scales = [];
      $.each(scales, function(_key, scale) {
        if(scale == "rest") {
          self.data.push({
            'instrument': instrument,
            'note': note,
            'scales': [scale]
          });
          count += 1;
        }else {
          // 5 limit
          if(_scales.length >= 5) return;
          _scales.push(scale);
        }
      });
      if(_scales.length > 0) {
        self.data.push({
          'instrument': instrument,
          'note': note,
          'scales': _scales
        });
        count += 1;
      }
    });
  }

  return this.data;
}

WebMusic.prototype.parse = function($dom, scales, flag) {
  var scale = this.tag.convert($dom);
  if(scale != "") scales.push(scale); 
  var $children = $dom.children();
  if($children.size() == 0 || flag) {
    // loop end 
    return scales;
  }

  var self = this;
  $children.each(function(key, child) {
    scales = self.parse($(child), scales, true);
  });
  return scales;
}

WebMusic.prototype.findChildrenCount = function($dom, count) {
  if(typeof count === 'undefined') count = 1;
  var tag = $dom[0].tagName;
  var $children = $dom.children(tag);
  if($children.size() == 0) {
    return count;
  }
  count += 1;

  var self = this;
  var _count = count;
  $children.each(function(key, child) {
    var _c = self.findChildrenCount($(child), count);
    _count = Math.max(_count, _c);
  });
  return _count;
}
