import { AlertDialog, Button } from "native-base";
import { useState } from "react";

export default function BAlertDialog(args) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cancelButtonTitle,
    confirmButtonTitle,
    title,
    text,
    onClose,
    leastDestructiveRef,
    afterConfirm
  } = args;

  async function startAction() {
    setIsLoading(true)
    await afterConfirm();
    setIsLoading(false);
  }

  return (
    <AlertDialog {...args}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>
          {text}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={leastDestructiveRef}>
              {cancelButtonTitle}
            </Button>
            <Button colorScheme="danger" onPress={startAction} isLoading={isLoading}>
              {confirmButtonTitle}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}