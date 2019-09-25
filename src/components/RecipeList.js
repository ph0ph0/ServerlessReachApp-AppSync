import React from 'react'
import { css } from 'glamor'
import Recipe from './Recipe'

const RecipeList = ({ data }) => {
    return (
        <div data-testid = "container" {...css(styles.container)}>    
            <h1>Recipes</h1>
            {
                data.listRecipes.items.map((recipe, index) => (
                    <Recipe 
                    recipe = {recipe}
                    index = {index}
                    />
                ))
            }
        </div>
    )
}

const styles = {
    title: {
        fontSize: 16
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    recipe: {
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        marginBottom: 7,
        padding: 14,
        border: '1px solid #EDEDED'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 100,
        paddingRight: 100,
        textAlign: 'left',
        alignItems: 'center'
    }
}

export default RecipeList