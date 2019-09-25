import React from 'react'
import Recipe from '../Recipe'

import {render, cleanup, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import mocks, {data} from '../__mocks__/mocks'

afterEach(cleanup)

const recipe = {
    name: data.listRecipes.items[0].name,
    instructions: data.listRecipes.items[0].instructions,
    ingredients: data.listRecipes.items[0].ingredients
}

// const name = data.listRecipes.items[0].name
// const instructions = data.listRecipes.items[0].instructions
// const ingredients = data.listRecipes.items[0].ingredients

it(("has recipe name, ingredients and instructions"), () => {
    const { getByTestId } = render(
        <MockedProvider mocks = {mocks} addTypename = {false}>
                <Recipe 
                recipe = {recipe}
                index = {0}
                />
        </MockedProvider>
    )
    expect(getByTestId("recipeName")).toHaveTextContent("Tuna Roll")
    expect(getByTestId("recipeInstructions")).toHaveTextContent("Mix Tuna")
    expect(getByTestId("recipeIngredients")).toHaveTextContent("Tuna")
})

it("Recipe renders", () => {
    const { asFragment } = render(
        <MockedProvider mocks = {mocks} addTypename = {false}>
                <Recipe 
                recipe = {recipe}
                index = {0}
                />
        </MockedProvider>
    )
    expect(asFragment()).toMatchSnapshot()
})