import { Navbar, NavItem, NavbarBrand, Nav, NavLink } from 'reactstrap';
import { NavLink as RouterNavLink } from "react-router-dom";


export default function TopNav () {
    return (
        <Navbar
            color="light"
            expand="md"
            light
            className={'mb-3'}
        >
            <NavbarBrand>
                <NavLink
                    tag={RouterNavLink}
                    to={'/'}
                >
                    Athlete Profiles
                </NavLink>
            </NavbarBrand>
        </Navbar>
    );
}
