import React from "react";


class ServiceHistory extends React.Component{
    constructor() {
        super()
        this.state= {
            "appointments": [],
            "VIN": "",
            "submitted": false,
        }
        this.timeToFormat = this.timeToFormat.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.displayHeader = this.displayHeader.bind(this)
    }
    async componentDidMount() {
        let url = "http://localhost:8080/api/appointments/"
        let response = await fetch(url)

        if(response.ok){
            let data = await response.json()
            this.setState({"appointments": data.appointments})
        }
    }

    timeToFormat(dateTime){
        let aptDateTime = new Date(dateTime)
        let aptTime = aptDateTime.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
        return aptTime
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        const filteredAppointmentsList = data.appointments.filter((appointment) => appointment.VIN.VINVO === data.VIN)
        this.setState({"appointments": filteredAppointmentsList})
        this.setState({"submitted": true})
    }

    handleInputChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    displayHeader(submitted){
        if(submitted === true){
            return <h2>Showing history for VIN {this.state.VIN}</h2>
        } else {
            return <h2>Showing history for all VIN's</h2>
        }
    }

    displayVIN(submitted){
        if(submitted === true){
            return 'd-none'
        }
    }
    render(){
        return (
            <div>
                <br />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <h2>Please input a VIN number</h2>
                            <input className="form-control input-lg" onChange={this.handleInputChange} name="VIN" value={this.state.VIN}/>
                            <button className="btn btn-success">Search</button>
                        </div>
                    </form>
                <div>
                    {this.displayHeader(this.state.submitted)}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className={this.displayVIN(this.state.submitted)}>VIN</th>
                                    <th>Customer Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Technician</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appointments.map(appointment => {
                                    return (
                                        <tr key={appointment.id}>
                                            <td className={this.displayVIN(this.state.submitted)}>{appointment.VIN.VINVO}</td>
                                            <td>{appointment.owner}</td>
                                            <td>{appointment.date.slice(0, 10)}</td>
                                            <td>{this.timeToFormat(appointment.date)}</td>
                                            <td>{appointment.technician.name}</td>
                                            <td>{appointment.service_reason}</td>

                                        </tr>
                                    )
                                })}
                                </tbody>
                        </table>
                </div>
            </div>
        )
    }
}

export default ServiceHistory