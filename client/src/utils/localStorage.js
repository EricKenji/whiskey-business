export const getSavedDrinkIds = () => {
    const savedDrinkIds = localStorage.getItem('saved_drinks')
        ? JSON.parse(localStorage.getItem('saved_drinks'))
        : [];

    return savedDrinkIds;
};

export const saveDrinkIds = (drinkIdArray) => {
    if (drinkIdArray.length) {
        localStorage.setItem('saved_drinks', JSON.stringify(drinkIdArray));
    } else {
        localStorage.removeItem('saved_drinks');
    }
};

export const removeDrinkId = (idDrink) => {
    const savedDrinkIds = localStorage.getItem('saved_drinks')
        ? JSON.parse(localStorage.getItem('saved_drinks'))
        : null;

    if(!savedDrinkIds) {
        return false;
    }

    const updatedSavedDrinkIds = savedDrinkIds?.filter((savedDrinkId) => savedDrinkId !== idDrink);
    localStorage.setItem('saved_drinks', JSON.stringify(updatedSavedDrinkIds));

    return true;
}