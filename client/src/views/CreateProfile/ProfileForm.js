import { useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import { Field } from 'formik';

import CustomFormGroup from './CustomFormGroup';
import FormError from './FormError';

export default function ProfileForm ({ 
    setFieldValue,
    sportsMap, 
    handleSelectSport, 
    isValid,
    errors,
    setViewSummary 
}) {

    useEffect(() => {
        const selectedSports = [];
        for (let key in sportsMap) {
            if (sportsMap[key]) {
                selectedSports.push(key);
            }
        }
        setFieldValue('sports', selectedSports);
    }, [sportsMap]);

    return (
        <Row>
            <Col md={12}>
                <h6>Fill in Form</h6>
            </Col>
            <Col md={12}>
                <Row>
                    <Col md={6}>
                        <CustomFormGroup label={'Name'} field={'name'} errors={errors}  />
                        <CustomFormGroup label={'Date of Birth'} field={'dateOfBirth'} type={'date'} errors={errors}  />
                    </Col>
                    <Col md={6}>
                        <CustomFormGroup label={'Location'} field={'location'} errors={errors}  />
                        <CustomFormGroup label={'Team'} field={'team'} errors={errors}  />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label className={'d-block'}>Sports (click to select) <FormError message={errors.sports} /></Label>
                            {
                                Object.keys(sportsMap).map((key, i) => (
                                    <Button 
                                        key={i}
                                        className={'mr-2 mb-2'}
                                        onClick={() => handleSelectSport(key)}
                                        color={sportsMap[key] ? 'primary' : 'secondary'}
                                    >
                                        {key}
                                    </Button>
                                ))
                            }
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label className={'d-block'}>Gender <FormError message={errors.gender} /></Label>
                            <Label className='mr-3'>
                                Male
                                <Field type={'radio'} name={'gender'} value={'male'} />
                            </Label>
                            <Label>
                                Female
                                <Field type={'radio'} name={'gender'} value={'female'} />
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <CustomFormGroup label={'About'} field={'about'} errors={errors}  />
                <CustomFormGroup label={'Interests'} field={'interests'} errors={errors}  />
                <CustomFormGroup label={'Profile Image'} field={'profileImage'} errors={errors}  />
            </Col>
            <Col md={12} className={'text-center'}>
                <Button 
                    onClick={() => setViewSummary(true)}
                    className={'text-right'}
                    // disabled={!isValid}
                >
                    Review
                </Button>
            </Col>
        </Row>
    );
}