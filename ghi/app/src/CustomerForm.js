import React from "react";
//import Input from 'react-phone-number-input/input'

class CustomerForm extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "",
            address: "",
            phoneNumber: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    }
    handleNameChange(event) {
        const value = event.target.value
        this.setState({"name": value})
    }
    handleAddressChange(event) {
        const value = event.target.value
        this.setState({"address": value})
    }
    handlePhoneNumberChange(event) {
        const value = event.target.value
        this.setState({"phoneNumber": value})
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.phone_number = data.phoneNumber;
        delete data.phoneNumber;
        console.log(data);

        const locationUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
                const newCustomer = await response.json();
            console.log(newCustomer);

            const cleared = {
                name: "",
                address: "",
                phoneNumber: "",
              };

              this.setState(cleared);

        }
    }
    render() {
        return (
            <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a potential customer</h1>
              <form onSubmit={this.handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handlePhoneNumberChange} value={this.state.phoneNumber} placeholder="Phone number" required type="text" name="phone_number" id="phone_number" className="form-control"/>
                  <label htmlFor="phone_number">Phone Number</label>
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
export default CustomerForm
