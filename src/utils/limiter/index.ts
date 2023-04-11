const TEXT_OVERFLOW = '...';

const truncate = (str: string, overflow: string, limit: number) => {
  return str.length > limit
    ? str.slice(0, overflow.length - 1) + TEXT_OVERFLOW
    : str;
};

export default truncate;
