class CategoryMapper {
  toDomain(PersistenceCategory) {
    return {
      id: PersistenceCategory.id,
      name: PersistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
