import config from '../config';
import $ from 'jquery';

export class RaodeeAPI {
  constructor() {
    this.url = config.API_URL;
    this.defaultHeader = {};
  }

  authHeaders = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    if(session) {
      this.defaultHeader = {
        'Authorization': 'Bearer ' + session.token
      };
    }
    return this.defaultHeader;
  }

  get(uri) {
    let errFunc = function (xhr, status, err) {
      if (xhr.status >=500) {
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
          //try again
          return $.ajax(this);
        }
      }
      return new ResponseData(xhr.status, xhr.responseText);
    };
    return $.ajax({
      url: this.url + uri,
      headers: this.authHeaders(),
      // data: formData,
      type: 'GET',
      dataType: 'text',
      tryCount: 0,
      retryLimit: 3
    }).then((data, status, jqXhr) => {
      return new ResponseData(jqXhr.status, data);
    }, errFunc);
  }


  post(uri, data) {
    return $.ajax({
      url: this.url + uri,
      headers: {
        ...this.authHeaders(),
      },
      contentType: 'application/json',
      data: JSON.stringify(data),
      type: 'POST',
      dataType: 'text',
    }).then((data, status, jqXhr) => {
      return new ResponseData(jqXhr.status, data);
    }, (xhr, status, err) => {
      return new ResponseData(xhr.status, xhr.responseText);
    });
  }

  put(uri, data) {
    return $.ajax({
      url: this.url + uri,
      headers: {
        ...this.authHeaders(),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data),
      type: 'PUT',
      dataType: 'text',
    }).then((data, status, jqXhr) => {
      return new ResponseData(jqXhr.status, data);
    }, (xhr, status, err) => {
      return new ResponseData(xhr.status, xhr.responseText);
    });
  }

  delete(uri) {
    return $.ajax({
      url: this.url + uri,
      headers: {
        ...this.authHeaders()
      },
      type: 'DELETE',
    }).then((data, status, jqXhr) => {
      return new ResponseData(jqXhr.status, data);
    }, (xhr, status, err) => {
      return new ResponseData(xhr.status, xhr.responseText);
    });
  }

 }

 export class ResponseData {
  constructor(status, text) {
    this.status = status;
    this.text = text;
  }

  isOk() {
    return this.status === 200 || this.status === 204;
  }

  json() {
    return JSON.parse(this.text);
  }
 }
