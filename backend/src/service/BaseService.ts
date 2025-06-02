const singletonMap = new WeakMap<new () => any, any>();

export class BaseService {
	constructor() {
		// Prevent direct instantiation
	}

	static getInstance<T>(this: new () => T): T {
		if (!singletonMap.has(this)) {
			singletonMap.set(this, new this());
		}
		return singletonMap.get(this);
	}
}
