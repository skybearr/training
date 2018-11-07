module fw {
	export interface IPool {
		reset(): void;

		destroy(): void;

		clear(): void;
	}
}