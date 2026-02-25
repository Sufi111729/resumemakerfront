import { useEffect } from "react";
import { uiStore } from "../../state/uiStore";

export function ToastStack() {
  const { toasts, removeToast } = uiStore();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), toast.duration)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts, removeToast]);

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-soft"
        >
          <div className="text-sm font-semibold text-ink">{toast.title || "Notice"}</div>
          {toast.message ? <div className="text-sm text-ink/70">{toast.message}</div> : null}
        </div>
      ))}
    </div>
  );
}
