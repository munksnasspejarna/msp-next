import { gql } from '@apollo/client';
import { getClient } from './client';
import { ContentfulRichText, RICH_TEXT } from './richText';

const POST_SUMMARIES_QUERY = gql`
  query Posts($preview: Boolean!, $limit: Int!) {
    postCollection(preview: $preview, limit: $limit, order: [date_DESC]) {
      items {
        title
        slug
        date
        lead ${RICH_TEXT}
      }
    }
  }
`;

export async function fetchPostSummaries(
  preview = false,
  limit = 10
): Promise<ContentfulPostSummary[]> {
  const result = await getClient(preview).query({
    query: POST_SUMMARIES_QUERY,
    variables: { preview, limit },
  });
  return result.data.postCollection.items;
}

export interface ContentfulPostSummary {
  title: string;
  slug: string;
  date: string;
  lead: ContentfulRichText;
}
