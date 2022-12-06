export class Task<T> {
	constructor(
		public name: string | number,
		public run: (data: T,onDone ?: Function) => void,
		public mode: "async" | "deffered"
	) {}
}
