import React, { useState, useEffect } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressArea,
    Text
} from './styles';
import logo from '../../assets/logo-dados-recife.png';
import api from '../../services/api';

export default function Home() {
    const [teatro, setTeatro] = useState('');
    const [address, setAddress] = useState(null);

    // useEffect(() => {
    //     async function get() {
    //         const { data, status } = await api.get('/datastore_search?resource_id=16d45f07-1fab-4b8c-95d1-dbf555b6f913&limit=5')
    //         console.log("records", data.result.records);
    //         console.log(status);
    //     }
    //     get();
    // }, [])

    async function handleBuscar() {
        try {
            const { data, status } = await api.get(`/datastore_search?q=${teatro}&resource_id=16d45f07-1fab-4b8c-95d1-dbf555b6f913`);
            console.log(status);
            console.log("Pesquisando: ", teatro);
            console.log("achou: ", data.result.records);

            if (!data || status !== 200) {
                Alert.alert('Buscar', 'Digite um Teatro válido.');
            } else {
                setAddress(data.result.records[0]);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um Teatro válido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setTeatro('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!address &&
                    <Input
                        //keyboardType="numeric"
                        //maxLength={8}
                        onChangeText={setTeatro}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o Teatro que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={teatro}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {address &&
                <AddressArea>
                    <Text>Nome: {address.nome}</Text>
                    <Text>Rua: {address.logradouro}</Text>
                    <Text>Bairro: {address.bairro}</Text>
                    <Text>Telefone: {address.Telefone}</Text>
                    <Text>Descrição: {address.descricao}</Text>
                </AddressArea>
            }
        </Container>
    );
}