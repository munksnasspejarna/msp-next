import EmailLink from './EmailLink';
import PhoneLink from './PhoneLink';
import { ContentfulContact } from '../contentful/contacts';

interface Props {
  contact: ContentfulContact;
}

const Contact: React.FC<Props> = ({ contact }) => {
  const { name, image, title, email, phone } = contact;

  return (
    <div className="contact">
      {image ? (
        <img
          className="image"
          src={image.url + '?fit=fill&w=384&h=512'}
          alt={image.title}
        />
      ) : (
        <div className="image-placeholder" />
      )}
      <div className="name">{name}</div>
      {title && <div>{title}</div>}
      {email && <EmailLink email={email} />}
      {phone && <PhoneLink phone={phone} />}

      <style jsx>{`
        .contact {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .image,
        .image-placeholder {
          width: 12rem;
          height: 16rem;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
        }

        .image-placeholder {
          background: var(--color-shading);
        }

        .name {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Contact;
