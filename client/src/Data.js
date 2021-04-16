import { apiBaseUrl } from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      //... encode user credentials AND...
      const encodedCredentials = btoa(
        // create base-64 encoded string which we use to encode 'username' and 'password'...
        // ...pass credentials to api() method
        // credentials passed as object containing 'username' and 'password' properties
        `${credentials.username}:${credentials.password}`
      );
      //... set HTTP Authorization req header to BASIC Auth type and...
      // ... set Authorization property to options.headers...
      //...It now holds credentials to authenticate client with server
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // Async GET request to /users endpoint, returning JSON object w/ credentials.
  // Below: passed api() method values for "requiresAuth" and "credentials" args
  async getUser(username, password) {
    // notice "true" to question "is auth required?"
    // credentials is an object containing 'username' and password' info
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // Async POST requests sending new user data to the /users endpoint
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourse() {
    const response = await this.api("/courses", "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createCourse(username, password, course) {
    const response = await this.api("/courses", "POST", course, true, {
      username,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      return response.json().then((error) => {
        console.log(error);
      });
    }
  }

  async updateCourse(course) {
    const response = await this.api("/courses/:id", "PUT", course);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      return response.json().then((error) => {
        console.log(error);
      });
    }
  }

  async deleteCourse(username, password, courseId) {
    const response = await this.api(
      `/courses/:${courseId}`,
      "DELETE",
      null,
      true,
      {
        username,
        password,
      }
    );
    if (response.status === 204) {
      console.log("Course deleted");
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        console.log("Course Id does not exist");
        return data.errors;
      });
    } else {
      return response.json().then((error) => {
        console.log(error);
      });
    }
  }
}
