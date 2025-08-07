import React from 'react'
import Form from 'next/form'
const Login = () => {
  return (
    <div>
      <Form action="/search">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <textarea name="message" cols={30} rows={10} placeholder="Type in your message"></textarea>
      <button type="submit">Send Message</button>
     </Form>

    </div>
  )
}

export default Login
