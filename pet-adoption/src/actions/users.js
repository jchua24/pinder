import ENV from "../config.js";
const API_HOST = ENV.api_host;

export const checkSession = (app) => {
  fetch(`${API_HOST}/api/auth/sessionchecker`)
    .then((res) => {
        console.log(res);
        if (res.status !== 401)
            return res.json(); 
    })
    .then((json) => {
      if (json && json.user) app.setState({ currUser: json.user });
    })
    .catch((err) => console.log(err));
};

export const login = (cmp, app) => {
  const req = new Request(`${API_HOST}/api/auth/login`, {
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
  const req = new Request(`${API_HOST}/api/auth/add`, {
    method: "post",
    body: JSON.stringify(cmp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(req)
    .then((res) => {
      cmp.setState({ status: res.status}, () => (alert('This email already exists!')));
      if (res.status === 200) return res.json();
    })
    .then((json) => {
      if (json.id !== undefined && json.user !== undefined)
        app.setState({ currUser: json.user });
    })
    .catch((err) => console.log(err));
};

export const logout = (app) => {
  fetch(`${API_HOST}/api/auth/logout`)
    .then(res => {
        app.setState({
            currUser: null,
            message: {type: "", body: ""}
        })
    })
    .catch(err => console.log(err));
};
