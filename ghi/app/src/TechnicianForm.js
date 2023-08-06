import React from "react";

class TechnicianForm extends React.Component{
    constructor() {
        super()
        this.state= {
            "name": "",
            "employeeNumber": "",
            "submitted": false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSubmit(event){
        console.log(event)
        event.preventDefault();
        const data = {...this.state}
        data.employee_number = data.employeeNumber
        delete data.employeeNumber
        delete data.submitted
        const url = "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(url, fetchConfig)
        if(response.ok){
            const newTechnician = await response.json()
            console.log(newTechnician)
        }
        this.setState({
            "name": "",
            "employeeNumber": "",
            "submitted": true,
        })
        console.log(this.state)
    }

    handleInputChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
            <>
                <br / >
                <br / >
                <br / >
                <br / >
                <br / >
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1 className="d-flex align-items-center justify-content-center">Enter a new technician</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-floating mb-3 d-flex align-items-center justify-content-center">
                                    <input className="form-control" onChange={this.handleInputChange} value={this.state.name} name="name" placeholder="Name" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <p style={{marginTop: "2rem"}} className="d-flex justify-content-center">Enter a unique number up to 32000</p>
                                <div className="form-floating mb-3 d-flex align-items-center justify-content-center">
                                    <input className="form-control" onChange={this.handleInputChange} value={this.state.employeeNumber} name="employeeNumber" placeholder="Employee Number" />
                                    <label htmlFor="employeeNumber">Employee Number</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <button className="btn btn-success btn-lg">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}




export default TechnicianForm
