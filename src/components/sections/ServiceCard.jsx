import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { serviceDeck, services, site } from '../../config/site.js';

function DiagonalArrow() {
  return (
    <svg
      className="command-arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}

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
          <circle cx="12" cy="48" r="4" fill="#1F120D" stroke="currentColor" />
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

function Telemetry({ service }) {
  return (
    <div className="command-card__telemetry">
      <span className="command-card__code">{service.code}</span>
      <span className="command-card__status">
        <span className="command-card__beacon" aria-hidden="true" />
        {serviceDeck.status}
      </span>
      <Schematic id={service.id} />
    </div>
  );
}

function ServiceDetails({ service }) {
  return (
    <>
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
    </>
  );
}

function ServiceCard({ service, preview, onExpand }) {
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

  return (
    <article
      ref={cardRef}
      id={preview ? undefined : service.id}
      className="command-card"
      aria-labelledby={headingId}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onPointerCancel={resetPointer}
    >
      <a
        className="command-card__trigger"
        href={`/services#${service.id}`}
        role="button"
        aria-haspopup="dialog"
        aria-label={`Expand Command View: ${service.title}`}
        onClick={(event) => {
          event.preventDefault();
          resetPointer();
          onExpand(event.currentTarget);
        }}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
      >
        <Telemetry service={service} />
        <div className="command-card__body">
          {preview ? (
            <h3 id={headingId}>
              <strong>{service.title}</strong>
            </h3>
          ) : (
            <h2 id={headingId}>
              <strong>{service.title}</strong>
            </h2>
          )}
          <p className="command-card__tagline" title={service.tagline}>
            {service.tagline}
          </p>
          <p className="command-card__summary">{service.shortSummary}</p>
          <ul className="command-card__platform-preview" aria-label="Featured platforms">
            {service.platforms.slice(0, 3).map((platform) => (
              <li key={platform} className="command-card__pill" title={platform}>
                {platform}
              </li>
            ))}
            <li className="command-card__pill command-card__pill--existing">
              +{service.platforms.length - 3} more &amp; Your Existing Platform
            </li>
          </ul>
          <span className="command-card__action">
            Expand Command View{' '}
            <span className="command-card__arrow">
              <DiagonalArrow />
            </span>
          </span>
        </div>
      </a>
      <div className="sr-only">
        <p>{service.summary}</p>
        <ServiceDetails service={service} />
      </div>
    </article>
  );
}

function CommandConsole({ initialIndex, origin, onClose }) {
  const [selection, setSelection] = useState({ index: initialIndex, direction: 1 });
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const tabsRef = useRef([]);
  const service = services[selection.index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      origin?.focus({ preventScroll: true });
    };
  }, [origin]);

  useEffect(() => {
    if (!closing) return;
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240;
    const timer = window.setTimeout(onClose, delay);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  function select(index, direction, focusTab = false) {
    if (closing) return;
    const next = (index + services.length) % services.length;
    setSelection({ index: next, direction });
    if (focusTab) tabsRef.current[next]?.focus();
    dialogRef.current.querySelector('.command-console__viewport').scrollTop = 0;
  }

  function handleKey(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setClosing(true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      select(selection.index + direction, direction, true);
    } else if (event.target.getAttribute('role') === 'tab' && ['Home', 'End'].includes(event.key)) {
      event.preventDefault();
      select(event.key === 'Home' ? 0 : services.length - 1, event.key === 'Home' ? -1 : 1, true);
    } else if (event.key === 'Tab') {
      const focusable = [...dialogRef.current.querySelectorAll('button, a[href]')].filter(
        (element) => element.tabIndex >= 0 && !element.closest('[inert]'),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="command-console"
      aria-modal="true"
      aria-labelledby={`console-${service.id}-title`}
      data-closing={closing}
      style={{ '--slide-direction': selection.direction }}
      onKeyDown={handleKey}
      onCancel={(event) => {
        event.preventDefault();
        setClosing(true);
      }}
    >
      <div className="command-console__frame">
        <header className="command-console__toolbar">
          <span className="command-card__code">
            COMMAND DECK <span aria-hidden="true"> / </span>
            {service.code}
          </span>
          <div className="command-console__controls">
            <button
              type="button"
              aria-label="Previous service"
              onClick={() => select(selection.index - 1, -1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next service"
              onClick={() => select(selection.index + 1, 1)}
            >
              →
            </button>
            <button
              ref={closeRef}
              type="button"
              className="command-console__close"
              aria-label="Close command view"
              onClick={() => setClosing(true)}
            >
              ✕ <span>ESC</span>
            </button>
          </div>
        </header>
        <div className="command-console__switcher" role="tablist" aria-label="Choose a service">
          {services.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              type="button"
              role="tab"
              aria-label={`${item.code} ${item.title}`}
              id={`console-tab-${item.id}`}
              aria-controls={`console-panel-${item.id}`}
              aria-selected={selection.index === index}
              tabIndex={selection.index === index ? 0 : -1}
              onClick={() => select(index, index >= selection.index ? 1 : -1)}
            >
              <span>{item.code}</span>
              {item.title}
            </button>
          ))}
        </div>
        <div className="command-console__viewport">
          <div className="command-console__panels">
            {services.map((item, index) => (
              <section
                key={item.id}
                id={`console-panel-${item.id}`}
                className="command-console__panel"
                role="tabpanel"
                aria-labelledby={`console-tab-${item.id}`}
                aria-hidden={selection.index !== index}
                inert={selection.index !== index}
                data-active={selection.index === index}
              >
                <div className="command-console__intro">
                  <div className="command-console__visual">
                    <Schematic id={item.id} />
                  </div>
                  <span className="command-card__code">
                    {item.code} / {serviceDeck.status}
                  </span>
                  <h2 id={`console-${item.id}-title`}>{item.title}</h2>
                  <p className="command-card__tagline">{item.tagline}</p>
                  <p className="command-card__summary">{item.summary}</p>
                  <Link
                    className="command-console__cta"
                    to={`/contact?service=${encodeURIComponent(item.id)}`}
                    onClick={onClose}
                  >
                    Discuss This Service <DiagonalArrow />
                  </Link>
                  <a
                    className="command-console__secondary"
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with us on WhatsApp <DiagonalArrow />
                  </a>
                </div>
                <div className="command-console__details">
                  <ServiceDetails service={item} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

export default function ServiceDeck({ preview = false }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <>
      <div className="service-deck__grid">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            preview={preview}
            onExpand={(origin) => setExpanded({ index, origin })}
          />
        ))}
      </div>
      {expanded && (
        <CommandConsole
          initialIndex={expanded.index}
          origin={expanded.origin}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
