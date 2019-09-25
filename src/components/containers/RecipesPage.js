import React, { useState } from 'react'
import {useQuery, useSubscription, useApolloClient} from '@apollo/react-hooks'
import ListRecipes from '../../graphql/queries/ListRecipes'
import NewRecipeSubscription from '../../graphql/subscriptions/NewRecipeSubscription'
import RecipeList from '../RecipeList'

const Recipes = () => {

    console.log(`--------------Rendered--------------------------`)

    //We don't have to set state because anytime the component renders, the query will be called.
    //It will try and get the data from our cache first if it can, and if not it will send off to the network.
    // const [recipesState, setRecipeState] = useState(null)

    const client = useApolloClient()

    const { data, loading, error} = useQuery(ListRecipes)
    const { data: subData, loading: subLoading, error: subError} = useSubscription(NewRecipeSubscription,{
        onSubscriptionData: ({ subscriptionData }) => {
            console.log(`***--RecipeAdded returned to sub: ${JSON.stringify(subscriptionData)}`)
            console.log(`***--Updating cache`)

            const includedInCache = (set, newRecipe) =>
                set.map(recipe => recipe.id).includes(newRecipe.id)

            const dataInCache = client.readQuery({query: ListRecipes})
            console.log(`***--dataInCacheBeforeAdd: ${JSON.stringify(dataInCache)}`)

            const newRecipe = subscriptionData.data.onCreateRecipe
            console.log(`***--NewRecipe: ${JSON.stringify(newRecipe)}`)

            if (!includedInCache(dataInCache.listRecipes.items,newRecipe)) {
                console.log(`***--newRecipe not in cache, adding`)
                dataInCache.listRecipes.items.push(newRecipe)
                client.writeData({
                    data: dataInCache
                })
                const dataInCacheAfterAdd = client.readQuery({query: ListRecipes})
                console.log(`***---cache after add: ${dataInCacheAfterAdd}`)
            console.log(`***--dataInCacheAfterAdd: ${JSON.stringify(dataInCache)}`)
            } else {
                console.log(`!!!--newRecipe is either in cache or boolean map failed`)
            }
        }
    })


    console.log(`***--SubData!!!: ${JSON.stringify(subData)}`)
    if (subLoading) {
        console.log(`***--sub is loading!: ${subLoading}`)
    }

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
            {subLoading && <p>Loading...</p>}
            {subError && <p>Error</p>}
        </div>
        
    )
}

export default Recipes