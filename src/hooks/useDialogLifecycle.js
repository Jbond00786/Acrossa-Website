import { useEffect } from 'react';

export default function useDialogLifecycle(dialogRef, focusRef, origin) {
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = origin || document.activeElement;
    const root = document.documentElement;
    const rootOverflow = root.style.overflow;
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - root.clientWidth;
    const stableGutter = window.CSS?.supports('scrollbar-gutter', 'stable');
    if (!stableGutter && gutter > 0) {
      const padding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${padding + gutter}px`;
    }
    root.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    focusRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      root.style.overflow = rootOverflow;
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [dialogRef, focusRef, origin]);
}
