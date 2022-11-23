/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Button, Input } from "components";
import PropTypes from "prop-types";
import _ from "lodash";
import pluralize from "pluralize";
import { Tooltip } from "reactstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Quote = ({
    quote, index, children, disabled
}) => (
    <Draggable draggableId={quote.value} index={index} isDragDisabled={disabled}>
        {(provided) => (
            <div
                className="dragItem"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Input
                        type="text"
                        name="code"
                        value={children.props.children[1]}
                    />
                    <div
                        style={{
                            width: '100px',
                            backgroundColor: "#afc482",
                            borderRadius: '4px',
                            textAlign: 'center',
                            paddingTop: '10px'
                        }}
                    >
                        Move
                    </div>
                </div>

            </div>
        )}
    </Draggable>
);

const MultiAdd = (props) => {
    const {
        options,
        name,
        objectName = "value",
        displaySelected = true,
        disabled = false,
        setFieldValue,
        defaultValue = [],
        withSerialNumber = false,
        menuPlacement = "bottom"
    } = props;
    const { t } = useTranslation();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const onChange = (event) => {
        const value = JSON.parse(event.value);
        if (!_.isEmpty(value) && !_.some(selectedOptions, value)) {
            setSelectedOptions((prevState) => [...prevState, value]);
        }
    };

    useEffect(() => {
        if (defaultValue.length > 0 && !hasInitialized) {
            setSelectedOptions(defaultValue);
            setHasInitialized(true);
        }
    }, [defaultValue]);

    useEffect(() => {
        const selectedOptionsLen = selectedOptions.length;
        if (selectedOptionsLen > 0) {
            setDisplayValue(`${selectedOptionsLen} ${pluralize(objectName, selectedOptionsLen)} Selected`);
        } else {
            setDisplayValue("");
        }
        setFieldValue(name, selectedOptions);
    }, [selectedOptions]);

    const removeSelectedItem = (index) => {
        const temp = selectedOptions;
        temp.splice(index, 1);
        setSelectedOptions([...temp]);
    };

    const clearAllItem = () => {
        setSelectedOptions([]);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            selectedOptions,
            result.source.index,
            result.destination.index
        );

        setSelectedOptions(quotes);
    };
    const SingleValue = ({ data, ...props }) => {
        if (selectedOptions.length === 0) return <div style={{ opacity: "0.4" }}>{`Please select ${objectName}`}</div>;
        return (<div>{`${selectedOptions.length} ${pluralize(objectName, selectedOptions.length)} Selected`}</div>);
    };
    return (
        <>
            <span>
                <Button
                    color="primary"
                    onClick={() => addItemManual()}
                    style={{ height: 34, marginRight: '5px' }}
                >
                    <span className="mr-1">+</span>
                    <span>{t("AddManual")}</span>
                </Button>
                <Button
                    color="primary"
                    onClick={() => addItemManual()}
                    style={{ height: 34 }}
                >
                    <span className="mr-1">+</span>
                    <span>{t("Import")}</span>
                </Button>
            </span>
            {
                (displaySelected && selectedOptions.length > 0)
                && (
                    <>
                        <div className="list-group selected-items">
                            <DragDropContext onDragEnd={onDragEnd} draggable={!disabled}>
                                <Droppable droppableId="list">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            draggable={!disabled}
                                        >
                                            {
                                                selectedOptions.map((selected, index) => (

                                                    <Quote quote={selected} disabled={disabled} index={index} key={`${index}-qoute`}>
                                                        <div className="list-group-item py2 no-border">
                                                            {withSerialNumber && `${index + 1}. `}
                                                            {selected.name}
                                                            {
                                                                !disabled
                                                                && (
                                                                    <span className="btn btn-xs pull-right" onClick={() => { removeSelectedItem(index); }} disabled={disabled} aria-hidden="true">
                                                                        <span className="fa fa-close close-button" aria-hidden="true" />
                                                                    </span>
                                                                )
                                                            }
                                                        </div>
                                                    </Quote>
                                                ))
                                            }
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                        </div>
                        {
                            !disabled
                            && (
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={clearAllItem}
                                    style={{
                                        color: "#4472C4",
                                        border: "unset",
                                        cursor: "pointer",
                                        background: "unset",
                                        textDecoration: "underline",
                                        padding: 0,
                                        textAlign: "left"
                                    }}
                                >
                                    Clear all
                                </button>
                            )
                        }
                    </>
                )
            }
        </>
    );
};

MultiAdd.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    objectName: PropTypes.string,
    displaySelected: PropTypes.bool,
    disabled: PropTypes.bool,
    setFieldValue: PropTypes.func.isRequired,
    defaultValue: PropTypes.array,
    disabled: PropTypes.bool,
};

export { MultiAdd };
