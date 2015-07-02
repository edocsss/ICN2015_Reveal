<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="icn,nilam,malin,kundang,2015,ntu,singapore,sg,nanyang" />
        <meta name="description" content="Nilam: A Musical" />  

        <title>ICN 2015 - NILAM: A Musical</title>
		
		<link href="../vendor/bootstrap-3.3.4-dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        <script>
        	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-64309292-1', 'auto');
            ga('send', 'pageview');
        </script>
	</head>

	<body>
		<div class="loading-layer"></div>
		
		<div class="main-container">
			<nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#" data-slide="0">
                            <img src="../img/logo/logonilamalt_invert_websize.png" class="logo">
                        </a>
                        <a class="navbar-brand icn-logo" href="#" data-slide="0">
                            <img src="../img/logo/ICN logo small.png" class="logo">
                        </a>
                    </div>
                </div><!-- /.container-fluid -->
            </nav>

            <div id="canvas-container" class="hidden-xs">
                <canvas id="canvas"></canvas>
            </div>

            <div class="container-fluid hidden-xs content-big">
                <div class="col-xs-offset-6 col-xs-6">
                    <div class="col-xs-12 text-center ticket-form-header-big">
                        <h1>BUY TICKET FORM HERE</h1>
                    </div>
                </div>
            </div>

            <div class="container-fluid hidden-sm hidden-md hidden-lg content-small">
                <div class="row">
                    <div class="col-xs-12 text-center ticket-form-header-small">
                        <h3>BUY TICKET HEADER HERE</h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 ticket-form">
                        <!-- FORM HERE -->
                    </div>
                </div>
            </div>
		</div>

		<script src="../vendor/jquery/jquery-1.11.2.min.js"></script>
		<script src="../vendor/bootstrap-3.3.4-dist/js/bootstrap.min.js"></script>
		<script src="../vendor/mersenne-twister/mersenne-twister.js"></script>

		<script src="js/canvas-properties.js"></script>
        <script src="js/wave-controller.js"></script>
        <script src="js/flash.js"></script>
        <script src="js/lightning-controller.js"></script>
        <script src="js/ship-controller.js"></script>
        <script src="js/animation.js"></script>
        <script src="js/engine.js"></script>
	</body>
</html>