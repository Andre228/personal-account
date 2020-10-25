import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {APP_HOST} from "../config";


@Injectable()
export class Rest {

  private readonly APP_HOST: string = APP_HOST;
  private readonly REJECT_REASON_EMPTY_PARAMETERS: string = 'You forgot to specify request parameters';

  constructor(private http: HttpClient) {}

  get(urlParam: string): Promise<any> {
    const url = this.APP_HOST + urlParam;
    if (urlParam) {
      return this.http.get(url).toPromise();
    } else {
      return Promise.reject(this.REJECT_REASON_EMPTY_PARAMETERS);
    }
  }

  post(urlParam: string, body: {}): Promise<any> {
    const url = this.APP_HOST + urlParam;
    if (urlParam && body) {
      return this.http.post(url, body, { headers: this.getHeaders() }).toPromise();
    } else {
      return Promise.reject(this.REJECT_REASON_EMPTY_PARAMETERS);
    }
  }

  put(urlParam: string, body: {}): Promise<any> {
    const url = this.APP_HOST + urlParam;
    if (urlParam && body) {
      return this.http.put(url, body, { headers: this.getHeaders() }).toPromise();
    } else {
      return Promise.reject(this.REJECT_REASON_EMPTY_PARAMETERS);
    }
  }

  delete(urlParam: string): Promise<any> {
    const url = this.APP_HOST + urlParam;
    if (urlParam) {
      return this.http.delete(url).toPromise();
    } else {
      return Promise.reject(this.REJECT_REASON_EMPTY_PARAMETERS);
    }
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

}

