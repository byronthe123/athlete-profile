import { Row, Col, Button } from 'reactstrap';

export default function Home () {
    return (
        <Row>
            <Col>
                <h1>Athlete Profiles</h1>
                <Button>View Existing</Button>
                <Button>Create New</Button>
            </Col>
        </Row>
    );
}