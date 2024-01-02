import { action, makeObservable, observable, runInAction } from "mobx";
import axios from "axios";

class Service {
    dataServices = [];

    constructor() {
        makeObservable(this, {
            dataServices: observable,
            addService: action,
        });
        this.fetchData();
    }

    fetchData() {
        axios.get('http://localhost:8787/services').then(res => {
            this.dataServices = res.data;
        }
        )
    }
    addService(service) {
        const serviceToAdd = {
            id: this.dataServices.length + 1,
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration
        }
        fetch('http://localhost:8787/service', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceToAdd)
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                runInAction(() => {
                    this.dataServices.push(serviceToAdd);
                })
            }
        })
    }
}
export default new Service();