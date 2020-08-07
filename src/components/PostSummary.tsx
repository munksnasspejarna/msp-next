import dayjs from 'dayjs';
import PostLink from './PostLink';
import { renderRichText } from '../contentful/render';
import { ContentfulPostSummary } from '../contentful/postSummaries';

interface Props {
  post: ContentfulPostSummary;
}

const PostSummary: React.FC<Props> = ({ post }) => {
  return (
    <div>
      <h3 className="title">
        <PostLink slug={post.slug}>
          <a>{post.title}</a>
        </PostLink>
      </h3>
      <div className="date">{dayjs(post.date).format('LL')}</div>
      {renderRichText(post.lead)}

      <style jsx>{`
        .title {
          margin-bottom: 0;
        }

        .date {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default PostSummary;
