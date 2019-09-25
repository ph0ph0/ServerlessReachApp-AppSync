import React from 'react'

import RecipeList from '../RecipeList'

import {render, cleanup, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import mocks, {data}  from '../__mocks__/mocks'

afterEach(cleanup)

it("renders Recipe", async () => {
    const { getByTestId } = render(
        <MockedProvider mocks = {mocks} addTypename = {false}>
            <RecipeList data = {data}/>
        </MockedProvider>
    )

    const recipeContainer = await waitForElement(() => getByTestId("container"))

    expect(recipeContainer).toBeInTheDocument()

    expect(getByTestId("recipeName")).toHaveTextContent("Recipe name: Tuna Roll")
})

it("Recipe List renderss", () => {
    const { asFragment } = render(
        <MockedProvider mocks = {mocks} addTypename = {false}>
                <RecipeList data = {data}/>
        </MockedProvider>
    )
    expect(asFragment()).toMatchSnapshot()
})