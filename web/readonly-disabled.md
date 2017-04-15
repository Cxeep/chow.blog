disabled在submit时，根本不会被提交上去。

    example：
    
    var formData = new FormData(_form);
    formData.append('version', _versions.value);
    
    fetch('/get-result', {method: 'post', body: formData})
    .then(res => {
    	return res.json();
    })
    

    
q: why `formData.append('version', _versions.value);`
a:`<select name="version" id="version" class="form-input" ***disabled***></select>`
