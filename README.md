# Yocto
The smallest UI framework in the universe.

This architecture style is described
[here](https://github.com/paldepind/functional-frontend-architecture).

It is also _fractal_, i.e. it supports components that handle their own internal state using the same architectural pattern, and publish relevant events to the parent component. The meaning of fractal in this context is borrowed from [this article](http://staltz.com/unidirectional-user-interface-architectures.html).

## ToDo
- Develop full demo/test application
	- Generic components
		- Menu
		- Sliding pane
		- Centered Popup
			- Loading (wrap around REST service)
			- Alert / information
			- Confirm (question + yes / no)
			- Prompt (Label + input + OK / Cancel)
			- Custom content
	- REST service
	- Multiple tables
