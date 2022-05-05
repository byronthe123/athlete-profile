import { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import ProfileForm from './ProfileForm';
import Summary from './Summary';
import history from '../../utils/history';
import dayjs from 'dayjs';

const profileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    location: yup.string().required('Location is required'),
    team: yup.string().required('Team is required'),
    gender: yup.string().required('Gender is required'),
    sports: yup.array().min(1, 'Please select at least 1 sport').required(),
    about: yup.string().required('About is required'),
    interests: yup.string().required('Interests is required'),
    profileImage: yup.string().notRequired().nullable()
});

export default function ManageProfile ({ 
    createNew, 
    selectedProfile,
    toggle,
    setProfiles
}) {

    const [initialValues, setInitialValues] = useState({
        name: '',
        dateOfBirth: '',
        location: '',
        team: '',
        gender: '',
        sports: [],
        about: '',
        interests: '',
        profileImage: ''
    });

    // Use the sportsMap object to track selected sports, it's more efficient than an array
    const [sportsMap, setSportsMap] = useState({
        'Golf': false,
        'Tennis': false,
        'Cricket': false,
        'Basketball': false,
        'Baseball': false,
        'American Football': false,
        'Aquatics': false,
        'Archery': false,
        'Automobile Racing': false,
        'Badminton': false,
        'Beach Volleyball': false,
        'Bobsleigh': false,
        'Body Building': false,
        'Boxing': false,
        'Cross Country Running': false,
        'Cross Country Skiing': false,
        'Curling': false,
        'Cycling': false,
        'Darts': false,
        'Decathlon': false,
        'Down Hill Skiing': false,
        'Equestrianism': false,
        'eSports': false,
        'Fencing': false,
        'Field Hockey': false,
        'Figure Skating': false,
        'Gymnastics': false,
        'Ice Hockey': false,
        'Martial Arts': false,
        'Mixed Martial Arts': false,
        'Modern Pentathlon': false,
        'Motorcycle Racing': false,
        'Netball': false,
        'Polo': false,
        'Racquetball': false,
        'Rowing': false,
        'Rugby': false,
        'Sailing': false,
        'Softball': false,
        'Shooting': false,
        'Skateboarding': false,
        'Skeet Shooting': false,
        'Skeleton': false,
        'Snow Boarding': false,
        'Soccer (Football)': false,
        'Squash': false,
        'Surfing': false,
        'Swimming': false,
        'Track and Field': false,
    });

    useEffect(() => {
        if (!createNew && selectedProfile !== null) {
            const valuesCopy = { ...initialValues };
            for (let key in selectedProfile) {
                let value = selectedProfile[key];
                if (key === 'dateOfBirth') {
                    value = dayjs(value).format('YYYY-MM-DD');
                }
                valuesCopy[key] = value;
            }
            setInitialValues(valuesCopy);
            const { sports } = selectedProfile;
            const sportsMapCopy = { ...sportsMap };
            for (let i = 0; i < sports.length; i++) {
                sportsMapCopy[sports[i]] = true;
            } 
            setSportsMap(sportsMapCopy);
        }
    }, [createNew, selectedProfile]);

    const handleSelectSport = (key) =>  {
        setSportsMap((prev) => {
            const mapCopy = { ...prev };
            mapCopy[key] = !mapCopy[key];
            return mapCopy;
        });
    }

    const [viewSummary, setViewSummary] = useState(false);

    const createUpdateProfile = async (values) => {
        const body = values;

        try {
            let res;
            if (createNew) {
                res = await axios.post('/api/profile', body);
            } else {
                res = await axios.put('/api/profile', body);
            }
            if (res.status === 200) {
                setProfiles(res.data);
                toggle();
            }
        } catch (err) {
            alert(err.response.data.errors);
        }
    }

    return (
        <Row>
            <Col md={12}>
                <h4>{createNew ? 'Create' : 'Update'} Profile:</h4>
                <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    enableReinitialize={true}
                    validateOnMount={true}
                >
                    {({ values, isValid, errors, setFieldValue }) => (
                        <>
                            {
                                !viewSummary ? 
                                    <ProfileForm 
                                        setFieldValue={setFieldValue}
                                        isValid={isValid}
                                        errors={errors}
                                        sportsMap={sportsMap}
                                        handleSelectSport={handleSelectSport}
                                        setViewSummary={setViewSummary}
                                    /> :
                                    <Summary 
                                        values={values}
                                        setViewSummary={setViewSummary}
                                        createUpdateProfile={createUpdateProfile}
                                    />
                            }
                        </>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}