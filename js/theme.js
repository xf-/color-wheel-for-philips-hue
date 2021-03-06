define(
	['d3', 'colorwheel', 'tinycolor', 'sortable'],
	function (d3, ColorWheel, tinycolor, Sortable) {
		// Add theme UI
		ColorWheel.extend('theme', function (colorWheel) {
			var theme = d3.select('.Controls').append('div').attr('class', 'Theme');
			var sandbox = d3.select('.Controls').append('div').style('display', 'none');

			Sortable.create(theme.node(), {
				animation: 150,
				onEnd: function () {
					colorWheel.dispatch.updateEnd();
				}
			});

			colorWheel.dispatch.on('bindData.theme', function (data) {
				var swatches = theme.selectAll('.Theme-swatch').data(data);
				var newSwatches = swatches.enter().append('div').attr({
					'class': 'Theme-swatch',
					'data-marker-id': function (d, i) { return i }
				});
				newSwatches.append('div').attr('class', 'Theme-color');
				swatches.exit().remove();
			});

			colorWheel.dispatch.on('updateEnd.theme', function () {
				d3.selectAll('.Theme-swatch').remove().each(function (d) {
					var parent = d.show ? theme : sandbox;
					parent.node().appendChild(this);
				});
				d3.selectAll('.Theme-color').each(function (d) {
					var c = tinycolor({h: d.color.h, s: d.color.s, v: d.color.v});
					this.style.backgroundColor = c.toHexString();
				});
			});
		});
	}
);
