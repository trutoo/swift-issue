declare const safari: any;
declare const opr: any;
declare const InstallTrigger: any;

export class Detect {
  static Browser(): string {
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
}
