import React, {
    forwardRef,
    useImperativeHandle,
    useState,
} from "react";

import {
    TextInput as MaterialTextInput,
} from "@react-native-material/core";

const TextInput = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.defaultValue || '');
    const [valid, setValid] = useState(true);

    const handleOnChangeText = text => {
        if (!valid) {
            setValid(true);
        }

        setValue(text);
    };

    const getValue = () => value;

    useImperativeHandle(ref, () => ({
        setValue,
        getValue,
        setValid,
    }));

    return (
        <MaterialTextInput
            {...props}
            value={value}
            helperText={valid ? '' : props.helperText || 'Required field'}
            onChangeText={handleOnChangeText}
        />
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;
