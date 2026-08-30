import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filterParams,
  userId,
}) => {
  const queryFilter = {
    userId,
  };

  if (filterParams?.contactType !== undefined) {
    queryFilter.contactType = filterParams.contactType;
  }

  if (filterParams?.isFavourite !== undefined) {
    queryFilter.isFavourite = filterParams.isFavourite;
  }

  // Sayfalandırma için atlanacak öğe hesabı
  const skip = (page - 1) * perPage;

  // Sıralama objesi
  const sortObject = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // Ancak sorguyu sadece bu kullanıcının döküman sayısıyla sınırlayarak performansı koruyoruz.
  const countPromise = ContactsCollection.countDocuments(queryFilter);

  // Mimarindeki .lean() ve .select('-__v') gibi harika performans optimizasyonları aynen korunmuştur
  const dataPromise = ContactsCollection.find(queryFilter)
    .sort(sortObject)
    .skip(skip)
    .limit(perPage)
    .select('-__v')
    .lean()
    .exec();

  // Paralel olarak sorguları çalıştırır
  const [totalItems, contacts] = await Promise.all([countPromise, dataPromise]);

  // Güvenli sayfa verilerini hesaplar
  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return {
    contacts,
    paginationData,
  };
};

export const getContactById = async ({ contactId, userId }) => {
  return await ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return result.value;
};

export const deleteContact = async (contactId, options = {}) => {
  const result = await ContactsCollection.findOneAndDelete(
    { _id: contactId },
    options,
  );
  if (!result) return null;

  return result;
};
