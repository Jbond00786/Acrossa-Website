import { X } from 'lucide-react';

const PolicyModal = ({ title, content, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-[#FFF2DF] rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-[#8C6E63]/20 relative max-h-[85vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-[#3E2522]/60 hover:text-[#3E2522] p-1"
        aria-label="Close dialog"
      >
        <X size={22} />
      </button>
      <h3 className="text-2xl font-bold text-[#3E2522] mb-4">{title}</h3>
      <div className="text-[#3E2522]/80 text-sm leading-relaxed space-y-4">{content}</div>
      <div className="mt-8 pt-4 border-t border-[#8C6E63]/20 text-right">
        <button
          onClick={onClose}
          className="px-5 py-2 bg-[#3E2522] text-[#FFF2DF] font-semibold text-xs rounded-lg uppercase tracking-wider"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default PolicyModal;
