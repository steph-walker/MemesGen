<!DOCTYPE HTML>
<html>
	<head>
		<title></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="./assets/css/main.css" />
	</head>
	<body class="is-preload homepage">
		<div id="page-wrapper">

			<!-- Header -->
				<div id="header-wrapper">
					<header id="header" class="container">

						<!-- Logo -->
							<div id="logo">
								<img src="./images/anthos.png" alt="anthos" style="height: 100px; width: 100px; margin-bottom: -.28em;">
								<a href="index.php"><img src="./images/memesgen.png" alt="logo"></a>								
							</div>

						<!-- Nav -->						
							<nav  id="nav" >
								<ul >
									<li class="current"><a href="index.php">Top Memes</a></li>
									<li><a href="Memes.php">Meme Templates</a></li>																	
								</ul>
								<div class="cd-main-nav js-main-nav">
									<ul class="cd-main-nav__list js-signin-modal-trigger">
									   <!-- inser more links here -->
									   <li><a class="cd-main-nav__item cd-main-nav__item--signin" href="#0" data-signin="login">Sign in</a></li>
									   <li><a href="profile.html">Profile</a></li>	
									</ul>
								</div>
								
					</header>
				</div>

			<!-- Banner -->
			
			<div class="cd-signin-modal js-signin-modal"> <!-- this is the entire modal form, including the background -->
				<div class="cd-signin-modal__container"> <!-- this is the container wrapper -->
					<ul class="cd-signin-modal__switcher js-signin-modal-switcher js-signin-modal-trigger" style="list-style-type: none;">
						<li><a href="#0" data-signin="login" data-type="login">Sign in</a></li>
						<li><a href="#0" data-signin="signup" data-type="signup">New account</a></li>
					</ul>
		
					<div class="cd-signin-modal__block js-signin-modal-block" data-type="login"> <!-- log in form -->
						<form class="cd-signin-modal__form">
							<p class="cd-signin-modal__fieldset">
								<label class="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace" for="signin-email">E-mail</label>
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="signin-email" type="email" placeholder="E-mail">
								<span class="cd-signin-modal__error">Error message here!</span>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<label class="cd-signin-modal__label cd-signin-modal__label--password cd-signin-modal__label--image-replace" for="signin-password">Password</label>
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="signin-password" type="text"  placeholder="Password">
								<a href="#0" class="cd-signin-modal__hide-password js-hide-password">Hide</a>
								<span class="cd-signin-modal__error">Error message here!</span>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<input type="checkbox" id="remember-me" checked class="cd-signin-modal__input ">
								<label for="remember-me">Remember me</label>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width" type="submit" value="Login">
							</p>
						</form>
						
						<p class="cd-signin-modal__bottom-message js-signin-modal-trigger"><a href="#0" data-signin="reset">Forgot your password?</a></p>
					</div> <!-- cd-signin-modal__block -->
		
					<div class="cd-signin-modal__block js-signin-modal-block" data-type="signup"> <!-- sign up form -->
						<form class="cd-signin-modal__form">
							<p class="cd-signin-modal__fieldset">
								<label class="cd-signin-modal__label cd-signin-modal__label--username cd-signin-modal__label--image-replace" for="signup-username">Username</label>
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="signup-username" type="text" placeholder="Username">
								<span class="cd-signin-modal__error">Error message here!</span>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<label class="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace" for="signup-email">E-mail</label>
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="signup-email" type="email" placeholder="E-mail">
								<span class="cd-signin-modal__error">Error message here!</span>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<label class="cd-signin-modal__label cd-signin-modal__label--password cd-signin-modal__label--image-replace" for="signup-password">Password</label>
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="signup-password" type="text"  placeholder="Password">
								<a href="#0" class="cd-signin-modal__hide-password js-hide-password">Hide</a>
								<span class="cd-signin-modal__error">Error message here!</span>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<input type="checkbox" id="accept-terms" class="cd-signin-modal__input ">
								<label for="accept-terms">I agree to the <a href="#0">Terms</a></label>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding" type="submit" value="Create account">
							</p>
						</form>
					</div> <!-- cd-signin-modal__block -->
		
					<div class="cd-signin-modal__block js-signin-modal-block" data-type="reset"> <!-- reset password form -->
						<p class="cd-signin-modal__message">Lost your password? Please enter your email address. You will receive a link to create a new password.</p>
		
						<form class="cd-signin-modal__form">
							<p class="cd-signin-modal__fieldset">
								<label class="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace" for="reset-email">E-mail</label>
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="reset-email" type="email" placeholder="E-mail">
								<span class="cd-signin-modal__error">Error message here!</span>
							</p>
		
							<p class="cd-signin-modal__fieldset">
								<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding" type="submit" value="Reset password">
							</p>
						</form>
		
						<p class="cd-signin-modal__bottom-message js-signin-modal-trigger"><a href="#0" data-signin="login">Back to log-in</a></p>
					</div> <!-- cd-signin-modal__block -->
					<a href="#0" class="cd-signin-modal__close js-close">Close</a>
				</div> <!-- cd-signin-modal__container -->
			</div> <!-- cd-signin-modal -->



				




			<!-- Features -->
				<div id="features-wrapper">
					<div class="container">
						<div class="topMemes">
							<button>Most Liked</button>
							<button>New</button>
						</div>
						<div class="row">
							<div id="front-page-memes">
								
							</div>
						</div>
					</div>
				</div>

			<!-- Main -->
				<div id="main-wrapper">
					<h1>Main body</h1>
				</div>

			<!-- Footer -->
				<div id="footer-wrapper">
					<footer id="footer" class="container">
						<div class="row">

						
							<div class="col-3 col-6-medium col-12-small">

								<!-- Contact -->
									<section class="widget contact last">
										<h3>Contact Us</h3>
										<ul>
											<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
											<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
											<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
											<li><a href="#" class="icon brands fa-dribbble"><span class="label">Dribbble</span></a></li>
											<li><a href="#" class="icon brands fa-pinterest"><span class="label">Pinterest</span></a></li>
										</ul>
										<p>1234 Fictional Road<br />
										Nashville, TN 00000<br />
										(800) 555-0000</p>
									</section>

							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<div id="copyright">
									<ul class="menu">
										<li>&copy; Untitled. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
									</ul>
								</div>
							</div>
						</div>
					</footer>
				</div>

			</div>

		<!-- Scripts -->

			<script src="./assets/js/jquery.min.js"></script>
			<script src="./assets/js/jquery.dropotron.min.js"></script>
			<script src="./assets/js/browser.min.js"></script>
			<script src="./assets/js/breakpoints.min.js"></script>
			<script src="./assets/js/util.js"></script>
			<script src="./assets/js/main.js"></script>

			<!-- <script src="./assets/js/jquery.min.js"></script> -->

	</body>
</html>