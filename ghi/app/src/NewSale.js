import React from "react";
import Form from 'react-bootstrap/Form';

class NewSale extends React.Component {
    constructor() {
        super()
        this.state = {
            "vin": "",
            "salesman": "",
            "customer": "",
            "vins": [],
            'salesmen': [],
            'customers': [],
            'price': "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({[name]: value})
    }


// adding handleComplete to update status to sold
    async handleCompleted(automobileVin) {
      console.log(automobileVin)
      const statusUrl = `http://localhost:8090/api/inventory/${automobileVin}/`
      const fetchConfig = {
          method: 'PUT',
          body: JSON.stringify({"sold": true}),
          headers: {
              'Content-Type': 'application/json'
          }

      }
      const status = await fetch(statusUrl, fetchConfig)
      if (status.ok) {
        console.log(automobileVin)
      }
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.salesmen;
        delete data.customers;
        delete data.vins;
        console.log(data);

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
                const newSale = await response.json();
            console.log(newSale);

            this.handleCompleted(data.vin);

            this.setState({
                'vin': '',
                'salesman': '',
                'customer': '',
                'price': '',
              });

        }
    }

    async componentDidMount() {
      const salesmanUrl = 'http://localhost:8090/api/salesmen/'
      const customerUrl = 'http://localhost:8090/api/customers/'
      const vinUrl = 'http://localhost:8090/api/inventory/'

      const customerResponse = await fetch(customerUrl);
      const salesmanResponse = await fetch(salesmanUrl);
      const vinResponse = await fetch(vinUrl);

      if (salesmanResponse.ok && customerResponse.ok && vinResponse.ok) {

          const salesmanData = await salesmanResponse.json()
          const customerData = await customerResponse.json()
          const vinData = await vinResponse.json()

          this.setState({
            'salesmen': salesmanData.salesmen,
            'customers': customerData.customers,
            'vins': vinData.inventories,
          })
    }
  }
    render() {
        return (
            <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a sale record</h1>
              <form onSubmit={this.handleSubmit} id="create-sale-form">
                <div className="form-floating mb-3">
                <select onChange={this.handleInputChange} value={this.state.salesman} name="salesman" id="salesman" className="form-select">
                    <option value="">Choose a salesman</option>
                    {this.state.salesmen.map(salesman => {
                        return (
                            <option key={salesman.id} value={salesman.name}>
                                {salesman.name}
                            </option>
                        );
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                <select onChange={this.handleInputChange} value={this.state.customer} name="customer" id="customer" className="form-select">
                    <option className="form-floating mb-3">Choose a Customer</option>
                    {this.state.customers.map(customer => {
                        return (
                            <option key={customer.id} value={customer.name}>
                                {customer.name}
                            </option>
                        );
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                <select onChange={this.handleInputChange} value={this.state.vin} name="vin" id="vin" className="form-select">
                    <option>Choose a car's VIN</option>
                    {this.state.vins.filter((vin) => vin.sold === false).map(vin => {
                        return (
                            <option key={vin.vinVO} value={vin.vinVO}>
                                {vin.vinVO}
                            </option>
                        );
                    })}
                  </select>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleInputChange} value={this.state.price} placeholder="Price" required type="text" name="price" className="form-control"/>
                  <label htmlFor="price">Price in USD</label>
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
export default NewSale
