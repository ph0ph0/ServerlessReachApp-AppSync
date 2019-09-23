import React from 'react'
import Recipes from '../Recipes'
import {render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import ListRecipes from '../../graphql/queries/ListRecipes'

afterEach(cleanup)

it("renders", () => {
    const { asFragment } = render(<Recipes />)
    expect(asFragment()).toMatchSnapshot()
})

const mocks = [
    {
        request: {
            query: ListRecipes
        }, 
        result: {
            data: {
                listRecipes: {
                    
                    name: "Tuna Rolll",
                    id: "1",
                    instructions: ["Mix Tuna"],
                    ingredients: ["Tuna"]
                    
                }
            }
        }
    }
]

it("gets data from ListRecipes", () => {
    const { getByTestId } = render(
    <MockedProvider mocks = {mocks} addTypename = {false} >
        <Recipes />
    </MockedProvider>)
})
