import React from 'react'
import {useQuery, useSubscription} from '@apollo/react-hooks'
import ListRecipes from '../graphql/queries/ListRecipes'
import NewRecipeSubscription from '../graphql/subscriptions/NewRecipeSubscription'
import { css } from 'glamor'

const Recipes = () => {

    //Will need some sort of state to hold the data that comes from the query. Then, everytime the 
    //subscription fires, we append it to the state.
    
    const { data, loading, error } = useSubscription(NewRecipeSubscription);

    console.log(`subData: ${data}`)

    //We want to do the first fetch when the component mounts and then update thereafter.

    return (
        <h1>Recipes!</h1>
    )
   }

const styles = {
    title: {

    },
    subtitle: {

    },
    recipe: {

    },
    container: {

    }
}

export default Recipes