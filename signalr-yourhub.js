
import Vue from 'vue'

// npm install @aspnet/signalr --save
let signalR = require('@aspnet/signalr')

// in your target component, import this class and call start like... "workitemHub.start();"

export default {

    connection: null,

    connect() {
    
        this.connection.start().then(() => {

            // your object to post event (if necessary)
            var obj = {};
            this.connection.invoke("EVENT_NAME", obj);

            // on event hub
            this.connection.on("EVENT_NAME", obj => {
                // do what you want
                Vue.prototype.$eventHub.$emit('vue-event-name', obj)
            });

        }, () => {
            // in error, try again
            setTimeout(() => {
                this.connect()
            }, 5000);
        });

        this.connection.onclose(() => {
            this.connect();
        });

    },

    start() {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(YOUR_ENDPOINT_SIGNALR_HUB)
            .build();

        setTimeout(() => {
            this.connect();
        }, 1000);
    }

}
