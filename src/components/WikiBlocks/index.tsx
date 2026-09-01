import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export function YouTubeEmbed({id, title}: {id: string; title: string}) {
  return (
    <div className={styles.video}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export function ButtonLink({
  label,
  href,
  variant = 'primary',
  newTab = false,
}: {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  newTab?: boolean;
}) {
  return (
    <p className={styles.buttonRow}>
      <a
        className={clsx('button', `button--${variant === 'outline' ? 'secondary' : variant}`, variant === 'outline' && styles.outline)}
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
      >
        {label}
      </a>
    </p>
  );
}

type Card = {icon?: string; title: string; description?: string; href?: string};

export function CardGrid({title, cards = []}: {title?: string; cards?: Card[]}) {
  return (
    <section className={styles.block}>
      {title && <h2>{title}</h2>}
      <div className={styles.cards}>
        {cards.map((card, index) => {
          const content: ReactNode = (
            <>
              {card.icon && <span className={styles.cardIcon} aria-hidden="true">{card.icon}</span>}
              <strong>{card.title}</strong>
              {card.description && <span>{card.description}</span>}
            </>
          );
          return card.href ? (
            <a className={styles.card} href={card.href} key={`${card.title}-${index}`}>{content}</a>
          ) : (
            <div className={styles.card} key={`${card.title}-${index}`}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}

export function Steps({items = []}: {items?: Array<{title: string; text?: string}>}) {
  return (
    <ol className={styles.steps}>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`}>
          <div className={styles.stepNumber}>{index + 1}</div>
          <div><strong>{item.title}</strong>{item.text && <p>{item.text}</p>}</div>
        </li>
      ))}
    </ol>
  );
}

export function ImageGallery({images = []}: {images?: Array<{src: string; alt: string; caption?: string}>}) {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <figure key={`${image.src}-${index}`}>
          <img src={image.src} alt={image.alt} loading="lazy" />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
