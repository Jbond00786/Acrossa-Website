import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { serviceDeck } from '../../config/site.js';

function Schematic({ id }) {
  return (
    <svg className="command-card__schematic" viewBox="0 0 100 64" fill="none" aria-hidden="true">
      {id === 'security-dispatching' && (
        <>
          <circle cx="50" cy="32" r="26" className="schematic-grid" />
          <circle cx="50" cy="32" r="16" className="schematic-grid" />
          <path d="M50 3v58M21 32h58" className="schematic-grid" />
          <g className="schematic-radar">
            <path d="M50 32V7a25 25 0 0 1 23 15Z" fill="currentColor" opacity=".14" />
            <path d="M50 32V7" stroke="currentColor" strokeWidth="1.5" />
          </g>
          <circle cx="63" cy="23" r="3" fill="currentColor" className="schematic-signal" />
          <circle cx="39" cy="42" r="2" fill="currentColor" />
        </>
      )}
      {id === 'truck-dispatching' && (
        <>
          <path d="M8 20h84M8 44h84M24 6v52M50 6v52M76 6v52" className="schematic-grid" />
          <path d="M12 48h22V18h30v24h24" stroke="currentColor" strokeWidth="1.5" />
          <circle className="schematic-route" cx="12" cy="48" r="3" fill="currentColor" />
          <circle cx="12" cy="48" r="4" fill="#102521" stroke="currentColor" />
          <path d="m84 37 5 5-5 5" stroke="currentColor" strokeWidth="2" />
        </>
      )}
      {id === 'remote-it-support' && (
        <>
          <rect x="14" y="10" width="65" height="42" rx="5" className="schematic-grid" />
          <path d="M14 21h65M35 58h25" className="schematic-grid" />
          <circle cx="22" cy="16" r="1.5" fill="currentColor" />
          <circle cx="28" cy="16" r="1.5" fill="currentColor" opacity=".4" />
          <path d="m25 29 7 6-7 6" stroke="currentColor" strokeWidth="2" />
          <path d="M39 41h12" stroke="currentColor" strokeWidth="2" className="schematic-cursor" />
          <path d="M79 31h11v19" stroke="currentColor" opacity=".5" />
          <circle cx="90" cy="53" r="3" fill="currentColor" className="schematic-signal" />
        </>
      )}
      {id === 'call-center-customer-care' && (
        <>
          <path d="M8 32h84M8 14h84M8 50h84" className="schematic-grid" />
          {[12, 22, 32, 42, 52, 62, 72, 82].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={24 - (i % 4) * 4}
              width="3"
              height={16 + (i % 4) * 8}
              rx="1.5"
              fill="currentColor"
              className="schematic-wave"
              style={{ '--wave-delay': `${i * -0.17}s` }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

export default function ServiceCard({ service, preview = false }) {
  const cardRef = useRef(null);
  const frame = useRef(0);
  const interactive = useRef(false);
  const headingId = `${preview ? 'preview-' : ''}${service.id}-title`;

  useEffect(() => {
    const card = cardRef.current;
    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const reset = () => {
      interactive.current = media.matches;
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      card.removeAttribute('data-tracking');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    };
    let visible = false;
    const syncVisibility = () => {
      card.dataset.visible = String(visible && !document.hidden);
    };
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              syncVisibility();
            },
            { threshold: 0.05 },
          )
        : null;
    reset();
    observer?.observe(card);
    media.addEventListener('change', reset);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      cancelAnimationFrame(frame.current);
      observer?.disconnect();
      media.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  function trackPointer(event) {
    if (!interactive.current || event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      card.style.setProperty('--mouse-x', `${x * 100}%`);
      card.style.setProperty('--mouse-y', `${y * 100}%`);
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
      card.dataset.tracking = 'true';
      frame.current = 0;
    });
  }

  function resetPointer() {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    const card = cardRef.current;
    card.removeAttribute('data-tracking');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }

  const card = (
    <article
      ref={cardRef}
      id={preview ? undefined : service.id}
      className="command-card"
      aria-labelledby={headingId}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <div className="command-card__telemetry">
        <span className="command-card__code">{service.code}</span>
        <span className="command-card__status">
          <span className="command-card__beacon" aria-hidden="true" />
          {serviceDeck.status}
        </span>
        <Schematic id={service.id} />
      </div>
      <div className="command-card__body">
        <div className="command-card__intro">
          {preview ? (
            <h3 id={headingId}>
              <strong>{service.title}</strong>
            </h3>
          ) : (
            <h2 id={headingId}>
              <strong>{service.title}</strong>
            </h2>
          )}
          <p className="command-card__tagline">{service.tagline}</p>
          <p className="command-card__summary">{service.summary}</p>
        </div>
        <div className="command-card__tasks">
          <p className="command-card__label">{serviceDeck.tasksLabel}</p>
          <ul>
            {service.tasks.map((task, index) => (
              <li key={task.title}>
                <span className="command-card__task-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <p>
                  <strong>{task.title}:</strong> {task.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="command-card__dock">
          <p className="command-card__label">{serviceDeck.platformsLabel}</p>
          <ul className="command-card__platforms" aria-label={serviceDeck.platformsLabel}>
            {service.platforms.map((platform) => (
              <li key={platform} className="command-card__pill">
                <span aria-hidden="true" />
                {platform}
              </li>
            ))}
            <li className="command-card__pill command-card__pill--existing">
              {serviceDeck.existingPlatform}
            </li>
          </ul>
          <p className="command-card__note">{service.platformNote}</p>
        </div>
        {preview ? (
          <span className="command-card__action" aria-hidden="true">
            {serviceDeck.previewAction}
            <span>↗</span>
          </span>
        ) : (
          <Link
            className="command-card__action"
            to="/contact"
            aria-label={`${serviceDeck.contactAction}: ${service.title}`}
          >
            {serviceDeck.contactAction}
            <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </article>
  );
  return preview ? (
    <Link
      className="service-deck__preview-link"
      to={`/services#${service.id}`}
      aria-label={`${serviceDeck.previewAction}: ${service.title}`}
    >
      {card}
    </Link>
  ) : (
    card
  );
}
