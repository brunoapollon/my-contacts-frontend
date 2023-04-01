import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderby=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  createContact(contact) {
    const contactParsed = ContactMapper.toPersistence(contact);

    return this.httpClient.post('/contacts', { body: contactParsed });
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  updateContact(id, contact) {
    const contactParsed = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, { body: contactParsed });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactService();
