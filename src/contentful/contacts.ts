import { gql } from '@apollo/client';
import { getClient } from './client';

const CONTACTS_QUERY = gql`
  query Contacts($preview: Boolean!) {
    contactCollection(preview: $preview, order: [order_ASC, name_ASC]) {
      items {
        name
        image {
          url
          title
        }
        title
        email
        phone
      }
    }
  }
`;

export async function fetchContacts(
  preview = false
): Promise<ContentfulContact[]> {
  const result = await getClient(preview).query({
    query: CONTACTS_QUERY,
    variables: { preview },
  });
  return result.data.contactCollection.items;
}

export interface ContentfulContact {
  name: string;
  image?: {
    url: string;
    title: string;
  };
  title?: string;
  email?: string;
  phone?: string;
  order?: number;
}
