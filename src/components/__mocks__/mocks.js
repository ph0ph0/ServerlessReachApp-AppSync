
import ListRecipes from '../../graphql/queries/ListRecipes'
import NewRecipeSubscription from '../../graphql/subscriptions/NewRecipeSubscription'

const mocks = [
    {
        request: {
            query: ListRecipes
        }, 
        result: {
            data: {
                listRecipes: {
                    items: [
                        {
                            name: "Tuna Roll",
                            id: "2f568ti7vyu",
                            instructions: ["Mix Tuna"],
                            ingredients: ["Tuna"]
                        }  
                    ]                  
                }  
            }
        }
    },
    {
        request: {
            query: NewRecipeSubscription
        }, 
        result: {
            data: {
                onCreateRecipe: {
                    name: "Tuna Roll",
                    id: "2ityvviy",
                    instructions: ["Mix Tuna"],
                    ingredients: ["Tuna"]                     
                }  
            }
        }
    }
]

const data = {
    listRecipes: {
        items: [
            {
                id: "1bhuiyg",
                name: "Tuna Roll",
                instructions: ["Mix Tuna"],
                ingredients: ["Tuna"],
                // __typename: "Recipe"
            }  
        ],
    // __typename: "RecipeConnection"
    }
}


export default mocks
export {data}