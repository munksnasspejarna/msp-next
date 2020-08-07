interface Props {
  url: string;
  title: string;
}

const HeroImage: React.FC<Props> = ({ url, title }) => {
  return (
    <div className="hero">
      <img
        className="hero-image"
        src={url + '?fit=fill&w=1200&h=800'}
        alt={title}
      />

      <style jsx>{`
        .hero {
          width: 100%;
          height: auto;
          padding-bottom: calc(2 / 3 * 100%);
          position: relative;
        }

        .hero-image {
          position: absolute;
          width: 100%;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default HeroImage;
