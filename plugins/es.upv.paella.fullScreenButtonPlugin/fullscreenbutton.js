Class ("paella.plugins.FullScreenPlugin",paella.ButtonPlugin, {
	_reload:null,

	getIndex:function() { return 551; },
	getAlignment:function() { return 'right'; },
	getSubclass:function() { return "showFullScreenButton"; },
	getName:function() { return "es.upv.paella.fullScreenButtonPlugin"; },
	checkEnabled:function(onSuccess) {
		var enabled = (!paella.extended) && (paella.player.checkFullScreenCapability());
		if (base.userAgent.browser.IsMobileVersion) {
			enabled = paella.player.videoContainer.isMonostream && (enabled);
		}
		onSuccess(enabled);
	},
	getDefaultToolTip:function() { return base.dictionary.translate("Go Fullscreen"); },

	setup:function() {
		var thisClass = this;

		thisClass._reload = thisClass.config.reloadOnFullscreen || "mantain";
		paella.events.bind(paella.events.enterFullscreen, function(event) { thisClass.onEnterFullscreen(); });
		paella.events.bind(paella.events.exitFullscreen, function(event) { thisClass.onExitFullscreen(); });
	},

	action:function(button) {
		var self = this;
		if (paella.player.isFullScreen()) {
			paella.player.exitFullScreen();			
		}
		else {
			paella.player.goFullScreen();
		}
		setTimeout(function(){if(self._reload == "reload") paella.player.reloadVideos();}, 1000);		
	},

	onEnterFullscreen: function() {
		this.setToolTip(base.dictionary.translate("Exit Fullscreen"));
		this.button.className = this.getButtonItemClass(true);
				
	},
	
	onExitFullscreen: function() {
		this.setToolTip(base.dictionary.translate("Go Fullscreen"));
		this.button.className = this.getButtonItemClass(false);	
	},

	getButtonItemClass:function(selected) {
		return 'buttonPlugin '+this.getAlignment() +' '+ this.getSubclass() + ((selected) ? ' active':'');
	}
});

paella.plugins.fullScreenPlugin = new paella.plugins.FullScreenPlugin();
