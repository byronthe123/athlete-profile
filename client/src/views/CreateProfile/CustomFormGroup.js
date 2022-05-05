import { FormGroup, Label } from 'reactstrap';
import { Field } from 'formik';

import FormError from './FormError';

export default function CustomFormGroup ({ label, errors, field, type }) {
    return (
        <FormGroup>
            <Label>{label} <FormError message={errors[field]} /></Label>
            <Field name={field} type={type || 'text'} className={'form-control'} />
        </FormGroup>
    );
}