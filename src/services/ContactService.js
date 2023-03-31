import HttpClient from './utils/HttpClient';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderby=${orderBy}`);
  }

  createContact(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }
}

export default new ContactService();
