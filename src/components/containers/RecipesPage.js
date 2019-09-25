import React, { useState } from 'react'
import {useQuery, useSubscription} from '@apollo/react-hooks'
import ListRecipes from '../../graphql/queries/ListRecipes'
import NewRecipeSubscription from '../../graphql/subscriptions/NewRecipeSubscription'
import RecipeList from '../RecipeList'

const Recipes = () => {

    //We don't have to set state because anytime the component renders, the query will be called.
    //It will try and get the data from our cache first if it can, and if not it will send off to the network.
    // const [recipesState, setRecipeState] = useState(null)

    const { data, loading, error} = useQuery(ListRecipes)
    const {loading: subLoading, error: subError} = useSubscription(NewRecipeSubscription)

    console.log(`data: ${JSON.stringify(data)}`)

    //Will need some sort of state to 
    //hold the data that comes from the query. Then, everytime the 
    //subscription fires, we append it to the state.

    //We want to do the first fetch when the component mounts and then update thereafter. Actually, 
    //useQuery fires when the component first mounts and so we dont need to put this into the
    //useEffect statement. We also need to provide an unmount listener call

    if (loading) return <p data-testid = "Loading">Loading...</p>
    if (error) {
        console.log(`Error getting ListRecipes: ${error}`)
        return <p>Error!</p>
    }

    return (
        <div data-testid = "recipeComponent">
            <RecipeList  data = {data}/>
            {subLoading && <p>Loading</p>}
            {subError && <p>Error</p>}
        </div>
        
    )
}

export default Recipes