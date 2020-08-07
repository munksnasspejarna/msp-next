import {
  INLINES,
  BLOCKS,
  EntryHyperlink,
  AssetHyperlink,
  AssetLinkBlock,
  Hyperlink,
} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import PageLink from '../components/PageLink';
import PostLink from '../components/PostLink';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ContentfulRichText } from './richText';

export function renderRichText(richText: ContentfulRichText) {
  const entryHyperlinks = richText.links.entries.hyperlink;
  const assetHyperlinks = richText.links.assets.hyperlink;

  const options: Options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const link = node as EntryHyperlink;
        const targetId = link.data.target.sys.id;
        const entry = entryHyperlinks.find((e) => e.sys.id === targetId);

        if (entry?.__typename === 'Page') {
          return (
            <PageLink slug={entry.slug}>
              <a>{children}</a>
            </PageLink>
          );
        } else if (entry?.__typename === 'Post') {
          return (
            <PostLink slug={entry.slug}>
              <a>{children}</a>
            </PostLink>
          );
        }
        return <b>UNKNOWN ENTRY</b>;
      },
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        const link = node as AssetHyperlink;
        const targetId = link.data.target.sys.id;
        const asset = assetHyperlinks.find((e) => e.sys.id === targetId);

        if (asset) {
          return (
            <a href={asset.url} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        }
        return <b>UNKNOWN ASSET</b>;
      },
      // TODO
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const link = node as AssetLinkBlock;
        const target = link.data.target;
        // if (isAsset(target)) {
        //   return (
        //     <img src={target.fields.file?.url} alt={target.fields.title} />
        //   );
        // }
        return <b>UNKNOWN ASSET</b>;
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const link = node as Hyperlink;
        const uri = link.data.uri;
        if (uri.startsWith('/')) {
          return (
            <Link href={uri}>
              <a>{children}</a>
            </Link>
          );
        }
        return <a href={uri}>{children}</a>;
      },
    },
    renderText: (text) =>
      text.split('\n').reduce<ReactNode[]>((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []),
  };

  return documentToReactComponents(richText.json, options);
}
