**how to use?**
-

    var result = {err: null, resp: null, body: ''}
	await new Promise((res, rej) => {
		var req = http.request(option, (res) => {
			var body  = '';
			result.resp = res;
			res.setEncoding(encoding);
			res
			.on('data', chunk => {
				body += chunk;
			})
			.on('end', () => {
				result.body = body;
				res();
			})
			.on('error', e => {
				result.err = e;
				res();
			})
		})
		req.write(formOrBody);
		req.end();
	})
	return result;
    
一定要记得`req.end()`;	
	