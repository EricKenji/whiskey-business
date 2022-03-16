import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth'
import { SAVE_DRINK } from "../utils/mutations";
import { saveDrinkIds, getSavedDrinkIds } from '../utils/localStorage';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Input,
    Container,
    Button,
    FormControl,
    UnorderedList,
  } from '@chakra-ui/react';

  const SearchDrinks = () => {
    // create state for holding returned api data
    const [searchedDrinks, setSearchedDrinks] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
    // create state to hold saved drinkId values
    const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedDrinkIds());
  
    const [saveDrink, { error }] = useMutation(SAVE_DRINK);
  
    // set up useEffect hook to save `savedDrinkIds` list to localStorage on component unmount
    useEffect(() => {
      return () => saveDrinkIds(savedDrinkIds);
    });
  
    // create method to search for drinks and set state on form submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      if (!searchInput) {
        return false;
      }
  
      try {
        const response = await fetch(
          `https:www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
        );
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const { drinks } = await response.json();
        console.log(drinks);
        const drinkData = drinks.map((drink) => ({
          id: drink.drinkId,
          title: drink.strDrink,
          instructions: drink.strInstructions,
          image: drink.strDrinkThumb || '',
          glass: drink.strGlass || ['No glass specified'],
          ingredient1: drink.strIngredient1,
          ingredient2: drink.strIngredient2,
          ingredient3: drink.strIngredient3,
          ingredient4: drink.strIngredient4,
          ingredient5: drink.strIngredient5,
          ingredient6: drink.strIngredient6,
          ingredient7: drink.strIngredient7,
          ingredient8: drink.strIngredient8,
          ingredient9: drink.strIngredient9,
          ingredient10: drink.strIngredient10,
          ingredient11: drink.strIngredient11,
          ingredient12: drink.strIngredient12,
          ingredient13: drink.strIngredient13,
          ingredient14: drink.strIngredient14,
          ingredient15: drink.strIngredient15,
          measure1: drink.strMeasure1,
          measure2: drink.strMeasure2,
          measure3: drink.strMeasure3,
          measure4: drink.strMeasure4,
          measure5: drink.strMeasure5,
          measure6: drink.strMeasure6,
          measure7: drink.strMeasure7,
          measure8: drink.strMeasure8,
          measure9: drink.strMeasure9,
          measure10: drink.strMeasure10,
          measure11: drink.strMeasure11,
          measure12: drink.strMeasure12,
          measure13: drink.strMeasure13,
          measure14: drink.strMeasure14,
          measure15: drink.strMeasure15,
          // add ingredients & measurements here!!
        }));
  
        setSearchedDrinks(drinkData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    };
  
    // create function to handle saving a drink to our database
    const handleSaveDrink = async (drinkId) => {
      // find the drink in `searchedDrinks` state by the matching id
      const drinkToSave = searchedDrinks.find((drink) => drink.drinkId === drinkId);
  
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await saveDrink({
          variables: { drinkData: { ...drinkToSave } },
        });
        console.log(savedDrinkIds);
        setSavedDrinkIds([...savedDrinkIds, drinkToSave.drinkId]);
      } catch (err) {
        console.error(err);
      }
    };

    return (
       
        <Container>
            <Heading>Search for Drinks!</Heading>
            <form onSubmit={handleFormSubmit}>
                <FormControl isRequired>
                    <Input 
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Search for a drink"
                    ></Input>
                    <Button colorScheme='orange' type="submit">Search</Button>
                </FormControl>
            </form>

            <Box>
                <Heading>
                {searchedDrinks.length
                    ? `Viewing ${searchedDrinks.length} results:`
                    : 'Search for a drink to begin'}
                </Heading>
                <Box>
                    {searchedDrinks.map((drink) => {
                        return(
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
                                    {Auth.loggedIn() && (
                                        <Button
                                        disabled={savedDrinkIds?.some(
                                            (savedId) => savedId === drink.drinkId
                                        )}
                                        className="btn-block btn-info"
                                        onClick={() => handleSaveDrink(drink.drinkId)}
                                        >
                                        {savedDrinkIds?.some((savedId) => savedId === drink.drinkId)
                                            ? 'Drink Already Saved!'
                                            : 'Save This Drink!'}
                                        </Button>
                                    )}
                                </Box>
                            </Center>
                        )
                    })}
                </Box>
            </Box>
        </Container>
      );
    
}

export default SearchDrinks;