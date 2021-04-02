import { useRouter } from 'next/router';

const PreviewIndicator: React.FC = () => {
  const router = useRouter();
  if (!router.isPreview) return null;
  const exitLink = `/api/exit-preview?path=${router.asPath}`;
  return (
    <div className="preview-indicator">
      <a href={exitLink} className="exit-link">
        Exit preview mode
      </a>
      <style jsx>{`
        .preview-indicator {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          background: var(--color-red);
          text-align: center;
          color: white;
        }

        .exit-link {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default PreviewIndicator;
