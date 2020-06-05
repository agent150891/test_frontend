import axios from 'axios';

// set up mocked auth header
axios.defaults.headers.common['authorization'] = 'BearerMocked';

export class API {
  static request(method, url, configs) {
    return (params) => axios[method](`${process.env.SERVER_URL}${url}`, params, configs);
  }
}
