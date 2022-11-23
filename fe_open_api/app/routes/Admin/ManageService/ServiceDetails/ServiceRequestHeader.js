/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import {
    Row,
    Col,
    Input,
    Button
} from "components";
import { Checkbox } from "primereact/checkbox";
import { useTranslation } from "react-i18next";
const ServiceRequestHeader = (props) => {
    let { requestHeader, onChangeHeader, setFieldValue, onAddAttachment } = props
    let [header, setHeader] = useState(requestHeader)
    const { t } = useTranslation();
    const fileInput = useRef(null);
    useEffect(() => {
        setHeader(requestHeader.default)
    }, [requestHeader.default])
    let requestBody = () => {
        return requestHeader?.paramType !== 'body' ?
            <Input style={{ color: 'black', }}
                type="text"
                value={requestHeader?.defaultValue}
                onChange={e => onChangeHeader(requestHeader?.paramName, e, setFieldValue)}
            /> :
            <>
                <input
                    ref={fileInput}
                    onChange={(e) => {
                        onAddAttachment(requestHeader?.paramName, e, setFieldValue);
                    }}
                    type="file"
                    style={{ display: "none" }}
                />
                <Button
                    onClick={() => {
                        return fileInput.current.click();
                    }}
                    style={{
                        border: "1px solid #7b7b7b7b",
                        padding: "2px 8px",
                        background: "#fff",
                        color: 'black'
                    }}
                >
                    {requestHeader?.defaultValue === null ? "chooseFile" : requestHeader?.defaultValue?.name}
                </Button>
            </>
    }
    return (
        <Row xs="12" className="d-flex mx-0">
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='2'>
                        {requestHeader.paramName} <br /> {requestHeader.dataType}<br /> ({requestHeader.paramType})
                    </Col>
                    <Col xs='4'>
                        {
                            requestHeader.autoGenerate ?
                                <Input style={{ color: 'black', }}
                                    type="text"
                                    value="AUTO GENERATE"
                                    disabled
                                // onChange={e => onChangeHeader(requestHeader.paramName, e, setFieldValue)}
                                /> :
                                requestBody()
                        }
                    </Col>
                    <Col xs='1'>
                        <Checkbox
                            type="checkbox"
                            checked={requestHeader.mandatory}
                            disabled
                        />
                    </Col>
                    <Col xs='5'>
                        <div>{requestHeader.note}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ServiceRequestHeader;