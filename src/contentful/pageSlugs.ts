import { gql } from '@apollo/client';
import { getClient } from './client';

const PAGES_QUERY = gql`
  query Pages {
    pageCollection {
      items {
        slug
      }
    }
  }
`;

export async function fetchPageSlugs(): Promise<ContentfulPageSlug[]> {
  const result = await getClient(false).query({
    query: PAGES_QUERY,
  });
  return result.data.pageCollection.items;
}

export interface ContentfulPageSlug {
  slug: string;
}
