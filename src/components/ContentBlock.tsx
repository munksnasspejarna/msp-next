import { renderRichText } from '../contentful/render';
import { ContentfulRichText } from '../contentful/richText';

interface Props {
  content: ContentfulRichText;
}

const ContentBlock: React.FC<Props> = ({ content }) => {
  return (
    <div className="content">
      {renderRichText(content)}

      <style jsx>{`
        .content :global(img) {
          width: 100%;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default ContentBlock;
