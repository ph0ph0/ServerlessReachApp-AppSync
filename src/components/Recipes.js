import React, { useState } from 'react'
import {useQuery, useSubscription} from '@apollo/react-hooks'
import ListRecipes from '../graphql/queries/ListRecipes'
import NewRecipeSubscription from '../graphql/subscriptions/NewRecipeSubscription'
import { css } from 'glamor'

const Recipes = () => {

    const [recipesState, setRecipeState] = useState([])

    const { data, loading, error} = useQuery(ListRecipes)

    console.log(`datas: ${JSON.stringify(data)}`)

    //Will need some sort of state to 
    //hold the data that comes from the query. Then, everytime the 
    //subscription fires, we append it to the state.

    //We want to do the first fetch when the component mounts and then update thereafter. Actually, 
    //useQuery fires when the component first mounts and so we dont need to put this into the
    //useEffect statement. We also need to provide an unmount listener call

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