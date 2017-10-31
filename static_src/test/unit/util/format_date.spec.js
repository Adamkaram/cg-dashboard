import moment from "moment-timezone";

import formatDateTime from "../../../util/format_date";

describe("formatDateTime", () => {
  for (const val of [null, undefined, "", "invaliddate"]) {
    it(`should throw an exception when given an invalid value › ${val}`, () => {
      const stub = sinon
        .stub(moment, "suppressDeprecationWarnings")
        .value(true);

      expect(() => formatDateTime(val)).toThrow();

      stub.restore();
    });
  }

  for (const { val, tz, output } of [
    {
      val: "2015-07-14T04:02:30Z",
      output: "Jul 14 2015 04:02am UTC"
    },
    {
      val: "1988-10-01T18:58:30Z",
      output: "Oct 01 1988 06:58pm UTC"
    },
    {
      val: "2015-07-14T04:02:30Z",
      tz: "America/Los_Angeles",
      output: "Jul 13 2015 09:02pm PDT"
    }
  ]) {
    it(`should return a formatted datetime when given a valid value › ${val}`, () => {
      expect(formatDateTime(val, tz)).toEqual(output);
    });
  }
});
