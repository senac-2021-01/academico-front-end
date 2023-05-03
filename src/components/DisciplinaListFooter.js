import React from 'react';

import {
    View,
} from 'react-native';

import {
    ActivityIndicator,
} from '@react-native-material/core';

export default function DisciplinaListFooter(props) {

    const {
        loading
    } = props;

    if (!!loading) {
        return (
            <View
                style={{
                    alignSelf: 'center',
                    marginVertical: 20,
                }}
            >
                <ActivityIndicator
                    size='large'
                />
            </View>
        );
    }

    return null;

}
