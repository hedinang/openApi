/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
// import { Tooltip } from "components";
import PropTypes from "prop-types";
import _ from "lodash";
import pluralize from "pluralize";
import { Tooltip } from "reactstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

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
                {children}
            </div>
        )}
    </Draggable>
);
const Element = ({
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
                {children}
            </div>
        )}
    </Draggable>
);


const MultiSelect = (props) => {
    const {
        options,
        name,
        className,
        objectName = "value",
        displaySelected = true,
        disabled = false,
        setFieldValue,
        defaultValue = [],
        disableSelected = false,
        withSerialNumber = false,
        numberApprovers = false,
        menuPlacement = "bottom"
    } = props;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [displayValue, setDisplayValue] = useState("");
    const [hasInitialized, setHasInitialized] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

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
            <Select
                menuPlacement={menuPlacement}
                isDisabled={disabled}
                onChange={onChange}
                components={{ SingleValue }}
                options={options
                    .map((option) => ({
                        label: option.name,
                        value: JSON.stringify(option)
                    }))}
                isSearchable
                defaultValue={{ value: "", label: `Please select ${objectName}` }}
            />
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
                                                    
                                                    <Element quote={selected} disabled={disabled} index={index} key={`${index}-qoute`}>
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
                                                    </Element>
                                                    // <Quote quote={selected} disabled={disabled} index={index} key={`${index}-qoute`}>
                                                    //     <div className="list-group-item py2 no-border">
                                                    //         {withSerialNumber && `${index + 1}. `}
                                                    //         {selected.name}
                                                    //         {selected.type === "group" && (
                                                    //             <span className="ml-2">
                                                    //                 <i className="fa fa-info-circle" id={`tooltip_${index}`} style={{ fontSize: "15px" }} />
                                                    //                 <Tooltip placement="top" isOpen={tooltipOpen} target={`tooltip_${index}`} toggle={toggle}>
                                                    //                     {`${selected.sumUser} approvers: `}
                                                    //                     {selected?.groupList?.map((item) => item.name).join(", ")}
                                                    //                 </Tooltip>
                                                    //             </span>
                                                    //         )}
                                                    //         {
                                                    //             !disabled
                                                    //             && (
                                                    //                 <span className="btn btn-xs pull-right" onClick={() => { removeSelectedItem(index); }} disabled={disabled} aria-hidden="true">
                                                    //                     <span className="fa fa-close close-button" aria-hidden="true" />
                                                    //                 </span>
                                                    //             )
                                                    //         }
                                                    //         {numberApprovers && selected.type === "group" && (
                                                    //             <div>
                                                    //                 <span>Number of Approvers: </span>
                                                    //                 <input
                                                    //                     defaultValue={selected.numberApprovers}
                                                    //                     name="numberApprovers"
                                                    //                     label="Number of Approvers"
                                                    //                     type="number"
                                                    //                     disabled={disabled}
                                                    //                     className="form-control"
                                                    //                     onChange={(e) => {
                                                    //                         setFieldValue(`${name}[${index}].numberApprovers`, e.target.value);
                                                    //                     }}
                                                    //                 />
                                                    //             </div>
                                                    //         )}
                                                    //     </div>
                                                    // </Quote>
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

MultiSelect.propTypes = {
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

export { MultiSelect };
