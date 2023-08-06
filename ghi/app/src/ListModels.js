import React from "react";


class ListModels extends React.Component{
    constructor() {
        super()
        this.state= {
            "models": [],
            "name": "",
            "pictureURL": "",
            "manufacturer_id": "",
            "manufacturers": []
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

        let modelsUrl = "http://localhost:8100/api/models/"
        let modelsResponse = await fetch(modelsUrl)

        if(modelsResponse.ok){
            let data = await modelsResponse.json()
            this.setState({"models": data.models})
        }
    }


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        delete data.models
        delete data.manufacturers
        data.picture_url = data.pictureURL
        delete data.pictureURL
        console.log(data)

        const url = "http://localhost:8100/api/models/"
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
                "name": "",
                "pictureURL": "",
                "manufacturer_id": "",
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
                <h1>Vehicle Models</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.models.map(model => {
                                return (
                                    <tr key={model.id}>
                                        <td>{model.name}</td>
                                        <td>{model.manufacturer.name}</td>
                                        <td><img className="rounded mx-auto d-block"
                                        src={model.picture_url} width="200" height="125" alt="picture of car"></img></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                    </table>
                    <h2>Enter new model</h2>
                    <form onSubmit={this.handleSubmit}>
                        <table className="table table-bordered">
                        <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Manufacturer</th>
                                    <th>Picture URL</th>
                                    <th className="d-none">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.name} placeholder="Name" name="name" /></td>
                                        <td>
                                            <select type="text" onChange={this.handleInputChange} value={this.state.manufacturer_id} placeholder="Manufacturer" name="manufacturer_id">
                                                <option>Choose a manufacturer</option>
                                                    {this.state.manufacturers.map(manufacturer => {
                                                        return (
                                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                                        )
                                                    })}
                                            </select>
                                        </td>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.pictureURL} placeholder="Picture URL" name="pictureURL" /></td>
                                        <td><button className="btn btn-success" onSubmit={this.handleSubmit}>Submit</button></td>
                                    </tr>
                            </tbody>
                        </table>
                    </form>
            </div>
        )
    }
}

export default ListModels