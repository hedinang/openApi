/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Button,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardBody,
    Input
} from "components";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
// import EntityServices from "services/EntitiesService";
import useToast from "routes/hooks/useToast";
const useStyles = makeStyles({
    "custom-nav": {
        "&.nav-tabs": {
            borderBottom: "2px solid #DEE2E6"
        },
        "&.nav": {
            padding: "0 16px"
        },
        "&.nav-tabs .nav-link": {
            marginBottom: "-2px",
            border: "2px solid transparent"
        },
        "&.nav-tabs .nav-link.active, &.nav-tabs .nav-item.show .nav-link": {
            borderColor: "#DEE2E6 #DEE2E6 #FFF"
        }
    },
    "custom-card": {
        "&.card": {
            border: 0,
            borderRadius: 0
        }
    }
});

const Conversation = (props) => {
    const showToast = useToast();
    const {
        title,
        activeTab,
        setActiveTab,
        sendConversation,
        addNewRowAttachment,
        rowDataConversation,
        pageSizeConversation,
        gridHeightConversation,
        rowDataAttachment,
        pageSizeAttachment,
        gridHeightAttachment,
        onDeleteAttachment,
        onAddAttachment,
        onCellEditingStopped,
        defaultExpanded,
        borderTopColor,
        disabled,
        maxLengthComment,
        enableAddComment = false
    } = props;
    const { t } = useTranslation();
    const [comment, setComment] = useState("");
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const fileInput = useRef(null);
    const classes = useStyles();
    // const [uuid, setUuid] = useState();

    const ActionDelete = (params) => {
        const { data, agGridReact } = params;
        const { rowData } = agGridReact.props;
        return (
            <IconButton
                size="small"
                onClick={() => onDeleteAttachment(data.uuid, rowData)}
                style={{ color: "red" }}
            >
                <i className="fa fa-trash" />
            </IconButton>
        );
    };

    const downLoadFile = async (data) => {
        try {
            const response = await EntityServices.downloadDocuments("purchase-service/documents", data.guid);
            const responseData = response.data.data;
            if (response.data.status === "OK") {
                window.open(responseData);
            } else {
                showToast("error", response.data.message);
            }
        } catch (error) {
            showToast("error", error.response ? error.response.data.message : error.message);
        }
    };

    const AddAttachment = (params) => {
        const { data, agGridReact } = params;
        const { rowData } = agGridReact.props;
        return (
            <>
                {
                    !!data.isNew && !data.attachment
                        ? (
                            <>
                                <input
                                    ref={fileInput}
                                    onChange={(e) => {
                                        const uuid = localStorage.getItem("uuidAttachment");
                                        onAddAttachment(e, uuid, rowData);
                                    }}
                                    type="file"
                                    style={{ display: "none" }}
                                />
                                <Button
                                    onClick={() => {
                                        localStorage.setItem("uuidAttachment", data.uuid);
                                        return fileInput.current.click();
                                    }}
                                    style={{
                                        border: "1px solid #7b7b7b7b",
                                        padding: "2px 8px",
                                        background: "#fff"
                                    }}
                                    className="text-secondary"
                                >
                                    {t("ChooseFile")}
                                </Button>
                            </>
                        ) : (
                            <div
                                style={{
                                    border: "unset",
                                    background: "transparent",
                                    textDecoration: "underline",
                                    color: "#4472C4",
                                    cursor: "pointer"
                                }}
                                onClick={() => downLoadFile(data)}
                            >
                                {
                                    (data.isNew || data.isHaveFileName)
                                        ? data.attachment
                                        : data.fileLabel
                                }
                            </div>
                        )
                }
            </>
        );
    };

    let requestBody = `{
            "code": "",
            "currPage": 1,
            "pageSize": 20
}
    `
    let responseBody = `{
        "code": 0,
            "msg": "api.response.code.success",
                "msgArgs": null,
                    "data": {
            "totalCount": 1,
                "pageSize": 20,
                    "totalPage": 1,
                        "currPage": 1,
                            "list": [
                                {
                                    "code": "BR-52Ld3QvkRV",
                                    "brandName": "HyperSMS1",
                                    "certified": null,
                                    "createTime": 1660897587000,
                                    "status": 1,
                                    "type": 2,
                                    "productItemCode": "PRO-SMS_COS_QC"
                                }
                            ]
        }
}
    `
    let curl = `
    curl -X 'POST' \
  'http://localhost:8082/v3/app/brandname/query' \
  -H 'accept: */*' \
  -H 'isTokenRide: true' \
  -H 'appId: 220225017' \
  -H 'version: v3' \
  -H 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzgiLCJpYXQiOjE2NjIzNzQ1MDMsImV4cCI6MTY2Mjk3OTMwM30.ai9v2IQRvEx32BN4z2gTRpo8kfg5cZD_7HpGsW8cOIbFt14I48w7gVREaqM_8xJnD3G1vSCXDF3ynk58lw2s5Q' \
  -H 'Content-Type: application/json' \
  -d '{
  "brandName": "",
  "code": "BR-52Ld3QvkRV",
  "currPage": 1,
  "pageSize": 20
}'
`

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
                            <Button style={{
                                color: 'white', backgroundColor: '#49cc90'
                            }}>
                                POST
                            </Button>
                            <span style={{ paddingLeft: '20px' }}>{title}</span>
                        </Col>
                        <Col xs='5'>

                        </Col>
                        <Col xs='2'>
                            <Button style={{ backgroundColor: 'red', color: 'white', }}>ENCRYPT</Button>
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
                                    <Col xs='2'>
                                        <Button style={{
                                            color: 'black', fontSize: '14px', backgroundColor: 'white', borderWidth: '3px', width: '120px'
                                        }}>
                                            Try it out
                                        </Button>
                                    </Col>
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
                                    <Col xs='10'>
                                        Description
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row xs="12" className="d-flex mx-0">
                            <Col xs="12">
                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                    <Col xs='2'>
                                        isTokenRide <br /> string<br /> (header)
                                    </Col>
                                    <Col xs='5'>
                                        <Input style={{ color: 'black', }}
                                            type="text"
                                            value="true"
                                            disabled
                                        />
                                    </Col>
                                    <Col xs='5'></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row xs="12" className="d-flex mx-0">
                            <div style={{ fontSize: '14px' }}>Request body</div>
                        </Row>
                        <Row xs="12" className="d-flex mx-0">
                            <Input style={{ color: 'black', height: '300px' }}
                                type="textarea"
                                value={requestBody}
                                height='100px'
                            />
                        </Row>
                        <Row xs="12" className="d-flex mx-0" style={{
                        }}>
                            <Col xs="12">
                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                    <Col xs='6'>
                                        <Button style={{
                                            color: 'white', fontSize: '14px', backgroundColor: '#4990e2', width: '100%'
                                        }}>
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
                                http://localhost:8082/v3/app/brandname/query</div>
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
                                            /></Row>
                                        <Row><div style={{ fontSize: '13px' }}>Response headers</div></Row>
                                        <Row style={{ backgroundColor: 'black', color: 'white', borderRadius: '3px' }}>
                                            <div style={{ margin: '15px 15px 0px 15px' }}>
                                                connection: keep-alive,keep-alive <br />
                                                content-type: application/json<br />
                                                date: Mon,05 Sep 2022 07:54:35 GMT<br />
                                                keep-alive: timeout=60<br />
                                                server: openresty/1.17.8.2<br />
                                                transfer-encoding: chunked,chunked<br />
                                                vary: Origin,Access-Control-Request-Method,Access-Control-Request-Headers
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </AccordionDetails>
        </Accordion>
    );
};

Conversation.propTypes = {
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
Conversation.defaultProps = {
    pageSizeConversation: 10,
    gridHeightConversation: 300,
    pageSizeAttachment: 10,
    gridHeightAttachment: 300,
    defaultExpanded: false,
    borderTopColor: "#AEC57D"
};

export default Conversation;
