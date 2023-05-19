// This function assumes objects and arrays passed to it don't contain circular references or functions and are therefore JSON-safe. If objects contain such complex data consider using the Lodash method '_.cloneDeep()'

export function createDeepClone(obj) {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	let clone;

	if (Array.isArray(obj)) {
		clone = [];

		obj.forEach(el => {
			clone.push(createDeepClone(el));
		});
	} else {
		clone = {};

		for (const key in obj) {
			// If the 'hasOwn' method is not supported then use 'Object.prototype.hasOwnProperty.call(obj, key)' - this option will use the 'hasOwnProperty' method on the 'Object' prototype instead of on the 'obj' object in cases where the 'hasOwnProperty' method on 'obj' may have been overridden (as it is not protected by JavaScript).
			if (Object.hasOwn(obj, key)) {
				clone[key] = createDeepClone(obj[key]);
			}
		}
	}

	return clone;
}
