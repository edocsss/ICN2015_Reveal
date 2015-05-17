
	/**
	 * 
	 */
	function Wave() {
		
		/** The current dimensions of the screen (updated on resize) */
		var WIDTH = $('#canvas').width(),
			HEIGHT = $('#canvas').height();
		
		/** Wave settings */
		var DENSITY = .75;
		var FRICTION = 1.14;
		var MOUSE_PULL = 0.07; // The strength at which the mouse pulls particles within the AOE
		var AOE = 100; // Area of effect for mouse pull
		var DETAIL = Math.round( WIDTH / 60 ); // The number of particles used to build up the wave
		var WATER_DENSITY = 1.07;
		var AIR_DENSITY = 1.02;
		var TWITCH_INTERVAL = 1000; // The interval between random impulses being inserted into the wave to keep it moving

		var WAVE_HEIGHT_MULTIPLIER = 0.65;
		
		var mouseIsDown;
		var ms = {x:0, y:0}; // Mouse speed
		var mp = {x:0, y:0}; // Mouse position
		
		var canvas, context, particles;
		var timeUpdateInterval, twitchInterval1, twitchInterval2;
		var ship = new Image();
		ship.src = 'img/asd.png';
		
		/**
		 * Constructor.
		 */
		this.Initialize = function () {
			canvas = document.getElementById('canvas');
			
			if (canvas && canvas.getContext) {
				context = canvas.getContext('2d');
				console.log("test");
				particles = [];
				
				// Generate our wave particles
				for( var i = 0; i < DETAIL + 1; i++ ) {
					particles.push( { 
						x: WIDTH / (DETAIL - 4) * (i - 2), // Pad by two particles on each side
						y: HEIGHT * 0.5,
						original: {x: 0, y: HEIGHT * WAVE_HEIGHT_MULTIPLIER}, // Randomize the multiplier *
						velocity: {x: 0, y: 1 + Math.random() * 3}, // Random for some initial movement in the wave
						force: {x: 0, y: 0},
						mass: 10
					} );
				}

				for (var j = 0; j < particles.length; j++) {
					console.log(particles[j].x, particles[j].y);
				}
				
				$(canvas).mousemove(MouseMove);
				$(canvas).mousedown(MouseDown);
				$(canvas).mouseup(MouseUp);
				$(window).resize(ResizeCanvas);
				
				timeUpdateInterval = setInterval( TimeUpdate, 40);
				twitchInterval1 = setInterval(Twitch1, 1500 + 300 * Math.sin(Math.random()));
				twitchInterval2 = setInterval(Twitch2, 1000 + 300 * Math.sin(Math.random()));
				twitchInterval3 = setInterval(Twitch3, 1300 + 700 * Math.sin(Math.random()));

				ResizeCanvas();
			}

			console.log(particles.length);
		};
		
		/**
		 * Stops downloading and showing tweets.
		 */
		function Terminate( message ) {
			clearInterval( tweetUpdateInterval );			
			alert( message );
		}
		
		/**
		 * Inserts a random impulse to keep the wave moving.
		 * Impulses are only inserted if the mouse is not making
		 * quick movements.
		 */

		 // THIS SEEMS TO BE A VERY IMPORTANT FUNCTION!!!!
		 // Seems to make auto movement on the wave
		function Twitch1() {
			// ms.x = 0;
			// ms.y = 0;

			var forceRange = 3 + Math.random(); // -value to +value
			InsertImpulse(0.25 * WIDTH + 60 * Math.sin(2 * Math.PI * Math.random()) * Math.random(), 0.05 + (Math.random() * (forceRange * 2) - forceRange));
		}

		function Twitch2() {
			// ms.x = 0;
			// ms.y = 0;

			var forceRange = 3 + Math.random(); // -value to +value
			InsertImpulse( 0.5 * WIDTH + 100 * Math.cos(2 * Math.PI * Math.random()) * Math.random(), 0.08 + (Math.random() * (forceRange * 2) - forceRange));
		}

		function Twitch3() {
			// ms.x = 0;
			// ms.y = 0;

			var forceRange = 3 + Math.random(); // -value to +value
			InsertImpulse( 0.75 * WIDTH + 75 * Math.sin(2 * Math.PI * Math.random()) * Math.random(), 0.06 + (Math.random() * (forceRange * 2) - forceRange));
		}
		
		/**
		 * Inserts an impulse in the wave at a specific position.
		 * 
		 * @param positionX the x coordinate where the impulse
		 * should be inserted
		 * @param forceY the force to insert
		 */
		function InsertImpulse( positionX, forceY ) {
			var particle = particles[Math.round( positionX / WIDTH * particles.length )];
			
			if (particle) {
				for (var i = 0; i < 1.5 * forceY; i++) {
					particle.force.y += 0.5;
				}
				//particle.force.y += forceY;
			}
		}
		
		/**
		 * 
		 */
		function TimeUpdate(e) {

			
			// Canvas color -> change to a darker color later
			var gradientFill = context.createLinearGradient(WIDTH * 0.5, HEIGHT * 0.2, WIDTH * 0.5, HEIGHT);
			gradientFill.addColorStop(0,'#012345');
			gradientFill.addColorStop(0.2,'#123456');
			gradientFill.addColorStop(0.4,'#345678');
			gradientFill.addColorStop(0.6,'#56789a');
			gradientFill.addColorStop(0.8,'#789abc');
			gradientFill.addColorStop(1,'#89abcd');
			
			//context.clearRect(0, 0, WIDTH, HEIGHT);

			// ADJUST THE OFFSET (70)
			context.drawImage(ship, 30, HEIGHT - ship.height - HEIGHT * (1 - WAVE_HEIGHT_MULTIPLIER) + 70);

			context.fillStyle = gradientFill;
			context.beginPath();
			context.moveTo(particles[0].x, particles[0].y);
			
			var len = particles.length;
			var i;
			
			var current, previous, next;
			
			for( i = 0; i < len; i++ ) {
				current = particles[i];
				previous = particles[i-1];
				next = particles[i+1];
				
				if (previous && next) {
					
					var forceY = 0, prevY = current.y;
					
					forceY += -DENSITY * ( previous.y - current.y );
					forceY += DENSITY * ( current.y - next.y );
					forceY += DENSITY / 15 * ( current.y - current.original.y );
					
					current.velocity.y += - ( forceY / current.mass ) + current.force.y;
					current.velocity.y /= FRICTION;
					current.force.y /= FRICTION;
					current.y += current.velocity.y;
					
					var distance = DistanceBetween( mp, current );
					
					if( distance < AOE ) {
						distance = DistanceBetween( mp, {x:current.original.x, y:current.original.y} );
						
						ms.x = ms.x * 0.98;
						ms.y = ms.y * 0.98;
						
						current.force.y += (MOUSE_PULL * ( 1 - (distance / AOE) )) * ms.y;
					}
					
					// cx, cy, ax, ay
					context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
				}
				
			}
			
			context.lineTo(particles[particles.length-1].x, particles[particles.length-1].y);
			context.lineTo(WIDTH, HEIGHT);
			context.lineTo(0, HEIGHT);
			context.lineTo(particles[0].x, particles[0].y);
			
			context.fill();
		}
		
		/**
		 * 
		 */
		function GetClosestParticle(point){
			var closestIndex = 0;
			var closestDistance = 1000;
			
			var len = particles.length;
			
			for( var i = 0; i < len; i++ ) {
				var thisDistance = DistanceBetween( particles[i], point );
				
				if( thisDistance < closestDistance ) {
					closestDistance = thisDistance;
					closestIndex = i;
				}
			}
			
			return particles[closestIndex];
		}
		
		/**
		 * 
		 */
		function MouseMove(e) {
			ms.x = Math.max( Math.min( e.layerX - mp.x, 15 ), -40 );
			ms.y = Math.max( Math.min( e.layerY - mp.y, 15 ), -40 );
			
			mp.x = e.layerX;
			mp.y = e.layerY;
		}

		function MouseDown(e) {
			mouseIsDown = true;
			
			var closestIndex = 0;
			var closestDistance = 1000;
		}

		function MouseUp(e) {
			mouseIsDown = false;
		}
		
		/**
		 * 
		 */
		function ResizeCanvas(e) {
			WIDTH = window.innerWidth;
			HEIGHT = window.innerHeight;
			
			canvas.width = WIDTH;
			canvas.height = HEIGHT;
			
			for( var i = 0; i < DETAIL+1; i++ ) {
				particles[i].x = WIDTH / (DETAIL - 4) * (i - 2);
				particles[i].y = HEIGHT * WAVE_HEIGHT_MULTIPLIER;
				
				particles[i].original.x = particles[i].x;
				particles[i].original.y = particles[i].y;
			}
		}
		
		/**
		 * 
		 */
		function DistanceBetween(p1, p2) {
			var dx = p2.x - p1.x;
			var dy = p2.y - p1.y;
			return Math.sqrt(dx * dx + dy * dy);
		}
		
	}

	// Start wave
    var wave = new Wave();
    wave.Initialize();