/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Button,
    Input
} from "components";
import { makeStyles } from "@material-ui/core/styles";
import ServiceRequestHeader from './ServiceRequestHeader'
import ServiceRequestParam from './ServiceRequestParam'
import SystemService from "services/SystemService";
import CryptoJS from 'crypto-js'
import fetchToCurl from 'fetch-to-curl';
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import ActionModal from "routes/components/ActionModal";
import { useToast } from "routes/hooks";
const RequestBody = (props) => {
    let { curl, requestUrl, responseBody } = props
    return (<>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ height: '40px', fontSize: '14px', marginTop: '20px' }}>Responses</div>
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ fontSize: '13px' }}>Curl</div>
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <Input style={{ backgroundColor: 'black', color: 'white', height: '300px' }}
                type="textarea"
                value={curl}
            />
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ fontSize: '13px' }}>Request URL</div>
        </Row>
        <Row xs="12" className="d-flex mx-0" style={{
            height: '55px', backgroundColor: 'black',
            color: 'white', borderRadius: '3px'
        }}>
            <div style={{ height: '25px', fontSize: '14px', margin: '15px 0px 0px 15px' }}>
                {requestUrl}</div>
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ fontSize: '13px' }}>Server response</div>
        </Row>
        <Row xs="12" className="d-flex mx-0" style={{
        }}>
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='2'>
                        Code
                    </Col>
                    <Col xs='10'>
                        <div>Details</div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row xs="12" className="d-flex mx-0" style={{
            backgroundColor: '#e9f6f0'
        }}>
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='1'>
                        200
                    </Col>
                    <Col xs='11'>
                        <Row >
                            <div style={{ fontSize: '13px' }}>
                                Response body
                            </div>
                        </Row>
                        <Row>
                            <Input style={{ backgroundColor: 'black', color: 'white', height: '460px' }}
                                type="textarea"
                                value={responseBody}
                                disabled
                            />
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>)
}

const ServiceDetailLine = (props) => {
    const {
        serverUrl,
        method,
        title,
        defaultExpanded,
        borderTopColor,
        encrypt,
        requestParams,
        requestHeaders,
        hasRequestBody,
        defaultRequestBody,
        appKey,
        authorize,
        apiId,
        deleteApi,
        token
    } = props;
    const history = useHistory();
    const showToast = useToast();
    const refActionModalRemoveApi = useRef(null);
    let [responseBody, setResponseBody] = useState('')
    // let [header, setHeader] = useState(requestHeaders)
    let [param, setParam] = useState(requestParams)
    let [curl, setCurl] = useState('')
    const initialValues = {
        defaultRequestBody: defaultRequestBody,
        hasRequestBody: hasRequestBody,
        requestHeaders: requestHeaders,

    }

    let onChangeHeader = (key, value, setFieldValue) => {
        let tmp = [...initialValues.requestHeaders]
        tmp.forEach(e => {
            if (e.paramName === key) e.defaultValue = value.target.value
        });
        setFieldValue(requestHeaders, tmp)
    }
    const onAddAttachment = (key, value, setFieldValue) => {
        let tmp = [...initialValues.requestHeaders]
        tmp.forEach(e => {
            if (e.paramName === key) e.defaultValue = value.target.files[0]
        });
        setFieldValue(requestHeaders, tmp)
    }

    let onChangeParam = (key, value) => {
        param.forEach(e => {
            if (e.name === key) e.defaultValue = value.target.value
        });
        setParam((prevState) => [...prevState])
    }
    let mergeAuthorizeWithHeader = (header) => {
        authorize.forEach(e => {
            header[e.key] = e.value
        })
        return header
    }


    let requestUrl = serverUrl + '/' + title
    let execute = async (values) => {
        if (serverUrl === undefined || serverUrl === null || serverUrl === '')
            showToast("error", "Please let choose a server url before trying!");
        else {
            let data = ''
            if (values.hasRequestBody) {
                data = JSON.parse(values.defaultRequestBody)
            } else {
                data = new FormData();
                values?.requestHeaders?.forEach(e => {
                    if (e.paramType === 'body')
                        data.append("file", e.defaultValue);
                })
            }
            let headers = values?.requestHeaders?.reduce(
                (obj, item) => {
                    return (item.dataType === 'string' && item.paramType !== 'body') ?
                        Object.assign(obj,
                            {
                                [item.paramName]: item.defaultValue ? item.defaultValue : ''
                            }
                        ) : Object.assign(obj,
                            {
                                [item.paramName]: item.defaultValue.toString()
                            }
                        )
                }, {});
            // merge authorize and header ahead
            if (values.requestHeaders != null)
                headers = mergeAuthorizeWithHeader(headers)
            const config = {
                headers: headers
            };
            // check encrypt
            let appKey = headers?.appKey
            let encrytion = checkEncrypt(encrypt, values.defaultRequestBody, headers, data, appKey)
            headers = encrytion?.headers
            data = encrytion?.data
            if (data !== '') {
                curl = fetchToCurl({
                    url: requestUrl,
                    headers: headers,
                    method: 'post',
                    body: data
                })
            } else {
                curl = fetchToCurl({
                    url: requestUrl,
                    headers: headers,
                    method: 'post'
                })
            }

            setCurl(curl)
            const response = await SystemService.execute(requestUrl, data, config, method)
            setResponseBody(JSON.stringify(response.data, null, "\t"))
            setIsExecute(true)
        }
    }
    let [isExecute, setIsExecute] = useState(false)
    let checkEncrypt = (encrypt, requestBody, headers, data, appKey) => {
        switch (encrypt) {
            case 'MD5':
                var str = requestBody + appKey
                var sign = CryptoJS.MD5(str) + "";
                headers.sign = sign
                var base64RawData =
                    CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(requestBody));
                data = {
                    "data": base64RawData
                };
                return {
                    headers: headers,
                    data: data
                }
            default:
                return {
                    headers: headers,
                    data: data
                }
        }

    }


    const changeBodyRequest = (e, setFieldValue) => {
        setFieldValue('defaultRequestBody', e.target.value)
    }
    const editApi = (e) => {
        history.push({
            pathname: 'api-edit',
            search: `?id=${apiId}`
        });
    }
    const editApiButtonList = () => {
        if (token)
            return <>
                <Col xs='1'>
                    <Button btn btn-primary style={{
                        color: 'white', backgroundColor: '#4ecb93'
                    }}
                        onClick={editApi}
                    >
                        Edit
                    </Button>
                </Col>
                <Col xs='1'>
                    <Button btn btn-primary style={{
                        color: 'white', backgroundColor: 'red'
                    }}
                        // onClick={e => deleteApi(apiId)}
                        onClick={() => refActionModalRemoveApi.current.toggleModal()}
                    >
                        DELETE
                    </Button>
                </Col>
            </>
        else return <>
            <Col xs='2'></Col>
        </>
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={() => { }}

            >
                {({
                    values, setFieldValue
                }) => {

                    return (
                        <Accordion style={{ border: `2px solid ${borderTopColor}` }} defaultExpanded={defaultExpanded}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ borderBottom: `2px solid ${borderTopColor}` }}
                            >
                                <Typography style={{ width: '100%', }}>
                                    <Row xs='12'>
                                        <Col xs='4'>
                                            <Button className="btn btn-primary" style={{
                                                color: 'white', backgroundColor: '#49cc90'
                                            }}>
                                                {method}
                                            </Button>
                                            <span style={{ paddingLeft: '20px' }}>{title}</span>
                                        </Col>
                                        <Col xs='5'>

                                        </Col>
                                        <Col xs='2'>
                                            {encrypt !== 'NONE' ?
                                                <Button className="btn btn-primary" style={{ backgroundColor: '#f27212', color: 'white' }}>ENCRYPT</Button> : <></>}
                                        </Col>
                                        <Col xs='1'>
                                        </Col>
                                    </Row>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ display: "block", padding: 0 }}>
                                <Row xs="12" className="d-flex mx-0" >
                                    <Col xs="12">
                                        <Row xs="12" className="d-flex mx-0">
                                            <Col xs="12">
                                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                                    <Col xs='2'>
                                                        <Button style={{
                                                            color: 'black', fontSize: '14px', backgroundColor: 'white'
                                                            , borderTop: 'none', borderLeft: 'none', borderRight: 'none'
                                                            , borderWidth: '5px', borderColor: '#49cc90', borderRadius: 'unset'
                                                        }}>
                                                            Parameters
                                                        </Button>
                                                    </Col>
                                                    <Col xs='8'>
                                                    </Col>
                                                    {editApiButtonList()}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row xs="12" className="d-flex mx-0" style={{
                                            backgroundColor: '#e9f6f000'
                                        }}>
                                            <Col xs="12">
                                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                                    <Col xs='2'>
                                                        Name
                                                    </Col>
                                                    <Col xs='4'>
                                                        Input
                                                    </Col>
                                                    <Col xs='1'>
                                                        Mandatory
                                                    </Col>
                                                    <Col xs='5'>
                                                        Description
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {values?.requestHeaders?.map(e => <ServiceRequestHeader requestHeader={e}
                                            onChangeHeader={onChangeHeader} setFieldValue={setFieldValue}
                                            onAddAttachment={onAddAttachment} />)}
                                        {/* {param.map(e => <ServiceRequestParam requestParam={e} onChangeParam={onChangeParam} />)} */}
                                        {hasRequestBody ?
                                            <>
                                                <Row xs="12" className="d-flex mx-0">
                                                    <div style={{ fontSize: '14px' }}>Request body</div>
                                                </Row>
                                                <Row xs="12" className="d-flex mx-0">
                                                    <Input style={{ color: 'black', height: '300px' }}
                                                        type="textarea"
                                                        value={values.defaultRequestBody}
                                                        height='100px'
                                                        onChange={e => changeBodyRequest(e, setFieldValue)}
                                                    />
                                                </Row>
                                            </> : <></>
                                        }
                                        <Row xs="12" className="d-flex mx-0" style={{
                                        }}>
                                            <Col xs="12">
                                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                                    <Col xs='6'>
                                                        <Button style={{
                                                            color: 'white', fontSize: '14px', backgroundColor: '#4990e2', width: '100%'
                                                        }}
                                                            onClick={e => execute(values)}
                                                        >
                                                            Execute
                                                        </Button>
                                                    </Col>
                                                    <Col xs='6'>
                                                        <Button style={{
                                                            color: 'black', fontSize: '14px', backgroundColor: 'white', width: '100%'
                                                        }}>
                                                            Clear
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {
                                            isExecute ? <RequestBody curl={curl} requestUrl={requestUrl} responseBody={responseBody} /> : <></>

                                        }
                                    </Col>
                                </Row>

                            </AccordionDetails>
                        </Accordion>
                    )
                }}
            </Formik>
            <ActionModal
                ref={refActionModalRemoveApi}
                title="Remove Api"
                body="Do you wish to remove this api?"
                button="Yes"
                color="primary"
                textCancel="No"
                colorCancel="danger"
                action={(e) => deleteApi(apiId)}
            />
        </>
    );
};

ServiceDetailLine.propTypes = {
    title: PropTypes.string.isRequired,
    activeTab: PropTypes.number.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    sendConversation: PropTypes.func.isRequired,
    addNewRowAttachment: PropTypes.func.isRequired,
    rowDataConversation: PropTypes.instanceOf(Array).isRequired,
    pageSizeConversation: PropTypes.number,
    gridHeightConversation: PropTypes.number,
    rowDataAttachment: PropTypes.instanceOf(Array).isRequired,
    pageSizeAttachment: PropTypes.number,
    gridHeightAttachment: PropTypes.number,
    onDeleteAttachment: PropTypes.func.isRequired,
    onAddAttachment: PropTypes.func.isRequired,
    onCellEditingStopped: PropTypes.func.isRequired,
    defaultExpanded: PropTypes.bool,
    borderTopColor: PropTypes.string
};
ServiceDetailLine.defaultProps = {
    pageSizeConversation: 10,
    gridHeightConversation: 300,
    pageSizeAttachment: 10,
    gridHeightAttachment: 300,
    defaultExpanded: false,
    borderTopColor: "#AEC57D"
};

export default ServiceDetailLine;
