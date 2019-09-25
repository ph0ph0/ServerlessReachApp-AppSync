
import ListRecipes from '../../graphql/queries/ListRecipes'

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
                            name: "Tuna Rolll",
                            id: "1",
                            instructions: ["Mix Tuna"],
                            ingredients: ["Tuna"]
                        }  
                    ]                  
                }
            }
        }
    }
]

const data = {
    listRecipes: {
        items: [
            {
                id: "1",
                name: "Tuna Roll",
                instructions: ["Mix Tuna"],
                ingredients: ["Tuna"]
            }  
        ]                  
    }
}


export default mocks
export {data}