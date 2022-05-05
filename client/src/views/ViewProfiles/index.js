import { useState, useEffect } from 'react';
import { Row, Col, Table, Button } from 'reactstrap';
import axios from 'axios';
import dayjs from 'dayjs';

import ProfileModal from '../CreateProfile/ProfileModal';

export default function ViewProfiles () {

    const [profiles, setProfiles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [createNew, setCreateNew] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [initialDataQuery, setInitialDataQuery] = useState(false);

    useEffect(() => {
        const getProfiles = async () => {
            alert('running');
            const res = await axios.get('/api/profiles');
            if (res.status === 200) {
                setProfiles(res.data);
            }
        }
        if (!initialDataQuery) {
            getProfiles();
            setInitialDataQuery(true);
        }
    }, [initialDataQuery]);

    const launchModal = (createNew, selectedProfile=null) => {
        setCreateNew(createNew);
        if (!createNew && selectedProfile !== null) {
            setSelectedProfile(selectedProfile);
        }
        setModalOpen(true);
    }

    return (
        <Row>
            <Col md={12} className={'mb-3'}>
                <h4 className={'d-inline mr-3'}>View Profiles</h4>
                <Button 
                    className={'d-inline'}
                    onClick={() => launchModal(true)}
                >
                    Create New Profile
                </Button>
            </Col>
            <Col>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Location</th>
                            <th>Gender</th>
                            <th>Sports</th>
                            <th>About</th>
                            <th>Interests</th>
                            <th>Profile Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            profiles.map((p, i) => (
                                <tr 
                                    key={i}
                                    onClick={() => launchModal(false, p)}
                                >
                                    <th>{i + 1}</th>
                                    <td>{p.name}</td>
                                    <td>{dayjs(p.dateOfBirth).format('MM/DD/YYYY')}</td>
                                    <th>{p.location}</th>
                                    <th>{p.gender}</th>
                                    <th>{p.sports.join(', ')}</th>
                                    <th>{p.about}</th>
                                    <th>{p.interests}</th>
                                    <th>
                                        <img 
                                            src={p.profileImage || '/assets/img/placeholder-user.png'} 
                                            style={{ width: '50px', height: 'auto' }}
                                        />
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
            <ProfileModal 
                modal={modalOpen}
                setModal={setModalOpen}
                createNew={createNew}
                selectedProfile={selectedProfile}
                setProfiles={setProfiles}
            />
        </Row>
    );
}