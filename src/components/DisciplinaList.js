import React, {
    Fragment,
    useEffect,
    useState,
} from 'react';

import {
    FlatList,
} from 'react-native';

import axios from 'axios';

import {
    ActivityIndicator,
    ListItem,
} from '@react-native-material/core';

export default function DisciplinaList() {

    const [state, setState] = useState({
        loading: true,
        page: 1,
        pageSize: 20,
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
        loading,
        rows,
    } = state;

    const renderItem = ({ item }) => (
        <ListItem
            title={item.nome}
            style={{
                padding: 60,
                margin: 60,
            }}
        />
    );

    const loadRepositories = async () => {
        await getData();
    };

    return (
        <Fragment>
            {!!loading &&
                <ActivityIndicator
                    size='large'
                />
            }
            {/* {rows.map(value => (
                <ListItem
                    key={value.id}
                    title={value.nome}
                />
            ))} */}
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={loadRepositories}
                onEndReachedThreshold={0.1}
            />
        </Fragment>
    );

}
