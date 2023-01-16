export default (
  _: string | false | 0 | '' | null | undefined,
  alt: string,
  overide?: string
) => {
  if (_) return overide || _;
  return alt;
};
