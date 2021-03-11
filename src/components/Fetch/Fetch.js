import React, { useState, useEffect } from "react";

export default function Input() {
  const [tags, setTags] = useState("");
  const [entries, setEntries] = useState([]);
  const [newAuth, setnewAuth] = useState(0);
  const [isFetched, setisFetched] = useState(false);
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

  const getEntries = (e) => {
    e.preventDefault();
    setnewAuth(newAuth + 1);
    fetch(`http://localhost:80/api/entries?tags=${tags}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((res) => {
        setEntries(res);
        console.log(res);
        console.log(entries._embedded);
        setisFetched(true);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const displayInformation = (e) => {
    return (
      <div>
        <p>
          {entries._embedded.items.map((item, index) => (
            <p key={index}>
              {item.given_url}
              {item.tags.map((tag, index) => (
                <p key={index}>{tag.label}</p>
              ))}
              <img
                className="previewPicture"
                src={item.preview_picture}
                alt="preview"
              ></img>
            </p>
          ))}
        </p>
      </div>
    );
  };

  // const mappedItems = entries._embedded.items.map((item) => item);
  // console.log(mappedItems);

  return (
    <section>
      <form className="fetch-tags" onSubmit={getEntries}>
        <label id="fetch-value">Retrieve</label>
        <input
          type="text"
          id="fetch-value"
          onChange={(e) => setTags(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      {/* <div>
        <p>
          {entries._embedded.items.map((item, index) => (
            <p key={index}>
              {item.given_url}
              {item.tags.map((tag, index) => (
                <p key={index}>{tag.label}</p>
              ))}
              <img
                className="previewPicture"
                src={item.preview_picture}
                alt="preview"
              ></img>
            </p>
          ))}
        </p>
      </div> */}
      {isFetched ? displayInformation() : ""}
    </section>
  );
}
