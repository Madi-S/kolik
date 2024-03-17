import { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import axios from 'axios'

import { getUser } from './../../../core/utils'
import './../../../styles/index/create.css'
import './../../../styles/field.css'
import { showAlert } from '../../../redux/actions'

const CreatePage = () => {
    const dispatch = useDispatch()

    const isCarPostPayloadValid = payload => {
        const isNumeric = num => !isNaN(num)

        if (isNumeric(payload['price_per_day'])) {
            return true
        }

        return false
    }

    const createCarPost = async event => {
        event.preventDefault()

        const { id, phone } = getUser()
        const token = phone.token
        const userId = id

        const payload = {}

        const inputs = event.target.querySelectorAll('input')
        for (let input of inputs) {
            payload[input.name] = input.value
        }

        if (!isCarPostPayloadValid(payload)) {
            return alert('Given data is invalid')
        }

        const config = {
            method: 'POST',
            data: payload,
            headers: { token, userId },
            url: 'http://127.0.0.1:8000/create-carpost'
        }

        
        try {
            const res = await axios(config)
            
            console.log(res)
            alert('Created successfully')

            event.target.reset()
        } catch (err) {
            alert(err)
        }

    }

    return (
        <div className='create'>
            <div className='create__header'>Create a New Car Post!</div>
            <form
                method='post'
                action='http://127.0.0.1:8000/create-carpost'
                className='create__form'
                onSubmit={createCarPost}
            >
                <InputField
                    type='text'
                    label='Title'
                    name='title'
                    placeholder='Toyota 50 Red'
                />
                <InputField
                    type='text'
                    label='Price per day (KZT)'
                    name='price_per_day'
                    placeholder='8000'
                />
                <InputField
                    type='text'
                    label='Short description'
                    name='description'
                    placeholder='Very fast and comfortable car'
                />
                <InputField
                    type='text'
                    label='Location'
                    name='location'
                    placeholder='astana/almaty/kokshetau'
                />

                <button className='create__submit' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

const InputField = ({ type, placeholder, name, label, accept, multiple }) => {
    return (
        <label className='field field_v1'>
            <input
                type={type}
                name={name}
                accept={accept || '*'}
                placeholder={placeholder}
                className='field__input'
                multiple={multiple}
            />
            <span className='field__label-wrap'>
                <span className='field__label'>{label}</span>
            </span>
        </label>
    )
}

export default CreatePage
