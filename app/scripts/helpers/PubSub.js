export default class PubSub {
	on(eventName, callback) {
			this.events = this.events || {};

			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(callback);
			return this;
		}

	trigger(eventName, data) {
		if (this.events && this.events[eventName]) {
			this.events[eventName].forEach((i) => {
				i(data);
			});
		}
	}
}