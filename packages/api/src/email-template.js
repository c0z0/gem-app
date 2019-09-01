module.exports = ({
  secret,
  link
}) => `<div class="root" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI';, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', sans-serif !important;padding-top:64px;padding-bottom:64px;padding-right:64px;padding-left:64px;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;color:#484848;">
<div class="card" style="margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;background-color:white;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;width:512px;overflow:hidden;border-radius:6px;border: solid 1px #ddd;padding-top:32px;padding-bottom:32px;padding-right:32px;padding-left:32px;">
  <div style="text-align: center">
    <img style="margin: 0 auto;" width="60px" src="https://gem.cserdean.com/static/diamond.png"/>
  </div>
  <h2 class="title" style="color:#75489b;padding-top:16px;padding-bottom:64px;padding-right:16px;padding-left:24px;text-align:center;font-weight:normal;">Verify your email to login to Gem</h2>
  <p>Hello,</p>
  <p>
    We have received a login attempt with the following code:</p>
  <div class="code" style="background-color:#fafafa;border-radius:6px;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;color:#484848;padding-top:16px;padding-bottom:16px;padding-right:16px;padding-left:16px;text-align:center;font-weight:bold;font-size:1.1em;margin-top:16px;margin-bottom: 32px;">
    ${secret}
  </div>
  <p>
    To complete the login process, please click the button below:
  </p>
  <a href="${link}" class="button" style="margin: 0 32p;color:white !important;text-decoration:none;display:block;text-align:center;background-color:#75489b;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;padding-top:16px;padding-bottom:16px;padding-right:16px;padding-left:16px;border-radius:6px;margin-top:32px;margin-bottom:32px;margin-right:128px;margin-left:128px;">Verify</a>
  <p>Or copy and paste this URL into your browser:</p>
  <a href="${link}" style="color:#75489b !important;">${link}</a>
</div>
</div>`
