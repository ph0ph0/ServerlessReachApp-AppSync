import React, { useState } from 'react'
import {useQuery, useSubscription, useApolloClient} from '@apollo/react-hooks'
import ListRecipes from '../../graphql/queries/ListRecipes'
import NewRecipeSubscription from '../../graphql/subscriptions/NewRecipeSubscription'
import RecipeList from '../RecipeList'

const Recipes = () => {

    console.log(`--------------Rendered--------------------------`)

    //We don't have to set state because anytime the component renders, the query will be called.
    //It will try and get the data from our cache first if it can, and if not it will send off to the network.

    const client = useApolloClient()

    const { data, loading, error} = useQuery(ListRecipes)
    const { data: subData, error: subError} = useSubscription(NewRecipeSubscription,{
        fetchPolicy: 'cache-and-network',   
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
                console.log(`***---newRecipe not in cache, adding`)
                client.writeQuery({ 
                    query: ListRecipes,
                     data: {
                         listRecipes: {
                             items: [
                                ...dataInCache.listRecipes.items, newRecipe
                             ],
                             __typename: "RecipeConnection"
                         }
                     } 
                });
                const dataInCacheAfterAdd = client.readQuery({query: ListRecipes})
                console.log(`***--dataInCacheAfterAdd: ${JSON.stringify(dataInCacheAfterAdd)}`)
            } else {
                console.log(`!!!--newRecipe is either in cache or boolean map failed`)
            }
        }
    })


    console.log(`***--SubData!!!: ${JSON.stringify(subData)}`)
    if (subError) {
        console.log(`!!!--ssubscriptionError!: ${subError}`)
    }

    console.log(`data: ${JSON.stringify(data)}, t/f: ${!data}`)

    if (loading) return <p data-testid = "Loading">Loading...</p>
    if (error) {
        console.log(`Error getting ListRecipes: ${error}`)
        return <p>Error!</p>
    }

    return  (
        <div data-testid = "recipeComponent">
            <RecipeList  data = {data}/>
        </div>
    )
}

export default Recipes