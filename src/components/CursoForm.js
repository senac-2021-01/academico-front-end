import React, {
    createRef,
    useState,
} from 'react';

import {
    View,
} from 'react-native';

import {
    ActivityIndicator,
    Button,
    Flex,
    Stack,
} from '@react-native-material/core';

import axios from 'axios';

import TextInput from './TextInput';

export default function CursoForm(props) {

    const {
        showCursoList,
    } = props;

    const [loading, setLoading] = useState(false);

    const textInputNameRef = createRef();
    const textInputWorkloadRef = createRef();

    const getTextInputNameRef = () => textInputNameRef.current;
    const getTextInputWorkloadRef = () => textInputWorkloadRef.current;

    const handleOnSaveButtonPress = async () => {
        const auxTextInputNameRef = getTextInputNameRef();
        const auxTextInputWorkloadRef = getTextInputWorkloadRef();

        const textInputNameValue = auxTextInputNameRef.getValue();
        const auxTextInputWorkloadValue = auxTextInputWorkloadRef.getValue();

        const isTextInputNameValid = !!textInputNameValue;
        const isTextInputWorkloadValid = !!auxTextInputWorkloadValue;

        auxTextInputNameRef.setValid(isTextInputNameValid);
        auxTextInputWorkloadRef.setValid(isTextInputWorkloadValid);

        if (!!isTextInputNameValid && !!isTextInputWorkloadValid) {
            setLoading(true);

            try {
                await axios.post('http://10.10.117.233:8080/api/cursos', {
                    nome: textInputNameValue,
                    cargaHoraria: parseInt(auxTextInputWorkloadValue),
                });

                alert('Curso inserido com sucesso');

                auxTextInputNameRef.setValue('');
                auxTextInputWorkloadRef.setValue('');

                setLoading(false);
            } catch (error) {
                console.error(error);

                setLoading(false);
            }
        }
    };

    return (
        <Stack
            spacing={2}
            style={{
                margin: 20,
                marginTop: 50,
            }}
        >
            <TextInput
                ref={textInputNameRef}
                label='Nome'
                variant='standard'
            />
            <TextInput
                ref={textInputWorkloadRef}
                label='Carga Horária'
                variant='standard'
            />
            <View
                style={{ marginTop: 20 }}
            >
                <Flex
                    direction='row'
                    justify='between'
                >
                    <Button
                        title='Voltar'
                        onPress={() => showCursoList()}
                    />
                    {!!loading ? <ActivityIndicator size='large' /> :
                        <Button
                            title='Salvar'
                            onPress={handleOnSaveButtonPress}
                        />
                    }
                </Flex>
            </View>
        </Stack>
    );

}
