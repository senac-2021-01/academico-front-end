import React, {
    useEffect,
    useState,
} from 'react';

import {
    FlatList,
} from 'react-native';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import axios from 'axios';

import {
    IconButton,
    ListItem,
} from '@react-native-material/core';

import DisciplinaListFooter from './DisciplinaListFooter';

export default function DisciplinaList(props) {

    const [state, setState] = useState({
        loading: true,
        page: 1,
        pageSize: 10,
        rows: [],
        count: 0,
    });

    const getData = async () => {
        const {
            page,
            pageSize,
            rows,
            count,
        } = state;

        if (!!loading || rows.length < count) {
            setState({
                ...state,
                loading: true,
            });

            try {
                const { data } = await axios.get(`http://10.10.117.233:8080/api/cursos?page=${page}&pageSize=${pageSize}`);

                setState({
                    ...state,
                    loading: false,
                    page: page + 1,
                    rows: rows.concat(data.rows),
                    count: data.count,
                });
            } catch (error) {
                let errorMessage = error.response.data.message.join(', ');

                let firstLetter = errorMessage.charAt(0).toLocaleUpperCase();

                errorMessage = errorMessage.slice(1);

                alert(`${firstLetter}${errorMessage}.`);

                setState({
                    ...state,
                    loading: false,
                });
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const {
        showConfirmDialog,
    } = props;

    const {
        loading,
        rows,
    } = state;

    const renderItem = ({ item }) => (
        <ListItem
            title={item.nome}
            trailing={
                <IconButton
                    icon={props => (
                        <Icon
                            name='trash-can'
                            {...props}
                        />
                    )}
                    color='red'
                    onPress={() => showConfirmDialog({
                        dialogMessage: `Do you really want to delete the course ${item.nome}?`
                    })}
                />
            }
            style={{
                padding: 60,
                margin: 60,
            }}
        />
    );

    return (
        <FlatList
            data={rows}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReached={getData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
                <DisciplinaListFooter
                    loading={loading}
                />
            }
        />
    );

}
