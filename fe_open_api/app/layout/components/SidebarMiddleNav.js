/* eslint-disable no-unused-vars */
import React from "react";
import { SidebarMenu } from "../../components";

const SidebarMiddleNav = ({ items, userDetails, permissionReducer }) => {
    // check token lets to set sidebar
    let sidbarItems = []
    const token = localStorage.getItem(process.env.SHARE_COOKIES_NAME)
    if (token)
        sidbarItems = ([{
            id: '1',
            icon: 'fa fa-fw fa-home',
            title: 'Service List',
            path: '/system-service/service-list'
        },
        {
            id: '2',
            icon: 'fa fa-fw fa-home',
            title: 'Service Create',
            path: '/system-service/service-create'
        },
        {
            id: '3',
            icon: 'fa fa-fw fa-home',
            title: 'Api Create',
            path: '/system-service/api-create'
        }])
    else
        sidbarItems = ([{
            id: '1',
            icon: 'fa fa-fw fa-home',
            title: 'Service List',
            path: '/system-service/service-list'
        }])
    return (
        <SidebarMenu>
            {sidbarItems.map(item => (
                <SidebarMenu.Item
                    key={item.id}
                    icon={<i className={item.icon} />}
                    title={item.title}
                    to={item.path.toString()}
                />
            ))}
        </SidebarMenu>
    );
};

export default SidebarMiddleNav;
