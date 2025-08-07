import React from 'react'
import Form from 'next/form'
const Main = () => {
  return (
    <div>
      <h1>Contact us</h1>
      <h2>GET IN TOUCH</h2>
      <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
    </div>
  )
}

export default Main
