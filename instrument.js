function Instrument() {
}

Instrument.prototype.getInstrument = function(count) {
  if(count % 2 != 0) return 1;
  return 0;
}
