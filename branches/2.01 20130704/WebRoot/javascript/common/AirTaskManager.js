Ext.namespace('AIR');

AIR.AirTaskManager = Ext.extend(Object, {

	
	startDbSessionCheckTask: function(cwid, token) {
		this.cwid = cwid;
		this.token = token;
		
		this.checkAuthStore = AIR.AirStoreFactory.createCheckAuthStore();
		this.checkAuthFailureCounter = 0;
		
		var task = {
		    run: this.checkDbSession.createDelegate(this),
		    interval: dbLoginCheckInterval
//		    args: [cwid, token, password]
//			scope: this
		};
		
		var runner = new Ext.util.TaskRunner();
		runner.start(task);
	},
	
	checkDbSession: function() {//cwid, token
		this.checkAuthStore.load({
			params: {
				cwid: this.cwid,
				token: this.token
			},
			callback: this.onCheckAuthStoreLoaded
		});
	},

	onCheckAuthStoreLoaded: function(records, options, isSuccess) {
		if(!isSuccess) {
			this.checkAuthFailureCounter++;
			if(checkAuthFailureCounter > 2)
				AIR.AirApplicationManager.logout();//better: fireEvent('checkAuthFailed', ...), event receiver calls logout
		} else {
			this.checkAuthFailureCounter = 0;
			if(records[0].data.result != 'OK')
				AIR.AirApplicationManager.logout();//better: fireEvent('checkAuthFailed', ...), event receiver calls logout
		}
	},
	
	delay: function(callback, delay) {
		var task = new Ext.util.DelayedTask(function() {
			callback();
		}.createDelegate(this));
		task.delay(delay);
	}
});