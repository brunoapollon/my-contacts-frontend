import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderby=${orderBy}`);
  }

  createContact(contact) {
    const contactParsed = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', { body: contactParsed });
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
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
