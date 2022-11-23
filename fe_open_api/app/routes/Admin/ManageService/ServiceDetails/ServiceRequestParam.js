/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import {
    Row,
    Col,
    Input
} from "components";
const ServiceRequestParam = (props) => {
    let { requestParam, onChangeParam } = props
    let [param, setParam] = useState(requestParam.default)
    useEffect(() => {
        setParam(requestParam.default)
    }, [requestParam.default])

    return (
        <Row xs="12" className="d-flex mx-0">
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='2'>
                        {requestParam.name} <br /> {requestParam.type}<br /> (query)
                    </Col>
                    <Col xs='5'>
                        <Input style={{ color: 'black', }}
                            type="text"
                            value={param}
                            onChange={e => onChangeParam(requestParam.name, e)}
                        />
                    </Col>
                    <Col xs='5'></Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ServiceRequestParam;