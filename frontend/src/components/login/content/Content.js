// import useAxios from '../../../core/useAxios'
import Input from './Input'
import SubmitButton from './SubmitButton'



const Content = ({ onSubmit, submitText, inputText, inputPlaceHolder, inputHandlers }) => {
    return (
        <div className='login__content'>
            <Input handlers={inputHandlers} placeholder={inputPlaceHolder} labelText={inputText} />
            <SubmitButton onClick={onSubmit} text={submitText} />
        </div>
    )
}

export default Content
