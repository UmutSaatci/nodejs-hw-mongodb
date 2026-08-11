const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return undefined;

  const allowedTypes = ['work', 'home', 'personal'];

  if (allowedTypes.includes(type)) {
    return type;
  }

  return undefined;
};

const parseBoolean = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return undefined;

  if (value === 'true') return true;
  if (value === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
