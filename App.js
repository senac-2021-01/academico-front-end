import React, {
    createRef,
    useState,
} from "react";

import axios from 'axios';

import {
    Stack,
    Button,
    ActivityIndicator,
} from "@react-native-material/core";

import TextInput from "./src/components/TextInput";
import { View } from "react-native";
import DisciplinaList from "./src/components/DisciplinaList";

function App() {
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
                const { data } = await axios.post('http://192.168.43.44:8080/api/cursos', {
                    nome: textInputNameValue,
                    cargaHoraria: parseInt(auxTextInputWorkloadValue),
                });

                console.log(data);

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
            <DisciplinaList/>
            {/* <TextInput
                ref={textInputNameRef}
                label="Nome"
                variant="standard"
            />
            <TextInput
                ref={textInputWorkloadRef}
                label="Carga Horária"
                variant="standard"
            />
            <View style={{ marginTop: 20 }}>
                {!!loading ? <ActivityIndicator size="large" /> :
                    <Button
                        title="Salvar"
                        onPress={handleOnSaveButtonPress}
                    />
                }
            </View> */}
        </Stack>
    );
};

export default App;
