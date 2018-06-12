/* global */
import { isIE11 } from '../navigator';

const mockGlobalProperty = globalObject => key => value => {
  // save original implementation in order to unmock later
  const original = globalObject[key];

  // mock key on the global object
  Object.defineProperty(globalObject, key, { value, writable: true });

  // return an unmock function restoring original implementation
  return () => mockGlobalProperty(globalObject)(key)(original);
};

const mockWindow = mockGlobalProperty(window.navigator);
const mockNavigator = mockWindow('userAgent');

const ChromeUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';

const IE11UserAgent =
  'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko';

describe('isIE11()', () => {
  it('should return true if it is IE11 userAgent', () => {
    const unmockNavigator = mockNavigator(IE11UserAgent);

    const res = isIE11();
    expect(res).toBe(true);

    unmockNavigator();
  });

  it('should return false if it is not IE11 userAgent', () => {
    const unmockNavigator = mockNavigator(ChromeUserAgent);

    const res = isIE11();
    expect(res).toBe(false);

    unmockNavigator();
  });
});
