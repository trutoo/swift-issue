export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
}

export class Http {

  static Request(url: string, method = 'GET'): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open(url, method);
      req.addEventListener('load', resolve);
      req.addEventListener('error', reject);
      req.send();
    });
  }

  static Get(url: string) { return Http.Request(url, 'GET'); }
  static Head(url: string) { return Http.Request(url, 'HEAD'); }
  static Post(url: string) { return Http.Request(url, 'POST'); }
  static Put(url: string) { return Http.Request(url, 'PUT'); }
  static Delete(url: string) { return Http.Request(url, 'DELETE'); }
  static Connect(url: string) { return Http.Request(url, 'CONNECT'); }
  static Options(url: string) { return Http.Request(url, 'OPTIONS'); }
  static Trace(url: string) { return Http.Request(url, 'TRACE'); }
  static Patch(url: string) { return Http.Request(url, 'PATCH'); }
}
