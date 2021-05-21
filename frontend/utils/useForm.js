import {useState} from 'react';

export default function useForm(defaults) {
    const [values, setValues] = useState(defaults);

    function updateValues(e) {
        let {value} = e.target;
        if (e.target.type === 'number') {
            value = parseInt(e.target.value);
        }
        if (e.target.name === 'category_id') {
            value = parseInt(e.target.value);
        }
        if (e.target.name === 'rating') {
            value = e.target.value;
            value = value * 2;
            console.log(value)

        }
        setValues({
            ...values,
            [e.target.name]: value,
        });
    }


    return {values, updateValues};
}
