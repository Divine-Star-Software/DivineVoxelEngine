export class Task<T> {
	constructor(
		public name: string | number,
		public run: (data: T,onDone ?:  (data ?: any, transfers ?: any)=>void) => void,
		public mode: "async" | "deferred"
	) {}
}
