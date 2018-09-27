import * as html2canvas from 'html2canvas';

import { IClientDetails, IIPDetails } from './interfaces';

declare const safari: any;
declare const opr: any;
declare const InstallTrigger: any;

export class SwiftIssue {

  private form: HTMLFormElement | null = null;
  private thumbnail: HTMLImageElement | null = null;
  private previousTarget: HTMLElement | null = null;
  public topics = [
    { Key: 1, Value: 'Bug' },
    { Key: 2, Value: 'Feature' },
    { Key: 3, Value: 'Style' },
  ];

  constructor(
  ) {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);

    this.form = document.querySelector('.swift-issue');
    this.thumbnail = document.querySelector('.swift-issue--thumbnail');
  }

  /* EVENTS */

  onCapture(event: MouseEvent) {
    event.stopPropagation();
    this.capturing = true;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('click', this.onMouseClick);
  }

  onMouseMove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.previousTarget)
      this.previousTarget.style.boxShadow = '';
    target.style.boxShadow = '0 0 5px 10px rgba(80, 200, 255, 0.3)';
    this.previousTarget = target;
  }

  onMouseClick(event: MouseEvent) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('click', this.onMouseClick);
    this.capturing = false;

    const target = event.target as HTMLElement;
    target.style.boxShadow = '';

    html2canvas(target, {
      backgroundColor: window.getComputedStyle(document.body, null).getPropertyValue('background-color'),
    }).then((canvas: HTMLCanvasElement) => {
      if (this.thumbnail) this.thumbnail.src = canvas.toDataURL();
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    SwiftIssue.Http('http://ip-api.com/json').then((response: IIPDetails) => {
      this.clientData(response);
    });
  }

  //------------------------------------------------------------------------------------
  // HELPERS
  //------------------------------------------------------------------------------------

  clientData(ipDetails: IIPDetails): IClientDetails {
    return {
      os: window.navigator.oscpu || window.navigator.platform,
      browser: SwiftIssue.DetectBrowser(),
      userAgent: window.navigator.userAgent,
      externalIP: ipDetails.query,
      country: ipDetails.country,
      region: ipDetails.regionName,
      city: ipDetails.city,
      timezone: ipDetails.city,
      screenSize: { width: window.screen.width, height: window.screen.height },
      browserSize: { width: window.outerWidth, height: window.outerHeight },
      documentSize: { width: window.innerWidth, height: window.innerHeight },
      colorDepth: window.screen.colorDepth,
      orientation: window.screen.orientation.angle,
      locale: window.navigator.userLanguage || window.navigator.language,
      url: window.location.href,
      logs: [],
      date: new Date().toString(),
    };
  }

  //------------------------------------------------------------------------------------
  // GETTERS & SETTERS
  //------------------------------------------------------------------------------------

  private set capturing(state: boolean) {
    if (this.form) this.form.classList.toggle('capturing', state);
  }

  //------------------------------------------------------------------------------------
  // STATIC HELPERS
  //------------------------------------------------------------------------------------

  static DetectBrowser(): string {
    const win: any = window as any;
    const doc: any = document as any;
    // Opera 8.0+
    if ((!!win.opr && !!opr.addons) || !!win.opera || win.navigator.userAgent.indexOf(' OPR/') >= 0)
      return 'Opera';
    // Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined')
      return 'Firefox';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    if (/constructor/i.test(win.HTMLElement) || (function(p) { return p.toString() === '[object SafariRemoteNotification]'; })(!win.safari || (typeof safari !== 'undefined' && safari.pushNotification)))
      return 'Safari';
    // Internet Explorer 6-11
    if (/*@cc_on!@*/false || !!doc.documentMode)
      return 'Internet Explorer';
    // Edge 20+
    if (!(/*@cec_on!@*/false || !!doc.documentMode) && !!win.StyleMedia)
      return 'Microsoft Edge';
    // Chrome 1+
    if (!!win.chrome && !!win.chrome.webstore)
      return 'Google Chrome';
    return 'Unknown';
  }

  static Http(url: string, method = 'GET'): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open(url, method);
      req.addEventListener('load', resolve);
      req.addEventListener('error', reject);
      req.send();
    });
  }
}
