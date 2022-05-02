export function RegisterCall(data) {
    console.log({
        username: data.get('username'),
        email: data.get('email'),
        confirm_email: data.get('confirm-email'),
        password: data.get('password'),
        confirm_password: data.get('confirm-password')
      });

    // data.get('username').isLength({min:4});
    const requestOptions = {
        method: 'POST',
        mode:'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:data.get('username'),
                            password:data.get('password'),
                            email:data.get('email')})
    };
    fetch('https://man1joke.lm.r.appspot.com/register', requestOptions)
        .then((response)=>{console.log(response)});
}