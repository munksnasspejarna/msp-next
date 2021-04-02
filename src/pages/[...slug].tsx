import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {
  ContentfulPage,
  fetchPage,
  ContentfulSidebar,
  fetchSidebar,
  fetchPages,
} from '../contentful/data';
import { renderDocument } from '../contentful/render';
import Sidebar from '../components/Sidebar';
import { Fragment } from 'react';
import { getOpenGraphImageUrl } from '../contentful/utils';
import NotFoundPage from './404';
import HeroImage from '../components/HeroImage';
import ContentBlock from '../components/ContentBlock';
import MainContent from '../components/MainContent';
import { siteName } from '../config';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  page: ContentfulPage | null;
  sidebar: ContentfulSidebar | null;
}

const StandardPage: NextPage<Props> = ({ page, sidebar }) => {
  if (!page) {
    return <NotFoundPage />;
  }

  const ogImageUrl = getOpenGraphImageUrl(page.image);

  return (
    <MainContent>
      <Head>
        <title>
          {page.title} – {siteName}
        </title>
        <meta property="og:title" content={page.title} />
        {ogImageUrl && (
          <Fragment>
            <meta property="og:image" content={ogImageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <div className="page">
        <h1>{page.title}</h1>
        {page.image && <HeroImage image={page.image} />}
        {page.content && <ContentBlock content={page.content} />}
      </div>

      {sidebar && <Sidebar>{renderDocument(sidebar.content)}</Sidebar>}
    </MainContent>
  );
};

interface Query extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
  preview,
}) => {
  const slug = params!.slug;
  const [page, sidebar] = await Promise.all([
    fetchPage(slug, preview),
    fetchSidebar(slug, preview),
  ]);
  return { props: { page, sidebar } };
};

// These pages should not be automatically generated because they are used in custom pages
const excludedPages = ['hem', 'referensnummer'];

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const pages = await fetchPages();
  const filteredPages = pages.filter((p) => !excludedPages.includes(p.slug));
  const paths = filteredPages.map((page) => ({
    params: { slug: page.slug.split('/') },
  }));
  return { paths, fallback: true };
};

export default StandardPage;
