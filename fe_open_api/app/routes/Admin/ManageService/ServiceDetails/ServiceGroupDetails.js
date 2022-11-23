import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import {
    Col
} from "components";
import ServiceDetailLine from "./ServiceDetailLine";
const ServiceGroupDetails = (props) => {
    const { groupService, serverUrl, requestBody, authorize, deleteApi, token } = props
    const { t } = useTranslation();
    return (
        <Col lg={12} style={{ paddingTop: '10px' }}>
            <div style={{ fontSize: '24px' }}>{groupService.priority}. {groupService.groupName}</div>
            {groupService?.apiDtoList?.map(e => {
                return <ServiceDetailLine
                    title={e.name}
                    method={e.method}
                    // defaultExpanded
                    // borderTopColor={e.borderTopColor}
                    encrypt={e.encryptionType}
                    requestHeaders={e.params}
                    // requestParams={e.requestParams}
                    serverUrl={serverUrl}
                    defaultRequestBody={e.defaultRequestBody}
                    hasRequestBody={e.hasRequestBody}
                    appKey={e.appKey}
                    authorize={authorize}
                    apiId={e.id}
                    deleteApi={deleteApi}
                    token={token}
                />
            })}
        </Col>
    )

}
export default ServiceGroupDetails;