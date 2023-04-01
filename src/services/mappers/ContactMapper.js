class ContactMapper {
  toPersistence(domainContact) {
    const persistenceContactParsed = {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };

    return persistenceContactParsed;
  }

  toDomain(toPersistenceContact) {
    const domainContactParsed = {
      name: toPersistenceContact.name,
      email: toPersistenceContact.email,
      phone: toPersistenceContact.phone,
      categoryId: toPersistenceContact.category_id,
    };

    return domainContactParsed;
  }
}

export default new ContactMapper();
