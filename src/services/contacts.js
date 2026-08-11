import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filterParams,
}) => {
  // Dinamik MongoDB filtreleme nesnesi oluşturma
  const queryFilter = {};

  if (filterParams.contactType !== undefined) {
    queryFilter.contactType = filterParams.contactType;
  }

  if (filterParams.isFavourite !== undefined) {
    queryFilter.isFavourite = filterParams.isFavourite;
  }

  // Sayfalandırma için atlanacak öğe hesabı
  const skip = (page - 1) * perPage;

  // Sıralama objesi
  const sortObject = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // Filtre yoksa koleksiyon sayısını doğrudan meta veriden oku
  const hasFilter = Object.keys(queryFilter).length > 0;
  const countPromise = hasFilter
    ? ContactsCollection.countDocuments(queryFilter)
    : ContactsCollection.estimatedDocumentCount();

  // .lean() eklenerek RAM kullanımı azaltıldı ve hız artırır
  // .select('-__v') ile de gereksiz sürüm alanları eler
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

export const getContactByID = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
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

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const result = await ContactsCollection.findOneAndDelete(contactId);
  return result;
};
