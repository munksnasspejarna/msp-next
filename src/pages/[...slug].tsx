import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { renderRichText } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import { Fragment } from 'react';
import { getOGImageUrl } from '../contentful/utils';
import NotFoundPage from './404';
import HeroImage from '../components/HeroImage';
import ContentBlock from '../components/ContentBlock';
import MainContent from '../components/MainContent';
import { siteName } from '../config';
import { fetchPageSlugs } from '../contentful/pageSlugs';
import { fetchPage, ContentfulPage } from '../contentful/page';
import { fetchSidebar, ContentfulSidebar } from '../contentful/sidebar';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
}

const StandardPage: NextPage<Props> = ({ page, sidebar }) => {
  if (!page) {
    return <NotFoundPage />;
  }

  const { image, content } = page;

  return (
    <MainContent>
      <Head>
        <title>
          {page.title} – {siteName}
        </title>
        <meta property="og:title" content={page.title} />
        {image && (
          <Fragment>
            <meta property="og:image" content={getOGImageUrl(image.url)} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <div className="page">
        <h1>{page.title}</h1>
        {image && <HeroImage url={image.url} title={image.title} />}
        {content && <ContentBlock content={content} />}
      </div>

      {sidebar?.content && <Sidebar>{renderRichText(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const slug = params!.slug!;
  const [page, sidebar] = await Promise.all([
    fetchPage(slug, preview),
    fetchSidebar(slug, preview),
  ]);
  return { props: { page, sidebar } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchPageSlugs();
  const paths = pages.map((page) => ({
    params: { slug: page.slug.split('/') },
  }));
  return { paths, fallback: false };
};

export default StandardPage;
