import React from "react";


class ListAppointments extends React.Component{
    constructor() {
        super()
        this.state= {
            "appointments": [],
            "technician": "",
            "date": "",
            "time": "",
            "owner": "",
            "VIN": "",
            "serviceReason": "",
            "technicians": [],
            "dateTime": "",
        }
        this.delete = this.delete.bind(this)
        this.handleCompleted = this.handleCompleted.bind(this)
        this.timeToFormat = this.timeToFormat.bind(this)
        this.displayVIP = this.displayVIP.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        let url = "http://localhost:8080/api/appointments/"
        let response = await fetch(url)

        if(response.ok){
            let data = await response.json()
            this.setState({"appointments": data.appointments})
        }

        let techUrl = "http://localhost:8080/api/technicians/"
        let techResponse = await fetch(techUrl)

        if(response.ok){
            let techData = await techResponse.json()
            this.setState({"technicians": techData.technicians})
        }
    }

    async delete(appointmentId, event){
        event.preventDefault();
        const url = `http://localhost:8080/api/appointments/${appointmentId}/`
        const fetchConfig = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await fetch(url, fetchConfig)
        const newAppointmentsList = this.state.appointments.filter(appointment => appointment.id !== appointmentId)
        this.setState({"appointments": newAppointmentsList})
    }


    async handleCompleted(appointmentId, event){
        event.preventDefault();
        console.log(appointmentId)
        const url = `http://localhost:8080/api/appointments/${appointmentId}/`
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify({"completed": true}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await fetch(url, fetchConfig)

        let list_appointments = this.state.appointments
        for(let appointment of list_appointments)
            if(appointment.id === appointmentId){
                appointment.completed = true
            }
        this.setState({"appointments": list_appointments})
    }

    timeToFormat(dateTime){
        let aptDateTime = new Date(dateTime)
        let aptTime = aptDateTime.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        })
        return aptTime
    }

    displayVIP(vipStatus){
        if(vipStatus === true){
            return <img className="rounded mx-auto d-block"
            src="https://thumbs.dreamstime.com/b/golden-star-glitter-texture-isolated-white-background-christmas-decoration-golden-star-glitter-texture-isolated-135772527.jpg"
             width="40" height="40" alt="little gold star to denot VIP"></img>
        }
        return ""
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        delete data.appointments
        delete data.technicians
        data.dateTime = data.date + " " + data.time + ":00"
        delete data.date
        delete data.time
        data.date = data.dateTime
        delete data.dateTime
        data.service_reason = data.serviceReason
        delete data.serviceReason

        const createAppointmentUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                'Content-Type': 'application/json'
            },
        }
        const appointmentResponse = await fetch(createAppointmentUrl, fetchConfig)
        if(appointmentResponse.ok){
            const newAppointment = await appointmentResponse.json()
            this.state.appointments.push(newAppointment)
            const cleared = {
                    "technician": "",
                    "date": "",
                    "time": "",
                    "owner": "",
                    "VIN": "",
                    "serviceReason": "",
                    "dateTime": "",
            }
            this.setState(cleared)
        }
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
                <h1>Service Appointments</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>VIP</th>
                                <th>VIN</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Technician</th>
                                <th>Reason</th>
                                <th className="d-none">Cancel</th>
                                <th className="d-none">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appointments.filter((appointment) => appointment.completed === false).map(appointment => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{this.displayVIP(appointment.VIN.VIP)}</td>
                                        <td>{appointment.VIN.VINVO}</td>
                                        <td>{appointment.owner}</td>
                                        <td>{appointment.date.slice(0, 10)}</td>
                                        <td>{this.timeToFormat(appointment.date)}</td>
                                        <td>{appointment.technician.name}</td>
                                        <td>{appointment.service_reason}</td>
                                        <td>
                                            <form>
                                                <button onClick={(event) => this.delete(appointment.id, event)} className="btn btn-danger rounded mx-auto d-block">Cancel</button>
                                            </form>
                                        </td>
                                        <td>
                                            <form>
                                                <button onClick={(event) => this.handleCompleted(appointment.id, event)} className="btn btn-success rounded mx-auto d-block">Finished</button>
                                            </form>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                    </table>
                    <h2>Enter new appointment</h2>
                    <form onSubmit={this.handleSubmit}>
                        <table className="table table-bordered">
                        <thead>
                                <tr>
                                    <th>VIN</th>
                                    <th>Customer Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Technician</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.VIN} placeholder="VIN" name="VIN" /></td>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.owner} placeholder="Owner" name="owner" /></td>
                                        <td><input type="date" onChange={this.handleInputChange} value={this.state.date} placeholder="" name="date" /></td>
                                        <td><input type="time" onChange={this.handleInputChange} value={this.state.time} placeholder="" name="time" /></td>
                                        <td>
                                            <select onChange={this.handleInputChange} value={this.state.technician} name="technician" placeholder="" >
                                                <option>Choose a technician</option>
                                                    {this.state.technicians.map(technician => {
                                                        return (
                                                            <option key={technician.employee_number} value={technician.employee_number}>{technician.name}</option>
                                                        )
                                                    })}
                                            </select>
                                        </td>
                                        <td><input type="text" onChange={this.handleInputChange} value={this.state.serviceReason} name="serviceReason" placeholder="Reason" /></td>
                                        <td><button className="btn btn-success" onSubmit={this.handleSubmit}>Submit</button></td>
                                    </tr>
                            </tbody>
                        </table>
                    </form>
            </div>
        )
    }
}

export default ListAppointments