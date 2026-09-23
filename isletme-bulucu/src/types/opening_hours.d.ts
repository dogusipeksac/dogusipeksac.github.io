declare module 'opening_hours' {
  export default class OpeningHours {
    constructor(value: string, nominatimObject?: object, optional?: object)
    getState(date?: Date): boolean | undefined
  }
}
