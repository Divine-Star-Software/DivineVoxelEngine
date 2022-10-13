export class DataSync<T, K> {
	constructor(
		public onSync: (data: T) => void,
		public onUnSync: (data: K) => void
	) {}
}
