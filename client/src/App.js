import {
    Router,
    Routes,
    Route,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import TopNav from './components/TopNav';
import ViewProfiles from './views/ViewProfiles';

function App() {
    return (
        <Container fluid>
            <TopNav />
            <Routes>
                <Route 
                    exact
                    path='/' 
                    element={<ViewProfiles />}
                />
            </Routes>
        </Container>
    );
}

export default App;
