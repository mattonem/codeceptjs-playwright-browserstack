const event = require('codeceptjs').event;

module.exports = function() {
	event.dispatcher.on(event.test.passed, function (test) {
		const { I } = inject();
	    I.executeScript(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'passed',reason: 'All passed :)'}})}`);
	  });
	event.dispatcher.on(event.test.failed, function (test) {
		const { I } = inject();
	    I.executeScript(_ => {}, `browserstack_executor: ${JSON.stringify({action: 'setSessionStatus',arguments: {status: 'failed',reason: 'failed'}})}`);
	  });
}