define([], function() {
	function modelConstructor(elements, comparator) {
		this.selectionIdx = -1;
		this.elements = elements;
		this.comparator = comparator;
	}

	/*
	 * Replaces the elements and clears the selection.
	 */
	modelConstructor.prototype.setElements = function(elements) {
		this.elements = elements;
		this.clearSelection();
	};

	/*
	 * Accessor.
	 */
	modelConstructor.prototype.hasSelection = function() {
		return this.selectionIdx >= 0;
	};

	/*
	 * Accessor.
	 */
	modelConstructor.prototype.firstElementSelected = function() {
		return this.selectionIdx === 0;
	};

	/*
	 * Accessor.
	 */
	modelConstructor.prototype.lastElementSelected = function() {
		return this.selectionIdx === this.elements.length - 1;
	};

	/*
	 * Accessor.
	 */
	modelConstructor.prototype.isSelected = function(element) {
		return this.hasSelection() && this.comparator(this.elements[this.selectionIdx], element);
	};

	/*
	 * Accessor.
	 *
	 * Returns selected element or <code>null</code> if no element is selected.
	 */
	modelConstructor.prototype.getSelectedElement = function() {
		if (this.hasSelection()) {
			return this.elements[this.selectionIdx];
		} else {
			return null;
		}
	};

	/*
	 * Select the given element. If element is not found among the managed elements then selection is cleared.
	 * The comparator is used to find the given element among managed elements.
	 */
	modelConstructor.prototype.select = function(element) {
		for (var i = 0; i < this.elements.length; i++) {
			if (this.comparator(element, this.elements[i])) {
				this.selectionIdx = i;
				return element;
			}
		}

		// element is not found among elements
		this.clearSelection();
	};

	/*
	 * Selects previous element if any element is selected and if selected element is not first element.
	 */
	modelConstructor.prototype.selectPrevious = function() {
		if (this.hasSelection() && !this.firstElementSelected()) {
			this.selectionIdx = this.selectionIdx - 1;
		}
	};

	/*
	 * Selects next element if any element is selected and if selected element is not last element.
	 */
	modelConstructor.prototype.selectNext = function() {
		if (this.hasSelection() && !this.lastElementSelected()) {
			this.selectionIdx = this.selectionIdx + 1;
		}
	};

	/*
	 * Clears selection.
	 */
	modelConstructor.prototype.clearSelection = function() {
		this.selectionIdx = -1;
	};

	return modelConstructor;
});