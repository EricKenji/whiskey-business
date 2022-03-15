import React from "react";
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_ME } from "../utils/queries";
import { REMOVE_DRINK } from "../utils/mutations";
import { removeDrinkId } from '../utils/localStorage';
import { CardGroup, Card, Button } from 'react-bootstrap';



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
            <div>
                <h1>SAVED DRINKS</h1>
            </div>
            <div>
                <h2>
                    {userData.savedDrinks.length
                    ? `Viewing ${userData.savedDrinks.length} saved ${userData.savedDrinks.length === 1 ? 'drink' : 'drinks'}:`
                    : 'You have no saved drinks!'}
                </h2>
                <CardGroup>
                    {userData.savedDrinks.map((drink) => {
                        return (
                            <Card key={drink.idDrink}>
                                {drink.image ? <Card.Img src={drink.image} variant ='top'/> : null }
                                <Card.Body>
                                    <Card.Title>{drink.name}</Card.Title>
                                    <Card.Text>{drink.instructions}</Card.Text>
                                    <Button onClick={() => handleDeleteDrink(drink.idDrink)}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </CardGroup>
            </div>
        </>
    )

}

export default Profile;