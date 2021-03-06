<?PHP
/*
    Contact Form from HTML Form Guide
    This program is free software published under the
    terms of the GNU Lesser General Public License.
    See this page for more info:
    http://www.html-form-guide.com/contact-form/simple-php-contact-form.html
*/
require_once("../include/fgcontactform.php");
require_once("../include/simple-captcha.php");

$formproc = new FGContactForm();
$sim_captcha = new FGSimpleCaptcha('scaptcha');

$formproc->EnableCaptcha($sim_captcha);

//1. Add your email address here.
//You can add more than one receipients.
$formproc->AddRecipient('Contact@mycolorscents.com'); //<<---Put your email address here


//2. For better security. Get a random tring from this link: http://tinyurl.com/randstr
// and put it here
$formproc->SetFormRandomKey('7c6cU0p8MkzItJb');


if(isset($_POST['submitted']))
{
   if($formproc->ProcessForm())
   {
        $formproc->RedirectToURL("thank-you.html");
   }
}

?>
<!doctype html>
<html lang="en-US">

<head>
  <meta charset="utf-8">
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-W6W8NWH');</script>
  <!-- End Google Tag Manager -->
  <title>Color Scents® | Contact Us</title>
  <meta name="description" content="The original scented trash bag. Color Scents® is your secret tool, delivering subtle bursts of scent important to combating trash odors, while helping maintain a clean and inviting home.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="facebook-domain-verification" content="vsntdcfhp6nj82wdkmxr8fmpsmk30z">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700;1,900&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>

<body class="no-js page-contact">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W6W8NWH"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <svg style="display:none;" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <symbol id="icon-link">
        <title>Link Icon</title>
        <path d="m3.4 0h-1.4-.6-1.4l3.9 3.9-3.9 4h1.4.6 1.4l3.9-4z"/>
        <path d="m8.4 0h-1.4-.6-1.4l3.9 3.9-3.9 4h1.4.6 1.4l3.9-4z"/>
      </symbol>
    </defs>
  </svg>

  <header>
    <div class="container">
      <a href="/" class="logo-link"><img src="/assets/img/color-scents-combination-mark.svg" alt="Color Scents® logo" class="hide__mobile-tablet" width="125" height="140"><img src="/assets/img/color-scents-logotype.svg" alt="Color Scents® logo type" class="hide__desktop" width="177" height="19"></a>
      <ul class="nav" id="main-nav">
        <li class="nav-item nav-item-dropdown nav-item-products">
          <span class="dropdown-toggle">Products</span>
          <div class="dropdown-menu">
            <div class="menu">
              <div class="menu-section">
                <h3>Bathroom</h3>
                <ul>
                  <li><a href="/products/4-gallon-small-bathroom-trash-bags/"><img src="/assets/img/navigation/bathroom.jpg"
                        width="55" height="55" alt=""><span>4 Gal. Small Trash Bags</span></a></li>
                </ul>
              </div>
              <div class="menu-section">
                <h3>Laundry + Office</h3>
                <ul>
                  <li><a href="/products/8-gallon-medium-laundry-office-trash-bags/"><img src="/assets/img/navigation/laundry.jpg"
                        width="55" height="55" alt=""><span>8 Gal. Medium Trash Bags</span></a></li>
                </ul>
              </div>
              <div class="menu-section">
                <h3>Kitchen</h3>
                <ul>
                  <li><a href="/products/8-gallon-medium-kitchen-trash-bags/"><img src="/assets/img/navigation/kitchen-medium.jpg"
                        width="55" height="55" alt=""><span>8 Gal. Medium Trash Bags</span></a></li>
                  <li><a href="/products/13-gallon-tall-kitchen-trash-bags/"><img src="/assets/img/navigation/kitchen-tall.jpg"
                        width="55" height="55" alt=""><span>13 Gal. Tall Trash Bags</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item nav-item-about"><a class="nav-link" href="/about/">About</a></li>
        <li class="nav-item nav-item-sustainability"><a class="nav-link" href="/sustainability/">Sustainability</a></li>
        <li class="nav-item nav-item-beyond"><a class="nav-link" href="/articles/">Beyond Trash</a></li>
      </ul>
      <button id="nav-toggle" class="hamburger"></button>
    </div>
  </header>

  <main>
    <div class="container">
      <div class="layout__2-col">
        <div class="hero">
          <h1>Contact Us</h1>
          <p>If there's anything you couldn't find on our site, our team is happy to help you. Please fill out the form below and a customer experience team member will be in touch!</p>
        </div>
  
        <div class="form">
          <form id="contactus" class="form-contact" action='<?php echo $formproc->GetSelfScript(); ?>' method='post' accept-charset='UTF-8' autocomplete="off">
            <input type='hidden' name='submitted' id='submitted' value='1' />
            <input type='hidden' name='<?php echo $formproc->GetFormIDInputName(); ?>' value='<?php echo $formproc->GetFormIDInputValue(); ?>' />
            <div class="cs-row">
              <div class="cs-col">
                <div class="form-group">
                  <input type="text" id="firstName" name="firstName" required autocomplete="off">
                  <label for="firstName">First name</label>
                  <div class="error-msg">First name is required</div>
                </div>
              </div>
              <div class="cs-col">
                <div class="form-group">
                  <input type="text" id="lastName" name="lastName" required autocomplete="off">
                  <label for="lastName">Last name</label>
                  <div class="error-msg">Last name is required</div>
                </div>
              </div>
            </div><!-- .row -->
            <div class="cs-row">
              <div class="cs-col">
                <div class="form-group">
                  <input type="email" id="email" name="email" required autocomplete="off">
                  <label for="email">Email</label>
                  <div class="error-msg">Valid email is required</div>
                </div>
              </div>
            </div><!-- .row -->
            <div class="cs-row">
              <div class="cs-col">
                <div class="form-group">
                  <textarea id="message" name="message" required autocomplete="off"></textarea>
                  <label for="message">Message</label>
                  <div class="error-msg">Message is required</div>
                </div>
              </div>
            </div><!-- .row -->
            <div class="cs-row">
              <div class="cs-col">
                <div>
                  <label>Anti-spam question</label>
                  <p><small>(Please answer the question below to prevent spam bots from submitting this form.)</small></p>
                </div>
                <div class="form-group">
                  <input type='text' name='scaptcha' id='scaptcha' maxlength="10" required />
                  <label for='scaptcha'><?php echo $sim_captcha->GetSimpleCaptcha(); ?></label>
                  <div class="error-msg">Please answer the anti-spam question</div>
                </div>
              </div>
            </div><!-- .row -->
            <div class="form-btns">
              <input type="submit" name="Submit" value="Submit" class="btn">
            </div>
          </form>

        </div><!-- .form -->
      </div><!-- .layout__2-col -->
    </div><!-- .container -->
  </main>

  <footer>
    <div class="top">
      <div class="container">
        <div class="trademark">
          <div>
            <img src="/assets/img/color-scents-logotype.svg" alt="Color Scents® logo type" width="300" height="32">
            <p>Color Scents® is a registered trademark of the Berry Global Corporation</p>
          </div>
          <div>
            <a href="https://www.facebook.com/ColorScents" class="link-social" rel="external"><img src="/assets/img/icon-facebook.svg" alt="Facebook" width="40" height="40"></a>
            <a href="https://www.instagram.com/colorscents/" class="link-social" rel="external"><img src="/assets/img/icon-instagram.svg" alt="Instagram" width="40" height="40"></a>
          </div>
        </div>
        <div class="links">
          <a href="/faq/" class="btn btn-small">FAQ</a>
          <a href="/contact-us/" class="btn btn-small">Contact Us</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="container">
        <img src="/assets/img/footer/berry-promise-logo_2x.png" alt="Berry: Innovation for the World, Solutions for You" width="165" height="51">
        <div class="copyright">
          <div>© 2022 Berry Global Group, Inc. All Rights Reserved.</div>
          <div class="terms-privacy">
            <a href="https://www.berryglobal.com/en/legal/terms-of-use" rel="external" target="_blank">Terms of Use</a>
            <a href="https://www.berryglobal.com/en/legal/privacy-notice" rel="external" target="_blank">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script src="/assets/js/tiny-slider.min.js"></script>
  <script src="/assets/js/scripts.js"></script>
</body>

</html>