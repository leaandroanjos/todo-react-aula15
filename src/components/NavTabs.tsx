import React from "react";
import { Nav, NavItem } from "react-bootstrap";


const NavTabs: React.FC = () => {
    return(
        <Nav variant="tabs" className="flex-column flex-md-row" id="tab-list">
            <NavItem>
                <Nav.Link eventKey="newest-pane">
                    <h6>Newest</h6>
                </Nav.Link>
            </NavItem>
            <NavItem>
                <Nav.Link eventKey="oldest-pane">
                    <h6>Oldest</h6>
                </Nav.Link>
            </NavItem>
        </Nav>
    );
}

export default NavTabs;