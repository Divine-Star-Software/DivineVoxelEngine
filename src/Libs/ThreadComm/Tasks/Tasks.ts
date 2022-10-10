export class Task<T> {
	constructor(public name: string, public run: (data: T) => void) {}
}
