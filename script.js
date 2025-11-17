// Script for interactive behavior and validation
$(function(){
  // Mobile nav toggle
  $('.nav-toggle').on('click', function(){
    $('.nav-links').toggle();
  });

  // Smooth scroll for nav links
  $('.nav-links a, .brand').on('click', function(e){
    var href = $(this).attr('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      var target = $(href);
      if(target.length){
        $('html,body').animate({scrollTop: target.offset().top - 70}, 600);
      }
      // hide mobile nav after click
      if($(window).width() < 800) $('.nav-links').hide();
    }
  });

  // Registration form validation
  $('#regForm').on('submit', function(e){
    e.preventDefault();
    $('#formMessage').text('');
    var name = $('#fname').val().trim();
    var email = $('#email').val().trim();
    var gender = $('input[name="gender"]:checked').val();
    var age = $('#age').val();
    var interests = $('input[name="interest"]:checked').length;
    var bio = $('#bio').val().trim();

    // Check required fields
    if(!name || !email || !gender || !age || interests === 0 || !bio){
      $('#formMessage').text('Please fill in all required fields.');
      $('#formMessage').css('color','red');
      return;
    }
    // Email format check (simple)
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      $('#formMessage').text('Please enter a valid email address.');
      $('#formMessage').css('color','red');
      return;
    }
    // If validation passes, show success and refresh page
    $('#formMessage').text('Registration successful. The page will refresh now.');
    $('#formMessage').css('color','green');
    setTimeout(function(){ location.reload(); }, 900);
  });

  // Reset button clears fields - add message
  $('#regForm').on('reset', function(){
    $('#formMessage').text('Form cleared.');
    $('#formMessage').css('color','#333');
  });

  // Display current date & time and update every second
  function updateDateTime(){
    var now = new Date();
    var options = {weekday:'long', year:'numeric', month:'long', day:'numeric'};
    var dateStr = now.toLocaleDateString(undefined, options);
    var timeStr = now.toLocaleTimeString();
    $('#dateTime').text('Current date & time: ' + dateStr + ' — ' + timeStr);
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
});