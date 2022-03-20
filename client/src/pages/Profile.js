import React from "react";
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME } from "../utils/queries";
import { REMOVE_DRINK } from "../utils/mutations";
import { removeDrinkId } from '../utils/localStorage';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Container,
    Button,
    UnorderedList,
  } from '@chakra-ui/react';



const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [removeDrink] = useMutation(REMOVE_DRINK);
    const userData = data?.me || {};

    const handleDeleteDrink = async (idDrink) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            const { data } = await removeDrink({
                variables: {idDrink}
            });

            removeDrinkId(idDrink);
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
    }

    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
        <Container>
            <Box>
                <Heading>Saved Drinks</Heading>
            </Box>
            <Box>
                <Heading>
                    {userData.savedDrinks.length
                        ? `Viewing ${userData.savedDrinks.length} saved ${userData.savedDrinks.length === 1 ? 'drink' : 'drinks'}:`
                        : 'You have no saved drinks!'}
                </Heading>
            </Box>
            <Box>
                {userData.savedDrinks.map((drink) => {
                    return (
                        <Center py={12}>
                                <Box
                                    role={'group'}
                                    p={6}
                                    maxW={'330px'}
                                    w={'full'}
                                    bg={'white'}
                                    boxShadow={'2xl'}
                                    rounded={'lg'}
                                    pos={'relative'}
                                    zIndex={1}>
                                    <Box
                                    rounded={'lg'}
                                    mt={-12}
                                    pos={'relative'}
                                    height={'230px'}
                                    _after={{
                                        transition: 'all .3s ease',
                                        content: '""',
                                        w: 'full',
                                        h: 'full',
                                        pos: 'absolute',
                                        top: 5,
                                        left: 0,
                                        backgroundImage: `url(${drink.image})`,
                                        filter: 'blur(15px)',
                                        zIndex: -1,
                                    }}
                                    _groupHover={{
                                        _after: {
                                        filter: 'blur(20px)',
                                        },
                                    }}>
                                    <Image
                                        rounded={'lg'}
                                        height={230}
                                        width={282}
                                        objectFit={'cover'}
                                        src={drink.image}
                                    />
                                    </Box>
                                    <Stack pt={10} align={'center'}>
                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                            {drink.title}
                                        </Heading>
                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                            Glass: {drink.glass}
                                        </Heading>
                                        <Stack direction={'column'} align={'center'}>
                                            <Text fontWeight={800} fontSize={'xl'}>
                                            Ingredients:
                                            </Text>
                                            <UnorderedList color={'gray.600'}>
                                                {drink.ingredient1 ? <li>{drink.measure1} {drink.ingredient1}</li> : null}
                                                {drink.ingredient2 ? <li>{drink.measure2} {drink.ingredient2}</li> : null}
                                                {drink.ingredient3 ? <li>{drink.measure3} {drink.ingredient3}</li> : null}
                                                {drink.ingredient4 ? <li>{drink.measure4} {drink.ingredient4}</li> : null}
                                                {drink.ingredient5 ? <li>{drink.measure5} {drink.ingredient5}</li> : null}
                                                {drink.ingredient6 ? <li>{drink.measure6} {drink.ingredient6}</li> : null}
                                                {drink.ingredient7 ? <li>{drink.measure7} {drink.ingredient7}</li> : null}
                                                {drink.ingredient8 ? <li>{drink.measure8} {drink.ingredient8}</li> : null}
                                                {drink.ingredient9 ? <li>{drink.measure9} {drink.ingredient9}</li> : null}
                                                {drink.ingredient10 ? <li>{drink.measure10} {drink.ingredient10}</li> : null}
                                                {drink.ingredient11 ? <li>{drink.measure11} {drink.ingredient11}</li> : null}
                                                {drink.ingredient12 ? <li>{drink.measure12} {drink.ingredient12}</li> : null}
                                                {drink.ingredient13 ? <li>{drink.measure13} {drink.ingredient13}</li> : null}
                                                {drink.ingredient14 ? <li>{drink.measure14} {drink.ingredient14}</li> : null}
                                                {drink.ingredient15 ? <li>{drink.measure15} {drink.ingredient15}</li> : null}
                                            </UnorderedList>
                                            <Text fontWeight={800} fontSize={'xl'}>
                                                Instructions: {drink.instructions}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    <Button onClick={() => handleDeleteDrink(drink.idDrink)}>
                                        Delete Drink
                                    </Button>
                                </Box>
                            </Center>
                    )
                })}
            </Box>
        </Container>
        </>
    )

}

export default Profile;