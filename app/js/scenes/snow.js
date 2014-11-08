var Snow = function (options) {
	var DISPLACE_AMOUNT = 0.08,

		seriously,
		backgroundImage,
		depthMap,
		canvas,

		//seriously nodes
		transfer,
		simplex,
		channels,
		saturation,
		blend,
		displace,
		target,
		scale,

		reformatBackground,
		reformatDepth,

		resizables = [],

		start = Date.now() / 1000,
		noiseOffset = [0, 0],
		props = {
			slope: [1, 1, 1, 1],
			intercept: [1, 1, 1, 1]
		};

	function mouseMove(evt) {
		var x = evt.pageX,
			y = evt.pageY;

		displace.mapScale = [
			-DISPLACE_AMOUNT * x / window.innerWidth - DISPLACE_AMOUNT / 2,
			(DISPLACE_AMOUNT * y / window.innerHeight - DISPLACE_AMOUNT / 2)
		];
		//displace.amount = 0.2 * x / window.innerWidth - 0.1;
	}

	seriously = new Seriously();

	canvas = document.createElement('canvas');
	options.container.appendChild(canvas);
	target = seriously.target(canvas);
	resizables.push(target);

	backgroundImage = document.createElement('img');
	backgroundImage.src = 'images/cc_title_background.jpeg';
	reformatBackground = seriously.transform('reformat');
	reformatBackground.source = backgroundImage;
	reformatBackground.mode = 'cover';
	resizables.push(reformatBackground);

	saturation = seriously.effect('hue-saturation');
	saturation.source = reformatBackground;
	saturation.hue = 0;
	saturation.saturation = 0.3;

	//todo: set up displacement node
	depthMap = document.createElement('img');
	depthMap.src = 'images/cc_title_background_depth.jpeg';
	reformatDepth = seriously.transform('reformat');
	reformatDepth.source = depthMap;
	reformatDepth.mode = 'cover';
	resizables.push(reformatDepth);

	displace = seriously.effect('displacement');
	displace.source = saturation;
	displace.map = reformatDepth;
	displace.mapScale = [0, 0];
	displace.offset = 1.05;

	scale = seriously.transform('2d');
	scale.source = displace;
	scale.scale(1 + DISPLACE_AMOUNT * 4);

	//generate "fog" with simplex noise
	simplex = seriously.effect('simplex');
	simplex.octaves = 3;
	simplex.noiseScale = [1, 2.5];
	simplex.black = [0.0, 0.0, 0.0, 1];
	resizables.push(simplex);

	//adjust "distance" of fog by moving depth channel value up/down
	transfer = seriously.effect('linear-transfer');
	transfer.source = reformatDepth;
	transfer.slope = props.slope;
	transfer.intercept = props.intercept;

	//set depth value as alpha channel of fog
	channels = seriously.effect('channels');
	channels.source = simplex;
	channels.alphaSource = transfer;
	channels.alpha = 'red';

	//apply fog to image with "screen" blend mode
	blend = seriously.effect('blend');
	blend.top = channels;
	blend.bottom = scale;
	blend.mode = 'screen';

	target.source = blend; //blend;

	window.addEventListener('mousemove', mouseMove, false);

	return {
		resize: function (width, height) {
			resizables.forEach(function (node) {
				node.width = width;
				node.height = height;
			});
		},
		render: function () {
			//animate fog
			var time = (Date.now() / 1000 - start) % 1000;
			//simplex.time = time / 10;

			noiseOffset[0] = time / 5;
			simplex.noiseOffset = noiseOffset;

			seriously.render();
		}
	};
};