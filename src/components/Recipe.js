import React from 'react'
import { css } from 'glamor'

const Recipe = ({ recipe, index }) => {

    const { name, ingredients, instructions } = recipe

    return (
        <div {...css(styles.recipe)} key = {index}>
            <p data-testid = "recipeName" {...css(styles.title)}>Recipe name: {name}</p>
            <div>
                <p {...css(styles.title)}>Ingredients</p>
                {
                    ingredients.map((ingredient, index2) => (
                        <p data-testid = "recipeIngredients" {...css(styles.subtitle)} key = {index2}>{ingredient}</p>
                    ))      
                }                            
            </div>
            <div>
                <p {...css(styles.title)}>Instructions</p>
                {
                    instructions.map((instruction, index3) => (
                        <p data-testid = "recipeInstructions"{...css(styles.subtitle)} key = {index}>
                        {index3 + 1}. {instruction}
                        </p>
                    ))
                }
            </div>
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

export default Recipe