import { site } from '../../config/site.js';
export default function WhatsAppLink() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-link mt-6 flex items-center gap-3 rounded-xl border border-emerald-700/20 bg-emerald-50 px-4 py-4 font-bold text-emerald-900"
    >
      <span className="whatsapp-icon relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="25" height="25" fill="currentColor">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.95 11.95 0 0 0 5.79 1.47h.01C18.63 23.83 24 18.48 24 11.9a11.88 11.88 0 0 0-3.48-8.42ZM12.05 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.86 9.86 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.02 2.91 9.87 9.87 0 0 1 2.9 7.02c0 5.47-4.45 9.85-9.96 9.85Zm5.44-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51H7.8c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </span>
      <span>
        Chat with us on WhatsApp
        <span className="block text-xs font-normal">Opens in a new tab</span>
      </span>
    </a>
  );
}
