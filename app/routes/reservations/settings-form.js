import Route from '@ember/routing/route';

const RESERVATION_MAX_TIME = "reservation_max_time";

export default Route.extend({
    setupController: function(controller) {
        controller.set(RESERVATION_MAX_TIME, 10);
    },
    actions: {
        saveSettings() {
            console.log("Shit is getting saved");
        },
    },
});
