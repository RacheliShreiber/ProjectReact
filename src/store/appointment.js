import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

class Appointment {
    dataAppointments = [];

    constructor() {
        makeObservable(this, {
            dataAppointments: observable,
            addAppointment: action,
        });
        this.fetchData();
    }

    fetchData() {
        axios.get('http://localhost:8787/appointments').then(res => {
            this.dataAppointments = res.data;
        }
        )
    }
    addAppointment(appointment, dateOk, secondDate) {
        const appointmentToAdd = {
            id: this.dataAppointments.length + 1,
            serviceType: appointment.serviceType,
            dateTime: appointment.dateTime,
            clientName: appointment.clientName,
            clientPhone: appointment.clientPhone,
            clientEmail: appointment.clientEmail,
        }
        fetch('http://localhost:8787/appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentToAdd)
        }).then((res) => {
            console.log(res);
            if (res.status == 200) {
                runInAction(() => {
                    dateOk(false);
                    this.dataAppointments.push(appointmentToAdd);
                })
            }
            else {
                dateOk(true);
                secondDate(true);
            }
        })
    }
}
export default new Appointment();