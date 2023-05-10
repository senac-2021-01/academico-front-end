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
    Button,
    Flex,
    IconButton,
    ListItem,
} from '@react-native-material/core';

import CursoListFooter from './CursoListFooter';

export default function CursoList(props) {

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

    const deleteCurso = async id => {
        setState({
            ...state,
            loading: true, // loading global
        });

        try {
            await axios.delete(`http://10.10.117.233:8080/api/cursos/${id}`);

            setState({
                ...state,
                rows: state.rows.filter(value => value.id !== id),
                count: state.count - 1,
            });
        } catch (error) {
            let errorMessage = Array.isArray(error.response.data.message) ? error.response.data.message.join(', ') : error.response.data.message;

            let firstLetter = errorMessage.charAt(0).toLocaleUpperCase();

            errorMessage = errorMessage.slice(1);

            alert(`${firstLetter}${errorMessage}.`);

            setState({
                ...state,
                loading: false,
            });
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const {
        showConfirmDialog,
        showCursoForm,
    } = props;

    const {
        loading,
        rows,
    } = state;

    const renderItem = ({ item }) => (
        <ListItem
            title={item.nome}
            secondaryText={`Carga Horária: ${item.cargaHoraria}`}
            trailing={
                <Flex
                    direction='row'
                    justify='between'
                    style={{
                        marginLeft: -45,
                    }}
                >
                    <IconButton
                        icon={props => (
                            <Icon
                                name='pencil'
                                {...props}
                            />
                        )}
                        color='primary'
                        onPress={() => showCursoForm({
                            id: item.id,
                            nome: item.nome,
                            cargaHoraria: item.cargaHoraria.toString(),
                        })}
                    />
                    <IconButton
                        icon={props => (
                            <Icon
                                name='trash-can'
                                {...props}
                            />
                        )}
                        color='red'
                        onPress={() => showConfirmDialog({
                            dialogMessage: `Do you really want to delete the course ${item.nome}?`,
                            onYesPerformed: () => deleteCurso(item.id),
                        })}
                    />
                </Flex>
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
            ListHeaderComponent={
                <Button
                    title='Novo'
                    onPress={() => showCursoForm({
                        nome: '',
                        cargaHoraria: '',
                    })}
                />
            }
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReached={getData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
                <CursoListFooter
                    loading={loading}
                />
            }
        />
    );

}
