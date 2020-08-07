import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import { renderRichText } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import PostSummary from '../components/PostSummary';
import { Fragment } from 'react';
import MainContent from '../components/MainContent';
import { getOGImageUrl } from '../contentful/utils';
import HeroImage from '../components/HeroImage';
import { siteName } from '../config';
import { fetchPage, ContentfulPage } from '../contentful/page';
import NotFoundPage from './404';
import { fetchSidebar, ContentfulSidebar } from '../contentful/sidebar';
import {
  ContentfulPostSummary,
  fetchPostSummaries,
} from '../contentful/postSummaries';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
  posts: ContentfulPostSummary[];
}

const HomePage: NextPage<Props> = ({ page, sidebar, posts }) => {
  if (!page) {
    return <NotFoundPage />;
  }

  const { image, content } = page;
  const title = page.title ?? siteName;

  return (
    <MainContent>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {image && (
          <Fragment>
            <meta property="og:image" content={getOGImageUrl(image.url)} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <div>
        <h1>{title}</h1>
        {image && <HeroImage url={image.url} title={image.title} />}
        {content && <div>{renderRichText(content)}</div>}

        <h2>Aktuellt</h2>
        {posts.map((post) => (
          <PostSummary key={post.slug} post={post} />
        ))}
      </div>

      {sidebar?.content && <Sidebar>{renderRichText(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const [page, sidebar, posts] = await Promise.all([
    fetchPage('hem', preview),
    fetchSidebar('hem', preview),
    fetchPostSummaries(preview),
  ]);
  return { props: { page, sidebar, posts } };
};

export default HomePage;
