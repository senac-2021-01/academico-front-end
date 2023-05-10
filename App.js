import React, {
    createRef,
    useState,
} from 'react';

import {
    Stack,
    Provider,
} from '@react-native-material/core';

import ConfirmDialog from './src/components/ConfirmDialog';

import CursoList from './src/components/CursoList';
import CursoForm from './src/components/CursoForm';

function App() {

    const [currentScreen, setCurrentScreen] = useState('curso-list');

    const confirmDialogRef = createRef();

    const getConfirmDialogRef = () => confirmDialogRef.current;

    const showConfirmDialog = dialogOptions => getConfirmDialogRef().showConfirmDialog(dialogOptions || {});

    const showCursoForm = () => setCurrentScreen('curso-form');

    const showCursoList = () => setCurrentScreen('curso-list');

    return (
        <Provider>
            <Stack
                spacing={2}
                style={{
                    margin: 20,
                    marginTop: 50,
                }}
            >
                <ConfirmDialog
                    ref={confirmDialogRef}
                />
                {currentScreen === 'curso-list' &&
                    <CursoList
                        showConfirmDialog={showConfirmDialog}
                        showCursoForm={showCursoForm}
                    />
                }
                {currentScreen === 'curso-form' &&
                    <CursoForm
                        showCursoList={showCursoList}
                    />
                }
            </Stack>
        </Provider>
    );
};

export default App;
