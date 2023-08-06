import React from "react";

class SalesmanForm extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "",
            employeeNumber: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
    }
    handleNameChange(event) {
        const value = event.target.value
        this.setState({"name": value})
    }
    handleEmployeeNumberChange(event) {
        const value = event.target.value
        this.setState({"employeeNumber": value})
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;
        console.log(data);

        const locationUrl = 'http://localhost:8090/api/salesmen/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
                const newSalesman = await response.json();
            console.log(newSalesman);

            const cleared = {
                name: "",
                employeeNumber: "",
              };

              this.setState(cleared);

        }
    }

    render() {
        return (
            <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a sales person</h1>
              <form onSubmit={this.handleSubmit} id="create-salesman-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleEmployeeNumberChange} value={this.state.employeeNumber} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control"/>
                  <label htmlFor="employee_number">Employee Number</label>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                <button className="btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        );
    }
}
export default SalesmanForm
