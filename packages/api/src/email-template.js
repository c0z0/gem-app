module.exports = ({
  secret,
  link
}) => `<div class="root" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI';, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', sans-serif !important;padding-top:64px;padding-bottom:64px;padding-right:64px;padding-left:64px;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;color:#484848;">
<div class="card" style="margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;background-color:white;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;width:512px;overflow:hidden;border-radius:6px;border: solid 1px #ddd;padding-top:32px;padding-bottom:32px;padding-right:32px;padding-left:32px;">
  <div style="text-align: center">
    <img style="margin: 0 auto;" width="60px" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkUxODI7IiBwb2ludHM9IjM2MC4xMjksMTcyLjEzOCAyNTYsNDcyLjI3NiA1MTIsMTcyLjEzOCAiLz4NCjxnPg0KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkNENzM7IiBwb2ludHM9IjEwNS45MzEsMzkuNzI0IDAsMTcyLjEzOCAxNTEuODcxLDE3Mi4xMzggCSIvPg0KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkNENzM7IiBwb2ludHM9IjM2MC4xMjksMTcyLjEzOCA1MTIsMTcyLjEzOCA0MDYuMDY5LDM5LjcyNCAJIi8+DQoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGQ0Q3MzsiIHBvaW50cz0iMzYwLjEyOSwxNzIuMTM4IDI1NiwzOS43MjQgMTUxLjg3MSwxNzIuMTM4IAkiLz4NCjwvZz4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkFBNjQ7IiBwb2ludHM9IjI1NiwzOS43MjQgMTA1LjkzMSwzOS43MjQgMTUxLjg3MSwxNzIuMTM4ICIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGRTE4MjsiIHBvaW50cz0iNDA2LjA2OSwzOS43MjQgMjU2LDM5LjcyNCAzNjAuMTI5LDE3Mi4xMzggIi8+DQo8cG9seWdvbiBzdHlsZT0iZmlsbDojRkZBQTY0OyIgcG9pbnRzPSIxNTEuODcxLDE3Mi4xMzggMjU2LDQ3Mi4yNzYgMzYwLjEyOSwxNzIuMTM4ICIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGOEM1QTsiIHBvaW50cz0iMCwxNzIuMTM4IDI1Niw0NzIuMjc2IDE1MS44NzEsMTcyLjEzOCAiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
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
