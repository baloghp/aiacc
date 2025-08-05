import { Button, Group, Modal, Text } from '@mantine/core';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  confirmColor = 'red',
}: ConfirmationDialogProps) {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title} centered>
      <Text mb="md">{message}</Text>
      <Group justify="flex-end">
        <Button variant="light" onClick={onClose}>
          {cancelText}
        </Button>
        <Button color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
}
