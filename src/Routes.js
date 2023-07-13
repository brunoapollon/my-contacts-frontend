import { Routes as RoutesDOM, Route } from 'react-router-dom';
import EditContact from './pages/EditContact';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </RoutesDOM>
  );
}
