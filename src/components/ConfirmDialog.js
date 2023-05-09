import React, {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import {
    Stack,
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Text,
    TextInput,
} from '@react-native-material/core';

const ConfirmDialog = forwardRef((props, ref) => {

    const [state, setState] = useState({
        dialogTitle: 'Operation confirm',
        dialogMessage: 'Do you really want to perform this operation?',
        yesButtonText: 'Yes',
        noButtonText: 'No',
        visible: false,
        onYesPerformed: null,
        onNoPerformed: null,
    });

    const showConfirmDialog = ({
        dialogTitle,
        dialogMessage,
        yesButtonText,
        noButtonText,
        onYesPerformed,
        onNoPerformed,
    }) => {
        setState({
            ...state,
            dialogTitle: dialogTitle || 'Operation confirm',
            dialogMessage: dialogMessage || 'Do you really want to perform this operation?',
            yesButtonText: yesButtonText || 'Yes',
            noButtonText: noButtonText || 'No',
            visible: true,
            onYesPerformed: onYesPerformed,
            onNoPerformed: onNoPerformed,
        });
    };

    const hideConfirmDialog = operation => {
        let auxOnYesPerformed = state.onYesPerformed;
        let auxOnNoPerformed = state.onNoPerformed;

        setState({
            ...state,
            dialogTitle: 'Operation confirm',
            dialogMessage: 'Do you really want to perform this operation?',
            yesButtonText: 'Yes',
            noButtonText: 'No',
            visible: false,
            onYesPerformed: null,
            onNoPerformed: null,
        });

        switch (operation) {
            case 'Y':
                if (!!auxOnYesPerformed) {
                    auxOnYesPerformed();
                }
                break;
            case 'N':
                if (!!auxOnNoPerformed) {
                    auxOnNoPerformed();
                }
                break;
        }
    };

    useImperativeHandle(ref, () => ({
        showConfirmDialog,
    }));

    const {
        dialogTitle,
        dialogMessage,
        yesButtonText,
        noButtonText,
        visible
    } = state;

    return (
        <Dialog
            visible={visible}
            onDismiss={() => hideConfirmDialog()}
        >
            <DialogHeader
                title={dialogTitle}
            />
            <DialogContent>
                <Stack
                    spacing={2}
                >
                    <Text>
                        {dialogMessage}
                    </Text>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    title={noButtonText}
                    compact
                    variant='text'
                    onPress={() => hideConfirmDialog('N')}
                />
                <Button
                    title={yesButtonText}
                    compact
                    variant='text'
                    onPress={() => hideConfirmDialog('Y')}
                />
            </DialogActions>
        </Dialog>
    );
});

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
