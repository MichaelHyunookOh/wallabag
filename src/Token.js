import React, {useEffect} from 'react'

export default function Token() {
    useEffect(() => {
        newToken = {
        "grant_type": "password",
        "client_id":"4_3jat9zzq3ps0ccccwk0c84c48ggowk840cwwkw8k08c0o88o0c", 
        "client_secret":"65ed0mxcr98g8ckoss8g800ccwckos0k8ssggwk0c4ssg4og8s",
        "username":"wallabag",
    "   password":"wallabag"
        }
        fetch(`http://localhost:80/oauth/v2/token`, {
            method: 'POST',
            body: JSON.stringify(newToken)
        }
    )
    .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .catch((error) => {
        console.log({ error });
      })
    }, []);
    return(
    
    )
}