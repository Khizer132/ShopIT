export const resetPasswordTemplate = (username, resetUrl) => {
  return `
    <html>
      <head>
        <style>
          body {
            background: #f4f6fb;
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 480px;
            margin: 40px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            padding: 32px 24px;
          }
          .brand {
            font-size: 28px;
            font-weight: bold;
            color: #2d7ff9;
            margin-bottom: 16px;
            letter-spacing: 1px;
            text-align: center;
          }
          .divider {
            border-bottom: 1px solid #eaeaea;
            margin: 16px 0 24px 0;
          }
          h2 {
            color: #22223b;
            font-size: 22px;
            margin-bottom: 12px;
            text-align: center;
          }
          p {
            color: #444;
            font-size: 16px;
            line-height: 1.6;
          }
          .btn {
            display: block;
            width: fit-content;
            margin: 24px auto;
            padding: 12px 32px;
            background: #2d7ff9;
            color: #fff !important;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(45,127,249,0.08);
            transition: background 0.2s;
          }
          .btn:hover {
            background: #195bb5;
          }
          .footer {
            margin-top: 32px;
            font-size: 13px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="brand">ShopIT</div>
          <div class="divider"></div>
          <h2>Password Reset Request</h2>
          <p>Hello <strong>${username}</strong>,</p>
          <p>We received a request to reset your password for your ShopIT account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" class="btn">Reset Password</a>
          <p style="margin-top:24px;">If you did not request a password reset, please ignore this email.<br>
          This link will expire in 30 minutes.</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ShopIT. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
};