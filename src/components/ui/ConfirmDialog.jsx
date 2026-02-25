import { Modal } from "./Modal";
import { Button } from "./Button";

export function ConfirmDialog({ open, onClose, title, description, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-ink/60">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
