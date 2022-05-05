import { Row, Col, Table, Button } from 'reactstrap';

export default function Summary ({ 
    values,   
    setViewSummary,
    createUpdateProfile 
}) {

    return (
        <Row>
            <Col md={12} className={'mb-5'}>
                <h6 className={'d-inline mr-3'}>Review Summary</h6>
                <Button 
                    className={'d-inline'}
                    onClick={() => setViewSummary(false)}
                >
                    Edit Form
            </Button>
            </Col>
            <Col md={12}>
                <Table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td className={'font-weight-bold'}>Name</td>
                            <td>{values.name}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>Date of Birth</td>
                            <td>{values.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>Location</td>
                            <td>{values.location}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>Gender</td>
                            <td>{values.gender}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>Sports</td>
                            <td>{values.sports.join(', ')}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>About</td>
                            <td>{values.about}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>Interests</td>
                            <td>{values.interests}</td>
                        </tr>
                        <tr>
                            <td className={'font-weight-bold'}>Profile Image</td>
                            <td>
                                {
                                    (values.profileImage && values.profileImage.length > 0) ? 
                                        <img src={values.profileImage} style={{ width: '100px', height: 'auto' }} /> :
                                        'None'
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            <Col md={12} className={'text-center'}>
                <Button onClick={() => createUpdateProfile(values)}>Submit</Button>
            </Col>
        </Row>
    );
}