import React from "react";


class ListInventory extends React.Component{
    constructor() {
        super()
        this.state= {
            "models": [],
            "automobiles": [],
            "color": "",
            "year": "",
            "vin": "",
            "model_id": ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        let url = "http://localhost:8100/api/models/"
        let response = await fetch(url)

        if(response.ok){
            let data = await response.json()
            this.setState({"models": data.models})
        }
        let autoUrl = "http://localhost:8100/api/automobiles/"
        let autoResponse = await fetch(autoUrl)

        if(response.ok){
            let data = await autoResponse.json()
            this.setState({"automobiles": data.autos})
        }
    }


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        delete data.models
        delete data.automobiles
        console.log(data)

        const url = "http://localhost:8100/api/automobiles/"
        const fetchConfig = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(url, fetchConfig)
        if(response.ok){
            const newAutomobile = await response.json()
            console.log(newAutomobile)
            const cleared = {
                "models": [],
                "automobiles": [],
                "color": "",
                "year": "",
                "vin": "",
                "model_id": "",
            }
            this.setState(cleared)
        }
        this.componentDidMount()
    }

    handleInputChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            <div>
                <h1>Inventory</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Color</th>
                                <th>Year</th>
                                <th>Model</th>
                                <th>Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.automobiles.map(auto => {
                                return (
                                    <tr key={auto.id}>
                                        <td>{auto.vin}</td>
                                        <td>{auto.color}</td>
                                        <td>{auto.year}</td>
                                        <td>{auto.model.name}</td>
                                        <td>{auto.model.manufacturer.name}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                    </table>
                    <h2>Enter new automobile</h2>
                    <form onSubmit={this.handleSubmit}>
                        <table className="table table-bordered">
                        <thead>
                                <tr>
                                    <td>VIN</td>
                                    <td>Color</td>
                                    <td>Year</td>
                                    <td>Model</td>
                                    <td className="d-none">Submit</td>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.vin} placeholder="VIN" name="vin" /></td>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.color} placeholder="Color" name="color" /></td>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.year} placeholder="Year" name="year" /></td>
                                        <td>
                                            <select onChange={this.handleInputChange} value={this.state.model_id} name="model_id" placeholder="" >
                                                <option>Choose a model</option>
                                                    {this.state.models.map(model => {
                                                        return (
                                                            <option key={model.id} value={model.id}>{model.name}</option>
                                                        )
                                                    })}
                                            </select>
                                        </td>
                                        <td><button className="btn btn-success" onSubmit={this.handleSubmit}>Submit</button></td>
                                    </tr>
                            </tbody>
                        </table>
                    </form>
            </div>
        )
    }
}

export default ListInventory
