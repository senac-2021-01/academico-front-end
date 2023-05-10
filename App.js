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

    const [currentScreen, setCurrentScreen] = useState({
        name: 'curso-list',
        data: null,
    });

    const confirmDialogRef = createRef();

    const getConfirmDialogRef = () => confirmDialogRef.current;

    const showConfirmDialog = dialogOptions => getConfirmDialogRef().showConfirmDialog(dialogOptions || {});

    const showCursoForm = cursoData => setCurrentScreen({
        name: 'curso-form',
        data: cursoData,
    });

    const showCursoList = () => setCurrentScreen({
        name: 'curso-list',
        data: null,
    });

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
                {currentScreen.name === 'curso-list' &&
                    <CursoList
                        showConfirmDialog={showConfirmDialog}
                        showCursoForm={showCursoForm}
                    />
                }
                {currentScreen.name === 'curso-form' &&
                    <CursoForm
                        cursoData={currentScreen.data}
                        showCursoList={showCursoList}
                    />
                }
            </Stack>
        </Provider>
    );
};

export default App;
