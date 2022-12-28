const isAvailable = (_, alt, overide) => {
  if (_) return overide || _;
  return alt;
};

module.exports = isAvailable;
