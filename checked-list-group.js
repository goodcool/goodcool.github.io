//Checked List Group by mouse0270
function checkbox() {
	$('.list-group.checked-list-box .list-group-item').each(function () {
		itemInit(this);
	});
};
function itemInit(item) {
	// Settings
		var $widget = $(item),
			$checkbox = $('<input type="checkbox" class="hidden" />'),
			color = ($widget.data('color') ? $widget.data('color') : "primary"),
			style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
			settings = {
				on: {
					icon: 'glyphicon glyphicon-check'
				},
				off: {
					icon: 'glyphicon glyphicon-unchecked'
				}
			};
		$widget.off('click');
		$widget.off('change');
		$widget.css('cursor', 'pointer')
		$widget.append($checkbox);
		// Event Handlers
		$widget.on('click', function () {
			$checkbox.prop('checked', !$checkbox.is(':checked'));
			$checkbox.triggerHandler('change');
			updateDisplay();
		});
		$checkbox.on('change', function () {
			updateDisplay();
		});
		// Actions
		function updateDisplay() {
			var isChecked = $checkbox.is(':checked');

			// Set the button's state
			$widget.data('state', (isChecked) ? "on" : "off");

			// Set the button's icon
			$widget.find('.state-icon')
				.removeClass()
				.addClass('state-icon ' + settings[$widget.data('state')].icon);

			// Update the button's color
			if (isChecked) {
				$widget.addClass(style + color + ' success');
			} else {
				$widget.removeClass(style + color + ' success');
			}
			//console.log("change");
		}

		// Initialization
		function init() {
			
			if ($widget.data('checked') == true) {
				$checkbox.prop('checked', !$checkbox.is(':checked'));
			}
			
			updateDisplay();

			// Inject the icon if applicable
			if ($widget.find('.state-icon').length == 0) {
				$widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
			}
		}
		init();
}
function getChecked() {
		var checkedItems = [], counter = 0;
		$("#space-chooser li.success").each(function(idx, li) {
			checkedItems[counter] = $(li).text();
			counter++;
		});
		return jQuery.makeArray(checkedItems);
	};
