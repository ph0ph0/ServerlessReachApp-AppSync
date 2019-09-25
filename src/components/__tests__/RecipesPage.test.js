//Should render DONE
//Should get data from query
//Should display loading when query fetching
//Should show error if query fails
//Should display query results on page
//Should link subscription on mount
//Should unlink sub on unmount
//Should update query results on page when results change

import React from 'react'
import RecipesPage from '../containers/RecipesPage'

import {render, cleanup, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import mocks from '../__mocks__/mocks'

afterEach(cleanup)

it("gets data from ListRecipess", async () => {

    const { getByTestId } = render(
        <MockedProvider mocks = {mocks} addTypename = {false}>
                <RecipesPage />
        </MockedProvider>
    )

    expect(getByTestId("Loading")).toHaveTextContent("Loading...")

    const resolvedDataDiv = await waitForElement(() => (getByTestId("recipeComponent")))
    
    expect(resolvedDataDiv).toBeInTheDocument()


})

it("Recipe page renders", () => {
    const { asFragment } = render(
        <MockedProvider mocks = {mocks} addTypename = {false}>
                <RecipesPage />
        </MockedProvider>
    )
    expect(asFragment()).toMatchSnapshot()
})