import { gql } from '@apollo/client';
import { getClient } from './client';
import { getFullSlug } from './utils';
import { RICH_TEXT, ContentfulRichText } from './richText';

const POST_QUERY = gql`
  query Post($slug: String!, $preview: Boolean!) {
    postCollection(preview: $preview, limit: 1, where: { slug: $slug }) {
      items {
        title
        slug
        date
        image {
          url
          title
        }
        lead ${RICH_TEXT}
        content ${RICH_TEXT}
      }
    }
  }
`;

export async function fetchPost(
  slug: string | string[],
  preview = false
): Promise<ContentfulPost | null> {
  const result = await getClient(preview).query({
    query: POST_QUERY,
    variables: { preview, slug: getFullSlug(slug) },
  });
  return result.data.postCollection.items?.[0] ?? null;
}

export interface ContentfulPost {
  title: string;
  slug: string;
  date: string;
  image?: {
    url: string;
    title: string;
  };
  lead: ContentfulRichText;
  content?: ContentfulRichText;
}
