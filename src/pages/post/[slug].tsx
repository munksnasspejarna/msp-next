import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import dayjs from 'dayjs';
import Sidebar from '../../components/Sidebar';
import PostLink from '../../components/PostLink';
import { Fragment } from 'react';
import { getOGImageUrl } from '../../contentful/utils';
import NotFoundPage from '../404';
import HeroImage from '../../components/HeroImage';
import ContentBlock from '../../components/ContentBlock';
import MainContent from '../../components/MainContent';
import { siteName } from '../../config';
import { fetchPostSlugs } from '../../contentful/postSlugs';
import { fetchPost, ContentfulPost } from '../../contentful/post';
import { renderRichText } from '../../contentful/render';
import {
  fetchPostSummaries,
  ContentfulPostSummary,
} from '../../contentful/postSummaries';

interface Props {
  post: ContentfulPost | null;
  posts: ContentfulPostSummary[];
}

const PostPage: NextPage<Props> = ({ post, posts }) => {
  if (!post) {
    return <NotFoundPage />;
  }

  const { image } = post;

  return (
    <MainContent>
      <Head>
        <title>
          {post.title} – {siteName}
        </title>
        <meta property="og:title" content={post.title} />
        {image && (
          <Fragment>
            <meta property="og:image" content={getOGImageUrl(image.url)} />
            <meta name="twitter:card" content="summary_large_image" />
          </Fragment>
        )}
      </Head>

      <article className="post">
        <h1>{post.title}</h1>
        {image && <HeroImage url={image.url} title={image.title} />}
        <p className="date">{dayjs(post.date).format('LL')}</p>
        {renderRichText(post.lead)}
        {post.content && <ContentBlock content={post.content} />}
      </article>

      {posts && (
        <Sidebar>
          <h2>Aktuellt</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostLink slug={post.slug}>
                  <a>{post.title}</a>
                </PostLink>
              </li>
            ))}
          </ul>
        </Sidebar>
      )}

      <style jsx>{`
        .date {
          font-style: italic;
        }
      `}</style>
    </MainContent>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
}) => {
  const slug = params!.slug!;
  const [post, posts] = await Promise.all([
    fetchPost(slug, preview),
    fetchPostSummaries(preview),
  ]);
  return { props: { post, posts } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPostSlugs();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export default PostPage;
