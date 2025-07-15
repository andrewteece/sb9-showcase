export class DateVO {
  static isValidDateFormat = (date: unknown) =>
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    !!date && !isNaN(Date.parse(date.toString?.()));

  static isDateBefore = (
    dateToCheck: Date | string,
    referenceDate: Date | string
  ) => {
    const parsedDateToCheck =
      typeof dateToCheck === "string" ? new Date(dateToCheck) : dateToCheck;
    const parsedReferenceDate =
      typeof referenceDate === "string"
        ? new Date(referenceDate)
        : referenceDate;

    return parsedDateToCheck < parsedReferenceDate;
  };

  static isDateAfter = (
    dateToCheck: Date | string,
    referenceDate: Date | string
  ) => {
    const parsedDateToCheck =
      typeof dateToCheck === "string" ? new Date(dateToCheck) : dateToCheck;
    const parsedReferenceDate =
      typeof referenceDate === "string"
        ? new Date(referenceDate)
        : referenceDate;

    return parsedDateToCheck > parsedReferenceDate;
  };
}
