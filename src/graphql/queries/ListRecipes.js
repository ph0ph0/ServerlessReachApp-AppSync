import gql from 'graphql-tag'

export default gql`
    query listRecipes {
        listRecipes {
            items {
                id
                name
                ingredients
                instructions
            }
        }
    }
`