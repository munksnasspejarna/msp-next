import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import {
  fetchContacts,
  fetchSidebar,
  ContentfulSidebar,
  ContentfulContact,
} from '../contentful/data';
import Contact from '../components/Contact';
import Sidebar from '../components/Sidebar';
import { renderDocument } from '../contentful/render';
import MainContent from '../components/MainContent';
import { siteName } from '../config';

interface Props {
  contacts: ContentfulContact[];
  sidebar: ContentfulSidebar | null;
}

const ContactPage: NextPage<Props> = ({ contacts, sidebar }) => (
  <MainContent>
    <Head>
      <title>Kontaktuppgifter – {siteName}</title>
    </Head>

    <div>
      <h1>Kontaktuppgifter</h1>
      <div className="contacts">
        {contacts.map((contact) => (
          <Contact key={contact.name} contact={contact} />
        ))}
      </div>
    </div>

    {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}

    <style jsx>{`
      .contacts {
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 1rem;
        justify-items: center;
      }

      @media (min-width: 640px) {
        .contacts {
          grid-template-columns: 1fr 1fr;
        }
      }
    `}</style>
  </MainContent>
);

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [contacts, sidebar] = await Promise.all([
    fetchContacts(preview),
    fetchSidebar('kontakt', preview),
  ]);
  return { props: { contacts, sidebar } };
};

export default ContactPage;
