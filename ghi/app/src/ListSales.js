import React from "react";
import "./Form.css"


class ListSales extends React.Component {
    constructor() {
        super()
        this.state = {
            "salesmen": "",
            "salesPeople": [],
            "sales": [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value})
      }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.salesPeople
        //console.log(data.salesmen)
        const filteredSalesmen = data.sales.filter((sale) => sale.salesman.name === data.salesmen)
        this.setState({"sales": filteredSalesmen})
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/sales/"
        let response = await fetch(url)

        if (response.ok) {
            let data = await response.json()
            this.setState({"sales": data.sales})
        }

        const salesUrl = 'http://localhost:8090/api/salesmen/'
        let salesResponse = await fetch(salesUrl)

        if (response.ok) {
            let salesData = await salesResponse.json()
            this.setState({"salesPeople": salesData.salesmen})
        }
        console.log(this.state.salesPeople)
    }



    render () {
        return (
          <div>
            <form onSubmit={this.handleSubmit} id="search-sale-form">
              <div className="container">
                <div className="row">
                  <div className="form-floating mb-3 mt-3" id="salesman_search">
                    <select className="form-select" onChange={this.handleInputChange} name="salesmen" value={this.state.salesmen.name}>
                      <option>Choose a salesman</option>
                      {this.state.salesPeople.map(salesman => {
                        return (
                          <option key={salesman.id} value={salesman.name}>
                            {salesman.name}
                          </option>
                    );
                })}
                  </select>
                  </div>
                  <div className="col">
                    <button className="btn btn-success mt-4">Search</button>
                  </div>
                </div>
              </div>
            </form>
            <h2>List of Sales</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Employee number</th>
                <th>Sales person</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Sale price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map(sale => {
                return (
                  <tr key={sale.id}>
                    <td>{ sale.salesman.employee_number }</td>
                    <td>{ sale.salesman.name }</td>
                    <td>{ sale.customer.name}</td>
                    <td>{ sale.vin.vinVO}</td>
                    <td>${ sale.price}</td>

                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        );
      }
}
export default ListSales
