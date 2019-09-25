import gql from 'graphql-tag'

export default gql`

    subscription NewRecipeSub {
        onCreateRecipe {
            
            name
            ingredients
            instructions
        }
    }

`