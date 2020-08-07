import { gql } from '@apollo/client';
import { Document } from '@contentful/rich-text-types';

export const RICH_TEXT = gql`
  {
    json
    links {
      entries {
        hyperlink {
          __typename
          sys {
            id
          }
          ... on Page {
            slug
          }
          ... on Post {
            slug
          }
        }
      }
      assets {
        hyperlink {
          sys {
            id
          }
          url
        }
      }
    }
  }
`;

export interface ContentfulRichText {
  json: Document;
  links: {
    entries: {
      hyperlink: ContentfulEntryHyperlink[];
    };
    assets: {
      hyperlink: ContentfulAssetHyperlink[];
    };
  };
}

export interface ContentfulEntryHyperlink {
  __typename: 'Page' | 'Post';
  sys: {
    id: string;
  };
  slug: string;
}

export interface ContentfulAssetHyperlink {
  sys: {
    id: string;
  };
  url: string;
}
