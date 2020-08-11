import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST as string,
  port: parseInt(process.env.MAIL_PORT || '25', 10),
  auth: {
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASSWORD as string,
  },
  secure: process.env.MAIL_SECURE === 'true',
})

export const makeEmail = (text: string) => `
<div className="email" style="
  border: 1px solid black;
  padding: 20px;
  font-family: sans-serif;
  line-height: 2;
font-size: 20px;
">
  <h2>Howdy, Journaler!</h2>
  ${text}
  <p>Robin @ Journaly</p>
</div>
`
