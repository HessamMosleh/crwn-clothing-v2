import {createSelector} from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector([selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories)

export const selectCategoriesMap = createSelector([selectCategories],
    (categories) => {
      return categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    })



export const selectFixCategories = (state, count) => {
    const categoriesMap = selectCategoriesMap(state);
    let result = {};
    if(categoriesMap)
    Object.keys(categoriesMap).forEach(key => {
        result = {[key]: categoriesMap[key].slice(0, count), ...result}
    })
    return result;
}

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading)
