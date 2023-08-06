import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Nav() {
  return (
    <nav style={{width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center',}} className="navbar navbar-expand-lg navbar-dark bg-success">
      <div style={{width: "70%", display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
        <div>
          <NavLink style={{fontSize: "1.5rem"}} className="navbar-brand" to="/">Motor Empire</NavLink>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <Dropdown>
            <Dropdown.Toggle style={{fontSize: "1.5rem"}} variant="success" id="dropdown-basic">Automobile Service
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item href="/technicians/new">Add technician</Dropdown.Item>
            <Dropdown.Item href="/appointments/">Appointments</Dropdown.Item>
            <Dropdown.Item href="/appointments/">New appointment</Dropdown.Item>
            <Dropdown.Item href="/appointments/history">Service history</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle style={{fontSize: "1.5rem"}} variant="success" id="dropdown-basic">Auto Sales
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item href="/sales/newsalesman">Add a sales person</Dropdown.Item>
            <Dropdown.Item href="/sales/customer">Add a potential customer</Dropdown.Item>
            <Dropdown.Item href="/sales/newsale">Create a sale record</Dropdown.Item>
            <Dropdown.Item href="/sales/listsales">Sales</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle style={{fontSize: "1.5rem"}} variant="success" id="dropdown-basic">Inventory
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item href="/manufacturers/">Manufacturers</Dropdown.Item>
            <Dropdown.Item href="/models/">Models</Dropdown.Item>
            <Dropdown.Item href="/inventory/">Inventory</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
        </div> 
      </div>
    </nav>
  )
}

export default Nav;
