class ContactMapper {
  toPersistence(domainContact) {
    const persistenceContactParsed = {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryName,
    };

    return persistenceContactParsed;
  }

  toDomain(toPersistenceContact) {
    const domainContactParsed = {
      id: toPersistenceContact.id,
      name: toPersistenceContact.name,
      email: toPersistenceContact.email,
      phone: toPersistenceContact.phone,
      category: {
        id: toPersistenceContact.category_id,
        name: toPersistenceContact.category_name,
      },
    };

    return domainContactParsed;
  }
}

export default new ContactMapper();
