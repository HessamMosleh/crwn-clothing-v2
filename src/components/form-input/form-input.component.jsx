import {FormInputLabel, Group, Input} from "./form-input.styles";
const FormInput = ({label, ...otherProps}) => {
    return (<Group className='group'>
            <Input {...otherProps}/>
            {label && (
                <FormInputLabel  shirink={otherProps.value.at(0)}>
                    {label}
                </FormInputLabel>)}
        </Group>
    )
}

export default FormInput;