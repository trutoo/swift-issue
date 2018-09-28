import * as html2canvas from 'html2canvas';

import { IClientDetails, IIPDetails } from './interfaces';
import { Detect } from './utils/detect';
import { Http } from './utils/http';

class SwiftIssue {

  private form: HTMLFormElement | null = null;
  private thumbnail: HTMLImageElement | null = null;
  private previousTarget: HTMLElement | null = null;
  public topics = [
    { value: 1, label: 'Bug' },
    { value: 2, label: 'Feature' },
    { value: 3, label: 'Style' },
  ];

  constructor(
  ) {
    /* Bind */
    this.onSubmit = this.onSubmit.bind(this);
    this.onCapture = this.onCapture.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);

    this.form = document.querySelector('.swift-issue');
    this.thumbnail = document.querySelector('.swift-issue--thumbnail');
  }

  create() {
    if (this.form) this.form.addEventListener('submit', this.onSubmit);
    if (this.thumbnail) this.thumbnail.addEventListener('click', this.onCapture);
  }

  destroy() {
    if (this.form) this.form.removeEventListener('submit', this.onSubmit);
    if (this.thumbnail) this.thumbnail.removeEventListener('click', this.onCapture);
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
    Http.Get('http://ip-api.com/json').then((response: IIPDetails) => {
      this.clientData(response);
    });
  }

  //------------------------------------------------------------------------------------
  // HELPERS
  //------------------------------------------------------------------------------------

  clientData(ipDetails: IIPDetails): IClientDetails {
    return {
      os: window.navigator.oscpu || window.navigator.platform,
      browser: Detect.Browser(),
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
    if (this.form) this.form.setAttribute('aria-busy', state.toString());
  }
}

const swiftIssue = new SwiftIssue();
window.addEventListener('DOMContentLoaded', swiftIssue.create);
window.addEventListener('unload', swiftIssue.destroy);
