import ENV from "../config.js";
const API_HOST = ENV.api_host;

export const checkSession = (app) => {
  fetch(`${API_HOST}/auth/sessionchecker`)
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((json) => {
      if (json && json.currUser) app.setState({ currUser: json.currUser });
    })
    .catch((err) => console.log(err));
};

export const login = (cmp, app) => {
  const req = new Request(`${API_HOST}/auth/login`, {
    method: "post",
    body: JSON.stringify(cmp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  // fetch the request
  fetch(req)
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((json) => {
      // check if the returned values are not null
      if (json.id !== undefined && json.user !== undefined)
        app.setState({ currUser: json.user });
    })
    .catch((err) => console.log(err));
};

export const signUp = (cmp, app) => {
  const req = new Request(`${API_HOST}/auth/add`, {
    method: "post",
    body: JSON.stringify(cmp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(req)
    .then(res => {
        if (res.status === 200) return res.json();
    })
    .then((json) => {
        if (json.id !== undefined && json.user !== undefined)
        app.setState({ currUser: json.user });
    })
    .catch((err) => console.log(err));
};
