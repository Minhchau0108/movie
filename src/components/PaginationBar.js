import React from 'react'
import Pagination from "react-js-pagination";
import {DropdownButton, Dropdown,ButtonGroup} from "react-bootstrap"

const PaginationBar = (props) => {
    return (
        <div className="d-flex justify-content-around pt-2">
            <div>
            <DropdownButton
                as={ButtonGroup}
                menuAlign="right"
                id={`dropdown-button-drop-down`}
                drop={`down`}
                variant="outline-primary"
                title={`Sort`}
                onSelect={props.handleSelect}
                >
                <Dropdown.Item eventKey="mostToLeastPopular">Most To Least Popular</Dropdown.Item>
                <Dropdown.Item eventKey="leastToMostPopular">Least to Most Popular</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="highestToLowestRating">Highest to Lowest Rating</Dropdown.Item>
                <Dropdown.Item eventKey="lowestToHighestRating">Lowest to Highest Rating</Dropdown.Item>
            </DropdownButton>
            </div>
            <div className="pagination">       
            <Pagination
                totalItemsCount={props.totalResults}
                activePage={props.currentPage}
                onChange={props.clicked}
                pageRangeDisplayed={5}
                itemsCountPerPage={20}
            />      
            </div>
       
        </div>
    )
}

export default PaginationBar
