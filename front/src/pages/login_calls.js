export function LoginCall(data) {
    console.log({
        username: data.get('username'),
        password: data.get('password')
      });
    const requestOptions = {
        method: 'POST',
        mode:'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:data.get('username'),
                            password:data.get('password')})
    };
    fetch('https://man1joke.lm.r.appspot.com/login', requestOptions)
        .then((response)=>{console.log(response)});
}