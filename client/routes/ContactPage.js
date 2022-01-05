import React from "react";

const Contact = () => {
  return (
    <div>
      <h1
      style={{display: "block"}}>
        Contact Us</h1>
      <form>
        <label>
          E-mail
          <input type="email" class="email"/>
        </label>
        <label>
          Subject
          <input type="text" class="subject"/>
        </label>
        <label>
          Name
          <input type="text" class="name"/>
        </label>
        <label>
          Message
          <textarea></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
