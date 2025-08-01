import { Modal, Button, Group } from '@mantine/core';
import { ReactNode } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  submitDisabled?: boolean;
  showCancel?: boolean;
  cancelText?: string;
}

export function ModalWrapper({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSubmit, 
  submitText = 'Submit',
  submitDisabled = false,
  showCancel = true,
  cancelText = 'Cancel'
}: ModalWrapperProps) {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title} centered>
      {children}
      {(onSubmit || showCancel) && (
        <Group justify="flex-end" mt="md">
          {showCancel && (
            <Button variant="light" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          {onSubmit && (
            <Button onClick={onSubmit} disabled={submitDisabled}>
              {submitText}
            </Button>
          )}
        </Group>
      )}
    </Modal>
  );
} 