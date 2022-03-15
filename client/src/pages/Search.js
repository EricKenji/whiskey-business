import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';
import { SAVE_DRINK } from '../utils/mutations';
import { saveDrinkIds, getSavedDrinkIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const Search = () => {
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
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const drinkData = items.map((drink) => ({
        drinkId: drink.id,
        title: drink.strDrink,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb || '',
        glass: drink.strGlass || ['No glass specified'],
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
    <>
    <div className="container my-1">
        <h1>Search for Drinks!</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search for a drink"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
    </div>

      <div>
        <h2>
          {searchedDrinks.length
            ? `Viewing ${searchedDrinks.length} results:`
            : 'Search for a drink to begin'}
        </h2>
        <div>
          {searchedDrinks.map((drink) => {
            return (
              <div key={drink.drinkId} border="dark">
                {drink.image ? (
                  <img
                    src={drink.image}
                    alt={`The image for ${drink.title}`}
                    variant="top"
                  />
                ) : null}
                <div>
                  <h3>{drink.title}</h3>
                  <p className="small">Glass: {drink.glass}</p>
                  <p>{drink.instructions}</p>
                  {Auth.loggedIn() && (
                    <button
                      disabled={savedDrinkIds?.some(
                        (savedId) => savedId === drink.drinkId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveDrink(drink.drinkId)}
                    >
                      {savedDrinkIds?.some((savedId) => savedId === drink.drinkId)
                        ? 'Drink Already Saved!'
                        : 'Save This Drink!'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
