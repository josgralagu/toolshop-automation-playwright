export function validateObject(obj, schema) {
	const { error } = schema.validate(obj)
	if (error) throw new Error(`Schema validation failed: ${error.message}`)
}
