import React from "react";


class ListManufacturers extends React.Component{
    constructor() {
        super()
        this.state= {
            "manufacturers": [],
            "name": ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        let url = "http://localhost:8100/api/manufacturers/"
        let response = await fetch(url)

        if(response.ok){
            let data = await response.json()
            this.setState({"manufacturers": data.manufacturers})
        }
    }


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        delete data.manufacturers

        const url = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(url, fetchConfig)
        if(response.ok){
            const newManufacturer = await response.json()
            console.log(newManufacturer)
            const cleared = {
                "manufacturers": [],
                "name": ""
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
                <h1>Manufacturers</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.manufacturers.map(manufacturer => {
                                return (
                                    <tr key={manufacturer.id}>
                                        <td>{manufacturer.name}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                    </table>
                    <h2>Enter new manufacturer</h2>
                    <form onSubmit={this.handleSubmit}>
                        <table className="table table-bordered">
                        <thead>
                                <tr>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.name} placeholder="Name" name="name" /></td>
                                        <td><button className="btn btn-success" onSubmit={this.handleSubmit}>Submit</button></td>
                                    </tr>
                            </tbody>
                        </table>
                    </form>
            </div>
        )
    }
}

export default ListManufacturers