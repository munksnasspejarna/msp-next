import { gql } from '@apollo/client';
import { getClient } from './client';

const POST_SLUGS_QUERY = gql`
  query Posts {
    postCollection {
      items {
        slug
      }
    }
  }
`;

export async function fetchPostSlugs(): Promise<ContentfulPostSlug[]> {
  const result = await getClient(false).query({
    query: POST_SLUGS_QUERY,
  });
  return result.data.postCollection.items;
}

export interface ContentfulPostSlug {
  slug: string;
}
