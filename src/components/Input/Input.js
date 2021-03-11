import React, { useState, useEffect } from "react";

export default function Input() {
  const [url, setUrl] = useState("");
  const [newAuth, setnewAuth] = useState(0);
  const [tags, setTags] = useState("");
  const [Token, setToken] = useState("");

  useEffect(() => {
    let newToken = {
      grant_type: "password",
      client_id: "4_3jat9zzq3ps0ccccwk0c84c48ggowk840cwwkw8k08c0o88o0c",
      client_secret: "65ed0mxcr98g8ckoss8g800ccwckos0k8ssggwk0c4ssg4og8s",
      username: "wallabag",
      password: "wallabag",
    };
    fetch(`http://localhost:80/oauth/v2/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newToken),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((res) => {
        setToken(res.access_token);
        console.log(res.access_token);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [newAuth]);

  const postLink = (e) => {
    e.preventDefault();
    setnewAuth(newAuth + 1);
    const newEntry = {
      url: url,
      tags: tags,
    };
    fetch(`http://localhost:80/api/entries`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <section>
      <form className="input-value" onSubmit={postLink}>
        <label id="url-value">Url</label>
        <input
          type="text"
          id="url-value"
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <label id="tag-value">Tags</label>
        <input
          type="text"
          id="tag-value"
          onChange={(e) => setTags(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
