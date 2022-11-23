import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FEATURE_ROUTE_BASED } from "helper/constantsDefined";
import { setToLS } from "helper/utilities";
import { useDispatch } from "react-redux";
import { updateCurrentCategoryMenu } from "actions/permissionActions";
import { scrollHorizontal } from "HOC/ScrollHorizontal";
import {
    Navbar,
    Nav,
    NavItem,
    SidebarTrigger,
    ThemeConsumer
} from "../../components";
import NavbarTopMenuToggle from "./topMenuButtons/NavbarTopMenuToggle";
import classes from "./SidebarWithNavbarNavbar.scss";

const SidebarWithNavbarNavbar = ({ crumbs }) => {
    const dispatch = useDispatch();

    function redirectPage(item) {
        dispatch(updateCurrentCategoryMenu(item));
        // setToLS(FEATURE_ROUTE_BASED.CURRENT_CATEGORY, item);
    }

    const NavContainer = React.memo(() => (
        <Nav className={classes["navbar-container"]}>
            <Nav navbar>
                <NavItem>
                    <Link
                        className="sidebar-menu__entry__link doxa-navbar-link"
                        onClick={() => redirectPage("Service")}
                    >
                        Service
                    </Link>
                </NavItem>
            </Nav>
        </Nav>
    ));

    const ScrollNavBar = scrollHorizontal(NavContainer);
    return (
        <ThemeConsumer>
            {() => (
                <>
                    {/*    Main Navbar    */}
                    <Navbar
                        light
                        fluid
                        className="pb-0 pb-lg-2 border-bottom"
                        expand="lg"
                        themed
                    >
                        <Nav navbar>
                            <NavItem>
                                <SidebarTrigger />
                            </NavItem>
                        </Nav>
                        <ScrollNavBar />
                        <Nav navbar className="ml-auto nav-bar-sub-tool align-items-center">
                            <NavbarTopMenuToggle />
                        </Nav>
                    </Navbar>
                </>
            )}
        </ThemeConsumer>
    );
};

export default SidebarWithNavbarNavbar;
