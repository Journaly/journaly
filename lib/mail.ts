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
