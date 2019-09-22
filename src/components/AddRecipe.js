import React, { Component, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import CreateRecipe from '../graphql/mutations/CreateRecipe'
import ListRecipes from '../graphql/queries/ListRecipes'
import { css } from 'glamor'

//Note that hooks are used only for function components! So here we can define loads of state hooks.
const AddRecipe = () => {

    const [name, setName] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [instruction, setInstruction] = useState('')
    const [instructions, setInstructions] = useState([])

    const [updateReceipeList, { loading: mutationLoading, error: mutationError}] = useMutation(CreateRecipe)

    const onChange = (key, value) => {

        // console.log(`***--onChange k, v: ${key}, ${value}`)

        switch(key) {
            case 'name':
                setName(value)
                break;
            case 'ingredient':
                setIngredient(value)
                break;
            case 'instruction':
                setInstruction(value)
                break;
            default:
                console.log(`*******No match in AddRecipe switch!: ${key}, ${value}`)
        }
    }

    const addIngredient = () => {
        if (ingredient === '') {
            console.log(`!!!!--ingredient was nil`)
            return
        }

        const listOfIngredients = ingredients
        listOfIngredients.push(ingredient)
        setIngredient('')
        setIngredients(listOfIngredients)
    }

    const addInstruction = () => {
        if (instruction === '') {
            console.log(`!!!!--Instruction was nil`)
            return
        }

        const listOfInstructions = instructions
        listOfInstructions.push(instruction)
        setInstruction('')
        setInstructions(listOfInstructions)
    }

    const addRecipe = () => {
        const nameToAdd = name
        const ingredientsToAdd = ingredients
        const instructionsToAdd = instructions

        console.log(`***--addRecipe(name, ingredients, instructions): ${name}, ${ingredients}, ${instructions}`)

        updateReceipeList({
            variables: {
                name: nameToAdd,
                ingredients: ingredientsToAdd,
                instructions: instructionsToAdd
            }
        })

        setName('')
        setIngredient('')
        setIngredients([])
        setInstruction('')
        setInstructions([])

    }

    return (
        <div {...css(styles.container)}>
            <h2>
                Create Recipe
            </h2>
            <form
                onSubmit = {event => {
                    event.preventDefault()
                }}
            >
                <input 
                    value = {name}
                    onChange = {event => onChange('name', event.target.value)}
                    placeholder = 'Recipe Name'
                    {...css(styles.input)}
                />
                <div>
                    <p>Recipe Ingredients:</p>
                    {
                        ingredients.map((item, i) => <p key = {i}>{i+1}. {item}</p>)
                    }
                </div>
                <input 
                    value = {ingredient}
                    onChange = {event => onChange('ingredient', event.target.value)}
                    placeholder = 'Ingredient'
                    {...css(styles.input)}
                />
                <button 
                onClick = {addIngredient}
                {...css(styles.button)} 
                >
                    Add Ingredient
                </button>
                <div>
                    <p>Recipe Instructions</p>
                    {instructions.map((item, i) => <p key = {i}>{`${i+1}. ${item}`}</p>)}
                </div>
                <input 
                    value = {instruction}
                    onChange = {event => onChange('instruction', event.target.value)}
                    placeholder = 'Instruction'
                    {...css(styles.input)}
                />
                <button
                    onClick = {addInstruction}
                    {...css(styles.button)}
                >
                    Add Instruction
                </button>
                <button 
                    onClick = {addRecipe}
                    {...css(styles.submitButton)}
                >
                    Add Recipe
                </button>
            </form>
            {mutationLoading && <p>Loading...</p>}
            {mutationError && <p>Error!</p>}
            {mutationError && console.log(`!!!--Error doing mutation: ${mutationError.message}`)}
        </div>
    )
}

const styles = {
    button: {
        border: 'none',
        background: 'rgba(0, 0, 0, 0.1)',
        width: 100,
        height: 40,
        cursor: 'pointer',
        margin: '15px 0px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 100,
        paddingRight: 100,
        textAlign: 'left'
    },
    input: {
        outline: 'none',
        border: 'none',
        borderBottom: '2px solid #00DD3B',
        height: '44px',
        fontSize: '18px'
    },
    textarea: {
        border: '1px solid #ddd',
        outline: 'none',
        fontSize: '18px'
    },
    submitButton: {
        backgroundColor: '#00DD3B',
        padding: '8px 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .85,
        cursor: 'pointer',
        ':hover': {
            opacity: 1
        }
    }
}

export default AddRecipe