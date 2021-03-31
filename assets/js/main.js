

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});
	// build out api call to get saved memes
	// attach output to div id front-page-memes
	// iterate results through div snippet 
	//     - GET https://makeopensourcegreatagain.com/memegen/api/?table_name=memes_saved
	$.getJSON("/api/?table_name=memes_saved", function(data){
            $.each(data.data.memes_saved.values, function(i, item) {
		console.log(data.data.memes_saved.values[i]);
		console.log(data.data.memes_likes.values[i]);
		// even with graphql, astra is only returning 2 rows.... 
		// also need to make the ID available to the like click action for link attribute meme-id
		data.data.memes_saved.values[i].likes = data.data.memes_likes.values[i].likes; // need to come from API 

	        $( "#front-page-memes" ).append( '<div class="col-4 col-12-medium"> <section class="box feature" > <a href="chatPage.html" class="image featured"><img src="' + data.data.memes_saved.values[i].image_source + '" alt="" /></a><div class="inner"></div><ul class="list-inline action-menu"><li><a href="" class="like" meme-id="' + data.data.memes_saved.values[i].uuid + '"><span class="fa fa-thumbs-up"></span> <span class="menulabel">Like</span> <span class="counter">' + data.data.memes_likes.values[i].likes + '</span></a></li></ul> </section></div>' );
	    });
    });

})(jQuery);


// Account Form code
// $(function() {

//     $('#login-form-link').click(function(e) {
// 		$("#login-form").delay(100).fadeIn(100);
//  		$("#register-form").fadeOut(100);
// 		$('#register-form-link').removeClass('active');
// 		$(this).addClass('active');
// 		e.preventDefault();
// 	});
// 	$('#register-form-link').click(function(e) {
// 		$("#register-form").delay(100).fadeIn(100);
//  		$("#login-form").fadeOut(100);
// 		$('#login-form-link').removeClass('active');
// 		$(this).addClass('active');
// 		e.preventDefault();
// 	});

// });

// Counter for like button



var likeCounter = 0;

$(".like").on("click", function(e){
  e.preventDefault();
  
  // this function needs to initiate a post, update like
  // clicking again could undo the like by sending same call with -1 payload

  //     - GET https://makeopensourcegreatagain.com/memegen/api/?table_name=memes_likes&meme_id=29562797
  //  - POST https://makeopensourcegreatagain.com/memegen/api/?table_name=memes_likes&meme_id=29562797
  //      - Payload: { "likes": "+1" }
  //      - Payload: {"likes":"-1"}

  // id for this call is meme-id attribute on the like button
  // like click even needs to be added after the main page loads results from api (click action not associated to elements loaded after page load)

	var json_data = '{ "likes": "+1" }';
	$.post("/api/?table_name=memes_likes", json_data, function(data, status){
	    console.log("Data: " + data + "\nStatus: " + status);
	});

  // animation
  if( $(this).parent().hasClass("selected") ){
    $(this)
      .parent()
      .addClass("animated fadeOutDown")
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass("selected animated fadeOutDown");

      if($(this).find("a").hasClass("like")){
        $(this).find(".menulabel").text("Like");
      }
    });
    
    // like counter
    if($(this).hasClass("like")){
    //   likeCounter--;
      $(this).find(".counter").text(likeCounter);
    };
    
  }else{
    $(this)
      .parent()
      .addClass("animated bounceIn selected")
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass("animated bounceIn");
    });//fadeOutUp bounceOutLeft fadeOutDown flash
    
    // like counter
    if($(this).hasClass("like")){
      likeCounter++;
      $(this).find(".counter").text(likeCounter);
      $(this).find(".menulabel").text("Liked");
    }
  }
});


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
(function(){
    //Login/Signup modal window - by CodyHouse.co
	function ModalSignin( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
		this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a'); 
		this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
		this.hidePassword = this.element.getElementsByClassName('js-hide-password');
		this.init();
	};

	ModalSignin.prototype.init = function() {
		var self = this;
		//open modal/switch form
		for(var i =0; i < this.triggers.length; i++) {
			(function(i){
				self.triggers[i].addEventListener('click', function(event){
					if( event.target.hasAttribute('data-signin') ) {
						event.preventDefault();
						self.showSigninForm(event.target.getAttribute('data-signin'));
					}
				});
			})(i);
		}

		//close modal
		this.element.addEventListener('click', function(event){
			if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
				event.preventDefault();
				removeClass(self.element, 'cd-signin-modal--is-visible');
			}
		});
		//close modal when clicking the esc keyboard button
		document.addEventListener('keydown', function(event){
			(event.which=='27') && removeClass(self.element, 'cd-signin-modal--is-visible');
		});

		//hide/show password
		for(var i =0; i < this.hidePassword.length; i++) {
			(function(i){
				self.hidePassword[i].addEventListener('click', function(event){
					self.togglePassword(self.hidePassword[i]);
				});
			})(i);
		} 

		//IMPORTANT - REMOVE THIS - it's just to show/hide error messages in the demo
		this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function(event){
			event.preventDefault();
			self.toggleError(document.getElementById('signin-email'), true);
		});
		this.blocks[1].getElementsByTagName('form')[0].addEventListener('submit', function(event){
			event.preventDefault();
			self.toggleError(document.getElementById('signup-username'), true);
		});
	};

	ModalSignin.prototype.togglePassword = function(target) {
		var password = target.previousElementSibling;
		( 'password' == password.getAttribute('type') ) ? password.setAttribute('type', 'text') : password.setAttribute('type', 'password');
		target.textContent = ( 'Hide' == target.textContent ) ? 'Show' : 'Hide';
		putCursorAtEnd(password);
	}

	ModalSignin.prototype.showSigninForm = function(type) {
		// show modal if not visible
		!hasClass(this.element, 'cd-signin-modal--is-visible') && addClass(this.element, 'cd-signin-modal--is-visible');
		// show selected form
		for( var i=0; i < this.blocks.length; i++ ) {
			this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'cd-signin-modal__block--is-selected') : removeClass(this.blocks[i], 'cd-signin-modal__block--is-selected');
		}
		//update switcher appearance
		var switcherType = (type == 'signup') ? 'signup' : 'login';
		for( var i=0; i < this.switchers.length; i++ ) {
			this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'cd-selected') : removeClass(this.switchers[i], 'cd-selected');
		} 
	};

	ModalSignin.prototype.toggleError = function(input, bool) {
		// used to show error messages in the form
		toggleClass(input, 'cd-signin-modal__input--has-error', bool);
		toggleClass(input.nextElementSibling, 'cd-signin-modal__error--is-visible', bool);
	}

	var signinModal = document.getElementsByClassName("js-signin-modal")[0];
	if( signinModal ) {
		new ModalSignin(signinModal);
	}

	// toggle main navigation on mobile
	var mainNav = document.getElementsByClassName('js-main-nav')[0];
	if(mainNav) {
		mainNav.addEventListener('click', function(event){
			if( hasClass(event.target, 'js-main-nav') ){
				var navList = mainNav.getElementsByTagName('ul')[0];
				toggleClass(navList, 'cd-main-nav__list--is-visible', !hasClass(navList, 'cd-main-nav__list--is-visible'));
			} 
		});
	}
	
	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
	function toggleClass(el, className, bool) {
		if(bool) addClass(el, className);
		else removeClass(el, className);
	}

	//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
	function putCursorAtEnd(el) {
    	if (el.setSelectionRange) {
      		var len = el.value.length * 2;
      		el.focus();
      		el.setSelectionRange(len, len);
    	} else {
      		el.value = el.value;
    	}
	};
})();
