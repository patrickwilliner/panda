define([], function() {
	function modelConstructor(elements, comparator) {
		this.selectionIdx = -1;
		this.elements = elements;
		this.comparator = comparator;
        this.listeners = [];
	}

	/*
	 * Replaces the elements and clears the selection.
	 */
	modelConstructor.prototype.setElements = function(elements) {
		this.elements = elements;
		this.clearSelection();
	};

    /*
     * Inserts an element at the end of the elements list.
     */
    modelConstructor.prototype.append = function(element) {
        this.elements.push(element);
    };

    /*
     * Inserts an element at the beginning of the elements list.
     */
    modelConstructor.prototype.prepend = function(element) {
        this.elements.splice(0, 0, element);
    };

    /*
     * Accessor.
     */
    modelConstructor.prototype.hasAnyElement = function() {
        return this.elements && this.elements.length > 0;
    };

    /*
     * Accessor.
     */
    modelConstructor.prototype.getElements = function() {
      return this.elements;
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
     * Selects the element with the given index.
     */
    modelConstructor.prototype.selectIndex = function(idx) {
        this.selectionIdx = idx;
        this.notifyListeners();
    };

	/*
	 * Select the given element. If element is not found among the managed elements then selection is cleared.
	 * The comparator is used to find the given element among managed elements.
	 */
	modelConstructor.prototype.select = function(element) {
		for (var i = 0; i < this.elements.length; i++) {
			if (this.comparator(element, this.elements[i])) {
				this.selectIndex(i);
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
            this.selectIndex(this.selectionIdx - 1);
		}
	};

	/*
	 * Selects next element if any element is selected and if selected element is not last element.
	 */
	modelConstructor.prototype.selectNext = function() {
		if (this.hasSelection() && !this.lastElementSelected()) {
            this.selectIndex(this.selectionIdx + 1);
		}
	};

    /*
     * Selects first element.
     */
    modelConstructor.prototype.selectFirst = function() {
        this.selectIndex(0);
    };

	/*
	 * Clears selection.
	 */
	modelConstructor.prototype.clearSelection = function() {
        this.selectIndex(-1);
	};

    /*
     *
     */
    modelConstructor.prototype.registerListener = function(listener) {
        this.listeners.push(listener);
    }

    /*
     *
     */
    modelConstructor.prototype.notifyListeners = function() {
        this.listeners.forEach(function(listener) {
            listener();
        });
    };

	return modelConstructor;
});