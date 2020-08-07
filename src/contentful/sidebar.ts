import { gql } from '@apollo/client';
import { getClient } from './client';
import { getRootSlug } from './utils';
import { ContentfulRichText, RICH_TEXT } from './richText';

const SIDEBAR_QUERY = gql`
  query Sidebar($slug: String!, $preview: Boolean!) {
    sidebarCollection(preview: $preview, limit: 1, where: { slug: $slug }) {
      items {
        content ${RICH_TEXT}
      }
    }
  }
`;

export async function fetchSidebar(
  slug: string | string[],
  preview = false
): Promise<ContentfulSidebar | null> {
  const result = await getClient(preview).query({
    query: SIDEBAR_QUERY,
    variables: { preview, slug: getRootSlug(slug) },
  });
  return result.data.sidebarCollection.items?.[0] ?? null;
}

export interface ContentfulSidebar {
  content?: ContentfulRichText;
}
